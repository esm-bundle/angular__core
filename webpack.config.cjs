const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const path = require("path");

module.exports = [
  createConfig(true),
  createConfig(false),
];

function createConfig(isProduction) {
  const entryModule = require.resolve('@angular/core/fesm2015/core.js')
  return {
    entry: entryModule,
    mode: isProduction ? "production" : 'development',
    output: {
      path: path.resolve(__dirname, `system/es2015`),
      filename: `angular-core.${isProduction ? 'min.' : ''}js`,
      libraryTarget: "system",
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /.*\.js$/,
          exclude: /node_modules/,
          loader: '@ngtools/webpack'
        }
      ],
    },
    plugins: [
      new AngularCompilerPlugin({
        skipCodeGeneration: false,
        sourceMap: true,
        tsConfigPath: path.resolve(__dirname, `tsconfig.es2015.json`),
        entryModule,
      }),
    ],
    externals: ['@angular/common', '@angular/router', '@angular/platform-browser', /^rxjs\/?.*$/]
  };
}
