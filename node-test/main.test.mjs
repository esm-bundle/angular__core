describe("@esm-bundle/angular-core", () => {
  it("can load the esm es2015 bundle without dying", () => {
    return import("../esm/es2015/angular-core.min.js");
  });

  it("can load the esm es5 bundle without dying", () => {
    return import("../esm/es5/angular-core.min.js");
  });
});
