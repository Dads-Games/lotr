//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.50;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.50] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV file that will contain all of the text used to
 * translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * ---
 * 
 * === How to Edit the Language CSV ===
 * 
 * The Language CSV is structured as a normal CSV file would be, which also
 * means it can be modified in programs like Microsoft Excel or Google Sheets.
 * We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV file in programs like notepad directly
 * due to the way certain things like commas (,) are handled and how easy it is
 * to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV file via the spreadsheet editor (Excel or Google
 * Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the custom font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

function _0x497f(_0x5220a3,_0x50c35e){const _0x2f4ff6=_0x2f4f();return _0x497f=function(_0x497f18,_0x57681c){_0x497f18=_0x497f18-0x188;let _0x4e792c=_0x2f4ff6[_0x497f18];return _0x4e792c;},_0x497f(_0x5220a3,_0x50c35e);}const _0x45a258=_0x497f;(function(_0x2d4d53,_0xd0bcc8){const _0x190a6c=_0x497f,_0x34dbbe=_0x2d4d53();while(!![]){try{const _0x2f3b88=-parseInt(_0x190a6c(0x45a))/0x1*(parseInt(_0x190a6c(0x1a7))/0x2)+-parseInt(_0x190a6c(0x44e))/0x3+parseInt(_0x190a6c(0x47d))/0x4+parseInt(_0x190a6c(0x315))/0x5+parseInt(_0x190a6c(0x3c4))/0x6*(parseInt(_0x190a6c(0x49f))/0x7)+parseInt(_0x190a6c(0x408))/0x8*(-parseInt(_0x190a6c(0x540))/0x9)+parseInt(_0x190a6c(0x4c2))/0xa*(parseInt(_0x190a6c(0x21e))/0xb);if(_0x2f3b88===_0xd0bcc8)break;else _0x34dbbe['push'](_0x34dbbe['shift']());}catch(_0x676862){_0x34dbbe['push'](_0x34dbbe['shift']());}}}(_0x2f4f,0x677af));function _0x2f4f(){const _0x57e81c=['cancel','Slovak','itemChoiceItypeId','_textCasingUpperState','\x1bTEXTALIGNMENT[1]','CheckCompatibility','setPictureText','1917207FHnTiy','some','toLowerCase','SWITCHES','addContinuousShowTextCommands','drawCustomBackgroundColor','_textAlignment','getChoiceMessageDistance','TextCodeReplace','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','findTargetSprite','changeTextColor','7417oXdVze','</RIGHT>','actor','lower-left','Hejdå','setChoices','#ffffff','Bitmap_drawText','toUpperCase','match','maxChoiceWidth','quantity','Scene_Options_maxCommands','_pictures','contents','postConvertEscapeCharacters','floor','itemChoiceEtypeId','setChoiceMessageDistance','push','processCustomWait','Farewell','faceWidth','Italian','getInputButtonString','FUNC','getPictureTextData','LineHeight','isVisuMzLocalizationEnabled','OffsetY','skill','unshift','setMessageWindowRows','convertTextMacros','clearActorNameAutoColor','2875560KNhJdR','_moveTargetWidth','choiceIndexArray','filename','return\x20\x27','AddOption','Czech','white','outputHeight','menu','needsPictureTextRefresh','WRAPJPBREAK','itemBackColor1','DISABLE','Window_Message_clearFlags','Uau','_helpWindow','clearFlags','Näkemiin','नमस्ते','ITALIC','height','anchor','getChoiceListTextAlign','length','ParseLocalizationCsv','สวัสดี','battleActionName','_pictureText','Game_Screen_clearPictures','convertHardcodedEscapeReplacements','Settings','AutoColorBypassList','applyChoiceHelpDescriptions','4632019dClniJ','upright','updateDimensions','setWeaponChoice','none','AddAutoColor','Cześć','TextManager_message','Ha\x20det','powerUpColor','MESSAGE_CORE_PLUGIN_NAME','_choiceListWindow','_textDelay','_scriptCall','MessageTextDelay','hide','Wow','Game_Screen_erasePicture','drawBackPicture','centered','substring','Vau','getChoiceListLineHeight','Sprite_Picture_update','levelUp','currentExt','Weapons','statusText','clampPlacementPosition','ExtraEnemyDrops','makeDeepCopy','updateMove','Window_Help_refresh','update','_MessageCoreSettings','20ktUtDH','registerCommand','_showFast','skills','blt','addGeneralOptions','%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.','drawSkillCost','_commonEventId','choices','ARRAYEVAL','down-center','width','maxLines','isSkillTypeMatchForUse','MsgWindowOffsetY','processTextAlignmentChange','Window_Message_terminateMessage','ลาก่อน','Romanian','\x1bITALIC[0]','Window_Base_changeTextColor','add','PICTURE','textSizeExTextAlignment','setTextAlignment','ConvertParams','Window_NameBox_refresh','_forcedPosition','calcWindowHeight','Γειά\x20σου','message','forEach','type','</COLORLOCK>','processDrawCenteredPicture','start','NUM','updateTransform','updateHelp','AdjustRect','Window_EventItem_includes','PictureTextRefresh','calcMoveEasing','Filename','ChoiceWindowMaxCols','lower\x20left','itemRectWithPadding','upper\x20right','index','</CENTER>','_moveTargetHeight','eraseAllPictureTexts','GET','updateAutoSizePosition','getPictureTextBuffer','setupChoices','SplitJpCnCharacters','newPage','iconIndex','Window_Base_processEscapeCharacter','fontSize','boxWidth','\x1bBOLD[1]','clearRect','Game_Interpreter_PluginCommand','Game_Party_gainItem','Window_Message_synchronizeNameBox','\x1bi[%1]%2','_target','Hola','\x1bCASING[0]','anyPictureTextChanges','Localization','さようなら','middleright','open\x20.\x5cdata','yellow','Au\x20revoir','addedWidth','Adeus','onload','buffer','inputtingAction','addMessageCoreCommands','getChoiceListMinChoiceWidth','prepareShowTextFollowups','setupShuffleChoices','Window_Options_isVolumeSymbol','itemRect','leader','\x1bCASING[4]','English','upperright','name','downright','UNDEFINED!','_autoPosRegExp','getLanguageName','processTextAlignmentX','down\x20left','addMessageCommonEvent','Sprite_Picture_updateBitmap','Distance','_pictureTextRefresh','up-center','callOkHandler','resetPositionX','CreateAutoColorFor','ShuffleArray','systemColor','trim','preConvertEscapeCharacters','unnamed','convertMessageCoreEscapeActions','faceName','changeValue','processFailsafeChoice','pageup','processCharacter','isRTL','\x1bITALIC[1]','lowerleft','isTriggered','upper-right','getLastGainedItemData','77769wgbqlh','child_process','green','returnPreservedFontSettings','isRunning','itemHeight','STR','drawText','<LINE\x20BREAK>','processAllText','textLocale','members','Rows','messageCoreLocalization','numVisibleRows','drawBackCenteredPicture','addCommand','_eventId','_textCasing','split','_choiceHelpDescriptions','getConfigValue','_autoColorActorNames','open','setWaitMode','Window_MessageLog','adjustShowChoiceDefault','instantTextSpeed','updateBitmap','gradientFillRect','General','_choices','processMessageCoreEscapeActions','processCommonEvent','changePaintOpacity','system','right','isWordWrapEnabled','VisuMZ_0_CoreEngine','placeCancelButton','setSkillChoice','dirname','Sbohem','TextStr','setLastGainedItemData','_lastAltCase','70fIXYeh','path','down-left','convertTextAlignmentEscapeCharacters','WAIT','Wauw','Window_Base_processControlCharacter','ParseAddedText','getChoiceListMaxRows','test','messageRows','</LEFT>','Window_Message_updatePlacement','item','violet','ParseEnemyNotetags','prepareAutoSizeEscapeCharacters','isItem','defaultColor','drawPictureText','battle\x20enemy','CASING','armor','_cancelButton','round','processAutoSize','<I>','up-right','Window_Message_newPage','middleleft','innerHeight','Vay','Tamil','addContinuousShowChoices','choiceListHelpWindowRect','prepareShowTextCommand','replace','moveBy','normalColor','isMessageWindowWordWrap','exec','#fff799','clearCommandList','textSizeExWordWrap','</I>','list','Match','Arrivederci','map\x20player','AutoColor','false','obtainEscapeParam','getChoiceIndent','in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.','activate','Enemies','victory','_itemChoiceActorId','lowerright','textSizeExRaw','loadPicture','reduce','addMessageCoreTextSpeedCommand','Name','getMessageWindowRows','isSkillHidden','Thai','Scene_Boot_loadGameFonts','clear','drawItemContents','messageCoreTextSpeed','maxCommands','red','moveTo','up-left','setHelpWindow','ConfigManager_makeData','Zbohom','applyDatabaseAutoColor','event','upper-center','_itemChoiceItypeId','flushTextState','Russian','EndPadding','La\x20revedere','map\x20party','TextMacros','isSkill','Auf\x20Wiedersehen','_itemChoiceEtypeId','CreateAutoColorRegExpLists','itemChoiceAtypeId','(((','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_autoPositionTarget','_pictureTextBuffer','NameBoxWindowOffsetY','zoomScale','createTextState','messagePositionReset','value','DefaultOutlineWidth','prepareShowTextPluginCommandFollowups','Please\x20restart\x20the\x20game.','setChoiceListTextAlign','choice','parseLocalizedText','ParseStateNotetags','messageWidth','_wordWrap','upper\x20center','_resetRect','black','Dutch','Window_NameBox_updatePlacement','selectDefault','Skills','down','1605241mqEZyS','EquipTypeID','Salut','setColorLock','resetTextColor','initMessageCore','parse','হ্যালো','command357','convertEscapeCharacters','join','slice','PictureIDs','ArmorTypeID','partyMemberName','Window_ItemList_drawItemNumber','ActionJS','TextColor%1','Default','filter','SHOW','atypeId','choiceRows','addWrapBreakAfterPunctuation','Hello','MessageRows','updateBackground','makeCommandList','<%1>','processAutoPosition','CSV\x20file\x20has\x20not\x20been\x20made.\x0a','processAutoColorWords','getLastPluginCommandInterpreter','changeChoiceBackgroundColor','refreshDimmerBitmap','erasePicture','setBackground','pink','drawTextEx','clamp','Привет','_autoSizeCheck','VisuMZ_1_EventsMoveCore','onProcessCharacter','convertButtonAssistText','_wholeMoveDuration','updateChoiceListHelpWindowPlacement','<WORDWRAP>','Type','\x1bWrapBreak[0]','_lastGainedItemData','loadCustomFontsMessageCore','ALL','processStoredAutoColorChanges','German','up\x20center','#ffc8e0','command101','isAutoColorAffected','_pictureTextHeight','Indonesian','Window_Message_isTriggered','changeOutlineColor','Chinese(Simplified)','NameBoxWindowDefaultColor','_textColorStack','\x1bCOLORLOCK[1]','SortObjectByKeyLength','isChoiceWindow','Hoşça\x20kal','Merhaba','processFsTextCode','Instant','lower-center','Waouh','process_VisuMZ_MessageCore_AutoColor','Scene_Message_createChoiceListWindow','convertShowChoiceEscapeCodes','_messageCommonEvents','drawPictureTextZone','adjustShowChoiceCancel','</WORDWRAP>','Halo','_pictureTextCache','close','NameBoxWindowOffsetX','clearPictureTextRefresh','requestChoiceForegroundImage','weapon','createLocalizationCsvFile','onLocalizationXhrError','obtainGold','_relativePosition','\x1bBOLD[0]','Window_Options_changeVolume','writeFileSync','setPictureTextBuffer','requestChoiceBackgroundImage','bitmap','charCodeAt','TEXTALIGNMENT','description','_itemChoiceVariableId','WORD_WRAP_PADDING','अलविदा','isSceneMap','format','setLastPluginCommandInterpreter','Norwegian','setChoiceListHelpWindow','processDrawPicture','_maxShuffleChoices','ARRAYSTR','startPause','itemChoiceActorId','Window_Base_processNewLine','convertButtonAssistEscapeCharacters','easeInOut','strokeRect','emerge','choiceMinWidth','Actors','onChoice','makeData','_messageWindow','Game_Map_initialize','addWindow','isClosed','_targets','_itemChoiceAtypeId','version','itemPadding','SelectArmor','itemBackColor2','isSceneBattle','ChoiceWindowTextAlign','setTextDelay','processControlCharacter','_dimmerSprite','Ahoj','enabled','getPictureText','Bengali','callCancelHandler','upperleft','center','_positionType','_list','updateXyOffsets','isChoiceEnabled','isChoiceVisible','obtainExp','_pictureTextSprite','isColorLocked','random','_texts','processTextCasing','Αντίο','boxHeight','etypeId','MsgWindowOffsetX','Olá','FontBiggerCap','_moveTargetX','easeIn','Portuguese','maxFontSizeInLine','TextSpeed','bind','_textMacroFound','ChoiceWindowMinWidth','setChoiceListLineHeight','EachMessageEnd','resetFontSettings','changeVisuMzTextLocale','constructor','makeCommandListShuffle','commandName','_action','process_VisuMZ_MessageCore_TextCodes_Replace','Window_Message_needsNewPage','Swedish','ChoiceWindowMaxRows','<CENTER>','data/','setMessageWindowWordWrap','registerActorNameAutoColorChanges','textCodeCheck','getRandomTextFromPool','preFlushTextState','maxCols','windowX','FontChangeValue','ceil','stringify','ARRAYFUNC','Viszontlátásra','getChoiceListMaxColumns','_choiceListHelpWindow','itemChoiceStypeId','Tot\x20ziens','ARRAYJSON','scale','NonSupportedTextCodes','middlecenter','Вау','Game_Map_updateEvents','min','_colorLock','midright','updateAutoPosition','obtainEscapeString','convertChoiceMacros','DataManager_loadDatabase','_itemChoiceWtypeId','_pictureTextWidth','getSkillTypes','Farvel','lastGainedObjectQuantity','_itemChoiceStypeId','\x1bCOLORLOCK[0]','setText','안녕하세요','prototype','JSON','textSpeedStatusText','createChoiceListWindow','grey','convertBackslashCharacters','visible','textSpeed','fontBold','makeSkillList','updatePlacement','addChoiceDistance','updateOffsetPosition','getMessageWindowXyOffsets','left','registerResetRect','_autoSizeRegexp','drawItemNumber','isContinuePrepareShowTextCommands','_data','_index','drawChoiceLocationImage','updatePictureText','attachPictureText','21655dTzkjw','changeTextSpeed','ParseClassNotetags','setWordWrap','startY','convertNewPageTextStateMacros','drawItem','Game_Message_setChoices','setArmorChoice','send','hasPictureText','shift','helpWordWrap','ChoiceWindowLineHeight','_textDelayCount','outputWidth','every','load','anchorPictureText','addChildAt','ว้าว','Items','_moveDuration','mainFontSize','ParseItemNotetags','_messagePositionReset','Wah','blue','start\x20.\x5cdata','EVAL','Window_Base_processAllText','lower\x20right','Hei','Hindi','Do\x20widzenia','_nameBoxWindow','addLoadListener','_interpreter','_currentAutoSize','clearAllPictureTexts','createPictureText','itemChoiceActor','ParseArmorNotetags','downcenter','adjustShowChoiceExtension','map','convertVariableEscapeCharacters','TextCodeActions','DefaultLocale','Window_Base_textSizeEx','needsNewPage','battleTargetName','\x1bTEXTALIGNMENT[0]','COMMONEVENT','Classes','requestPictureTextRefreshAll','isArmor','isPressed','Hallo','Window_Base_update','CustomFonts','isBreakShowTextCommands','includes','Window_ChoiceList_updatePlacement','_moveTargetY','messageWordWrap','MessageWidth','Game_System_initialize','Bonjour','choiceAlignText','Selamat\x20tinggal','wtypeId','crisis','currentCommand','registerSelfEvent','realPictureId','Scene_Boot_onDatabaseLoaded','Game_Interpreter_setupChoices','openLocalizationFolder','getMessageWindowWidth','HelpWindow','initTextAlignement','_messageOffsetY','getStartingChoiceWidth','</B>','synchronizeNameBox','createChoiceListHelpWindow','isVolumeSymbol','_messageOffsetX','Window_ChoiceList_windowX','processFontChangeItalic','convertLockColorsEscapeCharacters','upcenter','up\x20left','processPxTextCode','convertFontSettingsEscapeCharacters','max','FontSmallerCap','escapeStart','isInputting','setup','charAt','fontItalic','ParseWeaponNotetags','drawTextTopAligned','rtl','Polish','canMove','terminateMessage','getTextAlignment','resetWordWrap','States','ConfigManager_applyData','setupEvents','applyData','call','Japanese','code','outlineWidth','downleft','MaxRows','_refreshPauseSign','Window_ChoiceList_callCancelHandler','status','<BR>','\x1bTEXTALIGNMENT','<COLORLOCK>','Window_Message_processEscapeCharacter','Ουάου','MessageWindowXyOffsets','_scene','getPreservedFontSettings','autoPositionOffsetX','ConvertTextAutoColorRegExpFriendly','processNewLine','#f26c4f','convertMessageCoreEscapeReplacements','onDatabaseLoaded','follower','processFontChangeBold','prepareWordWrapEscapeCharacters','TextAlign','maxShuffleChoices','getLocalizedText','isWeapon','sort','onNewPageMessageCore','Greeting','createContents','WeaponTypeID','setRelativePosition','stretchDimmerSprite','lower-right','choiceCols','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','Window_Base_initialize','Game_Party_initialize','\x1bC[%1]%2\x1bPREVCOLOR[0]','\x1bTEXTALIGNMENT[2]','makeCommandListScriptCall','followers','SelectSkill','processActorNameAutoColorChanges','WRAPBREAK','prepareForcedPositionEscapeCharacters','_indent','ARRAYSTRUCT','true','SelectWeapon','choicePositionType','updateEvents','Window_ChoiceList','actorName','textSizeEx','indent','6QtciqV','String_format','#acacac','loadGameFonts','CENTERPICTURE','erasePictureTextBuffer','updateRelativePosition','Unnamed.ttf','_pictureTextWindow','pagedown','contentsBack','parseChoiceText','ChoiceWindowDistance','வணக்கம்','openness','Padding','ParseSkillNotetags','resetRect','_choiceIndexArray','clearPictures','substr','brown','こんにちは','isHelpWindowWordWrap','startWait','parameters','map\x20event','lower\x20center','splice','colSpacing','PictureTextChange','TextColor','processColorLock','requestPictureTextRefresh','process_VisuMZ_MessageCore_TextMacros','Ciao','ChoiceWindowProperties','launchMessageCommonEvent','#a186be','Hungarian','Hűha','Window_Options_statusText','lineHeight','initialize','CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a','AutoColorRegExp','addMessageCoreLocalizationCommand','updateNameBoxMove','gainItem','purple','startX','MaxCols','CreateAutoColorRegExpListEntries','processPreviousColor','process_VisuMZ_MessageCore_TextCodes_Action','paintOpacity','WordWrap','CommonEvent','Hej','setChoiceListMaxColumns','makeFontBigger','VisuMZ_3_ActSeqCamera','default','BOLD','processEscapeCharacter','exit','addedHeight','setMessageWindowXyOffsets','328LuSUHr','_centerMessageWindow','lastGainedObjectIcon','_macroBypassWordWrap','remove','windowWidth','VariableID','refresh','choiceCancelType','surprise','indexOf','Armors','_moveEasingType','clearChoiceHelpDescriptions','CsvFilename','_choiceCancelType','choiceDistance','defeat','textColor','commandSymbol','Bitmap_drawTextTopAligned','deactivate','visuMzTextLocaleStatusText','textCodeResult','choiceTextAlign','innerWidth','onLocalizationXhrLoad','\x5c%1','lowercenter','text','applyMoveEasing','SkillTypeID','MessageCore','\x1bCASING[1]','resizePictureText','changeVolume','বিদায়','Korean','choiceLineHeight','\x1bWrapJpBreak[0]','Turkish','outLineColor','Game_Map_refresh','loadLocalization','nextEventCode','processWrapBreak','padding','isPlaytest','return\x200','Adiós','setMessageWindowWidth','easeOut','loadDatabase','#fbaf5d','_pictureId','isOpen','battle\x20party','switchOutTextForLocalization','up\x20right','drawing','makeFontSmaller','You\x20do\x20not\x20have\x20a\x20language\x20CSV\x20set\x20up.\x0a','messageCoreWindowX'];_0x2f4f=function(){return _0x57e81c;};return _0x2f4f();}var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x45a258(0x231)](function(_0x15b479){const _0x2fc326=_0x45a258;return _0x15b479[_0x2fc326(0x390)]&&_0x15b479['description'][_0x2fc326(0x353)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x45a258(0x49c)]||{},VisuMZ[_0x45a258(0x4dc)]=function(_0x2a31b7,_0x436cb3){const _0x53b73e=_0x45a258;for(const _0x31ee4d in _0x436cb3){if(_0x31ee4d['match'](/(.*):(.*)/i)){const _0x4af08b=String(RegExp['$1']),_0x5ea1c5=String(RegExp['$2'])[_0x53b73e(0x462)]()['trim']();let _0x3c817b,_0x2f3b90,_0x34dd73;switch(_0x5ea1c5){case _0x53b73e(0x4e7):_0x3c817b=_0x436cb3[_0x31ee4d]!==''?Number(_0x436cb3[_0x31ee4d]):0x0;break;case'ARRAYNUM':_0x2f3b90=_0x436cb3[_0x31ee4d]!==''?JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d]):[],_0x3c817b=_0x2f3b90[_0x53b73e(0x342)](_0x311be7=>Number(_0x311be7));break;case _0x53b73e(0x332):_0x3c817b=_0x436cb3[_0x31ee4d]!==''?eval(_0x436cb3[_0x31ee4d]):null;break;case _0x53b73e(0x4cc):_0x2f3b90=_0x436cb3[_0x31ee4d]!==''?JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d]):[],_0x3c817b=_0x2f3b90['map'](_0x479e6f=>eval(_0x479e6f));break;case _0x53b73e(0x2fe):_0x3c817b=_0x436cb3[_0x31ee4d]!==''?JSON['parse'](_0x436cb3[_0x31ee4d]):'';break;case _0x53b73e(0x2e7):_0x2f3b90=_0x436cb3[_0x31ee4d]!==''?JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d]):[],_0x3c817b=_0x2f3b90[_0x53b73e(0x342)](_0x3a2cf0=>JSON[_0x53b73e(0x224)](_0x3a2cf0));break;case _0x53b73e(0x473):_0x3c817b=_0x436cb3[_0x31ee4d]!==''?new Function(JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d])):new Function(_0x53b73e(0x438));break;case _0x53b73e(0x2e1):_0x2f3b90=_0x436cb3[_0x31ee4d]!==''?JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d]):[],_0x3c817b=_0x2f3b90[_0x53b73e(0x342)](_0x33619b=>new Function(JSON[_0x53b73e(0x224)](_0x33619b)));break;case _0x53b73e(0x546):_0x3c817b=_0x436cb3[_0x31ee4d]!==''?String(_0x436cb3[_0x31ee4d]):'';break;case _0x53b73e(0x28e):_0x2f3b90=_0x436cb3[_0x31ee4d]!==''?JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d]):[],_0x3c817b=_0x2f3b90['map'](_0x4ec290=>String(_0x4ec290));break;case'STRUCT':_0x34dd73=_0x436cb3[_0x31ee4d]!==''?JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d]):{},_0x2a31b7[_0x4af08b]={},VisuMZ['ConvertParams'](_0x2a31b7[_0x4af08b],_0x34dd73);continue;case _0x53b73e(0x3bb):_0x2f3b90=_0x436cb3[_0x31ee4d]!==''?JSON[_0x53b73e(0x224)](_0x436cb3[_0x31ee4d]):[],_0x3c817b=_0x2f3b90['map'](_0x367dcb=>VisuMZ['ConvertParams']({},JSON[_0x53b73e(0x224)](_0x367dcb)));break;default:continue;}_0x2a31b7[_0x4af08b]=_0x3c817b;}}return _0x2a31b7;},(_0x409cbb=>{const _0x2a1766=_0x45a258,_0x1e79b5=_0x409cbb[_0x2a1766(0x520)];for(const _0x26145e of dependencies){if(!Imported[_0x26145e]){alert(_0x2a1766(0x457)['format'](_0x1e79b5,_0x26145e)),SceneManager['exit']();break;}}const _0x51e625=_0x409cbb[_0x2a1766(0x283)];if(_0x51e625[_0x2a1766(0x463)](/\[Version[ ](.*?)\]/i)){const _0x41ec1b=Number(RegExp['$1']);_0x41ec1b!==VisuMZ[label][_0x2a1766(0x2a0)]&&(alert(_0x2a1766(0x205)[_0x2a1766(0x288)](_0x1e79b5,_0x41ec1b)),SceneManager['exit']());}if(_0x51e625[_0x2a1766(0x463)](/\[Tier[ ](\d+)\]/i)){const _0x29ee4d=Number(RegExp['$1']);_0x29ee4d<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2a1766(0x288)](_0x1e79b5,_0x29ee4d,tier)),SceneManager[_0x2a1766(0x405)]()):tier=Math[_0x2a1766(0x375)](_0x29ee4d,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x409cbb[_0x2a1766(0x3dd)]);})(pluginData),PluginManager[_0x45a258(0x4c3)](pluginData[_0x45a258(0x520)],_0x45a258(0x3d0),_0x113059=>{const _0x561bb4=_0x45a258;VisuMZ['ConvertParams'](_0x113059,_0x113059);const _0x185fe7=Number(_0x113059[_0x561bb4(0x529)])||0x0;$gameSystem['setChoiceMessageDistance'](_0x185fe7);}),PluginManager[_0x45a258(0x4c3)](pluginData[_0x45a258(0x520)],_0x45a258(0x3e8),_0x40622c=>{const _0x2c444e=_0x45a258;VisuMZ[_0x2c444e(0x4dc)](_0x40622c,_0x40622c);const _0x1024f4=_0x40622c[_0x2c444e(0x475)]||$gameSystem[_0x2c444e(0x4b5)]()||0x1,_0x572a32=_0x40622c['MinWidth']??0x60,_0x124a91=_0x40622c[_0x2c444e(0x38d)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x102074=_0x40622c[_0x2c444e(0x3f7)]||$gameSystem[_0x2c444e(0x2e3)]()||0x1,_0x4686be=_0x40622c[_0x2c444e(0x3a2)]['toLowerCase']()||_0x2c444e(0x402);$gameSystem[_0x2c444e(0x2c9)](_0x1024f4),$gameSystem['setChoiceListMinChoiceWidth'](_0x572a32),$gameSystem['setChoiceListMaxRows'](_0x124a91),$gameSystem[_0x2c444e(0x3ff)](_0x102074),$gameSystem[_0x2c444e(0x210)](_0x4686be);}),PluginManager[_0x45a258(0x4c3)](pluginData['name'],'MessageWindowProperties',_0x22a8f9=>{const _0x234cc0=_0x45a258;VisuMZ['ConvertParams'](_0x22a8f9,_0x22a8f9);const _0x6f70b0=_0x22a8f9[_0x234cc0(0x54c)]||$gameSystem[_0x234cc0(0x1e7)]()||0x1,_0x1f5796=_0x22a8f9['Width']||$gameSystem[_0x234cc0(0x364)]()||0x1;$gameTemp[_0x234cc0(0x409)]=!![];const _0x25005f=_0x22a8f9[_0x234cc0(0x3fc)][_0x234cc0(0x450)]();$gameSystem[_0x234cc0(0x47a)](_0x6f70b0),$gameSystem[_0x234cc0(0x43a)](_0x1f5796);[_0x234cc0(0x3bc),_0x234cc0(0x1d9)][_0x234cc0(0x353)](_0x25005f)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x25005f));const _0x4db7d1=SceneManager[_0x234cc0(0x397)]['_messageWindow'];_0x4db7d1&&(_0x4db7d1[_0x234cc0(0x383)](),_0x4db7d1[_0x234cc0(0x4a1)](),_0x4db7d1[_0x234cc0(0x3a9)]());}),PluginManager[_0x45a258(0x4c3)](pluginData[_0x45a258(0x520)],_0x45a258(0x396),_0x544d34=>{const _0xd144e6=_0x45a258;VisuMZ[_0xd144e6(0x4dc)](_0x544d34,_0x544d34),$gameSystem[_0xd144e6(0x407)](_0x544d34['OffsetX'],_0x544d34[_0xd144e6(0x477)]);const _0x48c00f=SceneManager[_0xd144e6(0x397)]['_messageWindow'];_0x48c00f&&(_0x48c00f[_0xd144e6(0x383)](),_0x48c00f[_0xd144e6(0x4a1)](),_0x48c00f['createContents']());}),PluginManager['registerCommand'](pluginData[_0x45a258(0x520)],_0x45a258(0x3bd),_0x2110a0=>{const _0x50ff54=_0x45a258;VisuMZ[_0x50ff54(0x4dc)](_0x2110a0,_0x2110a0),$gameMessage[_0x50ff54(0x4a2)](_0x2110a0[_0x50ff54(0x40e)]||0x0,_0x2110a0[_0x50ff54(0x3aa)]||0x0);const _0x505a40=$gameTemp[_0x50ff54(0x23e)]();if(_0x505a40)_0x505a40['setWaitMode'](_0x50ff54(0x4e1));}),PluginManager[_0x45a258(0x4c3)](pluginData[_0x45a258(0x520)],_0x45a258(0x2a2),_0x3fc194=>{const _0x9c46de=_0x45a258;VisuMZ['ConvertParams'](_0x3fc194,_0x3fc194),$gameMessage[_0x9c46de(0x31d)](_0x3fc194[_0x9c46de(0x40e)]||0x0,_0x3fc194[_0x9c46de(0x22b)]||0x0,_0x3fc194[_0x9c46de(0x21f)]||0x0);const _0x173e23=$gameTemp[_0x9c46de(0x23e)]();if(_0x173e23)_0x173e23[_0x9c46de(0x191)](_0x9c46de(0x4e1));}),PluginManager[_0x45a258(0x4c3)](pluginData['name'],_0x45a258(0x3b6),_0x3b2303=>{const _0x276013=_0x45a258;VisuMZ[_0x276013(0x4dc)](_0x3b2303,_0x3b2303),$gameMessage['setSkillChoice'](_0x3b2303[_0x276013(0x40e)]||0x0,_0x3b2303['ActorID']||0x0,_0x3b2303[_0x276013(0x427)]||0x0);const _0x4e1b66=$gameTemp['getLastPluginCommandInterpreter']();if(_0x4e1b66)_0x4e1b66[_0x276013(0x191)](_0x276013(0x4e1));}),PluginManager[_0x45a258(0x4c3)](pluginData[_0x45a258(0x520)],_0x45a258(0x3e2),_0x35cdd1=>{const _0x28c948=_0x45a258;VisuMZ[_0x28c948(0x4dc)](_0x35cdd1,_0x35cdd1);const _0x42fced=_0x35cdd1[_0x28c948(0x22a)]||[],_0x508d1c=_0x35cdd1[_0x28c948(0x3d3)]||0x0,_0x1a4bd6=['upperleft','up',_0x28c948(0x51f),_0x28c948(0x30b),_0x28c948(0x2af),_0x28c948(0x19d),_0x28c948(0x53c),_0x28c948(0x21d),_0x28c948(0x1e1)];for(const _0x44635d of _0x42fced){$gameScreen[_0x28c948(0x27e)](_0x44635d,_0x508d1c);for(const _0x3ed434 of _0x1a4bd6){if(_0x35cdd1[_0x3ed434]===undefined)continue;$gameScreen[_0x28c948(0x44d)](_0x44635d,_0x35cdd1[_0x3ed434],_0x3ed434);}}}),PluginManager[_0x45a258(0x4c3)](pluginData[_0x45a258(0x520)],'PictureTextErase',_0x5845dd=>{const _0x5d1a90=_0x45a258;VisuMZ[_0x5d1a90(0x4dc)](_0x5845dd,_0x5845dd);const _0x463c60=_0x5845dd['PictureIDs']||[];for(const _0x5bf43e of _0x463c60){$gameScreen[_0x5d1a90(0x4f6)](_0x5bf43e),$gameScreen[_0x5d1a90(0x3c9)](_0x5bf43e);}}),PluginManager[_0x45a258(0x4c3)](pluginData[_0x45a258(0x520)],_0x45a258(0x4ec),_0x1e7cf4=>{const _0x540549=_0x45a258;$gameScreen[_0x540549(0x34c)]();}),VisuMZ['MessageCore'][_0x45a258(0x361)]=Scene_Boot[_0x45a258(0x2fd)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x45a258(0x39e)]=function(){const _0x35195a=_0x45a258;VisuMZ[_0x35195a(0x428)][_0x35195a(0x361)]['call'](this),VisuMZ[_0x35195a(0x428)]['CheckCompatibility'](),this[_0x35195a(0x3fa)](),this[_0x35195a(0x2d1)](),this[_0x35195a(0x3e6)](),this[_0x35195a(0x269)]();},VisuMZ[_0x45a258(0x428)][_0x45a258(0x44c)]=function(){const _0x2c1802=_0x45a258;if(Imported['VisuMZ_4_ExtraEnemyDrops']&&VisuMZ[_0x2c1802(0x4bc)][_0x2c1802(0x2a0)]<1.09){let _0x1a54db='';_0x1a54db+=_0x2c1802(0x3af),_0x1a54db+=_0x2c1802(0x1dc),alert(_0x1a54db),SceneManager[_0x2c1802(0x405)]();}},VisuMZ[_0x45a258(0x428)][_0x45a258(0x261)]=function(_0x1915d7){const _0x3e8c6d=_0x45a258,_0x1bcbb2=VisuMZ[_0x3e8c6d(0x428)][_0x3e8c6d(0x49c)][_0x1915d7];_0x1bcbb2[_0x3e8c6d(0x3a6)]((_0x54986f,_0x2054bd)=>{const _0x40b257=_0x3e8c6d;if(!_0x54986f||!_0x2054bd)return-0x1;return _0x2054bd['Match']['length']-_0x54986f[_0x40b257(0x1d5)][_0x40b257(0x495)];});},Scene_Boot[_0x45a258(0x2fd)][_0x45a258(0x3fa)]=function(){const _0x1bf630=_0x45a258;VisuMZ['MessageCore'][_0x1bf630(0x261)](_0x1bf630(0x344));for(const _0x4c8604 of VisuMZ[_0x1bf630(0x428)][_0x1bf630(0x49c)][_0x1bf630(0x344)]){_0x4c8604[_0x1bf630(0x1d5)]=_0x4c8604[_0x1bf630(0x1d5)][_0x1bf630(0x462)](),_0x4c8604['textCodeCheck']=new RegExp('\x1b'+_0x4c8604[_0x1bf630(0x1d5)],'gi'),_0x4c8604[_0x1bf630(0x41f)]='\x1b'+_0x4c8604[_0x1bf630(0x1d5)];if(_0x4c8604[_0x1bf630(0x24e)]==='')_0x4c8604[_0x1bf630(0x41f)]+='[0]';}},Scene_Boot['prototype'][_0x45a258(0x2d1)]=function(){const _0x5884ee=_0x45a258;VisuMZ[_0x5884ee(0x428)][_0x5884ee(0x261)](_0x5884ee(0x456));for(const _0x3b35f5 of VisuMZ[_0x5884ee(0x428)][_0x5884ee(0x49c)][_0x5884ee(0x456)]){_0x3b35f5['textCodeCheck']=new RegExp('\x1b'+_0x3b35f5[_0x5884ee(0x1d5)]+_0x3b35f5[_0x5884ee(0x24e)],'gi'),_0x3b35f5['TextStr']!==''&&_0x3b35f5[_0x5884ee(0x1a4)]!=='Undefined'?_0x3b35f5['textCodeResult']=new Function(_0x5884ee(0x481)+_0x3b35f5[_0x5884ee(0x1a4)][_0x5884ee(0x1cb)](/\\/g,'\x1b')+'\x27'):_0x3b35f5[_0x5884ee(0x41f)]=_0x3b35f5['TextJS'];}},Scene_Boot[_0x45a258(0x2fd)][_0x45a258(0x3e6)]=function(){const _0xfe5dc1=_0x45a258;for(const _0x461d38 of VisuMZ[_0xfe5dc1(0x428)][_0xfe5dc1(0x49c)]['TextMacros']){_0x461d38[_0xfe5dc1(0x2d9)]=new RegExp('\x5c['+_0x461d38[_0xfe5dc1(0x1d5)]+'\x5c]','gi');if(_0x461d38[_0xfe5dc1(0x1a4)]!==''&&_0x461d38['TextStr']!=='Undefined'){let _0x36db74=_0x461d38[_0xfe5dc1(0x1a4)];_0x36db74=_0x36db74[_0xfe5dc1(0x1cb)](/\\/g,'\x1b'),_0x36db74=_0x36db74[_0xfe5dc1(0x1cb)]('\x27','\x5c\x27'),_0x36db74=_0x36db74[_0xfe5dc1(0x1cb)]('\x22','\x5c\x22'),_0x461d38['textCodeResult']=new Function(_0xfe5dc1(0x481)+_0x36db74+'\x27');}else _0x461d38[_0xfe5dc1(0x41f)]=_0x461d38['TextJS'];}},Scene_Boot[_0x45a258(0x2fd)]['process_VisuMZ_MessageCore_AutoColor']=function(){const _0x76cc8=_0x45a258,_0x2a9dcd=VisuMZ[_0x76cc8(0x428)][_0x76cc8(0x49c)][_0x76cc8(0x1d8)];!VisuMZ['ParseAllNotetags']&&(VisuMZ[_0x76cc8(0x428)]['AddAutoColor']($dataClasses,_0x2a9dcd[_0x76cc8(0x34b)]),VisuMZ[_0x76cc8(0x428)][_0x76cc8(0x4a4)]($dataSkills,_0x2a9dcd[_0x76cc8(0x21c)]),VisuMZ[_0x76cc8(0x428)][_0x76cc8(0x4a4)]($dataItems,_0x2a9dcd[_0x76cc8(0x32a)]),VisuMZ['MessageCore'][_0x76cc8(0x4a4)]($dataWeapons,_0x2a9dcd[_0x76cc8(0x4b9)]),VisuMZ[_0x76cc8(0x428)][_0x76cc8(0x4a4)]($dataArmors,_0x2a9dcd['Armors']),VisuMZ[_0x76cc8(0x428)][_0x76cc8(0x4a4)]($dataEnemies,_0x2a9dcd[_0x76cc8(0x1de)]),VisuMZ[_0x76cc8(0x428)]['AddAutoColor']($dataStates,_0x2a9dcd['States'])),VisuMZ[_0x76cc8(0x428)][_0x76cc8(0x202)]();},VisuMZ[_0x45a258(0x428)][_0x45a258(0x49d)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^','<B>',_0x45a258(0x369),_0x45a258(0x1c1),_0x45a258(0x1d3),'<LEFT>',_0x45a258(0x1b2),_0x45a258(0x2d5),_0x45a258(0x4f4),'<RIGHT>',_0x45a258(0x45b),_0x45a258(0x393),_0x45a258(0x4e4),_0x45a258(0x204),')))',_0x45a258(0x24d),_0x45a258(0x26f),_0x45a258(0x391),_0x45a258(0x548),_0x45a258(0x4d9),_0x45a258(0x3c8),_0x45a258(0x34a),_0x45a258(0x1ab),_0x45a258(0x232),'HIDE','ENABLE',_0x45a258(0x48a),'SWITCH',_0x45a258(0x451),_0x45a258(0x252),'ANY'],VisuMZ['MessageCore']['AddAutoColor']=function(_0x348194,_0x1a2e42){const _0x324a8c=_0x45a258;if(_0x1a2e42<=0x0)return;const _0x5e3bcb=_0x348194;for(const _0x31c4ac of _0x5e3bcb){if(!_0x31c4ac)continue;VisuMZ[_0x324a8c(0x428)]['CreateAutoColorFor'](_0x31c4ac,_0x1a2e42);}},VisuMZ[_0x45a258(0x428)]['CreateAutoColorRegExpLists']=function(){const _0x52187a=_0x45a258;VisuMZ['MessageCore']['AutoColorRegExp']=[];for(let _0x43ae94=0x1;_0x43ae94<=0x1f;_0x43ae94++){const _0x3def2b=_0x52187a(0x22f)[_0x52187a(0x288)](_0x43ae94),_0x83deff=VisuMZ['MessageCore'][_0x52187a(0x49c)][_0x52187a(0x1d8)][_0x3def2b];_0x83deff['sort']((_0xf95fa0,_0x228c47)=>{const _0x3ef9fd=_0x52187a;if(!_0xf95fa0||!_0x228c47)return-0x1;return _0x228c47['length']-_0xf95fa0[_0x3ef9fd(0x495)];}),this[_0x52187a(0x3f8)](_0x83deff,_0x43ae94);}},VisuMZ['MessageCore'][_0x45a258(0x3f8)]=function(_0x4d0e27,_0x461e8a){const _0x523aaa=_0x45a258;for(const _0x4d59f1 of _0x4d0e27){if(_0x4d59f1['length']<=0x0)continue;if(/^\d+$/['test'](_0x4d59f1))continue;let _0x375ccb=VisuMZ['MessageCore'][_0x523aaa(0x39a)](_0x4d59f1);if(_0x4d59f1[_0x523aaa(0x463)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x39ab66=new RegExp(_0x375ccb,'i');else var _0x39ab66=new RegExp('\x5cb'+_0x375ccb+'\x5cb','g');VisuMZ['MessageCore'][_0x523aaa(0x3f1)][_0x523aaa(0x46d)]([_0x39ab66,_0x523aaa(0x3b2)[_0x523aaa(0x288)](_0x461e8a,_0x4d59f1)]);}},VisuMZ[_0x45a258(0x428)][_0x45a258(0x39a)]=function(_0x1f87f6){const _0x4b00df=_0x45a258;return _0x1f87f6=_0x1f87f6['replace'](/(\W)/gi,(_0x4800eb,_0x292342)=>_0x4b00df(0x423)['format'](_0x292342)),_0x1f87f6;},VisuMZ['MessageCore']['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0x58d949){const _0x274008=_0x45a258;VisuMZ['MessageCore'][_0x274008(0x317)]['call'](this,_0x58d949);const _0x14f670=VisuMZ['MessageCore'][_0x274008(0x49c)][_0x274008(0x1d8)];VisuMZ[_0x274008(0x428)][_0x274008(0x52e)](_0x58d949,_0x14f670[_0x274008(0x34b)]);},VisuMZ['MessageCore'][_0x45a258(0x3d4)]=VisuMZ[_0x45a258(0x3d4)],VisuMZ['ParseSkillNotetags']=function(_0x4e432a){const _0x4afdaa=_0x45a258;VisuMZ['MessageCore'][_0x4afdaa(0x3d4)][_0x4afdaa(0x388)](this,_0x4e432a);const _0x1a38a1=VisuMZ[_0x4afdaa(0x428)]['Settings'][_0x4afdaa(0x1d8)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x4e432a,_0x1a38a1[_0x4afdaa(0x21c)]);},0x7,VisuMZ['MessageCore'][_0x45a258(0x32d)]=VisuMZ[_0x45a258(0x32d)],VisuMZ[_0x45a258(0x32d)]=function(_0x9ae10b){const _0x3f14c5=_0x45a258;VisuMZ[_0x3f14c5(0x428)][_0x3f14c5(0x32d)][_0x3f14c5(0x388)](this,_0x9ae10b);const _0xc3d895=VisuMZ[_0x3f14c5(0x428)]['Settings']['AutoColor'];VisuMZ['MessageCore'][_0x3f14c5(0x52e)](_0x9ae10b,_0xc3d895[_0x3f14c5(0x32a)]);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x37c)]=VisuMZ['ParseWeaponNotetags'],VisuMZ['ParseWeaponNotetags']=function(_0x24787c){const _0x1cb634=_0x45a258;VisuMZ[_0x1cb634(0x428)][_0x1cb634(0x37c)][_0x1cb634(0x388)](this,_0x24787c);const _0x1a08ce=VisuMZ[_0x1cb634(0x428)][_0x1cb634(0x49c)]['AutoColor'];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x24787c,_0x1a08ce[_0x1cb634(0x4b9)]);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x33f)]=VisuMZ[_0x45a258(0x33f)],VisuMZ[_0x45a258(0x33f)]=function(_0x7c6ae8){const _0x2c0c55=_0x45a258;VisuMZ[_0x2c0c55(0x428)][_0x2c0c55(0x33f)][_0x2c0c55(0x388)](this,_0x7c6ae8);const _0x38a824=VisuMZ[_0x2c0c55(0x428)][_0x2c0c55(0x49c)][_0x2c0c55(0x1d8)];VisuMZ[_0x2c0c55(0x428)]['CreateAutoColorFor'](_0x7c6ae8,_0x38a824[_0x2c0c55(0x413)]);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x1b6)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x45a258(0x1b6)]=function(_0x4d6301){const _0x1d9b8d=_0x45a258;VisuMZ[_0x1d9b8d(0x428)][_0x1d9b8d(0x1b6)]['call'](this,_0x4d6301);const _0x3409e2=VisuMZ['MessageCore'][_0x1d9b8d(0x49c)][_0x1d9b8d(0x1d8)];VisuMZ[_0x1d9b8d(0x428)]['CreateAutoColorFor'](_0x4d6301,_0x3409e2['Enemies']);},VisuMZ['MessageCore']['ParseStateNotetags']=VisuMZ[_0x45a258(0x213)],VisuMZ['ParseStateNotetags']=function(_0x3e2a0e){const _0x9cfc8e=_0x45a258;VisuMZ['MessageCore'][_0x9cfc8e(0x213)][_0x9cfc8e(0x388)](this,_0x3e2a0e);const _0x2c4dbc=VisuMZ[_0x9cfc8e(0x428)][_0x9cfc8e(0x49c)][_0x9cfc8e(0x1d8)];VisuMZ[_0x9cfc8e(0x428)][_0x9cfc8e(0x52e)](_0x3e2a0e,_0x2c4dbc[_0x9cfc8e(0x384)]);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x52e)]=function(_0x3c7a60,_0x163d1e){const _0x2821d0=_0x45a258;if(_0x163d1e<=0x0)return;const _0x2df68d=VisuMZ[_0x2821d0(0x428)][_0x2821d0(0x49c)][_0x2821d0(0x1d8)][_0x2821d0(0x3e3)+_0x163d1e];let _0x4284dc=_0x3c7a60[_0x2821d0(0x520)][_0x2821d0(0x531)]();if(/^\d+$/['test'](_0x4284dc))return;if(VisuMZ[_0x2821d0(0x428)][_0x2821d0(0x49d)][_0x2821d0(0x353)](_0x4284dc[_0x2821d0(0x462)]()))return;_0x4284dc=_0x4284dc[_0x2821d0(0x1cb)](/\\I\[(\d+)\]/gi,''),_0x4284dc=_0x4284dc['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x4284dc[_0x2821d0(0x495)]<=0x0)return;if(_0x4284dc[_0x2821d0(0x463)](/-----/i))return;_0x2df68d[_0x2821d0(0x46d)](_0x4284dc);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x1ea)]=Scene_Boot['prototype'][_0x45a258(0x3c7)],Scene_Boot[_0x45a258(0x2fd)]['loadGameFonts']=function(){const _0xca9423=_0x45a258;VisuMZ[_0xca9423(0x428)]['Scene_Boot_loadGameFonts']['call'](this),this['loadCustomFontsMessageCore']();},Scene_Boot[_0x45a258(0x2fd)][_0x45a258(0x251)]=function(){const _0x9fa5b4=_0x45a258,_0x1f7030=VisuMZ['MessageCore'][_0x9fa5b4(0x49c)][_0x9fa5b4(0x351)]||[];for(const _0x3951b8 of _0x1f7030){if(!_0x3951b8)continue;const _0x5a1d62=_0x3951b8['FontFamily'];if(_0x5a1d62[_0x9fa5b4(0x531)]()==='')continue;if(_0x5a1d62['toLowerCase']()[_0x9fa5b4(0x531)]()===_0x9fa5b4(0x533))continue;const _0x4d9fb2=_0x3951b8[_0x9fa5b4(0x4ee)];if(_0x4d9fb2===_0x9fa5b4(0x3cb))continue;FontManager[_0x9fa5b4(0x326)](_0x5a1d62,_0x4d9fb2);}},VisuMZ[_0x45a258(0x428)]['DataManager_loadDatabase']=DataManager[_0x45a258(0x43c)],DataManager['loadDatabase']=function(){const _0x725074=_0x45a258;VisuMZ[_0x725074(0x428)][_0x725074(0x2f3)][_0x725074(0x388)](this),this[_0x725074(0x433)]();},DataManager[_0x45a258(0x433)]=function(){const _0x57787b=_0x45a258;if(!TextManager['isVisuMzLocalizationEnabled']())return;const _0x41168e=VisuMZ['MessageCore']['Settings'][_0x57787b(0x50b)],_0x56eb28=_0x41168e['CsvFilename']||'';if(!_0x56eb28)return;const _0x4d254f='$dataLocalization',_0x368533=new XMLHttpRequest(),_0x415c78=_0x57787b(0x2d6)+_0x56eb28;window[_0x4d254f]=null,_0x368533['open'](_0x57787b(0x4f7),_0x415c78),_0x368533['overrideMimeType']('application/csv'),_0x368533[_0x57787b(0x513)]=()=>this[_0x57787b(0x422)](_0x368533,_0x4d254f),_0x368533['onerror']=()=>this[_0x57787b(0x278)](),_0x368533[_0x57787b(0x31e)]();},DataManager[_0x45a258(0x422)]=function(_0x4c3fe2,_0x1700e6){const _0x5cad25=_0x45a258;if(_0x4c3fe2[_0x5cad25(0x390)]>=0x190)return;const _0x553b9e=_0x4c3fe2['responseText'];window[_0x1700e6]=VisuMZ[_0x5cad25(0x428)][_0x5cad25(0x496)](_0x553b9e);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x496)]=function(_0x11565c){const _0x20b19f=_0x45a258,_0x2a3ec5=_0x11565c['split']('\x0a'),_0x5e3096=_0x2a3ec5[0x0][_0x20b19f(0x18c)](';'),_0x2c4255={};return _0x2a3ec5[_0x20b19f(0x229)](0x1)[_0x20b19f(0x4e2)](_0x3dece5=>{const _0x25ce0d=_0x20b19f;let _0x4b2510=[],_0x506efb='',_0x5cd7ec=![];for(let _0x365f4b=0x0;_0x365f4b<_0x3dece5[_0x25ce0d(0x495)];_0x365f4b++){let _0x384cd1=_0x3dece5[_0x365f4b];if(_0x384cd1==='\x22')_0x5cd7ec&&_0x3dece5[_0x365f4b+0x1]==='\x22'?(_0x506efb+=_0x384cd1,_0x365f4b++):_0x5cd7ec=!_0x5cd7ec;else _0x384cd1===';'&&!_0x5cd7ec?(_0x4b2510[_0x25ce0d(0x46d)](_0x506efb),_0x506efb=''):_0x506efb+=_0x384cd1;}if(_0x506efb)_0x4b2510[_0x25ce0d(0x46d)](_0x506efb);if(!_0x4b2510[0x0])_0x4b2510[0x0]='';const _0x94c301=_0x4b2510[0x0][_0x25ce0d(0x1cb)](/^"|"$/g,'')['toLowerCase']()[_0x25ce0d(0x531)]();_0x2c4255[_0x94c301]=_0x5e3096[_0x25ce0d(0x229)](0x1)[_0x25ce0d(0x1e4)]((_0x25edef,_0x3624ad,_0x50c3df)=>{const _0xdf0465=_0x25ce0d;return _0x25edef[_0x3624ad]=(_0x4b2510[_0x50c3df+0x1]||'')[_0xdf0465(0x1cb)](/^"|"$/g,''),_0x25edef;},{});}),_0x2c4255;},DataManager[_0x45a258(0x278)]=function(){const _0x2cf8db=_0x45a258;let _0x5cd6bb='';_0x5cd6bb+=_0x2cf8db(0x445),_0x5cd6bb+='Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20CSV\x20file?\x0a\x0a',confirm(_0x5cd6bb)?Utils['isOptionValid']('test')?(_0x5cd6bb='CSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a',alert(_0x5cd6bb),this[_0x2cf8db(0x277)](),this[_0x2cf8db(0x363)](),_0x5cd6bb=''):_0x5cd6bb=_0x2cf8db(0x3f0):_0x5cd6bb=_0x2cf8db(0x23c),_0x5cd6bb+=_0x2cf8db(0x20f),alert(_0x5cd6bb),SceneManager[_0x2cf8db(0x405)]();},DataManager[_0x45a258(0x277)]=function(){const _0x56f1f0=_0x45a258,_0x281085=['Key',_0x56f1f0(0x51e),_0x56f1f0(0x2ac),_0x56f1f0(0x25d),'Chinese(Traditional)',_0x56f1f0(0x483),'Danish',_0x56f1f0(0x219),'Finnish','French',_0x56f1f0(0x254),'Greek',_0x56f1f0(0x336),_0x56f1f0(0x3eb),_0x56f1f0(0x25a),_0x56f1f0(0x471),_0x56f1f0(0x389),_0x56f1f0(0x42d),_0x56f1f0(0x28a),_0x56f1f0(0x37f),_0x56f1f0(0x2c3),_0x56f1f0(0x4d5),_0x56f1f0(0x1fa),_0x56f1f0(0x448),'Spanish',_0x56f1f0(0x2d3),_0x56f1f0(0x1c7),_0x56f1f0(0x1e9),_0x56f1f0(0x430)],_0x3187f1=[_0x56f1f0(0x3a8),_0x56f1f0(0x236),_0x56f1f0(0x225),'你好','你好',_0x56f1f0(0x2a9),_0x56f1f0(0x3fe),_0x56f1f0(0x34f),_0x56f1f0(0x335),_0x56f1f0(0x359),_0x56f1f0(0x34f),_0x56f1f0(0x4e0),_0x56f1f0(0x490),'Szia',_0x56f1f0(0x270),_0x56f1f0(0x3e7),_0x56f1f0(0x3da),_0x56f1f0(0x2fc),_0x56f1f0(0x335),_0x56f1f0(0x4a5),_0x56f1f0(0x2bf),_0x56f1f0(0x220),_0x56f1f0(0x246),'Ahoj',_0x56f1f0(0x508),'Hej',_0x56f1f0(0x3d1),_0x56f1f0(0x497),_0x56f1f0(0x264)],_0x3d673e=[_0x56f1f0(0x46f),'Good-bye',_0x56f1f0(0x42c),'再见','再見',_0x56f1f0(0x1a3),_0x56f1f0(0x2f7),_0x56f1f0(0x2e6),_0x56f1f0(0x48f),_0x56f1f0(0x510),_0x56f1f0(0x200),_0x56f1f0(0x2bb),_0x56f1f0(0x286),_0x56f1f0(0x2e2),_0x56f1f0(0x35b),_0x56f1f0(0x1d6),_0x56f1f0(0x50c),'안녕히\x20가세요',_0x56f1f0(0x4a7),_0x56f1f0(0x337),_0x56f1f0(0x512),_0x56f1f0(0x1fc),'До\x20свидания',_0x56f1f0(0x1f4),_0x56f1f0(0x439),_0x56f1f0(0x45e),'பிரியாவிடை',_0x56f1f0(0x4d4),_0x56f1f0(0x263)],_0x482776=[_0x56f1f0(0x4af),_0x56f1f0(0x4af),'ওহে','哇','哇','Ó',_0x56f1f0(0x4af),_0x56f1f0(0x1ac),_0x56f1f0(0x4b4),_0x56f1f0(0x268),_0x56f1f0(0x4af),_0x56f1f0(0x395),'वाह',_0x56f1f0(0x3ec),_0x56f1f0(0x32f),_0x56f1f0(0x4af),'ワオ','와우','Oi','O',_0x56f1f0(0x48c),_0x56f1f0(0x48c),_0x56f1f0(0x2eb),'Ó','Guau','Oj','ஆஹா',_0x56f1f0(0x329),_0x56f1f0(0x1c6)],_0x2dcfcf=[_0x281085,_0x3187f1,_0x3d673e,_0x482776],_0x504e14=_0x2dcfcf[_0x56f1f0(0x342)](_0x515a58=>_0x515a58[_0x56f1f0(0x228)](';'))[_0x56f1f0(0x228)]('\x0a'),_0x20b5b0=VisuMZ[_0x56f1f0(0x428)]['Settings'][_0x56f1f0(0x50b)],_0x48ffec=_0x20b5b0[_0x56f1f0(0x416)]||'Languages.csv',_0x1d3084=require(_0x56f1f0(0x1a8)),_0x3609b3=_0x1d3084[_0x56f1f0(0x1a2)](process['mainModule'][_0x56f1f0(0x480)]),_0x42a77c=_0x1d3084['join'](_0x3609b3,'data/'),_0x756847=_0x42a77c+_0x48ffec,_0x13c4cd=require('fs');return _0x13c4cd[_0x56f1f0(0x27d)](_0x756847,_0x504e14),_0x756847;},DataManager['openLocalizationFolder']=function(){const _0x3e228e=_0x45a258,{exec:_0x37f373}=require(_0x3e228e(0x541));_0x37f373(_0x3e228e(0x331)),_0x37f373(_0x3e228e(0x50e));},SceneManager[_0x45a258(0x2a4)]=function(){const _0x21bb96=_0x45a258;return this[_0x21bb96(0x397)]&&this['_scene'][_0x21bb96(0x2cd)]===Scene_Battle;},SceneManager[_0x45a258(0x287)]=function(){const _0x562ed1=_0x45a258;return this['_scene']&&this[_0x562ed1(0x397)][_0x562ed1(0x2cd)]===Scene_Map;},ConfigManager[_0x45a258(0x54a)]=VisuMZ[_0x45a258(0x428)]['Settings'][_0x45a258(0x50b)][_0x45a258(0x345)]||_0x45a258(0x51e),ConfigManager[_0x45a258(0x304)]=VisuMZ[_0x45a258(0x428)][_0x45a258(0x49c)][_0x45a258(0x2c5)][_0x45a258(0x230)],VisuMZ[_0x45a258(0x428)][_0x45a258(0x1f3)]=ConfigManager[_0x45a258(0x299)],ConfigManager['makeData']=function(){const _0x574f67=_0x45a258,_0x2edd3e=VisuMZ[_0x574f67(0x428)][_0x574f67(0x1f3)][_0x574f67(0x388)](this);return TextManager[_0x574f67(0x476)]()&&(_0x2edd3e[_0x574f67(0x54a)]=this[_0x574f67(0x54a)]),_0x2edd3e[_0x574f67(0x304)]=this['textSpeed'],_0x2edd3e;},VisuMZ['MessageCore']['ConfigManager_applyData']=ConfigManager['applyData'],ConfigManager[_0x45a258(0x387)]=function(_0x5f191a){const _0x44cd98=_0x45a258;VisuMZ['MessageCore'][_0x44cd98(0x385)][_0x44cd98(0x388)](this,_0x5f191a),TextManager['isVisuMzLocalizationEnabled']()&&('textLocale'in _0x5f191a?this['textLocale']=String(_0x5f191a[_0x44cd98(0x54a)]):this[_0x44cd98(0x54a)]=VisuMZ['MessageCore'][_0x44cd98(0x49c)][_0x44cd98(0x50b)]['DefaultLocale']||_0x44cd98(0x51e)),_0x44cd98(0x304)in _0x5f191a?this['textSpeed']=Number(_0x5f191a[_0x44cd98(0x304)])[_0x44cd98(0x245)](0x1,0xb):this[_0x44cd98(0x304)]=VisuMZ[_0x44cd98(0x428)][_0x44cd98(0x49c)][_0x44cd98(0x2c5)][_0x44cd98(0x230)];},TextManager[_0x45a258(0x54d)]=VisuMZ[_0x45a258(0x428)][_0x45a258(0x49c)][_0x45a258(0x50b)][_0x45a258(0x1e6)],TextManager[_0x45a258(0x1ed)]=VisuMZ[_0x45a258(0x428)]['Settings'][_0x45a258(0x2c5)][_0x45a258(0x1e6)],TextManager[_0x45a258(0x194)]=VisuMZ[_0x45a258(0x428)][_0x45a258(0x49c)]['TextSpeed'][_0x45a258(0x266)],VisuMZ[_0x45a258(0x428)][_0x45a258(0x4a6)]=TextManager['message'],TextManager[_0x45a258(0x4e1)]=function(_0x490eab){const _0x609863=_0x45a258,_0x11d106=[_0x609863(0x4b7),_0x609863(0x295),'preemptive',_0x609863(0x411),_0x609863(0x1df),_0x609863(0x419),_0x609863(0x377),_0x609863(0x2b5),_0x609863(0x279),'obtainItem'];let _0x52d99c=VisuMZ[_0x609863(0x428)][_0x609863(0x4a6)][_0x609863(0x388)](this,_0x490eab);return _0x11d106[_0x609863(0x353)](_0x490eab)&&(_0x52d99c=_0x609863(0x26f)+_0x52d99c),_0x52d99c;},TextManager[_0x45a258(0x476)]=function(){const _0x85a107=_0x45a258;return VisuMZ['MessageCore'][_0x85a107(0x49c)]['Localization']['Enable'];},TextManager[_0x45a258(0x212)]=function(_0x207ec5){const _0xa343d4=_0x45a258;if(!this[_0xa343d4(0x476)]())return _0x207ec5;return _0x207ec5=String(_0x207ec5)[_0xa343d4(0x1cb)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x4c60d7,_0xb7ed1f)=>this['getLocalizedText'](String(_0xb7ed1f))),_0x207ec5=String(_0x207ec5)[_0xa343d4(0x1cb)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x43a067,_0x521d79)=>this['getLocalizedText'](String(_0x521d79))),_0x207ec5=String(_0x207ec5)[_0xa343d4(0x1cb)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x230795,_0x2ead8d)=>this[_0xa343d4(0x3a4)](String(_0x2ead8d))),_0x207ec5;},TextManager['getLocalizedText']=function(_0x2bb6d9){const _0x52034e=_0x45a258;if(!$dataLocalization)return'';const _0x368a20=$dataLocalization[_0x2bb6d9[_0x52034e(0x450)]()[_0x52034e(0x531)]()];if(!_0x368a20)return;const _0x16af17=ConfigManager[_0x52034e(0x54a)]||_0x52034e(0x51e);let _0x3cb8fd=_0x368a20[_0x16af17]||_0x52034e(0x522);return _0x3cb8fd=_0x3cb8fd[_0x52034e(0x1cb)](/\\/g,'\x1b'),_0x3cb8fd=_0x3cb8fd[_0x52034e(0x1cb)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x3cb8fd;},TextManager[_0x45a258(0x524)]=function(_0x2aa6db){const _0x56f715=_0x45a258;return VisuMZ[_0x56f715(0x428)][_0x56f715(0x49c)][_0x56f715(0x50b)][_0x2aa6db]||'';},TextManager['getCurrentLanguage']=function(){const _0x4ee829=_0x45a258,_0xcefd93=ConfigManager[_0x4ee829(0x54a)]||'English';return this[_0x4ee829(0x524)](_0xcefd93);},TextManager['getLanguageAt']=function(_0x4da017){const _0x4c1663=_0x45a258,_0x2deef3=VisuMZ[_0x4c1663(0x428)][_0x4c1663(0x49c)]['Localization']['Languages']||[];let _0x5d6dc6=_0x2deef3['indexOf'](ConfigManager[_0x4c1663(0x54a)]||'English');_0x5d6dc6+=_0x4da017;const _0x132958=_0x2deef3[_0x5d6dc6]||'';return this[_0x4c1663(0x524)](_0x132958);},Game_Temp['prototype']['setLastPluginCommandInterpreter']=function(_0x3d80b2){this['_lastPluginCommandInterpreter']=_0x3d80b2;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x503)]=Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x226)],Game_Interpreter[_0x45a258(0x2fd)]['command357']=function(_0x56dd4b){const _0x108ebe=_0x45a258;return $gameTemp[_0x108ebe(0x289)](this),VisuMZ['MessageCore'][_0x108ebe(0x503)][_0x108ebe(0x388)](this,_0x56dd4b);},VisuMZ['MessageCore'][_0x45a258(0x358)]=Game_System[_0x45a258(0x2fd)][_0x45a258(0x3ef)],Game_System[_0x45a258(0x2fd)][_0x45a258(0x3ef)]=function(){const _0x4a17a8=_0x45a258;VisuMZ[_0x4a17a8(0x428)][_0x4a17a8(0x358)][_0x4a17a8(0x388)](this),this['initMessageCore']();},Game_System[_0x45a258(0x2fd)][_0x45a258(0x223)]=function(){const _0x4aee0f=_0x45a258,_0x2102aa=VisuMZ[_0x4aee0f(0x428)]['Settings'][_0x4aee0f(0x197)],_0x42128d=VisuMZ[_0x4aee0f(0x428)]['Settings']['WordWrap'];this[_0x4aee0f(0x4c1)]={'messageRows':_0x2102aa[_0x4aee0f(0x237)],'messageWidth':_0x2102aa[_0x4aee0f(0x357)],'messageWordWrap':_0x42128d['MessageWindow'],'helpWordWrap':_0x42128d[_0x4aee0f(0x365)],'choiceLineHeight':_0x2102aa[_0x4aee0f(0x322)],'choiceMinWidth':_0x2102aa[_0x4aee0f(0x2c8)]??0x60,'choiceRows':_0x2102aa[_0x4aee0f(0x2d4)],'choiceCols':_0x2102aa[_0x4aee0f(0x4ef)],'choiceTextAlign':_0x2102aa[_0x4aee0f(0x2a5)],'choiceDistance':0x0},this[_0x4aee0f(0x36d)]===undefined&&(this[_0x4aee0f(0x36d)]=_0x2102aa[_0x4aee0f(0x2be)],this[_0x4aee0f(0x367)]=_0x2102aa['MsgWindowOffsetY']);},Game_System[_0x45a258(0x2fd)][_0x45a258(0x1e7)]=function(){const _0xa7a1de=_0x45a258;if(this[_0xa7a1de(0x4c1)]===undefined)this[_0xa7a1de(0x223)]();if(this[_0xa7a1de(0x4c1)][_0xa7a1de(0x1b1)]===undefined)this[_0xa7a1de(0x223)]();return this['_MessageCoreSettings'][_0xa7a1de(0x1b1)];},Game_System[_0x45a258(0x2fd)]['setMessageWindowRows']=function(_0x1204cb){const _0x27bda4=_0x45a258;if(this[_0x27bda4(0x4c1)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x27bda4(0x1b1)]===undefined)this[_0x27bda4(0x223)]();this[_0x27bda4(0x4c1)][_0x27bda4(0x1b1)]=_0x1204cb||0x1;},Game_System[_0x45a258(0x2fd)][_0x45a258(0x364)]=function(){const _0x32be8c=_0x45a258;if(this[_0x32be8c(0x4c1)]===undefined)this[_0x32be8c(0x223)]();if(this[_0x32be8c(0x4c1)][_0x32be8c(0x214)]===undefined)this[_0x32be8c(0x223)]();return this[_0x32be8c(0x4c1)][_0x32be8c(0x214)];},Game_System[_0x45a258(0x2fd)][_0x45a258(0x43a)]=function(_0x561ed0){const _0x2b9ae8=_0x45a258;if(this[_0x2b9ae8(0x4c1)]===undefined)this[_0x2b9ae8(0x223)]();if(this['_MessageCoreSettings'][_0x2b9ae8(0x214)]===undefined)this[_0x2b9ae8(0x223)]();_0x561ed0=Math[_0x2b9ae8(0x2df)](_0x561ed0);if(_0x561ed0%0x2!==0x0)_0x561ed0+=0x1;this[_0x2b9ae8(0x4c1)][_0x2b9ae8(0x214)]=_0x561ed0||0x2;},Game_System['prototype'][_0x45a258(0x1ce)]=function(){const _0x34d0b3=_0x45a258;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x34d0b3(0x4c1)][_0x34d0b3(0x356)]===undefined)this[_0x34d0b3(0x223)]();return this[_0x34d0b3(0x4c1)][_0x34d0b3(0x356)];},Game_System[_0x45a258(0x2fd)][_0x45a258(0x2d7)]=function(_0x149352){const _0x1d2fa2=_0x45a258;if(this[_0x1d2fa2(0x4c1)]===undefined)this[_0x1d2fa2(0x223)]();if(this[_0x1d2fa2(0x4c1)][_0x1d2fa2(0x356)]===undefined)this[_0x1d2fa2(0x223)]();this[_0x1d2fa2(0x4c1)]['messageWordWrap']=_0x149352;},Game_System[_0x45a258(0x2fd)][_0x45a258(0x30a)]=function(){const _0x36e861=_0x45a258;if(this['_messageOffsetX']===undefined){const _0x5d0689=VisuMZ['MessageCore'][_0x36e861(0x49c)][_0x36e861(0x197)];this['_messageOffsetX']=_0x5d0689[_0x36e861(0x2be)],this[_0x36e861(0x367)]=_0x5d0689[_0x36e861(0x4d1)];}return{'x':this[_0x36e861(0x36d)]||0x0,'y':this['_messageOffsetY']||0x0};},Game_System[_0x45a258(0x2fd)][_0x45a258(0x407)]=function(_0x55b047,_0x439c5){const _0xa6a5ba=_0x45a258;if(this['_MessageCoreSettings']===undefined)this[_0xa6a5ba(0x223)]();this[_0xa6a5ba(0x36d)]=_0x55b047,this[_0xa6a5ba(0x367)]=_0x439c5;},Game_System[_0x45a258(0x2fd)]['isHelpWindowWordWrap']=function(){const _0xe55d0e=_0x45a258;if(this[_0xe55d0e(0x4c1)]===undefined)this['initMessageCore']();if(this[_0xe55d0e(0x4c1)]['helpWordWrap']===undefined)this[_0xe55d0e(0x223)]();return this[_0xe55d0e(0x4c1)][_0xe55d0e(0x321)];},Game_System[_0x45a258(0x2fd)]['setHelpWindowWordWrap']=function(_0x5c0ea1){const _0x5e5680=_0x45a258;if(this['_MessageCoreSettings']===undefined)this[_0x5e5680(0x223)]();if(this[_0x5e5680(0x4c1)][_0x5e5680(0x321)]===undefined)this[_0x5e5680(0x223)]();this['_MessageCoreSettings'][_0x5e5680(0x321)]=_0x5c0ea1;},Game_System[_0x45a258(0x2fd)]['getChoiceListLineHeight']=function(){const _0x1e47db=_0x45a258;if(this[_0x1e47db(0x4c1)]===undefined)this[_0x1e47db(0x223)]();if(this['_MessageCoreSettings'][_0x1e47db(0x42e)]===undefined)this['initMessageCore']();return this[_0x1e47db(0x4c1)]['choiceLineHeight'];},Game_System[_0x45a258(0x2fd)][_0x45a258(0x2c9)]=function(_0x34de50){const _0x477f1a=_0x45a258;if(this[_0x477f1a(0x4c1)]===undefined)this[_0x477f1a(0x223)]();if(this[_0x477f1a(0x4c1)][_0x477f1a(0x42e)]===undefined)this['initMessageCore']();this[_0x477f1a(0x4c1)][_0x477f1a(0x42e)]=_0x34de50||0x1;},Game_System['prototype'][_0x45a258(0x517)]=function(){const _0x4700f6=_0x45a258;if(this['_MessageCoreSettings']===undefined)this[_0x4700f6(0x223)]();return this['_MessageCoreSettings'][_0x4700f6(0x296)]??0x60;},Game_System[_0x45a258(0x2fd)]['setChoiceListMinChoiceWidth']=function(_0x47830c){const _0x5b2d69=_0x45a258;if(this[_0x5b2d69(0x4c1)]===undefined)this[_0x5b2d69(0x223)]();this[_0x5b2d69(0x4c1)]['choiceMinWidth']=_0x47830c||0x0;},Game_System['prototype'][_0x45a258(0x1af)]=function(){const _0x5cca3c=_0x45a258;if(this[_0x5cca3c(0x4c1)]===undefined)this[_0x5cca3c(0x223)]();if(this['_MessageCoreSettings'][_0x5cca3c(0x234)]===undefined)this[_0x5cca3c(0x223)]();return this['_MessageCoreSettings'][_0x5cca3c(0x234)];},Game_System[_0x45a258(0x2fd)]['setChoiceListMaxRows']=function(_0x3dd959){const _0x4af2ab=_0x45a258;if(this[_0x4af2ab(0x4c1)]===undefined)this[_0x4af2ab(0x223)]();if(this[_0x4af2ab(0x4c1)][_0x4af2ab(0x234)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x4af2ab(0x234)]=_0x3dd959||0x1;},Game_System['prototype'][_0x45a258(0x2e3)]=function(){const _0x3f2dd9=_0x45a258;if(this[_0x3f2dd9(0x4c1)]===undefined)this[_0x3f2dd9(0x223)]();if(this[_0x3f2dd9(0x4c1)][_0x3f2dd9(0x3ae)]===undefined)this[_0x3f2dd9(0x223)]();return this[_0x3f2dd9(0x4c1)][_0x3f2dd9(0x3ae)];},Game_System[_0x45a258(0x2fd)]['setChoiceListMaxColumns']=function(_0x5b5a2f){const _0x6f432a=_0x45a258;if(this['_MessageCoreSettings']===undefined)this[_0x6f432a(0x223)]();if(this['_MessageCoreSettings'][_0x6f432a(0x3ae)]===undefined)this[_0x6f432a(0x223)]();this['_MessageCoreSettings'][_0x6f432a(0x3ae)]=_0x5b5a2f||0x1;},Game_System['prototype']['getChoiceListTextAlign']=function(){const _0x3bbfb0=_0x45a258;if(this[_0x3bbfb0(0x4c1)]===undefined)this[_0x3bbfb0(0x223)]();if(this[_0x3bbfb0(0x4c1)][_0x3bbfb0(0x420)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x3bbfb0(0x420)];},Game_System[_0x45a258(0x2fd)]['setChoiceListTextAlign']=function(_0x3a586a){const _0x2d80b7=_0x45a258;if(this['_MessageCoreSettings']===undefined)this[_0x2d80b7(0x223)]();if(this[_0x2d80b7(0x4c1)]['choiceTextAlign']===undefined)this[_0x2d80b7(0x223)]();this[_0x2d80b7(0x4c1)][_0x2d80b7(0x420)]=_0x3a586a[_0x2d80b7(0x450)]();},Game_System[_0x45a258(0x2fd)][_0x45a258(0x455)]=function(){const _0x580b8b=_0x45a258;if(this[_0x580b8b(0x4c1)]===undefined)this[_0x580b8b(0x223)]();return this['_MessageCoreSettings'][_0x580b8b(0x418)]||0x0;},Game_System[_0x45a258(0x2fd)][_0x45a258(0x46c)]=function(_0x45c5d4){const _0x4ca4b1=_0x45a258;if(this[_0x4ca4b1(0x4c1)]===undefined)this['initMessageCore']();this[_0x4ca4b1(0x4c1)][_0x4ca4b1(0x418)]=_0x45c5d4||0x0;},Game_Message[_0x45a258(0x2fd)][_0x45a258(0x4a2)]=function(_0x248885,_0x2c16c2){const _0x43a14c=_0x45a258;this[_0x43a14c(0x284)]=_0x248885,this[_0x43a14c(0x1f8)]=_0x43a14c(0x276),this[_0x43a14c(0x2f4)]=_0x2c16c2,this[_0x43a14c(0x201)]=0x0;},Game_Message['prototype']['itemChoiceWtypeId']=function(){return this['_itemChoiceWtypeId']||0x0;},Game_Message[_0x45a258(0x2fd)][_0x45a258(0x31d)]=function(_0x36f2fd,_0x1ba935,_0x233393){const _0x5d0d4b=_0x45a258;this[_0x5d0d4b(0x284)]=_0x36f2fd,this[_0x5d0d4b(0x1f8)]=_0x5d0d4b(0x1bd),this[_0x5d0d4b(0x29f)]=_0x1ba935,this[_0x5d0d4b(0x201)]=_0x233393;},Game_Message[_0x45a258(0x2fd)]['itemChoiceAtypeId']=function(){return this['_itemChoiceAtypeId']||0x0;},Game_Message[_0x45a258(0x2fd)]['itemChoiceEtypeId']=function(){const _0x163493=_0x45a258;return this[_0x163493(0x201)]||0x0;},Game_Message[_0x45a258(0x2fd)][_0x45a258(0x1a1)]=function(_0x10e718,_0x66d666,_0x3bc4b2){const _0x3f127c=_0x45a258;this['_itemChoiceVariableId']=_0x10e718,this[_0x3f127c(0x1f8)]=_0x3f127c(0x478),this[_0x3f127c(0x1e0)]=_0x66d666,this[_0x3f127c(0x2f9)]=_0x3bc4b2;},Game_Message['prototype'][_0x45a258(0x290)]=function(){const _0x13aa53=_0x45a258;return this[_0x13aa53(0x1e0)]||0x0;},Game_Message[_0x45a258(0x2fd)][_0x45a258(0x33e)]=function(){const _0x1d5dd8=_0x45a258;return $gameActors[_0x1d5dd8(0x45c)](this[_0x1d5dd8(0x290)]())||$gameParty[_0x1d5dd8(0x51c)]()||null;},Game_Message[_0x45a258(0x2fd)][_0x45a258(0x2e5)]=function(){const _0x32ecf0=_0x45a258;return this[_0x32ecf0(0x2f9)]||0x0;},VisuMZ[_0x45a258(0x428)][_0x45a258(0x31c)]=Game_Message[_0x45a258(0x2fd)][_0x45a258(0x45f)],Game_Message[_0x45a258(0x2fd)][_0x45a258(0x45f)]=function(_0x571c3f,_0x33a143,_0x96f92d){const _0x2bc8ee=_0x45a258;this['_scriptCall']=!![],VisuMZ[_0x2bc8ee(0x428)][_0x2bc8ee(0x31c)][_0x2bc8ee(0x388)](this,_0x571c3f,_0x33a143,_0x96f92d);},Game_Message['prototype'][_0x45a258(0x519)]=function(){const _0x37af69=_0x45a258;this[_0x37af69(0x4ac)]=![],this[_0x37af69(0x3d6)]=[];const _0x1c6abb=this[_0x37af69(0x198)][_0x37af69(0x495)];this['_maxShuffleChoices']=_0x1c6abb;let _0x5791be=![];for(let _0x3a7a2d=0x0;_0x3a7a2d<_0x1c6abb;_0x3a7a2d++){let _0x385905=this[_0x37af69(0x198)][_0x3a7a2d];_0x385905['match'](/<SHUFFLE>/gi)&&(_0x5791be=!![],_0x385905=_0x385905['replace'](/<SHUFFLE>/gi,'')),_0x385905[_0x37af69(0x463)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x5791be=!![],this['_maxShuffleChoices']=Math[_0x37af69(0x2ed)](Number(RegExp['$1']),this['_maxShuffleChoices']),_0x385905=_0x385905[_0x37af69(0x1cb)](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x385905[_0x37af69(0x463)](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x5791be=!![],this['_maxShuffleChoices']=Math[_0x37af69(0x2ed)]($gameVariables[_0x37af69(0x20c)](Number(RegExp['$1']))||0x1,this['_maxShuffleChoices']),_0x385905=_0x385905['replace'](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this[_0x37af69(0x3d6)]['push'](_0x3a7a2d),this[_0x37af69(0x198)][_0x3a7a2d]=_0x385905;}if(_0x5791be){this[_0x37af69(0x3d6)]=VisuMZ[_0x37af69(0x428)][_0x37af69(0x52f)](this[_0x37af69(0x3d6)]);if(this[_0x37af69(0x410)]()!==-0x2)this[_0x37af69(0x417)]=-0x1;}},VisuMZ['MessageCore'][_0x45a258(0x52f)]=function(_0xdb21b4){const _0x92ff57=_0x45a258;var _0x3424af,_0x2dedf2,_0x1482a7;for(_0x1482a7=_0xdb21b4[_0x92ff57(0x495)]-0x1;_0x1482a7>0x0;_0x1482a7--){_0x3424af=Math['floor'](Math[_0x92ff57(0x2b8)]()*(_0x1482a7+0x1)),_0x2dedf2=_0xdb21b4[_0x1482a7],_0xdb21b4[_0x1482a7]=_0xdb21b4[_0x3424af],_0xdb21b4[_0x3424af]=_0x2dedf2;}return _0xdb21b4;},Game_Message[_0x45a258(0x2fd)]['choiceIndexArray']=function(){const _0x2bb14e=_0x45a258;if(!this[_0x2bb14e(0x3d6)])this[_0x2bb14e(0x519)]();return this[_0x2bb14e(0x3d6)];},Game_Message[_0x45a258(0x2fd)][_0x45a258(0x3a3)]=function(){const _0xc2606e=_0x45a258;if(this[_0xc2606e(0x28d)]===undefined)this[_0xc2606e(0x519)]();return this['_maxShuffleChoices'];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x49a)]=Game_Screen[_0x45a258(0x2fd)]['clearPictures'],Game_Screen['prototype'][_0x45a258(0x3d7)]=function(){const _0x1a6cfb=_0x45a258;VisuMZ[_0x1a6cfb(0x428)]['Game_Screen_clearPictures'][_0x1a6cfb(0x388)](this),this['clearAllPictureTexts']();},Game_Screen['prototype'][_0x45a258(0x33c)]=function(){const _0x44b928=_0x45a258;this[_0x44b928(0x499)]=[],this[_0x44b928(0x207)]=[],this[_0x44b928(0x52a)]=[];},Game_Screen['prototype'][_0x45a258(0x474)]=function(_0x914713){const _0xe17288=_0x45a258;if(this[_0xe17288(0x499)]===undefined)this[_0xe17288(0x33c)]();const _0x206c09=this[_0xe17288(0x360)](_0x914713);return this[_0xe17288(0x499)][_0x206c09]=this['_pictureText'][_0x206c09]||{},this[_0xe17288(0x499)][_0x206c09];},Game_Screen[_0x45a258(0x2fd)]['getPictureText']=function(_0x46b5f6,_0x15f3a2){const _0x48d440=_0x45a258;return _0x15f3a2=_0x15f3a2[_0x48d440(0x450)]()[_0x48d440(0x531)](),this[_0x48d440(0x474)](_0x46b5f6)[_0x15f3a2]||'';},Game_Screen['prototype'][_0x45a258(0x44d)]=function(_0x48579c,_0x9097e5,_0x15298c){const _0xffb8fe=_0x45a258;_0x15298c=_0x15298c[_0xffb8fe(0x450)]()[_0xffb8fe(0x531)](),this[_0xffb8fe(0x474)](_0x48579c)[_0x15298c]=_0x9097e5||'',this[_0xffb8fe(0x3e5)](_0x48579c,!![]);},Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x4f6)]=function(_0xf3b93d){const _0x2e6a97=_0x45a258;if(this[_0x2e6a97(0x499)]===undefined)this[_0x2e6a97(0x33c)]();const _0x17af9a=this['realPictureId'](_0xf3b93d);this[_0x2e6a97(0x499)][_0x17af9a]=null,this[_0x2e6a97(0x3e5)](_0xf3b93d,!![]);},Game_Screen['prototype'][_0x45a258(0x4f9)]=function(_0x1018c5){const _0x34d709=_0x45a258;if(this[_0x34d709(0x499)]===undefined)this[_0x34d709(0x33c)]();const _0x3d77e6=this['realPictureId'](_0x1018c5);return this[_0x34d709(0x207)][_0x3d77e6]||0x0;},Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x27e)]=function(_0x36213a,_0x33a50a){const _0x4873c0=_0x45a258;if(this[_0x4873c0(0x499)]===undefined)this[_0x4873c0(0x33c)]();const _0x21a9fc=this[_0x4873c0(0x360)](_0x36213a);this[_0x4873c0(0x207)][_0x21a9fc]=Math['max'](0x0,_0x33a50a);},Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x3c9)]=function(_0x177d07){const _0x397ac6=_0x45a258;if(this[_0x397ac6(0x499)]===undefined)this['clearAllPictureTexts']();const _0x554a37=this[_0x397ac6(0x360)](_0x177d07);this['_pictureTextBuffer'][_0x554a37]=undefined;},VisuMZ[_0x45a258(0x428)][_0x45a258(0x4b0)]=Game_Screen['prototype'][_0x45a258(0x241)],Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x241)]=function(_0x369886){const _0x21940b=_0x45a258;VisuMZ[_0x21940b(0x428)][_0x21940b(0x4b0)][_0x21940b(0x388)](this,_0x369886),this[_0x21940b(0x4f6)](_0x369886),this['erasePictureTextBuffer'](_0x369886),this['requestPictureTextRefresh'](_0x369886,!![]);},Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x34c)]=function(){const _0x482f01=_0x45a258;for(const _0xed7dc7 of this[_0x482f01(0x467)]){if(_0xed7dc7){let _0x2aa930=this[_0x482f01(0x467)]['indexOf'](_0xed7dc7);this[_0x482f01(0x3e5)](_0x2aa930);}}},Game_Screen['prototype'][_0x45a258(0x3e5)]=function(_0x5d6e0e,_0x1e7110){const _0x1acbc7=_0x45a258;this[_0x1acbc7(0x52a)]=this[_0x1acbc7(0x52a)]||[],(this['hasPictureText'](_0x5d6e0e)||_0x1e7110)&&this['_pictureTextRefresh'][_0x1acbc7(0x46d)](_0x5d6e0e);},Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x487)]=function(_0x5bd42a){const _0x9f9745=_0x45a258;return this[_0x9f9745(0x52a)]=this[_0x9f9745(0x52a)]||[],this[_0x9f9745(0x52a)][_0x9f9745(0x353)](_0x5bd42a);},Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x274)]=function(_0x859626){const _0x132d83=_0x45a258;this[_0x132d83(0x52a)]=this[_0x132d83(0x52a)]||[],this[_0x132d83(0x52a)][_0x132d83(0x40c)](_0x859626);},Game_Screen[_0x45a258(0x2fd)][_0x45a258(0x31f)]=function(_0x4c3be1){const _0x49a74d=_0x45a258,_0x492795=[_0x49a74d(0x2ae),'up',_0x49a74d(0x51f),_0x49a74d(0x30b),_0x49a74d(0x2af),'right',_0x49a74d(0x53c),_0x49a74d(0x21d),_0x49a74d(0x1e1)];return _0x492795[_0x49a74d(0x44f)](_0x3e85a5=>this[_0x49a74d(0x2ab)](_0x4c3be1,_0x3e85a5)!=='');},VisuMZ[_0x45a258(0x428)][_0x45a258(0x3b1)]=Game_Party[_0x45a258(0x2fd)]['initialize'],Game_Party[_0x45a258(0x2fd)][_0x45a258(0x3ef)]=function(){const _0x13ee7a=_0x45a258;VisuMZ[_0x13ee7a(0x428)][_0x13ee7a(0x3b1)][_0x13ee7a(0x388)](this),this[_0x13ee7a(0x223)]();},Game_Party[_0x45a258(0x2fd)][_0x45a258(0x223)]=function(){const _0x2c9343=_0x45a258;this[_0x2c9343(0x250)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype'][_0x45a258(0x53f)]=function(){const _0xae013e=_0x45a258;if(this['_lastGainedItemData']===undefined)this[_0xae013e(0x223)]();return this['_lastGainedItemData'];},Game_Party[_0x45a258(0x2fd)]['setLastGainedItemData']=function(_0x1d81a5,_0x62b0e4){const _0x1427d2=_0x45a258;if(this[_0x1427d2(0x250)]===undefined)this[_0x1427d2(0x223)]();if(!_0x1d81a5)return;if(DataManager[_0x1427d2(0x1b8)](_0x1d81a5))this['_lastGainedItemData'][_0x1427d2(0x4e3)]=0x0;else{if(DataManager[_0x1427d2(0x3a5)](_0x1d81a5))this[_0x1427d2(0x250)][_0x1427d2(0x4e3)]=0x1;else DataManager[_0x1427d2(0x34d)](_0x1d81a5)&&(this[_0x1427d2(0x250)][_0x1427d2(0x4e3)]=0x2);}this[_0x1427d2(0x250)]['id']=_0x1d81a5['id'],this['_lastGainedItemData'][_0x1427d2(0x465)]=_0x62b0e4;},VisuMZ[_0x45a258(0x428)][_0x45a258(0x504)]=Game_Party['prototype'][_0x45a258(0x3f4)],Game_Party[_0x45a258(0x2fd)]['gainItem']=function(_0x453ab5,_0x534e17,_0x55a257){const _0x3bf4df=_0x45a258;VisuMZ[_0x3bf4df(0x428)][_0x3bf4df(0x504)][_0x3bf4df(0x388)](this,_0x453ab5,_0x534e17,_0x55a257),_0x534e17>0x0&&this[_0x3bf4df(0x1a5)](_0x453ab5,_0x534e17);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x29b)]=Game_Map['prototype']['initialize'],Game_Map[_0x45a258(0x2fd)][_0x45a258(0x3ef)]=function(){const _0x2fe315=_0x45a258;VisuMZ['MessageCore'][_0x2fe315(0x29b)]['call'](this),this[_0x2fe315(0x26c)]=[];},VisuMZ[_0x45a258(0x428)]['Game_Map_setupEvents']=Game_Map[_0x45a258(0x2fd)][_0x45a258(0x386)],Game_Map[_0x45a258(0x2fd)][_0x45a258(0x386)]=function(){const _0x2f04ac=_0x45a258;VisuMZ[_0x2f04ac(0x428)]['Game_Map_setupEvents']['call'](this),this[_0x2f04ac(0x26c)]=[];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x2ec)]=Game_Map['prototype'][_0x45a258(0x3bf)],Game_Map[_0x45a258(0x2fd)][_0x45a258(0x3bf)]=function(){const _0x11055f=_0x45a258;VisuMZ[_0x11055f(0x428)][_0x11055f(0x2ec)][_0x11055f(0x388)](this),this['updateMessageCommonEvents']();},Game_Map[_0x45a258(0x2fd)][_0x45a258(0x527)]=function(_0x11b7e2){const _0x562e8a=_0x45a258;if(!$dataCommonEvents[_0x11b7e2])return;this[_0x562e8a(0x26c)]=this['_messageCommonEvents']||[];const _0x4d0f71=this[_0x562e8a(0x33a)]['_eventId'],_0x27042b=new Game_MessageCommonEvent(_0x11b7e2,_0x4d0f71);this[_0x562e8a(0x26c)]['push'](_0x27042b);},Game_Map['prototype']['updateMessageCommonEvents']=function(){const _0x42dc3a=_0x45a258;this[_0x42dc3a(0x26c)]=this[_0x42dc3a(0x26c)]||[];for(const _0x50ce4b of this[_0x42dc3a(0x26c)]){!_0x50ce4b[_0x42dc3a(0x33a)]?this[_0x42dc3a(0x26c)][_0x42dc3a(0x40c)](_0x50ce4b):_0x50ce4b[_0x42dc3a(0x4c0)]();}},VisuMZ[_0x45a258(0x428)]['Game_Map_refresh']=Game_Map[_0x45a258(0x2fd)][_0x45a258(0x40f)],Game_Map[_0x45a258(0x2fd)][_0x45a258(0x40f)]=function(){const _0x112671=_0x45a258;VisuMZ[_0x112671(0x428)][_0x112671(0x432)][_0x112671(0x388)](this),$gameScreen['requestPictureTextRefreshAll']();},Game_Interpreter[_0x45a258(0x4a9)]=pluginData[_0x45a258(0x520)],Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x257)]=function(_0x16adf8){const _0x4c8ff3=_0x45a258;if($gameMessage['isBusy']())return![];return this[_0x4c8ff3(0x1ca)](_0x16adf8),this[_0x4c8ff3(0x452)](_0x16adf8),this[_0x4c8ff3(0x518)](_0x16adf8),this[_0x4c8ff3(0x191)]('message'),!![];},Game_Interpreter['prototype'][_0x45a258(0x1ca)]=function(_0x3cdbc7){const _0x24deae=_0x45a258;$gameMessage['setFaceImage'](_0x3cdbc7[0x0],_0x3cdbc7[0x1]),$gameMessage[_0x24deae(0x242)](_0x3cdbc7[0x2]),$gameMessage['setPositionType'](_0x3cdbc7[0x3]),$gameMessage['setSpeakerName'](_0x3cdbc7[0x4]);},Game_Interpreter['prototype'][_0x45a258(0x452)]=function(_0x41e93c){const _0x39da1f=_0x45a258;while(this[_0x39da1f(0x30f)]()){this['_index']++;if(this[_0x39da1f(0x35e)]()['code']===0x191){let _0x1d14ce=this[_0x39da1f(0x35e)]()['parameters'][0x0];_0x1d14ce=VisuMZ[_0x39da1f(0x428)][_0x39da1f(0x1ae)](_0x1d14ce),$gameMessage[_0x39da1f(0x4d8)](_0x1d14ce);}if(this[_0x39da1f(0x352)]())break;}},Game_Interpreter[_0x45a258(0x2fd)]['isContinuePrepareShowTextCommands']=function(){const _0x185e20=_0x45a258;return this[_0x185e20(0x434)]()===0x65&&$gameSystem[_0x185e20(0x1e7)]()>0x4?!![]:this[_0x185e20(0x434)]()===0x191;},VisuMZ[_0x45a258(0x428)][_0x45a258(0x1ae)]=function(_0x1ab486){const _0x2780f8=_0x45a258,_0x499a2f=VisuMZ[_0x2780f8(0x428)][_0x2780f8(0x49c)][_0x2780f8(0x197)];return _0x1ab486=(_0x499a2f['EachMessageStart']||'')+_0x1ab486+(_0x499a2f[_0x2780f8(0x2ca)]||''),_0x1ab486=_0x1ab486[_0x2780f8(0x1cb)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x1ab486=_0x1ab486[_0x2780f8(0x1cb)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x4c34cf,_0x12ce65)=>this[_0x2780f8(0x2da)](_0x12ce65)),_0x1ab486;},VisuMZ['MessageCore']['getRandomTextFromPool']=function(_0x3f5d50){const _0x51a590=_0x45a258,_0x2de37c=_0x3f5d50[_0x51a590(0x18c)]('|')[_0x51a590(0x342)](_0x339739=>_0x339739['trim']())['remove']('')['remove'](null);return _0x2de37c[Math['randomInt'](_0x2de37c[_0x51a590(0x495)])];},Game_Interpreter['prototype'][_0x45a258(0x352)]=function(){const _0x50e937=_0x45a258;if(this[_0x50e937(0x35e)]()&&this[_0x50e937(0x35e)]()[_0x50e937(0x3dd)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x50e937(0x2b9)][_0x50e937(0x495)]>=$gameSystem[_0x50e937(0x1e7)]()&&this[_0x50e937(0x434)]()!==0x191;},Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x518)]=function(_0x532b87){const _0x510bca=_0x45a258;switch(this[_0x510bca(0x434)]()){case 0x66:this[_0x510bca(0x311)]++,this[_0x510bca(0x4fa)](this['currentCommand']()[_0x510bca(0x3dd)]);break;case 0x67:this[_0x510bca(0x311)]++,this['setupNumInput'](this[_0x510bca(0x35e)]()[_0x510bca(0x3dd)]);break;case 0x68:this[_0x510bca(0x311)]++,this['setupItemChoice'](this[_0x510bca(0x35e)]()[_0x510bca(0x3dd)]);break;case 0x165:const _0x25eae0=this[_0x510bca(0x2b1)][this['_index']+0x1],_0x34e25f=_0x25eae0['parameters'];_0x34e25f[0x0]===Game_Interpreter[_0x510bca(0x4a9)]&&this[_0x510bca(0x20e)](_0x34e25f);break;}},VisuMZ['MessageCore'][_0x45a258(0x362)]=Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x4fa)],Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x4fa)]=function(_0x59ac93){const _0x49fd46=_0x45a258;_0x59ac93=this['addContinuousShowChoices'](),VisuMZ['MessageCore'][_0x49fd46(0x362)][_0x49fd46(0x388)](this,_0x59ac93),$gameMessage['setupShuffleChoices']();},Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x1c8)]=function(){const _0x17941d=_0x45a258,_0x4a7ace=this[_0x17941d(0x311)],_0x4cfbf0=[];let _0x5a2f4e=0x0;this[_0x17941d(0x311)]++;while(this[_0x17941d(0x311)]<this['_list'][_0x17941d(0x495)]){if(this[_0x17941d(0x35e)]()[_0x17941d(0x3c3)]===this[_0x17941d(0x3ba)]){if(this[_0x17941d(0x35e)]()[_0x17941d(0x38a)]===0x194&&this[_0x17941d(0x434)]()!==0x66)break;else{if(this['currentCommand']()[_0x17941d(0x38a)]===0x66)this['adjustShowChoiceExtension'](_0x5a2f4e,this[_0x17941d(0x35e)](),_0x4a7ace),this[_0x17941d(0x311)]-=0x2;else this[_0x17941d(0x35e)]()[_0x17941d(0x38a)]===0x192&&(this[_0x17941d(0x35e)]()[_0x17941d(0x3dd)][0x0]=_0x5a2f4e,_0x5a2f4e++);}}this[_0x17941d(0x311)]++;}return this[_0x17941d(0x311)]=_0x4a7ace,this[_0x17941d(0x35e)]()[_0x17941d(0x3dd)];},Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x341)]=function(_0x2c38e0,_0x21b617,_0x27e2fb){const _0xc1bcab=_0x45a258;this[_0xc1bcab(0x193)](_0x2c38e0,_0x21b617,_0x27e2fb),this[_0xc1bcab(0x26e)](_0x2c38e0,_0x21b617,_0x27e2fb),this['addExtraShowChoices'](_0x21b617,_0x27e2fb);},Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x193)]=function(_0x27a3d5,_0xbc9e8c,_0x477b43){const _0x4d505b=_0x45a258;if(_0xbc9e8c['parameters'][0x2]<0x0)return;const _0x4df162=_0xbc9e8c[_0x4d505b(0x3dd)][0x2]+_0x27a3d5;this['_list'][_0x477b43][_0x4d505b(0x3dd)][0x2]=_0x4df162;},Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x26e)]=function(_0x75d8b,_0x4bde51,_0x2c29cd){const _0x364f3e=_0x45a258;if(_0x4bde51[_0x364f3e(0x3dd)][0x1]>=0x0){var _0x1723f0=_0x4bde51[_0x364f3e(0x3dd)][0x1]+_0x75d8b;this['_list'][_0x2c29cd][_0x364f3e(0x3dd)][0x1]=_0x1723f0;}else _0x4bde51[_0x364f3e(0x3dd)][0x1]===-0x2&&(this[_0x364f3e(0x2b1)][_0x2c29cd][_0x364f3e(0x3dd)][0x1]=_0x4bde51['parameters'][0x1]);},Game_Interpreter[_0x45a258(0x2fd)]['addExtraShowChoices']=function(_0x1c059d,_0x354579){const _0x5c6e56=_0x45a258;for(const _0x22b787 of _0x1c059d[_0x5c6e56(0x3dd)][0x0]){this[_0x5c6e56(0x2b1)][_0x354579][_0x5c6e56(0x3dd)][0x0][_0x5c6e56(0x46d)](_0x22b787);}this['_list'][_0x5c6e56(0x3e0)](this[_0x5c6e56(0x311)]-0x1,0x2);},Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x20e)]=function(_0x358447){const _0x555b1d=_0x45a258,_0x391f41=_0x358447[0x1];if(_0x391f41===_0x555b1d(0x3bd))this[_0x555b1d(0x311)]++,this[_0x555b1d(0x4a2)](_0x358447);else{if(_0x391f41==='SelectArmor')this[_0x555b1d(0x311)]++,this[_0x555b1d(0x31d)](_0x358447);else _0x391f41===_0x555b1d(0x3b6)&&Imported['VisuMZ_1_SkillsStatesCore']&&(this[_0x555b1d(0x311)]++,this[_0x555b1d(0x1a1)](_0x358447));}},Game_Interpreter[_0x45a258(0x2fd)][_0x45a258(0x4a2)]=function(_0x2c8532){const _0x7d2cbf=_0x45a258,_0x1aadd5=JSON[_0x7d2cbf(0x224)](JSON[_0x7d2cbf(0x2e0)](_0x2c8532[0x3]));VisuMZ[_0x7d2cbf(0x4dc)](_0x1aadd5,_0x1aadd5),$gameMessage[_0x7d2cbf(0x4a2)](_0x1aadd5[_0x7d2cbf(0x40e)]||0x0,_0x1aadd5['WeaponTypeID']||0x0);},Game_Interpreter[_0x45a258(0x2fd)]['setArmorChoice']=function(_0x49bcc0){const _0x55b43b=_0x45a258,_0x42469d=JSON['parse'](JSON[_0x55b43b(0x2e0)](_0x49bcc0[0x3]));VisuMZ[_0x55b43b(0x4dc)](_0x42469d,_0x42469d),$gameMessage[_0x55b43b(0x31d)](_0x42469d[_0x55b43b(0x40e)]||0x0,_0x42469d[_0x55b43b(0x22b)]||0x0,_0x42469d[_0x55b43b(0x21f)]||0x0);},Game_Interpreter['prototype'][_0x45a258(0x1a1)]=function(_0x419104){const _0x427af2=_0x45a258,_0x1e74a6=JSON[_0x427af2(0x224)](JSON[_0x427af2(0x2e0)](_0x419104[0x3]));VisuMZ['ConvertParams'](_0x1e74a6,_0x1e74a6),$gameMessage[_0x427af2(0x1a1)](_0x1e74a6[_0x427af2(0x40e)]||0x0,_0x1e74a6['ActorID']||0x0,_0x1e74a6[_0x427af2(0x427)]||0x0);};function Game_MessageCommonEvent(){const _0x287c9b=_0x45a258;this[_0x287c9b(0x3ef)](...arguments);}Game_MessageCommonEvent[_0x45a258(0x2fd)][_0x45a258(0x3ef)]=function(_0x4048aa,_0x45ccbe){const _0x3ae468=_0x45a258;this[_0x3ae468(0x4ca)]=_0x4048aa,this['_eventId']=_0x45ccbe||0x0,this['refresh']();},Game_MessageCommonEvent[_0x45a258(0x2fd)][_0x45a258(0x1f6)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent['prototype'][_0x45a258(0x1d4)]=function(){const _0x4b1e74=_0x45a258;return this[_0x4b1e74(0x1f6)]()[_0x4b1e74(0x1d4)];},Game_MessageCommonEvent[_0x45a258(0x2fd)][_0x45a258(0x40f)]=function(){const _0x48441d=_0x45a258;this[_0x48441d(0x33a)]=new Game_Interpreter(),this[_0x48441d(0x33a)][_0x48441d(0x379)](this['list'](),this[_0x48441d(0x18a)]);},Game_MessageCommonEvent[_0x45a258(0x2fd)]['update']=function(){const _0x15e78a=_0x45a258;this[_0x15e78a(0x33a)]&&(this[_0x15e78a(0x33a)][_0x15e78a(0x544)]()?this[_0x15e78a(0x33a)][_0x15e78a(0x4c0)]():this[_0x15e78a(0x1eb)]());},Game_MessageCommonEvent[_0x45a258(0x2fd)][_0x45a258(0x1eb)]=function(){const _0x4d4a6e=_0x45a258;this[_0x4d4a6e(0x33a)]=null;},Scene_Message[_0x45a258(0x2fd)]['messageWindowRect']=function(){const _0x3e79e9=_0x45a258,_0x405cdf=Math[_0x3e79e9(0x2ed)](Graphics['width'],$gameSystem[_0x3e79e9(0x364)]()),_0x190879=$gameSystem['getMessageWindowRows'](),_0x4cd020=this[_0x3e79e9(0x4df)](_0x190879,![]),_0x446850=(Graphics[_0x3e79e9(0x500)]-_0x405cdf)/0x2,_0x4e96be=0x0;return new Rectangle(_0x446850,_0x4e96be,_0x405cdf,_0x4cd020);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x26a)]=Scene_Message[_0x45a258(0x2fd)]['createChoiceListWindow'],Scene_Message[_0x45a258(0x2fd)][_0x45a258(0x300)]=function(){const _0x37865d=_0x45a258;VisuMZ['MessageCore'][_0x37865d(0x26a)]['call'](this),this[_0x37865d(0x36b)]();},Scene_Message['prototype'][_0x45a258(0x36b)]=function(){const _0x527f93=_0x45a258,_0x2d5829=this['choiceListHelpWindowRect'](),_0x48a8d8=new Window_Help(_0x2d5829);_0x48a8d8[_0x527f93(0x4ae)](),this[_0x527f93(0x4aa)][_0x527f93(0x1f2)](_0x48a8d8),this[_0x527f93(0x29a)][_0x527f93(0x28b)](_0x48a8d8),this[_0x527f93(0x29c)](_0x48a8d8),this[_0x527f93(0x2e4)]=_0x48a8d8;},Scene_Message['prototype'][_0x45a258(0x1c9)]=function(){const _0x449492=_0x45a258,_0x1aa623=0x0,_0x1ce905=0x0,_0x4feb00=Graphics['boxWidth'],_0x4e1aa5=this[_0x449492(0x4df)](0x2,![]);return new Rectangle(_0x1aa623,_0x1ce905,_0x4feb00,_0x4e1aa5);},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x28b)]=function(_0x296581){this['_choiceListHelpWindow']=_0x296581;},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x24c)]=function(){const _0x485aed=_0x45a258;if(!this[_0x485aed(0x2e4)])return;const _0x2c9c8b=this['_choiceListHelpWindow'];_0x2c9c8b&&(_0x2c9c8b['y']=this['y']>0x0?0x0:Graphics[_0x485aed(0x2bc)]-_0x2c9c8b['height']);},VisuMZ['MessageCore'][_0x45a258(0x466)]=Scene_Options[_0x45a258(0x2fd)][_0x45a258(0x1ee)],Scene_Options[_0x45a258(0x2fd)][_0x45a258(0x1ee)]=function(){const _0x3442e9=_0x45a258;let _0x6e136=VisuMZ[_0x3442e9(0x428)][_0x3442e9(0x466)][_0x3442e9(0x388)](this);const _0x341b60=VisuMZ[_0x3442e9(0x428)][_0x3442e9(0x49c)];if(_0x341b60[_0x3442e9(0x2c5)][_0x3442e9(0x4ea)]){_0x341b60[_0x3442e9(0x50b)][_0x3442e9(0x482)]&&TextManager[_0x3442e9(0x476)]()&&_0x6e136++;if(_0x341b60[_0x3442e9(0x2c5)][_0x3442e9(0x482)])_0x6e136++;}return _0x6e136;},VisuMZ[_0x45a258(0x428)]['Sprite_Picture_updateBitmap']=Sprite_Picture[_0x45a258(0x2fd)]['updateBitmap'],Sprite_Picture['prototype'][_0x45a258(0x195)]=function(){const _0x3d2f75=_0x45a258;VisuMZ['MessageCore'][_0x3d2f75(0x528)]['call'](this),this[_0x3d2f75(0x33d)]();},VisuMZ['MessageCore']['Sprite_Picture_update']=Sprite_Picture[_0x45a258(0x2fd)][_0x45a258(0x4c0)],Sprite_Picture[_0x45a258(0x2fd)]['update']=function(){const _0xea0f5f=_0x45a258;VisuMZ[_0xea0f5f(0x428)][_0xea0f5f(0x4b6)][_0xea0f5f(0x388)](this),this[_0xea0f5f(0x313)]();},Sprite_Picture[_0x45a258(0x2fd)]['updatePictureText']=function(){const _0xab3c60=_0x45a258;if(!this[_0xab3c60(0x303)])return;this[_0xab3c60(0x42a)](),this[_0xab3c60(0x327)](),this[_0xab3c60(0x1ba)](),this[_0xab3c60(0x314)]();},Sprite_Picture[_0x45a258(0x2fd)][_0x45a258(0x33d)]=function(){const _0x5f0f37=_0x45a258;if(this[_0x5f0f37(0x3cc)])return;if(this['_pictureTextSprite'])return;const _0x1b158a=new Rectangle(0x0,0x0,0x0,0x0);this[_0x5f0f37(0x3cc)]=new Window_Base(_0x1b158a),this[_0x5f0f37(0x3cc)][_0x5f0f37(0x436)]=0x0,this[_0x5f0f37(0x2b6)]=new Sprite(),this[_0x5f0f37(0x328)](this[_0x5f0f37(0x2b6)],0x0),this['_pictureTextWidth']=0x0,this[_0x5f0f37(0x259)]=0x0,this[_0x5f0f37(0x271)]={};},Sprite_Picture[_0x45a258(0x2fd)][_0x45a258(0x42a)]=function(){const _0x413d42=_0x45a258;if(!this[_0x413d42(0x3cc)])return;if(this[_0x413d42(0x2f5)]===this[_0x413d42(0x4ce)]&&this[_0x413d42(0x259)]===this[_0x413d42(0x492)])return;this[_0x413d42(0x2f5)]=this['width'],this[_0x413d42(0x259)]=this['height'],this[_0x413d42(0x271)]={},this[_0x413d42(0x3cc)]['move'](0x0,0x0,this[_0x413d42(0x4ce)],this[_0x413d42(0x492)]);},Sprite_Picture[_0x45a258(0x2fd)][_0x45a258(0x327)]=function(){const _0x17d05c=_0x45a258;if(!this[_0x17d05c(0x2b6)])return;this[_0x17d05c(0x2b6)][_0x17d05c(0x493)]['x']=this[_0x17d05c(0x493)]['x'],this[_0x17d05c(0x2b6)][_0x17d05c(0x493)]['y']=this[_0x17d05c(0x493)]['y'];},Sprite_Picture[_0x45a258(0x2fd)][_0x45a258(0x1ba)]=function(){const _0x257a2a=_0x45a258;if(!this['_pictureTextWindow'])return;if(!this['anyPictureTextChanges']())return;const _0x81863a=['upperleft','up',_0x257a2a(0x51f),_0x257a2a(0x30b),_0x257a2a(0x2af),_0x257a2a(0x19d),_0x257a2a(0x53c),_0x257a2a(0x21d),_0x257a2a(0x1e1)];this['_pictureTextWindow'][_0x257a2a(0x3a9)]();for(const _0xe809de of _0x81863a){this['drawPictureTextZone'](_0xe809de);}},Sprite_Picture['prototype'][_0x45a258(0x50a)]=function(){const _0x4d2a27=_0x45a258;if($gameScreen[_0x4d2a27(0x487)](this[_0x4d2a27(0x43e)]))return!![];const _0x74e84f=[_0x4d2a27(0x2ae),'up',_0x4d2a27(0x51f),_0x4d2a27(0x30b),_0x4d2a27(0x2af),'right',_0x4d2a27(0x53c),_0x4d2a27(0x21d),_0x4d2a27(0x1e1)];for(const _0x4ebc90 of _0x74e84f){const _0x14a073=$gameScreen[_0x4d2a27(0x2ab)](this['_pictureId'],_0x4ebc90);if(this[_0x4d2a27(0x271)][_0x4ebc90]===_0x14a073)continue;return!![];}return![];},Sprite_Picture['prototype'][_0x45a258(0x26d)]=function(_0x690b27){const _0x199c5e=_0x45a258;$gameScreen[_0x199c5e(0x274)](this[_0x199c5e(0x43e)]);const _0x358135=$gameScreen['getPictureText'](this[_0x199c5e(0x43e)],_0x690b27);this[_0x199c5e(0x271)][_0x690b27]=_0x358135;const _0x43e3c9=this[_0x199c5e(0x3cc)]['textSizeEx'](_0x358135);let _0xee3dbc=$gameScreen['getPictureTextBuffer'](this[_0x199c5e(0x43e)]),_0x4b6624=_0xee3dbc,_0x512d78=_0xee3dbc;if(['up',_0x199c5e(0x2af),_0x199c5e(0x21d)][_0x199c5e(0x353)](_0x690b27))_0x4b6624=Math['floor']((this[_0x199c5e(0x4ce)]-_0x43e3c9['width'])/0x2);else['upperright',_0x199c5e(0x19d),_0x199c5e(0x1e1)][_0x199c5e(0x353)](_0x690b27)&&(_0x4b6624=Math[_0x199c5e(0x46a)](this[_0x199c5e(0x4ce)]-_0x43e3c9['width']-_0xee3dbc));if([_0x199c5e(0x30b),_0x199c5e(0x2af),_0x199c5e(0x19d)][_0x199c5e(0x353)](_0x690b27))_0x512d78=Math[_0x199c5e(0x46a)]((this[_0x199c5e(0x492)]-_0x43e3c9[_0x199c5e(0x492)])/0x2);else[_0x199c5e(0x53c),_0x199c5e(0x21d),_0x199c5e(0x1e1)][_0x199c5e(0x353)](_0x690b27)&&(_0x512d78=Math[_0x199c5e(0x46a)](this['height']-_0x43e3c9[_0x199c5e(0x492)]-_0xee3dbc));this[_0x199c5e(0x3cc)][_0x199c5e(0x244)](_0x358135,_0x4b6624,_0x512d78);},Sprite_Picture[_0x45a258(0x2fd)]['attachPictureText']=function(){const _0xbe958=_0x45a258;if(!this[_0xbe958(0x3cc)])return;if(!this[_0xbe958(0x2b6)])return;this[_0xbe958(0x2b6)][_0xbe958(0x280)]=this[_0xbe958(0x3cc)][_0xbe958(0x468)];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x3b0)]=Window_Base[_0x45a258(0x2fd)]['initialize'],Window_Base[_0x45a258(0x2fd)][_0x45a258(0x3ef)]=function(_0x107036){const _0x4fbe35=_0x45a258;this[_0x4fbe35(0x223)](_0x107036),VisuMZ[_0x4fbe35(0x428)][_0x4fbe35(0x3b0)][_0x4fbe35(0x388)](this,_0x107036);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x223)]=function(_0x54fd50){const _0x17e61c=_0x45a258;this[_0x17e61c(0x366)](),this['resetWordWrap'](),this['registerResetRect'](_0x54fd50);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x366)]=function(){const _0x4200a4=_0x45a258;this[_0x4200a4(0x4db)](_0x4200a4(0x402));},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4db)]=function(_0x5dde7d){const _0x550af2=_0x45a258;this[_0x550af2(0x454)]=_0x5dde7d;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x382)]=function(){const _0x50358f=_0x45a258;return this[_0x50358f(0x454)];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x346)]=Window_Base['prototype'][_0x45a258(0x3c2)],Window_Base[_0x45a258(0x2fd)][_0x45a258(0x3c2)]=function(_0xd617b6){const _0x3e2b4d=_0x45a258;return this[_0x3e2b4d(0x383)](),VisuMZ['MessageCore'][_0x3e2b4d(0x346)][_0x3e2b4d(0x388)](this,_0xd617b6);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x1e2)]=function(_0x1aef5c){const _0x5cfdc5=_0x45a258;return VisuMZ['MessageCore'][_0x5cfdc5(0x346)][_0x5cfdc5(0x388)](this,_0x1aef5c);},VisuMZ[_0x45a258(0x428)]['Window_Base_processAllText']=Window_Base[_0x45a258(0x2fd)][_0x45a258(0x549)],Window_Base[_0x45a258(0x2fd)][_0x45a258(0x549)]=function(_0x5589fa){const _0xc159b5=_0x45a258;VisuMZ[_0xc159b5(0x428)][_0xc159b5(0x333)][_0xc159b5(0x388)](this,_0x5589fa);if(_0x5589fa[_0xc159b5(0x443)])this[_0xc159b5(0x4db)](_0xc159b5(0x402));},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x383)]=function(){const _0xb1b2de=_0x45a258;this[_0xb1b2de(0x318)](![]);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x19e)]=function(){const _0x318248=_0x45a258;return this[_0x318248(0x215)];},Window_Base['prototype'][_0x45a258(0x318)]=function(_0x288b4b){const _0x460bff=_0x45a258;return this[_0x460bff(0x215)]=_0x288b4b,'';},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x30c)]=function(_0x591587){const _0x3e64c9=_0x45a258;this[_0x3e64c9(0x217)]=JsonEx[_0x3e64c9(0x4bd)](_0x591587);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x2cb)]=function(){const _0x4d43b2=_0x45a258;this[_0x4d43b2(0x468)]['fontFace']=$gameSystem['mainFontFace'](),this[_0x4d43b2(0x468)][_0x4d43b2(0x4ff)]=$gameSystem[_0x4d43b2(0x32c)](),this[_0x4d43b2(0x468)]['fontBold']=![],this[_0x4d43b2(0x468)][_0x4d43b2(0x37b)]=![],this[_0x4d43b2(0x18b)]=0x0,this[_0x4d43b2(0x44a)]=!![],this['resetTextColor']();},Window_Base[_0x45a258(0x2fd)]['resetTextColor']=function(){const _0x2b45e0=_0x45a258;this['changeTextColor'](ColorManager[_0x2b45e0(0x1cd)]()),this[_0x2b45e0(0x25c)](ColorManager['outlineColor']());const _0x74a39e=VisuMZ['MessageCore'][_0x2b45e0(0x49c)][_0x2b45e0(0x197)];_0x74a39e['DefaultOutlineWidth']===undefined&&(_0x74a39e[_0x2b45e0(0x20d)]=0x3),this[_0x2b45e0(0x468)][_0x2b45e0(0x38b)]=_0x74a39e['DefaultOutlineWidth'],this[_0x2b45e0(0x221)](![]);},Window_Base[_0x45a258(0x2fd)]['setColorLock']=function(_0x45e8d6){const _0x51e2e4=_0x45a258;this[_0x51e2e4(0x2ee)]=_0x45e8d6;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x2b7)]=function(){const _0x34ca70=_0x45a258;return this[_0x34ca70(0x2ee)];},Window_Base[_0x45a258(0x2fd)]['isAutoColorAffected']=function(){return![];},Window_Base['prototype'][_0x45a258(0x398)]=function(){const _0x4f581c=_0x45a258,_0x3b74c9=['fontFace','fontSize',_0x4f581c(0x305),_0x4f581c(0x37b),_0x4f581c(0x41a),_0x4f581c(0x431),_0x4f581c(0x38b),_0x4f581c(0x3fb)];let _0x4efb25={};for(const _0x36085d of _0x3b74c9){_0x4efb25[_0x36085d]=this['contents'][_0x36085d];}return _0x4efb25;},Window_Base['prototype'][_0x45a258(0x543)]=function(_0x5b61bf){const _0x2b1650=_0x45a258;for(const _0x37c55f in _0x5b61bf){this[_0x2b1650(0x468)][_0x37c55f]=_0x5b61bf[_0x37c55f];}},VisuMZ['MessageCore']['Window_Base_update']=Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4c0)],Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4c0)]=function(){const _0xbe7d4f=_0x45a258;VisuMZ[_0xbe7d4f(0x428)][_0xbe7d4f(0x350)][_0xbe7d4f(0x388)](this),this[_0xbe7d4f(0x4be)]();},Window_Base['prototype'][_0x45a258(0x380)]=function(){return![];},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4be)]=function(){const _0x1f89d7=_0x45a258;this[_0x1f89d7(0x32b)]>0x0&&(this[_0x1f89d7(0x380)]()&&(this['x']=this[_0x1f89d7(0x426)](this['x'],this[_0x1f89d7(0x2c1)]),this['y']=this[_0x1f89d7(0x426)](this['y'],this[_0x1f89d7(0x355)]),this[_0x1f89d7(0x4ce)]=this[_0x1f89d7(0x426)](this[_0x1f89d7(0x4ce)],this[_0x1f89d7(0x47e)]),this['height']=this['applyMoveEasing'](this[_0x1f89d7(0x492)],this['_moveTargetHeight']),this['clampPlacementPosition']()),this[_0x1f89d7(0x32b)]--);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4bb)]=function(_0x160f53,_0x5f06b2){const _0x524b33=_0x45a258;!_0x160f53&&(this[_0x524b33(0x4ce)]=Math['min'](this[_0x524b33(0x4ce)],Graphics[_0x524b33(0x4ce)]),this[_0x524b33(0x492)]=Math[_0x524b33(0x2ed)](this['height'],Graphics[_0x524b33(0x492)]));if(!_0x5f06b2){const _0x218794=-(Math[_0x524b33(0x46a)](Graphics[_0x524b33(0x4ce)]-Graphics[_0x524b33(0x500)])/0x2),_0x2c24e3=_0x218794+Graphics[_0x524b33(0x4ce)]-this[_0x524b33(0x4ce)],_0x58bcca=-(Math[_0x524b33(0x46a)](Graphics['height']-Graphics[_0x524b33(0x2bc)])/0x2),_0x50f4b4=_0x58bcca+Graphics[_0x524b33(0x492)]-this['height'];this['x']=this['x'][_0x524b33(0x245)](_0x218794,_0x2c24e3),this['y']=this['y']['clamp'](_0x58bcca,_0x50f4b4);}},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x426)]=function(_0x26b6ee,_0x331c0b){const _0xb94ad1=_0x45a258,_0x1fe40d=this[_0xb94ad1(0x32b)],_0x232154=this['_wholeMoveDuration'],_0x44309c=this[_0xb94ad1(0x4ed)]((_0x232154-_0x1fe40d)/_0x232154),_0x5dec8a=this[_0xb94ad1(0x4ed)]((_0x232154-_0x1fe40d+0x1)/_0x232154),_0x2a5c21=(_0x26b6ee-_0x331c0b*_0x44309c)/(0x1-_0x44309c);return _0x2a5c21+(_0x331c0b-_0x2a5c21)*_0x5dec8a;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4ed)]=function(_0xc4fe7b){const _0x576d86=_0x45a258,_0x55aaa0=0x2;switch(this[_0x576d86(0x414)]){case 0x0:return _0xc4fe7b;case 0x1:return this[_0x576d86(0x2c2)](_0xc4fe7b,_0x55aaa0);case 0x2:return this[_0x576d86(0x43b)](_0xc4fe7b,_0x55aaa0);case 0x3:return this[_0x576d86(0x293)](_0xc4fe7b,_0x55aaa0);default:return Imported[_0x576d86(0x19f)]?VisuMZ[_0x576d86(0x426)](_0xc4fe7b,this[_0x576d86(0x414)]):_0xc4fe7b;}},Window_Base[_0x45a258(0x2fd)]['moveTo']=function(_0x4c4826,_0x4d837c,_0x1d80fb,_0x1d1aab,_0x164f2d,_0x1539bd){const _0x5c2c19=_0x45a258;this[_0x5c2c19(0x2c1)]=_0x4c4826,this[_0x5c2c19(0x355)]=_0x4d837c,this[_0x5c2c19(0x47e)]=_0x1d80fb||this['width'],this[_0x5c2c19(0x4f5)]=_0x1d1aab||this[_0x5c2c19(0x492)],this[_0x5c2c19(0x32b)]=_0x164f2d||0x1;if(this['_moveDuration']<=0x0)this[_0x5c2c19(0x32b)]=0x1;this[_0x5c2c19(0x24b)]=this[_0x5c2c19(0x32b)],this[_0x5c2c19(0x414)]=_0x1539bd||0x0;if(_0x164f2d<=0x0)this[_0x5c2c19(0x4be)]();},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x1cc)]=function(_0x38a200,_0x3dd08e,_0x22d7f9,_0x41683f,_0x1444cf,_0x4eb641){const _0x13649a=_0x45a258;this[_0x13649a(0x2c1)]=this['x']+_0x38a200,this[_0x13649a(0x355)]=this['y']+_0x3dd08e,this[_0x13649a(0x47e)]=this[_0x13649a(0x4ce)]+(_0x22d7f9||0x0),this[_0x13649a(0x4f5)]=this['height']+(_0x41683f||0x0),this[_0x13649a(0x32b)]=_0x1444cf||0x1;if(this[_0x13649a(0x32b)]<=0x0)this[_0x13649a(0x32b)]=0x1;this['_wholeMoveDuration']=this['_moveDuration'],this[_0x13649a(0x414)]=_0x4eb641||0x0;if(_0x1444cf<=0x0)this[_0x13649a(0x4be)]();},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x3d5)]=function(_0xb2a6d6,_0xd4c567){const _0x410c36=_0x45a258;this['moveTo'](this[_0x410c36(0x217)]['x'],this[_0x410c36(0x217)]['y'],this[_0x410c36(0x217)][_0x410c36(0x4ce)],this[_0x410c36(0x217)][_0x410c36(0x492)],_0xb2a6d6,_0xd4c567);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x4d7)]=Window_Base[_0x45a258(0x2fd)]['changeTextColor'],Window_Base[_0x45a258(0x2fd)][_0x45a258(0x459)]=function(_0x409462){const _0x5cd2bf=_0x45a258;if(this['isColorLocked']())return;_0x409462=_0x409462[_0x5cd2bf(0x1cb)](/\,/g,''),this[_0x5cd2bf(0x25f)]=this[_0x5cd2bf(0x25f)]||[],this[_0x5cd2bf(0x25f)][_0x5cd2bf(0x479)](this[_0x5cd2bf(0x468)]['textColor']),VisuMZ[_0x5cd2bf(0x428)]['Window_Base_changeTextColor']['call'](this,_0x409462);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x3f9)]=function(_0x31bbd4){const _0x1b8fa0=_0x45a258;this['obtainEscapeParam'](_0x31bbd4);if(this[_0x1b8fa0(0x2b7)]())return;_0x31bbd4[_0x1b8fa0(0x443)]&&(this[_0x1b8fa0(0x25f)]=this[_0x1b8fa0(0x25f)]||[],this[_0x1b8fa0(0x468)][_0x1b8fa0(0x41a)]=this[_0x1b8fa0(0x25f)][_0x1b8fa0(0x320)]()||ColorManager[_0x1b8fa0(0x1cd)]());},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x227)]=function(_0x5232ec){const _0x105ce2=_0x45a258;return _0x5232ec=this[_0x105ce2(0x47b)](_0x5232ec),_0x5232ec=this['convertBackslashCharacters'](_0x5232ec),_0x5232ec=this[_0x105ce2(0x343)](_0x5232ec),_0x5232ec=this['convertButtonAssistEscapeCharacters'](_0x5232ec),_0x5232ec=this[_0x105ce2(0x532)](_0x5232ec),_0x5232ec=this[_0x105ce2(0x26b)](_0x5232ec),_0x5232ec=this[_0x105ce2(0x374)](_0x5232ec),_0x5232ec=this[_0x105ce2(0x1aa)](_0x5232ec),_0x5232ec=this[_0x105ce2(0x370)](_0x5232ec),_0x5232ec=this['convertCasingEscapeCharacters'](_0x5232ec),_0x5232ec=this['convertBaseEscapeCharacters'](_0x5232ec),_0x5232ec=this[_0x105ce2(0x49b)](_0x5232ec),_0x5232ec=this[_0x105ce2(0x534)](_0x5232ec),_0x5232ec=this['convertMessageCoreEscapeReplacements'](_0x5232ec),_0x5232ec=this[_0x105ce2(0x469)](_0x5232ec),_0x5232ec=this[_0x105ce2(0x343)](_0x5232ec),_0x5232ec=this['processAutoColorWords'](_0x5232ec),_0x5232ec=this[_0x105ce2(0x3a1)](_0x5232ec),_0x5232ec;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x47b)]=function(_0x13cb54){const _0x579e13=_0x45a258;this['_textMacroFound']=![];for(const _0x18dbe5 of VisuMZ[_0x579e13(0x428)][_0x579e13(0x49c)][_0x579e13(0x1fe)]){_0x13cb54&&_0x13cb54[_0x579e13(0x463)](_0x18dbe5[_0x579e13(0x2d9)])&&(this[_0x579e13(0x2c7)]=!![],_0x13cb54=_0x13cb54[_0x579e13(0x1cb)](_0x18dbe5[_0x579e13(0x2d9)],_0x18dbe5[_0x579e13(0x41f)][_0x579e13(0x2c6)](this)));}return _0x13cb54||'';},Window_Base[_0x45a258(0x2fd)]['convertBackslashCharacters']=function(_0x2d97bb){const _0x271f7b=_0x45a258;return _0x2d97bb=_0x2d97bb['replace'](/\\/g,'\x1b'),_0x2d97bb=_0x2d97bb[_0x271f7b(0x1cb)](/\x1b\x1b/g,'\x5c'),_0x2d97bb;},Window_Base['prototype'][_0x45a258(0x343)]=function(_0x22659c){const _0x3a270d=_0x45a258;for(;;){if(_0x22659c[_0x3a270d(0x463)](/\\V\[(\d+)\]/gi))_0x22659c=_0x22659c[_0x3a270d(0x1cb)](/\\V\[(\d+)\]/gi,(_0x2203a9,_0x29994e)=>this['convertBackslashCharacters'](String($gameVariables['value'](parseInt(_0x29994e)))));else{if(_0x22659c[_0x3a270d(0x463)](/\x1bV\[(\d+)\]/gi))_0x22659c=_0x22659c[_0x3a270d(0x1cb)](/\x1bV\[(\d+)\]/gi,(_0x171fa1,_0x389097)=>this[_0x3a270d(0x302)](String($gameVariables[_0x3a270d(0x20c)](parseInt(_0x389097)))));else break;}}return _0x22659c;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x292)]=function(_0x4bd231){const _0x18daae=_0x45a258;return Imported[_0x18daae(0x19f)]&&(_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<Left (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x30b))),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<Right (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x19d))),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<Down (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x21d))),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)]('ok')),_0x4bd231=_0x4bd231['replace'](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x447))),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x486))),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x320))),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x538))),_0x4bd231=_0x4bd231[_0x18daae(0x1cb)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x18daae(0x24a)](_0x18daae(0x3cd)))),_0x4bd231;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x24a)]=function(_0x34168c){const _0x94566a=_0x45a258;let _0x1bd556=TextManager[_0x94566a(0x472)](_0x34168c)||'';return _0x1bd556=this[_0x94566a(0x302)](_0x1bd556),_0x1bd556=this['convertVariableEscapeCharacters'](_0x1bd556),_0x1bd556[_0x94566a(0x531)]();},Window_Base['prototype'][_0x45a258(0x532)]=function(_0x574bfd){return _0x574bfd=this['switchOutTextForLocalization'](_0x574bfd),this['registerActorNameAutoColorChanges'](),_0x574bfd;},Window_Base['prototype'][_0x45a258(0x441)]=function(_0x45c104){const _0x14a283=_0x45a258;return _0x45c104=TextManager[_0x14a283(0x212)](_0x45c104),_0x45c104;},VisuMZ['MessageCore'][_0x45a258(0x3c5)]=String[_0x45a258(0x2fd)][_0x45a258(0x288)],String['prototype'][_0x45a258(0x288)]=function(){const _0x5e69e=_0x45a258;let _0x5c4f1f=this;return _0x5c4f1f=TextManager[_0x5e69e(0x212)](_0x5c4f1f),VisuMZ[_0x5e69e(0x428)][_0x5e69e(0x3c5)]['apply'](_0x5c4f1f,arguments);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x461)]=Bitmap[_0x45a258(0x2fd)][_0x45a258(0x547)],Bitmap['prototype'][_0x45a258(0x547)]=function(_0x395fde,_0x53024c,_0x3bed35,_0x32b505,_0x4ad713,_0x21e917){const _0x1afbee=_0x45a258;_0x395fde=TextManager[_0x1afbee(0x212)](_0x395fde),VisuMZ['MessageCore'][_0x1afbee(0x461)][_0x1afbee(0x388)](this,_0x395fde,_0x53024c,_0x3bed35,_0x32b505,_0x4ad713,_0x21e917);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x41c)]=Bitmap[_0x45a258(0x2fd)][_0x45a258(0x37d)],Bitmap[_0x45a258(0x2fd)][_0x45a258(0x37d)]=function(_0x1223e5,_0x223b05,_0x20edee,_0x28cb8a,_0x5a8447,_0xb1df5a){const _0x17c85f=_0x45a258;_0x1223e5=TextManager['parseLocalizedText'](_0x1223e5),VisuMZ[_0x17c85f(0x428)][_0x17c85f(0x41c)][_0x17c85f(0x388)](this,_0x1223e5,_0x223b05,_0x20edee,_0x28cb8a,_0x5a8447,_0xb1df5a);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x469)]=function(_0x93dfc7){return _0x93dfc7;},Window_Base['prototype'][_0x45a258(0x26b)]=function(_0x4f9ba2){const _0x48c356=_0x45a258;return this[_0x48c356(0x262)]()&&(_0x4f9ba2=_0x4f9ba2['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x4f9ba2=_0x4f9ba2[_0x48c356(0x1cb)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x4f9ba2=_0x4f9ba2[_0x48c356(0x1cb)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x4f9ba2=_0x4f9ba2['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x4f9ba2=_0x4f9ba2[_0x48c356(0x1cb)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x4f9ba2=_0x4f9ba2[_0x48c356(0x1cb)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x4f9ba2=_0x4f9ba2[_0x48c356(0x1cb)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x4f9ba2=_0x4f9ba2[_0x48c356(0x1cb)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x4f9ba2;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x262)]=function(){const _0x1b6c95=_0x45a258,_0x1e0a70=[_0x1b6c95(0x3c0),_0x1b6c95(0x192)];return _0x1e0a70[_0x1b6c95(0x353)](this[_0x1b6c95(0x2cd)][_0x1b6c95(0x520)]);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x374)]=function(_0x394074){const _0x3b0586=_0x45a258;return _0x394074=_0x394074['replace'](/<B>/gi,_0x3b0586(0x501)),_0x394074=_0x394074[_0x3b0586(0x1cb)](/<\/B>/gi,_0x3b0586(0x27b)),_0x394074=_0x394074[_0x3b0586(0x1cb)](/<I>/gi,_0x3b0586(0x53b)),_0x394074=_0x394074['replace'](/<\/I>/gi,_0x3b0586(0x4d6)),_0x394074;},Window_Base['prototype']['convertTextAlignmentEscapeCharacters']=function(_0x1ef644){const _0x2df07d=_0x45a258;return _0x1ef644=_0x1ef644[_0x2df07d(0x1cb)](/<LEFT>/gi,_0x2df07d(0x44b)),_0x1ef644=_0x1ef644[_0x2df07d(0x1cb)](/<\/LEFT>/gi,_0x2df07d(0x349)),_0x1ef644=_0x1ef644[_0x2df07d(0x1cb)](/<CENTER>/gi,_0x2df07d(0x3b3)),_0x1ef644=_0x1ef644[_0x2df07d(0x1cb)](/<\/CENTER>/gi,_0x2df07d(0x349)),_0x1ef644=_0x1ef644['replace'](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x1ef644=_0x1ef644['replace'](/<\/RIGHT>/gi,_0x2df07d(0x349)),_0x1ef644;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x370)]=function(_0x58ab7f){const _0x10277e=_0x45a258;return _0x58ab7f=_0x58ab7f[_0x10277e(0x1cb)](/<COLORLOCK>/gi,_0x10277e(0x260)),_0x58ab7f=_0x58ab7f[_0x10277e(0x1cb)](/<\/COLORLOCK>/gi,_0x10277e(0x2fa)),_0x58ab7f=_0x58ab7f[_0x10277e(0x1cb)](/\(\(\(/gi,_0x10277e(0x260)),_0x58ab7f=_0x58ab7f['replace'](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x58ab7f;},Window_Base[_0x45a258(0x2fd)]['convertCasingEscapeCharacters']=function(_0x2e5faa){const _0xc60b1c=_0x45a258;return _0x2e5faa=_0x2e5faa['replace'](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0xc60b1c(0x429)),_0x2e5faa=_0x2e5faa[_0xc60b1c(0x1cb)](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,'\x1bCASING[0]'),_0x2e5faa=_0x2e5faa[_0xc60b1c(0x1cb)](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,'\x1bCASING[2]'),_0x2e5faa=_0x2e5faa[_0xc60b1c(0x1cb)](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0xc60b1c(0x509)),_0x2e5faa=_0x2e5faa[_0xc60b1c(0x1cb)](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,'\x1bCASING[3]'),_0x2e5faa=_0x2e5faa[_0xc60b1c(0x1cb)](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0xc60b1c(0x509)),_0x2e5faa=_0x2e5faa['replace'](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,_0xc60b1c(0x51d)),_0x2e5faa=_0x2e5faa['replace'](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,_0xc60b1c(0x509)),_0x2e5faa=_0x2e5faa[_0xc60b1c(0x1cb)](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,'\x1bCASING[5]'),_0x2e5faa=_0x2e5faa[_0xc60b1c(0x1cb)](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0xc60b1c(0x509)),_0x2e5faa;},Window_Base['prototype']['convertBaseEscapeCharacters']=function(_0x130e8a){const _0x49b457=_0x45a258;return _0x130e8a=_0x130e8a[_0x49b457(0x1cb)](/\x1bN\[(\d+)\]/gi,(_0xce3c69,_0x174b00)=>this[_0x49b457(0x3c1)](parseInt(_0x174b00))),_0x130e8a=_0x130e8a['replace'](/\x1bP\[(\d+)\]/gi,(_0x445b9b,_0x228cc0)=>this['partyMemberName'](parseInt(_0x228cc0))),_0x130e8a=_0x130e8a[_0x49b457(0x1cb)](/\x1bG/gi,TextManager['currencyUnit']),_0x130e8a;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x49b)]=function(_0x20ec84){const _0x27883c=_0x45a258;return _0x20ec84=_0x20ec84[_0x27883c(0x1cb)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x27883c(0x348)]()),_0x20ec84=_0x20ec84[_0x27883c(0x1cb)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x20ec84=_0x20ec84[_0x27883c(0x1cb)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x27883c(0x498)](!![])),_0x20ec84=_0x20ec84[_0x27883c(0x1cb)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x27883c(0x498)](![])),_0x20ec84;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x348)]=function(){const _0x222100=_0x45a258;if(!SceneManager['isSceneBattle']())return'';if(BattleManager['_target'])return BattleManager[_0x222100(0x507)][_0x222100(0x520)]();if(BattleManager[_0x222100(0x29e)][0x0])return BattleManager[_0x222100(0x29e)][0x0][_0x222100(0x520)]();return'';},Window_Base[_0x45a258(0x2fd)]['battleUserName']=function(){const _0x9d96f0=_0x45a258;if(!SceneManager[_0x9d96f0(0x2a4)]())return'';let _0x33743a=null;return _0x33743a=BattleManager['_subject'],!_0x33743a&&BattleManager[_0x9d96f0(0x378)]()&&(_0x33743a=BattleManager[_0x9d96f0(0x45c)]()),_0x33743a?_0x33743a[_0x9d96f0(0x520)]():'';},Window_Base['prototype'][_0x45a258(0x498)]=function(_0x50c5be){const _0x36e2bd=_0x45a258;if(!SceneManager[_0x36e2bd(0x2a4)]())return'';let _0x190cf5=BattleManager[_0x36e2bd(0x2d0)]||null;!_0x190cf5&&BattleManager[_0x36e2bd(0x378)]()&&(_0x190cf5=BattleManager[_0x36e2bd(0x515)]());if(_0x190cf5&&_0x190cf5[_0x36e2bd(0x1b4)]()){let _0x5b6be4='';if(_0x50c5be)_0x5b6be4+='\x1bI[%1]'[_0x36e2bd(0x288)](_0x190cf5[_0x36e2bd(0x1b4)]()[_0x36e2bd(0x4fd)]);return _0x5b6be4+=_0x190cf5[_0x36e2bd(0x1b4)]()[_0x36e2bd(0x520)],_0x5b6be4;}return'';},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x534)]=function(_0x39932a){const _0x431943=_0x45a258;for(const _0x589b14 of VisuMZ[_0x431943(0x428)][_0x431943(0x49c)]['TextCodeActions']){_0x39932a['match'](_0x589b14[_0x431943(0x2d9)])&&(_0x39932a=_0x39932a['replace'](_0x589b14[_0x431943(0x2d9)],_0x589b14[_0x431943(0x41f)]),_0x39932a=this['convertVariableEscapeCharacters'](_0x39932a));}return _0x39932a;},Window_Base['prototype'][_0x45a258(0x39d)]=function(_0x441f7b){const _0x115168=_0x45a258;for(const _0x5bb34a of VisuMZ[_0x115168(0x428)]['Settings'][_0x115168(0x456)]){_0x441f7b[_0x115168(0x463)](_0x5bb34a[_0x115168(0x2d9)])&&(_0x441f7b=_0x441f7b['replace'](_0x5bb34a['textCodeCheck'],_0x5bb34a[_0x115168(0x41f)][_0x115168(0x2c6)](this)),_0x441f7b=this['convertVariableEscapeCharacters'](_0x441f7b));}return _0x441f7b;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x3c1)]=function(_0x5aa5cf){const _0x410bc8=_0x45a258,_0xad5f2a=_0x5aa5cf>=0x1?$gameActors[_0x410bc8(0x45c)](_0x5aa5cf):null,_0x446156=_0xad5f2a?_0xad5f2a[_0x410bc8(0x520)]():'',_0x583b30=Number(VisuMZ['MessageCore'][_0x410bc8(0x49c)][_0x410bc8(0x1d8)][_0x410bc8(0x297)]);return this[_0x410bc8(0x258)]()&&_0x583b30!==0x0?_0x410bc8(0x3b2)[_0x410bc8(0x288)](_0x583b30,_0x446156):_0x446156;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x22c)]=function(_0x533787){const _0x39dc08=_0x45a258,_0x3aed74=_0x533787>=0x1?$gameParty[_0x39dc08(0x54b)]()[_0x533787-0x1]:null,_0x25060d=_0x3aed74?_0x3aed74[_0x39dc08(0x520)]():'',_0x11271e=Number(VisuMZ[_0x39dc08(0x428)][_0x39dc08(0x49c)]['AutoColor'][_0x39dc08(0x297)]);return this[_0x39dc08(0x258)]()&&_0x11271e!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x39dc08(0x288)](_0x11271e,_0x25060d):_0x25060d;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x23d)]=function(_0x2ac9a1){return this['isAutoColorAffected']()&&(_0x2ac9a1=this['processStoredAutoColorChanges'](_0x2ac9a1),_0x2ac9a1=this['processActorNameAutoColorChanges'](_0x2ac9a1)),_0x2ac9a1;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x253)]=function(_0x5ee8da){const _0x727f66=_0x45a258;for(autoColor of VisuMZ['MessageCore']['AutoColorRegExp']){_0x5ee8da=_0x5ee8da[_0x727f66(0x1cb)](autoColor[0x0],autoColor[0x1]);}return _0x5ee8da;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x47c)]=function(){const _0x175f9d=_0x45a258;this[_0x175f9d(0x18f)]=[];},Window_Base['prototype']['registerActorNameAutoColorChanges']=function(){const _0x2f46ce=_0x45a258;this[_0x2f46ce(0x47c)]();const _0x1c0a0e=VisuMZ[_0x2f46ce(0x428)]['Settings'][_0x2f46ce(0x1d8)],_0x3e23f0=_0x1c0a0e[_0x2f46ce(0x297)];if(_0x3e23f0<=0x0)return;for(const _0x3cadce of $gameActors['_data']){if(!_0x3cadce)continue;const _0x3f813b=_0x3cadce['name']();if(_0x3f813b[_0x2f46ce(0x531)]()[_0x2f46ce(0x495)]<=0x0)continue;if(/^\d+$/[_0x2f46ce(0x1b0)](_0x3f813b))continue;if(_0x3f813b[_0x2f46ce(0x463)](/-----/i))continue;let _0x59ee09=VisuMZ[_0x2f46ce(0x428)][_0x2f46ce(0x39a)](_0x3f813b);const _0x113029=new RegExp('\x5cb'+_0x59ee09+'\x5cb','g'),_0x8fed7a=_0x2f46ce(0x3b2)['format'](_0x3e23f0,_0x3f813b);this[_0x2f46ce(0x18f)][_0x2f46ce(0x46d)]([_0x113029,_0x8fed7a]);}},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x3b7)]=function(_0x91de21){const _0xffead2=_0x45a258;this[_0xffead2(0x18f)]===undefined&&this[_0xffead2(0x2d8)]();for(autoColor of this[_0xffead2(0x18f)]){_0x91de21=_0x91de21[_0xffead2(0x1cb)](autoColor[0x0],autoColor[0x1]);}return _0x91de21;},Window_Base['prototype']['databaseObjectName']=function(_0x2c2082,_0x50e3d7,_0x413c94){const _0x4d1872=_0x45a258;if(!_0x2c2082)return'';const _0x58dc9b=_0x2c2082[_0x50e3d7];let _0x5df1d5='';if(_0x58dc9b&&_0x413c94&&_0x58dc9b[_0x4d1872(0x4fd)]){const _0x5bb19e=_0x4d1872(0x506);_0x5df1d5=_0x5bb19e[_0x4d1872(0x288)](_0x58dc9b['iconIndex'],_0x58dc9b['name']);}else _0x58dc9b?_0x5df1d5=_0x58dc9b[_0x4d1872(0x520)]:_0x5df1d5='';return _0x5df1d5=TextManager[_0x4d1872(0x212)](_0x5df1d5),this['isAutoColorAffected']()&&(_0x5df1d5=this[_0x4d1872(0x1f5)](_0x5df1d5,_0x2c2082)),_0x5df1d5;},Window_Base['prototype'][_0x45a258(0x40a)]=function(){const _0x34279a=_0x45a258,_0x32e626=$gameParty[_0x34279a(0x53f)]();if(_0x32e626['id']<0x0)return'';let _0x3813fb=null;if(_0x32e626[_0x34279a(0x4e3)]===0x0)_0x3813fb=$dataItems[_0x32e626['id']];if(_0x32e626[_0x34279a(0x4e3)]===0x1)_0x3813fb=$dataWeapons[_0x32e626['id']];if(_0x32e626['type']===0x2)_0x3813fb=$dataArmors[_0x32e626['id']];if(!_0x3813fb)return'';return'\x1bi[%1]'['format'](_0x3813fb[_0x34279a(0x4fd)]);},Window_Base['prototype']['lastGainedObjectName']=function(_0x112292){const _0x109aed=_0x45a258,_0x2daf70=$gameParty[_0x109aed(0x53f)]();if(_0x2daf70['id']<0x0)return'';let _0x77007d=null;if(_0x2daf70[_0x109aed(0x4e3)]===0x0)_0x77007d=$dataItems[_0x2daf70['id']];if(_0x2daf70[_0x109aed(0x4e3)]===0x1)_0x77007d=$dataWeapons[_0x2daf70['id']];if(_0x2daf70[_0x109aed(0x4e3)]===0x2)_0x77007d=$dataArmors[_0x2daf70['id']];if(!_0x77007d)return'';return _0x112292?_0x109aed(0x506)[_0x109aed(0x288)](_0x77007d['iconIndex'],_0x77007d[_0x109aed(0x520)]):_0x77007d[_0x109aed(0x520)];},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x2f8)]=function(){const _0xd9b982=_0x45a258,_0x279fdf=$gameParty['getLastGainedItemData']();if(_0x279fdf['id']<=0x0)return'';return _0x279fdf[_0xd9b982(0x465)];},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x1f5)]=function(_0x394123,_0x20b80b){const _0x1a3fed=_0x45a258,_0x16074b=VisuMZ[_0x1a3fed(0x428)][_0x1a3fed(0x49c)][_0x1a3fed(0x1d8)];let _0x4c018c=0x0;if(_0x20b80b===$dataActors)_0x4c018c=_0x16074b['Actors'];if(_0x20b80b===$dataClasses)_0x4c018c=_0x16074b[_0x1a3fed(0x34b)];if(_0x20b80b===$dataSkills)_0x4c018c=_0x16074b[_0x1a3fed(0x21c)];if(_0x20b80b===$dataItems)_0x4c018c=_0x16074b[_0x1a3fed(0x32a)];if(_0x20b80b===$dataWeapons)_0x4c018c=_0x16074b[_0x1a3fed(0x4b9)];if(_0x20b80b===$dataArmors)_0x4c018c=_0x16074b[_0x1a3fed(0x413)];if(_0x20b80b===$dataEnemies)_0x4c018c=_0x16074b[_0x1a3fed(0x1de)];if(_0x20b80b===$dataStates)_0x4c018c=_0x16074b['States'];return _0x4c018c>0x0&&(_0x394123=_0x1a3fed(0x3b2)[_0x1a3fed(0x288)](_0x4c018c,_0x394123)),_0x394123;},Window_Base['prototype'][_0x45a258(0x3a1)]=function(_0x56a25f){const _0x3b283b=_0x45a258;if(_0x56a25f[_0x3b283b(0x353)]('\x1bTEXTALIGNMENT'))return this[_0x3b283b(0x318)](![]),_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x56a25f;_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x13b4c3,_0x113fa5)=>this[_0x3b283b(0x318)](!![])),_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x1084d4,_0x10498b)=>this[_0x3b283b(0x318)](![])),_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x394931,_0x1094cc)=>this['setWordWrap'](![]));if(_0x56a25f[_0x3b283b(0x463)](Window_Message['_autoSizeRegexp']))this[_0x3b283b(0x318)](![]);else _0x56a25f[_0x3b283b(0x463)](Window_Message[_0x3b283b(0x523)])&&this[_0x3b283b(0x318)](![]);if(!this[_0x3b283b(0x19e)]())return _0x56a25f=_0x56a25f['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x56a25f;if(_0x56a25f['length']<=0x0)return _0x56a25f;return _0x56a25f[_0x3b283b(0x463)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x56a25f=VisuMZ[_0x3b283b(0x428)][_0x3b283b(0x4fb)](_0x56a25f)[_0x3b283b(0x228)]('')),VisuMZ[_0x3b283b(0x428)][_0x3b283b(0x49c)]['WordWrap']['LineBreakSpace']?(_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/[\n\r]+/g,'\x20'),_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/[\n\r]+/g,''),_0x56a25f=_0x56a25f['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x56a25f=this[_0x3b283b(0x235)](_0x56a25f),_0x56a25f=_0x56a25f[_0x3b283b(0x18c)]('\x20')[_0x3b283b(0x228)]('\x1bWrapBreak[0]'),_0x56a25f=_0x56a25f[_0x3b283b(0x1cb)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x56a25f=_0x56a25f['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x56a25f;},VisuMZ[_0x45a258(0x428)][_0x45a258(0x4fb)]=function(_0x4f2f8e){const _0x4c6011=_0x45a258;let _0x5e7b0e=[],_0x401b9e='';while(_0x4f2f8e[_0x4c6011(0x495)]>0x0){const _0x52278d=_0x4f2f8e[_0x4c6011(0x37a)](0x0);_0x4f2f8e=_0x4f2f8e['slice'](0x1),_0x52278d[_0x4c6011(0x463)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x401b9e[_0x4c6011(0x495)]>0x0&&(_0x5e7b0e[_0x4c6011(0x46d)](_0x401b9e),_0x401b9e=''),_0x5e7b0e[_0x4c6011(0x46d)](_0x52278d+_0x4c6011(0x42f))):_0x401b9e+=_0x52278d;}return _0x401b9e['length']>0x0&&(_0x5e7b0e[_0x4c6011(0x46d)](_0x401b9e),_0x401b9e=''),_0x5e7b0e;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x235)]=function(_0x524aae){return _0x524aae;},VisuMZ[_0x45a258(0x428)]['Window_Base_processNewLine']=Window_Base[_0x45a258(0x2fd)][_0x45a258(0x39b)],Window_Base[_0x45a258(0x2fd)][_0x45a258(0x39b)]=function(_0x4aa936){const _0x4546ab=_0x45a258;VisuMZ[_0x4546ab(0x428)][_0x4546ab(0x291)][_0x4546ab(0x388)](this,_0x4aa936),this['processTextAlignmentX'](_0x4aa936);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x539)]=function(_0x95eaf){const _0x269d2a=_0x45a258;let _0xdfd990=_0x95eaf[_0x269d2a(0x425)][_0x95eaf['index']++];if(_0xdfd990[_0x269d2a(0x281)](0x0)<0x20)this[_0x269d2a(0x1f9)](_0x95eaf),this[_0x269d2a(0x2a7)](_0x95eaf,_0xdfd990);else{if(this['_textCasing']===0x1)_0xdfd990=_0xdfd990[_0x269d2a(0x450)]();if(this[_0x269d2a(0x18b)]===0x2){if(this[_0x269d2a(0x44a)])_0xdfd990=_0xdfd990['toUpperCase']();this[_0x269d2a(0x44a)]=/\s/[_0x269d2a(0x1b0)](_0xdfd990);}if(this[_0x269d2a(0x18b)]===0x3)_0xdfd990=_0xdfd990[_0x269d2a(0x462)]();this[_0x269d2a(0x18b)]===0x4&&(_0xdfd990=this[_0x269d2a(0x1a6)]?_0xdfd990[_0x269d2a(0x462)]():_0xdfd990[_0x269d2a(0x450)](),this[_0x269d2a(0x1a6)]=!this[_0x269d2a(0x1a6)]),this['_textCasing']===0x5&&(_0xdfd990=Math['random']()<0.5?_0xdfd990[_0x269d2a(0x462)]():_0xdfd990['toLowerCase']()),_0x95eaf[_0x269d2a(0x514)]+=_0xdfd990;}},VisuMZ['MessageCore'][_0x45a258(0x1ad)]=Window_Base['prototype'][_0x45a258(0x2a7)],Window_Base['prototype'][_0x45a258(0x2a7)]=function(_0x5e5657,_0x520901){const _0x34dc36=_0x45a258;VisuMZ[_0x34dc36(0x428)][_0x34dc36(0x1ad)][_0x34dc36(0x388)](this,_0x5e5657,_0x520901);if(_0x520901==='\x1bWrapBreak[0]')this['processWrapBreak'](_0x5e5657);else _0x520901==='\x1bWrapJpBreak[0]'&&this['processWrapBreak'](_0x5e5657,!![]);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x2f1)]=function(_0x536f16){const _0x113f1e=_0x45a258;var _0x1882cc=/^\<(.*?)\>/[_0x113f1e(0x1cf)](_0x536f16[_0x113f1e(0x425)][_0x113f1e(0x229)](_0x536f16[_0x113f1e(0x4f3)]));return _0x1882cc?(_0x536f16[_0x113f1e(0x4f3)]+=_0x1882cc[0x0][_0x113f1e(0x495)],String(_0x1882cc[0x0]['slice'](0x1,_0x1882cc[0x0]['length']-0x1))):'';},VisuMZ[_0x45a258(0x428)][_0x45a258(0x4fe)]=Window_Base[_0x45a258(0x2fd)][_0x45a258(0x404)],Window_Base[_0x45a258(0x2fd)]['processEscapeCharacter']=function(_0x559ab6,_0x17c458){const _0x363b73=_0x45a258;switch(_0x559ab6){case'C':_0x17c458[_0x363b73(0x443)]?VisuMZ['MessageCore'][_0x363b73(0x4fe)][_0x363b73(0x388)](this,_0x559ab6,_0x17c458):this[_0x363b73(0x1da)](_0x17c458);break;case'I':case'{':case'}':VisuMZ[_0x363b73(0x428)][_0x363b73(0x4fe)][_0x363b73(0x388)](this,_0x559ab6,_0x17c458);break;case'FS':this['processFsTextCode'](_0x17c458);break;case'PX':this['processPxTextCode'](_0x17c458);break;case'PY':this['processPyTextCode'](_0x17c458);break;case _0x363b73(0x403):this[_0x363b73(0x3a0)](this['obtainEscapeParam'](_0x17c458));break;case _0x363b73(0x1bc):this[_0x363b73(0x2ba)](_0x17c458);break;case _0x363b73(0x3c8):this[_0x363b73(0x4e5)](_0x17c458);break;case'COLORLOCK':this[_0x363b73(0x3e4)](_0x17c458);break;case _0x363b73(0x34a):this[_0x363b73(0x19a)](_0x17c458);break;case _0x363b73(0x491):this[_0x363b73(0x36f)](this['obtainEscapeParam'](_0x17c458));break;case _0x363b73(0x4d9):this[_0x363b73(0x28c)](_0x17c458);break;case'PREVCOLOR':this[_0x363b73(0x3f9)](_0x17c458);break;case _0x363b73(0x282):this[_0x363b73(0x4d2)](_0x17c458);break;case _0x363b73(0x1ab):this[_0x363b73(0x46e)](_0x17c458);break;case _0x363b73(0x3b8):this[_0x363b73(0x435)](_0x17c458);break;case _0x363b73(0x488):this[_0x363b73(0x435)](_0x17c458,!![]);break;default:this[_0x363b73(0x199)](_0x559ab6,_0x17c458);}},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x199)]=function(_0x358faa,_0x8ac205){const _0x47da1a=_0x45a258;for(const _0x2d4c06 of VisuMZ['MessageCore'][_0x47da1a(0x49c)][_0x47da1a(0x344)]){if(_0x2d4c06[_0x47da1a(0x1d5)]===_0x358faa){if(_0x2d4c06[_0x47da1a(0x24e)]==='')this['obtainEscapeParam'](_0x8ac205);_0x2d4c06[_0x47da1a(0x22e)][_0x47da1a(0x388)](this,_0x8ac205);if(this[_0x47da1a(0x2cd)]===Window_Message){const _0x44224d=_0x2d4c06[_0x47da1a(0x3fd)]||0x0;if(_0x44224d>0x0)this[_0x47da1a(0x3e9)](_0x44224d);}}}},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x400)]=function(){const _0x37b3ae=_0x45a258;this['contents'][_0x37b3ae(0x4ff)]+=VisuMZ[_0x37b3ae(0x428)][_0x37b3ae(0x49c)][_0x37b3ae(0x197)][_0x37b3ae(0x2de)],this[_0x37b3ae(0x468)][_0x37b3ae(0x4ff)]=Math['min'](this['contents']['fontSize'],VisuMZ['MessageCore'][_0x37b3ae(0x49c)][_0x37b3ae(0x197)][_0x37b3ae(0x2c0)]);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x444)]=function(){const _0x2ac403=_0x45a258;this[_0x2ac403(0x468)][_0x2ac403(0x4ff)]-=VisuMZ[_0x2ac403(0x428)][_0x2ac403(0x49c)][_0x2ac403(0x197)]['FontChangeValue'],this[_0x2ac403(0x468)][_0x2ac403(0x4ff)]=Math[_0x2ac403(0x375)](this[_0x2ac403(0x468)][_0x2ac403(0x4ff)],VisuMZ[_0x2ac403(0x428)][_0x2ac403(0x49c)][_0x2ac403(0x197)]['FontSmallerCap']);},Window_Base['prototype'][_0x45a258(0x265)]=function(_0x4abcd4){const _0x4e5f7f=_0x45a258,_0x5e26bf=this['obtainEscapeParam'](_0x4abcd4);this[_0x4e5f7f(0x468)]['fontSize']=_0x5e26bf['clamp'](VisuMZ['MessageCore'][_0x4e5f7f(0x49c)][_0x4e5f7f(0x197)][_0x4e5f7f(0x376)],VisuMZ[_0x4e5f7f(0x428)][_0x4e5f7f(0x49c)][_0x4e5f7f(0x197)][_0x4e5f7f(0x2c0)]);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x2c4)]=function(_0x3eb2dd){const _0x37ab09=_0x45a258;let _0x2c2efd=this[_0x37ab09(0x468)][_0x37ab09(0x4ff)];const _0x486496=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0xee2ec5=_0x486496['exec'](_0x3eb2dd);if(!_0xee2ec5)break;const _0x6a45c2=String(_0xee2ec5[0x1])[_0x37ab09(0x462)]();if(_0x6a45c2==='{')this[_0x37ab09(0x400)]();else{if(_0x6a45c2==='}')this[_0x37ab09(0x444)]();else _0x6a45c2==='FS'&&(this[_0x37ab09(0x468)][_0x37ab09(0x4ff)]=parseInt(_0xee2ec5[0x3])['clamp'](VisuMZ[_0x37ab09(0x428)][_0x37ab09(0x49c)]['General']['FontSmallerCap'],VisuMZ[_0x37ab09(0x428)]['Settings']['General'][_0x37ab09(0x2c0)]));}this[_0x37ab09(0x468)][_0x37ab09(0x4ff)]>_0x2c2efd&&(_0x2c2efd=this[_0x37ab09(0x468)][_0x37ab09(0x4ff)]);}return _0x2c2efd;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x373)]=function(_0x3b8b4f){const _0x1069f6=_0x45a258;_0x3b8b4f['x']=this[_0x1069f6(0x1da)](_0x3b8b4f),VisuMZ['MessageCore'][_0x1069f6(0x49c)]['General']['RelativePXPY']&&(_0x3b8b4f['x']+=_0x3b8b4f[_0x1069f6(0x3f6)]);},Window_Base[_0x45a258(0x2fd)]['processPyTextCode']=function(_0x30f88d){const _0x39ba03=_0x45a258;_0x30f88d['y']=this['obtainEscapeParam'](_0x30f88d),VisuMZ[_0x39ba03(0x428)]['Settings'][_0x39ba03(0x197)]['RelativePXPY']&&(_0x30f88d['y']+=_0x30f88d[_0x39ba03(0x319)]);},Window_Base['prototype'][_0x45a258(0x3a0)]=function(_0x42e934){const _0x269e54=_0x45a258;this[_0x269e54(0x468)][_0x269e54(0x305)]=!!_0x42e934;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x36f)]=function(_0x2e46b4){const _0x2d45bb=_0x45a258;this[_0x2d45bb(0x468)][_0x2d45bb(0x37b)]=!!_0x2e46b4;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4d2)]=function(_0x5a3dcc){const _0x39125e=_0x45a258,_0x1c3886=this[_0x39125e(0x1da)](_0x5a3dcc);if(!_0x5a3dcc[_0x39125e(0x443)])return;switch(_0x1c3886){case 0x0:this[_0x39125e(0x4db)](_0x39125e(0x402));return;case 0x1:this['setTextAlignment'](_0x39125e(0x30b));break;case 0x2:this[_0x39125e(0x4db)](_0x39125e(0x2af));break;case 0x3:this[_0x39125e(0x4db)]('right');break;}this[_0x39125e(0x525)](_0x5a3dcc);},Window_Base[_0x45a258(0x2fd)]['processTextAlignmentX']=function(_0x283189){const _0x4fff89=_0x45a258;if(!_0x283189[_0x4fff89(0x443)])return;if(_0x283189[_0x4fff89(0x37e)])return;if(this[_0x4fff89(0x382)]()===_0x4fff89(0x402))return;let _0x164fb3=_0x283189[_0x4fff89(0x425)]['indexOf'](_0x4fff89(0x392),_0x283189['index']+0x1),_0x534bc4=_0x283189[_0x4fff89(0x425)][_0x4fff89(0x412)]('\x0a',_0x283189[_0x4fff89(0x4f3)]+0x1);if(_0x164fb3<0x0)_0x164fb3=_0x283189['text'][_0x4fff89(0x495)]+0x1;if(_0x534bc4>0x0)_0x164fb3=Math['min'](_0x164fb3,_0x534bc4);const _0x127084=_0x283189[_0x4fff89(0x425)]['substring'](_0x283189['index'],_0x164fb3),_0x263499=this[_0x4fff89(0x4da)](_0x127084)[_0x4fff89(0x4ce)],_0x529229=_0x283189[_0x4fff89(0x4ce)]||this[_0x4fff89(0x421)]-0x8,_0x48d9d6=this[_0x4fff89(0x2cd)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this[_0x4fff89(0x382)]()){case _0x4fff89(0x30b):_0x283189['x']=_0x283189['startX'];break;case _0x4fff89(0x2af):_0x283189['x']=_0x283189['startX'],_0x283189['x']+=Math[_0x4fff89(0x46a)]((_0x529229-_0x263499)/0x2);_0x48d9d6&&(_0x283189['x']-=_0x283189['startX']/0x2);break;case'right':_0x283189['x']=_0x529229-_0x263499+_0x283189[_0x4fff89(0x3f6)];_0x48d9d6&&(_0x283189['x']-=_0x283189[_0x4fff89(0x3f6)]);break;}},Window_Base[_0x45a258(0x2fd)]['textSizeExTextAlignment']=function(_0x598d10){const _0x28dca0=_0x45a258;_0x598d10=_0x598d10[_0x28dca0(0x1cb)](/\x1b!/g,''),_0x598d10=_0x598d10[_0x28dca0(0x1cb)](/\x1b\|/g,''),_0x598d10=_0x598d10[_0x28dca0(0x1cb)](/\x1b\./g,'');const _0x1a4673=this[_0x28dca0(0x20a)](_0x598d10,0x0,0x0,0x0),_0x4c846d=this[_0x28dca0(0x398)]();return _0x1a4673[_0x28dca0(0x443)]=![],this['processAllText'](_0x1a4673),this[_0x28dca0(0x543)](_0x4c846d),{'width':_0x1a4673[_0x28dca0(0x324)],'height':_0x1a4673[_0x28dca0(0x485)]};},Window_Base['WORD_WRAP_PADDING']=VisuMZ[_0x45a258(0x428)][_0x45a258(0x49c)][_0x45a258(0x3fc)][_0x45a258(0x1fb)]||0x0,Window_Base[_0x45a258(0x2fd)]['processWrapBreak']=function(_0x37544b,_0x2fb10c){const _0x344095=_0x45a258,_0x19cfd6=(_0x37544b['rtl']?-0x1:0x1)*this['textWidth']('\x20');if(!_0x2fb10c)_0x37544b['x']+=_0x19cfd6;if(this[_0x344095(0x1da)](_0x37544b)>0x0&&!_0x2fb10c)_0x37544b['x']+=_0x19cfd6;if(_0x37544b[_0x344095(0x37e)])return;let _0x39b55e;_0x2fb10c?_0x39b55e=_0x37544b[_0x344095(0x425)][_0x344095(0x412)]('\x1bWrapJpBreak[0]',_0x37544b[_0x344095(0x4f3)]+0x1):_0x39b55e=_0x37544b[_0x344095(0x425)][_0x344095(0x412)](_0x344095(0x24f),_0x37544b[_0x344095(0x4f3)]+0x1);let _0x173d8f=_0x37544b[_0x344095(0x425)][_0x344095(0x412)]('\x0a',_0x37544b['index']+0x1);if(_0x39b55e<0x0)_0x39b55e=_0x37544b[_0x344095(0x425)][_0x344095(0x495)]+0x1;if(_0x173d8f>0x0)_0x39b55e=Math[_0x344095(0x2ed)](_0x39b55e,_0x173d8f);const _0x5f33d9=_0x37544b['text'][_0x344095(0x4b3)](_0x37544b[_0x344095(0x4f3)],_0x39b55e),_0xff9a03=this['textSizeExWordWrap'](_0x5f33d9)[_0x344095(0x4ce)];let _0xab0df2=_0x37544b['width']||this[_0x344095(0x421)];_0xab0df2-=Window_Base[_0x344095(0x285)];if(this['constructor']===Window_Message){const _0x580a83=$gameMessage[_0x344095(0x535)]()===''?0x0:ImageManager[_0x344095(0x470)]+0x14;_0xab0df2-=_0x580a83,VisuMZ[_0x344095(0x428)][_0x344095(0x49c)][_0x344095(0x3fc)]['TightWrap']&&(_0xab0df2-=_0x580a83);}let _0x4faf66=![];_0x37544b['x']+_0xff9a03>_0x37544b[_0x344095(0x3f6)]+_0xab0df2&&(_0x4faf66=!![]),_0xff9a03===0x0&&(_0x4faf66=![]),_0x4faf66&&(_0x37544b[_0x344095(0x425)]=_0x37544b[_0x344095(0x425)][_0x344095(0x229)](0x0,_0x37544b[_0x344095(0x4f3)])+'\x0a'+_0x37544b[_0x344095(0x425)][_0x344095(0x3d8)](_0x37544b[_0x344095(0x4f3)]));},Window_Base['prototype'][_0x45a258(0x1d2)]=function(_0x1a1fb9){const _0x5c530e=_0x45a258,_0x3711bb=this[_0x5c530e(0x20a)](_0x1a1fb9,0x0,0x0,0x0),_0x438f6b=this[_0x5c530e(0x398)]();return _0x3711bb['drawing']=![],this[_0x5c530e(0x318)](![]),this[_0x5c530e(0x549)](_0x3711bb),this[_0x5c530e(0x318)](!![]),this['returnPreservedFontSettings'](_0x438f6b),{'width':_0x3711bb[_0x5c530e(0x324)],'height':_0x3711bb[_0x5c530e(0x485)]};},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x19a)]=function(_0x1cdee0){const _0x9706e7=_0x45a258;return this[_0x9706e7(0x1da)](_0x1cdee0);},Window_Base[_0x45a258(0x2fd)]['processDrawPicture']=function(_0x348729){const _0x535080=_0x45a258,_0x1a5b3d=this[_0x535080(0x2f1)](_0x348729)[_0x535080(0x18c)](',');if(!_0x348729['drawing'])return;const _0x4e7ec4=_0x1a5b3d[0x0][_0x535080(0x531)](),_0x380b9c=_0x1a5b3d[0x1]||0x0,_0x5dbae9=_0x1a5b3d[0x2]||0x0,_0x6768e9=ImageManager[_0x535080(0x1e3)](_0x4e7ec4),_0x5cd01e=this[_0x535080(0x468)]['paintOpacity'];_0x6768e9[_0x535080(0x339)](this[_0x535080(0x4b1)][_0x535080(0x2c6)](this,_0x6768e9,_0x348729['x'],_0x348729['y'],_0x380b9c,_0x5dbae9,_0x5cd01e));},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4b1)]=function(_0x11901,_0x419f47,_0x497966,_0x5e28a3,_0x425a4f,_0x18adcb){const _0x83323d=_0x45a258;_0x5e28a3=_0x5e28a3||_0x11901[_0x83323d(0x4ce)],_0x425a4f=_0x425a4f||_0x11901[_0x83323d(0x492)],this['contentsBack'][_0x83323d(0x3fb)]=_0x18adcb,this[_0x83323d(0x3ce)][_0x83323d(0x4c6)](_0x11901,0x0,0x0,_0x11901[_0x83323d(0x4ce)],_0x11901['height'],_0x419f47,_0x497966,_0x5e28a3,_0x425a4f),this['contentsBack']['paintOpacity']=0xff;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x4e5)]=function(_0x50d3b1){const _0x1b9013=_0x45a258,_0x3a7d9b=this[_0x1b9013(0x2f1)](_0x50d3b1)[_0x1b9013(0x18c)](',');if(!_0x50d3b1['drawing'])return;const _0x24ecb4=_0x3a7d9b[0x0][_0x1b9013(0x531)](),_0x5bf88c=ImageManager[_0x1b9013(0x1e3)](_0x24ecb4),_0x3579a6=JsonEx[_0x1b9013(0x4bd)](_0x50d3b1),_0x57cc9d=this[_0x1b9013(0x468)][_0x1b9013(0x3fb)];_0x5bf88c[_0x1b9013(0x339)](this[_0x1b9013(0x188)][_0x1b9013(0x2c6)](this,_0x5bf88c,_0x3579a6,_0x57cc9d));},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x188)]=function(_0x111fba,_0x29bf4b,_0x46d663){const _0x1a7894=_0x45a258,_0x9388b3=_0x29bf4b[_0x1a7894(0x4ce)]||this[_0x1a7894(0x421)],_0x8d6976=this[_0x1a7894(0x311)]!==undefined?this[_0x1a7894(0x545)]():this[_0x1a7894(0x1c5)],_0x3fc7fe=_0x9388b3/_0x111fba['width'],_0x3ad4b3=_0x8d6976/_0x111fba[_0x1a7894(0x492)],_0xb08016=Math['min'](_0x3fc7fe,_0x3ad4b3,0x1),_0x227af8=this[_0x1a7894(0x311)]!==undefined?(this[_0x1a7894(0x4f1)](0x0)[_0x1a7894(0x492)]-this[_0x1a7894(0x3ee)]())/0x2:0x0,_0x3f94aa=_0x111fba[_0x1a7894(0x4ce)]*_0xb08016,_0xcd578e=_0x111fba[_0x1a7894(0x492)]*_0xb08016,_0x39e020=Math[_0x1a7894(0x46a)]((_0x9388b3-_0x3f94aa)/0x2)+_0x29bf4b[_0x1a7894(0x3f6)],_0x785032=Math[_0x1a7894(0x46a)]((_0x8d6976-_0xcd578e)/0x2)+_0x29bf4b[_0x1a7894(0x319)]-_0x227af8*0x2;this[_0x1a7894(0x3ce)][_0x1a7894(0x3fb)]=_0x46d663,this['contentsBack'][_0x1a7894(0x4c6)](_0x111fba,0x0,0x0,_0x111fba[_0x1a7894(0x4ce)],_0x111fba[_0x1a7894(0x492)],_0x39e020,_0x785032,_0x3f94aa,_0xcd578e),this[_0x1a7894(0x3ce)][_0x1a7894(0x3fb)]=0xff;},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x3e4)]=function(_0x236f3a){const _0x41de5a=_0x45a258,_0x255c1e=this[_0x41de5a(0x1da)](_0x236f3a);if(_0x236f3a[_0x41de5a(0x443)])this['setColorLock'](_0x255c1e>0x0);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x46e)]=function(_0x539a0f){const _0x1fdecb=_0x45a258,_0x34ebcc=this[_0x1fdecb(0x1da)](_0x539a0f);this[_0x1fdecb(0x2cd)]===Window_Message&&_0x539a0f[_0x1fdecb(0x443)]&&this[_0x1fdecb(0x3dc)](_0x34ebcc);},Window_Base['prototype'][_0x45a258(0x2ba)]=function(_0x39d33d){const _0x1855c3=_0x45a258;this[_0x1855c3(0x18b)]=this[_0x1855c3(0x1da)](_0x39d33d),this[_0x1855c3(0x44a)]=!![],this[_0x1855c3(0x1a6)]=!![];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x2e9)]=function(_0x1a4610){const _0x30cf83=_0x45a258;if($gameTemp[_0x30cf83(0x437)]()){let _0x1dc3ad=_0x30cf83(0x4c8)[_0x30cf83(0x288)](_0x1a4610[_0x30cf83(0x2cd)][_0x30cf83(0x520)]);alert(_0x1dc3ad),SceneManager['exit']();}},Window_Base['prototype']['loadMessageFace']=function(){const _0x441318=_0x45a258;VisuMZ[_0x441318(0x428)][_0x441318(0x2e9)](this);},Window_Base[_0x45a258(0x2fd)]['drawMessageFace']=function(){VisuMZ['MessageCore']['NonSupportedTextCodes'](this);},Window_Base[_0x45a258(0x2fd)][_0x45a258(0x2a6)]=function(){const _0x1d5bee=_0x45a258;VisuMZ[_0x1d5bee(0x428)][_0x1d5bee(0x2e9)](this);},Window_Help[_0x45a258(0x2fd)][_0x45a258(0x383)]=function(){const _0x16d0d4=_0x45a258;this[_0x16d0d4(0x318)]($gameSystem[_0x16d0d4(0x3db)]());},Window_Help[_0x45a258(0x2fd)][_0x45a258(0x258)]=function(){return!![];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x4bf)]=Window_Help[_0x45a258(0x2fd)][_0x45a258(0x40f)],Window_Help[_0x45a258(0x2fd)][_0x45a258(0x40f)]=function(){const _0x21eebd=_0x45a258;this[_0x21eebd(0x47c)](),VisuMZ[_0x21eebd(0x428)][_0x21eebd(0x4bf)]['call'](this),this[_0x21eebd(0x383)]();},VisuMZ['MessageCore']['Window_Options_addGeneralOptions']=Window_Options[_0x45a258(0x2fd)][_0x45a258(0x4c7)],Window_Options[_0x45a258(0x2fd)][_0x45a258(0x4c7)]=function(){const _0x280ae3=_0x45a258;VisuMZ[_0x280ae3(0x428)]['Window_Options_addGeneralOptions'][_0x280ae3(0x388)](this),this['addMessageCoreCommands']();},Window_Options['prototype'][_0x45a258(0x516)]=function(){const _0x52ff29=_0x45a258;VisuMZ[_0x52ff29(0x428)][_0x52ff29(0x49c)][_0x52ff29(0x50b)][_0x52ff29(0x482)]&&TextManager['isVisuMzLocalizationEnabled']()&&this['addMessageCoreLocalizationCommand'](),VisuMZ[_0x52ff29(0x428)]['Settings']['TextSpeed'][_0x52ff29(0x482)]&&this['addMessageCoreTextSpeedCommand']();},Window_Options[_0x45a258(0x2fd)][_0x45a258(0x3f2)]=function(){const _0x295fdd=_0x45a258,_0x406d4a=TextManager['messageCoreLocalization'],_0x2f3f9c=_0x295fdd(0x54a);this[_0x295fdd(0x189)](_0x406d4a,_0x2f3f9c);},Window_Options[_0x45a258(0x2fd)][_0x45a258(0x1e5)]=function(){const _0x4af7cd=_0x45a258,_0x5228f8=TextManager[_0x4af7cd(0x1ed)],_0x1ccd5f=_0x4af7cd(0x304);this[_0x4af7cd(0x189)](_0x5228f8,_0x1ccd5f);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x3ed)]=Window_Options['prototype'][_0x45a258(0x4ba)],Window_Options[_0x45a258(0x2fd)]['statusText']=function(_0x45fa28){const _0x3e64af=_0x45a258,_0x3df602=this[_0x3e64af(0x41b)](_0x45fa28);if(_0x3df602==='textLocale')return this[_0x3e64af(0x41e)]();if(_0x3df602===_0x3e64af(0x304))return this[_0x3e64af(0x2ff)]();return VisuMZ[_0x3e64af(0x428)][_0x3e64af(0x3ed)][_0x3e64af(0x388)](this,_0x45fa28);},Window_Options[_0x45a258(0x2fd)][_0x45a258(0x41e)]=function(){const _0x82ea89=_0x45a258,_0x472c31=ConfigManager[_0x82ea89(0x54a)];return TextManager[_0x82ea89(0x524)](_0x472c31);},Window_Options[_0x45a258(0x2fd)][_0x45a258(0x2ff)]=function(){const _0x50d0c6=_0x45a258,_0x28aa19=this[_0x50d0c6(0x18e)](_0x50d0c6(0x304));return _0x28aa19>0xa?TextManager[_0x50d0c6(0x194)]:_0x28aa19;},VisuMZ[_0x45a258(0x428)]['Window_Options_isVolumeSymbol']=Window_Options[_0x45a258(0x2fd)][_0x45a258(0x36c)],Window_Options[_0x45a258(0x2fd)]['isVolumeSymbol']=function(_0x21def1){const _0x2ea8f0=_0x45a258;if(_0x21def1==='textLocale')return!![];if(_0x21def1===_0x2ea8f0(0x304))return!![];return VisuMZ[_0x2ea8f0(0x428)][_0x2ea8f0(0x51a)][_0x2ea8f0(0x388)](this,_0x21def1);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x27c)]=Window_Options[_0x45a258(0x2fd)]['changeVolume'],Window_Options[_0x45a258(0x2fd)][_0x45a258(0x42b)]=function(_0x2d630d,_0x94edcb,_0x238fa6){const _0x938f1=_0x45a258;if(_0x2d630d==='textLocale')return this[_0x938f1(0x2cc)](_0x94edcb,_0x238fa6);if(_0x2d630d==='textSpeed')return this[_0x938f1(0x316)](_0x2d630d,_0x94edcb,_0x238fa6);VisuMZ[_0x938f1(0x428)][_0x938f1(0x27c)][_0x938f1(0x388)](this,_0x2d630d,_0x94edcb,_0x238fa6);},Window_Options[_0x45a258(0x2fd)]['changeVisuMzTextLocale']=function(_0x577c3b,_0x465245){const _0xa54aa8=_0x45a258,_0x47356b=VisuMZ['MessageCore']['Settings']['Localization']['Languages']||[],_0x2aa06c=ConfigManager[_0xa54aa8(0x54a)];let _0x41641d=_0x47356b[_0xa54aa8(0x412)](_0x2aa06c);_0x41641d+=_0x577c3b?0x1:-0x1;if(_0x41641d>=_0x47356b[_0xa54aa8(0x495)])_0x41641d=_0x465245?0x0:_0x47356b['length']-0x1;if(_0x41641d<0x0)_0x41641d=_0x465245?_0x47356b[_0xa54aa8(0x495)]-0x1:0x0;this[_0xa54aa8(0x536)](_0xa54aa8(0x54a),_0x47356b[_0x41641d]);},Window_Options[_0x45a258(0x2fd)][_0x45a258(0x316)]=function(_0x19ed92,_0x48142b,_0x2d8e7d){const _0x2c082e=_0x45a258,_0x1b1359=this[_0x2c082e(0x18e)](_0x19ed92),_0x5231c4=0x1,_0x196522=_0x1b1359+(_0x48142b?_0x5231c4:-_0x5231c4);_0x196522>0xb&&_0x2d8e7d?this[_0x2c082e(0x536)](_0x19ed92,0x1):this['changeValue'](_0x19ed92,_0x196522[_0x2c082e(0x245)](0x1,0xb));},Window_Message['prototype']['contentsHeight']=function(){const _0x40cca4=_0x45a258;let _0xe26944=Window_Base[_0x40cca4(0x2fd)]['contentsHeight'][_0x40cca4(0x388)](this);return _0xe26944-=this['addedHeight'](),_0xe26944;},Window_Message[_0x45a258(0x2fd)]['refreshDimmerBitmap']=function(){const _0x4d71a8=_0x45a258;Window_Base[_0x4d71a8(0x2fd)][_0x4d71a8(0x240)]['call'](this),VisuMZ[_0x4d71a8(0x428)]['Settings'][_0x4d71a8(0x197)]['StretchDimmedBg']&&this['stretchDimmerSprite']();},Window_Message['prototype'][_0x45a258(0x3ac)]=function(){const _0x4e0704=_0x45a258;this[_0x4e0704(0x2a8)]['x']=Math[_0x4e0704(0x1bf)](this[_0x4e0704(0x4ce)]/0x2),this[_0x4e0704(0x2a8)][_0x4e0704(0x493)]['x']=0.5,this[_0x4e0704(0x2a8)]['scale']['x']=Graphics['width'];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x48b)]=Window_Message[_0x45a258(0x2fd)][_0x45a258(0x48e)],Window_Message[_0x45a258(0x2fd)][_0x45a258(0x48e)]=function(){const _0x10a9cb=_0x45a258;VisuMZ[_0x10a9cb(0x428)][_0x10a9cb(0x48b)]['call'](this),this[_0x10a9cb(0x47c)](),this[_0x10a9cb(0x383)](),this[_0x10a9cb(0x221)](![]),this[_0x10a9cb(0x4db)](_0x10a9cb(0x402)),this[_0x10a9cb(0x2a6)](VisuMZ[_0x10a9cb(0x428)][_0x10a9cb(0x49c)][_0x10a9cb(0x197)][_0x10a9cb(0x4ad)]);},Window_Message[_0x45a258(0x2fd)]['resetWordWrap']=function(){const _0xf9b42d=_0x45a258;this[_0xf9b42d(0x318)]($gameSystem[_0xf9b42d(0x1ce)]());},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x258)]=function(){return!![];},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x2a6)]=function(_0x2517b7){const _0x3f5c11=_0x45a258,_0xa2b1c=0xb-ConfigManager[_0x3f5c11(0x304)];_0x2517b7=Math[_0x3f5c11(0x1bf)](_0x2517b7*_0xa2b1c),this[_0x3f5c11(0x323)]=_0x2517b7,this[_0x3f5c11(0x4ab)]=_0x2517b7;},VisuMZ['MessageCore'][_0x45a258(0x25b)]=Window_Message[_0x45a258(0x2fd)][_0x45a258(0x53d)],Window_Message['prototype'][_0x45a258(0x53d)]=function(){const _0x59b8fc=_0x45a258;return VisuMZ[_0x59b8fc(0x428)][_0x59b8fc(0x25b)][_0x59b8fc(0x388)](this)||Input[_0x59b8fc(0x34e)](VisuMZ[_0x59b8fc(0x428)][_0x59b8fc(0x49c)][_0x59b8fc(0x197)]['FastForwardKey']);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x1b3)]=Window_Message[_0x45a258(0x2fd)][_0x45a258(0x307)],Window_Message[_0x45a258(0x2fd)]['updatePlacement']=function(){const _0x2610b8=_0x45a258;let _0x3ccde9=this['y'];this['x']=Math[_0x2610b8(0x1bf)]((Graphics[_0x2610b8(0x500)]-this[_0x2610b8(0x4ce)])/0x2),VisuMZ[_0x2610b8(0x428)]['Window_Message_updatePlacement'][_0x2610b8(0x388)](this);if(this[_0x2610b8(0x206)])this['y']=_0x3ccde9;this[_0x2610b8(0x2b2)](),this['updateForcedPlacement'](),this[_0x2610b8(0x4bb)](),this[_0x2610b8(0x24c)]();},VisuMZ['MessageCore'][_0x45a258(0x1c3)]=Window_Message['prototype'][_0x45a258(0x4fc)],Window_Message[_0x45a258(0x2fd)]['newPage']=function(_0x13af40){const _0xac46c1=_0x45a258;this[_0xac46c1(0x31a)](_0x13af40),this[_0xac46c1(0x3a7)](_0x13af40),VisuMZ[_0xac46c1(0x428)]['Window_Message_newPage']['call'](this,_0x13af40),this['createContents']();},Window_Message[_0x45a258(0x2fd)]['convertNewPageTextStateMacros']=function(_0x5b75ee){const _0x344ed5=_0x45a258;if(!_0x5b75ee)return;this[_0x344ed5(0x40b)]=![],_0x5b75ee[_0x344ed5(0x425)]=this[_0x344ed5(0x47b)](_0x5b75ee[_0x344ed5(0x425)]),this['_textMacroFound']&&(_0x5b75ee[_0x344ed5(0x425)]=this[_0x344ed5(0x3a1)](_0x5b75ee[_0x344ed5(0x425)]),this[_0x344ed5(0x40b)]=!![]);},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x3a1)]=function(_0x13da20){const _0x3b7bcc=_0x45a258;if(this[_0x3b7bcc(0x40b)])return _0x13da20;return Window_Base[_0x3b7bcc(0x2fd)][_0x3b7bcc(0x3a1)][_0x3b7bcc(0x388)](this,_0x13da20);},Window_Message[_0x45a258(0x2fd)]['onNewPageMessageCore']=function(_0x115a75){const _0x5df092=_0x45a258;this['prepareForcedPositionEscapeCharacters'](_0x115a75),this[_0x5df092(0x1b7)](_0x115a75),this[_0x5df092(0x4a1)]();},VisuMZ['MessageCore'][_0x45a258(0x4d3)]=Window_Message[_0x45a258(0x2fd)][_0x45a258(0x381)],Window_Message[_0x45a258(0x2fd)][_0x45a258(0x381)]=function(){const _0x4ef098=_0x45a258;VisuMZ['MessageCore'][_0x4ef098(0x4d3)]['call'](this),this[_0x4ef098(0x48e)]();if(this[_0x4ef098(0x32e)])this[_0x4ef098(0x20b)]();},Window_Message['prototype'][_0x45a258(0x4a1)]=function(){const _0x529a7d=_0x45a258;this[_0x529a7d(0x4ce)]=$gameSystem[_0x529a7d(0x364)]()+this[_0x529a7d(0x511)]();;this[_0x529a7d(0x4ce)]=Math['min'](Graphics[_0x529a7d(0x4ce)],this[_0x529a7d(0x4ce)]);const _0x32af73=$gameSystem[_0x529a7d(0x1e7)]();this['height']=SceneManager['_scene'][_0x529a7d(0x4df)](_0x32af73,![])+this[_0x529a7d(0x406)](),this[_0x529a7d(0x492)]=Math[_0x529a7d(0x2ed)](Graphics[_0x529a7d(0x492)],this['height']);if($gameTemp[_0x529a7d(0x409)])this['resetPositionX']();},Window_Message['prototype'][_0x45a258(0x511)]=function(){return 0x0;},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x406)]=function(){return 0x0;},Window_Message['prototype'][_0x45a258(0x52d)]=function(){const _0x48f996=_0x45a258;this['x']=(Graphics[_0x48f996(0x500)]-this[_0x48f996(0x4ce)])/0x2,$gameTemp[_0x48f996(0x409)]=undefined,this[_0x48f996(0x4bb)]();},Window_Message[_0x45a258(0x2fd)]['updateMove']=function(){const _0x443021=_0x45a258,_0x23f473={'x':this['x'],'y':this['y']};Window_Base[_0x443021(0x2fd)][_0x443021(0x4be)][_0x443021(0x388)](this),this[_0x443021(0x3f3)](_0x23f473);},Window_Message['prototype'][_0x45a258(0x380)]=function(){return!![];},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x3f3)]=function(_0x580661){const _0x1aaa4d=_0x45a258;this[_0x1aaa4d(0x338)]&&(this[_0x1aaa4d(0x338)]['x']+=this['x']-_0x580661['x'],this[_0x1aaa4d(0x338)]['y']+=this['y']-_0x580661['y']);},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x3d5)]=function(_0x392b9b,_0xf25fcc){const _0x4ac95f=_0x45a258;this[_0x4ac95f(0x1f0)](this['_resetRect']['x'],this[_0x4ac95f(0x2b0)]*(Graphics[_0x4ac95f(0x2bc)]-this[_0x4ac95f(0x492)])/0x2,this['_resetRect']['width'],this[_0x4ac95f(0x217)][_0x4ac95f(0x492)],_0x392b9b,_0xf25fcc);},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x19a)]=function(_0x4c85dd){const _0x1a7302=_0x45a258,_0x3ab024=Window_Base[_0x1a7302(0x2fd)][_0x1a7302(0x19a)][_0x1a7302(0x388)](this,_0x4c85dd);_0x4c85dd[_0x1a7302(0x443)]&&this['launchMessageCommonEvent'](_0x3ab024);},Window_Message['prototype'][_0x45a258(0x3e9)]=function(_0x4d0174){const _0x311191=_0x45a258;if($gameParty['inBattle']()){}else $gameMap[_0x311191(0x527)](_0x4d0174);},Window_Message[_0x45a258(0x2fd)]['processCharacter']=function(_0xf4a19b){const _0x5b6002=_0x45a258;this[_0x5b6002(0x323)]--,this[_0x5b6002(0x323)]<=0x0&&(this[_0x5b6002(0x249)](_0xf4a19b),Window_Base[_0x5b6002(0x2fd)]['processCharacter'][_0x5b6002(0x388)](this,_0xf4a19b));},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x249)]=function(_0x56a653){const _0x174ef8=_0x45a258;this['_textDelayCount']=this['_textDelay'];if(this[_0x174ef8(0x4ab)]<=0x0)this[_0x174ef8(0x4c4)]=!![];},VisuMZ[_0x45a258(0x428)][_0x45a258(0x394)]=Window_Message[_0x45a258(0x2fd)][_0x45a258(0x404)],Window_Message['prototype'][_0x45a258(0x404)]=function(_0x4aa940,_0x41e7bb){const _0x47497f=_0x45a258;!_0x41e7bb['drawing']?Window_Base[_0x47497f(0x2fd)][_0x47497f(0x404)][_0x47497f(0x388)](this,_0x4aa940,_0x41e7bb):VisuMZ[_0x47497f(0x428)]['Window_Message_processEscapeCharacter'][_0x47497f(0x388)](this,_0x4aa940,_0x41e7bb);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x2d2)]=Window_Message[_0x45a258(0x2fd)]['needsNewPage'],Window_Message['prototype'][_0x45a258(0x347)]=function(_0x279c47){const _0x5a1581=_0x45a258;if(this[_0x5a1581(0x33b)])return![];return VisuMZ['MessageCore'][_0x5a1581(0x2d2)][_0x5a1581(0x388)](this,_0x279c47);},Window_Message['prototype'][_0x45a258(0x3b9)]=function(_0x302e7c){const _0x2b0643=_0x45a258;let _0x495f5b=_0x302e7c[_0x2b0643(0x425)];this[_0x2b0643(0x4de)]={};if(this[_0x2b0643(0x19e)]())return _0x495f5b;_0x495f5b=_0x495f5b[_0x2b0643(0x1cb)](/<POSITION:[ ]*(.*?)>/gi,(_0x52139b,_0x5de96d)=>{const _0x19cfdc=_0x2b0643,_0x46d081=_0x5de96d[_0x19cfdc(0x18c)](',')['map'](_0x2571d2=>Number(_0x2571d2)||0x0);if(_0x46d081[0x0]!==undefined)this[_0x19cfdc(0x4de)]['x']=Number(_0x46d081[0x0]);if(_0x46d081[0x1]!==undefined)this[_0x19cfdc(0x4de)]['y']=Number(_0x46d081[0x1]);if(_0x46d081[0x2]!==undefined)this[_0x19cfdc(0x4de)][_0x19cfdc(0x4ce)]=Number(_0x46d081[0x2]);if(_0x46d081[0x3]!==undefined)this[_0x19cfdc(0x4de)][_0x19cfdc(0x492)]=Number(_0x46d081[0x3]);return'';}),_0x495f5b=_0x495f5b[_0x2b0643(0x1cb)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x1b7413,_0x52137e)=>{const _0x127818=_0x2b0643,_0xa37eaf=_0x52137e[_0x127818(0x18c)](',')[_0x127818(0x342)](_0x477b85=>Number(_0x477b85)||0x0);if(_0xa37eaf[0x0]!==undefined)this[_0x127818(0x4de)]['x']=Number(_0xa37eaf[0x0]);if(_0xa37eaf[0x1]!==undefined)this[_0x127818(0x4de)]['y']=Number(_0xa37eaf[0x1]);return'';}),_0x495f5b=_0x495f5b['replace'](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x3d6678,_0x207dbd)=>{const _0x55aa5f=_0x2b0643,_0x291c45=_0x207dbd[_0x55aa5f(0x18c)](',')['map'](_0x3e2238=>Number(_0x3e2238)||0x0);if(_0x291c45[0x0]!==undefined)this[_0x55aa5f(0x4de)][_0x55aa5f(0x4ce)]=Number(_0x291c45[0x2]);if(_0x291c45[0x1]!==undefined)this[_0x55aa5f(0x4de)][_0x55aa5f(0x492)]=Number(_0x291c45[0x3]);return'';}),_0x495f5b=_0x495f5b[_0x2b0643(0x1cb)](/<OFFSET:[ ]*(.*?)>/gi,(_0x83acf3,_0x359538)=>{const _0x1d116b=_0x2b0643,_0x73fb16=_0x359538[_0x1d116b(0x18c)](',')[_0x1d116b(0x342)](_0x49c746=>Number(_0x49c746)||0x0);let _0xeb6c0=_0x73fb16[0x0]||0x0,_0x161845=_0x73fb16[0x1]||0x0;return $gameSystem[_0x1d116b(0x407)](_0xeb6c0,_0x161845),'';}),_0x302e7c[_0x2b0643(0x425)]=_0x495f5b;},Window_Message[_0x45a258(0x2fd)]['updateXyOffsets']=function(){const _0x1d5ef5=_0x45a258,_0x319033=$gameSystem[_0x1d5ef5(0x30a)]();this['x']+=_0x319033['x'],this['y']+=_0x319033['y'];},Window_Message[_0x45a258(0x2fd)]['updateForcedPlacement']=function(){const _0x2d68c4=_0x45a258;this[_0x2d68c4(0x4de)]=this[_0x2d68c4(0x4de)]||{};const _0x268067=['x','y',_0x2d68c4(0x4ce),'height'];for(const _0x2bc8a9 of _0x268067){this[_0x2d68c4(0x4de)][_0x2bc8a9]!==undefined&&(this[_0x2bc8a9]=Number(this[_0x2d68c4(0x4de)][_0x2bc8a9]));}},Window_Message['prototype']['prepareAutoSizeEscapeCharacters']=function(_0x1dc63a){const _0x4bd7e5=_0x45a258;this['_currentAutoSize']=![];let _0x5f1fc9=_0x1dc63a[_0x4bd7e5(0x425)];_0x5f1fc9=_0x5f1fc9['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x5ebcb6=_0x4bd7e5;return this['processAutoSize'](_0x5f1fc9,!![],!![]),this[_0x5ebcb6(0x23b)](_0x5ebcb6(0x4a3)),'';}),_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x6985d3=_0x4bd7e5;return this[_0x6985d3(0x1c0)](_0x5f1fc9,!![],![]),this[_0x6985d3(0x23b)]('none'),'';}),_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x1f8f8d=_0x4bd7e5;return this[_0x1f8f8d(0x1c0)](_0x5f1fc9,![],!![]),this['processAutoPosition'](_0x1f8f8d(0x4a3)),'';});if(SceneManager[_0x4bd7e5(0x2a4)]())_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2bb41a,_0x1de7ea)=>{const _0x1c70d7=_0x4bd7e5;return this['processAutoSize'](_0x5f1fc9,!![],!![]),this[_0x1c70d7(0x23b)]('battle\x20actor',Number(_0x1de7ea)||0x1),'';}),_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x19120f,_0x514689)=>{const _0x483fb1=_0x4bd7e5;return this[_0x483fb1(0x1c0)](_0x5f1fc9,!![],!![]),this[_0x483fb1(0x23b)](_0x483fb1(0x440),Number(_0x514689)||0x0),'';}),_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x1b5bd6,_0x4fac8c)=>{const _0x3b8b90=_0x4bd7e5;return this[_0x3b8b90(0x1c0)](_0x5f1fc9,!![],!![]),this[_0x3b8b90(0x23b)](_0x3b8b90(0x1bb),Number(_0x4fac8c)||0x0),'';});else SceneManager[_0x4bd7e5(0x287)]()&&(_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x51441d,_0x20f66b)=>{const _0x597276=_0x4bd7e5;return this[_0x597276(0x1c0)](_0x5f1fc9,!![],!![]),this[_0x597276(0x23b)](_0x597276(0x1d7),0x0),'';}),_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x15fcaf,_0x328ab2)=>{const _0x332897=_0x4bd7e5;return this[_0x332897(0x1c0)](_0x5f1fc9,!![],!![]),this[_0x332897(0x23b)]('map\x20actor',Number(_0x328ab2)||0x1),'';}),_0x5f1fc9=_0x5f1fc9['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x28fbd5,_0x2ddee3)=>{const _0x1343ae=_0x4bd7e5;return this['processAutoSize'](_0x5f1fc9,!![],!![]),this[_0x1343ae(0x23b)](_0x1343ae(0x1fd),Number(_0x2ddee3)||0x0),'';}),_0x5f1fc9=_0x5f1fc9[_0x4bd7e5(0x1cb)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x20df68,_0x1c52b2)=>{const _0x11a271=_0x4bd7e5;return this['processAutoSize'](_0x5f1fc9,!![],!![]),this[_0x11a271(0x23b)](_0x11a271(0x3de),Number(_0x1c52b2)||0x0),'';}));_0x1dc63a[_0x4bd7e5(0x425)]=_0x5f1fc9;},Window_Message[_0x45a258(0x30d)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x45a258(0x523)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x45a258(0x2fd)][_0x45a258(0x1c0)]=function(_0x24178e,_0x1247bc,_0x2478fe){const _0x1f8582=_0x45a258;_0x24178e=_0x24178e['replace'](Window_Message[_0x1f8582(0x30d)],''),_0x24178e=_0x24178e['replace'](Window_Message[_0x1f8582(0x523)],''),this[_0x1f8582(0x247)]=!![],this['_currentAutoSize']=!![],this[_0x1f8582(0x318)](![]);const _0x59692c=this[_0x1f8582(0x1e2)](_0x24178e);if(_0x1247bc){let _0x473fb9=_0x59692c[_0x1f8582(0x4ce)]+$gameSystem['windowPadding']()*0x2+0x6;const _0x15368d=$gameMessage[_0x1f8582(0x535)]()!=='',_0xfbfccb=ImageManager['faceWidth'],_0x4a81ef=0x14;_0x473fb9+=_0x15368d?_0xfbfccb+_0x4a81ef:0x4;if(_0x473fb9%0x2!==0x0)_0x473fb9+=0x1;$gameSystem[_0x1f8582(0x43a)](_0x473fb9);}if(_0x2478fe){let _0x27eedd=Math[_0x1f8582(0x2df)](_0x59692c[_0x1f8582(0x492)]/this[_0x1f8582(0x3ee)]());$gameSystem[_0x1f8582(0x47a)](_0x27eedd);}this[_0x1f8582(0x4f8)](),this[_0x1f8582(0x38e)](),this[_0x1f8582(0x247)]=![],this[_0x1f8582(0x32e)]=!![];},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x4f8)]=function(){const _0x4f3452=_0x45a258;this[_0x4f3452(0x4a1)](),this[_0x4f3452(0x307)](),this['resetPositionX'](),this[_0x4f3452(0x4e8)](),this['contents'][_0x4f3452(0x1eb)](),this['createContents']();},Window_Message['prototype']['processAutoPosition']=function(_0x3ac124,_0x4f25d1){const _0x2ca09e=_0x45a258;switch(_0x3ac124[_0x2ca09e(0x450)]()[_0x2ca09e(0x531)]()){case'battle\x20actor':this[_0x2ca09e(0x206)]=$gameActors['actor'](_0x4f25d1);break;case _0x2ca09e(0x440):this[_0x2ca09e(0x206)]=$gameParty[_0x2ca09e(0x54b)]()[_0x4f25d1-0x1];break;case _0x2ca09e(0x1bb):this[_0x2ca09e(0x206)]=$gameTroop[_0x2ca09e(0x54b)]()[_0x4f25d1-0x1];break;case _0x2ca09e(0x1d7):this[_0x2ca09e(0x206)]=$gamePlayer;break;case'map\x20actor':const _0x8cf255=$gameActors[_0x2ca09e(0x45c)](_0x4f25d1)[_0x2ca09e(0x4f3)]();_0x8cf255===0x0?this[_0x2ca09e(0x206)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer[_0x2ca09e(0x3b5)]()[_0x2ca09e(0x39f)](_0x8cf255-0x1);break;case _0x2ca09e(0x1fd):_0x4f25d1===0x1?this[_0x2ca09e(0x206)]=$gamePlayer:this[_0x2ca09e(0x206)]=$gamePlayer[_0x2ca09e(0x3b5)]()['follower'](_0x4f25d1-0x2);break;case _0x2ca09e(0x3de):this[_0x2ca09e(0x206)]=$gameMap[_0x2ca09e(0x1f6)](_0x4f25d1);break;}this[_0x2ca09e(0x206)]&&this['updateAutoPosition']();},VisuMZ[_0x45a258(0x428)][_0x45a258(0x505)]=Window_Message[_0x45a258(0x2fd)][_0x45a258(0x36a)],Window_Message['prototype'][_0x45a258(0x36a)]=function(){const _0x20167b=_0x45a258;this[_0x20167b(0x2f0)](),VisuMZ['MessageCore'][_0x20167b(0x505)][_0x20167b(0x388)](this);},Window_Message[_0x45a258(0x2fd)]['updateAutoPosition']=function(){const _0x4c180a=_0x45a258;if(!this['_autoPositionTarget'])return;const _0x56b317=SceneManager[_0x4c180a(0x397)];if(!_0x56b317)return;const _0x4a7d5b=_0x56b317['_spriteset'];if(!_0x4a7d5b)return;const _0x369135=_0x4a7d5b[_0x4c180a(0x458)](this[_0x4c180a(0x206)]);if(!_0x369135)return;let _0x4e7c11=_0x369135['x'];if(SceneManager['isSceneMap']())_0x4e7c11*=$gameScreen[_0x4c180a(0x209)]();else{if(SceneManager[_0x4c180a(0x2a4)]()&&Imported[_0x4c180a(0x401)]){let _0x47c755=_0x369135['x']-Graphics[_0x4c180a(0x500)]*_0x4a7d5b['anchor']['x'];_0x4e7c11+=_0x47c755*(_0x4a7d5b[_0x4c180a(0x2e8)]['x']-0x1);}}_0x4e7c11-=this[_0x4c180a(0x4ce)]/0x2,_0x4e7c11-=(Graphics[_0x4c180a(0x4ce)]-Graphics[_0x4c180a(0x500)])/0x2,_0x4e7c11+=this[_0x4c180a(0x399)]();let _0x5f4113=_0x369135['y'];if(SceneManager[_0x4c180a(0x287)]())_0x5f4113-=_0x369135[_0x4c180a(0x492)]+0x8,_0x5f4113*=$gameScreen[_0x4c180a(0x209)](),_0x5f4113-=this[_0x4c180a(0x492)]*$gameScreen['zoomScale']();else{if(SceneManager['isSceneBattle']()&&Imported['VisuMZ_3_ActSeqCamera']){let _0x2793b0=_0x369135['height']*_0x4a7d5b[_0x4c180a(0x2e8)]['y'];_0x5f4113-=this[_0x4c180a(0x492)]*_0x4a7d5b[_0x4c180a(0x2e8)]['y']+_0x2793b0+0x8;let _0x5d8c15=_0x369135['y']-Graphics[_0x4c180a(0x2bc)]*_0x4a7d5b[_0x4c180a(0x493)]['y'];_0x5f4113+=_0x5d8c15*(_0x4a7d5b[_0x4c180a(0x2e8)]['y']-0x1);}else _0x5f4113-=_0x369135[_0x4c180a(0x492)]+0x8,_0x5f4113-=this[_0x4c180a(0x492)];}_0x5f4113-=(Graphics[_0x4c180a(0x492)]-Graphics[_0x4c180a(0x2bc)])/0x2,_0x5f4113+=this['autoPositionOffsetY']();const _0x4f506b=$gameSystem[_0x4c180a(0x30a)]();_0x4e7c11+=_0x4f506b['x'],_0x5f4113+=_0x4f506b['y'],this['x']=Math[_0x4c180a(0x1bf)](_0x4e7c11),this['y']=Math[_0x4c180a(0x1bf)](_0x5f4113),this[_0x4c180a(0x4bb)](!![],![]),this[_0x4c180a(0x4de)]=this[_0x4c180a(0x4de)]||{},this['_forcedPosition']['x']=this['x'],this[_0x4c180a(0x4de)]['y']=this['y'],this[_0x4c180a(0x4de)]['width']=this[_0x4c180a(0x4ce)],this[_0x4c180a(0x4de)][_0x4c180a(0x492)]=this[_0x4c180a(0x492)],this[_0x4c180a(0x338)][_0x4c180a(0x307)]();},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x399)]=function(){return 0x0;},Window_Message[_0x45a258(0x2fd)]['autoPositionOffsetY']=function(){return 0x0;},Window_Message[_0x45a258(0x2fd)]['messagePositionReset']=function(){const _0x2cceb6=_0x45a258;this[_0x2cceb6(0x32e)]=![],this[_0x2cceb6(0x206)]=undefined,$gameSystem[_0x2cceb6(0x223)](),this['updateAutoSizePosition'](),this['openness']=0x0;},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x532)]=function(_0x15a7dd){const _0x1af4ca=_0x45a258;return Window_Base[_0x1af4ca(0x2fd)][_0x1af4ca(0x532)][_0x1af4ca(0x388)](this,_0x15a7dd);},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x469)]=function(_0x3e559e){const _0x38e2ad=_0x45a258;return Window_Base['prototype']['postConvertEscapeCharacters'][_0x38e2ad(0x388)](this,_0x3e559e);},Window_Message['prototype'][_0x45a258(0x1f9)]=function(_0x5740f2){const _0x330995=_0x45a258;this[_0x330995(0x2db)](_0x5740f2),Window_Base[_0x330995(0x2fd)][_0x330995(0x1f9)]['call'](this,_0x5740f2),this['postFlushTextState'](_0x5740f2);},Window_Message[_0x45a258(0x2fd)][_0x45a258(0x2db)]=function(_0x407031){},Window_Message['prototype']['postFlushTextState']=function(_0x805332){},Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x258)]=function(){return![];},Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x222)]=function(){const _0x18cc2b=_0x45a258;Window_Base['prototype'][_0x18cc2b(0x222)][_0x18cc2b(0x388)](this),this[_0x18cc2b(0x459)](this[_0x18cc2b(0x1b9)]());},Window_NameBox[_0x45a258(0x2fd)]['defaultColor']=function(){const _0x3177a7=_0x45a258,_0x338584=VisuMZ[_0x3177a7(0x428)]['Settings'][_0x3177a7(0x197)][_0x3177a7(0x25e)];return ColorManager[_0x3177a7(0x41a)](_0x338584);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x21a)]=Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x307)],Window_NameBox['prototype'][_0x45a258(0x307)]=function(){const _0x1ed5ef=_0x45a258;VisuMZ['MessageCore'][_0x1ed5ef(0x21a)][_0x1ed5ef(0x388)](this),this[_0x1ed5ef(0x3ca)](),this[_0x1ed5ef(0x309)](),this['clampPlacementPosition'](),this['updateOverlappingY']();},Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x532)]=function(_0x5b4629){const _0x27d1e9=_0x45a258;return _0x5b4629=_0x5b4629[_0x27d1e9(0x1cb)](/<LEFT>/gi,this[_0x27d1e9(0x3ab)]['bind'](this,0x0)),_0x5b4629=_0x5b4629['replace'](/<CENTER>/gi,this[_0x27d1e9(0x3ab)]['bind'](this,0x5)),_0x5b4629=_0x5b4629[_0x27d1e9(0x1cb)](/<RIGHT>/gi,this[_0x27d1e9(0x3ab)][_0x27d1e9(0x2c6)](this,0xa)),_0x5b4629=_0x5b4629['replace'](/<POSITION:[ ](\d+)>/gi,(_0x3e6a23,_0x2366bb)=>this[_0x27d1e9(0x3ab)](parseInt(_0x2366bb))),_0x5b4629=_0x5b4629[_0x27d1e9(0x1cb)](/<\/LEFT>/gi,''),_0x5b4629=_0x5b4629[_0x27d1e9(0x1cb)](/<\/CENTER>/gi,''),_0x5b4629=_0x5b4629[_0x27d1e9(0x1cb)](/<\/RIGHT>/gi,''),_0x5b4629=_0x5b4629[_0x27d1e9(0x531)](),Window_Base[_0x27d1e9(0x2fd)][_0x27d1e9(0x532)]['call'](this,_0x5b4629);},Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x3ab)]=function(_0xc253dd){const _0x133e5a=_0x45a258;return this[_0x133e5a(0x27a)]=_0xc253dd,'';},Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x3ca)]=function(){const _0x10adec=_0x45a258;if($gameMessage[_0x10adec(0x53a)]())return;this[_0x10adec(0x27a)]=this['_relativePosition']||0x0;const _0x23a583=this[_0x10adec(0x29a)],_0x42346e=Math['floor'](_0x23a583['width']*this[_0x10adec(0x27a)]/0xa);this['x']=_0x23a583['x']+_0x42346e-Math[_0x10adec(0x46a)](this[_0x10adec(0x4ce)]/0x2),this['x']=this['x']['clamp'](_0x23a583['x'],_0x23a583['x']+_0x23a583[_0x10adec(0x4ce)]-this[_0x10adec(0x4ce)]);},Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x309)]=function(){const _0x583eaa=_0x45a258;if($gameMessage[_0x583eaa(0x53a)]())return;this[_0x583eaa(0x27a)]=this[_0x583eaa(0x27a)]||0x0;const _0x31ec43=VisuMZ[_0x583eaa(0x428)][_0x583eaa(0x49c)][_0x583eaa(0x197)][_0x583eaa(0x273)],_0x52f235=VisuMZ[_0x583eaa(0x428)][_0x583eaa(0x49c)][_0x583eaa(0x197)][_0x583eaa(0x208)],_0x32ee88=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x583eaa(0x46a)](_0x31ec43*_0x32ee88),this['y']+=_0x52f235;},Window_NameBox[_0x45a258(0x2fd)]['updateOverlappingY']=function(){const _0x33defc=_0x45a258,_0x10b57b=this[_0x33defc(0x29a)],_0x2a3cec=_0x10b57b['y'],_0x3449cd=VisuMZ['MessageCore'][_0x33defc(0x49c)][_0x33defc(0x197)][_0x33defc(0x208)];_0x2a3cec>this['y']&&_0x2a3cec<this['y']+this['height']-_0x3449cd&&(this['y']=_0x10b57b['y']+_0x10b57b[_0x33defc(0x492)]);},VisuMZ[_0x45a258(0x428)][_0x45a258(0x4dd)]=Window_NameBox[_0x45a258(0x2fd)][_0x45a258(0x40f)],Window_NameBox[_0x45a258(0x2fd)]['refresh']=function(){const _0xf997d9=_0x45a258;this[_0xf997d9(0x27a)]=0x0,VisuMZ['MessageCore']['Window_NameBox_refresh'][_0xf997d9(0x388)](this);},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x19e)]=function(){return![];},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x258)]=function(){return!![];},Window_ChoiceList[_0x45a258(0x2fd)]['itemHeight']=function(){const _0x189a37=_0x45a258;return $gameSystem[_0x189a37(0x4b5)]()+0x8;},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x2dc)]=function(){const _0x57c77f=_0x45a258;return $gameSystem[_0x57c77f(0x2e3)]();},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x4e6)]=function(){const _0x408441=_0x45a258;this[_0x408441(0x40f)](),this[_0x408441(0x21b)](),this[_0x408441(0x190)](),this[_0x408441(0x1dd)](),this[_0x408441(0x537)]();},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x52c)]=function(){const _0x448a22=_0x45a258;$gameMessage[_0x448a22(0x298)](this[_0x448a22(0x4b8)]()),this[_0x448a22(0x29a)][_0x448a22(0x381)](),this['close'](),this[_0x448a22(0x48d)]&&(this['_helpWindow'][_0x448a22(0x1eb)](),this[_0x448a22(0x48d)]['hide']());},VisuMZ[_0x45a258(0x428)][_0x45a258(0x38f)]=Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x2ad)],Window_ChoiceList[_0x45a258(0x2fd)]['callCancelHandler']=function(){const _0x5984b5=_0x45a258;VisuMZ[_0x5984b5(0x428)]['Window_ChoiceList_callCancelHandler'][_0x5984b5(0x388)](this),this[_0x5984b5(0x48d)]&&(this[_0x5984b5(0x48d)][_0x5984b5(0x1eb)](),this[_0x5984b5(0x48d)][_0x5984b5(0x4ae)]());},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x40f)]=function(){const _0xf56830=_0x45a258;this[_0xf56830(0x1d1)](),this[_0xf56830(0x239)](),this[_0xf56830(0x29a)]&&(this[_0xf56830(0x307)](),this['placeCancelButton']()),this['createContents'](),this[_0xf56830(0x238)](),this[_0xf56830(0x240)](),Window_Selectable['prototype'][_0xf56830(0x40f)][_0xf56830(0x388)](this);},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x239)]=function(){const _0x40c8e0=_0x45a258;$gameMessage[_0x40c8e0(0x4ac)]?this[_0x40c8e0(0x3b4)]():this[_0x40c8e0(0x2ce)](),this[_0x40c8e0(0x415)](),this[_0x40c8e0(0x49e)]();},Window_ChoiceList['prototype'][_0x45a258(0x3b4)]=function(){const _0x56f746=_0x45a258,_0x2070cb=$gameMessage[_0x56f746(0x4cb)]();let _0x56e80c=0x0;for(let _0x561adf of _0x2070cb){_0x561adf=this[_0x56f746(0x2f2)](_0x561adf);if(this[_0x56f746(0x2b4)](_0x561adf)){const _0x356c0b=this['parseChoiceText'](_0x561adf),_0x15043f=this[_0x56f746(0x2b3)](_0x561adf);this[_0x56f746(0x189)](_0x356c0b,_0x56f746(0x211),_0x15043f,_0x56e80c);}_0x56e80c++;}},Window_ChoiceList['prototype'][_0x45a258(0x2ce)]=function(){const _0x19fc96=_0x45a258,_0x3536b4=$gameMessage[_0x19fc96(0x4cb)](),_0x4cd03a=$gameMessage[_0x19fc96(0x47f)](),_0x34edd0=$gameMessage[_0x19fc96(0x3a3)](),_0x4c94cd=_0x3536b4[_0x19fc96(0x495)];let _0x284556=0x0;for(let _0x1b8aa9=0x0;_0x1b8aa9<_0x4c94cd;_0x1b8aa9++){if(this[_0x19fc96(0x2b1)][_0x19fc96(0x495)]>=_0x34edd0)break;const _0x358211=_0x4cd03a[_0x1b8aa9];let _0x1f25be=_0x3536b4[_0x358211];if(_0x1f25be===undefined)continue;_0x1f25be=this['convertChoiceMacros'](_0x1f25be);if(this[_0x19fc96(0x2b4)](_0x1f25be)){const _0x3c3a65=this[_0x19fc96(0x3cf)](_0x1f25be),_0x2da170=this[_0x19fc96(0x2b3)](_0x1f25be);this[_0x19fc96(0x189)](_0x3c3a65,_0x19fc96(0x211),_0x2da170,_0x358211);}_0x284556++;}},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x2f2)]=function(_0x387065){const _0x40bfaa=_0x45a258;return Window_Base[_0x40bfaa(0x2fd)]['convertTextMacros']['call'](this,_0x387065);},Window_ChoiceList['prototype']['isChoiceVisible']=function(_0x288cee){const _0x53a834=_0x45a258;if(Imported[_0x53a834(0x248)])$gameMessage[_0x53a834(0x35f)]();if(_0x288cee[_0x53a834(0x463)](/<HIDE>/i))return![];if(_0x288cee['match'](/<SHOW>/i))return!![];if(_0x288cee[_0x53a834(0x463)](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5d5767=RegExp['$1'][_0x53a834(0x18c)](',')[_0x53a834(0x342)](_0x49d2e7=>Number(_0x49d2e7)||0x0);if(_0x5d5767['some'](_0xf11897=>!$gameSwitches[_0x53a834(0x20c)](_0xf11897)))return![];}if(_0x288cee['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x427ae=RegExp['$1'][_0x53a834(0x18c)](',')[_0x53a834(0x342)](_0x4835a3=>Number(_0x4835a3)||0x0);if(_0x427ae['every'](_0x71e94e=>!$gameSwitches[_0x53a834(0x20c)](_0x71e94e)))return![];}if(_0x288cee[_0x53a834(0x463)](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x13d151=RegExp['$1'][_0x53a834(0x18c)](',')[_0x53a834(0x342)](_0x34ffa7=>Number(_0x34ffa7)||0x0);if(_0x13d151[_0x53a834(0x325)](_0x289154=>$gameSwitches['value'](_0x289154)))return![];}if(_0x288cee[_0x53a834(0x463)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x35553b=RegExp['$1']['split'](',')[_0x53a834(0x342)](_0x2cfc6f=>Number(_0x2cfc6f)||0x0);if(_0x35553b[_0x53a834(0x44f)](_0xa7a713=>$gameSwitches[_0x53a834(0x20c)](_0xa7a713)))return![];}return!![];},Window_ChoiceList[_0x45a258(0x2fd)]['parseChoiceText']=function(_0x3ba6cf){const _0x3aa77c=_0x45a258;let _0x5a7c10=_0x3ba6cf;return _0x5a7c10=_0x5a7c10[_0x3aa77c(0x1cb)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5a7c10=_0x5a7c10['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5a7c10;},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x2b3)]=function(_0x5d3166){const _0x71ad38=_0x45a258;if(Imported[_0x71ad38(0x248)])$gameMessage['registerSelfEvent']();if(_0x5d3166[_0x71ad38(0x463)](/<DISABLE>/i))return![];if(_0x5d3166[_0x71ad38(0x463)](/<ENABLE>/i))return!![];if(_0x5d3166[_0x71ad38(0x463)](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2581d6=RegExp['$1'][_0x71ad38(0x18c)](',')['map'](_0x4d6baa=>Number(_0x4d6baa)||0x0);if(_0x2581d6[_0x71ad38(0x44f)](_0x53b1cb=>!$gameSwitches['value'](_0x53b1cb)))return![];}if(_0x5d3166['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x87efd4=RegExp['$1'][_0x71ad38(0x18c)](',')['map'](_0x4b3ceb=>Number(_0x4b3ceb)||0x0);if(_0x87efd4[_0x71ad38(0x325)](_0x542356=>!$gameSwitches['value'](_0x542356)))return![];}if(_0x5d3166[_0x71ad38(0x463)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x37dbe6=RegExp['$1'][_0x71ad38(0x18c)](',')[_0x71ad38(0x342)](_0x1d2a00=>Number(_0x1d2a00)||0x0);if(_0x37dbe6['every'](_0x3656d5=>$gameSwitches['value'](_0x3656d5)))return![];}if(_0x5d3166[_0x71ad38(0x463)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x201bb3=RegExp['$1'][_0x71ad38(0x18c)](',')['map'](_0x11253d=>Number(_0x11253d)||0x0);if(_0x201bb3['some'](_0x2d399e=>$gameSwitches[_0x71ad38(0x20c)](_0x2d399e)))return![];}return!![];},Window_ChoiceList['prototype'][_0x45a258(0x415)]=function(){const _0x4a7622=_0x45a258;this[_0x4a7622(0x18d)]={},this[_0x4a7622(0x48d)]&&(this[_0x4a7622(0x48d)][_0x4a7622(0x1eb)](),this[_0x4a7622(0x48d)][_0x4a7622(0x4ae)]());},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x49e)]=function(){const _0x17b3b4=_0x45a258,_0x118a43=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x590b46 of this[_0x17b3b4(0x2b1)]){if(!_0x590b46)continue;const _0x4eaf0d=this[_0x17b3b4(0x2b1)][_0x17b3b4(0x412)](_0x590b46);if(_0x590b46[_0x17b3b4(0x520)][_0x17b3b4(0x463)](_0x118a43)){const _0x51098c=String(RegExp['$1']);this[_0x17b3b4(0x18d)][_0x4eaf0d]=_0x51098c[_0x17b3b4(0x531)](),_0x590b46[_0x17b3b4(0x520)]=_0x590b46['name']['replace'](_0x118a43,'')['trim']();}else this[_0x17b3b4(0x18d)][_0x4eaf0d]='';}},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x537)]=function(){const _0x43b0f1=_0x45a258;if(this[_0x43b0f1(0x2b1)][_0x43b0f1(0x44f)](_0x3319f8=>_0x3319f8[_0x43b0f1(0x2aa)]))return;this[_0x43b0f1(0x41d)](),this[_0x43b0f1(0x272)](),$gameMessage[_0x43b0f1(0x198)]=[],this[_0x43b0f1(0x29a)][_0x43b0f1(0x43f)]()&&this[_0x43b0f1(0x29a)][_0x43b0f1(0x28f)]();},VisuMZ[_0x45a258(0x428)][_0x45a258(0x354)]=Window_ChoiceList[_0x45a258(0x2fd)]['updatePlacement'],Window_ChoiceList[_0x45a258(0x2fd)]['updatePlacement']=function(){const _0x522849=_0x45a258;VisuMZ[_0x522849(0x428)]['Window_ChoiceList_updatePlacement'][_0x522849(0x388)](this),this[_0x522849(0x308)](),this['clampPlacementPosition']();},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x1a0)]=function(){const _0x5f134a=_0x45a258;if(!this[_0x5f134a(0x1be)])return;const _0x3a9e28=0x8,_0x1d7e8f=this[_0x5f134a(0x1be)],_0x5d8183=this['x']+this['width'],_0x98f3c9=Math[_0x5f134a(0x46a)]((Graphics[_0x5f134a(0x4ce)]-Graphics['boxWidth'])/0x2);_0x5d8183>=Graphics[_0x5f134a(0x500)]+_0x98f3c9-_0x1d7e8f[_0x5f134a(0x4ce)]+_0x3a9e28?_0x1d7e8f['x']=-_0x1d7e8f[_0x5f134a(0x4ce)]-_0x3a9e28:_0x1d7e8f['x']=this[_0x5f134a(0x4ce)]+_0x3a9e28,_0x1d7e8f['y']=this[_0x5f134a(0x492)]/0x2-_0x1d7e8f[_0x5f134a(0x492)]/0x2;},VisuMZ[_0x45a258(0x428)][_0x45a258(0x36e)]=Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x2dd)],Window_ChoiceList['prototype']['windowX']=function(){const _0x2285ab=_0x45a258;return this[_0x2285ab(0x29a)]?this[_0x2285ab(0x446)]():VisuMZ['MessageCore'][_0x2285ab(0x36e)]['call'](this);},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x446)]=function(){const _0x1db78d=_0x45a258,_0x5ec586=$gameMessage[_0x1db78d(0x3be)]();if(_0x5ec586===0x1)return(Graphics[_0x1db78d(0x500)]-this[_0x1db78d(0x40d)]())/0x2;else return _0x5ec586===0x2?this[_0x1db78d(0x29a)]['x']+this[_0x1db78d(0x29a)][_0x1db78d(0x4ce)]-this[_0x1db78d(0x40d)]():this[_0x1db78d(0x29a)]['x'];},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x40d)]=function(){const _0xc229a4=_0x45a258,_0x1f8683=(this[_0xc229a4(0x464)]()+this[_0xc229a4(0x3e1)]())*this[_0xc229a4(0x2dc)]()+this[_0xc229a4(0x436)]*0x2;return Math[_0xc229a4(0x2ed)](_0x1f8683,Graphics[_0xc229a4(0x4ce)]);},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x54e)]=function(){const _0x12c105=_0x45a258,_0xc8aae8=$gameMessage[_0x12c105(0x4cb)]()['map'](_0x5254b1=>this[_0x12c105(0x2f2)](_0x5254b1))['filter'](_0x12b32f=>this[_0x12c105(0x2b4)](_0x12b32f));let _0x1e1418=Math[_0x12c105(0x2df)](_0xc8aae8['length']/this[_0x12c105(0x2dc)]());if(!$gameMessage[_0x12c105(0x4ac)]){const _0x2eb133=$gameMessage['maxShuffleChoices']();_0x1e1418=Math[_0x12c105(0x2df)](Math[_0x12c105(0x2ed)](_0x2eb133,_0xc8aae8[_0x12c105(0x495)])/this['maxCols']());}return Math[_0x12c105(0x375)](0x1,Math[_0x12c105(0x2ed)](_0x1e1418,this[_0x12c105(0x4cf)]()));},Window_ChoiceList[_0x45a258(0x2fd)]['maxLines']=function(){const _0x6ceb61=_0x45a258,_0x5349c3=this[_0x6ceb61(0x29a)],_0x5d0b38=_0x5349c3?_0x5349c3['y']:0x0,_0x61f496=_0x5349c3?_0x5349c3[_0x6ceb61(0x492)]:0x0,_0x2a6954=Graphics[_0x6ceb61(0x2bc)]/0x2;return _0x5d0b38<_0x2a6954&&_0x5d0b38+_0x61f496>_0x2a6954?0x4:$gameSystem[_0x6ceb61(0x1af)]();},Window_ChoiceList[_0x45a258(0x2fd)]['maxChoiceWidth']=function(){const _0x2e205f=_0x45a258;let _0x31c739=this[_0x2e205f(0x368)]();for(const _0x1d8975 of this[_0x2e205f(0x2b1)]){const _0x5a26b9=_0x1d8975[_0x2e205f(0x520)],_0x4796c9=this[_0x2e205f(0x1db)](_0x5a26b9),_0x510c7d=this[_0x2e205f(0x3c2)](_0x5a26b9)['width']+_0x4796c9,_0x12b7bd=Math['ceil'](_0x510c7d)+this[_0x2e205f(0x2a1)]()*0x2;_0x31c739=Math[_0x2e205f(0x375)](_0x31c739,_0x12b7bd);}return _0x31c739;},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x368)]=function(){const _0x1fea76=_0x45a258;let _0x21cdcd=$gameSystem[_0x1fea76(0x517)]();const _0x4b4004=$gameMessage['choices']();for(const _0xace941 of _0x4b4004){_0xace941[_0x1fea76(0x463)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x21cdcd=Math['max'](_0x21cdcd,Number(RegExp['$1'])));}return Math[_0x1fea76(0x375)](_0x21cdcd,0x1);},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x308)]=function(){const _0x5577f1=_0x45a258,_0x5769bb=$gameSystem['getChoiceMessageDistance']()||0x0,_0x4f61dd=this[_0x5577f1(0x29a)]['y'],_0x32a943=this[_0x5577f1(0x29a)][_0x5577f1(0x492)],_0x514679=this[_0x5577f1(0x29a)][_0x5577f1(0x338)],_0x35c36d=_0x514679[_0x5577f1(0x3d2)]>0x0&&_0x514679[_0x5577f1(0x4ce)]>0x0,_0x3114ff=_0x35c36d?_0x514679[_0x5577f1(0x492)]:0x0;if(_0x5769bb<0x0&&(this[_0x5577f1(0x29a)][_0x5577f1(0x29d)]()||this['_messageWindow']['isClosing']()))this['y']=Math[_0x5577f1(0x1bf)]((Graphics['boxHeight']-this[_0x5577f1(0x492)])/0x2);else{if(_0x4f61dd>=Graphics[_0x5577f1(0x2bc)]/0x2)_0x5769bb>=0x0?this['y']-=_0x5769bb:this['y']=Math[_0x5577f1(0x46a)]((_0x4f61dd-this['height']-_0x3114ff)/0x2);else{if(_0x5769bb>=0x0)this['y']+=_0x5769bb;else{const _0x206dda=Graphics[_0x5577f1(0x2bc)]-(_0x4f61dd+_0x32a943+_0x3114ff);this['y']+=Math[_0x5577f1(0x46a)]((_0x206dda-this['height'])/0x2)+_0x3114ff;}}}},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x31b)]=function(_0x13fe52){const _0x19148b=_0x45a258,_0x44a7b7=this[_0x19148b(0x275)](_0x13fe52);if(_0x44a7b7){const _0x2440ae=ImageManager[_0x19148b(0x1e3)](_0x44a7b7),_0x59ce21=this[_0x19148b(0x35a)](),_0x193acf=_0x59ce21+this['commandName'](_0x13fe52),_0x429b66=this[_0x19148b(0x4f1)](_0x13fe52);_0x2440ae[_0x19148b(0x339)](this['drawChoiceLocationImage']['bind'](this,_0x13fe52,!![],_0x193acf,_0x429b66,_0x2440ae));return;}this[_0x19148b(0x1ec)](_0x13fe52);},Window_ChoiceList[_0x45a258(0x2fd)]['drawItemContents']=function(_0x575d2d){const _0xf15f1f=_0x45a258,_0x15f2be=this[_0xf15f1f(0x4f1)](_0x575d2d),_0x39e1f1=this[_0xf15f1f(0x35a)](),_0x39df7a=_0x39e1f1+this[_0xf15f1f(0x2cf)](_0x575d2d);this[_0xf15f1f(0x19b)](this['isCommandEnabled'](_0x575d2d));const _0x104be6=this[_0xf15f1f(0x3c2)](_0x39df7a)[_0xf15f1f(0x492)],_0x40ae39=_0x15f2be['x']+this['getChoiceIndent'](_0x39df7a),_0x171e3b=Math['max'](_0x15f2be['y'],_0x15f2be['y']+Math[_0xf15f1f(0x1bf)]((_0x15f2be[_0xf15f1f(0x492)]-_0x104be6)/0x2));this[_0xf15f1f(0x244)](_0x39df7a,_0x40ae39,_0x171e3b,_0x15f2be['width']),this[_0xf15f1f(0x23f)](_0x575d2d),this[_0xf15f1f(0x27f)](_0x575d2d,_0x39df7a,_0x15f2be);},Window_ChoiceList['prototype'][_0x45a258(0x35a)]=function(){const _0x4d8c46=_0x45a258;return $gameSystem['getChoiceListTextAlign']()!=='default'?_0x4d8c46(0x23a)['format']($gameSystem[_0x4d8c46(0x494)]()):'';},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x1db)]=function(_0x172216){const _0x47103a=_0x45a258;let _0x40a988=0x0;return _0x172216[_0x47103a(0x463)](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x40a988=Number(RegExp['$1'])),_0x40a988;},Window_ChoiceList[_0x45a258(0x2fd)]['changeChoiceBackgroundColor']=function(_0x2194f8){const _0x477a2a=_0x45a258;if(!Imported[_0x477a2a(0x19f)])return;const _0x23b8e8=this['commandName'](_0x2194f8);let _0x25bae5=![],_0x304e63=![],_0x5b1359=ColorManager[_0x477a2a(0x489)](),_0xd29145=ColorManager[_0x477a2a(0x2a3)]();if(_0x23b8e8['match'](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x5b1359=ColorManager['getColor'](RegExp['$1'])[_0x477a2a(0x531)](),_0xd29145=ColorManager['getColor'](RegExp['$2'])[_0x477a2a(0x531)](),_0x25bae5=!![];else{if(_0x23b8e8[_0x477a2a(0x463)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x43749d=String(RegExp['$1'])[_0x477a2a(0x450)]()[_0x477a2a(0x531)]();switch(_0x43749d){case _0x477a2a(0x1ef):_0x5b1359=_0xd29145=_0x477a2a(0x39c),_0x304e63=!![];break;case'orange':_0x5b1359=_0xd29145=_0x477a2a(0x43d),_0x304e63=!![];break;case _0x477a2a(0x50f):_0x5b1359=_0xd29145=_0x477a2a(0x1d0),_0x304e63=!![];break;case _0x477a2a(0x542):_0x5b1359=_0xd29145='#7cc576',_0x304e63=!![];break;case _0x477a2a(0x330):_0x5b1359=_0xd29145='#6dcff6',_0x304e63=!![];break;case _0x477a2a(0x3f5):case _0x477a2a(0x1b5):_0x5b1359=_0xd29145=_0x477a2a(0x3ea),_0x304e63=!![];break;case _0x477a2a(0x3d9):_0x5b1359=_0xd29145='#c69c6d',_0x304e63=!![];break;case _0x477a2a(0x243):_0x5b1359=_0xd29145=_0x477a2a(0x256),_0x304e63=!![];break;case _0x477a2a(0x484):_0x5b1359=_0xd29145=_0x477a2a(0x460),_0x304e63=!![];break;case'gray':case _0x477a2a(0x301):_0x5b1359=_0xd29145=_0x477a2a(0x3c6),_0x304e63=!![];break;case _0x477a2a(0x218):_0x5b1359=_0xd29145='#707070',_0x304e63=!![];break;case'yes':_0x5b1359=_0xd29145=ColorManager[_0x477a2a(0x4a8)](),_0x304e63=!![];break;case'no':_0x5b1359=_0xd29145=ColorManager['powerDownColor'](),_0x304e63=!![];break;case _0x477a2a(0x19c):_0x5b1359=_0xd29145=ColorManager[_0x477a2a(0x530)](),_0x304e63=!![];break;case _0x477a2a(0x35d):_0x5b1359=_0xd29145=ColorManager['crisisColor'](),_0x304e63=!![];break;default:_0x5b1359=_0xd29145=ColorManager['getColor'](_0x43749d),_0x304e63=!![];break;}_0x25bae5=!![];}}if(!_0x25bae5)return;const _0x1f60aa=this['itemRect'](_0x2194f8);this[_0x477a2a(0x3ce)][_0x477a2a(0x502)](_0x1f60aa['x'],_0x1f60aa['y'],_0x1f60aa['width'],_0x1f60aa[_0x477a2a(0x492)]),this[_0x477a2a(0x453)](_0x1f60aa,_0x5b1359,_0xd29145,_0x304e63);},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x453)]=function(_0x1050e0,_0x931a51,_0x3f6a04,_0x49a6b7){const _0x5629b2=_0x45a258,_0x3eaceb=ColorManager[_0x5629b2(0x489)](),_0xbb5bf=ColorManager['dimColor2'](),_0x3503a0=_0x931a51??ColorManager['itemBackColor1'](),_0x3da3ff=_0x3f6a04??_0x931a51,_0xa22cf1=_0x1050e0['x'],_0x5df2ca=_0x1050e0['y'],_0x590111=_0x1050e0[_0x5629b2(0x4ce)],_0x4cf2e4=_0x1050e0[_0x5629b2(0x492)];this['contentsBack'][_0x5629b2(0x196)](_0xa22cf1,_0x5df2ca,_0x590111,_0x4cf2e4,_0x3503a0,_0x3da3ff,!![]),_0x49a6b7&&this[_0x5629b2(0x3ce)][_0x5629b2(0x196)](_0xa22cf1,_0x5df2ca,_0x590111,_0x4cf2e4,_0x3eaceb,_0x3da3ff,!![]),this[_0x5629b2(0x3ce)][_0x5629b2(0x294)](_0xa22cf1,_0x5df2ca,_0x590111,_0x4cf2e4,_0x3eaceb);},Window_ChoiceList['prototype'][_0x45a258(0x275)]=function(_0x3ebc9a){const _0x2ee672=_0x45a258,_0x558f64=this[_0x2ee672(0x35a)](),_0x5affb6=_0x558f64+this[_0x2ee672(0x2cf)](_0x3ebc9a);let _0x4f4700='';if(_0x5affb6[_0x2ee672(0x463)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x4f4700=String(RegExp['$1'])[_0x2ee672(0x531)]();else _0x5affb6[_0x2ee672(0x463)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x4f4700=String(RegExp['$2'])[_0x2ee672(0x531)]());return _0x4f4700;},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x27f)]=function(_0x494b6e,_0x181526,_0x5a50c0){const _0x585bba=_0x45a258;let _0x4cc3b0='';if(_0x181526[_0x585bba(0x463)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x4cc3b0=String(RegExp['$1'])[_0x585bba(0x531)]();else _0x181526['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x4cc3b0=String(RegExp['$2'])[_0x585bba(0x531)]());if(_0x4cc3b0){const _0x2bcb7f=ImageManager['loadPicture'](_0x4cc3b0);_0x2bcb7f[_0x585bba(0x339)](this['drawChoiceLocationImage'][_0x585bba(0x2c6)](this,_0x494b6e,![],_0x181526,_0x5a50c0,_0x2bcb7f));}},Window_ChoiceList[_0x45a258(0x2fd)][_0x45a258(0x312)]=function(_0x58dc0,_0xc94d4f,_0x3bf4d1,_0x37a023,_0x490551){const _0x16148d=_0x45a258,_0x57b3f4=this[_0x16148d(0x35a)](),_0x37e253=_0x57b3f4+this[_0x16148d(0x2cf)](_0x58dc0);if(_0x3bf4d1!==_0x37e253)return;const _0x5be87a=this[_0x16148d(0x4f1)](_0x58dc0);if(['x','y',_0x16148d(0x4ce),_0x16148d(0x492)]['some'](_0x20b855=>_0x5be87a[_0x20b855]!==_0x37a023[_0x20b855]))return;let _0x40212a=0x0,_0x28955f='';if(_0xc94d4f&&_0x37e253[_0x16148d(0x463)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0xc94d4f&&_0x37e253['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0x28955f=String(RegExp['$1'])[_0x16148d(0x450)]()[_0x16148d(0x531)]();else!_0xc94d4f&&_0x37e253[_0x16148d(0x463)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x28955f=String(RegExp['$1'])[_0x16148d(0x450)]()['trim']());}switch(_0x28955f){case _0x16148d(0x53c):case _0x16148d(0x45d):case _0x16148d(0x4f0):case _0x16148d(0x38c):case _0x16148d(0x1a9):case _0x16148d(0x526):case'1':_0x40212a=0x1;break;case _0x16148d(0x424):case _0x16148d(0x267):case _0x16148d(0x3df):case _0x16148d(0x340):case _0x16148d(0x4cd):case'down\x20center':case _0x16148d(0x21d):case'2':_0x40212a=0x2;break;case _0x16148d(0x1e1):case _0x16148d(0x3ad):case _0x16148d(0x334):case _0x16148d(0x521):case'down-right':case'down\x20right':case'3':_0x40212a=0x3;break;case'midleft':case _0x16148d(0x1c4):case _0x16148d(0x30b):case'4':_0x40212a=0x4;break;case'midcenter':case _0x16148d(0x2ea):case _0x16148d(0x2af):case _0x16148d(0x4b2):case'5':_0x40212a=0x5;break;case _0x16148d(0x2ef):case _0x16148d(0x50d):case'right':case'6':_0x40212a=0x6;break;case _0x16148d(0x2ae):case'upper-left':case'upper\x20left':case'upleft':case _0x16148d(0x1f1):case _0x16148d(0x372):case'7':_0x40212a=0x7;break;case'uppercenter':case _0x16148d(0x1f7):case _0x16148d(0x216):case _0x16148d(0x371):case _0x16148d(0x52b):case _0x16148d(0x255):case'up':case'8':_0x40212a=0x8;break;case'upperright':case _0x16148d(0x53e):case _0x16148d(0x4f2):case _0x16148d(0x4a0):case _0x16148d(0x1c2):case _0x16148d(0x442):case'9':_0x40212a=0x9;break;}const _0x34c400=_0xc94d4f?this['contents']:this[_0x16148d(0x3ce)],_0xd4ad8b=this[_0x16148d(0x51b)](_0x58dc0);!_0xc94d4f&&_0x34c400['clearRect'](_0xd4ad8b['x']-0x1,_0xd4ad8b['y']-0x1,_0xd4ad8b[_0x16148d(0x4ce)]+0x2,_0xd4ad8b[_0x16148d(0x492)]+0x2);const _0x3c3466=_0xd4ad8b['x']+0x2,_0x42a79f=_0xd4ad8b['y']+0x2,_0x591c49=_0xd4ad8b[_0x16148d(0x4ce)]-0x4,_0x35dcbc=_0xd4ad8b[_0x16148d(0x492)]-0x4,_0x4b190d=_0x490551[_0x16148d(0x4ce)],_0x51e1b1=_0x490551['height'];let _0x44779d=_0x3c3466,_0x17a688=_0x42a79f,_0x26469d=_0x591c49,_0x492052=_0x35dcbc;const _0x132fb5=_0x591c49/_0x4b190d,_0x37099f=_0x35dcbc/_0x51e1b1;let _0x113192=Math[_0x16148d(0x2ed)](_0x132fb5,_0x37099f);if(_0xc94d4f)_0x113192=Math[_0x16148d(0x2ed)](_0x113192,0x1);_0x40212a!==0x0&&(_0x26469d=Math[_0x16148d(0x1bf)](_0x4b190d*_0x113192),_0x492052=Math[_0x16148d(0x1bf)](_0x51e1b1*_0x113192));switch(_0x40212a){case 0x1:case 0x4:case 0x7:_0x44779d=_0x3c3466;break;case 0x2:case 0x5:case 0x8:_0x44779d+=Math[_0x16148d(0x1bf)]((_0x591c49-_0x26469d)/0x2);break;case 0x3:case 0x6:case 0x9:_0x44779d+=_0x591c49-_0x26469d;break;}switch(_0x40212a){case 0x7:case 0x8:case 0x9:_0x17a688=_0x42a79f;break;case 0x4:case 0x5:case 0x6:_0x17a688+=Math[_0x16148d(0x1bf)]((_0x35dcbc-_0x492052)/0x2);break;case 0x1:case 0x2:case 0x3:_0x17a688+=_0x35dcbc-_0x492052;break;}_0x34c400[_0x16148d(0x4c6)](_0x490551,0x0,0x0,_0x4b190d,_0x51e1b1,_0x44779d,_0x17a688,_0x26469d,_0x492052),_0xc94d4f&&this[_0x16148d(0x1ec)](_0x58dc0);},Window_ChoiceList['prototype'][_0x45a258(0x4e9)]=function(){const _0x4dc445=_0x45a258;this[_0x4dc445(0x48d)]['clear']();if(!this['_choiceHelpDescriptions'])return;const _0x1bb1c3=this[_0x4dc445(0x4f3)]();this['_choiceHelpDescriptions'][_0x1bb1c3]?(this[_0x4dc445(0x48d)][_0x4dc445(0x2fb)](this[_0x4dc445(0x18d)][_0x1bb1c3]),this[_0x4dc445(0x48d)]['show']()):(this[_0x4dc445(0x48d)][_0x4dc445(0x1eb)](),this[_0x4dc445(0x48d)]['hide']());},Window_EventItem[_0x45a258(0x2fd)]['makeItemList']=function(){const _0x9cb333=_0x45a258,_0x1dd782=$gameMessage['itemChoiceItypeId']();_0x1dd782===_0x9cb333(0x478)&&Imported['VisuMZ_1_SkillsStatesCore']?this[_0x9cb333(0x306)]():Window_ItemList[_0x9cb333(0x2fd)]['makeItemList'][_0x9cb333(0x388)](this);},Window_EventItem[_0x45a258(0x2fd)][_0x45a258(0x306)]=function(){const _0x52cd39=_0x45a258,_0x447fb3=$gameMessage['itemChoiceActor']();this[_0x52cd39(0x310)]=_0x447fb3?_0x447fb3[_0x52cd39(0x4c5)]()[_0x52cd39(0x231)](_0x1d77ea=>this['includes'](_0x1d77ea)):[],this['includes'](null)&&this[_0x52cd39(0x310)][_0x52cd39(0x46d)](null);},VisuMZ[_0x45a258(0x428)]['Window_EventItem_includes']=Window_EventItem[_0x45a258(0x2fd)][_0x45a258(0x353)],Window_EventItem[_0x45a258(0x2fd)][_0x45a258(0x353)]=function(_0x110b58){const _0x1deeb4=_0x45a258,_0x410689=$gameMessage[_0x1deeb4(0x449)]();if(_0x410689===_0x1deeb4(0x276)){if(!DataManager[_0x1deeb4(0x3a5)](_0x110b58))return![];const _0x50f837=$gameMessage['itemChoiceWtypeId']();if(_0x50f837>0x0){if(_0x110b58[_0x1deeb4(0x35c)]!==_0x50f837)return![];}return!![];}else{if(_0x410689===_0x1deeb4(0x1bd)){if(!DataManager[_0x1deeb4(0x34d)](_0x110b58))return![];const _0x316c8e=$gameMessage[_0x1deeb4(0x203)]();if(_0x316c8e>0x0){if(_0x110b58[_0x1deeb4(0x233)]!==_0x316c8e)return![];}const _0x3583e7=$gameMessage[_0x1deeb4(0x46b)]();if(_0x3583e7>0x0){if(_0x110b58[_0x1deeb4(0x2bd)]!==_0x3583e7)return![];}return!![];}else{if(_0x410689===_0x1deeb4(0x478)){if(!DataManager[_0x1deeb4(0x1ff)](_0x110b58))return![];const _0xf0b7cb=$gameMessage[_0x1deeb4(0x33e)]();if(_0xf0b7cb[_0x1deeb4(0x1e8)](_0x110b58))return![];if(!_0xf0b7cb[_0x1deeb4(0x4d0)](_0x110b58))return![];const _0xa3a856=$gameMessage[_0x1deeb4(0x2e5)]();if(_0xa3a856>0x0){const _0x2164ff=DataManager[_0x1deeb4(0x2f6)](_0x110b58);if(!_0x2164ff[_0x1deeb4(0x353)](_0xa3a856))return![];}return!![];}else return VisuMZ[_0x1deeb4(0x428)][_0x1deeb4(0x4eb)][_0x1deeb4(0x388)](this,_0x110b58);}}},VisuMZ[_0x45a258(0x428)][_0x45a258(0x22d)]=Window_ItemList[_0x45a258(0x2fd)][_0x45a258(0x30e)],Window_ItemList[_0x45a258(0x2fd)][_0x45a258(0x30e)]=function(_0x69e03d,_0x282c0b,_0x2650a2,_0x457b62){const _0x102cc3=_0x45a258,_0x4075f4=$gameMessage['itemChoiceItypeId']();if(_0x4075f4===_0x102cc3(0x478)){const _0x45da5f=$gameMessage[_0x102cc3(0x33e)]();this[_0x102cc3(0x4c9)](_0x45da5f,_0x69e03d,_0x282c0b,_0x2650a2,_0x457b62);}else VisuMZ[_0x102cc3(0x428)][_0x102cc3(0x22d)][_0x102cc3(0x388)](this,_0x69e03d,_0x282c0b,_0x2650a2,_0x457b62);};