const fs = require('fs');

fs.writeFileSync("dist/mjs/package.json",
  '{"type": "module"}',
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666
  });

fs.writeFileSync("dist/cjs/package.json",
  '{"type": "commonjs"}',
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666
  });

