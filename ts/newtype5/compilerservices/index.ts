import fs from "fs";
import ts, {factory} from "typescript";
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
const compiler_host = ts.createCompilerHost(config.options, true);

console.log("errors after program");
const program = ts.createProgram(config.fileNames, config.options, compiler_host);
print_diagnostics(ts.getPreEmitDiagnostics(program));

const checker = program.getTypeChecker();

let nt_symbol: ts.TypeAliasDeclaration | null = null;

function leading_comments(node: ts.Node): string[] {
   const declaration_file = node.getSourceFile();
   const raw = declaration_file.getFullText();
   const start = node.getFullStart();
   const ranges = ts.getLeadingCommentRanges(raw, start);
   return ranges ? ranges.map(({pos, end}) => raw.slice(pos, end)) : [];
}



// comment command = cc
function cc_trans_factory(ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile>
{
   function unwrapping_visitor(node: ts.Node): ts.Node {
      if (ts.isTypeReferenceNode(node)) then: {
         const computed_type = checker.getTypeFromTypeNode(node);
         if (computed_type.aliasSymbol == null) {
            return node;
         }
         const sym = computed_type.aliasSymbol;
         if (sym.declarations == null) {
            return node;
         }
         const [declaration] = sym.declarations;
         if (declaration == null) {
            return node;
         }
         if (!ts.isTypeAliasDeclaration(declaration)) {
            return node;
         }

         if (!leading_comments(declaration).includes("//! newtype")) {
            return node;
         }

         return ctx.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword);
      }
      return ts.visitEachChild(node, unwrapping_visitor, ctx);
   }

   function cc_trans(src: ts.SourceFile): ts.SourceFile {
      function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
         if (ts.isTypeReferenceNode(node)) then: {
            const computed_type = checker.getTypeFromTypeNode(node);
            console.log(node.getText());
            if (computed_type.aliasSymbol == null) {
               console.log("|  not alias symbol");
               return node;
            }
            const sym = computed_type.aliasSymbol;
            if (sym.declarations == null) {
               console.log("|  no declarations");
               return node;
            }
            const [declaration] = sym.declarations;
            if (declaration == null) {
               console.log("|  no declaration");
               return node;
            }
            if (!ts.isTypeAliasDeclaration(declaration)) {
               console.log("|  not a type alias");
               return node;
            }
            console.log(`!  ${declaration.getText()}`);

            const declaration_file = declaration.getSourceFile();
            const raw = declaration_file.getFullText();
            const start = declaration.getFullStart();
            const ranges = ts.getLeadingCommentRanges(raw, start);
            if (!ranges) {
               console.log("!  no leading comments");
               return node;
            }

            const comments = ranges.map(({pos, end}) => raw.slice(pos, end));
            if (comments.every(comment => comment !== "//! newtype")) {
               return node;
            }

            return ctx.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword);
         }
         return ts.visitEachChild(node, visitor, ctx);
      }
      return ts.visitEachChild(src, visitor, ctx);
   }
   return cc_trans;
}

function bake_typereal(tn: ts.TypeNode): ts.TypeNode {
   const computed_type = checker.getTypeFromTypeNode(tn);
   const baked_type = checker.typeToTypeNode(
      computed_type,
      undefined, // ???
      0 // vvvvv this is where the magic happens
      | ts.NodeBuilderFlags.NoTruncation
      | ts.NodeBuilderFlags.InTypeAlias
      | ts.NodeBuilderFlags.UseFullyQualifiedType
   );
   if (baked_type) {
      return baked_type;
   } else {
      console.error(`Could not bake ${tn.getText()}`);
      return tn;
   }
}

let emitResult = program.emit(
   undefined,
   undefined,
   undefined,
   undefined,
   {afterDeclarations: [cc_trans_factory as never]},
);

// Report errors
print_diagnostics(emitResult.diagnostics);

// Return code
let exitCode = emitResult.emitSkipped ? 1 : 0;
process.exit(exitCode);

