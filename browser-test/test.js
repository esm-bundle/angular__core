describe("@esm-bundle/angular-core", () => {
  it("can load the System.register es2022 bundle", async () => {
    const m = await System.import("/base/system/es2022/ivy/angular-core.js");
    expect(m.ApplicationRef).toBeDefined();
  });

  it("can load the System.register es2022 prod bundle", async () => {
    const m = await System.import(
      "/base/system/es2022/ivy/angular-core.min.js",
    );
    expect(m.ApplicationRef).toBeDefined();
  });
});

describe("@esm-bundle/angular-rxjs-interop", () => {
  it("can load the System.register es2022 bundle", async () => {
    const m = await System.import(
      "/base/system/es2022/ivy/angular-rxjs-interop.js",
    );
    expect(m.toSignal).toBeDefined();
  });

  it("can load the System.register es2022 prod bundle", async () => {
    const m = await System.import(
      "/base/system/es2022/ivy/angular-rxjs-interop.min.js",
    );
    expect(m.toSignal).toBeDefined();
  });
});
