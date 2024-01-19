import fs from "fs";
import url from "url";
import path from "path";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { createEs2015LinkerPlugin } from "@angular/compiler-cli/linker/babel";
import {
  ConsoleLogger,
  NodeJSFileSystem,
  LogLevel,
} from "@angular/compiler-cli";

const __dirname = new url.URL(".", import.meta.url).pathname;
const packageJson = JSON.parse(
  fs
    .readFileSync(
      path.resolve(__dirname, "node_modules/@angular/core/package.json"),
    )
    .toString(),
);

/** File system used by the Angular linker plugin. */
const fileSystem = new NodeJSFileSystem();
/** Logger used by the Angular linker plugin. */
const logger = new ConsoleLogger(LogLevel.info);
/**
 * The linker plugin is used to make output files AOT compatible, so they don't
 * require the `@angular/compiler` at runtime.
 */
const linkerPlugin = createEs2015LinkerPlugin({
  fileSystem,
  logger,
  linkerJitMode: false,
});

const packages = ["2022"]
  .map((ecma) => [
    {
      ecma,
      angularPackage: "@angular/core/primitives/signals",
      filename: "signals",
      filepath: `primitives`,
    },
    {
      ecma,
      angularPackage: "@angular/core",
      filename: "core",
    },
    {
      ecma,
      angularPackage: "@angular/core/rxjs-interop",
      filename: "rxjs-interop",
    },
  ])
  .flat();

export default packages
  .map(({ ecma, angularPackage, filename, filepath }) => [
    createConfig({
      ecma,
      prod: false,
      format: "system",
      angularPackage,
      filename,
      filepath,
    }),
    createConfig({
      ecma,
      prod: true,
      format: "system",
      angularPackage,
      filename,
      filepath,
    }),
    createConfig({
      ecma,
      prod: false,
      format: "es",
      angularPackage,
      filename,
      filepath,
    }),
    createConfig({
      ecma,
      prod: true,
      format: "es",
      angularPackage,
      filename,
      filepath,
    }),
  ])
  .flat();

function createConfig({
  ecma,
  prod,
  format,
  angularPackage,
  filename,
  filepath,
}) {
  const dir = (format === "es" ? "." : format) + `/es${ecma}/ivy`;

  return {
    input: path.join(
      __dirname,
      `${[`node_modules/@angular/core/fesm${ecma}`, filepath, filename].filter((nonnull) => nonnull).join("/")}.mjs`,
    ),
    output: {
      file: `${dir}/angular-${filename}.${prod ? "min." : ""}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - ${angularPackage}@${packageJson.version} - Ivy - ${format} format - es${ecma} - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      babel({ plugins: [linkerPlugin] }),
      prod &&
        terser({
          format: {
            ecma,
            comments: /esm-bundle/,
          },
          compress: {
            global_defs: {
              ngJitMode: false,
              ngDevMode: false,
              ngI18nClosureMode: false,
            },
          },
        }),
    ],
    external: [
      "rxjs",
      "rxjs/operators",
      "@angular/core/primitives/signals",
      "@angular/core",
    ],
  };
}
