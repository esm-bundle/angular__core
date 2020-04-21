import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

function createConfig(format, target, minify) {
  let dir = format === "module" ? "esm" : format;
  dir += `/${target}`;

  return {
    input: `./src/${target}/angular-core.js`,
    output: {
      file: `${dir}/angular-core${minify ? ".min" : ""}.js`,
      sourcemap: true,
      format,
      banner: `/* @angular/core@${packageJson.version} */`,
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      minify &&
        terser({
          output: {
            comments: /@angular\/core@/,
          },
        }),
    ],
    external: ["rxjs", "rxjs/operators"],
  };
}

export default [
  createConfig("module", "es5", true),
  createConfig("module", "es5", false),
  createConfig("module", "es2015", true),
  createConfig("module", "es2015", false),
  createConfig("system", "es5", true),
  createConfig("system", "es5", false),
  createConfig("system", "es2015", true),
  createConfig("system", "es2015", false),
];
