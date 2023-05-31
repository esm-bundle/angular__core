describe("@esm-bundle/angular-core", () => {
  it("can load the System.register es2022 bundle", async () => {
    const m = await System.import(
      "/base/system/es2022/ivy/angular-core.min.js"
    );
    expect(m.ApplicationRef).toBeDefined();
  });
});
