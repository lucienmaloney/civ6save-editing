const fs = require('fs');
const zlib = require('zlib');

if (!process.argv[2]) {
  console.log("# decompress.js usage:");
  console.log("node decompress.js [filename].Civ6save");
  console.log("# outputs a file called [filename].Civ6save.bin which is a decompression of the main buffer");
  process.exit();
}

const civsav = fs.readFileSync(process.argv[2]);
const modindex = civsav.lastIndexOf('MOD_TITLE');
const bufstartindex = civsav.indexOf(new Buffer([0x78, 0x9c]), modindex);
const bufendindex = civsav.lastIndexOf(new Buffer([0x00, 0x00, 0xFF, 0xFF]));

const data = civsav.slice(bufstartindex, bufendindex);

// drop 4 bytes away after every chunk
const chunkSize = 64 * 1024;
const chunks = [];
let pos = 0;
while (pos < data.length) {
  chunks.push(data.slice(pos, pos + chunkSize));
  pos += chunkSize + 4;
}
const compressedData = Buffer.concat(chunks);

const decompressed = zlib.inflateSync(compressedData, {finishFlush: zlib.Z_SYNC_FLUSH});

fs.writeFileSync(`${process.argv[2]}.bin`, decompressed);