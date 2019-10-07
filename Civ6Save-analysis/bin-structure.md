# .Civ6Save.bin Structure Rundown (WIP)

### Section 1: Header?

ByteLength | Type | Purpose | Value
--- | --- | --- | ---
4 | Int32 | ? | 0x05?
4 | Int32 | ? | 0x03?
4 | Int32 | ? | 0xfe33fe49?
4 | Int32 | ? | 0x03?
12 | ? | ? | 0x00?
4 | Int32 | ? | 0xf4e540d8?
4 | Int32 | ? | 0x05?
8 | ? | UUID Length | 0x25 0x00 0x00 0x21 0x01 0x00 0x00 0x00
37 | String | UUID | N/A
4 | Int32 | ? | 0xfd1bbf76?
4 | Int32 | ? | 0x03?
8 | ? | ? | 0x00?
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x11?
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0xf3e6941e?
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x02?
Variable | Int32 List | ? | N/A
Variable | ? | ? | 0xff Repeated?
4 | Int32 | ? | N/A
4 | Int32 | ? | N/A
4 | Int32 | ? | 0x00?
252 | Int32 List | ? | Incremented range of Int32 Values (0x00000001:0x0000003f)
4 | Int32 | ? | N/A
4 | Int32 | ? | 0x02000000?
4 | Int32 | ? | 0x00?
191? | Bitmap? | ? | 0x01 Repeated?
964? | Bitmap? | ? | ?