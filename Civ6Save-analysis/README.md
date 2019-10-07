# Civ6Save Analysis

Analysis of the unmodified .Civ6Save files is being worked on in Civ6Save-structure.md

Analysis of the decompressed .Civ6Save.bin files is being worked on in bin-structure.md

There may be more analysis files in the future since there are other zlib buffers in the .Civ6Save files that could be decompressed, but for now the focus is just on the main one.

### Notes:
* All integer values appear to be in little-endian
* Integer values that give the length of upcoming strings sometimes (always?) include a null terminator at the end
* A question mark following a DefaultValue means that there hasn't so far been any different value seen than that one
* Keep all hex letter-values in lowercase for consistency
* Strings are proceeded by an 8-byte sequence where the first 2 bytes are the length of the string in little-endian, byte 3 is 0x00, byte 4 is 0x21, byte 5-8 is 0x00000001. Not exactly sure what's up with that, but it's consistent. It's possible bytes 5-8 represent the number of strings of the length defined by bytes 1-2
* All compressed buffers in the file are zlib, which means they start with byte sequence 0x78 0x9c and terminate with 0x00 0x00 0xff 0xff. Note that the beginning sequence can occur outside of the context of a compressed buffer, so seeing those 2 bytes doesn't automatically imply one, but it's a good thing to look out for
* When you click on a game in the load menu screen, you see an image preview of the map. This image doesn't seem to change after editing the save file directly, so maybe there's data for an image file stored in the save somewhere?