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
function cc_trans_factory(ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile>
{
   ctx.factory.createTypeReferenceNode
   function cc_trans(src: ts.SourceFile): ts.SourceFile {
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
         return ts.visitEachChild(node, visitor, ctx);
      }
      return ts.visitEachChild(src, visitor, ctx);
   }
   return cc_trans;
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

export enum SyntaxTypeishKind {
   NumericLiteral = 8,
   BigIntLiteral = 9,
   StringLiteral = 10,
   NoSubstitutionTemplateLiteral = 14,

   // only with type query
   // Identifier = 79,
   // PrivateIdentifier = 80,
   FalseKeyword = 95,
   NullKeyword = 104,
   // thistype instead
   // ThisKeyword = 108,
   TrueKeyword = 110,
   // typequery instead
   // TypeOfKeyword = 112,
   VoidKeyword = 114,
   WhileKeyword = 115,
   AnyKeyword = 131,
   BooleanKeyword = 134,
   // use conditional type & infertype
   // InferKeyword = 138,
   IntrinsicKeyword = 139,
   // use type predicate instead
   // IsKeyword = 140,
   // use mapped type instead
   // KeyOfKeyword = 141,
   NeverKeyword = 144,
   // OutKeyword = 145,
   // use type operator instead
   // ReadonlyKeyword = 146,
   NumberKeyword = 148,
   ObjectKeyword = 149,
   StringKeyword = 152,
   SymbolKeyword = 153,
   // can't have type within type
   // TypeKeyword = 154,
   UndefinedKeyword = 155,
   UniqueKeyword = 156,
   UnknownKeyword = 157,
   BigIntKeyword = 160,
   QualifiedName = 163,
   // ComputedPropertyName = 164,
   // etc t<x>
   TypeParameter = 165,
   Parameter = 166,
   Decorator = 167,
   PropertySignature = 168,
   MethodSignature = 170,
   CallSignature = 176,
   ConstructSignature = 177,
   IndexSignature = 178,
   TypePredicate = 179,
   TypeReference = 180,
   FunctionType = 181,
   ConstructorType = 182,
   TypeQuery = 183, // typeof
   TypeLiteral = 184,
   ArrayType = 185,
   TupleType = 186,
   OptionalType = 187,
   RestType = 188,
   UnionType = 189,
   IntersectionType = 190,
   ConditionalType = 191,
   InferType = 192,
   ParenthesizedType = 193,
   ThisType = 194,
   TypeOperator = 195,
   IndexedAccessType = 196,
   MappedType = 197,
   LiteralType = 198,
   NamedTupleMember = 199,
   TemplateLiteralType = 200,
   TemplateLiteralTypeSpan = 201,
   ImportType = 202,
   // UnparsedSyntheticReference = 307,
   SourceFile = 308,
}

const tf = ts.TypeFlags;

function shallow_unwrap(otn: ts.TypeNode): ts.TypeNode {
   const typ = checker.getTypeFromTypeNode(otn);

   if (!(typ.flags & tf.Intersection)) {
      return otn;
   }

   const rewrite = checker.typeToTypeNode(
      typ,
      undefined, // enclosingDelcaration
      ts.NodeBuilderFlags.UseFullyQualifiedType
   )

   if (rewrite === undefined) {
      console.log(`Failure mode. Couldn't write type for ${otn.getText()}`);
      return otn;
   }

   // next, find the side of the intersection that has the unique part 
}

function unwrap_type(otn: ts.TypeNode): ts.TypeNode {
   const typ = checker.getTypeFromTypeNode(otn);

   // special types
   if (typ.flags & tf.Any) {
      return otn;
   }
   if (typ.flags & tf.Unknown) {
      return otn;
   }
   if (typ.flags & tf.Never) {
      return otn;
   }

   // any single value
   if (typ.flags & tf.Unit) {
      return otn;
   }

   // primitive types
   if (!(typ.flags & tf.NonPrimitive)) {
      return otn;
   }

   const ntn = checker.typeToTypeNode(
      typ,
      undefined, // enclosingDelcaration
      ts.NodeBuilderFlags.UseFullyQualifiedType,
   );

   if (ntn == null) {
      console.log(`Failure mode. Couldn't write type for ${otn.getText()}`);
      return otn;
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

