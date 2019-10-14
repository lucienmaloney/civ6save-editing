const fs = require('fs');
const modify = require("../index.js").modify;
const versav = require("../index.js").verifyextension;

if (!(process.argv[2] && process.argv[3])) {
  console.log("# reavealmap.js usage:");
  console.log("node revealmap.js [filename].Civ6save [newfilename]");
  console.log("# outputs a file called [newfilename].Civ6save which has the full map revealed for player 1");
  process.exit();
}

const oldsave = fs.readFileSync(process.argv[2]);

const newsave = modify(oldsave, bin => {
  const searchbuffer = Buffer.from([0xEF, 0xFB, 0x5B, 0x06, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00]);
  const baseindex = bin.indexOf(searchbuffer);
  const tiles = bin.readInt32LE(baseindex + 33);
  for (let i = 0; i < tiles; i++) {
    bin[i + baseindex + 37] = 0x01;
  }
  return bin;
});

fs.writeFileSync(versav(process.argv[3]), newsave);