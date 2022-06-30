const fs = require("fs");
const ts = require("typescript");
const plugin_ts = require("@rollup/plugin-typescript");
const plugin_dts = require("rollup-plugin-dts").default;

process.chdir(__dirname);

try { fs.rmSync("bin", {recursive: true}) } catch {}

/** @param checker {ts.TypeChecker} */
function unwrapunwrapfactoryfactory(checker) {
   /** @param context {ts.TransformationContext} */
   return function unwrapunwrapfactory(context) {
      /** @param source {ts.SourceFile} */
      return function unwrapunwrap(source) {
         console.log(source.fileName);
         /** @param node {ts.Node} */
         function visitor(node) {
            if (ts.isTypeAliasDeclaration(node)) {
               const inner = node.type;
               if (ts.isTypeReferenceNode(inner)) {
                  if (inner.typeName.text === "unwrap") {
                     const computed_type = checker.getTypeFromTypeNode(inner);
                     const final_type = checker.typeToTypeNode(
                        computed_type,
                        undefined,
                        0
                        | ts.NodeBuilderFlags.NoTruncation
                        | ts.NodeBuilderFlags.InTypeAlias
                     );
                     console.log(`type ${node.name.text} = ${final_type};`);
                     return ts.factory.createTypeAliasDeclaration(
                        undefined, // decorators
                        node.modifiers,
                        node.name,
                        undefined, // type parameters
                        final_type,
                     );
                  }
               }
            }
            return ts.visitEachChild(node, visitor, context);
         }
         return ts.visitEachChild(source, visitor, context);
      };
   }
}

const config_ts = {
   input: "src/external.ts",
   output: {
      dir: "bin",
      format: "cjs",
   },
   plugins: [
      plugin_ts({
         declaration: true,
         declarationDir: "bin",
         transformers: {
            afterDeclarations: [{
               type: "checker",
               factory: unwrapunwrapfactoryfactory,
            }],
         },
      })
   ],
};

const config_dts = {
   input: "bin/external.d.ts",
   output: {
      file: "lib/newtype4.d.ts",
   },
   plugins: [plugin_dts()],
};

module.exports = [config_ts, config_dts];
