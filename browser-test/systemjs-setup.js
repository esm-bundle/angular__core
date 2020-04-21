document.head.appendChild(
  Object.assign(document.createElement("script"), {
    type: "systemjs-importmap",
    textContent: `
      {
        "imports": {
          "rxjs": "//cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/rxjs.min.js",
          "rxjs/operators": "//cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/rxjs-operators.min.js"
        }
      }`,
  })
);
