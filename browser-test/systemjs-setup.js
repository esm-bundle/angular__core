document.head.appendChild(
  Object.assign(document.createElement("script"), {
    type: "systemjs-importmap",
    textContent: `
      {
        "imports": {
          "rxjs": "//cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/rxjs.min.js",
          "rxjs/operators": "//cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/rxjs-operators.min.js",
          "@angular/core/primitives/signals": "/base/system/es2022/ivy/angular-signals.min.js",
          "@angular/core": "/base/system/es2022/ivy/angular-core.min.js"
        }
      }`,
  }),
);
