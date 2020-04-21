document.head.appendChild(
  Object.assign(document.createElement("script"), {
    type: "importmap-shim",
    textContent: `
      {
        "imports": {
          "rxjs": "//cdn.jsdelivr.net/npm/@esm-bundle/rxjs/esm/rxjs.min.js",
          "rxjs/operators": "//cdn.jsdelivr.net/npm/@esm-bundle/rxjs/esm/rxjs-operators.min.js"
        }
      }`,
  })
);
