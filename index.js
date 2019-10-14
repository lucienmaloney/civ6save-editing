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
 * If there isn't a certain extension suffix on the file name, add it
 * @param {string} filename
 * @param {string} extension
 * @return {string} newfilename
 */
function verifyextension(filename, extension = '.Civ6Save') {
  if (filename.slice(-9) !== extension) {
    return filename + extension;
  }
  return filename;
}

/**
 * Convert compressed tile data in .Civ6Save file into json format
 * @param {buffer} savefile
 * @return {object} tiles
 */
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
    const num2 = bin.readUInt8(mindex + 49);
    const num = bin.readUInt32LE(mindex + 51);
    let buflength = 0;

    num && (buflength += 24);
    (num2 >= 64) && (buflength += 17);

    // See bin-structure.md for WIP documentation on what each of these values are
    map.tiles.push({
      'x': i % mapsizedata[tiles].x,
      'y': Math.floor(i / mapsizedata[tiles].x),
      'hex-location': mindex,
      'tile-length': 55 + buflength,
      'int16-1': bin.readUInt16LE(mindex),
      'int16-2': bin.readUInt16LE(mindex + 2),
      'int16-3': bin.readUInt16LE(mindex + 4),
      'int16-4': bin.readUInt16LE(mindex + 6),
      'landmass index?': bin.readUInt16LE(mindex + 8),
      'landmass index + 1?': bin.readUInt16LE(mindex + 10),
      'Int8-1': bin.readUInt8(mindex + 12),
      'Int8-2': bin.readUInt8(mindex + 13),
      'Int8-3': bin.readUInt8(mindex + 14),
      'Int8-4': bin.readUInt8(mindex + 15),
      'Int8-5': bin.readUInt8(mindex + 16),
      'Int8-6': bin.readUInt8(mindex + 17),
      'Int8-7': bin.readUInt8(mindex + 18),
      'Int8-8': bin.readUInt8(mindex + 19),
      '?-1': bin.readInt16LE(mindex + 20),
      'terrain type again?': bin.slice(mindex + 22, mindex + 26),
      '?-2': bin.readInt8(mindex + 26),
      'resource?': bin.slice(mindex + 27, mindex + 31),
      'Resource boolean': bin.readInt16LE(mindex + 31),
      'goody hut?': bin.slice(mindex + 33, mindex + 37),
      'Int8-9': bin.readUInt8(mindex + 37),
      'Int8-a': bin.readUInt8(mindex + 38),
      'Int8-b': bin.readUInt8(mindex + 39),
      'Tile Appeal': bin.readInt16LE(mindex + 40),
      'Int8-c': bin.readUInt8(mindex + 42),
      'Int8-d': bin.readUInt8(mindex + 43),
      'Int8-e': bin.readUInt8(mindex + 44),
      'River border count': bin.readUInt8(mindex + 45),
      'rivermap': bin.readUInt8(mindex + 46).toString(2).padStart(6, '0'),
      'cliffmap': bin.readInt8(mindex + 47).toString(2).padStart(6, '0'),
      '?-9': bin.slice(mindex + 48, mindex + 51),
      'buffer length boolean': bin.readInt32LE(mindex + 51),
      'buffer': bin.slice(mindex + 55, mindex + 55 + buflength),
    });

    mindex += 55 + buflength;
  }
  return map;
}

module.exports = {
  decompress,
  recompress,
  modify,
  verifyextension,
  savetomapjson,
}