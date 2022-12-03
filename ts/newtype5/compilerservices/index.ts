import fs from "fs";
import ts from "typescript";
import {dirname} from "path";

function print_diagnostics(diagnostics: readonly ts.Diagnostic[]): void {
   for (const diag of diagnostics) {
      let message = "Error";
      if (diag.file && diag.start) {
         let {line, character} = diag.file.getLineAndCharacterOfPosition(diag.start);
         message += ` ${diag.file.fileName} (${line + 1},${character + 1})`;
      }
      message += ": " + ts.flattenDiagnosticMessageText(diag.messageText, '\n');
      console.log(message);
   }
}

const tsconfig_location = process.argv[2];
if (tsconfig_location == null) {
   throw new Error("need argument for tsconfig.json");
}
const config_text = fs.readFileSync(tsconfig_location, "utf8");
/**
 * This is just JSON.parse with comments.
 * It wants the filename too so that it can generate diagnostics.
 */
const json_parse_result = ts.parseConfigFileTextToJson(tsconfig_location, config_text);

if (json_parse_result.error != null) {
   print_diagnostics([json_parse_result.error]);
   process.exit(1);
}

const config_obj = json_parse_result.config;

const config = ts.parseJsonConfigFileContent(
   config_obj,
   ts.sys,
   dirname(tsconfig_location),
);

if (config.errors.length > 0) {
   console.log("errors before program");
   print_diagnostics(config_obj.errors);
   process.exit(1);
}

// Compile
// allows us to access parent nodes
// const compiler_host = ts.createCompilerHost(config.options, true);

console.log("errors after program");
const program = ts.createProgram(config.fileNames, config.options, /* compiler_host */);
print_diagnostics(ts.getPreEmitDiagnostics(program));

const checker = program.getTypeChecker();

function leading_comments(node: ts.Node, sf: ts.SourceFile): string[] {
   const declaration_file = node.getSourceFile() ?? sf;
   const raw = declaration_file.getFullText();
   const start = node.getFullStart();
   const ranges = ts.getLeadingCommentRanges(raw, start);
   return ranges ? ranges.map(({pos, end}) => raw.slice(pos, end).trim()) : [];
}

function orig_decl_rec(tr: ts.TypeReferenceNode): null | ts.NamedDeclaration {
   const potential_alias = checker.getTypeFromTypeNode(tr);
   let sym = potential_alias.aliasSymbol;
   if (!sym) {
      console.log("|   orig_decl cannot get typed symbol");
      sym = checker.getSymbolAtLocation(tr.typeName);
   }
   if (!sym) {
      console.log("|   orig_decl no symbol");
      return null;
   }
   const declarations = sym.declarations;
   if (!declarations) {
      console.log("|   orig_decl no declarations");
      return null;
   }
   const [declaration] = declarations;
   if (!declaration) {
      console.log("|   orig_decl no declaration");
      return null;
   }
   return declaration;
}

function orig_decl(tr: ts.TypeReferenceNode): null | ts.TypeAliasDeclaration {
   let count = 0;
   let declaration;
   do {
      declaration = orig_decl_rec(tr);
      if (declaration === null) {
         return null;
      }
      if (count++ > 10) {
         console.log("|   orig_decl not type alias");
         return null;
      }
   } while (!ts.isTypeAliasDeclaration(declaration));

   return declaration;
}

class cc_transformer implements ts.CustomTransformer {
   static factory(ctx: ts.TransformationContext): cc_transformer {
      return new cc_transformer(ctx);
   }

   constructor (protected ctx: ts.TransformationContext) {}

   transformBundle(bundle: ts.Bundle): ts.Bundle {
      return bundle;
   }

   transformSourceFile(src: ts.SourceFile): ts.SourceFile {
      console.log(`# # # ${src.fileName}`);
      return ts.visitEachChild(src, this.routing_visitor_factory(src), this.ctx);
   }

   routing_visitor_factory(src: ts.SourceFile) {
      const unwrapping_visitor = this.unwrapping_visitor_factory(src);
      const routing_visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
         this_node_into_children: {
            if (ts.isTypeAliasDeclaration(node)) {
               if (leading_comments(node, src).includes("//! bake")) {
                  return this.baking_visitor(node);
               }
               break this_node_into_children;
            }
      
            if (ts.isTypeReferenceNode(node)) {
               console.log(node.getText());
               let orig = orig_decl(node);
               if (!orig) {
                  break this_node_into_children;
               }
               const comments = leading_comments(orig, src);
               comments.forEach(c => console.log(`|   ${c}`));
               console.log(`|   ${orig.getText()}`);
               if (!comments.includes("//! unwrap")) {
                  break this_node_into_children;
               }
               return unwrapping_visitor(node);
            }
         }

         return ts.visitEachChild(node, routing_visitor, this.ctx);
      }

      return routing_visitor;
   }

   baking_visitor(ta: ts.TypeAliasDeclaration): ts.TypeAliasDeclaration {
      const type = checker.getTypeFromTypeNode(ta.type);
      const baked_typenode = checker.typeToTypeNode(
         type,
         undefined,
         0
         | ts.NodeBuilderFlags.NoTruncation
         | ts.NodeBuilderFlags.InTypeAlias
         | ts.NodeBuilderFlags.UseFullyQualifiedType
      );
      if (baked_typenode) {
         return this.ctx.factory.updateTypeAliasDeclaration(
            ta,
            ta.modifiers,
            ta.name,
            ta.typeParameters,
            baked_typenode,
         );
      } else {
         return ta;
      }
   }

   unwrapping_visitor_factory(src: ts.SourceFile) {
      const unwrapping_visitor = (node: ts.Node): ts.Node => {
         console.log("%   unwrapping!");
         if (ts.isTypeReferenceNode(node)) {
            const orig = orig_decl(node);
            if (orig && leading_comments(orig, src).includes("//! newtype")) {
               return this.ctx.factory.createKeywordTypeNode(
                  ts.SyntaxKind.UnknownKeyword
               );
            }
            return node;
         }
         return ts.visitEachChild(node, unwrapping_visitor, this.ctx);
      }

      return unwrapping_visitor;
   }
}

let emitResult = program.emit(
   undefined,
   undefined,
   undefined,
   undefined,
   {afterDeclarations: [cc_transformer.factory]},
);

// Report errors
print_diagnostics(emitResult.diagnostics);

// Return code
let exitCode = emitResult.emitSkipped ? 1 : 0;
process.exit(exitCode);

