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
console.log("errors after program");
const program = ts.createProgram(config.fileNames, config.options);

console.log("errors after program");
print_diagnostics(ts.getPreEmitDiagnostics(program));

function should_inline(ta: ts.TypeAliasDeclaration, file: ts.SourceFile): boolean {
   const raw = file.getFullText();
   const ranges = ts.getLeadingCommentRanges(raw, ta.getFullStart());
   if (!ranges) return false;
   for (const {pos, end} of ranges) {
      const comment = raw.slice(pos, end);
      if (comment === "//! inline") {
         return true;
      }
   }
   return false;
}

type z = ts.LanguageService

const checker = program.getTypeChecker();

// comment command = cc
function cc_transformer_factory(context: ts.TransformationContext): ts.Transformer<ts.SourceFile>
{
   function bake_transformer(source: ts.SourceFile) {
      function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
         that: if (ts.isTypeReferenceNode(node)) {
            const tn = node.typeName;
            if (!tn.getText().includes("api")) {
               break that;
            }
            console.log(tn.getText());
            const s = checker.getSymbolAtLocation(tn);
            if (s) {
               type k = {[k in keyof ts.TypeAliasDeclaration]: ts.TypeAliasDeclaration[k]};
               const id = s?.declarations?.[0] as ts.TypeAliasDeclaration;
               console.log(id.name.getText());
            }
         }
         return ts.visitEachChild(node, visitor, context);
      }
      return visitor(source);
   }
}

function bake_type(tn: ts.TypeNode): ts.TypeNode {
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

function transformer(context: ts.TransformationContext) {
   return function bake(maybebundle: ts.SourceFile | ts.Bundle) {
      if (maybebundle.kind === ts.SyntaxKind.Bundle) {
         throw new Error("bundle??");
      }
      const source = maybebundle;
      function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
         that: if (ts.isTypeReferenceNode(node)) {
            const tn = node.typeName;
            if (!tn.getText().includes("api")) {
               break that;
            }
            console.log(tn.getText());
            const s = checker.getSymbolAtLocation(tn);
            if (s) {
               type k = {[k in keyof ts.TypeAliasDeclaration]: ts.TypeAliasDeclaration[k]};
               const id = s?.declarations?.[0] as ts.TypeAliasDeclaration;
               console.log(id.name.getText());
            }
         }
         if (ts.isTypeAliasDeclaration(node)) {
            //! bake
            if (should_inline(node, source)) {
               const computed_type = checker.getTypeFromTypeNode(node.type);
               const final_type = checker.typeToTypeNode(
                  computed_type,
                  undefined, // ???
                  0 // vvvvv this is where the magic happens
                  | ts.NodeBuilderFlags.NoTruncation
                  | ts.NodeBuilderFlags.InTypeAlias
                  | ts.NodeBuilderFlags.UseFullyQualifiedType
               );
               if (final_type == undefined) {
                  throw new Error("cannot bake");
               }
               process.stdout.write(`STAGE1: BAKE type ${node.name.text}\n`);
               return ts.factory.createTypeAliasDeclaration(
                  node.modifiers,
                  node.name,
                  undefined, // type parameters
                  final_type,
               );
            }
         }
         ts.transform
         return ts.visitEachChild(node, visitor, context);
      }
      return ts.visitEachChild(source, visitor, context);
   }
}

const x = {};

export const absurd = <t>(_: never): t => __unreachable();

let emitResult = program.emit(
   undefined,
   undefined,
   undefined,
   undefined,
   {before: [transformer]},
);

// Report errors
print_diagnostics(emitResult.diagnostics);

// Return code
let exitCode = emitResult.emitSkipped ? 1 : 0;
process.exit(exitCode);
