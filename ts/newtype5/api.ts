import fs from "fs";
import ts from "typescript";

export type api_in<_> = unknown; //ct unwrap<_>
export type api_out<t> = t; //ct unwrap<_>

const default_compiler_options: ts.CompilerOptions = {
   emitDeclarationOnly: true,
   declaration: true,
   declarationDir: "dist/dts",
};

const read_file = name => fs.readFileSync(name, "utf8");
/** @returns {ts.CompilerOptions} */
function get_compiler_options() {
   const {config, error} = ts.readConfigFile("tsconfig.json", read_file);
   if (error != null) {
      throw new Error(error);
   }

   // if config was so great, why isn't there config 2?

   // oh.
   const config_2 = ts.parseJsonConfigFileContent(
      config,
      ts.sys, // I have no idea what this argument does
      __dirname,
      default_compiler_options,
   );

   return config_2.options;
}
