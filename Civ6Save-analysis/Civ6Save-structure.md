# .Civ6Save Structure Rundown (WIP)

Notes:
* All integer values appear to be in little-endian
* Integer values that give the length of upcoming strings sometimes (always?) include a null terminator at the end
* A question mark following a DefaultValue means that there hasn't so far been any different value seen than that one
* Keep all hex letter-values in lowercase for consistency
* Strings are proceeded by an 8-byte sequence where the first 2 bytes are the length of the string in little-endian, byte 3 is 0x00, byte 4 is 0x21, byte 5-8 is 0x00000001. Not exactly sure what's up with that, but it's consistent. It's possible bytes 5-8 represent the number of strings of the length defined by bytes 1-2
* All compressed buffers in the file are zlib, which means they start with byte sequence 0x78 0x9c and terminate with 0x00 0x00 0xff 0xff. Note that the beginning sequence can occur outside of the context of a compressed buffer, so seeing those 2 bytes doesn't automatically imply one, but it's a good thing to look out for

### Section 1: Header

ByteLength | Type | Purpose | DefaultValue
--- | --- | --- | ---
4 | String | File Header | "CIV6"
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x20?
4 | Int32 | ? | 0x05d9b099?
4 | Int32 | ? | 0x05?
8 | ? | GAME_SPEED String Length | N/A
Variable | String | GAME_SPEED | N/A
4 | Int32 | ? | 0x0b835c40?
4 | Int32 | ? | 0x05
8 | ? | MAPSIZE String Length | N/A
Variable | String | MAPSIZE | N/A
4 | Int32 | ? | 0x0efe6c64?
4 | Int32 | ? | 0x14?
4 | Int32 | ? | 0x80000000?
4 | Int32 | ? | 0x00?
4 | UInt32 | Unix Epoch | N/A
4 | Int32 | Possibly overflow for Unix Epoch | 0x00?
4 | Int32 | ? | 0x0f32e71d?
4 | Int32 | ? | 0x05

### Section 2: JSON's

ByteLength | Type | Purpose | DefaultValue
--- | --- | --- | ---
8 | ? | Length of JSON Group 1 | N/A
Variable | JSON | ? | N/A
4 | Int32 | ? | 0x12f52ff3?
4 | Int32 | ? | 0x05?
8 | ? | Length of JSON Group 2 | N/A
Variable | JSON | ? | N/A
4 | Int32 | ? | 0x1ab13eef?
4 | Int32 | ? | 0x18?
8 | ? | Combined Length of Next 4 Row Items | N/A
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x14c0?
4 | Int32 | Length of Proceeding Buffer | N/A
Variable | Zlib Buffer | ? | N/A

// TODO: Continue this