const fs = require("fs");
const stmj = require("../index.js").savetomapjson;

const json = stmj(fs.readFileSync(process.argv[2]));

// WIP

fs.writeFileSync(process.argv[3], json);