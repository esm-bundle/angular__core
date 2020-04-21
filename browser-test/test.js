describe("@esm-bundle/angular-core", () => {
  it("can load the esm es2015 bundle", () => {
    // es-module-shims
    return importShim("/base/esm/es2015/angular-core.min.js");
  });

  it("can load the esm es5 bundle", () => {
    // es-module-shims
    return importShim("/base/esm/es5/angular-core.min.js");
  });

  it("can load the System.register es2015 bundle", () => {
    return System.import("/base/system/es2015/angular-core.min.js");
  });

  it("can load the System.register es5 bundle", () => {
    return System.import("/base/system/es5/angular-core.min.js");
  });
});
