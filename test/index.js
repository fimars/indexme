const test = require("ava");
const path = require("path");
const fs = require("fs");
const indexme = require("../index");

function resolve(dir) {
  return path.join(__dirname, dir);
}

test("doesn't exist dir", t => {
  const error = t.throws(_ => {
    indexme("./unknowpath");
  }, Error);

  t.is(error.message, "[Index Me] path doesn't exist: ./unknowpath");
});

test("deep=0", t => {
  const error = t.throws(_ => {
    indexme(resolve("./priv"), { deep: 0 });
  }, Error);
  t.is(error.message, "[Index Me] max_deep < 1");
});

test("indexme here", t => {
  const res = indexme(resolve("./priv"));
  t.deepEqual(
    res,
    `
- priv
  - [1.md](test/priv/1.md)
  - [2.md](test/priv/2.md)
  - [3.md](test/priv/3.md)
  - inner
    - [inner1.md](test/priv/inner/inner1.md)
    - [inner2.md](test/priv/inner/inner2.md)
  - inner2
    - [1.md](test/priv/inner2/1.md)
    `.trim()
  );
});

test("pure mode", t => {
  const res = indexme(resolve("./priv"), { mode: "pure" });
  t.deepEqual(
    res,
    `
- priv/
  1.md
  2.md
  3.md
  - inner/
    inner1.md
    inner2.md
  - inner2/
    1.md
    `.trim()
  );
});

test("tree mode", t => {
  const res = indexme(resolve("./priv"), { mode: "tree" });
  t.deepEqual(
    res,
    `
└── priv
    ├── 1.md
    ├── 2.md
    ├── 3.md
    ├── inner
    │   ├── inner1.md
    │   └── inner2.md
    └── inner2
        └── 1.md
  `.trim()
  );
});

test("deep=1", t => {
  const res = indexme(resolve("./priv"), { deep: 1, mode: "tree" });
  t.deepEqual(
    res,
    `
└── priv
    ├── 1.md
    ├── 2.md
    ├── 3.md
    ├── inner
    └── inner2
    `.trim()
  );
});

test("ingore inner*", t => {
  const res = indexme(resolve("./priv"), { ignore: ["inner*"], deep: 10 });
  t.deepEqual(
    res,
    `
- priv
  - [1.md](test/priv/1.md)
  - [2.md](test/priv/2.md)
  - [3.md](test/priv/3.md)
`.trim()
  );
});

test("ingore *.md", t => {
  const res = indexme(resolve("./priv"), { ignore: ["*.md"], deep: 10 });
  t.deepEqual(
    res,
    `
- priv
  - inner
  - inner2
`.trim()
  );
});
