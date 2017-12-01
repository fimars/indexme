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

  t.is(error.message, "path doesn't exist");
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
    `.trim()
  );
});

test("ingore", t => {
  const res = indexme(resolve("./priv"), {
    ignore: ["inner*"]
  });
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
