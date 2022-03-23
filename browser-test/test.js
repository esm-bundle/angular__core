describe("@esm-bundle/angular-core", () => {
  it("can load the System.register es2015 bundle", async () => {
    const m = await System.import(
      "/base/system/es2015/ivy/angular-core.min.js"
    );
    expect(m.ApplicationRef).toBeDefined();
  });

  it("can load the System.register es2020 bundle", async () => {
    const m = await System.import(
      "/base/system/es2020/ivy/angular-core.min.js"
    );
    expect(m.ApplicationRef).toBeDefined();
  });
});
