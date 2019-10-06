# Civ6save-editing
#### A work in progress collection of tools and information related to editing .civ6save files

## How to Use:
First, get the repository with `git clone https://github.com/lucienmaloney/civ6save-editing.git`

Next, you'll need a .Civ6Save file to edit. Any save will do. It's probably best to move it into the working directory, although you could leave it at its default location, but it's sort of a long path to get to. On windows at least, save files can be found under "Documents\My Games\Sid Meier's Civilization VI\Saves\Single".

The first step in editing is to decompress the file using decompress.js, like so: `node decompress.js [filename].Civ6Save`. This will create a file called [filename].Civ6Save.bin, which is an inflated copy of the main buffer in the .Civ6Save file.

Now, you are free to edit the file any way you like using a hex editor. I like HxD, personally. Not much is known about the structure of the .Civ6Save file yet or its inflated buffer, so you'll mostly have to play around and see what changes work. I plan on analyzing the save's structure and posting information about it to this repository in the future.

After editing the .Civ6Save.bin file, you'll need to remerge it back into the original .Civ6Save using recompress.js, like so: `node recompress.js [filename].Civ6save.bin [filename].Civ6save [outputfilename]`. [outputfilename] is your new .Civ6Save file which should be recognized by the game, although it may fail to load depending on what exactly was edited. Again, it's still early stages, so making meaningful edits will be tough.

Now, move the output file back into the Civilization 6 save file directory and try to load it. Hopefully it will work!

## Credit Due:
The code for the decompressor was adapted from code in the repository civ6-save-parser, found here: https://github.com/pydt/civ6-save-parser. 
