const zlib = require('zlib');

/**
 * Output a decompressed buffer from the primary zlib zip of the .Civ6Save file
 * @param {Buffer} savefile
 * @return {Buffer} decompressed
 */
function decompress(savefile) {
  const civsav = savefile;
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

  return decompressed;
}

/**
 * Output a .Civ6Save buffer built from an existing .Civ6Save buffer and a decompressed bin buffer
 * @param {Buffer} savefile
 * @param {Buffer} binfile
 * @return {Buffer} newsave
 */
function recompress(savefile, binfile) {
  // We need to insert an extra 4 bytes every 64 * 1024 bytes of data to indicate length of the upcoming chunk

  const compressedBuffer = zlib.deflateSync(binfile, {finishFlush: zlib.Z_SYNC_FLUSH});
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

  const civsav = savefile;

  // Find the last index of MOD_TITLE string
  // There are many compressed buffers in the .Civ6Save file, but the largest one and one we need
  //   can be found after the last instance of this string
  const modindex = civsav.lastIndexOf('MOD_TITLE');

  // Hex sequence 78 9c indicates the beginning of a zlib compressed buffer, and 00 00 FF FF indicates  the end
  const bufstartindex = civsav.indexOf(new Buffer([0x78, 0x9c]), modindex);
  const bufendindex = civsav.lastIndexOf(new Buffer([0x00, 0x00, 0xFF, 0xFF])) + 4;

  const merged = Buffer.concat([civsav.slice(0, bufstartindex), finalBuffer, civsav.slice(bufendindex)]);

  return merged;
}

/**
 * Take in a .Civ6Save file, decompress it into a bin, run a callback on the bin, and recombine and return a new save
 * @param {Buffer} savefile
 * @return {Buffer} newsavefile
 */
function modify(savefile, callback = (x => x)) {
  const bin = decompress(savefile);
  const moddedbin = callback(bin);
  return recompress(savefile, moddedbin);
}

/**
 * If there isn't a .Civ6Save file extension on the file name, add it
 * @param {string} filename
 * @return {string} newfilename
 */
function verifysavextension(filename) {
  if (filename.slice(-9) !== '.Civ6Save') {
    return filename + '.Civ6Save';
  }
  return filename;
}

function savetomapjson(savefile) {
  const mapsizedata = {
    '1144': {x: 44, y: 26},
    '2280': {x: 60, y: 38},
    '3404': {x: 74, y: 46},
    '4536': {x: 84, y: 54},
    '5760': {x: 96, y: 60},
    '6996': {x: 106, y: 66},
  }

  const bin = decompress(savefile);
  const searchBuffer = new Buffer([0x0E, 0x00, 0x00, 0x00, 0x0F, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00]);
  const mapstartindex = bin.indexOf(searchBuffer);
  const tiles = bin.readInt32LE(mapstartindex + 12);
  const map = {'tiles': []};
  let mindex = mapstartindex + 16;

  for (let i = 0; i < tiles; i++) {
    map.tiles.push({
      'x': i % mapsizedata[tiles].x,
      'y': Math.floor(i / mapsizedata[tiles].x),
      'int16-1': bin.readInt16LE(mindex),
      'int16-2': bin.readInt16LE(mindex + 2),
      'int16-3': bin.readInt16LE(mindex + 4),
      'int16-4': bin.readInt16LE(mindex + 6),
      'landmass index?': bin.readInt16LE(mindex + 8),
      'landmass index + 1?': bin.readInt16LE(mindex + 10),
      'terrain type?': bin.readUInt32LE(mindex + 12),
      'ice level?': bin.readUInt32LE(mindex + 16),
      '?-1': bin.readInt16LE(mindex + 20),
      'terrain type again?': bin.readInt32LE(mindex + 22),
      '?-2': bin.readInt8(mindex + 26),
      'resource?': bin.readInt32LE(mindex + 27),
      '?-3': bin.readInt16LE(mindex + 31),
      'goody hut?': bin.readInt32LE(mindex + 33),
      '?-4': bin.slice(mindex + 37, mindex + 40),
      '?-5': bin.readInt16LE(mindex + 40),
      '?-6': bin.slice(mindex + 42, mindex + 45),
      '?-7': bin.readInt16LE(mindex + 45),
      'cliffmap': bin.readInt8(mindex + 47).toString(2).padStart(6, '0'),
      '?-9': bin.slice(mindex + 48, mindex + 51),
      'number of things': bin.readInt32LE(mindex + 51),
    });
    if (bin[mindex + 51] === 1) {
      map.tiles[i].buffer = bin.slice(mindex + 55, mindex + 79);
      mindex += 79;
    } else {
      mindex += 55;
    }
  }
  return map;
}

module.exports = {
  decompress,
  recompress,
  modify,
  verifysavextension,
  savetomapjson,
}