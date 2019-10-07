# .Civ6Save Structure Rundown (WIP)

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