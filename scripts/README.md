### Decompress

Output a .Civ6Save.bin file from a .Civ6Save file

`node scripts/decompress.js [filename].Civ6Save`

### Recompress

Merge a .Civ6Save.bin file and a .Civ6Save file into a new .Civ6Save file

`node scripts/recompress.js [filename].Civ6save.bin [filename].Civ6save [outputfilename]`

### Reveal Map

Reveal the entire map for the first player character in a save file

`node scripts/revealmap.js [filename].Civ6Save [outputfilename]`

### Save To Map Table

Exports tile data into a markdown table from a .Civ6Save file

TODO: Make this export to an html table instead of markdown

`node scripts/savetomaptable.js [filename].Civ6Save [outputfilename].md`