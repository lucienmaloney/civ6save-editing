const fs = require('fs');
const recompress = require("../index.js").recompress;
const versav = require("../index.js").verifyextension;

if (!(process.argv[2] && process.argv[3] && process.argv[4])) {
  console.log("# recompress.js usage:");
  console.log("node recompress.js [filename].Civ6save.bin [filename].Civ6save [outputfilename]");
  console.log("# First run the decompressor to create a .bin file out of the .Civ6Save");
  console.log("# You can then edit this file any way you like");
  console.log("# Combine the files with the recompressor to merge the edited .bin file back into the .Civ6Save");
  console.log("# The new .Civ6Save file will have the [outputfilename]");
  console.log("# You can include the .Civ6Save extension in the [outputfilename] manually, or let it be added automatically");
  process.exit();
}

const bin = fs.readFileSync(process.argv[2]);
const save = fs.readFileSync(process.argv[3]);

fs.writeFileSync(versav(process.argv[4]), recompress(save, bin));