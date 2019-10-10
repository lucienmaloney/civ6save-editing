const fs = require('fs');
const modify = require("../index.js").modify;
const versav = require("../index.js").verifysavextension;

if (!(process.argv[2] && process.argv[3])) {
  console.log("# decompress.js usage:");
  console.log("node decompress.js [filename].Civ6save [newfilename]");
  console.log("# outputs a file called [newfilename].Civ6save which has the full map revealed for player 1");
  process.exit();
}

const oldsave = fs.readFileSync(process.argv[2]);

const newsave = modify(oldsave);

fs.writeFileSync(versav(process.argv[3]), newsave);