const fs = require('fs');
const modifytiles = require("../index.js").modifytiles;
const versav = require("../index.js").verifyextension;

if (!(process.argv[2] && process.argv[3])) {
  console.log("# roadsonalltiles.js usage:");
  console.log("node roadsonalltiles.js [filename].Civ6save [newfilename]");
  console.log("# outputs a file called [newfilename].Civ6save which has modern-level roads placed on every tile");
  process.exit();
}

const oldsave = fs.readFileSync(process.argv[2]);

const newsave = modifytiles(oldsave, tilebuf => {
  tilebuf.writeInt8(3, 38);
  return tilebuf;
});

fs.writeFileSync(versav(process.argv[3]), newsave);