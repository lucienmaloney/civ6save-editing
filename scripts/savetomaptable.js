const fs = require("fs");
const stmj = require("../index.js").savetomapjson;
const verext = require("../index.js").verifyextension;

if (!(process.argv[2] && process.argv[3])) {
  console.log("# savetomaptable.js usage:");
  console.log("node savetomaptable.js [filename].Civ6save [htmlfilename]");
  console.log("# outputs an html file containing a table of tile data from a .Civ6Save file");
  process.exit();
}

const json = stmj(fs.readFileSync(process.argv[2]));

const headers = Object.keys(json.tiles[0]);
const header = "<tr><th>" + headers.join("</th><th>") + "</th></tr>";

const lines = json.tiles.map(o => {
  return "<tr><td>" + Object.values(o).map(b => JSON.stringify(b)).join("</td><td>") + "</td></tr>";
});

const file = `<table style="font-family: monospace;">${header}${lines.join('')}</table>`;

fs.writeFileSync(verext(process.argv[3], ".html"), file);