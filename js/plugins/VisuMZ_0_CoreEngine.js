//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.83;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.83] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk).
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x500928=_0x455b;(function(_0x4aaf17,_0x335f26){const _0x41b356=_0x455b,_0x4fef8a=_0x4aaf17();while(!![]){try{const _0x40416d=-parseInt(_0x41b356(0x867))/0x1*(-parseInt(_0x41b356(0x334))/0x2)+-parseInt(_0x41b356(0x52d))/0x3*(-parseInt(_0x41b356(0x3d3))/0x4)+-parseInt(_0x41b356(0x5d7))/0x5+-parseInt(_0x41b356(0x2bb))/0x6*(-parseInt(_0x41b356(0x172))/0x7)+-parseInt(_0x41b356(0x379))/0x8+-parseInt(_0x41b356(0x234))/0x9+-parseInt(_0x41b356(0x262))/0xa;if(_0x40416d===_0x335f26)break;else _0x4fef8a['push'](_0x4fef8a['shift']());}catch(_0x945583){_0x4fef8a['push'](_0x4fef8a['shift']());}}}(_0x34d4,0x8cd2f));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5293f7){const _0x26f8f3=_0x455b;return _0x5293f7[_0x26f8f3(0x4a5)]&&_0x5293f7[_0x26f8f3(0x242)][_0x26f8f3(0x250)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x500928(0x5ac)]=function(_0x4d9ca0,_0x3d6c7a){const _0x3cba6a=_0x500928;for(const _0x569946 in _0x3d6c7a){if(_0x569946[_0x3cba6a(0x6ad)](/(.*):(.*)/i)){const _0x123da0=String(RegExp['$1']),_0x40b98d=String(RegExp['$2'])['toUpperCase']()[_0x3cba6a(0x886)]();let _0x28c254,_0x527da7,_0x1f99f3;switch(_0x40b98d){case _0x3cba6a(0x7f3):_0x28c254=_0x3d6c7a[_0x569946]!==''?Number(_0x3d6c7a[_0x569946]):0x0;break;case _0x3cba6a(0x1aa):_0x527da7=_0x3d6c7a[_0x569946]!==''?JSON['parse'](_0x3d6c7a[_0x569946]):[],_0x28c254=_0x527da7[_0x3cba6a(0x1cd)](_0x900fcd=>Number(_0x900fcd));break;case _0x3cba6a(0x332):_0x28c254=_0x3d6c7a[_0x569946]!==''?eval(_0x3d6c7a[_0x569946]):null;break;case'ARRAYEVAL':_0x527da7=_0x3d6c7a[_0x569946]!==''?JSON[_0x3cba6a(0x4da)](_0x3d6c7a[_0x569946]):[],_0x28c254=_0x527da7[_0x3cba6a(0x1cd)](_0x3659b7=>eval(_0x3659b7));break;case _0x3cba6a(0x519):_0x28c254=_0x3d6c7a[_0x569946]!==''?JSON['parse'](_0x3d6c7a[_0x569946]):'';break;case _0x3cba6a(0x156):_0x527da7=_0x3d6c7a[_0x569946]!==''?JSON[_0x3cba6a(0x4da)](_0x3d6c7a[_0x569946]):[],_0x28c254=_0x527da7['map'](_0x260d6d=>JSON[_0x3cba6a(0x4da)](_0x260d6d));break;case _0x3cba6a(0xd1):_0x28c254=_0x3d6c7a[_0x569946]!==''?new Function(JSON[_0x3cba6a(0x4da)](_0x3d6c7a[_0x569946])):new Function('return\x200');break;case _0x3cba6a(0x5af):_0x527da7=_0x3d6c7a[_0x569946]!==''?JSON[_0x3cba6a(0x4da)](_0x3d6c7a[_0x569946]):[],_0x28c254=_0x527da7[_0x3cba6a(0x1cd)](_0x24bc8d=>new Function(JSON[_0x3cba6a(0x4da)](_0x24bc8d)));break;case _0x3cba6a(0x194):_0x28c254=_0x3d6c7a[_0x569946]!==''?String(_0x3d6c7a[_0x569946]):'';break;case _0x3cba6a(0x795):_0x527da7=_0x3d6c7a[_0x569946]!==''?JSON[_0x3cba6a(0x4da)](_0x3d6c7a[_0x569946]):[],_0x28c254=_0x527da7[_0x3cba6a(0x1cd)](_0x115090=>String(_0x115090));break;case _0x3cba6a(0x63b):_0x1f99f3=_0x3d6c7a[_0x569946]!==''?JSON[_0x3cba6a(0x4da)](_0x3d6c7a[_0x569946]):{},_0x4d9ca0[_0x123da0]={},VisuMZ[_0x3cba6a(0x5ac)](_0x4d9ca0[_0x123da0],_0x1f99f3);continue;case _0x3cba6a(0x641):_0x527da7=_0x3d6c7a[_0x569946]!==''?JSON[_0x3cba6a(0x4da)](_0x3d6c7a[_0x569946]):[],_0x28c254=_0x527da7[_0x3cba6a(0x1cd)](_0x4ca964=>VisuMZ['ConvertParams']({},JSON[_0x3cba6a(0x4da)](_0x4ca964)));break;default:continue;}_0x4d9ca0[_0x123da0]=_0x28c254;}}return _0x4d9ca0;},VisuMZ[_0x500928(0x858)]['SceneManager_exit']=SceneManager[_0x500928(0x6ea)],SceneManager[_0x500928(0x6ea)]=function(){const _0x381792=_0x500928;VisuMZ[_0x381792(0x858)][_0x381792(0x119)][_0x381792(0x485)](this);if(Utils['RPGMAKER_VERSION']>=_0x381792(0x654)){if(typeof nw===_0x381792(0x4b9))nw['App'][_0x381792(0x3eb)]();}},(_0x398c25=>{const _0x4447fa=_0x500928,_0x363ab9=_0x398c25[_0x4447fa(0x725)];for(const _0x33efc0 of dependencies){if(!Imported[_0x33efc0]){alert(_0x4447fa(0x24e)['format'](_0x363ab9,_0x33efc0)),SceneManager['exit']();break;}}const _0x2e4947=_0x398c25[_0x4447fa(0x242)];if(_0x2e4947[_0x4447fa(0x6ad)](/\[Version[ ](.*?)\]/i)){const _0x1db2f5=Number(RegExp['$1']);_0x1db2f5!==VisuMZ[label][_0x4447fa(0x7f8)]&&(alert(_0x4447fa(0x66a)[_0x4447fa(0xc1)](_0x363ab9,_0x1db2f5)),SceneManager[_0x4447fa(0x6ea)]());}if(_0x2e4947[_0x4447fa(0x6ad)](/\[Tier[ ](\d+)\]/i)){const _0x1f0abf=Number(RegExp['$1']);_0x1f0abf<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4447fa(0xc1)](_0x363ab9,_0x1f0abf,tier)),SceneManager['exit']()):tier=Math[_0x4447fa(0x627)](_0x1f0abf,tier);}VisuMZ[_0x4447fa(0x5ac)](VisuMZ[label][_0x4447fa(0x17a)],_0x398c25[_0x4447fa(0x45b)]);})(pluginData),((()=>{const _0x182f5b=_0x500928;if(VisuMZ['CoreEngine'][_0x182f5b(0x17a)][_0x182f5b(0xe1)][_0x182f5b(0x828)]??!![])for(const _0x51d082 in $plugins){const _0x30bba8=$plugins[_0x51d082];_0x30bba8[_0x182f5b(0x725)]['match'](/(.*)\/(.*)/i)&&(_0x30bba8[_0x182f5b(0x725)]=String(RegExp['$2'][_0x182f5b(0x886)]()));}})()),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],'AnimationPoint',_0x456683=>{const _0x22d08e=_0x500928;if(!SceneManager[_0x22d08e(0x307)])return;if(!SceneManager['_scene']['_spriteset'])return;VisuMZ[_0x22d08e(0x5ac)](_0x456683,_0x456683);const _0x4acf44=Math[_0x22d08e(0x7a6)](_0x456683['pointX']),_0x55d5e4=Math[_0x22d08e(0x7a6)](_0x456683['pointY']);$gameTemp[_0x22d08e(0x160)](_0x4acf44,_0x55d5e4,_0x456683[_0x22d08e(0x5f7)],_0x456683[_0x22d08e(0x53e)],_0x456683[_0x22d08e(0x133)]);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x4bc),_0x4f8287=>{const _0x4e036d=_0x500928;VisuMZ[_0x4e036d(0x5ac)](_0x4f8287,_0x4f8287);const _0x2d168f=Math['round'](_0x4f8287[_0x4e036d(0x4d7)])[_0x4e036d(0x21c)](0x0,0x64),_0x444564=AudioManager['_currentBgm'];_0x444564&&(_0x444564[_0x4e036d(0x4d7)]=_0x2d168f,_0x444564[_0x4e036d(0x268)]=AudioManager[_0x4e036d(0x275)][_0x4e036d(0x6cc)](),AudioManager['updateBgmParameters'](_0x444564),AudioManager['playBgm'](_0x444564,_0x444564[_0x4e036d(0x268)]),AudioManager[_0x4e036d(0x275)][_0x4e036d(0x350)](_0x444564[_0x4e036d(0x268)]));}),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],_0x500928(0x4d1),_0x18e519=>{const _0x193f1e=_0x500928;VisuMZ[_0x193f1e(0x5ac)](_0x18e519,_0x18e519);const _0x9ec053=Math['round'](_0x18e519[_0x193f1e(0x790)])[_0x193f1e(0x21c)](0x32,0x96),_0x31b517=AudioManager[_0x193f1e(0x6aa)];_0x31b517&&(_0x31b517[_0x193f1e(0x790)]=_0x9ec053,_0x31b517[_0x193f1e(0x268)]=AudioManager[_0x193f1e(0x275)][_0x193f1e(0x6cc)](),AudioManager['updateBgmParameters'](_0x31b517),AudioManager[_0x193f1e(0x699)](_0x31b517,_0x31b517[_0x193f1e(0x268)]),AudioManager[_0x193f1e(0x275)][_0x193f1e(0x350)](_0x31b517[_0x193f1e(0x268)]));}),PluginManager[_0x500928(0x4cf)](pluginData['name'],_0x500928(0x856),_0xf69cf2=>{const _0x35194a=_0x500928;VisuMZ['ConvertParams'](_0xf69cf2,_0xf69cf2);const _0x24c4ca=Math[_0x35194a(0x7a6)](_0xf69cf2[_0x35194a(0x464)])[_0x35194a(0x21c)](-0x64,0x64),_0x58b5a9=AudioManager[_0x35194a(0x6aa)];_0x58b5a9&&(_0x58b5a9[_0x35194a(0x464)]=_0x24c4ca,_0x58b5a9['pos']=AudioManager['_bgmBuffer'][_0x35194a(0x6cc)](),AudioManager[_0x35194a(0x71a)](_0x58b5a9),AudioManager[_0x35194a(0x699)](_0x58b5a9,_0x58b5a9['pos']),AudioManager[_0x35194a(0x275)][_0x35194a(0x350)](_0x58b5a9[_0x35194a(0x268)]));}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x4d6),_0x3292ba=>{const _0x316a3d=_0x500928;VisuMZ[_0x316a3d(0x5ac)](_0x3292ba,_0x3292ba);const _0x16b271=Math[_0x316a3d(0x7a6)](_0x3292ba['volume'])['clamp'](0x0,0x64),_0xcaae8e=AudioManager[_0x316a3d(0x47c)];_0xcaae8e&&(_0xcaae8e[_0x316a3d(0x4d7)]=_0x16b271,_0xcaae8e[_0x316a3d(0x268)]=AudioManager['_bgsBuffer'][_0x316a3d(0x6cc)](),AudioManager[_0x316a3d(0x5b6)](_0xcaae8e),AudioManager[_0x316a3d(0x67c)](_0xcaae8e,_0xcaae8e[_0x316a3d(0x268)]),AudioManager[_0x316a3d(0x769)]['_startPlaying'](_0xcaae8e[_0x316a3d(0x268)]));}),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],_0x500928(0x5e2),_0x8826cc=>{const _0x523932=_0x500928;VisuMZ['ConvertParams'](_0x8826cc,_0x8826cc);const _0xfd1b29=Math[_0x523932(0x7a6)](_0x8826cc[_0x523932(0x790)])[_0x523932(0x21c)](0x32,0x96),_0x21ea65=AudioManager['_currentBgs'];_0x21ea65&&(_0x21ea65['pitch']=_0xfd1b29,_0x21ea65[_0x523932(0x268)]=AudioManager[_0x523932(0x769)][_0x523932(0x6cc)](),AudioManager['updateBgsParameters'](_0x21ea65),AudioManager[_0x523932(0x67c)](_0x21ea65,_0x21ea65['pos']),AudioManager[_0x523932(0x769)][_0x523932(0x350)](_0x21ea65[_0x523932(0x268)]));}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x436),_0x17f5d7=>{const _0x395140=_0x500928;VisuMZ['ConvertParams'](_0x17f5d7,_0x17f5d7);const _0x3097f0=Math[_0x395140(0x7a6)](_0x17f5d7[_0x395140(0x464)])[_0x395140(0x21c)](-0x64,0x64),_0x4f33ed=AudioManager[_0x395140(0x47c)];_0x4f33ed&&(_0x4f33ed['pan']=_0x3097f0,_0x4f33ed[_0x395140(0x268)]=AudioManager[_0x395140(0x769)][_0x395140(0x6cc)](),AudioManager[_0x395140(0x5b6)](_0x4f33ed),AudioManager[_0x395140(0x67c)](_0x4f33ed,_0x4f33ed['pos']),AudioManager[_0x395140(0x769)][_0x395140(0x350)](_0x4f33ed['pos']));}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],'DebugConsoleLastControllerID',_0x749323=>{const _0x1ae8cc=_0x500928;if(!$gameTemp[_0x1ae8cc(0x290)]())return;const _0x4a34a0=Input[_0x1ae8cc(0x6da)]();navigator[_0x1ae8cc(0x815)]&&navigator[_0x1ae8cc(0x815)][_0x1ae8cc(0x66f)](_0x4a34a0);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x34f),_0x1c2f75=>{const _0x48c143=_0x500928;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x48c143(0x1f1)]())return;SceneManager[_0x48c143(0x307)]['_active']=![],VisuMZ['CoreEngine'][_0x48c143(0x2bd)]();}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x150),_0x1ae814=>{const _0x36093c=_0x500928;if(!$gameTemp[_0x36093c(0x290)]())return;if(!Utils[_0x36093c(0x1f1)]())return;SceneManager[_0x36093c(0x307)][_0x36093c(0x5ca)]=![],VisuMZ[_0x36093c(0x858)]['ExportStrFromAllTroops']();}),PluginManager['registerCommand'](pluginData['name'],'ExportCurMapText',_0x4c5ad4=>{const _0x1afcac=_0x500928;if(!$gameTemp[_0x1afcac(0x290)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x1afcac(0x630)]()<=0x0)return;VisuMZ['ConvertParams'](_0x4c5ad4,_0x4c5ad4);const _0x3ed9e1=_0x1afcac(0x780)[_0x1afcac(0xc1)]($gameMap[_0x1afcac(0x630)]()[_0x1afcac(0x34c)](0x3)),_0x4ec9fb=VisuMZ['CoreEngine'][_0x1afcac(0x772)]($gameMap[_0x1afcac(0x630)]());VisuMZ[_0x1afcac(0x858)][_0x1afcac(0x715)](_0x4ec9fb,_0x3ed9e1,!![]);}),PluginManager[_0x500928(0x4cf)](pluginData['name'],_0x500928(0x7ae),_0x2d8bde=>{const _0x27f1f1=_0x500928;if(!$gameTemp[_0x27f1f1(0x290)]())return;if(!Utils[_0x27f1f1(0x1f1)]())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x27f1f1(0x5ac)](_0x2d8bde,_0x2d8bde);const _0x8d7227=_0x27f1f1(0x264)[_0x27f1f1(0xc1)]($gameTroop['_troopId'][_0x27f1f1(0x34c)](0x4)),_0xf0a909=VisuMZ['CoreEngine'][_0x27f1f1(0x88c)]($gameTroop[_0x27f1f1(0x7c5)]);VisuMZ['CoreEngine'][_0x27f1f1(0x715)](_0xf0a909,_0x8d7227,!![]);}),VisuMZ[_0x500928(0x858)]['ExportString']=function(_0x4d9d02,_0x21b842,_0x5b4ef7){const _0x42689b=_0x500928,_0x5347ea=require('fs');let _0x17baff=_0x42689b(0x6ec)['format'](_0x21b842||'0');_0x5347ea[_0x42689b(0x490)](_0x17baff,_0x4d9d02,_0x521b4b=>{const _0x1852e3=_0x42689b;if(_0x521b4b)throw err;else _0x5b4ef7&&alert(_0x1852e3(0x859)['format'](_0x17baff));});},VisuMZ[_0x500928(0x858)][_0x500928(0x2bd)]=function(){const _0x1bf780=_0x500928,_0x3f1988=[];for(const _0x8e9732 of $dataMapInfos){if(!_0x8e9732)continue;_0x3f1988[_0x1bf780(0x719)](_0x8e9732['id']);}const _0x4c58a6=_0x3f1988[_0x1bf780(0x12e)]*0x64+Math[_0x1bf780(0x2be)](0x64);alert(_0x1bf780(0x854)['format'](_0x4c58a6)),this[_0x1bf780(0x3c5)]=[],this[_0x1bf780(0x5f2)]=$dataMap;for(const _0x3a08b9 of _0x3f1988){VisuMZ['CoreEngine']['loadMapData'](_0x3a08b9);}setTimeout(VisuMZ[_0x1bf780(0x858)][_0x1bf780(0x855)][_0x1bf780(0x59d)](this),_0x4c58a6);},VisuMZ[_0x500928(0x858)][_0x500928(0x6bb)]=function(_0x385afa){const _0x2191d5=_0x500928,_0x127d72=_0x2191d5(0x1cf)[_0x2191d5(0xc1)](_0x385afa[_0x2191d5(0x34c)](0x3)),_0x23aa0e=new XMLHttpRequest(),_0x321018=_0x2191d5(0x393)+_0x127d72;_0x23aa0e['open'](_0x2191d5(0x7e6),_0x321018),_0x23aa0e[_0x2191d5(0x26b)](_0x2191d5(0x805)),_0x23aa0e['onload']=()=>this[_0x2191d5(0x36c)](_0x23aa0e,_0x385afa,_0x127d72,_0x321018),_0x23aa0e[_0x2191d5(0x407)]=()=>DataManager['onXhrError'](_0x2191d5(0x473),_0x127d72,_0x321018),_0x23aa0e[_0x2191d5(0x79f)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x36c)]=function(_0x1ef76a,_0x368b0c,_0x46d236,_0x599614){const _0x4f9834=_0x500928;$dataMap=JSON[_0x4f9834(0x4da)](_0x1ef76a[_0x4f9834(0xc7)]),DataManager[_0x4f9834(0x6d9)]($dataMap),this[_0x4f9834(0x3c5)][_0x368b0c]=VisuMZ['CoreEngine']['ExtractStrFromMap'](_0x368b0c),$dataMap=this['_currentMap'];},VisuMZ[_0x500928(0x858)][_0x500928(0x855)]=function(){const _0x24df2f=_0x500928,_0x27df76=_0x24df2f(0x5cc);this[_0x24df2f(0x3c5)]['remove'](undefined)[_0x24df2f(0x39d)]('')[_0x24df2f(0x39d)](null);const _0x13d842=this[_0x24df2f(0x3c5)][_0x24df2f(0x569)](_0x24df2f(0x101))[_0x24df2f(0x886)]();VisuMZ['CoreEngine']['ExportString'](_0x13d842,_0x27df76,!![]),SceneManager[_0x24df2f(0x307)][_0x24df2f(0x5ca)]=!![];},VisuMZ[_0x500928(0x858)][_0x500928(0x772)]=function(_0x5377fb){const _0x19d0e2=_0x500928;if(!$dataMap)return'';let _0x3d7c06='█'[_0x19d0e2(0x697)](0x46)+'\x0a\x0a',_0x3e29d2='═'[_0x19d0e2(0x697)](0x46)+'\x0a\x0a',_0x4022c0='';this['_commonEventLayers']=0x0;for(const _0x2bee3b of $dataMap[_0x19d0e2(0x5f1)]){if(!_0x2bee3b)continue;let _0x1779ce=_0x2bee3b['id'],_0x5d11f1=_0x2bee3b[_0x19d0e2(0x725)],_0x33dcd9=_0x2bee3b[_0x19d0e2(0x673)];for(const _0x574585 of _0x33dcd9){const _0x41fbca=_0x33dcd9[_0x19d0e2(0x356)](_0x574585)+0x1;let _0x49bdd4=_0x3e29d2+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x30c399=VisuMZ['CoreEngine'][_0x19d0e2(0x60f)](_0x574585[_0x19d0e2(0x68e)]);if(_0x30c399[_0x19d0e2(0x12e)]>0x0){if(_0x4022c0[_0x19d0e2(0x12e)]>0x0)_0x4022c0+=_0x3e29d2+_0x19d0e2(0x101);else{const _0x138090=$dataMapInfos[_0x5377fb][_0x19d0e2(0x725)];_0x4022c0+=_0x3d7c06+_0x19d0e2(0x300)[_0x19d0e2(0xc1)](_0x5377fb,_0x138090||'Unnamed')+_0x3d7c06;}_0x4022c0+=_0x49bdd4[_0x19d0e2(0xc1)](_0x1779ce,_0x5d11f1,_0x41fbca,_0x30c399);}}}return _0x4022c0[_0x19d0e2(0x12e)]>0x0&&(_0x4022c0+=_0x3e29d2),_0x4022c0;},VisuMZ['CoreEngine'][_0x500928(0x3bb)]=function(){const _0x4cb090=_0x500928,_0x36f66b=$dataTroops[_0x4cb090(0x12e)]*0xa+Math[_0x4cb090(0x2be)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x4cb090(0xc1)](_0x36f66b));const _0x325f1c=[];for(const _0xd50de3 of $dataTroops){if(!_0xd50de3)continue;const _0x46ba7b=_0xd50de3['id'];_0x325f1c[_0x46ba7b]=VisuMZ[_0x4cb090(0x858)][_0x4cb090(0x88c)](_0x46ba7b);}setTimeout(VisuMZ[_0x4cb090(0x858)][_0x4cb090(0x3fe)]['bind'](this,_0x325f1c),_0x36f66b);},VisuMZ['CoreEngine'][_0x500928(0x88c)]=function(_0x27d3db){const _0x2f218e=_0x500928;if(!$dataTroops[_0x27d3db])return'';let _0xf63d25='█'[_0x2f218e(0x697)](0x46)+'\x0a\x0a',_0x3dd986='═'[_0x2f218e(0x697)](0x46)+'\x0a\x0a',_0x4c8b09='';this['_commonEventLayers']=0x0;const _0x2f3034=$dataTroops[_0x27d3db];let _0xe8ed0d=_0x2f3034[_0x2f218e(0x673)];for(const _0x431df7 of _0xe8ed0d){const _0x51dae0=_0xe8ed0d[_0x2f218e(0x356)](_0x431df7)+0x1;let _0xedbdb4=_0x3dd986+_0x2f218e(0x2cd),_0x5e577b=VisuMZ[_0x2f218e(0x858)][_0x2f218e(0x60f)](_0x431df7[_0x2f218e(0x68e)]);_0x5e577b['length']>0x0&&(_0x4c8b09['length']>0x0?_0x4c8b09+=_0x3dd986+'\x0a\x0a\x0a\x0a\x0a':_0x4c8b09+=_0xf63d25+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x2f218e(0xc1)](_0x27d3db,_0x2f3034[_0x2f218e(0x725)]||'Unnamed')+_0xf63d25,_0x4c8b09+=_0xedbdb4['format'](_0x51dae0,_0x5e577b));}return _0x4c8b09[_0x2f218e(0x12e)]>0x0&&(_0x4c8b09+=_0x3dd986),_0x4c8b09;},VisuMZ[_0x500928(0x858)][_0x500928(0x3fe)]=function(_0x4f68a3){const _0x14b60e=_0x500928,_0x3bb486=_0x14b60e(0x1f6);_0x4f68a3[_0x14b60e(0x39d)](undefined)[_0x14b60e(0x39d)]('')[_0x14b60e(0x39d)](null);const _0x1dcff8=_0x4f68a3[_0x14b60e(0x569)](_0x14b60e(0x101))['trim']();VisuMZ[_0x14b60e(0x858)][_0x14b60e(0x715)](_0x1dcff8,_0x3bb486,!![]),SceneManager[_0x14b60e(0x307)][_0x14b60e(0x5ca)]=!![];},VisuMZ[_0x500928(0x858)]['ExtractStrFromList']=function(_0x342e3c){const _0xd7e0c8=_0x500928;let _0x1a8aab='\x0a'+'─'[_0xd7e0c8(0x697)](0x46)+'\x0a',_0x3dda28='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x252c0d='';for(const _0x29c359 of _0x342e3c){if(!_0x29c359)continue;if(_0x29c359[_0xd7e0c8(0x2ee)]===0x65)_0x252c0d+=_0x1a8aab+'\x0a',_0x252c0d+=_0xd7e0c8(0x53f),_0x29c359[_0xd7e0c8(0x45b)][0x4]!==''&&_0x29c359[_0xd7e0c8(0x45b)][0x4]!==undefined&&(_0x252c0d+=_0xd7e0c8(0x15a)['format'](_0x29c359[_0xd7e0c8(0x45b)][0x4]));else{if(_0x29c359['code']===0x191)_0x252c0d+=_0xd7e0c8(0x35c)[_0xd7e0c8(0xc1)](_0x29c359[_0xd7e0c8(0x45b)][0x0]);else{if(_0x29c359['code']===0x192)_0x252c0d+=_0x1a8aab,_0x252c0d+=_0xd7e0c8(0x674)[_0xd7e0c8(0xc1)](_0x3dda28,_0x29c359[_0xd7e0c8(0x45b)][0x0]+0x1,_0x29c359[_0xd7e0c8(0x45b)][0x1]);else{if(_0x29c359[_0xd7e0c8(0x2ee)]===0x193)_0x252c0d+=_0x1a8aab,_0x252c0d+=_0xd7e0c8(0x716)[_0xd7e0c8(0xc1)](_0x3dda28);else{if(_0x29c359[_0xd7e0c8(0x2ee)]===0x194)_0x252c0d+=_0x1a8aab,_0x252c0d+=_0xd7e0c8(0x786)['format'](_0x3dda28);else{if(_0x29c359[_0xd7e0c8(0x2ee)]===0x69)_0x252c0d+=_0x1a8aab+'\x0a',_0x252c0d+='〘Scrolling\x20Text〙\x0a';else{if(_0x29c359[_0xd7e0c8(0x2ee)]===0x6c)_0x252c0d+=_0x1a8aab+'\x0a',_0x252c0d+=_0xd7e0c8(0x2fb)[_0xd7e0c8(0xc1)](_0x29c359['parameters'][0x0]);else{if(_0x29c359[_0xd7e0c8(0x2ee)]===0x198)_0x252c0d+='%1\x0a'[_0xd7e0c8(0xc1)](_0x29c359['parameters'][0x0]);else{if(_0x29c359[_0xd7e0c8(0x2ee)]===0x75){const _0x53496a=$dataCommonEvents[_0x29c359['parameters'][0x0]];if(_0x53496a&&this[_0xd7e0c8(0x24a)]<=0xa){this[_0xd7e0c8(0x24a)]++;let _0x5eca70=VisuMZ[_0xd7e0c8(0x858)][_0xd7e0c8(0x60f)](_0x53496a['list']);_0x5eca70[_0xd7e0c8(0x12e)]>0x0&&(_0x252c0d+=_0x1a8aab,_0x252c0d+=_0x3dda28,_0x252c0d+=_0xd7e0c8(0x389)['format'](_0x53496a['id'],_0x53496a[_0xd7e0c8(0x725)]),_0x252c0d+=_0x3dda28,_0x252c0d+=_0x5eca70,_0x252c0d+=_0x3dda28,_0x252c0d+=_0xd7e0c8(0x456)[_0xd7e0c8(0xc1)](_0x53496a['id'],_0x53496a['name']),_0x252c0d+=_0x3dda28),this[_0xd7e0c8(0x24a)]--;}}}}}}}}}}}return _0x252c0d[_0xd7e0c8(0x12e)]>0x0&&(_0x252c0d+=_0x1a8aab),_0x252c0d;},PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x2e4),_0x43dcac=>{const _0x24cf74=_0x500928;VisuMZ[_0x24cf74(0x5ac)](_0x43dcac,_0x43dcac);const _0x46654=_0x43dcac['URL'];VisuMZ[_0x24cf74(0x676)](_0x46654);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x411),_0x29b522=>{const _0x496f85=_0x500928;VisuMZ[_0x496f85(0x5ac)](_0x29b522,_0x29b522);const _0x179a6a=_0x29b522[_0x496f85(0x1fa)]||0x0;$gameParty[_0x496f85(0x864)](_0x179a6a);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x2a2),_0x3683ec=>{const _0x58165e=_0x500928;if(!SceneManager[_0x58165e(0x7f1)]())return;VisuMZ[_0x58165e(0x5ac)](_0x3683ec,_0x3683ec);const _0x30cc49=_0x3683ec[_0x58165e(0x664)];SceneManager[_0x58165e(0x307)][_0x58165e(0x661)](_0x30cc49);}),PluginManager[_0x500928(0x4cf)](pluginData['name'],_0x500928(0x13c),_0x285833=>{const _0x4fafd5=_0x500928;if(!$gameTemp[_0x4fafd5(0x290)]())return;if(!Utils[_0x4fafd5(0x1f1)]())return;VisuMZ[_0x4fafd5(0x5ac)](_0x285833,_0x285833);const _0x2322e7=_0x285833['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0x2322e7;}),PluginManager['registerCommand'](pluginData['name'],_0x500928(0x5fb),_0x2a55a6=>{const _0x18c3a4=_0x500928;VisuMZ['ConvertParams'](_0x2a55a6,_0x2a55a6);const _0x1cba66=_0x2a55a6['pictureId']||0x1,_0x13e2fa=_0x2a55a6['easingType']||'Linear',_0x5f2826=$gameScreen[_0x18c3a4(0x503)](_0x1cba66);_0x5f2826&&_0x5f2826[_0x18c3a4(0x11d)](_0x13e2fa);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x46f),_0x25cf06=>{const _0x3b614a=_0x500928;for(let _0x5eae58=0x1;_0x5eae58<=0x64;_0x5eae58++){$gameScreen[_0x3b614a(0x4c2)](_0x5eae58);}}),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],_0x500928(0x1c9),_0xae2137=>{const _0x376d96=_0x500928;VisuMZ[_0x376d96(0x5ac)](_0xae2137,_0xae2137);const _0x17acba=Math[_0x376d96(0x2c9)](_0xae2137[_0x376d96(0x877)],_0xae2137[_0x376d96(0x2de)]),_0x333958=Math[_0x376d96(0x627)](_0xae2137[_0x376d96(0x877)],_0xae2137[_0x376d96(0x2de)]);for(let _0x33ac7e=_0x17acba;_0x33ac7e<=_0x333958;_0x33ac7e++){$gameScreen['erasePicture'](_0x33ac7e);}}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],'PictureRotateBy',_0x413417=>{const _0x1ba5cc=_0x500928;VisuMZ['ConvertParams'](_0x413417,_0x413417);const _0x2c817a=Math[_0x1ba5cc(0x7a6)](_0x413417['PictureID'])[_0x1ba5cc(0x21c)](0x1,0x64),_0x49e39b=-Number(_0x413417[_0x1ba5cc(0x4dd)]||0x0),_0x2e3d94=Math[_0x1ba5cc(0x627)](_0x413417[_0x1ba5cc(0x621)]||0x0,0x0),_0x25af90=_0x413417[_0x1ba5cc(0x1ff)]||_0x1ba5cc(0x2d1),_0x97abc5=_0x413417[_0x1ba5cc(0x7e0)],_0x3aae6d=$gameScreen[_0x1ba5cc(0x503)](_0x2c817a);if(!_0x3aae6d)return;_0x3aae6d[_0x1ba5cc(0x601)](_0x49e39b,_0x2e3d94,_0x25af90);if(_0x97abc5){const _0x3dd05f=$gameTemp[_0x1ba5cc(0x3b4)]();if(_0x3dd05f)_0x3dd05f[_0x1ba5cc(0x1ee)](_0x2e3d94);}}),PluginManager[_0x500928(0x4cf)](pluginData['name'],_0x500928(0x53d),_0x46c66f=>{const _0x5712b3=_0x500928;VisuMZ[_0x5712b3(0x5ac)](_0x46c66f,_0x46c66f);const _0x207f2c=Math[_0x5712b3(0x7a6)](_0x46c66f[_0x5712b3(0x3e9)])[_0x5712b3(0x21c)](0x1,0x64),_0x45f651=-Number(_0x46c66f[_0x5712b3(0x3fa)]||0x0),_0x547c71=Math[_0x5712b3(0x627)](_0x46c66f[_0x5712b3(0x621)]||0x0,0x0),_0x2f6fe7=_0x46c66f[_0x5712b3(0x1ff)]||_0x5712b3(0x2d1),_0x2cacd9=_0x46c66f[_0x5712b3(0x7e0)],_0x4af9ee=$gameScreen[_0x5712b3(0x503)](_0x207f2c);if(!_0x4af9ee)return;_0x4af9ee[_0x5712b3(0x6e8)](_0x45f651,_0x547c71,_0x2f6fe7);if(_0x2cacd9){const _0x244884=$gameTemp[_0x5712b3(0x3b4)]();if(_0x244884)_0x244884[_0x5712b3(0x1ee)](_0x547c71);}}),PluginManager['registerCommand'](pluginData['name'],'PictureShowIcon',_0x2291b6=>{const _0xa648ad=_0x500928;VisuMZ['ConvertParams'](_0x2291b6,_0x2291b6);const _0x4c8b0e=Math[_0xa648ad(0x7a6)](_0x2291b6[_0xa648ad(0x3e9)])[_0xa648ad(0x21c)](0x1,0x64),_0x5706c5=_0x2291b6[_0xa648ad(0x17a)],_0x533603=_0x5706c5[_0xa648ad(0x458)][_0xa648ad(0x21c)](0x0,0x1),_0x2a67ad=Math[_0xa648ad(0x7a6)](_0x5706c5[_0xa648ad(0x2f0)]||0x0),_0x20927e=Math['round'](_0x5706c5[_0xa648ad(0x428)]||0x0),_0x4149e8=Math[_0xa648ad(0x7a6)](_0x5706c5[_0xa648ad(0x205)]||0x0),_0x143042=Math['round'](_0x5706c5['ScaleY']||0x0),_0x4103cb=Math[_0xa648ad(0x7a6)](_0x5706c5['Opacity'])[_0xa648ad(0x21c)](0x0,0xff),_0x5d3b54=_0x5706c5[_0xa648ad(0x2ea)],_0x35316f='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x581f8c=_0x2291b6[_0xa648ad(0x81c)]?_0xa648ad(0x81c):_0xa648ad(0x822),_0xfbaa30=_0x35316f[_0xa648ad(0xc1)](_0x2291b6[_0xa648ad(0x667)],_0x581f8c);$gameScreen[_0xa648ad(0x226)](_0x4c8b0e,_0xfbaa30,_0x533603,_0x2a67ad,_0x20927e,_0x4149e8,_0x143042,_0x4103cb,_0x5d3b54);}),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],'ScreenShake',_0x156540=>{const _0x27d44b=_0x500928;VisuMZ[_0x27d44b(0x5ac)](_0x156540,_0x156540);const _0x2a69e4=_0x156540[_0x27d44b(0x1d8)]||_0x27d44b(0x390),_0x3b5f99=_0x156540['Power'][_0x27d44b(0x21c)](0x1,0x9),_0x300f8e=_0x156540[_0x27d44b(0x439)]['clamp'](0x1,0x9),_0x536a99=_0x156540[_0x27d44b(0x621)]||0x1,_0x36390a=_0x156540[_0x27d44b(0x7e0)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x2a69e4),$gameScreen[_0x27d44b(0x713)](_0x3b5f99,_0x300f8e,_0x536a99);if(_0x36390a){const _0x403d7e=$gameTemp[_0x27d44b(0x3b4)]();if(_0x403d7e)_0x403d7e[_0x27d44b(0x1ee)](_0x536a99);}}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x648),_0x348874=>{const _0x235a8c=_0x500928;if($gameParty[_0x235a8c(0x7a4)]())return;VisuMZ[_0x235a8c(0x5ac)](_0x348874,_0x348874);const _0x5f1dad=_0x348874[_0x235a8c(0x88d)],_0x505e43=(_0x348874[_0x235a8c(0x821)]||0x0)/0x64;for(const _0x578e48 of _0x5f1dad){const _0x1a51df=Math[_0x235a8c(0x390)]()<=_0x505e43;$gameSwitches[_0x235a8c(0x7c7)](_0x578e48,_0x1a51df);}}),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],'SwitchRandomizeRange',_0xb580d8=>{const _0x3689ae=_0x500928;if($gameParty[_0x3689ae(0x7a4)]())return;VisuMZ['ConvertParams'](_0xb580d8,_0xb580d8);const _0x6c47bc=Math[_0x3689ae(0x2c9)](_0xb580d8[_0x3689ae(0x877)],_0xb580d8['EndingID']),_0x3e6083=Math[_0x3689ae(0x627)](_0xb580d8[_0x3689ae(0x877)],_0xb580d8[_0x3689ae(0x2de)]),_0x54fe16=(_0xb580d8[_0x3689ae(0x821)]||0x0)/0x64;for(let _0x1d7a68=_0x6c47bc;_0x1d7a68<=_0x3e6083;_0x1d7a68++){const _0x1906f8=Math[_0x3689ae(0x390)]()<=_0x54fe16;$gameSwitches[_0x3689ae(0x7c7)](_0x1d7a68,_0x1906f8);}}),PluginManager[_0x500928(0x4cf)](pluginData['name'],_0x500928(0xd7),_0x49780f=>{const _0x3f2d48=_0x500928;if($gameParty[_0x3f2d48(0x7a4)]())return;VisuMZ[_0x3f2d48(0x5ac)](_0x49780f,_0x49780f);const _0x5e4aba=_0x49780f[_0x3f2d48(0x88d)];for(const _0x30b5a4 of _0x5e4aba){const _0x27f30d=$gameSwitches[_0x3f2d48(0x1fa)](_0x30b5a4);$gameSwitches[_0x3f2d48(0x7c7)](_0x30b5a4,!_0x27f30d);}}),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],_0x500928(0x2b4),_0x5b96d7=>{const _0x190d40=_0x500928;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x5b96d7,_0x5b96d7);const _0x292376=Math[_0x190d40(0x2c9)](_0x5b96d7[_0x190d40(0x877)],_0x5b96d7[_0x190d40(0x2de)]),_0x54cee7=Math[_0x190d40(0x627)](_0x5b96d7['StartID'],_0x5b96d7[_0x190d40(0x2de)]);for(let _0x558cfb=_0x292376;_0x558cfb<=_0x54cee7;_0x558cfb++){const _0x5c86a4=$gameSwitches[_0x190d40(0x1fa)](_0x558cfb);$gameSwitches[_0x190d40(0x7c7)](_0x558cfb,!_0x5c86a4);}}),PluginManager[_0x500928(0x4cf)](pluginData['name'],'SystemSetFontSize',_0x1e75b4=>{const _0x2f3fd0=_0x500928;VisuMZ[_0x2f3fd0(0x5ac)](_0x1e75b4,_0x1e75b4);const _0x71b0bd=_0x1e75b4[_0x2f3fd0(0x7d7)]||0x1;$gameSystem[_0x2f3fd0(0x467)](_0x71b0bd);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x404),_0x3180fc=>{const _0xf93c4b=_0x500928;if($gameParty[_0xf93c4b(0x7a4)]())return;VisuMZ[_0xf93c4b(0x5ac)](_0x3180fc,_0x3180fc);const _0xc2341c=_0x3180fc[_0xf93c4b(0x7d7)];if(_0xc2341c[_0xf93c4b(0x6ad)](/Front/i))$gameSystem[_0xf93c4b(0x3f5)](![]);else _0xc2341c[_0xf93c4b(0x6ad)](/Side/i)?$gameSystem[_0xf93c4b(0x3f5)](!![]):$gameSystem[_0xf93c4b(0x3f5)](!$gameSystem[_0xf93c4b(0x4ad)]());}),PluginManager['registerCommand'](pluginData['name'],'SystemLoadAudio',_0x197fbc=>{const _0x1be7f1=_0x500928;if($gameParty[_0x1be7f1(0x7a4)]())return;VisuMZ[_0x1be7f1(0x5ac)](_0x197fbc,_0x197fbc);const _0x3e46b8=['bgm','bgs','me','se'];for(const _0x5ae6d1 of _0x3e46b8){const _0x37c40b=_0x197fbc[_0x5ae6d1],_0x30e0d4='%1/'[_0x1be7f1(0xc1)](_0x5ae6d1);for(const _0x4801f9 of _0x37c40b){AudioManager[_0x1be7f1(0x875)](_0x30e0d4,_0x4801f9);}}}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x70e),_0x3c98aa=>{const _0x2b5fb6=_0x500928;if($gameParty[_0x2b5fb6(0x7a4)]())return;VisuMZ[_0x2b5fb6(0x5ac)](_0x3c98aa,_0x3c98aa);const _0x5e09e8=['animations','battlebacks1',_0x2b5fb6(0x285),_0x2b5fb6(0x5a9),'enemies',_0x2b5fb6(0x298),_0x2b5fb6(0x55d),_0x2b5fb6(0x75f),_0x2b5fb6(0x636),_0x2b5fb6(0x731),_0x2b5fb6(0x560),_0x2b5fb6(0x45c),_0x2b5fb6(0x1fb),'titles2'];for(const _0x2c1301 of _0x5e09e8){const _0xb6a7c8=_0x3c98aa[_0x2c1301],_0x4c116b=_0x2b5fb6(0x4bb)['format'](_0x2c1301);for(const _0x56ba83 of _0xb6a7c8){ImageManager[_0x2b5fb6(0x6df)](_0x4c116b,_0x56ba83);}}}),PluginManager[_0x500928(0x4cf)](pluginData['name'],_0x500928(0x282),_0x46121c=>{const _0x487910=_0x500928;if($gameParty[_0x487910(0x7a4)]())return;VisuMZ[_0x487910(0x5ac)](_0x46121c,_0x46121c);const _0x32d5c7=_0x46121c[_0x487910(0x7d7)][_0x487910(0x491)]()[_0x487910(0x886)](),_0x43e974=VisuMZ[_0x487910(0x858)][_0x487910(0x718)](_0x32d5c7);$gameSystem[_0x487910(0x603)](_0x43e974);}),VisuMZ[_0x500928(0x858)][_0x500928(0x718)]=function(_0x2348af){const _0x2b83b9=_0x500928;_0x2348af=_0x2348af||_0x2b83b9(0x3cb),_0x2348af=String(_0x2348af)[_0x2b83b9(0x491)]()[_0x2b83b9(0x886)]();switch(_0x2348af){case _0x2b83b9(0x36d):return 0x0;case'TPB\x20ACTIVE':Imported[_0x2b83b9(0x48e)]&&(ConfigManager['atbActive']=!![]);return 0x1;case _0x2b83b9(0x342):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x2b83b9(0x43f)]=![]);return 0x2;case _0x2b83b9(0x7c0):if(Imported[_0x2b83b9(0x74c)])return _0x2b83b9(0x7c0);break;case _0x2b83b9(0xbd):if(Imported[_0x2b83b9(0x517)])return _0x2b83b9(0xbd);break;case _0x2b83b9(0x33f):if(Imported[_0x2b83b9(0x274)])return'BTB';break;case _0x2b83b9(0x2d0):if(Imported[_0x2b83b9(0x3e4)])return _0x2b83b9(0x2d0);break;case _0x2b83b9(0x678):if(Imported[_0x2b83b9(0x396)])return _0x2b83b9(0x678);break;case _0x2b83b9(0x45f):if(Imported[_0x2b83b9(0x2b2)])return _0x2b83b9(0x45f);break;case _0x2b83b9(0x2a7):if(Imported[_0x2b83b9(0xc4)])return _0x2b83b9(0x2a7);break;}return $dataSystem[_0x2b83b9(0x137)];},PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],'SystemSetWindowPadding',_0x99de9c=>{const _0x43e30c=_0x500928;VisuMZ[_0x43e30c(0x5ac)](_0x99de9c,_0x99de9c);const _0x4cecda=_0x99de9c[_0x43e30c(0x7d7)]||0x1;$gameSystem[_0x43e30c(0x2a3)](_0x4cecda);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],'TextPopupShow',_0xed8457=>{const _0x3fc1a4=_0x500928;VisuMZ['ConvertParams'](_0xed8457,_0xed8457);const _0x56f8e2=_0xed8457[_0x3fc1a4(0x4c6)]||'';$textPopup(_0x56f8e2);}),PluginManager['registerCommand'](pluginData[_0x500928(0x725)],_0x500928(0x10e),_0x5547cd=>{const _0xcd855b=_0x500928;VisuMZ['ConvertParams'](_0x5547cd,_0x5547cd);const _0x230156=_0x5547cd['id']||0x1,_0x264ca2=_0x5547cd[_0xcd855b(0x175)],_0xbfa604=_0x5547cd[_0xcd855b(0x4bf)]||0x0;let _0x2f2297=$gameVariables['value'](_0x230156)||0x0;switch(_0x264ca2){case'=':_0x2f2297=_0xbfa604;break;case'+':_0x2f2297+=_0xbfa604;break;case'-':_0x2f2297-=_0xbfa604;break;case'*':_0x2f2297*=_0xbfa604;break;case'/':_0x2f2297/=_0xbfa604;break;case'%':_0x2f2297%=_0xbfa604;break;}_0x2f2297=_0x2f2297||0x0,$gameVariables['setValue'](_0x230156,_0x2f2297);}),PluginManager[_0x500928(0x4cf)](pluginData[_0x500928(0x725)],_0x500928(0x42a),_0x44c917=>{const _0x4b0035=_0x500928;VisuMZ[_0x4b0035(0x5ac)](_0x44c917,_0x44c917);const _0x1672a1=_0x44c917['id']()||0x1,_0x4ea425=_0x44c917[_0x4b0035(0x175)],_0x2d352a=_0x44c917[_0x4b0035(0x4bf)]()||0x0;let _0x24cc26=$gameVariables['value'](_0x1672a1)||0x0;switch(_0x4ea425){case'=':_0x24cc26=_0x2d352a;break;case'+':_0x24cc26+=_0x2d352a;break;case'-':_0x24cc26-=_0x2d352a;break;case'*':_0x24cc26*=_0x2d352a;break;case'/':_0x24cc26/=_0x2d352a;break;case'%':_0x24cc26%=_0x2d352a;break;}_0x24cc26=_0x24cc26||0x0,$gameVariables[_0x4b0035(0x7c7)](_0x1672a1,_0x24cc26);}),VisuMZ[_0x500928(0x858)][_0x500928(0x690)]=Scene_Boot[_0x500928(0x358)][_0x500928(0x27f)],Scene_Boot[_0x500928(0x358)]['onDatabaseLoaded']=function(){const _0x3e9da3=_0x500928;VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded'][_0x3e9da3(0x485)](this),this[_0x3e9da3(0x31f)](),this[_0x3e9da3(0x806)](),this[_0x3e9da3(0x5b3)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x3e9da3(0x1b0)](),this[_0x3e9da3(0x880)](),VisuMZ[_0x3e9da3(0x6d8)]();},VisuMZ[_0x500928(0x858)]['RegExp']={},Scene_Boot[_0x500928(0x358)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x17a8cb=_0x500928,_0x4844ea=[_0x17a8cb(0x44d),'MAXMP','ATK',_0x17a8cb(0x129),_0x17a8cb(0x4ca),'MDF',_0x17a8cb(0x2cf),'LUK'],_0x293cbd=['HIT',_0x17a8cb(0x419),_0x17a8cb(0x75a),'CEV',_0x17a8cb(0x64c),_0x17a8cb(0x10b),_0x17a8cb(0x5d2),'HRG','MRG',_0x17a8cb(0x484)],_0x3c65f2=['TGR',_0x17a8cb(0x3f2),_0x17a8cb(0x4e0),_0x17a8cb(0x796),_0x17a8cb(0x41e),_0x17a8cb(0x402),'PDR',_0x17a8cb(0x4ef),_0x17a8cb(0x62f),'EXR'],_0x26fd38=[_0x4844ea,_0x293cbd,_0x3c65f2],_0x2467ec=[_0x17a8cb(0x7be),_0x17a8cb(0x120),_0x17a8cb(0x798),_0x17a8cb(0xf6),'Rate','Rate1',_0x17a8cb(0x49a),'Flat','Flat1',_0x17a8cb(0x3be)];for(const _0x56f325 of _0x26fd38){let _0x1d1eb6='';if(_0x56f325===_0x4844ea)_0x1d1eb6=_0x17a8cb(0x838);if(_0x56f325===_0x293cbd)_0x1d1eb6=_0x17a8cb(0x386);if(_0x56f325===_0x3c65f2)_0x1d1eb6='sparam';for(const _0x78d003 of _0x2467ec){let _0x2fa57e='%1%2'[_0x17a8cb(0xc1)](_0x1d1eb6,_0x78d003);VisuMZ[_0x17a8cb(0x858)][_0x17a8cb(0x51e)][_0x2fa57e]=[],VisuMZ[_0x17a8cb(0x858)][_0x17a8cb(0x51e)][_0x2fa57e+'JS']=[];let _0x22c22f=_0x17a8cb(0x1bd);if(['Plus',_0x17a8cb(0x53b)][_0x17a8cb(0x250)](_0x78d003))_0x22c22f+=_0x17a8cb(0x2dd);else{if([_0x17a8cb(0x120),_0x17a8cb(0x47f)][_0x17a8cb(0x250)](_0x78d003))_0x22c22f+=_0x17a8cb(0x5ce);else{if([_0x17a8cb(0x798),_0x17a8cb(0x3be)][_0x17a8cb(0x250)](_0x78d003))_0x22c22f+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x78d003===_0x17a8cb(0xf6))_0x22c22f+=_0x17a8cb(0x13f);else{if(_0x78d003==='Rate1')_0x22c22f+=_0x17a8cb(0x7ca);else _0x78d003===_0x17a8cb(0x49a)&&(_0x22c22f+=_0x17a8cb(0x65a));}}}}for(const _0x12e0b3 of _0x56f325){let _0x206432=_0x78d003[_0x17a8cb(0x1b7)](/[\d+]/g,'')[_0x17a8cb(0x491)]();const _0x50a64e=_0x22c22f['format'](_0x12e0b3,_0x206432);VisuMZ['CoreEngine'][_0x17a8cb(0x51e)][_0x2fa57e]['push'](new RegExp(_0x50a64e,'i'));const _0x4c44fe=_0x17a8cb(0x741)[_0x17a8cb(0xc1)](_0x12e0b3,_0x206432);VisuMZ[_0x17a8cb(0x858)][_0x17a8cb(0x51e)][_0x2fa57e+'JS']['push'](new RegExp(_0x4c44fe,'i'));}}}},Scene_Boot[_0x500928(0x358)][_0x500928(0x806)]=function(){const _0x258a2c=_0x500928;if(VisuMZ[_0x258a2c(0x6d8)])return;},Scene_Boot[_0x500928(0x358)][_0x500928(0x5b3)]=function(){const _0x1aa410=_0x500928,_0x32aaa0=VisuMZ[_0x1aa410(0x858)][_0x1aa410(0x17a)];_0x32aaa0['QoL']['OpenConsole']&&VisuMZ[_0x1aa410(0x304)](!![]);_0x32aaa0[_0x1aa410(0xe1)][_0x1aa410(0x64b)]&&(Input[_0x1aa410(0x353)][0x23]=_0x1aa410(0x4b8),Input[_0x1aa410(0x353)][0x24]=_0x1aa410(0x694));if(_0x32aaa0[_0x1aa410(0x155)]){const _0x129c68=_0x32aaa0[_0x1aa410(0x155)];_0x129c68[_0x1aa410(0x71f)]=_0x129c68[_0x1aa410(0x71f)]||_0x1aa410(0x206),_0x129c68[_0x1aa410(0x15e)]=_0x129c68[_0x1aa410(0x15e)]||_0x1aa410(0x283);}_0x32aaa0[_0x1aa410(0x1ce)][_0x1aa410(0xd8)]&&(Input[_0x1aa410(0x353)][0x57]='up',Input['keyMapper'][0x41]=_0x1aa410(0x1f3),Input[_0x1aa410(0x353)][0x53]='down',Input[_0x1aa410(0x353)][0x44]=_0x1aa410(0x73f),Input[_0x1aa410(0x353)][0x45]='pagedown'),_0x32aaa0[_0x1aa410(0x1ce)][_0x1aa410(0x599)]&&(Input[_0x1aa410(0x353)][0x52]=_0x1aa410(0x80a)),_0x32aaa0['Param'][_0x1aa410(0x1a9)]=_0x32aaa0['Param'][_0x1aa410(0x1a9)][_0x1aa410(0x1cd)](_0x5586d5=>_0x5586d5[_0x1aa410(0x491)]()[_0x1aa410(0x886)]()),_0x32aaa0[_0x1aa410(0xd3)][_0x1aa410(0x340)]=_0x32aaa0[_0x1aa410(0xd3)][_0x1aa410(0x340)][_0x1aa410(0x1cd)](_0x140c8c=>_0x140c8c[_0x1aa410(0x491)]()['trim']()),_0x32aaa0[_0x1aa410(0xe1)][_0x1aa410(0x35a)]=_0x32aaa0['QoL'][_0x1aa410(0x35a)]??!![],_0x32aaa0[_0x1aa410(0xe1)][_0x1aa410(0x3a2)]=_0x32aaa0[_0x1aa410(0xe1)][_0x1aa410(0x3a2)]??!![];},Scene_Boot[_0x500928(0x358)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x33accc=_0x500928;this[_0x33accc(0x2d2)]();},Scene_Boot[_0x500928(0x358)][_0x500928(0x2d2)]=function(){const _0xb7c2f1=_0x500928,_0x22fef6=VisuMZ[_0xb7c2f1(0x858)][_0xb7c2f1(0x17a)][_0xb7c2f1(0x733)];for(const _0x54fb59 of _0x22fef6){const _0x5c07ad=_0x54fb59[_0xb7c2f1(0x5b8)][_0xb7c2f1(0x1b7)](/[ ]/g,''),_0xb6f62=_0x54fb59[_0xb7c2f1(0x863)];VisuMZ[_0xb7c2f1(0x858)][_0xb7c2f1(0xf4)](_0x5c07ad,_0xb6f62);}},VisuMZ[_0x500928(0x858)][_0x500928(0xf4)]=function(_0x4787d8,_0x2b0dd4){const _0x1bf40b=_0x500928;if(!!window[_0x4787d8]){if($gameTemp['isPlaytest']())console['log'](_0x1bf40b(0x347)[_0x1bf40b(0xc1)](_0x4787d8));}const _0x41a8f6=_0x1bf40b(0x6b8)[_0x1bf40b(0xc1)](_0x4787d8,_0x2b0dd4);window[_0x4787d8]=new Function(_0x41a8f6);},Scene_Boot[_0x500928(0x358)][_0x500928(0x1b0)]=function(){const _0x15495b=_0x500928,_0x130c87=VisuMZ[_0x15495b(0x858)][_0x15495b(0x17a)][_0x15495b(0x3fb)];if(!_0x130c87)return;for(const _0x52022a of _0x130c87){if(!_0x52022a)continue;VisuMZ['CoreEngine'][_0x15495b(0x83e)](_0x52022a);}},VisuMZ[_0x500928(0x858)][_0x500928(0x526)]={},VisuMZ['CoreEngine'][_0x500928(0x5b5)]={},VisuMZ[_0x500928(0x858)]['CustomParamType']={},VisuMZ[_0x500928(0x858)][_0x500928(0xed)]={},VisuMZ[_0x500928(0x858)]['createCustomParameter']=function(_0x5a720b){const _0x453c23=_0x500928,_0x2fcf7e=_0x5a720b[_0x453c23(0x839)],_0x4b8d87=_0x5a720b[_0x453c23(0x5ad)],_0x244039=_0x5a720b[_0x453c23(0x291)],_0x4be8ca=_0x5a720b[_0x453c23(0x1d8)],_0x583457=new Function(_0x5a720b[_0x453c23(0x60d)]);VisuMZ[_0x453c23(0x858)][_0x453c23(0x526)][_0x2fcf7e[_0x453c23(0x491)]()[_0x453c23(0x886)]()]=_0x4b8d87,VisuMZ[_0x453c23(0x858)]['CustomParamIcons'][_0x2fcf7e[_0x453c23(0x491)]()[_0x453c23(0x886)]()]=_0x244039,VisuMZ[_0x453c23(0x858)]['CustomParamType'][_0x2fcf7e['toUpperCase']()[_0x453c23(0x886)]()]=_0x4be8ca,VisuMZ[_0x453c23(0x858)][_0x453c23(0xed)][_0x2fcf7e['toUpperCase']()[_0x453c23(0x886)]()]=_0x2fcf7e,Object['defineProperty'](Game_BattlerBase[_0x453c23(0x358)],_0x2fcf7e,{'get'(){const _0x25b28f=_0x453c23,_0x15a1b0=_0x583457[_0x25b28f(0x485)](this);return _0x4be8ca===_0x25b28f(0x7b7)?Math['round'](_0x15a1b0):_0x15a1b0;}});},VisuMZ[_0x500928(0x858)][_0x500928(0x6ba)]={},VisuMZ['CoreEngine'][_0x500928(0x1a3)]={},Scene_Boot[_0x500928(0x358)][_0x500928(0x880)]=function(){const _0x41765a=_0x500928,_0x4f9ce1=VisuMZ[_0x41765a(0x858)][_0x41765a(0x17a)][_0x41765a(0x6ba)];for(const _0x186015 of _0x4f9ce1){const _0x2ac218=(_0x186015[_0x41765a(0x177)]||'')[_0x41765a(0x79e)]()['trim'](),_0x5a3885=(_0x186015['Match']||'')[_0x41765a(0x79e)]()[_0x41765a(0x886)]();VisuMZ[_0x41765a(0x858)][_0x41765a(0x6ba)][_0x2ac218]=_0x186015,VisuMZ[_0x41765a(0x858)][_0x41765a(0x1a3)][_0x5a3885]=_0x2ac218;}},VisuMZ[_0x500928(0x6d8)]=function(){const _0x3309b9=_0x500928;for(const _0xa5dd37 of $dataActors){if(_0xa5dd37)VisuMZ[_0x3309b9(0x417)](_0xa5dd37);}for(const _0x273a5b of $dataClasses){if(_0x273a5b)VisuMZ[_0x3309b9(0x31d)](_0x273a5b);}for(const _0x2a0183 of $dataSkills){if(_0x2a0183)VisuMZ['ParseSkillNotetags'](_0x2a0183);}for(const _0x10afa6 of $dataItems){if(_0x10afa6)VisuMZ[_0x3309b9(0x10f)](_0x10afa6);}for(const _0x431c73 of $dataWeapons){if(_0x431c73)VisuMZ[_0x3309b9(0x5f6)](_0x431c73);}for(const _0x44caef of $dataArmors){if(_0x44caef)VisuMZ['ParseArmorNotetags'](_0x44caef);}for(const _0x3c8a38 of $dataEnemies){if(_0x3c8a38)VisuMZ['ParseEnemyNotetags'](_0x3c8a38);}for(const _0x44518e of $dataStates){if(_0x44518e)VisuMZ[_0x3309b9(0x3a6)](_0x44518e);}for(const _0x1628c3 of $dataTilesets){if(_0x1628c3)VisuMZ[_0x3309b9(0x380)](_0x1628c3);}},VisuMZ[_0x500928(0x417)]=function(_0x6d45fd){},VisuMZ[_0x500928(0x31d)]=function(_0x61e16b){},VisuMZ['ParseSkillNotetags']=function(_0x548efc){},VisuMZ[_0x500928(0x10f)]=function(_0x36ae96){},VisuMZ[_0x500928(0x5f6)]=function(_0x20edb7){},VisuMZ[_0x500928(0x31b)]=function(_0x2e802a){},VisuMZ['ParseEnemyNotetags']=function(_0x1bded8){},VisuMZ['ParseStateNotetags']=function(_0x259956){},VisuMZ[_0x500928(0x380)]=function(_0x458ae5){},VisuMZ[_0x500928(0x858)][_0x500928(0x417)]=VisuMZ['ParseActorNotetags'],VisuMZ['ParseActorNotetags']=function(_0xd3e509){const _0x4d40f8=_0x500928;VisuMZ[_0x4d40f8(0x858)][_0x4d40f8(0x417)][_0x4d40f8(0x485)](this,_0xd3e509);const _0x311150=_0xd3e509[_0x4d40f8(0x508)];if(_0x311150['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0xd3e509[_0x4d40f8(0x4ae)]=Number(RegExp['$1']);if(_0xd3e509['maxLevel']===0x0)_0xd3e509['maxLevel']=Number[_0x4d40f8(0x63c)];}_0x311150[_0x4d40f8(0x6ad)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xd3e509[_0x4d40f8(0x443)]=Math[_0x4d40f8(0x2c9)](Number(RegExp['$1']),_0xd3e509['maxLevel']));},VisuMZ[_0x500928(0x858)][_0x500928(0x31d)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x500928(0x31d)]=function(_0x3ef116){const _0x34e7e6=_0x500928;VisuMZ[_0x34e7e6(0x858)][_0x34e7e6(0x31d)]['call'](this,_0x3ef116);if(_0x3ef116['learnings'])for(const _0x1dbb92 of _0x3ef116[_0x34e7e6(0x87d)]){_0x1dbb92[_0x34e7e6(0x508)][_0x34e7e6(0x6ad)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x1dbb92[_0x34e7e6(0x36a)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x500928(0x858)][_0x500928(0x50f)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x500928(0x50f)]=function(_0xcedccf){const _0x450036=_0x500928;VisuMZ['CoreEngine'][_0x450036(0x50f)]['call'](this,_0xcedccf),_0xcedccf[_0x450036(0x36a)]=0x1;const _0x486196=_0xcedccf[_0x450036(0x508)];if(_0x486196[_0x450036(0x6ad)](/<LEVEL:[ ](\d+)>/i))_0xcedccf['level']=Number(RegExp['$1']);if(_0x486196['match'](/<MAXHP:[ ](\d+)>/i))_0xcedccf[_0x450036(0x708)][0x0]=Number(RegExp['$1']);if(_0x486196['match'](/<MAXMP:[ ](\d+)>/i))_0xcedccf['params'][0x1]=Number(RegExp['$1']);if(_0x486196[_0x450036(0x6ad)](/<ATK:[ ](\d+)>/i))_0xcedccf[_0x450036(0x708)][0x2]=Number(RegExp['$1']);if(_0x486196['match'](/<DEF:[ ](\d+)>/i))_0xcedccf['params'][0x3]=Number(RegExp['$1']);if(_0x486196[_0x450036(0x6ad)](/<MAT:[ ](\d+)>/i))_0xcedccf[_0x450036(0x708)][0x4]=Number(RegExp['$1']);if(_0x486196['match'](/<MDF:[ ](\d+)>/i))_0xcedccf['params'][0x5]=Number(RegExp['$1']);if(_0x486196[_0x450036(0x6ad)](/<AGI:[ ](\d+)>/i))_0xcedccf[_0x450036(0x708)][0x6]=Number(RegExp['$1']);if(_0x486196[_0x450036(0x6ad)](/<LUK:[ ](\d+)>/i))_0xcedccf[_0x450036(0x708)][0x7]=Number(RegExp['$1']);if(_0x486196['match'](/<EXP:[ ](\d+)>/i))_0xcedccf[_0x450036(0x5ff)]=Number(RegExp['$1']);if(_0x486196[_0x450036(0x6ad)](/<GOLD:[ ](\d+)>/i))_0xcedccf[_0x450036(0xe6)]=Number(RegExp['$1']);},VisuMZ[_0x500928(0x858)][_0x500928(0x3e2)]=Graphics[_0x500928(0x64a)],Graphics[_0x500928(0x64a)]=function(){const _0x310918=_0x500928;switch(VisuMZ[_0x310918(0x858)][_0x310918(0x17a)][_0x310918(0xe1)][_0x310918(0x80c)]){case _0x310918(0x737):return!![];case _0x310918(0x747):return![];default:return VisuMZ[_0x310918(0x858)]['Graphics_defaultStretchMode']['call'](this);}},VisuMZ['CoreEngine']['Graphics_printError']=Graphics['printError'],Graphics[_0x500928(0x41a)]=function(_0x35a832,_0x377027,_0x4a4a8c=null){const _0x251af8=_0x500928;VisuMZ[_0x251af8(0x858)][_0x251af8(0x102)][_0x251af8(0x485)](this,_0x35a832,_0x377027,_0x4a4a8c),VisuMZ[_0x251af8(0x304)](![]);},VisuMZ[_0x500928(0x858)][_0x500928(0x71c)]=Graphics['_centerElement'],Graphics[_0x500928(0x462)]=function(_0xb17718){const _0x578024=_0x500928;VisuMZ[_0x578024(0x858)]['Graphics_centerElement'][_0x578024(0x485)](this,_0xb17718),this[_0x578024(0x38e)](_0xb17718);},Graphics['_centerElementCoreEngine']=function(_0x549d6a){const _0x18a472=_0x500928;VisuMZ[_0x18a472(0x858)][_0x18a472(0x17a)][_0x18a472(0xe1)]['FontSmoothing']&&(_0x549d6a[_0x18a472(0xcb)][_0x18a472(0x702)]=_0x18a472(0x738));VisuMZ['CoreEngine'][_0x18a472(0x17a)]['QoL'][_0x18a472(0x6f6)]&&(_0x549d6a['style'][_0x18a472(0x814)]=_0x18a472(0x48d));const _0x1a84e6=Math['max'](0x0,Math[_0x18a472(0x64f)](_0x549d6a[_0x18a472(0x7c8)]*this[_0x18a472(0x818)])),_0x1bb68c=Math['max'](0x0,Math['floor'](_0x549d6a[_0x18a472(0x3ff)]*this[_0x18a472(0x818)]));_0x549d6a[_0x18a472(0xcb)][_0x18a472(0x7c8)]=_0x1a84e6+'px',_0x549d6a[_0x18a472(0xcb)][_0x18a472(0x3ff)]=_0x1bb68c+'px';},VisuMZ['CoreEngine'][_0x500928(0x629)]=Bitmap['prototype'][_0x500928(0x32f)],Bitmap[_0x500928(0x358)][_0x500928(0x32f)]=function(_0x7f69f7,_0x19b047){const _0x24625a=_0x500928;VisuMZ[_0x24625a(0x858)]['Bitmap_initialize'][_0x24625a(0x485)](this,_0x7f69f7,_0x19b047),this['_smooth']=!(VisuMZ[_0x24625a(0x858)][_0x24625a(0x17a)][_0x24625a(0xe1)][_0x24625a(0x6f6)]??!![]);},Bitmap[_0x500928(0x358)][_0x500928(0x4e8)]=function(){const _0x2c2c16=_0x500928;this[_0x2c2c16(0x73a)]=!![];},VisuMZ[_0x500928(0x858)][_0x500928(0x77d)]=Sprite[_0x500928(0x358)]['destroy'],Sprite[_0x500928(0x358)][_0x500928(0x7b4)]=function(){const _0x27acea=_0x500928;if(this[_0x27acea(0x384)])VisuMZ['CoreEngine'][_0x27acea(0x77d)]['call'](this);this[_0x27acea(0x88a)]();},Sprite['prototype'][_0x500928(0x88a)]=function(){const _0x87a882=_0x500928;if(!this[_0x87a882(0x7eb)])return;if(!this[_0x87a882(0x7eb)][_0x87a882(0x73a)])return;this[_0x87a882(0x7eb)][_0x87a882(0x1b5)]&&!this[_0x87a882(0x27c)][_0x87a882(0x1b5)][_0x87a882(0x849)]&&this[_0x87a882(0x7eb)][_0x87a882(0x7b4)]();},VisuMZ[_0x500928(0x858)]['Bitmap_resize']=Bitmap[_0x500928(0x358)][_0x500928(0x523)],Bitmap[_0x500928(0x358)][_0x500928(0x523)]=function(_0x2317c4,_0x54bec0){const _0x5f2eae=_0x500928;VisuMZ[_0x5f2eae(0x858)][_0x5f2eae(0x714)][_0x5f2eae(0x485)](this,_0x2317c4,_0x54bec0),this[_0x5f2eae(0x4e8)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x4c5)]=Bitmap[_0x500928(0x358)][_0x500928(0x422)],Bitmap[_0x500928(0x358)][_0x500928(0x422)]=function(_0x1730f2,_0x5666f7,_0x36294e,_0x1901a1,_0x78d2bf,_0x3a15a4,_0x992720,_0xed4b3c,_0x51b10b){const _0x3b3123=_0x500928;_0x5666f7=Math['round'](_0x5666f7),_0x36294e=Math[_0x3b3123(0x7a6)](_0x36294e),_0x1901a1=Math[_0x3b3123(0x7a6)](_0x1901a1),_0x78d2bf=Math[_0x3b3123(0x7a6)](_0x78d2bf),_0x3a15a4=Math[_0x3b3123(0x7a6)](_0x3a15a4),_0x992720=Math['round'](_0x992720),VisuMZ[_0x3b3123(0x858)][_0x3b3123(0x4c5)][_0x3b3123(0x485)](this,_0x1730f2,_0x5666f7,_0x36294e,_0x1901a1,_0x78d2bf,_0x3a15a4,_0x992720,_0xed4b3c,_0x51b10b),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x500928(0x6dc)]=Bitmap[_0x500928(0x358)][_0x500928(0x5d6)],Bitmap[_0x500928(0x358)][_0x500928(0x5d6)]=function(_0x109319,_0x384339,_0x387690,_0x19ad99){const _0x526cec=_0x500928;VisuMZ[_0x526cec(0x858)][_0x526cec(0x6dc)][_0x526cec(0x485)](this,_0x109319,_0x384339,_0x387690,_0x19ad99),this[_0x526cec(0x4e8)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x21f)]=Bitmap['prototype'][_0x500928(0x74f)],Bitmap[_0x500928(0x358)]['fillRect']=function(_0x248a24,_0x164541,_0x52ed5f,_0x551af5,_0x43ac4b){const _0x30e338=_0x500928;VisuMZ[_0x30e338(0x858)][_0x30e338(0x21f)]['call'](this,_0x248a24,_0x164541,_0x52ed5f,_0x551af5,_0x43ac4b),this['markCoreEngineModified']();},VisuMZ[_0x500928(0x858)][_0x500928(0x416)]=Bitmap[_0x500928(0x358)][_0x500928(0x7cc)],Bitmap[_0x500928(0x358)][_0x500928(0x7cc)]=function(_0x1ccc1e,_0x388cc0,_0x2bea0a,_0x1c2ed0,_0x2ebb14){const _0x80f932=_0x500928;VisuMZ['CoreEngine'][_0x80f932(0x416)][_0x80f932(0x485)](this,_0x1ccc1e,_0x388cc0,_0x2bea0a,_0x1c2ed0,_0x2ebb14),this[_0x80f932(0x4e8)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x1f5)]=Bitmap['prototype'][_0x500928(0x501)],Bitmap[_0x500928(0x358)][_0x500928(0x501)]=function(_0x145905,_0x24a5a8,_0x4f5c26,_0x5c5158,_0x74ef39,_0x257092,_0x8dc739){const _0x4e48=_0x500928;VisuMZ[_0x4e48(0x858)][_0x4e48(0x1f5)][_0x4e48(0x485)](this,_0x145905,_0x24a5a8,_0x4f5c26,_0x5c5158,_0x74ef39,_0x257092,_0x8dc739),this[_0x4e48(0x4e8)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x1ba)]=Bitmap[_0x500928(0x358)]['drawCircle'],Bitmap[_0x500928(0x358)][_0x500928(0x23c)]=function(_0x2f0311,_0x3d6c1b,_0x312e23,_0x465180){const _0x1d25e3=_0x500928;_0x2f0311=Math[_0x1d25e3(0x7a6)](_0x2f0311),_0x3d6c1b=Math[_0x1d25e3(0x7a6)](_0x3d6c1b),_0x312e23=Math[_0x1d25e3(0x7a6)](_0x312e23),VisuMZ[_0x1d25e3(0x858)]['Bitmap_drawCircle'][_0x1d25e3(0x485)](this,_0x2f0311,_0x3d6c1b,_0x312e23,_0x465180),this[_0x1d25e3(0x4e8)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x5c5)]=Bitmap['prototype'][_0x500928(0x29b)],Bitmap[_0x500928(0x358)][_0x500928(0x29b)]=function(_0xb7f433){const _0x2f490a=_0x500928;return Math[_0x2f490a(0x6fd)](VisuMZ[_0x2f490a(0x858)][_0x2f490a(0x5c5)]['call'](this,_0xb7f433));},VisuMZ[_0x500928(0x858)]['Bitmap_drawText']=Bitmap[_0x500928(0x358)]['drawText'],Bitmap[_0x500928(0x358)][_0x500928(0x55e)]=function(_0x174fb4,_0x2f4675,_0x1f1c53,_0x2a70c4,_0x1db3a3,_0x295996){const _0x1468b8=_0x500928;_0x2f4675=Math['round'](_0x2f4675),_0x1f1c53=Math[_0x1468b8(0x7a6)](_0x1f1c53),_0x2a70c4=Math[_0x1468b8(0x6fd)](_0x2a70c4),_0x1db3a3=Math['ceil'](_0x1db3a3),VisuMZ[_0x1468b8(0x858)][_0x1468b8(0x6fa)]['call'](this,_0x174fb4,_0x2f4675,_0x1f1c53,_0x2a70c4,_0x1db3a3,_0x295996),this[_0x1468b8(0x4e8)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x1e3)]=Bitmap[_0x500928(0x358)][_0x500928(0x10d)],Bitmap[_0x500928(0x358)][_0x500928(0x10d)]=function(_0x7b3c03,_0x5c29cb,_0x42691e,_0x51bc03){const _0x21b311=_0x500928;VisuMZ['CoreEngine'][_0x21b311(0x17a)][_0x21b311(0xe1)][_0x21b311(0x322)]?this[_0x21b311(0x758)](_0x7b3c03,_0x5c29cb,_0x42691e,_0x51bc03):VisuMZ[_0x21b311(0x858)][_0x21b311(0x1e3)][_0x21b311(0x485)](this,_0x7b3c03,_0x5c29cb,_0x42691e,_0x51bc03);},Bitmap[_0x500928(0x358)][_0x500928(0x758)]=function(_0xa72249,_0x1f7ad5,_0xd71394,_0x46f0a1){const _0x1053ef=_0x500928,_0x577800=this['context'];_0x577800[_0x1053ef(0x5c7)]=this[_0x1053ef(0x56a)],_0x577800['fillText'](_0xa72249,_0x1f7ad5+0x2,_0xd71394+0x2,_0x46f0a1);},VisuMZ[_0x500928(0x858)][_0x500928(0x366)]=Input['clear'],Input[_0x500928(0x281)]=function(){const _0x5676dc=_0x500928;VisuMZ[_0x5676dc(0x858)][_0x5676dc(0x366)][_0x5676dc(0x485)](this),this[_0x5676dc(0x646)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x5676dc(0x1e5)]=Input['keyRepeatWait'];},VisuMZ['CoreEngine'][_0x500928(0x238)]=Input['update'],Input[_0x500928(0x836)]=function(){const _0x2eabe1=_0x500928;VisuMZ[_0x2eabe1(0x858)][_0x2eabe1(0x238)]['call'](this);if(this['_gamepadWait'])this[_0x2eabe1(0x1e5)]--;},VisuMZ[_0x500928(0x858)][_0x500928(0xe7)]=Input['_pollGamepads'],Input[_0x500928(0x76a)]=function(){const _0x1a5998=_0x500928;if(this[_0x1a5998(0x1e5)])return;VisuMZ[_0x1a5998(0x858)][_0x1a5998(0xe7)][_0x1a5998(0x485)](this);},VisuMZ[_0x500928(0x858)][_0x500928(0x78c)]=Input[_0x500928(0x115)],Input[_0x500928(0x115)]=function(){const _0x3978f9=_0x500928;VisuMZ[_0x3978f9(0x858)]['Input_setupEventHandlers']['call'](this),document['addEventListener'](_0x3978f9(0x50d),this[_0x3978f9(0x575)][_0x3978f9(0x59d)](this));},VisuMZ[_0x500928(0x858)][_0x500928(0xda)]=Input['_onKeyDown'],Input[_0x500928(0x34a)]=function(_0x4bcc3a){const _0x2eacf4=_0x500928;this['_inputSpecialKeyCode']=_0x4bcc3a['keyCode'],VisuMZ['CoreEngine'][_0x2eacf4(0xda)][_0x2eacf4(0x485)](this,_0x4bcc3a),this[_0x2eacf4(0x388)](null);},Input[_0x500928(0x575)]=function(_0x861ba){const _0x533274=_0x500928;this[_0x533274(0x7ba)](_0x861ba);},Input[_0x500928(0x7ba)]=function(_0x26f73c){const _0x5b95c7=_0x500928;this[_0x5b95c7(0x682)]=_0x26f73c[_0x5b95c7(0x820)];let _0x5e510f=String['fromCharCode'](_0x26f73c['charCode']);this[_0x5b95c7(0x646)]===undefined?this['_inputString']=_0x5e510f:this[_0x5b95c7(0x646)]+=_0x5e510f;},VisuMZ[_0x500928(0x858)]['Input_shouldPreventDefault']=Input[_0x500928(0xf2)],Input['_shouldPreventDefault']=function(_0x223ac4){const _0x34dc12=_0x500928;if(_0x223ac4===0x8)return![];return VisuMZ[_0x34dc12(0x858)][_0x34dc12(0x372)][_0x34dc12(0x485)](this,_0x223ac4);},Input[_0x500928(0xdf)]=function(_0x1f249){const _0x2fb85c=_0x500928;if(_0x1f249[_0x2fb85c(0x6ad)](/backspace/i))return this[_0x2fb85c(0x682)]===0x8;if(_0x1f249[_0x2fb85c(0x6ad)](/enter/i))return this[_0x2fb85c(0x682)]===0xd;if(_0x1f249['match'](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x500928(0x2a5)]=function(){const _0x579168=_0x500928;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x579168(0x70b)](this[_0x579168(0x682)]);},Input[_0x500928(0x584)]=function(){const _0x1cc614=_0x500928;return[0x25,0x26,0x27,0x28][_0x1cc614(0x70b)](this['_inputSpecialKeyCode']);},Input[_0x500928(0x1ea)]=function(){const _0x46ae22=_0x500928;if(navigator[_0x46ae22(0x632)]){const _0x1d17b4=navigator[_0x46ae22(0x632)]();if(_0x1d17b4)for(const _0x587e20 of _0x1d17b4){if(_0x587e20&&_0x587e20[_0x46ae22(0x3a0)])return!![];}}return![];},Input[_0x500928(0x265)]=function(){const _0x5d9e54=_0x500928;if(navigator['getGamepads']){const _0x42ec61=navigator[_0x5d9e54(0x632)]();if(_0x42ec61)for(const _0x1262f5 of _0x42ec61){if(_0x1262f5&&_0x1262f5['connected']){if(this[_0x5d9e54(0x44a)](_0x1262f5))return!![];if(this[_0x5d9e54(0x39c)](_0x1262f5))return!![];}}}return![];},Input['isGamepadButtonPressed']=function(_0x2f1f4d){const _0x1a2dd4=_0x2f1f4d['buttons'];for(let _0x373fc0=0x0;_0x373fc0<_0x1a2dd4['length'];_0x373fc0++){if(_0x1a2dd4[_0x373fc0]['pressed'])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0xd6e45b){const _0xb3c311=_0xd6e45b['axes'],_0x4a3a29=0.5;if(_0xb3c311[0x0]<-_0x4a3a29)return!![];if(_0xb3c311[0x0]>_0x4a3a29)return!![];if(_0xb3c311[0x1]<-_0x4a3a29)return!![];if(_0xb3c311[0x1]>_0x4a3a29)return!![];return![];},Input[_0x500928(0x348)]=function(){return this['_lastGamepad']||null;},Input[_0x500928(0x388)]=function(_0x2f76b8){const _0x317b58=_0x500928;this[_0x317b58(0x51d)]=_0x2f76b8;},VisuMZ[_0x500928(0x858)]['Input_updateGamepadState']=Input[_0x500928(0x52b)],Input[_0x500928(0x52b)]=function(_0xab1aa9){const _0x110623=_0x500928;VisuMZ['CoreEngine'][_0x110623(0x3c1)]['call'](this,_0xab1aa9),(this[_0x110623(0x44a)](_0xab1aa9)||this[_0x110623(0x39c)](_0xab1aa9))&&this['setLastGamepadUsed'](_0xab1aa9);},Input[_0x500928(0x6da)]=function(){const _0x25d541=_0x500928;return this[_0x25d541(0x51d)]?this[_0x25d541(0x51d)]['id']:_0x25d541(0x309);},VisuMZ[_0x500928(0x858)][_0x500928(0x835)]=Tilemap[_0x500928(0x358)][_0x500928(0x1ca)],Tilemap[_0x500928(0x358)][_0x500928(0x1ca)]=function(_0x1ba567,_0x376139,_0x27176e,_0x4ccbf4){const _0x3b9860=_0x500928;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ['CoreEngine'][_0x3b9860(0x835)][_0x3b9860(0x485)](this,_0x1ba567,_0x376139,_0x27176e,_0x4ccbf4);},Tilemap[_0x500928(0x1d6)][_0x500928(0x358)][_0x500928(0xcf)]=function(){const _0x13f78e=_0x500928;this[_0x13f78e(0x5c8)]();for(let _0x165dc4=0x0;_0x165dc4<Tilemap[_0x13f78e(0x7f0)][_0x13f78e(0x272)];_0x165dc4++){const _0x3e5beb=new PIXI['BaseTexture']();_0x3e5beb[_0x13f78e(0x757)](0x800,0x800),VisuMZ[_0x13f78e(0x858)][_0x13f78e(0x17a)][_0x13f78e(0xe1)][_0x13f78e(0x6f6)]&&(_0x3e5beb['scaleMode']=PIXI[_0x13f78e(0x84a)][_0x13f78e(0x846)]),this[_0x13f78e(0x842)][_0x13f78e(0x719)](_0x3e5beb);}},WindowLayer[_0x500928(0x358)][_0x500928(0x4ba)]=function(){const _0x127b92=_0x500928;return SceneManager&&SceneManager[_0x127b92(0x307)]?SceneManager[_0x127b92(0x307)][_0x127b92(0x783)]():!![];},VisuMZ[_0x500928(0x858)][_0x500928(0x4c3)]=WindowLayer[_0x500928(0x358)]['render'],WindowLayer[_0x500928(0x358)]['render']=function render(_0xab96be){const _0x24a428=_0x500928;this[_0x24a428(0x4ba)]()?VisuMZ[_0x24a428(0x858)][_0x24a428(0x4c3)][_0x24a428(0x485)](this,_0xab96be):this[_0x24a428(0x233)](_0xab96be);},WindowLayer[_0x500928(0x358)][_0x500928(0x233)]=function render(_0x271ec6){const _0x14b756=_0x500928;if(!this['visible'])return;const _0x529a1c=new PIXI['Graphics'](),_0x443fae=_0x271ec6['gl'],_0x23ccef=this[_0x14b756(0x30e)][_0x14b756(0x777)]();_0x271ec6[_0x14b756(0x511)][_0x14b756(0x11f)](),_0x529a1c[_0x14b756(0x778)]=this[_0x14b756(0x778)],_0x271ec6[_0x14b756(0x1b2)][_0x14b756(0x84f)](),_0x443fae[_0x14b756(0x67d)](_0x443fae[_0x14b756(0x6ca)]);while(_0x23ccef['length']>0x0){const _0x3386ca=_0x23ccef['shift']();_0x3386ca[_0x14b756(0x15d)]&&_0x3386ca[_0x14b756(0x3a8)]&&_0x3386ca[_0x14b756(0x7ec)]>0x0&&(_0x443fae[_0x14b756(0x26e)](_0x443fae[_0x14b756(0x55b)],0x0,~0x0),_0x443fae[_0x14b756(0x17b)](_0x443fae[_0x14b756(0x82e)],_0x443fae[_0x14b756(0x82e)],_0x443fae[_0x14b756(0x82e)]),_0x3386ca[_0x14b756(0x444)](_0x271ec6),_0x271ec6[_0x14b756(0x1b2)][_0x14b756(0x84f)](),_0x529a1c[_0x14b756(0x281)](),_0x443fae[_0x14b756(0x26e)](_0x443fae[_0x14b756(0x57a)],0x1,~0x0),_0x443fae[_0x14b756(0x17b)](_0x443fae[_0x14b756(0x424)],_0x443fae[_0x14b756(0x424)],_0x443fae[_0x14b756(0x424)]),_0x443fae[_0x14b756(0x622)](_0x443fae['ZERO'],_0x443fae[_0x14b756(0xec)]),_0x529a1c[_0x14b756(0x444)](_0x271ec6),_0x271ec6[_0x14b756(0x1b2)][_0x14b756(0x84f)](),_0x443fae[_0x14b756(0x622)](_0x443fae[_0x14b756(0xec)],_0x443fae[_0x14b756(0x148)]));}_0x443fae[_0x14b756(0x550)](_0x443fae[_0x14b756(0x6ca)]),_0x443fae['clear'](_0x443fae[_0x14b756(0x69d)]),_0x443fae[_0x14b756(0x14b)](0x0),_0x271ec6[_0x14b756(0x1b2)][_0x14b756(0x84f)]();for(const _0x359b7d of this[_0x14b756(0x30e)]){!_0x359b7d[_0x14b756(0x15d)]&&_0x359b7d[_0x14b756(0x3a8)]&&_0x359b7d[_0x14b756(0x444)](_0x271ec6);}_0x271ec6[_0x14b756(0x1b2)][_0x14b756(0x84f)]();},DataManager[_0x500928(0x1ad)]=function(_0x871e7d){const _0x410f9d=_0x500928;return this[_0x410f9d(0x463)](_0x871e7d)&&_0x871e7d[_0x410f9d(0x70a)]===0x2;},VisuMZ['CoreEngine'][_0x500928(0x7a9)]=DataManager[_0x500928(0x146)],DataManager[_0x500928(0x146)]=function(){const _0x5be70c=_0x500928;VisuMZ['CoreEngine'][_0x5be70c(0x7a9)][_0x5be70c(0x485)](this),this[_0x5be70c(0x338)](),this[_0x5be70c(0x251)]();},DataManager[_0x500928(0x338)]=function(){const _0x2f7480=_0x500928;if($gameTemp[_0x2f7480(0x290)]()){const _0x5803f3=VisuMZ[_0x2f7480(0x858)]['Settings'][_0x2f7480(0xe1)]['NewGameCommonEvent'];if(_0x5803f3>0x0)$gameTemp[_0x2f7480(0x47d)](_0x5803f3);}},DataManager[_0x500928(0x251)]=function(){const _0x246500=_0x500928,_0x2c65ce=VisuMZ[_0x246500(0x858)]['Settings']['QoL'][_0x246500(0x1ae)]||0x0;if(_0x2c65ce>0x0)$gameTemp[_0x246500(0x47d)](_0x2c65ce);},DataManager[_0x500928(0x232)]=function(_0x17b49e){const _0x4489a5=_0x500928,_0x50b7ac=$dataTroops[_0x17b49e];if(!_0x50b7ac)return'';let _0x2fe961='';_0x2fe961+=_0x50b7ac[_0x4489a5(0x725)];for(const _0x3b1406 of _0x50b7ac[_0x4489a5(0x673)]){for(const _0x35fb37 of _0x3b1406['list']){[0x6c,0x198][_0x4489a5(0x250)](_0x35fb37['code'])&&(_0x2fe961+='\x0a',_0x2fe961+=_0x35fb37[_0x4489a5(0x45b)][0x0]);}}return _0x2fe961;};function _0x455b(_0x522656,_0x24da38){const _0x34d487=_0x34d4();return _0x455b=function(_0x455b89,_0x541c89){_0x455b89=_0x455b89-0xbc;let _0x3d04e8=_0x34d487[_0x455b89];return _0x3d04e8;},_0x455b(_0x522656,_0x24da38);}(VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0xe1)]['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x500928(0x858)][_0x500928(0x4cc)]=Scene_Base[_0x500928(0x358)][_0x500928(0x5a4)],Scene_Base[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0x510722=_0x500928;VisuMZ[_0x510722(0x858)][_0x510722(0x4cc)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x500928(0x858)]['Scene_Map_createSpriteset']=Scene_Map[_0x500928(0x358)][_0x500928(0x85a)],Scene_Map[_0x500928(0x358)][_0x500928(0x85a)]=function(){const _0x5a266b=_0x500928;VisuMZ[_0x5a266b(0x858)][_0x5a266b(0x19d)]['call'](this),$spriteset=this[_0x5a266b(0x871)];},VisuMZ[_0x500928(0x858)][_0x500928(0x147)]=Scene_Battle[_0x500928(0x358)][_0x500928(0x85a)],Scene_Battle[_0x500928(0x358)][_0x500928(0x85a)]=function(){const _0x1249a0=_0x500928;VisuMZ[_0x1249a0(0x858)][_0x1249a0(0x147)][_0x1249a0(0x485)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x500928(0x858)][_0x500928(0x75d)]=Scene_Base[_0x500928(0x358)][_0x500928(0x7f9)],Scene_Base[_0x500928(0x358)][_0x500928(0x7f9)]=function(){const _0x2136c8=_0x500928;VisuMZ[_0x2136c8(0x858)]['Scene_Base_terminate'][_0x2136c8(0x485)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine']['BattleManager_update']=BattleManager['update'],BattleManager[_0x500928(0x836)]=function(_0x290f6d){const _0x6432a3=_0x500928;VisuMZ[_0x6432a3(0x858)][_0x6432a3(0x808)][_0x6432a3(0x485)](this,_0x290f6d),$subject=this[_0x6432a3(0x5bb)],$targets=this['_targets'],$target=this[_0x6432a3(0x6b0)]||this[_0x6432a3(0x255)][0x0];},$event=null,VisuMZ[_0x500928(0x858)]['Game_Event_start']=Game_Event[_0x500928(0x358)]['start'],Game_Event[_0x500928(0x358)]['start']=function(){const _0x2d3d02=_0x500928;VisuMZ[_0x2d3d02(0x858)][_0x2d3d02(0x2f4)]['call'](this),$event=this;},VisuMZ[_0x500928(0x858)][_0x500928(0x4b4)]=Scene_Map['prototype'][_0x500928(0x836)],Scene_Map[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x391213=_0x500928;VisuMZ[_0x391213(0x858)][_0x391213(0x4b4)][_0x391213(0x485)](this),$gameMap[_0x391213(0x475)]();},Game_Map[_0x500928(0x358)][_0x500928(0x475)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x5b52b5){const _0x1c6f77=_0x500928;if($gameTemp)$gameTemp[_0x1c6f77(0x47d)](_0x5b52b5);},$onceParallel=function(_0x5685c4,_0x18b8de){const _0x3044f8=_0x500928;if(SceneManager['isSceneMap']())$scene[_0x3044f8(0x661)](_0x5685c4,_0x18b8de);else{if(SceneManager[_0x3044f8(0x750)]()){if(Imported[_0x3044f8(0x117)])$scene[_0x3044f8(0x661)](_0x5685c4);else $gameTemp&&$gameTemp[_0x3044f8(0x290)]()&&alert(_0x3044f8(0x1f7));}else $gameTemp&&$gameTemp[_0x3044f8(0x290)]()&&alert(_0x3044f8(0x4e5));}});;StorageManager[_0x500928(0x2b3)]=function(_0x23b4d4){return new Promise((_0x2dcf48,_0x1321db)=>{const _0xdc8b26=_0x455b;try{const _0x4fff8b=pako[_0xdc8b26(0x49e)](_0x23b4d4,{'to':'string','level':0x1});if(_0x4fff8b[_0xdc8b26(0x12e)]>=0xc350){}_0x2dcf48(_0x4fff8b);}catch(_0x2f9425){_0x1321db(_0x2f9425);}});},TextManager['stringKeyMap']=['','','',_0x500928(0x168),'','',_0x500928(0x7b3),'','BACKSPACE',_0x500928(0x3f3),'','',_0x500928(0x6c6),'ENTER',_0x500928(0x85c),'',_0x500928(0x504),_0x500928(0x54e),_0x500928(0x588),_0x500928(0x69b),_0x500928(0x4e3),_0x500928(0x885),_0x500928(0x52c),'JUNJA',_0x500928(0x245),_0x500928(0x50b),'','ESC',_0x500928(0x487),_0x500928(0x7b2),_0x500928(0x38c),_0x500928(0x2e7),_0x500928(0x853),'PGUP',_0x500928(0x563),'END','HOME',_0x500928(0x1b1),'UP',_0x500928(0x22f),_0x500928(0x2ce),_0x500928(0x564),_0x500928(0x5e1),_0x500928(0x191),_0x500928(0x6ab),_0x500928(0x7b0),_0x500928(0x29f),'','0','1','2','3','4','5','6','7','8','9',_0x500928(0x51a),_0x500928(0x727),'LESS_THAN','EQUALS',_0x500928(0x394),_0x500928(0x45d),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x500928(0x5b0),'',_0x500928(0x40d),'',_0x500928(0x184),'NUMPAD0',_0x500928(0x267),_0x500928(0x57e),_0x500928(0x34b),_0x500928(0x3b6),'NUMPAD5','NUMPAD6',_0x500928(0x748),_0x500928(0x833),_0x500928(0x269),'MULTIPLY','ADD','SEPARATOR',_0x500928(0x18b),'DECIMAL',_0x500928(0x229),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x500928(0x181),_0x500928(0x70d),'F12','F13',_0x500928(0x273),'F15',_0x500928(0x572),'F17',_0x500928(0x29d),_0x500928(0x73e),_0x500928(0x37a),_0x500928(0x5ec),'F22',_0x500928(0x555),_0x500928(0x16c),'','','','','','','','','NUM_LOCK',_0x500928(0x2a6),'WIN_OEM_FJ_JISHO','WIN_OEM_FJ_MASSHOU',_0x500928(0x14c),_0x500928(0x626),_0x500928(0x761),'','','','','','','','','',_0x500928(0x61e),_0x500928(0x2d7),_0x500928(0x459),_0x500928(0x3c2),_0x500928(0x381),_0x500928(0x17e),_0x500928(0x57b),_0x500928(0x22a),'OPEN_PAREN',_0x500928(0x754),_0x500928(0x254),'PLUS',_0x500928(0x35b),'HYPHEN_MINUS',_0x500928(0x4c9),_0x500928(0x22c),'TILDE','','','','','VOLUME_MUTE','VOLUME_DOWN',_0x500928(0x1dd),'','',_0x500928(0x727),_0x500928(0x246),_0x500928(0x7fd),_0x500928(0x686),_0x500928(0x31e),_0x500928(0x1be),_0x500928(0x615),'','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET',_0x500928(0x186),_0x500928(0x685),_0x500928(0x558),'','META',_0x500928(0x1c1),'',_0x500928(0x753),_0x500928(0x37d),'','WIN_ICO_CLEAR','','','WIN_OEM_RESET',_0x500928(0x61d),'WIN_OEM_PA1',_0x500928(0x5f8),_0x500928(0x4a1),_0x500928(0x5b4),_0x500928(0x18d),_0x500928(0x144),'WIN_OEM_FINISH','WIN_OEM_COPY',_0x500928(0x650),_0x500928(0x36f),_0x500928(0x427),_0x500928(0x151),_0x500928(0x6c7),'EXSEL','EREOF','PLAY',_0x500928(0x195),'',_0x500928(0x696),'WIN_OEM_CLEAR',''],TextManager[_0x500928(0x2a1)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x155)][_0x500928(0x831)],TextManager[_0x500928(0x6b4)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x155)][_0x500928(0x620)],TextManager[_0x500928(0x13e)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x155)]['SwitchActorText'],VisuMZ[_0x500928(0x858)][_0x500928(0x2b1)]=TextManager['param'],TextManager[_0x500928(0x838)]=function(_0x4ba173){const _0x547d0d=_0x500928;return typeof _0x4ba173===_0x547d0d(0x5c3)?VisuMZ[_0x547d0d(0x858)][_0x547d0d(0x2b1)][_0x547d0d(0x485)](this,_0x4ba173):this[_0x547d0d(0x884)](_0x4ba173);},TextManager[_0x500928(0x884)]=function(_0x119927){const _0x202619=_0x500928;_0x119927=String(_0x119927||'')[_0x202619(0x491)]();const _0x25ad27=VisuMZ[_0x202619(0x858)][_0x202619(0x17a)]['Param'];if(_0x119927==='MAXHP')return $dataSystem[_0x202619(0x58c)][_0x202619(0x708)][0x0];if(_0x119927===_0x202619(0x472))return $dataSystem[_0x202619(0x58c)][_0x202619(0x708)][0x1];if(_0x119927==='ATK')return $dataSystem[_0x202619(0x58c)][_0x202619(0x708)][0x2];if(_0x119927===_0x202619(0x129))return $dataSystem[_0x202619(0x58c)]['params'][0x3];if(_0x119927===_0x202619(0x4ca))return $dataSystem['terms'][_0x202619(0x708)][0x4];if(_0x119927==='MDF')return $dataSystem[_0x202619(0x58c)]['params'][0x5];if(_0x119927===_0x202619(0x2cf))return $dataSystem[_0x202619(0x58c)][_0x202619(0x708)][0x6];if(_0x119927==='LUK')return $dataSystem[_0x202619(0x58c)][_0x202619(0x708)][0x7];if(_0x119927===_0x202619(0x4ed))return _0x25ad27[_0x202619(0x3e0)];if(_0x119927===_0x202619(0x419))return _0x25ad27['XParamVocab1'];if(_0x119927===_0x202619(0x75a))return _0x25ad27[_0x202619(0x767)];if(_0x119927===_0x202619(0x2ca))return _0x25ad27['XParamVocab3'];if(_0x119927===_0x202619(0x64c))return _0x25ad27['XParamVocab4'];if(_0x119927==='MRF')return _0x25ad27[_0x202619(0x85d)];if(_0x119927===_0x202619(0x5d2))return _0x25ad27[_0x202619(0x538)];if(_0x119927===_0x202619(0x81f))return _0x25ad27[_0x202619(0x7fb)];if(_0x119927===_0x202619(0x121))return _0x25ad27[_0x202619(0x837)];if(_0x119927===_0x202619(0x484))return _0x25ad27[_0x202619(0x465)];if(_0x119927==='TGR')return _0x25ad27[_0x202619(0x301)];if(_0x119927===_0x202619(0x3f2))return _0x25ad27[_0x202619(0x5df)];if(_0x119927===_0x202619(0x4e0))return _0x25ad27[_0x202619(0x6bf)];if(_0x119927==='PHA')return _0x25ad27['SParamVocab3'];if(_0x119927===_0x202619(0x41e))return _0x25ad27['SParamVocab4'];if(_0x119927===_0x202619(0x402))return _0x25ad27[_0x202619(0x79c)];if(_0x119927===_0x202619(0x83d))return _0x25ad27['SParamVocab6'];if(_0x119927===_0x202619(0x4ef))return _0x25ad27['SParamVocab7'];if(_0x119927===_0x202619(0x62f))return _0x25ad27[_0x202619(0x20b)];if(_0x119927===_0x202619(0x518))return _0x25ad27['SParamVocab9'];if(VisuMZ[_0x202619(0x858)][_0x202619(0x526)][_0x119927])return VisuMZ[_0x202619(0x858)][_0x202619(0x526)][_0x119927];return'';},TextManager[_0x500928(0x800)]=function(_0x5d99e4){const _0x4c82d1=_0x500928,_0x4439d4=Input[_0x4c82d1(0x6da)]();return _0x4439d4==='Keyboard'?this[_0x4c82d1(0x574)](_0x5d99e4):this[_0x4c82d1(0x345)](_0x4439d4,_0x5d99e4);},TextManager['getKeyboardInputButtonString']=function(_0x5e034c){const _0x2c9387=_0x500928,_0x45ffc4=VisuMZ[_0x2c9387(0x858)][_0x2c9387(0x17a)][_0x2c9387(0x155)][_0x2c9387(0x787)];if(!_0x45ffc4){if(_0x5e034c===_0x2c9387(0xd2))_0x5e034c=_0x2c9387(0x2dc);if(_0x5e034c===_0x2c9387(0x3da))_0x5e034c='escape';}let _0x120e5a=[];for(let _0x575cc3 in Input[_0x2c9387(0x353)]){_0x575cc3=Number(_0x575cc3);if(_0x575cc3>=0x60&&_0x575cc3<=0x69)continue;if([0x12,0x20]['includes'](_0x575cc3))continue;_0x5e034c===Input[_0x2c9387(0x353)][_0x575cc3]&&_0x120e5a[_0x2c9387(0x719)](_0x575cc3);}for(let _0x4a86aa=0x0;_0x4a86aa<_0x120e5a[_0x2c9387(0x12e)];_0x4a86aa++){_0x120e5a[_0x4a86aa]=TextManager[_0x2c9387(0x477)][_0x120e5a[_0x4a86aa]];}return this['makeInputButtonString'](_0x120e5a);},TextManager['makeInputButtonString']=function(_0x508f03){const _0x58c77d=_0x500928,_0x26efa3=VisuMZ['CoreEngine'][_0x58c77d(0x17a)][_0x58c77d(0x155)],_0x3f7221=_0x26efa3[_0x58c77d(0x39b)],_0x34bb31=_0x508f03[_0x58c77d(0x1da)](),_0xe84cef='Key%1'['format'](_0x34bb31);return _0x26efa3[_0xe84cef]?_0x26efa3[_0xe84cef]:_0x3f7221[_0x58c77d(0xc1)](_0x34bb31);},TextManager[_0x500928(0x3f8)]=function(_0x4e7240,_0x16aa8c){const _0x259bda=_0x500928,_0x3a677e=VisuMZ[_0x259bda(0x858)][_0x259bda(0x17a)]['ButtonAssist'],_0x5776ca=_0x3a677e[_0x259bda(0xe0)],_0x1405a4=this[_0x259bda(0x800)](_0x4e7240),_0x4db3d2=this[_0x259bda(0x800)](_0x16aa8c);return _0x5776ca[_0x259bda(0xc1)](_0x1405a4,_0x4db3d2);},TextManager[_0x500928(0x345)]=function(_0x58e52b,_0x1a4f89){const _0x1910ef=_0x500928,_0x1538d6=_0x58e52b[_0x1910ef(0x79e)]()['trim'](),_0x149337=VisuMZ[_0x1910ef(0x858)]['ControllerButtons'][_0x1538d6];if(!_0x149337)return this[_0x1910ef(0x31c)](_0x58e52b,_0x1a4f89);return _0x149337[_0x1a4f89]||this[_0x1910ef(0x574)](_0x58e52b,_0x1a4f89);},TextManager[_0x500928(0x31c)]=function(_0x228a8b,_0xa8b95a){const _0x3b5867=_0x500928,_0xf82c9f=_0x228a8b[_0x3b5867(0x79e)]()[_0x3b5867(0x886)]();for(const _0x2ae7ed in VisuMZ[_0x3b5867(0x858)][_0x3b5867(0x1a3)]){if(_0xf82c9f[_0x3b5867(0x250)](_0x2ae7ed)){const _0x560559=VisuMZ['CoreEngine'][_0x3b5867(0x1a3)][_0x2ae7ed],_0x57c304=VisuMZ['CoreEngine'][_0x3b5867(0x6ba)][_0x560559];return _0x57c304[_0xa8b95a]||this[_0x3b5867(0x574)](_0xa8b95a);}}return this['getKeyboardInputButtonString'](_0xa8b95a);},VisuMZ['CoreEngine'][_0x500928(0x736)]=ColorManager['loadWindowskin'],ColorManager[_0x500928(0x197)]=function(){const _0x47d296=_0x500928;VisuMZ[_0x47d296(0x858)][_0x47d296(0x736)]['call'](this),this[_0x47d296(0x145)]=this[_0x47d296(0x145)]||{};},ColorManager[_0x500928(0x16d)]=function(_0x5473dd,_0x118503){const _0x30e52c=_0x500928;return _0x118503=String(_0x118503),this[_0x30e52c(0x145)]=this[_0x30e52c(0x145)]||{},_0x118503[_0x30e52c(0x6ad)](/#(.*)/i)?this[_0x30e52c(0x145)][_0x5473dd]='#%1'[_0x30e52c(0xc1)](String(RegExp['$1'])):this['_colorCache'][_0x5473dd]=this[_0x30e52c(0xff)](Number(_0x118503)),this['_colorCache'][_0x5473dd];},ColorManager[_0x500928(0x48c)]=function(_0x3180ae){const _0x161784=_0x500928;return _0x3180ae=String(_0x3180ae),_0x3180ae['match'](/#(.*)/i)?'#%1'[_0x161784(0xc1)](String(RegExp['$1'])):this[_0x161784(0xff)](Number(_0x3180ae));},ColorManager['clearCachedKeys']=function(){const _0x1f9835=_0x500928;this[_0x1f9835(0x145)]={};},ColorManager[_0x500928(0x11e)]=function(){const _0x16c2fc=_0x500928,_0xd4f869=_0x16c2fc(0x4ee);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0xd4f869])return this[_0x16c2fc(0x145)][_0xd4f869];const _0x3987ce=VisuMZ[_0x16c2fc(0x858)]['Settings'][_0x16c2fc(0x4f3)][_0x16c2fc(0x173)];return this[_0x16c2fc(0x16d)](_0xd4f869,_0x3987ce);},ColorManager[_0x500928(0x22b)]=function(){const _0x4d1f14=_0x500928,_0x58111f=_0x4d1f14(0x656);this[_0x4d1f14(0x145)]=this['_colorCache']||{};if(this[_0x4d1f14(0x145)][_0x58111f])return this[_0x4d1f14(0x145)][_0x58111f];const _0x27ac57=VisuMZ[_0x4d1f14(0x858)][_0x4d1f14(0x17a)]['Color'][_0x4d1f14(0x505)];return this[_0x4d1f14(0x16d)](_0x58111f,_0x27ac57);},ColorManager['crisisColor']=function(){const _0x509ca3=_0x500928,_0x5a28f7=_0x509ca3(0x61f);this[_0x509ca3(0x145)]=this['_colorCache']||{};if(this[_0x509ca3(0x145)][_0x5a28f7])return this[_0x509ca3(0x145)][_0x5a28f7];const _0x56c7a0=VisuMZ[_0x509ca3(0x858)][_0x509ca3(0x17a)][_0x509ca3(0x4f3)][_0x509ca3(0x3f4)];return this['getColorDataFromPluginParameters'](_0x5a28f7,_0x56c7a0);},ColorManager[_0x500928(0x68f)]=function(){const _0x203afa=_0x500928,_0x22e6bc='_stored_deathColor';this[_0x203afa(0x145)]=this[_0x203afa(0x145)]||{};if(this[_0x203afa(0x145)][_0x22e6bc])return this[_0x203afa(0x145)][_0x22e6bc];const _0x154ad7=VisuMZ[_0x203afa(0x858)]['Settings'][_0x203afa(0x4f3)]['ColorDeath'];return this[_0x203afa(0x16d)](_0x22e6bc,_0x154ad7);},ColorManager['gaugeBackColor']=function(){const _0xa1ee70=_0x500928,_0x5869be='_stored_gaugeBackColor';this[_0xa1ee70(0x145)]=this[_0xa1ee70(0x145)]||{};if(this[_0xa1ee70(0x145)][_0x5869be])return this[_0xa1ee70(0x145)][_0x5869be];const _0x447cce=VisuMZ[_0xa1ee70(0x858)][_0xa1ee70(0x17a)][_0xa1ee70(0x4f3)][_0xa1ee70(0x695)];return this['getColorDataFromPluginParameters'](_0x5869be,_0x447cce);},ColorManager[_0x500928(0x2fa)]=function(){const _0x4af401=_0x500928,_0x41773d=_0x4af401(0x3e8);this[_0x4af401(0x145)]=this['_colorCache']||{};if(this['_colorCache'][_0x41773d])return this[_0x4af401(0x145)][_0x41773d];const _0x3faddc=VisuMZ[_0x4af401(0x858)][_0x4af401(0x17a)]['Color'][_0x4af401(0x452)];return this[_0x4af401(0x16d)](_0x41773d,_0x3faddc);},ColorManager[_0x500928(0x257)]=function(){const _0x543996=_0x500928,_0x3a64b5=_0x543996(0x706);this[_0x543996(0x145)]=this[_0x543996(0x145)]||{};if(this[_0x543996(0x145)][_0x3a64b5])return this[_0x543996(0x145)][_0x3a64b5];const _0x23682a=VisuMZ['CoreEngine'][_0x543996(0x17a)][_0x543996(0x4f3)][_0x543996(0x16a)];return this['getColorDataFromPluginParameters'](_0x3a64b5,_0x23682a);},ColorManager[_0x500928(0x5ae)]=function(){const _0x2a8eb5=_0x500928,_0x57fd37='_stored_mpGaugeColor1';this[_0x2a8eb5(0x145)]=this[_0x2a8eb5(0x145)]||{};if(this[_0x2a8eb5(0x145)][_0x57fd37])return this['_colorCache'][_0x57fd37];const _0x9c3fcf=VisuMZ[_0x2a8eb5(0x858)][_0x2a8eb5(0x17a)][_0x2a8eb5(0x4f3)][_0x2a8eb5(0xf9)];return this[_0x2a8eb5(0x16d)](_0x57fd37,_0x9c3fcf);},ColorManager['mpGaugeColor2']=function(){const _0x499921=_0x500928,_0x9c72cc=_0x499921(0x289);this['_colorCache']=this[_0x499921(0x145)]||{};if(this[_0x499921(0x145)][_0x9c72cc])return this[_0x499921(0x145)][_0x9c72cc];const _0x44b278=VisuMZ['CoreEngine'][_0x499921(0x17a)][_0x499921(0x4f3)]['ColorMPGauge2'];return this['getColorDataFromPluginParameters'](_0x9c72cc,_0x44b278);},ColorManager[_0x500928(0x367)]=function(){const _0x5d2041=_0x500928,_0x115f57=_0x5d2041(0x887);this['_colorCache']=this[_0x5d2041(0x145)]||{};if(this[_0x5d2041(0x145)][_0x115f57])return this['_colorCache'][_0x115f57];const _0x44c50c=VisuMZ['CoreEngine'][_0x5d2041(0x17a)][_0x5d2041(0x4f3)][_0x5d2041(0x6a5)];return this[_0x5d2041(0x16d)](_0x115f57,_0x44c50c);},ColorManager[_0x500928(0x3a1)]=function(){const _0x93adc6=_0x500928,_0x2ebaec=_0x93adc6(0x779);this['_colorCache']=this[_0x93adc6(0x145)]||{};if(this[_0x93adc6(0x145)][_0x2ebaec])return this[_0x93adc6(0x145)][_0x2ebaec];const _0x58e04e=VisuMZ[_0x93adc6(0x858)][_0x93adc6(0x17a)][_0x93adc6(0x4f3)][_0x93adc6(0x62a)];return this[_0x93adc6(0x16d)](_0x2ebaec,_0x58e04e);},ColorManager['powerDownColor']=function(){const _0x24b403=_0x500928,_0x1739c7=_0x24b403(0x33a);this[_0x24b403(0x145)]=this['_colorCache']||{};if(this['_colorCache'][_0x1739c7])return this[_0x24b403(0x145)][_0x1739c7];const _0x40fe64=VisuMZ[_0x24b403(0x858)][_0x24b403(0x17a)][_0x24b403(0x4f3)]['ColorPowerDown'];return this[_0x24b403(0x16d)](_0x1739c7,_0x40fe64);},ColorManager[_0x500928(0x589)]=function(){const _0xc50c8=_0x500928,_0x5ef063=_0xc50c8(0x253);this[_0xc50c8(0x145)]=this[_0xc50c8(0x145)]||{};if(this[_0xc50c8(0x145)][_0x5ef063])return this[_0xc50c8(0x145)][_0x5ef063];const _0x5a619a=VisuMZ[_0xc50c8(0x858)][_0xc50c8(0x17a)]['Color']['ColorCTGauge1'];return this[_0xc50c8(0x16d)](_0x5ef063,_0x5a619a);},ColorManager[_0x500928(0x4a6)]=function(){const _0x3af691=_0x500928,_0x12c771=_0x3af691(0x3d6);this[_0x3af691(0x145)]=this[_0x3af691(0x145)]||{};if(this[_0x3af691(0x145)][_0x12c771])return this[_0x3af691(0x145)][_0x12c771];const _0x4ebb6e=VisuMZ['CoreEngine']['Settings'][_0x3af691(0x4f3)][_0x3af691(0x496)];return this[_0x3af691(0x16d)](_0x12c771,_0x4ebb6e);},ColorManager[_0x500928(0x34d)]=function(){const _0x55ee71=_0x500928,_0x55184f=_0x55ee71(0x107);this['_colorCache']=this['_colorCache']||{};if(this[_0x55ee71(0x145)][_0x55184f])return this[_0x55ee71(0x145)][_0x55184f];const _0x1c0269=VisuMZ['CoreEngine'][_0x55ee71(0x17a)][_0x55ee71(0x4f3)]['ColorTPGauge1'];return this[_0x55ee71(0x16d)](_0x55184f,_0x1c0269);},ColorManager['tpGaugeColor2']=function(){const _0x175f44=_0x500928,_0x55cb7e=_0x175f44(0x183);this[_0x175f44(0x145)]=this[_0x175f44(0x145)]||{};if(this[_0x175f44(0x145)][_0x55cb7e])return this[_0x175f44(0x145)][_0x55cb7e];const _0x536263=VisuMZ[_0x175f44(0x858)]['Settings'][_0x175f44(0x4f3)]['ColorTPGauge2'];return this[_0x175f44(0x16d)](_0x55cb7e,_0x536263);},ColorManager[_0x500928(0x32b)]=function(){const _0x37fa13=_0x500928,_0x599f7e='_stored_tpCostColor';this[_0x37fa13(0x145)]=this[_0x37fa13(0x145)]||{};if(this[_0x37fa13(0x145)][_0x599f7e])return this['_colorCache'][_0x599f7e];const _0x2294a1=VisuMZ['CoreEngine'][_0x37fa13(0x17a)][_0x37fa13(0x4f3)][_0x37fa13(0x448)];return this[_0x37fa13(0x16d)](_0x599f7e,_0x2294a1);},ColorManager['pendingColor']=function(){const _0x4ab78e=_0x500928,_0x465c77=_0x4ab78e(0x454);this[_0x4ab78e(0x145)]=this[_0x4ab78e(0x145)]||{};if(this[_0x4ab78e(0x145)][_0x465c77])return this[_0x4ab78e(0x145)][_0x465c77];const _0x3952dc=VisuMZ[_0x4ab78e(0x858)][_0x4ab78e(0x17a)][_0x4ab78e(0x4f3)]['ColorTPCost'];return this[_0x4ab78e(0x16d)](_0x465c77,_0x3952dc);},ColorManager[_0x500928(0x486)]=function(){const _0xc8a50a=_0x500928,_0x2fcc96=_0xc8a50a(0x47b);this[_0xc8a50a(0x145)]=this[_0xc8a50a(0x145)]||{};if(this[_0xc8a50a(0x145)][_0x2fcc96])return this[_0xc8a50a(0x145)][_0x2fcc96];const _0x3e1bbe=VisuMZ[_0xc8a50a(0x858)][_0xc8a50a(0x17a)][_0xc8a50a(0x4f3)]['ColorExpGauge1'];return this[_0xc8a50a(0x16d)](_0x2fcc96,_0x3e1bbe);},ColorManager[_0x500928(0xdc)]=function(){const _0x859dc=_0x500928,_0x12d57b=_0x859dc(0x5b9);this[_0x859dc(0x145)]=this[_0x859dc(0x145)]||{};if(this[_0x859dc(0x145)][_0x12d57b])return this[_0x859dc(0x145)][_0x12d57b];const _0x19b16d=VisuMZ[_0x859dc(0x858)]['Settings'][_0x859dc(0x4f3)][_0x859dc(0x374)];return this[_0x859dc(0x16d)](_0x12d57b,_0x19b16d);},ColorManager[_0x500928(0x392)]=function(){const _0x13bed0=_0x500928,_0x5c047e=_0x13bed0(0x1fd);this['_colorCache']=this['_colorCache']||{};if(this[_0x13bed0(0x145)][_0x5c047e])return this[_0x13bed0(0x145)][_0x5c047e];const _0x119474=VisuMZ[_0x13bed0(0x858)][_0x13bed0(0x17a)][_0x13bed0(0x4f3)][_0x13bed0(0x812)];return this[_0x13bed0(0x16d)](_0x5c047e,_0x119474);},ColorManager[_0x500928(0x675)]=function(){const _0x4a9c96=_0x500928,_0x42dab5='_stored_maxLvGaugeColor2';this[_0x4a9c96(0x145)]=this['_colorCache']||{};if(this[_0x4a9c96(0x145)][_0x42dab5])return this['_colorCache'][_0x42dab5];const _0x203164=VisuMZ[_0x4a9c96(0x858)]['Settings'][_0x4a9c96(0x4f3)][_0x4a9c96(0x6db)];return this[_0x4a9c96(0x16d)](_0x42dab5,_0x203164);},ColorManager['hpColor']=function(_0x2e8525){const _0x48292e=_0x500928;return VisuMZ[_0x48292e(0x858)]['Settings'][_0x48292e(0x4f3)][_0x48292e(0x56c)]['call'](this,_0x2e8525);},ColorManager['mpColor']=function(_0xf6a4ce){const _0x30011d=_0x500928;return VisuMZ[_0x30011d(0x858)][_0x30011d(0x17a)]['Color']['ActorMPColor']['call'](this,_0xf6a4ce);},ColorManager[_0x500928(0x4de)]=function(_0x28e07f){const _0x9d3de1=_0x500928;return VisuMZ['CoreEngine']['Settings']['Color'][_0x9d3de1(0x483)][_0x9d3de1(0x485)](this,_0x28e07f);},ColorManager[_0x500928(0x7bb)]=function(_0x399669){const _0x5b163b=_0x500928;return VisuMZ[_0x5b163b(0x858)][_0x5b163b(0x17a)][_0x5b163b(0x4f3)][_0x5b163b(0x611)]['call'](this,_0x399669);},ColorManager[_0x500928(0x759)]=function(_0x4d3676){const _0x229532=_0x500928;return VisuMZ[_0x229532(0x858)][_0x229532(0x17a)][_0x229532(0x4f3)][_0x229532(0x1a7)][_0x229532(0x485)](this,_0x4d3676);},ColorManager[_0x500928(0x56a)]=function(){const _0x3dce39=_0x500928;return VisuMZ[_0x3dce39(0x858)]['Settings'][_0x3dce39(0x4f3)]['OutlineColor'];},ColorManager['outlineColorDmg']=function(){const _0x339b89=_0x500928;return VisuMZ[_0x339b89(0x858)][_0x339b89(0x17a)][_0x339b89(0x4f3)]['OutlineColorDmg']||'rgba(0,\x200,\x200,\x200.7)';},ColorManager['outlineColorGauge']=function(){const _0x120954=_0x500928;return VisuMZ[_0x120954(0x858)][_0x120954(0x17a)][_0x120954(0x4f3)]['OutlineColorGauge']||_0x120954(0x81b);},ColorManager[_0x500928(0x370)]=function(){const _0xf16388=_0x500928;return VisuMZ[_0xf16388(0x858)][_0xf16388(0x17a)][_0xf16388(0x4f3)][_0xf16388(0x882)];},ColorManager[_0x500928(0x1ab)]=function(){const _0x15297d=_0x500928;return VisuMZ[_0x15297d(0x858)][_0x15297d(0x17a)][_0x15297d(0x4f3)][_0x15297d(0x7af)];},ColorManager['itemBackColor1']=function(){const _0x55d17c=_0x500928;return VisuMZ['CoreEngine'][_0x55d17c(0x17a)]['Color'][_0x55d17c(0x5ee)];},ColorManager[_0x500928(0x1a8)]=function(){const _0x2a97fe=_0x500928;return VisuMZ[_0x2a97fe(0x858)][_0x2a97fe(0x17a)][_0x2a97fe(0x4f3)][_0x2a97fe(0x6a1)];},SceneManager[_0x500928(0x357)]=[],SceneManager[_0x500928(0x750)]=function(){const _0x125531=_0x500928;return this[_0x125531(0x307)]&&this[_0x125531(0x307)]['constructor']===Scene_Battle;},SceneManager[_0x500928(0x7f1)]=function(){const _0x5dfb12=_0x500928;return this[_0x5dfb12(0x307)]&&this['_scene'][_0x5dfb12(0x2f3)]===Scene_Map;},SceneManager[_0x500928(0x39f)]=function(){const _0x46d2ff=_0x500928;return this[_0x46d2ff(0x307)]&&this[_0x46d2ff(0x307)]instanceof Scene_Map;},VisuMZ[_0x500928(0x858)][_0x500928(0x1f0)]=SceneManager['initialize'],SceneManager[_0x500928(0x32f)]=function(){const _0x3dc484=_0x500928;VisuMZ[_0x3dc484(0x858)]['SceneManager_initialize']['call'](this),this[_0x3dc484(0x2c8)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x5a0)]=SceneManager['onKeyDown'],SceneManager[_0x500928(0x1dc)]=function(_0x2a8c5c){const _0x51b526=_0x500928;if($gameTemp)this[_0x51b526(0x3b3)](_0x2a8c5c);VisuMZ[_0x51b526(0x858)][_0x51b526(0x5a0)][_0x51b526(0x485)](this,_0x2a8c5c);},SceneManager[_0x500928(0x3b3)]=function(_0x5bcc90){const _0x2af1a9=_0x500928;if(!_0x5bcc90[_0x2af1a9(0x2f5)]&&!_0x5bcc90[_0x2af1a9(0x3af)])switch(_0x5bcc90[_0x2af1a9(0x820)]){case 0x52:this['playTestShiftR']();break;case 0x54:this[_0x2af1a9(0x1a0)]();break;case 0x75:this[_0x2af1a9(0x113)]();break;case 0x76:if(Input[_0x2af1a9(0x480)]('shift')||Input[_0x2af1a9(0x480)](_0x2af1a9(0x7ac)))return;this[_0x2af1a9(0x3a7)]();break;}else{if(_0x5bcc90[_0x2af1a9(0x2f5)]){let _0x4bb22c=_0x5bcc90[_0x2af1a9(0x820)];if(_0x4bb22c>=0x31&&_0x4bb22c<=0x39){const _0x54bc22=_0x4bb22c-0x30;return SceneManager[_0x2af1a9(0x7e1)](_0x54bc22);}else{if(_0x4bb22c>=0x61&&_0x4bb22c<=0x69){const _0x52bbb7=_0x4bb22c-0x60;return SceneManager[_0x2af1a9(0x7e1)](_0x52bbb7);}}}}},SceneManager[_0x500928(0x113)]=function(){const _0x2b62d1=_0x500928;if($gameTemp[_0x2b62d1(0x290)]()&&VisuMZ[_0x2b62d1(0x858)][_0x2b62d1(0x17a)][_0x2b62d1(0xe1)][_0x2b62d1(0x7ab)]){ConfigManager[_0x2b62d1(0x4b7)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x2b62d1(0x69c)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x2b62d1(0x4b7)]=0x0):(ConfigManager[_0x2b62d1(0x385)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x2b62d1(0x67f)]=0x64,ConfigManager[_0x2b62d1(0x4b7)]=0x64);ConfigManager[_0x2b62d1(0x6c8)]();if(this[_0x2b62d1(0x307)][_0x2b62d1(0x2f3)]===Scene_Options){if(this['_scene']['_optionsWindow'])this['_scene']['_optionsWindow'][_0x2b62d1(0x642)]();if(this[_0x2b62d1(0x307)]['_listWindow'])this['_scene']['_listWindow'][_0x2b62d1(0x642)]();}}},SceneManager[_0x500928(0x3a7)]=function(){const _0x39a823=_0x500928;$gameTemp[_0x39a823(0x290)]()&&VisuMZ['CoreEngine'][_0x39a823(0x17a)][_0x39a823(0xe1)][_0x39a823(0x2e3)]&&($gameTemp[_0x39a823(0x248)]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x500928(0x639)]=function(){const _0x593ccc=_0x500928;if(!VisuMZ[_0x593ccc(0x858)][_0x593ccc(0x17a)][_0x593ccc(0xe1)]['ShiftR_Toggle'])return;if(!$gameTemp[_0x593ccc(0x290)]())return;if(!SceneManager[_0x593ccc(0x750)]())return;if(!Input[_0x593ccc(0x480)]('shift'))return;for(const _0x5c7d7a of $gameParty['members']()){if(!_0x5c7d7a)continue;_0x5c7d7a[_0x593ccc(0x4a8)]();}},SceneManager[_0x500928(0x1a0)]=function(){const _0x378d07=_0x500928;if(!VisuMZ[_0x378d07(0x858)]['Settings'][_0x378d07(0xe1)][_0x378d07(0x3a2)])return;if(!$gameTemp[_0x378d07(0x290)]())return;if(!SceneManager[_0x378d07(0x750)]())return;if(!Input[_0x378d07(0x480)](_0x378d07(0x533)))return;for(const _0x227210 of $gameParty[_0x378d07(0x84c)]()){if(!_0x227210)continue;_0x227210[_0x378d07(0xce)](_0x227210[_0x378d07(0x823)]());}},SceneManager[_0x500928(0x7e1)]=function(_0x79aabf){const _0x32285a=_0x500928;if(!$gameTemp[_0x32285a(0x290)]())return;if(!DataManager[_0x32285a(0x4f2)](_0x79aabf))return;if(!(VisuMZ[_0x32285a(0x858)][_0x32285a(0x17a)]['QoL'][_0x32285a(0x7d3)]??!![]))return;this[_0x32285a(0x719)](Scene_QuickLoad),this['prepareNextScene'](_0x79aabf);},SceneManager[_0x500928(0x2c8)]=function(){const _0x13e529=_0x500928;this[_0x13e529(0x810)]=![],this[_0x13e529(0x2ad)]=!VisuMZ[_0x13e529(0x858)][_0x13e529(0x17a)]['UI'][_0x13e529(0x433)];},SceneManager[_0x500928(0x623)]=function(_0x1370ff){const _0x294cf4=_0x500928;VisuMZ[_0x294cf4(0x858)]['Settings']['UI']['SideButtons']&&(this[_0x294cf4(0x810)]=_0x1370ff);},SceneManager[_0x500928(0x74d)]=function(){const _0x1f796e=_0x500928;return this[_0x1f796e(0x810)];},SceneManager[_0x500928(0x40a)]=function(){const _0x35f0e2=_0x500928;return this[_0x35f0e2(0x2ad)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x2de1e9=_0x500928;return this[_0x2de1e9(0x40a)]()||this[_0x2de1e9(0x74d)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x607)]=SceneManager['isGameActive'],SceneManager[_0x500928(0x4f6)]=function(){const _0x4158d3=_0x500928;return VisuMZ[_0x4158d3(0x858)][_0x4158d3(0x17a)][_0x4158d3(0xe1)]['RequireFocus']?VisuMZ[_0x4158d3(0x858)][_0x4158d3(0x607)][_0x4158d3(0x485)](this):!![];},SceneManager[_0x500928(0x15f)]=function(_0x265948){const _0x511817=_0x500928;if(_0x265948 instanceof Error)this[_0x511817(0x591)](_0x265948);else _0x265948 instanceof Array&&_0x265948[0x0]===_0x511817(0x60b)?this[_0x511817(0x735)](_0x265948):this[_0x511817(0x13d)](_0x265948);this[_0x511817(0x341)]();},VisuMZ[_0x500928(0x858)]['BattleManager_processEscape']=BattleManager[_0x500928(0x7dc)],BattleManager[_0x500928(0x7dc)]=function(){const _0x149f8f=_0x500928;return VisuMZ[_0x149f8f(0x858)][_0x149f8f(0x17a)]['QoL'][_0x149f8f(0x57f)]?this['processAlwaysEscape']():VisuMZ[_0x149f8f(0x858)]['BattleManager_processEscape'][_0x149f8f(0x485)](this);},BattleManager[_0x500928(0x50a)]=function(){const _0x385542=_0x500928;return $gameParty[_0x385542(0x243)](),SoundManager['playEscape'](),this[_0x385542(0x546)](),!![];},BattleManager[_0x500928(0x756)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x500928(0x3ca)]=function(){const _0x23030a=_0x500928;return $gameSystem[_0x23030a(0xbf)]()===0x1;},VisuMZ[_0x500928(0x858)][_0x500928(0x3f9)]=Game_Temp[_0x500928(0x358)][_0x500928(0x32f)],Game_Temp[_0x500928(0x358)][_0x500928(0x32f)]=function(){const _0xbe2778=_0x500928;VisuMZ[_0xbe2778(0x858)][_0xbe2778(0x3f9)]['call'](this),this['forceOutOfPlaytest'](),this['createFauxAnimationQueue'](),this[_0xbe2778(0x365)]();},Game_Temp['prototype'][_0x500928(0x602)]=function(){const _0x162c30=_0x500928;VisuMZ[_0x162c30(0x858)][_0x162c30(0x17a)][_0x162c30(0xe1)][_0x162c30(0x792)]&&(this[_0x162c30(0x3d8)]=![]);},Game_Temp[_0x500928(0x358)]['setLastPluginCommandInterpreter']=function(_0x3c252a){const _0x1631a3=_0x500928;this[_0x1631a3(0x701)]=_0x3c252a;},Game_Temp[_0x500928(0x358)][_0x500928(0x3b4)]=function(){const _0x250c1c=_0x500928;return this[_0x250c1c(0x701)];},Game_Temp[_0x500928(0x358)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x16c82a=_0x500928;this[_0x16c82a(0x4c0)]=undefined,this[_0x16c82a(0x7c6)]=undefined,this[_0x16c82a(0xde)]=undefined;},Game_Temp[_0x500928(0x358)][_0x500928(0x746)]=function(_0x2d5040){const _0x335ad4=_0x500928;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x335ad4(0x7e3)]($dataMap[_0x335ad4(0x508)]);const _0x5dc9f1=$dataTroops[_0x2d5040];if(_0x5dc9f1){let _0x53f7fe=DataManager[_0x335ad4(0x232)](_0x5dc9f1['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x53f7fe);}},Game_Temp['prototype'][_0x500928(0x7e3)]=function(_0x579754){const _0x4ba4c1=_0x500928;if(!_0x579754)return;if(_0x579754['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x4ba4c1(0x4c0)]='FV';else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x4ba4c1(0x4c0)]='SV';else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x34b501=String(RegExp['$1']);if(_0x34b501[_0x4ba4c1(0x6ad)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x34b501[_0x4ba4c1(0x6ad)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x4ba4c1(0x4c0)]='SV');}}}if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x579754['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x4ba4c1(0x7c6)]=0x2;else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:TPB|ATB)>/i))this[_0x4ba4c1(0x7c6)]=0x2;else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:CTB)>/i))Imported[_0x4ba4c1(0x74c)]&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0x7c0));else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:STB)>/i))Imported[_0x4ba4c1(0x517)]&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0xbd));else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:BTB)>/i))Imported[_0x4ba4c1(0x274)]&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0x33f));else{if(_0x579754['match'](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this['_forcedBattleSys']=_0x4ba4c1(0x2d0));else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:OTB)>/i))Imported[_0x4ba4c1(0x396)]&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0x678));else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:ETB)>/i))Imported[_0x4ba4c1(0x2b2)]&&(this['_forcedBattleSys']='ETB');else{if(_0x579754[_0x4ba4c1(0x6ad)](/<(?:PTB)>/i))Imported[_0x4ba4c1(0xc4)]&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0x2a7));else{if(_0x579754['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x1a532b=String(RegExp['$1']);if(_0x1a532b[_0x4ba4c1(0x6ad)](/DTB/i))this[_0x4ba4c1(0x7c6)]=0x0;else{if(_0x1a532b[_0x4ba4c1(0x6ad)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x4ba4c1(0x7c6)]=0x1;else{if(_0x1a532b[_0x4ba4c1(0x6ad)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x4ba4c1(0x7c6)]=0x2;else{if(_0x1a532b['match'](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0x7c0));else{if(_0x1a532b[_0x4ba4c1(0x6ad)](/STB/i))Imported[_0x4ba4c1(0x517)]&&(this[_0x4ba4c1(0x7c6)]='STB');else{if(_0x1a532b['match'](/BTB/i))Imported[_0x4ba4c1(0x274)]&&(this[_0x4ba4c1(0x7c6)]='BTB');else{if(_0x1a532b[_0x4ba4c1(0x6ad)](/FTB/i))Imported[_0x4ba4c1(0x3e4)]&&(this['_forcedBattleSys']=_0x4ba4c1(0x2d0));else{if(_0x1a532b['match'](/OTB/i))Imported[_0x4ba4c1(0x396)]&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0x678));else{if(_0x1a532b[_0x4ba4c1(0x6ad)](/ETB/i))Imported[_0x4ba4c1(0x2b2)]&&(this[_0x4ba4c1(0x7c6)]='ETB');else _0x1a532b[_0x4ba4c1(0x6ad)](/PTB/i)&&(Imported[_0x4ba4c1(0xc4)]&&(this[_0x4ba4c1(0x7c6)]=_0x4ba4c1(0x2a7)));}}}}}}}}}}}}}}}}}}}}if(_0x579754['match'](/<(?:|BATTLE )GRID>/i))this[_0x4ba4c1(0xde)]=!![];else _0x579754[_0x4ba4c1(0x6ad)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x4ba4c1(0xde)]=![]);},Game_Temp[_0x500928(0x358)][_0x500928(0x3ce)]=function(){const _0x612195=_0x500928;this[_0x612195(0x65c)]=[];},Game_Temp[_0x500928(0x358)]['requestFauxAnimation']=function(_0x577991,_0x3316d4,_0x1b5395,_0x433cdd){const _0x4542a5=_0x500928;if(!this[_0x4542a5(0x72d)]())return;_0x1b5395=_0x1b5395||![],_0x433cdd=_0x433cdd||![];if($dataAnimations[_0x3316d4]){const _0xd789b3={'targets':_0x577991,'animationId':_0x3316d4,'mirror':_0x1b5395,'mute':_0x433cdd};this['_fauxAnimationQueue'][_0x4542a5(0x719)](_0xd789b3);for(const _0x3dcebe of _0x577991){_0x3dcebe[_0x4542a5(0x3b1)]&&_0x3dcebe[_0x4542a5(0x3b1)]();}}},Game_Temp[_0x500928(0x358)]['showFauxAnimations']=function(){return!![];},Game_Temp['prototype'][_0x500928(0x310)]=function(){const _0x341c26=_0x500928;return this[_0x341c26(0x65c)][_0x341c26(0x533)]();},Game_Temp[_0x500928(0x358)]['createPointAnimationQueue']=function(){this['_pointAnimationQueue']=[];},Game_Temp[_0x500928(0x358)][_0x500928(0x160)]=function(_0x4b1c6a,_0x3dbe93,_0x3e4cd4,_0x37b3f8,_0x3f07eb){const _0x49faad=_0x500928;if(!this[_0x49faad(0xc3)]())return;_0x37b3f8=_0x37b3f8||![],_0x3f07eb=_0x3f07eb||![];if($dataAnimations[_0x3e4cd4]){const _0xb3a7d4={'x':_0x4b1c6a,'y':_0x3dbe93,'animationId':_0x3e4cd4,'mirror':_0x37b3f8,'mute':_0x3f07eb};this[_0x49faad(0x293)][_0x49faad(0x719)](_0xb3a7d4);}},Game_Temp[_0x500928(0x358)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x500928(0x358)][_0x500928(0x135)]=function(){return this['_pointAnimationQueue']['shift']();},VisuMZ[_0x500928(0x858)]['Game_System_initialize']=Game_System[_0x500928(0x358)][_0x500928(0x32f)],Game_System[_0x500928(0x358)][_0x500928(0x32f)]=function(){const _0x1e632d=_0x500928;VisuMZ['CoreEngine'][_0x1e632d(0x33d)][_0x1e632d(0x485)](this),this[_0x1e632d(0x543)]();},Game_System[_0x500928(0x358)][_0x500928(0x543)]=function(){const _0x7896eb=_0x500928;this[_0x7896eb(0x6f2)]={'SideView':$dataSystem[_0x7896eb(0x4a7)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem[_0x7896eb(0x7c2)]['fontSize'],'Padding':0xc};},Game_System[_0x500928(0x358)][_0x500928(0x4ad)]=function(){const _0x4670cc=_0x500928;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x4670cc(0x6f2)]===undefined)this[_0x4670cc(0x543)]();if(this[_0x4670cc(0x6f2)]['SideView']===undefined)this[_0x4670cc(0x543)]();return this[_0x4670cc(0x6f2)][_0x4670cc(0x41b)];},Game_System[_0x500928(0x358)]['setSideView']=function(_0x27f497){const _0x1f68cb=_0x500928;if(this[_0x1f68cb(0x6f2)]===undefined)this[_0x1f68cb(0x543)]();if(this['_CoreEngineSettings'][_0x1f68cb(0x41b)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x1f68cb(0x41b)]=_0x27f497;},Game_System[_0x500928(0x358)]['resetBattleSystem']=function(){const _0x569457=_0x500928;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();this[_0x569457(0x6f2)][_0x569457(0x70c)]=this[_0x569457(0x6c5)]();},Game_System['prototype'][_0x500928(0x6c5)]=function(){const _0x17eff8=_0x500928,_0x309a37=(VisuMZ[_0x17eff8(0x858)]['Settings'][_0x17eff8(0x70c)]||_0x17eff8(0x3cb))[_0x17eff8(0x491)]()[_0x17eff8(0x886)]();return VisuMZ[_0x17eff8(0x858)][_0x17eff8(0x718)](_0x309a37);},Game_System[_0x500928(0x358)][_0x500928(0xbf)]=function(){const _0x4efb2b=_0x500928;if($gameTemp[_0x4efb2b(0x7c6)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x4efb2b(0x6f2)][_0x4efb2b(0x70c)]===undefined)this[_0x4efb2b(0x153)]();return this[_0x4efb2b(0x6f2)][_0x4efb2b(0x70c)];},Game_System['prototype'][_0x500928(0x603)]=function(_0x1d5058){const _0x1681a0=_0x500928;if(this[_0x1681a0(0x6f2)]===undefined)this[_0x1681a0(0x543)]();if(this[_0x1681a0(0x6f2)][_0x1681a0(0x70c)]===undefined)this[_0x1681a0(0x153)]();this[_0x1681a0(0x6f2)][_0x1681a0(0x70c)]=_0x1d5058;},Game_System[_0x500928(0x358)]['mainFontSize']=function(){const _0x1d74b4=_0x500928;if(this['_CoreEngineSettings']===undefined)this[_0x1d74b4(0x543)]();if(this['_CoreEngineSettings']['FontSize']===undefined)this[_0x1d74b4(0x543)]();return this[_0x1d74b4(0x6f2)][_0x1d74b4(0x7e5)];},Game_System['prototype'][_0x500928(0x467)]=function(_0x2d8dba){const _0x42a159=_0x500928;if(this[_0x42a159(0x6f2)]===undefined)this['initCoreEngine']();if(this[_0x42a159(0x6f2)]['TimeProgress']===undefined)this[_0x42a159(0x543)]();this[_0x42a159(0x6f2)]['FontSize']=_0x2d8dba;},Game_System[_0x500928(0x358)][_0x500928(0x841)]=function(){const _0x5c44bb=_0x500928;if(this['_CoreEngineSettings']===undefined)this[_0x5c44bb(0x543)]();if(this[_0x5c44bb(0x6f2)]['Padding']===undefined)this[_0x5c44bb(0x543)]();return this[_0x5c44bb(0x6f2)]['Padding'];},Game_System[_0x500928(0x358)]['setWindowPadding']=function(_0x49e6db){const _0x4f5128=_0x500928;if(this[_0x4f5128(0x6f2)]===undefined)this[_0x4f5128(0x543)]();if(this[_0x4f5128(0x6f2)][_0x4f5128(0x30f)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x4f5128(0x749)]=_0x49e6db;},VisuMZ[_0x500928(0x858)]['Game_Screen_initialize']=Game_Screen[_0x500928(0x358)][_0x500928(0x32f)],Game_Screen[_0x500928(0x358)][_0x500928(0x32f)]=function(){const _0x175536=_0x500928;VisuMZ[_0x175536(0x858)][_0x175536(0x209)][_0x175536(0x485)](this),this[_0x175536(0x720)]();},Game_Screen[_0x500928(0x358)]['initCoreEngineScreenShake']=function(){const _0x9676f6=_0x500928,_0x27cffd=VisuMZ['CoreEngine'][_0x9676f6(0x17a)][_0x9676f6(0x355)];this[_0x9676f6(0x395)]=_0x27cffd?.[_0x9676f6(0x25f)]||_0x9676f6(0x390);},Game_Screen[_0x500928(0x358)][_0x500928(0x74e)]=function(){const _0x4d918=_0x500928;if(this[_0x4d918(0x395)]===undefined)this['initCoreEngineScreenShake']();return this[_0x4d918(0x395)];},Game_Screen[_0x500928(0x358)][_0x500928(0x23d)]=function(_0x2752cd){const _0x134966=_0x500928;if(this['_coreEngineShakeStyle']===undefined)this[_0x134966(0x720)]();this[_0x134966(0x395)]=_0x2752cd[_0x134966(0x79e)]()[_0x134966(0x886)]();},Game_Picture['prototype'][_0x500928(0x879)]=function(){const _0xc151d5=_0x500928;if($gameParty[_0xc151d5(0x7a4)]())return![];return this[_0xc151d5(0x87c)]()&&this['onlyfilename']()[_0xc151d5(0x554)](0x0)==='!';},Game_Picture[_0x500928(0x358)][_0x500928(0x87c)]=function(){const _0x29798a=_0x500928;return this[_0x29798a(0x6de)][_0x29798a(0x3b8)]('/')[_0x29798a(0x1da)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x7d2)]=Game_Picture[_0x500928(0x358)]['x'],Game_Picture[_0x500928(0x358)]['x']=function(){const _0x3c4fc3=_0x500928;return this['isMapScrollLinked']()?this[_0x3c4fc3(0x651)]():VisuMZ['CoreEngine'][_0x3c4fc3(0x7d2)]['call'](this);},Game_Picture[_0x500928(0x358)][_0x500928(0x651)]=function(){const _0x5778d9=_0x500928,_0xbe0feb=$gameMap['displayX']()*$gameMap[_0x5778d9(0x1db)]();return(this['_x']-_0xbe0feb)*$gameScreen['zoomScale']();},VisuMZ[_0x500928(0x858)][_0x500928(0x1c5)]=Game_Picture[_0x500928(0x358)]['y'],Game_Picture['prototype']['y']=function(){const _0x1ef8c1=_0x500928;return this[_0x1ef8c1(0x879)]()?this['yScrollLinkedOffset']():VisuMZ[_0x1ef8c1(0x858)]['Game_Picture_y'][_0x1ef8c1(0x485)](this);},Game_Picture[_0x500928(0x358)][_0x500928(0x521)]=function(){const _0xed5745=_0x500928,_0x43d07e=$gameMap['displayY']()*$gameMap[_0xed5745(0x634)]();return(this['_y']-_0x43d07e)*$gameScreen[_0xed5745(0x22d)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x22e)]=Game_Picture[_0x500928(0x358)][_0x500928(0x4b0)],Game_Picture[_0x500928(0x358)][_0x500928(0x4b0)]=function(){const _0x57ef6e=_0x500928;let _0x55315a=VisuMZ[_0x57ef6e(0x858)][_0x57ef6e(0x22e)][_0x57ef6e(0x485)](this);return this['isMapScrollLinked']()&&(_0x55315a*=$gameScreen['zoomScale']()),_0x55315a;},VisuMZ[_0x500928(0x858)][_0x500928(0x116)]=Game_Picture[_0x500928(0x358)]['scaleY'],Game_Picture[_0x500928(0x358)][_0x500928(0x56e)]=function(){const _0x115e8d=_0x500928;let _0x2f3aa2=VisuMZ[_0x115e8d(0x858)]['Game_Picture_scaleY'][_0x115e8d(0x485)](this);return this[_0x115e8d(0x879)]()&&(_0x2f3aa2*=$gameScreen['zoomScale']()),_0x2f3aa2;},Game_Picture[_0x500928(0x358)][_0x500928(0x11d)]=function(_0x2c24a0){const _0x57dac7=_0x500928;this[_0x57dac7(0x79d)]=_0x2c24a0;},VisuMZ['CoreEngine'][_0x500928(0x811)]=Game_Picture[_0x500928(0x358)][_0x500928(0x7d6)],Game_Picture[_0x500928(0x358)]['calcEasing']=function(_0x2b10f4){const _0x516bdd=_0x500928;return this[_0x516bdd(0x79d)]=this[_0x516bdd(0x79d)]||0x0,[0x0,0x1,0x2,0x3][_0x516bdd(0x250)](this[_0x516bdd(0x79d)])?VisuMZ[_0x516bdd(0x858)][_0x516bdd(0x811)][_0x516bdd(0x485)](this,_0x2b10f4):VisuMZ[_0x516bdd(0x4fe)](_0x2b10f4,this[_0x516bdd(0x79d)]);},VisuMZ[_0x500928(0x858)][_0x500928(0x2bc)]=Game_Picture['prototype'][_0x500928(0x235)],Game_Picture[_0x500928(0x358)][_0x500928(0x235)]=function(){const _0x2fac94=_0x500928;VisuMZ[_0x2fac94(0x858)][_0x2fac94(0x2bc)][_0x2fac94(0x485)](this),this[_0x2fac94(0x1cb)]();},Game_Picture[_0x500928(0x358)][_0x500928(0x1cb)]=function(){const _0x439f93=_0x500928;this[_0x439f93(0x660)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x439f93(0x2d1)};},VisuMZ['CoreEngine'][_0x500928(0x12f)]=Game_Picture[_0x500928(0x358)]['angle'],Game_Picture[_0x500928(0x358)][_0x500928(0x840)]=function(){const _0xa8ef93=_0x500928;let _0x37ac90=VisuMZ['CoreEngine'][_0xa8ef93(0x12f)][_0xa8ef93(0x485)](this);return _0x37ac90+=this[_0xa8ef93(0x1d9)](),_0x37ac90;},Game_Picture[_0x500928(0x358)][_0x500928(0x1d9)]=function(){const _0x3232b3=_0x500928;if(this[_0x3232b3(0x660)]===undefined)this['initRotationCoreEngine']();return this[_0x3232b3(0x660)][_0x3232b3(0x220)]||0x0;},Game_Picture[_0x500928(0x358)]['setAnglePlusData']=function(_0x30b7c3,_0x4a54fa,_0x18cb87){const _0x4eeb2e=_0x500928;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();this[_0x4eeb2e(0x660)]['target']=_0x30b7c3||0x0,this['_anglePlus'][_0x4eeb2e(0x57d)]=_0x4a54fa||0x0,this[_0x4eeb2e(0x660)][_0x4eeb2e(0x2f1)]=_0x4a54fa||0x0,this[_0x4eeb2e(0x660)]['easingType']=_0x18cb87||_0x4eeb2e(0x2d1),_0x4a54fa<=0x0&&(this[_0x4eeb2e(0x660)][_0x4eeb2e(0x220)]=this[_0x4eeb2e(0x660)][_0x4eeb2e(0x63e)]);},Game_Picture[_0x500928(0x358)][_0x500928(0x601)]=function(_0x36758e,_0x41d810,_0x38d479){const _0x4246ab=_0x500928;if(this['_anglePlus']===undefined)this[_0x4246ab(0x1cb)]();this['_anglePlus']['target']+=_0x36758e||0x0,this[_0x4246ab(0x660)][_0x4246ab(0x57d)]=_0x41d810||0x0,this['_anglePlus'][_0x4246ab(0x2f1)]=_0x41d810||0x0,this[_0x4246ab(0x660)][_0x4246ab(0x1ff)]=_0x38d479||_0x4246ab(0x2d1),_0x41d810<=0x0&&(this['_anglePlus']['current']=this[_0x4246ab(0x660)][_0x4246ab(0x63e)]);},VisuMZ[_0x500928(0x858)][_0x500928(0x7d5)]=Game_Picture[_0x500928(0x358)]['updateRotation'],Game_Picture[_0x500928(0x358)]['updateRotation']=function(){const _0x34854d=_0x500928;VisuMZ[_0x34854d(0x858)][_0x34854d(0x7d5)][_0x34854d(0x485)](this),this[_0x34854d(0x775)]();},Game_Picture[_0x500928(0x358)]['updateAnglePlus']=function(){const _0x620fcf=_0x500928;if(this['_anglePlus']===undefined)this[_0x620fcf(0x1cb)]();const _0x1f3018=this[_0x620fcf(0x660)];if(_0x1f3018[_0x620fcf(0x57d)]<=0x0)return;_0x1f3018[_0x620fcf(0x220)]=this[_0x620fcf(0xd9)](_0x1f3018[_0x620fcf(0x220)],_0x1f3018[_0x620fcf(0x63e)]),_0x1f3018[_0x620fcf(0x57d)]--,_0x1f3018[_0x620fcf(0x57d)]<=0x0&&(_0x1f3018['current']=_0x1f3018[_0x620fcf(0x63e)]);},Game_Picture[_0x500928(0x358)][_0x500928(0xd9)]=function(_0x5d60b8,_0x5079b5){const _0x270bc3=_0x500928,_0x22f497=this['_anglePlus'],_0x46c5a2=_0x22f497[_0x270bc3(0x1ff)],_0x3ea905=_0x22f497[_0x270bc3(0x57d)],_0x21a4f0=_0x22f497[_0x270bc3(0x2f1)],_0x3bf3ba=VisuMZ[_0x270bc3(0x4fe)]((_0x21a4f0-_0x3ea905)/_0x21a4f0,_0x46c5a2),_0x2b2a12=VisuMZ[_0x270bc3(0x4fe)]((_0x21a4f0-_0x3ea905+0x1)/_0x21a4f0,_0x46c5a2),_0x2d0894=(_0x5d60b8-_0x5079b5*_0x3bf3ba)/(0x1-_0x3bf3ba);return _0x2d0894+(_0x5079b5-_0x2d0894)*_0x2b2a12;},VisuMZ[_0x500928(0x858)]['Game_Action_itemHit']=Game_Action[_0x500928(0x358)]['itemHit'],Game_Action[_0x500928(0x358)][_0x500928(0x506)]=function(_0x5812e1){const _0x7cc002=_0x500928;return VisuMZ[_0x7cc002(0x858)]['Settings']['QoL'][_0x7cc002(0x60c)]?this[_0x7cc002(0x4fd)](_0x5812e1):VisuMZ[_0x7cc002(0x858)]['Game_Action_itemHit'][_0x7cc002(0x485)](this,_0x5812e1);},Game_Action[_0x500928(0x358)][_0x500928(0x4fd)]=function(_0x308c4f){const _0x16eaaf=_0x500928,_0x332bd0=this[_0x16eaaf(0x39e)](_0x308c4f),_0xd5174b=this[_0x16eaaf(0x3d7)](_0x308c4f),_0x1009d4=this[_0x16eaaf(0x3d1)](_0x308c4f);return _0x332bd0*(_0xd5174b-_0x1009d4);},VisuMZ[_0x500928(0x858)][_0x500928(0x2ae)]=Game_Action[_0x500928(0x358)]['itemEva'],Game_Action[_0x500928(0x358)][_0x500928(0x44f)]=function(_0x4af9d3){const _0x2836e5=_0x500928;return VisuMZ['CoreEngine'][_0x2836e5(0x17a)][_0x2836e5(0xe1)][_0x2836e5(0x60c)]?0x0:VisuMZ[_0x2836e5(0x858)]['Game_Action_itemEva'][_0x2836e5(0x485)](this,_0x4af9d3);},Game_Action[_0x500928(0x358)][_0x500928(0x39e)]=function(_0x4154ec){const _0x59fc73=_0x500928;return this[_0x59fc73(0x743)]()[_0x59fc73(0x7a2)]*0.01;},Game_Action['prototype'][_0x500928(0x3d7)]=function(_0x86637){const _0x152b05=_0x500928;if(VisuMZ['CoreEngine'][_0x152b05(0x17a)][_0x152b05(0xe1)]['AccuracyBoost']&&this[_0x152b05(0x463)]())return 0x1;return this['isPhysical']()?VisuMZ['CoreEngine'][_0x152b05(0x17a)]['QoL'][_0x152b05(0x138)]&&this[_0x152b05(0x712)]()[_0x152b05(0x327)]()?this['subject']()['hit']+0.05:this[_0x152b05(0x712)]()[_0x152b05(0x46a)]:0x1;},Game_Action[_0x500928(0x358)][_0x500928(0x3d1)]=function(_0x738cdf){const _0x188643=_0x500928;if(this[_0x188643(0x712)]()[_0x188643(0x327)]()===_0x738cdf[_0x188643(0x327)]())return 0x0;if(this[_0x188643(0x224)]())return VisuMZ['CoreEngine'][_0x188643(0x17a)][_0x188643(0xe1)][_0x188643(0x138)]&&_0x738cdf['isEnemy']()?_0x738cdf[_0x188643(0x46e)]-0.05:_0x738cdf['eva'];else return this[_0x188643(0x1d2)]()?_0x738cdf['mev']:0x0;},VisuMZ[_0x500928(0x858)]['Game_Action_updateLastTarget']=Game_Action['prototype'][_0x500928(0x6a2)],Game_Action[_0x500928(0x358)]['updateLastTarget']=function(_0x1d92ba){const _0x4837f9=_0x500928;VisuMZ[_0x4837f9(0x858)]['Game_Action_updateLastTarget']['call'](this,_0x1d92ba);if(VisuMZ[_0x4837f9(0x858)][_0x4837f9(0x17a)]['QoL']['ImprovedAccuracySystem'])return;const _0x5f3b2e=_0x1d92ba['result']();_0x5f3b2e[_0x4837f9(0x26d)]&&(0x1-this[_0x4837f9(0x44f)](_0x1d92ba)>this['itemHit'](_0x1d92ba)&&(_0x5f3b2e[_0x4837f9(0x26d)]=![],_0x5f3b2e[_0x4837f9(0x7c1)]=!![]));},VisuMZ[_0x500928(0x858)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x500928(0x358)][_0x500928(0x349)],Game_BattlerBase[_0x500928(0x358)][_0x500928(0x349)]=function(){const _0x1d0aa2=_0x500928;this[_0x1d0aa2(0x32a)]={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers'][_0x1d0aa2(0x485)](this);},VisuMZ[_0x500928(0x858)][_0x500928(0x82d)]=Game_BattlerBase[_0x500928(0x358)][_0x500928(0x642)],Game_BattlerBase[_0x500928(0x358)][_0x500928(0x642)]=function(){const _0x577f48=_0x500928;this[_0x577f48(0x32a)]={},VisuMZ['CoreEngine'][_0x577f48(0x82d)][_0x577f48(0x485)](this);},Game_BattlerBase['prototype'][_0x500928(0x5c9)]=function(_0x9f85fe){const _0x4d7fa1=_0x500928;return this[_0x4d7fa1(0x32a)]=this[_0x4d7fa1(0x32a)]||{},this[_0x4d7fa1(0x32a)][_0x9f85fe]!==undefined;},Game_BattlerBase[_0x500928(0x358)][_0x500928(0x6cb)]=function(_0x5e3480){const _0x3d4a3c=_0x500928,_0x334503=(_0x202fdc,_0x3c8558)=>{const _0x4852e1=_0x455b;if(!_0x3c8558)return _0x202fdc;if(_0x3c8558[_0x4852e1(0x508)][_0x4852e1(0x6ad)](VisuMZ[_0x4852e1(0x858)][_0x4852e1(0x51e)][_0x4852e1(0x6cb)][_0x5e3480])){var _0x2f233e=Number(RegExp['$1']);_0x202fdc+=_0x2f233e;}if(_0x3c8558['note'][_0x4852e1(0x6ad)](VisuMZ['CoreEngine'][_0x4852e1(0x51e)]['paramPlusJS'][_0x5e3480])){var _0x183193=String(RegExp['$1']);try{_0x202fdc+=eval(_0x183193);}catch(_0x5a8de4){if($gameTemp[_0x4852e1(0x290)]())console['log'](_0x5a8de4);}}return _0x202fdc;};return this[_0x3d4a3c(0x6d1)]()[_0x3d4a3c(0x7d0)](_0x334503,this[_0x3d4a3c(0x81a)][_0x5e3480]);},Game_BattlerBase[_0x500928(0x358)]['paramMax']=function(_0x471ef8){const _0x4e823e=_0x500928;var _0x52b2c3=_0x4e823e(0x1c2)+(this[_0x4e823e(0x327)]()?_0x4e823e(0x502):_0x4e823e(0x58e))+_0x4e823e(0x20c)+_0x471ef8;if(this['checkCacheKey'](_0x52b2c3))return this['_cache'][_0x52b2c3];this['_cache'][_0x52b2c3]=eval(VisuMZ[_0x4e823e(0x858)][_0x4e823e(0x17a)][_0x4e823e(0xd3)][_0x52b2c3]);const _0x2853fb=(_0x4d03b7,_0x46db52)=>{const _0x89a22b=_0x4e823e;if(!_0x46db52)return _0x4d03b7;if(_0x46db52[_0x89a22b(0x508)]['match'](VisuMZ[_0x89a22b(0x858)][_0x89a22b(0x51e)]['paramMax'][_0x471ef8])){var _0x3cc58c=Number(RegExp['$1']);if(_0x3cc58c===0x0)_0x3cc58c=Number['MAX_SAFE_INTEGER'];_0x4d03b7=Math['max'](_0x4d03b7,_0x3cc58c);}if(_0x46db52[_0x89a22b(0x508)][_0x89a22b(0x6ad)](VisuMZ['CoreEngine'][_0x89a22b(0x51e)][_0x89a22b(0x535)][_0x471ef8])){var _0x52f424=String(RegExp['$1']);try{_0x4d03b7=Math['max'](_0x4d03b7,Number(eval(_0x52f424)));}catch(_0x51b149){if($gameTemp[_0x89a22b(0x290)]())console['log'](_0x51b149);}}return _0x4d03b7;};if(this[_0x4e823e(0x32a)][_0x52b2c3]===0x0)this[_0x4e823e(0x32a)][_0x52b2c3]=Number['MAX_SAFE_INTEGER'];return this['_cache'][_0x52b2c3]=this['traitObjects']()['reduce'](_0x2853fb,this[_0x4e823e(0x32a)][_0x52b2c3]),this[_0x4e823e(0x32a)][_0x52b2c3];},Game_BattlerBase[_0x500928(0x358)][_0x500928(0x1bc)]=function(_0x7136ea){const _0x5a137c=_0x500928,_0xac9b31=this['traitsPi'](Game_BattlerBase[_0x5a137c(0x717)],_0x7136ea),_0x48b981=(_0x36f2ea,_0x49400f)=>{const _0x139a25=_0x5a137c;if(!_0x49400f)return _0x36f2ea;if(_0x49400f[_0x139a25(0x508)]['match'](VisuMZ[_0x139a25(0x858)][_0x139a25(0x51e)][_0x139a25(0x4ea)][_0x7136ea])){var _0x519ab3=Number(RegExp['$1'])/0x64;_0x36f2ea*=_0x519ab3;}if(_0x49400f[_0x139a25(0x508)][_0x139a25(0x6ad)](VisuMZ['CoreEngine'][_0x139a25(0x51e)][_0x139a25(0x200)][_0x7136ea])){var _0x519ab3=Number(RegExp['$1']);_0x36f2ea*=_0x519ab3;}if(_0x49400f['note'][_0x139a25(0x6ad)](VisuMZ[_0x139a25(0x858)][_0x139a25(0x51e)][_0x139a25(0x549)][_0x7136ea])){var _0x9edf46=String(RegExp['$1']);try{_0x36f2ea*=eval(_0x9edf46);}catch(_0x36f272){if($gameTemp[_0x139a25(0x290)]())console[_0x139a25(0x415)](_0x36f272);}}return _0x36f2ea;};return this['traitObjects']()[_0x5a137c(0x7d0)](_0x48b981,_0xac9b31);},Game_BattlerBase['prototype'][_0x500928(0x797)]=function(_0x1896af){const _0x1d454d=_0x500928,_0x41cb58=(_0x3b5b1c,_0x43001a)=>{const _0x56caef=_0x455b;if(!_0x43001a)return _0x3b5b1c;if(_0x43001a[_0x56caef(0x508)]['match'](VisuMZ[_0x56caef(0x858)][_0x56caef(0x51e)][_0x56caef(0x4f1)][_0x1896af])){var _0x5aa7e4=Number(RegExp['$1']);_0x3b5b1c+=_0x5aa7e4;}if(_0x43001a[_0x56caef(0x508)]['match'](VisuMZ[_0x56caef(0x858)][_0x56caef(0x51e)][_0x56caef(0x594)][_0x1896af])){var _0x541648=String(RegExp['$1']);try{_0x3b5b1c+=eval(_0x541648);}catch(_0x8d8ec6){if($gameTemp[_0x56caef(0x290)]())console[_0x56caef(0x415)](_0x8d8ec6);}}return _0x3b5b1c;};return this[_0x1d454d(0x6d1)]()[_0x1d454d(0x7d0)](_0x41cb58,0x0);},Game_BattlerBase[_0x500928(0x358)]['param']=function(_0x1f818d){const _0x2652ac=_0x500928;let _0x86bf91=_0x2652ac(0x838)+_0x1f818d+_0x2652ac(0x3c6);if(this[_0x2652ac(0x5c9)](_0x86bf91))return this[_0x2652ac(0x32a)][_0x86bf91];return this[_0x2652ac(0x32a)][_0x86bf91]=Math[_0x2652ac(0x7a6)](VisuMZ[_0x2652ac(0x858)][_0x2652ac(0x17a)]['Param'][_0x2652ac(0x847)]['call'](this,_0x1f818d)),this[_0x2652ac(0x32a)][_0x86bf91];},Game_BattlerBase[_0x500928(0x358)][_0x500928(0x878)]=function(_0x1b5e2c){const _0x751782=_0x500928,_0x442ccd=(_0x1ee979,_0x15b6dd)=>{const _0x1b5b51=_0x455b;if(!_0x15b6dd)return _0x1ee979;if(_0x15b6dd['note'][_0x1b5b51(0x6ad)](VisuMZ[_0x1b5b51(0x858)][_0x1b5b51(0x51e)]['xparamPlus1'][_0x1b5e2c])){var _0x5ea2c2=Number(RegExp['$1'])/0x64;_0x1ee979+=_0x5ea2c2;}if(_0x15b6dd[_0x1b5b51(0x508)][_0x1b5b51(0x6ad)](VisuMZ[_0x1b5b51(0x858)][_0x1b5b51(0x51e)][_0x1b5b51(0x25b)][_0x1b5e2c])){var _0x5ea2c2=Number(RegExp['$1']);_0x1ee979+=_0x5ea2c2;}if(_0x15b6dd['note'][_0x1b5b51(0x6ad)](VisuMZ['CoreEngine'][_0x1b5b51(0x51e)][_0x1b5b51(0x537)][_0x1b5e2c])){var _0xd00e34=String(RegExp['$1']);try{_0x1ee979+=eval(_0xd00e34);}catch(_0x54c75b){if($gameTemp[_0x1b5b51(0x290)]())console[_0x1b5b51(0x415)](_0x54c75b);}}return _0x1ee979;};return this[_0x751782(0x6d1)]()[_0x751782(0x7d0)](_0x442ccd,0x0);},Game_BattlerBase[_0x500928(0x358)]['xparamRate']=function(_0x96e5f){const _0x5e107d=_0x500928,_0x20ca05=(_0x157ba0,_0x15c1e3)=>{const _0xc49951=_0x455b;if(!_0x15c1e3)return _0x157ba0;if(_0x15c1e3[_0xc49951(0x508)][_0xc49951(0x6ad)](VisuMZ[_0xc49951(0x858)][_0xc49951(0x51e)][_0xc49951(0x132)][_0x96e5f])){var _0x3e4262=Number(RegExp['$1'])/0x64;_0x157ba0*=_0x3e4262;}if(_0x15c1e3[_0xc49951(0x508)][_0xc49951(0x6ad)](VisuMZ[_0xc49951(0x858)][_0xc49951(0x51e)][_0xc49951(0x72f)][_0x96e5f])){var _0x3e4262=Number(RegExp['$1']);_0x157ba0*=_0x3e4262;}if(_0x15c1e3[_0xc49951(0x508)][_0xc49951(0x6ad)](VisuMZ[_0xc49951(0x858)][_0xc49951(0x51e)]['xparamRateJS'][_0x96e5f])){var _0x15613c=String(RegExp['$1']);try{_0x157ba0*=eval(_0x15613c);}catch(_0x4d4452){if($gameTemp['isPlaytest']())console[_0xc49951(0x415)](_0x4d4452);}}return _0x157ba0;};return this[_0x5e107d(0x6d1)]()[_0x5e107d(0x7d0)](_0x20ca05,0x1);},Game_BattlerBase[_0x500928(0x358)][_0x500928(0x722)]=function(_0x4e8014){const _0x5f5b22=_0x500928,_0x5c1f04=(_0x52a3d5,_0x2c2300)=>{const _0x210dc6=_0x455b;if(!_0x2c2300)return _0x52a3d5;if(_0x2c2300['note'][_0x210dc6(0x6ad)](VisuMZ['CoreEngine'][_0x210dc6(0x51e)][_0x210dc6(0x618)][_0x4e8014])){var _0x2ae707=Number(RegExp['$1'])/0x64;_0x52a3d5+=_0x2ae707;}if(_0x2c2300['note'][_0x210dc6(0x6ad)](VisuMZ[_0x210dc6(0x858)][_0x210dc6(0x51e)][_0x210dc6(0x4c4)][_0x4e8014])){var _0x2ae707=Number(RegExp['$1']);_0x52a3d5+=_0x2ae707;}if(_0x2c2300[_0x210dc6(0x508)]['match'](VisuMZ[_0x210dc6(0x858)][_0x210dc6(0x51e)][_0x210dc6(0x346)][_0x4e8014])){var _0x6e03c3=String(RegExp['$1']);try{_0x52a3d5+=eval(_0x6e03c3);}catch(_0x1c7ab8){if($gameTemp['isPlaytest']())console[_0x210dc6(0x415)](_0x1c7ab8);}}return _0x52a3d5;};return this[_0x5f5b22(0x6d1)]()['reduce'](_0x5c1f04,0x0);},Game_BattlerBase[_0x500928(0x358)]['xparam']=function(_0x42049a){const _0x5355ec=_0x500928;let _0x2ce000=_0x5355ec(0x386)+_0x42049a+_0x5355ec(0x3c6);if(this[_0x5355ec(0x5c9)](_0x2ce000))return this[_0x5355ec(0x32a)][_0x2ce000];return this['_cache'][_0x2ce000]=VisuMZ[_0x5355ec(0x858)][_0x5355ec(0x17a)]['Param'][_0x5355ec(0x21a)][_0x5355ec(0x485)](this,_0x42049a),this[_0x5355ec(0x32a)][_0x2ce000];},Game_BattlerBase['prototype'][_0x500928(0x2c3)]=function(_0x24a42f){const _0x2d693e=_0x500928,_0x37a5a9=(_0x45b677,_0x13b623)=>{const _0xac75c2=_0x455b;if(!_0x13b623)return _0x45b677;if(_0x13b623[_0xac75c2(0x508)][_0xac75c2(0x6ad)](VisuMZ[_0xac75c2(0x858)][_0xac75c2(0x51e)][_0xac75c2(0x4a3)][_0x24a42f])){var _0x99cbbb=Number(RegExp['$1'])/0x64;_0x45b677+=_0x99cbbb;}if(_0x13b623[_0xac75c2(0x508)]['match'](VisuMZ[_0xac75c2(0x858)]['RegExp'][_0xac75c2(0xf3)][_0x24a42f])){var _0x99cbbb=Number(RegExp['$1']);_0x45b677+=_0x99cbbb;}if(_0x13b623[_0xac75c2(0x508)][_0xac75c2(0x6ad)](VisuMZ[_0xac75c2(0x858)]['RegExp']['sparamPlusJS'][_0x24a42f])){var _0x438370=String(RegExp['$1']);try{_0x45b677+=eval(_0x438370);}catch(_0x426f24){if($gameTemp[_0xac75c2(0x290)]())console[_0xac75c2(0x415)](_0x426f24);}}return _0x45b677;};return this[_0x2d693e(0x6d1)]()[_0x2d693e(0x7d0)](_0x37a5a9,0x0);},Game_BattlerBase[_0x500928(0x358)]['sparamRate']=function(_0x33c7e6){const _0x5a2fe3=_0x500928,_0x1c94c5=(_0x52cb85,_0x29548c)=>{const _0x21fe61=_0x455b;if(!_0x29548c)return _0x52cb85;if(_0x29548c[_0x21fe61(0x508)][_0x21fe61(0x6ad)](VisuMZ[_0x21fe61(0x858)]['RegExp']['sparamRate1'][_0x33c7e6])){var _0xa81a5=Number(RegExp['$1'])/0x64;_0x52cb85*=_0xa81a5;}if(_0x29548c[_0x21fe61(0x508)][_0x21fe61(0x6ad)](VisuMZ[_0x21fe61(0x858)][_0x21fe61(0x51e)][_0x21fe61(0x844)][_0x33c7e6])){var _0xa81a5=Number(RegExp['$1']);_0x52cb85*=_0xa81a5;}if(_0x29548c[_0x21fe61(0x508)][_0x21fe61(0x6ad)](VisuMZ[_0x21fe61(0x858)]['RegExp'][_0x21fe61(0x198)][_0x33c7e6])){var _0x4da634=String(RegExp['$1']);try{_0x52cb85*=eval(_0x4da634);}catch(_0xbc5cf5){if($gameTemp[_0x21fe61(0x290)]())console[_0x21fe61(0x415)](_0xbc5cf5);}}return _0x52cb85;};return this[_0x5a2fe3(0x6d1)]()['reduce'](_0x1c94c5,0x1);},Game_BattlerBase[_0x500928(0x358)][_0x500928(0x581)]=function(_0x5363f0){const _0x5d3fc2=_0x500928,_0x3d757f=(_0x4ee4e,_0x2a2335)=>{const _0x9b96a5=_0x455b;if(!_0x2a2335)return _0x4ee4e;if(_0x2a2335[_0x9b96a5(0x508)]['match'](VisuMZ['CoreEngine'][_0x9b96a5(0x51e)][_0x9b96a5(0x3c3)][_0x5363f0])){var _0x446037=Number(RegExp['$1'])/0x64;_0x4ee4e+=_0x446037;}if(_0x2a2335['note']['match'](VisuMZ[_0x9b96a5(0x858)][_0x9b96a5(0x51e)][_0x9b96a5(0x204)][_0x5363f0])){var _0x446037=Number(RegExp['$1']);_0x4ee4e+=_0x446037;}if(_0x2a2335[_0x9b96a5(0x508)][_0x9b96a5(0x6ad)](VisuMZ[_0x9b96a5(0x858)][_0x9b96a5(0x51e)][_0x9b96a5(0x361)][_0x5363f0])){var _0x4ed498=String(RegExp['$1']);try{_0x4ee4e+=eval(_0x4ed498);}catch(_0x20c06a){if($gameTemp[_0x9b96a5(0x290)]())console[_0x9b96a5(0x415)](_0x20c06a);}}return _0x4ee4e;};return this[_0x5d3fc2(0x6d1)]()['reduce'](_0x3d757f,0x0);},Game_BattlerBase[_0x500928(0x358)][_0x500928(0x5f3)]=function(_0x296056){const _0x2f754c=_0x500928;let _0x47ba9f=_0x2f754c(0x5f3)+_0x296056+'Total';if(this[_0x2f754c(0x5c9)](_0x47ba9f))return this[_0x2f754c(0x32a)][_0x47ba9f];return this['_cache'][_0x47ba9f]=VisuMZ['CoreEngine'][_0x2f754c(0x17a)][_0x2f754c(0xd3)][_0x2f754c(0x74a)][_0x2f754c(0x485)](this,_0x296056),this[_0x2f754c(0x32a)][_0x47ba9f];},Game_BattlerBase['prototype']['paramValueByName']=function(_0x2ba834,_0x5607b2){const _0x20b4c0=_0x500928;if(typeof paramId===_0x20b4c0(0x5c3))return this[_0x20b4c0(0x838)](_0x2ba834);_0x2ba834=String(_0x2ba834||'')[_0x20b4c0(0x491)]();if(_0x2ba834==='MAXHP')return this['param'](0x0);if(_0x2ba834==='MAXMP')return this[_0x20b4c0(0x838)](0x1);if(_0x2ba834==='ATK')return this['param'](0x2);if(_0x2ba834===_0x20b4c0(0x129))return this[_0x20b4c0(0x838)](0x3);if(_0x2ba834===_0x20b4c0(0x4ca))return this[_0x20b4c0(0x838)](0x4);if(_0x2ba834===_0x20b4c0(0x5fd))return this['param'](0x5);if(_0x2ba834==='AGI')return this['param'](0x6);if(_0x2ba834===_0x20b4c0(0x6fc))return this['param'](0x7);if(_0x2ba834===_0x20b4c0(0x4ed))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x386)](0x0)*0x64))+'%':this[_0x20b4c0(0x386)](0x0);if(_0x2ba834===_0x20b4c0(0x419))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x386)](0x1)*0x64))+'%':this[_0x20b4c0(0x386)](0x1);if(_0x2ba834===_0x20b4c0(0x75a))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x386)](0x2)*0x64))+'%':this[_0x20b4c0(0x386)](0x2);if(_0x2ba834==='CEV')return _0x5607b2?String(Math['round'](this[_0x20b4c0(0x386)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x2ba834==='MEV')return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x386)](0x4)*0x64))+'%':this[_0x20b4c0(0x386)](0x4);if(_0x2ba834===_0x20b4c0(0x10b))return _0x5607b2?String(Math['round'](this[_0x20b4c0(0x386)](0x5)*0x64))+'%':this[_0x20b4c0(0x386)](0x5);if(_0x2ba834==='CNT')return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this['xparam'](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x2ba834===_0x20b4c0(0x81f))return _0x5607b2?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0x20b4c0(0x386)](0x7);if(_0x2ba834===_0x20b4c0(0x121))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x386)](0x8)*0x64))+'%':this[_0x20b4c0(0x386)](0x8);if(_0x2ba834===_0x20b4c0(0x484))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x386)](0x9)*0x64))+'%':this[_0x20b4c0(0x386)](0x9);if(_0x2ba834===_0x20b4c0(0x7cf))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x5f3)](0x0)*0x64))+'%':this[_0x20b4c0(0x5f3)](0x0);if(_0x2ba834==='GRD')return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x5f3)](0x1)*0x64))+'%':this[_0x20b4c0(0x5f3)](0x1);if(_0x2ba834===_0x20b4c0(0x4e0))return _0x5607b2?String(Math['round'](this[_0x20b4c0(0x5f3)](0x2)*0x64))+'%':this[_0x20b4c0(0x5f3)](0x2);if(_0x2ba834===_0x20b4c0(0x796))return _0x5607b2?String(Math['round'](this[_0x20b4c0(0x5f3)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x2ba834===_0x20b4c0(0x41e))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x5f3)](0x4)*0x64))+'%':this[_0x20b4c0(0x5f3)](0x4);if(_0x2ba834===_0x20b4c0(0x402))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x5f3)](0x5)*0x64))+'%':this[_0x20b4c0(0x5f3)](0x5);if(_0x2ba834===_0x20b4c0(0x83d))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x5f3)](0x6)*0x64))+'%':this[_0x20b4c0(0x5f3)](0x6);if(_0x2ba834==='MDR')return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x5f3)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x2ba834===_0x20b4c0(0x62f))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this[_0x20b4c0(0x5f3)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x2ba834===_0x20b4c0(0x518))return _0x5607b2?String(Math[_0x20b4c0(0x7a6)](this['sparam'](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x20b4c0(0x858)][_0x20b4c0(0xed)][_0x2ba834]){const _0x42fece=VisuMZ[_0x20b4c0(0x858)][_0x20b4c0(0xed)][_0x2ba834],_0x1457a9=this[_0x42fece];return VisuMZ['CoreEngine']['CustomParamType'][_0x2ba834]===_0x20b4c0(0x7b7)?_0x1457a9:_0x5607b2?String(Math[_0x20b4c0(0x7a6)](_0x1457a9*0x64))+'%':_0x1457a9;}return'';},Game_BattlerBase['prototype'][_0x500928(0x296)]=function(){const _0x3a2a07=_0x500928;return this[_0x3a2a07(0x571)]()&&this['_hp']<this[_0x3a2a07(0x12c)]*VisuMZ['CoreEngine'][_0x3a2a07(0x17a)][_0x3a2a07(0xd3)][_0x3a2a07(0x182)];},Game_Battler[_0x500928(0x358)][_0x500928(0x211)]=function(){const _0x29ead1=_0x500928;SoundManager['playMiss'](),this['requestMotion'](_0x29ead1(0x35f));},VisuMZ[_0x500928(0x858)]['Game_Actor_paramBase']=Game_Actor[_0x500928(0x358)]['paramBase'],Game_Actor[_0x500928(0x358)]['paramBase']=function(_0x12b41f){const _0x19edd8=_0x500928;if(this[_0x19edd8(0x36a)]>0x63)return this[_0x19edd8(0x6c3)](_0x12b41f);return VisuMZ[_0x19edd8(0x858)][_0x19edd8(0x4ab)]['call'](this,_0x12b41f);},Game_Actor['prototype']['paramBaseAboveLevel99']=function(_0x188ff4){const _0x4a828d=_0x500928,_0x17b208=this[_0x4a828d(0xdd)]()[_0x4a828d(0x708)][_0x188ff4][0x63],_0x389759=this[_0x4a828d(0xdd)]()[_0x4a828d(0x708)][_0x188ff4][0x62];return _0x17b208+(_0x17b208-_0x389759)*(this[_0x4a828d(0x36a)]-0x63);},VisuMZ[_0x500928(0x858)]['Game_Actor_changeClass']=Game_Actor[_0x500928(0x358)][_0x500928(0x5d9)],Game_Actor[_0x500928(0x358)][_0x500928(0x5d9)]=function(_0x24805c,_0x15322b){const _0x1ea19c=_0x500928;$gameTemp[_0x1ea19c(0x6d5)]=!![],VisuMZ[_0x1ea19c(0x858)]['Game_Actor_changeClass'][_0x1ea19c(0x485)](this,_0x24805c,_0x15322b),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x500928(0x858)][_0x500928(0x71b)]=Game_Actor['prototype'][_0x500928(0x3f1)],Game_Actor[_0x500928(0x358)][_0x500928(0x3f1)]=function(){const _0x56ebb2=_0x500928;VisuMZ['CoreEngine'][_0x56ebb2(0x71b)][_0x56ebb2(0x485)](this);if(!$gameTemp['_changingClass'])this[_0x56ebb2(0x77b)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x17bb76=_0x500928;this[_0x17bb76(0x32a)]={};if(VisuMZ[_0x17bb76(0x858)][_0x17bb76(0x17a)][_0x17bb76(0xe1)][_0x17bb76(0x1b9)])this[_0x17bb76(0x82a)]=this[_0x17bb76(0x12c)];if(VisuMZ[_0x17bb76(0x858)]['Settings'][_0x17bb76(0xe1)][_0x17bb76(0x476)])this[_0x17bb76(0x617)]=this[_0x17bb76(0x378)];},Game_Actor['prototype'][_0x500928(0x592)]=function(){const _0xccd953=_0x500928;if(this[_0xccd953(0x397)]())return 0x1;const _0x303bd5=this['nextLevelExp']()-this[_0xccd953(0x69f)](),_0x4fbbd4=this[_0xccd953(0x360)]()-this['currentLevelExp']();return(_0x4fbbd4/_0x303bd5)[_0xccd953(0x21c)](0x0,0x1);},Game_Actor[_0x500928(0x358)]['traitObjects']=function(){const _0x358903=_0x500928,_0x2ebabe=Game_Battler['prototype'][_0x358903(0x6d1)][_0x358903(0x485)](this);for(const _0x1395cf of this[_0x358903(0x39a)]()){_0x1395cf&&_0x2ebabe[_0x358903(0x719)](_0x1395cf);}return _0x2ebabe['push'](this[_0x358903(0xdd)](),this[_0x358903(0x4b2)]()),_0x2ebabe;},Object[_0x500928(0x5d0)](Game_Enemy[_0x500928(0x358)],_0x500928(0x36a),{'get':function(){const _0x4a7f4b=_0x500928;return this[_0x4a7f4b(0x34e)]();},'configurable':!![]}),Game_Enemy[_0x500928(0x358)][_0x500928(0x34e)]=function(){const _0x12039f=_0x500928;return this['enemy']()[_0x12039f(0x36a)];},Game_Enemy[_0x500928(0x358)][_0x500928(0x2b5)]=function(){const _0x19cb7c=_0x500928;!this[_0x19cb7c(0x649)]&&(this[_0x19cb7c(0x619)]+=Math[_0x19cb7c(0x7a6)]((Graphics['height']-0x270)/0x2),this[_0x19cb7c(0x619)]-=Math['floor']((Graphics[_0x19cb7c(0x3ff)]-Graphics[_0x19cb7c(0x4f8)])/0x2),$gameSystem[_0x19cb7c(0x4ad)]()?this[_0x19cb7c(0x32d)]-=Math[_0x19cb7c(0x64f)]((Graphics[_0x19cb7c(0x7c8)]-Graphics[_0x19cb7c(0x174)])/0x2):this['_screenX']+=Math[_0x19cb7c(0x7a6)]((Graphics['boxWidth']-0x330)/0x2)),this[_0x19cb7c(0x649)]=!![];},Game_Party[_0x500928(0x358)]['maxGold']=function(){const _0x191179=_0x500928;return VisuMZ[_0x191179(0x858)]['Settings'][_0x191179(0x78a)][_0x191179(0x451)];},VisuMZ[_0x500928(0x858)][_0x500928(0x16f)]=Game_Party[_0x500928(0x358)][_0x500928(0x263)],Game_Party[_0x500928(0x358)][_0x500928(0x263)]=function(_0x475a9c){const _0x6c31e=_0x500928;if(VisuMZ['CoreEngine'][_0x6c31e(0x17a)][_0x6c31e(0xe1)][_0x6c31e(0x6b7)]&&DataManager[_0x6c31e(0x1ad)](_0x475a9c))return;VisuMZ[_0x6c31e(0x858)][_0x6c31e(0x16f)][_0x6c31e(0x485)](this,_0x475a9c);},Game_Party[_0x500928(0x358)][_0x500928(0x2cc)]=function(){const _0x338b9d=_0x500928,_0x523d06=VisuMZ['CoreEngine'][_0x338b9d(0x17a)][_0x338b9d(0xe1)],_0xfd6134=_0x523d06[_0x338b9d(0x6cf)]??0x63;let _0x26b547=[];(_0x523d06[_0x338b9d(0x614)]??!![])&&(_0x26b547=_0x26b547['concat']($dataItems));(_0x523d06[_0x338b9d(0x5a5)]??!![])&&(_0x26b547=_0x26b547[_0x338b9d(0x30b)]($dataWeapons));(_0x523d06[_0x338b9d(0x5f0)]??!![])&&(_0x26b547=_0x26b547[_0x338b9d(0x30b)]($dataArmors));for(const _0x13cc13 of _0x26b547){if(!_0x13cc13)continue;if(_0x13cc13['name'][_0x338b9d(0x886)]()<=0x0)continue;if(_0x13cc13[_0x338b9d(0x725)][_0x338b9d(0x6ad)](/-----/i))continue;this[_0x338b9d(0x1e2)](_0x13cc13,_0xfd6134);}},VisuMZ[_0x500928(0x858)][_0x500928(0x545)]=Game_Troop[_0x500928(0x358)][_0x500928(0x4d9)],Game_Troop[_0x500928(0x358)]['setup']=function(_0x3e4b62){const _0x431e09=_0x500928;$gameTemp[_0x431e09(0x870)](),$gameTemp[_0x431e09(0x746)](_0x3e4b62),VisuMZ[_0x431e09(0x858)]['Game_Troop_setup'][_0x431e09(0x485)](this,_0x3e4b62);},VisuMZ[_0x500928(0x858)][_0x500928(0x81d)]=Game_Map[_0x500928(0x358)][_0x500928(0x4d9)],Game_Map['prototype']['setup']=function(_0x134205){const _0x1d7f4b=_0x500928;VisuMZ['CoreEngine']['Game_Map_setup'][_0x1d7f4b(0x485)](this,_0x134205),this[_0x1d7f4b(0x188)](),this[_0x1d7f4b(0x387)](_0x134205),this[_0x1d7f4b(0x2e0)]();},Game_Map[_0x500928(0x358)][_0x500928(0x387)]=function(){const _0x3e45aa=_0x500928;this[_0x3e45aa(0x66b)]=VisuMZ['CoreEngine'][_0x3e45aa(0x17a)]['QoL'][_0x3e45aa(0x3ac)]||![];const _0x184036=VisuMZ[_0x3e45aa(0x858)]['Settings'][_0x3e45aa(0x470)],_0x2bcbf2=$dataMap?$dataMap[_0x3e45aa(0x508)]||'':'';if(_0x2bcbf2[_0x3e45aa(0x6ad)](/<SHOW TILE SHADOWS>/i))this[_0x3e45aa(0x66b)]=![];else _0x2bcbf2['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x3e45aa(0x66b)]=!![]);if(_0x2bcbf2['match'](/<SCROLL LOCK X>/i))this[_0x3e45aa(0x61b)]()['centerX']=!![],this[_0x3e45aa(0x61b)]()[_0x3e45aa(0x1b4)]=_0x184036['DisplayLockX'];else _0x2bcbf2[_0x3e45aa(0x6ad)](/<SCROLL LOCK X: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x3e45aa(0x532)]=!![],this['centerCameraCheckData']()['displayX']=Number(RegExp['$1']));if(_0x2bcbf2['match'](/<SCROLL LOCK Y>/i))this[_0x3e45aa(0x61b)]()[_0x3e45aa(0x4eb)]=!![],this['centerCameraCheckData']()['displayY']=_0x184036['DisplayLockY'];else _0x2bcbf2[_0x3e45aa(0x6ad)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x3e45aa(0x61b)]()[_0x3e45aa(0x4eb)]=!![],this['centerCameraCheckData']()['displayY']=Number(RegExp['$1']));},Game_Map[_0x500928(0x358)][_0x500928(0x140)]=function(){const _0x5d9390=_0x500928;if(this[_0x5d9390(0x66b)]===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},Game_Map[_0x500928(0x358)][_0x500928(0x188)]=function(){const _0x400f7a=_0x500928,_0x2c88c9=VisuMZ[_0x400f7a(0x858)]['Settings']['ScreenResolution'];this[_0x400f7a(0x58a)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x2c88c9[_0x400f7a(0x529)]){const _0xfdf97b=Graphics[_0x400f7a(0x7c8)]/this['tileWidth']();_0xfdf97b%0x1!==0x0&&Math['ceil'](_0xfdf97b)===this[_0x400f7a(0x7c8)]()&&!this[_0x400f7a(0x3bf)]()&&(this[_0x400f7a(0x58a)]['centerX']=!![],this[_0x400f7a(0x58a)][_0x400f7a(0x1b4)]=_0x2c88c9['DisplayLockX']||0x0);}if(_0x2c88c9[_0x400f7a(0x655)]){const _0x355de2=Graphics[_0x400f7a(0x3ff)]/this['tileHeight']();_0x355de2%0x1!==0x0&&Math[_0x400f7a(0x6fd)](_0x355de2)===this[_0x400f7a(0x3ff)]()&&!this['isLoopVertical']()&&(this[_0x400f7a(0x58a)][_0x400f7a(0x4eb)]=!![],this[_0x400f7a(0x58a)]['displayY']=_0x2c88c9[_0x400f7a(0x52a)]||0x0);}$gameScreen[_0x400f7a(0x22d)]()===0x1&&(this['centerCameraCheckData']()[_0x400f7a(0x532)]&&(this[_0x400f7a(0x299)]=this['centerCameraCheckData']()['displayX']),this[_0x400f7a(0x61b)]()[_0x400f7a(0x4eb)]&&(this[_0x400f7a(0x764)]=this[_0x400f7a(0x61b)]()[_0x400f7a(0x1b3)]));},VisuMZ[_0x500928(0x858)]['Game_Map_setDisplayPos']=Game_Map[_0x500928(0x358)][_0x500928(0x62e)],Game_Map[_0x500928(0x358)][_0x500928(0x62e)]=function(_0x1c9932,_0x233cbf){const _0x30052e=_0x500928;VisuMZ['CoreEngine'][_0x30052e(0x4e9)][_0x30052e(0x485)](this,_0x1c9932,_0x233cbf),$gameScreen[_0x30052e(0x22d)]()===0x1&&(!this[_0x30052e(0x3bf)]()&&this[_0x30052e(0x61b)]()[_0x30052e(0x532)]&&(this['_displayX']=this[_0x30052e(0x61b)]()[_0x30052e(0x1b4)]),!this['isLoopVertical']()&&this[_0x30052e(0x61b)]()[_0x30052e(0x4eb)]&&(this['_displayY']=this[_0x30052e(0x61b)]()[_0x30052e(0x1b3)]));},Game_Map[_0x500928(0x358)]['centerCameraCheckData']=function(){if(this['_centerCameraCheck']===undefined)this['checkCoreEngineDisplayCenter']();return this['_centerCameraCheck'];},VisuMZ['CoreEngine'][_0x500928(0x329)]=Game_Map['prototype'][_0x500928(0x20f)],Game_Map['prototype'][_0x500928(0x20f)]=function(_0x20c0cf){const _0x55df15=_0x500928;if(this['centerCameraCheckData']()[_0x55df15(0x4eb)]&&$gameScreen[_0x55df15(0x22d)]()===0x1){this['_displayY']=this[_0x55df15(0x61b)]()[_0x55df15(0x1b3)];return;}VisuMZ['CoreEngine']['Game_Map_scrollDown'][_0x55df15(0x485)](this,_0x20c0cf);},VisuMZ[_0x500928(0x858)][_0x500928(0x377)]=Game_Map['prototype'][_0x500928(0x2eb)],Game_Map[_0x500928(0x358)][_0x500928(0x2eb)]=function(_0x1c42e3){const _0x302da5=_0x500928;if(this[_0x302da5(0x61b)]()['centerX']&&$gameScreen[_0x302da5(0x22d)]()===0x1){this['_displayX']=this['centerCameraCheckData']()[_0x302da5(0x1b4)];return;}VisuMZ[_0x302da5(0x858)][_0x302da5(0x377)]['call'](this,_0x1c42e3);},VisuMZ[_0x500928(0x858)][_0x500928(0x585)]=Game_Map[_0x500928(0x358)][_0x500928(0x61c)],Game_Map[_0x500928(0x358)]['scrollRight']=function(_0x28c7a5){const _0x57542b=_0x500928;if(this[_0x57542b(0x61b)]()[_0x57542b(0x532)]&&$gameScreen['zoomScale']()===0x1){this[_0x57542b(0x299)]=this[_0x57542b(0x61b)]()[_0x57542b(0x1b4)];return;}VisuMZ[_0x57542b(0x858)]['Game_Map_scrollRight']['call'](this,_0x28c7a5);},VisuMZ[_0x500928(0x858)]['Game_Map_scrollUp']=Game_Map['prototype'][_0x500928(0x669)],Game_Map[_0x500928(0x358)][_0x500928(0x669)]=function(_0x2e0a49){const _0x19ea5e=_0x500928;if(this[_0x19ea5e(0x61b)]()[_0x19ea5e(0x4eb)]&&$gameScreen['zoomScale']()===0x1){this[_0x19ea5e(0x764)]=this[_0x19ea5e(0x61b)]()['displayY'];return;}VisuMZ[_0x19ea5e(0x858)]['Game_Map_scrollUp'][_0x19ea5e(0x485)](this,_0x2e0a49);},Game_Map[_0x500928(0x358)][_0x500928(0x2e0)]=function(){const _0xae59be=_0x500928;this[_0xae59be(0x2df)]={};const _0x37167a=this[_0xae59be(0x7e9)]();if(!_0x37167a)return{};const _0x34765e=_0x37167a[_0xae59be(0x508)]||'',_0x3aa612=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0xb3a66e={};const _0xb760d6=_0x34765e[_0xae59be(0x6ad)](_0x3aa612);if(_0xb760d6)for(const _0x17d9b0 of _0xb760d6){_0x17d9b0[_0xae59be(0x6ad)](_0x3aa612);const _0x4e0ecc=Number(RegExp['$1'])[_0xae59be(0x21c)](0x1,0x10),_0x13c471=String(RegExp['$2'])['split'](',')[_0xae59be(0x1cd)](_0x174741=>Number(_0x174741)[_0xae59be(0x21c)](0x1,0x7));for(const _0x24e9c7 of _0x13c471){_0xb3a66e[_0x24e9c7]=_0x4e0ecc;}}this[_0xae59be(0x2df)]=_0xb3a66e;},Game_Map[_0x500928(0x358)][_0x500928(0x256)]=function(){const _0x8ad6d4=_0x500928;if(this[_0x8ad6d4(0x2df)]===undefined)this[_0x8ad6d4(0x2e0)]();return this['_tileExtendTerrainTags'];},Game_Map[_0x500928(0x358)][_0x500928(0x86a)]=function(_0x233517){const _0x323951=_0x500928;if(_0x233517>=0x400)return![];const _0x167b8f=$gameMap[_0x323951(0x256)]();if(Object['keys'](_0x167b8f)[_0x323951(0x12e)]<=0x0)return![];const _0xfff376=this[_0x323951(0x295)](),_0x1d2441=_0xfff376[_0x233517]>>0xc,_0x15d083=_0x167b8f[_0x1d2441]||0x0;return _0x15d083>0x0;},Game_Map['prototype'][_0x500928(0x7ea)]=function(){const _0x32906f=_0x500928,_0x5cec8b=this[_0x32906f(0x256)]();if(Object[_0x32906f(0x325)](_0x5cec8b)[_0x32906f(0x12e)]<=0x0)return;$spriteset&&($spriteset['removeTileExtendSprites']&&$spriteset[_0x32906f(0x223)](),$spriteset[_0x32906f(0x80e)]&&$spriteset['createTileExtendSprites']());},VisuMZ[_0x500928(0x858)]['Game_Character_processMoveCommand']=Game_Character[_0x500928(0x358)][_0x500928(0x73d)],Game_Character['prototype'][_0x500928(0x73d)]=function(_0x57eda6){const _0x1c3004=_0x500928;try{VisuMZ['CoreEngine']['Game_Character_processMoveCommand'][_0x1c3004(0x485)](this,_0x57eda6);}catch(_0x4a00db){if($gameTemp[_0x1c3004(0x290)]())console[_0x1c3004(0x415)](_0x4a00db);}},Game_Player[_0x500928(0x358)][_0x500928(0x586)]=function(){const _0x3f88ce=_0x500928,_0xaef461=$gameMap[_0x3f88ce(0x728)]();this[_0x3f88ce(0x482)]=Math[_0x3f88ce(0x2be)](_0xaef461)+Math[_0x3f88ce(0x2be)](_0xaef461)+this[_0x3f88ce(0x7a0)]();},Game_Player['prototype'][_0x500928(0x7a0)]=function(){const _0x5c8c32=_0x500928;return $dataMap&&$dataMap['note']&&$dataMap[_0x5c8c32(0x508)][_0x5c8c32(0x6ad)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x5c8c32(0x858)]['Settings'][_0x5c8c32(0xe1)]['EncounterRateMinimum'];},VisuMZ[_0x500928(0x858)][_0x500928(0xe4)]=Game_Event['prototype'][_0x500928(0x819)],Game_Event[_0x500928(0x358)][_0x500928(0x819)]=function(_0xb0cc0,_0x1b6053){const _0x29fce8=_0x500928;return this[_0x29fce8(0x850)]()?this[_0x29fce8(0x127)](_0xb0cc0,_0x1b6053):VisuMZ['CoreEngine'][_0x29fce8(0xe4)][_0x29fce8(0x485)](this,_0xb0cc0,_0x1b6053);},Game_Event[_0x500928(0x358)][_0x500928(0x850)]=function(){const _0x111c2b=_0x500928;return VisuMZ[_0x111c2b(0x858)][_0x111c2b(0x17a)][_0x111c2b(0xe1)][_0x111c2b(0x166)];},Game_Event[_0x500928(0x358)]['checkSmartEventCollision']=function(_0x5d6204,_0x4c9c83){const _0xa6bffc=_0x500928;if(!this[_0xa6bffc(0xd5)]())return![];else{const _0x223e42=$gameMap[_0xa6bffc(0x5e9)](_0x5d6204,_0x4c9c83)[_0xa6bffc(0x729)](_0x51d0c7=>_0x51d0c7[_0xa6bffc(0xd5)]());return _0x223e42[_0xa6bffc(0x12e)]>0x0;}},VisuMZ[_0x500928(0x858)][_0x500928(0x25c)]=Game_Interpreter[_0x500928(0x358)][_0x500928(0x108)],Game_Interpreter['prototype'][_0x500928(0x108)]=function(_0x47d772){const _0x33b44f=_0x500928,_0x4dc01e=this[_0x33b44f(0x5ba)]();return _0x4dc01e['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x33b44f(0x88e)](_0x4dc01e):VisuMZ['CoreEngine']['Game_Interpreter_command105'][_0x33b44f(0x485)](this,_0x47d772);},Game_Interpreter['prototype'][_0x500928(0x5ba)]=function(){const _0x695f10=_0x500928;let _0x2c7ecf='',_0x3fcbd3=this['_index']+0x1;while(this[_0x695f10(0x30c)][_0x3fcbd3]&&this['_list'][_0x3fcbd3][_0x695f10(0x2ee)]===0x195){_0x2c7ecf+=this[_0x695f10(0x30c)][_0x3fcbd3][_0x695f10(0x45b)][0x0]+'\x0a',_0x3fcbd3++;}return _0x2c7ecf;},Game_Interpreter[_0x500928(0x358)]['runCombinedScrollingTextAsCode']=function(_0x50b7d3){const _0x407463=_0x500928;try{eval(_0x50b7d3);}catch(_0x64668c){$gameTemp['isPlaytest']()&&(console[_0x407463(0x415)](_0x407463(0x53a)),console['log'](_0x64668c));}return!![];},VisuMZ[_0x500928(0x858)][_0x500928(0x1e9)]=Game_Interpreter[_0x500928(0x358)][_0x500928(0x773)],Game_Interpreter[_0x500928(0x358)][_0x500928(0x773)]=function(_0x20cc80){const _0x5f44e1=_0x500928;try{VisuMZ[_0x5f44e1(0x858)][_0x5f44e1(0x1e9)][_0x5f44e1(0x485)](this,_0x20cc80);}catch(_0x302494){$gameTemp[_0x5f44e1(0x290)]()&&(console[_0x5f44e1(0x415)](_0x5f44e1(0x2cb)),console[_0x5f44e1(0x415)](_0x302494)),this[_0x5f44e1(0x62b)]();}return!![];},VisuMZ['CoreEngine'][_0x500928(0x29c)]=Game_Interpreter[_0x500928(0x358)][_0x500928(0x18e)],Game_Interpreter['prototype'][_0x500928(0x18e)]=function(_0x6c360b){const _0x5d6eb8=_0x500928;try{VisuMZ['CoreEngine'][_0x5d6eb8(0x29c)][_0x5d6eb8(0x485)](this,_0x6c360b);}catch(_0x5e1b03){$gameTemp[_0x5d6eb8(0x290)]()&&(console['log']('Control\x20Variables\x20Script\x20Error'),console[_0x5d6eb8(0x415)](_0x5e1b03));}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter[_0x500928(0x358)][_0x500928(0x413)],Game_Interpreter[_0x500928(0x358)][_0x500928(0x413)]=function(){const _0x619c19=_0x500928;try{VisuMZ['CoreEngine'][_0x619c19(0x1c6)]['call'](this);}catch(_0x36bf86){$gameTemp[_0x619c19(0x290)]()&&(console[_0x619c19(0x415)](_0x619c19(0x2d6)),console[_0x619c19(0x415)](_0x36bf86));}return!![];},VisuMZ[_0x500928(0x858)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x500928(0x358)][_0x500928(0x570)],Game_Interpreter['prototype'][_0x500928(0x570)]=function(_0x120391){const _0x6cb4a9=_0x500928;return $gameTemp[_0x6cb4a9(0x19a)](this),VisuMZ['CoreEngine']['Game_Interpreter_PluginCommand']['call'](this,_0x120391);},Scene_Base[_0x500928(0x358)][_0x500928(0x110)]=function(){const _0x1f2ea8=_0x500928;return VisuMZ[_0x1f2ea8(0x858)][_0x1f2ea8(0x17a)]['UI'][_0x1f2ea8(0xcd)];},Scene_Base['prototype'][_0x500928(0x830)]=function(){const _0x1c1414=_0x500928;return VisuMZ[_0x1c1414(0x858)]['Settings']['UI'][_0x1c1414(0x2c2)];},Scene_Base[_0x500928(0x358)][_0x500928(0x789)]=function(){const _0x2951f1=_0x500928;return VisuMZ[_0x2951f1(0x858)]['Settings']['UI']['BottomButtons'];},Scene_Base[_0x500928(0x358)]['isRightInputMode']=function(){const _0x259f7c=_0x500928;return VisuMZ['CoreEngine'][_0x259f7c(0x17a)]['UI'][_0x259f7c(0x857)];},Scene_Base[_0x500928(0x358)]['mainCommandWidth']=function(){const _0x397204=_0x500928;return VisuMZ[_0x397204(0x858)][_0x397204(0x17a)]['UI'][_0x397204(0x768)];},Scene_Base['prototype'][_0x500928(0x7a1)]=function(){const _0x26346e=_0x500928;return VisuMZ[_0x26346e(0x858)][_0x26346e(0x17a)]['UI'][_0x26346e(0x7ce)];},Scene_Base[_0x500928(0x358)][_0x500928(0x783)]=function(){const _0x36d5fd=_0x500928;return VisuMZ[_0x36d5fd(0x858)]['Settings']['Window'][_0x36d5fd(0x199)];},VisuMZ[_0x500928(0x858)][_0x500928(0x1ef)]=Scene_Base['prototype']['createWindowLayer'],Scene_Base[_0x500928(0x358)][_0x500928(0x42f)]=function(){const _0x50278d=_0x500928;VisuMZ[_0x50278d(0x858)][_0x50278d(0x1ef)][_0x50278d(0x485)](this),this[_0x50278d(0xbc)](),this[_0x50278d(0x76e)](),this[_0x50278d(0x67e)]['x']=Math['round'](this[_0x50278d(0x67e)]['x']),this['_windowLayer']['y']=Math[_0x50278d(0x7a6)](this['_windowLayer']['y']);},Scene_Base[_0x500928(0x358)][_0x500928(0xbc)]=function(){},Scene_Base[_0x500928(0x358)][_0x500928(0x76e)]=function(){const _0x343767=_0x500928;this['_textPopupWindow']=new Window_TextPopup(),this[_0x343767(0x86b)](this['_textPopupWindow']);},$textPopup=function(_0x584148){const _0x62192=_0x500928,_0x324f0c=SceneManager['_scene']['_textPopupWindow'];_0x324f0c&&_0x324f0c[_0x62192(0x244)](_0x584148);},Scene_Base['prototype']['buttonAssistKey1']=function(){const _0x593de0=_0x500928;return TextManager[_0x593de0(0x3f8)](_0x593de0(0x5a3),_0x593de0(0xf5));},Scene_Base['prototype'][_0x500928(0x77e)]=function(){const _0x650f4f=_0x500928;return TextManager[_0x650f4f(0x800)]('tab');},Scene_Base[_0x500928(0x358)][_0x500928(0x44b)]=function(){const _0x3bd219=_0x500928;return TextManager[_0x3bd219(0x800)](_0x3bd219(0x533));},Scene_Base['prototype']['buttonAssistKey4']=function(){const _0x4cf505=_0x500928;return TextManager[_0x4cf505(0x800)]('ok');},Scene_Base[_0x500928(0x358)]['buttonAssistKey5']=function(){const _0x46e55b=_0x500928;return TextManager[_0x46e55b(0x800)](_0x46e55b(0xd2));},Scene_Base[_0x500928(0x358)]['buttonAssistText1']=function(){const _0x9ba498=_0x500928;return this[_0x9ba498(0x5e4)]&&this['_pageupButton'][_0x9ba498(0x3a8)]?TextManager[_0x9ba498(0x13e)]:'';},Scene_Base[_0x500928(0x358)][_0x500928(0x703)]=function(){return'';},Scene_Base[_0x500928(0x358)][_0x500928(0x6b6)]=function(){return'';},Scene_Base[_0x500928(0x358)][_0x500928(0x437)]=function(){const _0x9b1028=_0x500928;return TextManager[_0x9b1028(0x2a1)];},Scene_Base[_0x500928(0x358)][_0x500928(0x26c)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x500928(0x358)][_0x500928(0x668)]=function(){return 0x0;},Scene_Base[_0x500928(0x358)][_0x500928(0x141)]=function(){return 0x0;},Scene_Base[_0x500928(0x358)][_0x500928(0x593)]=function(){return 0x0;},Scene_Base[_0x500928(0x358)][_0x500928(0x598)]=function(){return 0x0;},Scene_Base[_0x500928(0x358)][_0x500928(0x2c1)]=function(){return 0x0;},VisuMZ[_0x500928(0x858)][_0x500928(0x705)]=Scene_Boot[_0x500928(0x358)]['loadSystemImages'],Scene_Boot[_0x500928(0x358)][_0x500928(0x479)]=function(){const _0x5964f7=_0x500928;VisuMZ[_0x5964f7(0x858)][_0x5964f7(0x705)][_0x5964f7(0x485)](this),this[_0x5964f7(0x14a)]();},Scene_Boot['prototype'][_0x500928(0x14a)]=function(){const _0x13640c=_0x500928,_0x3d8009=[_0x13640c(0x2da),_0x13640c(0x352),'battlebacks2',_0x13640c(0x5a9),'enemies',_0x13640c(0x298),_0x13640c(0x55d),_0x13640c(0x75f),_0x13640c(0x636),_0x13640c(0x731),'system',_0x13640c(0x45c),'titles1','titles2'];for(const _0x44a049 of _0x3d8009){const _0x567e3d=VisuMZ['CoreEngine']['Settings'][_0x13640c(0x542)][_0x44a049],_0x1f24dc=_0x13640c(0x4bb)[_0x13640c(0xc1)](_0x44a049);for(const _0x51f9e4 of _0x567e3d){ImageManager[_0x13640c(0x6df)](_0x1f24dc,_0x51f9e4);}}},VisuMZ[_0x500928(0x858)]['Scene_Boot_startNormalGame']=Scene_Boot['prototype'][_0x500928(0x610)],Scene_Boot[_0x500928(0x358)]['startNormalGame']=function(){const _0x453524=_0x500928;Utils['isOptionValid'](_0x453524(0x724))&&VisuMZ[_0x453524(0x858)][_0x453524(0x17a)]['QoL'][_0x453524(0x5d5)]?this[_0x453524(0x37b)]():VisuMZ[_0x453524(0x858)][_0x453524(0xe9)][_0x453524(0x485)](this);},Scene_Boot[_0x500928(0x358)][_0x500928(0x37b)]=function(){const _0x4f9ede=_0x500928;this[_0x4f9ede(0x809)](),DataManager[_0x4f9ede(0x146)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x500928(0x358)]['adjustBoxSize']=function(){const _0x341c9d=_0x500928,_0x14e0e8=$dataSystem[_0x341c9d(0x7c2)][_0x341c9d(0x7b5)],_0x187409=$dataSystem[_0x341c9d(0x7c2)][_0x341c9d(0x7a8)],_0x5d25a7=VisuMZ['CoreEngine'][_0x341c9d(0x17a)]['UI']['BoxMargin'];Graphics[_0x341c9d(0x174)]=_0x14e0e8-_0x5d25a7*0x2,Graphics[_0x341c9d(0x4f8)]=_0x187409-_0x5d25a7*0x2,this[_0x341c9d(0x43c)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x6ae)]=Scene_Boot[_0x500928(0x358)][_0x500928(0x4ff)],Scene_Boot[_0x500928(0x358)][_0x500928(0x4ff)]=function(){const _0x17e61c=_0x500928;this[_0x17e61c(0x4af)]()?this[_0x17e61c(0x625)]():VisuMZ[_0x17e61c(0x858)]['Scene_Boot_updateDocumentTitle'][_0x17e61c(0x485)](this);},Scene_Boot['prototype'][_0x500928(0x4af)]=function(){const _0x5c122f=_0x500928;if(Scene_Title[_0x5c122f(0x498)]==='')return![];if(Scene_Title[_0x5c122f(0x498)]==='Subtitle')return![];if(Scene_Title[_0x5c122f(0x7f8)]==='')return![];if(Scene_Title[_0x5c122f(0x7f8)]===_0x5c122f(0x544))return![];return!![];},Scene_Boot[_0x500928(0x358)][_0x500928(0x625)]=function(){const _0x5956d8=_0x500928,_0x5d9f05=$dataSystem[_0x5956d8(0x330)],_0x43b744=Scene_Title[_0x5956d8(0x498)]||'',_0x35c286=Scene_Title[_0x5956d8(0x7f8)]||'',_0x3091e5=VisuMZ[_0x5956d8(0x858)][_0x5956d8(0x17a)][_0x5956d8(0x7bc)]['Title'][_0x5956d8(0x2db)],_0x3dddb8=_0x3091e5['format'](_0x5d9f05,_0x43b744,_0x35c286);document['title']=_0x3dddb8;},Scene_Boot[_0x500928(0x358)][_0x500928(0x43c)]=function(){const _0x53da20=_0x500928;if(VisuMZ[_0x53da20(0x858)]['Settings']['UI']['SideButtons']){const _0x11b3c6=Graphics[_0x53da20(0x7c8)]-Graphics[_0x53da20(0x174)]-VisuMZ[_0x53da20(0x858)][_0x53da20(0x17a)]['UI']['BoxMargin']*0x2,_0x5f39fb=Sprite_Button[_0x53da20(0x358)][_0x53da20(0x2ff)][_0x53da20(0x485)](this)*0x4;if(_0x11b3c6>=_0x5f39fb)SceneManager[_0x53da20(0x623)](!![]);}},Scene_Title['subtitle']=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x7bc)][_0x500928(0x2b7)][_0x500928(0x613)],Scene_Title['version']=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['MenuLayout'][_0x500928(0x2b7)][_0x500928(0x556)],Scene_Title[_0x500928(0x228)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x24d)],VisuMZ[_0x500928(0x858)][_0x500928(0x3db)]=Scene_Title[_0x500928(0x358)]['drawGameTitle'],Scene_Title[_0x500928(0x358)][_0x500928(0x84d)]=function(){const _0x8cd00b=_0x500928;VisuMZ['CoreEngine'][_0x8cd00b(0x17a)][_0x8cd00b(0x7bc)]['Title']['drawGameTitle']['call'](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x8cd00b(0x498)]!==_0x8cd00b(0x613))this['drawGameSubtitle']();if(Scene_Title[_0x8cd00b(0x7f8)]!==''&&Scene_Title['version']!=='0.00')this[_0x8cd00b(0x5fc)]();},Scene_Title['prototype'][_0x500928(0x65f)]=function(){const _0x500a03=_0x500928;VisuMZ[_0x500a03(0x858)][_0x500a03(0x17a)][_0x500a03(0x7bc)][_0x500a03(0x2b7)]['drawGameSubtitle'][_0x500a03(0x485)](this);},Scene_Title['prototype'][_0x500928(0x5fc)]=function(){const _0x1aa37c=_0x500928;VisuMZ[_0x1aa37c(0x858)]['Settings'][_0x1aa37c(0x7bc)]['Title'][_0x1aa37c(0x5fc)][_0x1aa37c(0x485)](this);},Scene_Title[_0x500928(0x358)][_0x500928(0x680)]=function(){const _0xb34bd3=_0x500928;this[_0xb34bd3(0x83b)]();const _0xb84ed0=$dataSystem[_0xb34bd3(0x565)]['background'],_0x52edb1=this[_0xb34bd3(0x6be)]();this[_0xb34bd3(0x663)]=new Window_TitleCommand(_0x52edb1),this['_commandWindow'][_0xb34bd3(0x742)](_0xb84ed0);const _0x4d0b69=this[_0xb34bd3(0x6be)]();this[_0xb34bd3(0x663)][_0xb34bd3(0x252)](_0x4d0b69['x'],_0x4d0b69['y'],_0x4d0b69[_0xb34bd3(0x7c8)],_0x4d0b69[_0xb34bd3(0x3ff)]),this[_0xb34bd3(0x663)]['createContents'](),this[_0xb34bd3(0x663)][_0xb34bd3(0x642)](),this['_commandWindow']['selectLast'](),this[_0xb34bd3(0x516)](this['_commandWindow']);},Scene_Title[_0x500928(0x358)][_0x500928(0x3a4)]=function(){const _0x50ee48=_0x500928;return this[_0x50ee48(0x663)]?this['_commandWindow'][_0x50ee48(0x29a)]():VisuMZ[_0x50ee48(0x858)][_0x50ee48(0x17a)]['TitleCommandList']['length'];},Scene_Title[_0x500928(0x358)]['commandWindowRect']=function(){const _0x33d431=_0x500928;return VisuMZ['CoreEngine'][_0x33d431(0x17a)][_0x33d431(0x7bc)][_0x33d431(0x2b7)][_0x33d431(0x3ab)][_0x33d431(0x485)](this);},Scene_Title[_0x500928(0x358)][_0x500928(0x83b)]=function(){const _0x474483=_0x500928;for(const _0x92b4b7 of Scene_Title[_0x474483(0x228)]){const _0x5c700b=new Sprite_TitlePictureButton(_0x92b4b7);this[_0x474483(0x86b)](_0x5c700b);}},VisuMZ[_0x500928(0x858)]['Scene_Map_initialize']=Scene_Map[_0x500928(0x358)]['initialize'],Scene_Map[_0x500928(0x358)][_0x500928(0x32f)]=function(){const _0x5d386f=_0x500928;VisuMZ[_0x5d386f(0x858)][_0x5d386f(0x5cf)]['call'](this),$gameTemp[_0x5d386f(0x870)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x500928(0x858)][_0x500928(0x134)]=Scene_Map['prototype'][_0x500928(0x162)],Scene_Map[_0x500928(0x358)][_0x500928(0x162)]=function(){const _0x18f0e5=_0x500928;VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply'][_0x18f0e5(0x485)](this),$gameTemp['_playTestFastMode']&&!$gameMessage[_0x18f0e5(0x6cd)]()&&(this[_0x18f0e5(0x2ac)](),SceneManager[_0x18f0e5(0x158)]());},Scene_Map[_0x500928(0x358)]['terminate']=function(){const _0x552039=_0x500928;Scene_Message['prototype']['terminate'][_0x552039(0x485)](this),!SceneManager[_0x552039(0x7de)](Scene_Battle)&&(this[_0x552039(0x871)][_0x552039(0x836)](),this[_0x552039(0x10c)][_0x552039(0x331)](),this[_0x552039(0x67e)][_0x552039(0x3a8)]=![],SceneManager[_0x552039(0x582)]()),$gameScreen[_0x552039(0x31a)](),this[_0x552039(0x441)]();},VisuMZ[_0x500928(0x858)]['Scene_Map_createMenuButton']=Scene_Map[_0x500928(0x358)]['createMenuButton'],Scene_Map[_0x500928(0x358)]['createMenuButton']=function(){const _0x16e298=_0x500928;VisuMZ['CoreEngine'][_0x16e298(0x28b)]['call'](this),SceneManager[_0x16e298(0x74d)]()&&this[_0x16e298(0x328)]();},Scene_Map[_0x500928(0x358)][_0x500928(0x328)]=function(){const _0x4f3425=_0x500928;this['_menuButton']['x']=Graphics[_0x4f3425(0x174)]+0x4;},VisuMZ[_0x500928(0x858)][_0x500928(0x1c3)]=Scene_Map['prototype'][_0x500928(0x375)],Scene_Map[_0x500928(0x358)]['updateScene']=function(){const _0x13d7b9=_0x500928;VisuMZ['CoreEngine'][_0x13d7b9(0x1c3)][_0x13d7b9(0x485)](this),this[_0x13d7b9(0x609)]();},Scene_Map[_0x500928(0x358)]['updateDashToggle']=function(){const _0x14cc24=_0x500928;Input[_0x14cc24(0x5a6)](_0x14cc24(0x80a))&&(ConfigManager['alwaysDash']=!ConfigManager['alwaysDash'],ConfigManager['save']());},VisuMZ[_0x500928(0x858)][_0x500928(0x5c6)]=Scene_Map[_0x500928(0x358)]['updateMain'],Scene_Map[_0x500928(0x358)][_0x500928(0x2ac)]=function(){const _0x1ddf2c=_0x500928;VisuMZ[_0x1ddf2c(0x858)][_0x1ddf2c(0x5c6)][_0x1ddf2c(0x485)](this),this[_0x1ddf2c(0x4e1)]();},Scene_Map[_0x500928(0x358)][_0x500928(0x441)]=function(){const _0x1fc239=_0x500928;this[_0x1fc239(0x851)]=[];},Scene_Map[_0x500928(0x358)][_0x500928(0x4e1)]=function(){const _0x25f1f2=_0x500928;if(!this[_0x25f1f2(0x851)])return;for(const _0x5e3252 of this['_onceParallelInterpreters']){_0x5e3252&&_0x5e3252[_0x25f1f2(0x836)]();}},Scene_Map['prototype']['playOnceParallelInterpreter']=function(_0x3e38d7,_0xd92ea3){const _0x56ebdc=_0x500928,_0x3060a7=$dataCommonEvents[_0x3e38d7];if(!_0x3060a7)return;const _0x2647ea=new Game_OnceParallelInterpreter();this[_0x56ebdc(0x72b)](_0x2647ea),_0x2647ea['setCommonEvent'](_0x3e38d7),_0x2647ea['setEvent'](_0xd92ea3);},Scene_Map[_0x500928(0x358)][_0x500928(0x72b)]=function(_0x4aea75){const _0x5d6c89=_0x500928;this[_0x5d6c89(0x851)]=this[_0x5d6c89(0x851)]||[],this[_0x5d6c89(0x851)][_0x5d6c89(0x719)](_0x4aea75);},Scene_Map[_0x500928(0x358)][_0x500928(0x7ee)]=function(_0x4ca0d0){const _0x1b0465=_0x500928;this[_0x1b0465(0x851)]=this[_0x1b0465(0x851)]||[],this[_0x1b0465(0x851)][_0x1b0465(0x39d)](_0x4ca0d0);};function Game_OnceParallelInterpreter(){const _0x5e6f59=_0x500928;this[_0x5e6f59(0x32f)](...arguments);}function _0x34d4(){const _0x75e9ff=['onInputBannedWords','traitObjects','Window_Base_createContents','Window_NameInput_cursorLeft','updateMove','_changingClass','buttonAssistOffset%1','INOUTEXPO','ParseAllNotetags','onLoad','getLastUsedGamepadType','ColorMaxLvGauge2','Bitmap_clearRect','Scene_MenuBase_createPageButtons','_name','loadBitmap','gaugeRate','MainMenu','RepositionEnemies','valueOutlineColor','_actor','CategoryRect','layoutSettings','updateScrollBarVisibility','setAnglePlusData','_tilemap','exit','OUTQUAD','Exported_Script_%1.txt','skillTypes','isScrollBarVisible','_targetAnchor','Scene_MenuBase_mainAreaHeight','Game_Interpreter_updateWaitMode','_CoreEngineSettings','Sprite_AnimationMV_updatePosition','INOUTQUAD','_downArrowSprite','PixelateImageRendering','loadIconBitmap','get','repositionCancelButtonSideButtonLayout','Bitmap_drawText','_upArrowSprite','LUK','ceil','gaugeHeight','IconParam3','BlurStrength','_lastPluginCommandInterpreter','font-smooth','buttonAssistText2','animationBaseDelay','Scene_Boot_loadSystemImages','_stored_hpGaugeColor2','GameEnd','params','LineHeight','itypeId','contains','BattleSystem','F11','SystemLoadImages','show','ItemStyle','activate','subject','startShake','Bitmap_resize','ExportString','%1〘Choice\x20Cancel〙%1','TRAIT_PARAM','CreateBattleSystemID','push','updateBgmParameters','Game_Actor_levelUp','Graphics_centerElement','Scene_MenuBase_createCancelButton','removeAllPointAnimations','KeySHIFT','initCoreEngineScreenShake','createScrollBarSprites','xparamFlatBonus','processKeyboardDelete','test','name','loadTileBitmap','SEMICOLON','encounterStep','filter','refreshDimmerBitmap','addOnceParallelInterpreter','updateFrame','showFauxAnimations','and\x20add\x20it\x20onto\x20this\x20one.','xparamRate2','restore','sv_enemies','ATK','jsQuickFunc','checkScrollBarBitmap','catchLoadError','ColorManager_loadWindowskin','stretch','none','showIncompleteTilesetError','_customModified','makeTargetSprites','Location','processMoveCommand','F19','right','updateOrigin','<JS\x20%1\x20%2:[\x20](.*)>','setBackgroundType','item','Window_Base_drawCharacter','EquipMenu','applyForcedGameTroopSettingsCoreEngine','normal','NUMPAD7','Padding','SParameterFormula','drawCurrencyValue','VisuMZ_2_BattleSystemCTB','isSideButtonLayout','getCoreEngineScreenShakeStyle','fillRect','isSceneBattle','_onError','drawRightArrow','WIN_ICO_HELP','CLOSE_PAREN','addCommand','isTpb','setSize','_drawTextShadow','damageColor','CRI','goldWindowRect','opacity','Scene_Base_terminate','showDevTools','pictures','destroyScrollBarBitmaps','WIN_OEM_FJ_ROYA','DummyBgType','Scene_Name_create','_displayY','skillId','Sprite_Gauge_gaugeRate','XParamVocab2','CommandWidth','_bgsBuffer','_pollGamepads','_cancelButton','setFrame','backspace','createTextPopupWindow','_statusEquipWindow','position','Scene_GameEnd_createBackground','ExtractStrFromMap','command111','changeTextColor','updateAnglePlus','focus','clone','transform','_stored_powerUpColor','Scene_Battle_createSpriteset_detach','levelUpRecovery','DETACH_PICTURE_CONTAINER','Sprite_destroy','buttonAssistKey2','Window_Selectable_drawBackgroundRect','Map%1','filterArea','StatusParamsRect','isWindowMaskingEnabled','NON_FRAME','_battlerName','%1〘End\x20Choice\x20Selection〙%1','SplitEscape','Scene_Load','isBottomButtonMode','Gold','setupCoreEasing','Input_setupEventHandlers','NumberRect','Sprite_StateIcon_loadBitmap','createEnemies','pitch','sin','ForceNoPlayTest','processPointAnimationRequests','textBaseline','ARRAYSTR','PHA','paramFlatBonus','Plus2','refreshScrollBarBitmap','_commandList','_statusParamsWindow','SParamVocab5','_coreEasingType','toLowerCase','send','encounterStepsMinimum','buttonAreaHeight','successRate','_pictureCoordinatesWindow','inBattle','statusEquipWindowRect','round','IconSParam9','uiAreaHeight','DataManager_setupNewGame','_mapY','F6key','ctrl','Scene_Status_create','ExportCurTroopText','DimColor2','INSERT','LoadMenu','NONCONVERT','HELP','destroy','uiAreaWidth','toLocaleString','integer','_scrollBarHorz','Window_Selectable_processCursorMove','_registerKeyInput','paramchangeTextColor','MenuLayout','RevertPreserveNumbers','Plus','processSoundTimings','CTB','evaded','advanced','_backSprite1','actorWindowRect','_troopId','_forcedBattleSys','setValue','width','removeAnimationFromContainer','(\x5cd+)([%％])>','targetScaleY','strokeRect','Window_Base_drawFace','ButtonHeight','TGR','reduce','_shiftY','Game_Picture_x','CtrlQuickLoad','original','Game_Picture_updateRotation','calcEasing','option','getButtonAssistLocation','INQUINT','mainAreaTopSideButtonLayout','mirror','processEscape','_colorTone','isNextScene','Window_NameInput_cursorRight','Wait','playtestQuickLoad','numRepeats','parseForcedGameTroopSettingsCoreEngine','isCursorMovable','FontSize','GET','DigitGroupingExText','Game_Picture_initBasic','tileset','refreshSpritesetForExtendedTiles','bitmap','openness','updateCoreEasing','removeOnceParallelInterpreter','_scrollDuration','Layer','isSceneMap','MIN_SAFE_INTEGER','NUM','_backgroundSprite','Window_refreshBack','INQUART','offOpacity','version','terminate','canUse','XParamVocab7','maxCols','COMMA','_targetOffsetX','cursorUp','getInputButtonString','_targetOffsetY','drawTextEx','AnimationMirrorOffset','_number','application/json','process_VisuMZ_CoreEngine_Notetags','_inputWindow','BattleManager_update','checkPlayerLocation','dashToggle','_dummyWindow','AutoStretch','_profileWindow','createTileExtendSprites','scrollbar','_sideButtonLayout','Game_Picture_calcEasing','ColorMaxLvGauge1','buttonAssistWindowSideRect','image-rendering','clipboard','tilesetNames','turn','_realScale','isCollidedWithEvents','_paramPlus','rgba(0,\x200,\x200,\x201.0)','Smooth','Game_Map_setup','OUTCUBIC','HRG','keyCode','Chance','Pixelated','maxTp','IconXParam2','thickness','cursorPageup','button','SubfolderParse','CategoryBgType','_hp','tab','TextStr','Game_BattlerBase_refresh','KEEP','_moveEasingType','isBottomHelpMode','OkText','framesMax','NUMPAD8','origin','Tilemap_addShadow','update','XParamVocab8','param','Abbreviation','refreshActor','createTitleButtons','Window_Base_createTextState','PDR','createCustomParameter','CorrectSkinBleeding','angle','windowPadding','_internalTextures','updatePositionCoreEngineShakeVert','sparamRate2','createCustomBackgroundImages','NEAREST','BasicParameterFormula','ProfileRect','destroyed','SCALE_MODES','backgroundBitmap','members','drawGameTitle','IconXParam0','flush','isSmartEventCollisionOn','_onceParallelInterpreters','selectLast','SPACE','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','exportAllMapStrings','AudioChangeBgmPan','RightMenus','CoreEngine','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','createSpriteset','_pauseSignSprite','ENTER_SPECIAL','XParamVocab5','_originalViewport','buttonAssistText1','Window_NameInput_cursorPageup','_baseSprite','IconParam0','CodeJS','gainGold','_pointAnimationSprites','INOUTCIRC','48dbfYNf','layeredTiles','setClickHandler','isTileExtended','addChild','StateIconsNonFrame','_balloonQueue','onMoveEnd','targetScaleX','clearForcedGameTroopSettingsCoreEngine','_spriteset','_sellWindow','INOUTBOUNCE','drawItem','createBuffer','_maxDigits','StartID','xparamPlus','isMapScrollLinked','OffBarOpacity','OptionsBgType','onlyfilename','learnings','Window_StatusBase_drawActorSimpleStatus','Window_MapName_refresh','process_VisuMZ_CoreEngine_ControllerButtons','createExtendedTileSprite','DimColor1','_tileExtendSprites','paramName','KANA','trim','_stored_mpCostColor','updateFauxAnimations','isClosed','destroyCoreEngineMarkedBitmaps','_timerSprite','ExtractStrFromTroop','IDs','runCombinedScrollingTextAsCode','createButtonAssistWindow','STB','setEnemyAction','getBattleSystem','VIEWPORT','format','_logWindow','showPointAnimations','VisuMZ_2_BattleSystemPTB','_backSprite2','smallParamFontSize','responseText','_actorWindow','BackOpacity','Scene_Options_create','style','addChildToBack','FadeSpeed','gainSilentTp','_createInternalTextures','findSymbol','FUNC','cancel','Param','Window_Selectable_cursorDown','isNormalPriority','setMute','SwitchToggleOne','WASD','applyEasingAnglePlus','Input_onKeyDown','createBackground','expGaugeColor2','currentClass','_forcedBattleGridSystem','isSpecialCode','MultiKeyFmt','QoL','Scene_Map_shouldAutosave','drawIconBySize','Game_Event_isCollidedWithEvents','_backgroundFilter','gold','Input_pollGamepads','BarOffset','Scene_Boot_startNormalGame','maxScrollY','_lastY','ONE','CustomParamAbb','ExtJS','%1:\x20Exit\x20','_battleField','nw.gui','_shouldPreventDefault','sparamPlus2','createJsQuickFunction','pagedown','Max','_buyWindow','HelpBgType','ColorMPGauge1','up2','drawIcon','BattleManager_checkSubstitute','scrollY','maxScrollX','textColor','processKeyboardEnd','\x0a\x0a\x0a\x0a\x0a','Graphics_printError','BgType','hideButtonFromView','maxVert','etypeId','_stored_tpGaugeColor1','command105','SkillTypeRect','_hovered','MRF','_mapNameWindow','_drawTextOutline','VariableEvalReference','ParseItemNotetags','fadeSpeed','drawParamName','Window_Selectable_processTouch','playTestF6','createSubSprite','_setupEventHandlers','Game_Picture_scaleY','VisuMZ_1_BattleCore','Window_StatusBase_drawActorLevel','SceneManager_exit','BuyRect','Spriteset_Base_destroy','ActorRect','setEasingType','normalColor','forceStencil','Plus1','MRG','Sprite_Actor_setActorHome','down2','PictureFilename','profileWindowRect','Window_TitleCommand_selectLast','checkSmartEventCollision','en-US','DEF','prepare','IconParam7','mhp','randomJS','length','Game_Picture_angle','defaultInputMode','darwin','xparamRate1','Mute','Scene_Map_updateMainMultiply','retrievePointAnimation','IconXParam6','battleSystem','AccuracyBoost','createChildSprite','_offsetY','initCoreEasing','PictureCoordinatesMode','catchUnknownError','buttonAssistSwitch','(\x5cd+)>','areTileShadowsHidden','buttonAssistOffset2','padding','Game_Picture_move','WIN_OEM_ATTN','_colorCache','setupNewGame','Scene_Battle_createSpriteset','ONE_MINUS_SRC_ALPHA','DigitGroupingLocale','loadGameImagesCoreEngine','clearStencil','WIN_OEM_FJ_TOUROKU','IconSParam2','contentsBack','TextFmt','ExportAllTroopText','ATTN','OnLoadJS','resetBattleSystem','allowShiftScrolling','ButtonAssist','ARRAYJSON','buttonY','updateEffekseer','loadTileset','【%1】\x0a','Window_Base_drawIcon','_shakePower','_isWindow','KeyTAB','catchException','requestPointAnimation','makeInputButtonString','updateMainMultiply','itemLineRect','buttonAssistKey5','drawValue','SmartEventCollisionPriority','iconWidth','CANCEL','updatePositionCoreEngineShakeRand','ColorHPGauge2','attackSkillId','F24','getColorDataFromPluginParameters','isInputting','Game_Party_consumeItem','QwertyLayout','_clickHandler','63GvRjag','ColorNormal','boxWidth','operation','Spriteset_Base_update','Name','updatePictureCoordinates','OptionsRect','Settings','stencilOp','cos','contents','PERCENT','_buttonType','index','F10','CrisisRate','_stored_tpGaugeColor2','SLEEP','cursorRight','BACK_SLASH','ShowItemBackground','checkCoreEngineDisplayCenter','requiredWtypeId1','statusWindowRect','SUBTRACT','buyWindowRect','WIN_OEM_CUSEL','command122','gaugeBackColor','playLoad','EXECUTE','setActorHomeRepositioned','IconSParam6','STR','ZOOM','getPointAnimationLayer','loadWindowskin','sparamRateJS','EnableMasking','setLastPluginCommandInterpreter','StatusBgType','switchModes','Scene_Map_createSpriteset','IconXParam7','Scene_Map_createSpritesetFix','playTestShiftT','LATIN1','setAction','ControllerMatches','Scene_MenuBase_mainAreaTop','createTilemap','ShowScrollBar','DamageColor','itemBackColor2','DisplayedParams','ARRAYNUM','dimColor2','updateMotion','isKeyItem','NewGameCommonEventAll','VisuMZ_4_UniqueTileEffects','process_VisuMZ_CoreEngine_CustomParameters','LEFT','batch','displayY','displayX','_baseTexture','horzJS','replace','checkSubstitute','LevelUpFullHp','Bitmap_drawCircle','INBOUNCE','paramRate','<%1\x20%2:[\x20]','SLASH','endBattlerActions','StatusEquipBgType','ALTGR','Basic','Scene_Map_updateScene','dropItems','Game_Picture_y','Game_Interpreter_command355','Tilemap_addSpotTile','HelpRect','PictureEraseRange','_addShadow','initRotationCoreEngine','drawBackgroundRect','map','KeyboardInput','Map%1.json','animationNextDelay','_lastCommandSymbol','isMagical','_lastOrigin','_effectsContainer','ItemBgType','Renderer','top','Type','anglePlus','pop','tileWidth','onKeyDown','VOLUME_UP','IconSParam3','ShowJS','updateSmoothScroll','imageSmoothingEnabled','gainItem','Bitmap_drawTextOutline','helpWindowRect','_gamepadWait','alignBottom','fontSize','Window_Base_destroyContents','Game_Interpreter_command111','isGamepadConnected','StatusRect','cursorPagedown','setCoreEngineUpdateWindowBg','wait','Scene_Base_createWindowLayer','SceneManager_initialize','isNwjs','_pagedownButton','left','slice','Bitmap_gradientFillRect','AllTroops','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','StatusEquipRect','setTargetAnchor','value','titles1','_patternHeight','_stored_maxLvGaugeColor1','baseTextRect','easingType','paramRate2','_fauxAnimationSprites','open','setViewport','sparamFlat2','ScaleX','\x5c}❪SHIFT❫\x5c{','processCursorMoveModernControls','paramValueByName','Game_Screen_initialize','endAnimation','SParamVocab8','ParamMax','IconParam2','NumberBgType','scrollDown','createCancelButton','performMiss','_muteSound','IconParam4','processCursorHomeEndTrigger','Scene_Battle_createCancelButton','guardSkillId','X:\x20%1','hasEncryptedImages','textWidth','XParameterFormula','Sprite_Battler_startMove','clamp','executeLoad','Scene_Base_terminateAnimationClearBugFix','Bitmap_fillRect','current','asin','DetachBattlePictureContainer','removeTileExtendSprites','isPhysical','Untitled','showPicture','start','pictureButtons','DIVIDE','UNDERSCORE','systemColor','CLOSE_CURLY_BRACKET','zoomScale','Game_Picture_scaleX','RIGHT','itemHeight','setAttack','createTroopNote','renderNoMask','4277259vXPPfQ','initRotation','Finish','src','Input_update','_textQueue','ItemPadding','drawNewParam','drawCircle','setCoreEngineScreenShakeStyle','Spriteset_Map_createTilemap','context','SaveMenu','_editWindow','description','performEscape','addQueue','FINAL','EQUALS','Scene_Shop_create','_playTestFastMode','onActorChange','_commonEventLayers','windowRect','_data','TitlePicButtons','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Window_ShopSell_isEnabled','includes','reserveNewGameCommonEvent','move','_stored_ctGaugeColor1','ASTERISK','_targets','getTileExtendTerrainTags','hpGaugeColor2','playCancel','_image','IconSParam7','xparamPlus2','Game_Interpreter_command105','updateDuration','MaxDuration','DefaultStyle','processTimingData','GroupDigits','1398880qwyngC','consumeItem','Troop%1','isGamepadTriggered','nah','NUMPAD1','pos','NUMPAD9','Window_Base_drawText','overrideMimeType','buttonAssistText5','missed','stencilFunc','drawSegment','Spriteset_Base_isAnimationPlaying','overallWidth','MAX_GL_TEXTURES','F14','VisuMZ_2_BattleSystemBTB','_bgmBuffer','applyCoreEasing','Sprite_Button_updateOpacity','_skillTypeWindow','statusParamsWindowRect','Scene_Menu_create','contentsOpacity','_bitmap','bitmapHeight','Window_Scrollable_update','onDatabaseLoaded','Window_NumberInput_start','clear','SystemSetBattleSystem','\x5c}❪TAB❫\x5c{','ItemMenu','battlebacks2','createTextState','_height','drawAllParams','_stored_mpGaugeColor2','updatePictureSettings','Scene_Map_createMenuButton','close','setViewportCoreEngineFix','setupButtonImage','_duration','isPlaytest','Icon','GoldRect','_pointAnimationQueue','_pictureContainer','tilesetFlags','isDying','_origin','faces','_displayX','maxItems','measureTextWidth','Game_Interpreter_command122','F18','INSINE','DELETE','_tile','buttonAssistOk','MapOnceParallel','setWindowPadding','ActorBgType','isNumpadPressed','SCROLL_LOCK','PTB','pagedownShowButton','_scaleX','movePageButtonSideButtonLayout','onClick','updateMain','_hideButtons','Game_Action_itemEva','saveViewport','sellWindowRect','TextManager_param','VisuMZ_2_BattleSystemETB','jsonToZip','SwitchToggleRange','moveRelativeToResolutionChange','usableSkills','Title','BgFilename2','Scene_Unlisted','Scene_Map_createSpriteset_detach','184482fCPvGd','Game_Picture_initRotation','ExportStrFromAllMaps','randomInt','onInputOk','IconXParam3','buttonAssistOffset5','BottomHelp','sparamPlus','default','_movementDuration','buttonAssistKey4','_rate','initVisuMZCoreEngine','min','CEV','Conditional\x20Branch\x20Script\x20Error','setupBattleTestItems','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','DOWN','AGI','FTB','Linear','process_VisuMZ_CoreEngine_jsQuickFunctions','Window_Base_update','_lastIconIndex','isAutoColorAffected','Script\x20Call\x20Error','EXCLAMATION','anchor','Window','animations','DocumentTitleFmt','escape','([\x5c+\x5c-]\x5cd+)>','EndingID','_tileExtendTerrainTags','setupTileExtendTerrainTags','BarBodyColor','popScene','F7key','OpenURL','_opacity','_updateFilterArea','MODECHANGE','_targetScaleY','updatePositionCoreEngine','BlendMode','scrollLeft','processCursorMove','mute','code','Game_Picture_show','PositionX','wholeDuration','updateOpacity','constructor','Game_Event_start','ctrlKey','cursorLeft','_categoryWindow','Actor-%1-%2','OUTBOUNCE','hpGaugeColor1','》Comment《\x0a%1\x0a','faceHeight','Window_NameInput_initialize','OUTQUART','blockWidth','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','SParamVocab0','areButtonsOutsideMainUI','OUTELASTIC','ShowDevTools','makeCommandList','bitmapWidth','_scene','menuShowButton','Keyboard','helpAreaBottom','concat','_list','horizontal','children','TimeProgress','retrieveFauxAnimation','_startLoading','_drawTextBody','paramY','INQUAD','_tileSprite','MenuBg','Sprite_Picture_loadBitmap','currencyUnit','innerWidth','clearZoom','ParseArmorNotetags','getControllerInputButtonMatch','ParseClassNotetags','PERIOD','process_VisuMZ_CoreEngine_RegExp','_refreshArrows','buttonAssistKey%1','FontShadows','Scene_Battle_update','Center','keys','lastAnimationSprite','isActor','moveMenuButtonSideButtonLayout','Game_Map_scrollDown','_cache','tpCostColor','DummyRect','_screenX','consumable','initialize','gameTitle','hide','EVAL','_digitGrouping','28076arcPgj','_anchor','setHandler','INOUTQUART','reservePlayTestNewGameCommonEvent','startMove','_stored_powerDownColor','backOpacity','processKeyboardHandling','Game_System_initialize','setGuard','BTB','ExtDisplayedParams','stop','TPB\x20WAIT','animationId','updateText','getControllerInputButtonString','xparamFlatJS','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','getLastGamepadUsed','initMembers','_onKeyDown','NUMPAD3','padZero','tpGaugeColor1','getLevel','ExportAllMapText','_startPlaying','updateData','battlebacks1','keyMapper','Sprite_AnimationMV_processTimingData','ScreenShake','indexOf','_storedStack','prototype','_movementWholeDuration','ShiftR_Toggle','PIPE','%1\x0a','SkillMenu','_srcBitmap','evade','currentExp','sparamFlatJS','deselect','getBackgroundOpacity','Scene_Title','createPointAnimationQueue','Input_clear','mpCostColor','_opening','center','level','isMVAnimation','storeMapData','DTB','updatePositionCoreEngineShakeOriginal','WIN_OEM_ENLW','dimColor1','text%1','Input_shouldPreventDefault','NameInputMessage','ColorExpGauge2','updateScene','scale','Game_Map_scrollLeft','mmp','790824eXcMMH','F20','startAutoNewGame','DEFAULT_SHIFT_Y','WIN_ICO_00','targetPosition','_dimmerSprite','ParseTilesetNotetags','DOLLAR','onButtonImageLoad','vertical','_texture','bgmVolume','xparam','setupCoreEngine','setLastGamepadUsed','〘Common\x20Event\x20%1:\x20%2〙\x20Start','filters','destroyContents','ACCEPT','GoldOverlap','_centerElementCoreEngine','setActionState','random','initMembersCoreEngine','maxLvGaugeColor1','data/','GREATER_THAN','_coreEngineShakeStyle','VisuMZ_2_BattleSystemOTB','isMaxLevel','substring','Window_NameInput_cursorUp','equips','KeyUnlisted','isGamepadAxisMoved','remove','itemSuccessRate','isInstanceOfSceneMap','connected','powerUpColor','ShiftT_Toggle','_destroyCanvas','commandWindowRows','getCustomBackgroundSettings','ParseStateNotetags','playTestF7','visible','Game_Picture_updateMove','_tempActor','CommandRect','NoTileShadows','offColor','isOpening','altKey','_animation','startAnimation','drawFace','onKeyDownKeysF6F7','getLastPluginCommandInterpreter','SellRect','NUMPAD4','down','split','_makeFontNameText','updatePointAnimations','ExportStrFromAllTroops','INCIRC','Scene_Equip_create','Flat2','isLoopHorizontal','Game_Action_setAttack','Input_updateGamepadState','HASH','sparamFlat1','_shakeDuration','_storedMapText','Total','updatePlayTestF7','isRepeated','BKSP','isActiveTpb','DATABASE','needsUpdate','_viewportSize','createFauxAnimationQueue','ENTER','ParamArrow','targetEvaRate','_clientArea','12828gXkyIr','redraw','_animationSprites','_stored_ctGaugeColor2','subjectHitRate','_isPlaytest','isAnimationPlaying','menu','Scene_Title_drawGameTitle','updateWaitMode','Game_Action_numRepeats','dummyWindowRect','vertJS','XParamVocab0','playCursor','Graphics_defaultStretchMode','drawTextTopAligned','VisuMZ_2_BattleSystemFTB','paramWidth','setHome','SCROLLBAR','_stored_hpGaugeColor1','PictureID','SnapshotOpacity','quit','_scrollBarVert','Scene_SingleLoadTransition','_closing','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','_mapX','levelUp','GRD','TAB','ColorCrisis','setSideView','numberWindowRect','centerSprite','getInputMultiButtonStrings','Game_Temp_initialize','TargetAngle','CustomParam','createDimmerSprite','expParams','exportAllTroopStrings','height','valueOutlineWidth','Symbol','TCR','_targetX','SystemSetSideView','LINEAR','itemWindowRect','onerror','itemRect','smoothSelect','areButtonsHidden','loadTitle1','_phase','CONTEXT_MENU','currentValue','anchorCoreEasing','removeChild','GoldChange','ButtonFadeSpeed','command355','createKeyJS','log','Bitmap_strokeRect','ParseActorNotetags','resetFontSettings','EVA','printError','SideView','windowOpacity','processFauxAnimationRequests','MCR','updateBackOpacity','Sprite_Gauge_currentValue','_loadingState','blt','TextJS','REPLACE','ListBgType','_showDevTools','WIN_OEM_BACKTAB','PositionY','RowSpacing','VariableJsBlock','Spriteset_Base_updatePosition','stypeId','isFauxAnimationPlaying','innerHeight','createWindowLayer','createFauxAnimationSprite','RepositionEnemies130','DigitGroupingGaugeSprites','ShowButtons','setupCustomRateCoreEngine','_action','AudioChangeBgsPan','buttonAssistText4','OUTSINE','Speed','Sprite_Picture_updateOrigin','INOUTSINE','determineSideButtonLayoutValid','IconXParam9','setBackgroundOpacity','atbActive','categoryWindowRect','clearOnceParallelInterpreters','loadBitmapCoreEngine','initialLevel','render','adjustSprite','updateAnchor','playCursorSound','ColorTPCost','_statusWindow','isGamepadButtonPressed','buttonAssistKey3','makeCoreEngineCommandList','MAXHP','_blank','itemEva','GoldBgType','GoldMax','ColorHPGauge1','Class-%1-%2','_stored_pendingColor','OUTBACK','〘Common\x20Event\x20%1:\x20%2〙\x20End','EnableNameInput','Origin','DOUBLE_QUOTE','string','parameters','tilesets','QUESTION_MARK','CommandBgType','ETB','ProfileBgType','drawGoldItemStyle','_centerElement','isItem','pan','XParamVocab9','Y:\x20%1','setMainFontSize','adjustPictureAntiZoom','helpAreaTop','hit','targets','mainFontSize','apply','eva','PictureEraseAll','ScreenResolution','processHandling','MAXMP','$dataMap','_goldWindow','updateCurrentEvent','LevelUpFullMp','stringKeyMap','makeAutoBattleActions','loadSystemImages','IconSParam5','_stored_expGaugeColor1','_currentBgs','reserveCommonEvent','Scene_Name_onInputOk','Flat1','isPressed','removeAllFauxAnimations','_encounterCount','ActorTPColor','TRG','call','expGaugeColor1','CONVERT','sqrt','applyEasing','createContents','mainAreaBottom','getColor','pixelated','VisuMZ_1_OptionsCore','measureTextWidthNoRounding','writeFile','toUpperCase','setMoveEasingType','IconParam1','alphabetic','win32','ColorCTGauge2','Scene_Item_create','subtitle','framesMin','Rate2','Spriteset_Base_initialize','outbounce','textSizeEx','deflate','Window_NameInput_cursorPagedown','isPlaying','WIN_OEM_PA3','isOpen','sparamPlus1','isHandled','status','ctGaugeColor2','optSideView','recoverAll','Window_NameInput_processTouch','_url','Game_Actor_paramBase','BannedWords','isSideView','maxLevel','isFullDocumentTitle','scaleX','IconXParam8','actor','isUseModernControls','Scene_Map_update','useFontWidthFix','refreshWithTextCodeSupport','seVolume','end','object','isMaskingEnabled','img/%1/','AudioChangeBgmVolume','autoRemovalTiming','_allTextHeight','operand','_forcedTroopView','UpdatePictureCoordinates','erasePicture','WindowLayer_render','xparamFlat2','Bitmap_blt','text','arePageButtonsEnabled','Window_Selectable_cursorUp','OPEN_CURLY_BRACKET','MAT','_context','Scene_Base_create','Weapon-%1-%2','_saveFileID','registerCommand','PreserveNumbers','AudioChangeBgmPitch','drawActorExpGauge','Scene_TitleTransition','BarThickness','outlineColorDmg','AudioChangeBgsVolume','volume','updatePadding','setup','parse','EnableJS','Sprite_Animation_setViewport','AdjustAngle','tpColor','maxHorz','REC','updateOnceParallelInterpreters','_cacheScaleY','CAPSLOCK','setTileFrame','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','rowSpacing','_animationQueue','markCoreEngineModified','Game_Map_setDisplayPos','paramRate1','centerY','inbounce','HIT','_stored_normalColor','MDR','_onLoad','paramFlat','savefileInfo','Color','DefaultMode','updateTransform','isGameActive','isClosing','boxHeight','targetContentsOpacity','DurationPerChat','enableDigitGroupingEx','_playtestF7Looping','itemHitImprovedAccuracy','ApplyEasing','updateDocumentTitle','IconParam5','gradientFillRect','Actor','picture','SHIFT','ColorSystem','itemHit','font','note','offset','processAlwaysEscape','HANJA','worldTransform','keypress','SlotBgType','ParseEnemyNotetags','SETTINGS','framebuffer','MinDuration','maxTurns','setupRate','enableDigitGrouping','addWindow','VisuMZ_2_BattleSystemSTB','EXR','JSON','COLON','addLoadListener','processKeyboardDigitChange','_lastGamepad','RegExp','Scene_Skill_create','useDigitGroupingEx','yScrollLinkedOffset','sceneTerminationClearEffects','resize','setupScrollBarBitmap','doesNameContainBannedWords','CustomParamNames','Scene_Battle_createSpritesetFix','isCancelled','AutoScrollLockX','DisplayLockY','_updateGamepadState','EISU','438rYbTPM','drawCurrentParam','globalAlpha','drawCharacter','lineHeight','centerX','shift','_itemWindow','paramMaxJS','EnableNumberInput','xparamPlusJS','XParamVocab6','colSpacing','Show\x20Scrolling\x20Text\x20Script\x20Error','Flat','InputBgType','PictureRotate','Mirror','〘Show\x20Text〙\x0a','optionsWindowRect','DrawItemBackgroundJS','ImgLoad','initCoreEngine','0.00','Game_Troop_setup','onEscapeSuccess','makeFontBigger','scrollX','paramRateJS','Page','isItemStyle','CallHandlerJS','_helpWindow','CTRL','cancelShowButton','disable','enabled','1.3.0','targetBackOpacity','charAt','F23','Version','targetY','QUOTE','targetOpacity','_refreshPauseSign','EQUAL','isForFriend','parallaxes','drawText','removeAnimation','system','TextCodeClassNames','processTouch','PGDN','SELECT','titleCommandWindow','itemPadding','listWindowRect','DrawIcons','join','outlineColor','add','ActorHPColor','_mirror','scaleY','drawActorClass','command357','isAlive','F16','_listWindow','getKeyboardInputButtonString','_onKeyPress','initButtonHidden','playOk','_buttonAssistWindow','shake','ALWAYS','AMPERSAND','TextCodeNicknames','duration','NUMPAD2','EscapeAlways','ShopMenu','sparamFlatBonus','snapForBackground','isEventTest','isArrowPressed','Game_Map_scrollRight','makeEncounterCount','Sprite_Animation_processSoundTimings','ALT','ctGaugeColor1','_centerCameraCheck','_isButtonHidden','terms','createPointAnimationTargets','Enemy','setAnchor','_refreshBack','catchNormalError','expRate','buttonAssistOffset3','paramFlatJS','drawBackground','repositionEnemiesByResolution','ItemRect','buttonAssistOffset4','DashToggleR','_width','INELASTIC','Window_NumberInput_processDigitChange','bind','isExpGaugeDrawn','maxBattleMembers','SceneManager_onKeyDown','_lastScrollBarValues','Window_Selectable_itemRect','pageup','create','BTestWeapons','isTriggered','IconParam6','keyboard','characters','OpenSpeed','targetX','ConvertParams','ParamName','mpGaugeColor1','ARRAYFUNC','OS_KEY','setTopRow','helpAreaHeight','process_VisuMZ_CoreEngine_Settings','WIN_OEM_WSCTRL','CustomParamIcons','updateBgsParameters','offsetX','FunctionName','_stored_expGaugeColor2','getCombinedScrollingText','_subject','translucentOpacity','drawActorSimpleStatus','cursorDown','_shakeSpeed','setSkill','setActorHome','createPointAnimationSprite','number','mainAreaHeightSideButtonLayout','Bitmap_measureTextWidth','Scene_Map_updateMain','fillStyle','_destroyInternalTextures','checkCacheKey','_active','inputWindowRect','AllMaps','useDigitGrouping','([\x5c+\x5c-]\x5cd+)([%％])>','Scene_Map_initialize','defineProperty','originalJS','CNT','drawActorLevel','CommandList','NewGameBoot','clearRect','639810ZrbzjD','updatePictureAntiZoom','changeClass','isMenuButtonAssistEnabled','StatusMenu','loading','loadSystem','INBACK','SParamVocab1','Window_NameInput_processHandling','PRINT','AudioChangeBgsPitch','_iconIndex','_pageupButton','removeFauxAnimation','%2%1%3','IconXParam4','_windowskin','eventsXyNt','alpha','fillAll','F21','toString','ItemBackColor1','DigitGroupingDamageSprites','BTestArmors','events','_currentMap','sparam','iconHeight','textHeight','ParseWeaponNotetags','AnimationID','WIN_OEM_PA2','shouldAutosave','buttonAssistWindowRect','PictureEasingType','drawGameVersion','MDF','PRESERVCONVERSION(%1)','exp','Window_Base_initialize','changeAnglePlusData','forceOutOfPlaytest','setBattleSystem','Skill-%1-%2','calcCoreEasing','ListRect','SceneManager_isGameActive','removePointAnimation','updateDashToggle','gaugeLineHeight','LoadError','ImprovedAccuracySystem','ValueJS','updateFrameCoreEngine','ExtractStrFromList','startNormalGame','ParamChange','processKeyboardBackspace','Subtitle','BTestItems','BACK_QUOTE','nickname','_mp','xparamFlat1','_screenY','drawParamText','centerCameraCheckData','scrollRight','WIN_OEM_JUMP','CIRCUMFLEX','_stored_crisisColor','CancelText','Duration','blendFunc','setSideButtonLayout','resetTextColor','makeDocumentTitle','WIN_OEM_FJ_LOYA','max','displayName','Bitmap_initialize','ColorPowerUp','skipBranch','_mode','OffBarColor','setDisplayPos','FDR','mapId','isPointAnimationPlaying','getGamepads','buttonAssistWindowButtonRect','tileHeight','SlotRect','sv_actors','SkillTypeBgType','exec','playTestShiftR','onload','STRUCT','MAX_SAFE_INTEGER','numActions','target','isOptionValid','BgFilename1','ARRAYSTRUCT','refresh','Sprite_StateIcon_updateFrame','State-%1-%2','IconSParam8','_inputString','_coreEasing','SwitchRandomizeOne','_repositioned','_defaultStretchMode','ModernControls','MEV','StatusParamsBgType','INOUTBACK','floor','WIN_OEM_AUTO','xScrollLinkedOffset','initBasic','VisuMZ_3_EventChainReact','1.4.4','AutoScrollLockY','_stored_systemColor','_lastX','addAnimationSpriteToContainer','pow','(\x5cd+\x5c.?\x5cd+)>','Upper\x20Left','_fauxAnimationQueue','active','scrollbarHeight','drawGameSubtitle','_anglePlus','playOnceParallelInterpreter','select','_commandWindow','CommonEventID','playBuzzer','createPageButtons','IconIndex','buttonAssistOffset1','scrollUp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_hideTileShadows','updateKeyText','isAnimationForEach','_pictureCoordinatesMode','writeText','isOpenAndActive','maxVisibleItems','OUTCIRC','pages','%1〘Choice\x20%2〙\x20%3%1','maxLvGaugeColor2','openURL','_slotWindow','OTB','createPointAnimation','toFixed','scaleSprite','playBgs','enable','_windowLayer','meVolume','createCommandWindow','skillTypeWindowRect','_inputSpecialKeyCode','mainAreaTop','_addSpotTile','CLOSE_BRACKET','MINUS','BlurFilter','buttonAssistKey1','updateScrollBarPosition','Scene_MenuBase_helpAreaTop','openingSpeed','editWindowRect','platform','list','deathColor','Scene_Boot_onDatabaseLoaded','IconSParam1','isTouchedInsideFrame','_targetScaleX','home','ColorGaugeBack','PA1','repeat','Window_NameInput_cursorDown','playBgm','targetSpritePosition','PAUSE','bgsVolume','STENCIL_BUFFER_BIT','animationShouldMirror','currentLevelExp','createFauxAnimation','ItemBackColor2','updateLastTarget','buttonAssistText%1','rightArrowWidth','ColorMPCost','Window_NameInput_refresh','GoldIcon','updatePosition','_optionsWindow','_currentBgm','PRINTSCREEN','Window_Gold_refresh','match','Scene_Boot_updateDocumentTitle','adjustX','_target','drawGauge','_previousClass','AntiZoomPictures','buttonAssistCancel','GetParamIcon','buttonAssistText3','KeyItemProtect','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','isEnabled','ControllerButtons','loadMapData','targetObjects','_text','commandWindowRect','SParamVocab2','updateShadow','_timeDuration','Sprite_Button_initialize','paramBaseAboveLevel99','_pictureName','initialBattleSystem','CLEAR','CRSEL','save','_cacheScaleX','STENCIL_TEST','paramPlus','seek','isBusy','_digitGroupingEx','BTestAddedQuantity'];_0x34d4=function(){return _0x75e9ff;};return _0x34d4();}Game_OnceParallelInterpreter[_0x500928(0x358)]=Object[_0x500928(0x5a4)](Game_Interpreter[_0x500928(0x358)]),Game_OnceParallelInterpreter['prototype'][_0x500928(0x2f3)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x500928(0x358)]['setCommonEvent']=function(_0x203455){const _0x6790c3=_0x500928,_0x2dcae5=$dataCommonEvents[_0x203455];_0x2dcae5?this[_0x6790c3(0x4d9)](_0x2dcae5['list'],0x0):this[_0x6790c3(0x7f9)]();},Game_OnceParallelInterpreter[_0x500928(0x358)]['setEvent']=function(_0x13c4ef){this['_eventId']=_0x13c4ef||0x0;},Game_OnceParallelInterpreter[_0x500928(0x358)][_0x500928(0x7f9)]=function(){const _0x2a4f90=_0x500928;if(!SceneManager[_0x2a4f90(0x7f1)]())return;SceneManager[_0x2a4f90(0x307)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x2a4f90(0x358)][_0x2a4f90(0x7f9)][_0x2a4f90(0x485)](this);},VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x500928(0x358)]['helpAreaTop'],Scene_MenuBase[_0x500928(0x358)][_0x500928(0x469)]=function(){const _0xa43fc8=_0x500928;let _0x2ca913=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x2ca913=this['helpAreaTopSideButtonLayout']():_0x2ca913=VisuMZ[_0xa43fc8(0x858)][_0xa43fc8(0x68a)][_0xa43fc8(0x485)](this),_0x2ca913;},Scene_MenuBase['prototype']['helpAreaTopSideButtonLayout']=function(){const _0x5e68ba=_0x500928;return this[_0x5e68ba(0x830)]()?this[_0x5e68ba(0x48b)]():0x0;},VisuMZ['CoreEngine'][_0x500928(0x1a4)]=Scene_MenuBase[_0x500928(0x358)]['mainAreaTop'],Scene_MenuBase[_0x500928(0x358)][_0x500928(0x683)]=function(){const _0x27bfe8=_0x500928;return SceneManager[_0x27bfe8(0x302)]()?this[_0x27bfe8(0x7da)]():VisuMZ[_0x27bfe8(0x858)][_0x27bfe8(0x1a4)]['call'](this);},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x7da)]=function(){const _0x40e4b3=_0x500928;if(!this[_0x40e4b3(0x830)]())return this[_0x40e4b3(0x30a)]();else return this[_0x40e4b3(0x5da)]()&&this['getButtonAssistLocation']()===_0x40e4b3(0x1d7)?Window_ButtonAssist[_0x40e4b3(0x358)][_0x40e4b3(0x531)]():0x0;},VisuMZ['CoreEngine'][_0x500928(0x6f0)]=Scene_MenuBase[_0x500928(0x358)]['mainAreaHeight'],Scene_MenuBase[_0x500928(0x358)]['mainAreaHeight']=function(){const _0x306672=_0x500928;let _0x2ba303=0x0;return SceneManager[_0x306672(0x302)]()?_0x2ba303=this['mainAreaHeightSideButtonLayout']():_0x2ba303=VisuMZ[_0x306672(0x858)]['Scene_MenuBase_mainAreaHeight']['call'](this),this[_0x306672(0x5da)]()&&this['getButtonAssistLocation']()!==_0x306672(0x827)&&(_0x2ba303-=Window_ButtonAssist[_0x306672(0x358)]['lineHeight']()),_0x2ba303;},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x5c4)]=function(){const _0x3da0ee=_0x500928;return Graphics[_0x3da0ee(0x4f8)]-this[_0x3da0ee(0x5b2)]();},VisuMZ[_0x500928(0x858)]['Scene_MenuBase_createBackground']=Scene_MenuBase['prototype'][_0x500928(0xdb)],Scene_MenuBase['prototype'][_0x500928(0xdb)]=function(){const _0x2a6f2c=_0x500928,_0x1b788a=VisuMZ[_0x2a6f2c(0x858)][_0x2a6f2c(0x17a)][_0x2a6f2c(0x316)][_0x2a6f2c(0x700)]??0x8;this[_0x2a6f2c(0xe5)]=new PIXI[(_0x2a6f2c(0x38a))][(_0x2a6f2c(0x687))](_0x1b788a),this['_backgroundSprite']=new Sprite(),this[_0x2a6f2c(0x7f4)]['bitmap']=SceneManager[_0x2a6f2c(0x84b)](),this[_0x2a6f2c(0x7f4)][_0x2a6f2c(0x38a)]=[this['_backgroundFilter']],this[_0x2a6f2c(0x86b)](this[_0x2a6f2c(0x7f4)]),this[_0x2a6f2c(0x43e)](0xc0),this[_0x2a6f2c(0x43e)](this[_0x2a6f2c(0x363)]()),this[_0x2a6f2c(0x845)]();},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x363)]=function(){const _0xcb3745=_0x500928,_0x9e6368=String(this[_0xcb3745(0x2f3)][_0xcb3745(0x725)]),_0x1b5be0=this[_0xcb3745(0x3a5)](_0x9e6368);return _0x1b5be0?_0x1b5be0[_0xcb3745(0x3ea)]:0xc0;},Scene_MenuBase['prototype']['createCustomBackgroundImages']=function(){const _0x245ee4=_0x500928,_0x1df413=String(this[_0x245ee4(0x2f3)][_0x245ee4(0x725)]),_0x2b3bf7=this[_0x245ee4(0x3a5)](_0x1df413);_0x2b3bf7&&(_0x2b3bf7[_0x245ee4(0x640)]!==''||_0x2b3bf7[_0x245ee4(0x2b8)]!=='')&&(this[_0x245ee4(0x7c3)]=new Sprite(ImageManager[_0x245ee4(0x40b)](_0x2b3bf7[_0x245ee4(0x640)])),this[_0x245ee4(0xc5)]=new Sprite(ImageManager['loadTitle2'](_0x2b3bf7[_0x245ee4(0x2b8)])),this[_0x245ee4(0x86b)](this[_0x245ee4(0x7c3)]),this[_0x245ee4(0x86b)](this[_0x245ee4(0xc5)]),this['_backSprite1']['bitmap'][_0x245ee4(0x51b)](this[_0x245ee4(0x445)]['bind'](this,this[_0x245ee4(0x7c3)])),this['_backSprite2'][_0x245ee4(0x7eb)][_0x245ee4(0x51b)](this[_0x245ee4(0x445)][_0x245ee4(0x59d)](this,this[_0x245ee4(0xc5)])));},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x3a5)]=function(_0x1ca596){const _0x366c93=_0x500928;return VisuMZ[_0x366c93(0x858)][_0x366c93(0x17a)]['MenuBg'][_0x1ca596]||VisuMZ[_0x366c93(0x858)][_0x366c93(0x17a)][_0x366c93(0x316)][_0x366c93(0x2b9)];},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x445)]=function(_0x361d59){const _0x5d7e7e=_0x500928;this[_0x5d7e7e(0x67b)](_0x361d59),this[_0x5d7e7e(0x3f7)](_0x361d59);},VisuMZ[_0x500928(0x858)][_0x500928(0x71d)]=Scene_MenuBase['prototype']['createCancelButton'],Scene_MenuBase['prototype'][_0x500928(0x210)]=function(){const _0x50c8d9=_0x500928;VisuMZ['CoreEngine'][_0x50c8d9(0x71d)]['call'](this),SceneManager[_0x50c8d9(0x74d)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x500928(0x358)]['moveCancelButtonSideButtonLayout']=function(){const _0x33e064=_0x500928;this[_0x33e064(0x76b)]['x']=Graphics[_0x33e064(0x174)]+0x4;},VisuMZ[_0x500928(0x858)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x500928(0x358)]['createPageButtons'],Scene_MenuBase[_0x500928(0x358)][_0x500928(0x666)]=function(){const _0x8c26fc=_0x500928;VisuMZ[_0x8c26fc(0x858)][_0x8c26fc(0x6dd)][_0x8c26fc(0x485)](this),SceneManager[_0x8c26fc(0x74d)]()&&this[_0x8c26fc(0x2aa)]();},Scene_MenuBase['prototype'][_0x500928(0x2aa)]=function(){const _0x6b51c0=_0x500928;this[_0x6b51c0(0x5e4)]['x']=-0x1*(this[_0x6b51c0(0x5e4)][_0x6b51c0(0x7c8)]+this[_0x6b51c0(0x1f2)][_0x6b51c0(0x7c8)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x6b51c0(0x1f2)][_0x6b51c0(0x7c8)]+0x4);},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x5da)]=function(){const _0x50e775=_0x500928;return VisuMZ[_0x50e775(0x858)][_0x50e775(0x17a)][_0x50e775(0x155)]['Enable'];},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x7d8)]=function(){const _0x2f7a50=_0x500928;return SceneManager[_0x2f7a50(0x74d)]()||SceneManager[_0x2f7a50(0x40a)]()?VisuMZ[_0x2f7a50(0x858)][_0x2f7a50(0x17a)][_0x2f7a50(0x155)][_0x2f7a50(0x73c)]:_0x2f7a50(0x827);},Scene_MenuBase[_0x500928(0x358)][_0x500928(0xbc)]=function(){const _0x409469=_0x500928;if(!this[_0x409469(0x5da)]())return;const _0x24cd44=this['buttonAssistWindowRect']();this[_0x409469(0x578)]=new Window_ButtonAssist(_0x24cd44),this['addWindow'](this[_0x409469(0x578)]);},Scene_MenuBase[_0x500928(0x358)][_0x500928(0x5fa)]=function(){const _0x5a2ccb=_0x500928;return this[_0x5a2ccb(0x7d8)]()===_0x5a2ccb(0x827)?this[_0x5a2ccb(0x633)]():this[_0x5a2ccb(0x813)]();},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x24bb92=_0x500928,_0x1df055=ConfigManager['touchUI']?(Sprite_Button[_0x24bb92(0x358)][_0x24bb92(0x2ff)]()+0x6)*0x2:0x0,_0x41d379=this[_0x24bb92(0x157)](),_0x198fc4=Graphics[_0x24bb92(0x174)]-_0x1df055*0x2,_0x1f46c5=this[_0x24bb92(0x7a1)]();return new Rectangle(_0x1df055,_0x41d379,_0x198fc4,_0x1f46c5);},Scene_MenuBase['prototype'][_0x500928(0x813)]=function(){const _0x40210e=_0x500928,_0xd5375d=Graphics['boxWidth'],_0x161c0d=Window_ButtonAssist[_0x40210e(0x358)][_0x40210e(0x531)](),_0x16cbc2=0x0;let _0x36a1a9=0x0;return this[_0x40210e(0x7d8)]()==='top'?_0x36a1a9=0x0:_0x36a1a9=Graphics[_0x40210e(0x4f8)]-_0x161c0d,new Rectangle(_0x16cbc2,_0x36a1a9,_0xd5375d,_0x161c0d);},Scene_Menu[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x7bc)][_0x500928(0x6e1)],VisuMZ[_0x500928(0x858)][_0x500928(0x27a)]=Scene_Menu[_0x500928(0x358)][_0x500928(0x5a4)],Scene_Menu[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0x39ff02=_0x500928;VisuMZ[_0x39ff02(0x858)][_0x39ff02(0x27a)]['call'](this),this[_0x39ff02(0x1ed)]();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x53c4fe=_0x500928;this[_0x53c4fe(0x663)]&&this[_0x53c4fe(0x663)][_0x53c4fe(0x742)](Scene_Menu[_0x53c4fe(0x6e6)][_0x53c4fe(0x45e)]),this[_0x53c4fe(0x474)]&&this['_goldWindow'][_0x53c4fe(0x742)](Scene_Menu['layoutSettings'][_0x53c4fe(0x450)]),this['_statusWindow']&&this[_0x53c4fe(0x449)]['setBackgroundType'](Scene_Menu['layoutSettings'][_0x53c4fe(0x19b)]);},Scene_Menu[_0x500928(0x358)][_0x500928(0x6be)]=function(){const _0x22a8ac=_0x500928;return Scene_Menu['layoutSettings']['CommandRect'][_0x22a8ac(0x485)](this);},Scene_Menu[_0x500928(0x358)][_0x500928(0x75b)]=function(){const _0x5b8a29=_0x500928;return Scene_Menu[_0x5b8a29(0x6e6)][_0x5b8a29(0x292)][_0x5b8a29(0x485)](this);},Scene_Menu[_0x500928(0x358)]['statusWindowRect']=function(){const _0xf78240=_0x500928;return Scene_Menu[_0xf78240(0x6e6)][_0xf78240(0x1eb)]['call'](this);},Scene_Item['layoutSettings']=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['MenuLayout'][_0x500928(0x284)],VisuMZ[_0x500928(0x858)][_0x500928(0x497)]=Scene_Item[_0x500928(0x358)]['create'],Scene_Item[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0x1e916b=_0x500928;VisuMZ[_0x1e916b(0x858)]['Scene_Item_create']['call'](this),this[_0x1e916b(0x1ed)]();},Scene_Item[_0x500928(0x358)][_0x500928(0x1ed)]=function(){const _0x47f675=_0x500928;this['_helpWindow']&&this[_0x47f675(0x54d)]['setBackgroundType'](Scene_Item[_0x47f675(0x6e6)]['HelpBgType']),this['_categoryWindow']&&this[_0x47f675(0x2f7)][_0x47f675(0x742)](Scene_Item[_0x47f675(0x6e6)][_0x47f675(0x829)]),this[_0x47f675(0x534)]&&this[_0x47f675(0x534)][_0x47f675(0x742)](Scene_Item[_0x47f675(0x6e6)][_0x47f675(0x1d5)]),this[_0x47f675(0xc8)]&&this[_0x47f675(0xc8)][_0x47f675(0x742)](Scene_Item[_0x47f675(0x6e6)][_0x47f675(0x2a4)]);},Scene_Item[_0x500928(0x358)][_0x500928(0x1e4)]=function(){const _0x213774=_0x500928;return Scene_Item[_0x213774(0x6e6)][_0x213774(0x1c8)][_0x213774(0x485)](this);},Scene_Item[_0x500928(0x358)][_0x500928(0x440)]=function(){const _0x274c7a=_0x500928;return Scene_Item[_0x274c7a(0x6e6)][_0x274c7a(0x6e5)][_0x274c7a(0x485)](this);},Scene_Item[_0x500928(0x358)][_0x500928(0x406)]=function(){const _0xe740da=_0x500928;return Scene_Item[_0xe740da(0x6e6)][_0xe740da(0x597)]['call'](this);},Scene_Item['prototype']['actorWindowRect']=function(){const _0x2765d7=_0x500928;return Scene_Item[_0x2765d7(0x6e6)][_0x2765d7(0x11c)][_0x2765d7(0x485)](this);},Scene_Skill[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x7bc)][_0x500928(0x35d)],VisuMZ['CoreEngine'][_0x500928(0x51f)]=Scene_Skill[_0x500928(0x358)][_0x500928(0x5a4)],Scene_Skill[_0x500928(0x358)]['create']=function(){const _0x12ba9a=_0x500928;VisuMZ[_0x12ba9a(0x858)][_0x12ba9a(0x51f)][_0x12ba9a(0x485)](this),this[_0x12ba9a(0x1ed)]();},Scene_Skill[_0x500928(0x358)]['setCoreEngineUpdateWindowBg']=function(){const _0x1cad1c=_0x500928;this[_0x1cad1c(0x54d)]&&this[_0x1cad1c(0x54d)][_0x1cad1c(0x742)](Scene_Skill[_0x1cad1c(0x6e6)][_0x1cad1c(0xf8)]),this['_skillTypeWindow']&&this[_0x1cad1c(0x278)][_0x1cad1c(0x742)](Scene_Skill[_0x1cad1c(0x6e6)][_0x1cad1c(0x637)]),this['_statusWindow']&&this['_statusWindow'][_0x1cad1c(0x742)](Scene_Skill[_0x1cad1c(0x6e6)][_0x1cad1c(0x19b)]),this[_0x1cad1c(0x534)]&&this[_0x1cad1c(0x534)]['setBackgroundType'](Scene_Skill[_0x1cad1c(0x6e6)][_0x1cad1c(0x1d5)]),this[_0x1cad1c(0xc8)]&&this[_0x1cad1c(0xc8)][_0x1cad1c(0x742)](Scene_Skill[_0x1cad1c(0x6e6)]['ActorBgType']);},Scene_Skill[_0x500928(0x358)]['helpWindowRect']=function(){const _0x238403=_0x500928;return Scene_Skill[_0x238403(0x6e6)]['HelpRect']['call'](this);},Scene_Skill[_0x500928(0x358)][_0x500928(0x681)]=function(){const _0x451731=_0x500928;return Scene_Skill[_0x451731(0x6e6)][_0x451731(0x109)]['call'](this);},Scene_Skill[_0x500928(0x358)][_0x500928(0x18a)]=function(){const _0x211ff6=_0x500928;return Scene_Skill[_0x211ff6(0x6e6)][_0x211ff6(0x1eb)][_0x211ff6(0x485)](this);},Scene_Skill[_0x500928(0x358)][_0x500928(0x406)]=function(){const _0x50e208=_0x500928;return Scene_Skill['layoutSettings'][_0x50e208(0x597)][_0x50e208(0x485)](this);},Scene_Skill['prototype'][_0x500928(0x7c4)]=function(){const _0xf40740=_0x500928;return Scene_Skill[_0xf40740(0x6e6)][_0xf40740(0x11c)][_0xf40740(0x485)](this);},Scene_Equip[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x7bc)][_0x500928(0x745)],VisuMZ[_0x500928(0x858)][_0x500928(0x3bd)]=Scene_Equip[_0x500928(0x358)][_0x500928(0x5a4)],Scene_Equip[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0x29a493=_0x500928;VisuMZ[_0x29a493(0x858)]['Scene_Equip_create'][_0x29a493(0x485)](this),this[_0x29a493(0x1ed)]();},Scene_Equip[_0x500928(0x358)][_0x500928(0x1ed)]=function(){const _0xef63fe=_0x500928;this['_helpWindow']&&this[_0xef63fe(0x54d)][_0xef63fe(0x742)](Scene_Equip['layoutSettings'][_0xef63fe(0xf8)]),this[_0xef63fe(0x449)]&&this[_0xef63fe(0x449)]['setBackgroundType'](Scene_Equip[_0xef63fe(0x6e6)][_0xef63fe(0x19b)]),this[_0xef63fe(0x663)]&&this[_0xef63fe(0x663)][_0xef63fe(0x742)](Scene_Equip[_0xef63fe(0x6e6)][_0xef63fe(0x45e)]),this[_0xef63fe(0x677)]&&this[_0xef63fe(0x677)][_0xef63fe(0x742)](Scene_Equip['layoutSettings'][_0xef63fe(0x50e)]),this['_itemWindow']&&this['_itemWindow'][_0xef63fe(0x742)](Scene_Equip[_0xef63fe(0x6e6)][_0xef63fe(0x1d5)]);},Scene_Equip[_0x500928(0x358)][_0x500928(0x1e4)]=function(){const _0x249744=_0x500928;return Scene_Equip['layoutSettings'][_0x249744(0x1c8)][_0x249744(0x485)](this);},Scene_Equip[_0x500928(0x358)][_0x500928(0x18a)]=function(){const _0x46eddd=_0x500928;return Scene_Equip[_0x46eddd(0x6e6)][_0x46eddd(0x1eb)][_0x46eddd(0x485)](this);},Scene_Equip[_0x500928(0x358)][_0x500928(0x6be)]=function(){const _0x155ecf=_0x500928;return Scene_Equip[_0x155ecf(0x6e6)][_0x155ecf(0x3ab)][_0x155ecf(0x485)](this);},Scene_Equip[_0x500928(0x358)]['slotWindowRect']=function(){const _0x2283fe=_0x500928;return Scene_Equip[_0x2283fe(0x6e6)][_0x2283fe(0x635)]['call'](this);},Scene_Equip[_0x500928(0x358)][_0x500928(0x406)]=function(){const _0x2c797b=_0x500928;return Scene_Equip[_0x2c797b(0x6e6)][_0x2c797b(0x597)][_0x2c797b(0x485)](this);},Scene_Status[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['MenuLayout'][_0x500928(0x5db)],VisuMZ[_0x500928(0x858)][_0x500928(0x7ad)]=Scene_Status['prototype'][_0x500928(0x5a4)],Scene_Status[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0x1d9e4f=_0x500928;VisuMZ[_0x1d9e4f(0x858)][_0x1d9e4f(0x7ad)][_0x1d9e4f(0x485)](this),this[_0x1d9e4f(0x1ed)]();},Scene_Status[_0x500928(0x358)][_0x500928(0x1ed)]=function(){const _0x3ff9c1=_0x500928;this[_0x3ff9c1(0x80d)]&&this[_0x3ff9c1(0x80d)][_0x3ff9c1(0x742)](Scene_Status[_0x3ff9c1(0x6e6)][_0x3ff9c1(0x460)]),this[_0x3ff9c1(0x449)]&&this[_0x3ff9c1(0x449)][_0x3ff9c1(0x742)](Scene_Status[_0x3ff9c1(0x6e6)]['StatusBgType']),this[_0x3ff9c1(0x79b)]&&this[_0x3ff9c1(0x79b)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x3ff9c1(0x64d)]),this[_0x3ff9c1(0x76f)]&&this[_0x3ff9c1(0x76f)][_0x3ff9c1(0x742)](Scene_Status[_0x3ff9c1(0x6e6)][_0x3ff9c1(0x1c0)]);},Scene_Status[_0x500928(0x358)][_0x500928(0x125)]=function(){const _0x389c9d=_0x500928;return Scene_Status[_0x389c9d(0x6e6)][_0x389c9d(0x848)]['call'](this);},Scene_Status['prototype'][_0x500928(0x18a)]=function(){const _0x5036c6=_0x500928;return Scene_Status[_0x5036c6(0x6e6)]['StatusRect']['call'](this);},Scene_Status[_0x500928(0x358)][_0x500928(0x279)]=function(){const _0x4e25ac=_0x500928;return Scene_Status['layoutSettings'][_0x4e25ac(0x782)]['call'](this);},Scene_Status[_0x500928(0x358)][_0x500928(0x7a5)]=function(){const _0x20ebee=_0x500928;return Scene_Status[_0x20ebee(0x6e6)][_0x20ebee(0x1f8)]['call'](this);},Scene_Options[_0x500928(0x6e6)]=VisuMZ['CoreEngine'][_0x500928(0x17a)][_0x500928(0x7bc)]['OptionsMenu'],VisuMZ['CoreEngine'][_0x500928(0xca)]=Scene_Options[_0x500928(0x358)]['create'],Scene_Options[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0x17bad7=_0x500928;VisuMZ['CoreEngine'][_0x17bad7(0xca)][_0x17bad7(0x485)](this),this[_0x17bad7(0x1ed)]();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x27821b=_0x500928;this[_0x27821b(0x6a9)]&&this[_0x27821b(0x6a9)]['setBackgroundType'](Scene_Options[_0x27821b(0x6e6)][_0x27821b(0x87b)]);},Scene_Options[_0x500928(0x358)][_0x500928(0x540)]=function(){const _0x12ec26=_0x500928;return Scene_Options[_0x12ec26(0x6e6)][_0x12ec26(0x179)][_0x12ec26(0x485)](this);},Scene_Save[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)]['Settings']['MenuLayout'][_0x500928(0x240)],Scene_Save['prototype'][_0x500928(0x5a4)]=function(){const _0x4d3d2d=_0x500928;Scene_File['prototype'][_0x4d3d2d(0x5a4)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x500928(0x358)][_0x500928(0x1ed)]=function(){const _0x2aa8bb=_0x500928;this[_0x2aa8bb(0x54d)]&&this[_0x2aa8bb(0x54d)]['setBackgroundType'](Scene_Save[_0x2aa8bb(0x6e6)]['HelpBgType']),this[_0x2aa8bb(0x573)]&&this[_0x2aa8bb(0x573)][_0x2aa8bb(0x742)](Scene_Save[_0x2aa8bb(0x6e6)]['ListBgType']);},Scene_Save[_0x500928(0x358)]['helpWindowRect']=function(){const _0x27bf3e=_0x500928;return Scene_Save[_0x27bf3e(0x6e6)][_0x27bf3e(0x1c8)][_0x27bf3e(0x485)](this);},Scene_Save[_0x500928(0x358)][_0x500928(0x567)]=function(){const _0x212dc9=_0x500928;return Scene_Save['layoutSettings'][_0x212dc9(0x606)][_0x212dc9(0x485)](this);},Scene_Load[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x7bc)][_0x500928(0x7b1)],Scene_Load[_0x500928(0x358)]['create']=function(){const _0x1b0472=_0x500928;Scene_File[_0x1b0472(0x358)][_0x1b0472(0x5a4)][_0x1b0472(0x485)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x500928(0x358)]['setCoreEngineUpdateWindowBg']=function(){const _0x1c23bf=_0x500928;this[_0x1c23bf(0x54d)]&&this[_0x1c23bf(0x54d)][_0x1c23bf(0x742)](Scene_Load['layoutSettings'][_0x1c23bf(0xf8)]),this[_0x1c23bf(0x573)]&&this[_0x1c23bf(0x573)][_0x1c23bf(0x742)](Scene_Load[_0x1c23bf(0x6e6)][_0x1c23bf(0x425)]);},Scene_Load[_0x500928(0x358)][_0x500928(0x1e4)]=function(){const _0x220ceb=_0x500928;return Scene_Load[_0x220ceb(0x6e6)]['HelpRect'][_0x220ceb(0x485)](this);},Scene_Load[_0x500928(0x358)][_0x500928(0x567)]=function(){const _0x16abf=_0x500928;return Scene_Load[_0x16abf(0x6e6)][_0x16abf(0x606)][_0x16abf(0x485)](this);};function Scene_QuickLoad(){const _0x4d7892=_0x500928;this[_0x4d7892(0x32f)](...arguments);}Scene_QuickLoad['prototype']=Object[_0x500928(0x5a4)](Scene_Load[_0x500928(0x358)]),Scene_QuickLoad[_0x500928(0x358)][_0x500928(0x2f3)]=Scene_QuickLoad,Scene_QuickLoad['prototype'][_0x500928(0x32f)]=function(){const _0x120f92=_0x500928;Scene_Load[_0x120f92(0x358)][_0x120f92(0x32f)][_0x120f92(0x485)](this);},Scene_QuickLoad[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0xb4d0db=_0x500928;this[_0xb4d0db(0x21d)](this[_0xb4d0db(0x4ce)]);},Scene_QuickLoad['prototype'][_0x500928(0x12a)]=function(_0x60260b){const _0x4a51a0=_0x500928;this[_0x4a51a0(0x4ce)]=_0x60260b;},Scene_QuickLoad[_0x500928(0x358)][_0x500928(0x227)]=function(){const _0x2fcbb4=_0x500928;Scene_MenuBase[_0x2fcbb4(0x358)][_0x2fcbb4(0x227)][_0x2fcbb4(0x485)](this);},Scene_GameEnd[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)]['Settings'][_0x500928(0x7bc)]['GameEnd'],VisuMZ[_0x500928(0x858)][_0x500928(0x771)]=Scene_GameEnd['prototype'][_0x500928(0xdb)],Scene_GameEnd[_0x500928(0x358)][_0x500928(0xdb)]=function(){const _0x339870=_0x500928;Scene_MenuBase[_0x339870(0x358)][_0x339870(0xdb)][_0x339870(0x485)](this);},Scene_GameEnd['prototype'][_0x500928(0x680)]=function(){const _0xf02a97=_0x500928,_0x2ed065=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x2ed065),this[_0xf02a97(0x663)]['setHandler'](_0xf02a97(0xd2),this[_0xf02a97(0x2e2)]['bind'](this)),this['addWindow'](this[_0xf02a97(0x663)]),this['_commandWindow']['setBackgroundType'](Scene_GameEnd[_0xf02a97(0x6e6)][_0xf02a97(0x45e)]);},Scene_GameEnd[_0x500928(0x358)][_0x500928(0x6be)]=function(){const _0x563371=_0x500928;return Scene_GameEnd['layoutSettings'][_0x563371(0x3ab)][_0x563371(0x485)](this);},Scene_Shop[_0x500928(0x6e6)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['MenuLayout'][_0x500928(0x580)],VisuMZ[_0x500928(0x858)][_0x500928(0x247)]=Scene_Shop[_0x500928(0x358)][_0x500928(0x5a4)],Scene_Shop['prototype'][_0x500928(0x5a4)]=function(){const _0x43f433=_0x500928;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x43f433(0x485)](this),this[_0x43f433(0x1ed)]();},Scene_Shop[_0x500928(0x358)][_0x500928(0x1ed)]=function(){const _0x20c9f5=_0x500928;this[_0x20c9f5(0x54d)]&&this['_helpWindow'][_0x20c9f5(0x742)](Scene_Shop[_0x20c9f5(0x6e6)][_0x20c9f5(0xf8)]),this['_goldWindow']&&this[_0x20c9f5(0x474)][_0x20c9f5(0x742)](Scene_Shop['layoutSettings'][_0x20c9f5(0x450)]),this[_0x20c9f5(0x663)]&&this[_0x20c9f5(0x663)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x20c9f5(0x45e)]),this[_0x20c9f5(0x80b)]&&this[_0x20c9f5(0x80b)][_0x20c9f5(0x742)](Scene_Shop[_0x20c9f5(0x6e6)][_0x20c9f5(0x762)]),this['_numberWindow']&&this['_numberWindow'][_0x20c9f5(0x742)](Scene_Shop['layoutSettings'][_0x20c9f5(0x20e)]),this['_statusWindow']&&this[_0x20c9f5(0x449)][_0x20c9f5(0x742)](Scene_Shop[_0x20c9f5(0x6e6)][_0x20c9f5(0x19b)]),this[_0x20c9f5(0xf7)]&&this[_0x20c9f5(0xf7)][_0x20c9f5(0x742)](Scene_Shop[_0x20c9f5(0x6e6)]['BuyBgType']),this[_0x20c9f5(0x2f7)]&&this[_0x20c9f5(0x2f7)]['setBackgroundType'](Scene_Shop[_0x20c9f5(0x6e6)][_0x20c9f5(0x829)]),this[_0x20c9f5(0x872)]&&this['_sellWindow'][_0x20c9f5(0x742)](Scene_Shop[_0x20c9f5(0x6e6)]['SellBgType']);},Scene_Shop[_0x500928(0x358)][_0x500928(0x1e4)]=function(){const _0x10b760=_0x500928;return Scene_Shop[_0x10b760(0x6e6)][_0x10b760(0x1c8)][_0x10b760(0x485)](this);},Scene_Shop[_0x500928(0x358)][_0x500928(0x75b)]=function(){const _0x1cd724=_0x500928;return Scene_Shop[_0x1cd724(0x6e6)][_0x1cd724(0x292)][_0x1cd724(0x485)](this);},Scene_Shop[_0x500928(0x358)][_0x500928(0x6be)]=function(){const _0x195848=_0x500928;return Scene_Shop['layoutSettings']['CommandRect'][_0x195848(0x485)](this);},Scene_Shop[_0x500928(0x358)][_0x500928(0x3de)]=function(){const _0x370c89=_0x500928;return Scene_Shop['layoutSettings'][_0x370c89(0x32c)][_0x370c89(0x485)](this);},Scene_Shop['prototype'][_0x500928(0x3f6)]=function(){const _0x5e50f4=_0x500928;return Scene_Shop[_0x5e50f4(0x6e6)][_0x5e50f4(0x78d)]['call'](this);},Scene_Shop[_0x500928(0x358)]['statusWindowRect']=function(){const _0x39a237=_0x500928;return Scene_Shop[_0x39a237(0x6e6)][_0x39a237(0x1eb)][_0x39a237(0x485)](this);},Scene_Shop[_0x500928(0x358)][_0x500928(0x18c)]=function(){const _0x75adf=_0x500928;return Scene_Shop[_0x75adf(0x6e6)][_0x75adf(0x11a)][_0x75adf(0x485)](this);},Scene_Shop[_0x500928(0x358)]['categoryWindowRect']=function(){const _0x4ea721=_0x500928;return Scene_Shop[_0x4ea721(0x6e6)][_0x4ea721(0x6e5)][_0x4ea721(0x485)](this);},Scene_Shop['prototype'][_0x500928(0x2b0)]=function(){const _0x4b6d57=_0x500928;return Scene_Shop[_0x4b6d57(0x6e6)][_0x4b6d57(0x3b5)][_0x4b6d57(0x485)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x500928(0x858)]['Settings'][_0x500928(0x7bc)]['NameMenu'],VisuMZ[_0x500928(0x858)]['Scene_Name_create']=Scene_Name[_0x500928(0x358)][_0x500928(0x5a4)],Scene_Name[_0x500928(0x358)][_0x500928(0x5a4)]=function(){const _0x283f2b=_0x500928;VisuMZ[_0x283f2b(0x858)][_0x283f2b(0x763)][_0x283f2b(0x485)](this),this[_0x283f2b(0x1ed)]();},Scene_Name[_0x500928(0x358)][_0x500928(0x1ed)]=function(){const _0x247d34=_0x500928;this[_0x247d34(0x241)]&&this[_0x247d34(0x241)][_0x247d34(0x742)](Scene_Name['layoutSettings']['EditBgType']),this[_0x247d34(0x807)]&&this[_0x247d34(0x807)]['setBackgroundType'](Scene_Name[_0x247d34(0x6e6)][_0x247d34(0x53c)]);},Scene_Name[_0x500928(0x358)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x500928(0x358)][_0x500928(0x68c)]=function(){const _0x47847d=_0x500928;return Scene_Name[_0x47847d(0x6e6)]['EditRect'][_0x47847d(0x485)](this);},Scene_Name[_0x500928(0x358)][_0x500928(0x5cb)]=function(){const _0x5f4edd=_0x500928;return Scene_Name[_0x5f4edd(0x6e6)]['InputRect']['call'](this);},Scene_Name[_0x500928(0x358)][_0x500928(0x457)]=function(){const _0xb19495=_0x500928;if(!this[_0xb19495(0x807)])return![];return VisuMZ[_0xb19495(0x858)][_0xb19495(0x17a)][_0xb19495(0x1ce)][_0xb19495(0x457)];},Scene_Name[_0x500928(0x358)][_0x500928(0x688)]=function(){const _0x5795ba=_0x500928;if(this[_0x5795ba(0x457)]()&&this[_0x5795ba(0x807)]['_mode']!==_0x5795ba(0x5a8))return TextManager['getInputMultiButtonStrings'](_0x5795ba(0x5a3),'pagedown');return Scene_MenuBase['prototype'][_0x5795ba(0x688)][_0x5795ba(0x485)](this);},Scene_Name[_0x500928(0x358)]['buttonAssistKey3']=function(){const _0x19b363=_0x500928;return this['EnableNameInput']()?TextManager['getInputButtonString'](_0x19b363(0x82b)):Scene_MenuBase['prototype'][_0x19b363(0x44b)][_0x19b363(0x485)](this);},Scene_Name[_0x500928(0x358)][_0x500928(0x2c6)]=function(){const _0x4ed143=_0x500928;if(this['EnableNameInput']()&&this[_0x4ed143(0x807)]['_mode']===_0x4ed143(0x5a8))return TextManager[_0x4ed143(0x161)]([_0x4ed143(0x3cf)]);return Scene_MenuBase[_0x4ed143(0x358)][_0x4ed143(0x2c6)][_0x4ed143(0x485)](this);},Scene_Name[_0x500928(0x358)][_0x500928(0x164)]=function(){const _0x3cff6b=_0x500928;if(this['EnableNameInput']()&&this['_inputWindow'][_0x3cff6b(0x62c)]==='keyboard')return TextManager[_0x3cff6b(0x161)]([_0x3cff6b(0x3c9)]);return Scene_MenuBase['prototype']['buttonAssistKey5'][_0x3cff6b(0x485)](this);},Scene_Name['prototype']['buttonAssistText1']=function(){const _0x547f2e=_0x500928;if(this[_0x547f2e(0x457)]()&&this[_0x547f2e(0x807)][_0x547f2e(0x62c)]!=='keyboard'){const _0x453a09=VisuMZ[_0x547f2e(0x858)][_0x547f2e(0x17a)][_0x547f2e(0x1ce)];return _0x453a09['PageChange']||_0x547f2e(0x54a);}return Scene_MenuBase[_0x547f2e(0x358)][_0x547f2e(0x85f)]['call'](this);},Scene_Name[_0x500928(0x358)][_0x500928(0x6b6)]=function(){const _0x38fc41=_0x500928;if(this[_0x38fc41(0x457)]()){const _0x41200e=VisuMZ[_0x38fc41(0x858)][_0x38fc41(0x17a)]['KeyboardInput'];return this['_inputWindow'][_0x38fc41(0x62c)]===_0x38fc41(0x5a8)?_0x41200e[_0x38fc41(0x309)]||_0x38fc41(0x309):_0x41200e['Manual']||'Manual';}else return Scene_MenuBase[_0x38fc41(0x358)][_0x38fc41(0x6b6)][_0x38fc41(0x485)](this);},Scene_Name[_0x500928(0x358)][_0x500928(0x437)]=function(){const _0x352e81=_0x500928;if(this[_0x352e81(0x457)]()){const _0x3f269b=VisuMZ[_0x352e81(0x858)]['Settings'][_0x352e81(0x1ce)];if(this[_0x352e81(0x807)][_0x352e81(0x62c)]===_0x352e81(0x5a8))return _0x3f269b[_0x352e81(0x236)]||_0x352e81(0x236);}return Scene_MenuBase[_0x352e81(0x358)][_0x352e81(0x437)][_0x352e81(0x485)](this);},VisuMZ[_0x500928(0x858)]['Scene_Name_onInputOk']=Scene_Name[_0x500928(0x358)][_0x500928(0x2bf)],Scene_Name[_0x500928(0x358)][_0x500928(0x2bf)]=function(){const _0x35da1f=_0x500928;this[_0x35da1f(0x525)]()?this['onInputBannedWords']():VisuMZ[_0x35da1f(0x858)][_0x35da1f(0x47e)][_0x35da1f(0x485)](this);},Scene_Name[_0x500928(0x358)][_0x500928(0x525)]=function(){const _0x48668d=_0x500928,_0x6b96c=VisuMZ['CoreEngine'][_0x48668d(0x17a)][_0x48668d(0x1ce)];if(!_0x6b96c)return![];const _0x3fa0de=_0x6b96c[_0x48668d(0x4ac)];if(!_0x3fa0de)return![];const _0x136aea=this[_0x48668d(0x241)][_0x48668d(0x725)]()['toLowerCase']();for(const _0x2a9cf4 of _0x3fa0de){if(_0x136aea[_0x48668d(0x250)](_0x2a9cf4[_0x48668d(0x79e)]()))return!![];}return![];},Scene_Name[_0x500928(0x358)][_0x500928(0x6d0)]=function(){const _0x1c0d2d=_0x500928;SoundManager[_0x1c0d2d(0x665)]();},VisuMZ[_0x500928(0x858)][_0x500928(0x323)]=Scene_Battle[_0x500928(0x358)]['update'],Scene_Battle[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x68e388=_0x500928;VisuMZ[_0x68e388(0x858)][_0x68e388(0x323)][_0x68e388(0x485)](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x500928(0x358)][_0x500928(0x3c7)]=function(){const _0x4f0e25=_0x500928;!BattleManager[_0x4f0e25(0x16e)]()&&!this['_playtestF7Looping']&&!$gameMessage['isBusy']()&&(this['_playtestF7Looping']=!![],this[_0x4f0e25(0x836)](),SceneManager['updateEffekseer'](),this[_0x4f0e25(0x4fc)]=![]);},VisuMZ[_0x500928(0x858)][_0x500928(0x215)]=Scene_Battle[_0x500928(0x358)][_0x500928(0x210)],Scene_Battle[_0x500928(0x358)][_0x500928(0x210)]=function(){const _0x4ed8d4=_0x500928;VisuMZ['CoreEngine'][_0x4ed8d4(0x215)][_0x4ed8d4(0x485)](this),SceneManager[_0x4ed8d4(0x74d)]()&&this['repositionCancelButtonSideButtonLayout']();},Scene_Battle['prototype'][_0x500928(0x6f9)]=function(){const _0x1190bf=_0x500928;this['_cancelButton']['x']=Graphics[_0x1190bf(0x174)]+0x4,this[_0x1190bf(0x789)]()?this['_cancelButton']['y']=Graphics[_0x1190bf(0x4f8)]-this['buttonAreaHeight']():this[_0x1190bf(0x76b)]['y']=0x0;},VisuMZ[_0x500928(0x858)][_0x500928(0x6c2)]=Sprite_Button['prototype'][_0x500928(0x32f)],Sprite_Button[_0x500928(0x358)]['initialize']=function(_0x5ed8b4){const _0x2c79f6=_0x500928;VisuMZ[_0x2c79f6(0x858)][_0x2c79f6(0x6c2)][_0x2c79f6(0x485)](this,_0x5ed8b4),this[_0x2c79f6(0x576)]();},Sprite_Button[_0x500928(0x358)][_0x500928(0x576)]=function(){const _0x317fe8=_0x500928,_0x28f2f9=VisuMZ[_0x317fe8(0x858)]['Settings']['UI'];this[_0x317fe8(0x58b)]=![];switch(this[_0x317fe8(0x17f)]){case'cancel':this['_isButtonHidden']=!_0x28f2f9[_0x317fe8(0x54f)];break;case'pageup':case _0x317fe8(0xf5):this[_0x317fe8(0x58b)]=!_0x28f2f9[_0x317fe8(0x2a8)];break;case _0x317fe8(0x3b7):case'up':case _0x317fe8(0x123):case _0x317fe8(0xfa):case'ok':this[_0x317fe8(0x58b)]=!_0x28f2f9['numberShowButton'];break;case _0x317fe8(0x3da):this[_0x317fe8(0x58b)]=!_0x28f2f9[_0x317fe8(0x308)];break;}},VisuMZ[_0x500928(0x858)][_0x500928(0x277)]=Sprite_Button[_0x500928(0x358)][_0x500928(0x2f2)],Sprite_Button[_0x500928(0x358)][_0x500928(0x2f2)]=function(){const _0x527b29=_0x500928;SceneManager['areButtonsHidden']()||this[_0x527b29(0x58b)]?this[_0x527b29(0x104)]():VisuMZ[_0x527b29(0x858)]['Sprite_Button_updateOpacity']['call'](this);},Sprite_Button[_0x500928(0x358)][_0x500928(0x104)]=function(){const _0x315dc2=_0x500928;this['visible']=![],this[_0x315dc2(0x75c)]=0x0,this['x']=Graphics[_0x315dc2(0x7c8)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x500928(0x858)]['Sprite_Battler_startMove']=Sprite_Battler[_0x500928(0x358)][_0x500928(0x339)],Sprite_Battler['prototype'][_0x500928(0x339)]=function(_0x204bb1,_0x13781b,_0x1e6f87){const _0x2e288e=_0x500928;(this[_0x2e288e(0x7fe)]!==_0x204bb1||this[_0x2e288e(0x801)]!==_0x13781b)&&(this['setMoveEasingType'](_0x2e288e(0x2d1)),this['_movementWholeDuration']=_0x1e6f87),VisuMZ[_0x2e288e(0x858)][_0x2e288e(0x21b)][_0x2e288e(0x485)](this,_0x204bb1,_0x13781b,_0x1e6f87);},Sprite_Battler[_0x500928(0x358)][_0x500928(0x492)]=function(_0x1993fe){const _0xde39b1=_0x500928;this[_0xde39b1(0x82f)]=_0x1993fe;},Sprite_Battler[_0x500928(0x358)][_0x500928(0x6d4)]=function(){const _0x2c7ac9=_0x500928;if(this[_0x2c7ac9(0x2c5)]<=0x0)return;const _0x252c6d=this[_0x2c7ac9(0x2c5)],_0x504bf1=this[_0x2c7ac9(0x359)],_0x2b6ea5=this[_0x2c7ac9(0x82f)];this['_offsetX']=this[_0x2c7ac9(0x489)](this['_offsetX'],this[_0x2c7ac9(0x7fe)],_0x252c6d,_0x504bf1,_0x2b6ea5),this[_0x2c7ac9(0x13a)]=this['applyEasing'](this[_0x2c7ac9(0x13a)],this[_0x2c7ac9(0x801)],_0x252c6d,_0x504bf1,_0x2b6ea5),this[_0x2c7ac9(0x2c5)]--;if(this[_0x2c7ac9(0x2c5)]<=0x0)this[_0x2c7ac9(0x86e)]();},Sprite_Battler[_0x500928(0x358)][_0x500928(0x489)]=function(_0x2c8415,_0x5324a9,_0x3bac7b,_0x2f4881,_0x7501aa){const _0x1eadc5=_0x500928,_0x2583fb=VisuMZ['ApplyEasing']((_0x2f4881-_0x3bac7b)/_0x2f4881,_0x7501aa||_0x1eadc5(0x2d1)),_0x17de04=VisuMZ['ApplyEasing']((_0x2f4881-_0x3bac7b+0x1)/_0x2f4881,_0x7501aa||_0x1eadc5(0x2d1)),_0xb81549=(_0x2c8415-_0x5324a9*_0x2583fb)/(0x1-_0x2583fb);return _0xb81549+(_0x5324a9-_0xb81549)*_0x17de04;},VisuMZ['CoreEngine'][_0x500928(0x122)]=Sprite_Actor[_0x500928(0x358)][_0x500928(0x5c1)],Sprite_Actor['prototype']['setActorHome']=function(_0x2f2a97){const _0x1dac6a=_0x500928;VisuMZ[_0x1dac6a(0x858)]['Settings']['UI']['RepositionActors']?this[_0x1dac6a(0x192)](_0x2f2a97):VisuMZ[_0x1dac6a(0x858)][_0x1dac6a(0x122)][_0x1dac6a(0x485)](this,_0x2f2a97);},Sprite_Actor[_0x500928(0x358)]['setActorHomeRepositioned']=function(_0x1e5a0b){const _0x332ea7=_0x500928;let _0x236617=Math[_0x332ea7(0x7a6)](Graphics[_0x332ea7(0x7c8)]/0x2+0xc0);_0x236617-=Math[_0x332ea7(0x64f)]((Graphics[_0x332ea7(0x7c8)]-Graphics['boxWidth'])/0x2),_0x236617+=_0x1e5a0b*0x20;let _0x122841=Graphics[_0x332ea7(0x3ff)]-0xc8-$gameParty[_0x332ea7(0x59f)]()*0x30;_0x122841-=Math['floor']((Graphics['height']-Graphics[_0x332ea7(0x4f8)])/0x2),_0x122841+=_0x1e5a0b*0x30,this[_0x332ea7(0x3e6)](_0x236617,_0x122841);},Sprite_Actor['prototype']['retreat']=function(){const _0x404341=_0x500928;this[_0x404341(0x339)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x500928(0xd6)]=function(_0x1e325c){const _0x46dc78=_0x500928;this[_0x46dc78(0x212)]=_0x1e325c;},VisuMZ['CoreEngine'][_0x500928(0x587)]=Sprite_Animation[_0x500928(0x358)][_0x500928(0x7bf)],Sprite_Animation[_0x500928(0x358)]['processSoundTimings']=function(){const _0x2b1168=_0x500928;if(this['_muteSound'])return;VisuMZ['CoreEngine'][_0x2b1168(0x587)][_0x2b1168(0x485)](this);},VisuMZ[_0x500928(0x858)][_0x500928(0x4dc)]=Sprite_Animation[_0x500928(0x358)][_0x500928(0x203)],Sprite_Animation[_0x500928(0x358)][_0x500928(0x203)]=function(_0x31ffd0){const _0x213fea=_0x500928;this['isAnimationOffsetXMirrored']()?this[_0x213fea(0x28d)](_0x31ffd0):VisuMZ['CoreEngine']['Sprite_Animation_setViewport'][_0x213fea(0x485)](this,_0x31ffd0);},Sprite_Animation[_0x500928(0x358)]['isAnimationOffsetXMirrored']=function(){const _0x2f08a7=_0x500928;if(!this[_0x2f08a7(0x3b0)])return![];const _0x2fd02d=this[_0x2f08a7(0x3b0)][_0x2f08a7(0x725)]||'';if(_0x2fd02d[_0x2f08a7(0x6ad)](/<MIRROR OFFSET X>/i))return!![];if(_0x2fd02d[_0x2f08a7(0x6ad)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x2f08a7(0x858)][_0x2f08a7(0x17a)]['QoL'][_0x2f08a7(0x803)];},Sprite_Animation[_0x500928(0x358)][_0x500928(0x28d)]=function(_0x5e3263){const _0x4641c5=_0x500928,_0x11ddd2=this[_0x4641c5(0x3cd)],_0x4f7e42=this[_0x4641c5(0x3cd)],_0x4cb3f3=this[_0x4641c5(0x3b0)][_0x4641c5(0x5b7)]*(this[_0x4641c5(0x56d)]?-0x1:0x1)-_0x11ddd2/0x2,_0x13262f=this['_animation']['offsetY']-_0x4f7e42/0x2,_0x4c3886=this[_0x4641c5(0x37e)](_0x5e3263);_0x5e3263['gl']['viewport'](_0x4cb3f3+_0x4c3886['x'],_0x13262f+_0x4c3886['y'],_0x11ddd2,_0x4f7e42);},Sprite_Animation[_0x500928(0x358)][_0x500928(0x69a)]=function(_0x22cc02){const _0x48f6b6=_0x500928;if(_0x22cc02['_mainSprite']){}const _0x50418a=this[_0x48f6b6(0x3b0)]['name'];let _0x11402e=_0x22cc02[_0x48f6b6(0x3ff)]*_0x22cc02['scale']['y'],_0x14d6d2=0x0,_0x6c78bf=-_0x11402e/0x2;if(_0x50418a[_0x48f6b6(0x6ad)](/<(?:HEAD|HEADER|TOP)>/i))_0x6c78bf=-_0x11402e;if(_0x50418a[_0x48f6b6(0x6ad)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x6c78bf=0x0;if(this[_0x48f6b6(0x3b0)][_0x48f6b6(0x1e6)])_0x6c78bf=0x0;if(_0x50418a[_0x48f6b6(0x6ad)](/<(?:LEFT)>/i))_0x14d6d2=-_0x22cc02[_0x48f6b6(0x7c8)]/0x2;if(_0x50418a['match'](/<(?:RIGHT)>/i))_0x14d6d2=_0x22cc02[_0x48f6b6(0x7c8)]/0x2;_0x50418a[_0x48f6b6(0x6ad)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x14d6d2=Number(RegExp['$1'])*_0x22cc02[_0x48f6b6(0x7c8)]);_0x50418a[_0x48f6b6(0x6ad)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x6c78bf=(0x1-Number(RegExp['$1']))*-_0x11402e);_0x50418a[_0x48f6b6(0x6ad)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x14d6d2=Number(RegExp['$1'])*_0x22cc02[_0x48f6b6(0x7c8)],_0x6c78bf=(0x1-Number(RegExp['$2']))*-_0x11402e);if(_0x50418a[_0x48f6b6(0x6ad)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x14d6d2+=Number(RegExp['$1']);if(_0x50418a[_0x48f6b6(0x6ad)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x6c78bf+=Number(RegExp['$1']);_0x50418a[_0x48f6b6(0x6ad)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x14d6d2+=Number(RegExp['$1']),_0x6c78bf+=Number(RegExp['$2']));const _0x2f16a9=new Point(_0x14d6d2,_0x6c78bf);return _0x22cc02[_0x48f6b6(0x4f5)](),_0x22cc02[_0x48f6b6(0x50c)]['apply'](_0x2f16a9);},Sprite_AnimationMV['prototype'][_0x500928(0x514)]=function(){const _0x31e9ac=_0x500928;this[_0x31e9ac(0x2c7)]=VisuMZ[_0x31e9ac(0x858)][_0x31e9ac(0x17a)][_0x31e9ac(0xe1)]['MvAnimationRate']??0x4,this[_0x31e9ac(0x434)](),this['_rate']=this['_rate']['clamp'](0x1,0xa);},Sprite_AnimationMV[_0x500928(0x358)]['setupCustomRateCoreEngine']=function(){const _0x25d54d=_0x500928;if(!this[_0x25d54d(0x3b0)]);const _0x3ea92c=this['_animation'][_0x25d54d(0x725)]||'';_0x3ea92c['match'](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(Number(RegExp['$1'])||0x1)[_0x25d54d(0x21c)](0x1,0xa));},Sprite_AnimationMV[_0x500928(0x358)][_0x500928(0xd6)]=function(_0x49a327){const _0x1eb8af=_0x500928;this[_0x1eb8af(0x212)]=_0x49a327;},VisuMZ[_0x500928(0x858)][_0x500928(0x354)]=Sprite_AnimationMV[_0x500928(0x358)][_0x500928(0x260)],Sprite_AnimationMV[_0x500928(0x358)]['processTimingData']=function(_0x5277d0){const _0x575ed8=_0x500928;this[_0x575ed8(0x212)]&&(_0x5277d0=JsonEx['makeDeepCopy'](_0x5277d0),_0x5277d0['se']&&(_0x5277d0['se'][_0x575ed8(0x4d7)]=0x0)),VisuMZ[_0x575ed8(0x858)]['Sprite_AnimationMV_processTimingData'][_0x575ed8(0x485)](this,_0x5277d0);},VisuMZ[_0x500928(0x858)][_0x500928(0x6f3)]=Sprite_AnimationMV[_0x500928(0x358)][_0x500928(0x6a8)],Sprite_AnimationMV[_0x500928(0x358)][_0x500928(0x6a8)]=function(){const _0x3ffefc=_0x500928;VisuMZ['CoreEngine'][_0x3ffefc(0x6f3)]['call'](this);if(this[_0x3ffefc(0x3b0)][_0x3ffefc(0x770)]===0x3){if(this['x']===0x0)this['x']=Math[_0x3ffefc(0x7a6)](Graphics[_0x3ffefc(0x7c8)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x3ffefc(0x3ff)]/0x2);}},Sprite_Damage[_0x500928(0x358)]['createDigits']=function(_0x257b84){const _0x42538a=_0x500928;let _0x1383c8=Math['abs'](_0x257b84)[_0x42538a(0x5ed)]();this[_0x42538a(0x5cd)]()&&(_0x1383c8=VisuMZ[_0x42538a(0x261)](_0x1383c8));const _0x4f1935=this[_0x42538a(0x1e7)](),_0x93dad9=Math[_0x42538a(0x64f)](_0x4f1935*0.75);for(let _0x470505=0x0;_0x470505<_0x1383c8[_0x42538a(0x12e)];_0x470505++){const _0x167893=this[_0x42538a(0x139)](_0x93dad9,_0x4f1935);_0x167893[_0x42538a(0x7eb)][_0x42538a(0x55e)](_0x1383c8[_0x470505],0x0,0x0,_0x93dad9,_0x4f1935,_0x42538a(0x369)),_0x167893['x']=(_0x470505-(_0x1383c8[_0x42538a(0x12e)]-0x1)/0x2)*_0x93dad9,_0x167893['dy']=-_0x470505;}},Sprite_Damage[_0x500928(0x358)]['useDigitGrouping']=function(){const _0x387c27=_0x500928;return VisuMZ[_0x387c27(0x858)][_0x387c27(0x17a)]['QoL'][_0x387c27(0x5ef)];},Sprite_Damage[_0x500928(0x358)][_0x500928(0x6e3)]=function(){const _0x95c216=_0x500928;return ColorManager[_0x95c216(0x4d5)]();},VisuMZ['CoreEngine'][_0x500928(0x766)]=Sprite_Gauge[_0x500928(0x358)][_0x500928(0x6e0)],Sprite_Gauge[_0x500928(0x358)]['gaugeRate']=function(){const _0x32e81a=_0x500928;return VisuMZ[_0x32e81a(0x858)][_0x32e81a(0x766)]['call'](this)[_0x32e81a(0x21c)](0x0,0x1);},VisuMZ[_0x500928(0x858)][_0x500928(0x420)]=Sprite_Gauge[_0x500928(0x358)]['currentValue'],Sprite_Gauge[_0x500928(0x358)][_0x500928(0x40e)]=function(){const _0x465a45=_0x500928;let _0x3ac306=VisuMZ[_0x465a45(0x858)][_0x465a45(0x420)][_0x465a45(0x485)](this);return _0x3ac306;},Sprite_Gauge['prototype'][_0x500928(0x165)]=function(){const _0x15ced0=_0x500928;let _0xcc6115=this[_0x15ced0(0x40e)]();this['useDigitGrouping']()&&(_0xcc6115=VisuMZ[_0x15ced0(0x261)](_0xcc6115));const _0x19d816=this['bitmapWidth']()-0x1,_0x4e206c=this[_0x15ced0(0x5f5)]?this['textHeight']():this[_0x15ced0(0x27d)]();this['setupValueFont'](),this[_0x15ced0(0x7eb)][_0x15ced0(0x55e)](_0xcc6115,0x0,0x0,_0x19d816,_0x4e206c,_0x15ced0(0x73f));},Sprite_Gauge['prototype'][_0x500928(0x400)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x500928(0x5cd)]=function(){const _0x12d408=_0x500928;return VisuMZ[_0x12d408(0x858)][_0x12d408(0x17a)]['QoL'][_0x12d408(0x432)];},Sprite_Gauge[_0x500928(0x358)][_0x500928(0x6e3)]=function(){return ColorManager['outlineColorGauge']();},Sprite_StateIcon['NON_FRAME']=VisuMZ[_0x500928(0x858)]['Settings']['UI'][_0x500928(0x86c)]??!![],VisuMZ[_0x500928(0x858)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x500928(0x358)][_0x500928(0x6df)],Sprite_StateIcon[_0x500928(0x358)][_0x500928(0x6df)]=function(){const _0x590b8b=_0x500928;Sprite_StateIcon[_0x590b8b(0x784)]?this[_0x590b8b(0x442)]():VisuMZ[_0x590b8b(0x858)][_0x590b8b(0x78e)][_0x590b8b(0x485)](this);},Sprite_StateIcon['prototype'][_0x500928(0x442)]=function(){const _0x4635c6=_0x500928;this[_0x4635c6(0x7eb)]=new Bitmap(ImageManager[_0x4635c6(0x167)],ImageManager[_0x4635c6(0x5f4)]),this[_0x4635c6(0x35e)]=ImageManager[_0x4635c6(0x5dd)]('IconSet');},VisuMZ[_0x500928(0x858)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x500928(0x358)]['updateFrame'],Sprite_StateIcon[_0x500928(0x358)][_0x500928(0x72c)]=function(){const _0x340c7a=_0x500928;Sprite_StateIcon[_0x340c7a(0x784)]?this[_0x340c7a(0x60e)]():VisuMZ[_0x340c7a(0x858)][_0x340c7a(0x643)][_0x340c7a(0x485)](this);},Sprite_StateIcon[_0x500928(0x358)][_0x500928(0x60e)]=function(){const _0x650614=_0x500928;if(this[_0x650614(0x2d4)]===this[_0x650614(0x5e3)])return;this['_lastIconIndex']=this[_0x650614(0x5e3)];const _0x49d330=ImageManager['iconWidth'],_0x2cbef6=ImageManager['iconHeight'],_0x511595=this['_iconIndex']%0x10*_0x49d330,_0x136ece=Math[_0x650614(0x64f)](this['_iconIndex']/0x10)*_0x2cbef6,_0x5d294f=this['_srcBitmap'],_0x3ab711=this[_0x650614(0x7eb)];_0x3ab711['clear'](),_0x3ab711['blt'](_0x5d294f,_0x511595,_0x136ece,_0x49d330,_0x2cbef6,0x0,0x0,_0x3ab711[_0x650614(0x7c8)],_0x3ab711[_0x650614(0x3ff)]);},VisuMZ['CoreEngine'][_0x500928(0x317)]=Sprite_Picture[_0x500928(0x358)]['loadBitmap'],Sprite_Picture[_0x500928(0x358)][_0x500928(0x6df)]=function(){const _0x22d490=_0x500928;this['_pictureName']&&this[_0x22d490(0x6c4)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x22d490(0x858)][_0x22d490(0x317)]['call'](this);},Sprite_Picture['prototype'][_0x500928(0x6f7)]=function(_0x24e3ff){const _0x18b86d=_0x500928,_0xce449d=ImageManager[_0x18b86d(0x167)],_0x379bc3=ImageManager[_0x18b86d(0x5f4)],_0x35952f=this[_0x18b86d(0x6c4)][_0x18b86d(0x6ad)](/SMOOTH/i);this[_0x18b86d(0x7eb)]=new Bitmap(_0xce449d,_0x379bc3);const _0x56e54a=ImageManager['loadSystem']('IconSet'),_0x3cf919=_0x24e3ff%0x10*_0xce449d,_0x506077=Math['floor'](_0x24e3ff/0x10)*_0x379bc3;this[_0x18b86d(0x7eb)]['smooth']=_0x35952f,this[_0x18b86d(0x7eb)][_0x18b86d(0x422)](_0x56e54a,_0x3cf919,_0x506077,_0xce449d,_0x379bc3,0x0,0x0,_0xce449d,_0x379bc3);};function Sprite_TitlePictureButton(){const _0x5b91af=_0x500928;this[_0x5b91af(0x32f)](...arguments);}Sprite_TitlePictureButton[_0x500928(0x358)]=Object[_0x500928(0x5a4)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x500928(0x358)][_0x500928(0x2f3)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x500928(0x358)][_0x500928(0x32f)]=function(_0xfddf94){const _0x54900e=_0x500928;Sprite_Clickable[_0x54900e(0x358)][_0x54900e(0x32f)][_0x54900e(0x485)](this),this[_0x54900e(0x24c)]=_0xfddf94,this[_0x54900e(0x171)]=null,this[_0x54900e(0x4d9)]();},Sprite_TitlePictureButton[_0x500928(0x358)][_0x500928(0x4d9)]=function(){const _0x19d48c=_0x500928;this['x']=Graphics[_0x19d48c(0x7c8)],this['y']=Graphics[_0x19d48c(0x3ff)],this[_0x19d48c(0x3a8)]=![],this[_0x19d48c(0x28e)]();},Sprite_TitlePictureButton['prototype'][_0x500928(0x28e)]=function(){const _0x3d6e58=_0x500928;this['bitmap']=ImageManager['loadPicture'](this[_0x3d6e58(0x24c)][_0x3d6e58(0x124)]),this[_0x3d6e58(0x7eb)][_0x3d6e58(0x51b)](this[_0x3d6e58(0x382)][_0x3d6e58(0x59d)](this));},Sprite_TitlePictureButton[_0x500928(0x358)][_0x500928(0x382)]=function(){const _0x45a113=_0x500928;this[_0x45a113(0x24c)][_0x45a113(0x152)]['call'](this),this[_0x45a113(0x24c)]['PositionJS'][_0x45a113(0x485)](this),this['setClickHandler'](this[_0x45a113(0x24c)]['CallHandlerJS']['bind'](this));},Sprite_TitlePictureButton[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x33689c=_0x500928;Sprite_Clickable['prototype']['update'][_0x33689c(0x485)](this),this[_0x33689c(0x2f2)](),this['processTouch']();},Sprite_TitlePictureButton[_0x500928(0x358)]['fadeSpeed']=function(){const _0x534949=_0x500928;return VisuMZ[_0x534949(0x858)][_0x534949(0x17a)][_0x534949(0x7bc)]['Title'][_0x534949(0x412)];},Sprite_TitlePictureButton[_0x500928(0x358)][_0x500928(0x2f2)]=function(){const _0xef812e=_0x500928;this['_pressed']||this[_0xef812e(0x10a)]?this['opacity']=0xff:(this[_0xef812e(0x75c)]+=this[_0xef812e(0x3a8)]?this['fadeSpeed']():-0x1*this[_0xef812e(0x110)](),this[_0xef812e(0x75c)]=Math[_0xef812e(0x2c9)](0xc0,this[_0xef812e(0x75c)]));},Sprite_TitlePictureButton['prototype'][_0x500928(0x869)]=function(_0x192a66){const _0x4eb3bb=_0x500928;this[_0x4eb3bb(0x171)]=_0x192a66;},Sprite_TitlePictureButton[_0x500928(0x358)][_0x500928(0x2ab)]=function(){const _0x3b24de=_0x500928;this[_0x3b24de(0x171)]&&this[_0x3b24de(0x171)]();};function Sprite_ExtendedTile(){const _0x567979=_0x500928;this[_0x567979(0x32f)](...arguments);}Sprite_ExtendedTile[_0x500928(0x358)]=Object['create'](Sprite[_0x500928(0x358)]),Sprite_ExtendedTile[_0x500928(0x358)][_0x500928(0x2f3)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x500928(0x358)][_0x500928(0x32f)]=function(_0x1c94df,_0x3f6b1d,_0x3d9c4d,_0x2e964c){const _0x5302d3=_0x500928;this['_shiftY']=Game_CharacterBase[_0x5302d3(0x37c)]||-0x6,this[_0x5302d3(0x3f0)]=_0x1c94df,this[_0x5302d3(0x7aa)]=_0x3f6b1d,this['_tile']=_0x3d9c4d,this[_0x5302d3(0x1fc)]=_0x2e964c,Sprite[_0x5302d3(0x358)][_0x5302d3(0x32f)][_0x5302d3(0x485)](this),this[_0x5302d3(0x114)](),this[_0x5302d3(0x726)](),this[_0x5302d3(0x4e4)](),this[_0x5302d3(0x836)]();},Sprite_ExtendedTile[_0x500928(0x358)]['createSubSprite']=function(){const _0x31ed5b=_0x500928;this[_0x31ed5b(0x315)]=new Sprite(),this['_tileSprite'][_0x31ed5b(0x2d8)]['x']=0.5,this[_0x31ed5b(0x315)][_0x31ed5b(0x2d8)]['y']=0x1,this['_tileSprite']['y']=-this[_0x31ed5b(0x7d1)]+0x1,this[_0x31ed5b(0x86b)](this[_0x31ed5b(0x315)]);},Sprite_ExtendedTile[_0x500928(0x358)][_0x500928(0x726)]=function(){const _0x41c7da=_0x500928,_0x550596=$gameMap[_0x41c7da(0x7e9)](),_0x1e813b=0x5+Math['floor'](this[_0x41c7da(0x2a0)]/0x100);this[_0x41c7da(0x315)][_0x41c7da(0x7eb)]=ImageManager[_0x41c7da(0x159)](_0x550596[_0x41c7da(0x816)][_0x1e813b]);},Sprite_ExtendedTile['prototype'][_0x500928(0x4e4)]=function(){const _0x544d56=_0x500928,_0xd39883=this[_0x544d56(0x2a0)],_0x496ca9=$gameMap[_0x544d56(0x1db)](),_0x5b9281=$gameMap[_0x544d56(0x634)](),_0x26d632=(Math['floor'](_0xd39883/0x80)%0x2*0x8+_0xd39883%0x8)*_0x496ca9,_0x3d60c1=Math[_0x544d56(0x64f)](_0xd39883%0x100/0x8)%0x10*_0x5b9281,_0x50c2b9=this[_0x544d56(0x1fc)]*_0x5b9281;this[_0x544d56(0x315)]['setFrame'](_0x26d632,_0x3d60c1-_0x50c2b9,_0x496ca9,_0x5b9281+_0x50c2b9);},Sprite_ExtendedTile[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x1edd61=_0x500928;Sprite[_0x1edd61(0x358)]['update'][_0x1edd61(0x485)](this),this[_0x1edd61(0x6a8)]();},Sprite_ExtendedTile[_0x500928(0x358)]['updatePosition']=function(){const _0x175661=_0x500928,_0x1a8d7e=$gameMap[_0x175661(0x1db)](),_0x527b52=$gameMap['tileHeight'](),_0x11c256=this['_mapX'],_0x720448=this[_0x175661(0x7aa)];this['x']=Math[_0x175661(0x64f)](($gameMap[_0x175661(0x6af)](_0x11c256)+0.5)*_0x1a8d7e),this['y']=Math[_0x175661(0x64f)](($gameMap['adjustY'](_0x720448)+0x1)*_0x527b52)+this[_0x175661(0x7d1)]-0x1;},VisuMZ[_0x500928(0x858)]['Spriteset_Base_initialize']=Spriteset_Base[_0x500928(0x358)][_0x500928(0x32f)],Spriteset_Base[_0x500928(0x358)]['initialize']=function(){const _0x4d2df7=_0x500928;VisuMZ[_0x4d2df7(0x858)][_0x4d2df7(0x49b)][_0x4d2df7(0x485)](this),this[_0x4d2df7(0x391)]();},Spriteset_Base['prototype'][_0x500928(0x391)]=function(){const _0x53d955=_0x500928;this[_0x53d955(0x201)]=[],this[_0x53d955(0x865)]=[],this[_0x53d955(0x6c9)]=this[_0x53d955(0x376)]['x'],this[_0x53d955(0x4e2)]=this['scale']['y'];},VisuMZ[_0x500928(0x858)][_0x500928(0x11b)]=Spriteset_Base[_0x500928(0x358)][_0x500928(0x7b4)],Spriteset_Base[_0x500928(0x358)][_0x500928(0x7b4)]=function(_0x36b306){const _0x204669=_0x500928;this[_0x204669(0x481)](),this[_0x204669(0x71e)](),VisuMZ[_0x204669(0x858)][_0x204669(0x11b)]['call'](this,_0x36b306);},VisuMZ['CoreEngine'][_0x500928(0x176)]=Spriteset_Base[_0x500928(0x358)][_0x500928(0x836)],Spriteset_Base[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x1bc144=_0x500928;VisuMZ['CoreEngine']['Spriteset_Base_update'][_0x1bc144(0x485)](this),this[_0x1bc144(0x28a)](),this[_0x1bc144(0x5d8)](),this[_0x1bc144(0x888)](),this[_0x1bc144(0x3ba)]();},Spriteset_Base[_0x500928(0x358)][_0x500928(0x28a)]=function(){},Spriteset_Base[_0x500928(0x358)]['updatePictureAntiZoom']=function(){const _0x32fca6=_0x500928;if(!VisuMZ[_0x32fca6(0x858)][_0x32fca6(0x17a)]['QoL'][_0x32fca6(0x6b3)])return;if(this[_0x32fca6(0x6c9)]===this[_0x32fca6(0x376)]['x']&&this['_cacheScaleY']===this['scale']['y'])return;this[_0x32fca6(0x468)](),this['_cacheScaleX']=this['scale']['x'],this[_0x32fca6(0x4e2)]=this[_0x32fca6(0x376)]['y'];},Spriteset_Base[_0x500928(0x358)]['adjustPictureAntiZoom']=function(){const _0x6d864c=_0x500928;if(SceneManager[_0x6d864c(0x7f1)]()&&Spriteset_Map[_0x6d864c(0x77c)])return;else{if(SceneManager[_0x6d864c(0x750)]()&&Spriteset_Battle[_0x6d864c(0x77c)])return;}this[_0x6d864c(0x376)]['x']!==0x0&&(this[_0x6d864c(0x294)][_0x6d864c(0x376)]['x']=0x1/this[_0x6d864c(0x376)]['x'],this[_0x6d864c(0x294)]['x']=-(this['x']/this[_0x6d864c(0x376)]['x'])),this[_0x6d864c(0x376)]['y']!==0x0&&(this[_0x6d864c(0x294)][_0x6d864c(0x376)]['y']=0x1/this[_0x6d864c(0x376)]['y'],this[_0x6d864c(0x294)]['y']=-(this['y']/this[_0x6d864c(0x376)]['y']));},VisuMZ[_0x500928(0x858)][_0x500928(0x42b)]=Spriteset_Base['prototype'][_0x500928(0x6a8)],Spriteset_Base[_0x500928(0x358)][_0x500928(0x6a8)]=function(){const _0x107296=_0x500928;VisuMZ[_0x107296(0x858)]['Spriteset_Base_updatePosition'][_0x107296(0x485)](this),this[_0x107296(0x2e9)]();},Spriteset_Base[_0x500928(0x358)][_0x500928(0x2e9)]=function(){const _0x33399f=_0x500928;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x33399f(0x7a6)]($gameScreen[_0x33399f(0x579)]());const _0x22d3c9=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x33399f(0x74e)]()){case _0x33399f(0x7d4):this[_0x33399f(0x36e)]();break;case _0x33399f(0x30d):this['updatePositionCoreEngineShakeHorz']();break;case _0x33399f(0x383):this[_0x33399f(0x843)]();break;default:this[_0x33399f(0x169)]();break;}},Spriteset_Base[_0x500928(0x358)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x997163=_0x500928,_0x4aff5c=VisuMZ['CoreEngine']['Settings'][_0x997163(0x355)];if(_0x4aff5c&&_0x4aff5c[_0x997163(0x5d1)])return _0x4aff5c[_0x997163(0x5d1)][_0x997163(0x485)](this);this['x']+=Math[_0x997163(0x7a6)]($gameScreen[_0x997163(0x579)]());},Spriteset_Base[_0x500928(0x358)][_0x500928(0x169)]=function(){const _0x44a016=_0x500928,_0x356bdd=VisuMZ['CoreEngine']['Settings'][_0x44a016(0x355)];if(_0x356bdd&&_0x356bdd['randomJS'])return _0x356bdd[_0x44a016(0x12d)][_0x44a016(0x485)](this);const _0x2ab3bc=$gameScreen['_shakePower']*0.75,_0x5d70ab=$gameScreen[_0x44a016(0x5bf)]*0.6,_0x18aebb=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math[_0x44a016(0x2be)](_0x2ab3bc)-Math[_0x44a016(0x2be)](_0x5d70ab))*(Math[_0x44a016(0x2c9)](_0x18aebb,0x1e)*0.5),this['y']+=Math[_0x44a016(0x7a6)](Math[_0x44a016(0x2be)](_0x2ab3bc)-Math[_0x44a016(0x2be)](_0x5d70ab))*(Math[_0x44a016(0x2c9)](_0x18aebb,0x1e)*0.5);},Spriteset_Base[_0x500928(0x358)]['updatePositionCoreEngineShakeHorz']=function(){const _0x211d0c=_0x500928,_0x39b187=VisuMZ[_0x211d0c(0x858)][_0x211d0c(0x17a)][_0x211d0c(0x355)];if(_0x39b187&&_0x39b187[_0x211d0c(0x1b6)])return _0x39b187[_0x211d0c(0x1b6)]['call'](this);const _0x50cbfe=$gameScreen[_0x211d0c(0x15c)]*0.75,_0x5d6b7e=$gameScreen['_shakeSpeed']*0.6,_0x421111=$gameScreen[_0x211d0c(0x3c4)];this['x']+=Math[_0x211d0c(0x7a6)](Math[_0x211d0c(0x2be)](_0x50cbfe)-Math['randomInt'](_0x5d6b7e))*(Math['min'](_0x421111,0x1e)*0.5);},Spriteset_Base['prototype'][_0x500928(0x843)]=function(){const _0x127f1c=_0x500928,_0x399710=VisuMZ[_0x127f1c(0x858)][_0x127f1c(0x17a)][_0x127f1c(0x355)];if(_0x399710&&_0x399710[_0x127f1c(0x3df)])return _0x399710[_0x127f1c(0x3df)][_0x127f1c(0x485)](this);const _0x4044cf=$gameScreen[_0x127f1c(0x15c)]*0.75,_0x193d20=$gameScreen[_0x127f1c(0x5bf)]*0.6,_0x3eb1be=$gameScreen[_0x127f1c(0x3c4)];this['y']+=Math['round'](Math[_0x127f1c(0x2be)](_0x4044cf)-Math[_0x127f1c(0x2be)](_0x193d20))*(Math[_0x127f1c(0x2c9)](_0x3eb1be,0x1e)*0.5);},Spriteset_Base[_0x500928(0x358)]['updateFauxAnimations']=function(){const _0x5eedba=_0x500928;for(const _0x15ae3a of this[_0x5eedba(0x201)]){!_0x15ae3a[_0x5eedba(0x4a0)]()&&this['removeFauxAnimation'](_0x15ae3a);}this[_0x5eedba(0x41d)]();},Spriteset_Base[_0x500928(0x358)][_0x500928(0x41d)]=function(){const _0x50ebe8=_0x500928;for(;;){const _0x1e46f4=$gameTemp[_0x50ebe8(0x310)]();if(_0x1e46f4)this[_0x50ebe8(0x6a0)](_0x1e46f4);else break;}},Spriteset_Base[_0x500928(0x358)]['createFauxAnimation']=function(_0x20adaa){const _0x1f741d=_0x500928,_0x454dba=$dataAnimations[_0x20adaa[_0x1f741d(0x343)]],_0x4097ba=_0x20adaa[_0x1f741d(0x46b)],_0x4f76ac=_0x20adaa['mirror'],_0x10be05=_0x20adaa[_0x1f741d(0x2ed)];let _0x165713=this[_0x1f741d(0x704)]();const _0x4a3218=this[_0x1f741d(0x1d0)]();if(this[_0x1f741d(0x66d)](_0x454dba))for(const _0x5f31a2 of _0x4097ba){this[_0x1f741d(0x430)]([_0x5f31a2],_0x454dba,_0x4f76ac,_0x165713,_0x10be05),_0x165713+=_0x4a3218;}else this[_0x1f741d(0x430)](_0x4097ba,_0x454dba,_0x4f76ac,_0x165713,_0x10be05);},Spriteset_Base[_0x500928(0x358)]['createAnimationSprite']=function(_0x285751,_0x50ff13,_0x16eda5,_0x4a919b){const _0x4e283d=_0x500928,_0xc4447a=this[_0x4e283d(0x36b)](_0x50ff13),_0x231d92=new(_0xc4447a?Sprite_AnimationMV:Sprite_Animation)(),_0xe78767=this[_0x4e283d(0x73b)](_0x285751),_0x394dec=this[_0x4e283d(0x704)](),_0x4d72d0=_0x4a919b>_0x394dec?this[_0x4e283d(0x326)]():null;this[_0x4e283d(0x69e)](_0x285751[0x0])&&(_0x16eda5=!_0x16eda5),_0x231d92['targetObjects']=_0x285751,_0x231d92[_0x4e283d(0x4d9)](_0xe78767,_0x50ff13,_0x16eda5,_0x4a919b,_0x4d72d0),this['addAnimationSpriteToContainer'](_0x231d92),this['_animationSprites'][_0x4e283d(0x719)](_0x231d92);},Spriteset_Base[_0x500928(0x358)][_0x500928(0x430)]=function(_0x110547,_0x3aeb3f,_0x138ebc,_0x23bcdc,_0x295420){const _0x3bbb59=_0x500928,_0x5a452c=this[_0x3bbb59(0x36b)](_0x3aeb3f),_0x4f97d9=new(_0x5a452c?Sprite_AnimationMV:Sprite_Animation)(),_0x373bce=this[_0x3bbb59(0x73b)](_0x110547);this[_0x3bbb59(0x69e)](_0x110547[0x0])&&(_0x138ebc=!_0x138ebc);_0x4f97d9[_0x3bbb59(0x6bc)]=_0x110547,_0x4f97d9[_0x3bbb59(0x4d9)](_0x373bce,_0x3aeb3f,_0x138ebc,_0x23bcdc),_0x4f97d9[_0x3bbb59(0xd6)](_0x295420),this['addAnimationSpriteToContainer'](_0x4f97d9);if(this[_0x3bbb59(0x3d5)])this[_0x3bbb59(0x3d5)][_0x3bbb59(0x39d)](_0x4f97d9);this[_0x3bbb59(0x201)][_0x3bbb59(0x719)](_0x4f97d9);},Spriteset_Base[_0x500928(0x358)][_0x500928(0x658)]=function(_0x17acd7){const _0x15d3f7=_0x500928;this[_0x15d3f7(0x1d4)][_0x15d3f7(0x86b)](_0x17acd7);},Spriteset_Base['prototype'][_0x500928(0x55f)]=function(_0x329d5b){const _0x4fe365=_0x500928;this[_0x4fe365(0x3d5)][_0x4fe365(0x39d)](_0x329d5b),this[_0x4fe365(0x7c9)](_0x329d5b);for(const _0xca6cc1 of _0x329d5b[_0x4fe365(0x6bc)]){_0xca6cc1['endAnimation']&&_0xca6cc1['endAnimation']();}_0x329d5b[_0x4fe365(0x7b4)]();},Spriteset_Base['prototype'][_0x500928(0x5e5)]=function(_0x1a8ed3){const _0x13b8e7=_0x500928;this[_0x13b8e7(0x201)][_0x13b8e7(0x39d)](_0x1a8ed3),this['removeAnimationFromContainer'](_0x1a8ed3);for(const _0x2e65a9 of _0x1a8ed3[_0x13b8e7(0x6bc)]){_0x2e65a9['endAnimation']&&_0x2e65a9['endAnimation']();}_0x1a8ed3['destroy']();},Spriteset_Base[_0x500928(0x358)][_0x500928(0x7c9)]=function(_0x3c8a7c){this['_effectsContainer']['removeChild'](_0x3c8a7c);},Spriteset_Base[_0x500928(0x358)]['removeAllFauxAnimations']=function(){const _0x32d882=_0x500928;for(const _0x66ae4f of this[_0x32d882(0x201)]){this[_0x32d882(0x5e5)](_0x66ae4f);}},Spriteset_Base['prototype'][_0x500928(0x42d)]=function(){const _0x3f1815=_0x500928;return this[_0x3f1815(0x201)][_0x3f1815(0x12e)]>0x0;},Spriteset_Base[_0x500928(0x358)]['updatePointAnimations']=function(){const _0x5509c8=_0x500928;for(const _0x44226d of this['_pointAnimationSprites']){!_0x44226d[_0x5509c8(0x4a0)]()&&this[_0x5509c8(0x608)](_0x44226d);}this[_0x5509c8(0x793)]();},Spriteset_Base[_0x500928(0x358)][_0x500928(0x793)]=function(){const _0x59b604=_0x500928;for(;;){const _0xe0130b=$gameTemp[_0x59b604(0x135)]();if(_0xe0130b)this[_0x59b604(0x679)](_0xe0130b);else break;}},Spriteset_Base[_0x500928(0x358)][_0x500928(0x679)]=function(_0x5c0553){const _0x407ed2=_0x500928,_0x45d7aa=$dataAnimations[_0x5c0553[_0x407ed2(0x343)]],_0x1357aa=this[_0x407ed2(0x58d)](_0x5c0553),_0x1939f6=_0x5c0553[_0x407ed2(0x7db)],_0x12539a=_0x5c0553[_0x407ed2(0x2ed)];let _0x2e1b63=this[_0x407ed2(0x704)]();const _0x21bfa0=this[_0x407ed2(0x1d0)]();if(this[_0x407ed2(0x66d)](_0x45d7aa))for(const _0x5872b3 of _0x1357aa){this['createPointAnimationSprite']([_0x5872b3],_0x45d7aa,_0x1939f6,_0x2e1b63,_0x12539a),_0x2e1b63+=_0x21bfa0;}else this['createPointAnimationSprite'](_0x1357aa,_0x45d7aa,_0x1939f6,_0x2e1b63,_0x12539a);},Spriteset_Base[_0x500928(0x358)][_0x500928(0x58d)]=function(_0x2e3df4){const _0x350b64=_0x500928,_0x418c36=new Sprite_Clickable(),_0x28304a=this[_0x350b64(0x196)]();_0x418c36['x']=_0x2e3df4['x']-_0x28304a['x'],_0x418c36['y']=_0x2e3df4['y']-_0x28304a['y'],_0x418c36['z']=0x64;const _0x1ad2cc=this[_0x350b64(0x196)]();return _0x1ad2cc[_0x350b64(0x86b)](_0x418c36),[_0x418c36];},Spriteset_Base[_0x500928(0x358)][_0x500928(0x196)]=function(){return this;},Spriteset_Map[_0x500928(0x358)][_0x500928(0x196)]=function(){return this['_tilemap']||this;},Spriteset_Battle['prototype'][_0x500928(0x196)]=function(){const _0x428571=_0x500928;return this[_0x428571(0xf0)]||this;},Spriteset_Base[_0x500928(0x358)][_0x500928(0x5c2)]=function(_0x9c4d32,_0x1bfaf9,_0x5d6070,_0x52f505,_0x50b883){const _0x2aac1f=_0x500928,_0x5d03b5=this['isMVAnimation'](_0x1bfaf9),_0xaed826=new(_0x5d03b5?Sprite_AnimationMV:Sprite_Animation)();_0xaed826[_0x2aac1f(0x6bc)]=_0x9c4d32,_0xaed826['setup'](_0x9c4d32,_0x1bfaf9,_0x5d6070,_0x52f505),_0xaed826[_0x2aac1f(0xd6)](_0x50b883),this['addAnimationSpriteToContainer'](_0xaed826),this[_0x2aac1f(0x865)][_0x2aac1f(0x719)](_0xaed826);},Spriteset_Base[_0x500928(0x358)][_0x500928(0x608)]=function(_0x405bfe){const _0x45bbc9=_0x500928;this['_pointAnimationSprites'][_0x45bbc9(0x39d)](_0x405bfe),this[_0x45bbc9(0x1d4)][_0x45bbc9(0x410)](_0x405bfe);for(const _0x57e1b3 of _0x405bfe[_0x45bbc9(0x6bc)]){_0x57e1b3[_0x45bbc9(0x20a)]&&_0x57e1b3[_0x45bbc9(0x20a)]();const _0x56ba9e=this[_0x45bbc9(0x196)]();if(_0x56ba9e)_0x56ba9e[_0x45bbc9(0x410)](_0x57e1b3);}_0x405bfe[_0x45bbc9(0x7b4)]();},Spriteset_Base[_0x500928(0x358)][_0x500928(0x71e)]=function(){const _0x3b254a=_0x500928;for(const _0x15862d of this['_pointAnimationSprites']){this[_0x3b254a(0x608)](_0x15862d);}},Spriteset_Base['prototype'][_0x500928(0x631)]=function(){const _0x23bfff=_0x500928;return this['_pointAnimationSprites'][_0x23bfff(0x12e)]>0x0;},VisuMZ[_0x500928(0x858)][_0x500928(0x270)]=Spriteset_Base[_0x500928(0x358)][_0x500928(0x3d9)],Spriteset_Base[_0x500928(0x358)][_0x500928(0x3d9)]=function(){const _0x5b0107=_0x500928;return VisuMZ[_0x5b0107(0x858)][_0x5b0107(0x270)][_0x5b0107(0x485)](this)||this[_0x5b0107(0x631)]();},Spriteset_Map[_0x500928(0x77c)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['QoL']['DetachMapPictureContainer']||![],VisuMZ['CoreEngine'][_0x500928(0x2ba)]=Scene_Map[_0x500928(0x358)][_0x500928(0x85a)],Scene_Map['prototype'][_0x500928(0x85a)]=function(){const _0x6efdcc=_0x500928;VisuMZ['CoreEngine']['Scene_Map_createSpriteset_detach'][_0x6efdcc(0x485)](this);if(!Spriteset_Map[_0x6efdcc(0x77c)])return;const _0x88fc2c=this['_spriteset'];if(!_0x88fc2c)return;this[_0x6efdcc(0x294)]=_0x88fc2c['_pictureContainer'];if(!this[_0x6efdcc(0x294)])return;this[_0x6efdcc(0x86b)](this[_0x6efdcc(0x294)]);},VisuMZ[_0x500928(0x858)][_0x500928(0x23e)]=Spriteset_Map[_0x500928(0x358)][_0x500928(0x1a5)],Spriteset_Map[_0x500928(0x358)]['createTilemap']=function(){const _0x5e5e8b=_0x500928;VisuMZ['CoreEngine'][_0x5e5e8b(0x23e)]['call'](this),this[_0x5e5e8b(0x80e)]();},Spriteset_Map[_0x500928(0x358)][_0x500928(0x80e)]=function(){const _0x40ec29=_0x500928,_0x30da84=$gameMap[_0x40ec29(0x7e9)]();if(!_0x30da84)return;const _0x2125b1=$gameMap['getTileExtendTerrainTags']();if(Object[_0x40ec29(0x325)](_0x2125b1)['length']<=0x0)return;const _0x1d3c2e=$gameMap[_0x40ec29(0x295)]();this[_0x40ec29(0x883)]=this[_0x40ec29(0x883)]||[];for(let _0x3581d5=0x0;_0x3581d5<$gameMap[_0x40ec29(0x3ff)]();_0x3581d5++){for(let _0x56678b=0x0;_0x56678b<$gameMap[_0x40ec29(0x7c8)]();_0x56678b++){for(const _0x198470 of $gameMap[_0x40ec29(0x868)](_0x56678b,_0x3581d5)){const _0x2186d0=_0x1d3c2e[_0x198470]>>0xc,_0x53d8fd=_0x2125b1[_0x2186d0]||0x0;if(_0x53d8fd<=0x0)continue;this[_0x40ec29(0x881)](_0x56678b,_0x3581d5,_0x198470,_0x53d8fd);}}}},Spriteset_Map[_0x500928(0x358)]['removeTileExtendSprites']=function(){const _0x226d2e=_0x500928;this[_0x226d2e(0x883)]=this[_0x226d2e(0x883)]||[];for(const _0x2a8f61 of this['_tileExtendSprites']){this[_0x226d2e(0x6e9)]['removeChild'](_0x2a8f61);}this[_0x226d2e(0x883)]=[];},Spriteset_Map[_0x500928(0x358)][_0x500928(0x881)]=function(_0x4deb8c,_0x2fa441,_0x250dc5,_0x3b0085){const _0x40b463=_0x500928,_0x56b688=new Sprite_ExtendedTile(_0x4deb8c,_0x2fa441,_0x250dc5,_0x3b0085),_0x10bfac=$gameMap['tilesetFlags']();_0x10bfac[_0x250dc5]&0x10?_0x56b688['z']=0x4:_0x56b688['z']=0x3,this[_0x40b463(0x6e9)][_0x40b463(0x86b)](_0x56b688),this['_tileExtendSprites'][_0x40b463(0x719)](_0x56b688);},VisuMZ[_0x500928(0x858)][_0x500928(0x1c7)]=Tilemap['prototype'][_0x500928(0x684)],Tilemap[_0x500928(0x358)]['_addSpotTile']=function(_0x4b8862,_0x3bf80e,_0x48a051){const _0x2fa681=_0x500928;if($gameMap[_0x2fa681(0x86a)](_0x4b8862))return;VisuMZ[_0x2fa681(0x858)][_0x2fa681(0x1c7)]['call'](this,_0x4b8862,_0x3bf80e,_0x48a051);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0xe1)][_0x500928(0x222)]||![],VisuMZ[_0x500928(0x858)][_0x500928(0x77a)]=Scene_Battle[_0x500928(0x358)][_0x500928(0x85a)],Scene_Battle[_0x500928(0x358)][_0x500928(0x85a)]=function(){const _0x2f4d86=_0x500928;VisuMZ[_0x2f4d86(0x858)][_0x2f4d86(0x77a)][_0x2f4d86(0x485)](this);if(!Spriteset_Battle[_0x2f4d86(0x77c)])return;const _0x40a8dc=this[_0x2f4d86(0x871)];if(!_0x40a8dc)return;this[_0x2f4d86(0x294)]=_0x40a8dc[_0x2f4d86(0x294)];if(!this['_pictureContainer'])return;this[_0x2f4d86(0x86b)](this[_0x2f4d86(0x294)]);},Spriteset_Battle[_0x500928(0x358)][_0x500928(0xdb)]=function(){const _0x1284d0=_0x500928;this[_0x1284d0(0xe5)]=new PIXI['filters']['BlurFilter'](clamp=!![]),this[_0x1284d0(0x7f4)]=new Sprite(),this['_backgroundSprite'][_0x1284d0(0x7eb)]=SceneManager[_0x1284d0(0x84b)](),this[_0x1284d0(0x7f4)][_0x1284d0(0x38a)]=[this[_0x1284d0(0xe5)]],this[_0x1284d0(0x861)][_0x1284d0(0x86b)](this[_0x1284d0(0x7f4)]);},VisuMZ[_0x500928(0x858)]['Spriteset_Battle_createEnemies']=Spriteset_Battle['prototype'][_0x500928(0x78f)],Spriteset_Battle[_0x500928(0x358)]['createEnemies']=function(){const _0x312d2f=_0x500928;this['coreEngineRepositionEnemies']()&&this[_0x312d2f(0x596)](),VisuMZ[_0x312d2f(0x858)]['Spriteset_Battle_createEnemies'][_0x312d2f(0x485)](this);},Spriteset_Battle[_0x500928(0x358)]['coreEngineRepositionEnemies']=function(){const _0x16bf44=_0x500928,_0x47873f=VisuMZ[_0x16bf44(0x858)][_0x16bf44(0x17a)][_0x16bf44(0x470)];if(!_0x47873f)return![];if(Utils['RPGMAKER_VERSION']>=_0x16bf44(0x552)&&!_0x47873f[_0x16bf44(0x431)])return![];return _0x47873f[_0x16bf44(0x6e2)];},Spriteset_Battle[_0x500928(0x358)][_0x500928(0x596)]=function(){const _0x126066=_0x500928;for(member of $gameTroop[_0x126066(0x84c)]()){member[_0x126066(0x2b5)]();}},VisuMZ[_0x500928(0x858)][_0x500928(0x600)]=Window_Base[_0x500928(0x358)][_0x500928(0x32f)],Window_Base['prototype'][_0x500928(0x32f)]=function(_0x1f5270){const _0x563c9c=_0x500928;_0x1f5270['x']=Math[_0x563c9c(0x7a6)](_0x1f5270['x']),_0x1f5270['y']=Math[_0x563c9c(0x7a6)](_0x1f5270['y']),_0x1f5270[_0x563c9c(0x7c8)]=Math[_0x563c9c(0x7a6)](_0x1f5270[_0x563c9c(0x7c8)]),_0x1f5270[_0x563c9c(0x3ff)]=Math['round'](_0x1f5270[_0x563c9c(0x3ff)]),this['initDigitGrouping'](),VisuMZ[_0x563c9c(0x858)][_0x563c9c(0x600)][_0x563c9c(0x485)](this,_0x1f5270),this['initCoreEasing']();},Window_Base[_0x500928(0x358)]['initDigitGrouping']=function(){const _0x2b5429=_0x500928;this[_0x2b5429(0x333)]=VisuMZ[_0x2b5429(0x858)][_0x2b5429(0x17a)][_0x2b5429(0xe1)]['DigitGroupingStandardText'],this[_0x2b5429(0x6ce)]=VisuMZ[_0x2b5429(0x858)][_0x2b5429(0x17a)][_0x2b5429(0xe1)][_0x2b5429(0x7e7)];},Window_Base['prototype'][_0x500928(0x531)]=function(){const _0x175067=_0x500928;return VisuMZ[_0x175067(0x858)][_0x175067(0x17a)][_0x175067(0x2d9)][_0x175067(0x709)];},Window_Base[_0x500928(0x358)][_0x500928(0x566)]=function(){const _0x559ba4=_0x500928;return VisuMZ[_0x559ba4(0x858)][_0x559ba4(0x17a)][_0x559ba4(0x2d9)][_0x559ba4(0x23a)];},Window_Base[_0x500928(0x358)][_0x500928(0x41f)]=function(){const _0x1a1228=_0x500928;$gameSystem[_0x1a1228(0x41c)]?this[_0x1a1228(0x33b)]=$gameSystem[_0x1a1228(0x41c)]():this[_0x1a1228(0x33b)]=VisuMZ[_0x1a1228(0x858)][_0x1a1228(0x17a)]['Window'][_0x1a1228(0xc9)];},Window_Base[_0x500928(0x358)][_0x500928(0x5bc)]=function(){const _0x517f86=_0x500928;return VisuMZ[_0x517f86(0x858)][_0x517f86(0x17a)][_0x517f86(0x2d9)]['TranslucentOpacity'];},Window_Base['prototype'][_0x500928(0x68b)]=function(){const _0x593f8b=_0x500928;return VisuMZ[_0x593f8b(0x858)][_0x593f8b(0x17a)][_0x593f8b(0x2d9)][_0x593f8b(0x5aa)];},VisuMZ[_0x500928(0x858)][_0x500928(0x2d3)]=Window_Base[_0x500928(0x358)][_0x500928(0x836)],Window_Base[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x3b4651=_0x500928;VisuMZ[_0x3b4651(0x858)][_0x3b4651(0x2d3)][_0x3b4651(0x485)](this),this[_0x3b4651(0x7ed)]();},Window_Base['prototype']['updateOpen']=function(){const _0x174ae6=_0x500928;this[_0x174ae6(0x368)]&&(this['openness']+=this[_0x174ae6(0x68b)](),this[_0x174ae6(0x4a2)]()&&(this[_0x174ae6(0x368)]=![]));},Window_Base[_0x500928(0x358)]['updateClose']=function(){const _0x5ec592=_0x500928;this[_0x5ec592(0x3ee)]&&(this[_0x5ec592(0x7ec)]-=this[_0x5ec592(0x68b)](),this[_0x5ec592(0x889)]()&&(this[_0x5ec592(0x3ee)]=![]));},VisuMZ[_0x500928(0x858)][_0x500928(0x26a)]=Window_Base['prototype'][_0x500928(0x55e)],Window_Base[_0x500928(0x358)][_0x500928(0x55e)]=function(_0xdb0546,_0x27b12e,_0x43857c,_0x51a179,_0x4b1408){const _0x596346=_0x500928;if(this[_0x596346(0x5cd)]())_0xdb0546=VisuMZ['GroupDigits'](_0xdb0546);VisuMZ[_0x596346(0x858)][_0x596346(0x26a)][_0x596346(0x485)](this,_0xdb0546,_0x27b12e,_0x43857c,_0x51a179,_0x4b1408);},Window_Base[_0x500928(0x358)][_0x500928(0x5cd)]=function(){const _0x437cd3=_0x500928;return this[_0x437cd3(0x333)];},VisuMZ[_0x500928(0x858)]['Window_Base_createTextState']=Window_Base[_0x500928(0x358)]['createTextState'],Window_Base[_0x500928(0x358)][_0x500928(0x286)]=function(_0xcc6981,_0x227a32,_0x316e70,_0x40d7cd){const _0x242a15=_0x500928;var _0x2f9ab9=VisuMZ[_0x242a15(0x858)][_0x242a15(0x83c)]['call'](this,_0xcc6981,_0x227a32,_0x316e70,_0x40d7cd);if(this[_0x242a15(0x520)]())_0x2f9ab9['text']=String(VisuMZ[_0x242a15(0x261)](_0x2f9ab9[_0x242a15(0x4c6)]))||'';return _0x2f9ab9;},Window_Base[_0x500928(0x358)][_0x500928(0x520)]=function(){const _0x220db0=_0x500928;return this[_0x220db0(0x6ce)];},Window_Base[_0x500928(0x358)][_0x500928(0x515)]=function(_0x3fc3d8){const _0x62bb1c=_0x500928;this[_0x62bb1c(0x333)]=_0x3fc3d8;},Window_Base['prototype'][_0x500928(0x4fb)]=function(_0x1a63da){const _0x454bcb=_0x500928;this[_0x454bcb(0x6ce)]=_0x1a63da;},VisuMZ[_0x500928(0x858)]['Window_Base_drawIcon']=Window_Base[_0x500928(0x358)]['drawIcon'],Window_Base[_0x500928(0x358)][_0x500928(0xfb)]=function(_0x3694a7,_0x2f9a7c,_0x44375c){const _0x52ff7c=_0x500928;_0x2f9a7c=Math[_0x52ff7c(0x7a6)](_0x2f9a7c),_0x44375c=Math[_0x52ff7c(0x7a6)](_0x44375c),VisuMZ[_0x52ff7c(0x858)][_0x52ff7c(0x15b)]['call'](this,_0x3694a7,_0x2f9a7c,_0x44375c);},VisuMZ[_0x500928(0x858)][_0x500928(0x7cd)]=Window_Base[_0x500928(0x358)][_0x500928(0x3b2)],Window_Base[_0x500928(0x358)][_0x500928(0x3b2)]=function(_0xbaf6d,_0x36348a,_0x27d0ea,_0x241786,_0x32b80d,_0x29253a){const _0x1785b5=_0x500928;_0x32b80d=_0x32b80d||ImageManager['faceWidth'],_0x29253a=_0x29253a||ImageManager[_0x1785b5(0x2fc)],_0x27d0ea=Math[_0x1785b5(0x7a6)](_0x27d0ea),_0x241786=Math[_0x1785b5(0x7a6)](_0x241786),_0x32b80d=Math['round'](_0x32b80d),_0x29253a=Math[_0x1785b5(0x7a6)](_0x29253a),VisuMZ[_0x1785b5(0x858)][_0x1785b5(0x7cd)][_0x1785b5(0x485)](this,_0xbaf6d,_0x36348a,_0x27d0ea,_0x241786,_0x32b80d,_0x29253a);},VisuMZ[_0x500928(0x858)][_0x500928(0x744)]=Window_Base[_0x500928(0x358)][_0x500928(0x530)],Window_Base[_0x500928(0x358)][_0x500928(0x530)]=function(_0x553573,_0x3033f6,_0x53b44f,_0x573bd1){const _0x46a9c1=_0x500928;_0x53b44f=Math[_0x46a9c1(0x7a6)](_0x53b44f),_0x573bd1=Math[_0x46a9c1(0x7a6)](_0x573bd1),VisuMZ[_0x46a9c1(0x858)][_0x46a9c1(0x744)]['call'](this,_0x553573,_0x3033f6,_0x53b44f,_0x573bd1);},VisuMZ[_0x500928(0x858)][_0x500928(0x5a2)]=Window_Selectable[_0x500928(0x358)][_0x500928(0x408)],Window_Selectable[_0x500928(0x358)][_0x500928(0x408)]=function(_0x19e8b3){const _0x21f4ba=_0x500928;let _0x147837=VisuMZ[_0x21f4ba(0x858)][_0x21f4ba(0x5a2)][_0x21f4ba(0x485)](this,_0x19e8b3);return _0x147837['x']=Math[_0x21f4ba(0x7a6)](_0x147837['x']),_0x147837['y']=Math['round'](_0x147837['y']),_0x147837[_0x21f4ba(0x7c8)]=Math[_0x21f4ba(0x7a6)](_0x147837[_0x21f4ba(0x7c8)]),_0x147837[_0x21f4ba(0x3ff)]=Math[_0x21f4ba(0x7a6)](_0x147837[_0x21f4ba(0x3ff)]),_0x147837;},VisuMZ[_0x500928(0x858)][_0x500928(0x87e)]=Window_StatusBase[_0x500928(0x358)][_0x500928(0x5bd)],Window_StatusBase['prototype']['drawActorSimpleStatus']=function(_0x588756,_0xe914dd,_0x2c3e77){const _0x15c16d=_0x500928;_0xe914dd=Math[_0x15c16d(0x7a6)](_0xe914dd),_0x2c3e77=Math[_0x15c16d(0x7a6)](_0x2c3e77),VisuMZ['CoreEngine'][_0x15c16d(0x87e)][_0x15c16d(0x485)](this,_0x588756,_0xe914dd,_0x2c3e77);},Window_Base[_0x500928(0x358)][_0x500928(0x13b)]=function(){const _0x5d1931=_0x500928;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x5d1931(0x376)]['x'],'targetScaleY':this[_0x5d1931(0x376)]['y'],'targetOpacity':this[_0x5d1931(0x75c)],'targetBackOpacity':this[_0x5d1931(0x33b)],'targetContentsOpacity':this[_0x5d1931(0x27b)]};},Window_Base[_0x500928(0x358)][_0x500928(0x7ed)]=function(){const _0x3ea977=_0x500928;if(!this[_0x3ea977(0x647)])return;if(this[_0x3ea977(0x647)]['duration']<=0x0)return;this['x']=this[_0x3ea977(0x276)](this['x'],this[_0x3ea977(0x647)][_0x3ea977(0x5ab)]),this['y']=this[_0x3ea977(0x276)](this['y'],this[_0x3ea977(0x647)][_0x3ea977(0x557)]),this['scale']['x']=this['applyCoreEasing'](this[_0x3ea977(0x376)]['x'],this[_0x3ea977(0x647)]['targetScaleX']),this[_0x3ea977(0x376)]['y']=this[_0x3ea977(0x276)](this['scale']['y'],this[_0x3ea977(0x647)][_0x3ea977(0x7cb)]),this[_0x3ea977(0x75c)]=this[_0x3ea977(0x276)](this[_0x3ea977(0x75c)],this[_0x3ea977(0x647)]['targetOpacity']),this['backOpacity']=this[_0x3ea977(0x276)](this[_0x3ea977(0x33b)],this[_0x3ea977(0x647)][_0x3ea977(0x553)]),this[_0x3ea977(0x27b)]=this[_0x3ea977(0x276)](this[_0x3ea977(0x27b)],this[_0x3ea977(0x647)][_0x3ea977(0x4f9)]),this[_0x3ea977(0x647)][_0x3ea977(0x57d)]--;},Window_Base[_0x500928(0x358)][_0x500928(0x276)]=function(_0x3d3b69,_0xe2c280){const _0x9b596a=_0x500928;if(!this[_0x9b596a(0x647)])return _0xe2c280;const _0x529662=this[_0x9b596a(0x647)][_0x9b596a(0x57d)],_0x149ac3=this[_0x9b596a(0x647)][_0x9b596a(0x2f1)],_0x215f2b=this['calcCoreEasing']((_0x149ac3-_0x529662)/_0x149ac3),_0x56e66e=this[_0x9b596a(0x605)]((_0x149ac3-_0x529662+0x1)/_0x149ac3),_0x576762=(_0x3d3b69-_0xe2c280*_0x215f2b)/(0x1-_0x215f2b);return _0x576762+(_0xe2c280-_0x576762)*_0x56e66e;},Window_Base[_0x500928(0x358)]['calcCoreEasing']=function(_0x16d9c6){const _0x133f18=_0x500928;if(!this['_coreEasing'])return _0x16d9c6;return VisuMZ['ApplyEasing'](_0x16d9c6,this[_0x133f18(0x647)]['type']||_0x133f18(0x405));},Window_Base[_0x500928(0x358)][_0x500928(0x40f)]=function(_0x4ef663,_0x283c7b){const _0x375076=_0x500928;if(!this[_0x375076(0x647)])return;this['x']=this['_coreEasing'][_0x375076(0x5ab)],this['y']=this['_coreEasing']['targetY'],this['scale']['x']=this[_0x375076(0x647)][_0x375076(0x86f)],this[_0x375076(0x376)]['y']=this[_0x375076(0x647)][_0x375076(0x7cb)],this['opacity']=this[_0x375076(0x647)][_0x375076(0x559)],this[_0x375076(0x33b)]=this[_0x375076(0x647)][_0x375076(0x553)],this[_0x375076(0x27b)]=this[_0x375076(0x647)]['targetContentsOpacity'],this[_0x375076(0x78b)](_0x4ef663,_0x283c7b,this['x'],this['y'],this[_0x375076(0x376)]['x'],this['scale']['y'],this[_0x375076(0x75c)],this[_0x375076(0x33b)],this[_0x375076(0x27b)]);},Window_Base[_0x500928(0x358)][_0x500928(0x78b)]=function(_0x4c58b3,_0x3a109f,_0xa756b5,_0x37c289,_0x510e1c,_0x4fd6f1,_0x340717,_0x403738,_0x2eeb14){const _0x59e293=_0x500928;this[_0x59e293(0x647)]={'duration':_0x4c58b3,'wholeDuration':_0x4c58b3,'type':_0x3a109f,'targetX':_0xa756b5,'targetY':_0x37c289,'targetScaleX':_0x510e1c,'targetScaleY':_0x4fd6f1,'targetOpacity':_0x340717,'targetBackOpacity':_0x403738,'targetContentsOpacity':_0x2eeb14};},Window_Base[_0x500928(0x358)][_0x500928(0x74b)]=function(_0x549e71,_0x183661,_0x36ecb5,_0x92bc4d,_0x1cd422){const _0x104d35=_0x500928;this[_0x104d35(0x418)](),this['contents'][_0x104d35(0x1e7)]=VisuMZ[_0x104d35(0x858)][_0x104d35(0x17a)][_0x104d35(0x78a)]['GoldFontSize'];const _0x332331=VisuMZ['CoreEngine'][_0x104d35(0x17a)][_0x104d35(0x78a)][_0x104d35(0x6a7)];if(_0x332331>0x0&&_0x183661===TextManager[_0x104d35(0x318)]){const _0x7c9e92=_0x92bc4d+(this['lineHeight']()-ImageManager[_0x104d35(0x5f4)])/0x2;this[_0x104d35(0xfb)](_0x332331,_0x36ecb5+(_0x1cd422-ImageManager[_0x104d35(0x167)]),_0x7c9e92),_0x1cd422-=ImageManager['iconWidth']+0x4;}else this[_0x104d35(0x774)](ColorManager[_0x104d35(0x22b)]()),this['drawText'](_0x183661,_0x36ecb5,_0x92bc4d,_0x1cd422,_0x104d35(0x73f)),_0x1cd422-=this['textWidth'](_0x183661)+0x6;this['resetTextColor']();const _0x239689=this[_0x104d35(0x219)](this['_digitGrouping']?VisuMZ[_0x104d35(0x261)](_0x549e71):_0x549e71);_0x239689>_0x1cd422?this[_0x104d35(0x55e)](VisuMZ[_0x104d35(0x858)]['Settings'][_0x104d35(0x78a)][_0x104d35(0x38d)],_0x36ecb5,_0x92bc4d,_0x1cd422,_0x104d35(0x73f)):this[_0x104d35(0x55e)](_0x549e71,_0x36ecb5,_0x92bc4d,_0x1cd422,_0x104d35(0x73f)),this[_0x104d35(0x418)]();},Window_Base[_0x500928(0x358)][_0x500928(0xe3)]=function(_0x5aba8c,_0x20fb5a,_0x46239b,_0xc8e621,_0x3bed58){const _0x743533=_0x500928,_0x116f05=ImageManager[_0x743533(0x5dd)]('IconSet'),_0x4e67e7=ImageManager[_0x743533(0x167)],_0x4b4da9=ImageManager[_0x743533(0x5f4)],_0x418c38=_0x5aba8c%0x10*_0x4e67e7,_0x3c3e99=Math['floor'](_0x5aba8c/0x10)*_0x4b4da9,_0x3a645a=_0xc8e621,_0x2fe792=_0xc8e621;this[_0x743533(0x17d)][_0x743533(0x4cb)]['imageSmoothingEnabled']=_0x3bed58,this[_0x743533(0x17d)][_0x743533(0x422)](_0x116f05,_0x418c38,_0x3c3e99,_0x4e67e7,_0x4b4da9,_0x20fb5a,_0x46239b,_0x3a645a,_0x2fe792),this[_0x743533(0x17d)][_0x743533(0x4cb)][_0x743533(0x1e1)]=!![];},Window_Base['prototype'][_0x500928(0x6b1)]=function(_0x17f4d9,_0x1e40c4,_0x2948ee,_0x3b5a15,_0x121c8b,_0x3eb517){const _0x298248=_0x500928,_0x52965c=Math['floor']((_0x2948ee-0x2)*_0x3b5a15),_0x1a262e=Sprite_Gauge[_0x298248(0x358)][_0x298248(0x6fe)][_0x298248(0x485)](this),_0xa10145=_0x1e40c4+this['lineHeight']()-_0x1a262e-0x2;this['contents'][_0x298248(0x74f)](_0x17f4d9,_0xa10145,_0x2948ee,_0x1a262e,ColorManager[_0x298248(0x18f)]()),this[_0x298248(0x17d)][_0x298248(0x501)](_0x17f4d9+0x1,_0xa10145+0x1,_0x52965c,_0x1a262e-0x2,_0x121c8b,_0x3eb517);},Window_Scrollable[_0x500928(0x3e7)]={'enabled':VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['Window'][_0x500928(0x1a6)]??!![],'thickness':VisuMZ['CoreEngine']['Settings'][_0x500928(0x2d9)][_0x500928(0x4d4)]??0x2,'offset':VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x2d9)][_0x500928(0xe8)]??0x2,'bodyColor':VisuMZ['CoreEngine'][_0x500928(0x17a)][_0x500928(0x2d9)][_0x500928(0x2e1)]??0x0,'offColor':VisuMZ['CoreEngine'][_0x500928(0x17a)][_0x500928(0x2d9)][_0x500928(0x62d)]??0x7,'offOpacity':VisuMZ['CoreEngine'][_0x500928(0x17a)][_0x500928(0x2d9)][_0x500928(0x87a)]??0x80},Window_Base[_0x500928(0x358)][_0x500928(0x6ee)]=function(){const _0x299370=_0x500928;return Window_Scrollable['SCROLLBAR'][_0x299370(0x551)]&&Window_Scrollable['SCROLLBAR'][_0x299370(0x825)]>0x0;},VisuMZ['CoreEngine']['Window_Base_createContents']=Window_Base[_0x500928(0x358)]['createContents'],Window_Base[_0x500928(0x358)][_0x500928(0x48a)]=function(){const _0x301b28=_0x500928;VisuMZ[_0x301b28(0x858)][_0x301b28(0x6d2)]['call'](this),this[_0x301b28(0x721)](),this[_0x301b28(0x524)](!![]),this[_0x301b28(0x524)](![]);},Window_Base[_0x500928(0x358)]['createScrollBarSprites']=function(){const _0xe51b=_0x500928;if(!this[_0xe51b(0x6ee)]())return;if(this[_0xe51b(0x7b8)]||this['_scrollBarVert'])return;this[_0xe51b(0x5a1)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0xe51b(0x3ec)]=new Sprite(),this[_0xe51b(0x86b)](this[_0xe51b(0x7b8)]),this[_0xe51b(0x86b)](this[_0xe51b(0x3ec)]);},Window_Base[_0x500928(0x358)][_0x500928(0x524)]=function(_0x5cf14a){const _0x309c5f=_0x500928,_0x4305c8=_0x5cf14a?this[_0x309c5f(0x7b8)]:this['_scrollBarVert'];if(!_0x4305c8)return;const _0x28a45a=Window_Scrollable[_0x309c5f(0x3e7)],_0x5dbae4=_0x28a45a['thickness'],_0x55ff7f=_0x5cf14a?this[_0x309c5f(0x319)]-_0x5dbae4*0x2:_0x5dbae4,_0x4b9e07=_0x5cf14a?_0x5dbae4:this['innerHeight']-_0x5dbae4*0x2;_0x4305c8[_0x309c5f(0x7eb)]=new Bitmap(_0x55ff7f,_0x4b9e07),_0x4305c8[_0x309c5f(0x76c)](0x0,0x0,_0x55ff7f,_0x4b9e07),this[_0x309c5f(0x689)](_0x5cf14a);},VisuMZ[_0x500928(0x858)]['Window_Base_destroyContents']=Window_Base[_0x500928(0x358)][_0x500928(0x38b)],Window_Base[_0x500928(0x358)][_0x500928(0x38b)]=function(){const _0x43c350=_0x500928;VisuMZ[_0x43c350(0x858)][_0x43c350(0x1e8)][_0x43c350(0x485)](this),this[_0x43c350(0x760)]();},Window_Base['prototype'][_0x500928(0x760)]=function(){const _0x2e7911=_0x500928,_0x39fa85=[this['_scrollBarHorz'],this[_0x2e7911(0x3ec)]];for(const _0x32827c of _0x39fa85){if(_0x32827c&&_0x32827c[_0x2e7911(0x7eb)])_0x32827c[_0x2e7911(0x7eb)][_0x2e7911(0x7b4)]();}},VisuMZ[_0x500928(0x858)][_0x500928(0x27e)]=Window_Scrollable['prototype'][_0x500928(0x836)],Window_Scrollable[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x582a4f=_0x500928;VisuMZ[_0x582a4f(0x858)][_0x582a4f(0x27e)][_0x582a4f(0x485)](this),this['updateScrollBars']();},Window_Scrollable[_0x500928(0x358)]['updateScrollBars']=function(){const _0x2d594e=_0x500928;this[_0x2d594e(0x6e7)](),this[_0x2d594e(0x734)](!![]),this[_0x2d594e(0x734)](![]),this[_0x2d594e(0x689)](!![]),this[_0x2d594e(0x689)](![]);},Window_Scrollable['prototype'][_0x500928(0x6e7)]=function(){const _0xa7def8=_0x500928,_0x5d39df=[this[_0xa7def8(0x7b8)],this['_scrollBarVert']];for(const _0x46f72a of _0x5d39df){_0x46f72a&&(_0x46f72a['visible']=this[_0xa7def8(0x6ee)]()&&this[_0xa7def8(0x4a2)]());}},Window_Scrollable['prototype']['checkScrollBarBitmap']=function(_0xd5f83f){const _0x62cdbd=_0x500928;if(!this[_0x62cdbd(0x5a1)])return;const _0x1d0ffb=this[_0x62cdbd(0x80f)](_0xd5f83f),_0x237a74=this['maxScrollbar'](_0xd5f83f),_0x177ea3=_0xd5f83f?'horz':'vert',_0xca6fcf=_0xd5f83f?_0x62cdbd(0x4df):_0x62cdbd(0x105);(this['_lastScrollBarValues'][_0x177ea3]!==_0x1d0ffb||this['_lastScrollBarValues'][_0xca6fcf]!==_0x237a74)&&(this[_0x62cdbd(0x5a1)][_0x177ea3]=_0x1d0ffb,this[_0x62cdbd(0x5a1)][_0xca6fcf]=_0x237a74,this[_0x62cdbd(0x799)](_0xd5f83f,_0x1d0ffb,_0x237a74));},Window_Scrollable['prototype']['scrollbar']=function(_0x284cc6){const _0x374fab=_0x500928;if(this[_0x374fab(0x4be)]!==undefined)return _0x284cc6?this[_0x374fab(0x548)]():this[_0x374fab(0x834)]['y'];return _0x284cc6?this['scrollX']():this[_0x374fab(0xfd)]();},Window_Scrollable[_0x500928(0x358)]['maxScrollbar']=function(_0x4ae914){const _0x3bbd03=_0x500928;if(this[_0x3bbd03(0x4be)]!==undefined)return _0x4ae914?this[_0x3bbd03(0xfe)]():Math['max'](0x0,this[_0x3bbd03(0x4be)]-this[_0x3bbd03(0x42e)]);return _0x4ae914?this[_0x3bbd03(0xfe)]():this[_0x3bbd03(0xea)]();},Window_Scrollable[_0x500928(0x358)][_0x500928(0x65e)]=function(){const _0x3b2a5a=_0x500928;if(this['_allTextHeight']!==undefined)return Math[_0x3b2a5a(0x627)](0x0,this['_allTextHeight']);return this['overallHeight']();},Window_Scrollable[_0x500928(0x358)][_0x500928(0x799)]=function(_0x421fb9,_0x1315be,_0x982fc7){const _0x23360d=_0x500928,_0x1fa4aa=_0x421fb9?this[_0x23360d(0x7b8)]:this[_0x23360d(0x3ec)];if(!_0x1fa4aa)return;if(!_0x1fa4aa['bitmap'])return;const _0x32cee0=_0x1fa4aa[_0x23360d(0x7eb)];_0x32cee0[_0x23360d(0x281)]();if(_0x982fc7<=0x0)return;const _0x36acb2=_0x421fb9?this[_0x23360d(0x319)]/this[_0x23360d(0x271)]():this[_0x23360d(0x42e)]/this[_0x23360d(0x65e)](),_0x39b013=_0x421fb9?Math[_0x23360d(0x7a6)](_0x1315be*_0x36acb2):0x0,_0x43b584=_0x421fb9?0x0:Math['round'](_0x1315be*_0x36acb2),_0x4153e3=_0x421fb9?Math[_0x23360d(0x7a6)](_0x32cee0[_0x23360d(0x7c8)]*_0x36acb2):_0x32cee0['width'],_0x1f70f1=_0x421fb9?_0x32cee0[_0x23360d(0x3ff)]:Math[_0x23360d(0x7a6)](_0x32cee0[_0x23360d(0x3ff)]*_0x36acb2),_0x162326=Window_Scrollable[_0x23360d(0x3e7)],_0x47e007=ColorManager[_0x23360d(0x48c)](_0x162326[_0x23360d(0x3ad)]),_0x2a18ca=ColorManager['getColor'](_0x162326['bodyColor']),_0x1bbef5=_0x162326[_0x23360d(0x7f7)];_0x32cee0['paintOpacity']=_0x1bbef5,_0x32cee0[_0x23360d(0x5eb)](_0x47e007),_0x32cee0['paintOpacity']=0xff,_0x32cee0[_0x23360d(0x74f)](_0x39b013,_0x43b584,_0x4153e3,_0x1f70f1,_0x2a18ca);},Window_Base[_0x500928(0x358)]['updateScrollBarPosition']=function(_0x289539){const _0x54414c=_0x500928,_0x5bc6dd=_0x289539?this[_0x54414c(0x7b8)]:this[_0x54414c(0x3ec)];if(!_0x5bc6dd)return;const _0x52d632=Window_Scrollable[_0x54414c(0x3e7)],_0xf00418=_0x52d632[_0x54414c(0x825)],_0x2efb1f=_0x52d632[_0x54414c(0x509)];if(!_0x5bc6dd[_0x54414c(0x778)])return;_0x5bc6dd['x']=this[_0x54414c(0x142)]+(_0x289539?_0xf00418:this['innerWidth']+_0x2efb1f),_0x5bc6dd['y']=this['padding']+(_0x289539?this['innerHeight']+_0x2efb1f:_0xf00418);},Window_Selectable[_0x500928(0x358)]['cursorDown']=function(_0x4da6a1){const _0x58134f=_0x500928;let _0x1079d2=this[_0x58134f(0x180)]();const _0x2df667=this[_0x58134f(0x29a)](),_0x9cfdae=this[_0x58134f(0x7fc)]();if(this['isUseModernControls']()&&(_0x1079d2<_0x2df667||_0x4da6a1&&_0x9cfdae===0x1)){_0x1079d2+=_0x9cfdae;if(_0x1079d2>=_0x2df667)_0x1079d2=_0x2df667-0x1;this['smoothSelect'](_0x1079d2);}else!this['isUseModernControls']()&&((_0x1079d2<_0x2df667-_0x9cfdae||_0x4da6a1&&_0x9cfdae===0x1)&&this[_0x58134f(0x409)]((_0x1079d2+_0x9cfdae)%_0x2df667));},VisuMZ[_0x500928(0x858)][_0x500928(0xd4)]=Window_Selectable[_0x500928(0x358)]['cursorDown'],Window_Selectable[_0x500928(0x358)][_0x500928(0x5be)]=function(_0x40d714){const _0x4c2fc1=_0x500928;this[_0x4c2fc1(0x4b3)]()&&_0x40d714&&this[_0x4c2fc1(0x7fc)]()===0x1&&this[_0x4c2fc1(0x180)]()===this['maxItems']()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x4c2fc1(0x858)][_0x4c2fc1(0xd4)][_0x4c2fc1(0x485)](this,_0x40d714);},Window_Selectable[_0x500928(0x358)]['cursorUp']=function(_0x1f1ce6){const _0x479cd5=_0x500928;let _0x7d0038=Math[_0x479cd5(0x627)](0x0,this[_0x479cd5(0x180)]());const _0x48ac5e=this[_0x479cd5(0x29a)](),_0xde69f4=this['maxCols']();if(this['isUseModernControls']()&&_0x7d0038>0x0||_0x1f1ce6&&_0xde69f4===0x1){_0x7d0038-=_0xde69f4;if(_0x7d0038<=0x0)_0x7d0038=0x0;this[_0x479cd5(0x409)](_0x7d0038);}else!this[_0x479cd5(0x4b3)]()&&((_0x7d0038>=_0xde69f4||_0x1f1ce6&&_0xde69f4===0x1)&&this[_0x479cd5(0x409)]((_0x7d0038-_0xde69f4+_0x48ac5e)%_0x48ac5e));},VisuMZ[_0x500928(0x858)]['Window_Selectable_cursorUp']=Window_Selectable[_0x500928(0x358)][_0x500928(0x7ff)],Window_Selectable[_0x500928(0x358)][_0x500928(0x7ff)]=function(_0x8f362b){const _0x27f39c=_0x500928;this[_0x27f39c(0x4b3)]()&&_0x8f362b&&this[_0x27f39c(0x7fc)]()===0x1&&this[_0x27f39c(0x180)]()===0x0?this[_0x27f39c(0x409)](this[_0x27f39c(0x29a)]()-0x1):VisuMZ[_0x27f39c(0x858)][_0x27f39c(0x4c8)][_0x27f39c(0x485)](this,_0x8f362b);},Window_Selectable['prototype'][_0x500928(0x4b3)]=function(){const _0x2d6749=_0x500928;return VisuMZ['CoreEngine'][_0x2d6749(0x17a)][_0x2d6749(0xe1)]['ModernControls'];},VisuMZ[_0x500928(0x858)][_0x500928(0x7b9)]=Window_Selectable[_0x500928(0x358)][_0x500928(0x2ec)],Window_Selectable[_0x500928(0x358)]['processCursorMove']=function(){const _0x4fe7d4=_0x500928;this[_0x4fe7d4(0x4b3)]()?(this[_0x4fe7d4(0x207)](),this[_0x4fe7d4(0x214)]()):VisuMZ['CoreEngine'][_0x4fe7d4(0x7b9)]['call'](this);},Window_Selectable[_0x500928(0x358)][_0x500928(0x154)]=function(){return!![];},Window_Selectable[_0x500928(0x358)][_0x500928(0x207)]=function(){const _0x4ac841=_0x500928;if(this['isCursorMovable']()){const _0x4ac92e=this['index']();Input[_0x4ac841(0x3c8)](_0x4ac841(0x3b7))&&(Input[_0x4ac841(0x480)]('shift')&&this[_0x4ac841(0x154)]()?this[_0x4ac841(0x1ec)]():this['cursorDown'](Input['isTriggered']('down'))),Input['isRepeated']('up')&&(Input[_0x4ac841(0x480)](_0x4ac841(0x533))&&this[_0x4ac841(0x154)]()?this[_0x4ac841(0x826)]():this[_0x4ac841(0x7ff)](Input[_0x4ac841(0x5a6)]('up'))),Input[_0x4ac841(0x3c8)]('right')&&this[_0x4ac841(0x185)](Input[_0x4ac841(0x5a6)]('right')),Input['isRepeated'](_0x4ac841(0x1f3))&&this[_0x4ac841(0x2f6)](Input[_0x4ac841(0x5a6)](_0x4ac841(0x1f3))),!this[_0x4ac841(0x4a4)](_0x4ac841(0xf5))&&Input['isRepeated'](_0x4ac841(0xf5))&&this[_0x4ac841(0x1ec)](),!this['isHandled'](_0x4ac841(0x5a3))&&Input['isRepeated']('pageup')&&this[_0x4ac841(0x826)](),this[_0x4ac841(0x180)]()!==_0x4ac92e&&this[_0x4ac841(0x447)]();}},Window_Selectable['prototype'][_0x500928(0x214)]=function(){const _0x2f1ddc=_0x500928;if(this[_0x2f1ddc(0x7e4)]()){const _0x56778d=this['index']();Input['isTriggered'](_0x2f1ddc(0x694))&&this[_0x2f1ddc(0x409)](Math['min'](this[_0x2f1ddc(0x180)](),0x0)),Input['isTriggered'](_0x2f1ddc(0x4b8))&&this[_0x2f1ddc(0x409)](Math[_0x2f1ddc(0x627)](this[_0x2f1ddc(0x180)](),this[_0x2f1ddc(0x29a)]()-0x1)),this[_0x2f1ddc(0x180)]()!==_0x56778d&&this['playCursorSound']();}},VisuMZ[_0x500928(0x858)][_0x500928(0x112)]=Window_Selectable[_0x500928(0x358)][_0x500928(0x562)],Window_Selectable['prototype']['processTouch']=function(){const _0x31c9e2=_0x500928;this[_0x31c9e2(0x4b3)]()?this['processTouchModernControls']():VisuMZ['CoreEngine'][_0x31c9e2(0x112)][_0x31c9e2(0x485)](this);},Window_Selectable[_0x500928(0x358)]['processTouchModernControls']=function(){const _0x1af9d4=_0x500928;VisuMZ[_0x1af9d4(0x858)][_0x1af9d4(0x112)][_0x1af9d4(0x485)](this);},Window_Selectable[_0x500928(0x358)][_0x500928(0x539)]=function(){const _0x5cac23=_0x500928;return VisuMZ['CoreEngine'][_0x5cac23(0x17a)][_0x5cac23(0x2d9)]['ColSpacing'];},Window_Selectable[_0x500928(0x358)][_0x500928(0x4e6)]=function(){const _0x4a414e=_0x500928;return VisuMZ[_0x4a414e(0x858)][_0x4a414e(0x17a)][_0x4a414e(0x2d9)][_0x4a414e(0x429)];},Window_Selectable[_0x500928(0x358)][_0x500928(0x230)]=function(){const _0x3567cf=_0x500928;return Window_Scrollable['prototype'][_0x3567cf(0x230)][_0x3567cf(0x485)](this)+VisuMZ[_0x3567cf(0x858)][_0x3567cf(0x17a)][_0x3567cf(0x2d9)]['ItemHeight'];;},VisuMZ['CoreEngine'][_0x500928(0x77f)]=Window_Selectable['prototype'][_0x500928(0x1cc)],Window_Selectable['prototype'][_0x500928(0x1cc)]=function(_0x592a9c){const _0x12b14c=_0x500928,_0x289c31=VisuMZ[_0x12b14c(0x858)][_0x12b14c(0x17a)][_0x12b14c(0x2d9)];if(_0x289c31[_0x12b14c(0x187)]===![])return;_0x289c31[_0x12b14c(0x541)]?_0x289c31['DrawItemBackgroundJS']['call'](this,_0x592a9c):VisuMZ[_0x12b14c(0x858)][_0x12b14c(0x77f)][_0x12b14c(0x485)](this,_0x592a9c);},VisuMZ[_0x500928(0x858)][_0x500928(0x6ac)]=Window_Gold['prototype'][_0x500928(0x642)],Window_Gold[_0x500928(0x358)][_0x500928(0x642)]=function(){const _0x434672=_0x500928;this[_0x434672(0x54b)]()?this[_0x434672(0x461)]():VisuMZ[_0x434672(0x858)][_0x434672(0x6ac)][_0x434672(0x485)](this);},Window_Gold[_0x500928(0x358)]['isItemStyle']=function(){const _0x5d522d=_0x500928;if(TextManager['currencyUnit']!==this[_0x5d522d(0x318)]())return![];return VisuMZ[_0x5d522d(0x858)]['Settings'][_0x5d522d(0x78a)][_0x5d522d(0x710)];},Window_Gold['prototype'][_0x500928(0x461)]=function(){const _0x162226=_0x500928;this[_0x162226(0x418)](),this[_0x162226(0x17d)][_0x162226(0x281)](),this['contents']['fontSize']=VisuMZ[_0x162226(0x858)][_0x162226(0x17a)][_0x162226(0x78a)]['GoldFontSize'];const _0x3afba7=VisuMZ[_0x162226(0x858)][_0x162226(0x17a)]['Gold'][_0x162226(0x6a7)],_0x1ba2f1=this[_0x162226(0x163)](0x0);if(_0x3afba7>0x0){const _0x470ffd=_0x1ba2f1['y']+(this[_0x162226(0x531)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x3afba7,_0x1ba2f1['x'],_0x470ffd);const _0x5189cd=ImageManager[_0x162226(0x167)]+0x4;_0x1ba2f1['x']+=_0x5189cd,_0x1ba2f1[_0x162226(0x7c8)]-=_0x5189cd;}this[_0x162226(0x774)](ColorManager['systemColor']()),this[_0x162226(0x55e)](this[_0x162226(0x318)](),_0x1ba2f1['x'],_0x1ba2f1['y'],_0x1ba2f1['width'],'left');const _0x558a50=this[_0x162226(0x219)](this['currencyUnit']())+0x6;;_0x1ba2f1['x']+=_0x558a50,_0x1ba2f1[_0x162226(0x7c8)]-=_0x558a50,this[_0x162226(0x624)]();const _0x1873a2=this[_0x162226(0x1fa)](),_0x2568c1=this['textWidth'](this[_0x162226(0x333)]?VisuMZ[_0x162226(0x261)](this['value']()):this['value']());_0x2568c1>_0x1ba2f1[_0x162226(0x7c8)]?this[_0x162226(0x55e)](VisuMZ[_0x162226(0x858)][_0x162226(0x17a)][_0x162226(0x78a)][_0x162226(0x38d)],_0x1ba2f1['x'],_0x1ba2f1['y'],_0x1ba2f1['width'],'right'):this[_0x162226(0x55e)](this[_0x162226(0x1fa)](),_0x1ba2f1['x'],_0x1ba2f1['y'],_0x1ba2f1[_0x162226(0x7c8)],'right'),this[_0x162226(0x418)]();},Window_StatusBase[_0x500928(0x358)][_0x500928(0x61a)]=function(_0x5aa216,_0x3ed417,_0x48a548,_0x20f91d,_0x30299c){const _0x251b10=_0x500928;_0x20f91d=String(_0x20f91d||'')[_0x251b10(0x491)]();if(VisuMZ['CoreEngine'][_0x251b10(0x17a)]['Param'][_0x251b10(0x568)]){const _0x45257c=VisuMZ[_0x251b10(0x6b5)](_0x20f91d);_0x30299c?(this[_0x251b10(0xe3)](_0x45257c,_0x5aa216,_0x3ed417,this[_0x251b10(0x60a)]()),_0x48a548-=this[_0x251b10(0x60a)]()+0x2,_0x5aa216+=this['gaugeLineHeight']()+0x2):(this['drawIcon'](_0x45257c,_0x5aa216+0x2,_0x3ed417+0x2),_0x48a548-=ImageManager['iconWidth']+0x4,_0x5aa216+=ImageManager[_0x251b10(0x167)]+0x4);}const _0xebf6a9=TextManager['param'](_0x20f91d);this[_0x251b10(0x418)](),this[_0x251b10(0x774)](ColorManager[_0x251b10(0x22b)]()),_0x30299c?(this[_0x251b10(0x17d)][_0x251b10(0x1e7)]=this[_0x251b10(0xc6)](),this[_0x251b10(0x17d)]['drawText'](_0xebf6a9,_0x5aa216,_0x3ed417,_0x48a548,this[_0x251b10(0x60a)](),_0x251b10(0x1f3))):this[_0x251b10(0x55e)](_0xebf6a9,_0x5aa216,_0x3ed417,_0x48a548),this[_0x251b10(0x418)]();},Window_StatusBase[_0x500928(0x358)][_0x500928(0xc6)]=function(){const _0x5d5a19=_0x500928;return $gameSystem[_0x5d5a19(0x46c)]()-0x8;},Window_StatusBase[_0x500928(0x358)][_0x500928(0x56f)]=function(_0x566f84,_0x36ecdc,_0x4df001,_0x542438){const _0x99bdba=_0x500928;_0x542438=_0x542438||0xa8,this[_0x99bdba(0x624)]();if(VisuMZ[_0x99bdba(0x858)]['Settings']['UI'][_0x99bdba(0x561)])this[_0x99bdba(0x802)](_0x566f84[_0x99bdba(0xdd)]()['name'],_0x36ecdc,_0x4df001,_0x542438);else{const _0x300031=_0x566f84[_0x99bdba(0xdd)]()[_0x99bdba(0x725)][_0x99bdba(0x1b7)](/\\I\[(\d+)\]/gi,'');this[_0x99bdba(0x55e)](_0x300031,_0x36ecdc,_0x4df001,_0x542438);}},Window_StatusBase[_0x500928(0x358)]['drawActorNickname']=function(_0x1d7df4,_0x3fc8c4,_0x3d575f,_0x2d0339){const _0x5f0bf3=_0x500928;_0x2d0339=_0x2d0339||0x10e,this['resetTextColor']();if(VisuMZ[_0x5f0bf3(0x858)][_0x5f0bf3(0x17a)]['UI'][_0x5f0bf3(0x57c)])this[_0x5f0bf3(0x802)](_0x1d7df4['nickname'](),_0x3fc8c4,_0x3d575f,_0x2d0339);else{const _0x4186fe=_0x1d7df4[_0x5f0bf3(0x616)]()[_0x5f0bf3(0x1b7)](/\\I\[(\d+)\]/gi,'');this[_0x5f0bf3(0x55e)](_0x1d7df4[_0x5f0bf3(0x616)](),_0x3fc8c4,_0x3d575f,_0x2d0339);}},VisuMZ[_0x500928(0x858)][_0x500928(0x118)]=Window_StatusBase[_0x500928(0x358)]['drawActorLevel'],Window_StatusBase[_0x500928(0x358)][_0x500928(0x5d3)]=function(_0x43f492,_0xc6a386,_0xb3a684){const _0x4e6a3f=_0x500928;if(VisuMZ['CoreEngine'][_0x4e6a3f(0x17a)]['Param']['ShowActorLevel']===![])return;if(this[_0x4e6a3f(0x59e)]())this[_0x4e6a3f(0x4d2)](_0x43f492,_0xc6a386,_0xb3a684);VisuMZ[_0x4e6a3f(0x858)][_0x4e6a3f(0x118)][_0x4e6a3f(0x485)](this,_0x43f492,_0xc6a386,_0xb3a684);},Window_StatusBase[_0x500928(0x358)][_0x500928(0x59e)]=function(){const _0xe2e3c6=_0x500928;return VisuMZ[_0xe2e3c6(0x858)]['Settings']['UI']['LvExpGauge'];},Window_StatusBase['prototype']['drawActorExpGauge']=function(_0x58e7d6,_0xa7b6b8,_0xd2e3d4){const _0x385c76=_0x500928;if(!_0x58e7d6)return;if(!_0x58e7d6[_0x385c76(0x327)]())return;const _0x58e3f9=0x80,_0x464dbf=_0x58e7d6[_0x385c76(0x592)]();let _0x51a1e6=ColorManager['expGaugeColor1'](),_0x482b4a=ColorManager[_0x385c76(0xdc)]();_0x464dbf>=0x1&&(_0x51a1e6=ColorManager[_0x385c76(0x392)](),_0x482b4a=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0xa7b6b8,_0xd2e3d4,_0x58e3f9,_0x464dbf,_0x51a1e6,_0x482b4a);},Window_EquipStatus[_0x500928(0x358)][_0x500928(0x288)]=function(){const _0x18d433=_0x500928;let _0x2f5097=0x0;for(const _0x3f7a64 of VisuMZ[_0x18d433(0x858)][_0x18d433(0x17a)]['Param'][_0x18d433(0x1a9)]){const _0x1f38cd=this[_0x18d433(0x566)](),_0xaaffe4=this[_0x18d433(0x313)](_0x2f5097);this[_0x18d433(0x874)](_0x1f38cd,_0xaaffe4,_0x3f7a64),_0x2f5097++;}},Window_EquipStatus['prototype'][_0x500928(0x111)]=function(_0x12e650,_0xec61eb,_0x443430){const _0x55a195=_0x500928,_0x27395c=this['paramX']()-this[_0x55a195(0x566)]()*0x2;this['drawParamText'](_0x12e650,_0xec61eb,_0x27395c,_0x443430,![]);},Window_EquipStatus[_0x500928(0x358)][_0x500928(0x52e)]=function(_0x4f7dc5,_0xb04a74,_0x777c61){const _0x29a9ad=_0x500928,_0x464de7=this[_0x29a9ad(0x3e5)]();this['resetTextColor'](),this[_0x29a9ad(0x55e)](this[_0x29a9ad(0x6e4)][_0x29a9ad(0x208)](_0x777c61,!![]),_0x4f7dc5,_0xb04a74,_0x464de7,_0x29a9ad(0x73f));},Window_EquipStatus[_0x500928(0x358)][_0x500928(0x752)]=function(_0x1091d0,_0x2d177d){const _0x415394=_0x500928,_0x1f1e82=this[_0x415394(0x6a4)]();this[_0x415394(0x774)](ColorManager[_0x415394(0x22b)]());const _0x36e884=VisuMZ['CoreEngine']['Settings']['UI'][_0x415394(0x3d0)];this[_0x415394(0x55e)](_0x36e884,_0x1091d0,_0x2d177d,_0x1f1e82,_0x415394(0x369));},Window_EquipStatus[_0x500928(0x358)][_0x500928(0x23b)]=function(_0x4971c9,_0x41f323,_0x1c1dee){const _0x802521=_0x500928,_0x4a15e6=this[_0x802521(0x3e5)](),_0x412a15=this[_0x802521(0x3aa)][_0x802521(0x208)](_0x1c1dee),_0x2f0d12=_0x412a15-this['_actor'][_0x802521(0x208)](_0x1c1dee);this['changeTextColor'](ColorManager[_0x802521(0x7bb)](_0x2f0d12)),this[_0x802521(0x55e)](this['_tempActor'][_0x802521(0x208)](_0x1c1dee,!![]),_0x4971c9,_0x41f323,_0x4a15e6,'right');},VisuMZ['CoreEngine']['Window_EquipItem_isEnabled']=Window_EquipItem[_0x500928(0x358)]['isEnabled'],Window_EquipItem[_0x500928(0x358)][_0x500928(0x6b9)]=function(_0x2c5455){const _0x3c2dfb=_0x500928;return _0x2c5455&&this[_0x3c2dfb(0x6e4)]?this[_0x3c2dfb(0x6e4)]['canEquip'](_0x2c5455):VisuMZ['CoreEngine']['Window_EquipItem_isEnabled'][_0x3c2dfb(0x485)](this,_0x2c5455);},Window_StatusParams[_0x500928(0x358)]['maxItems']=function(){const _0xab0698=_0x500928;return VisuMZ[_0xab0698(0x858)][_0xab0698(0x17a)][_0xab0698(0xd3)][_0xab0698(0x1a9)][_0xab0698(0x12e)];},Window_StatusParams['prototype'][_0x500928(0x874)]=function(_0x174596){const _0x3ddf49=_0x500928,_0x348903=this[_0x3ddf49(0x163)](_0x174596),_0x857b21=VisuMZ[_0x3ddf49(0x858)][_0x3ddf49(0x17a)][_0x3ddf49(0xd3)]['DisplayedParams'][_0x174596],_0x5275ba=TextManager[_0x3ddf49(0x838)](_0x857b21),_0x4c5f27=this[_0x3ddf49(0x6e4)][_0x3ddf49(0x208)](_0x857b21,!![]);this['drawParamText'](_0x348903['x'],_0x348903['y'],0xa0,_0x857b21,![]),this[_0x3ddf49(0x624)](),this[_0x3ddf49(0x55e)](_0x4c5f27,_0x348903['x']+0xa0,_0x348903['y'],0x3c,_0x3ddf49(0x73f));};if(VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x1ce)]['EnableNameInput']){VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['KeyboardInput'][_0x500928(0x170)]&&(Window_NameInput[_0x500928(0x1a1)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x500928(0x54a),'OK']);;VisuMZ[_0x500928(0x858)][_0x500928(0x2fd)]=Window_NameInput[_0x500928(0x358)][_0x500928(0x32f)],Window_NameInput[_0x500928(0x358)][_0x500928(0x32f)]=function(_0x3df249){const _0x498465=_0x500928;this[_0x498465(0x62c)]=this[_0x498465(0x130)](),VisuMZ[_0x498465(0x858)][_0x498465(0x2fd)][_0x498465(0x485)](this,_0x3df249),this[_0x498465(0x62c)]===_0x498465(0x2c4)?this[_0x498465(0x662)](0x0):(Input[_0x498465(0x281)](),this[_0x498465(0x362)]());},Window_NameInput[_0x500928(0x358)][_0x500928(0x130)]=function(){const _0x39bbfa=_0x500928;if(Input[_0x39bbfa(0x1ea)]())return'default';return VisuMZ[_0x39bbfa(0x858)][_0x39bbfa(0x17a)][_0x39bbfa(0x1ce)][_0x39bbfa(0x4f4)]||_0x39bbfa(0x5a8);},VisuMZ['CoreEngine'][_0x500928(0x5e0)]=Window_NameInput[_0x500928(0x358)][_0x500928(0x471)],Window_NameInput[_0x500928(0x358)][_0x500928(0x471)]=function(){const _0x1c2f51=_0x500928;if(!this[_0x1c2f51(0x4a2)]())return;if(!this[_0x1c2f51(0x65d)])return;if(this[_0x1c2f51(0x62c)]==='keyboard'&&Input['isGamepadTriggered']())this[_0x1c2f51(0x19c)](_0x1c2f51(0x2c4));else{if(Input[_0x1c2f51(0xdf)](_0x1c2f51(0x76d)))Input[_0x1c2f51(0x281)](),this['processBack']();else{if(Input[_0x1c2f51(0x5a6)](_0x1c2f51(0x82b)))Input[_0x1c2f51(0x281)](),this[_0x1c2f51(0x62c)]===_0x1c2f51(0x5a8)?this[_0x1c2f51(0x19c)](_0x1c2f51(0x2c4)):this[_0x1c2f51(0x19c)]('keyboard');else{if(this[_0x1c2f51(0x62c)]===_0x1c2f51(0x5a8))this[_0x1c2f51(0x33c)]();else Input['isSpecialCode'](_0x1c2f51(0x2dc))?(Input[_0x1c2f51(0x281)](),this[_0x1c2f51(0x19c)]('keyboard')):VisuMZ['CoreEngine'][_0x1c2f51(0x5e0)][_0x1c2f51(0x485)](this);}}}},VisuMZ[_0x500928(0x858)][_0x500928(0x4a9)]=Window_NameInput[_0x500928(0x358)]['processTouch'],Window_NameInput[_0x500928(0x358)][_0x500928(0x562)]=function(){const _0x2a56ca=_0x500928;if(!this[_0x2a56ca(0x670)]())return;if(this['_mode']===_0x2a56ca(0x5a8)){if(TouchInput[_0x2a56ca(0x5a6)]()&&this[_0x2a56ca(0x692)]())this['switchModes'](_0x2a56ca(0x2c4));else TouchInput[_0x2a56ca(0x528)]()&&this[_0x2a56ca(0x19c)](_0x2a56ca(0x2c4));}else VisuMZ[_0x2a56ca(0x858)]['Window_NameInput_processTouch'][_0x2a56ca(0x485)](this);},Window_NameInput[_0x500928(0x358)][_0x500928(0x33c)]=function(){const _0x49f95f=_0x500928;if(Input[_0x49f95f(0xdf)]('enter'))Input['clear'](),this['onNameOk']();else{if(Input[_0x49f95f(0x646)]!==undefined){let _0x461374=Input['_inputString'],_0x372d00=_0x461374[_0x49f95f(0x12e)];for(let _0x3fe3d9=0x0;_0x3fe3d9<_0x372d00;++_0x3fe3d9){this[_0x49f95f(0x241)][_0x49f95f(0x56b)](_0x461374[_0x3fe3d9])?SoundManager['playOk']():SoundManager[_0x49f95f(0x665)]();}Input['clear']();}}},Window_NameInput['prototype'][_0x500928(0x19c)]=function(_0x4a078c){const _0x2900bc=_0x500928;let _0x58d190=this[_0x2900bc(0x62c)];this['_mode']=_0x4a078c,_0x58d190!==this[_0x2900bc(0x62c)]&&(this['refresh'](),SoundManager[_0x2900bc(0x577)](),this['_mode']==='default'?this[_0x2900bc(0x662)](0x0):this[_0x2900bc(0x662)](-0x1));},VisuMZ[_0x500928(0x858)][_0x500928(0x698)]=Window_NameInput['prototype'][_0x500928(0x5be)],Window_NameInput['prototype']['cursorDown']=function(_0x30eb36){const _0x4d1e2a=_0x500928;if(this[_0x4d1e2a(0x62c)]===_0x4d1e2a(0x5a8)&&!Input[_0x4d1e2a(0x584)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x4d1e2a(0x858)]['Window_NameInput_cursorDown'][_0x4d1e2a(0x485)](this,_0x30eb36),this[_0x4d1e2a(0x19c)](_0x4d1e2a(0x2c4));},VisuMZ[_0x500928(0x858)][_0x500928(0x399)]=Window_NameInput[_0x500928(0x358)][_0x500928(0x7ff)],Window_NameInput[_0x500928(0x358)]['cursorUp']=function(_0x3df292){const _0x45adff=_0x500928;if(this['_mode']===_0x45adff(0x5a8)&&!Input['isArrowPressed']())return;if(Input[_0x45adff(0x2a5)]())return;VisuMZ['CoreEngine'][_0x45adff(0x399)][_0x45adff(0x485)](this,_0x3df292),this['switchModes']('default');},VisuMZ[_0x500928(0x858)][_0x500928(0x7df)]=Window_NameInput[_0x500928(0x358)][_0x500928(0x185)],Window_NameInput[_0x500928(0x358)][_0x500928(0x185)]=function(_0x48539e){const _0x1c8893=_0x500928;if(this[_0x1c8893(0x62c)]==='keyboard'&&!Input[_0x1c8893(0x584)]())return;if(Input[_0x1c8893(0x2a5)]())return;VisuMZ['CoreEngine'][_0x1c8893(0x7df)]['call'](this,_0x48539e),this['switchModes'](_0x1c8893(0x2c4));},VisuMZ[_0x500928(0x858)][_0x500928(0x6d3)]=Window_NameInput[_0x500928(0x358)][_0x500928(0x2f6)],Window_NameInput[_0x500928(0x358)][_0x500928(0x2f6)]=function(_0xb9afe8){const _0x1ff0a4=_0x500928;if(this[_0x1ff0a4(0x62c)]===_0x1ff0a4(0x5a8)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x1ff0a4(0x858)][_0x1ff0a4(0x6d3)][_0x1ff0a4(0x485)](this,_0xb9afe8),this[_0x1ff0a4(0x19c)](_0x1ff0a4(0x2c4));},VisuMZ[_0x500928(0x858)]['Window_NameInput_cursorPagedown']=Window_NameInput['prototype'][_0x500928(0x1ec)],Window_NameInput[_0x500928(0x358)][_0x500928(0x1ec)]=function(){const _0x41014e=_0x500928;if(this[_0x41014e(0x62c)]===_0x41014e(0x5a8))return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x41014e(0x49f)]['call'](this),this[_0x41014e(0x19c)](_0x41014e(0x2c4));},VisuMZ[_0x500928(0x858)][_0x500928(0x860)]=Window_NameInput[_0x500928(0x358)][_0x500928(0x826)],Window_NameInput[_0x500928(0x358)][_0x500928(0x826)]=function(){const _0x482b3c=_0x500928;if(this[_0x482b3c(0x62c)]==='keyboard')return;if(Input[_0x482b3c(0x2a5)]())return;VisuMZ[_0x482b3c(0x858)]['Window_NameInput_cursorPageup'][_0x482b3c(0x485)](this),this[_0x482b3c(0x19c)]('default');},VisuMZ[_0x500928(0x858)][_0x500928(0x6a6)]=Window_NameInput[_0x500928(0x358)]['refresh'],Window_NameInput[_0x500928(0x358)][_0x500928(0x642)]=function(){const _0x15cf81=_0x500928;if(this[_0x15cf81(0x62c)]==='keyboard'){this['contents'][_0x15cf81(0x281)](),this[_0x15cf81(0x14e)][_0x15cf81(0x281)](),this[_0x15cf81(0x624)]();let _0x374523=VisuMZ[_0x15cf81(0x858)][_0x15cf81(0x17a)]['KeyboardInput'][_0x15cf81(0x373)][_0x15cf81(0x3b8)]('\x0a'),_0xee6464=_0x374523[_0x15cf81(0x12e)],_0x44e035=(this[_0x15cf81(0x42e)]-_0xee6464*this['lineHeight']())/0x2;for(let _0x3c2d25=0x0;_0x3c2d25<_0xee6464;++_0x3c2d25){let _0x594d9f=_0x374523[_0x3c2d25],_0x5bb4fa=this[_0x15cf81(0x49d)](_0x594d9f)[_0x15cf81(0x7c8)],_0x8b268e=Math[_0x15cf81(0x64f)]((this[_0x15cf81(0x17d)]['width']-_0x5bb4fa)/0x2);this['drawTextEx'](_0x594d9f,_0x8b268e,_0x44e035),_0x44e035+=this['lineHeight']();}}else VisuMZ[_0x15cf81(0x858)][_0x15cf81(0x6a6)][_0x15cf81(0x485)](this);};};VisuMZ[_0x500928(0x858)][_0x500928(0x24f)]=Window_ShopSell[_0x500928(0x358)][_0x500928(0x6b9)],Window_ShopSell['prototype'][_0x500928(0x6b9)]=function(_0x3ecfb0){const _0x1fb43c=_0x500928;return VisuMZ['CoreEngine'][_0x1fb43c(0x17a)][_0x1fb43c(0xe1)][_0x1fb43c(0x6b7)]&&DataManager['isKeyItem'](_0x3ecfb0)?![]:VisuMZ[_0x1fb43c(0x858)][_0x1fb43c(0x24f)][_0x1fb43c(0x485)](this,_0x3ecfb0);},Window_NumberInput[_0x500928(0x358)][_0x500928(0x4b3)]=function(){return![];};VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x1ce)][_0x500928(0x536)]&&(VisuMZ[_0x500928(0x858)]['Window_NumberInput_start']=Window_NumberInput[_0x500928(0x358)][_0x500928(0x227)],Window_NumberInput[_0x500928(0x358)][_0x500928(0x227)]=function(){const _0x2e04b6=_0x500928;VisuMZ[_0x2e04b6(0x858)][_0x2e04b6(0x280)][_0x2e04b6(0x485)](this),this['select'](this[_0x2e04b6(0x876)]-0x1),Input[_0x2e04b6(0x281)]();},VisuMZ[_0x500928(0x858)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x500928(0x358)]['processDigitChange'],Window_NumberInput[_0x500928(0x358)]['processDigitChange']=function(){const _0x359549=_0x500928;if(!this['isOpenAndActive']())return;if(Input[_0x359549(0x2a5)]())this['processKeyboardDigitChange']();else{if(Input[_0x359549(0xdf)](_0x359549(0x76d)))this[_0x359549(0x612)]();else{if(Input[_0x359549(0x682)]===0x2e)this['processKeyboardDelete']();else{if(Input['_inputSpecialKeyCode']===0x24)this['processKeyboardHome']();else Input['_inputSpecialKeyCode']===0x23?this[_0x359549(0x100)]():VisuMZ[_0x359549(0x858)][_0x359549(0x59c)][_0x359549(0x485)](this);}}}},Window_NumberInput['prototype']['processCursorMove']=function(){const _0x58bfe3=_0x500928;if(!this[_0x58bfe3(0x7e4)]())return;Input[_0x58bfe3(0x2a5)]()?this[_0x58bfe3(0x51c)]():Window_Selectable[_0x58bfe3(0x358)][_0x58bfe3(0x2ec)][_0x58bfe3(0x485)](this);},Window_NumberInput[_0x500928(0x358)][_0x500928(0x214)]=function(){},Window_NumberInput[_0x500928(0x358)][_0x500928(0x51c)]=function(){const _0xb36808=_0x500928;if(String(this[_0xb36808(0x804)])[_0xb36808(0x12e)]>=this[_0xb36808(0x876)])return;const _0x314877=Number(String(this[_0xb36808(0x804)])+Input[_0xb36808(0x646)]);if(isNaN(_0x314877))return;this['_number']=_0x314877;const _0x52dd53='9'[_0xb36808(0x697)](this[_0xb36808(0x876)]);this[_0xb36808(0x804)]=this[_0xb36808(0x804)]['clamp'](0x0,_0x52dd53),Input[_0xb36808(0x281)](),this['refresh'](),SoundManager[_0xb36808(0x3e1)](),this[_0xb36808(0x662)](this[_0xb36808(0x876)]-0x1);},Window_NumberInput[_0x500928(0x358)][_0x500928(0x612)]=function(){const _0x4c19d2=_0x500928;this[_0x4c19d2(0x804)]=Number(String(this[_0x4c19d2(0x804)])[_0x4c19d2(0x1f4)](0x0,-0x1)),this[_0x4c19d2(0x804)]=Math[_0x4c19d2(0x627)](0x0,this['_number']),Input['clear'](),this['refresh'](),SoundManager[_0x4c19d2(0x3e1)](),this[_0x4c19d2(0x662)](this['_maxDigits']-0x1);},Window_NumberInput[_0x500928(0x358)][_0x500928(0x723)]=function(){const _0x73d577=_0x500928;this[_0x73d577(0x804)]=Number(String(this[_0x73d577(0x804)])[_0x73d577(0x398)](0x1)),this[_0x73d577(0x804)]=Math['max'](0x0,this[_0x73d577(0x804)]),Input[_0x73d577(0x281)](),this[_0x73d577(0x642)](),SoundManager[_0x73d577(0x3e1)](),this['select'](this[_0x73d577(0x876)]-0x1);},Window_NumberInput['prototype']['processKeyboardHome']=function(){const _0x478d57=_0x500928;if(this['index']()===0x0)return;Input[_0x478d57(0x281)](),this[_0x478d57(0x642)](),SoundManager[_0x478d57(0x3e1)](),this[_0x478d57(0x662)](0x0);},Window_NumberInput[_0x500928(0x358)]['processKeyboardEnd']=function(){const _0xe470a2=_0x500928;if(this['index']()===this[_0xe470a2(0x876)]-0x1)return;Input[_0xe470a2(0x281)](),this[_0xe470a2(0x642)](),SoundManager['playCursor'](),this[_0xe470a2(0x662)](this['_maxDigits']-0x1);});;VisuMZ[_0x500928(0x858)][_0x500928(0x87f)]=Window_MapName['prototype'][_0x500928(0x642)],Window_MapName[_0x500928(0x358)][_0x500928(0x642)]=function(){const _0x38f347=_0x500928;VisuMZ[_0x38f347(0x858)][_0x38f347(0x17a)][_0x38f347(0xe1)]['MapNameTextCode']?this[_0x38f347(0x4b6)]():VisuMZ[_0x38f347(0x858)]['Window_MapName_refresh'][_0x38f347(0x485)](this);},Window_MapName[_0x500928(0x358)]['refreshWithTextCodeSupport']=function(){const _0x1d5eb6=_0x500928;this[_0x1d5eb6(0x17d)][_0x1d5eb6(0x281)]();if($gameMap[_0x1d5eb6(0x628)]()){const _0x19646e=this['innerWidth'];this[_0x1d5eb6(0x595)](0x0,0x0,_0x19646e,this[_0x1d5eb6(0x531)]());const _0x36d356=this[_0x1d5eb6(0x49d)]($gameMap[_0x1d5eb6(0x628)]())[_0x1d5eb6(0x7c8)];this[_0x1d5eb6(0x802)]($gameMap[_0x1d5eb6(0x628)](),Math[_0x1d5eb6(0x64f)]((_0x19646e-_0x36d356)/0x2),0x0);}},Window_TitleCommand['_commandList']=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['TitleCommandList'],Window_TitleCommand['prototype'][_0x500928(0x305)]=function(){const _0x1970f7=_0x500928;this[_0x1970f7(0x44c)]();},Window_TitleCommand['prototype'][_0x500928(0x44c)]=function(){const _0x105059=_0x500928;for(const _0x22360c of Window_TitleCommand[_0x105059(0x79a)]){if(_0x22360c[_0x105059(0x1df)][_0x105059(0x485)](this)){const _0x4ecdb3=_0x22360c['Symbol'];let _0x4ac778=_0x22360c[_0x105059(0x82c)];if(['',_0x105059(0x225)][_0x105059(0x250)](_0x4ac778))_0x4ac778=_0x22360c[_0x105059(0x423)][_0x105059(0x485)](this);const _0x28ec77=_0x22360c[_0x105059(0x4db)][_0x105059(0x485)](this),_0x42b870=_0x22360c[_0x105059(0xee)][_0x105059(0x485)](this);this[_0x105059(0x755)](_0x4ac778,_0x4ecdb3,_0x28ec77,_0x42b870),this['setHandler'](_0x4ecdb3,_0x22360c['CallHandlerJS'][_0x105059(0x59d)](this,_0x42b870));}}},VisuMZ['CoreEngine'][_0x500928(0x126)]=Window_TitleCommand[_0x500928(0x358)][_0x500928(0x852)],Window_TitleCommand[_0x500928(0x358)][_0x500928(0x852)]=function(){const _0x259101=_0x500928;VisuMZ['CoreEngine'][_0x259101(0x126)][_0x259101(0x485)](this);if(!Window_TitleCommand[_0x259101(0x1d1)])return;const _0xe61517=this[_0x259101(0xd0)](Window_TitleCommand[_0x259101(0x1d1)]),_0xdb7754=Math[_0x259101(0x64f)](this[_0x259101(0x671)]()/0x2)-0x1;this[_0x259101(0x409)](_0xe61517),this[_0x259101(0x7ef)]>0x1&&(this[_0x259101(0x7ef)]=0x1,this[_0x259101(0x1e0)]()),this[_0x259101(0x5b1)](_0xe61517-_0xdb7754);},Window_GameEnd[_0x500928(0x79a)]=VisuMZ[_0x500928(0x858)][_0x500928(0x17a)]['MenuLayout'][_0x500928(0x707)][_0x500928(0x5d4)],Window_GameEnd[_0x500928(0x358)][_0x500928(0x305)]=function(){const _0x30f8af=_0x500928;this[_0x30f8af(0x44c)]();},Window_GameEnd['prototype'][_0x500928(0x44c)]=function(){const _0x10dfa5=_0x500928;for(const _0x5ed17e of Window_GameEnd['_commandList']){if(_0x5ed17e['ShowJS'][_0x10dfa5(0x485)](this)){const _0x24c3a6=_0x5ed17e[_0x10dfa5(0x401)];let _0xeaab1a=_0x5ed17e[_0x10dfa5(0x82c)];if(['',_0x10dfa5(0x225)][_0x10dfa5(0x250)](_0xeaab1a))_0xeaab1a=_0x5ed17e['TextJS'][_0x10dfa5(0x485)](this);const _0x54c8c1=_0x5ed17e['EnableJS'][_0x10dfa5(0x485)](this),_0x317d88=_0x5ed17e[_0x10dfa5(0xee)]['call'](this);this[_0x10dfa5(0x755)](_0xeaab1a,_0x24c3a6,_0x54c8c1,_0x317d88),this[_0x10dfa5(0x336)](_0x24c3a6,_0x5ed17e[_0x10dfa5(0x54c)]['bind'](this,_0x317d88));}}};function Window_ButtonAssist(){const _0x4130f9=_0x500928;this[_0x4130f9(0x32f)](...arguments);}Window_ButtonAssist['prototype']=Object[_0x500928(0x5a4)](Window_Base[_0x500928(0x358)]),Window_ButtonAssist[_0x500928(0x358)][_0x500928(0x2f3)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x500928(0x32f)]=function(_0x4665e1){const _0x78f2bc=_0x500928;this[_0x78f2bc(0x24c)]={},Window_Base[_0x78f2bc(0x358)][_0x78f2bc(0x32f)][_0x78f2bc(0x485)](this,_0x4665e1),this[_0x78f2bc(0x742)](VisuMZ['CoreEngine'][_0x78f2bc(0x17a)][_0x78f2bc(0x155)][_0x78f2bc(0x103)]||0x0),this['refresh']();},Window_ButtonAssist['prototype'][_0x500928(0x547)]=function(){const _0x1e741e=_0x500928;this[_0x1e741e(0x17d)][_0x1e741e(0x1e7)]<=0x60&&(this[_0x1e741e(0x17d)][_0x1e741e(0x1e7)]+=0x6);},Window_ButtonAssist[_0x500928(0x358)]['makeFontSmaller']=function(){const _0x3fd667=_0x500928;this[_0x3fd667(0x17d)][_0x3fd667(0x1e7)]>=0x18&&(this[_0x3fd667(0x17d)][_0x3fd667(0x1e7)]-=0x6);},Window_ButtonAssist[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x494fe3=_0x500928;Window_Base['prototype'][_0x494fe3(0x836)]['call'](this),this[_0x494fe3(0x66c)]();},Window_ButtonAssist[_0x500928(0x358)]['updatePadding']=function(){const _0x5cfa23=_0x500928;this[_0x5cfa23(0x142)]=SceneManager[_0x5cfa23(0x307)][_0x5cfa23(0x7d8)]()!==_0x5cfa23(0x827)?0x0:0x8;},Window_ButtonAssist[_0x500928(0x358)]['updateKeyText']=function(){const _0x35b44d=_0x500928,_0x116d17=SceneManager[_0x35b44d(0x307)];for(let _0x49603c=0x1;_0x49603c<=0x5;_0x49603c++){if(this[_0x35b44d(0x24c)]['key%1'[_0x35b44d(0xc1)](_0x49603c)]!==_0x116d17['buttonAssistKey%1'[_0x35b44d(0xc1)](_0x49603c)]())return this[_0x35b44d(0x642)]();if(this[_0x35b44d(0x24c)][_0x35b44d(0x371)[_0x35b44d(0xc1)](_0x49603c)]!==_0x116d17[_0x35b44d(0x6a3)[_0x35b44d(0xc1)](_0x49603c)]())return this['refresh']();}},Window_ButtonAssist['prototype'][_0x500928(0x642)]=function(){const _0x34633e=_0x500928;this['contents'][_0x34633e(0x281)]();for(let _0x6284e0=0x1;_0x6284e0<=0x5;_0x6284e0++){this[_0x34633e(0x26f)](_0x6284e0);}},Window_ButtonAssist[_0x500928(0x358)][_0x500928(0x26f)]=function(_0x32ef65){const _0xa28923=_0x500928,_0x2d1ed4=this[_0xa28923(0x319)]/0x5,_0x1abaf6=SceneManager[_0xa28923(0x307)],_0x11bbae=_0x1abaf6[_0xa28923(0x321)['format'](_0x32ef65)](),_0x2c8354=_0x1abaf6[_0xa28923(0x6a3)[_0xa28923(0xc1)](_0x32ef65)]();this[_0xa28923(0x24c)]['key%1'[_0xa28923(0xc1)](_0x32ef65)]=_0x11bbae,this['_data'][_0xa28923(0x371)['format'](_0x32ef65)]=_0x2c8354;if(_0x11bbae==='')return;if(_0x2c8354==='')return;const _0x552e7b=_0x1abaf6[_0xa28923(0x6d6)['format'](_0x32ef65)](),_0x19bc34=this[_0xa28923(0x566)](),_0xbcc03c=_0x2d1ed4*(_0x32ef65-0x1)+_0x19bc34+_0x552e7b,_0x2540c9=VisuMZ[_0xa28923(0x858)][_0xa28923(0x17a)][_0xa28923(0x155)][_0xa28923(0x14f)];this['drawTextEx'](_0x2540c9[_0xa28923(0xc1)](_0x11bbae,_0x2c8354),_0xbcc03c,0x0,_0x2d1ed4-_0x19bc34*0x2);},VisuMZ[_0x500928(0x858)][_0x500928(0x6f1)]=Game_Interpreter['prototype'][_0x500928(0x3dc)],Game_Interpreter[_0x500928(0x358)][_0x500928(0x3dc)]=function(){const _0x1bb9b9=_0x500928;if($gameTemp[_0x1bb9b9(0x66e)]!==undefined)return VisuMZ['CoreEngine'][_0x1bb9b9(0x4c1)]();return VisuMZ[_0x1bb9b9(0x858)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ['CoreEngine'][_0x500928(0x4c1)]=function(){const _0x22e24c=_0x500928,_0x30b55a=$gameTemp['_pictureCoordinatesMode']||0x0;(_0x30b55a<0x0||_0x30b55a>0x64||TouchInput[_0x22e24c(0x528)]()||Input[_0x22e24c(0x5a6)](_0x22e24c(0xd2)))&&($gameTemp[_0x22e24c(0x66e)]=undefined,Input[_0x22e24c(0x281)](),TouchInput[_0x22e24c(0x281)]());const _0x9f065f=$gameScreen[_0x22e24c(0x503)](_0x30b55a);return _0x9f065f&&(_0x9f065f['_x']=TouchInput['_x'],_0x9f065f['_y']=TouchInput['_y']),VisuMZ[_0x22e24c(0x858)][_0x22e24c(0x178)](),$gameTemp[_0x22e24c(0x66e)]!==undefined;},VisuMZ['CoreEngine'][_0x500928(0x178)]=function(){const _0x1bd056=_0x500928,_0x5cf299=SceneManager[_0x1bd056(0x307)];if(!_0x5cf299)return;!_0x5cf299[_0x1bd056(0x7a3)]&&(SoundManager[_0x1bd056(0x190)](),_0x5cf299[_0x1bd056(0x7a3)]=new Window_PictureCoordinates(),_0x5cf299[_0x1bd056(0x86b)](_0x5cf299['_pictureCoordinatesWindow'])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x1bd056(0x258)](),_0x5cf299[_0x1bd056(0x410)](_0x5cf299[_0x1bd056(0x7a3)]),_0x5cf299[_0x1bd056(0x7a3)]=undefined);};function Window_PictureCoordinates(){const _0x3bc359=_0x500928;this[_0x3bc359(0x32f)](...arguments);}Window_PictureCoordinates[_0x500928(0x358)]=Object[_0x500928(0x5a4)](Window_Base[_0x500928(0x358)]),Window_PictureCoordinates[_0x500928(0x358)][_0x500928(0x2f3)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x500928(0x358)][_0x500928(0x32f)]=function(){const _0x7506ef=_0x500928;this[_0x7506ef(0x1d3)]=_0x7506ef(0x266),this[_0x7506ef(0x657)]=_0x7506ef(0x266),this['_lastY']=_0x7506ef(0x266);const _0x549db5=this[_0x7506ef(0x24b)]();Window_Base[_0x7506ef(0x358)][_0x7506ef(0x32f)][_0x7506ef(0x485)](this,_0x549db5),this[_0x7506ef(0x742)](0x2);},Window_PictureCoordinates[_0x500928(0x358)][_0x500928(0x24b)]=function(){const _0x57a4a7=_0x500928;let _0x319559=0x0,_0x4bcdda=Graphics[_0x57a4a7(0x3ff)]-this[_0x57a4a7(0x531)](),_0x10e59e=Graphics['width'],_0x1ceb0c=this['lineHeight']();return new Rectangle(_0x319559,_0x4bcdda,_0x10e59e,_0x1ceb0c);},Window_PictureCoordinates[_0x500928(0x358)][_0x500928(0x4d8)]=function(){const _0x50cef6=_0x500928;this[_0x50cef6(0x142)]=0x0;},Window_PictureCoordinates['prototype'][_0x500928(0x836)]=function(){const _0x5429fe=_0x500928;Window_Base[_0x5429fe(0x358)][_0x5429fe(0x836)][_0x5429fe(0x485)](this),this[_0x5429fe(0x351)]();},Window_PictureCoordinates[_0x500928(0x358)][_0x500928(0x351)]=function(){const _0x36a368=_0x500928;if(!this['needsUpdate']())return;this[_0x36a368(0x642)]();},Window_PictureCoordinates['prototype'][_0x500928(0x3cc)]=function(){const _0x200eb4=_0x500928,_0x4d6de1=$gameTemp['_pictureCoordinatesMode'],_0x224b57=$gameScreen[_0x200eb4(0x503)](_0x4d6de1);return _0x224b57?this[_0x200eb4(0x1d3)]!==_0x224b57[_0x200eb4(0x297)]||this['_lastX']!==_0x224b57['_x']||this[_0x200eb4(0xeb)]!==_0x224b57['_y']:![];},Window_PictureCoordinates[_0x500928(0x358)][_0x500928(0x642)]=function(){const _0x409793=_0x500928;this[_0x409793(0x17d)][_0x409793(0x281)]();const _0x10d7c6=$gameTemp[_0x409793(0x66e)],_0x45dae4=$gameScreen[_0x409793(0x503)](_0x10d7c6);if(!_0x45dae4)return;this[_0x409793(0x1d3)]=_0x45dae4[_0x409793(0x297)],this[_0x409793(0x657)]=_0x45dae4['_x'],this[_0x409793(0xeb)]=_0x45dae4['_y'];const _0x2f4199=ColorManager['itemBackColor1']();this[_0x409793(0x17d)][_0x409793(0x74f)](0x0,0x0,this['innerWidth'],this[_0x409793(0x42e)],_0x2f4199);const _0xa5c45e='\x20Origin:\x20%1'[_0x409793(0xc1)](_0x45dae4[_0x409793(0x297)]===0x0?_0x409793(0x65b):_0x409793(0x324)),_0x1803df=_0x409793(0x217)[_0x409793(0xc1)](_0x45dae4['_x']),_0x2d66bb=_0x409793(0x466)['format'](_0x45dae4['_y']),_0xc20155=_0x409793(0xef)[_0x409793(0xc1)](TextManager[_0x409793(0x800)](_0x409793(0xd2)));let _0x35707a=Math['floor'](this[_0x409793(0x319)]/0x4);this[_0x409793(0x55e)](_0xa5c45e,_0x35707a*0x0,0x0,_0x35707a),this[_0x409793(0x55e)](_0x1803df,_0x35707a*0x1,0x0,_0x35707a,_0x409793(0x369)),this[_0x409793(0x55e)](_0x2d66bb,_0x35707a*0x2,0x0,_0x35707a,'center');const _0x350839=this[_0x409793(0x49d)](_0xc20155)['width'],_0x3947d5=this[_0x409793(0x319)]-_0x350839;this['drawTextEx'](_0xc20155,_0x3947d5,0x0,_0x350839);};function Window_TextPopup(){this['initialize'](...arguments);}Window_TextPopup[_0x500928(0x358)]=Object['create'](Window_Base[_0x500928(0x358)]),Window_TextPopup['prototype'][_0x500928(0x2f3)]=Window_TextPopup,Window_TextPopup[_0x500928(0x510)]={'framesPerChar':VisuMZ['CoreEngine'][_0x500928(0x17a)][_0x500928(0x2d9)][_0x500928(0x4fa)]??1.5,'framesMin':VisuMZ[_0x500928(0x858)][_0x500928(0x17a)][_0x500928(0x2d9)][_0x500928(0x512)]??0x5a,'framesMax':VisuMZ['CoreEngine']['Settings'][_0x500928(0x2d9)][_0x500928(0x25e)]??0x12c},Window_TextPopup[_0x500928(0x358)][_0x500928(0x32f)]=function(){const _0x3e69d0=_0x500928,_0x121a4f=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x3e69d0(0x358)]['initialize'][_0x3e69d0(0x485)](this,_0x121a4f),this['openness']=0x0,this[_0x3e69d0(0x6bd)]='',this[_0x3e69d0(0x239)]=[],this['_timeDuration']=0x0;},Window_TextPopup[_0x500928(0x358)][_0x500928(0x2d5)]=function(){return!![];},Window_TextPopup[_0x500928(0x358)][_0x500928(0x244)]=function(_0xc03799){const _0xfb43fd=_0x500928;if(this['_textQueue'][this[_0xfb43fd(0x239)][_0xfb43fd(0x12e)]-0x1]===_0xc03799)return;this[_0xfb43fd(0x239)][_0xfb43fd(0x719)](_0xc03799),SceneManager['_scene'][_0xfb43fd(0x86b)](this);},Window_TextPopup[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x38dfc5=_0x500928;Window_Base[_0x38dfc5(0x358)]['update']['call'](this),this[_0x38dfc5(0x344)](),this[_0x38dfc5(0x25d)]();},Window_TextPopup[_0x500928(0x358)][_0x500928(0x344)]=function(){const _0x1030d2=_0x500928;if(this['_text']!=='')return;if(this[_0x1030d2(0x239)][_0x1030d2(0x12e)]<=0x0)return;if(!this[_0x1030d2(0x889)]())return;this[_0x1030d2(0x6bd)]=this['_textQueue'][_0x1030d2(0x533)]();const _0x1e815e=Window_TextPopup[_0x1030d2(0x510)],_0x36a93a=Math[_0x1030d2(0x6fd)](this[_0x1030d2(0x6bd)][_0x1030d2(0x12e)]*_0x1e815e['framesPerChar']);this[_0x1030d2(0x6c1)]=_0x36a93a['clamp'](_0x1e815e[_0x1030d2(0x499)],_0x1e815e[_0x1030d2(0x832)]);const _0x4b0a27=this[_0x1030d2(0x49d)](this[_0x1030d2(0x6bd)]);let _0x27f019=_0x4b0a27['width']+this[_0x1030d2(0x566)]()*0x2;_0x27f019+=$gameSystem['windowPadding']()*0x2;let _0x2a7a2c=Math['max'](_0x4b0a27[_0x1030d2(0x3ff)],this[_0x1030d2(0x531)]());_0x2a7a2c+=$gameSystem['windowPadding']()*0x2;const _0x11aeca=Math[_0x1030d2(0x7a6)]((Graphics[_0x1030d2(0x7c8)]-_0x27f019)/0x2),_0x2fb461=Math['round']((Graphics[_0x1030d2(0x3ff)]-_0x2a7a2c)/0x2),_0x2d4b1f=new Rectangle(_0x11aeca,_0x2fb461,_0x27f019,_0x2a7a2c);this[_0x1030d2(0x252)](_0x2d4b1f['x'],_0x2d4b1f['y'],_0x2d4b1f['width'],_0x2d4b1f[_0x1030d2(0x3ff)]),this['createContents'](),this['refresh'](),this[_0x1030d2(0x202)](),SceneManager[_0x1030d2(0x307)][_0x1030d2(0x86b)](this);},Window_TextPopup[_0x500928(0x358)]['refresh']=function(){const _0x4e49d7=_0x500928,_0x5812ae=this[_0x4e49d7(0x1fe)]();this[_0x4e49d7(0x17d)]['clear'](),this['drawTextEx'](this[_0x4e49d7(0x6bd)],_0x5812ae['x'],_0x5812ae['y'],_0x5812ae['width']);},Window_TextPopup[_0x500928(0x358)][_0x500928(0x25d)]=function(){const _0x3b6c5f=_0x500928;if(this[_0x3b6c5f(0x3ae)]()||this[_0x3b6c5f(0x4f7)]())return;if(this[_0x3b6c5f(0x6c1)]<=0x0)return;this[_0x3b6c5f(0x6c1)]--,this['_timeDuration']<=0x0&&(this[_0x3b6c5f(0x28c)](),this[_0x3b6c5f(0x6bd)]='');},VisuMZ['ShowDevTools']=function(_0x5eeffd){const _0xa790cb=_0x500928;if(Utils[_0xa790cb(0x63f)]('test')){var _0x159824=require(_0xa790cb(0xf1))['Window'][_0xa790cb(0x6f8)]();SceneManager[_0xa790cb(0x75e)]();if(_0x5eeffd)setTimeout(_0x159824[_0xa790cb(0x776)][_0xa790cb(0x59d)](_0x159824),0x190);}},VisuMZ[_0x500928(0x4fe)]=function(_0x1122bf,_0x14d189){const _0x2e9786=_0x500928;_0x14d189=_0x14d189[_0x2e9786(0x491)]();var _0x5f5173=1.70158,_0x2876d9=0.7;switch(_0x14d189){case _0x2e9786(0x405):return _0x1122bf;case _0x2e9786(0x29e):return-0x1*Math[_0x2e9786(0x17c)](_0x1122bf*(Math['PI']/0x2))+0x1;case _0x2e9786(0x438):return Math['sin'](_0x1122bf*(Math['PI']/0x2));case _0x2e9786(0x43b):return-0.5*(Math[_0x2e9786(0x17c)](Math['PI']*_0x1122bf)-0x1);case _0x2e9786(0x314):return _0x1122bf*_0x1122bf;case _0x2e9786(0x6eb):return _0x1122bf*(0x2-_0x1122bf);case _0x2e9786(0x6f4):return _0x1122bf<0.5?0x2*_0x1122bf*_0x1122bf:-0x1+(0x4-0x2*_0x1122bf)*_0x1122bf;case'INCUBIC':return _0x1122bf*_0x1122bf*_0x1122bf;case _0x2e9786(0x81e):var _0x3bc02d=_0x1122bf-0x1;return _0x3bc02d*_0x3bc02d*_0x3bc02d+0x1;case'INOUTCUBIC':return _0x1122bf<0.5?0x4*_0x1122bf*_0x1122bf*_0x1122bf:(_0x1122bf-0x1)*(0x2*_0x1122bf-0x2)*(0x2*_0x1122bf-0x2)+0x1;case _0x2e9786(0x7f6):return _0x1122bf*_0x1122bf*_0x1122bf*_0x1122bf;case _0x2e9786(0x2fe):var _0x3bc02d=_0x1122bf-0x1;return 0x1-_0x3bc02d*_0x3bc02d*_0x3bc02d*_0x3bc02d;case _0x2e9786(0x337):var _0x3bc02d=_0x1122bf-0x1;return _0x1122bf<0.5?0x8*_0x1122bf*_0x1122bf*_0x1122bf*_0x1122bf:0x1-0x8*_0x3bc02d*_0x3bc02d*_0x3bc02d*_0x3bc02d;case _0x2e9786(0x7d9):return _0x1122bf*_0x1122bf*_0x1122bf*_0x1122bf*_0x1122bf;case'OUTQUINT':var _0x3bc02d=_0x1122bf-0x1;return 0x1+_0x3bc02d*_0x3bc02d*_0x3bc02d*_0x3bc02d*_0x3bc02d;case'INOUTQUINT':var _0x3bc02d=_0x1122bf-0x1;return _0x1122bf<0.5?0x10*_0x1122bf*_0x1122bf*_0x1122bf*_0x1122bf*_0x1122bf:0x1+0x10*_0x3bc02d*_0x3bc02d*_0x3bc02d*_0x3bc02d*_0x3bc02d;case'INEXPO':if(_0x1122bf===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x1122bf-0x1));case'OUTEXPO':if(_0x1122bf===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x1122bf)+0x1;case _0x2e9786(0x6d7):if(_0x1122bf===0x0||_0x1122bf===0x1)return _0x1122bf;var _0x152a3e=_0x1122bf*0x2,_0xfe9caf=_0x152a3e-0x1;if(_0x152a3e<0x1)return 0.5*Math['pow'](0x2,0xa*_0xfe9caf);return 0.5*(-Math[_0x2e9786(0x659)](0x2,-0xa*_0xfe9caf)+0x2);case _0x2e9786(0x3bc):var _0x152a3e=_0x1122bf/0x1;return-0x1*(Math[_0x2e9786(0x488)](0x1-_0x152a3e*_0x1122bf)-0x1);case _0x2e9786(0x672):var _0x3bc02d=_0x1122bf-0x1;return Math[_0x2e9786(0x488)](0x1-_0x3bc02d*_0x3bc02d);case _0x2e9786(0x866):var _0x152a3e=_0x1122bf*0x2,_0xfe9caf=_0x152a3e-0x2;if(_0x152a3e<0x1)return-0.5*(Math['sqrt'](0x1-_0x152a3e*_0x152a3e)-0x1);return 0.5*(Math[_0x2e9786(0x488)](0x1-_0xfe9caf*_0xfe9caf)+0x1);case _0x2e9786(0x5de):return _0x1122bf*_0x1122bf*((_0x5f5173+0x1)*_0x1122bf-_0x5f5173);case _0x2e9786(0x455):var _0x152a3e=_0x1122bf/0x1-0x1;return _0x152a3e*_0x152a3e*((_0x5f5173+0x1)*_0x152a3e+_0x5f5173)+0x1;break;case _0x2e9786(0x64e):var _0x152a3e=_0x1122bf*0x2,_0x41f948=_0x152a3e-0x2,_0x123b51=_0x5f5173*1.525;if(_0x152a3e<0x1)return 0.5*_0x152a3e*_0x152a3e*((_0x123b51+0x1)*_0x152a3e-_0x123b51);return 0.5*(_0x41f948*_0x41f948*((_0x123b51+0x1)*_0x41f948+_0x123b51)+0x2);case _0x2e9786(0x59b):if(_0x1122bf===0x0||_0x1122bf===0x1)return _0x1122bf;var _0x152a3e=_0x1122bf/0x1,_0xfe9caf=_0x152a3e-0x1,_0x2ec477=0x1-_0x2876d9,_0x123b51=_0x2ec477/(0x2*Math['PI'])*Math[_0x2e9786(0x221)](0x1);return-(Math[_0x2e9786(0x659)](0x2,0xa*_0xfe9caf)*Math['sin']((_0xfe9caf-_0x123b51)*(0x2*Math['PI'])/_0x2ec477));case _0x2e9786(0x303):var _0x2ec477=0x1-_0x2876d9,_0x152a3e=_0x1122bf*0x2;if(_0x1122bf===0x0||_0x1122bf===0x1)return _0x1122bf;var _0x123b51=_0x2ec477/(0x2*Math['PI'])*Math['asin'](0x1);return Math['pow'](0x2,-0xa*_0x152a3e)*Math['sin']((_0x152a3e-_0x123b51)*(0x2*Math['PI'])/_0x2ec477)+0x1;case'INOUTELASTIC':var _0x2ec477=0x1-_0x2876d9;if(_0x1122bf===0x0||_0x1122bf===0x1)return _0x1122bf;var _0x152a3e=_0x1122bf*0x2,_0xfe9caf=_0x152a3e-0x1,_0x123b51=_0x2ec477/(0x2*Math['PI'])*Math[_0x2e9786(0x221)](0x1);if(_0x152a3e<0x1)return-0.5*(Math['pow'](0x2,0xa*_0xfe9caf)*Math[_0x2e9786(0x791)]((_0xfe9caf-_0x123b51)*(0x2*Math['PI'])/_0x2ec477));return Math[_0x2e9786(0x659)](0x2,-0xa*_0xfe9caf)*Math[_0x2e9786(0x791)]((_0xfe9caf-_0x123b51)*(0x2*Math['PI'])/_0x2ec477)*0.5+0x1;case _0x2e9786(0x2f9):var _0x152a3e=_0x1122bf/0x1;if(_0x152a3e<0x1/2.75)return 7.5625*_0x152a3e*_0x152a3e;else{if(_0x152a3e<0x2/2.75){var _0x41f948=_0x152a3e-1.5/2.75;return 7.5625*_0x41f948*_0x41f948+0.75;}else{if(_0x152a3e<2.5/2.75){var _0x41f948=_0x152a3e-2.25/2.75;return 7.5625*_0x41f948*_0x41f948+0.9375;}else{var _0x41f948=_0x152a3e-2.625/2.75;return 7.5625*_0x41f948*_0x41f948+0.984375;}}}case _0x2e9786(0x1bb):var _0x9550c5=0x1-VisuMZ[_0x2e9786(0x4fe)](0x1-_0x1122bf,_0x2e9786(0x49c));return _0x9550c5;case _0x2e9786(0x873):if(_0x1122bf<0.5)var _0x9550c5=VisuMZ[_0x2e9786(0x4fe)](_0x1122bf*0x2,_0x2e9786(0x4ec))*0.5;else var _0x9550c5=VisuMZ[_0x2e9786(0x4fe)](_0x1122bf*0x2-0x1,_0x2e9786(0x49c))*0.5+0.5;return _0x9550c5;default:return _0x1122bf;}},VisuMZ[_0x500928(0x6b5)]=function(_0x325229){const _0x5d4c3c=_0x500928;_0x325229=String(_0x325229)[_0x5d4c3c(0x491)]();const _0x34699c=VisuMZ[_0x5d4c3c(0x858)][_0x5d4c3c(0x17a)][_0x5d4c3c(0xd3)];if(_0x325229===_0x5d4c3c(0x44d))return _0x34699c[_0x5d4c3c(0x862)];if(_0x325229==='MAXMP')return _0x34699c[_0x5d4c3c(0x493)];if(_0x325229==='ATK')return _0x34699c[_0x5d4c3c(0x20d)];if(_0x325229===_0x5d4c3c(0x129))return _0x34699c[_0x5d4c3c(0x6ff)];if(_0x325229===_0x5d4c3c(0x4ca))return _0x34699c[_0x5d4c3c(0x213)];if(_0x325229===_0x5d4c3c(0x5fd))return _0x34699c[_0x5d4c3c(0x500)];if(_0x325229===_0x5d4c3c(0x2cf))return _0x34699c[_0x5d4c3c(0x5a7)];if(_0x325229===_0x5d4c3c(0x6fc))return _0x34699c[_0x5d4c3c(0x12b)];if(_0x325229==='HIT')return _0x34699c[_0x5d4c3c(0x84e)];if(_0x325229===_0x5d4c3c(0x419))return _0x34699c['IconXParam1'];if(_0x325229===_0x5d4c3c(0x75a))return _0x34699c[_0x5d4c3c(0x824)];if(_0x325229===_0x5d4c3c(0x2ca))return _0x34699c[_0x5d4c3c(0x2c0)];if(_0x325229===_0x5d4c3c(0x64c))return _0x34699c[_0x5d4c3c(0x5e7)];if(_0x325229===_0x5d4c3c(0x10b))return _0x34699c['IconXParam5'];if(_0x325229===_0x5d4c3c(0x5d2))return _0x34699c[_0x5d4c3c(0x136)];if(_0x325229===_0x5d4c3c(0x81f))return _0x34699c[_0x5d4c3c(0x19e)];if(_0x325229===_0x5d4c3c(0x121))return _0x34699c[_0x5d4c3c(0x4b1)];if(_0x325229===_0x5d4c3c(0x484))return _0x34699c[_0x5d4c3c(0x43d)];if(_0x325229===_0x5d4c3c(0x7cf))return _0x34699c['IconSParam0'];if(_0x325229===_0x5d4c3c(0x3f2))return _0x34699c[_0x5d4c3c(0x691)];if(_0x325229==='REC')return _0x34699c[_0x5d4c3c(0x14d)];if(_0x325229===_0x5d4c3c(0x796))return _0x34699c[_0x5d4c3c(0x1de)];if(_0x325229===_0x5d4c3c(0x41e))return _0x34699c['IconSParam4'];if(_0x325229===_0x5d4c3c(0x402))return _0x34699c[_0x5d4c3c(0x47a)];if(_0x325229===_0x5d4c3c(0x83d))return _0x34699c[_0x5d4c3c(0x193)];if(_0x325229===_0x5d4c3c(0x4ef))return _0x34699c[_0x5d4c3c(0x25a)];if(_0x325229==='FDR')return _0x34699c[_0x5d4c3c(0x645)];if(_0x325229===_0x5d4c3c(0x518))return _0x34699c[_0x5d4c3c(0x7a7)];if(VisuMZ[_0x5d4c3c(0x858)][_0x5d4c3c(0x5b5)][_0x325229])return VisuMZ['CoreEngine']['CustomParamIcons'][_0x325229]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0xd2c606,_0x3662a6,_0x313df5){const _0x1b0c16=_0x500928;if(_0x313df5===undefined&&_0xd2c606%0x1===0x0)return _0xd2c606;if(_0x313df5!==undefined&&[_0x1b0c16(0x44d),'MAXMP',_0x1b0c16(0x732),'DEF',_0x1b0c16(0x4ca),_0x1b0c16(0x5fd),_0x1b0c16(0x2cf),_0x1b0c16(0x6fc)][_0x1b0c16(0x250)](String(_0x313df5)[_0x1b0c16(0x491)]()[_0x1b0c16(0x886)]()))return _0xd2c606;_0x3662a6=_0x3662a6||0x0;if(VisuMZ[_0x1b0c16(0x858)][_0x1b0c16(0xed)][_0x313df5])return VisuMZ['CoreEngine']['CustomParamType'][_0x313df5]===_0x1b0c16(0x7b7)?_0xd2c606:String((_0xd2c606*0x64)[_0x1b0c16(0x67a)](_0x3662a6))+'%';return String((_0xd2c606*0x64)[_0x1b0c16(0x67a)](_0x3662a6))+'%';},VisuMZ[_0x500928(0x261)]=function(_0x51e247){const _0x516a0a=_0x500928;_0x51e247=String(_0x51e247);if(!_0x51e247)return _0x51e247;if(typeof _0x51e247!==_0x516a0a(0x45a))return _0x51e247;const _0x522f54=VisuMZ[_0x516a0a(0x858)][_0x516a0a(0x17a)][_0x516a0a(0xe1)][_0x516a0a(0x149)]||_0x516a0a(0x128),_0x3f2816={'maximumFractionDigits':0x6};_0x51e247=_0x51e247[_0x516a0a(0x1b7)](/\[(.*?)\]/g,(_0x1184fa,_0x198c9d)=>{return VisuMZ['PreserveNumbers'](_0x198c9d,'[',']');}),_0x51e247=_0x51e247[_0x516a0a(0x1b7)](/<(.*?)>/g,(_0x4f545e,_0x1aba7f)=>{const _0x59e601=_0x516a0a;return VisuMZ[_0x59e601(0x4d0)](_0x1aba7f,'<','>');}),_0x51e247=_0x51e247[_0x516a0a(0x1b7)](/\{\{(.*?)\}\}/g,(_0x1f91d3,_0x2406c8)=>{return VisuMZ['PreserveNumbers'](_0x2406c8,'','');}),_0x51e247=_0x51e247[_0x516a0a(0x1b7)](/(\d+\.?\d*)/g,(_0x5078c7,_0x150ad1)=>{const _0x1aa5c2=_0x516a0a;let _0x475938=_0x150ad1;if(_0x475938[0x0]==='0')return _0x475938;if(_0x475938[_0x475938['length']-0x1]==='.')return Number(_0x475938)[_0x1aa5c2(0x7b6)](_0x522f54,_0x3f2816)+'.';else return _0x475938[_0x475938['length']-0x1]===','?Number(_0x475938)[_0x1aa5c2(0x7b6)](_0x522f54,_0x3f2816)+',':Number(_0x475938)[_0x1aa5c2(0x7b6)](_0x522f54,_0x3f2816);});let _0x4a76e7=0x3;while(_0x4a76e7--){_0x51e247=VisuMZ[_0x516a0a(0x7bd)](_0x51e247);}return _0x51e247;},VisuMZ['PreserveNumbers']=function(_0x39730b,_0x1fc6ff,_0x22781b){const _0x498c17=_0x500928;return _0x39730b=_0x39730b[_0x498c17(0x1b7)](/(\d)/gi,(_0x17246f,_0x2e5d39)=>_0x498c17(0x5fe)[_0x498c17(0xc1)](Number(_0x2e5d39))),_0x498c17(0x5e6)[_0x498c17(0xc1)](_0x39730b,_0x1fc6ff,_0x22781b);},VisuMZ['RevertPreserveNumbers']=function(_0x55d886){const _0x3e8242=_0x500928;return _0x55d886=_0x55d886[_0x3e8242(0x1b7)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x37cc1b,_0x28d058)=>Number(parseInt(_0x28d058))),_0x55d886;},VisuMZ['openURL']=function(_0x143739){const _0x9a78a8=_0x500928;SoundManager['playOk']();if(!Utils[_0x9a78a8(0x1f1)]()){const _0x235ff5=window[_0x9a78a8(0x202)](_0x143739,_0x9a78a8(0x44e));}else{const _0x4a640=process[_0x9a78a8(0x68d)]==_0x9a78a8(0x131)?'open':process[_0x9a78a8(0x68d)]==_0x9a78a8(0x495)?_0x9a78a8(0x227):'xdg-open';require('child_process')[_0x9a78a8(0x638)](_0x4a640+'\x20'+_0x143739);}},VisuMZ[_0x500928(0x414)]=function(_0xd8c204,_0xfb6919){const _0x1a2fa4=_0x500928;if(!_0xd8c204)return'';const _0x15f8df=_0xd8c204['baseId']||_0xd8c204['id'];let _0x4a9446='';return _0xd8c204[_0x1a2fa4(0x443)]!==undefined&&_0xd8c204[_0x1a2fa4(0x616)]!==undefined&&(_0x4a9446=_0x1a2fa4(0x2f8)[_0x1a2fa4(0xc1)](_0x15f8df,_0xfb6919)),_0xd8c204[_0x1a2fa4(0x3fd)]!==undefined&&_0xd8c204['learnings']!==undefined&&(_0x4a9446=_0x1a2fa4(0x453)['format'](_0x15f8df,_0xfb6919)),_0xd8c204[_0x1a2fa4(0x42c)]!==undefined&&_0xd8c204[_0x1a2fa4(0x189)]!==undefined&&(_0x4a9446=_0x1a2fa4(0x604)[_0x1a2fa4(0xc1)](_0x15f8df,_0xfb6919)),_0xd8c204[_0x1a2fa4(0x70a)]!==undefined&&_0xd8c204[_0x1a2fa4(0x32e)]!==undefined&&(_0x4a9446='Item-%1-%2'[_0x1a2fa4(0xc1)](_0x15f8df,_0xfb6919)),_0xd8c204['wtypeId']!==undefined&&_0xd8c204[_0x1a2fa4(0x106)]===0x1&&(_0x4a9446=_0x1a2fa4(0x4cd)[_0x1a2fa4(0xc1)](_0x15f8df,_0xfb6919)),_0xd8c204['atypeId']!==undefined&&_0xd8c204[_0x1a2fa4(0x106)]>0x1&&(_0x4a9446='Armor-%1-%2'['format'](_0x15f8df,_0xfb6919)),_0xd8c204[_0x1a2fa4(0x1c4)]!==undefined&&_0xd8c204['battlerHue']!==undefined&&(_0x4a9446='Enemy-%1-%2'['format'](_0x15f8df,_0xfb6919)),_0xd8c204[_0x1a2fa4(0x4bd)]!==undefined&&_0xd8c204[_0x1a2fa4(0x513)]!==undefined&&(_0x4a9446=_0x1a2fa4(0x644)[_0x1a2fa4(0xc1)](_0x15f8df,_0xfb6919)),_0x4a9446;},Game_Picture[_0x500928(0x358)][_0x500928(0x2d8)]=function(){const _0x998abb=_0x500928;return this[_0x998abb(0x335)];},VisuMZ['CoreEngine']['Game_Picture_initBasic']=Game_Picture[_0x500928(0x358)][_0x500928(0x652)],Game_Picture[_0x500928(0x358)]['initBasic']=function(){const _0x33c835=_0x500928;VisuMZ['CoreEngine'][_0x33c835(0x7e8)]['call'](this),this[_0x33c835(0x335)]={'x':0x0,'y':0x0},this[_0x33c835(0x6ef)]={'x':0x0,'y':0x0};},VisuMZ[_0x500928(0x858)][_0x500928(0x3a9)]=Game_Picture[_0x500928(0x358)]['updateMove'],Game_Picture['prototype'][_0x500928(0x6d4)]=function(){const _0x3d7d0c=_0x500928;this[_0x3d7d0c(0x446)]();const _0x49b69b=this[_0x3d7d0c(0x28f)];VisuMZ[_0x3d7d0c(0x858)][_0x3d7d0c(0x3a9)][_0x3d7d0c(0x485)](this),_0x49b69b>0x0&&this[_0x3d7d0c(0x28f)]<=0x0&&(this['_x']=this[_0x3d7d0c(0x403)],this['_y']=this['_targetY'],this[_0x3d7d0c(0x2a9)]=this[_0x3d7d0c(0x693)],this['_scaleY']=this[_0x3d7d0c(0x2e8)],this[_0x3d7d0c(0x2e5)]=this['_targetOpacity'],this[_0x3d7d0c(0x335)]&&(this[_0x3d7d0c(0x335)]['x']=this[_0x3d7d0c(0x6ef)]['x'],this[_0x3d7d0c(0x335)]['y']=this['_targetAnchor']['y']));},VisuMZ[_0x500928(0x858)][_0x500928(0x2ef)]=Game_Picture['prototype'][_0x500928(0x70f)],Game_Picture[_0x500928(0x358)][_0x500928(0x70f)]=function(_0x3cac1f,_0x403c06,_0x5bf3ab,_0x34900b,_0x404803,_0x109b26,_0x39d092,_0x4bbf5d){const _0x4cc4e2=_0x500928;VisuMZ[_0x4cc4e2(0x858)]['Game_Picture_show'][_0x4cc4e2(0x485)](this,_0x3cac1f,_0x403c06,_0x5bf3ab,_0x34900b,_0x404803,_0x109b26,_0x39d092,_0x4bbf5d),this[_0x4cc4e2(0x58f)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x403c06]||{'x':0x0,'y':0x0});},VisuMZ[_0x500928(0x858)]['Game_Picture_move']=Game_Picture['prototype'][_0x500928(0x252)],Game_Picture[_0x500928(0x358)]['move']=function(_0x4bebda,_0x129398,_0x4ff953,_0x313070,_0xeafcef,_0x52e20d,_0x20fbf4,_0x2d415f,_0x2d21cf){const _0x38b54d=_0x500928;VisuMZ[_0x38b54d(0x858)][_0x38b54d(0x143)][_0x38b54d(0x485)](this,_0x4bebda,_0x129398,_0x4ff953,_0x313070,_0xeafcef,_0x52e20d,_0x20fbf4,_0x2d415f,_0x2d21cf),this[_0x38b54d(0x1f9)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4bebda]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x500928(0x446)]=function(){const _0x3d3b6f=_0x500928;this[_0x3d3b6f(0x28f)]>0x0&&(this[_0x3d3b6f(0x335)]['x']=this[_0x3d3b6f(0x489)](this['_anchor']['x'],this[_0x3d3b6f(0x6ef)]['x']),this['_anchor']['y']=this[_0x3d3b6f(0x489)](this['_anchor']['y'],this[_0x3d3b6f(0x6ef)]['y']));},Game_Picture['prototype'][_0x500928(0x58f)]=function(_0x3d13eb){const _0x49ad68=_0x500928;this[_0x49ad68(0x335)]=_0x3d13eb,this['_targetAnchor']=JsonEx['makeDeepCopy'](this[_0x49ad68(0x335)]);},Game_Picture['prototype'][_0x500928(0x1f9)]=function(_0x3e0727){const _0x502e7e=_0x500928;this[_0x502e7e(0x6ef)]=_0x3e0727;},VisuMZ[_0x500928(0x858)]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x500928(0x358)][_0x500928(0x740)],Sprite_Picture[_0x500928(0x358)][_0x500928(0x740)]=function(){const _0x161375=_0x500928,_0x250f11=this['picture']();!_0x250f11[_0x161375(0x2d8)]()?VisuMZ['CoreEngine'][_0x161375(0x43a)]['call'](this):(this[_0x161375(0x2d8)]['x']=_0x250f11[_0x161375(0x2d8)]()['x'],this[_0x161375(0x2d8)]['y']=_0x250f11[_0x161375(0x2d8)]()['y']);},Game_Action[_0x500928(0x358)][_0x500928(0xbe)]=function(_0x39e941){const _0x1ff1d6=_0x500928;if(_0x39e941){const _0x392a28=_0x39e941[_0x1ff1d6(0x765)];if(_0x392a28===0x1&&this[_0x1ff1d6(0x712)]()[_0x1ff1d6(0x16b)]()!==0x1)this[_0x1ff1d6(0x231)]();else _0x392a28===0x2&&this[_0x1ff1d6(0x712)]()[_0x1ff1d6(0x216)]()!==0x2?this[_0x1ff1d6(0x33e)]():this[_0x1ff1d6(0x5c0)](_0x392a28);}else this['clear']();},Game_Actor[_0x500928(0x358)][_0x500928(0x2b6)]=function(){const _0x50eb35=_0x500928;return this['skills']()[_0x50eb35(0x729)](_0x464f8b=>this[_0x50eb35(0x7fa)](_0x464f8b)&&this[_0x50eb35(0x6ed)]()[_0x50eb35(0x250)](_0x464f8b[_0x50eb35(0x42c)]));},Window_Base['prototype'][_0x500928(0x3fc)]=function(){const _0x2cd5e8=_0x500928;this[_0x2cd5e8(0x37f)]=new Sprite(),this[_0x2cd5e8(0x37f)][_0x2cd5e8(0x7eb)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x2cd5e8(0xcc)](this[_0x2cd5e8(0x37f)]);},Window_Base[_0x500928(0x358)][_0x500928(0x72a)]=function(){const _0x41e033=_0x500928;if(this[_0x41e033(0x37f)]){const _0x35d7c8=this['_dimmerSprite'][_0x41e033(0x7eb)],_0x5eb490=this[_0x41e033(0x7c8)],_0x644bd4=this['height'],_0x41ab2d=this[_0x41e033(0x142)],_0x46c438=ColorManager[_0x41e033(0x370)](),_0x4f32ee=ColorManager[_0x41e033(0x1ab)]();_0x35d7c8[_0x41e033(0x523)](_0x5eb490,_0x644bd4),_0x35d7c8[_0x41e033(0x501)](0x0,0x0,_0x5eb490,_0x41ab2d,_0x4f32ee,_0x46c438,!![]),_0x35d7c8[_0x41e033(0x74f)](0x0,_0x41ab2d,_0x5eb490,_0x644bd4-_0x41ab2d*0x2,_0x46c438),_0x35d7c8[_0x41e033(0x501)](0x0,_0x644bd4-_0x41ab2d,_0x5eb490,_0x41ab2d,_0x46c438,_0x4f32ee,!![]),this['_dimmerSprite'][_0x41e033(0x76c)](0x0,0x0,_0x5eb490,_0x644bd4);}},Game_Actor[_0x500928(0x358)][_0x500928(0x478)]=function(){const _0x372df7=_0x500928;for(let _0x592fd5=0x0;_0x592fd5<this['numActions']();_0x592fd5++){const _0x384f82=this['makeActionList']();let _0x3801dd=Number[_0x372df7(0x7f2)];this['setAction'](_0x592fd5,_0x384f82[0x0]);for(const _0x3b6ad6 of _0x384f82){const _0xa3ca59=_0x3b6ad6['evaluate']();_0xa3ca59>_0x3801dd&&(_0x3801dd=_0xa3ca59,this[_0x372df7(0x1a2)](_0x592fd5,_0x3b6ad6));}}this[_0x372df7(0x38f)]('waiting');},Window_BattleItem['prototype'][_0x500928(0x6b9)]=function(_0x1b5c22){const _0x2f6688=_0x500928;return BattleManager[_0x2f6688(0x4b2)]()?BattleManager[_0x2f6688(0x4b2)]()[_0x2f6688(0x7fa)](_0x1b5c22):Window_ItemList['prototype'][_0x2f6688(0x6b9)][_0x2f6688(0x485)](this,_0x1b5c22);},VisuMZ[_0x500928(0x858)][_0x500928(0x19f)]=Scene_Map[_0x500928(0x358)]['createSpriteset'],Scene_Map[_0x500928(0x358)][_0x500928(0x85a)]=function(){const _0x446ab1=_0x500928;VisuMZ['CoreEngine'][_0x446ab1(0x19f)][_0x446ab1(0x485)](this);const _0x2dc5d0=this[_0x446ab1(0x871)][_0x446ab1(0x88b)];if(_0x2dc5d0)this[_0x446ab1(0x86b)](_0x2dc5d0);},VisuMZ['CoreEngine'][_0x500928(0x527)]=Scene_Battle[_0x500928(0x358)][_0x500928(0x85a)],Scene_Battle[_0x500928(0x358)][_0x500928(0x85a)]=function(){const _0x409751=_0x500928;VisuMZ[_0x409751(0x858)][_0x409751(0x527)][_0x409751(0x485)](this);const _0x4a7979=this[_0x409751(0x871)]['_timerSprite'];if(_0x4a7979)this['addChild'](_0x4a7979);},Sprite_Actor[_0x500928(0x358)][_0x500928(0x836)]=function(){const _0x4297b2=_0x500928;Sprite_Battler['prototype'][_0x4297b2(0x836)][_0x4297b2(0x485)](this),this[_0x4297b2(0x6c0)]();if(this[_0x4297b2(0x6e4)])this[_0x4297b2(0x1ac)]();else this['_battlerName']!==''&&(this[_0x4297b2(0x785)]='');},Window[_0x500928(0x358)][_0x500928(0x320)]=function(){const _0x46db8c=_0x500928,_0x10bf8b=this[_0x46db8c(0x59a)],_0x1d33b9=this[_0x46db8c(0x287)],_0x69ef24=0x18,_0x382737=_0x69ef24/0x2,_0x54fe04=0x60+_0x69ef24,_0x3c9755=0x0+_0x69ef24;this[_0x46db8c(0x6f5)][_0x46db8c(0x7eb)]=this[_0x46db8c(0x5e8)],this['_downArrowSprite'][_0x46db8c(0x2d8)]['x']=0.5,this['_downArrowSprite'][_0x46db8c(0x2d8)]['y']=0.5,this['_downArrowSprite'][_0x46db8c(0x76c)](_0x54fe04+_0x382737,_0x3c9755+_0x382737+_0x69ef24,_0x69ef24,_0x382737),this['_downArrowSprite'][_0x46db8c(0x252)](Math[_0x46db8c(0x7a6)](_0x10bf8b/0x2),Math[_0x46db8c(0x7a6)](_0x1d33b9-_0x382737)),this[_0x46db8c(0x6fb)]['bitmap']=this[_0x46db8c(0x5e8)],this[_0x46db8c(0x6fb)][_0x46db8c(0x2d8)]['x']=0.5,this[_0x46db8c(0x6fb)][_0x46db8c(0x2d8)]['y']=0.5,this[_0x46db8c(0x6fb)][_0x46db8c(0x76c)](_0x54fe04+_0x382737,_0x3c9755,_0x69ef24,_0x382737),this[_0x46db8c(0x6fb)][_0x46db8c(0x252)](Math[_0x46db8c(0x7a6)](_0x10bf8b/0x2),Math[_0x46db8c(0x7a6)](_0x382737));},Window['prototype'][_0x500928(0x55a)]=function(){const _0x5d34cb=_0x500928,_0x184131=0x90,_0xb2958=0x60,_0x49df9b=0x18;this['_pauseSignSprite'][_0x5d34cb(0x7eb)]=this['_windowskin'],this[_0x5d34cb(0x85b)]['anchor']['x']=0.5,this[_0x5d34cb(0x85b)][_0x5d34cb(0x2d8)]['y']=0x1,this[_0x5d34cb(0x85b)][_0x5d34cb(0x252)](Math['round'](this[_0x5d34cb(0x59a)]/0x2),this['_height']),this[_0x5d34cb(0x85b)][_0x5d34cb(0x76c)](_0x184131,_0xb2958,_0x49df9b,_0x49df9b),this['_pauseSignSprite'][_0x5d34cb(0x5ea)]=0xff;},Window['prototype'][_0x500928(0x2e6)]=function(){const _0xff9e94=_0x500928,_0x2798ad=this[_0xff9e94(0x3d2)]['worldTransform'][_0xff9e94(0x46d)](new Point(0x0,0x0)),_0x11c602=this[_0xff9e94(0x3d2)][_0xff9e94(0x781)];_0x11c602['x']=_0x2798ad['x']+this[_0xff9e94(0x834)]['x'],_0x11c602['y']=_0x2798ad['y']+this['origin']['y'],_0x11c602[_0xff9e94(0x7c8)]=Math[_0xff9e94(0x6fd)](this[_0xff9e94(0x319)]*this[_0xff9e94(0x376)]['x']),_0x11c602[_0xff9e94(0x3ff)]=Math[_0xff9e94(0x6fd)](this[_0xff9e94(0x42e)]*this[_0xff9e94(0x376)]['y']);},VisuMZ['CoreEngine'][_0x500928(0x7f5)]=Window[_0x500928(0x358)][_0x500928(0x590)],Window[_0x500928(0x358)][_0x500928(0x590)]=function(){const _0x1d94b5=_0x500928,_0x3d273d=VisuMZ[_0x1d94b5(0x858)]['Settings'][_0x1d94b5(0x2d9)][_0x1d94b5(0x83f)]??!![];if(!_0x3d273d)return VisuMZ[_0x1d94b5(0x858)]['Window_refreshBack'][_0x1d94b5(0x485)](this);const _0xc3f8df=this['_margin'],_0x59ab43=Math[_0x1d94b5(0x627)](0x0,this[_0x1d94b5(0x59a)]-_0xc3f8df*0x2),_0xd1f603=Math[_0x1d94b5(0x627)](0x0,this[_0x1d94b5(0x287)]-_0xc3f8df*0x2),_0x51bf5e=this['_backSprite'],_0x25402f=_0x51bf5e[_0x1d94b5(0x30e)][0x0];_0x51bf5e[_0x1d94b5(0x7eb)]=this[_0x1d94b5(0x5e8)],_0x51bf5e[_0x1d94b5(0x76c)](0x0,0x0,0x60,0x60),_0x51bf5e[_0x1d94b5(0x252)](_0xc3f8df,_0xc3f8df),_0x51bf5e[_0x1d94b5(0x376)]['x']=_0x59ab43/0x60,_0x51bf5e[_0x1d94b5(0x376)]['y']=_0xd1f603/0x60,_0x25402f[_0x1d94b5(0x7eb)]=this[_0x1d94b5(0x5e8)],_0x25402f['setFrame'](0x0,0x60,0x60,0x60),_0x25402f['move'](0x0,0x0,_0x59ab43,_0xd1f603),_0x25402f[_0x1d94b5(0x376)]['x']=0x1/_0x51bf5e[_0x1d94b5(0x376)]['x'],_0x25402f[_0x1d94b5(0x376)]['y']=0x1/_0x51bf5e[_0x1d94b5(0x376)]['y'],_0x51bf5e['setColorTone'](this[_0x1d94b5(0x7dd)]);},Game_Temp['prototype']['sceneTerminationClearEffects']=function(){const _0x56816a=_0x500928;this[_0x56816a(0x4e7)]=[],this[_0x56816a(0x65c)]=[],this[_0x56816a(0x293)]=[],this[_0x56816a(0x86d)]=[];},VisuMZ[_0x500928(0x858)][_0x500928(0x21e)]=Scene_Base['prototype'][_0x500928(0x7f9)],Scene_Base['prototype']['terminate']=function(){const _0x2142d3=_0x500928;if($gameTemp)$gameTemp[_0x2142d3(0x522)]();VisuMZ[_0x2142d3(0x858)]['Scene_Base_terminateAnimationClearBugFix'][_0x2142d3(0x485)](this);},Bitmap[_0x500928(0x358)][_0x500928(0x48f)]=function(_0x239642){const _0x412cfb=_0x500928,_0x316451=this[_0x412cfb(0x23f)];_0x316451[_0x412cfb(0x6c8)](),_0x316451['font']=this[_0x412cfb(0x3b9)]();const _0x14972d=_0x316451['measureText'](_0x239642)[_0x412cfb(0x7c8)];return _0x316451[_0x412cfb(0x730)](),_0x14972d;},Window_Message[_0x500928(0x358)][_0x500928(0x219)]=function(_0x25fe2c){const _0x5df5a2=_0x500928;return this[_0x5df5a2(0x4b5)]()?this['contents']['measureTextWidthNoRounding'](_0x25fe2c):Window_Base['prototype'][_0x5df5a2(0x219)][_0x5df5a2(0x485)](this,_0x25fe2c);},Window_Message['prototype'][_0x500928(0x4b5)]=function(){const _0x504870=_0x500928;return VisuMZ[_0x504870(0x858)][_0x504870(0x17a)][_0x504870(0xe1)]['FontWidthFix']??!![];},VisuMZ[_0x500928(0x858)][_0x500928(0x3dd)]=Game_Action[_0x500928(0x358)][_0x500928(0x7e2)],Game_Action[_0x500928(0x358)]['numRepeats']=function(){const _0x359d3c=_0x500928;return this['item']()?VisuMZ[_0x359d3c(0x858)][_0x359d3c(0x3dd)][_0x359d3c(0x485)](this):0x0;},VisuMZ[_0x500928(0x858)]['Game_Action_setAttack']=Game_Action[_0x500928(0x358)][_0x500928(0x231)],Game_Action[_0x500928(0x358)][_0x500928(0x231)]=function(){const _0xab3532=_0x500928;this[_0xab3532(0x712)]()&&this[_0xab3532(0x712)]()['canAttack']()?VisuMZ[_0xab3532(0x858)][_0xab3532(0x3c0)][_0xab3532(0x485)](this):this[_0xab3532(0x281)]();},Sprite_Name[_0x500928(0x358)]['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x500928(0x358)][_0x500928(0x3d4)]=function(){const _0x32f44b=_0x500928,_0x4a5534=this[_0x32f44b(0x725)](),_0x226944=this[_0x32f44b(0x306)](),_0x48eae8=this[_0x32f44b(0x27d)]();this['setupFont'](),this[_0x32f44b(0x7eb)][_0x32f44b(0x281)](),this[_0x32f44b(0x7eb)]['drawTextTopAligned'](_0x4a5534,0x4,0x0,_0x226944-0xa,_0x48eae8,_0x32f44b(0x1f3));},Bitmap[_0x500928(0x358)][_0x500928(0x3e3)]=function(_0xcaf49d,_0xb4be64,_0xdde14b,_0x333ca7,_0xddd36,_0x1fe60e){const _0x4d1c5e=_0x500928,_0x29dd2c=this[_0x4d1c5e(0x23f)],_0x29cfa3=_0x29dd2c[_0x4d1c5e(0x52f)];_0x333ca7=_0x333ca7||0xffffffff;let _0x53fe98=_0xb4be64,_0x3a7d96=Math[_0x4d1c5e(0x7a6)](_0xdde14b+0x18/0x2+this[_0x4d1c5e(0x1e7)]*0.35);_0x1fe60e===_0x4d1c5e(0x369)&&(_0x53fe98+=_0x333ca7/0x2),_0x1fe60e===_0x4d1c5e(0x73f)&&(_0x53fe98+=_0x333ca7),_0x29dd2c[_0x4d1c5e(0x6c8)](),_0x29dd2c[_0x4d1c5e(0x507)]=this[_0x4d1c5e(0x3b9)](),_0x29dd2c['textAlign']=_0x1fe60e,_0x29dd2c[_0x4d1c5e(0x794)]=_0x4d1c5e(0x494),_0x29dd2c[_0x4d1c5e(0x52f)]=0x1,this[_0x4d1c5e(0x10d)](_0xcaf49d,_0x53fe98,_0x3a7d96,_0x333ca7),_0x29dd2c[_0x4d1c5e(0x52f)]=_0x29cfa3,this[_0x4d1c5e(0x312)](_0xcaf49d,_0x53fe98,_0x3a7d96,_0x333ca7),_0x29dd2c['restore'](),this[_0x4d1c5e(0x1b5)][_0x4d1c5e(0x836)]();},VisuMZ[_0x500928(0x858)]['BattleManager_checkSubstitute']=BattleManager[_0x500928(0x1b8)],BattleManager[_0x500928(0x1b8)]=function(_0x7c7733){const _0x3f2c74=_0x500928;if(this[_0x3f2c74(0x435)][_0x3f2c74(0x55c)]())return![];return VisuMZ[_0x3f2c74(0x858)][_0x3f2c74(0xfc)]['call'](this,_0x7c7733);},BattleManager['endAction']=function(){const _0x424453=_0x500928;if(this['_subject'])this[_0x424453(0xc2)]['endAction'](this[_0x424453(0x5bb)]);this[_0x424453(0x40c)]=_0x424453(0x817),this[_0x424453(0x5bb)]&&this[_0x424453(0x5bb)][_0x424453(0x63d)]()===0x0&&(this[_0x424453(0x1bf)](this[_0x424453(0x5bb)]),this[_0x424453(0x5bb)]=null);},Bitmap[_0x500928(0x358)][_0x500928(0x311)]=function(){const _0x31c38b=_0x500928;this[_0x31c38b(0x259)]=new Image(),this[_0x31c38b(0x259)]['onload']=this[_0x31c38b(0x4f0)][_0x31c38b(0x59d)](this),this[_0x31c38b(0x259)][_0x31c38b(0x407)]=this[_0x31c38b(0x751)][_0x31c38b(0x59d)](this),this[_0x31c38b(0x3a3)](),this[_0x31c38b(0x421)]=_0x31c38b(0x5dc),Utils[_0x31c38b(0x218)]()?this['_startDecrypting']():(this[_0x31c38b(0x259)][_0x31c38b(0x237)]=this[_0x31c38b(0x4aa)],![]&&this[_0x31c38b(0x259)][_0x31c38b(0x7c8)]>0x0&&(this[_0x31c38b(0x259)][_0x31c38b(0x63a)]=null,this['_onLoad']()));},Scene_Skill[_0x500928(0x358)][_0x500928(0x249)]=function(){const _0x453961=_0x500928;Scene_MenuBase[_0x453961(0x358)][_0x453961(0x249)][_0x453961(0x485)](this),this[_0x453961(0x83a)](),this[_0x453961(0x534)]['deactivate'](),this[_0x453961(0x534)][_0x453961(0x362)](),this[_0x453961(0x278)][_0x453961(0x711)]();},Scene_Skill[_0x500928(0x358)][_0x500928(0x4c7)]=function(){const _0x413c75=_0x500928;return this[_0x413c75(0x278)]&&this[_0x413c75(0x278)][_0x413c75(0x65d)];},Game_Map[_0x500928(0x358)]['checkPassage']=function(_0xb2ed3c,_0x2ce3c2,_0x1b106c){const _0x309220=_0x500928,_0xeebc6d=this['tilesetFlags'](),_0x20de9a=this['allTiles'](_0xb2ed3c,_0x2ce3c2);for(const _0x2c9fd4 of _0x20de9a){const _0x5dff19=_0xeebc6d[_0x2c9fd4];if(_0x5dff19===undefined||_0x5dff19===null){if($gameTemp[_0x309220(0x290)]()&&!DataManager[_0x309220(0x583)]()){let _0x207759=_0x309220(0x3ef)+'\x0a';_0x207759+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x207759+=_0x309220(0x72e),this['showIncompleteTilesetError']()?(alert(_0x207759),SceneManager[_0x309220(0x6ea)]()):(console[_0x309220(0x415)](_0x207759),!$gameTemp['_showDevTools']&&($gameTemp[_0x309220(0x426)]=!![],SceneManager[_0x309220(0x75e)]()));}}if((_0x5dff19&0x10)!==0x0)continue;if((_0x5dff19&_0x1b106c)===0x0)return!![];if((_0x5dff19&_0x1b106c)===_0x1b106c)return![];}return![];},Game_Map[_0x500928(0x358)][_0x500928(0x739)]=function(){const _0x41a199=_0x500928;if(Imported[_0x41a199(0x653)])return!![];if(Imported[_0x41a199(0x1af)])return!![];return![];},Sprite_Animation[_0x500928(0x358)][_0x500928(0x2af)]=function(_0x3243ad){const _0xb6f7db=_0x500928;!this['_originalViewport']&&(this[_0xb6f7db(0x85e)]=_0x3243ad['gl']['getParameter'](_0x3243ad['gl'][_0xb6f7db(0xc0)]));},VisuMZ[_0x500928(0x858)][_0x500928(0xe2)]=Scene_Map[_0x500928(0x358)][_0x500928(0x5f9)],Scene_Map['prototype'][_0x500928(0x5f9)]=function(){const _0x3acba7=_0x500928,_0x3c2ff0=SceneManager[_0x3acba7(0x6b2)][_0x3acba7(0x725)];if([_0x3acba7(0x364),_0x3acba7(0x788),_0x3acba7(0x4d3),_0x3acba7(0x3ed)][_0x3acba7(0x250)](_0x3c2ff0))return![];return VisuMZ[_0x3acba7(0x858)][_0x3acba7(0xe2)][_0x3acba7(0x485)](this);};