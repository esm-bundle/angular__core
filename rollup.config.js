import { join } from "path";
import { terser } from "rollup-plugin-terser";
import packageJson from "@angular/core/package.json";

export default [
  ...["2015", "2020"]
    .map((ecma) => [
      createConfig({ ecma, prod: false, format: "system" }),
      createConfig({ ecma, prod: true, format: "system" }),
      createConfig({ ecma, prod: false, format: "es" }),
      createConfig({ ecma, prod: true, format: "es" }),
    ])
    .flat(),
];

function createConfig({ ecma, prod, format }) {
  const dir = (format === "es" ? "." : format) + `/es${ecma}/ivy`;

  return {
    input: join(__dirname, `node_modules/@angular/core/fesm${ecma}/core.mjs`),
    output: {
      file: `${dir}/angular-core.${prod ? "min." : ""}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - @angular/core@${packageJson.version} - Ivy - ${format} format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      prod &&
        terser({
          format: {
            ecma,
            comments: /esm-bundle/,
          },
        }),
    ],
    external: ["rxjs", "rxjs/operators"],
  };
}
