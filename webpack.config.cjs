const AotPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const path = require("path");

module.exports = [
  // angular 11 doesn't support IE11
  // createConfig('esm5'),
  createConfig("esm2015"),
];

function createConfig(type) {
  const entryModule = require.resolve(`@angular/core/f${type}/core.js`);

  return {
    entry: entryModule,
    mode: "production",
    output: {
      path: path.resolve(__dirname, `system/${type}`),
      filename: `angular-core.min.js`,
      libraryTarget: "system",
    },
    plugins: [
      new AotPlugin({
        skipCodeGeneration: false,
        tsConfigPath: path.resolve(__dirname, `tsconfig.${type}.json`),
        entryModule,
      }),
    ],
  };
}
