const fs = require('fs');
const decompress = require("../index.js").decompress;

if (!process.argv[2]) {
  console.log("# decompress.js usage:");
  console.log("node decompress.js [filename].Civ6save");
  console.log("# outputs a file called [filename].Civ6save.bin which is a decompression of the main buffer");
  process.exit();
}

const decompressed = decompress(fs.readFileSync(process.argv[2]));

fs.writeFileSync(`${process.argv[2]}.bin`, decompressed);