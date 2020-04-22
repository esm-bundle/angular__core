import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

function createConfig({ format, target, minify, resolvedRxjs }) {
  let dir = format === "module" ? "esm" : format;
  dir += `/${target}`;

  return {
    input: `./src/${target}/angular-core.js`,
    output: {
      file: `${dir}/angular-core${resolvedRxjs ? ".resolved" : ""}${
        minify ? ".min" : ""
      }.js`,
      sourcemap: true,
      format,
      banner: `/* @angular/core@${packageJson.version} */`,
      paths: {
        rxjs: resolvedRxjs
          ? `https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs@${resolvedRxjs}/esm/${target}/rxjs.min.js`
          : "rxjs",
        "rxjs/operators": resolvedRxjs
          ? `https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs@${resolvedRxjs}/esm/${target}/rxjs-operators.min.js`
          : "rxjs/operators",
      },
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

export default () => {
  const rxjsDep = packageJson.devDependencies["rxjs"];
  const resolvedRxjs = rxjsDep.slice(rxjsDep.lastIndexOf("@") + 1);

  return [
    createConfig({
      format: "module",
      target: "es5",
      minify: true,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: false,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: true,
      resolvedRxjs: false,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: false,
      resolvedRxjs: false,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: true,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: false,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: true,
      resolvedRxjs: false,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: false,
      resolvedRxjs: false,
    }),
    createConfig({ format: "system", target: "es5", minify: true }),
    createConfig({ format: "system", target: "es5", minify: false }),
    createConfig({ format: "system", target: "es2015", minify: true }),
    createConfig({ format: "system", target: "es2015", minify: false }),
  ];
};
