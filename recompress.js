const zlib = require('zlib');
const fs = require('fs');

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

// We need to insert an extra 4 bytes every 64 * 1024 bytes of data to indicate length of the upcoming chunk

const compressedBuffer = zlib.deflateSync(fs.readFileSync(process.argv[2]), {finishFlush: zlib.Z_SYNC_FLUSH});
const length = compressedBuffer.length;
const CHUNK_LENGTH = 64 * 1024;
const chunks = [];

for (let i = 0; i < length; i += CHUNK_LENGTH) {
  const slice = compressedBuffer.slice(i, i + CHUNK_LENGTH);
  if (i !== 0) {
    let intbuf = new Buffer(4);
    intbuf.writeInt32LE(slice.length);
    chunks.push(intbuf);
  }
  chunks.push(compressedBuffer.slice(i, i + CHUNK_LENGTH));
}

const finalBuffer = Buffer.concat(chunks);

const civsav = fs.readFileSync(process.argv[3]);

// Find the last index of MOD_TITLE string
// There are many compressed buffers in the .Civ6Save file, but the largest one and one we need
//   can be found after the last instance of this string
const modindex = civsav.lastIndexOf('MOD_TITLE');

// Hex sequence 78 9c indicates the beginning of a zlib compressed buffer, and 00 00 FF FF indicates  the end
const bufstartindex = civsav.indexOf(new Buffer([0x78, 0x9c]), modindex);
const bufendindex = civsav.lastIndexOf(new Buffer([0x00, 0x00, 0xFF, 0xFF])) + 4;

const merged = Buffer.concat([civsav.slice(0, bufstartindex), finalBuffer, civsav.slice(bufendindex)]);

// Append file extension to output file if not done manually
let name = process.argv[4];
if (name.slice(-9) !== '.Civ6Save') {
  name += '.Civ6Save';
}
fs.writeFileSync(name, merged);
