const fs = require("fs");
const stmj = require("../index.js").savetomapjson;

const json = stmj(fs.readFileSync(process.argv[2]));

const headers = Object.keys(json.tiles[0]).map(s => s + "&nbsp;&nbsp;&nbsp;");
const header = headers.join(" | ");
const line2 = headers.map(x => "---").join(" | ");

const lines = json.tiles.map(o => Object.values(o).map(b => JSON.stringify(b)).join(" | "));

const file = header + "\n" + line2 + "\n" + lines.join("\n");

fs.writeFileSync(process.argv[3], file);