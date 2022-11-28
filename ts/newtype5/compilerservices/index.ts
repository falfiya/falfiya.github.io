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

const configFileName = process.argv[2];

if (configFileName == null) {
   throw new Error("need argument for tsconfig.json");
}

let config: ts.ParsedCommandLine;
{
   // Read config file
   const configFileText = fs.readFileSync(configFileName, "utf8");

   // Parse JSON, after removing comments. Just fancier JSON.parse
   // it wants the filename so that it can generate diagnostics for it
   const result = ts.parseConfigFileTextToJson(configFileName, configFileText);
   if (result.error) {
      print_diagnostics([result.error]);
      process.exit(1);
   }

   // Extract config infromation
   const configParseResult = ts.parseJsonConfigFileContent(
      result.config,
      ts.sys,
      dirname(configFileName),
   );
   if (configParseResult.errors.length > 0) {
      print_diagnostics(configParseResult.errors);
      process.exit(1);
   }
   config = configParseResult;
}

// Compile
let program = ts.createProgram(config.fileNames, config.options);

print_diagnostics(ts.getPreEmitDiagnostics(program));


function is_bakeable(ta: ts.TypeAliasDeclaration, file: ts.SourceFile): boolean {
   // return false;
   const raw = file.getFullText();
   const ranges = ts.getLeadingCommentRanges(raw, ta.getFullStart());
   if (ranges) {}
   else {
      return false;
   }
   for (const {pos, end} of ranges) {
      const comment = raw.slice(pos, end);
      if (comment === "//! newtype5::bake") {
         return true;
      }
   }
   return false;
}

const checker = program.getTypeChecker();

// make_baker :: ts.TransformationContext -> 
function make_baker(context: ts.TransformationContext) {
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
               const id = s?.declarations?.[0] as ts.TypeAliasDeclaration;
               console.log(id.name.getText());
            }
         }
         if (ts.isTypeAliasDeclaration(node)) {
            if (is_bakeable(node, source)) {
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
         return ts.visitEachChild(node, visitor, context);
      }
      return ts.visitEachChild(source, visitor, context);
   }
}

let emitResult = program.emit(
   undefined,
   undefined,
   undefined,
   undefined,
   {before: [make_baker]},
);

// Report errors
print_diagnostics(emitResult.diagnostics);

// Return code
let exitCode = emitResult.emitSkipped ? 1 : 0;
process.exit(exitCode);
