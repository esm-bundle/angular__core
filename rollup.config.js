import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

function createConfig(format, target) {
  let dir = format === "module" ? "esm" : format;
  dir += `/${target}`;

  const angularCoreDir = target === "es2015" ? "fesm2015" : "fesm5";

  return {
    input: `./src/${target}/angular-core.js`,
    output: {
      file: `${dir}/angular-core.min.js`,
      sourcemap: true,
      format,
      banner: `/* @angular/core@${packageJson.version} */`,
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      // terser({
      //   output: {
      //     comments: /@angular\/core@/,
      //   },
      // }),
    ],
    external: ["rxjs", "rxjs/operators"],
  };
}

export default [
  createConfig("module", "es5"),
  createConfig("module", "es2015"),
  createConfig("system", "es5"),
  createConfig("system", "es2015"),
];
