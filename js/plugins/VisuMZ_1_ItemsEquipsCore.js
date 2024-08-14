//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.53;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.53] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 * 
 * <Conserve: x%>
 * 
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Item, Weapon, and Armor Notetags
 * - Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *   option (only when selling).
 * - Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 *   - Default priority level is '50'.
 * - Items, weapons, and armors with higher priority values will be sorted
 *   higher up on the list while lower values will be lower on the list.
 * 
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 * 
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 * 
 * ---
 * 
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 * 
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'. 
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 * 
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 * 
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 * 
 *   Example A:
 * 
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 * 
 *     - Requires the user to be at least level 20 in order to equip.
 * 
 *   Example B:
 * 
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
 * 
 * ---
 * 
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 * 
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
 * 
 * ---
 * 
 * <Cursed>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 * 
 * ---
 * 
 * <Purify Transform: id>
 * <Purify Transform: name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 * 
 * '''WARNING!''' If you are trying to calculate a value based off a full
 * parameter value, such as "ATK = user.atk * 0.10", it's going to break and
 * will cause an infinite loop. Use base parameter values instead.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 * 
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 * 
 * ---
 * 
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 * 
 * ---
 * 
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 * 
 * ---
 * 
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
 * 
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Purify Plugin Commands ===
 * 
 * ---
 * 
 * Purify: Target Actor(s)
 * - Purifies target actor(s) of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 * ---
 * 
 * Purify: Whole Party
 * - Purifies whole party of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 * 
 *     Sort By:
 *     - Sort this category (in Scene_Item and Scene_Shop only) this way.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.53: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added warning to <JS Parameters>:
 * *** If you are trying to calculate a value based off a full parameter value,
 *     such as "ATK = user.atk * 0.10", it's going to break and will cause an
 *     infinite loop. Use base parameter values instead.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *      option (only when selling).
 * **** Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 * **** Default priority level is '50'.
 * **** Items, weapons, and armors with higher priority values will be sorted
 *      higher up on the list while lower values will be lower on the list.
 * 
 * Version 1.52: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Item Categories > Category List > Category > Sorted By:
 * **** You can now sort specific item categories by ID or Name.
 * **** Only usable within Scene_Item and Scene_Shop.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.51: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an item is unequipped, it may cause a crash. Fix
 *    made by Arisu.
 * ** Fixed a bug where <Proxy: id> did not properly give the proxy item. Fix
 *    made by Arisu.
 * 
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
 * 
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
 * 
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 * 
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 * 
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 * 
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 * 
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
 * 
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shop
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","EquipDelayMS:num":"240","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 * @param SortBy:str
 * @text Sorted By
 * @type select
 * @option ID
 * @option Name
 * @desc Sort this category (in Scene_Item and Scene_Shop only) this way.
 * @default ID
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 * @text Data Settings
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x1d2fe5=_0x5dac;(function(_0xf67435,_0x1948fa){const _0x66ae36=_0x5dac,_0x5f3c39=_0xf67435();while(!![]){try{const _0x52da53=parseInt(_0x66ae36(0x4d9))/0x1*(parseInt(_0x66ae36(0x50c))/0x2)+parseInt(_0x66ae36(0x49b))/0x3*(-parseInt(_0x66ae36(0x2ea))/0x4)+parseInt(_0x66ae36(0x34a))/0x5*(-parseInt(_0x66ae36(0x4a7))/0x6)+parseInt(_0x66ae36(0x5a8))/0x7+parseInt(_0x66ae36(0x2b2))/0x8+parseInt(_0x66ae36(0x33a))/0x9+-parseInt(_0x66ae36(0x5a7))/0xa;if(_0x52da53===_0x1948fa)break;else _0x5f3c39['push'](_0x5f3c39['shift']());}catch(_0x2ea081){_0x5f3c39['push'](_0x5f3c39['shift']());}}}(_0x38aa,0x69341));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1d2fe5(0x21a)](function(_0x2e6bbb){const _0x2982f9=_0x1d2fe5;return _0x2e6bbb[_0x2982f9(0x41a)]&&_0x2e6bbb[_0x2982f9(0x286)][_0x2982f9(0x382)]('['+label+']');})[0x0];function _0x5dac(_0x3f3a5d,_0x16c63a){const _0x38aaee=_0x38aa();return _0x5dac=function(_0x5dac79,_0x124bbf){_0x5dac79=_0x5dac79-0x1c2;let _0x2bf6ab=_0x38aaee[_0x5dac79];return _0x2bf6ab;},_0x5dac(_0x3f3a5d,_0x16c63a);}function _0x38aa(){const _0x52e6a1=['\x5cI[%1]','Scene_Shop_sellWindowRect','canEquip','weapon-%1','Window_ItemList_drawItem','hasItem','itypeId','drawItemConsumable','Scene_Shop_create','setTopRow','move','contentsBack','createSellWindow','CmdIconClear','isEquipCommandAdded','changeEquipById','revertGlobalNamespaceVariables','troopArtifacts','canSortListItemScene','Speed0','ParamChangeFontSize','hide','_sellWindow','buttonAssistText2','def','hideNewLabelSprites','parse','refreshCursor','CmdTextAlign','equip2','itemAt','Scope%1','buttonAssistCategory','down','removeDebuff','nonRemovableEtypes','some','max','Game_Actor_changeEquip','addState','value','VisuMZ_1_SkillsStatesCore','isRightInputMode','troopArtifactIDs','getItemEffectsAddedStatesBuffsText','Scene_Equip_helpWindowRect','isProxyItem','getItemQuantityText','processShiftRemoveShortcut','Consumable','mainAreaHeight','Window_ItemList_colSpacing','background','LabelDamageTP','update','drawItemEffectsTpDamage','paramJS','object','innerWidth','commandNameWindowDrawText','active','setNewItem','LabelConsume','paramchangeTextColor','getItemDamageAmountLabelBattleCore','processCursorSpecialCheckModernControls','map','setHp','hideDisabledCommands','goldWindowRectItemsEquipsCore','constructor','isOpen','ShopScene','meetsShopListingConditions','drawItemQuantity','uiMenuStyle','isEquipped','paramValueByName','_category','opacity','getEtypeIDsCache','drawUpdatedBeforeParamValue','NonOptimizeETypes','ItemMenuStatusRect','trim','hitType','isEquipChangeOk','rateHP','categoryList','EFFECT_RECOVER_MP','4261300xAkVyn','1045702FTynTw','ExtDisplayedParams','dataId','onTouchOk','elementId','foreground','EquipDelayMS','changePaintOpacity','drawItemDamageElement','AllItems','Scene_Shop_commandBuy','shouldCommandWindowExist','Scene_Shop_prepare','addSellCommand','paramBase','createCommandWindow','splice','NoChangeMarker','traitObjects','VisuMZ_0_CoreEngine','Scene_Equip_onSlotOk','Game_Party_numItems','USER\x20TP\x20GAIN','Scene_Boot_onDatabaseLoaded','right','drawItemStyleIconText','slotWindowRectItemsEquipsCore','commandName','HP\x20DAMAGE','visible','isHovered','damageColor','cursorPageup','Icon','DrawPortraitJS','occasion','Scene_Equip_slotWindowRect','MP\x20DAMAGE','index','Game_Party_initialize','buyWindowRectItemsEquipsCore','ceil','initNewItemsList','Scene_Equip_create','getItemEffectsTpRecoveryText','number','LabelApply','test','buffIconIndex','KeyItems','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','onSlotOkAutoSelect','getPurifyTransformation','Scene_Shop_activateSellWindow','isRepeated','Step1End','Speed1','LabelSpeed','Window_ShopCommand_initialize','setTempActor','activate','postCreateSlotWindowItemsEquipsCore','FUNC','tradeItemWithParty','RemoveEquipIcon','createStatusWindow','every','Scene_Shop','Game_Actor_discardEquip','weapon','updateHelp','setObject','ShopListingRegExp','Whitelist','_customItemInfo','sell','_allowArtifactTraitObjects','drawItemSpeed','QoL','mainAreaBottom','drawItemOccasion','isPageChangeRequested','armors','onTouchCancel','isKeyItem','ParseArmorNotetags','isMainMenuCoreMenuImageOptionAvailable','doBuy','proxyItem','LabelHitType','uiInputPosition','getItemsEquipsCoreBackColor2','SortByIDandPriority','equipAdjustHpMp','_getClassRequirements','Speed1000','CoreEngine','convertInitEquipsToItems','loadFaceImages','getInputButtonString','pagedown','Parse_Notetags_EnableJS','sortPriority','CmdIconBuy','_shopTrackingData','PurchaseOnly','createSlotWindow','ARRAYJSON','getEtypeIdWithName','isArmor','drawItemHitType','_armorIDs','drawItemNumber','updatedLayoutStyle','process_VisuMZ_ItemsEquipsCore_RegExp','level','ConvertParams','sellPriceOfItem','Window_ShopStatus_setItem','artifacts','_cache_etypeIDs','isCommandEnabled','MenuPortraits','hitIndex','ActorResetEquipSlots','activateItemWindow','getItemSpeedText','Damage\x20Formula\x20Error\x20for\x20%1','playCursorSound','removeStateBuffChanges','Scene_Item_createCategoryWindow','width','statusWindowRectItemsEquipsCore','isTriggered','drawPossession','Game_Actor_tradeItemWithParty','makeItemList','scrollTo','drawNewLabelIcon','Scene_Shop_onCategoryCancel','drawItemCustomEntries','BorderRegExp','removeBattleTestArtifacts','filter','setItem','MaxItems','flatHP','Slots','Window_ItemList_item','cursorDown','drawItemEquipType','getItemEffects','getItemEffectsHpRecoveryText','StatusWindowWidth','Scene_Shop_onSellOk','canShiftRemoveEquipment','onSellItem','_resetFontColor','isArtifact','actorId','alterSkillName','Scene_Equip_createSlotWindow','Scene_Item_create','SellPriceRate','getItemIdWithName','meetsItemConditionsNotetags','isEnabled','ScopeRandomAny','helpWindowRectItemsEquipsCore','EFFECT_ADD_DEBUFF','windowPadding','buyingPrice','Window_Selectable_setHelpWindowItem','itemHasEquipLimit','Game_Party_consumeItem','updateCategoryNameWindow','armorTypes','Scene_Equip_commandWindowRect','addShopTrackingGoldBuy','_bypassProxy','addInnerChild','LabelDamageMP','EquipParams','setShopStatusWindowMode','meetsEquipRequirements','doSell','getItemEffectsRemovedStatesBuffsLabel','_itemWindow','NeverUsable','FontColor','currentSymbol','prepareNextScene','MaxHP','pageup','addChild','?????','value1','loadSystem','paintOpacity','processCursorHomeEndTrigger','removeBuff','postCreateItemsEquipsCore','ARRAYEVAL','Scene_Shop_sellingPrice','colSpacing','CursedTextPopup','\x5cI[%1]%2','BackRectColor','BuyPriceJS','create','drawItemEffectsTpRecovery','Window_EquipStatus_refresh','params','addCancelCommand','getItemEffectsTpRecoveryLabel','checkItemConditionsSwitchNotetags','isBuyCommandEnabled','equipSlotIndex','_shopStatusMenuMode','adjustItemWidthByStatus','Speed2000','mmp','makeCommandList','match','meetsClassRequirements','Scene_ItemBase_activateItemWindow','_resetFontSize','FieldUsable','createCommandNameWindow','drawParamsItemsEquipsCore','FadeSpeed','getClassRequirements','icon','commandSell','_cache','buttonAssistKey3','middle','isPlaytest','canEquipArmor','Occasion%1','SwitchBuy','ADDED\x20EFFECTS','Window_ItemList_updateHelp','isNewItem','toUpperCase','setCategory','buttonAssistKey2','numItems','getItemEffectsMpDamageLabel','Scene_Shop_createSellWindow','_scene','description','numberWindowRect','clearCmdDesc','ParamValueFontSize','weaponTypes','isTroopArtifact','placeItemNewLabel','Scene_Shop_goldWindowRect','_dummyWindow','_tempActor','isOptimizeCommandAdded','×%1','Scene_Load_reloadMapIfUpdated','commandStyleCheck','isShiftRemoveShortcutEnabled','Scene_Shop_statusWindowRect','_classIDs','blt','CommandAddOptimize','NotConsumable','isGoodShown','itemDataFontSize','getItemDamageAmountText','LabelRecoverTP','isDrawItemNumber','Window_EquipItem_isEnabled','QUANTITY','setItemWindow','members','meetsEquipRequirement','setValue','REMOVED\x20EFFECTS','defaultItemMax','OCCASION','canUse','itemWindowRectItemsEquipsCore','Scene_Shop_commandWindowRect','onSellOkItemsEquipsCore','_buyWindowLastIndex','getItemsEquipsCoreBackColor1','ConvertNumberToString','BuyTurnSwitchOn','drawItemEffectsAddedStatesBuffs','drawItemActorMenuImage','5982184SwRVJC','EFFECT_RECOVER_HP','Game_Actor_paramPlus','helpDesc','100%','iconText','ITEMS_EQUIPS_CORE','equipCmdDesc','version','releaseUnequippableItems','KeyItemProtect','Parse_Notetags_Batch','helpWindowRect','drawItemEffectsMpRecovery','getItemDamageAmountTextBattleCore','categoryWindowRectItemsEquipsCore','Translucent','getWeaponIdWithName','isSellCommandEnabled','_itemData','SwitchSell','isOptimizeCommandEnabled','sort','ActorChangeEquipSlots','values','calcEquipItemPerformance','contents','drawActorParamDifference','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','sellWindowRectItemsEquipsCore','baseSellingPrice','ShowShopStatus','atypeId','length','addShopTrackingItemBuy','ShopMenuStatusStandard','drawItemScope','MultiplierStandard','isUseItemsEquipsCoreUpdatedLayout','Scene_Shop_onBuyCancel','getItemSpeedLabel','needsNewTempActor','categoryItemTypes','HIT\x20TYPE','getEquipRequirements','_money','setHelpWindowItem','Parse_Notetags_EquipSlots','setItemDelay','createItemWindow','commandWindowRect','Window_Selectable_initialize','random','isSceneShop','consumable','addShopTrackingItem','9504CqBrWp','postCreateItemWindowModernControls','bind','geUpdatedLayoutStatusWidth','drawParamText','wtypeId','_itemIDs','onSellOk','StatusWindow','sellPriceRate','getItemRepeatsText','isEquipItem','buttonAssistKey1','Parse_Notetags_Category','addLoadListener','_categoryNameWindow','categoryNameWindowDrawBackground','_newItemsList','isUseModernControls','equip','user','LabelRecoverHP','ARRAYSTR','setStatusWindow','smoothSelect','updateCommandNameWindow','prepare','RegularItems','helpAreaTop','_skillIDs','removeState','Scene_Equip_itemWindowRect','onBuyOk','_calculatingJSParameters','resetFontSettings','allMembers','ATK','drawItem','nonOptimizeEtypes','currentClass','EFFECT_ADD_STATE','LabelSuccessRate','addBuyCommand','paramValueFontSize','getItemEffectsHpDamageLabel','popScene','meetsItemConditionsJS','addItemCategory','smallParamFontSize','equipSlots','drawIcon','getArmorIdWithName','buyWindowRect','drawEquipData','goldWindowRect','helpDescriptionText','Window_ItemCategory_setItemWindow','_checkEquipRequirements','isEquipTypeSealed','ARRAYNUM','canConsumeItem','optimizeEquipments','itemEnableJS','getItemEffectsRemovedStatesBuffsText','gainTP','drawItemEffectsMpDamage','getItemOccasionText','getEmptyEquipSlotOfSameEtype','refreshDelay','process_VisuMZ_ItemsEquipsCore_Notetags','SwitchID','floor','DamageType%1','ParseItemNotetags','push','getInputMultiButtonStrings','_numberWindow','HiddenItemB','indexOf','mainFontSize','3281058FEzdKu','sellWindowRect','damage','#%1','itemTextAlign','getItemEffectsHpRecoveryLabel','drawTextEx','AllWeapons','purifyCursedEquips','W%1','Enable','getItemHitTypeLabel','getItemEffectsTpDamageText','_goods','LUK','optKeyItemsNumber','815710snJDSy','getMenuImage','ParseAllNotetags','getItemEffectsMpRecoveryText','armor-%1','getItemRepeatsLabel','Scene_Shop_doSell','drawRemoveItem','_newLabelOpacityChange','getItemSuccessRateText','Scene_Item_createItemWindow','drawItemDamage','prepareNewEquipSlotsOnLoad','meetsItemConditions','New','processShopCondListingOnSellItem','DrawIcons','hpRate','reloadMapIfUpdated','Actors','Parse_Notetags_ParamJS','commandStyle','Step2Start','Scene_Equip_onSlotCancel','_tempActorA','TextAlign','SetupProxyItemGroup','isOpenAndActive','Scene_Shop_commandSell','onActorChange','onCategoryOk','RemoveEquipText','clamp','limitedPageUpDownSceneCheck','playOkSound','ShowAllSwitches','isItem','name','successRate','versionId','uiHelpPosition','drawActorCharacter','modifiedBuyPriceItemsEquipsCore','SetupArtifactItemIDs','initialize','drawItemCost','checkShiftRemoveShortcut','buttonAssistLargeIncrement','powerUpColor','_categoryWindow','Scene_Shop_helpWindowRect','ScopeRandomAllies','DrawParamJS','CmdIconCancel','fill','top','includes','rateMP','statusWindowRect','EquipScene','isClearCommandEnabled','Scope7','Scene_Shop_buyingPrice','gainItem','getItemDamageAmountLabel','iconIndex','_item','isShowNew','isOptimizeEquipOk','concat','buttonAssistSlotWindowShift','drawCustomShopGraphic','_doubleTouch','left','Scene_Shop_buyWindowRect','drawUpdatedParamName','onTouchSelectModern','start','Window_EquipItem_includes','newLabelEnabled','ListWindowCols','shift','Type','equipTypes','battleMembers','ItemsEquipsCore','updateMoneyAmount','SUCCESS\x20RATE','_data','refreshItemsEquipsCoreNoMenuImage','clearNewItem','slotWindowRect','currencyUnit','ElementWeapon','Scene_Shop_numberWindowRect','getItemEffectsHpDamageText','MP\x20RECOVERY','(%1)','items','playBuzzerSound','textColor','SpeedNeg1999','setupItemDamageTempActors','addShopTrackingGoldSell','getShopTrackingItem','drawCurrencyValue','flatMP','getProxyItem','prepareItemCustomData','Game_Actor_forceChangeEquip','setHelpWindow','forceChangeEquipSlots','anyEmptyEquipSlotsOfSameEtype','isClicked','fontSizeRatio','FontSize','ItemQuantityFontSize','buy','processCursorMoveModernControls','getDamageStyle','auto','fillRect','isStackableArtifact','_etypeIDs','HP\x20RECOVERY','isEquipAtypeOk','callUpdateHelp','_shopStatusMenuAlly','determineBaseSellingPrice','NUM','log','hideAdditionalSprites','systemColor','hasOwnProperty','sellingPrice','commandNameWindowDrawBackground','actorParams','allowShiftScrolling','SortBy','_forcedSlots','currentExt','_goodsCount','setHandler','_equips','goodsToItem','pop','prototype','Scope1','isSoleWeaponType','Game_Party_gainItem_artifact','Scene_Shop_categoryWindowRect','addEquipCommand','calcWindowHeight','categoryStyleCheck','Window_Selectable_update','_slotWindow','getEtypeIDs','MANUAL','equips','split','possession','refreshActorEquipSlotsIfUpdated','paramPlus','optimize','getClassIdWithName','createBitmap','playEquip','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','atk','getItemEffectsAddedStatesBuffsLabel','clear','Game_Actor_equips_artifacts','Window_ShopBuy_price','speed','note','isHandled','SCOPE','remove','getColor','MaxWeapons','gold','Scene_Item','LabelRepeats','addClearCommand','drawParamName','Step3End','_list','isPartyArtifact','item-%1','Width','lineHeight','drawItemEffects','_bypassNewLabel','getItemColor','onDatabaseLoaded','DAMAGE\x20MULTIPLIER','nextActor','drawItemEffectsHpRecovery','SetupProxyItemGroups','changeBuff','deactivate','addStateBuffChanges','allowCommandWindowCursorUp','isWeapon','categoryNameWindowDrawText','_scrollDuration','_actor','===','status','paramId','getSkillIdWithName','WEAPON','Scene_Equip_createCommandWindow','mainFontFace','processTouchModernControls','isBottomHelpMode','itemLineRect','getItemSuccessRateLabel','DrawFaceJS','Scene_Item_itemWindowRect','maxmp','CommandAddClear','SellPriceJS','updateNewLabelOpacity','Game_BattlerBase_param','VisuMZ_1_MainMenuCore','isBattleTest','_commandNameWindow','Window_ItemCategory_initialize','Scene_Shop_doBuy','Window_ShopBuy_goodsToItem','formula','_allowArtifactParamBase','Window_Selectable_refresh','onBuyItem','DrawEquipData','iconHeight','processDrawIcon','resetShopSwitches','getItemConsumableText','onSellCancel','categoryWindowRect','clearEquipments','HiddenItemA','equipItems','EquipAdjustHpMp','itemWindowRect','ParseWeaponNotetags','previousActor','textWidth','Remove\x20all\x20available\x20equipment.','Window_ShopSell_isEnabled','getItemEffectsMpDamageText','EQUIP_DELAY_MS','TP\x20RECOVERY','refresh','Scene_Equip_onActorChange','%1%','Blacklist','maxItemAmount','getItemDamageAmountTextOriginal','format','postCreateSellWindowItemsEquipsCore','setMp','buttonAssistText3','commandBuyItemsEquipsCore','getPrototypeOf','_slotId','makeItemData','categoryStyle','drawCustomShopGraphicLoad','sortListItemScene','ScopeEnemyOrAlly','HideAllSwitches','registerCommand','LayoutStyle','+%1%','AllArmors','maxBattleMembers','onMenuImageLoad','statusWidth','getNextAvailableEtypeId','_weaponIDs','tpGain','adjustHiddenShownGoods','addCommand','MaxArmors','createNewLabelSprite','Categories','_getEquipRequirements','isPressed','isCancelled','_buyWindow','commandWindowRectItemsEquipsCore','fontSize','deselect','PurifyParty','etypeId','Game_Actor_artifact','REPEAT','value2','RegExp','Settings','drawItemStyleIcon','drawItemKeyData','buttonAssistItemListRequirement','drawItemDarkRect','getItemEffectsTpDamageLabel','buttonAssistSmallIncrement','SPEED','fontFace','_newLabelOpacityUpperLimit','drawUpdatedAfterParamValue','ItemMenuStatusBgType','getItemDamageElementText','_newLabelOpacity','processHandling','getMatchingInitEquip','onTouchSelect','Game_Actor_isEquipChangeOk','getItemConsumableLabel','Step2End','exit','_paramPlus','LabelDamageHP','Window_ItemList_maxCols','getItemEffectsSelfTpGainLabel','prepareRefreshItemsEquipsCoreLayout','process_VisuMZ_ItemsEquipsCore_EquipSlots','allowCreateStatusWindow','isUseParamNamesWithIcons','EFFECT_REMOVE_DEBUFF','createTempActorEquips','keyItem','ParseClassNotetags','isHoverEnabled','commandEquip','210jFbzdY','isPurifyItemSwapOk','drawUpdatedParamValueDiff','center','getShopTrackingItemSell','categoryNameWindowCenter','min','drawNewLabelText','setText','select','postCreateCategoryWindowItemsEquipsCore','Scene_Item_categoryWindowRect','18ZpBTsO','round','AlwaysUsable','onSlotCancel','clearNewLabelFromItem','LabelRecoverMP','Game_Party_gainItem','ScopeAllyOrEnemy','maxCols','CONSUMABLE','category','getItemHitTypeText','createCategoryNameWindow','drawItemCustomEntryLine','powerDownColor','replace','drawItemSuccessRate','DEF','Scene_Shop_createCategoryWindow','loadPicture','Param','Parse_Notetags_ParamValues','Game_Item_setObject','drawItemEffectsHpDamage','drawItemData','CmdStyle','getShopTrackingData','HideAnySwitches','bitmap','mat','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','commandBuy','A%1','commandSellItemsEquipsCore','updateChangedSlots','getShopTrackingGoldBuy','_statusWindow','cursorRight','isClearCommandAdded','isLearnedSkill','ShiftShortcutKey','Pick\x20and\x20choose\x20equipment\x20to\x20change.','drawText','toLowerCase','price','buttonAssistText1','getItemScopeText','deepCopy','drawItemDamageAmount','SellTurnSwitchOff','23vEmUnS','commandNameWindowCenter','CheckCursedItemMsg','CmdIconOptimize','cursorPagedown','JSON','Scene_Equip_statusWindowRect','Scene_Shop_onBuyOk','makeDeepCopy','changeTextColor','onBuyCancelItemsEquipsCore','changeEquip','call','drawing','processShopCondListingOnBuyItem','IconSet','Scene_Battle','Game_Enemy_traitObjects_artifact','Game_BattlerBase_canEquip_artifact','drawItemEffectsSelfTpGain','refreshActor','MDF','_helpWindow','item','_handlers','EnableLayout','repeats','onCategoryCancelItemsEquipsCore','maxItems','_bypassReleaseUnequippableItemsItemsEquipsCore','show','mdf','ItemQuantityFmt','Window_ShopBuy_item','discardEquip','getItemEffectsSelfTpGainText','isSoleArmorType','textSizeEx','actor','ARMOR','isClearEquipOk','addOptimizeCommand','ItemScene','inBattle','onTouchSelectModernControls','Game_Party_setupBattleTestItems_artifact','armor','Game_BattlerBase_meetsItemConditions','artifactIDs','onBuyCancel','IncludeShopItem','21832pHRkha','Scene_Item_helpWindowRect','_newLabelSprites','LabelElement','setupBattleTestItems','addItemCategories','createCategoryWindow','iconWidth','isDualWield','changeEquipBase','Parse_Notetags_Prices','onSlotOk','boxWidth','VisuMZ_2_WeaponSwapSystem','+%1','EFFECT_REMOVE_BUFF','addShopTrackingItemSell','placeNewLabel','drawItemName','TP\x20DAMAGE','getTextColor','processDownCursorSpecialCheckModernControls','selfTP','itemPadding','paramPlusItemsEquipsCoreCustomJS','type','isCursedItem','drawItemEffectsRemovedStatesBuffs','_tempActorB','param','cursorLeft','Parse_Notetags_Sorting','Game_BattlerBase_param_artifact','Step1Start','innerHeight','CannotEquipMarker','partyArtifactIDs','isCursorMovable','cancel','luk','ScopeAlliesButUser','setBackgroundType','mainCommandWidth','Game_BattlerBase_paramPlus_artifact','_commandWindow','consumeItem','helpAreaHeight','VisuMZ_1_BattleCore','forceChangeEquip','Scene_Shop_onSellCancel','getItemDamageAmountLabelOriginal','Window_ItemList_makeItemList','categories','onCategoryCancel','mhp','LabelRemove','mainAreaTop','Step3Start','text','Equip\x20the\x20strongest\x20available\x20equipment.','height','initShopTrackingData','NonRemoveETypes','resetTextColor','Nonconsumable'];_0x38aa=function(){return _0x52e6a1;};return _0x38aa();}VisuMZ[label][_0x1d2fe5(0x478)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1d2fe5(0x1ff)]=function(_0x59e6c1,_0x566e77){const _0x483a8b=_0x1d2fe5;for(const _0x370fc6 in _0x566e77){if(_0x370fc6[_0x483a8b(0x26a)](/(.*):(.*)/i)){const _0x46f2f0=String(RegExp['$1']),_0x2d95a3=String(RegExp['$2'])[_0x483a8b(0x27f)]()[_0x483a8b(0x5a1)]();let _0x2f39de,_0x4b2d49,_0x13bb32;switch(_0x2d95a3){case _0x483a8b(0x3cb):_0x2f39de=_0x566e77[_0x370fc6]!==''?Number(_0x566e77[_0x370fc6]):0x0;break;case _0x483a8b(0x325):_0x4b2d49=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):[],_0x2f39de=_0x4b2d49[_0x483a8b(0x58f)](_0x3a853f=>Number(_0x3a853f));break;case'EVAL':_0x2f39de=_0x566e77[_0x370fc6]!==''?eval(_0x566e77[_0x370fc6]):null;break;case _0x483a8b(0x255):_0x4b2d49=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):[],_0x2f39de=_0x4b2d49[_0x483a8b(0x58f)](_0x8b7be4=>eval(_0x8b7be4));break;case _0x483a8b(0x4de):_0x2f39de=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):'';break;case _0x483a8b(0x1f6):_0x4b2d49=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):[],_0x2f39de=_0x4b2d49[_0x483a8b(0x58f)](_0x517019=>JSON['parse'](_0x517019));break;case _0x483a8b(0x1c9):_0x2f39de=_0x566e77[_0x370fc6]!==''?new Function(JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6])):new Function('return\x200');break;case'ARRAYFUNC':_0x4b2d49=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):[],_0x2f39de=_0x4b2d49[_0x483a8b(0x58f)](_0xf8f160=>new Function(JSON[_0x483a8b(0x567)](_0xf8f160)));break;case'STR':_0x2f39de=_0x566e77[_0x370fc6]!==''?String(_0x566e77[_0x370fc6]):'';break;case _0x483a8b(0x300):_0x4b2d49=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):[],_0x2f39de=_0x4b2d49[_0x483a8b(0x58f)](_0x4e907b=>String(_0x4e907b));break;case'STRUCT':_0x13bb32=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):{},_0x59e6c1[_0x46f2f0]={},VisuMZ[_0x483a8b(0x1ff)](_0x59e6c1[_0x46f2f0],_0x13bb32);continue;case'ARRAYSTRUCT':_0x4b2d49=_0x566e77[_0x370fc6]!==''?JSON[_0x483a8b(0x567)](_0x566e77[_0x370fc6]):[],_0x2f39de=_0x4b2d49[_0x483a8b(0x58f)](_0x4bdca2=>VisuMZ['ConvertParams']({},JSON[_0x483a8b(0x567)](_0x4bdca2)));break;default:continue;}_0x59e6c1[_0x46f2f0]=_0x2f39de;}}return _0x59e6c1;},(_0x3b85f0=>{const _0x23de34=_0x1d2fe5,_0x2bbc3f=_0x3b85f0['name'];for(const _0xe99591 of dependencies){if(!Imported[_0xe99591]){alert(_0x23de34(0x5da)[_0x23de34(0x44f)](_0x2bbc3f,_0xe99591)),SceneManager[_0x23de34(0x48c)]();break;}}const _0x18e845=_0x3b85f0[_0x23de34(0x286)];if(_0x18e845[_0x23de34(0x26a)](/\[Version[ ](.*?)\]/i)){const _0x55fbd1=Number(RegExp['$1']);_0x55fbd1!==VisuMZ[label][_0x23de34(0x2ba)]&&(alert(_0x23de34(0x4c5)[_0x23de34(0x44f)](_0x2bbc3f,_0x55fbd1)),SceneManager[_0x23de34(0x48c)]());}if(_0x18e845['match'](/\[Tier[ ](\d+)\]/i)){const _0x46e1f3=Number(RegExp['$1']);_0x46e1f3<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x23de34(0x44f)](_0x2bbc3f,_0x46e1f3,tier)),SceneManager[_0x23de34(0x48c)]()):tier=Math[_0x23de34(0x572)](_0x46e1f3,tier);}VisuMZ[_0x23de34(0x1ff)](VisuMZ[label]['Settings'],_0x3b85f0['parameters']);})(pluginData),PluginManager[_0x1d2fe5(0x45c)](pluginData[_0x1d2fe5(0x36f)],_0x1d2fe5(0x2c9),_0x2d03ac=>{const _0x51cf06=_0x1d2fe5;VisuMZ[_0x51cf06(0x1ff)](_0x2d03ac,_0x2d03ac);const _0x38a08d=_0x2d03ac[_0x51cf06(0x35d)][_0x51cf06(0x58f)](_0x2f3290=>$gameActors[_0x51cf06(0x4ff)](_0x2f3290)),_0x4cae78=_0x2d03ac[_0x51cf06(0x21e)][_0x51cf06(0x58f)](_0x242d33=>$dataSystem[_0x51cf06(0x39d)][_0x51cf06(0x338)](_0x242d33[_0x51cf06(0x5a1)]()));for(const _0x35e62c of _0x38a08d){if(!_0x35e62c)continue;_0x35e62c['forceChangeEquipSlots'](_0x4cae78);}}),PluginManager[_0x1d2fe5(0x45c)](pluginData[_0x1d2fe5(0x36f)],_0x1d2fe5(0x207),_0x11fc99=>{const _0x49c971=_0x1d2fe5;VisuMZ['ConvertParams'](_0x11fc99,_0x11fc99);const _0x387bd0=_0x11fc99[_0x49c971(0x35d)][_0x49c971(0x58f)](_0x3c1136=>$gameActors['actor'](_0x3c1136));for(const _0x271819 of _0x387bd0){if(!_0x271819)continue;_0x271819['forceResetEquipSlots']();}}),PluginManager[_0x1d2fe5(0x45c)](pluginData[_0x1d2fe5(0x36f)],'PurifyActors',_0x55108a=>{const _0x1b5adc=_0x1d2fe5;if($gameParty[_0x1b5adc(0x504)]())return;VisuMZ[_0x1b5adc(0x1ff)](_0x55108a,_0x55108a);const _0x162c1b=_0x55108a[_0x1b5adc(0x35d)][_0x1b5adc(0x58f)](_0x23728b=>$gameActors[_0x1b5adc(0x4ff)](_0x23728b));for(const _0x4d8f0c of _0x162c1b){if(!_0x4d8f0c)continue;_0x4d8f0c[_0x1b5adc(0x342)]();}}),PluginManager[_0x1d2fe5(0x45c)](pluginData['name'],_0x1d2fe5(0x472),_0xdc3e76=>{const _0x268ab5=_0x1d2fe5;if($gameParty[_0x268ab5(0x504)]())return;$gameParty[_0x268ab5(0x342)]();}),PluginManager[_0x1d2fe5(0x45c)](pluginData['name'],'BatchShop',_0x56674d=>{const _0xfec0d4=_0x1d2fe5;VisuMZ['ConvertParams'](_0x56674d,_0x56674d);const _0x34f732=[],_0x3baa1c=_0x56674d[_0xfec0d4(0x44c)][_0xfec0d4(0x58f)](_0x4550d9=>_0x4550d9[_0xfec0d4(0x27f)]()['trim']()),_0x19cfd8=_0x56674d[_0xfec0d4(0x1d4)][_0xfec0d4(0x58f)](_0x5574ff=>_0x5574ff[_0xfec0d4(0x27f)]()[_0xfec0d4(0x5a1)]()),_0x483146=_0x56674d[_0xfec0d4(0x1c2)]>=_0x56674d['Step1Start']?_0x56674d['Step1Start']:_0x56674d[_0xfec0d4(0x1c2)],_0x4a0e3a=_0x56674d[_0xfec0d4(0x1c2)]>=_0x56674d[_0xfec0d4(0x52d)]?_0x56674d[_0xfec0d4(0x1c2)]:_0x56674d[_0xfec0d4(0x52d)],_0x1501b0=Array(_0x4a0e3a-_0x483146+0x1)['fill']()['map']((_0x19e14b,_0x23f0be)=>_0x483146+_0x23f0be);for(const _0x186cd3 of _0x1501b0){const _0x377819=$dataItems[_0x186cd3];if(!_0x377819)continue;if(!VisuMZ['ItemsEquipsCore'][_0xfec0d4(0x50b)](_0x377819,_0x3baa1c,_0x19cfd8))continue;_0x34f732[_0xfec0d4(0x334)]([0x0,_0x186cd3,0x0,_0x377819[_0xfec0d4(0x4d3)]]);}const _0x8cc9ba=_0x56674d[_0xfec0d4(0x48b)]>=_0x56674d[_0xfec0d4(0x360)]?_0x56674d[_0xfec0d4(0x360)]:_0x56674d[_0xfec0d4(0x48b)],_0x54f849=_0x56674d[_0xfec0d4(0x48b)]>=_0x56674d[_0xfec0d4(0x360)]?_0x56674d[_0xfec0d4(0x48b)]:_0x56674d[_0xfec0d4(0x360)],_0x8a59ce=Array(_0x54f849-_0x8cc9ba+0x1)['fill']()['map']((_0x4855d4,_0x584b6a)=>_0x8cc9ba+_0x584b6a);for(const _0x501fe2 of _0x8a59ce){const _0x157f67=$dataWeapons[_0x501fe2];if(!_0x157f67)continue;if(!VisuMZ[_0xfec0d4(0x39f)]['IncludeShopItem'](_0x157f67,_0x3baa1c,_0x19cfd8))continue;_0x34f732[_0xfec0d4(0x334)]([0x1,_0x501fe2,0x0,_0x157f67[_0xfec0d4(0x4d3)]]);}const _0x34fed9=_0x56674d[_0xfec0d4(0x403)]>=_0x56674d[_0xfec0d4(0x545)]?_0x56674d['Step3Start']:_0x56674d[_0xfec0d4(0x403)],_0x2d59cd=_0x56674d[_0xfec0d4(0x403)]>=_0x56674d[_0xfec0d4(0x545)]?_0x56674d[_0xfec0d4(0x403)]:_0x56674d['Step3Start'],_0x42a388=Array(_0x2d59cd-_0x34fed9+0x1)[_0xfec0d4(0x380)]()[_0xfec0d4(0x58f)]((_0x125ab8,_0x4716d0)=>_0x34fed9+_0x4716d0);for(const _0x1fea24 of _0x42a388){const _0x5ba9a9=$dataArmors[_0x1fea24];if(!_0x5ba9a9)continue;if(!VisuMZ['ItemsEquipsCore'][_0xfec0d4(0x50b)](_0x5ba9a9,_0x3baa1c,_0x19cfd8))continue;_0x34f732['push']([0x2,_0x1fea24,0x0,_0x5ba9a9[_0xfec0d4(0x4d3)]]);}SceneManager[_0xfec0d4(0x334)](Scene_Shop),SceneManager[_0xfec0d4(0x24a)](_0x34f732,_0x56674d[_0xfec0d4(0x1f4)]);}),VisuMZ[_0x1d2fe5(0x39f)]['IncludeShopItem']=function(_0x15a003,_0x286cc0,_0xb96b4b){const _0xacb940=_0x1d2fe5;if(_0x15a003['name'][_0xacb940(0x5a1)]()==='')return![];if(_0x15a003[_0xacb940(0x36f)]['match'](/-----/i))return![];const _0x191bf7=_0x15a003['categories'];if(_0x286cc0[_0xacb940(0x2d3)]>0x0)for(const _0x2fdf54 of _0x286cc0){if(!_0x2fdf54)continue;if(_0x191bf7['includes'](_0x2fdf54))return![];}if(_0xb96b4b[_0xacb940(0x2d3)]>0x0){for(const _0x47e00f of _0xb96b4b){if(!_0x47e00f)continue;if(_0x191bf7[_0xacb940(0x382)](_0x47e00f))return!![];}return![];}return!![];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x5bf)]=Scene_Boot[_0x1d2fe5(0x3dc)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x1d2fe5(0x40c)]=function(){const _0x2c8410=_0x1d2fe5;this[_0x2c8410(0x1fd)](),VisuMZ[_0x2c8410(0x39f)]['Scene_Boot_onDatabaseLoaded'][_0x2c8410(0x4e5)](this),this[_0x2c8410(0x32f)](),VisuMZ[_0x2c8410(0x39f)]['SetupProxyItemGroups'](),VisuMZ['ItemsEquipsCore'][_0x2c8410(0x375)]();},Scene_Boot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1fd)]=function(){const _0x2b4756=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x2b4756(0x477)]={},VisuMZ[_0x2b4756(0x39f)][_0x2b4756(0x477)][_0x2b4756(0x241)]=[],VisuMZ[_0x2b4756(0x39f)]['RegExp']['BorderRegExp']=[];const _0x1eafc7=[_0x2b4756(0x24b),'MaxMP',_0x2b4756(0x30e),_0x2b4756(0x4b8),'MAT',_0x2b4756(0x4ee),'AGI',_0x2b4756(0x348)];for(const _0x3caf9a of _0x1eafc7){const _0x382c64=_0x2b4756(0x2ce)[_0x2b4756(0x44f)](_0x3caf9a);VisuMZ[_0x2b4756(0x39f)]['RegExp']['EquipParams'][_0x2b4756(0x334)](new RegExp(_0x382c64,'i'));const _0x172fb4='\x5cb%1\x5cb'[_0x2b4756(0x44f)](_0x3caf9a);VisuMZ[_0x2b4756(0x39f)]['RegExp'][_0x2b4756(0x218)]['push'](new RegExp(_0x172fb4,'g'));}},Scene_Boot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x32f)]=function(){const _0x3468f6=_0x1d2fe5;if(VisuMZ[_0x3468f6(0x34c)])return;this[_0x3468f6(0x492)]();const _0x4055b9=[$dataItems,$dataWeapons,$dataArmors];for(const _0x2b358b of _0x4055b9){for(const _0x1aa956 of _0x2b358b){if(!_0x1aa956)continue;VisuMZ[_0x3468f6(0x39f)][_0x3468f6(0x2f7)](_0x1aa956,_0x2b358b),VisuMZ[_0x3468f6(0x39f)][_0x3468f6(0x516)](_0x1aa956,_0x2b358b),VisuMZ[_0x3468f6(0x39f)]['Parse_Notetags_ParamValues'](_0x1aa956,_0x2b358b),VisuMZ['ItemsEquipsCore'][_0x3468f6(0x35e)](_0x1aa956,_0x2b358b),VisuMZ[_0x3468f6(0x39f)][_0x3468f6(0x1f0)](_0x1aa956,_0x2b358b);}}},Scene_Boot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x492)]=function(){const _0x17261d=_0x1d2fe5;for(const _0x2bf832 of $dataClasses){if(!_0x2bf832)continue;VisuMZ['ItemsEquipsCore'][_0x17261d(0x2e1)](_0x2bf832);}},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x498)]=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0x2d846e){const _0x4c2478=_0x1d2fe5;VisuMZ[_0x4c2478(0x39f)][_0x4c2478(0x498)][_0x4c2478(0x4e5)](this,_0x2d846e),VisuMZ['ItemsEquipsCore'][_0x4c2478(0x2e1)](_0x2d846e);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x333)]=VisuMZ[_0x1d2fe5(0x333)],VisuMZ['ParseItemNotetags']=function(_0x7bd2d9){const _0x50206f=_0x1d2fe5;VisuMZ[_0x50206f(0x39f)]['ParseItemNotetags'][_0x50206f(0x4e5)](this,_0x7bd2d9),VisuMZ['ItemsEquipsCore'][_0x50206f(0x2bd)](_0x7bd2d9,$dataItems);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x441)]=VisuMZ[_0x1d2fe5(0x441)],VisuMZ[_0x1d2fe5(0x441)]=function(_0x61ddd3){const _0x388b14=_0x1d2fe5;VisuMZ[_0x388b14(0x39f)][_0x388b14(0x441)][_0x388b14(0x4e5)](this,_0x61ddd3),VisuMZ[_0x388b14(0x39f)][_0x388b14(0x2bd)](_0x61ddd3,$dataWeapons);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x1e0)]=VisuMZ[_0x1d2fe5(0x1e0)],VisuMZ[_0x1d2fe5(0x1e0)]=function(_0x21d150){const _0x35d82a=_0x1d2fe5;VisuMZ[_0x35d82a(0x39f)][_0x35d82a(0x1e0)][_0x35d82a(0x4e5)](this,_0x21d150),VisuMZ['ItemsEquipsCore'][_0x35d82a(0x2bd)](_0x21d150,$dataArmors);},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x2e1)]=function(_0x5404be){const _0x47992a=_0x1d2fe5;_0x5404be[_0x47992a(0x31b)]=[];const _0x1b1121=$dataSystem[_0x47992a(0x39d)]['map'](_0x5afdc0=>_0x5afdc0?_0x5afdc0[_0x47992a(0x5a1)]():'');if(!BattleManager[_0x47992a(0x42c)]()&&_0x5404be[_0x47992a(0x3f8)]['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x531b5a=String(RegExp['$1'])[_0x47992a(0x3e9)](/[\r\n]+/);for(const _0x455d5b of _0x531b5a){const _0x4f02f1=_0x1b1121[_0x47992a(0x338)](_0x455d5b[_0x47992a(0x5a1)]());if(_0x4f02f1>0x0)_0x5404be[_0x47992a(0x31b)][_0x47992a(0x334)](_0x4f02f1);}}else for(const _0x39de25 of _0x1b1121){const _0x48cd54=_0x1b1121[_0x47992a(0x338)](_0x39de25[_0x47992a(0x5a1)]());if(_0x48cd54>0x0)_0x5404be[_0x47992a(0x31b)][_0x47992a(0x334)](_0x48cd54);}},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x2bd)]=function(_0x4d0943,_0x18a90e){const _0x270a1d=_0x1d2fe5;VisuMZ[_0x270a1d(0x39f)][_0x270a1d(0x2f7)](_0x4d0943,_0x18a90e),VisuMZ[_0x270a1d(0x39f)][_0x270a1d(0x516)](_0x4d0943,_0x18a90e),VisuMZ[_0x270a1d(0x39f)][_0x270a1d(0x4bc)](_0x4d0943,_0x18a90e),VisuMZ['ItemsEquipsCore'][_0x270a1d(0x35e)](_0x4d0943,_0x18a90e),VisuMZ[_0x270a1d(0x39f)][_0x270a1d(0x1f0)](_0x4d0943,_0x18a90e);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x2f7)]=function(_0x58add3,_0x4199aa){const _0x23a1ba=_0x1d2fe5;_0x58add3[_0x23a1ba(0x540)]=[];const _0x202c60=_0x58add3['note']||'',_0x259cf1=_0x202c60['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x259cf1)for(const _0x2c9fa7 of _0x259cf1){_0x2c9fa7[_0x23a1ba(0x26a)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x469931=String(RegExp['$1'])[_0x23a1ba(0x27f)]()[_0x23a1ba(0x5a1)]()[_0x23a1ba(0x3e9)](',');for(const _0xd20d1 of _0x469931){_0x58add3[_0x23a1ba(0x540)][_0x23a1ba(0x334)](_0xd20d1[_0x23a1ba(0x5a1)]());}}if(_0x202c60['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4bacde=RegExp['$1'][_0x23a1ba(0x3e9)](/[\r\n]+/);for(const _0x515582 of _0x4bacde){_0x58add3[_0x23a1ba(0x540)][_0x23a1ba(0x334)](_0x515582[_0x23a1ba(0x27f)]()['trim']());}}},VisuMZ[_0x1d2fe5(0x39f)]['Parse_Notetags_Sorting']=function(_0x29fb6c,_0x3f5ac1){const _0x27e7a7=_0x1d2fe5;if(!_0x29fb6c)return;_0x29fb6c[_0x27e7a7(0x1f1)]=0x32;const _0x2c3ff2=_0x29fb6c[_0x27e7a7(0x3f8)]||'';_0x2c3ff2['match'](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x29fb6c[_0x27e7a7(0x1f1)]=Number(RegExp['$1']));},VisuMZ[_0x1d2fe5(0x39f)]['Parse_Notetags_Prices']=function(_0x55e63a,_0x278c51){const _0x30b90a=_0x1d2fe5;_0x55e63a[_0x30b90a(0x3f8)]['match'](/<PRICE:[ ](\d+)>/i)&&(_0x55e63a[_0x30b90a(0x4d3)]=Number(RegExp['$1']));},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x4bc)]=function(_0x472571,_0x3beadb){const _0x439777=_0x1d2fe5;if(_0x3beadb===$dataItems)return;for(let _0x132603=0x0;_0x132603<0x8;_0x132603++){const _0x43aba4=VisuMZ[_0x439777(0x39f)]['RegExp'][_0x439777(0x241)][_0x132603];_0x472571[_0x439777(0x3f8)][_0x439777(0x26a)](_0x43aba4)&&(_0x472571[_0x439777(0x25f)][_0x132603]=parseInt(RegExp['$1']));}},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x585)]={},VisuMZ[_0x1d2fe5(0x39f)]['Parse_Notetags_ParamJS']=function(_0x474ede,_0x54dbef){const _0x47cfae=_0x1d2fe5;if(_0x54dbef===$dataItems)return;if(_0x474ede[_0x47cfae(0x3f8)][_0x47cfae(0x26a)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x2139b5=String(RegExp['$1']),_0x378c60=(_0x54dbef===$dataWeapons?'W%1':_0x47cfae(0x4c7))[_0x47cfae(0x44f)](_0x474ede['id']),_0xf09fe2='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'[_0x47cfae(0x44f)](_0x2139b5);for(let _0x36fbc4=0x0;_0x36fbc4<0x8;_0x36fbc4++){if(_0x2139b5[_0x47cfae(0x26a)](VisuMZ[_0x47cfae(0x39f)][_0x47cfae(0x477)][_0x47cfae(0x218)][_0x36fbc4])){const _0xcd016c='%1-%2'[_0x47cfae(0x44f)](_0x378c60,_0x36fbc4);VisuMZ[_0x47cfae(0x39f)][_0x47cfae(0x585)][_0xcd016c]=new Function(_0x47cfae(0x4f0),_0x47cfae(0x41b),_0xf09fe2);}}}},VisuMZ['ItemsEquipsCore']['itemEnableJS']={},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x1f0)]=function(_0x3d9f39,_0x235307){const _0x1b3109=_0x1d2fe5;if(_0x235307!==$dataItems)return;if(_0x3d9f39[_0x1b3109(0x3f8)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x3ca5c7=String(RegExp['$1']),_0x1964e6=_0x1b3109(0x3f1)['format'](_0x3ca5c7);VisuMZ['ItemsEquipsCore']['itemEnableJS'][_0x3d9f39['id']]=new Function(_0x1b3109(0x4f0),_0x1964e6);}},DataManager[_0x1d2fe5(0x1df)]=function(_0x33b35e){const _0x53d072=_0x1d2fe5;return this['isItem'](_0x33b35e)&&_0x33b35e[_0x53d072(0x553)]===0x2;},DataManager['maxItemAmount']=function(_0x24057c){const _0x569714=_0x1d2fe5;if(!_0x24057c)return 0x63;else return _0x24057c[_0x569714(0x3f8)]['match'](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x569714(0x2a6)](_0x24057c);},DataManager[_0x1d2fe5(0x2a6)]=function(_0x2fd463){const _0x4559b2=_0x1d2fe5;if(this[_0x4559b2(0x36e)](_0x2fd463))return VisuMZ[_0x4559b2(0x39f)][_0x4559b2(0x478)][_0x4559b2(0x503)][_0x4559b2(0x21c)];else{if(this[_0x4559b2(0x415)](_0x2fd463))return VisuMZ[_0x4559b2(0x39f)]['Settings'][_0x4559b2(0x503)][_0x4559b2(0x3fd)];else{if(this[_0x4559b2(0x1f8)](_0x2fd463))return VisuMZ[_0x4559b2(0x39f)][_0x4559b2(0x478)][_0x4559b2(0x503)][_0x4559b2(0x468)];}}},DataManager['getClassIdWithName']=function(_0x55969d){const _0x2df6d5=_0x1d2fe5;_0x55969d=_0x55969d[_0x2df6d5(0x27f)]()[_0x2df6d5(0x5a1)](),this['_classIDs']=this[_0x2df6d5(0x296)]||{};if(this[_0x2df6d5(0x296)][_0x55969d])return this[_0x2df6d5(0x296)][_0x55969d];for(const _0x38b56e of $dataClasses){if(!_0x38b56e)continue;let _0x57a867=_0x38b56e[_0x2df6d5(0x36f)];_0x57a867=_0x57a867[_0x2df6d5(0x4b6)](/\x1I\[(\d+)\]/gi,''),_0x57a867=_0x57a867[_0x2df6d5(0x4b6)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x57a867['toUpperCase']()[_0x2df6d5(0x5a1)]()]=_0x38b56e['id'];}return this['_classIDs'][_0x55969d]||0x0;},DataManager[_0x1d2fe5(0x41c)]=function(_0x1b2170){const _0x4cf6e3=_0x1d2fe5;_0x1b2170=_0x1b2170[_0x4cf6e3(0x27f)]()[_0x4cf6e3(0x5a1)](),this[_0x4cf6e3(0x307)]=this[_0x4cf6e3(0x307)]||{};if(this[_0x4cf6e3(0x307)][_0x1b2170])return this[_0x4cf6e3(0x307)][_0x1b2170];for(const _0x2b18d7 of $dataSkills){if(!_0x2b18d7)continue;this[_0x4cf6e3(0x307)][_0x2b18d7['name']['toUpperCase']()['trim']()]=_0x2b18d7['id'];}return this[_0x4cf6e3(0x307)][_0x1b2170]||0x0;},DataManager[_0x1d2fe5(0x22f)]=function(_0x2a9021){const _0x3b77d=_0x1d2fe5;_0x2a9021=_0x2a9021[_0x3b77d(0x27f)]()['trim'](),this[_0x3b77d(0x2f0)]=this['_itemIDs']||{};if(this['_itemIDs'][_0x2a9021])return this['_itemIDs'][_0x2a9021];for(const _0x170459 of $dataItems){if(!_0x170459)continue;this['_itemIDs'][_0x170459[_0x3b77d(0x36f)][_0x3b77d(0x27f)]()[_0x3b77d(0x5a1)]()]=_0x170459['id'];}return this['_itemIDs'][_0x2a9021]||0x0;},DataManager['getWeaponIdWithName']=function(_0x3e6f4f){const _0x5bf938=_0x1d2fe5;_0x3e6f4f=_0x3e6f4f[_0x5bf938(0x27f)]()[_0x5bf938(0x5a1)](),this[_0x5bf938(0x464)]=this['_weaponIDs']||{};if(this[_0x5bf938(0x464)][_0x3e6f4f])return this[_0x5bf938(0x464)][_0x3e6f4f];for(const _0x11066c of $dataWeapons){if(!_0x11066c)continue;this[_0x5bf938(0x464)][_0x11066c[_0x5bf938(0x36f)]['toUpperCase']()[_0x5bf938(0x5a1)]()]=_0x11066c['id'];}return this[_0x5bf938(0x464)][_0x3e6f4f]||0x0;},DataManager[_0x1d2fe5(0x31d)]=function(_0x26bc90){const _0x4a4a4e=_0x1d2fe5;_0x26bc90=_0x26bc90[_0x4a4a4e(0x27f)]()[_0x4a4a4e(0x5a1)](),this[_0x4a4a4e(0x1fa)]=this[_0x4a4a4e(0x1fa)]||{};if(this[_0x4a4a4e(0x1fa)][_0x26bc90])return this['_armorIDs'][_0x26bc90];for(const _0x5ebacf of $dataArmors){if(!_0x5ebacf)continue;this[_0x4a4a4e(0x1fa)][_0x5ebacf[_0x4a4a4e(0x36f)]['toUpperCase']()[_0x4a4a4e(0x5a1)]()]=_0x5ebacf['id'];}return this[_0x4a4a4e(0x1fa)][_0x26bc90]||0x0;},DataManager[_0x1d2fe5(0x1f7)]=function(_0x224514){const _0x1f4301=_0x1d2fe5;_0x224514=_0x224514[_0x1f4301(0x27f)]()[_0x1f4301(0x5a1)](),this[_0x1f4301(0x3c5)]=this['_etypeIDs']||{};if(this[_0x1f4301(0x3c5)][_0x224514])return this[_0x1f4301(0x3c5)][_0x224514];for(const _0x77ef17 of $dataSystem[_0x1f4301(0x39d)]){this[_0x1f4301(0x3c5)][_0x77ef17['toUpperCase']()[_0x1f4301(0x5a1)]()]=$dataSystem['equipTypes'][_0x1f4301(0x338)](_0x77ef17);}return this[_0x1f4301(0x3c5)][_0x224514]||0x0;},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x410)]=function(){const _0x3d85b7=_0x1d2fe5;VisuMZ[_0x3d85b7(0x39f)][_0x3d85b7(0x364)]($dataItems),VisuMZ['ItemsEquipsCore'][_0x3d85b7(0x364)]($dataWeapons),VisuMZ[_0x3d85b7(0x39f)][_0x3d85b7(0x364)]($dataArmors);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x364)]=function(_0x1d39aa){const _0x506874=_0x1d2fe5;for(const _0x308be3 of _0x1d39aa){if(!_0x308be3)continue;if(!DataManager['isProxyItem'](_0x308be3))continue;const _0xf28e4f=DataManager[_0x506874(0x3b5)](_0x308be3),_0x49b33a=[_0x506874(0x36f),_0x506874(0x38b),_0x506874(0x286)];for(const _0x1b8e1f of _0x49b33a){_0x308be3[_0x1b8e1f]=_0xf28e4f[_0x1b8e1f];}}},DataManager[_0x1d2fe5(0x57b)]=function(_0x553066){const _0x52e0b8=_0x1d2fe5;if(!_0x553066)return![];if(!_0x553066[_0x52e0b8(0x3f8)])return![];return _0x553066&&_0x553066[_0x52e0b8(0x3f8)][_0x52e0b8(0x26a)](/<PROXY:[ ](.*)>/i);},DataManager[_0x1d2fe5(0x3b5)]=function(_0x25a06f){const _0xc6cad=_0x1d2fe5;return this[_0xc6cad(0x57b)](_0x25a06f)?this['switchProxyItem'](_0x25a06f)||_0x25a06f:_0x25a06f;},DataManager['switchProxyItem']=function(_0x5c1aaa){const _0x332a9f=_0x1d2fe5;_0x5c1aaa['note']['match'](/<PROXY:[ ](.*)>/i);const _0x51c3b1=RegExp['$1']['trim'](),_0x11718b=/^\d+$/['test'](_0x51c3b1);if(this[_0x332a9f(0x36e)](_0x5c1aaa)){const _0x4d9db2=_0x11718b?Number(_0x51c3b1):DataManager[_0x332a9f(0x22f)](_0x51c3b1);return $dataItems[_0x4d9db2]||_0x5c1aaa;}else{if(this[_0x332a9f(0x415)](_0x5c1aaa)){const _0x59648f=_0x11718b?Number(_0x51c3b1):DataManager[_0x332a9f(0x2c3)](_0x51c3b1);return $dataWeapons[_0x59648f]||_0x5c1aaa;}else{if(this[_0x332a9f(0x1f8)](_0x5c1aaa)){const _0x20bb01=_0x11718b?Number(_0x51c3b1):DataManager[_0x332a9f(0x31d)](_0x51c3b1);return $dataArmors[_0x20bb01]||_0x5c1aaa;}}}return _0x5c1aaa;},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x21f)]=Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4f0)],Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4f0)]=function(){const _0x25f347=_0x1d2fe5;if($gameTemp['_bypassProxy'])return VisuMZ['ItemsEquipsCore'][_0x25f347(0x21f)][_0x25f347(0x4e5)](this);return DataManager[_0x25f347(0x3b5)](VisuMZ[_0x25f347(0x39f)][_0x25f347(0x21f)][_0x25f347(0x4e5)](this));},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1e3)]=function(){const _0x2b072b=_0x1d2fe5;return VisuMZ['ItemsEquipsCore'][_0x2b072b(0x21f)][_0x2b072b(0x4e5)](this);},VisuMZ[_0x1d2fe5(0x39f)]['Window_ShopBuy_item']=Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4f0)],Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4f0)]=function(){const _0x159283=_0x1d2fe5;if($gameTemp[_0x159283(0x23e)])return VisuMZ['ItemsEquipsCore']['Window_ShopBuy_item'][_0x159283(0x4e5)](this);return DataManager[_0x159283(0x3b5)](VisuMZ[_0x159283(0x39f)][_0x159283(0x4fa)][_0x159283(0x4e5)](this));},Window_ShopBuy['prototype'][_0x1d2fe5(0x1e3)]=function(){const _0x164782=_0x1d2fe5;return VisuMZ['ItemsEquipsCore']['Window_ShopBuy_item'][_0x164782(0x4e5)](this);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x4bd)]=Game_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1d2)],Game_Item['prototype'][_0x1d2fe5(0x1d2)]=function(_0x9395b7){const _0x3b54d0=_0x1d2fe5;if(DataManager['isProxyItem'](_0x9395b7))return;VisuMZ[_0x3b54d0(0x39f)][_0x3b54d0(0x4bd)][_0x3b54d0(0x4e5)](this,_0x9395b7);},VisuMZ['ItemsEquipsCore']['SetupArtifactItemIDs']=function(){const _0x2371c5=_0x1d2fe5;this['artifactIDs']={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x2ab70b of $dataArmors){if(!_0x2ab70b)continue;if(!DataManager[_0x2371c5(0x229)](_0x2ab70b))continue;DataManager[_0x2371c5(0x405)](_0x2ab70b)&&this[_0x2371c5(0x509)][_0x2371c5(0x530)][_0x2371c5(0x334)](_0x2ab70b['id']),DataManager[_0x2371c5(0x28b)](_0x2ab70b)&&this[_0x2371c5(0x509)]['troopArtifactIDs'][_0x2371c5(0x334)](_0x2ab70b['id']);}},DataManager[_0x1d2fe5(0x229)]=function(_0x954d07){const _0x379398=_0x1d2fe5;if(!this[_0x379398(0x1f8)](_0x954d07))return![];const _0x3542ff=_0x954d07[_0x379398(0x3f8)];if(!_0x3542ff)return![];if(_0x3542ff['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3542ff['match'](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3542ff[_0x379398(0x26a)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3542ff[_0x379398(0x26a)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isStackableArtifact']=function(_0x5caca0){const _0x5a3ad5=_0x1d2fe5;if(!this['isArtifact'](_0x5caca0))return![];const _0x440246=_0x5caca0[_0x5a3ad5(0x3f8)];if(!_0x440246)return![];if(_0x440246[_0x5a3ad5(0x26a)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x440246[_0x5a3ad5(0x26a)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x1d2fe5(0x405)]=function(_0x5e3245){const _0x22e73d=_0x1d2fe5;if(!this[_0x22e73d(0x229)](_0x5e3245))return![];const _0x31f8ff=_0x5e3245['note'];if(!_0x31f8ff)return![];if(_0x31f8ff[_0x22e73d(0x26a)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x31f8ff[_0x22e73d(0x26a)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x1d2fe5(0x28b)]=function(_0x557d67){const _0x99d1cf=_0x1d2fe5;if(!this[_0x99d1cf(0x229)](_0x557d67))return![];const _0xb1c636=_0x557d67[_0x99d1cf(0x3f8)];if(!_0xb1c636)return![];if(_0xb1c636[_0x99d1cf(0x26a)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xb1c636[_0x99d1cf(0x26a)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x1d2fe5(0x39f)]['Game_BattlerBase_canEquip_artifact']=Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x54f)],Game_BattlerBase[_0x1d2fe5(0x3dc)]['canEquip']=function(_0x377b66){const _0xb2a991=_0x1d2fe5;if(DataManager['isArtifact'](_0x377b66))return![];if(!DataManager[_0xb2a991(0x26b)](this,_0x377b66))return![];if(!DataManager['meetsEquipRequirements'](this,_0x377b66))return![];return VisuMZ['ItemsEquipsCore'][_0xb2a991(0x4eb)][_0xb2a991(0x4e5)](this,_0x377b66);},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x52c)]=Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x529)],Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x529)]=function(_0x5525ab){const _0x4cf435=_0x1d2fe5;this[_0x4cf435(0x432)]=!![];const _0x16d9c5=VisuMZ[_0x4cf435(0x39f)][_0x4cf435(0x52c)][_0x4cf435(0x4e5)](this,_0x5525ab);return this['_allowArtifactParamBase']=undefined,_0x16d9c5;},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x474)]=Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5ba)],Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5ba)]=function(){const _0x55317a=_0x1d2fe5;this[_0x55317a(0x1d7)]=!![];const _0x299295=VisuMZ[_0x55317a(0x39f)][_0x55317a(0x474)][_0x55317a(0x4e5)](this);return this[_0x55317a(0x1d7)]=undefined,_0x299295;},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x3f5)]=Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3e8)],Game_Actor['prototype'][_0x1d2fe5(0x3e8)]=function(){const _0x50443a=_0x1d2fe5,_0x43d7ec=VisuMZ[_0x50443a(0x39f)][_0x50443a(0x3f5)][_0x50443a(0x4e5)](this);if(this[_0x50443a(0x1d7)]||this[_0x50443a(0x432)]){const _0x5c736d=_0x43d7ec[_0x50443a(0x38f)]($gameParty['partyArtifacts']());return _0x5c736d;}else return _0x43d7ec;},VisuMZ[_0x1d2fe5(0x39f)]['Game_BattlerBase_paramPlus_artifact']=Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3ec)],Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3ec)]=function(_0x26843c){const _0x5bc632=_0x1d2fe5;let _0x5380c0=VisuMZ['ItemsEquipsCore'][_0x5bc632(0x537)][_0x5bc632(0x4e5)](this,_0x26843c);if(this['constructor']===Game_Enemy)for(const _0x1d2b61 of $gameParty[_0x5bc632(0x55e)]()){if(_0x1d2b61)_0x5380c0+=_0x1d2b61['params'][_0x26843c];}return _0x5380c0;},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x4ea)]=Game_Enemy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5ba)],Game_Enemy[_0x1d2fe5(0x3dc)]['traitObjects']=function(){const _0x7c62db=_0x1d2fe5;let _0x4829c4=VisuMZ[_0x7c62db(0x39f)]['Game_Enemy_traitObjects_artifact']['call'](this);return _0x4829c4['concat']($gameParty[_0x7c62db(0x55e)]());},VisuMZ['ItemsEquipsCore']['Game_Party_gainItem_artifact']=Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x389)],Game_Party[_0x1d2fe5(0x3dc)]['gainItem']=function(_0x420722,_0x28e1e3,_0x3ba89a){const _0x3caa7f=_0x1d2fe5;VisuMZ[_0x3caa7f(0x39f)][_0x3caa7f(0x3df)][_0x3caa7f(0x4e5)](this,_0x420722,_0x28e1e3,_0x3ba89a);if(DataManager['isArtifact'](_0x420722)){let _0x4d6d5c=$gameParty[_0x3caa7f(0x30d)]();if($gameParty['inBattle']())_0x4d6d5c=_0x4d6d5c[_0x3caa7f(0x38f)]($gameTroop['members']());for(const _0x180bec of _0x4d6d5c){if(!_0x180bec)continue;_0x180bec[_0x3caa7f(0x275)]={};}}},Game_Party[_0x1d2fe5(0x3dc)]['partyArtifacts']=function(){const _0x7f65d=_0x1d2fe5;let _0x52c760=[];const _0x560ea4=VisuMZ[_0x7f65d(0x39f)][_0x7f65d(0x509)][_0x7f65d(0x530)];if(_0x560ea4)for(const _0x26b5d6 of _0x560ea4){const _0x33a532=$dataArmors[_0x26b5d6];if(!_0x33a532)continue;if(!this[_0x7f65d(0x552)](_0x33a532))continue;let _0x4d03c1=0x1;if(DataManager['isStackableArtifact'](_0x33a532))_0x4d03c1=this[_0x7f65d(0x282)](_0x33a532);while(_0x4d03c1--)_0x52c760[_0x7f65d(0x334)](_0x33a532);}return _0x52c760;},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x55e)]=function(){const _0x42d43c=_0x1d2fe5;let _0x1c8b30=[];const _0x24b172=VisuMZ[_0x42d43c(0x39f)][_0x42d43c(0x509)][_0x42d43c(0x578)];if(_0x24b172)for(const _0x19d574 of _0x24b172){const _0x1f5866=$dataArmors[_0x19d574];if(!_0x1f5866)continue;if(!this[_0x42d43c(0x552)](_0x1f5866))continue;let _0x4ca473=0x1;if(DataManager[_0x42d43c(0x3c4)](_0x1f5866))_0x4ca473=this[_0x42d43c(0x282)](_0x1f5866);while(_0x4ca473--)_0x1c8b30[_0x42d43c(0x334)](_0x1f5866);}return _0x1c8b30;},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x202)]=function(){const _0x5949c7=_0x1d2fe5;return this['partyArtifacts']()[_0x5949c7(0x38f)](this[_0x5949c7(0x55e)]());},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x506)]=Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x510)],Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x510)]=function(){const _0x1f27af=_0x1d2fe5;VisuMZ[_0x1f27af(0x39f)][_0x1f27af(0x506)][_0x1f27af(0x4e5)](this),this[_0x1f27af(0x219)]();},Game_Party[_0x1d2fe5(0x3dc)]['removeBattleTestArtifacts']=function(){const _0x241885=_0x1d2fe5,_0x303e0b=$gameParty[_0x241885(0x1dd)]()[_0x241885(0x21a)](_0x130400=>DataManager[_0x241885(0x229)](_0x130400));for(const _0xd969e0 of _0x303e0b){const _0xfcdcb8=this[_0x241885(0x282)](_0xd969e0);if(_0xfcdcb8)this['loseItem'](_0xd969e0,_0xfcdcb8);}},DataManager['meetsClassRequirements']=function(_0x119a22,_0x46fbfa){const _0x2144cd=_0x1d2fe5;if(this[_0x2144cd(0x36e)](_0x46fbfa))return![];if(!_0x119a22)return![];if($gameTemp['_checkEquipRequirements'])return!![];if(BattleManager[_0x2144cd(0x42c)]())return!![];const _0x14b7fe=this['getClassRequirements'](_0x46fbfa);if(_0x14b7fe[_0x2144cd(0x2d3)]<=0x0)return!![];return _0x14b7fe[_0x2144cd(0x382)](_0x119a22[_0x2144cd(0x311)]()['id']);},DataManager[_0x1d2fe5(0x272)]=function(_0x568d8b){const _0x37ab50=_0x1d2fe5;if(!_0x568d8b)return[];this['_getClassRequirements']=this[_0x37ab50(0x1e9)]||{};const _0x2bab37='%1-%2'['format'](this['isWeapon'](_0x568d8b)?_0x37ab50(0x41d):'ARMOR',_0x568d8b['id']);if(this['_getClassRequirements'][_0x2bab37]!==undefined)return this['_getClassRequirements'][_0x2bab37];let _0xa4d000=[];const _0x4767b2=_0x568d8b['note']||'';if(_0x4767b2[_0x37ab50(0x26a)](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){const _0xaa7ce4=String(RegExp['$1'])[_0x37ab50(0x3e9)](',')[_0x37ab50(0x58f)](_0x189a78=>_0x189a78[_0x37ab50(0x5a1)]());for(const _0x5053f9 of _0xaa7ce4){const _0x5425fa=/^\d+$/['test'](_0x5053f9);_0x5425fa?_0xa4d000[_0x37ab50(0x334)](Number(_0x5053f9)):_0xa4d000[_0x37ab50(0x334)](DataManager[_0x37ab50(0x3ee)](_0x5053f9));}}return this[_0x37ab50(0x1e9)][_0x2bab37]=_0xa4d000,this['_getClassRequirements'][_0x2bab37];},DataManager[_0x1d2fe5(0x243)]=function(_0x40caa6,_0xee546f){const _0x440f48=_0x1d2fe5;if(this[_0x440f48(0x36e)](_0xee546f))return![];if(!_0x40caa6)return![];if($gameTemp[_0x440f48(0x323)])return!![];if(BattleManager['isBattleTest']())return!![];const _0x3cb3ca=this['getEquipRequirements'](_0xee546f);for(const _0x4d80ba of _0x3cb3ca){if(!this[_0x440f48(0x2a3)](_0x40caa6,_0x4d80ba))return![];}return!![];},DataManager[_0x1d2fe5(0x2de)]=function(_0x3c8471){const _0x1c8386=_0x1d2fe5;if(!_0x3c8471)return[];this[_0x1c8386(0x46b)]=this[_0x1c8386(0x46b)]||{};const _0x2e2d47='%1-%2'[_0x1c8386(0x44f)](this[_0x1c8386(0x415)](_0x3c8471)?_0x1c8386(0x41d):_0x1c8386(0x500),_0x3c8471['id']);if(this['_getEquipRequirements'][_0x2e2d47]!==undefined)return this[_0x1c8386(0x46b)][_0x2e2d47];let _0x1d7797=[];const _0x2043e4=_0x3c8471[_0x1c8386(0x3f8)]||'';return _0x2043e4[_0x1c8386(0x26a)](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0x1d7797=String(RegExp['$1'])[_0x1c8386(0x3e9)](/[\r\n]+/)),this['_getEquipRequirements'][_0x2e2d47]=_0x1d7797,this[_0x1c8386(0x46b)][_0x2e2d47];},DataManager[_0x1d2fe5(0x2a3)]=function(_0x17ffb3,_0x34439a){const _0x4d526c=_0x1d2fe5;if(_0x34439a[_0x4d526c(0x26a)](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x5ea100=String(RegExp['$1'])['trim'](),_0x4faa52=Number(RegExp['$2']);switch(_0x5ea100){case'>':return _0x17ffb3[_0x4d526c(0x1fe)]>_0x4faa52;case'>=':return _0x17ffb3[_0x4d526c(0x1fe)]>=_0x4faa52;case _0x4d526c(0x419):return _0x17ffb3[_0x4d526c(0x1fe)]===_0x4faa52;case'<=':return _0x17ffb3['level']<=_0x4faa52;case'<':return _0x17ffb3[_0x4d526c(0x1fe)]<_0x4faa52;}return![];}if(_0x34439a[_0x4d526c(0x26a)](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0xf4e835=String(RegExp['$1'])[_0x4d526c(0x4d2)]()['trim'](),_0x400496=String(RegExp['$2'])[_0x4d526c(0x5a1)](),_0x5467d3=Number(RegExp['$3']);let _0x447e97=0x0;if([_0x4d526c(0x426),_0x4d526c(0x268)]['includes'](_0xf4e835))_0x447e97=0x1;const _0x149ccb=_0x17ffb3[_0x4d526c(0x48d)][_0x447e97]||0x0;switch(_0x400496){case'>':return _0x17ffb3[_0x4d526c(0x5b6)](_0x447e97)+_0x149ccb>_0x5467d3;case'>=':return _0x17ffb3[_0x4d526c(0x5b6)](_0x447e97)+_0x149ccb>=_0x5467d3;case _0x4d526c(0x419):return _0x17ffb3['paramBase'](_0x447e97)+_0x149ccb===_0x5467d3;case'<=':return _0x17ffb3[_0x4d526c(0x5b6)](_0x447e97)+_0x149ccb<=_0x5467d3;case'<':return _0x17ffb3[_0x4d526c(0x5b6)](_0x447e97)+_0x149ccb<_0x5467d3;}return![];}if(_0x34439a['match'](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x4764e8=String(RegExp['$1'])[_0x4d526c(0x4d2)]()[_0x4d526c(0x5a1)](),_0x3defb0=String(RegExp['$2'])['trim'](),_0x3267b1=Number(RegExp['$3']),_0x1f69ee=[_0x4d526c(0x3f2),_0x4d526c(0x565),_0x4d526c(0x4c4),_0x4d526c(0x4f8),'agi',_0x4d526c(0x533)];let _0x15182a=_0x1f69ee['indexOf'](_0x4764e8)+0x2;if(_0x15182a<0x2)return![];const _0x248d5d=_0x17ffb3[_0x4d526c(0x48d)][_0x15182a]||0x0;switch(_0x3defb0){case'>':return _0x17ffb3[_0x4d526c(0x5b6)](_0x15182a)+_0x248d5d>_0x3267b1;case'>=':return _0x17ffb3[_0x4d526c(0x5b6)](_0x15182a)+_0x248d5d>=_0x3267b1;case _0x4d526c(0x419):return _0x17ffb3['paramBase'](_0x15182a)+_0x248d5d===_0x3267b1;case'<=':return _0x17ffb3[_0x4d526c(0x5b6)](_0x15182a)+_0x248d5d<=_0x3267b1;case'<':return _0x17ffb3[_0x4d526c(0x5b6)](_0x15182a)+_0x248d5d<_0x3267b1;}return![];}if(_0x34439a[_0x4d526c(0x26a)](/LEARNED SKILL:[ ](\d+)/i)){const _0x5d06b6=Number(RegExp['$1']);return _0x17ffb3['isLearnedSkill'](_0x5d06b6);}else{if(_0x34439a[_0x4d526c(0x26a)](/LEARNED SKILL:[ ](.*)/i)){const _0x2450bd=String(RegExp['$1']),_0x25c0c6=this[_0x4d526c(0x41c)](_0x2450bd);return _0x17ffb3[_0x4d526c(0x4ce)](_0x25c0c6);}}if(_0x34439a[_0x4d526c(0x26a)](/SWITCH:[ ](\d+)/i)){const _0x23d542=Number(RegExp['$1']);return $gameSwitches[_0x4d526c(0x575)](_0x23d542);}return!![];},DataManager[_0x1d2fe5(0x3e6)]=function(_0x43eb1e){const _0x29b4af=_0x1d2fe5;return this[_0x29b4af(0x1f8)](_0x43eb1e)?this[_0x29b4af(0x59d)](_0x43eb1e):[_0x43eb1e[_0x29b4af(0x473)]||0x0];},DataManager[_0x1d2fe5(0x59d)]=function(_0x48bc5a){const _0x274a08=_0x1d2fe5;this[_0x274a08(0x203)]=this[_0x274a08(0x203)]||{};if(this['_cache_etypeIDs'][_0x48bc5a['id']]!==undefined)return this[_0x274a08(0x203)][_0x48bc5a['id']];this[_0x274a08(0x203)][_0x48bc5a['id']]=[_0x48bc5a['etypeId']||0x0];const _0x4e78ef=_0x48bc5a['note']||'';if(_0x4e78ef['match'](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){const _0x2cd7b9=String(RegExp['$1'])['split'](',')[_0x274a08(0x58f)](_0x28d4a7=>_0x28d4a7['trim']());for(const _0xdc0f5b of _0x2cd7b9){const _0xec298a=/^\d+$/[_0x274a08(0x5d7)](_0xdc0f5b);let _0x3b929c=0x0;_0xec298a?_0x3b929c=Number(_0xdc0f5b):_0x3b929c=this[_0x274a08(0x1f7)](_0xdc0f5b),_0x3b929c>0x1&&this[_0x274a08(0x203)][_0x48bc5a['id']][_0x274a08(0x334)](_0x3b929c);}}return this[_0x274a08(0x203)][_0x48bc5a['id']];},Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x279)]=function(_0x360fd3){const _0x320e44=_0x1d2fe5;return this['isEquipAtypeOk'](_0x360fd3[_0x320e44(0x2d2)])&&!this[_0x320e44(0x324)](_0x360fd3[_0x320e44(0x473)])&&DataManager['getEtypeIDs'](_0x360fd3)[_0x320e44(0x1cd)](_0x4d19dd=>!this[_0x320e44(0x324)](_0x4d19dd));},DataManager['isCursedItem']=function(_0x4c7b22){const _0x47c866=_0x1d2fe5;if(!this['isWeapon'](_0x4c7b22)&&!this['isArmor'](_0x4c7b22))return![];if(Imported[_0x47c866(0x519)]&&this[_0x47c866(0x415)](_0x4c7b22))return![];if(!_0x4c7b22[_0x47c866(0x3f8)])return![];return _0x4c7b22['note'][_0x47c866(0x26a)](/<CURSED>/i);},DataManager[_0x1d2fe5(0x5dc)]=function(_0x5386e7){const _0x554b79=_0x1d2fe5;if(!_0x5386e7)return _0x5386e7;if(!this[_0x554b79(0x415)](_0x5386e7)&&!this[_0x554b79(0x1f8)](_0x5386e7))return _0x5386e7;if(_0x5386e7['note']['match'](/<PURIFY TRANSFORM:[ ](.*)>/i)){const _0x170779=String(RegExp['$1'])[_0x554b79(0x5a1)](),_0x1034e4=/^\d+$/['test'](_0x170779);if(_0x1034e4){if(this['isWeapon'](_0x5386e7))return $dataWeapons[Number(_0x170779)];if(this[_0x554b79(0x1f8)](_0x5386e7))return $dataArmors[Number(_0x170779)];}else{if(this[_0x554b79(0x415)](_0x5386e7))return $dataWeapons[this['getWeaponIdWithName'](_0x170779)];if(this[_0x554b79(0x1f8)](_0x5386e7))return $dataArmors[this[_0x554b79(0x31d)](_0x170779)];}}return _0x5386e7;},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x342)]=function(){const _0x5c5706=_0x1d2fe5,_0x1b2916=this['allMembers']();for(const _0xee2b41 of _0x1b2916){if(!_0xee2b41)continue;_0xee2b41[_0x5c5706(0x342)]();}},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x342)]=function(){const _0x82e92e=_0x1d2fe5,_0x207b14=this[_0x82e92e(0x31b)]()[_0x82e92e(0x2d3)];for(let _0x38a654=0x0;_0x38a654<_0x207b14;_0x38a654++){const _0x4dfb7d=this[_0x82e92e(0x3d9)][_0x38a654];if(!_0x4dfb7d)continue;const _0x14cf89=_0x4dfb7d[_0x82e92e(0x586)]();if(!DataManager[_0x82e92e(0x526)](_0x14cf89))continue;let _0xf44b3e=DataManager[_0x82e92e(0x5dc)](_0x14cf89);this[_0x82e92e(0x49c)](_0x14cf89,_0xf44b3e)?(this[_0x82e92e(0x3d9)][_0x38a654][_0x82e92e(0x1d2)](_0xf44b3e),this['refresh']()):this[_0x82e92e(0x4e4)](_0x38a654,null);}},Game_Actor['prototype'][_0x1d2fe5(0x49c)]=function(_0x23c815,_0x2aa34a){const _0x3cd3d8=_0x1d2fe5;if(_0x23c815===_0x2aa34a)return![];const _0x526b16=DataManager[_0x3cd3d8(0x3e6)](_0x2aa34a);if(!_0x526b16[_0x3cd3d8(0x382)](_0x23c815[_0x3cd3d8(0x473)]))return![];if(DataManager[_0x3cd3d8(0x415)](_0x2aa34a))return this['isEquipWtypeOk'](_0x2aa34a[_0x3cd3d8(0x2ef)]);else{if(DataManager[_0x3cd3d8(0x1f8)](_0x2aa34a))return this[_0x3cd3d8(0x3c7)](_0x2aa34a[_0x3cd3d8(0x2d2)]);}return![];},TextManager[_0x1d2fe5(0x2b8)]={'helpDesc':{'equip':VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x478)][_0x1d2fe5(0x385)][_0x1d2fe5(0x2b9)]??_0x1d2fe5(0x4d0),'optimize':VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x478)][_0x1d2fe5(0x385)]['optimizeCmdDesc']??_0x1d2fe5(0x547),'clear':VisuMZ[_0x1d2fe5(0x39f)]['Settings'][_0x1d2fe5(0x385)][_0x1d2fe5(0x288)]??_0x1d2fe5(0x444)}},ColorManager['getItemColor']=function(_0x198e84){const _0xe6846d=_0x1d2fe5;if(!_0x198e84)return this['normalColor']();else{if(_0x198e84['note']['match'](/<COLOR:[ ](\d+)>/i))return this[_0xe6846d(0x3ae)](Number(RegExp['$1'])[_0xe6846d(0x36a)](0x0,0x1f));else return _0x198e84['note'][_0xe6846d(0x26a)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x1d2fe5(0x3fc)]=function(_0x4656d5){const _0x1b5790=_0x1d2fe5;return _0x4656d5=String(_0x4656d5),_0x4656d5[_0x1b5790(0x26a)](/#(.*)/i)?_0x1b5790(0x33d)[_0x1b5790(0x44f)](String(RegExp['$1'])):this[_0x1b5790(0x3ae)](Number(_0x4656d5));},SceneManager[_0x1d2fe5(0x2e7)]=function(){const _0x12fa0e=_0x1d2fe5;return this[_0x12fa0e(0x285)]&&this[_0x12fa0e(0x285)][_0x12fa0e(0x593)]===Scene_Shop;},Game_Temp[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x399)]=function(){const _0x2fa02e=_0x1d2fe5;if(this[_0x2fa02e(0x40a)])return![];return VisuMZ[_0x2fa02e(0x39f)]['Settings'][_0x2fa02e(0x358)][_0x2fa02e(0x344)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ['ItemsEquipsCore']['Settings'][_0x1d2fe5(0x2f2)][_0x1d2fe5(0x2d7)],VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x42a)]=Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x529)],Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x529)]=function(_0x786782){const _0x10052c=_0x1d2fe5;return this[_0x10052c(0x265)]?this[_0x10052c(0x3c9)]?VisuMZ[_0x10052c(0x2d5)]:0x1:VisuMZ[_0x10052c(0x39f)]['Game_BattlerBase_param'][_0x10052c(0x4e5)](this,_0x786782);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x508)]=Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x357)],Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x357)]=function(_0x12f940){const _0x32386f=_0x1d2fe5;if(!_0x12f940)return![];if(!VisuMZ['ItemsEquipsCore']['Game_BattlerBase_meetsItemConditions'][_0x32386f(0x4e5)](this,_0x12f940))return![];if(!this['meetsItemConditionsNotetags'](_0x12f940))return![];if(!this[_0x32386f(0x318)](_0x12f940))return![];return!![];},Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x230)]=function(_0xb1f8ea){const _0x3874d3=_0x1d2fe5;if(!this[_0x3874d3(0x262)](_0xb1f8ea))return![];return!![];},Game_BattlerBase['prototype'][_0x1d2fe5(0x262)]=function(_0x37c29e){const _0x48f74c=_0x1d2fe5,_0x15e696=_0x37c29e[_0x48f74c(0x3f8)];if(_0x15e696[_0x48f74c(0x26a)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x543044=JSON[_0x48f74c(0x567)]('['+RegExp['$1'][_0x48f74c(0x26a)](/\d+/g)+']');for(const _0x1cd530 of _0x543044){if(!$gameSwitches[_0x48f74c(0x575)](_0x1cd530))return![];}return!![];}if(_0x15e696[_0x48f74c(0x26a)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2da041=JSON[_0x48f74c(0x567)]('['+RegExp['$1'][_0x48f74c(0x26a)](/\d+/g)+']');for(const _0xfd691a of _0x2da041){if(!$gameSwitches[_0x48f74c(0x575)](_0xfd691a))return![];}return!![];}if(_0x15e696[_0x48f74c(0x26a)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x364cb8=JSON[_0x48f74c(0x567)]('['+RegExp['$1'][_0x48f74c(0x26a)](/\d+/g)+']');for(const _0x3e0047 of _0x364cb8){if($gameSwitches[_0x48f74c(0x575)](_0x3e0047))return!![];}return![];}if(_0x15e696[_0x48f74c(0x26a)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a6dd2=JSON[_0x48f74c(0x567)]('['+RegExp['$1'][_0x48f74c(0x26a)](/\d+/g)+']');for(const _0xdecd40 of _0x2a6dd2){if(!$gameSwitches['value'](_0xdecd40))return!![];}return![];}if(_0x15e696['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x82ab4=JSON['parse']('['+RegExp['$1'][_0x48f74c(0x26a)](/\d+/g)+']');for(const _0x175ad1 of _0x82ab4){if(!$gameSwitches[_0x48f74c(0x575)](_0x175ad1))return!![];}return![];}if(_0x15e696['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xb8be2d=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3db6d5 of _0xb8be2d){if($gameSwitches[_0x48f74c(0x575)](_0x3db6d5))return![];}return!![];}return!![];},Game_BattlerBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x318)]=function(_0x4b9351){const _0x53c4a7=_0x1d2fe5,_0x216ec=_0x4b9351['note'],_0x24caf9=VisuMZ[_0x53c4a7(0x39f)][_0x53c4a7(0x328)];return _0x24caf9[_0x4b9351['id']]?_0x24caf9[_0x4b9351['id']][_0x53c4a7(0x4e5)](this,_0x4b9351):!![];},Game_Actor[_0x1d2fe5(0x3dc)]['initEquips']=function(_0x2f75f8){const _0x4c8623=_0x1d2fe5;_0x2f75f8=this[_0x4c8623(0x1ec)](_0x2f75f8);const _0x110c88=this['equipSlots']();this[_0x4c8623(0x3d9)]=[];for(let _0x4a7531=0x0;_0x4a7531<_0x110c88[_0x4c8623(0x2d3)];_0x4a7531++){this[_0x4c8623(0x3d9)][_0x4a7531]=new Game_Item();}for(let _0x2f42a5=0x0;_0x2f42a5<_0x110c88[_0x4c8623(0x2d3)];_0x2f42a5++){const _0x34a31e=_0x110c88[_0x2f42a5],_0x3489c0=this['getMatchingInitEquip'](_0x2f75f8,_0x34a31e);if(this['canEquip'](_0x3489c0))this['_equips'][_0x2f42a5][_0x4c8623(0x1d2)](_0x3489c0);}this[_0x4c8623(0x2bb)](!![]),this['refresh']();},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1ec)]=function(_0x23956b){const _0x1b3f25=_0x1d2fe5,_0x1869a1=[];for(let _0x568cd3=0x0;_0x568cd3<_0x23956b['length'];_0x568cd3++){const _0x4afadf=_0x23956b[_0x568cd3];if(_0x4afadf<=0x0)continue;const _0x2526d5=$dataSystem['equipTypes'][_0x568cd3+0x1];if(_0x2526d5===$dataSystem[_0x1b3f25(0x39d)][0x1]||_0x568cd3===0x1&&this['isDualWield']())_0x1869a1[_0x1b3f25(0x334)]($dataWeapons[_0x4afadf]);else{if(BattleManager[_0x1b3f25(0x42c)]()){const _0x44261b=$dataArmors[_0x4afadf];_0x44261b&&_0x44261b['etypeId']===_0x568cd3+0x1&&_0x1869a1[_0x1b3f25(0x334)](_0x44261b);}else{const _0x45c7cf=$dataArmors[_0x4afadf];_0x45c7cf&&_0x45c7cf[_0x1b3f25(0x473)]===_0x568cd3+0x1&&_0x1869a1[_0x1b3f25(0x334)](_0x45c7cf);}}}return _0x1869a1;},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x487)]=function(_0x3aee73,_0x1e325b){const _0x33c193=_0x1d2fe5;for(const _0x4275f9 of _0x3aee73){if(!_0x4275f9)continue;if(_0x4275f9[_0x33c193(0x473)]===_0x1e325b)return _0x3aee73['splice'](_0x3aee73['indexOf'](_0x4275f9),0x1),_0x4275f9;}return null;},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x31b)]=function(){const _0x55aeb8=_0x1d2fe5,_0x4297ed=VisuMZ[_0x55aeb8(0x39f)][_0x55aeb8(0x4d6)](this[_0x55aeb8(0x3d5)]||this[_0x55aeb8(0x311)]()[_0x55aeb8(0x31b)]);if(_0x4297ed[_0x55aeb8(0x2d3)]>=0x2&&this[_0x55aeb8(0x514)]())_0x4297ed[0x1]=0x1;return _0x4297ed;},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3b9)]=function(_0x4a353c){const _0x4e9a3f=_0x1d2fe5;_0x4a353c['remove'](0x0),_0x4a353c[_0x4e9a3f(0x3fb)](-0x1),this[_0x4e9a3f(0x3d5)]=_0x4a353c,this[_0x4e9a3f(0x449)](),this[_0x4e9a3f(0x4c9)]();},Game_Actor[_0x1d2fe5(0x3dc)]['forceResetEquipSlots']=function(){const _0x30cf60=_0x1d2fe5;this['_forcedSlots']=undefined,this[_0x30cf60(0x449)](),this[_0x30cf60(0x4c9)]();},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4c9)]=function(){const _0x193c01=_0x1d2fe5;let _0xc69145=this[_0x193c01(0x31b)]()[_0x193c01(0x2d3)];while(this[_0x193c01(0x3d9)]['length']>_0xc69145){const _0x2578f1=this[_0x193c01(0x3d9)][this['_equips'][_0x193c01(0x2d3)]-0x1];_0x2578f1&&_0x2578f1[_0x193c01(0x586)]()&&$gameParty[_0x193c01(0x389)](_0x2578f1['object'](),0x1),this[_0x193c01(0x3d9)][_0x193c01(0x3db)]();}while(_0xc69145>this[_0x193c01(0x3d9)][_0x193c01(0x2d3)]){this['_equips']['push'](new Game_Item());}},Game_Actor['prototype'][_0x1d2fe5(0x356)]=function(){const _0x3d07a0=_0x1d2fe5,_0x5d9372=this[_0x3d07a0(0x31b)]();for(let _0x19fc46=0x0;_0x19fc46<_0x5d9372[_0x3d07a0(0x2d3)];_0x19fc46++){if(!this[_0x3d07a0(0x3d9)][_0x19fc46])this[_0x3d07a0(0x3d9)][_0x19fc46]=new Game_Item();}this[_0x3d07a0(0x2bb)](![]),this[_0x3d07a0(0x449)]();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x573)]=Game_Actor[_0x1d2fe5(0x3dc)]['changeEquip'],Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4e4)]=function(_0x4abe3b,_0x2da6fd){const _0x170c3f=_0x1d2fe5;if(!this[_0x170c3f(0x28f)]){const _0x2dd023=JsonEx[_0x170c3f(0x4e1)](this);_0x2dd023[_0x170c3f(0x28f)]=!![],this[_0x170c3f(0x515)](_0x4abe3b,_0x2da6fd),this[_0x170c3f(0x1e8)](_0x2dd023);}else this['changeEquipBase'](_0x4abe3b,_0x2da6fd);},Game_Actor[_0x1d2fe5(0x3dc)]['changeEquipBase']=function(_0x4a5019,_0x341876){const _0x584bdb=_0x1d2fe5;if(!this[_0x584bdb(0x1ca)](_0x341876,this[_0x584bdb(0x3e8)]()[_0x4a5019]))return;if(_0x341876){const _0x1d99e3=DataManager[_0x584bdb(0x3e6)](_0x341876);if(!_0x1d99e3[_0x584bdb(0x382)](this[_0x584bdb(0x31b)]()[_0x4a5019]))return;}this[_0x584bdb(0x3d9)][_0x4a5019][_0x584bdb(0x1d2)](_0x341876);if(VisuMZ[_0x584bdb(0x39f)][_0x584bdb(0x4db)](_0x341876)){const _0x1f307e=VisuMZ[_0x584bdb(0x39f)]['Settings'][_0x584bdb(0x385)][_0x584bdb(0x258)]||'',_0x4a1074=this[_0x584bdb(0x36f)](),_0x152269=_0x584bdb(0x54d)[_0x584bdb(0x44f)](_0x341876[_0x584bdb(0x38b)]),_0x1c4bde=_0x341876['name']||'';let _0x346bfc=_0x1f307e['format'](_0x4a1074,_0x152269,_0x1c4bde);if(VisuMZ[_0x584bdb(0x1eb)]['version']>=1.79&&_0x346bfc[_0x584bdb(0x2d3)]>0x0)$textPopup(_0x346bfc);}this[_0x584bdb(0x449)]();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x4db)]=function(_0x4e83e2){const _0x30f853=_0x1d2fe5;if(!_0x4e83e2)return![];if(!Imported[_0x30f853(0x5bb)])return![];if(VisuMZ[_0x30f853(0x1eb)][_0x30f853(0x2ba)]<1.79)return![];return DataManager['isCursedItem'](_0x4e83e2);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x3b7)]=Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x53c)],Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x53c)]=function(_0x32125e,_0x3ccc39){const _0xc0564e=_0x1d2fe5;if(!this[_0xc0564e(0x28f)]){const _0x3367c5=JsonEx[_0xc0564e(0x4e1)](this);_0x3367c5[_0xc0564e(0x28f)]=!![],VisuMZ[_0xc0564e(0x39f)][_0xc0564e(0x3b7)]['call'](this,_0x32125e,_0x3ccc39),this['equipAdjustHpMp'](_0x3367c5);}else VisuMZ[_0xc0564e(0x39f)][_0xc0564e(0x3b7)][_0xc0564e(0x4e5)](this,_0x32125e,_0x3ccc39);},VisuMZ[_0x1d2fe5(0x39f)]['Game_Actor_discardEquip']=Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4fb)],Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4fb)]=function(_0x1aa514){const _0x4d3b3d=_0x1d2fe5;if(!this['_tempActor']){const _0x5b912a=JsonEx[_0x4d3b3d(0x4e1)](this);_0x5b912a['_tempActor']=!![],VisuMZ[_0x4d3b3d(0x39f)][_0x4d3b3d(0x1cf)][_0x4d3b3d(0x4e5)](this,_0x1aa514),this[_0x4d3b3d(0x1e8)](_0x5b912a);}else VisuMZ[_0x4d3b3d(0x39f)][_0x4d3b3d(0x1cf)][_0x4d3b3d(0x4e5)](this,_0x1aa514);},Game_Actor['prototype']['releaseUnequippableItems']=function(_0x219e1a){const _0x274902=_0x1d2fe5;if(this[_0x274902(0x4f6)])return;let _0x51c14b=0x0;for(;;){_0x51c14b++;if(_0x51c14b>0x3)break;const _0x283b6a=this[_0x274902(0x31b)](),_0x208929=this[_0x274902(0x3e8)](),_0x28e112=_0x208929['length'];let _0xc7f13=![];for(let _0x36cf26=0x0;_0x36cf26<_0x28e112;_0x36cf26++){const _0x3c7884=_0x208929[_0x36cf26];if(!_0x3c7884)continue;const _0x5063c8=DataManager[_0x274902(0x3e6)](_0x3c7884);if(!this[_0x274902(0x54f)](_0x3c7884)||!_0x5063c8[_0x274902(0x382)](_0x283b6a[_0x36cf26])){!_0x219e1a&&this[_0x274902(0x1ca)](null,_0x3c7884);if(!this[_0x274902(0x28f)]){const _0x4335fc=JsonEx[_0x274902(0x4e1)](this);_0x4335fc[_0x274902(0x28f)]=!![],this[_0x274902(0x3d9)][_0x36cf26][_0x274902(0x1d2)](null),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=!![],this[_0x274902(0x1e8)](_0x4335fc),this[_0x274902(0x4f6)]=undefined;}else{if(this[_0x274902(0x3d9)][_0x36cf26])this[_0x274902(0x3d9)][_0x36cf26][_0x274902(0x1d2)](null);else continue;}_0xc7f13=!![];}}if(!_0xc7f13)break;}},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1e8)]=function(_0x241009){const _0x2a6fa3=_0x1d2fe5;if(this[_0x2a6fa3(0x28f)])return;if(!VisuMZ[_0x2a6fa3(0x39f)][_0x2a6fa3(0x478)]['EquipScene'][_0x2a6fa3(0x43f)])return;const _0x2ffa06=Math[_0x2a6fa3(0x4a8)](_0x241009[_0x2a6fa3(0x35b)]()*this[_0x2a6fa3(0x542)]),_0x521364=Math['round'](_0x241009['mpRate']()*this[_0x2a6fa3(0x268)]);if(this['hp']>0x0)this[_0x2a6fa3(0x590)](_0x2ffa06);if(this['mp']>0x0)this[_0x2a6fa3(0x451)](_0x521364);},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x43c)]=function(){const _0x253eec=_0x1d2fe5,_0x5162e9=this[_0x253eec(0x31b)]()[_0x253eec(0x2d3)];for(let _0x4fd8e2=0x0;_0x4fd8e2<_0x5162e9;_0x4fd8e2++){if(this[_0x253eec(0x501)](_0x4fd8e2))this[_0x253eec(0x4e4)](_0x4fd8e2,null);}},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x501)]=function(_0xcaa6a4){const _0x49316b=_0x1d2fe5;return this[_0x49316b(0x570)]()[_0x49316b(0x382)](this['equipSlots']()[_0xcaa6a4])?![]:this['isEquipChangeOk'](_0xcaa6a4);},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x570)]=function(){const _0x41a7cb=_0x1d2fe5;return VisuMZ[_0x41a7cb(0x39f)][_0x41a7cb(0x478)][_0x41a7cb(0x385)]['NonRemoveETypes'];},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x327)]=function(){const _0x143b3f=_0x1d2fe5,_0x463ba2=this[_0x143b3f(0x31b)]()[_0x143b3f(0x2d3)];for(let _0x5958f9=0x0;_0x5958f9<_0x463ba2;_0x5958f9++){if(this[_0x143b3f(0x38e)](_0x5958f9))this[_0x143b3f(0x4e4)](_0x5958f9,null);}for(let _0x575b2a=0x0;_0x575b2a<_0x463ba2;_0x575b2a++){if(this[_0x143b3f(0x38e)](_0x575b2a))this[_0x143b3f(0x4e4)](_0x575b2a,this['bestEquipItem'](_0x575b2a));}},Game_Actor[_0x1d2fe5(0x3dc)]['bestEquipItem']=function(_0x2c37a9){const _0x29217f=_0x1d2fe5,_0x3b7d8f=this['equipSlots']()[_0x2c37a9],_0x188a95=$gameParty[_0x29217f(0x43e)]()[_0x29217f(0x21a)](_0x41844c=>DataManager[_0x29217f(0x3e6)](_0x41844c)[_0x29217f(0x382)](_0x3b7d8f)&&this[_0x29217f(0x54f)](_0x41844c)&&!DataManager[_0x29217f(0x526)](_0x41844c));let _0x23b1d8=null,_0x11a17a=-0x3e8;for(let _0x14716c=0x0;_0x14716c<_0x188a95['length'];_0x14716c++){const _0x431166=this[_0x29217f(0x2cb)](_0x188a95[_0x14716c]);_0x431166>_0x11a17a&&(_0x11a17a=_0x431166,_0x23b1d8=_0x188a95[_0x14716c]);}return _0x23b1d8;},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x38e)]=function(_0x16a553){const _0x142298=_0x1d2fe5;return this[_0x142298(0x310)]()[_0x142298(0x382)](this[_0x142298(0x31b)]()[_0x16a553])?![]:this[_0x142298(0x5a3)](_0x16a553);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x489)]=Game_Actor[_0x1d2fe5(0x3dc)]['isEquipChangeOk'],Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5a3)]=function(_0x5297d4){const _0x10d08e=_0x1d2fe5,_0x39d11b=this['_equips'][_0x5297d4];if(_0x39d11b){const _0x14c44c=_0x39d11b[_0x10d08e(0x586)]();if(DataManager['isCursedItem'](_0x14c44c))return![];}return VisuMZ[_0x10d08e(0x39f)][_0x10d08e(0x489)][_0x10d08e(0x4e5)](this,_0x5297d4);},Game_Actor['prototype'][_0x1d2fe5(0x310)]=function(){const _0x480aa0=_0x1d2fe5;return VisuMZ[_0x480aa0(0x39f)][_0x480aa0(0x478)][_0x480aa0(0x385)][_0x480aa0(0x59f)];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x212)]=Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1ca)],Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1ca)]=function(_0x3530db,_0x3d3158){const _0x36115d=_0x1d2fe5;if(this[_0x36115d(0x28f)])return![];$gameTemp[_0x36115d(0x40a)]=!![];const _0x593f44=VisuMZ[_0x36115d(0x39f)]['Game_Actor_tradeItemWithParty'][_0x36115d(0x4e5)](this,_0x3530db,_0x3d3158);return $gameTemp[_0x36115d(0x40a)]=![],_0x593f44;},Game_Actor['prototype'][_0x1d2fe5(0x55c)]=function(_0x121d20,_0x246882){const _0x995a86=_0x1d2fe5,_0x53e762=this['getNextAvailableEtypeId'](_0x121d20);if(_0x53e762<0x0)return;const _0x5111b9=_0x121d20===0x1?$dataWeapons[_0x246882]:$dataArmors[_0x246882];this[_0x995a86(0x4e4)](_0x53e762,_0x5111b9);},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x463)]=function(_0x34ae67){const _0x4a0632=_0x1d2fe5;let _0x21de21=0x0;const _0x2d9606=this['equipSlots'](),_0x27578c=this[_0x4a0632(0x3e8)]();for(let _0xf7001f=0x0;_0xf7001f<_0x2d9606[_0x4a0632(0x2d3)];_0xf7001f++){if(_0x2d9606[_0xf7001f]===_0x34ae67){_0x21de21=_0xf7001f;if(!_0x27578c[_0xf7001f])return _0x21de21;}}return _0x21de21;},VisuMZ[_0x1d2fe5(0x39f)]['Game_Actor_paramPlus']=Game_Actor['prototype']['paramPlus'],Game_Actor['prototype'][_0x1d2fe5(0x3ec)]=function(_0x2e97a2){const _0x25d0b3=_0x1d2fe5;let _0x1599ee=VisuMZ['ItemsEquipsCore'][_0x25d0b3(0x2b4)]['call'](this,_0x2e97a2);for(const _0x530895 of this['equips']()){if(_0x530895)_0x1599ee+=this[_0x25d0b3(0x524)](_0x530895,_0x2e97a2);}return _0x1599ee;},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x524)]=function(_0x4b01bb,_0x531202){const _0x261e10=_0x1d2fe5;if(this['_calculatingJSParameters'])return 0x0;const _0x3091e5=(DataManager[_0x261e10(0x415)](_0x4b01bb)?_0x261e10(0x343):_0x261e10(0x4c7))[_0x261e10(0x44f)](_0x4b01bb['id']),_0x5afec1='%1-%2'[_0x261e10(0x44f)](_0x3091e5,_0x531202);if(VisuMZ['ItemsEquipsCore'][_0x261e10(0x585)][_0x5afec1]){this['_calculatingJSParameters']=!![];const _0x363a48=VisuMZ[_0x261e10(0x39f)][_0x261e10(0x585)][_0x5afec1][_0x261e10(0x4e5)](this,_0x4b01bb,_0x531202);return this[_0x261e10(0x30b)]=![],_0x363a48;}else return 0x0;},Game_Actor['prototype'][_0x1d2fe5(0x242)]=function(_0x1010a5){const _0x261cd5=_0x1d2fe5;this[_0x261cd5(0x265)]=!![],this[_0x261cd5(0x3c9)]=_0x1010a5;},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x5cf)]=Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x376)],Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x376)]=function(){const _0x49bffe=_0x1d2fe5;VisuMZ[_0x49bffe(0x39f)][_0x49bffe(0x5cf)][_0x49bffe(0x4e5)](this),this[_0x49bffe(0x5d2)](),this['initShopTrackingData']();},Game_Party['prototype'][_0x1d2fe5(0x5d2)]=function(){const _0x94279d=_0x1d2fe5;this[_0x94279d(0x2fb)]=[];},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x27e)]=function(_0x130823){const _0x1b7dd2=_0x1d2fe5;if(!$gameTemp[_0x1b7dd2(0x399)]())return![];if(this[_0x1b7dd2(0x2fb)]===undefined)this[_0x1b7dd2(0x5d2)]();let _0x496848='';if(DataManager['isItem'](_0x130823))_0x496848=_0x1b7dd2(0x406)[_0x1b7dd2(0x44f)](_0x130823['id']);else{if(DataManager['isWeapon'](_0x130823))_0x496848=_0x1b7dd2(0x550)[_0x1b7dd2(0x44f)](_0x130823['id']);else{if(DataManager[_0x1b7dd2(0x1f8)](_0x130823))_0x496848=_0x1b7dd2(0x34e)['format'](_0x130823['id']);else return;}}return this[_0x1b7dd2(0x2fb)][_0x1b7dd2(0x382)](_0x496848);},Game_Party[_0x1d2fe5(0x3dc)]['setNewItem']=function(_0x1abd21){const _0x171826=_0x1d2fe5;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x171826(0x2fb)]===undefined)this[_0x171826(0x5d2)]();let _0x2204a9='';if(DataManager[_0x171826(0x36e)](_0x1abd21))_0x2204a9=_0x171826(0x406)['format'](_0x1abd21['id']);else{if(DataManager[_0x171826(0x415)](_0x1abd21))_0x2204a9='weapon-%1'[_0x171826(0x44f)](_0x1abd21['id']);else{if(DataManager[_0x171826(0x1f8)](_0x1abd21))_0x2204a9='armor-%1'[_0x171826(0x44f)](_0x1abd21['id']);else return;}}if(!this[_0x171826(0x2fb)][_0x171826(0x382)](_0x2204a9))this['_newItemsList']['push'](_0x2204a9);},Game_Party[_0x1d2fe5(0x3dc)]['clearNewItem']=function(_0x3dd27e){const _0x335f59=_0x1d2fe5;if(!$gameTemp[_0x335f59(0x399)]())return;if(this['_newItemsList']===undefined)this['initNewItemsList']();let _0x335ca1='';if(DataManager[_0x335f59(0x36e)](_0x3dd27e))_0x335ca1=_0x335f59(0x406)['format'](_0x3dd27e['id']);else{if(DataManager[_0x335f59(0x415)](_0x3dd27e))_0x335ca1=_0x335f59(0x550)[_0x335f59(0x44f)](_0x3dd27e['id']);else{if(DataManager[_0x335f59(0x1f8)](_0x3dd27e))_0x335ca1='armor-%1'[_0x335f59(0x44f)](_0x3dd27e['id']);else return;}}this[_0x335f59(0x2fb)][_0x335f59(0x382)](_0x335ca1)&&this[_0x335f59(0x2fb)][_0x335f59(0x5b8)](this[_0x335f59(0x2fb)][_0x335f59(0x338)](_0x335ca1),0x1);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x5bd)]=Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x282)],Game_Party['prototype'][_0x1d2fe5(0x282)]=function(_0x128df1){const _0x417868=_0x1d2fe5;if(DataManager[_0x417868(0x57b)](_0x128df1))_0x128df1=DataManager['getProxyItem'](_0x128df1);return VisuMZ[_0x417868(0x39f)][_0x417868(0x5bd)][_0x417868(0x4e5)](this,_0x128df1);},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x4ad)]=Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x389)],Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x389)]=function(_0x42d3e6,_0x544e2c,_0x4a2bbd){const _0x30b953=_0x1d2fe5;if(DataManager[_0x30b953(0x57b)](_0x42d3e6))_0x42d3e6=null;const _0x35dbf4=this[_0x30b953(0x282)](_0x42d3e6);VisuMZ[_0x30b953(0x39f)][_0x30b953(0x4ad)][_0x30b953(0x4e5)](this,_0x42d3e6,_0x544e2c,_0x4a2bbd);if(this[_0x30b953(0x282)](_0x42d3e6)>_0x35dbf4)this[_0x30b953(0x58a)](_0x42d3e6);},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4f5)]=function(_0x143ca2){const _0x30c020=_0x1d2fe5;if(DataManager[_0x30c020(0x57b)](_0x143ca2))_0x143ca2=DataManager[_0x30c020(0x3b5)](_0x143ca2);return DataManager[_0x30c020(0x44d)](_0x143ca2);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x239)]=Game_Party[_0x1d2fe5(0x3dc)]['consumeItem'],Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x539)]=function(_0x3684c8){const _0x151572=_0x1d2fe5;if(_0x3684c8){const _0x3b073f=_0x3684c8['note']||'';if(_0x3b073f[_0x151572(0x26a)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x43748c=Number(RegExp['$1'])*0.01;if(Math[_0x151572(0x2e6)]()<_0x43748c)return;}}VisuMZ['ItemsEquipsCore'][_0x151572(0x239)]['call'](this,_0x3684c8);},Game_Party['prototype'][_0x1d2fe5(0x549)]=function(){this['_shopTrackingData']={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4c1)]=function(){const _0x438081=_0x1d2fe5;return this['_shopTrackingData']===undefined&&this[_0x438081(0x549)](),this[_0x438081(0x1f3)];},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3b2)]=function(_0x48d884,_0x5dc11d){const _0x5245b7=_0x1d2fe5;if(!_0x5dc11d)return 0x0;this[_0x5245b7(0x1f3)]===undefined&&this['initShopTrackingData']();const _0x332240=this[_0x5245b7(0x4c1)]();if(!_0x332240[_0x48d884])return 0x0;if(_0x5dc11d===_0x5245b7(0x3fe))return _0x332240[_0x48d884][_0x5245b7(0x3fe)]=_0x332240[_0x48d884][_0x5245b7(0x3fe)]||0x0,_0x332240[_0x48d884][_0x5245b7(0x3fe)];else{if(DataManager[_0x5245b7(0x36e)](_0x5dc11d))key=_0x5245b7(0x406)[_0x5245b7(0x44f)](_0x5dc11d['id']);else{if(DataManager[_0x5245b7(0x415)](_0x5dc11d))key=_0x5245b7(0x550)[_0x5245b7(0x44f)](_0x5dc11d['id']);else{if(DataManager['isArmor'](_0x5dc11d))key=_0x5245b7(0x34e)[_0x5245b7(0x44f)](_0x5dc11d['id']);else return 0x0;}}}return _0x332240[_0x48d884][_0x5245b7(0x3ac)][key]=_0x332240[_0x48d884][_0x5245b7(0x3ac)][key]||0x0,_0x332240[_0x48d884][_0x5245b7(0x3ac)][key];},Game_Party[_0x1d2fe5(0x3dc)]['getShopTrackingItemBuy']=function(_0x5653c1){return this['getShopTrackingItem']('buy',_0x5653c1);},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x49f)]=function(_0x5e75e0){const _0x51d4c2=_0x1d2fe5;return this[_0x51d4c2(0x3b2)](_0x51d4c2(0x1d6),_0x5e75e0);},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4ca)]=function(){const _0x254b90=_0x1d2fe5;return this[_0x254b90(0x3b2)](_0x254b90(0x3bf),_0x254b90(0x3fe));},Game_Party[_0x1d2fe5(0x3dc)]['getShopTrackingGoldSell']=function(){const _0x2f09f6=_0x1d2fe5;return this[_0x2f09f6(0x3b2)](_0x2f09f6(0x1d6),_0x2f09f6(0x3fe));},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2e9)]=function(_0x33bdcb,_0xb36a02,_0x10740c){const _0x76c595=_0x1d2fe5;if(!_0xb36a02)return;if(_0x10740c<=0x0)return;this['_shopTrackingData']===undefined&&this[_0x76c595(0x549)]();const _0x13dc57=this[_0x76c595(0x4c1)]();if(!_0x13dc57[_0x33bdcb])return;if(_0xb36a02===_0x76c595(0x3fe)){_0x13dc57[_0x33bdcb][_0x76c595(0x3fe)]=_0x13dc57[_0x33bdcb][_0x76c595(0x3fe)]||0x0,_0x13dc57[_0x33bdcb][_0x76c595(0x3fe)]+=_0x10740c;return;}else{if(DataManager[_0x76c595(0x36e)](_0xb36a02))key=_0x76c595(0x406)[_0x76c595(0x44f)](_0xb36a02['id']);else{if(DataManager['isWeapon'](_0xb36a02))key=_0x76c595(0x550)[_0x76c595(0x44f)](_0xb36a02['id']);else{if(DataManager[_0x76c595(0x1f8)](_0xb36a02))key=_0x76c595(0x34e)['format'](_0xb36a02['id']);else return;}}}_0x13dc57[_0x33bdcb][_0x76c595(0x3ac)][key]=_0x13dc57[_0x33bdcb][_0x76c595(0x3ac)][key]||0x0,_0x13dc57[_0x33bdcb][_0x76c595(0x3ac)][key]+=_0x10740c;},Game_Party[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2d4)]=function(_0x18892b,_0x59ba6d){this['addShopTrackingItem']('buy',_0x18892b,_0x59ba6d);},Game_Party['prototype'][_0x1d2fe5(0x51c)]=function(_0x2cd787,_0x7724b2){const _0x131282=_0x1d2fe5;this[_0x131282(0x2e9)](_0x131282(0x1d6),_0x2cd787,_0x7724b2);},Game_Party['prototype'][_0x1d2fe5(0x23d)]=function(_0x3dd0ab){const _0x5ea2ee=_0x1d2fe5;this['addShopTrackingItem'](_0x5ea2ee(0x3bf),_0x5ea2ee(0x3fe),_0x3dd0ab);},Game_Party[_0x1d2fe5(0x3dc)]['addShopTrackingGoldSell']=function(_0x41dd32){const _0x18d0ef=_0x1d2fe5;this[_0x18d0ef(0x2e9)](_0x18d0ef(0x1d6),_0x18d0ef(0x3fe),_0x41dd32);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x26c)]=Scene_ItemBase[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x208)],Scene_ItemBase[_0x1d2fe5(0x3dc)]['activateItemWindow']=function(){const _0x101b76=_0x1d2fe5;VisuMZ[_0x101b76(0x39f)]['Scene_ItemBase_activateItemWindow'][_0x101b76(0x4e5)](this),this[_0x101b76(0x246)][_0x101b76(0x3c8)]();},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x421)]=function(){const _0x4088a4=_0x1d2fe5;if(ConfigManager[_0x4088a4(0x598)]&&ConfigManager[_0x4088a4(0x372)]!==undefined)return ConfigManager[_0x4088a4(0x372)];else return this['isUseItemsEquipsCoreUpdatedLayout']()?this['updatedLayoutStyle']()[_0x4088a4(0x26a)](/LOWER/i):Scene_ItemBase[_0x4088a4(0x3dc)][_0x4088a4(0x421)][_0x4088a4(0x4e5)](this);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x577)]=function(){const _0x51da8f=_0x1d2fe5;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x51da8f(0x1e5)]!==undefined)return ConfigManager[_0x51da8f(0x1e5)];else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x51da8f(0x1fc)]()['match'](/RIGHT/i):Scene_ItemBase['prototype'][_0x51da8f(0x577)][_0x51da8f(0x4e5)](this);},Scene_Item['prototype']['updatedLayoutStyle']=function(){const _0x468647=_0x1d2fe5;return VisuMZ[_0x468647(0x39f)][_0x468647(0x478)][_0x468647(0x503)][_0x468647(0x45d)];},Scene_Item[_0x1d2fe5(0x3dc)]['isUseModernControls']=function(){const _0x2b4085=_0x1d2fe5;return this['_categoryWindow']&&this[_0x2b4085(0x37b)][_0x2b4085(0x2fc)]();},Scene_Item['prototype']['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x46b0de=_0x1d2fe5;return VisuMZ['ItemsEquipsCore']['Settings'][_0x46b0de(0x503)][_0x46b0de(0x4f2)];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x22d)]=Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x25c)],Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x25c)]=function(){const _0x343eb5=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x343eb5(0x22d)][_0x343eb5(0x4e5)](this),this[_0x343eb5(0x2fc)]()&&this['onCategoryOk']();},VisuMZ[_0x1d2fe5(0x39f)]['Scene_Item_helpWindowRect']=Scene_Item['prototype']['helpWindowRect'],Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2be)]=function(){const _0x2fa739=_0x1d2fe5;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x2fa739(0x39f)][_0x2fa739(0x50d)][_0x2fa739(0x4e5)](this);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x233)]=function(){const _0x478722=_0x1d2fe5,_0x3f74d3=0x0,_0x590703=this[_0x478722(0x306)](),_0x14157e=Graphics[_0x478722(0x518)],_0x2c2bb2=this[_0x478722(0x53a)]();return new Rectangle(_0x3f74d3,_0x590703,_0x14157e,_0x2c2bb2);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x20d)]=Scene_Item['prototype'][_0x1d2fe5(0x512)],Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x512)]=function(){const _0x25d8c3=_0x1d2fe5;VisuMZ[_0x25d8c3(0x39f)]['Scene_Item_createCategoryWindow'][_0x25d8c3(0x4e5)](this),this[_0x25d8c3(0x2fc)]()&&this[_0x25d8c3(0x4a5)]();},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4a5)]=function(){const _0x57ee88=_0x1d2fe5;delete this[_0x57ee88(0x37b)][_0x57ee88(0x4f1)]['ok'],delete this[_0x57ee88(0x37b)]['_handlers'][_0x57ee88(0x532)];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x4a6)]=Scene_Item[_0x1d2fe5(0x3dc)]['categoryWindowRect'],Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x43b)]=function(){const _0x37c454=_0x1d2fe5;return this[_0x37c454(0x2d8)]()?this[_0x37c454(0x2c1)]():VisuMZ['ItemsEquipsCore'][_0x37c454(0x4a6)][_0x37c454(0x4e5)](this);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2c1)]=function(){const _0x4faff8=_0x1d2fe5,_0x4f7a42=0x0,_0x309ac4=this['mainAreaTop'](),_0x3698fe=Graphics[_0x4faff8(0x518)],_0x2b10ff=this[_0x4faff8(0x3e2)](0x1,!![]);return new Rectangle(_0x4f7a42,_0x309ac4,_0x3698fe,_0x2b10ff);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x354)]=Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2e3)],Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2e3)]=function(){const _0x357dcc=_0x1d2fe5;VisuMZ[_0x357dcc(0x39f)][_0x357dcc(0x354)][_0x357dcc(0x4e5)](this),this[_0x357dcc(0x2fc)]()&&this[_0x357dcc(0x2eb)](),this[_0x357dcc(0x493)]()&&this['createStatusWindow']();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x425)]=Scene_Item[_0x1d2fe5(0x3dc)]['itemWindowRect'],Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x440)]=function(){const _0x325adb=_0x1d2fe5;if(this[_0x325adb(0x2d8)]())return this[_0x325adb(0x2a9)]();else{const _0x3869fa=VisuMZ[_0x325adb(0x39f)][_0x325adb(0x425)][_0x325adb(0x4e5)](this);return this['allowCreateStatusWindow']()&&this[_0x325adb(0x266)]()&&(_0x3869fa['width']-=this[_0x325adb(0x462)]()),_0x3869fa;}},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2a9)]=function(){const _0x429aac=_0x1d2fe5,_0x1f685d=this[_0x429aac(0x577)]()?this[_0x429aac(0x462)]():0x0,_0x51b14d=this[_0x429aac(0x37b)]['y']+this[_0x429aac(0x37b)][_0x429aac(0x548)],_0x1adab5=Graphics[_0x429aac(0x518)]-this[_0x429aac(0x462)](),_0x5a3e51=this[_0x429aac(0x1da)]()-_0x51b14d;return new Rectangle(_0x1f685d,_0x51b14d,_0x1adab5,_0x5a3e51);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2eb)]=function(){const _0x4ee749=_0x1d2fe5;this[_0x4ee749(0x246)][_0x4ee749(0x3d8)]('cancel',this[_0x4ee749(0x317)][_0x4ee749(0x2ec)](this));},Scene_Item['prototype'][_0x1d2fe5(0x493)]=function(){const _0x56f7c2=_0x1d2fe5;return this[_0x56f7c2(0x2d8)]()?!![]:VisuMZ[_0x56f7c2(0x39f)][_0x56f7c2(0x478)]['ItemScene'][_0x56f7c2(0x2d1)];},Scene_Item['prototype'][_0x1d2fe5(0x266)]=function(){const _0x8f585e=_0x1d2fe5;return VisuMZ[_0x8f585e(0x39f)][_0x8f585e(0x478)]['ItemScene']['ItemSceneAdjustItemList'];},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1cc)]=function(){const _0x60183b=_0x1d2fe5,_0x532eb8=this['statusWindowRect']();this[_0x60183b(0x4cb)]=new Window_ShopStatus(_0x532eb8),this['addWindow'](this['_statusWindow']),this['_itemWindow'][_0x60183b(0x301)](this[_0x60183b(0x4cb)]);const _0x1ce458=VisuMZ['ItemsEquipsCore'][_0x60183b(0x478)]['ItemScene'][_0x60183b(0x483)];this[_0x60183b(0x4cb)][_0x60183b(0x535)](_0x1ce458||0x0);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x384)]=function(){const _0x24f893=_0x1d2fe5;return this[_0x24f893(0x2d8)]()?this[_0x24f893(0x20f)]():VisuMZ['ItemsEquipsCore'][_0x24f893(0x478)]['ItemScene'][_0x24f893(0x5a0)][_0x24f893(0x4e5)](this);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x20f)]=function(){const _0x182614=_0x1d2fe5,_0x75124c=this[_0x182614(0x462)](),_0x3051ba=this['_itemWindow'][_0x182614(0x548)],_0x38de1e=this[_0x182614(0x577)]()?0x0:Graphics['boxWidth']-this[_0x182614(0x462)](),_0xf9c469=this[_0x182614(0x246)]['y'];return new Rectangle(_0x38de1e,_0xf9c469,_0x75124c,_0x3051ba);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x462)]=function(){const _0x1c86ca=_0x1d2fe5;return Scene_Shop[_0x1c86ca(0x3dc)][_0x1c86ca(0x462)]();},Scene_Item['prototype']['buttonAssistItemListRequirement']=function(){const _0x931b37=_0x1d2fe5;if(!this['updatedLayoutStyle']())return![];if(!this[_0x931b37(0x2fc)]())return![];if(!this['_itemWindow'])return![];if(!this[_0x931b37(0x246)][_0x931b37(0x589)])return![];return this[_0x931b37(0x1fc)]()&&this[_0x931b37(0x2fc)]();},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2f6)]=function(){const _0x403124=_0x1d2fe5;if(this['buttonAssistItemListRequirement']())return this[_0x403124(0x246)][_0x403124(0x4af)]()===0x1?TextManager[_0x403124(0x335)](_0x403124(0x393),_0x403124(0x5c0)):TextManager[_0x403124(0x335)](_0x403124(0x24c),_0x403124(0x1ef));return Scene_ItemBase[_0x403124(0x3dc)][_0x403124(0x2f6)]['call'](this);},Scene_Item[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4d4)]=function(){const _0x4b5515=_0x1d2fe5;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x4b5515(0x39f)][_0x4b5515(0x478)][_0x4b5515(0x503)]['buttonAssistCategory'];return Scene_ItemBase[_0x4b5515(0x3dc)][_0x4b5515(0x4d4)]['call'](this);},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x397)]=function(){const _0x459152=_0x1d2fe5;Scene_ItemBase[_0x459152(0x3dc)][_0x459152(0x397)][_0x459152(0x4e5)](this),this[_0x459152(0x4ed)]();},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x421)]=function(){const _0x5cede0=_0x1d2fe5;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x5cede0(0x372)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x5cede0(0x26a)](/LOWER/i);else Scene_MenuBase['prototype'][_0x5cede0(0x577)][_0x5cede0(0x4e5)](this);}},Scene_Equip['prototype']['isRightInputMode']=function(){const _0xded12f=_0x1d2fe5;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0xded12f(0x1e5)]!==undefined)return ConfigManager[_0xded12f(0x1e5)];else{if(this[_0xded12f(0x2d8)]())return this[_0xded12f(0x1fc)]()[_0xded12f(0x26a)](/RIGHT/i);else Scene_MenuBase[_0xded12f(0x3dc)]['isRightInputMode']['call'](this);}},Scene_Equip[_0x1d2fe5(0x3dc)]['updatedLayoutStyle']=function(){const _0x156d4a=_0x1d2fe5;return VisuMZ[_0x156d4a(0x39f)]['Settings'][_0x156d4a(0x385)][_0x156d4a(0x45d)];},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2fc)]=function(){const _0x56e024=_0x1d2fe5;return this[_0x56e024(0x538)]&&this['_commandWindow']['isUseModernControls']();},Scene_Equip[_0x1d2fe5(0x3dc)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x1cdfa1=_0x1d2fe5;return VisuMZ[_0x1cdfa1(0x39f)][_0x1cdfa1(0x478)][_0x1cdfa1(0x385)][_0x1cdfa1(0x4f2)];},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x5d3)]=Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x25c)],Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x25c)]=function(){const _0x1ae621=_0x1d2fe5;VisuMZ[_0x1ae621(0x39f)][_0x1ae621(0x5d3)][_0x1ae621(0x4e5)](this),this['isUseModernControls']()&&this[_0x1ae621(0x49a)]();},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x57a)]=Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2be)],Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2be)]=function(){const _0x41e74d=_0x1d2fe5;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x41e74d(0x233)]():VisuMZ['ItemsEquipsCore']['Scene_Equip_helpWindowRect'][_0x41e74d(0x4e5)](this);},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x233)]=function(){const _0x9d59a=_0x1d2fe5,_0xc27c7d=0x0,_0x4715a9=this[_0x9d59a(0x306)](),_0xe8368a=Graphics[_0x9d59a(0x518)],_0x4b20a3=this[_0x9d59a(0x53a)]();return new Rectangle(_0xc27c7d,_0x4715a9,_0xe8368a,_0x4b20a3);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x4df)]=Scene_Equip['prototype'][_0x1d2fe5(0x384)],Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x384)]=function(){const _0x135e8a=_0x1d2fe5;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x135e8a(0x20f)]():VisuMZ[_0x135e8a(0x39f)][_0x135e8a(0x4df)][_0x135e8a(0x4e5)](this);},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x20f)]=function(){const _0x3e0a8c=_0x1d2fe5,_0x52e20f=this[_0x3e0a8c(0x577)]()?0x0:Graphics[_0x3e0a8c(0x518)]-this[_0x3e0a8c(0x462)](),_0x540320=this[_0x3e0a8c(0x544)](),_0x3e07cb=this[_0x3e0a8c(0x462)](),_0xa300fb=this[_0x3e0a8c(0x57f)]();return new Rectangle(_0x52e20f,_0x540320,_0x3e07cb,_0xa300fb);},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x41e)]=Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5b7)],Scene_Equip[_0x1d2fe5(0x3dc)]['createCommandWindow']=function(){const _0x404522=_0x1d2fe5;VisuMZ[_0x404522(0x39f)][_0x404522(0x41e)][_0x404522(0x4e5)](this);if(this[_0x404522(0x4ef)])this[_0x404522(0x538)][_0x404522(0x3b8)](this['_helpWindow']);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x23c)]=Scene_Equip['prototype']['commandWindowRect'],Scene_Equip['prototype'][_0x1d2fe5(0x2e4)]=function(){const _0x645d7d=_0x1d2fe5;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x645d7d(0x46f)]():VisuMZ[_0x645d7d(0x39f)][_0x645d7d(0x23c)][_0x645d7d(0x4e5)](this);},Scene_Equip[_0x1d2fe5(0x3dc)]['shouldCommandWindowExist']=function(){const _0x43da3f=_0x1d2fe5,_0x185f33=VisuMZ['ItemsEquipsCore']['Settings'][_0x43da3f(0x385)];return _0x185f33[_0x43da3f(0x298)]||_0x185f33[_0x43da3f(0x427)];},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x46f)]=function(){const _0x20f96d=_0x1d2fe5,_0x4c5468=this[_0x20f96d(0x5b3)](),_0x59976b=this[_0x20f96d(0x577)]()?this[_0x20f96d(0x462)]():0x0,_0x11e8ac=this[_0x20f96d(0x544)](),_0xe68d31=Graphics[_0x20f96d(0x518)]-this['statusWidth'](),_0xf1318b=_0x4c5468?this[_0x20f96d(0x3e2)](0x1,!![]):0x0;return new Rectangle(_0x59976b,_0x11e8ac,_0xe68d31,_0xf1318b);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x22c)]=Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1f5)],Scene_Equip[_0x1d2fe5(0x3dc)]['createSlotWindow']=function(){const _0x4d3c1e=_0x1d2fe5;VisuMZ[_0x4d3c1e(0x39f)][_0x4d3c1e(0x22c)][_0x4d3c1e(0x4e5)](this),this[_0x4d3c1e(0x2fc)]()&&this[_0x4d3c1e(0x1c8)]();},VisuMZ[_0x1d2fe5(0x39f)]['Scene_Equip_slotWindowRect']=Scene_Equip['prototype']['slotWindowRect'],Scene_Equip['prototype'][_0x1d2fe5(0x3a5)]=function(){const _0x4f43b6=_0x1d2fe5;return this[_0x4f43b6(0x2d8)]()?this[_0x4f43b6(0x5c2)]():VisuMZ['ItemsEquipsCore'][_0x4f43b6(0x5cc)][_0x4f43b6(0x4e5)](this);},Scene_Equip['prototype'][_0x1d2fe5(0x5c2)]=function(){const _0x173963=_0x1d2fe5,_0x5bd229=this[_0x173963(0x2e4)](),_0x198d97=this[_0x173963(0x577)]()?this[_0x173963(0x462)]():0x0,_0x458bfe=_0x5bd229['y']+_0x5bd229[_0x173963(0x548)],_0x1b3773=Graphics[_0x173963(0x518)]-this['statusWidth'](),_0x4c8ad3=this[_0x173963(0x57f)]()-_0x5bd229[_0x173963(0x548)];return new Rectangle(_0x198d97,_0x458bfe,_0x1b3773,_0x4c8ad3);},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x309)]=Scene_Equip[_0x1d2fe5(0x3dc)]['itemWindowRect'],Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x440)]=function(){const _0x5d195d=_0x1d2fe5;return this[_0x5d195d(0x2d8)]()?this[_0x5d195d(0x3a5)]():VisuMZ['ItemsEquipsCore']['Scene_Equip_itemWindowRect'][_0x5d195d(0x4e5)](this);},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x462)]=function(){const _0x18ac3a=_0x1d2fe5;return this[_0x18ac3a(0x2d8)]()?this[_0x18ac3a(0x2ed)]():VisuMZ['ItemsEquipsCore'][_0x18ac3a(0x478)][_0x18ac3a(0x385)][_0x18ac3a(0x224)];},Scene_Equip['prototype']['geUpdatedLayoutStatusWidth']=function(){const _0x4c6b31=_0x1d2fe5;return Math['floor'](Graphics[_0x4c6b31(0x518)]/0x2);},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1c8)]=function(){const _0x472e74=_0x1d2fe5;this[_0x472e74(0x3e5)][_0x472e74(0x3d8)](_0x472e74(0x532),this[_0x472e74(0x317)]['bind'](this)),this[_0x472e74(0x3e5)][_0x472e74(0x3d8)]('pagedown',this[_0x472e74(0x40e)][_0x472e74(0x2ec)](this)),this[_0x472e74(0x3e5)][_0x472e74(0x3d8)](_0x472e74(0x24c),this[_0x472e74(0x442)]['bind'](this));},VisuMZ[_0x1d2fe5(0x39f)]['Scene_Equip_commandEquip']=Scene_Equip[_0x1d2fe5(0x3dc)]['commandEquip'],Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x49a)]=function(){const _0x1e5727=_0x1d2fe5;this[_0x1e5727(0x2fc)]()&&(this[_0x1e5727(0x538)][_0x1e5727(0x471)](),this['_commandWindow'][_0x1e5727(0x412)]()),VisuMZ[_0x1e5727(0x39f)]['Scene_Equip_commandEquip'][_0x1e5727(0x4e5)](this);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x5bc)]=Scene_Equip[_0x1d2fe5(0x3dc)]['onSlotOk'],Scene_Equip['prototype'][_0x1d2fe5(0x517)]=function(){const _0x1c5f2c=_0x1d2fe5;this[_0x1c5f2c(0x3e5)][_0x1c5f2c(0x5ce)]()>=0x0?(VisuMZ[_0x1c5f2c(0x39f)][_0x1c5f2c(0x5bc)][_0x1c5f2c(0x4e5)](this),this[_0x1c5f2c(0x5db)]()):(this[_0x1c5f2c(0x3e5)][_0x1c5f2c(0x302)](0x0),this[_0x1c5f2c(0x3e5)]['activate']());},Scene_Equip[_0x1d2fe5(0x3dc)]['onSlotOkAutoSelect']=function(){const _0x53c9e0=_0x1d2fe5;this['_itemWindow']['refresh']();const _0x4dae1e=this[_0x53c9e0(0x3e5)][_0x53c9e0(0x4f0)](),_0x312660=this[_0x53c9e0(0x246)][_0x53c9e0(0x3a2)]['indexOf'](_0x4dae1e),_0x266d42=Math[_0x53c9e0(0x331)](this[_0x53c9e0(0x246)]['maxVisibleItems']()/0x2)-0x1;this['_itemWindow']['smoothSelect'](_0x312660>=0x0?_0x312660:0x0),this[_0x53c9e0(0x246)][_0x53c9e0(0x417)]>0x1&&(this[_0x53c9e0(0x246)]['_scrollDuration']=0x1,this['_itemWindow']['updateSmoothScroll']()),this[_0x53c9e0(0x246)][_0x53c9e0(0x556)](this[_0x53c9e0(0x246)][_0x53c9e0(0x5ce)]()-_0x266d42);},VisuMZ[_0x1d2fe5(0x39f)]['Scene_Equip_onSlotCancel']=Scene_Equip['prototype'][_0x1d2fe5(0x4aa)],Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4aa)]=function(){const _0x72cd71=_0x1d2fe5;VisuMZ[_0x72cd71(0x39f)][_0x72cd71(0x361)][_0x72cd71(0x4e5)](this),this[_0x72cd71(0x2fc)]()&&(this[_0x72cd71(0x538)][_0x72cd71(0x302)](0x0),this['_slotWindow']['deactivate']());},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x44a)]=Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x367)],Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x367)]=function(){const _0x4f5524=_0x1d2fe5;VisuMZ[_0x4f5524(0x39f)]['Scene_Equip_onActorChange']['call'](this),this['isUseModernControls']()&&(this[_0x4f5524(0x538)][_0x4f5524(0x412)](),this[_0x4f5524(0x538)]['deselect'](),this[_0x4f5524(0x3e5)][_0x4f5524(0x302)](0x0),this[_0x4f5524(0x3e5)]['activate']());},Scene_Equip['prototype']['buttonAssistSlotWindowShift']=function(){const _0x2523f7=_0x1d2fe5;if(!this['_slotWindow'])return![];if(!this[_0x2523f7(0x3e5)][_0x2523f7(0x589)])return![];return this['_slotWindow'][_0x2523f7(0x294)]();},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x276)]=function(){const _0x320f78=_0x1d2fe5;if(this[_0x320f78(0x390)]())return TextManager[_0x320f78(0x1ee)](_0x320f78(0x39b));return Scene_MenuBase[_0x320f78(0x3dc)][_0x320f78(0x276)][_0x320f78(0x4e5)](this);},Scene_Equip['prototype']['buttonAssistText3']=function(){const _0x3823e1=_0x1d2fe5;if(this['buttonAssistSlotWindowShift']())return VisuMZ['ItemsEquipsCore'][_0x3823e1(0x478)][_0x3823e1(0x385)]['buttonAssistRemove'];return Scene_MenuBase[_0x3823e1(0x3dc)][_0x3823e1(0x452)][_0x3823e1(0x4e5)](this);},Scene_Equip[_0x1d2fe5(0x3dc)]['buttonAssistOffset3']=function(){const _0x40a5cd=_0x1d2fe5;if(this['buttonAssistSlotWindowShift']())return this['_buttonAssistWindow']['width']/0x5/-0x3;return Scene_MenuBase[_0x40a5cd(0x3dc)]['buttonAssistOffset3'][_0x40a5cd(0x4e5)](this);},Scene_Equip[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x317)]=function(){SceneManager['pop']();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x292)]=Scene_Load['prototype']['reloadMapIfUpdated'],Scene_Load[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x35c)]=function(){const _0x1cdcf5=_0x1d2fe5;VisuMZ[_0x1cdcf5(0x39f)][_0x1cdcf5(0x292)][_0x1cdcf5(0x4e5)](this),this[_0x1cdcf5(0x3eb)]();},Scene_Load['prototype'][_0x1d2fe5(0x3eb)]=function(){const _0xa79809=_0x1d2fe5;if($gameSystem[_0xa79809(0x371)]()!==$dataSystem[_0xa79809(0x371)])for(const _0x568f02 of $gameActors[_0xa79809(0x3a2)]){if(_0x568f02)_0x568f02[_0xa79809(0x356)]();}},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x421)]=function(){const _0x3ffd44=_0x1d2fe5;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x3ffd44(0x372)]!==undefined)return ConfigManager[_0x3ffd44(0x372)];else{if(this[_0x3ffd44(0x2d8)]())return this[_0x3ffd44(0x1fc)]()[_0x3ffd44(0x26a)](/LOWER/i);else Scene_MenuBase[_0x3ffd44(0x3dc)][_0x3ffd44(0x577)]['call'](this);}},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x577)]=function(){const _0x1a241d=_0x1d2fe5;if(ConfigManager[_0x1a241d(0x598)]&&ConfigManager[_0x1a241d(0x1e5)]!==undefined)return ConfigManager[_0x1a241d(0x1e5)];else{if(this[_0x1a241d(0x2d8)]())return this[_0x1a241d(0x1fc)]()[_0x1a241d(0x26a)](/RIGHT/i);else Scene_MenuBase[_0x1a241d(0x3dc)][_0x1a241d(0x577)][_0x1a241d(0x4e5)](this);}},Scene_Shop['prototype'][_0x1d2fe5(0x1fc)]=function(){const _0x5d2cb3=_0x1d2fe5;return VisuMZ[_0x5d2cb3(0x39f)][_0x5d2cb3(0x478)]['ShopScene'][_0x5d2cb3(0x45d)];},Scene_Shop['prototype'][_0x1d2fe5(0x2fc)]=function(){const _0x224189=_0x1d2fe5;return this[_0x224189(0x37b)]&&this['_categoryWindow']['isUseModernControls']();},Scene_Shop[_0x1d2fe5(0x3dc)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x563cd4=_0x1d2fe5;return VisuMZ[_0x563cd4(0x39f)]['Settings'][_0x563cd4(0x595)][_0x563cd4(0x4f2)];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x5b4)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x304)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x304)]=function(_0x5cf54e,_0x38f709){const _0x35604d=_0x1d2fe5;_0x5cf54e=VisuMZ[_0x35604d(0x39f)][_0x35604d(0x4d6)](_0x5cf54e),VisuMZ[_0x35604d(0x39f)][_0x35604d(0x5b4)][_0x35604d(0x4e5)](this,_0x5cf54e,_0x38f709),this[_0x35604d(0x466)]();},Scene_Shop['prototype'][_0x1d2fe5(0x466)]=function(){const _0x6eb7f8=_0x1d2fe5;this[_0x6eb7f8(0x3d7)]=0x0;const _0x2ecbf5=[];for(const _0x2c555f of this[_0x6eb7f8(0x347)]){this[_0x6eb7f8(0x29a)](_0x2c555f)?this[_0x6eb7f8(0x3d7)]++:_0x2ecbf5[_0x6eb7f8(0x334)](_0x2c555f);}for(const _0x387ee5 of _0x2ecbf5){this[_0x6eb7f8(0x347)][_0x6eb7f8(0x3fb)](_0x387ee5);}},Scene_Shop['prototype']['isGoodShown']=function(_0x440cb8){if(_0x440cb8[0x0]>0x2||_0x440cb8[0x0]<0x0)return![];const _0x1e37c0=[$dataItems,$dataWeapons,$dataArmors][_0x440cb8[0x0]][_0x440cb8[0x1]];if(!_0x1e37c0)return![];return!![];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x555)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x25c)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x25c)]=function(){const _0x13383c=_0x1d2fe5;VisuMZ[_0x13383c(0x39f)][_0x13383c(0x555)][_0x13383c(0x4e5)](this),this[_0x13383c(0x2d8)]()&&this[_0x13383c(0x254)](),this[_0x13383c(0x438)]();},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x254)]=function(){const _0x387a09=_0x1d2fe5;this[_0x387a09(0x28e)][_0x387a09(0x562)](),this[_0x387a09(0x46e)][_0x387a09(0x4f7)](),this[_0x387a09(0x46e)][_0x387a09(0x471)](),this[_0x387a09(0x4cb)][_0x387a09(0x4f7)]();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x37c)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2be)],Scene_Shop[_0x1d2fe5(0x3dc)]['helpWindowRect']=function(){const _0x2e79e0=_0x1d2fe5;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2e79e0(0x233)]():VisuMZ['ItemsEquipsCore']['Scene_Shop_helpWindowRect'][_0x2e79e0(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x233)]=function(){const _0xff89ec=_0x1d2fe5,_0x4e43e7=0x0,_0x111716=this['helpAreaTop'](),_0x4cd5d9=Graphics[_0xff89ec(0x518)],_0xac7c1=this[_0xff89ec(0x53a)]();return new Rectangle(_0x4e43e7,_0x111716,_0x4cd5d9,_0xac7c1);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x28d)]=Scene_Shop['prototype'][_0x1d2fe5(0x320)],Scene_Shop['prototype'][_0x1d2fe5(0x320)]=function(){const _0x5adefb=_0x1d2fe5;return this[_0x5adefb(0x2d8)]()?this[_0x5adefb(0x592)]():VisuMZ[_0x5adefb(0x39f)][_0x5adefb(0x28d)][_0x5adefb(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x592)]=function(){const _0x3cbbc7=_0x1d2fe5,_0x5b42ae=this[_0x3cbbc7(0x536)](),_0x37638f=this[_0x3cbbc7(0x3e2)](0x1,!![]),_0x747ee2=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x5b42ae,_0x555cb9=this['mainAreaTop']();return new Rectangle(_0x747ee2,_0x555cb9,_0x5b42ae,_0x37638f);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x2aa)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2e4)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2e4)]=function(){const _0x1da0cc=_0x1d2fe5;return this[_0x1da0cc(0x2d8)]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x1da0cc(0x39f)][_0x1da0cc(0x2aa)][_0x1da0cc(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x46f)]=function(){const _0x1bdbde=_0x1d2fe5,_0xad9a85=this[_0x1bdbde(0x577)]()?this['mainCommandWidth']():0x0,_0x4f0d9c=this['mainAreaTop'](),_0x3147ea=Graphics['boxWidth']-this[_0x1bdbde(0x536)](),_0x1e41b6=this[_0x1bdbde(0x3e2)](0x1,!![]);return new Rectangle(_0xad9a85,_0x4f0d9c,_0x3147ea,_0x1e41b6);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x3a8)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x287)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x287)]=function(){const _0x51099b=_0x1d2fe5;return this[_0x51099b(0x2d8)]()?this['numberWindowRectItemsEquipsCore']():VisuMZ[_0x51099b(0x39f)]['Scene_Shop_numberWindowRect'][_0x51099b(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)]['numberWindowRectItemsEquipsCore']=function(){const _0x19048b=_0x1d2fe5,_0x16a7ae=this[_0x19048b(0x538)]['y']+this['_commandWindow'][_0x19048b(0x548)],_0x135a89=Graphics[_0x19048b(0x518)]-this[_0x19048b(0x462)](),_0x1e0328=this[_0x19048b(0x577)]()?Graphics[_0x19048b(0x518)]-_0x135a89:0x0,_0x93d24c=this[_0x19048b(0x57f)]()-this['_commandWindow'][_0x19048b(0x548)];return new Rectangle(_0x1e0328,_0x16a7ae,_0x135a89,_0x93d24c);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x295)]=Scene_Shop[_0x1d2fe5(0x3dc)]['statusWindowRect'],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x384)]=function(){const _0x53a2a8=_0x1d2fe5;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x53a2a8(0x20f)]():VisuMZ[_0x53a2a8(0x39f)][_0x53a2a8(0x295)][_0x53a2a8(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x20f)]=function(){const _0x4d021b=_0x1d2fe5,_0x175c9d=this[_0x4d021b(0x462)](),_0x4a6f4f=this['mainAreaHeight']()-this[_0x4d021b(0x538)]['height'],_0x4c9a48=this['isRightInputMode']()?0x0:Graphics[_0x4d021b(0x518)]-_0x175c9d,_0x3a35d1=this[_0x4d021b(0x538)]['y']+this[_0x4d021b(0x538)][_0x4d021b(0x548)];return new Rectangle(_0x4c9a48,_0x3a35d1,_0x175c9d,_0x4a6f4f);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x394)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x31e)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x31e)]=function(){const _0x16b56d=_0x1d2fe5;return this[_0x16b56d(0x2d8)]()?this[_0x16b56d(0x5d0)]():VisuMZ[_0x16b56d(0x39f)][_0x16b56d(0x394)][_0x16b56d(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5d0)]=function(){const _0x2327bb=_0x1d2fe5,_0x118fad=this['_commandWindow']['y']+this['_commandWindow']['height'],_0x51de68=Graphics['boxWidth']-this[_0x2327bb(0x462)](),_0x4ffdff=this[_0x2327bb(0x57f)]()-this[_0x2327bb(0x538)][_0x2327bb(0x548)],_0x280cd8=this[_0x2327bb(0x577)]()?Graphics[_0x2327bb(0x518)]-_0x51de68:0x0;return new Rectangle(_0x280cd8,_0x118fad,_0x51de68,_0x4ffdff);},VisuMZ[_0x1d2fe5(0x39f)]['Scene_Shop_createCategoryWindow']=Scene_Shop['prototype'][_0x1d2fe5(0x512)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x512)]=function(){const _0x5b41b1=_0x1d2fe5;VisuMZ[_0x5b41b1(0x39f)][_0x5b41b1(0x4b9)][_0x5b41b1(0x4e5)](this),this[_0x5b41b1(0x2fc)]()&&this[_0x5b41b1(0x4a5)]();},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x3e0)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x43b)],Scene_Shop[_0x1d2fe5(0x3dc)]['categoryWindowRect']=function(){const _0xcbe3d7=_0x1d2fe5;return this[_0xcbe3d7(0x2d8)]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0xcbe3d7(0x39f)][_0xcbe3d7(0x3e0)][_0xcbe3d7(0x4e5)](this);},Scene_Shop['prototype'][_0x1d2fe5(0x2c1)]=function(){const _0xc31702=_0x1d2fe5,_0x2c2d04=this['_commandWindow']['y'],_0x5a15cf=this[_0xc31702(0x538)][_0xc31702(0x20e)],_0x5295d6=this['calcWindowHeight'](0x1,!![]),_0x580f86=this[_0xc31702(0x577)]()?Graphics[_0xc31702(0x518)]-_0x5a15cf:0x0;return new Rectangle(_0x580f86,_0x2c2d04,_0x5a15cf,_0x5295d6);},Scene_Shop[_0x1d2fe5(0x3dc)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x2d0a66=_0x1d2fe5;delete this[_0x2d0a66(0x37b)][_0x2d0a66(0x4f1)]['ok'],delete this['_categoryWindow'][_0x2d0a66(0x4f1)]['cancel'];},VisuMZ['ItemsEquipsCore']['Scene_Shop_createSellWindow']=Scene_Shop['prototype'][_0x1d2fe5(0x559)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x559)]=function(){const _0x3dd95e=_0x1d2fe5;VisuMZ[_0x3dd95e(0x39f)][_0x3dd95e(0x284)]['call'](this),this[_0x3dd95e(0x2d8)]()&&this[_0x3dd95e(0x450)]();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x54e)]=Scene_Shop['prototype'][_0x1d2fe5(0x33b)],Scene_Shop['prototype'][_0x1d2fe5(0x33b)]=function(){const _0x14b015=_0x1d2fe5;return this[_0x14b015(0x2d8)]()?this[_0x14b015(0x2cf)]():VisuMZ[_0x14b015(0x39f)][_0x14b015(0x54e)]['call'](this);},Scene_Shop['prototype'][_0x1d2fe5(0x2cf)]=function(){const _0x164714=_0x1d2fe5,_0x539c5f=this['_categoryWindow']['y']+this['_categoryWindow']['height'],_0x43c001=Graphics[_0x164714(0x518)]-this[_0x164714(0x462)](),_0x2385fd=this[_0x164714(0x57f)]()-this[_0x164714(0x37b)][_0x164714(0x548)],_0xfe9087=this[_0x164714(0x577)]()?Graphics[_0x164714(0x518)]-_0x43c001:0x0;return new Rectangle(_0xfe9087,_0x539c5f,_0x43c001,_0x2385fd);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x450)]=function(){const _0x1696e7=_0x1d2fe5;this[_0x1696e7(0x563)][_0x1696e7(0x301)](this[_0x1696e7(0x4cb)]);},Scene_Shop[_0x1d2fe5(0x3dc)]['statusWidth']=function(){const _0x3f83eb=_0x1d2fe5;return VisuMZ[_0x3f83eb(0x39f)][_0x3f83eb(0x478)][_0x3f83eb(0x2f2)][_0x3f83eb(0x407)];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x5dd)]=Scene_Shop[_0x1d2fe5(0x3dc)]['activateSellWindow'],Scene_Shop['prototype']['activateSellWindow']=function(){const _0x2218a8=_0x1d2fe5;VisuMZ[_0x2218a8(0x39f)]['Scene_Shop_activateSellWindow'][_0x2218a8(0x4e5)](this),this[_0x2218a8(0x2d8)]()&&this[_0x2218a8(0x4cb)][_0x2218a8(0x4f7)](),this[_0x2218a8(0x563)]['updateHelp']();},VisuMZ[_0x1d2fe5(0x39f)]['Scene_Shop_commandBuy']=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4c6)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4c6)]=function(){const _0x2c9f54=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x2c9f54(0x5b2)][_0x2c9f54(0x4e5)](this),this[_0x2c9f54(0x2d8)]()&&this[_0x2c9f54(0x453)]();},Scene_Shop['prototype'][_0x1d2fe5(0x453)]=function(){const _0x571050=_0x1d2fe5;this[_0x571050(0x2ac)]=this[_0x571050(0x2ac)]||0x0,this[_0x571050(0x46e)][_0x571050(0x302)](this[_0x571050(0x2ac)]);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x366)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x274)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x274)]=function(){const _0x5f4655=_0x1d2fe5;VisuMZ[_0x5f4655(0x39f)][_0x5f4655(0x366)][_0x5f4655(0x4e5)](this),this[_0x5f4655(0x2d8)]()&&this[_0x5f4655(0x4c8)](),this[_0x5f4655(0x2fc)]()&&(this[_0x5f4655(0x37b)]['smoothSelect'](0x0),this[_0x5f4655(0x368)]());},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4c8)]=function(){const _0x2bbb35=_0x1d2fe5;this['_buyWindow']['hide'](),this[_0x2bbb35(0x538)]['hide']();},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x2d9)]=Scene_Shop['prototype'][_0x1d2fe5(0x50a)],Scene_Shop[_0x1d2fe5(0x3dc)]['onBuyCancel']=function(){const _0x89ba4f=_0x1d2fe5;VisuMZ[_0x89ba4f(0x39f)][_0x89ba4f(0x2d9)][_0x89ba4f(0x4e5)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x89ba4f(0x4e3)]();},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4e3)]=function(){const _0x148799=_0x1d2fe5;this['_buyWindowLastIndex']=this['_buyWindow'][_0x148799(0x5ce)](),this[_0x148799(0x46e)][_0x148799(0x4f7)](),this[_0x148799(0x46e)][_0x148799(0x471)](),this[_0x148799(0x46e)]['smoothScrollTo'](0x0,0x0),this[_0x148799(0x4cb)]['show'](),this['_dummyWindow'][_0x148799(0x562)]();},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x216)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x541)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x541)]=function(){const _0x3c4e46=_0x1d2fe5;VisuMZ[_0x3c4e46(0x39f)][_0x3c4e46(0x216)][_0x3c4e46(0x4e5)](this),this[_0x3c4e46(0x2d8)]()&&this[_0x3c4e46(0x4f4)]();},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4f4)]=function(){const _0x2a4024=_0x1d2fe5;this[_0x2a4024(0x46e)]['show'](),this[_0x2a4024(0x538)]['show']();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x4e0)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x30a)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x30a)]=function(){const _0x53cb44=_0x1d2fe5;$gameTemp[_0x53cb44(0x23e)]=!![],VisuMZ[_0x53cb44(0x39f)]['Scene_Shop_onBuyOk'][_0x53cb44(0x4e5)](this),$gameTemp[_0x53cb44(0x23e)]=![],this[_0x53cb44(0x38c)]=this[_0x53cb44(0x46e)][_0x53cb44(0x4f0)]();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x388)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x236)],Scene_Shop[_0x1d2fe5(0x3dc)]['buyingPrice']=function(){const _0x5c32c5=_0x1d2fe5;$gameTemp[_0x5c32c5(0x23e)]=!![],this['_item']=this['_buyWindow'][_0x5c32c5(0x4f0)]();const _0x5b596a=VisuMZ[_0x5c32c5(0x39f)]['Scene_Shop_buyingPrice'][_0x5c32c5(0x4e5)](this);return $gameTemp['_bypassProxy']=![],this[_0x5c32c5(0x38c)]=this[_0x5c32c5(0x46e)]['item'](),_0x5b596a;},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x225)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2f1)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2f1)]=function(){const _0x39aff9=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x39aff9(0x225)][_0x39aff9(0x4e5)](this),this[_0x39aff9(0x2d8)]()&&this[_0x39aff9(0x2ab)]();},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2ab)]=function(){const _0x3e8ac8=_0x1d2fe5;this[_0x3e8ac8(0x37b)]['show']();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x53d)]=Scene_Shop[_0x1d2fe5(0x3dc)]['onSellCancel'],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x43a)]=function(){const _0x343df4=_0x1d2fe5;VisuMZ[_0x343df4(0x39f)][_0x343df4(0x53d)][_0x343df4(0x4e5)](this),this[_0x343df4(0x2fc)]()&&this[_0x343df4(0x541)](),this[_0x343df4(0x2d8)]()&&this[_0x343df4(0x28e)][_0x343df4(0x562)]();},Scene_Shop['prototype'][_0x1d2fe5(0x200)]=function(_0x748586){const _0x272c4f=_0x1d2fe5,_0x474203=this[_0x272c4f(0x38c)];this[_0x272c4f(0x38c)]=_0x748586;const _0x5b842f=this['sellingPrice']();return this[_0x272c4f(0x38c)]=_0x474203,_0x5b842f;},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x256)]=Scene_Shop[_0x1d2fe5(0x3dc)]['sellingPrice'],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3d0)]=function(){const _0x524f6e=_0x1d2fe5;let _0x1ea798=this[_0x524f6e(0x3ca)]();const _0x5aa4cf=this['_item'];return _0x1ea798=VisuMZ[_0x524f6e(0x39f)][_0x524f6e(0x478)]['ShopScene'][_0x524f6e(0x428)][_0x524f6e(0x4e5)](this,_0x5aa4cf,_0x1ea798),_0x1ea798;},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3ca)]=function(){const _0x4e96a5=_0x1d2fe5;let _0x4aa157=this[_0x4e96a5(0x38c)]['price'];if(!this[_0x4e96a5(0x38c)])return 0x0;else{if(this[_0x4e96a5(0x38c)]['note'][_0x4e96a5(0x26a)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x1b8b4d=String(RegExp['$1']);window[_0x4e96a5(0x4f0)]=this[_0x4e96a5(0x38c)],window[_0x4e96a5(0x4d3)]=_0x4aa157*this['sellPriceRate']();try{eval(_0x1b8b4d);}catch(_0x5b7a6c){if($gameTemp['isPlaytest']())console[_0x4e96a5(0x3cc)](_0x5b7a6c);}let _0x5d4a96=window[_0x4e96a5(0x4d3)];window[_0x4e96a5(0x4f0)]=undefined,window[_0x4e96a5(0x4d3)]=undefined;if(isNaN(_0x5d4a96))_0x5d4a96=0x0;return Math[_0x4e96a5(0x331)](_0x5d4a96);}else return this[_0x4e96a5(0x38c)][_0x4e96a5(0x3f8)][_0x4e96a5(0x26a)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x4e96a5(0x331)](this[_0x4e96a5(0x2d0)]());}},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2d0)]=function(){const _0xb2256a=_0x1d2fe5;return this[_0xb2256a(0x38c)][_0xb2256a(0x4d3)]*this[_0xb2256a(0x2f3)]();},Scene_Shop['prototype'][_0x1d2fe5(0x2f3)]=function(){const _0x2882f6=_0x1d2fe5;return VisuMZ['ItemsEquipsCore'][_0x2882f6(0x478)][_0x2882f6(0x595)][_0x2882f6(0x22e)];},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x47b)]=function(){const _0x1229bc=_0x1d2fe5;if(!this[_0x1229bc(0x1fc)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x1229bc(0x563)])return![];if(!this[_0x1229bc(0x563)]['active'])return![];return this[_0x1229bc(0x1fc)]()&&this[_0x1229bc(0x2fc)]();},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2f6)]=function(){const _0x54eae4=_0x1d2fe5;if(this['buttonAssistItemListRequirement']())return this[_0x54eae4(0x563)][_0x54eae4(0x4af)]()===0x1?TextManager['getInputMultiButtonStrings'](_0x54eae4(0x393),_0x54eae4(0x5c0)):TextManager[_0x54eae4(0x335)](_0x54eae4(0x24c),_0x54eae4(0x1ef));else{if(this[_0x54eae4(0x336)]&&this[_0x54eae4(0x336)][_0x54eae4(0x589)])return TextManager[_0x54eae4(0x335)](_0x54eae4(0x393),_0x54eae4(0x5c0));}return Scene_MenuBase[_0x54eae4(0x3dc)]['buttonAssistKey1']['call'](this);},Scene_Shop['prototype'][_0x1d2fe5(0x281)]=function(){const _0x277c87=_0x1d2fe5;if(this[_0x277c87(0x336)]&&this[_0x277c87(0x336)]['active'])return TextManager[_0x277c87(0x335)]('up',_0x277c87(0x56e));return Scene_MenuBase[_0x277c87(0x3dc)][_0x277c87(0x281)][_0x277c87(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4d4)]=function(){const _0x46b1a8=_0x1d2fe5;if(this[_0x46b1a8(0x47b)]())return VisuMZ[_0x46b1a8(0x39f)]['Settings'][_0x46b1a8(0x503)][_0x46b1a8(0x56d)];else{if(this[_0x46b1a8(0x336)]&&this[_0x46b1a8(0x336)][_0x46b1a8(0x589)])return VisuMZ['ItemsEquipsCore'][_0x46b1a8(0x478)]['ShopScene'][_0x46b1a8(0x47e)];}return Scene_MenuBase[_0x46b1a8(0x3dc)]['buttonAssistText1'][_0x46b1a8(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x564)]=function(){const _0x2ccbf4=_0x1d2fe5;if(this[_0x2ccbf4(0x336)]&&this['_numberWindow'][_0x2ccbf4(0x589)])return VisuMZ[_0x2ccbf4(0x39f)][_0x2ccbf4(0x478)]['ShopScene'][_0x2ccbf4(0x379)];return Scene_MenuBase[_0x2ccbf4(0x3dc)][_0x2ccbf4(0x564)][_0x2ccbf4(0x4e5)](this);},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x438)]=function(){const _0x2d80eb=_0x1d2fe5;if(!SceneManager[_0x2d80eb(0x2e7)]())return;const _0x1599d8=VisuMZ[_0x2d80eb(0x39f)]['Settings'][_0x2d80eb(0x595)];_0x1599d8['SwitchBuy']&&$gameSwitches[_0x2d80eb(0x2a4)](_0x1599d8[_0x2d80eb(0x27b)],![]),_0x1599d8[_0x2d80eb(0x2c6)]&&$gameSwitches[_0x2d80eb(0x2a4)](_0x1599d8[_0x2d80eb(0x2c6)],![]);},VisuMZ['ItemsEquipsCore']['Scene_Shop_doBuy']=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1e2)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1e2)]=function(_0x5b4895){const _0x51c646=_0x1d2fe5;VisuMZ[_0x51c646(0x39f)][_0x51c646(0x42f)]['call'](this,_0x5b4895),this[_0x51c646(0x434)](this[_0x51c646(0x38c)],_0x5b4895);if(_0x5b4895<=0x0)return;const _0x264a44=VisuMZ[_0x51c646(0x39f)]['Settings'][_0x51c646(0x595)];_0x264a44[_0x51c646(0x27b)]&&$gameSwitches[_0x51c646(0x2a4)](_0x264a44[_0x51c646(0x27b)],!![]),this[_0x51c646(0x46e)][_0x51c646(0x449)](),this[_0x51c646(0x563)][_0x51c646(0x449)]();},Scene_Shop[_0x1d2fe5(0x3dc)]['onBuyItem']=function(_0x5e53fd,_0x28039a){const _0x187d6b=_0x1d2fe5;this[_0x187d6b(0x4e7)](_0x5e53fd,_0x28039a),$gameParty[_0x187d6b(0x2d4)](_0x5e53fd,_0x28039a),$gameParty['addShopTrackingGoldBuy'](_0x28039a*this[_0x187d6b(0x236)]());},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4e7)]=function(_0xf3963c,_0x4e82b0){const _0x150689=_0x1d2fe5;if(!_0xf3963c)return;if(!_0x4e82b0)return;const _0xb902ee=VisuMZ[_0x150689(0x39f)]['ShopListingRegExp'],_0x303ea5=_0xf3963c[_0x150689(0x3f8)]||'';if(_0x303ea5['match'](_0xb902ee[_0x150689(0x2af)])){const _0x387e4a=String(RegExp['$1'])[_0x150689(0x3e9)](',')[_0x150689(0x58f)](_0x5160ff=>Number(_0x5160ff));for(const _0x3816f1 of _0x387e4a){$gameSwitches[_0x150689(0x2a4)](_0x3816f1,!![]);}}if(_0x303ea5[_0x150689(0x26a)](_0xb902ee['BuyTurnSwitchOff'])){const _0x396381=String(RegExp['$1'])[_0x150689(0x3e9)](',')[_0x150689(0x58f)](_0x22e821=>Number(_0x22e821));for(const _0x19cc5d of _0x396381){$gameSwitches[_0x150689(0x2a4)](_0x19cc5d,![]);}}},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x350)]=Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x244)],Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x244)]=function(_0x28673b){const _0x3e28fe=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x3e28fe(0x350)][_0x3e28fe(0x4e5)](this,_0x28673b),this['onSellItem'](this['_item'],_0x28673b);if(_0x28673b<=0x0)return;const _0x480e29=VisuMZ['ItemsEquipsCore'][_0x3e28fe(0x478)][_0x3e28fe(0x595)];_0x480e29[_0x3e28fe(0x27b)]&&$gameSwitches[_0x3e28fe(0x2a4)](_0x480e29[_0x3e28fe(0x2c6)],!![]),this[_0x3e28fe(0x46e)][_0x3e28fe(0x449)](),this[_0x3e28fe(0x563)][_0x3e28fe(0x449)]();},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x227)]=function(_0x3a6141,_0x1e8a23){const _0x2b21dc=_0x1d2fe5;this['processShopCondListingOnSellItem'](_0x3a6141,_0x1e8a23),$gameParty[_0x2b21dc(0x51c)](_0x3a6141,_0x1e8a23),$gameParty[_0x2b21dc(0x3b1)](_0x1e8a23*this['sellingPrice']());},Scene_Shop[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x359)]=function(_0x294874,_0x54c78b){const _0x41baae=_0x1d2fe5;if(!_0x294874)return;if(!_0x54c78b)return;const _0x338799=VisuMZ[_0x41baae(0x39f)][_0x41baae(0x1d3)],_0xcf1178=_0x294874['note']||'';if(_0xcf1178[_0x41baae(0x26a)](_0x338799['SellTurnSwitchOn'])){const _0xe4b3e1=String(RegExp['$1'])[_0x41baae(0x3e9)](',')[_0x41baae(0x58f)](_0x31fbdd=>Number(_0x31fbdd));for(const _0x137155 of _0xe4b3e1){$gameSwitches[_0x41baae(0x2a4)](_0x137155,!![]);}}if(_0xcf1178[_0x41baae(0x26a)](_0x338799[_0x41baae(0x4d8)])){const _0x4d8479=String(RegExp['$1'])[_0x41baae(0x3e9)](',')[_0x41baae(0x58f)](_0x18be8f=>Number(_0x18be8f));for(const _0x2229a1 of _0x4d8479){$gameSwitches[_0x41baae(0x2a4)](_0x2229a1,![]);}}};function Sprite_NewLabel(){const _0x4ebf6f=_0x1d2fe5;this[_0x4ebf6f(0x376)](...arguments);}Sprite_NewLabel[_0x1d2fe5(0x3dc)]=Object['create'](Sprite['prototype']),Sprite_NewLabel[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x593)]=Sprite_NewLabel,Sprite_NewLabel[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x376)]=function(){const _0x29c6f0=_0x1d2fe5;Sprite[_0x29c6f0(0x3dc)]['initialize']['call'](this),this[_0x29c6f0(0x3ef)]();},Sprite_NewLabel[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3ef)]=function(){const _0x2e7479=_0x1d2fe5,_0x11d40a=ImageManager[_0x2e7479(0x513)],_0x8512d4=ImageManager[_0x2e7479(0x436)];this['bitmap']=new Bitmap(_0x11d40a,_0x8512d4),this['drawNewLabelIcon'](),this['drawNewLabelText']();},Sprite_NewLabel['prototype'][_0x1d2fe5(0x215)]=function(){const _0x2d0d63=_0x1d2fe5,_0x55e73e=VisuMZ['ItemsEquipsCore'][_0x2d0d63(0x478)]['New'][_0x2d0d63(0x5c9)];if(_0x55e73e<=0x0)return;const _0x5910a7=ImageManager[_0x2d0d63(0x250)](_0x2d0d63(0x4e8)),_0x916fa6=ImageManager[_0x2d0d63(0x513)],_0x181a19=ImageManager['iconHeight'],_0x10b797=_0x55e73e%0x10*_0x916fa6,_0x239848=Math[_0x2d0d63(0x331)](_0x55e73e/0x10)*_0x181a19;this['bitmap'][_0x2d0d63(0x297)](_0x5910a7,_0x10b797,_0x239848,_0x916fa6,_0x181a19,0x0,0x0);},Sprite_NewLabel['prototype'][_0x1d2fe5(0x4a2)]=function(){const _0x2a9785=_0x1d2fe5,_0x30ccbe=VisuMZ[_0x2a9785(0x39f)][_0x2a9785(0x478)][_0x2a9785(0x358)],_0x546965=_0x30ccbe['Text'];if(_0x546965==='')return;const _0x2b5e69=ImageManager[_0x2a9785(0x513)],_0x4218cc=ImageManager[_0x2a9785(0x436)];this[_0x2a9785(0x4c3)][_0x2a9785(0x480)]=_0x30ccbe['FontFace']||$gameSystem[_0x2a9785(0x41f)](),this[_0x2a9785(0x4c3)][_0x2a9785(0x3ae)]=this[_0x2a9785(0x520)](),this['bitmap'][_0x2a9785(0x470)]=_0x30ccbe[_0x2a9785(0x3bd)],this[_0x2a9785(0x4c3)]['drawText'](_0x546965,0x0,_0x4218cc/0x2,_0x2b5e69,_0x4218cc/0x2,_0x2a9785(0x49e));},Sprite_NewLabel[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x520)]=function(){const _0x124d68=_0x1d2fe5,_0x27223b=VisuMZ[_0x124d68(0x39f)][_0x124d68(0x478)]['New'][_0x124d68(0x248)];return _0x27223b['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x27223b);},Window_Base[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x51e)]=function(_0x54177f,_0x24e39b,_0x20a05a,_0x3b8c2f){const _0x2511c0=_0x1d2fe5;if(_0x54177f){const _0x3c93d3=_0x20a05a+(this[_0x2511c0(0x408)]()-ImageManager[_0x2511c0(0x436)])/0x2,_0x41f497=ImageManager[_0x2511c0(0x513)]+0x4,_0x31d0ae=Math[_0x2511c0(0x572)](0x0,_0x3b8c2f-_0x41f497);this[_0x2511c0(0x4e2)](ColorManager[_0x2511c0(0x40b)](_0x54177f)),this[_0x2511c0(0x31c)](_0x54177f[_0x2511c0(0x38b)],_0x24e39b,_0x3c93d3),this['drawText'](_0x54177f[_0x2511c0(0x36f)],_0x24e39b+_0x41f497,_0x20a05a,_0x31d0ae),this[_0x2511c0(0x54b)]();}},Window_Base['prototype'][_0x1d2fe5(0x1fb)]=function(_0x379e2d,_0x144f14,_0x5d406b,_0x3a6202){const _0x50299c=_0x1d2fe5;if(this[_0x50299c(0x29e)](_0x379e2d)){this[_0x50299c(0x30c)]();const _0xfa865f=VisuMZ[_0x50299c(0x39f)][_0x50299c(0x478)][_0x50299c(0x503)],_0x4d2c96=_0xfa865f[_0x50299c(0x4f9)],_0x466766=_0x4d2c96[_0x50299c(0x44f)]($gameParty[_0x50299c(0x282)](_0x379e2d));this[_0x50299c(0x2cc)][_0x50299c(0x470)]=_0xfa865f[_0x50299c(0x3be)],this[_0x50299c(0x4d1)](_0x466766,_0x144f14,_0x5d406b,_0x3a6202,'right'),this[_0x50299c(0x30c)]();}},Window_Base[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x29e)]=function(_0x1c2b5a){const _0x59f176=_0x1d2fe5;if(DataManager[_0x59f176(0x1df)](_0x1c2b5a))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base[_0x1d2fe5(0x3dc)]['drawItemDarkRect']=function(_0x1cef57,_0x2a568b,_0x19bd16,_0x43bac1,_0x4f54a3){const _0x483391=_0x1d2fe5;_0x4f54a3=Math['max'](_0x4f54a3||0x1,0x1);while(_0x4f54a3--){_0x43bac1=_0x43bac1||this[_0x483391(0x408)](),this[_0x483391(0x558)][_0x483391(0x251)]=0xa0;const _0x509509=ColorManager['gaugeBackColor']();this[_0x483391(0x558)]['fillRect'](_0x1cef57+0x1,_0x2a568b+0x1,_0x19bd16-0x2,_0x43bac1-0x2,_0x509509),this['contentsBack'][_0x483391(0x251)]=0xff;}},VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']=Window_Selectable[_0x1d2fe5(0x3dc)]['initialize'],Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x376)]=function(_0x5bb5af){const _0x5d6690=_0x1d2fe5;this['initNewLabelSprites'](),VisuMZ[_0x5d6690(0x39f)][_0x5d6690(0x2e5)][_0x5d6690(0x4e5)](this,_0x5bb5af);},Window_Selectable[_0x1d2fe5(0x3dc)]['initNewLabelSprites']=function(){const _0x3eebf2=_0x1d2fe5;this['_newLabelSprites']={},this[_0x3eebf2(0x485)]=0xff,this[_0x3eebf2(0x352)]=VisuMZ[_0x3eebf2(0x39f)][_0x3eebf2(0x478)][_0x3eebf2(0x358)][_0x3eebf2(0x271)],this[_0x3eebf2(0x481)]=VisuMZ[_0x3eebf2(0x39f)]['Settings'][_0x3eebf2(0x358)]['FadeLimit'];},Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x38d)]=function(){return![];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x237)]=Window_Selectable['prototype'][_0x1d2fe5(0x2e0)],Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2e0)]=function(_0x38ce5a){const _0x482bda=_0x1d2fe5;VisuMZ[_0x482bda(0x39f)]['Window_Selectable_setHelpWindowItem']['call'](this,_0x38ce5a);if(this[_0x482bda(0x38d)]())this[_0x482bda(0x4ab)](_0x38ce5a);},Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4ab)]=function(_0x51fee9){const _0x449e7c=_0x1d2fe5;if(!_0x51fee9)return;$gameParty[_0x449e7c(0x3a4)](_0x51fee9);let _0x3255fd='';if(DataManager[_0x449e7c(0x36e)](_0x51fee9))_0x3255fd=_0x449e7c(0x406)[_0x449e7c(0x44f)](_0x51fee9['id']);else{if(DataManager[_0x449e7c(0x415)](_0x51fee9))_0x3255fd=_0x449e7c(0x550)[_0x449e7c(0x44f)](_0x51fee9['id']);else{if(DataManager[_0x449e7c(0x1f8)](_0x51fee9))_0x3255fd=_0x449e7c(0x34e)[_0x449e7c(0x44f)](_0x51fee9['id']);else return;}}const _0x587139=this['_newLabelSprites'][_0x3255fd];if(_0x587139)_0x587139['hide']();},VisuMZ[_0x1d2fe5(0x39f)]['Window_Selectable_refresh']=Window_Selectable[_0x1d2fe5(0x3dc)]['refresh'],Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x449)]=function(){const _0xc92207=_0x1d2fe5;this[_0xc92207(0x566)](),VisuMZ[_0xc92207(0x39f)][_0xc92207(0x433)][_0xc92207(0x4e5)](this);},Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x566)]=function(){const _0x150a2a=_0x1d2fe5;for(const _0x3bd013 of Object[_0x150a2a(0x2ca)](this['_newLabelSprites'])){_0x3bd013[_0x150a2a(0x562)]();}},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x3e4)]=Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x583)],Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x583)]=function(){const _0x4e524e=_0x1d2fe5;this[_0x4e524e(0x429)](),VisuMZ['ItemsEquipsCore'][_0x4e524e(0x3e4)][_0x4e524e(0x4e5)](this);},Window_Selectable[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x429)]=function(){const _0x71444a=_0x1d2fe5;if(!this['isShowNew']())return;const _0x26f585=this[_0x71444a(0x481)];this['_newLabelOpacity']+=this[_0x71444a(0x352)];(this[_0x71444a(0x485)]>=_0x26f585||this[_0x71444a(0x485)]<=0x0)&&(this[_0x71444a(0x352)]*=-0x1);this[_0x71444a(0x485)]=this['_newLabelOpacity'][_0x71444a(0x36a)](0x0,_0x26f585);for(const _0x3b7b2b of Object[_0x71444a(0x2ca)](this[_0x71444a(0x50e)])){_0x3b7b2b[_0x71444a(0x59c)]=this['_newLabelOpacity'];}},Window_Selectable[_0x1d2fe5(0x3dc)]['createNewLabelSprite']=function(_0x2b2c00){const _0x329e4c=_0x1d2fe5,_0x4967fc=this['_newLabelSprites'];if(_0x4967fc[_0x2b2c00])return _0x4967fc[_0x2b2c00];else{const _0x4b4a84=new Sprite_NewLabel();return _0x4967fc[_0x2b2c00]=_0x4b4a84,this[_0x329e4c(0x23f)](_0x4b4a84),_0x4b4a84;}},Window_Selectable['prototype'][_0x1d2fe5(0x51d)]=function(_0x1926cc,_0x2c147b,_0x4e0f4e){const _0x31a487=_0x1d2fe5;let _0x2c71b7='';if(DataManager[_0x31a487(0x36e)](_0x1926cc))_0x2c71b7=_0x31a487(0x406)['format'](_0x1926cc['id']);else{if(DataManager[_0x31a487(0x415)](_0x1926cc))_0x2c71b7=_0x31a487(0x550)['format'](_0x1926cc['id']);else{if(DataManager[_0x31a487(0x1f8)](_0x1926cc))_0x2c71b7=_0x31a487(0x34e)[_0x31a487(0x44f)](_0x1926cc['id']);else return;}}const _0x459757=this[_0x31a487(0x469)](_0x2c71b7);_0x459757[_0x31a487(0x557)](_0x2c147b,_0x4e0f4e),_0x459757[_0x31a487(0x4f7)](),_0x459757[_0x31a487(0x59c)]=this[_0x31a487(0x485)];},Window_ItemCategory[_0x1d2fe5(0x5a5)]=VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x478)][_0x1d2fe5(0x46a)]['List'],Window_ItemCategory[_0x1d2fe5(0x2dc)]=['HiddenItemA',_0x1d2fe5(0x337),_0x1d2fe5(0x54c),_0x1d2fe5(0x57e),'AlwaysUsable','BattleUsable','FieldUsable',_0x1d2fe5(0x247)],VisuMZ[_0x1d2fe5(0x39f)]['Window_ItemCategory_initialize']=Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x376)],Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x376)]=function(_0x4f8532){const _0x5ba80e=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x5ba80e(0x42e)]['call'](this,_0x4f8532),this[_0x5ba80e(0x4b3)](_0x4f8532);},Window_ItemCategory[_0x1d2fe5(0x3dc)]['createCategoryNameWindow']=function(_0x2244c3){const _0x18be4e=_0x1d2fe5,_0x24299d=new Rectangle(0x0,0x0,_0x2244c3[_0x18be4e(0x20e)],_0x2244c3[_0x18be4e(0x548)]);this[_0x18be4e(0x2f9)]=new Window_Base(_0x24299d),this[_0x18be4e(0x2f9)][_0x18be4e(0x59c)]=0x0,this[_0x18be4e(0x24d)](this[_0x18be4e(0x2f9)]),this[_0x18be4e(0x23a)]();},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2fc)]=function(){const _0x2d130e=_0x1d2fe5;return Imported[_0x2d130e(0x5bb)]&&Window_HorzCommand[_0x2d130e(0x3dc)][_0x2d130e(0x2fc)][_0x2d130e(0x4e5)](this);},Window_ItemCategory['prototype'][_0x1d2fe5(0x252)]=function(){},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x36c)]=function(){const _0xe2ef78=_0x1d2fe5;if(!this[_0xe2ef78(0x2fc)]())Window_HorzCommand['prototype'][_0xe2ef78(0x36c)]['call'](this);},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4af)]=function(){const _0x35b392=_0x1d2fe5;return this[_0x35b392(0x404)]?this[_0x35b392(0x4f5)]():0x4;},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x583)]=function(){const _0x23d0e4=_0x1d2fe5;Window_HorzCommand['prototype'][_0x23d0e4(0x583)][_0x23d0e4(0x4e5)](this),this[_0x23d0e4(0x246)]&&this[_0x23d0e4(0x246)][_0x23d0e4(0x280)](this[_0x23d0e4(0x3d6)]());},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3c0)]=function(){const _0x58c70e=_0x1d2fe5;if(this[_0x58c70e(0x531)]()){const _0x9218fd=this['index']();if(this['_itemWindow']&&this[_0x58c70e(0x246)]['maxCols']()<=0x1)Input[_0x58c70e(0x5de)](_0x58c70e(0x5c0))&&this[_0x58c70e(0x4cc)](Input[_0x58c70e(0x210)](_0x58c70e(0x5c0))),Input['isRepeated'](_0x58c70e(0x393))&&this[_0x58c70e(0x52a)](Input[_0x58c70e(0x210)](_0x58c70e(0x393)));else this[_0x58c70e(0x246)]&&this[_0x58c70e(0x246)][_0x58c70e(0x4af)]()>0x1&&(Input['isRepeated'](_0x58c70e(0x1ef))&&!Input['isPressed'](_0x58c70e(0x39b))&&this[_0x58c70e(0x4cc)](Input['isTriggered']('pagedown')),Input[_0x58c70e(0x5de)](_0x58c70e(0x24c))&&!Input[_0x58c70e(0x46c)]('shift')&&this[_0x58c70e(0x52a)](Input[_0x58c70e(0x210)](_0x58c70e(0x24c))));this[_0x58c70e(0x5ce)]()!==_0x9218fd&&this[_0x58c70e(0x20b)]();}},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x486)]=function(){const _0x31086b=_0x1d2fe5;if(this[_0x31086b(0x2fc)]())return;Window_HorzCommand[_0x31086b(0x3dc)][_0x31086b(0x486)]['call'](this);},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x499)]=function(){const _0x2c98f5=_0x1d2fe5;return this['isUseModernControls']()?![]:Window_HorzCommand[_0x2c98f5(0x3dc)]['isHoverEnabled'][_0x2c98f5(0x4e5)](this);},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x420)]=function(){const _0x4e3093=_0x1d2fe5;if(this[_0x4e3093(0x365)]()){TouchInput[_0x4e3093(0x210)]()&&this['onTouchSelect'](!![]);if(TouchInput['isClicked']())this[_0x4e3093(0x5ab)]();else TouchInput['isCancelled']()&&this[_0x4e3093(0x1de)]();}},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x488)]=function(_0x6b0c4f){const _0x3c5856=_0x1d2fe5;this['isUseModernControls']()?this[_0x3c5856(0x396)](!![]):Window_HorzCommand[_0x3c5856(0x3dc)][_0x3c5856(0x488)][_0x3c5856(0x4e5)](this,_0x6b0c4f);},Window_ItemCategory[_0x1d2fe5(0x3dc)]['onTouchSelectModern']=function(_0x5daea3){const _0x2252a4=_0x1d2fe5;this['_doubleTouch']=![];if(this[_0x2252a4(0x531)]()){const _0x2ff6dc=this[_0x2252a4(0x5ce)](),_0x2a3b75=this[_0x2252a4(0x206)]();_0x2a3b75>=0x0&&_0x2a3b75!==this[_0x2252a4(0x5ce)]()&&this[_0x2252a4(0x4a4)](_0x2a3b75),_0x5daea3&&this['index']()!==_0x2ff6dc&&this[_0x2252a4(0x20b)]();}},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x269)]=function(){const _0x599711=_0x1d2fe5;this[_0x599711(0x511)](),this[_0x599711(0x4a4)](this['index']());},Window_ItemCategory['prototype'][_0x1d2fe5(0x511)]=function(){const _0x410261=_0x1d2fe5;for(const _0x314d28 of Window_ItemCategory[_0x410261(0x5a5)]){this['addItemCategory'](_0x314d28);}},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x319)]=function(_0x535518){const _0xb0bc43=_0x1d2fe5,_0x2d3cd9=_0x535518[_0xb0bc43(0x39c)],_0x5bba71=_0x535518[_0xb0bc43(0x5c9)],_0x2e528e=_0x535518[_0xb0bc43(0x330)]||0x0;if(_0x2e528e>0x0&&!$gameSwitches['value'](_0x2e528e))return;let _0x3aa5b4='',_0xdd7da8=_0xb0bc43(0x4b1),_0x1a1448=_0x2d3cd9;if(_0x2d3cd9['match'](/Category:(.*)/i))_0x3aa5b4=String(RegExp['$1'])[_0xb0bc43(0x5a1)]();else{if(Window_ItemCategory[_0xb0bc43(0x2dc)][_0xb0bc43(0x382)](_0x2d3cd9))_0x3aa5b4=VisuMZ[_0xb0bc43(0x39f)][_0xb0bc43(0x478)][_0xb0bc43(0x46a)][_0x2d3cd9];else{if([_0xb0bc43(0x5b1),_0xb0bc43(0x305)][_0xb0bc43(0x382)](_0x2d3cd9))_0x3aa5b4=TextManager[_0xb0bc43(0x4f0)];else{if(_0x2d3cd9==='KeyItems')_0x3aa5b4=TextManager[_0xb0bc43(0x497)];else{if(_0x2d3cd9==='AllWeapons')_0x3aa5b4=TextManager[_0xb0bc43(0x1d0)];else{if(_0x2d3cd9===_0xb0bc43(0x45f))_0x3aa5b4=TextManager[_0xb0bc43(0x507)];else{if(_0x2d3cd9[_0xb0bc43(0x26a)](/WTYPE:(\d+)/i))_0x3aa5b4=$dataSystem[_0xb0bc43(0x28a)][Number(RegExp['$1'])]||'';else{if(_0x2d3cd9[_0xb0bc43(0x26a)](/ATYPE:(\d+)/i))_0x3aa5b4=$dataSystem[_0xb0bc43(0x23b)][Number(RegExp['$1'])]||'';else _0x2d3cd9[_0xb0bc43(0x26a)](/ETYPE:(\d+)/i)&&(_0x3aa5b4=$dataSystem[_0xb0bc43(0x39d)][Number(RegExp['$1'])]||'');}}}}}}}_0x5bba71>0x0&&this[_0xb0bc43(0x457)]()!=='text'&&(_0x3aa5b4=_0xb0bc43(0x259)['format'](_0x5bba71,_0x3aa5b4)),this[_0xb0bc43(0x467)](_0x3aa5b4,_0xdd7da8,!![],_0x1a1448);},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x33e)]=function(){const _0x30bbd7=_0x1d2fe5;return VisuMZ[_0x30bbd7(0x39f)][_0x30bbd7(0x478)][_0x30bbd7(0x46a)][_0x30bbd7(0x363)];},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x30f)]=function(_0x12382e){const _0x350bb9=_0x1d2fe5,_0x31778c=this['categoryStyleCheck'](_0x12382e);if(_0x31778c===_0x350bb9(0x2b7))this[_0x350bb9(0x5c1)](_0x12382e);else _0x31778c===_0x350bb9(0x273)?this[_0x350bb9(0x479)](_0x12382e):Window_HorzCommand[_0x350bb9(0x3dc)][_0x350bb9(0x30f)]['call'](this,_0x12382e);},Window_ItemCategory[_0x1d2fe5(0x3dc)]['categoryStyle']=function(){const _0xfca650=_0x1d2fe5;return VisuMZ[_0xfca650(0x39f)]['Settings'][_0xfca650(0x46a)]['Style'];},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3e3)]=function(_0x51c124){const _0x558e83=_0x1d2fe5;if(_0x51c124<0x0)return _0x558e83(0x546);const _0x444037=this['categoryStyle']();if(_0x444037!=='auto')return _0x444037;else{const _0x3fd6ef=this[_0x558e83(0x5c3)](_0x51c124);if(_0x3fd6ef[_0x558e83(0x26a)](/\\I\[(\d+)\]/i)){const _0xfb608d=this[_0x558e83(0x422)](_0x51c124),_0x558530=this[_0x558e83(0x4fe)](_0x3fd6ef)['width'];return _0x558530<=_0xfb608d['width']?_0x558e83(0x2b7):'icon';}else return _0x558e83(0x546);}},Window_ItemCategory['prototype'][_0x1d2fe5(0x5c1)]=function(_0x438a80){const _0xcd3341=_0x1d2fe5,_0x535b11=this[_0xcd3341(0x422)](_0x438a80),_0x37782e=this[_0xcd3341(0x5c3)](_0x438a80),_0x11b0f8=this[_0xcd3341(0x4fe)](_0x37782e)['width'];this[_0xcd3341(0x5af)](this[_0xcd3341(0x204)](_0x438a80));const _0x2beefe=this[_0xcd3341(0x33e)]();if(_0x2beefe===_0xcd3341(0x5c0))this[_0xcd3341(0x340)](_0x37782e,_0x535b11['x']+_0x535b11['width']-_0x11b0f8,_0x535b11['y'],_0x11b0f8);else{if(_0x2beefe==='center'){const _0x4bc03e=_0x535b11['x']+Math[_0xcd3341(0x331)]((_0x535b11['width']-_0x11b0f8)/0x2);this[_0xcd3341(0x340)](_0x37782e,_0x4bc03e,_0x535b11['y'],_0x11b0f8);}else this[_0xcd3341(0x340)](_0x37782e,_0x535b11['x'],_0x535b11['y'],_0x11b0f8);}},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x479)]=function(_0x7fe673){const _0x38874e=_0x1d2fe5,_0x1be415=this[_0x38874e(0x5c3)](_0x7fe673);if(_0x1be415[_0x38874e(0x26a)](/\\I\[(\d+)\]/i)){const _0x5f3e9f=Number(RegExp['$1'])||0x0,_0x3b0358=this[_0x38874e(0x422)](_0x7fe673),_0x221b3b=_0x3b0358['x']+Math[_0x38874e(0x331)]((_0x3b0358[_0x38874e(0x20e)]-ImageManager[_0x38874e(0x513)])/0x2),_0x7aab=_0x3b0358['y']+(_0x3b0358[_0x38874e(0x548)]-ImageManager['iconHeight'])/0x2;this[_0x38874e(0x31c)](_0x5f3e9f,_0x221b3b,_0x7aab);}},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x322)]=Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2a1)],Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2a1)]=function(_0x508eef){const _0x5213be=_0x1d2fe5;VisuMZ[_0x5213be(0x39f)][_0x5213be(0x322)][_0x5213be(0x4e5)](this,_0x508eef),_0x508eef[_0x5213be(0x37b)]=this;},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3c8)]=function(){const _0x5a283e=_0x1d2fe5;Window_HorzCommand[_0x5a283e(0x3dc)]['callUpdateHelp']['call'](this);if(this['_categoryNameWindow'])this[_0x5a283e(0x23a)]();},Window_ItemCategory[_0x1d2fe5(0x3dc)]['updateCategoryNameWindow']=function(){const _0xcbf660=_0x1d2fe5,_0x4d3fc9=this[_0xcbf660(0x2f9)];_0x4d3fc9[_0xcbf660(0x2cc)][_0xcbf660(0x3f4)]();const _0x4caba5=this[_0xcbf660(0x3e3)](this[_0xcbf660(0x5ce)]());if(_0x4caba5===_0xcbf660(0x273)){const _0x2d1035=this[_0xcbf660(0x422)](this[_0xcbf660(0x5ce)]());let _0x451e1c=this[_0xcbf660(0x5c3)](this['index']());_0x451e1c=_0x451e1c[_0xcbf660(0x4b6)](/\\I\[(\d+)\]/gi,''),_0x4d3fc9[_0xcbf660(0x30c)](),this[_0xcbf660(0x2fa)](_0x451e1c,_0x2d1035),this[_0xcbf660(0x416)](_0x451e1c,_0x2d1035),this['categoryNameWindowCenter'](_0x451e1c,_0x2d1035);}},Window_ItemCategory[_0x1d2fe5(0x3dc)]['categoryNameWindowDrawBackground']=function(_0x7b3e54,_0xd78e29){},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x416)]=function(_0x6534f5,_0x2731a7){const _0x328500=_0x1d2fe5,_0x5b2902=this[_0x328500(0x2f9)];_0x5b2902['drawText'](_0x6534f5,0x0,_0x2731a7['y'],_0x5b2902[_0x328500(0x587)],_0x328500(0x49e));},Window_ItemCategory[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4a0)]=function(_0x309aab,_0x3e825e){const _0xb10567=_0x1d2fe5,_0x21d77e=this[_0xb10567(0x2f9)],_0x489b82=$gameSystem[_0xb10567(0x235)](),_0x55f1fe=_0x3e825e['x']+Math[_0xb10567(0x331)](_0x3e825e['width']/0x2)+_0x489b82;_0x21d77e['x']=_0x21d77e['width']/-0x2+_0x55f1fe,_0x21d77e['y']=Math[_0xb10567(0x331)](_0x3e825e[_0xb10567(0x548)]/0x2);},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3c0)]=function(){const _0x2c3135=_0x1d2fe5;if(this[_0x2c3135(0x531)]()){const _0x29c3e7=this[_0x2c3135(0x5ce)]();if(this['maxCols']()<=0x1)!this[_0x2c3135(0x3f9)](_0x2c3135(0x1ef))&&Input[_0x2c3135(0x210)](_0x2c3135(0x1ef))&&this['cursorPagedown'](),!this[_0x2c3135(0x3f9)]('pageup')&&Input[_0x2c3135(0x210)](_0x2c3135(0x24c))&&this[_0x2c3135(0x5c8)]();else this['maxCols']()>0x1&&(Input['isRepeated'](_0x2c3135(0x5c0))&&this['cursorRight'](Input['isTriggered']('right')),Input['isRepeated']('left')&&this[_0x2c3135(0x52a)](Input['isTriggered']('left')),this['limitedPageUpDownSceneCheck']()?(Input['isTriggered'](_0x2c3135(0x1ef))&&Input[_0x2c3135(0x46c)](_0x2c3135(0x39b))&&this[_0x2c3135(0x4dd)](),Input[_0x2c3135(0x210)]('pageup')&&Input[_0x2c3135(0x46c)](_0x2c3135(0x39b))&&this['cursorPageup']()):(Input[_0x2c3135(0x210)](_0x2c3135(0x1ef))&&this[_0x2c3135(0x4dd)](),Input[_0x2c3135(0x210)]('pageup')&&this[_0x2c3135(0x5c8)]()));Input[_0x2c3135(0x5de)](_0x2c3135(0x56e))&&(Input['isPressed'](_0x2c3135(0x39b))&&this[_0x2c3135(0x3d3)]()?this[_0x2c3135(0x4dd)]():this[_0x2c3135(0x220)](Input[_0x2c3135(0x210)](_0x2c3135(0x56e)))),Input[_0x2c3135(0x5de)]('up')&&(Input[_0x2c3135(0x46c)](_0x2c3135(0x39b))&&this[_0x2c3135(0x3d3)]()?this[_0x2c3135(0x5c8)]():this['cursorUp'](Input[_0x2c3135(0x210)]('up'))),Imported[_0x2c3135(0x5bb)]&&this[_0x2c3135(0x252)](),this[_0x2c3135(0x5ce)]()!==_0x29c3e7&&this[_0x2c3135(0x20b)]();}},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x36b)]=function(){const _0x1ff731=_0x1d2fe5,_0x7befc4=SceneManager[_0x1ff731(0x285)],_0x2fda36=[Scene_Item,Scene_Shop];return _0x2fda36[_0x1ff731(0x382)](_0x7befc4['constructor']);},Window_ItemList['prototype'][_0x1d2fe5(0x1c7)]=function(){const _0xe757ab=_0x1d2fe5;Window_Selectable[_0xe757ab(0x3dc)][_0xe757ab(0x1c7)][_0xe757ab(0x4e5)](this),this[_0xe757ab(0x37b)]&&this['_categoryWindow']['isUseModernControls']()&&this[_0xe757ab(0x37b)][_0xe757ab(0x1c7)]();},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x412)]=function(){const _0x307d0c=_0x1d2fe5;Window_Selectable[_0x307d0c(0x3dc)]['deactivate'][_0x307d0c(0x4e5)](this),this[_0x307d0c(0x37b)]&&this[_0x307d0c(0x37b)][_0x307d0c(0x2fc)]()&&this[_0x307d0c(0x37b)]['deactivate']();},Window_ItemList['prototype'][_0x1d2fe5(0x280)]=function(_0x31ca7e){const _0x1ba71a=_0x1d2fe5;this[_0x1ba71a(0x59b)]!==_0x31ca7e&&(this[_0x1ba71a(0x59b)]=_0x31ca7e,this[_0x1ba71a(0x449)](),this[_0x1ba71a(0x37b)]&&this[_0x1ba71a(0x37b)][_0x1ba71a(0x2fc)]()?this[_0x1ba71a(0x302)](0x0):this[_0x1ba71a(0x214)](0x0,0x0));},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x48f)]=Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4af)],Window_ItemList['prototype'][_0x1d2fe5(0x4af)]=function(){const _0xb91016=_0x1d2fe5;if(SceneManager[_0xb91016(0x285)][_0xb91016(0x593)]===Scene_Battle)return VisuMZ[_0xb91016(0x39f)][_0xb91016(0x48f)][_0xb91016(0x4e5)](this);else return SceneManager['_scene'][_0xb91016(0x593)]===Scene_Map?VisuMZ[_0xb91016(0x39f)][_0xb91016(0x48f)]['call'](this):VisuMZ['ItemsEquipsCore']['Settings'][_0xb91016(0x503)][_0xb91016(0x39a)];},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x580)]=Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x257)],Window_ItemList[_0x1d2fe5(0x3dc)]['colSpacing']=function(){const _0x301a74=_0x1d2fe5;return this[_0x301a74(0x4af)]()<=0x1?Window_Selectable['prototype'][_0x301a74(0x257)][_0x301a74(0x4e5)](this):VisuMZ[_0x301a74(0x39f)]['Window_ItemList_colSpacing']['call'](this);},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x382)]=function(_0x1eaf6d){const _0x207546=_0x1d2fe5;switch(this[_0x207546(0x59b)]){case'AllItems':return DataManager[_0x207546(0x36e)](_0x1eaf6d);case _0x207546(0x305):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x553)]===0x1;case _0x207546(0x5d9):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x553)]===0x2;case _0x207546(0x43d):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x553)]===0x3;case'HiddenItemB':return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x553)]===0x4;case _0x207546(0x57e):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x2e8)];case _0x207546(0x54c):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&!_0x1eaf6d[_0x207546(0x2e8)];case _0x207546(0x4a9):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&[0x0]['includes'](_0x1eaf6d[_0x207546(0x5cb)]);case'BattleUsable':return DataManager['isItem'](_0x1eaf6d)&&[0x0,0x1][_0x207546(0x382)](_0x1eaf6d[_0x207546(0x5cb)]);case _0x207546(0x26e):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&[0x0,0x2][_0x207546(0x382)](_0x1eaf6d[_0x207546(0x5cb)]);case _0x207546(0x247):return DataManager[_0x207546(0x36e)](_0x1eaf6d)&&[0x3][_0x207546(0x382)](_0x1eaf6d[_0x207546(0x5cb)]);case _0x207546(0x341):return DataManager['isWeapon'](_0x1eaf6d);case _0x207546(0x45f):return DataManager[_0x207546(0x1f8)](_0x1eaf6d);default:if(this[_0x207546(0x59b)][_0x207546(0x26a)](/WTYPE:(\d+)/i))return DataManager[_0x207546(0x415)](_0x1eaf6d)&&_0x1eaf6d['wtypeId']===Number(RegExp['$1']);else{if(this[_0x207546(0x59b)][_0x207546(0x26a)](/WTYPE:(.*)/i)){const _0x3a7b92=$dataSystem[_0x207546(0x28a)][_0x207546(0x338)](String(RegExp['$1'])[_0x207546(0x5a1)]());return DataManager[_0x207546(0x415)](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x2ef)]===_0x3a7b92;}else{if(this[_0x207546(0x59b)][_0x207546(0x26a)](/ATYPE:(\d+)/i))return DataManager[_0x207546(0x1f8)](_0x1eaf6d)&&_0x1eaf6d['atypeId']===Number(RegExp['$1']);else{if(this[_0x207546(0x59b)][_0x207546(0x26a)](/ATYPE:(.*)/i)){const _0x1b905f=$dataSystem['armorTypes'][_0x207546(0x338)](String(RegExp['$1'])[_0x207546(0x5a1)]());return DataManager[_0x207546(0x1f8)](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x2d2)]===_0x1b905f;}else{if(this['_category'][_0x207546(0x26a)](/ETYPE:(\d+)/i))return!!_0x1eaf6d&&_0x1eaf6d['etypeId']===Number(RegExp['$1']);else{if(this['_category'][_0x207546(0x26a)](/ETYPE:(.*)/i)){const _0x4abe19=$dataSystem['equipTypes'][_0x207546(0x338)](String(RegExp['$1'])[_0x207546(0x5a1)]());return DataManager['isArmor'](_0x1eaf6d)&&_0x1eaf6d[_0x207546(0x473)]===_0x4abe19;}else{if(this['_category'][_0x207546(0x26a)](/Category:(.*)/i))return!!_0x1eaf6d&&_0x1eaf6d[_0x207546(0x540)][_0x207546(0x382)](String(RegExp['$1'])[_0x207546(0x27f)]()['trim']());}}}}}}}return![];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x53f)]=Window_ItemList[_0x1d2fe5(0x3dc)]['makeItemList'],Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x213)]=function(){const _0x49e37f=_0x1d2fe5;VisuMZ[_0x49e37f(0x39f)]['Window_ItemList_makeItemList'][_0x49e37f(0x4e5)](this);if(this[_0x49e37f(0x55f)]())this[_0x49e37f(0x459)]();},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x55f)]=function(){const _0x358f0b=_0x1d2fe5,_0x30b48a=[_0x358f0b(0x4e9),_0x358f0b(0x3ff),'Scene_Equip',_0x358f0b(0x1ce)],_0x39268c=SceneManager[_0x358f0b(0x285)];return _0x30b48a[_0x358f0b(0x382)](_0x39268c[_0x358f0b(0x593)]['name']);},Window_ItemList[_0x1d2fe5(0x3dc)]['sortListItemScene']=function(){const _0x861476=_0x1d2fe5,_0x4c50b3=Window_ItemCategory[_0x861476(0x5a5)],_0x28827f=_0x4c50b3['find'](_0x27b6e5=>_0x27b6e5['Type']===this['_category']);if(!_0x28827f){VisuMZ['ItemsEquipsCore']['SortByIDandPriority'](this[_0x861476(0x3a2)]);return;}const _0x14cd55=((_0x28827f[_0x861476(0x3d4)]??'ID')||'ID')[_0x861476(0x27f)]()[_0x861476(0x5a1)]();_0x14cd55==='NAME'?this[_0x861476(0x3a2)][_0x861476(0x2c8)]((_0x5d4a9e,_0x20b4a5)=>{const _0x495482=_0x861476;if(!!_0x5d4a9e&&!!_0x20b4a5)return _0x5d4a9e[_0x495482(0x36f)]['localeCompare'](_0x20b4a5[_0x495482(0x36f)]);return 0x0;}):VisuMZ[_0x861476(0x39f)][_0x861476(0x1e7)](this[_0x861476(0x3a2)]);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x1e7)]=function(_0x5bac1e){const _0x9997b4=_0x1d2fe5;return _0x5bac1e[_0x9997b4(0x2c8)]((_0x4b2398,_0x598fb5)=>{const _0x1b6abe=_0x9997b4;if(!!_0x4b2398&&!!_0x598fb5){if(_0x4b2398[_0x1b6abe(0x1f1)]===undefined)VisuMZ[_0x1b6abe(0x39f)][_0x1b6abe(0x52b)](_0x4b2398);if(_0x598fb5['sortPriority']===undefined)VisuMZ[_0x1b6abe(0x39f)][_0x1b6abe(0x52b)](_0x598fb5);const _0x10470d=_0x4b2398[_0x1b6abe(0x1f1)],_0x5cc16c=_0x598fb5[_0x1b6abe(0x1f1)];if(_0x10470d!==_0x5cc16c)return _0x5cc16c-_0x10470d;return _0x4b2398['id']-_0x598fb5['id'];}return 0x0;}),_0x5bac1e;},Window_ItemList['prototype'][_0x1d2fe5(0x38d)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x551)]=Window_ItemList['prototype'][_0x1d2fe5(0x30f)],Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x30f)]=function(_0x245953){const _0x2f27ce=_0x1d2fe5;VisuMZ[_0x2f27ce(0x39f)][_0x2f27ce(0x551)][_0x2f27ce(0x4e5)](this,_0x245953),this['placeItemNewLabel'](_0x245953);},Window_ItemList['prototype']['drawItemNumber']=function(_0x176ac0,_0x5d3eba,_0x1db664,_0x3ba6f4){const _0x4278ca=_0x1d2fe5;Window_Selectable[_0x4278ca(0x3dc)][_0x4278ca(0x1fb)]['call'](this,_0x176ac0,_0x5d3eba,_0x1db664,_0x3ba6f4);},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x28c)]=function(_0x86930f){const _0x3ce5aa=_0x1d2fe5,_0x5e0914=this[_0x3ce5aa(0x56b)](_0x86930f);if(!_0x5e0914||!this[_0x3ce5aa(0x38d)]())return;if(!$gameParty[_0x3ce5aa(0x27e)](_0x5e0914))return;const _0x456a02=this[_0x3ce5aa(0x422)](_0x86930f),_0x4ec97e=_0x456a02['x'],_0x3d782a=_0x456a02['y']+(this['lineHeight']()-ImageManager[_0x3ce5aa(0x436)])/0x2,_0x510336=VisuMZ[_0x3ce5aa(0x39f)][_0x3ce5aa(0x478)][_0x3ce5aa(0x358)]['OffsetX'],_0x59ab78=VisuMZ[_0x3ce5aa(0x39f)]['Settings']['New']['OffsetY'];this[_0x3ce5aa(0x51d)](_0x5e0914,_0x4ec97e+_0x510336,_0x3d782a+_0x59ab78);},Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x301)]=function(_0x42fc84){const _0x129960=_0x1d2fe5;this[_0x129960(0x4cb)]=_0x42fc84,this[_0x129960(0x3c8)]();},VisuMZ[_0x1d2fe5(0x39f)]['Window_ItemList_updateHelp']=Window_ItemList['prototype']['updateHelp'],Window_ItemList[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1d1)]=function(){const _0x5941de=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x5941de(0x27d)][_0x5941de(0x4e5)](this),this['_statusWindow']&&this[_0x5941de(0x4cb)][_0x5941de(0x593)]===Window_ShopStatus&&this['_statusWindow']['setItem'](this[_0x5941de(0x4f0)]());},Window_BattleItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x231)]=function(_0x18d48d){const _0x1dd0f5=_0x1d2fe5;return BattleManager[_0x1dd0f5(0x4ff)]()?BattleManager[_0x1dd0f5(0x4ff)]()[_0x1dd0f5(0x2a8)](_0x18d48d):Window_ItemList[_0x1dd0f5(0x3dc)]['isEnabled'][_0x1dd0f5(0x4e5)](this,_0x18d48d);},Window_EventItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x38d)]=function(){return![];},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2d8)]=function(){const _0x4d0064=_0x1d2fe5;return VisuMZ[_0x4d0064(0x39f)]['Settings'][_0x4d0064(0x385)][_0x4d0064(0x4f2)];},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x25e)]=Window_EquipStatus['prototype'][_0x1d2fe5(0x449)],Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x449)]=function(){const _0x4e4b2e=_0x1d2fe5;this[_0x4e4b2e(0x3cd)](),this[_0x4e4b2e(0x30c)]();if(this['_actor'])this[_0x4e4b2e(0x418)][_0x4e4b2e(0x449)]();this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x4e4b2e(0x491)]():VisuMZ[_0x4e4b2e(0x39f)][_0x4e4b2e(0x25e)][_0x4e4b2e(0x4e5)](this);},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x491)]=function(){const _0x5cddc8=_0x1d2fe5;this['contents'][_0x5cddc8(0x3f4)]();if(!this[_0x5cddc8(0x418)])return;if(this[_0x5cddc8(0x1e1)]()){const _0x353277=ImageManager[_0x5cddc8(0x4ba)](this['_actor'][_0x5cddc8(0x34b)]());_0x353277[_0x5cddc8(0x2f8)](this[_0x5cddc8(0x461)][_0x5cddc8(0x2ec)](this));}else this[_0x5cddc8(0x3a3)]();},Window_EquipStatus[_0x1d2fe5(0x3dc)]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x2c1f1d=_0x1d2fe5;return Imported[_0x2c1f1d(0x42b)]&&this[_0x2c1f1d(0x418)][_0x2c1f1d(0x34b)]()!==''&&VisuMZ[_0x2c1f1d(0x39f)][_0x2c1f1d(0x478)]['EquipScene'][_0x2c1f1d(0x205)];},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x461)]=function(){const _0x243a4d=_0x1d2fe5;VisuMZ['ItemsEquipsCore'][_0x243a4d(0x478)][_0x243a4d(0x385)][_0x243a4d(0x5ca)][_0x243a4d(0x4e5)](this),this[_0x243a4d(0x270)]();},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3a3)]=function(){const _0xe61d7c=_0x1d2fe5;VisuMZ[_0xe61d7c(0x39f)][_0xe61d7c(0x478)][_0xe61d7c(0x385)][_0xe61d7c(0x424)][_0xe61d7c(0x4e5)](this),this[_0xe61d7c(0x270)]();},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x270)]=function(){const _0xef79aa=_0x1d2fe5;this[_0xef79aa(0x30c)](),VisuMZ['ItemsEquipsCore'][_0xef79aa(0x478)][_0xef79aa(0x385)][_0xef79aa(0x37e)]['call'](this);},Window_EquipStatus['prototype'][_0x1d2fe5(0x2b1)]=function(_0x37854a,_0x4a8e99,_0x259f78,_0x519a0d,_0x4feb21){const _0x40fce5=_0x1d2fe5,_0x4b16c7=ImageManager['loadPicture'](_0x37854a[_0x40fce5(0x34b)]()),_0x5d57b2=this['innerWidth']-_0x4b16c7['width'];_0x4a8e99+=_0x5d57b2/0x2;if(_0x5d57b2<0x0)_0x519a0d-=_0x5d57b2;Window_StatusBase[_0x40fce5(0x3dc)]['drawItemActorMenuImage'][_0x40fce5(0x4e5)](this,_0x37854a,_0x4a8e99,_0x259f78,_0x519a0d,_0x4feb21);},Window_EquipStatus['prototype']['actorParams']=function(){const _0x1102e9=_0x1d2fe5;return Imported[_0x1102e9(0x5bb)]?VisuMZ['CoreEngine']['Settings'][_0x1102e9(0x4bb)][_0x1102e9(0x5a9)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x315)]=function(){const _0x3c3763=_0x1d2fe5;return VisuMZ[_0x3c3763(0x39f)][_0x3c3763(0x478)]['EquipScene'][_0x3c3763(0x289)];},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x494)]=function(){const _0x4a7f56=_0x1d2fe5;return Imported[_0x4a7f56(0x5bb)]&&VisuMZ['CoreEngine']['Settings'][_0x4a7f56(0x4bb)][_0x4a7f56(0x35a)];},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x395)]=function(_0x148727,_0x5b42dc,_0x134735,_0x5cbf0d){const _0x382526=_0x1d2fe5,_0x53ca54=this[_0x382526(0x523)]();Imported[_0x382526(0x5bb)]?this[_0x382526(0x2ee)](_0x5b42dc+_0x53ca54,_0x134735,_0x5cbf0d,_0x148727,![]):this[_0x382526(0x4d1)](TextManager[_0x382526(0x529)](_0x148727),_0x5b42dc+_0x53ca54,_0x134735,_0x5cbf0d);},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x59e)]=function(_0x5d1976,_0x237674,_0x2efbae,_0x5daa0c){const _0x102139=_0x1d2fe5,_0x17096c=this[_0x102139(0x523)]();let _0x5c7732=0x0;Imported['VisuMZ_0_CoreEngine']?_0x5c7732=this['_actor'][_0x102139(0x59a)](_0x5d1976,!![]):_0x5c7732=this[_0x102139(0x418)]['param'](_0x5d1976);const _0x55649d=_0x5c7732;this['drawText'](_0x5c7732,_0x237674,_0x2efbae,_0x5daa0c-_0x17096c,_0x102139(0x5c0));},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x482)]=function(_0x193bac,_0x450a94,_0x368a6a,_0x18acdc){const _0x14822f=_0x1d2fe5,_0x5bef2b=this['itemPadding']();let _0x326afe=0x0,_0x5ebc32=0x0,_0x5c465b='';if(this[_0x14822f(0x28f)]){Imported[_0x14822f(0x5bb)]?(_0x326afe=this[_0x14822f(0x418)][_0x14822f(0x59a)](_0x193bac,![]),_0x5ebc32=this[_0x14822f(0x28f)][_0x14822f(0x59a)](_0x193bac,![]),_0x5c465b=this['_tempActor']['paramValueByName'](_0x193bac,!![])):(_0x326afe=this['_actor'][_0x14822f(0x529)](_0x193bac),_0x5ebc32=this[_0x14822f(0x28f)][_0x14822f(0x529)](_0x193bac),_0x5c465b=this[_0x14822f(0x28f)][_0x14822f(0x529)](_0x193bac));const _0x46692e=_0x326afe,_0x152340=_0x5ebc32;diffValue=_0x152340-_0x46692e,this[_0x14822f(0x4e2)](ColorManager[_0x14822f(0x58c)](diffValue)),this['drawText'](_0x5c465b,_0x450a94,_0x368a6a,_0x18acdc-_0x5bef2b,_0x14822f(0x5c0));}},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x49d)]=function(_0x13caed,_0x1d7e70,_0x8eb11f,_0x37ee7b){const _0x49aa20=_0x1d2fe5,_0x31455d=this[_0x49aa20(0x523)]();let _0x3b3925=0x0,_0x1f870e=0x0,_0x28f796=![];if(this[_0x49aa20(0x28f)]){Imported[_0x49aa20(0x5bb)]?(_0x3b3925=this[_0x49aa20(0x418)]['paramValueByName'](_0x13caed,![]),_0x1f870e=this['_tempActor'][_0x49aa20(0x59a)](_0x13caed,![]),_0x28f796=String(this['_actor'][_0x49aa20(0x59a)](_0x13caed,!![]))[_0x49aa20(0x26a)](/([%％])/i)):(_0x3b3925=this[_0x49aa20(0x418)]['param'](_0x13caed),_0x1f870e=this['_tempActor'][_0x49aa20(0x529)](_0x13caed),_0x28f796=_0x3b3925%0x1!==0x0||_0x1f870e%0x1!==0x0);const _0x2b23c8=_0x3b3925,_0x30259b=_0x1f870e,_0x58e1c5=_0x30259b-_0x2b23c8;let _0x4189c4=_0x58e1c5;if(_0x28f796)_0x4189c4=Math[_0x49aa20(0x4a8)](_0x58e1c5*0x64)+'%';_0x58e1c5!==0x0&&(this[_0x49aa20(0x4e2)](ColorManager['paramchangeTextColor'](_0x58e1c5)),_0x4189c4=(_0x58e1c5>0x0?'(+%1)':_0x49aa20(0x3ab))[_0x49aa20(0x44f)](_0x4189c4),this[_0x49aa20(0x4d1)](_0x4189c4,_0x1d7e70+_0x31455d,_0x8eb11f,_0x37ee7b,_0x49aa20(0x393)));}},Window_EquipStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x47c)]=function(_0x239dd0,_0x2d75b6,_0x4cf833,_0x2f87dd,_0x426094){const _0x1d5491=_0x1d2fe5;if(VisuMZ['ItemsEquipsCore'][_0x1d5491(0x478)][_0x1d5491(0x385)]['DrawBackRect']===![])return;_0x426094=Math[_0x1d5491(0x572)](_0x426094||0x1,0x1);while(_0x426094--){_0x2f87dd=_0x2f87dd||this['lineHeight'](),this['contents'][_0x1d5491(0x251)]=0xa0;const _0x30a985=ColorManager[_0x1d5491(0x1e6)]();this['contents']['fillRect'](_0x239dd0+0x1,_0x2d75b6+0x1,_0x4cf833-0x2,_0x2f87dd-0x2,_0x30a985),this['contents'][_0x1d5491(0x251)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x4c7a9a=_0x1d2fe5,_0x3b2400=VisuMZ['ItemsEquipsCore'][_0x4c7a9a(0x478)][_0x4c7a9a(0x385)];let _0x173c04=_0x3b2400[_0x4c7a9a(0x25a)]!==undefined?_0x3b2400[_0x4c7a9a(0x25a)]:0x13;return ColorManager[_0x4c7a9a(0x3fc)](_0x173c04);},VisuMZ[_0x1d2fe5(0x39f)]['Window_EquipCommand_initialize']=Window_EquipCommand[_0x1d2fe5(0x3dc)]['initialize'],Window_EquipCommand['prototype']['initialize']=function(_0x50c076){const _0x373008=_0x1d2fe5;VisuMZ['ItemsEquipsCore']['Window_EquipCommand_initialize']['call'](this,_0x50c076),this[_0x373008(0x26f)](_0x50c076);},Window_EquipCommand['prototype'][_0x1d2fe5(0x26f)]=function(_0x59fb02){const _0x3aa4fe=_0x1d2fe5,_0x111970=new Rectangle(0x0,0x0,_0x59fb02[_0x3aa4fe(0x20e)],_0x59fb02[_0x3aa4fe(0x548)]);this[_0x3aa4fe(0x42d)]=new Window_Base(_0x111970),this[_0x3aa4fe(0x42d)][_0x3aa4fe(0x59c)]=0x0,this['addChild'](this[_0x3aa4fe(0x42d)]),this[_0x3aa4fe(0x303)]();},Window_EquipCommand['prototype'][_0x1d2fe5(0x3c8)]=function(){const _0x181a97=_0x1d2fe5;Window_HorzCommand['prototype'][_0x181a97(0x3c8)]['call'](this);if(this[_0x181a97(0x42d)])this['updateCommandNameWindow']();},Window_EquipCommand[_0x1d2fe5(0x3dc)]['updateCommandNameWindow']=function(){const _0x3e0097=_0x1d2fe5,_0x363f49=this[_0x3e0097(0x42d)];_0x363f49['contents'][_0x3e0097(0x3f4)]();const _0x85c66a=this[_0x3e0097(0x293)](this[_0x3e0097(0x5ce)]());if(_0x85c66a===_0x3e0097(0x273)){const _0x29a28e=this[_0x3e0097(0x422)](this[_0x3e0097(0x5ce)]());let _0x5bd4c5=this[_0x3e0097(0x5c3)](this[_0x3e0097(0x5ce)]());_0x5bd4c5=_0x5bd4c5[_0x3e0097(0x4b6)](/\\I\[(\d+)\]/gi,''),_0x363f49[_0x3e0097(0x30c)](),this['commandNameWindowDrawBackground'](_0x5bd4c5,_0x29a28e),this[_0x3e0097(0x588)](_0x5bd4c5,_0x29a28e),this['commandNameWindowCenter'](_0x5bd4c5,_0x29a28e);}},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3d1)]=function(_0x5b3d7e,_0x1a8390){},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x588)]=function(_0x1645e3,_0x1952b0){const _0x1905bb=_0x1d2fe5,_0x3caa54=this['_commandNameWindow'];_0x3caa54[_0x1905bb(0x4d1)](_0x1645e3,0x0,_0x1952b0['y'],_0x3caa54[_0x1905bb(0x587)],_0x1905bb(0x49e));},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4da)]=function(_0x1835e9,_0x26c775){const _0x358511=_0x1d2fe5,_0x11d830=this[_0x358511(0x42d)],_0x58ff06=$gameSystem[_0x358511(0x235)](),_0x39d7bc=_0x26c775['x']+Math[_0x358511(0x331)](_0x26c775['width']/0x2)+_0x58ff06;_0x11d830['x']=_0x11d830[_0x358511(0x20e)]/-0x2+_0x39d7bc,_0x11d830['y']=Math[_0x358511(0x331)](_0x26c775[_0x358511(0x548)]/0x2);},Window_EquipCommand['prototype'][_0x1d2fe5(0x2fc)]=function(){const _0x3ac0ac=_0x1d2fe5;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x3ac0ac(0x3dc)][_0x3ac0ac(0x2fc)][_0x3ac0ac(0x4e5)](this);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x36c)]=function(){const _0x180392=_0x1d2fe5;if(this[_0x180392(0x249)]()===_0x180392(0x2fd))Window_HorzCommand[_0x180392(0x3dc)][_0x180392(0x36c)][_0x180392(0x4e5)](this);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3c0)]=function(){const _0x44b188=_0x1d2fe5;!this[_0x44b188(0x58e)]()&&Window_HorzCommand[_0x44b188(0x3dc)][_0x44b188(0x3c0)]['call'](this);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x58e)]=function(){const _0x28681d=_0x1d2fe5;if(!this[_0x28681d(0x531)]())return![];if(SceneManager[_0x28681d(0x285)][_0x28681d(0x593)]!==Scene_Equip)return![];return Input[_0x28681d(0x210)](_0x28681d(0x56e))&&this[_0x28681d(0x521)](),![];},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x521)]=function(){const _0x5ae84d=_0x1d2fe5;this[_0x5ae84d(0x20b)](),SceneManager['_scene']['commandEquip'](),SceneManager['_scene'][_0x5ae84d(0x3e5)][_0x5ae84d(0x302)](-0x1);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4af)]=function(){const _0xc07973=_0x1d2fe5;return this[_0xc07973(0x404)]?this['_list'][_0xc07973(0x2d3)]:0x3;},Window_EquipCommand['prototype']['processTouchModernControls']=function(){const _0x4f1fa3=_0x1d2fe5;if(this[_0x4f1fa3(0x594)]()&&this[_0x4f1fa3(0x5c5)]&&SceneManager[_0x4f1fa3(0x285)]['constructor']===Scene_Equip){if(this[_0x4f1fa3(0x499)]()&&TouchInput[_0x4f1fa3(0x5c6)]())this['onTouchSelectModernControls'](![]);else TouchInput[_0x4f1fa3(0x210)]()&&this[_0x4f1fa3(0x505)](!![]);TouchInput[_0x4f1fa3(0x3bb)]()&&this['onTouchOk']();}},Window_EquipCommand[_0x1d2fe5(0x3dc)]['onTouchSelectModernControls']=function(_0x252fda){const _0x419cf1=_0x1d2fe5;this[_0x419cf1(0x392)]=![];const _0x200d99=this[_0x419cf1(0x5ce)](),_0x58f6d8=this[_0x419cf1(0x206)](),_0x1c5756=SceneManager[_0x419cf1(0x285)]['_slotWindow'];if(_0x1c5756[_0x419cf1(0x594)]()&&_0x1c5756['visible']){if(_0x58f6d8>=0x0)_0x58f6d8===this['index']()&&(this[_0x419cf1(0x392)]=!![]),this[_0x419cf1(0x1c7)](),this[_0x419cf1(0x4a4)](_0x58f6d8);else _0x1c5756['hitIndex']()>=0x0&&(this[_0x419cf1(0x412)](),this[_0x419cf1(0x471)]());}_0x252fda&&this[_0x419cf1(0x5ce)]()!==_0x200d99&&this['playCursorSound']();},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x269)]=function(){const _0x145d99=_0x1d2fe5;this[_0x145d99(0x3e1)](),this['addOptimizeCommand'](),this[_0x145d99(0x401)]();},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x449)]=function(){const _0x5b965f=_0x1d2fe5;Window_HorzCommand['prototype'][_0x5b965f(0x449)][_0x5b965f(0x4e5)](this),this[_0x5b965f(0x568)]();},Window_EquipCommand['prototype'][_0x1d2fe5(0x3e1)]=function(){const _0x3bf3cb=_0x1d2fe5;if(!this[_0x3bf3cb(0x55b)]())return;const _0x220a66=this[_0x3bf3cb(0x35f)](),_0x2cc7d2=VisuMZ[_0x3bf3cb(0x39f)]['Settings'][_0x3bf3cb(0x385)]['CmdIconEquip'],_0x48d5f0=_0x220a66===_0x3bf3cb(0x546)?TextManager[_0x3bf3cb(0x56a)]:_0x3bf3cb(0x259)[_0x3bf3cb(0x44f)](_0x2cc7d2,TextManager[_0x3bf3cb(0x56a)]),_0x28f22c=this['isEquipCommandEnabled']();this['addCommand'](_0x48d5f0,'equip',_0x28f22c);},Window_EquipCommand['prototype'][_0x1d2fe5(0x55b)]=function(){const _0x1cacc7=_0x1d2fe5;return!this[_0x1cacc7(0x2fc)]();},Window_EquipCommand['prototype']['isEquipCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x502)]=function(){const _0xb6e144=_0x1d2fe5;if(!this[_0xb6e144(0x290)]())return;const _0x17d69c=this[_0xb6e144(0x35f)](),_0x2bce76=VisuMZ[_0xb6e144(0x39f)][_0xb6e144(0x478)][_0xb6e144(0x385)][_0xb6e144(0x4dc)],_0x171942=_0x17d69c===_0xb6e144(0x546)?TextManager['optimize']:_0xb6e144(0x259)['format'](_0x2bce76,TextManager['optimize']),_0x425e56=this['isOptimizeCommandEnabled']();this['addCommand'](_0x171942,_0xb6e144(0x3ed),_0x425e56);},Window_EquipCommand[_0x1d2fe5(0x3dc)]['isOptimizeCommandAdded']=function(){const _0x5187a3=_0x1d2fe5;return VisuMZ[_0x5187a3(0x39f)][_0x5187a3(0x478)][_0x5187a3(0x385)][_0x5187a3(0x298)];},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2c7)]=function(){return!![];},Window_EquipCommand['prototype'][_0x1d2fe5(0x401)]=function(){const _0x391b5a=_0x1d2fe5;if(!this[_0x391b5a(0x4cd)]())return;const _0x258a9f=this[_0x391b5a(0x35f)](),_0x5ba265=VisuMZ['ItemsEquipsCore'][_0x391b5a(0x478)][_0x391b5a(0x385)][_0x391b5a(0x55a)],_0x3e8946=_0x258a9f==='text'?TextManager[_0x391b5a(0x3f4)]:_0x391b5a(0x259)[_0x391b5a(0x44f)](_0x5ba265,TextManager[_0x391b5a(0x3f4)]),_0x5bcf04=this[_0x391b5a(0x386)]();this[_0x391b5a(0x467)](_0x3e8946,_0x391b5a(0x3f4),_0x5bcf04);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4cd)]=function(){const _0x4a2724=_0x1d2fe5;return VisuMZ[_0x4a2724(0x39f)]['Settings'][_0x4a2724(0x385)]['CommandAddClear'];},Window_EquipCommand[_0x1d2fe5(0x3dc)]['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x33e)]=function(){const _0x298906=_0x1d2fe5;return VisuMZ['ItemsEquipsCore'][_0x298906(0x478)][_0x298906(0x385)]['CmdTextAlign'];},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x30f)]=function(_0x159479){const _0x1292a5=_0x1d2fe5,_0x5c4d8c=this['commandStyleCheck'](_0x159479);if(_0x5c4d8c===_0x1292a5(0x2b7))this[_0x1292a5(0x5c1)](_0x159479);else _0x5c4d8c==='icon'?this[_0x1292a5(0x479)](_0x159479):Window_HorzCommand['prototype']['drawItem'][_0x1292a5(0x4e5)](this,_0x159479);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x35f)]=function(){const _0x678722=_0x1d2fe5;return VisuMZ[_0x678722(0x39f)][_0x678722(0x478)][_0x678722(0x385)][_0x678722(0x4c0)];},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x293)]=function(_0x1c0576){const _0x3af22d=_0x1d2fe5;if(_0x1c0576<0x0)return _0x3af22d(0x546);const _0x3c6b8c=this[_0x3af22d(0x35f)]();if(_0x3c6b8c!==_0x3af22d(0x3c2))return _0x3c6b8c;else{if(this['maxItems']()>0x0){const _0x5142c0=this[_0x3af22d(0x5c3)](_0x1c0576);if(_0x5142c0[_0x3af22d(0x26a)](/\\I\[(\d+)\]/i)){const _0x1286ad=this[_0x3af22d(0x422)](_0x1c0576),_0x2a155a=this[_0x3af22d(0x4fe)](_0x5142c0)[_0x3af22d(0x20e)];return _0x2a155a<=_0x1286ad[_0x3af22d(0x20e)]?'iconText':'icon';}}}return _0x3af22d(0x546);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5c1)]=function(_0x56a4ce){const _0x5a2f5f=_0x1d2fe5,_0x314787=this[_0x5a2f5f(0x422)](_0x56a4ce),_0x345ca5=this['commandName'](_0x56a4ce),_0x21f855=this[_0x5a2f5f(0x4fe)](_0x345ca5)['width'];this[_0x5a2f5f(0x5af)](this['isCommandEnabled'](_0x56a4ce));const _0x30f73b=this[_0x5a2f5f(0x33e)]();if(_0x30f73b===_0x5a2f5f(0x5c0))this[_0x5a2f5f(0x340)](_0x345ca5,_0x314787['x']+_0x314787[_0x5a2f5f(0x20e)]-_0x21f855,_0x314787['y'],_0x21f855);else{if(_0x30f73b===_0x5a2f5f(0x49e)){const _0x2d199d=_0x314787['x']+Math[_0x5a2f5f(0x331)]((_0x314787['width']-_0x21f855)/0x2);this['drawTextEx'](_0x345ca5,_0x2d199d,_0x314787['y'],_0x21f855);}else this[_0x5a2f5f(0x340)](_0x345ca5,_0x314787['x'],_0x314787['y'],_0x21f855);}},Window_EquipCommand['prototype'][_0x1d2fe5(0x479)]=function(_0x2f7b7b){const _0x9ae552=_0x1d2fe5;this['commandName'](_0x2f7b7b)[_0x9ae552(0x26a)](/\\I\[(\d+)\]/i);const _0x11f4f4=Number(RegExp['$1'])||0x0,_0x36f2e3=this[_0x9ae552(0x422)](_0x2f7b7b),_0xc445ef=_0x36f2e3['x']+Math[_0x9ae552(0x331)]((_0x36f2e3[_0x9ae552(0x20e)]-ImageManager[_0x9ae552(0x513)])/0x2),_0x4a712e=_0x36f2e3['y']+(_0x36f2e3['height']-ImageManager[_0x9ae552(0x436)])/0x2;this[_0x9ae552(0x31c)](_0x11f4f4,_0xc445ef,_0x4a712e);},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4ff)]=function(){const _0x2102d7=_0x1d2fe5,_0xb36b24=SceneManager[_0x2102d7(0x285)];if(_0xb36b24&&_0xb36b24['user'])return _0xb36b24[_0x2102d7(0x2fe)]();return null;},Window_EquipCommand['prototype'][_0x1d2fe5(0x1d1)]=function(){const _0x3737ed=_0x1d2fe5;Window_Command['prototype'][_0x3737ed(0x1d1)][_0x3737ed(0x4e5)](this),this[_0x3737ed(0x4ef)][_0x3737ed(0x4a3)](this['helpDescriptionText']());},Window_EquipCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x321)]=function(){const _0x770266=_0x1d2fe5,_0x4e82c3=this['currentSymbol']();switch(_0x4e82c3){case _0x770266(0x2fd):return TextManager['ITEMS_EQUIPS_CORE'][_0x770266(0x2b5)][_0x770266(0x2fd)];case _0x770266(0x3ed):return TextManager[_0x770266(0x2b8)][_0x770266(0x2b5)]['optimize'];case _0x770266(0x3f4):return TextManager[_0x770266(0x2b8)][_0x770266(0x2b5)][_0x770266(0x3f4)];default:return'';}},Window_EquipSlot[_0x1d2fe5(0x3dc)]['isUseModernControls']=function(){const _0x49bd76=_0x1d2fe5;return Imported[_0x49bd76(0x5bb)]&&Window_HorzCommand[_0x49bd76(0x3dc)][_0x49bd76(0x2fc)][_0x49bd76(0x4e5)](this);},Window_EquipSlot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1c7)]=function(){const _0xaaef1a=_0x1d2fe5;Window_StatusBase[_0xaaef1a(0x3dc)][_0xaaef1a(0x1c7)][_0xaaef1a(0x4e5)](this),this[_0xaaef1a(0x3c8)]();},Window_EquipSlot[_0x1d2fe5(0x3dc)]['processCursorMove']=function(){const _0x4c8dec=_0x1d2fe5;Window_StatusBase[_0x4c8dec(0x3dc)]['processCursorMove'][_0x4c8dec(0x4e5)](this),this[_0x4c8dec(0x378)]();},Window_EquipSlot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x378)]=function(){const _0x6194b0=_0x1d2fe5;if(!this[_0x6194b0(0x294)]())return;if(Input['isTriggered'](_0x6194b0(0x39b))&&this[_0x6194b0(0x4f0)]()){const _0x2c6a5a=SceneManager[_0x6194b0(0x285)][_0x6194b0(0x418)];_0x2c6a5a&&(this[_0x6194b0(0x226)](this['index']())?(this[_0x6194b0(0x57d)](),this[_0x6194b0(0x1d1)]()):this[_0x6194b0(0x3ad)]());}},Window_EquipSlot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x226)]=function(_0x4807c3){const _0x396ec1=_0x1d2fe5,_0x66f112=SceneManager['_scene'][_0x396ec1(0x418)];if(!_0x66f112)return;if(!_0x66f112[_0x396ec1(0x5a3)](_0x4807c3))return![];const _0x24b033=_0x66f112[_0x396ec1(0x31b)]()[_0x4807c3];if(_0x66f112[_0x396ec1(0x570)]()[_0x396ec1(0x382)](_0x24b033))return![];return!![];;},Window_EquipSlot[_0x1d2fe5(0x3dc)]['processShiftRemoveShortcut']=function(){const _0x983611=_0x1d2fe5;SoundManager[_0x983611(0x3f0)]();const _0x474c57=SceneManager[_0x983611(0x285)][_0x983611(0x418)];_0x474c57[_0x983611(0x4e4)](this[_0x983611(0x5ce)](),null),this[_0x983611(0x449)](),this[_0x983611(0x246)][_0x983611(0x449)](),this['callUpdateHelp']();const _0x3243ea=SceneManager['_scene']['_statusWindow'];if(_0x3243ea)_0x3243ea[_0x983611(0x449)]();},Window_EquipSlot[_0x1d2fe5(0x3dc)]['isShiftRemoveShortcutEnabled']=function(){const _0x37c213=_0x1d2fe5;if(!this[_0x37c213(0x589)])return![];if(!VisuMZ['ItemsEquipsCore'][_0x37c213(0x478)]['EquipScene']['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3c0)]=function(){const _0x819b46=_0x1d2fe5;!this[_0x819b46(0x58e)]()&&Window_StatusBase[_0x819b46(0x3dc)][_0x819b46(0x3c0)][_0x819b46(0x4e5)](this);},Window_EquipSlot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x58e)]=function(){const _0x5bd6a1=_0x1d2fe5;if(!this[_0x5bd6a1(0x531)]())return![];if(SceneManager[_0x5bd6a1(0x285)]['constructor']!==Scene_Equip)return![];if(this[_0x5bd6a1(0x414)]())return this[_0x5bd6a1(0x20b)](),Input[_0x5bd6a1(0x3f4)](),SceneManager[_0x5bd6a1(0x285)][_0x5bd6a1(0x4aa)](),![];else{if(Input[_0x5bd6a1(0x5de)]('down')){const _0x57f29b=this[_0x5bd6a1(0x5ce)]();return Input[_0x5bd6a1(0x46c)](_0x5bd6a1(0x39b))?this['cursorPagedown']():this['cursorDown'](Input[_0x5bd6a1(0x210)]('down')),this['index']()!==_0x57f29b&&this[_0x5bd6a1(0x20b)](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x5bd6a1(0x210)](_0x5bd6a1(0x39b)))return!![];}}return![];},Window_EquipSlot[_0x1d2fe5(0x3dc)]['allowCommandWindowCursorUp']=function(){const _0x3598b9=_0x1d2fe5;if(this[_0x3598b9(0x5ce)]()!==0x0)return![];const _0x5696ae=VisuMZ['ItemsEquipsCore'][_0x3598b9(0x478)][_0x3598b9(0x385)];if(!_0x5696ae[_0x3598b9(0x298)]&&!_0x5696ae['CommandAddClear'])return![];return Input[_0x3598b9(0x210)]('up');},Window_EquipSlot[_0x1d2fe5(0x3dc)]['isShiftShortcutKeyForRemove']=function(){const _0x83fd3d=_0x1d2fe5;return VisuMZ['ItemsEquipsCore'][_0x83fd3d(0x478)][_0x83fd3d(0x385)][_0x83fd3d(0x4cf)];},Window_EquipSlot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x420)]=function(){const _0x2d68b6=_0x1d2fe5;if(this['isOpen']()&&this[_0x2d68b6(0x5c5)]&&SceneManager[_0x2d68b6(0x285)]['constructor']===Scene_Equip){if(this[_0x2d68b6(0x499)]()&&TouchInput[_0x2d68b6(0x5c6)]())this['onTouchSelectModernControls'](![]);else TouchInput['isTriggered']()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x2d68b6(0x3bb)]())this[_0x2d68b6(0x5ab)]();else TouchInput[_0x2d68b6(0x46d)]()&&this[_0x2d68b6(0x1de)]();}},Window_EquipSlot['prototype']['onTouchSelectModernControls']=function(_0x1ea999){const _0x1ff7e2=_0x1d2fe5;this[_0x1ff7e2(0x392)]=![];const _0x427144=this['index'](),_0x43c2f8=this[_0x1ff7e2(0x206)](),_0x45515=SceneManager['_scene'][_0x1ff7e2(0x538)];if(_0x45515['isOpen']()&&_0x45515[_0x1ff7e2(0x5c5)]){if(_0x43c2f8>=0x0)_0x43c2f8===this[_0x1ff7e2(0x5ce)]()&&(this[_0x1ff7e2(0x392)]=!![]),this['activate'](),this['select'](_0x43c2f8),_0x45515[_0x1ff7e2(0x412)]();else _0x45515[_0x1ff7e2(0x206)]()>=0x0&&(this[_0x1ff7e2(0x412)](),this[_0x1ff7e2(0x471)](),_0x45515['activate']());}_0x1ea999&&this['index']()!==_0x427144&&this[_0x1ff7e2(0x20b)]();},Window_EquipSlot[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x264)]=function(){const _0x387378=_0x1d2fe5;return this[_0x387378(0x5ce)]();},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x398)]=Window_EquipItem[_0x1d2fe5(0x3dc)]['includes'],Window_EquipItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x382)]=function(_0x9f1270){const _0x471d85=_0x1d2fe5;if(_0x9f1270===null&&this[_0x471d85(0x570)]()[_0x471d85(0x382)](this[_0x471d85(0x473)]()))return![];else{$gameTemp[_0x471d85(0x323)]=!![];let _0x4ea32d=VisuMZ[_0x471d85(0x39f)][_0x471d85(0x398)]['call'](this,_0x9f1270);if(!_0x4ea32d&&_0x9f1270&&DataManager[_0x471d85(0x1f8)](_0x9f1270)){const _0x453954=_0x9f1270[_0x471d85(0x2d2)]||0x0;if(this['_actor']&&this[_0x471d85(0x418)]['isEquipAtypeOk'](_0x453954)){const _0x3f7119=DataManager[_0x471d85(0x3e6)](_0x9f1270);_0x3f7119[_0x471d85(0x382)](this[_0x471d85(0x473)]())&&(_0x4ea32d=!![]);}}return $gameTemp[_0x471d85(0x323)]=undefined,_0x4ea32d;}},VisuMZ[_0x1d2fe5(0x39f)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x231)],Window_EquipItem[_0x1d2fe5(0x3dc)]['isEnabled']=function(_0x4dc22a){const _0x459659=_0x1d2fe5;if(_0x4dc22a&&this[_0x459659(0x418)]){if(this[_0x459659(0x238)](_0x4dc22a))return![];if(this['isSoleWeaponType'](_0x4dc22a))return![];if(this[_0x459659(0x4fd)](_0x4dc22a))return![];if(!this[_0x459659(0x418)][_0x459659(0x54f)](_0x4dc22a))return![];}if(!_0x4dc22a)return!this[_0x459659(0x570)]()['includes'](this[_0x459659(0x473)]());return VisuMZ[_0x459659(0x39f)][_0x459659(0x29f)][_0x459659(0x4e5)](this,_0x4dc22a);},Window_EquipItem[_0x1d2fe5(0x3dc)]['itemHasEquipLimit']=function(_0x535968){const _0x2a4164=_0x1d2fe5,_0x2e3405=_0x535968[_0x2a4164(0x3f8)];if(_0x2e3405[_0x2a4164(0x26a)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0xd265dd=Number(RegExp['$1'])||0x1;let _0xf44042=0x0;const _0x5b9807=this['_actor'][_0x2a4164(0x3e8)](),_0x451de7=SceneManager[_0x2a4164(0x285)]['_slotWindow'][_0x2a4164(0x264)]();_0x5b9807[_0x451de7]=null;for(const _0x26f06f of _0x5b9807){if(!_0x26f06f)continue;if(DataManager[_0x2a4164(0x415)](_0x535968)===DataManager['isWeapon'](_0x26f06f)){if(_0x535968['id']===_0x26f06f['id'])_0xf44042+=0x1;}}return _0xf44042>=_0xd265dd;}else return![];},Window_EquipItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3de)]=function(_0x29186d){const _0x8c5ea6=_0x1d2fe5;if(!DataManager[_0x8c5ea6(0x415)](_0x29186d))return![];const _0x415921=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x26c165=0x0;const _0x4f9ccd=this['_actor']['equips'](),_0x11562c=SceneManager[_0x8c5ea6(0x285)][_0x8c5ea6(0x3e5)][_0x8c5ea6(0x264)]();_0x4f9ccd[_0x11562c]=null;for(const _0x277303 of _0x4f9ccd){if(!_0x277303)continue;if(!DataManager[_0x8c5ea6(0x415)](_0x277303))continue;if(_0x29186d['wtypeId']===_0x277303['wtypeId']){_0x26c165+=0x1;if(_0x29186d[_0x8c5ea6(0x3f8)][_0x8c5ea6(0x26a)](_0x415921)){const _0x248fda=Number(RegExp['$1'])||0x1;if(_0x26c165>=_0x248fda)return!![];}if(_0x277303[_0x8c5ea6(0x3f8)]['match'](_0x415921)){const _0x22bcc3=Number(RegExp['$1'])||0x1;if(_0x26c165>=_0x22bcc3)return!![];}}}return![];},Window_EquipItem[_0x1d2fe5(0x3dc)]['isSoleArmorType']=function(_0x20f919){const _0x374e60=_0x1d2fe5;if(!DataManager[_0x374e60(0x1f8)](_0x20f919))return![];const _0x8428c5=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x8ef369=0x0;const _0x54c76f=this[_0x374e60(0x418)][_0x374e60(0x3e8)](),_0x575588=SceneManager[_0x374e60(0x285)][_0x374e60(0x3e5)][_0x374e60(0x264)]();_0x54c76f[_0x575588]=null;for(const _0xd0e651 of _0x54c76f){if(!_0xd0e651)continue;if(!DataManager[_0x374e60(0x1f8)](_0xd0e651))continue;if(_0x20f919['atypeId']===_0xd0e651[_0x374e60(0x2d2)]){_0x8ef369+=0x1;if(_0x20f919[_0x374e60(0x3f8)][_0x374e60(0x26a)](_0x8428c5)){const _0x3a9d28=Number(RegExp['$1'])||0x1;if(_0x8ef369>=_0x3a9d28)return!![];}if(_0xd0e651[_0x374e60(0x3f8)][_0x374e60(0x26a)](_0x8428c5)){const _0x1aaafc=Number(RegExp['$1'])||0x1;if(_0x8ef369>=_0x1aaafc)return!![];}}}return![];},Window_EquipItem['prototype'][_0x1d2fe5(0x570)]=function(){const _0x8a455d=_0x1d2fe5;return VisuMZ['ItemsEquipsCore'][_0x8a455d(0x478)][_0x8a455d(0x385)][_0x8a455d(0x54a)];},Window_EquipItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x30f)]=function(_0x499df4){const _0x4890cd=_0x1d2fe5,_0x696571=this[_0x4890cd(0x56b)](_0x499df4);_0x696571?Window_ItemList[_0x4890cd(0x3dc)][_0x4890cd(0x30f)][_0x4890cd(0x4e5)](this,_0x499df4):this[_0x4890cd(0x351)](_0x499df4);},Window_EquipItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x351)]=function(_0x3632ad){const _0x1a0403=_0x1d2fe5;this[_0x1a0403(0x5af)](this['isEnabled'](null));const _0x30d19c=VisuMZ[_0x1a0403(0x39f)][_0x1a0403(0x478)][_0x1a0403(0x385)],_0x16fcdd=this[_0x1a0403(0x422)](_0x3632ad),_0x3c838d=_0x16fcdd['y']+(this[_0x1a0403(0x408)]()-ImageManager[_0x1a0403(0x436)])/0x2,_0x2c9fba=ImageManager['iconWidth']+0x4,_0x3bc241=Math[_0x1a0403(0x572)](0x0,_0x16fcdd['width']-_0x2c9fba);this['resetTextColor'](),this[_0x1a0403(0x31c)](_0x30d19c[_0x1a0403(0x1cb)],_0x16fcdd['x'],_0x3c838d),this['drawText'](_0x30d19c[_0x1a0403(0x369)],_0x16fcdd['x']+_0x2c9fba,_0x16fcdd['y'],_0x3bc241),this[_0x1a0403(0x5af)](!![]);},Window_EquipItem[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1d1)]=function(){const _0x35bcbe=_0x1d2fe5;Window_ItemList[_0x35bcbe(0x3dc)]['updateHelp'][_0x35bcbe(0x4e5)](this);if(this['_actor']&&this['_statusWindow']&&this[_0x35bcbe(0x455)]>=0x0){const _0x1686c9=JsonEx[_0x35bcbe(0x4e1)](this[_0x35bcbe(0x418)]);_0x1686c9['_tempActor']=!![],_0x1686c9[_0x35bcbe(0x53c)](this['_slotId'],this[_0x35bcbe(0x4f0)]()),this[_0x35bcbe(0x4cb)][_0x35bcbe(0x1c6)](_0x1686c9);}},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x1c5)]=Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x376)],Window_ShopCommand[_0x1d2fe5(0x3dc)]['initialize']=function(_0x5a3635){const _0x283ba9=_0x1d2fe5;VisuMZ[_0x283ba9(0x39f)][_0x283ba9(0x1c5)][_0x283ba9(0x4e5)](this,_0x5a3635),this[_0x283ba9(0x26f)](_0x5a3635);},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x26f)]=function(_0x61a71d){const _0x30a56=_0x1d2fe5,_0x1a1512=new Rectangle(0x0,0x0,_0x61a71d[_0x30a56(0x20e)],_0x61a71d[_0x30a56(0x548)]);this[_0x30a56(0x42d)]=new Window_Base(_0x1a1512),this[_0x30a56(0x42d)][_0x30a56(0x59c)]=0x0,this[_0x30a56(0x24d)](this['_commandNameWindow']),this[_0x30a56(0x303)]();},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3c8)]=function(){const _0xc7d791=_0x1d2fe5;Window_HorzCommand[_0xc7d791(0x3dc)]['callUpdateHelp'][_0xc7d791(0x4e5)](this);if(this[_0xc7d791(0x42d)])this[_0xc7d791(0x303)]();},Window_ShopCommand['prototype']['updateCommandNameWindow']=function(){const _0x49e66a=_0x1d2fe5,_0x4954cd=this[_0x49e66a(0x42d)];_0x4954cd['contents'][_0x49e66a(0x3f4)]();const _0x496e58=this['commandStyleCheck'](this[_0x49e66a(0x5ce)]());if(_0x496e58==='icon'){const _0x1d4716=this[_0x49e66a(0x422)](this[_0x49e66a(0x5ce)]());let _0x448cf1=this[_0x49e66a(0x5c3)](this['index']());_0x448cf1=_0x448cf1[_0x49e66a(0x4b6)](/\\I\[(\d+)\]/gi,''),_0x4954cd[_0x49e66a(0x30c)](),this['commandNameWindowDrawBackground'](_0x448cf1,_0x1d4716),this[_0x49e66a(0x588)](_0x448cf1,_0x1d4716),this[_0x49e66a(0x4da)](_0x448cf1,_0x1d4716);}},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3d1)]=function(_0x4dd68b,_0x320cf6){},Window_ShopCommand['prototype'][_0x1d2fe5(0x588)]=function(_0xba461,_0x574559){const _0x4b6fa4=_0x1d2fe5,_0x4bb79c=this[_0x4b6fa4(0x42d)];_0x4bb79c['drawText'](_0xba461,0x0,_0x574559['y'],_0x4bb79c[_0x4b6fa4(0x587)],_0x4b6fa4(0x49e));},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4da)]=function(_0x469cd6,_0xe073f7){const _0x299d88=_0x1d2fe5,_0x239b84=this[_0x299d88(0x42d)],_0x2fca19=$gameSystem[_0x299d88(0x235)](),_0x4f8c0a=_0xe073f7['x']+Math[_0x299d88(0x331)](_0xe073f7['width']/0x2)+_0x2fca19;_0x239b84['x']=_0x239b84[_0x299d88(0x20e)]/-0x2+_0x4f8c0a,_0x239b84['y']=Math[_0x299d88(0x331)](_0xe073f7[_0x299d88(0x548)]/0x2);},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4af)]=function(){const _0x3c1e1b=_0x1d2fe5;return this[_0x3c1e1b(0x404)]?this[_0x3c1e1b(0x404)]['length']:0x3;},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x591)]=function(){const _0x3305a2=_0x1d2fe5;return VisuMZ[_0x3305a2(0x39f)]['Settings']['ShopScene']['CmdHideDisabled'];},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x269)]=function(){const _0x29294a=_0x1d2fe5;this[_0x29294a(0x314)](),this[_0x29294a(0x5b5)](),this['addCancelCommand']();},Window_ShopCommand[_0x1d2fe5(0x3dc)]['refresh']=function(){const _0x36eb23=_0x1d2fe5;Window_HorzCommand['prototype']['refresh'][_0x36eb23(0x4e5)](this),this[_0x36eb23(0x568)]();},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x314)]=function(){const _0x138808=_0x1d2fe5,_0x33a088=this['commandStyle'](),_0x1c0739=VisuMZ['ItemsEquipsCore'][_0x138808(0x478)][_0x138808(0x595)][_0x138808(0x1f2)],_0x52e192=_0x33a088==='text'?TextManager[_0x138808(0x3bf)]:_0x138808(0x259)['format'](_0x1c0739,TextManager[_0x138808(0x3bf)]),_0x56baa6=this['isBuyCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x56baa6)return;this['addCommand'](_0x52e192,_0x138808(0x3bf),_0x56baa6);},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x263)]=function(){const _0x41af22=_0x1d2fe5;return SceneManager[_0x41af22(0x285)][_0x41af22(0x593)]===Scene_Shop?SceneManager[_0x41af22(0x285)][_0x41af22(0x3d7)]>0x0:!![];},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5b5)]=function(){const _0x34e6e6=_0x1d2fe5,_0x61e498=this[_0x34e6e6(0x35f)](),_0x1b75a5=VisuMZ[_0x34e6e6(0x39f)]['Settings'][_0x34e6e6(0x595)]['CmdIconSell'],_0x2139ca=_0x61e498===_0x34e6e6(0x546)?TextManager['sell']:_0x34e6e6(0x259)[_0x34e6e6(0x44f)](_0x1b75a5,TextManager[_0x34e6e6(0x1d6)]),_0x35a539=this[_0x34e6e6(0x2c4)]();if(this[_0x34e6e6(0x591)]()&&!_0x35a539)return;this[_0x34e6e6(0x467)](_0x2139ca,_0x34e6e6(0x1d6),_0x35a539);},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2c4)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand['prototype'][_0x1d2fe5(0x260)]=function(){const _0x57cb3d=_0x1d2fe5,_0x5effba=this[_0x57cb3d(0x35f)](),_0x655afe=VisuMZ[_0x57cb3d(0x39f)][_0x57cb3d(0x478)][_0x57cb3d(0x595)][_0x57cb3d(0x37f)],_0x3bac12=VisuMZ[_0x57cb3d(0x39f)]['Settings'][_0x57cb3d(0x595)]['CmdCancelRename'],_0x8e2a1a=_0x5effba===_0x57cb3d(0x546)?_0x3bac12:_0x57cb3d(0x259)[_0x57cb3d(0x44f)](_0x655afe,_0x3bac12);this['addCommand'](_0x8e2a1a,_0x57cb3d(0x532));},Window_ShopCommand['prototype'][_0x1d2fe5(0x33e)]=function(){const _0x366062=_0x1d2fe5;return VisuMZ[_0x366062(0x39f)][_0x366062(0x478)][_0x366062(0x595)][_0x366062(0x569)];},Window_ShopCommand[_0x1d2fe5(0x3dc)]['drawItem']=function(_0x12faf2){const _0x353690=_0x1d2fe5,_0x12107f=this[_0x353690(0x293)](_0x12faf2);if(_0x12107f===_0x353690(0x2b7))this[_0x353690(0x5c1)](_0x12faf2);else _0x12107f===_0x353690(0x273)?this[_0x353690(0x479)](_0x12faf2):Window_HorzCommand[_0x353690(0x3dc)][_0x353690(0x30f)][_0x353690(0x4e5)](this,_0x12faf2);},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x35f)]=function(){const _0x2dffad=_0x1d2fe5;return VisuMZ[_0x2dffad(0x39f)][_0x2dffad(0x478)][_0x2dffad(0x595)][_0x2dffad(0x4c0)];},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x293)]=function(_0x392a77){const _0x365854=_0x1d2fe5;if(_0x392a77<0x0)return _0x365854(0x546);const _0x491939=this[_0x365854(0x35f)]();if(_0x491939!=='auto')return _0x491939;else{if(this[_0x365854(0x4f5)]()>0x0){const _0x4bd3a1=this[_0x365854(0x5c3)](_0x392a77);if(_0x4bd3a1['match'](/\\I\[(\d+)\]/i)){const _0x46c554=this[_0x365854(0x422)](_0x392a77),_0x4083ed=this[_0x365854(0x4fe)](_0x4bd3a1)[_0x365854(0x20e)];return _0x4083ed<=_0x46c554['width']?_0x365854(0x2b7):_0x365854(0x273);}}}return _0x365854(0x546);},Window_ShopCommand[_0x1d2fe5(0x3dc)]['drawItemStyleIconText']=function(_0x233f99){const _0x43ef7a=_0x1d2fe5,_0x1a8aa6=this[_0x43ef7a(0x422)](_0x233f99),_0x508617=this[_0x43ef7a(0x5c3)](_0x233f99),_0x5bedf4=this['textSizeEx'](_0x508617)['width'];this[_0x43ef7a(0x5af)](this[_0x43ef7a(0x204)](_0x233f99));const _0x135f81=this['itemTextAlign']();if(_0x135f81===_0x43ef7a(0x5c0))this[_0x43ef7a(0x340)](_0x508617,_0x1a8aa6['x']+_0x1a8aa6[_0x43ef7a(0x20e)]-_0x5bedf4,_0x1a8aa6['y'],_0x5bedf4);else{if(_0x135f81==='center'){const _0x5654ee=_0x1a8aa6['x']+Math[_0x43ef7a(0x331)]((_0x1a8aa6[_0x43ef7a(0x20e)]-_0x5bedf4)/0x2);this['drawTextEx'](_0x508617,_0x5654ee,_0x1a8aa6['y'],_0x5bedf4);}else this['drawTextEx'](_0x508617,_0x1a8aa6['x'],_0x1a8aa6['y'],_0x5bedf4);}},Window_ShopCommand[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x479)]=function(_0x10c5bc){const _0x422a12=_0x1d2fe5;this[_0x422a12(0x5c3)](_0x10c5bc)[_0x422a12(0x26a)](/\\I\[(\d+)\]/i);const _0x2ca4bf=Number(RegExp['$1'])||0x0,_0x13f98a=this[_0x422a12(0x422)](_0x10c5bc),_0x42741e=_0x13f98a['x']+Math[_0x422a12(0x331)]((_0x13f98a[_0x422a12(0x20e)]-ImageManager[_0x422a12(0x513)])/0x2),_0x27d283=_0x13f98a['y']+(_0x13f98a[_0x422a12(0x548)]-ImageManager[_0x422a12(0x436)])/0x2;this['drawIcon'](_0x2ca4bf,_0x42741e,_0x27d283);},VisuMZ[_0x1d2fe5(0x39f)]['Window_ShopBuy_refresh']=Window_ShopBuy['prototype']['refresh'],Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x449)]=function(){const _0x1c7bf5=_0x1d2fe5;this[_0x1c7bf5(0x3a0)](),VisuMZ[_0x1c7bf5(0x39f)]['Window_ShopBuy_refresh'][_0x1c7bf5(0x4e5)](this);},Window_ShopBuy['prototype'][_0x1d2fe5(0x3a0)]=function(){const _0x43b5a8=_0x1d2fe5;SceneManager[_0x43b5a8(0x285)]['constructor']===Scene_Shop&&(this[_0x43b5a8(0x2df)]=SceneManager[_0x43b5a8(0x285)]['money']());},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x3f6)]=Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4d3)],Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4d3)]=function(_0x4f879d){const _0x26d117=_0x1d2fe5;if(!_0x4f879d)return 0x0;let _0x52b363=VisuMZ[_0x26d117(0x39f)][_0x26d117(0x3f6)][_0x26d117(0x4e5)](this,_0x4f879d);return Math['max'](0x0,this[_0x26d117(0x374)](_0x4f879d,_0x52b363));},Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x374)]=function(_0x3ade66,_0x5755cd){const _0x25161d=_0x1d2fe5,_0x358064=_0x3ade66['note']||'';if(_0x358064['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x4192ee=String(RegExp['$1']);window[_0x25161d(0x4d3)]=_0x5755cd,window[_0x25161d(0x4f0)]=_0x3ade66;try{eval(_0x4192ee);}catch(_0x3d77fa){if($gameTemp[_0x25161d(0x278)]())console[_0x25161d(0x3cc)](_0x3d77fa);}_0x5755cd=window['price'],window[_0x25161d(0x4d3)]=undefined,window[_0x25161d(0x4f0)]=undefined;}_0x5755cd=VisuMZ['ItemsEquipsCore']['Settings'][_0x25161d(0x595)][_0x25161d(0x25b)][_0x25161d(0x4e5)](this,_0x3ade66,_0x5755cd);if(isNaN(_0x5755cd))_0x5755cd=0x0;return Math[_0x25161d(0x331)](_0x5755cd);},VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x430)]=Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3da)],Window_ShopBuy[_0x1d2fe5(0x3dc)]['goodsToItem']=function(_0x3bc132){const _0x438bd2=_0x1d2fe5,_0x8af3ef=VisuMZ[_0x438bd2(0x39f)][_0x438bd2(0x430)][_0x438bd2(0x4e5)](this,_0x3bc132);return _0x8af3ef&&!this[_0x438bd2(0x596)](_0x8af3ef)?null:_0x8af3ef;},VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x1d3)]={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy['prototype'][_0x1d2fe5(0x596)]=function(_0x3b529a){const _0x592363=_0x1d2fe5;if(!_0x3b529a)return![];const _0x1e7bae=VisuMZ[_0x592363(0x39f)][_0x592363(0x1d3)],_0x46138b=_0x3b529a?_0x3b529a[_0x592363(0x3f8)]||'':'';if(_0x46138b[_0x592363(0x26a)](_0x1e7bae[_0x592363(0x36d)])){const _0x2cd047=String(RegExp['$1'])[_0x592363(0x3e9)](',')[_0x592363(0x58f)](_0x41cb9c=>Number(_0x41cb9c));if(_0x2cd047[_0x592363(0x571)](_0x1e039b=>!$gameSwitches['value'](_0x1e039b)))return![];}if(_0x46138b[_0x592363(0x26a)](_0x1e7bae['ShowAnySwitches'])){const _0x4c69ab=String(RegExp['$1'])[_0x592363(0x3e9)](',')['map'](_0x3ab145=>Number(_0x3ab145));if(_0x4c69ab[_0x592363(0x1cd)](_0x32ef10=>!$gameSwitches[_0x592363(0x575)](_0x32ef10)))return![];}if(_0x46138b[_0x592363(0x26a)](_0x1e7bae[_0x592363(0x45b)])){const _0x1d8ac5=String(RegExp['$1'])[_0x592363(0x3e9)](',')[_0x592363(0x58f)](_0x2a8f24=>Number(_0x2a8f24));if(_0x1d8ac5[_0x592363(0x1cd)](_0x3df30d=>$gameSwitches['value'](_0x3df30d)))return![];}if(_0x46138b[_0x592363(0x26a)](_0x1e7bae[_0x592363(0x4c2)])){const _0x3fd445=String(RegExp['$1'])[_0x592363(0x3e9)](',')['map'](_0x4e2ebf=>Number(_0x4e2ebf));if(_0x3fd445[_0x592363(0x571)](_0x41619e=>$gameSwitches['value'](_0x41619e)))return![];}return!![];},Window_ShopBuy[_0x1d2fe5(0x3dc)]['drawItem']=function(_0x58f0c7){const _0xa9bba5=_0x1d2fe5;this[_0xa9bba5(0x30c)]();const _0x3537ac=this[_0xa9bba5(0x56b)](_0x58f0c7),_0x4e9388=this[_0xa9bba5(0x422)](_0x58f0c7),_0x1b7122=_0x4e9388[_0xa9bba5(0x20e)];this['changePaintOpacity'](this[_0xa9bba5(0x231)](_0x3537ac)),this[_0xa9bba5(0x51e)](_0x3537ac,_0x4e9388['x'],_0x4e9388['y'],_0x1b7122),this[_0xa9bba5(0x377)](_0x3537ac,_0x4e9388),this[_0xa9bba5(0x5af)](!![]);},Window_ShopBuy[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x377)]=function(_0x496af5,_0x1d35bc){const _0x352aa4=_0x1d2fe5,_0x5d2a60=this[_0x352aa4(0x4d3)](_0x496af5);this[_0x352aa4(0x3b3)](_0x5d2a60,TextManager[_0x352aa4(0x3a6)],_0x1d35bc['x'],_0x1d35bc['y'],_0x1d35bc['width']);},Window_ShopSell['prototype']['maxCols']=function(){const _0x504b85=_0x1d2fe5;return SceneManager[_0x504b85(0x285)][_0x504b85(0x2d8)]()?0x1:0x2;},VisuMZ[_0x1d2fe5(0x39f)]['Window_ShopSell_isEnabled']=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x231)]=function(_0x258a6e){const _0x4cf3b0=_0x1d2fe5;if(!_0x258a6e)return![];const _0x361544=_0x258a6e[_0x4cf3b0(0x3f8)];if(_0x361544[_0x4cf3b0(0x26a)](/<CANNOT SELL>/i))return![];if(_0x361544[_0x4cf3b0(0x26a)](/<CAN SELL>/i))return!![];if(_0x361544[_0x4cf3b0(0x26a)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2478f6=JSON['parse']('['+RegExp['$1'][_0x4cf3b0(0x26a)](/\d+/g)+']');for(const _0x484de5 of _0x2478f6){if(!$gameSwitches[_0x4cf3b0(0x575)](_0x484de5))return![];}}if(_0x361544[_0x4cf3b0(0x26a)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa719f=JSON[_0x4cf3b0(0x567)]('['+RegExp['$1'][_0x4cf3b0(0x26a)](/\d+/g)+']');for(const _0x572c30 of _0xa719f){if(!$gameSwitches[_0x4cf3b0(0x575)](_0x572c30))return![];}}if(_0x361544[_0x4cf3b0(0x26a)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2dfad1=JSON[_0x4cf3b0(0x567)]('['+RegExp['$1'][_0x4cf3b0(0x26a)](/\d+/g)+']');for(const _0x143523 of _0x2dfad1){if($gameSwitches[_0x4cf3b0(0x575)](_0x143523))return![];}}return VisuMZ[_0x4cf3b0(0x39f)][_0x4cf3b0(0x445)][_0x4cf3b0(0x4e5)](this,_0x258a6e);},Window_ShopStatus[_0x1d2fe5(0x447)]=VisuMZ['ItemsEquipsCore'][_0x1d2fe5(0x478)][_0x1d2fe5(0x2f2)][_0x1d2fe5(0x5ae)]??0xf0,VisuMZ[_0x1d2fe5(0x39f)][_0x1d2fe5(0x201)]=Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x21b)],Window_ShopStatus[_0x1d2fe5(0x3dc)]['setItem']=function(_0x463818){const _0x4bbf1e=_0x1d2fe5;_0x463818=DataManager['getProxyItem'](_0x463818),DataManager[_0x4bbf1e(0x415)](_0x463818)||DataManager[_0x4bbf1e(0x1f8)](_0x463818)?this[_0x4bbf1e(0x2e2)](_0x463818):VisuMZ[_0x4bbf1e(0x39f)][_0x4bbf1e(0x201)][_0x4bbf1e(0x4e5)](this,_0x463818);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2e2)]=function(_0x42d9e6){const _0x4c3582=_0x1d2fe5;this[_0x4c3582(0x38c)]=_0x42d9e6;const _0x36383c=Window_ShopStatus[_0x4c3582(0x447)];setTimeout(this[_0x4c3582(0x32e)][_0x4c3582(0x2ec)](this,_0x42d9e6),_0x36383c);},Window_ShopStatus[_0x1d2fe5(0x3dc)]['refreshDelay']=function(_0x2f7cd8){const _0x1c09f8=_0x1d2fe5;this[_0x1c09f8(0x38c)]===_0x2f7cd8&&this['refresh']();},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1dc)]=function(){return![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1ed)]=function(){const _0x8fe91=_0x1d2fe5;Window_StatusBase[_0x8fe91(0x3dc)][_0x8fe91(0x1ed)]['call'](this);for(const _0x540203 of $gameParty[_0x8fe91(0x2a2)]()){ImageManager['loadCharacter'](_0x540203['characterName']());}},Window_ShopStatus[_0x1d2fe5(0x3dc)]['translucentOpacity']=function(){const _0x73f4b4=_0x1d2fe5;return VisuMZ['ItemsEquipsCore']['Settings'][_0x73f4b4(0x2f2)][_0x73f4b4(0x2c2)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x449)]=function(){const _0x51bc2b=_0x1d2fe5;this[_0x51bc2b(0x2cc)][_0x51bc2b(0x3f4)](),this[_0x51bc2b(0x558)][_0x51bc2b(0x3f4)](),this['_item']&&(this[_0x51bc2b(0x30c)](),this[_0x51bc2b(0x5af)](!![]),this[_0x51bc2b(0x3b6)](),this[_0x51bc2b(0x2f5)]()?this[_0x51bc2b(0x31f)]():this[_0x51bc2b(0x4bf)](),this[_0x51bc2b(0x391)]());},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x211)]=function(_0x43daeb,_0x48929c){const _0x36519e=_0x1d2fe5;if(!this['isEquipItem']()&&!DataManager[_0x36519e(0x36e)](this[_0x36519e(0x38c)]))return;const _0x5e45d4=this['innerWidth']-this['itemPadding']()-_0x43daeb,_0x18114c=this['textWidth']('0000');this[_0x36519e(0x4e2)](ColorManager['systemColor']()),this[_0x36519e(0x4d1)](TextManager[_0x36519e(0x3ea)],_0x43daeb+this[_0x36519e(0x523)](),_0x48929c,_0x5e45d4-_0x18114c),this[_0x36519e(0x54b)](),this['drawItemNumber'](this[_0x36519e(0x38c)],_0x43daeb,_0x48929c,_0x5e45d4);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x47c)]=function(_0x4b26ed,_0x30838a,_0x15e677,_0x58c301,_0x223bc0){const _0x330299=_0x1d2fe5;if(VisuMZ[_0x330299(0x39f)]['Settings'][_0x330299(0x2f2)]['DrawBackRect']===![])return;_0x223bc0=Math[_0x330299(0x572)](_0x223bc0||0x1,0x1);while(_0x223bc0--){_0x58c301=_0x58c301||this[_0x330299(0x408)](),this[_0x330299(0x558)][_0x330299(0x251)]=0xa0;const _0x25627d=ColorManager[_0x330299(0x2ad)]();this[_0x330299(0x558)][_0x330299(0x3c3)](_0x4b26ed+0x1,_0x30838a+0x1,_0x15e677-0x2,_0x58c301-0x2,_0x25627d),this['contentsBack'][_0x330299(0x251)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x5f1a7a=_0x1d2fe5,_0xc440ad=VisuMZ[_0x5f1a7a(0x39f)]['Settings'][_0x5f1a7a(0x2f2)];let _0x429f38=_0xc440ad[_0x5f1a7a(0x25a)]!==undefined?_0xc440ad['BackRectColor']:0x13;return ColorManager[_0x5f1a7a(0x3fc)](_0x429f38);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x31f)]=function(){const _0x2cb85b=_0x1d2fe5;this[_0x2cb85b(0x28f)]=null;if(VisuMZ['ItemsEquipsCore'][_0x2cb85b(0x478)]['StatusWindow'][_0x2cb85b(0x435)]){VisuMZ[_0x2cb85b(0x39f)]['Settings']['StatusWindow'][_0x2cb85b(0x435)][_0x2cb85b(0x4e5)](this);return;}const _0x33722e=this[_0x2cb85b(0x408)](),_0x3f3add=this['gaugeLineHeight']()+0x8;let _0x1dbd0d=0x0,_0x5d187d=0x0,_0x547369=this[_0x2cb85b(0x587)],_0x49750a=this[_0x2cb85b(0x52e)],_0x189a25=Math[_0x2cb85b(0x331)](_0x547369/0x2),_0x182778=_0x1dbd0d+_0x547369-_0x189a25;this[_0x2cb85b(0x51e)](this['_item'],_0x1dbd0d+this[_0x2cb85b(0x523)](),_0x5d187d,_0x547369-this[_0x2cb85b(0x523)]()*0x2),this[_0x2cb85b(0x47c)](_0x1dbd0d,_0x5d187d,_0x547369),_0x5d187d+=_0x33722e;if(this[_0x2cb85b(0x221)](_0x1dbd0d,_0x5d187d,_0x189a25))_0x5d187d+=0x0;if(this[_0x2cb85b(0x597)](_0x182778,_0x5d187d,_0x189a25))_0x5d187d+=_0x33722e;const _0x285f8e=this[_0x2cb85b(0x3d2)](),_0xbe6bfa=_0x5d187d;_0x5d187d=_0x49750a-_0x285f8e[_0x2cb85b(0x2d3)]*_0x3f3add-0x4;let _0x27bc6a=_0x1dbd0d,_0x1a44a5=0x0,_0x8ed8e3=_0x5d187d;for(const _0x254e46 of _0x285f8e){_0x1a44a5=Math[_0x2cb85b(0x572)](this[_0x2cb85b(0x402)](_0x254e46,_0x1dbd0d+0x4,_0x5d187d+0x4,_0x547369),_0x1a44a5),_0x5d187d+=_0x3f3add;}const _0x8ab442=$gameParty[_0x2cb85b(0x460)](),_0x29fa0d=Math[_0x2cb85b(0x331)]((_0x547369-_0x1a44a5)/_0x8ab442);_0x1a44a5=_0x547369-_0x29fa0d*_0x8ab442;for(const _0x397cfd of $gameParty['battleMembers']()){const _0x184f34=$gameParty[_0x2cb85b(0x39e)]()[_0x2cb85b(0x338)](_0x397cfd),_0x1d4257=_0x27bc6a+_0x1a44a5+_0x184f34*_0x29fa0d;this[_0x2cb85b(0x5af)](_0x397cfd[_0x2cb85b(0x54f)](this[_0x2cb85b(0x38c)])),this[_0x2cb85b(0x373)](_0x397cfd,_0x1d4257+_0x29fa0d/0x2,_0x8ed8e3);let _0x45d572=_0x8ed8e3;for(const _0x100963 of _0x285f8e){const _0x3a3420=_0x45d572-(_0x33722e-_0x3f3add)/0x2;this[_0x2cb85b(0x2cd)](_0x397cfd,_0x100963,_0x1d4257,_0x3a3420,_0x29fa0d),_0x45d572+=_0x3f3add;}}this[_0x2cb85b(0x47c)](_0x27bc6a,_0xbe6bfa,_0x1a44a5,_0x8ed8e3-_0xbe6bfa);for(let _0x51ebba=0x0;_0x51ebba<_0x8ab442;_0x51ebba++){const _0x5af4ff=_0x27bc6a+_0x1a44a5+_0x51ebba*_0x29fa0d;this[_0x2cb85b(0x47c)](_0x5af4ff,_0xbe6bfa,_0x29fa0d,_0x8ed8e3-_0xbe6bfa);}for(const _0x477111 of _0x285f8e){this[_0x2cb85b(0x47c)](_0x27bc6a,_0x8ed8e3,_0x1a44a5,_0x3f3add);for(let _0x4c2973=0x0;_0x4c2973<_0x8ab442;_0x4c2973++){const _0x4d9c89=_0x27bc6a+_0x1a44a5+_0x4c2973*_0x29fa0d;this['drawItemDarkRect'](_0x4d9c89,_0x8ed8e3,_0x29fa0d,_0x3f3add);}_0x8ed8e3+=_0x3f3add;}},Window_ShopStatus[_0x1d2fe5(0x3dc)]['drawItemEquipType']=function(_0x83aa68,_0x2eb429,_0x3a5adb){const _0x2ccce5=_0x1d2fe5;if(!this['isEquipItem']())return![];const _0x3fe5b6=$dataSystem[_0x2ccce5(0x39d)][this[_0x2ccce5(0x38c)]['etypeId']];return this[_0x2ccce5(0x47a)](_0x3fe5b6,_0x83aa68,_0x2eb429,_0x3a5adb,!![]),this[_0x2ccce5(0x47c)](_0x83aa68,_0x2eb429,_0x3a5adb),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x1d2fe5(0x57c)]=function(){const _0x51ebd9=_0x1d2fe5,_0x2929fa=VisuMZ[_0x51ebd9(0x39f)][_0x51ebd9(0x478)][_0x51ebd9(0x503)][_0x51ebd9(0x4f9)];return _0x2929fa[_0x51ebd9(0x44f)]($gameParty['numItems'](this[_0x51ebd9(0x38c)]));},Window_ShopStatus['prototype'][_0x1d2fe5(0x3d2)]=function(){const _0x4bc1f7=_0x1d2fe5;let _0xd2da29=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0x4bc1f7(0x5bb)]&&(_0xd2da29=VisuMZ[_0x4bc1f7(0x1eb)][_0x4bc1f7(0x478)][_0x4bc1f7(0x4bb)][_0x4bc1f7(0x5a9)]),_0xd2da29=_0xd2da29[_0x4bc1f7(0x58f)](_0x365c83=>typeof _0x365c83===_0x4bc1f7(0x5d5)?_0x365c83:_0x365c83[_0x4bc1f7(0x27f)]()[_0x4bc1f7(0x5a1)]()),_0xd2da29;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x31a)]=function(){const _0x21541a=_0x1d2fe5;return VisuMZ[_0x21541a(0x39f)][_0x21541a(0x478)][_0x21541a(0x2f2)][_0x21541a(0x561)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x402)]=function(_0x58324b,_0x49c90e,_0x28105f,_0x951a0b){const _0x413ef0=_0x1d2fe5;this['resetFontSettings'](),this['contents'][_0x413ef0(0x470)]=this[_0x413ef0(0x31a)]();let _0xfc043d=this[_0x413ef0(0x443)](TextManager['param'](_0x58324b))+0x4+_0x49c90e;return Imported['VisuMZ_0_CoreEngine']?(this[_0x413ef0(0x2ee)](_0x49c90e,_0x28105f,_0x951a0b,_0x58324b,!![]),VisuMZ[_0x413ef0(0x1eb)][_0x413ef0(0x478)][_0x413ef0(0x4bb)]['DrawIcons']&&(_0xfc043d+=ImageManager['iconWidth']+0x4)):(this[_0x413ef0(0x4e2)](ColorManager[_0x413ef0(0x3ce)]()),this[_0x413ef0(0x4d1)](TextManager['param'](_0x58324b),_0x49c90e,_0x28105f,_0x951a0b)),this[_0x413ef0(0x30c)](),_0xfc043d;},Window_ShopStatus['prototype']['drawActorParamDifference']=function(_0x55f288,_0x501f63,_0x102b38,_0x2024e7,_0xda29bc){const _0x25adb5=_0x1d2fe5;_0x102b38+=this[_0x25adb5(0x523)](),_0xda29bc-=this[_0x25adb5(0x523)]()*0x2;const _0x410909=VisuMZ[_0x25adb5(0x39f)][_0x25adb5(0x478)][_0x25adb5(0x2f2)];this[_0x25adb5(0x2cc)][_0x25adb5(0x470)]=_0x410909[_0x25adb5(0x561)],this['changePaintOpacity'](_0x55f288[_0x25adb5(0x54f)](this[_0x25adb5(0x38c)]));if(_0x55f288[_0x25adb5(0x599)](this[_0x25adb5(0x38c)])&&!_0x55f288[_0x25adb5(0x3ba)](this[_0x25adb5(0x38c)])){const _0x4360db=_0x410909['AlreadyEquipMarker'];this[_0x25adb5(0x4d1)](_0x4360db,_0x102b38,_0x2024e7,_0xda29bc,_0x25adb5(0x49e));}else{if(_0x55f288[_0x25adb5(0x54f)](this[_0x25adb5(0x38c)])){const _0x376341=this[_0x25adb5(0x496)](_0x55f288);let _0x4a263a=0x0,_0x3c2dc2=0x0,_0x55ffda=0x0;Imported['VisuMZ_0_CoreEngine']?(_0x4a263a=_0x376341[_0x25adb5(0x59a)](_0x501f63),_0x3c2dc2=_0x4a263a-_0x55f288[_0x25adb5(0x59a)](_0x501f63),this[_0x25adb5(0x4e2)](ColorManager['paramchangeTextColor'](_0x3c2dc2)),_0x55ffda=(_0x3c2dc2>=0x0?'+':'')+VisuMZ[_0x25adb5(0x2ae)](_0x3c2dc2,0x0,_0x501f63)):(_0x4a263a=_0x376341['param'](_0x501f63),_0x3c2dc2=_0x4a263a-_0x55f288['param'](_0x501f63),this['changeTextColor'](ColorManager[_0x25adb5(0x58c)](_0x3c2dc2)),_0x55ffda=(_0x3c2dc2>=0x0?'+':'')+_0x3c2dc2),_0x55ffda==='+0'&&(_0x55ffda=_0x410909[_0x25adb5(0x5b9)]),this[_0x25adb5(0x4d1)](_0x55ffda,_0x102b38,_0x2024e7,_0xda29bc,_0x25adb5(0x49e));}else{const _0x371a88=_0x410909[_0x25adb5(0x52f)];this['drawText'](_0x371a88,_0x102b38,_0x2024e7,_0xda29bc,'center');}}this[_0x25adb5(0x30c)](),this[_0x25adb5(0x5af)](!![]);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x496)]=function(_0x3ee7bb){const _0x2fcb9e=_0x1d2fe5;if(this[_0x2fcb9e(0x2db)](_0x3ee7bb)){const _0x4d810c=JsonEx[_0x2fcb9e(0x4e1)](_0x3ee7bb);_0x4d810c[_0x2fcb9e(0x28f)]=!![];const _0x419120=_0x4d810c['getEmptyEquipSlotOfSameEtype'](this[_0x2fcb9e(0x38c)]);_0x419120>=0x0&&_0x4d810c['forceChangeEquip'](_0x419120,this[_0x2fcb9e(0x38c)]),this[_0x2fcb9e(0x28f)]=_0x4d810c;}return this['_tempActor'];},Window_ShopStatus['prototype']['needsNewTempActor']=function(_0x30cc69){const _0x4be98c=_0x1d2fe5;if(!this[_0x4be98c(0x28f)])return!![];return this[_0x4be98c(0x28f)][_0x4be98c(0x22a)]()!==_0x30cc69[_0x4be98c(0x22a)]();},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3ba)]=function(_0x52e9f7){const _0x458f22=_0x1d2fe5;if(!_0x52e9f7)return![];const _0x2d4996=_0x52e9f7[_0x458f22(0x473)],_0x328700=this[_0x458f22(0x31b)]();for(let _0x5a7476=0x0;_0x5a7476<_0x328700[_0x458f22(0x2d3)];_0x5a7476++){const _0x4ba921=_0x328700[_0x5a7476];if(_0x4ba921!==_0x2d4996)continue;if(!this[_0x458f22(0x3e8)]()[_0x5a7476])return!![];}return![];},Game_Actor[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x32d)]=function(_0x516546){const _0xe6659d=_0x1d2fe5;if(!_0x516546)return-0x1;const _0x3f13bd=_0x516546[_0xe6659d(0x473)],_0xd64bc3=this['equipSlots']();let _0x397a75=-0x1;for(let _0x4883b0=0x0;_0x4883b0<_0xd64bc3[_0xe6659d(0x2d3)];_0x4883b0++){const _0x2cd100=_0xd64bc3[_0x4883b0];if(_0x2cd100!==_0x3f13bd)continue;if(!this['equips']()[_0x4883b0])return _0x4883b0;if(_0x397a75<0x0)_0x397a75=_0x4883b0;}return _0x397a75;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4bf)]=function(){const _0x34dc4c=_0x1d2fe5;VisuMZ[_0x34dc4c(0x39f)]['Settings'][_0x34dc4c(0x2f2)]['DrawItemData']['call'](this);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x51e)]=function(_0x1f2cd1,_0x5df0d3,_0x4cb289,_0x27a5eb){const _0x1961d6=_0x1d2fe5,_0x495688=DataManager['isSkill'](_0x1f2cd1,_0x5df0d3,_0x4cb289,_0x27a5eb)&&Imported[_0x1961d6(0x576)],_0x25c188=_0x1f2cd1?_0x1f2cd1['name']:'';if(_0x495688)Window_SkillList[_0x1961d6(0x3dc)][_0x1961d6(0x22b)][_0x1961d6(0x4e5)](this,_0x1f2cd1);Window_Base[_0x1961d6(0x3dc)]['drawItemName'][_0x1961d6(0x4e5)](this,_0x1f2cd1,_0x5df0d3,_0x4cb289,_0x27a5eb);if(_0x495688)_0x1f2cd1['name']=_0x25c188;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3b6)]=function(){const _0x5f45c6=_0x1d2fe5;this[_0x5f45c6(0x1d5)]={};if(!this[_0x5f45c6(0x38c)])return;const _0x2c2571=this[_0x5f45c6(0x38c)][_0x5f45c6(0x3f8)];if(_0x2c2571[_0x5f45c6(0x26a)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x4aa1f2=String(RegExp['$1'])[_0x5f45c6(0x3e9)](/[\r\n]+/);for(const _0x483535 of _0x4aa1f2){if(_0x483535[_0x5f45c6(0x26a)](/(.*):[ ](.*)/i)){const _0x27c2f3=String(RegExp['$1'])[_0x5f45c6(0x27f)]()[_0x5f45c6(0x5a1)](),_0x5a2333=String(RegExp['$2'])[_0x5f45c6(0x5a1)]();this[_0x5f45c6(0x1d5)][_0x27c2f3]=_0x5a2333;}}}},Window_ShopStatus['prototype'][_0x1d2fe5(0x29b)]=function(){const _0x243a60=_0x1d2fe5;return Math['max'](0x1,$gameSystem[_0x243a60(0x339)]()-0x4);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x30c)]=function(){const _0x11e46a=_0x1d2fe5;Window_StatusBase[_0x11e46a(0x3dc)][_0x11e46a(0x30c)][_0x11e46a(0x4e5)](this),this[_0x11e46a(0x2cc)][_0x11e46a(0x470)]=this[_0x11e46a(0x26d)]||this[_0x11e46a(0x2cc)]['fontSize'],this[_0x11e46a(0x2cc)][_0x11e46a(0x3ae)]=this[_0x11e46a(0x228)]||this['contents'][_0x11e46a(0x3ae)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3bc)]=function(){const _0x5e384b=_0x1d2fe5;return this[_0x5e384b(0x2cc)][_0x5e384b(0x470)]/$gameSystem[_0x5e384b(0x339)]();},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x31c)]=function(_0x4e6e73,_0x58c6fa,_0x3349e1){const _0x1c1cbd=_0x1d2fe5,_0x3487fb=ImageManager['loadSystem'](_0x1c1cbd(0x4e8)),_0x4ee887=ImageManager['iconWidth'],_0x384bd7=ImageManager[_0x1c1cbd(0x436)],_0x103da1=_0x4e6e73%0x10*_0x4ee887,_0xc92df9=Math[_0x1c1cbd(0x331)](_0x4e6e73/0x10)*_0x384bd7,_0x6f31a9=Math['ceil'](_0x4ee887*this[_0x1c1cbd(0x3bc)]()),_0x3de7d0=Math['ceil'](_0x384bd7*this['fontSizeRatio']());this['contents'][_0x1c1cbd(0x297)](_0x3487fb,_0x103da1,_0xc92df9,_0x4ee887,_0x384bd7,_0x58c6fa,_0x3349e1,_0x6f31a9,_0x3de7d0);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x437)]=function(_0x213b17,_0xb9945f){const _0x574be3=_0x1d2fe5;_0xb9945f[_0x574be3(0x4e6)]&&this[_0x574be3(0x31c)](_0x213b17,_0xb9945f['x'],_0xb9945f['y']+0x2);_0xb9945f['x']+=Math[_0x574be3(0x5d1)](ImageManager[_0x574be3(0x513)]*this['fontSizeRatio']());if(this[_0x574be3(0x3bc)]()===0x1)_0xb9945f['x']+=0x4;},Window_ShopStatus['prototype'][_0x1d2fe5(0x47a)]=function(_0x5d5288,_0x378d07,_0x35895,_0x3c0378,_0xbcc94d,_0x215a55){const _0x19a2eb=_0x1d2fe5;_0x5d5288=_0x5d5288||'',_0x215a55=_0x215a55||'left',this['_resetFontSize']=this[_0x19a2eb(0x29b)](),this[_0x19a2eb(0x228)]=_0xbcc94d?ColorManager[_0x19a2eb(0x3ce)]():this[_0x19a2eb(0x2cc)][_0x19a2eb(0x3ae)],_0x378d07+=this[_0x19a2eb(0x523)](),_0x3c0378-=this['itemPadding']()*0x2;const _0x1fffbc=this[_0x19a2eb(0x4fe)](_0x5d5288);if(_0x215a55==='center')_0x378d07=_0x378d07+Math[_0x19a2eb(0x331)]((_0x3c0378-_0x1fffbc[_0x19a2eb(0x20e)])/0x2);else _0x215a55==='right'&&(_0x378d07=_0x378d07+_0x3c0378-_0x1fffbc[_0x19a2eb(0x20e)]);_0x35895+=(this[_0x19a2eb(0x408)]()-_0x1fffbc['height'])/0x2,this[_0x19a2eb(0x340)](_0x5d5288,_0x378d07,_0x35895,_0x3c0378),this[_0x19a2eb(0x26d)]=undefined,this['_resetFontColor']=undefined,this['resetFontSettings']();},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x554)]=function(_0x42c976,_0x3c5780,_0x2ae32a){const _0x4cae38=_0x1d2fe5;if(!DataManager[_0x4cae38(0x36e)](this[_0x4cae38(0x38c)]))return![];const _0x1ad194=this[_0x4cae38(0x48a)]();this['drawItemKeyData'](_0x1ad194,_0x42c976,_0x3c5780,_0x2ae32a,!![]);const _0x386fb4=this[_0x4cae38(0x439)]();return this[_0x4cae38(0x47a)](_0x386fb4,_0x42c976,_0x3c5780,_0x2ae32a,![],_0x4cae38(0x5c0)),this[_0x4cae38(0x47c)](_0x42c976,_0x3c5780,_0x2ae32a),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x48a)]=function(){const _0xf0e47=_0x1d2fe5;return VisuMZ[_0xf0e47(0x39f)][_0xf0e47(0x478)][_0xf0e47(0x2f2)][_0xf0e47(0x58b)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x439)]=function(){const _0x191711=_0x1d2fe5,_0x3c2798=_0x191711(0x4b0);if(this[_0x191711(0x1d5)][_0x3c2798])return this[_0x191711(0x1d5)][_0x3c2798];return this[_0x191711(0x326)]()?VisuMZ[_0x191711(0x39f)][_0x191711(0x478)][_0x191711(0x2f2)][_0x191711(0x57e)]:VisuMZ[_0x191711(0x39f)]['Settings'][_0x191711(0x2f2)][_0x191711(0x299)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x326)]=function(){const _0x5a199c=_0x1d2fe5;return VisuMZ[_0x5a199c(0x1eb)]&&VisuMZ[_0x5a199c(0x1eb)][_0x5a199c(0x478)][_0x5a199c(0x1d9)][_0x5a199c(0x2bc)]&&DataManager[_0x5a199c(0x1df)](this[_0x5a199c(0x38c)])?![]:this['_item'][_0x5a199c(0x2e8)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x597)]=function(_0x13f727,_0x3bf033,_0x4720cb){const _0x40ae33=_0x1d2fe5;if(!this[_0x40ae33(0x2f5)]()&&!DataManager[_0x40ae33(0x36e)](this[_0x40ae33(0x38c)]))return![];if(DataManager[_0x40ae33(0x1df)](this['_item'])&&!$dataSystem[_0x40ae33(0x349)]){const _0x113e83=TextManager['keyItem'];this[_0x40ae33(0x47a)](_0x113e83,_0x13f727,_0x3bf033,_0x4720cb,!![],'center');}else{const _0x11b0a8=TextManager[_0x40ae33(0x3ea)];this[_0x40ae33(0x47a)](_0x11b0a8,_0x13f727,_0x3bf033,_0x4720cb,!![]);const _0x50e332=this[_0x40ae33(0x57c)]();this[_0x40ae33(0x47a)](_0x50e332,_0x13f727,_0x3bf033,_0x4720cb,![],_0x40ae33(0x5c0));}return this[_0x40ae33(0x47c)](_0x13f727,_0x3bf033,_0x4720cb),this[_0x40ae33(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x57c)]=function(){const _0x130155=_0x1d2fe5,_0x54d3f5=_0x130155(0x2a0);if(this[_0x130155(0x1d5)][_0x54d3f5])return this['_customItemInfo'][_0x54d3f5];const _0x414d45=VisuMZ['ItemsEquipsCore'][_0x130155(0x478)][_0x130155(0x503)][_0x130155(0x4f9)];return _0x414d45[_0x130155(0x44f)]($gameParty['numItems'](this['_item']));},Window_ShopStatus['prototype'][_0x1d2fe5(0x1db)]=function(_0x4e4585,_0x10a6e0,_0xacb7eb){const _0x4e5437=_0x1d2fe5,_0x5dfaef=this[_0x4e5437(0x32c)]();return this[_0x4e5437(0x47a)](_0x5dfaef,_0x4e4585,_0x10a6e0,_0xacb7eb,![],_0x4e5437(0x49e)),this[_0x4e5437(0x47c)](_0x4e4585,_0x10a6e0,_0xacb7eb),this[_0x4e5437(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)]['getItemOccasionText']=function(){const _0x3770b6=_0x1d2fe5,_0x460fbc=_0x3770b6(0x2a7);if(this[_0x3770b6(0x1d5)][_0x460fbc])return this[_0x3770b6(0x1d5)][_0x460fbc];const _0x1571c7=VisuMZ[_0x3770b6(0x39f)][_0x3770b6(0x478)][_0x3770b6(0x2f2)],_0x3dd6c6=_0x3770b6(0x27a)[_0x3770b6(0x44f)](this['_item'][_0x3770b6(0x5cb)]);return _0x1571c7[_0x3dd6c6];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2d6)]=function(_0x51dc6f,_0x16023c,_0x5900cf){const _0x11675c=_0x1d2fe5,_0x30bd5e=this[_0x11675c(0x4d5)]();return this[_0x11675c(0x47a)](_0x30bd5e,_0x51dc6f,_0x16023c,_0x5900cf,![],_0x11675c(0x49e)),this['drawItemDarkRect'](_0x51dc6f,_0x16023c,_0x5900cf),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4d5)]=function(){const _0x18749b=_0x1d2fe5,_0x4f4557=_0x18749b(0x3fa);if(this[_0x18749b(0x1d5)][_0x4f4557])return this['_customItemInfo'][_0x4f4557];const _0x510649=VisuMZ['ItemsEquipsCore']['Settings'][_0x18749b(0x2f2)];if(Imported[_0x18749b(0x53b)]){const _0x281646=this['_item'][_0x18749b(0x3f8)];if(_0x281646['match'](/<TARGET:[ ](.*)>/i)){const _0x5c4ce7=String(RegExp['$1']);if(_0x5c4ce7[_0x18749b(0x26a)](/(\d+) RANDOM ANY/i))return _0x510649[_0x18749b(0x232)][_0x18749b(0x44f)](Number(RegExp['$1']));else{if(_0x5c4ce7[_0x18749b(0x26a)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x510649['ScopeRandomEnemies'][_0x18749b(0x44f)](Number(RegExp['$1']));else{if(_0x5c4ce7[_0x18749b(0x26a)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x510649[_0x18749b(0x37d)]['format'](Number(RegExp['$1']));else{if(_0x5c4ce7['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x510649[_0x18749b(0x534)];else{if(_0x5c4ce7[_0x18749b(0x26a)](/ALLY OR ENEMY/i))return _0x510649[_0x18749b(0x4ae)]||_0x510649[_0x18749b(0x387)];else{if(_0x5c4ce7[_0x18749b(0x26a)](/ENEMY OR ALLY/i))return _0x510649[_0x18749b(0x45a)]||_0x510649[_0x18749b(0x3dd)];}}}}}}}const _0x59349a=_0x18749b(0x56c)[_0x18749b(0x44f)](this[_0x18749b(0x38c)]['scope']);return _0x510649[_0x59349a];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1d8)]=function(_0x4a33ee,_0x2e35cf,_0x43fc61){const _0x4edbb4=_0x1d2fe5,_0x29089f=this[_0x4edbb4(0x2da)]();this[_0x4edbb4(0x47a)](_0x29089f,_0x4a33ee,_0x2e35cf,_0x43fc61,!![]);const _0x21fe36=this[_0x4edbb4(0x209)]();return this[_0x4edbb4(0x47a)](_0x21fe36,_0x4a33ee,_0x2e35cf,_0x43fc61,![],_0x4edbb4(0x5c0)),this[_0x4edbb4(0x47c)](_0x4a33ee,_0x2e35cf,_0x43fc61),this[_0x4edbb4(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2da)]=function(){const _0x53b088=_0x1d2fe5;return VisuMZ[_0x53b088(0x39f)]['Settings'][_0x53b088(0x2f2)][_0x53b088(0x1c4)];},Window_ShopStatus[_0x1d2fe5(0x3dc)]['getItemSpeedText']=function(){const _0x18db45=_0x1d2fe5,_0x4e5ebc=_0x18db45(0x47f);if(this[_0x18db45(0x1d5)][_0x4e5ebc])return this[_0x18db45(0x1d5)][_0x4e5ebc];const _0x1fb2be=this[_0x18db45(0x38c)][_0x18db45(0x3f7)];if(_0x1fb2be>=0x7d0)return VisuMZ[_0x18db45(0x39f)][_0x18db45(0x478)][_0x18db45(0x2f2)][_0x18db45(0x267)];else{if(_0x1fb2be>=0x3e8)return VisuMZ['ItemsEquipsCore'][_0x18db45(0x478)][_0x18db45(0x2f2)][_0x18db45(0x1ea)];else{if(_0x1fb2be>0x0)return VisuMZ['ItemsEquipsCore'][_0x18db45(0x478)]['StatusWindow'][_0x18db45(0x1c3)];else{if(_0x1fb2be===0x0)return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x18db45(0x560)];else{if(_0x1fb2be>-0x3e8)return VisuMZ[_0x18db45(0x39f)][_0x18db45(0x478)][_0x18db45(0x2f2)]['SpeedNeg999'];else{if(_0x1fb2be>-0x7d0)return VisuMZ[_0x18db45(0x39f)][_0x18db45(0x478)]['StatusWindow'][_0x18db45(0x3af)];else return _0x1fb2be<=-0x7d0?VisuMZ[_0x18db45(0x39f)]['Settings'][_0x18db45(0x2f2)]['SpeedNeg2000']:'?????';}}}}}},Window_ShopStatus['prototype'][_0x1d2fe5(0x4b7)]=function(_0xed145e,_0x3b2bfb,_0x3a3335){const _0x191252=_0x1d2fe5,_0x4b500c=this[_0x191252(0x423)]();this[_0x191252(0x47a)](_0x4b500c,_0xed145e,_0x3b2bfb,_0x3a3335,!![]);const _0x26d63c=this['getItemSuccessRateText']();return this[_0x191252(0x47a)](_0x26d63c,_0xed145e,_0x3b2bfb,_0x3a3335,![],_0x191252(0x5c0)),this[_0x191252(0x47c)](_0xed145e,_0x3b2bfb,_0x3a3335),this[_0x191252(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x423)]=function(){const _0x42ce14=_0x1d2fe5;return VisuMZ[_0x42ce14(0x39f)][_0x42ce14(0x478)]['StatusWindow'][_0x42ce14(0x313)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x353)]=function(){const _0x594489=_0x1d2fe5,_0x623d=_0x594489(0x3a1);if(this[_0x594489(0x1d5)][_0x623d])return this[_0x594489(0x1d5)][_0x623d];if(Imported['VisuMZ_1_BattleCore']){const _0x13e81c=this[_0x594489(0x38c)][_0x594489(0x3f8)];if(_0x13e81c['match'](/<ALWAYS HIT>/i))return _0x594489(0x2b6);else{if(_0x13e81c[_0x594489(0x26a)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x594489(0x44b)[_0x594489(0x44f)](Number(RegExp['$1']));}}return _0x594489(0x44b)[_0x594489(0x44f)](this[_0x594489(0x38c)][_0x594489(0x370)]);},Window_ShopStatus['prototype']['drawItemRepeats']=function(_0x23f57f,_0x1095ad,_0x4b21cd){const _0x304493=_0x1d2fe5,_0x2ba702=this[_0x304493(0x34f)]();this[_0x304493(0x47a)](_0x2ba702,_0x23f57f,_0x1095ad,_0x4b21cd,!![]);const _0x5446d9=this[_0x304493(0x2f4)]();return this[_0x304493(0x47a)](_0x5446d9,_0x23f57f,_0x1095ad,_0x4b21cd,![],_0x304493(0x5c0)),this[_0x304493(0x47c)](_0x23f57f,_0x1095ad,_0x4b21cd),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x1d2fe5(0x34f)]=function(){const _0x163189=_0x1d2fe5;return VisuMZ[_0x163189(0x39f)][_0x163189(0x478)][_0x163189(0x2f2)][_0x163189(0x400)];},Window_ShopStatus['prototype']['getItemRepeatsText']=function(){const _0x212bb0=_0x1d2fe5,_0x28f47d=_0x212bb0(0x475);if(this[_0x212bb0(0x1d5)][_0x28f47d])return this[_0x212bb0(0x1d5)][_0x28f47d];const _0x814393=_0x212bb0(0x291);return _0x814393[_0x212bb0(0x44f)](this['_item'][_0x212bb0(0x4f3)]);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x1f9)]=function(_0x2efa94,_0x3457b2,_0x39fc29){const _0x1aeafe=_0x1d2fe5,_0x18bf80=this[_0x1aeafe(0x345)]();this['drawItemKeyData'](_0x18bf80,_0x2efa94,_0x3457b2,_0x39fc29,!![]);const _0x1ef5b5=this['getItemHitTypeText']();return this[_0x1aeafe(0x47a)](_0x1ef5b5,_0x2efa94,_0x3457b2,_0x39fc29,![],_0x1aeafe(0x5c0)),this[_0x1aeafe(0x47c)](_0x2efa94,_0x3457b2,_0x39fc29),this[_0x1aeafe(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x345)]=function(){const _0x55ebd4=_0x1d2fe5;return VisuMZ[_0x55ebd4(0x39f)][_0x55ebd4(0x478)]['StatusWindow'][_0x55ebd4(0x1e4)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4b2)]=function(){const _0x228ef2=_0x1d2fe5,_0x465e35=_0x228ef2(0x2dd);if(this[_0x228ef2(0x1d5)][_0x465e35])return this[_0x228ef2(0x1d5)][_0x465e35];const _0x5c9189=VisuMZ[_0x228ef2(0x39f)]['Settings']['StatusWindow'],_0x99cfcd='HitType%1'[_0x228ef2(0x44f)](this[_0x228ef2(0x38c)][_0x228ef2(0x5a2)]);return _0x5c9189[_0x99cfcd];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x355)]=function(_0x40e5c9,_0x36de9b,_0xf4d16c){const _0x154ffc=_0x1d2fe5;if(this[_0x154ffc(0x38c)][_0x154ffc(0x33c)][_0x154ffc(0x525)]<=0x0)return _0x36de9b;if(this[_0x154ffc(0x5b0)](_0x40e5c9,_0x36de9b,_0xf4d16c))_0x36de9b+=this[_0x154ffc(0x408)]();if(this[_0x154ffc(0x4d7)](_0x40e5c9,_0x36de9b,_0xf4d16c))_0x36de9b+=this['lineHeight']();return this['resetFontSettings'](),_0x36de9b;},Window_ShopStatus[_0x1d2fe5(0x3dc)]['drawItemDamageElement']=function(_0x16d96e,_0x308ed8,_0x5d7438){const _0x216874=_0x1d2fe5,_0x5d35d8=this['getItemDamageElementLabel']();this['drawItemKeyData'](_0x5d35d8,_0x16d96e,_0x308ed8,_0x5d7438,!![]);const _0x3bfe1f=this[_0x216874(0x484)]();return this[_0x216874(0x47a)](_0x3bfe1f,_0x16d96e,_0x308ed8,_0x5d7438,![],_0x216874(0x5c0)),this[_0x216874(0x47c)](_0x16d96e,_0x308ed8,_0x5d7438),this[_0x216874(0x30c)](),!![];},Window_ShopStatus['prototype']['getItemDamageElementLabel']=function(){const _0x112c5c=_0x1d2fe5;return VisuMZ['ItemsEquipsCore'][_0x112c5c(0x478)][_0x112c5c(0x2f2)][_0x112c5c(0x50f)];},Window_ShopStatus[_0x1d2fe5(0x3dc)]['getItemDamageElementText']=function(){const _0x5a6acc=_0x1d2fe5,_0x37048d='ELEMENT';if(this['_customItemInfo'][_0x37048d])return this['_customItemInfo'][_0x37048d];if(this['_item'][_0x5a6acc(0x33c)][_0x5a6acc(0x5ac)]<=-0x1)return VisuMZ[_0x5a6acc(0x39f)][_0x5a6acc(0x478)][_0x5a6acc(0x2f2)][_0x5a6acc(0x3a7)];else return this[_0x5a6acc(0x38c)][_0x5a6acc(0x33c)][_0x5a6acc(0x5ac)]===0x0?VisuMZ[_0x5a6acc(0x39f)][_0x5a6acc(0x478)][_0x5a6acc(0x2f2)]['ElementNone']:$dataSystem['elements'][this[_0x5a6acc(0x38c)][_0x5a6acc(0x33c)][_0x5a6acc(0x5ac)]];},Window_ShopStatus['prototype'][_0x1d2fe5(0x4d7)]=function(_0x4164a9,_0x3f7105,_0xd298e5){const _0x38655b=_0x1d2fe5,_0x23c70c=this[_0x38655b(0x38a)]();this[_0x38655b(0x47a)](_0x23c70c,_0x4164a9,_0x3f7105,_0xd298e5,!![]),this[_0x38655b(0x3b0)]();const _0x4f0792=this[_0x38655b(0x29c)](),_0x202e63=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x38655b(0x38c)][_0x38655b(0x33c)][_0x38655b(0x525)]]);return this[_0x38655b(0x4e2)](_0x202e63),this[_0x38655b(0x47a)](_0x4f0792,_0x4164a9,_0x3f7105,_0xd298e5,![],_0x38655b(0x5c0)),this['drawItemDarkRect'](_0x4164a9,_0x3f7105,_0xd298e5),this[_0x38655b(0x30c)](),!![];},Window_ShopStatus['prototype'][_0x1d2fe5(0x38a)]=function(){const _0x4f1faa=_0x1d2fe5;return Imported[_0x4f1faa(0x53b)]&&DataManager[_0x4f1faa(0x3c1)](this[_0x4f1faa(0x38c)])!==_0x4f1faa(0x3e7)?this[_0x4f1faa(0x58d)]():this[_0x4f1faa(0x53e)]();},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x53e)]=function(){const _0x3471d8=_0x1d2fe5,_0x4ca7ac=VisuMZ[_0x3471d8(0x39f)][_0x3471d8(0x478)][_0x3471d8(0x2f2)],_0x36419f=_0x3471d8(0x332)[_0x3471d8(0x44f)](this[_0x3471d8(0x38c)][_0x3471d8(0x33c)][_0x3471d8(0x525)]),_0x32b7fd=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x3471d8(0x38c)][_0x3471d8(0x33c)]['type']];return _0x4ca7ac[_0x36419f][_0x3471d8(0x44f)](_0x32b7fd);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3b0)]=function(){const _0x11ad1d=_0x1d2fe5,_0x1359da=$gameActors[_0x11ad1d(0x4ff)](0x1);this['_tempActorA']=JsonEx['makeDeepCopy'](_0x1359da),this[_0x11ad1d(0x528)]=JsonEx[_0x11ad1d(0x4e1)](_0x1359da);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x29c)]=function(){const _0x59591f=_0x1d2fe5,_0x36b017=_0x59591f(0x40d);if(this[_0x59591f(0x1d5)][_0x36b017])return this[_0x59591f(0x1d5)][_0x36b017];return Imported[_0x59591f(0x53b)]&&DataManager[_0x59591f(0x3c1)](this[_0x59591f(0x38c)])!==_0x59591f(0x3e7)?this[_0x59591f(0x2c0)]():this[_0x59591f(0x44e)]();},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x44e)]=function(){const _0x2fa1d5=_0x1d2fe5;window['a']=this['_tempActorA'],window['b']=this[_0x2fa1d5(0x528)],this[_0x2fa1d5(0x362)][_0x2fa1d5(0x242)](!![]),this['_tempActorB']['setShopStatusWindowMode']([0x3,0x4][_0x2fa1d5(0x382)](this['_item'][_0x2fa1d5(0x33c)][_0x2fa1d5(0x525)]));let _0x4e1a8c=this[_0x2fa1d5(0x38c)][_0x2fa1d5(0x33c)][_0x2fa1d5(0x431)];try{const _0x2d0492=Math[_0x2fa1d5(0x572)](eval(_0x4e1a8c),0x0)/window['a'][_0x2fa1d5(0x3f2)];return this[_0x2fa1d5(0x55d)](),isNaN(_0x2d0492)?_0x2fa1d5(0x24e):'%1%'[_0x2fa1d5(0x44f)](Math[_0x2fa1d5(0x4a8)](_0x2d0492*0x64));}catch(_0x5e3f66){return $gameTemp['isPlaytest']()&&(console[_0x2fa1d5(0x3cc)](_0x2fa1d5(0x20a)[_0x2fa1d5(0x44f)](this[_0x2fa1d5(0x38c)][_0x2fa1d5(0x36f)])),console[_0x2fa1d5(0x3cc)](_0x5e3f66)),this[_0x2fa1d5(0x55d)](),_0x2fa1d5(0x24e);}},Window_ShopStatus['prototype'][_0x1d2fe5(0x55d)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x409)]=function(_0x4392bf,_0x16a53c,_0x1989c5){const _0xd08991=_0x1d2fe5;if(!this[_0xd08991(0x456)]())return _0x16a53c;if(this['drawItemEffectsHpRecovery'](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this[_0xd08991(0x2bf)](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this[_0xd08991(0x25d)](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this[_0xd08991(0x4be)](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this[_0xd08991(0x32b)](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this[_0xd08991(0x584)](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this['drawItemEffectsSelfTpGain'](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this[_0xd08991(0x2b0)](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();if(this[_0xd08991(0x527)](_0x4392bf,_0x16a53c,_0x1989c5))_0x16a53c+=this[_0xd08991(0x408)]();return this['resetFontSettings'](),_0x16a53c;},Window_ShopStatus[_0x1d2fe5(0x3dc)]['getItemEffects']=function(){const _0x3e1d79=_0x1d2fe5;return this[_0x3e1d79(0x38c)]['effects'];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x456)]=function(){const _0x5d63da=_0x1d2fe5;let _0x5358b0=![];this[_0x5d63da(0x2c5)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x52b4c9=this[_0x5d63da(0x222)]();for(const _0x36d412 of _0x52b4c9){switch(_0x36d412['code']){case Game_Action[_0x5d63da(0x2b3)]:this[_0x5d63da(0x2c5)][_0x5d63da(0x5a4)]+=_0x36d412['value1'],this[_0x5d63da(0x2c5)][_0x5d63da(0x21d)]+=_0x36d412[_0x5d63da(0x476)],_0x5358b0=!![];break;case Game_Action[_0x5d63da(0x5a6)]:this[_0x5d63da(0x2c5)][_0x5d63da(0x383)]+=_0x36d412[_0x5d63da(0x24f)],this['_itemData'][_0x5d63da(0x3b4)]+=_0x36d412[_0x5d63da(0x476)],_0x5358b0=!![];break;case Game_Action['EFFECT_GAIN_TP']:this['_itemData'][_0x5d63da(0x32a)]+=_0x36d412[_0x5d63da(0x24f)],_0x5358b0=!![];break;case Game_Action[_0x5d63da(0x312)]:this[_0x5d63da(0x2c5)][_0x5d63da(0x574)][_0x5d63da(0x334)](_0x36d412[_0x5d63da(0x5aa)]),_0x5358b0=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this['_itemData'][_0x5d63da(0x308)][_0x5d63da(0x334)](_0x36d412[_0x5d63da(0x5aa)]),this[_0x5d63da(0x2c5)]['removeStateBuffChanges']=!![],_0x5358b0=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this[_0x5d63da(0x2c5)][_0x5d63da(0x411)][_0x36d412[_0x5d63da(0x5aa)]]+=0x1,_0x5358b0=!![];break;case Game_Action[_0x5d63da(0x234)]:this[_0x5d63da(0x2c5)]['changeBuff'][_0x36d412[_0x5d63da(0x5aa)]]-=0x1,_0x5358b0=!![];break;case Game_Action[_0x5d63da(0x51b)]:this['_itemData'][_0x5d63da(0x253)][_0x5d63da(0x334)](_0x36d412['dataId']),this['_itemData'][_0x5d63da(0x20c)]=!![],_0x5358b0=!![];break;case Game_Action[_0x5d63da(0x495)]:this[_0x5d63da(0x2c5)][_0x5d63da(0x56f)][_0x5d63da(0x334)](_0x36d412[_0x5d63da(0x5aa)]),this['_itemData'][_0x5d63da(0x20c)]=!![],_0x5358b0=!![];break;}}if(this[_0x5d63da(0x2c5)]['addState'][_0x5d63da(0x2d3)]>0x0)this[_0x5d63da(0x2c5)][_0x5d63da(0x413)]=!![];for(let _0x1d16b0=0x0;_0x1d16b0<this[_0x5d63da(0x2c5)][_0x5d63da(0x411)][_0x5d63da(0x2d3)];_0x1d16b0++){if(this[_0x5d63da(0x2c5)]['changeBuff'][_0x1d16b0]!==0x0)this[_0x5d63da(0x2c5)][_0x5d63da(0x413)]=!![];}this[_0x5d63da(0x38c)]['tpGain']!==0x0&&(this[_0x5d63da(0x2c5)][_0x5d63da(0x522)]=this[_0x5d63da(0x38c)][_0x5d63da(0x465)],_0x5358b0=!![]);const _0x5e7031=['HP\x20RECOVERY',_0x5d63da(0x3aa),_0x5d63da(0x448),_0x5d63da(0x5c4),_0x5d63da(0x5cd),'TP\x20DAMAGE','USER\x20TP\x20GAIN',_0x5d63da(0x27c),_0x5d63da(0x2a5)];for(const _0x20b10a of _0x5e7031){if(this['_customItemInfo'][_0x20b10a]){_0x5358b0=!![];break;}}return _0x5358b0;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x40f)]=function(_0xe7300d,_0x4a6caf,_0x464832){const _0x1f3601=_0x1d2fe5,_0x104bb3=_0x1f3601(0x3c6);if(this['_itemData']['rateHP']<=0x0&&this[_0x1f3601(0x2c5)][_0x1f3601(0x21d)]<=0x0&&!this[_0x1f3601(0x1d5)][_0x104bb3])return![];const _0x5867a2=this['getItemEffectsHpRecoveryLabel']();this['drawItemKeyData'](_0x5867a2,_0xe7300d,_0x4a6caf,_0x464832,!![]);const _0x491bd8=this[_0x1f3601(0x223)]();return this[_0x1f3601(0x4e2)](ColorManager['damageColor'](0x1)),this['drawItemKeyData'](_0x491bd8,_0xe7300d,_0x4a6caf,_0x464832,![],_0x1f3601(0x5c0)),this['drawItemDarkRect'](_0xe7300d,_0x4a6caf,_0x464832),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x33f)]=function(){const _0x3a5337=_0x1d2fe5,_0x43b3da=VisuMZ['ItemsEquipsCore'][_0x3a5337(0x478)][_0x3a5337(0x2f2)][_0x3a5337(0x2ff)];return _0x43b3da['format'](TextManager['hp']);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x223)]=function(){const _0x1e27e0=_0x1d2fe5,_0x2068c1=_0x1e27e0(0x3c6);if(this[_0x1e27e0(0x1d5)][_0x2068c1])return this[_0x1e27e0(0x1d5)][_0x2068c1];let _0x103f99='';if(this['_itemData'][_0x1e27e0(0x5a4)]>0x0)_0x103f99+=_0x1e27e0(0x45e)['format'](Math[_0x1e27e0(0x331)](this[_0x1e27e0(0x2c5)][_0x1e27e0(0x5a4)]*0x64));if(this[_0x1e27e0(0x2c5)]['rateHP']>0x0&&this['_itemData'][_0x1e27e0(0x21d)]>0x0)_0x103f99+='\x20';if(this[_0x1e27e0(0x2c5)][_0x1e27e0(0x21d)]>0x0)_0x103f99+=_0x1e27e0(0x51a)[_0x1e27e0(0x44f)](this[_0x1e27e0(0x2c5)][_0x1e27e0(0x21d)]);return _0x103f99;},Window_ShopStatus['prototype']['drawItemEffectsMpRecovery']=function(_0x1824f3,_0x4e1020,_0x3f680d){const _0x38987a=_0x1d2fe5,_0x26f31c=_0x38987a(0x3aa);if(this[_0x38987a(0x2c5)]['rateMP']<=0x0&&this[_0x38987a(0x2c5)]['flatMP']<=0x0&&!this[_0x38987a(0x1d5)][_0x26f31c])return![];const _0x49d5f0=this['getItemEffectsMpRecoveryLabel']();this[_0x38987a(0x47a)](_0x49d5f0,_0x1824f3,_0x4e1020,_0x3f680d,!![]);const _0x4a7e45=this[_0x38987a(0x34d)]();return this[_0x38987a(0x4e2)](ColorManager[_0x38987a(0x5c7)](0x3)),this[_0x38987a(0x47a)](_0x4a7e45,_0x1824f3,_0x4e1020,_0x3f680d,![],_0x38987a(0x5c0)),this['drawItemDarkRect'](_0x1824f3,_0x4e1020,_0x3f680d),this[_0x38987a(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)]['getItemEffectsMpRecoveryLabel']=function(){const _0x335ad0=_0x1d2fe5,_0x58589c=VisuMZ[_0x335ad0(0x39f)][_0x335ad0(0x478)]['StatusWindow'][_0x335ad0(0x4ac)];return _0x58589c['format'](TextManager['mp']);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x34d)]=function(){const _0x4bfaf1=_0x1d2fe5,_0x25daea=_0x4bfaf1(0x3aa);if(this[_0x4bfaf1(0x1d5)][_0x25daea])return this[_0x4bfaf1(0x1d5)][_0x25daea];let _0x3ec432='';if(this[_0x4bfaf1(0x2c5)][_0x4bfaf1(0x383)]>0x0)_0x3ec432+=_0x4bfaf1(0x45e)[_0x4bfaf1(0x44f)](Math['floor'](this[_0x4bfaf1(0x2c5)][_0x4bfaf1(0x383)]*0x64));if(this[_0x4bfaf1(0x2c5)][_0x4bfaf1(0x383)]>0x0&&this[_0x4bfaf1(0x2c5)][_0x4bfaf1(0x3b4)]>0x0)_0x3ec432+='\x20';if(this[_0x4bfaf1(0x2c5)]['flatMP']>0x0)_0x3ec432+=_0x4bfaf1(0x51a)[_0x4bfaf1(0x44f)](this[_0x4bfaf1(0x2c5)]['flatMP']);return _0x3ec432;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x25d)]=function(_0x14dfe0,_0x4780f4,_0xf18a1e){const _0x94efa=_0x1d2fe5,_0x460d4f='TP\x20RECOVERY';if(this[_0x94efa(0x2c5)]['gainTP']<=0x0&&!this['_customItemInfo'][_0x460d4f])return![];const _0x281ca2=this[_0x94efa(0x261)]();this['drawItemKeyData'](_0x281ca2,_0x14dfe0,_0x4780f4,_0xf18a1e,!![]);const _0x163d1a=this['getItemEffectsTpRecoveryText']();return this['changeTextColor'](ColorManager[_0x94efa(0x37a)]()),this[_0x94efa(0x47a)](_0x163d1a,_0x14dfe0,_0x4780f4,_0xf18a1e,![],_0x94efa(0x5c0)),this[_0x94efa(0x47c)](_0x14dfe0,_0x4780f4,_0xf18a1e),this[_0x94efa(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x261)]=function(){const _0x584681=_0x1d2fe5,_0x520cb1=VisuMZ[_0x584681(0x39f)]['Settings'][_0x584681(0x2f2)][_0x584681(0x29d)];return _0x520cb1[_0x584681(0x44f)](TextManager['tp']);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x5d4)]=function(){const _0xa3ebd4=_0x1d2fe5,_0xf7bec=_0xa3ebd4(0x448);if(this[_0xa3ebd4(0x1d5)][_0xf7bec])return this['_customItemInfo'][_0xf7bec];let _0x32a5b6='';return _0x32a5b6+=_0xa3ebd4(0x51a)[_0xa3ebd4(0x44f)](this[_0xa3ebd4(0x2c5)][_0xa3ebd4(0x32a)]),_0x32a5b6;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4ec)]=function(_0x33e44e,_0x2114b9,_0x2c3c96){const _0x46e3d5=_0x1d2fe5,_0x120eda='USER\x20TP\x20GAIN';if(this[_0x46e3d5(0x2c5)][_0x46e3d5(0x522)]===0x0&&!this[_0x46e3d5(0x1d5)][_0x120eda])return![];const _0x439a44=this[_0x46e3d5(0x490)]();this[_0x46e3d5(0x47a)](_0x439a44,_0x33e44e,_0x2114b9,_0x2c3c96,!![]);const _0x2cb03c=this[_0x46e3d5(0x4fc)]();return this[_0x46e3d5(0x2c5)][_0x46e3d5(0x522)]>0x0?this[_0x46e3d5(0x4e2)](ColorManager['powerUpColor']()):this[_0x46e3d5(0x4e2)](ColorManager[_0x46e3d5(0x4b5)]()),this[_0x46e3d5(0x47a)](_0x2cb03c,_0x33e44e,_0x2114b9,_0x2c3c96,![],_0x46e3d5(0x5c0)),this['drawItemDarkRect'](_0x33e44e,_0x2114b9,_0x2c3c96),this[_0x46e3d5(0x30c)](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x490)]=function(){const _0x444fce=_0x1d2fe5,_0x423a65=VisuMZ['ItemsEquipsCore'][_0x444fce(0x478)][_0x444fce(0x2f2)]['LabelSelfGainTP'];return _0x423a65[_0x444fce(0x44f)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x1d2fe5(0x4fc)]=function(){const _0x2ac202=_0x1d2fe5,_0x4e18c8=_0x2ac202(0x5be);if(this[_0x2ac202(0x1d5)][_0x4e18c8])return this[_0x2ac202(0x1d5)][_0x4e18c8];let _0x392692='';return this['_itemData']['selfTP']>0x0?_0x392692+=_0x2ac202(0x51a)['format'](this[_0x2ac202(0x2c5)]['selfTP']):_0x392692+='%1'[_0x2ac202(0x44f)](this['_itemData'][_0x2ac202(0x522)]),_0x392692;},Window_ShopStatus['prototype'][_0x1d2fe5(0x4be)]=function(_0x25fe68,_0x32cc59,_0xdf6e1c){const _0x14644c=_0x1d2fe5,_0x2d63c3='HP\x20DAMAGE';if(this[_0x14644c(0x2c5)][_0x14644c(0x5a4)]>=0x0&&this['_itemData']['flatHP']>=0x0&&!this['_customItemInfo'][_0x2d63c3])return![];const _0x134593=this['getItemEffectsHpDamageLabel']();this[_0x14644c(0x47a)](_0x134593,_0x25fe68,_0x32cc59,_0xdf6e1c,!![]);const _0x372731=this[_0x14644c(0x3a9)]();return this[_0x14644c(0x4e2)](ColorManager[_0x14644c(0x5c7)](0x0)),this[_0x14644c(0x47a)](_0x372731,_0x25fe68,_0x32cc59,_0xdf6e1c,![],_0x14644c(0x5c0)),this[_0x14644c(0x47c)](_0x25fe68,_0x32cc59,_0xdf6e1c),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x1d2fe5(0x316)]=function(){const _0x5839a1=_0x1d2fe5,_0x2a293e=VisuMZ[_0x5839a1(0x39f)]['Settings'][_0x5839a1(0x2f2)][_0x5839a1(0x48e)];return _0x2a293e[_0x5839a1(0x44f)](TextManager['hp']);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3a9)]=function(){const _0x565805=_0x1d2fe5,_0x299e8f=_0x565805(0x5c4);if(this[_0x565805(0x1d5)][_0x299e8f])return this[_0x565805(0x1d5)][_0x299e8f];let _0x5736d4='';if(this[_0x565805(0x2c5)]['rateHP']<0x0)_0x5736d4+=_0x565805(0x44b)['format'](Math[_0x565805(0x331)](this[_0x565805(0x2c5)]['rateHP']*0x64));if(this[_0x565805(0x2c5)][_0x565805(0x5a4)]<0x0&&this[_0x565805(0x2c5)][_0x565805(0x21d)]<0x0)_0x5736d4+='\x20';if(this[_0x565805(0x2c5)]['flatHP']<0x0)_0x5736d4+='%1'[_0x565805(0x44f)](this[_0x565805(0x2c5)][_0x565805(0x21d)]);return _0x5736d4;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x32b)]=function(_0x29ee49,_0x57b947,_0x4a7923){const _0x55d61a=_0x1d2fe5,_0x9566eb=_0x55d61a(0x5cd);if(this[_0x55d61a(0x2c5)][_0x55d61a(0x383)]>=0x0&&this['_itemData'][_0x55d61a(0x3b4)]>=0x0&&!this['_customItemInfo'][_0x9566eb])return![];const _0x3c185f=this[_0x55d61a(0x283)]();this[_0x55d61a(0x47a)](_0x3c185f,_0x29ee49,_0x57b947,_0x4a7923,!![]);const _0x50b749=this[_0x55d61a(0x446)]();return this[_0x55d61a(0x4e2)](ColorManager['damageColor'](0x2)),this[_0x55d61a(0x47a)](_0x50b749,_0x29ee49,_0x57b947,_0x4a7923,![],_0x55d61a(0x5c0)),this[_0x55d61a(0x47c)](_0x29ee49,_0x57b947,_0x4a7923),this[_0x55d61a(0x30c)](),!![];},Window_ShopStatus['prototype'][_0x1d2fe5(0x283)]=function(){const _0x4ae48d=_0x1d2fe5,_0x335c6b=VisuMZ[_0x4ae48d(0x39f)][_0x4ae48d(0x478)]['StatusWindow'][_0x4ae48d(0x240)];return _0x335c6b[_0x4ae48d(0x44f)](TextManager['mp']);},Window_ShopStatus['prototype'][_0x1d2fe5(0x446)]=function(){const _0x57c7c4=_0x1d2fe5,_0x469173=_0x57c7c4(0x5cd);if(this['_customItemInfo'][_0x469173])return this['_customItemInfo'][_0x469173];let _0x244789='';if(this[_0x57c7c4(0x2c5)][_0x57c7c4(0x383)]<0x0)_0x244789+=_0x57c7c4(0x44b)['format'](Math[_0x57c7c4(0x331)](this[_0x57c7c4(0x2c5)][_0x57c7c4(0x383)]*0x64));if(this[_0x57c7c4(0x2c5)][_0x57c7c4(0x383)]<0x0&&this['_itemData'][_0x57c7c4(0x3b4)]<0x0)_0x244789+='\x20';if(this[_0x57c7c4(0x2c5)][_0x57c7c4(0x3b4)]<0x0)_0x244789+='%1'['format'](this[_0x57c7c4(0x2c5)][_0x57c7c4(0x3b4)]);return _0x244789;},Window_ShopStatus[_0x1d2fe5(0x3dc)]['drawItemEffectsTpDamage']=function(_0x134753,_0x40f37a,_0x46c998){const _0x52eadc=_0x1d2fe5,_0x1eca9f=_0x52eadc(0x51f);if(this[_0x52eadc(0x2c5)]['gainTP']>=0x0&&!this[_0x52eadc(0x1d5)][_0x1eca9f])return![];const _0x1cb085=this[_0x52eadc(0x47d)]();this[_0x52eadc(0x47a)](_0x1cb085,_0x134753,_0x40f37a,_0x46c998,!![]);const _0x4cfd19=this[_0x52eadc(0x346)]();return this[_0x52eadc(0x4e2)](ColorManager['powerDownColor']()),this[_0x52eadc(0x47a)](_0x4cfd19,_0x134753,_0x40f37a,_0x46c998,![],_0x52eadc(0x5c0)),this[_0x52eadc(0x47c)](_0x134753,_0x40f37a,_0x46c998),this[_0x52eadc(0x30c)](),!![];},Window_ShopStatus['prototype'][_0x1d2fe5(0x47d)]=function(){const _0x4f2a47=_0x1d2fe5,_0x2e2234=VisuMZ[_0x4f2a47(0x39f)][_0x4f2a47(0x478)][_0x4f2a47(0x2f2)][_0x4f2a47(0x582)];return _0x2e2234[_0x4f2a47(0x44f)](TextManager['tp']);},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x346)]=function(){const _0x207dca=_0x1d2fe5,_0x43e911='TP\x20DAMAGE';if(this[_0x207dca(0x1d5)][_0x43e911])return this['_customItemInfo'][_0x43e911];let _0x4b3870='';return _0x4b3870+='%1'[_0x207dca(0x44f)](this[_0x207dca(0x2c5)][_0x207dca(0x32a)]),_0x4b3870;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x2b0)]=function(_0x300750,_0x75a93,_0x4ed7b4){const _0x11551f=_0x1d2fe5,_0x493d95=_0x11551f(0x27c);if(!this[_0x11551f(0x2c5)][_0x11551f(0x413)]&&!this['_customItemInfo'][_0x493d95])return![];const _0x24ce4d=this[_0x11551f(0x579)]();if(_0x24ce4d['length']<=0x0)return![];const _0x900c34=this[_0x11551f(0x3f3)]();return this[_0x11551f(0x47a)](_0x900c34,_0x300750,_0x75a93,_0x4ed7b4,!![]),this[_0x11551f(0x47a)](_0x24ce4d,_0x300750,_0x75a93,_0x4ed7b4,![],_0x11551f(0x5c0)),this[_0x11551f(0x47c)](_0x300750,_0x75a93,_0x4ed7b4),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x3f3)]=function(){const _0x16aede=_0x1d2fe5;return VisuMZ[_0x16aede(0x39f)]['Settings'][_0x16aede(0x2f2)][_0x16aede(0x5d6)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x579)]=function(){const _0x33c529=_0x1d2fe5,_0x20c953=_0x33c529(0x27c);if(this[_0x33c529(0x1d5)][_0x20c953])return this[_0x33c529(0x1d5)][_0x20c953];let _0x1c725f='',_0x14be70=0x0;const _0x4bac18=0x8;for(const _0x32b0a4 of this['_itemData'][_0x33c529(0x574)]){const _0x3cb906=$dataStates[_0x32b0a4];if(_0x3cb906&&_0x3cb906['iconIndex']>0x0){_0x1c725f+=_0x33c529(0x54d)[_0x33c529(0x44f)](_0x3cb906['iconIndex']),_0x14be70++;if(_0x14be70>=_0x4bac18)return _0x1c725f;}}for(let _0x1a60a9=0x0;_0x1a60a9<this[_0x33c529(0x2c5)][_0x33c529(0x411)][_0x33c529(0x2d3)];_0x1a60a9++){const _0x4583f6=this[_0x33c529(0x2c5)][_0x33c529(0x411)][_0x1a60a9],_0x4713de=Game_BattlerBase[_0x33c529(0x3dc)]['buffIconIndex'](_0x4583f6,_0x1a60a9);if(_0x4713de>0x0){_0x1c725f+=_0x33c529(0x54d)[_0x33c529(0x44f)](_0x4713de),_0x14be70++;if(_0x14be70>=_0x4bac18)return _0x1c725f;}}return _0x1c725f;},Window_ShopStatus['prototype'][_0x1d2fe5(0x527)]=function(_0x42b798,_0x164608,_0x46e30d){const _0x402a4d=_0x1d2fe5,_0x7c48cf='REMOVED\x20EFFECTS';if(!this[_0x402a4d(0x2c5)][_0x402a4d(0x20c)]&&!this['_customItemInfo'][_0x7c48cf])return![];const _0x255e44=this[_0x402a4d(0x245)]();this[_0x402a4d(0x47a)](_0x255e44,_0x42b798,_0x164608,_0x46e30d,!![]);const _0x469df4=this['getItemEffectsRemovedStatesBuffsText']();return this[_0x402a4d(0x47a)](_0x469df4,_0x42b798,_0x164608,_0x46e30d,![],'right'),this[_0x402a4d(0x47c)](_0x42b798,_0x164608,_0x46e30d),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x245)]=function(){const _0x4e5adb=_0x1d2fe5;return VisuMZ[_0x4e5adb(0x39f)]['Settings']['StatusWindow'][_0x4e5adb(0x543)];},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x329)]=function(){const _0x1c97fb=_0x1d2fe5,_0xa64b52=_0x1c97fb(0x2a5);if(this[_0x1c97fb(0x1d5)][_0xa64b52])return this[_0x1c97fb(0x1d5)][_0xa64b52];let _0x62965f='',_0x2f139f=0x0;const _0x531fad=VisuMZ['ItemsEquipsCore'][_0x1c97fb(0x478)][_0x1c97fb(0x2f2)]['MaxIcons'];for(const _0x1741c4 of this[_0x1c97fb(0x2c5)][_0x1c97fb(0x308)]){const _0x51559c=$dataStates[_0x1741c4];if(_0x51559c&&_0x51559c['iconIndex']>0x0){_0x62965f+='\x5cI[%1]'[_0x1c97fb(0x44f)](_0x51559c[_0x1c97fb(0x38b)]),_0x2f139f++;if(_0x2f139f>=_0x531fad)return _0x62965f;}}for(let _0x1ded09=0x0;_0x1ded09<this[_0x1c97fb(0x2c5)][_0x1c97fb(0x253)]['length'];_0x1ded09++){const _0xc16c21=this['_itemData'][_0x1c97fb(0x253)][_0x1ded09],_0x2d48c4=Game_BattlerBase['prototype'][_0x1c97fb(0x5d8)](0x1,_0xc16c21);if(_0x2d48c4>0x0){_0x62965f+='\x5cI[%1]'[_0x1c97fb(0x44f)](_0x2d48c4),_0x2f139f++;if(_0x2f139f>=_0x531fad)return _0x62965f;}}for(let _0x378029=0x0;_0x378029<this['_itemData']['removeDebuff']['length'];_0x378029++){const _0x2bcc29=this[_0x1c97fb(0x2c5)]['removeDebuff'][_0x378029],_0x472422=Game_BattlerBase[_0x1c97fb(0x3dc)][_0x1c97fb(0x5d8)](-0x1,_0x2bcc29);if(_0x472422>0x0){_0x62965f+=_0x1c97fb(0x54d)[_0x1c97fb(0x44f)](_0x472422),_0x2f139f++;if(_0x2f139f>=_0x531fad)return _0x62965f;}}return _0x62965f;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x217)]=function(_0x3e4840,_0x162738,_0x20dc41){const _0x162940=_0x1d2fe5;if(this[_0x162940(0x38c)][_0x162940(0x3f8)][_0x162940(0x26a)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x1ec764=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x34c2b7 of _0x1ec764){if(_0x34c2b7[_0x162940(0x26a)](/(.*):[ ](.*)/i)){const _0x62d096=String(RegExp['$1'])[_0x162940(0x5a1)](),_0x24b90e=String(RegExp['$2'])['trim']();this[_0x162940(0x4b4)](_0x62d096,_0x24b90e,_0x3e4840,_0x162738,_0x20dc41),_0x162738+=this[_0x162940(0x408)]();}}}return this[_0x162940(0x30c)](),_0x162738;},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x4b4)]=function(_0x3689bf,_0xf77f4,_0x10dda3,_0x177a9f,_0x51d8b2){const _0x2d346e=_0x1d2fe5;this[_0x2d346e(0x47a)](_0x3689bf,_0x10dda3,_0x177a9f,_0x51d8b2,!![]),this[_0x2d346e(0x47a)](_0xf77f4,_0x10dda3,_0x177a9f,_0x51d8b2,![],_0x2d346e(0x5c0)),this['drawItemDarkRect'](_0x10dda3,_0x177a9f,_0x51d8b2),this['resetFontSettings']();},Window_ShopStatus['prototype'][_0x1d2fe5(0x391)]=function(){const _0x5b962f=_0x1d2fe5;if(!this[_0x5b962f(0x38c)])return;const _0x2d6120=this[_0x5b962f(0x38c)][_0x5b962f(0x3f8)],_0xa374d0=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x329a76=_0x2d6120['match'](_0xa374d0);if(_0x329a76)for(const _0x200ba5 of _0x329a76){_0x200ba5[_0x5b962f(0x26a)](_0xa374d0);const _0x417359=String(RegExp['$1'])['trim']()||'';if(_0x417359==='')continue;const _0x66913d=ImageManager[_0x5b962f(0x4ba)](_0x417359);_0x66913d['addLoadListener'](this['drawCustomShopGraphicLoad'][_0x5b962f(0x2ec)](this,_0x66913d,this['_item']));}},Window_ShopStatus[_0x1d2fe5(0x3dc)][_0x1d2fe5(0x458)]=function(_0x5d4394,_0x190bde){const _0x27d78a=_0x1d2fe5;if(this[_0x27d78a(0x38c)]!==_0x190bde)return;if(!_0x5d4394)return;if(_0x5d4394['width']<=0x0||_0x5d4394[_0x27d78a(0x548)]<=0x0)return;const _0x3ba6e4=_0x190bde['note'];let _0x227871='background';_0x3ba6e4[_0x27d78a(0x26a)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x227871=_0x27d78a(0x5ad));const _0x3bd558=_0x227871===_0x27d78a(0x581)?this[_0x27d78a(0x558)]:this['contents'];let _0x1b6926=this[_0x27d78a(0x587)],_0x2387ee=this['innerHeight'];_0x3ba6e4[_0x27d78a(0x26a)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x1b6926=Number(RegExp['$1']));_0x3ba6e4[_0x27d78a(0x26a)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x2387ee=Number(RegExp['$1']));_0x3ba6e4['match'](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x1b6926=Number(RegExp['$1']),_0x2387ee=Number(RegExp['$2']));const _0x5c3c39=Math[_0x27d78a(0x4a1)](0x1,_0x1b6926/_0x5d4394['width'],_0x2387ee/_0x5d4394[_0x27d78a(0x548)]);let _0x408077=0x0,_0x1f045b=0x0,_0x524e8c=Math[_0x27d78a(0x331)](_0x5d4394[_0x27d78a(0x20e)]*_0x5c3c39),_0x48078b=Math[_0x27d78a(0x331)](_0x5d4394[_0x27d78a(0x548)]*_0x5c3c39),_0x3822d8='center';_0x3ba6e4['match'](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x3822d8=String(RegExp['$1'])[_0x27d78a(0x4d2)]()[_0x27d78a(0x5a1)]());if(_0x3822d8===_0x27d78a(0x393))_0x408077=0x0;else _0x3822d8===_0x27d78a(0x49e)?_0x408077=Math[_0x27d78a(0x4a8)]((this['innerWidth']-_0x524e8c)/0x2):_0x408077=this[_0x27d78a(0x587)]-_0x524e8c;let _0x2dc532='middle';_0x3ba6e4[_0x27d78a(0x26a)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x2dc532=String(RegExp['$1'])[_0x27d78a(0x4d2)]()[_0x27d78a(0x5a1)]());if(_0x2dc532===_0x27d78a(0x381))_0x1f045b=0x0;else _0x2dc532===_0x27d78a(0x277)?_0x1f045b=Math[_0x27d78a(0x4a8)]((this['innerHeight']-_0x48078b)/0x2):_0x1f045b=this[_0x27d78a(0x52e)]-_0x48078b;_0x3ba6e4['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x408077+=Number(RegExp['$1']));_0x3ba6e4['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x1f045b+=Number(RegExp['$1']));_0x3ba6e4['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x408077+=Number(RegExp['$1']),_0x1f045b+=Number(RegExp['$2']));let _0x59a19c=0xff;if(_0x3ba6e4[_0x27d78a(0x26a)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x59a19c=Number(RegExp['$1']);else _0x3ba6e4[_0x27d78a(0x26a)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x59a19c=Math['round'](Number(RegExp['$1'])*0.01*0xff)[_0x27d78a(0x36a)](0x0,0xff));_0x3bd558[_0x27d78a(0x251)]=_0x59a19c,_0x3bd558[_0x27d78a(0x297)](_0x5d4394,0x0,0x0,_0x5d4394[_0x27d78a(0x20e)],_0x5d4394[_0x27d78a(0x548)],_0x408077,_0x1f045b,_0x524e8c,_0x48078b),_0x3bd558[_0x27d78a(0x251)]=0xff;},VisuMZ[_0x1d2fe5(0x39f)]['deepCopy']=function(_0x4c1d02){const _0x299aca=_0x1d2fe5;if(_0x4c1d02===null||typeof _0x4c1d02!==_0x299aca(0x586))return _0x4c1d02;const _0x490b62=Array['isArray'](_0x4c1d02)?[]:Object['create'](Object[_0x299aca(0x454)](_0x4c1d02));for(const _0x4eb40e in _0x4c1d02){Object[_0x299aca(0x3dc)][_0x299aca(0x3cf)][_0x299aca(0x4e5)](_0x4c1d02,_0x4eb40e)&&(_0x490b62[_0x4eb40e]=typeof _0x4c1d02[_0x4eb40e]==='object'&&_0x4c1d02[_0x4eb40e]!==null?VisuMZ[_0x299aca(0x39f)][_0x299aca(0x4d6)](_0x4c1d02[_0x4eb40e]):_0x4c1d02[_0x4eb40e]);}return _0x490b62;};