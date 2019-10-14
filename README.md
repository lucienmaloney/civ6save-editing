# Civ6save-editing
#### A work in progress collection of tools and information related to editing .civ6save files

## How to Use:
First, get the repository with `git clone https://github.com/lucienmaloney/civ6save-editing.git`

Next, you'll need a .Civ6Save file to edit. Any save will do, but there are a few provided files located under ./Civ6Save-samples. Otherwise, you can copy over save files from your own games. On windows at least, save files can be found under "Documents\My Games\Sid Meier's Civilization VI\Saves\Single".

The first step in editing is to decompress the file using decompress.js, like so: `node scripts/decompress.js [filename].Civ6Save`. This will create a file called [filename].Civ6Save.bin, which is an inflated copy of the main buffer in the .Civ6Save file.

Now you are free to edit the file any way you like using a hex editor. I like HxD, personally. Complete analysis of the .Civ6Save structure and its inflated .Civ6Save.bin buffer is still a work in progress happenning in ./Civ6Save-analysis. You can either look there for guidance on how to edit, or play around with the files and try to work something new out. If you do, please make a commit with the new info!

After editing the .Civ6Save.bin file, you'll need to remerge it back into the original .Civ6Save using recompress.js, like so: `node scripts/recompress.js [filename].Civ6save.bin [filename].Civ6save [outputfilename]`. [outputfilename] is your new .Civ6Save file which should be recognized by the game, although it may fail to load depending on what exactly was edited. Again, it's still early stages, so making meaningful edits will be tough.

Now, move the output file back into the Civilization 6 save file directory and try to load it. Hopefully it will work!

## Repository Structure

* index.js
* scripts
    * decompress.js
    * recompress.js
    * revealmap.js
    * savetomaptable.js
* Civ6Save-samples
    * Various example .Civ6Save and .Civ6Save.bin files for testing and reference
* Civ6Save-analysis
    * Markdown files related to the structure of both .Civ6Save files and .Civ6Save.bin files
    * Contributions here are very much welcome

## Credit Due:
The code for the decompressor was adapted from code in the repository civ6-save-parser, found here: https://github.com/pydt/civ6-save-parser. 
