import fs from "fs";
import ts from "typescript";
import {dirname} from "path";

const IGNORED: string[] = [
   'out', 'version', 'help', 'emitDeclarationOnly',
   'watch', 'declaration', 'declarationDir', 'declarationMap', 'mapRoot',
   'sourceMap', 'inlineSources', 'removeComments', 'incremental',
   'tsBuildInfoFile',
];

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

function leading_comments(node: ts.Node, sf: ts.SourceFile): string[] {
   const declaration_file = node.getSourceFile() ?? sf;
   const raw = declaration_file.getFullText();
   const start = node.getFullStart();
   const ranges = ts.getLeadingCommentRanges(raw, start);
   ts.get
   return ranges ? ranges.map(({pos, end}) => raw.slice(pos, end).trim()) : [];
}

function get_export(mod: ts.Symbol | undefined, id: ts.Identifier): ts.Symbol | null {
   if (!mod) {
      return null;
   }
   if (!mod.exports) {
      return null;
   }
   const res_export = mod.exports.get(id.escapedText);
   if (!res_export) {
      return null;
   }
   return res_export;
}

function get_declarations(s: ts.Symbol | undefined): ts.Declaration[] {
   if (!s) {
      return [];
   }
   if (!s.declarations) {
      return [];
   }
   return s.declarations;
}

namespace get_origin_type_aliases {
   export function type_direct_method(t: ts.Type): ts.TypeAliasDeclaration[] {
      return get_declarations(t.aliasSymbol)
         .filter(d => ts.isTypeAliasDeclaration(d)) as ts.TypeAliasDeclaration[];
   }

   export function symbol_recursive_method(s: ts.Symbol | undefined | null): ts.TypeAliasDeclaration[] {
      if (!s) {
         return [];
      }
      return get_declarations(s).flatMap(d => {
         if (ts.isTypeAliasDeclaration(d)) {
            return d;
         }
         if (ts.isImportSpecifier(d)) {
            const actual_identifier = d.propertyName ?? d.name;
            const named_imports = d.parent;
            const import_clause = named_imports.parent;
            const import_declaration = import_clause.parent;
            const module_pointer = import_declaration.moduleSpecifier;
            const module_symbol = checker.getSymbolAtLocation(module_pointer);
            const export_symbol = get_export(module_symbol, actual_identifier);
            return symbol_recursive_method(export_symbol);
         }
         if (ts.isImportEqualsDeclaration(d)) {
            const ref = d.moduleReference;
            if (!ts.isQualifiedName(ref)) {
               return [];
            }
            const {left, right} = ref;
            const module_symbol = checker.getSymbolAtLocation(left);
            const export_symbol = get_export(module_symbol, right);
            return symbol_recursive_method(export_symbol);
         }
         return [];
      })
   }
}

let ident = 0;

function log(s: string) {
   console.log(`${String(ident).padStart(2)} ${' '.repeat(ident)}|${s}`);
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
      console.log(`$$$ ${src.fileName}`);
      return ts.visitEachChild(src, this.routing_visitor_factory(src), this.ctx);
   }

   routing_visitor_factory(src: ts.SourceFile) {
      const unwrapping_visitor = this.unwrapping_visitor_factory(src);
      const routing_visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
         ident++;
         this_node_into_children: {
            if (ts.isTypeAliasDeclaration(node)) {
               if (leading_comments(node, src).includes("//! bake")) {
                  const temp = this.baking_visitor(node);
                  ident--;
                  return temp;
               }
               break this_node_into_children;
            }

            if (ts.isTypeReferenceNode(node)) {
               // dumb method
               log(node.getText());
               const typ = checker.getTypeFromTypeNode(node);
               const tdm_origin = get_origin_type_aliases.type_direct_method(typ);
               for (const orgn of tdm_origin) {
                  const comments = leading_comments(orgn, src);
                  if (comments.includes("//! newtype")) {
                     return this.ctx.factory.createKeywordTypeNode(
                        ts.SyntaxKind.UnknownKeyword
                     );
                  }
                  if (comments.includes("//! unwrap")) {
                     return node.typeArguments || node;
                  }
               }
               log("   node failed type directed method");
               const sym = checker.getSymbolAtLocation(node.typeName);
               const srm_origin = get_origin_type_aliases.symbol_recursive_method(sym);
               for (const orgn of srm_origin) {
                  const comments = leading_comments(orgn, src);
                  if (comments.includes("//! newtype")) {
                     return this.ctx.factory.createKeywordTypeNode(
                        ts.SyntaxKind.UnknownKeyword
                     );
                  }
                  if (comments.includes("//! unwrap")) {
                     return node.typeArguments || node;
                  }
               }
               /*
               log(node.getText());
               const typ = checker.getTypeFromTypeNode(node);
               const tdm_origin = get_origin_type_aliases.type_direct_method(typ);
               for (const orgn of tdm_origin) {
                  const comments = leading_comments(orgn, src);
                  if (comments.includes("//! unwrap")) {
                     const temp = unwrapping_visitor(node); // <-- found one!
                     ident--;
                     return temp;
                  }
               }
               log("   node failed type directed method");
               const sym = checker.getSymbolAtLocation(node.typeName);
               const srm_origin = get_origin_type_aliases.symbol_recursive_method(sym);
               for (const orgn of srm_origin) {
                  const comments = leading_comments(orgn, src);
                  if (comments.includes("//! unwrap")) {
                     const temp = unwrapping_visitor(node); // <-- found one!
                     ident--;
                     return temp;
                  }
               }
               */
            }
            break this_node_into_children;
         }

         const temp = ts.visitEachChild(node, routing_visitor, this.ctx);
         ident--;
         return temp;
      }

      ident--;
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
         ident++;
         if (ts.isTypeReferenceNode(node)) {
            log(`unwrapping ${node.getText()}`);
            const typ = checker.getTypeFromTypeNode(node);
            const tdm_origin = get_origin_type_aliases.type_direct_method(typ);
            for (const orgn of tdm_origin) {
               const comments = leading_comments(orgn, src);
               if (comments.includes("//! newtype")) {
                  ident--;
                  log("replaced with unknown");
                  return this.ctx.factory.createKeywordTypeNode(
                     ts.SyntaxKind.UnknownKeyword
                  );
               }
            }
            log("no tdm");
            const sym = checker.getSymbolAtLocation(node.typeName);
            const srm_origin = get_origin_type_aliases.symbol_recursive_method(sym);
            for (const orgn of srm_origin) {
               const comments = leading_comments(orgn, src);
               if (comments.includes("//! newtype")) {
                  ident--;
                  log("replaced with unknown");
                  return this.ctx.factory.createKeywordTypeNode(
                     ts.SyntaxKind.UnknownKeyword
                  );
               }
            }
            log("nothing");
            const temp = ts.visitEachChild(node, unwrapping_visitor, this.ctx);
            ident--;
            return temp;
         }
         log(`not even a typereferencenode ${node.kind}`);
         const temp = ts.visitEachChild(node, unwrapping_visitor, this.ctx);
         ident--;
         return temp;
      }
      const extracting_visitor = (node: ts.TypeReferenceNode): ts.Node => {
         ident++;
         if (!node.typeArguments) {
            log("should type arguments");
            ident--;
            return node;
         }
         const [arg] = node.typeArguments
         if (!arg) {
            log("missing type argument");
            ident--;
            return node;
         }
         const typ = checker.getTypeFromTypeNode(node);
         const generated = checker.typeToTypeNode(
            typ,
            undefined, 0
            | ts.NodeBuilderFlags.NoTruncation
            | ts.NodeBuilderFlags.UseFullyQualifiedType
            | ts.NodeBuilderFlags.WriteTypeParametersInQualifiedName
            | ts.NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope
         );
         if (!generated) {
            ident--;
            return node;
         }
         const temp = ts.visitEachChild(generated, unwrapping_visitor, this.ctx);
         ident--;
         return temp;
      };

      return extracting_visitor;
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

