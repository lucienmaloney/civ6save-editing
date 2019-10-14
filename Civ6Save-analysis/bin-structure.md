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
Number of Civs + Number of City-States | Int32 List | Number of Turns Played? | N/A
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
4 | Int32 | ? | 0x0301?
4 | Int32 | ? | 0x00?
4 | Int32 | ? | N/A
4 | Int32 | ? | 0x04?
82? | ? | ? | ?
4 | Int32 | Length of Following Int64 List | 0x34?
416? | Int64 List | ? | N/A
4 | Int32 | Length of Following Int64 List | 0x34?
416? | Int64 List | ? | N/A

### Section 2: Player Blocks

Notes:
* The number of teams equals the number of players plus the number of city-states plus 2 (1 for barbarians and 1 for free-cities)
* This section repeats one time for each team
* The player is always the first team listed
* Though not confirmed, the order of teams if probably civs then city-states then free-cities then barbs (those last two might be switched)

ByteLength | Type | Purpose | Value
--- | --- | --- | ---
4 | Int32 | ? | 0x01?
4 | Int32 | Number of Teams | N/A
4 | Int32 | ? | 0x00?
4 | Int32 | ? | 0x06?
Variable? | ? | ? | 0x00?
1 | ? | ? | 0x01?
4 | Int32 | Number of Tiles on Map | N/A
Tiles | Bitmap | Fog of war for Team (0=Fog, 1=Clear) | N/A
4 | Int32 | ? | 0x05?
4 | Int32 | ? | 0x11351026?
4 | Int32 | ? | 0x00?
4 | Int32 | Number of Tiles on Map | N/A
4 | Int32 | Width of Map in Tiles | N/A
4 | Int32 | Number of Tiles on Map | N/A
Tiles * 2 | Int16 List | Number of Units/Tiles/Things Observing Tile (0=Out of Sight, Increment for each thing in sight of tile) | N/A
4 | Int32 | ? | 0xf7a356cf?
4 | Int32 | ? | 0x01?
4 | Int32 | Number of Tiles on Map | N/A
4 | Int32 | Width of Map in Tiles | N/A
4 | Int32 | Number of Tiles on Map | N/A
Tiles * 2 | Int16 List | Terrain Modifiers (Improvements, barb camps, etc; See modifiers.md) | N/A
4 | Int32 | ? | 0xd180288f?
4 | Int32 | ? | 0x02?
4 | Int32 | Number of Tiles on Map | N/A
4 | Int32 | Width of Map in Tiles | N/A
4 | Int32 | Number of Tiles on Map | N/A
Tiles * 2 | Int16 List | Resource Map (See resources.md) | N/A
4 | Int32 | ? | 0xa8a6f95c?
4 | Int32 | ? | 0x03?
4 | Int32 | Number of Tiles on Map | N/A
4 | Int32 | Width of Map in Tiles | N/A
4 | Int32 | Number of Tiles on Map | N/A
Tiles * 2 | Int16 List | Roads? | N/A

Look back to near the beginning of the table and repeat for each team

### Section 3: Garbage

ByteLength | Type | Purpose | Value
--- | --- | --- | ---
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x06?
4 | Int32 | ? | 0x3f?
4 | Int32 | ? | 0x01?
4 | Int32 | ? | 0x00?
4 | Int32 | ? | 0x01?
2 | Int16 | ? | 0x01?
2 | Int16 | ? | 0x01?
4 | Int32 | ? | 0x10?
4 | Int32 | ? | N/A
4 | Int32 | ? | N/A
4 | Int32 | ? | 0x00?
4 | Int32 | ? | 0x02?
2 | Int16 | ? | 0x00?
2 | Int16 | ? | 0x01?
4 | Int32 | ? | N/A
36 | ? | ? | 0x00 Repeated?
4 | Int32 | Length of Upcoming Int32 List | 0x40?
Variable | Int32 List | ? | 0x00 Repeated?
_ | _ | Repeat above 2 4? more times | _
4 | Int32 | Length of Upcoming Int64 List | 0x06?
48? | Int64 List | ? | N/A
_ | _ | Repeat above 2 63? more times | _
4 | Int32 | Length of Following Int64 List | 0x34?
416? | Int64 List | ? | N/A
4 | Int32 | Length of Following Int64 List | 0x25?
296? | Int64 List | ? | N/A
_ | _ | Repeate Everything in Section variable number of times (60? - 110?) | _


### Section 4: ?

### Section 5: Tile Data

ByteLength | Type | Purpose | Value
--- | --- | --- | ---
4 | Int32 | Number of Tiles | N/A
2 | Int16? | ? | ?
2 | Int16? | ? | ?
2 | Int16? | ? | ?
2 | Int16? | ? | ?
2 | Int16 | Landmass index? | ?
2 | Int16 | Landmass index + 1? | ?
4 | Int32 | Terrain type? | ?
4 | Int32 | Ice Level? | all f for no ice, some number otherwise?
2 | Int16? | ? | ?
4 | Int32 | Terrain type? | N/A
1 | Int8? | ? | ?
4 | Int32 | Resource? | N/A
2 | Int16? | ? | ?
4 | Int32 | Goody hut? | N/A
3 | ? | ? | 0xffffff?
2 | Int16? | ? | ?
3 | ? | ? | 0xffffff?
2 | Int16? | ? | ?
1 | Bitmap | Cliff Orientation | Bit 6 (32) = Northwest, Bit 5 (16) = West, so on
1 | Int8? | ? | ?
1 | Int8? | If (greater than 64)?, add 17 bytes to final buffer | ?
1 | Int8? | ? | ?
4 | Boolean | If true, add 24 bytes to following buffer | Default 0x00
0 or 24 | Buffer | Tile Improvement Data? | N/A
0 or 17 | Buffer | Tile Ownership data. Contains city and civ index | N/A
_ | _ | Repeat all but but first row (Number of tiles) times | _

#### Tile Improvement Buffer

ByteLength | Type | Purpose | Value
--- | --- | --- | ---
24 | Buffer | ? | N/A

#### Tile Ownership Buffer

ByteLength | Type | Purpose | Value
--- | --- | --- | ---
2 | Int16 | City Index within civ | N/A
2 | Int16 | City Index within civ + 1? | N/A
2 | Int16 | City Index within civ? | N/A
2 | Int16 | City Index within civ + 1? | N/A
4 | Int32? | ? | 0xffffff?
1 | Int8 | Civ Index | N/A
4 | Int32? | ? | 0xffffff?

### Section 6: ?