describe("@esm-bundle/angular-core", () => {
  it("can load the System.register es2015 bundle", () => {
    return System.import("/base/system/es2015/angular-core.min.js");
  });
});
