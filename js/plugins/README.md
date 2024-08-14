# Multi-Language System Plugin for RPG Maker MZ

This plugin lets you translate game texts to suit your needs. Texts are simply written in JSON files, grouped in language-specific folders. It is also possible to configure fonts specifically for each language. The active language can be selected from the game options window.

## Patches

Use these patches if you need them:

- Patch for Galv MZ plugins.
- Patch for VisuStella MZ plugins.

## Plugin Settings

### General Settings

- **Option Label** [string]: The label for the language selection option. Can be a translatable text ${<text code>}.

- **Root Folder** [string]: The folder containing the languages files stored in subdirectories per language.

- **Fonts** [array of JSON data]: The list of custom fonts for languages.

    - **Font Name** [string]: The name that'll be used to recognize the font.

    - **Font File** [string]: The font file in the /fonts folder.

- **Languages** [array of JSON data]: The list of the languages used in the game.

    - **Language Code** [string]: The code of this language, such as the ISO format.

    - **Language Label** [string]: The label of this language, in its original translation (displayed as a language selection option).

    - **Language Folder** [string]: The folder containing the JSON files for this language, put inside the <Root Folder>.

    - **Language Font Name** [string]: The font name used as the main font for this language, a value from the list of languages fonts.

    - **Language Font Size** [number]: The font size used for the main font for this language, a value between 12 and 108.

    - **Language Files** [array of string]: The list of the JSON files (without extension) for this language, put inside the <Language Folder>.

    - **Miss Label** [string]: The label of the "Miss" text, in its original translation.

    - **ON Label** [string]: The "ON" wording of the option value, in its original translation.

    - **OFF Label** [string]: The "OFF" wording of the option value, in its original translation.

- **Use Error Log** [boolean]: Indicates whether the error log is displayed in the console or not.


## Plugin Commands

_This plugin doesn't use plugin commands._

## Notetags

_This plugin doesn't use notetags._

## Script Calls

To get data on the current active language (read the plugin code for more information):

- **ODW.MLS.getCurrentIndex()** [return number]: Return the current active language index.

- **ODW.MLS.getCurrentCode()** [return string]: Return the language code for the current active language index.

- **ODW.MLS.getCurrentLabel()** [return string]: Return the language label for the current active language index.

## Rewriting Core Functions

**New objects:**
- None

**New properties:**
- ConfigManager.mlsLanguageIndex

**New functions:**
- DataManager.mlsLoadLanguageFile
- DataManager.mlsOnXhrLanguageFileLoad
- DataManager.mlsOnXhrLanguageFileError
- ConfigManager.mlsReadLanguageIndex
- Window_Options.prototype.mlsRefreshLanguage

**Overwrite declarations:**
- Bitmap.prototype.drawText
- ConfigManager.makeData
- ConfigManager.applyData
- TextManager.basic
- TextManager.param
- TextManager.command
- TextManager.message
- Game_System.prototype.mainFontFace
- Game_System.prototype.mainFontSize
- Game_Message.prototype.add
- Game_Message.prototype.setChoices
- Scene_Boot.prototype.loadGameFonts
- Scene_Boot.prototype.start
- Window_Base.prototype.textWidth
- Window_Base.prototype.createTextState
- Window_Base.prototype.actorName
- Window_Base.prototype.partyMemberName
- Window_Base.prototype.convertEscapeCharacters
- Window_Options.prototype.addGeneralOptions
- Window_Options.prototype.statusText
- Window_Options.prototype.processOk
- Window_Options.prototype.cursorRight
- Window_Options.prototype.cursorLeft
- Window_NameEdit.prototype.setup

**Destructive declarations:**
- Object.defineProperty( TextManager, 'currencyUnit', {...} )
- Scene_Boot.prototype.updateDocumentTitle
- Sprite_Damage.prototype.createMiss
- Window_Options.prototype.booleanStatusText
