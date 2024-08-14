//=============================================================================
// VisuStella MZ - Elements & Status Menu Core
// VisuMZ_1_ElementStatusCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ElementStatusCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ElementStatusCore = VisuMZ.ElementStatusCore || {};
VisuMZ.ElementStatusCore.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.24] [ElementStatusCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Elements_and_Status_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Elements & Status Menu Core plugin gives you more control over in-game
 * elemental rate calculations, providing Trait Sets to streamline assigning
 * elements to actors and enemies, and updating the Status Menu to display all
 * that information properly.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Element Rate control from target side and user side.
 * * Elemental Absorption and Elemental Reflection added.
 * * Assign items and skills to have multiple elements.
 * * Elemental rates can be adjusted from additive and multiplicative notetags.
 * * Forcing Elemental Rates and nullifying Elemental properties.
 * * Trait Sets added to mass assign traits through the usage of notetags.
 * * Trait Sets used to assign Elements, SubElements, Genders, Races, Natures,
 *   Alignments, Blessings, Curses, Zodiacs, and Variants.
 * * Randomized Trait Sets with weights to make enemies more dynamic.
 * * The ability to change traits midway through the game by Plugin Commands.
 * * Updated Status Menu Layout to display all this new information.
 * * Control over the information category tabs in the Status Menu.
 * * Change up the actor's Biography midway through the game by Plugin Command.
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
 * Element Damage Calculation
 *
 * - Elemental damage was calculated in one very specific way in RPG Maker MZ:
 * getting the target's elemental resistance found across various database
 * objects and applying the damage to that rate. This plugin extends that by
 * giving more ways to extend the target's elemental damage rate as add in a
 * facet which introduces the attacker's elemental bonus damage, too.
 *
 * ---
 *
 * Multi-Elemental Calculation
 *
 * - By default in RPG Maker MZ, if there are multiple elements assigned to an
 * action, then the element with the highest rate is taken. This plugin will
 * give you, the game dev, the decision on how this is handled: the default
 * maximum rate, a minimum rate, a multiplicative product, an additive sum, or
 * an average of all the elemental rates calculated.
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
 * === Element-Related Notetags ===
 *
 * The following are element-related notetags.
 *
 * ---
 *
 * <Multi-Element: x>
 * <Multi-Element: x,x,x>
 *
 * <Multi-Element: name>
 * <Multi-Element: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - Gives this action an additional element (alongside the Damage element)
 *   when calculating damage.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Multi-Element Rule: Maximum>
 * <Multi-Element Rule: Minimum>
 * <Multi-Element Rule: Multiply>
 * <Multi-Element Rule: Additive>
 * <Multi-Element Rule: Average>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the multi-element ruling for this action to either 'Maximum',
 *   'Minimum', 'Multiply', 'Additive', or 'Average'.
 * - If this notetag is not used, refer to the default ruling set by the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Force Action Element: Null>
 *
 * <Force Action Element: x>
 * <Force Action Element: x,x,x>
 *
 * <Force Action Element: name>
 * <Force Action Element: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces any actions performed by this unit to be the specific element(s).
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - If multiples of this notetag are found across various Database objects,
 *   priority will go in the order of states, actor, enemy, class, equips.
 *
 * ---
 *
 * <Force Received Element id Rate: x%>
 * <Force Received Element id Rate: x.x>
 *
 * <Force Received Element name Rate: x%>
 * <Force Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at x multiplier.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Received Element id Plus: +x%>
 * <Received Element id Plus: +x.x>
 *
 * <Received Element name Plus: +x%>
 * <Received Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Received Element id Rate: x%>
 * <Received Element id Rate: x.x>
 *
 * <Received Element name Rate: x%>
 * <Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage multiplicatively after applying plus
 *   and before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Received Element id Flat: +x%>
 * <Received Element id Flat: +x.x>
 *
 * <Received Element name Flat: +x%>
 * <Received Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Plus: +x%>
 * <Dealt Element id Plus: +x.x>
 *
 * <Dealt Element name Plus: +x%>
 * <Dealt Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Rate: x%>
 * <Dealt Element id Rate: x.x>
 *
 * <Dealt Element name Rate: x%>
 * <Dealt Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage multiplicatively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Dealt Element id Flat: +x%>
 * <Dealt Element id Flat: +x.x>
 *
 * <Dealt Element name Flat: +x%>
 * <Dealt Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Element Absorb: x>
 * <Element Absorb: x,x,x>
 *
 * <Element Absorb: name>
 * <Element Absorb: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to absorb damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to absorb more elements.
 * - Absorption is calculated after all other element rates have been made.
 *
 * ---
 *
 * <Element Reflect: x>
 * <Element Reflect: x,x,x>
 *
 * <Element Reflect: name>
 * <Element Reflect: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to reflect damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to reflect more elements.
 * - Reflection occurs before any damage is calculated and dealt.
 * - Elemental Reflection will take priority over Magic Reflection.
 *
 * ---
 *
 * <Bypass Element Reflect>
 *
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item unable to be reflected by Element Reflect effect.
 *
 * ---
 * 
 * <Element Pierce: x>
 * <Element Pierce: x,x,x>
 * 
 * <Element Pierce: name>
 * <Element Pierce: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to attack with the element and bypass any kinds
 *   of damage immunities, reflections, and absorptions.
 *   - Actions can still miss or be countered, however.
 * - If an action has multiple elements, as long as one element has pierce, the
 *   action will go through.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to reflect more elements.
 * 
 * ---
 *
 * <Element Pierce>
 *
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item bypass any kinds of damage immunities, reflections,
 *   and absorptions.
 *   - Action can still miss or be countered, however.
 *
 * ---
 *
 * === JavaScript Notetags: Element-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine dynamic element-related effects.
 *
 * ---
 *
 * <JS Force Received Element id Rate: code>
 * <JS Force Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at a code-determined rate.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Plus: code>
 * <JS Received Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Rate: code>
 * <JS Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Flat: code>
 * <JS Received Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Plus: code>
 * <JS Dealt Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Rate: code>
 * <JS Dealt Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Flat: code>
 * <JS Dealt Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * === Trait Set Notetags ===
 *
 * Trait Sets are used to apply various properties to actor and enemy units as
 * a whole depending on what the trait set is. Use the following notetags to
 * determine how to properly assign the desired Trait Set.
 *
 * WARNING: Trait Sets only work if they are enabled in the Plugin Parameters:
 * ElementStatusCore => General Trait Set Settings => Enable Trait Sets?
 *
 * ---
 *
 * <Element: name>
 * <SubElement: name>
 * <Gender: name>
 * <Race: name>
 * <Nature: name>
 * <Alignment: name>
 * <Blessing: name>
 * <Curse: name>
 * <Zodiac: name>
 * <Variant: name>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the specific Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - If any of these notetags are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Element: Fire>
 * <SubElement: Thunder>
 * <Gender: Male>
 * <Nature: Jolly>
 * <Alignment: Chaotic Good>
 * <Zodiac: Aries>
 *
 * ---
 *
 * <Trait Sets>
 *  Element:    name
 *  SubElement: name
 *  Gender:     name
 *  Race:       name
 *  Nature:     name
 *  Alignment:  name
 *  Blessing:   name
 *  Curse:      name
 *  Zodiac:     name
 *  Variant:    name
 * </Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - You may remove the Trait Set types (ie. Blessing and Curse) that you don't
 *   want to assign anything to from the list.
 * - If any of these sets are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Example:
 *
 * <Trait Sets>
 *  Element:    Fire
 *  SubElement: Thunder
 *  Gender:     Male
 *  Nature:     Jolly
 *  Alignment:  Chaotic Good
 *  Zodiac:     Aries
 * </Trait Sets>
 *
 * ---
 *
 * <Random type>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Random type>
 *
 * - Used for: Actor, Enemy Notetags
 * - Assigns a random Trait Set for this Trait Set 'type'.
 * - Replace 'type' with 'Element', 'SubElement', 'Gender', 'Race', 'Nature',
 *   'Alignment', 'Blessing', 'Curse', 'Zodiac', or 'Variant' depending on
 *   which you're trying to randomize.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - This would bypass the innate settings determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Random Gender>
 *  Male: 75
 *  Female: 25
 * </Random Gender>
 * 
 * <Random Variant>
 *  Mighty: 10
 *  Major: 20
 *  Greater: 60
 *  Normal: 200
 *  Lesser: 10
 *  Minor
 *  Puny
 * </Random Variant>
 *
 * ---
 *
 * <No Random Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Prevents random Trait Sets from being assigned to this actor/enemy unit.
 *
 * ---
 *
 * <Trait Set Name Format>
 *  text
 * </Trait Set Name Format>
 *
 * - Used for: Enemy Notetags
 * - Enemy names can be affected by the Trait Sets they have. Replace 'text'
 *   with the format you wish to see them have.
 * - Insert [Name] into 'text' to determine where the enemy's name goes.
 * - Insert [Letter] into 'text' to determine where the enemy's letter goes.
 * - Insert [Element] into 'text' to determine where the format text goes.
 * - Insert [SubElement] into 'text' to determine where the format text goes.
 * - Insert [Gender] into 'text' to determine where the format text goes.
 * - Insert [Race] into 'text' to determine where the format text goes.
 * - Insert [Nature] into 'text' to determine where the format text goes.
 * - Insert [Alignment] into 'text' to determine where the format text goes.
 * - Insert [Blessing] into 'text' to determine where the format text goes.
 * - Insert [Curse] into 'text' to determine where the format text goes.
 * - Insert [Zodiac] into 'text' to determine where the format text goes.
 * - Insert [Variant] into 'text' to determine where the format text goes.
 * 
 * Example:
 *
 * <Trait Set Name Format>
 *  [Alignment] [Nature] [Element] [Name][Gender] [Letter]
 * </Trait Set Name Format>
 *
 * ---
 *
 * <traitname Battler Name: filename>
 *
 * <traitname Battler Names>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Battler Names>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'filename' with the battler graphic to associate with that
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *   Trait Set.
 *
 * Examples:
 *
 * <Male Battler Name: Spider1>
 * <Female Battler Name: Spider2>
 *
 * <Male Battler Names>
 *  Rogue: 25
 *  Fighter: 10
 *  Warrior
 * </Male Battler Names>
 *
 * ---
 *
 * <traitname Battler Hue: x>
 *
 * <traitname Battler Hues>
 *  x: weight
 *  x: weight
 *  x: weight
 * </traitname Battler Hues>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to use a different hue.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'x' with a number from 0 to 360 depicting the hue to become.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *
 * Examples:
 *
 * <Male Battler Hue: 160>
 * <Female Battler Hue: 275>
 *
 * <Female Battler Hues>
 *  275: 10
 *  325: 5
 *  345
 * </Female Battler Hues>
 *
 * ---
 * 
 * <Equip Trait Requirement: name>
 * <Equip Trait Requirement: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Makes this piece of equipment equippable by only actors with those traits.
 * - If there are multiple traits required, all of them have to be met.
 * - If multiple trait types share the same trait name, the listed name will
 *   count for all of them.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Changing trait sets mid-game will remove unmatched traits.
 * - Usage Example: <Equip Trait Requirement: Female> makes the item only
 *   equippable by female actors as long as they are tagged as female.
 * 
 * ---
 * 
 * <Damage VS name Trait: x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will perform 'x%' damage versus any
 *   targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all damage types will be multiplied by 'x%' versus targets with 'name'
 *   trait sets (any of them).
 * - This notetag does not affect healing.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number representing a percentage value to augment
 *   damage by.
 * - Use multiple notetags to affect multiple trait types. If multiple effects
 *   manage to stack, they will stack multiplicatively.
 * 
 * ---
 * 
 * <Healing VS name Trait: x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will perform 'x%' heals versus any
 *   targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all heal types will be multiplied by 'x%' versus targets with 'name'
 *   trait sets (any of them).
 * - This notetag does not affect damage.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number representing a percentage value to augment
 *   heals by.
 * - Use multiple notetags to affect multiple trait types. If multiple effects
 *   manage to stack, they will stack multiplicatively.
 * 
 * ---
 * 
 * <Accuracy VS name Trait: x%>
 * <Accuracy VS name Trait: +x%>
 * <Accuracy VS name Trait: -x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
 *   accuracy against any targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all actions will have 'x%', '+x%', or '-x%' accuracy against any targets
 *   with 'name' trait sets (any of them).
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' respectively for percentile or additive/subtractive values.
 *   - 'x%' means an action with an accuracy rate of 20% will be (20% * x%).
 *   - '+x%' means an action with an accuracy rate of 20% will be (20% + x%).
 *   - '-x%' means an action with an accuracy rate of 20% will be (20% - x%).
 * - Multiple 'x%' notetags will stack multiplicatively.
 * - Multiple '+x' and '-x' notetags will stack additively.
 * 
 * ---
 * 
 * <Critical VS name Trait: x%>
 * <Critical VS name Trait: +x%>
 * <Critical VS name Trait: -x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
 *   crtical rate against any targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all actions will have 'x%', '+x%', or '-x%' crtical rate against any
 *   targets with 'name' trait sets (any of them).
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' respectively for percentile or additive/subtractive values.
 *   - 'x%' means an action with a critical rate of 20% will be (20% * x%).
 *   - '+x%' means an action with a critical rate of 20% will be (20% + x%).
 *   - '-x%' means an action with a critical rate of 20% will be (20% - x%).
 * - Multiple 'x%' notetags will stack multiplicatively.
 * - Multiple '+x' and '-x' notetags will stack additively.
 * 
 * ---
 *
 * === Actor Biography Notetag ===
 *
 * The following notetag is used for the Status Menu if the updated Status Menu
 * Layout option has been enabled from the Plugin Parameters.
 *
 * ---
 *
 * <Biography>
 *  text
 *  text
 *  text
 * </Biography>
 *
 * - Used for: Actor Notetags
 * - Determines the actor's biography shown in the Status Menu.
 * - Replace 'text' with the text intended.
 * - Text Codes are allowed.
 * - The biography can be changed mid-game through Plugin Commands.
 * - If this notetag isn't used, then the actor's profile message is displayed
 *   as the biography.
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
 * Actor: Change Biography (Group)
 * Actor: Change Biography (Range)
 * Actor: Change Biography (JS)
 * - Changes the biography of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 * 
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Biography
 *   - Change the biography for target actor(s) to this.
 *   - Text codes allowed. 
 *   - %1 - Actor's name.
 *
 * ---
 *
 * Actor: Change Trait Sets (Group)
 * Actor: Change Trait Sets (Range)
 * Actor: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch actor(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Trait Sets (Group)
 * Enemy: Change Trait Sets (Range)
 * Enemy: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected enemy(ies).
 * - Each version has a different means of selecting Enemy Indexes.
 *
 *   Step 1: Target ID
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch target(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Trait Set-Related Script Calls ===
 * 
 * ---
 *
 * battler.hasTraitSet(typeName)
 * 
 * - Returns a 'true' or 'false' value if the battler has a specific trait set.
 * - This will check all 10 trait set categories (elements, subelements,
 *   gender, race, nature, alignment, blessing, curse, zodiac, variant) and if
 *   any of them match, this will return 'true'. If not, returns 'false'.
 * - 'battler' references a Game_Actor or Game_Enemy.
 * - Replace 'typeName' with a string representing the trait set key name
 *   (ie. 'male' or 'female' or 'goblin' or 'human').
 * 
 * Examples:
 * 
 *   $gameActors.actor(1).hasTraitSet('male')
 *   $gameParty.leader().hasTraitSet('female')
 *   $gameTroop.members()[0].hasTraitSet('goblin')
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Element Rulings
 * ============================================================================
 *
 * These Plugin Parameters control the rulings for Element-related mechanics.
 * These play an important part in determine what to do when multiple elements
 * are present, how to calculate the elemental rates, and 
 *
 * ---
 *
 * Rulings
 * 
 *   Multi-Element Ruling:
 *   - Ruling on how to calculate element rate when there are  multiple
 *     elements used for damage calculation.
 *     - Maximum (largest rate of all elements)
 *     - Minimum (smallest rate of all elements)
 *     - Multiplicative (product of all elements used)
 *     - Additive (sum of all elements used)
 *     - Average (of all the elements used)
 * 
 *   JS: Maximum Rate:
 *   - Determine how maximum element rate is calculated.
 * 
 *   JS: Minimum Rate:
 *   - Determine how minimum element rate is calculated.
 * 
 *   JS: Multiply Rate:
 *   - Determine how a multiplied element rate is calculated.
 * 
 *   JS: Additive Rate:
 *   - Determine how an additive element rate is calculated.
 * 
 *   JS: Average Rate:
 *   - Determine how an average element rate is calculated.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Received Rate:
 *   - Determine how the element rate for the receiving target is calculated.
 * 
 *   JS: Finalize Rate:
 *   - Determine how the finalized element rate before damage is calculated.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Settings
 * ============================================================================
 *
 * The Status Menu Settings determine how the Status Menu appears and the
 * various objects that exist within it. The option to update it to a more
 * updated menu also exists, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Status Menu Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the
 *     menu scene layout?
 *     - Upper Help, Top Category
 *     - Upper Help, Bottom Category
 *     - Lower Help, Top Category
 *     - Lower Help, Bottom Category
 * 
 *   Trait Set Font Size:
 *   - The font size used for Trait Set Descriptions.
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
 * Category Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Category Window.
 *
 * ---
 *
 * Displayed Parameters
 * 
 *   Column 1:
 *   Column 2:
 *   Column 3:
 *   - A list of the parameters that will be displayed in column 1.
 *   - Basic Parameters (ie. MaxHP, ATK, LUK)
 *   - X Parameters (ie. HIT, EVA, CRI)
 *   - S Parameters (ie. PDR, MDR, EXR)
 *
 * ---
 *
 * Elements
 * 
 *   Excluded Elements:
 *   - These element ID's are excluded from the Status Menu list.
 * 
 *   IDs: Column 1:
 *   IDs: Column 2:
 *   - The list of element ID's to show in column 1/2.
 *   - If neither column has ID's, list all elements.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Biography:
 *   - Vocabulary for 'Biography'.
 * 
 *   Damage: Absorb:
 *   - Vocabulary for 'Damage: Absorb'.
 * 
 *   Damage: Received:
 *   - Vocabulary for 'Damage: Received'.
 * 
 *   Damage: Dealt:
 *   - Vocabulary for 'Damage: Dealt'.
 * 
 *   Skill Types:
 *   - Vocabulary for 'Skill Types'.
 * 
 *   Weapon Types:
 *   - Vocabulary for 'Weapon Types'.
 * 
 *   Armor Types:
 *   - Vocabulary for 'Armor Types'.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Categories
 * ============================================================================
 *
 * These Plugin Parameters allow you, the game dev, to add new categories to
 * the Status Menu as you please, and change up how the information is found
 * and displayed within the Status Menu. This will only apply if the Updated
 * Status Menu Layout is enabled.
 *
 * ---
 *
 * Category
 * 
 *   Symbol:
 *   - Symbol used for this category.
 * 
 *   Icon:
 *   - Icon used for this category.
 *   - Use 0 for no icon.
 * 
 *   Text:
 *   - Text name used for this category.
 * 
 *   JS: Draw Data:
 *   - Code used to determine what appears in the data window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Trait Set Settings
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * These Plugin Parameters adjust how Trait Sets are handled on a general scale
 * within your game.
 *
 * ---
 *
 * General
 * 
 *   Enable Trait Sets?:
 *   - Enable Trait Sets? This must be enabled for Trait Sets to have any kind
 *     of effect on battlers.
 * 
 *   Enemy Name Format:
 *   - Enemy name format on how Trait Sets affect how enemy names appear.
 *   - Choose from the list or customize it.
 *     - [name] [letter]
 *     - [element] [name] [letter]
 *     - [element] [subelement] [name] [letter]
 *     - [name][gender] [letter]
 *     - [race] [name][gender] [letter]
 *     - [alignment] [name][gender] [letter]
 *     - [blessing] [name][gender] [letter]
 *     - [curse] [name][gender] [letter]
 *     - [name][gender]([zodiac]) [letter]
 *     - [variant] [name][gender] [letter]
 *     - [variant] [nature] [name][gender] [letter]
 *     - [variant] [nature] [element] [name][gender] [letter]
 *     - [alignment] [variant] [nature] [element] [name][gender] [letter]
 *     - ...and more...
 *
 * ---
 *
 * Trait Columns
 *
 *   Column 1 Traits:
 *   Column 2 Traits:
 *   - List of the traits that appear in this column.
 *   - Used by default in the Properties category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Trait Set Types
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * There are 10 different types of Trait Set Types out there that you can
 * assign to actors and enemies and they all work the same way, just under
 * different categories.
 *
 * ---
 *
 * Element
 * SubElement
 * Gender
 * Race
 * Nature
 * Alignment
 * Blessing
 * Curse
 * Zodiac
 * Variant
 * 
 *   Name:
 *   - Name of this Trait Set. Also used as a reference key
 * 
 *   Display Text:
 *   - How the Trait Set is displayed in game when selected.
 *   - Text codes are allowed.
 * 
 *   Help Description:
 *   - Help description for this Trait Set if required.
 * 
 *   Format Text:
 *   - The text that's added onto an enemy's name if this Trait Set is used.
 * 
 *   Valid for Random?:
 *   - Is this Trait Set valid for random selection?
 * 
 *   Random Weight:
 *   - Default weight of this Trait Set if valid for random.
 * 
 *   Traits:
 * 
 *   Element Rates:
 *   - The elemental damage rates received for this Trait Set.
 *   - The modifiers are multiplicative.
 * 
 *   Basic Parameters:
 *   - The basic parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   X Parameters:
 *   - The X parameter rates altered by this Trait set.
 *   - The modifiers are additive.
 * 
 *   S Parameters:
 *   - The S parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   Passive States:
 *   - Passive states that are applied to this Trait Set.
 *   - Requires VisuMZ_1_SkillsStatesCore.
 *   - Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 *   Equipment:
 * 
 *   Weapon Types:
 *   - Additional weapon types usable by this Trait Set.
 * 
 *   Armor Types:
 *   - Additional armor types usable by this Trait Set.
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
 * Version 1.25: July 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.24: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a bug where if enemies transformed, their trait sets did not.
 *    Fix made by Irina.
 * 
 * Version 1.23: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Damage vs name Trait: x%>
 * *** <Healing vs name Trait: x%>
 * *** <Accuracy VS name Trait: x%>
 * *** <Critical VS name Trait: x%>
 * **** New notetags that enhance actions and trait objects to augment damage,
 *      healing, accuracy, and critical hit rates against targets with specific
 *      trait sets.
 * ** New script calls added by Arisu:
 * *** battler.hasTraitSet(typeName)
 * **** This will check all 10 trait set categories (elements, subelements,
 *      gender, race, nature, alignment, blessing, curse, zodiac, variant) and
 *      if any of them match, this will return 'true'. If not, returns 'false'.
 * 
 * Version 1.22: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented "max" element rate rulings to disable element
 *    absorption. Fix made by Arisu.
 * 
 * Version 1.21: March 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.20: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: January 20, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Notetags added by Olivia and sponsored by Anon:
 * ** Trait Object Notetag: <Element Pierce: x,x,x>
 * *** Gives the unit the ability to attack with the element and bypass any
 *     kinds of damage immunities, reflections, and absorptions. Actions can
 *     still miss or be countered, however.
 * ** Action Object Notetag: <Element Pierce>
 * *** Makes this skill/item bypass any kinds of damage immunities,
 *     reflections, and absorptions. Action can still miss or be countered.
 * 
 * Version 1.18: August 18, 2022
 * * Feature Update!
 * ** When enemy traits are changed, their visuals will reflect the change.
 *    Update made by Arisu.
 * 
 * Version 1.17: April 28, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain trait affinities ignoring zero values.
 *    Fix made by Olivia.
 * 
 * Version 1.16: October 14, 2021
 * * Compatibility Update!
 * ** Those using the updated layout of the Status Menu will now have the
 *    windows inherit the background type of the previous layout's Status
 *    Window Background Type from the Core Engine settings. Update by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** Fixed trait blessing calculations for X Parameters to make more sense and
 *    not snuff out if the base value is 0%.
 *    Fix made by Arisu.
 * 
 * Version 1.14: May 28, 2021
 * * Bug Fixes!
 * ** Added fail safe to prevent passive state melding from traits to crash the
 *    game when cache fails to collect data. Fix by Irina.
 * 
 * Version 1.13: May 21, 2021
 * * Documentation Update
 * ** Added for Trait "Passive States" section:
 * *** Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 * Version 1.12: April 30, 2021
 * * Bug Fixes!
 * ** When changing traits to a random value, load up any passive states and
 *    other effects that may have changed. Fix made by Arisu.
 * 
 * Version 1.11: February 26, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 29, 2021
 * * Bug Fixes!
 * ** <Multi-Element: x> notetags should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina:
 * *** <Equip Trait Requirement: name>
 * **** Makes this piece of equipment equippable by only actors with those
 *      traits. If there are multiple traits required, all of them have to be
 *      met. If multiple trait types share the same trait name, the listed name
 *      will count for all of them.
 * **** Usage Example: <Equip Trait Requirement: Female> makes the item only
 *      equippable by female actors as long as they are tagged as female.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL.
 * *** Status Menu Settings > Elements > IDs: Column 1 added
 * *** Status Menu Settings > Elements > IDs: Column 2 added
 * **** The list of element ID's to show in column 1/2.
 * **** If neither column has ID's, list all elements.
 * ***** If you do not update the drawn JS found in the Status Menu Categories
 *       Plugin Parameters, these new settings won't do anything.
 * * Feature Update!
 * ** Plugin Parameter updates made by Irina and sponsored by AndyL.
 * *** Status Menu Categories > Parameters updated
 * **** Default draw options now have a slightly thicker padding to make the
 *      parameter values easier to read.
 * *** Status Menu Categories > Elements updated
 * **** Default draw options now factor in multiple columns as applied by the
 *      new plugin parameters above.
 * *** Status Menu Categories > Access updated
 * **** Skill Types, Weapon Types, and Armor Types are now centered in the
 *      various data columns to allow for better reading.
 * ** Default settings have been added to the Plugin Parameters. If you want to
 *    acquire these settings for an already-existing project, do either of the
 *    following:
 * *** Delete the existing VisuMZ_1_ElementStatusCore.js in the Plugin Manager
 *     list and install the newest version.
 * *** Or create a new project, install VisuMZ_1_ElementStatusCore.js there,
 *     then copy over the "Status Menu Categories" parameters found in the
 *     Plugin Parameters to your current project.
 *
 * Version 1.09: January 8, 2021
 * * Bug Fixes!
 * ** Default "JS: Draw Data" code for Plugin Parameters > Status Menu
 *    Categories > Elements has been updated to account for Trait Type
 *    visibility for both Element and Sub-Element. This won't update normally
 *    as it is a part of the Plugin Parameters. You will need to either delete
 *    the reinstall the plugin into the Plugin Manager list or copy and paste
 *    the Status Menu Categories plugin parameters from a fresh install. Fix
 *    made by Irina.
 * 
 * Version 1.08: November 29, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters no longer increase
 *    exponentially with each other. Fix made by Arisu.
 * 
 * Version 1.07: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.06: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Yanfly.
 *
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Main Menu Portraits are now forced to pre-load prior to entering the
 *    Status Menu scene to ensure images will properly appear.
 *    Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** The "Column 1 and 2 Traits" plugin parameters for "General Trait Set"
 *    should now work. You will need to readjust them again. Fix by Arisu.
 * ** The "Elements" Status Menu Categories tab has its "JS: Draw Data"
 *    updated to display the percentages properly for Dealt Damage bonuses.
 *    This won't update normally as it's a part of the plugin parameters. You
 *    would need to do either a fresh install, copy from the sample project,
 *    or change the code bit yourself. To change to code bit, look for this:
 *      let dealtText = '%1%'.format(dealt);
 *    and change it to:
 *      let dealtText = '%1%'.format(Math.round(dealt * 100));
 *    Fix made by Irina.
 * 
 * Version 1.03: September 6, 2020
 * * Documentation Update!
 * ** <Dealt Element id Flat: +x%> notetag gets a more indepth explanation.
 * *** This does not add on flat bonus damages after calculating elemental
 *     rates. This merely adds onto it at the end after applying rates if
 *     the formula from above is unchanged.
 * * New Features!
 * ** New Plugin Parameters added in Status Menu Settings for disabling the
 *    back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters now show up properly
 *    in the Status Menu. Fix made by Yanfly.
 * ** Trait Set Sideview Battler Solo Weapon and Solo Motion notetags are now
 *    fixed to register properly with Battle Core. Fix made by Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states now work with Skills & States Core. Fix made by Yanfly.
 * ** Fixed S parameters not working. Fix made by Yanfly.
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
 * @command ActorChangeBiographyGroup
 * @text Actor: Change Biography (Group)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyRange
 * @text Actor: Change Biography (Range)
 * @desc Changes the biography of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyJS
 * @text Actor: Change Biography (JS)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsGroup
 * @text Actor: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsRange
 * @text Actor: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsJS
 * @text Actor: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Enemy
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsGroup
 * @text Enemy: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type number[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsRange
 * @text Enemy: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a range of enemy indexes to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type number
 * @desc Select which Enemy Index to start from.
 * @default 0
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type number
 * @desc Select which Index to end at.
 * @default 7
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsJS
 * @text Enemy: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Enemy Indexes to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
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
 * @param ElementStatusCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ElementRules:struct
 * @text Element Rulings
 * @type struct<ElementRules>
 * @desc The rulings for Element-related mechanics.
 * @default {"Rulings":"","MultiRule:str":"multiply","RuleMaxCalcJSa:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet max = -1000;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    max = Math.max(max, target.elementRate(elementId) * sign);\\n}\\nreturn max;\"","RuleMinCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet min = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    min = Math.min(min, target.elementRate(elementId) * sign);\\n}\\nreturn min;\"","RuleMultiplyCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 1;\\nlet sign = 1;\\nfor (const elementId of elements) {\\n    if (absorbed.includes(elementId)) sign = -1;\\n    rate *= target.elementRate(elementId);\\n}\\nreturn rate * sign;\"","RuleAdditiveCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    rate += target.elementRate(elementId) * sign;\\n}\\nreturn rate;\"","RuleAverageCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst rate = action.elementsRateSum(target, elements);\\nreturn rate / elements.length;\"","Formulas":"","ReceivedRateJS:func":"\"// Declare Constants\\nconst elementId = arguments[0];\\nconst target = this;\\nconst base = 1;\\nconst plus = target.getReceiveElementPlus(elementId);\\nconst rate = target.getReceiveElementRate(elementId);\\nconst flat = target.getReceiveElementFlat(elementId);\\n\\n// Determine Return Value\\nreturn Math.max(0, (base + plus) * rate + flat);\"","FinalizeRateJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst action = this;\\nconst elements = action.elements();\\nconst targetRate = action.calcTargetElementRate(target, elements);\\nconst sign = targetRate >= 0 ? 1 : -1;\\nconst base = Math.abs(targetRate);\\nconst plus = action.calcUserElementDamagePlus(target, elements);\\nconst rate = action.calcUserElementDamageRate(target, elements);\\nconst flat = action.calcUserElementDamageFlat(target, elements);\\n\\n// Determine Return Value\\nreturn sign * Math.max((base + plus) * rate + flat, 0);;\""}
 *
 * @param StatusMenu:struct
 * @text Status Menu Settings
 * @type struct<StatusMenu>
 * @desc The settings for the Status Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/top","TraitDescriptionFontSize:num":"18","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"icon","CmdTextAlign:str":"center","Parameters":"","Col1:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","Col2:arraystr":"[\"HIT\",\"EVA\",\"CRI\",\"CEV\",\"MEV\",\"MRF\",\"CNT\",\"HRG\",\"MRG\",\"TRG\"]","Col3:arraystr":"[\"TGR\",\"GRD\",\"REC\",\"PHA\",\"MCR\",\"TCR\",\"PDR\",\"MDR\",\"FDR\",\"EXR\"]","Elements":"","ExcludeElements:arraynum":"[]","ElementsCol1:arraynum":"[]","ElementsCol2:arraynum":"[]","Vocabulary":"","VocabBiography:str":"Biography","VocabDmgAbsorb:str":"Absorbs %1%","VocabDmgReceive:str":"Elemental Resistance","VocabDmgDealt:str":"Bonus Damage","VocabStype:str":"Skill Types","VocabWtype:str":"Weapon Types","VocabAtype:str":"Armor Types"}
 *
 * @param StatusMenuList:arraystruct
 * @text Status Menu Categories
 * @parent StatusMenu:struct
 * @type struct<StatusCategory>[]
 * @desc This is a list of categories that appear in the 
 * Status Menu Scene.
 * @default ["{\"Symbol:str\":\"general\",\"Icon:num\":\"84\",\"Text:str\":\"General\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst maxExp = '-------';\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = lineHeight * 6.5;\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst halfWidth = this.innerWidth / 2;\\\\nlet rect = new Rectangle(0, 0, halfWidth, this.innerHeight);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Smaller Data Area\\\\nlet sx = rect.x;\\\\nlet sy = Math.max(rect.y, rect.y + (rect.height - basicDataHeight));\\\\nlet sw = rect.width;\\\\nlet sh = rect.y + rect.height - sy;\\\\n\\\\n// Draw Actor Name\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight, 2);\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Draw Gauges\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, this.innerHeight - sy);\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nif ($dataSystem.optDisplayTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n}\\\\n\\\\n// Declare Second Half\\\\nrect = new Rectangle(halfWidth, 0, halfWidth, this.innerHeight);\\\\n\\\\n// Draw EXP\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, rect.y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.exp, rect.x, rect.y, rect.width, 'center');\\\\nconst expHeight = lineHeight * 5;\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 1, rect.width, lineHeight * 2);\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 3, rect.width, lineHeight * 2);\\\\nconst expTotal = TextManager.expTotal.format(TextManager.exp);\\\\nconst expNext = TextManager.expNext.format(TextManager.level);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(expTotal, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2);\\\\nthis.drawText(expNext, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2);\\\\nthis.resetTextColor();\\\\nconst expTotalValue = actor.currentExp();\\\\nconst expNextValue = actor.isMaxLevel() ? maxExp : actor.nextRequiredExp();\\\\nthis.drawText(expTotalValue, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2, 'right');\\\\nthis.drawText(expNextValue, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2, 'right');\\\\n\\\\n// Write Actor Biography\\\\ny = rect.y + expHeight;\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.statusMenuBiography, rect.x, y, rect.width, 'center');\\\\nthis.resetTextColor();\\\\ny += lineHeight;\\\\nconst bioText = actor.getBiography();\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\nthis.drawTextEx(bioText, rect.x + padding, y, rect.width - padding * 2);\\\"\"}","{\"Symbol:str\":\"parameters\",\"Icon:num\":\"87\",\"Text:str\":\"Parameters\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = this.basicDataHeight();\\\\nconst padding = this.itemPadding() * 2;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet paramWidth = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Declare Parameters\\\\nconst params1 = this.getParameterList(1);\\\\nconst params2 = this.getParameterList(2);\\\\nconst params3 = this.getParameterList(3);\\\\nconst maxLength = Math.max(params1.length, params2.length, params3.length);\\\\nconst nameWidth = rect.width - padding * 2 - this.textWidth('88888');\\\\nconst topY = Math.max((this.innerHeight - (maxLength * lineHeight)) / 2, 0);\\\\n\\\\n// Draw Parameters 1\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params1) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 2\\\\nrect.x += rect.width;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params2) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 3\\\\nrect.x += rect.width;\\\\nrect.width = this.innerWidth - rect.x;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params3) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"properties\",\"Icon:num\":\"83\",\"Text:str\":\"Properties\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst traitCol1 = Window_StatusData.traitCol1;\\\\nconst traitCol2 = Window_StatusData.traitCol2;\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst traitHeight = (this.innerHeight / Math.max(traitCol1.length, traitCol2.length)) - lineHeight;\\\\nconst width = this.innerWidth / 2;\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Trait Set 1\\\\nfor (const type of traitCol1) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(0, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(0, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(0, y, width, this.innerHeight - y);\\\\n}\\\\n\\\\n// Draw Trait Set 2\\\\ny = 0;\\\\nfor (const type of traitCol2) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, width + padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, width + padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(width, y, width, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"elements\",\"Icon:num\":\"64\",\"Text:str\":\"Elements\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst labelFmt = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2';\\\\nconst traitType1 = DataManager.traitSetType('Element');\\\\nconst traitSet1 = actor.traitSet('Element');\\\\nconst traitType2 = DataManager.traitSetType('SubElement');\\\\nconst traitSet2 = actor.traitSet('SubElement');\\\\nconst traitHeight = (this.innerHeight / Math.max(Window_StatusData.traitCol1.length, Window_StatusData.traitCol2.length)) - lineHeight;\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth / 2;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Element Trait Sets\\\\nif (traitType1.Visible || traitType2.Visible) {\\\\n    this.drawItemDarkRect(x, y, width, lineHeight, 2);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType1.Label, traitSet1.Display), padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType2.Label, traitSet2.Display), width + padding, y, width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(x, y, width, traitHeight);\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(traitSet1.Description, padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(traitSet2.Description, width + padding, y, width - padding * 2);\\\\n    }\\\\n    this.resetDescriptionFontSize();\\\\n    this.resetFontSettings();\\\\n    y += traitHeight;\\\\n}\\\\nconst topY = y;\\\\n\\\\n// Prepare Elemental Data\\\\nconst elementCol1 = this.getElementIDsCol1();\\\\nconst elementCol2 = this.getElementIDsCol2();\\\\nlet columnData;\\\\nif (elementCol2.length > 0) {\\\\n    columnData = ['Resist','Resist','Bonus','Bonus'];\\\\n} else {\\\\n    columnData = ['Resist','Bonus'];\\\\n}\\\\nconst dataRows = Math.max(elementCol1.length, elementCol2.length, 1);\\\\nconst dataCols = columnData.length;\\\\n\\\\n// Draw Elemental Data\\\\nthis.drawItemDarkRect(width * 0, y, width, lineHeight, 2);\\\\nthis.drawItemDarkRect(width * 1, y, width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuDmgReceive, width * 0, y, width, 'center');\\\\nthis.drawText(TextManager.statusMenuDmgDealt, width * 1, y, width, 'center');\\\\ny += lineHeight;\\\\nthis.setDescriptionFontSizeToTraitSet();\\\\nconst smallLineHeight = this.textSizeEx(' ').height;\\\\n\\\\n// Draw Elemental Table\\\\nfor (let i = 0; i < dataRows; i++) {\\\\n    for (let j = 0; j < dataCols; j++) {\\\\n        // Draw Dark Rect\\\\n        const colWidth = this.innerWidth / dataCols;\\\\n        this.drawItemDarkRect(colWidth * j, y, colWidth, smallLineHeight);\\\\n\\\\n        // Draw Element Name\\\\n        let elementID = elementCol1[i];\\\\n        if (dataCols === 4) {\\\\n            elementID = (j % 2 === 0) ? elementCol1[i] : elementCol2[i];\\\\n        }\\\\n        if (!elementID) continue;\\\\n        const name = $dataSystem.elements[elementID];\\\\n        this.drawTextEx(name, colWidth * (j + 1/3) + padding, y, colWidth*2/3);\\\\n        const type = columnData[j];\\\\n\\\\n        // Draw Resistance Data\\\\n        this.resetFontSettings();\\\\n        let drawText = '';\\\\n        if (type === 'Resist') {\\\\n            const rate = actor.elementRate(elementID);\\\\n            const flippedRate = (rate - 1) * -1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(flippedRate));\\\\n            drawText = '%1%'.format(Math.round(flippedRate * 100));\\\\n            if (actor.getAbsorbedElements().includes(elementID)) {\\\\n                this.changeTextColor(ColorManager.powerUpColor());\\\\n                drawText = TextManager.statusMenuDmgAbsorb.format(Math.round(rate * 100));\\\\n            } else if (rate > 1) {\\\\n                drawText = '%1'.format(drawText);\\\\n            } else if (rate <= 1) {\\\\n                drawText = '+%1'.format(drawText);\\\\n            }\\\\n\\\\n        // Draw Bonus Damage Data\\\\n        } else if (type === 'Bonus') {\\\\n            const dealtPlus = actor.getDealtElementPlus(elementID);\\\\n            const dealtRate = actor.getDealtElementRate(elementID);\\\\n            const dealtFlat = actor.getDealtElementFlat(elementID);\\\\n            const dealt = ((1 + dealtPlus) * dealtRate + dealtFlat) - 1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(dealt));\\\\n            drawText = '%1%'.format(Math.round(dealt * 100));\\\\n            if (dealt >= 0) drawText = '+%1'.format(drawText);\\\\n        }\\\\n\\\\n        // Draw Value\\\\n        this.contents.drawText(drawText, colWidth * j, y, (colWidth/3) - padding, smallLineHeight, 'right');\\\\n    }\\\\n    y += smallLineHeight;\\\\n}\\\\n\\\\n// Closing the Table\\\\nfor (let j = 0; j < dataCols; j++) {\\\\n    const colWidth = this.innerWidth / dataCols;\\\\n    this.drawItemDarkRect(colWidth * j, y, colWidth, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"access\",\"Icon:num\":\"137\",\"Text:str\":\"Access\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Draw Skill Types\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuStype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const stypeId of actor.skillTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (stypeId > 0) {\\\\n        const text = $dataSystem.skillTypes[stypeId];\\\\n        const padding = Math.round((rect.width - this.stypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Weapon Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuWtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const wtypeId of actor.weaponTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (wtypeId > 0) {\\\\n        const text = $dataSystem.weaponTypes[wtypeId];\\\\n        const padding = Math.round((rect.width - this.wtypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Armor Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nrect.width = this.innerWidth - rect.x;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuAtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const atypeId of actor.armorTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (atypeId > 0) {\\\\n        const text = $dataSystem.armorTypes[atypeId];\\\\n        const padding = Math.round((rect.width - this.atypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"cancel\",\"Icon:num\":\"82\",\"Text:str\":\"Finish\",\"DrawJS:func\":\"\\\"this.drawFirstCategoryData();\\\"\"}"]
 *
 * @param TraitBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param TraitSetSettings:struct
 * @text General Trait Set Settings
 * @type struct<TraitSetSettings>
 * @desc The settings for Trait Sets as a whole.
 * @default {"General":"","Enable:eval":"true","EnemyNameFmt:str":"[variant] [name][gender] [letter]","TraitColumns":"","TraitCol1:arraystr":"[\"Gender\",\"Nature\",\"Blessing\",\"Zodiac\"]","TraitCol2:arraystr":"[\"Race\",\"Alignment\",\"Curse\",\"Variant\"]"}
 *
 * @param Element:struct
 * @text Main Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Element","Label:str":"Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\i[160]Neutral\",\"Description:json\":\"\\\"No strengths or weaknesses.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param SubElement:struct
 * @text Sub Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Sub-Element","Label:str":"Sub-Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"-\",\"Display:str\":\"-\",\"Description:json\":\"\\\"\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Gender:struct
 * @text Gender Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Gender","Label:str":"Gender","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"Uncertain to this unit's gender.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Male\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[165]Male\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger physical attributes.\\\\\\\\nThis unit has weaker magical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♂\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.95\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Female\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[162]Female\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger magical attributes.\\\\\\\\nThis unit has weaker physical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♀\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Both\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[84]Both\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⚥\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Race:struct
 * @text Race Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Race","Label:str":"Race","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Uncategorized\",\"Display:str\":\"\\\\I[16]Uncategorized\",\"Description:json\":\"\\\"This race's attributes have not been determined.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Human\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[82]Human\\\",\\\"Description:json\\\":\\\"\\\\\\\"This race has neutral attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Human\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"High Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[101]High Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"High Elves have more MaxMP and less MaxHP.\\\\\\\\nHigh Elves can equip Canes and Magic Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"High Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wood Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[102]Wood Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wood Elves have more AGI and less DEF.\\\\\\\\nWood Elves can equip Bows and Crossbows.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wood Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"7\\\\\\\",\\\\\\\"8\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dark Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Dark Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dark Elves have more ATK and less MAT.\\\\\\\\nDark Elves can equip Daggers and Swords.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dark Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\",\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dwarf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[223]Dwarf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dwarves have more MaxHP and less AGI.\\\\\\\\nDwarves can equip Flails and Heavy Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dwarvin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gnome\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[140]Gnome\\\",\\\"Description:json\\\":\\\"\\\\\\\"Gnomes have more AGI and less DEF.\\\\\\\\nGnomes can equip Daggers and Light Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gnomish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Halfling\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[142]Halfling\\\",\\\"Description:json\\\":\\\"\\\\\\\"Halflings have more LUK and less MaxMP.\\\\\\\\nHalflings can equip Sword and Small Shields.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hafling\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wolfkin\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[105]Wolfkin\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wolfkin have more ATK and less MAT.\\\\\\\\nWolfkin can equip Claws and Gloves.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wolfkin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"10\\\\\\\",\\\\\\\"11\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Felyne\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[100]Felyne\\\",\\\"Description:json\\\":\\\"\\\\\\\"Felyne have more MAT and less ATK.\\\\\\\\nFelyne can equip Whips and Canes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Felyne\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\",\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lizardman\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[99]Lizardman\\\",\\\"Description:json\\\":\\\"\\\\\\\"Lizardmen have more DEF and less LUK.\\\\\\\\nLizardmen can equip Axes and Spears.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lizardman\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\",\\\\\\\"12\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Nature:struct
 * @text Nature Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Nature","Label:str":"Nature","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Chill\",\"Display:str\":\"\\\\I[84]Chill\",\"Description:json\":\"\\\"This unit has neutral parameters.\\\"\",\"FmtText:str\":\"Chill\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Hardy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[50]Hardy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hardy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lonely\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[51]Lonely\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lonely\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Adamant\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[52]Adamant\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Adamant\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naughty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[53]Naughty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naughty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Brave\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[54]Brave\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Brave\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bold\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[50]Bold\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bold\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Docile\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[51]Docile\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Docile\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impish\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[52]Impish\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lax\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[53]Lax\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lax\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Relaxed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[54]Relaxed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Relaxed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Modest\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[50]Modest\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Modest\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Mild\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[51]Mild\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mild\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bashful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[52]Bashful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bashful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Rash\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[53]Rash\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Rash\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quiet\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[54]Quiet\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quiet\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Calm\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[50]Calm\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Calm\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gentle\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[51]Gentle\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gentle\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Careful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[52]Careful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Careful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quirky\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[53]Quirky\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quirky\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sassy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[54]Sassy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Sassy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Timid\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[50]Timid\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Timid\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Hasty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[51]Hasty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hasty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Jolly\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[52]Jolly\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Jolly\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[53]Naive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Serious\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[54]Serious\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Serious\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Alignment:struct
 * @text Alignment Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Alignment","Label:str":"Alignment","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\I[160]Neutral\",\"Description:json\":\"\\\"This unit's alignment is completely neutral.\\\"\",\"FmtText:str\":\"Neutral\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Lawful Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Lawful Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Neutral Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Chaotic Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Lawful Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Chaotic Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Lawful Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Neutral Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Chaotic Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Blessing:struct
 * @text Blessing Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Blessing","Label:str":"Blessing","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Blessing\",\"Display:str\":\"\\\\I[160]No Blessing\",\"Description:json\":\"\\\"This unit has not received a blessing.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Dextrous\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Dextrous\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dextrous\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Elusive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Elusive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Elusive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impact\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Impact\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impactful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Healthy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Healthy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate HP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Healthy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Focused\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Focused\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate MP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Focused\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Energetic\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Energetic\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate TP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Energetic\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Curse:struct
 * @text Curse Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Curse","Label:str":"Curse","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Curse\",\"Display:str\":\"\\\\I[160]No Curse\",\"Description:json\":\"\\\"This unit has not been cursed.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Clumsy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Clumsy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Clumsy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dazed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Dazed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dazed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Fitful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Fitful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Fitful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Drained\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Drained\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit receives less healing.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Drained\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Inefficient\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Inefficient\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit uses more MP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Inefficient\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Unmotivated\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Unmotivated\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit gaines less TP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Unmotivated\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Zodiac:struct
 * @text Zodiac Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Zodiac","Label:str":"Zodiac","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"This unit's Zodiac is unknown.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Aries\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aries\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♈\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Taurus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Taurus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gemini\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Gemini\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♊\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Cancer\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Cancer\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Leo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Leo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♌\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Virgo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Virgo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♍\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Libra\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Libra\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♎\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Scorpio\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Scorpio\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♏\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sagittarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Sagittarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to LUK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♐\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Capricorn\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Capricorn\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♑\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Aquarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aquarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♒\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Pisces\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Pisces\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♓\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ophiuchus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Ophiuchus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit is the rare Ophiuchus zodiac.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⛎\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Variant:struct
 * @text Variant Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Variant","Label:str":"Variant","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Normal\",\"Display:str\":\"\\\\I[160]Normal\",\"Description:json\":\"\\\"This is your average unit.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"100\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Mighty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Mighty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mighty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.30\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.30\\\",\\\"GoldRate:num\\\":\\\"1.50\\\",\\\"DropRate:num\\\":\\\"2.00\\\"}\",\"{\\\"Name:str\\\":\\\"Major\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Major\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Major\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.20\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.20\\\",\\\"GoldRate:num\\\":\\\"1.25\\\",\\\"DropRate:num\\\":\\\"1.50\\\"}\",\"{\\\"Name:str\\\":\\\"Greater\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Greater\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Greater\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.10\\\",\\\"GoldRate:num\\\":\\\"1.15\\\",\\\"DropRate:num\\\":\\\"1.25\\\"}\",\"{\\\"Name:str\\\":\\\"Lesser\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Lesser\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lesser\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.90\\\",\\\"GoldRate:num\\\":\\\"0.95\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Minor\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Minor\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Minor\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.80\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.80\\\",\\\"GoldRate:num\\\":\\\"0.90\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Puny\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Puny\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Puny\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.70\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.70\\\",\\\"GoldRate:num\\\":\\\"0.85\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
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
 * Element Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementRules:
 *
 * @param Rulings
 *
 * @param MultiRule:str
 * @text Multi-Element Ruling
 * @parent Rulings
 * @type select
 * @option Maximum (largest rate of all elements)
 * @value max
 * @option Minimum (smallest rate of all elements)
 * @value min
 * @option Multiplicative (product of all elements used)
 * @value multiply
 * @option Additive (sum of all elements used)
 * @value additive
 * @option Average (of all the elements used)
 * @value average
 * @desc Ruling on how to calculate element rate when there are 
 * multiple elements used for damage calculation.
 * @default multiply
 *
 * @param RuleMaxCalcJSa:func
 * @text JS: Maximum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how maximum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet max = -1000;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    max = Math.max(max, target.elementRate(elementId) * sign);\n}\nreturn max;"
 *
 * @param RuleMinCalcJS:func
 * @text JS: Minimum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how minimum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet min = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    min = Math.min(min, target.elementRate(elementId) * sign);\n}\nreturn min;"
 *
 * @param RuleMultiplyCalcJS:func
 * @text JS: Multiply Rate
 * @parent Rulings
 * @type note
 * @desc Determine how a multiplied element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 1;\nlet sign = 1;\nfor (const elementId of elements) {\n    if (absorbed.includes(elementId)) sign = -1;\n    rate *= target.elementRate(elementId);\n}\nreturn rate * sign;"
 *
 * @param RuleAdditiveCalcJS:func
 * @text JS: Additive Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an additive element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    rate += target.elementRate(elementId) * sign;\n}\nreturn rate;"
 *
 * @param RuleAverageCalcJS:func
 * @text JS: Average Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an average element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst rate = action.elementsRateSum(target, elements);\nreturn rate / elements.length;"
 *
 * @param Formulas
 *
 * @param ReceivedRateJS:func
 * @text JS: Received Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the element rate for the receiving target is calculated.
 * @default "// Declare Constants\nconst elementId = arguments[0];\nconst target = this;\nconst base = 1;\nconst plus = target.getReceiveElementPlus(elementId);\nconst rate = target.getReceiveElementRate(elementId);\nconst flat = target.getReceiveElementFlat(elementId);\n\n// Determine Return Value\nreturn Math.max(0, (base + plus) * rate + flat);"
 *
 * @param FinalizeRateJS:func
 * @text JS: Finalize Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the finalized element rate before damage is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst action = this;\nconst elements = action.elements();\nconst targetRate = action.calcTargetElementRate(target, elements);\nconst sign = targetRate >= 0 ? 1 : -1;\nconst base = Math.abs(targetRate);\nconst plus = action.calcUserElementDamagePlus(target, elements);\nconst rate = action.calcUserElementDamageRate(target, elements);\nconst flat = action.calcUserElementDamageFlat(target, elements);\n\n// Determine Return Value\nreturn sign * Math.max((base + plus) * rate + flat, 0);;"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Status Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Top Category
 * @value upper/top
 * @option Upper Help, Bottom Category
 * @value upper/bottom
 * @option Lower Help, Top Category
 * @value lower/top
 * @option Lower Help, Bottom Category
 * @value lower/bottom
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/top
 *
 * @param TraitDescriptionFontSize:num
 * @text Trait Set Font Size
 * @parent General
 * @type number
 * @min 1
 * @desc The font size used for Trait Set Descriptions.
 * @default 18
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
 * @param Command
 * @text Category Window
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
 * @desc How do you wish to draw commands in the Category Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Category Window.
 * @default center
 *
 * @param Parameters
 * @text Displayed Parameters
 * 
 * @param Col1:arraystr
 * @text Column 1
 * @parent Parameters
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
 * @desc A list of the parameters that will be displayed in column 1.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param Col2:arraystr
 * @text Column 2
 * @parent Parameters
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
 * @desc A list of the parameters that will be displayed in column 2.
 * @default ["HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG"]
 *
 * @param Col3:arraystr
 * @text Column 3
 * @parent Parameters
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
 * @desc A list of the parameters that will be displayed in column 3.
 * @default ["TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"]
 *
 * @param Elements
 *
 * @param ExcludeElements:arraynum
 * @text Excluded Elements
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc These element ID's are excluded from the Status Menu list.
 * @default []
 *
 * @param ElementsCol1:arraynum
 * @text IDs: Column 1
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 1.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param ElementsCol2:arraynum
 * @text IDs: Column 2
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 2.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param Vocabulary
 *
 * @param VocabBiography:str
 * @text Biography
 * @parent Vocabulary
 * @desc Vocabulary for 'Biography'.
 * @default Biography
 *
 * @param VocabDmgAbsorb:str
 * @text Damage: Absorb
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Absorb'.
 * @default Absorbs %1%
 *
 * @param VocabDmgReceive:str
 * @text Damage: Received
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Received'.
 * @default Elemental Resistance
 *
 * @param VocabDmgDealt:str
 * @text Damage: Dealt
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Dealt'.
 * @default Bonus Damage
 *
 * @param VocabStype:str
 * @text Skill Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Skill Types'.
 * @default Skill Types
 *
 * @param VocabWtype:str
 * @text Weapon Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Weapon Types'.
 * @default Weapon Types
 *
 * @param VocabAtype:str
 * @text Armor Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Armor Types'.
 * @default Armor Types
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusCategory:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc Symbol used for this category.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc Text name used for this category.
 * @default Untitled
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @type note
 * @desc Code used to determine what appears in the data window.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * General Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetSettings:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Trait Sets?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Trait Sets? This must be enabled for Trait Sets to
 * have any kind of effect on battlers.
 * @default false
 *
 * @param EnemyNameFmt:str
 * @text Enemy Name Format
 * @parent General
 * @type combo
 * @option [name] [letter]
 * @option [element] [name] [letter]
 * @option [element] [subelement] [name] [letter]
 * @option [name][gender] [letter]
 * @option [race] [name][gender] [letter]
 * @option [alignment] [name][gender] [letter]
 * @option [blessing] [name][gender] [letter]
 * @option [curse] [name][gender] [letter]
 * @option [name][gender]([zodiac]) [letter]
 * @option [variant] [name][gender] [letter]
 * @option [variant] [nature] [name][gender] [letter]
 * @option [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [blessing] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [curse] [element] [name][gender] [letter]
 * @desc Enemy name format on how Trait Sets affect how enemy names
 * appear. Choose from the list or customize it.
 * @default [variant] [name][gender] [letter]
 *
 * @param TraitColumns
 * @text Trait Columns
 *
 * @param TraitCol1:arraystr
 * @text Column 1 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Gender","Nature","Blessing","Zodiac"]
 *
 * @param TraitCol2:arraystr
 * @text Column 2 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Race","Alignment","Curse","Variant"]
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Type Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetType:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set Type.
 * @default Untitled
 *
 * @param Label:str
 * @text Label
 * @desc How this Trait Set Type is labeled in the Status Menu.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Visible:eval
 * @text Visible
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Is this Trait Set Type visible in the Status Menu?
 * @default true
 *
 * @param RandomizeActor:eval
 * @text Randomize for Actors?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On actor creation, obtain a random trait from this list?
 * @default false
 *
 * @param RandomizeEnemy:eval
 * @text Randomize for Enemies?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On enemy creation, obtain a random trait from this list?
 * @default false
 *
 * @param Default:struct
 * @text Default Trait Set
 * @type struct<TraitSet>
 * @desc If no Trait Set is declared by notetags, 
 * use this Trait Set as a default.
 * @default {}
 *
 * @param List:arraystruct
 * @text Trait Set List
 * @type struct<TraitSet>[]
 * @desc A list of all the Trait Sets available to this 
 * Trait Set Type.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSet:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set. Also used as a reference key.
 * @default Untitled
 *
 * @param Display:str
 * @text Display Text
 * @desc How the Trait Set is displayed in game when selected.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Description:json
 * @text Help Description
 * @type note
 * @desc Help description for this Trait Set if required.
 * @default ""
 *
 * @param FmtText:str
 * @text Format Text
 * @desc The text that's added onto an enemy's name if this
 * Trait Set is used.
 * @default 
 *
 * @param RandomValid:eval
 * @text Valid for Random?
 * @type boolean
 * @on Valid
 * @off Ignore
 * @desc Is this Trait Set valid for random selection?
 * @default true
 *
 * @param RandomWeight:num
 * @text Random Weight
 * @type number
 * @desc Default weight of this Trait Set if valid for random.
 * @default 1
 *
 * @param Traits
 *
 * @param ElementRate:struct
 * @text Element Rates
 * @parent Traits
 * @type struct<ElementChanges>
 * @desc The elemental damage rates received for this Trait Set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param Params:struct
 * @text Basic Parameters
 * @parent Traits
 * @type struct<Params>
 * @desc The basic parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param XParams:struct
 * @text X Parameters
 * @parent Traits
 * @type struct<XParams>
 * @desc The X parameter rates altered by this Trait set.
 * The modifiers are additive.
 * @default {}
 *
 * @param SParams:struct
 * @text S Parameters
 * @parent Traits
 * @type struct<SParams>
 * @desc The S parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Traits
 * @type state[]
 * @desc Passive states that are applied to this Trait Set.
 * Requires VisuMZ_1_SkillsStatesCore.
 * @default []
 *
 * @param Equipment
 *
 * @param Wtypes:arraynum
 * @text Weapon Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional weapon types usable by this Trait Set.
 * @default []
 *
 * @param Atypes:arraynum
 * @text Armor Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional armor types usable by this Trait Set.
 * @default []
 *
 * @param EnemyRewards
 * @text Enemy Rewards
 *
 * @param EXPRate:num
 * @text EXP Rate
 * @parent EnemyRewards
 * @desc EXP rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param GoldRate:num
 * @text Gold Rate
 * @parent EnemyRewards
 * @desc Gold rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param DropRate:num
 * @text Drop Rate
 * @parent EnemyRewards
 * @desc Drop rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Element Changes
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementChanges:
 *
 * @param Element1:num
 * @text Element 1 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element2:num
 * @text Element 2 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element3:num
 * @text Element 3 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element4:num
 * @text Element 4 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element5:num
 * @text Element 5 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element6:num
 * @text Element 6 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element7:num
 * @text Element 7 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element8:num
 * @text Element 8 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element9:num
 * @text Element 9 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element10:num
 * @text Element 10 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element11:num
 * @text Element 11 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element12:num
 * @text Element 12 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element13:num
 * @text Element 13 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element14:num
 * @text Element 14 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element15:num
 * @text Element 15 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element16:num
 * @text Element 16 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element17:num
 * @text Element 17 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element18:num
 * @text Element 18 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element19:num
 * @text Element 19 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element20:num
 * @text Element 20 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element21:num
 * @text Element 21 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element22:num
 * @text Element 22 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element23:num
 * @text Element 23 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element24:num
 * @text Element 24 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element25:num
 * @text Element 25 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element26:num
 * @text Element 26 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element27:num
 * @text Element 27 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element28:num
 * @text Element 28 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element29:num
 * @text Element 29 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element30:num
 * @text Element 30 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element31:num
 * @text Element 31 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element32:num
 * @text Element 32 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element33:num
 * @text Element 33 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element34:num
 * @text Element 34 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element35:num
 * @text Element 35 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element36:num
 * @text Element 36 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element37:num
 * @text Element 37 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element38:num
 * @text Element 38 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element39:num
 * @text Element 39 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element40:num
 * @text Element 40 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element41:num
 * @text Element 41 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element42:num
 * @text Element 42 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element43:num
 * @text Element 43 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element44:num
 * @text Element 44 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element45:num
 * @text Element 45 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element46:num
 * @text Element 46 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element47:num
 * @text Element 47 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element48:num
 * @text Element 48 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element49:num
 * @text Element 49 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element50:num
 * @text Element 50 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element51:num
 * @text Element 51 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element52:num
 * @text Element 52 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element53:num
 * @text Element 53 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element54:num
 * @text Element 54 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element55:num
 * @text Element 55 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element56:num
 * @text Element 56 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element57:num
 * @text Element 57 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element58:num
 * @text Element 58 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element59:num
 * @text Element 59 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element60:num
 * @text Element 60 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element61:num
 * @text Element 61 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element62:num
 * @text Element 62 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element63:num
 * @text Element 63 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element64:num
 * @text Element 64 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element65:num
 * @text Element 65 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element66:num
 * @text Element 66 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element67:num
 * @text Element 67 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element68:num
 * @text Element 68 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element69:num
 * @text Element 69 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element70:num
 * @text Element 70 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element71:num
 * @text Element 71 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element72:num
 * @text Element 72 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element73:num
 * @text Element 73 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element74:num
 * @text Element 74 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element75:num
 * @text Element 75 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element76:num
 * @text Element 76 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element77:num
 * @text Element 77 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element78:num
 * @text Element 78 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element79:num
 * @text Element 79 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element80:num
 * @text Element 80 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element81:num
 * @text Element 81 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element82:num
 * @text Element 82 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element83:num
 * @text Element 83 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element84:num
 * @text Element 84 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element85:num
 * @text Element 85 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element86:num
 * @text Element 86 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element87:num
 * @text Element 87 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element88:num
 * @text Element 88 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element89:num
 * @text Element 89 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element90:num
 * @text Element 90 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element91:num
 * @text Element 91 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element92:num
 * @text Element 92 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element93:num
 * @text Element 93 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element94:num
 * @text Element 94 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element95:num
 * @text Element 95 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element96:num
 * @text Element 96 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element97:num
 * @text Element 97 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element98:num
 * @text Element 98 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element99:num
 * @text Element 99 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Basic Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~Params:
 *
 * @param Param0:num
 * @text MaxHP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param1:num
 * @text MaxMP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param2:num
 * @text ATK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param3:num
 * @text DEF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param4:num
 * @text MAT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param5:num
 * @text MDF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param6:num
 * @text AGI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param7:num
 * @text LUK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * X Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~XParams:
 *
 * @param XParam0:num
 * @text HIT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam1:num
 * @text EVA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam2:num
 * @text CRI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam3:num
 * @text CEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam4:num
 * @text MEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam5:num
 * @text MRF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam6:num
 * @text CNT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam7:num
 * @text HRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam8:num
 * @text MRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam9:num
 * @text TRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 */
/* ----------------------------------------------------------------------------
 * S Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~SParams:
 *
 * @param SParam0:num
 * @text TGR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam1:num
 * @text GRD Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam2:num
 * @text REC Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam3:num
 * @text PHA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam4:num
 * @text MCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam5:num
 * @text TCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam6:num
 * @text PDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam7:num
 * @text MDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam8:num
 * @text FDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam9:num
 * @text EXR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
//=============================================================================

const _0x4e22e6=_0x179c;function _0x4a61(){const _0x45809a=['Scene_Boot_onDatabaseLoaded','getForceReceivedElementRate','includes','resetFontSettings','MRG','traitSet','ActorChangeTraitSetsGroup','6618530BsURsX','center','RuleMaxCalcJSa','iconText','dropItemRateTraitSets','setBackgroundType','paramRateTraitSets','Game_BattlerBase_initMembers','nameElementStatusCore','item','DEFAULT','CRI','6239340nFqQxv','name','trim','Game_Actor_setup','applyRandomTraitSets','calcUserElementDamagePlus','getDealtElementPlus','reduce','statusMenuWtype','VisuMZ_0_CoreEngine','inBattle','Params','TGR','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isUseElementStatusCoreUpdatedLayout','split','EleForceJS','_specialBattler','isElementNull','setItemWindow','commandName','getDealtElementRate','RegExp','setup','getElementIdWithName','profile','traitHealMultipliersVs','processDrawIcon','itemTextAlign','paramValueByName','faceHeight','pageup','actorId','_battleCoreForcedElements','getTraitSet','StatusBgType','AnchorX','SvBattlerMass-%1-%2','push','test','Game_Action_executeDamage','isRecover','min','traitSetType','getDealtElementFlat','FDR','VocabDmgReceive','highest','process_VisuMZ_ElementStatusCore_Parameters','currentExp','669MaETvl','Curse','Untitled','isRightInputMode','Game_BattlerBase_sparamRate','\x5cI[%1]%2','createDataWindow','makeTraitSetFromNotetags','MAXMP','ReceivedRateJS','getElementIDsCol1','StatusMenuList','round','Description','stypeWidth','XParam%1','hasTraitSet','setTraitSet','initElementStatusCore','maxTp','<%1\x20SIDEVIEW\x20BATTLERS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20BATTLERS>','SvWeaponMass-%1-%2','MDR','drawActorLevel','maximum','traitCol2','expTotal','VisuMZ_1_BattleCore','helpAreaTop','drawTextEx','average','ElementStatusCore','onActorChange','setPlural','addCommand','makeSingularTraitSetFromNotetags','CEV','285maHolO','Step1','EVA','getReceiveElementFlat','Scene_Status_refreshActor','DEF','layoutSettings','floor','BackRectColor','_helpWindow','makeUniqueNames','makeMassTraitSetFromNotetags','level','Game_BattlerBase_elementRate','isEquipWtypeOk','createSpecialBattlers','transform','makeRandomSingularTraitSetFromNotetags','TraitSetSettings','EleRec','setDrawData','\x5cC[16]%1:\x20\x5cC[0]%2','exp','elementsRateSum','EleRecFlatFlt','VocabWtype','sparamRate','indexOf','Zodiac','elementRate','onDatabaseLoaded','ActorChangeTraitSetsRange','parse','bind','avg','+%1','nameFormat','WtypeOk','drawParamValue','Enable','drawActorGraphic','update','shift','RandomizeActor','status','Plus','right','updateSpecialBattlers','calcTargetElementRate','isBottomHelpMode','passiveStates','commandStyleCheck','EleRecRateJS','drawItemActorMenuImage','CNT','GRD','motionIdle','param','max','getBiography','getExcludedElementIDs','faceIndex','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)','Param%1','TraitDescriptionFontSize','Scene_Status_create','AllowCollapse','_battleCoreAddedElements','traitsSet','Game_BattlerBase_canEquip','StatusMenu','logTraitSets','keys','isCommandEnabled','auto','clamp','setWordWrap','changeTextColor','FmtText','updateCommandNameWindow','getReflectedElements','activate','Nature','getElementIDsColRaw','drawItemStyleIcon','JS\x20','TraitCol2','statusMenuAtype','Rate','mainAreaTop','_wtypeWidth','Scene_Status_onActorChange','product','textWidth','LayoutStyle','drawItem','process_VisuMZ_ElementStatusCore_Battler_RegExp','_drawData','BattlerNameSolo-%1-%2','EleRecFlatJS','wtypeId','gaugeLineHeight','onActorChangeElementStatusCore','SvBattlerSolo-%1-%2','isArray','getForcedActionElement','helpWindowRect','placeGauge','commandNameWindowDrawBackground','drawItemDarkRect','lowest','helpWindowRectElementStatusCore','EleDmgRateFlt','Per','canPierceElement','%10','createHelpWindow','playOkSound','ConvertParams','sparamRateTraitSets','map','textSizeEx','xparam','mainAreaBottom','TCR','registerCommand','Icon','battlerHue','Atypes','_traitSets','recoverAll','getRandomTraitSetFromString','VocabBiography','hue','updateElementStatusCoreWindowBg','powerUpColor','SubElement','nextRequiredExp','Label','2OiRTTL','EleDmgFlatFlt','contentsBack','isEquipAtypeOk','<%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>','resetTextColor','getPiercedElements','<%1\x20SIDEVIEW\x20IDLE\x20MOTION:\x20(.*)>','Game_Enemy_setPlural','remove','wtypeWidth','dropItemRate','EleDmgRatePer','ElementsCol%1','_addingPassiveStateTraitSets','initialize','EleForceFlt','statusMenuStype','maxItems','setLetter','Text','elementRateRuling','drawing','Name','fontSizeRatio','<%1\x20BATTLER\x20NAME:\x20(.*)>','EXPRate','Gender','Bonus','DropRate','HIT','drawElements','index','Game_Action_clear','blt','Flt','ActorChangeBiographyJS','Width','length','match','commandNameWindowCenter','toLowerCase','width','LUK','6756oSgQqS','additive','RandomValid','basicDataHeight','prototype','optDisplayTp','contents','VocabDmgDealt','Element','<%1RECEIVED\x20ELEMENT\x20%2\x20%3:[\x20]%4>','MEV','dataWindowRect','_elementIDs','windowPadding','ActorChangeBiographyGroup','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','%11','STRUCT','getParamValue','statusMenuBiography','MotionIdle','paintOpacity','_stypeWidth','calcWindowHeight','iconWidth','initMembers','getReceiveElementRate','Shadow','_biography','elements','18242488AaEYlH','EnemyChangeTraitSetsRange','566045zMhCiK','Default','getTraitSetObject','ElementRate','elementsMinRate','EleDmgRateJS','Game_Action_itemMrf','maxCols','Race','itemLineRect','description','createCommandNameWindow','_commandNameWindow','_atypeWidth','(?:%1|%2)','itemPadding','getDataSystemTypesWidth','_categoryWindow','mainFontSize','enemy','ElementRules','subject','ActorChangeTraitSetsJS','_cache','NUM','elementsMaxRate','return\x200','getElementIDsCol2','Game_Enemy_transform','addPassiveStatesTraitSets','elementId','Height','currentClass','getParameterList','note','TraitCheckNotetagPlus','_itemWindow','_commandList','WtypeId','clearElementChanges','ARRAYNUM','members','canBypassElementReflect','paramRate','damage','REC','MAXHP','statusMenuDmgDealt','<%1\x20BATTLER\x20NAMES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20NAMES>','toUpperCase','Visible','getAbsorbedElements','BattlerHueMass-%1-%2','createElementStatusCore','statusMenuDmgAbsorb','traitDmgMultipliersVs','gold','categoryWindowRect','getTraitSetKeys','EnemyChangeTraitSetsJS','(\x5cd+\x5c.?\x5cd+)','Variant','_tp','uiHelpPosition','call','canEquip','refresh','FinalizeRateJS','updatedLayoutStyle','EXR','Resist','random','getActionObjectElements','ARRAYJSON','PDR','CmdStyle','JSON','log','AGI','========================','statusMenuDmgReceive','refreshActorElementStatusCore','Game_Action_itemHit','resetWordWrap','SParam%1','DrawJS','Game_BattlerBase_sparam','onChangeEnemyTraits','drawGeneral','innerWidth','IconSet','faceName','calcElementRate','RuleAdditiveCalcJS','isPlaytest','_dataWindow','ATK','format','MAT','xparamRateTraitSets','EleDmgPlusJS','xparamPlus','TRG','some','BattlerNameMass-%1-%2','add','EleRecRateFlt','drawAccess','wtypeOkTraitSets','Game_BattlerBase_xparamPlus','EleDmgFlatPer','isMaxLevel','gaugeBackColor','executeDamage','process_VisuMZ_ElementStatusCore_TraitSets','Game_Enemy_gold','pagedown','_namesCount','traitCriticalPlusMultipliersVs','ceil','clear','EnableLayout','icon','traitHitRateMultipliersVs','VisuMZ_1_MessageCore','RuleMultiplyCalcJS','lineHeight','ARRAYFUNC','currentExt','iconHeight','create','(\x5cd+)([%％])','MRF','fill','_letter','setDescriptionFontSizeToTraitSet','loadPicture','attackElements','getElementIDs','_actor','RandomWeight','loadSystem','version','meetsEquipTraitRequirements','processRandomizedData','41298QhgXCA','AnchorY','Display','MDF','getColor','concat','itemCri','drawIcon','EleRecRatePer','battlerName','elementsAverageRate','Wtypes','73608aBfqcR','originalName','atypeOkTraitSets','sparam','setText','armorTypes','getMenuImage','Game_Enemy_dropItemRate','MultiRule','addChild','Settings','\x5cN[%1]','Blessing','mainAreaHeight','getWtypeIdWithName','cancel','getReceiveElementPlus','text','Game_BattlerBase_xparam','CmdTextAlign','EleRecPlusFlt','Game_Enemy_setLetter','actor','changePaintOpacity','XParams','faceWidth','systemColor','TRAIT_EQUIP_WTYPE','Alignment','553KKaEWB','atypeWidth','EleDmgPlusPer','goldTraitSets','setHandler','createRandomTraitSet','Game_Enemy_setup','<%1\x20SIDEVIEW\x20BATTLER:\x20(.*)>','Biography','replace','<%1\x20BATTLER\x20HUE:\x20(\x5cd+)>','HRG','itemMrf','nextActor','ARRAYSTRUCT','callUpdateHelp','Game_BattlerBase_paramRate','refreshActor','Step1End','Game_Action_itemCri','currentSymbol','resetDescriptionFontSize','%1%','VocabAtype','setActor','traitCriticalRateMultipliersVs','previousActor','process_VisuMZ_ElementStatusCore_RegExp','exit','traitHitPlusMultipliersVs','TRAIT_EQUIP_ATYPE','helpAreaHeight','Step1Start','commandStyle','boxWidth','TraitCheckNotetagRate','height','filter','SvMotionIdleSolo-%1-%2','randomInt','setBiography','fillRect','multiply','([\x5c+\x5c-]\x5cd+)([%％])','commandNameWindowDrawText','_resetFontSize','skillTypes','Flat','getRandomTraitSetFromList','sort','List','drawActorFaceBack','critical','checkCacheKey','drawParamName','parameters','loadFace','_svBattlerData','SvWeaponSolo-%1-%2','elementsRateProduct','getParamName','PHA','GoldRate','drawFirstCategoryData','EleDmgPlusFlt','weaponTypes','traitSetsEnabled','drawText','traitObjects','drawParameters','88888','addWindow','EVAL','VocabDmgAbsorb','#%1','getElementStatusCoreBackColor','applyTraitSetsByObjectNotetag','innerHeight','paramchangeTextColor','RuleMinCalcJS','_plural','initBiography','(.*)','traitCol1'];_0x4a61=function(){return _0x45809a;};return _0x4a61();}(function(_0x31869c,_0x20e255){const _0x2ce4b1=_0x179c,_0x17f31e=_0x31869c();while(!![]){try{const _0x56d5e4=-parseInt(_0x2ce4b1(0x37b))/0x1*(parseInt(_0x2ce4b1(0x32f))/0x2)+-parseInt(_0x2ce4b1(0x27f))/0x3*(parseInt(_0x2ce4b1(0x35b))/0x4)+-parseInt(_0x2ce4b1(0x2a4))/0x5*(-parseInt(_0x2ce4b1(0x1bd))/0x6)+parseInt(_0x2ce4b1(0x1e6))/0x7*(parseInt(_0x2ce4b1(0x1c9))/0x8)+-parseInt(_0x2ce4b1(0x24d))/0x9+-parseInt(_0x2ce4b1(0x241))/0xa+parseInt(_0x2ce4b1(0x379))/0xb;if(_0x56d5e4===_0x20e255)break;else _0x17f31e['push'](_0x17f31e['shift']());}catch(_0x189cf3){_0x17f31e['push'](_0x17f31e['shift']());}}}(_0x4a61,0x75245));var label=_0x4e22e6(0x29e),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4e22e6(0x20b)](function(_0x34a0b7){const _0x3fca1d=_0x4e22e6;return _0x34a0b7[_0x3fca1d(0x2d0)]&&_0x34a0b7[_0x3fca1d(0x385)][_0x3fca1d(0x23c)]('['+label+']');})[0x0];VisuMZ[label][_0x4e22e6(0x1d3)]=VisuMZ[label][_0x4e22e6(0x1d3)]||{},VisuMZ[_0x4e22e6(0x31a)]=function(_0x512799,_0x58784a){const _0x6bbd9b=_0x4e22e6;for(const _0x30c509 in _0x58784a){if(_0x30c509['match'](/(.*):(.*)/i)){const _0x4159a2=String(RegExp['$1']),_0x44d879=String(RegExp['$2'])[_0x6bbd9b(0x15d)]()[_0x6bbd9b(0x24f)]();let _0x3aff7d,_0x12825f,_0x1f1984;switch(_0x44d879){case _0x6bbd9b(0x393):_0x3aff7d=_0x58784a[_0x30c509]!==''?Number(_0x58784a[_0x30c509]):0x0;break;case _0x6bbd9b(0x154):_0x12825f=_0x58784a[_0x30c509]!==''?JSON[_0x6bbd9b(0x2c4)](_0x58784a[_0x30c509]):[],_0x3aff7d=_0x12825f[_0x6bbd9b(0x31c)](_0x32256f=>Number(_0x32256f));break;case _0x6bbd9b(0x22e):_0x3aff7d=_0x58784a[_0x30c509]!==''?eval(_0x58784a[_0x30c509]):null;break;case'ARRAYEVAL':_0x12825f=_0x58784a[_0x30c509]!==''?JSON['parse'](_0x58784a[_0x30c509]):[],_0x3aff7d=_0x12825f[_0x6bbd9b(0x31c)](_0xffc409=>eval(_0xffc409));break;case _0x6bbd9b(0x178):_0x3aff7d=_0x58784a[_0x30c509]!==''?JSON['parse'](_0x58784a[_0x30c509]):'';break;case _0x6bbd9b(0x175):_0x12825f=_0x58784a[_0x30c509]!==''?JSON[_0x6bbd9b(0x2c4)](_0x58784a[_0x30c509]):[],_0x3aff7d=_0x12825f[_0x6bbd9b(0x31c)](_0x5b652a=>JSON[_0x6bbd9b(0x2c4)](_0x5b652a));break;case'FUNC':_0x3aff7d=_0x58784a[_0x30c509]!==''?new Function(JSON[_0x6bbd9b(0x2c4)](_0x58784a[_0x30c509])):new Function(_0x6bbd9b(0x395));break;case _0x6bbd9b(0x1ab):_0x12825f=_0x58784a[_0x30c509]!==''?JSON[_0x6bbd9b(0x2c4)](_0x58784a[_0x30c509]):[],_0x3aff7d=_0x12825f[_0x6bbd9b(0x31c)](_0x4e5a73=>new Function(JSON[_0x6bbd9b(0x2c4)](_0x4e5a73)));break;case'STR':_0x3aff7d=_0x58784a[_0x30c509]!==''?String(_0x58784a[_0x30c509]):'';break;case'ARRAYSTR':_0x12825f=_0x58784a[_0x30c509]!==''?JSON['parse'](_0x58784a[_0x30c509]):[],_0x3aff7d=_0x12825f[_0x6bbd9b(0x31c)](_0x5b1993=>String(_0x5b1993));break;case _0x6bbd9b(0x36c):_0x1f1984=_0x58784a[_0x30c509]!==''?JSON[_0x6bbd9b(0x2c4)](_0x58784a[_0x30c509]):{},_0x512799[_0x4159a2]={},VisuMZ['ConvertParams'](_0x512799[_0x4159a2],_0x1f1984);continue;case _0x6bbd9b(0x1f4):_0x12825f=_0x58784a[_0x30c509]!==''?JSON['parse'](_0x58784a[_0x30c509]):[],_0x3aff7d=_0x12825f[_0x6bbd9b(0x31c)](_0x592391=>VisuMZ[_0x6bbd9b(0x31a)]({},JSON[_0x6bbd9b(0x2c4)](_0x592391)));break;default:continue;}_0x512799[_0x4159a2]=_0x3aff7d;}}return _0x512799;},(_0x218947=>{const _0x2c3193=_0x4e22e6,_0x2a720c=_0x218947[_0x2c3193(0x24e)];for(const _0x5ada0b of dependencies){if(!Imported[_0x5ada0b]){alert(_0x2c3193(0x25a)[_0x2c3193(0x18d)](_0x2a720c,_0x5ada0b)),SceneManager[_0x2c3193(0x202)]();break;}}const _0x2d1c22=_0x218947[_0x2c3193(0x385)];if(_0x2d1c22[_0x2c3193(0x356)](/\[Version[ ](.*?)\]/i)){const _0x3b0cae=Number(RegExp['$1']);_0x3b0cae!==VisuMZ[label][_0x2c3193(0x1ba)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x2a720c,_0x3b0cae)),SceneManager[_0x2c3193(0x202)]());}if(_0x2d1c22[_0x2c3193(0x356)](/\[Tier[ ](\d+)\]/i)){const _0x512a25=Number(RegExp['$1']);_0x512a25<tier?(alert(_0x2c3193(0x36a)[_0x2c3193(0x18d)](_0x2a720c,_0x512a25,tier)),SceneManager[_0x2c3193(0x202)]()):tier=Math[_0x2c3193(0x2de)](_0x512a25,tier);}VisuMZ[_0x2c3193(0x31a)](VisuMZ[label][_0x2c3193(0x1d3)],_0x218947[_0x2c3193(0x21d)]);})(pluginData),PluginManager[_0x4e22e6(0x321)](pluginData[_0x4e22e6(0x24e)],_0x4e22e6(0x369),_0x2527bb=>{const _0x160f69=_0x4e22e6;VisuMZ[_0x160f69(0x31a)](_0x2527bb,_0x2527bb);const _0xec9441=_0x2527bb[_0x160f69(0x2a5)];for(const _0x4e3d8c of _0xec9441){const _0x84491a=$gameActors['actor'](_0x4e3d8c);if(!_0x84491a)continue;_0x84491a[_0x160f69(0x20e)](_0x2527bb[_0x160f69(0x1ee)]['format'](_0x160f69(0x1d4)[_0x160f69(0x18d)](_0x84491a[_0x160f69(0x26d)]())));}}),PluginManager[_0x4e22e6(0x321)](pluginData[_0x4e22e6(0x24e)],'ActorChangeBiographyRange',_0x57b66c=>{const _0x16a1b4=_0x4e22e6;VisuMZ[_0x16a1b4(0x31a)](_0x57b66c,_0x57b66c);const _0x1bccc4=_0x57b66c[_0x16a1b4(0x1f8)]>=_0x57b66c['Step1Start']?_0x57b66c[_0x16a1b4(0x206)]:_0x57b66c[_0x16a1b4(0x1f8)],_0x61fcb5=_0x57b66c[_0x16a1b4(0x1f8)]>=_0x57b66c['Step1Start']?_0x57b66c[_0x16a1b4(0x1f8)]:_0x57b66c[_0x16a1b4(0x206)],_0x53d4f7=Array(_0x61fcb5-_0x1bccc4+0x1)[_0x16a1b4(0x1b1)]()[_0x16a1b4(0x31c)]((_0x18943b,_0x2d54d9)=>_0x1bccc4+_0x2d54d9);for(const _0x417c8a of _0x53d4f7){const _0x2d022c=$gameActors[_0x16a1b4(0x1df)](_0x417c8a);if(!_0x2d022c)continue;_0x2d022c[_0x16a1b4(0x20e)](_0x57b66c[_0x16a1b4(0x1ee)]['format']('\x5cN[%1]'['format'](_0x2d022c[_0x16a1b4(0x26d)]())));}}),PluginManager[_0x4e22e6(0x321)](pluginData[_0x4e22e6(0x24e)],_0x4e22e6(0x353),_0x5341e7=>{const _0x2b46b1=_0x4e22e6;VisuMZ[_0x2b46b1(0x31a)](_0x5341e7,_0x5341e7);const _0xb8989e=_0x5341e7[_0x2b46b1(0x2a5)];let _0x196adc=[];while(_0xb8989e[_0x2b46b1(0x355)]>0x0){const _0x2052e2=_0xb8989e['shift']();Array[_0x2b46b1(0x30c)](_0x2052e2)?_0x196adc=_0x196adc[_0x2b46b1(0x1c2)](_0x2052e2):_0x196adc[_0x2b46b1(0x273)](_0x2052e2);}for(const _0x49ec42 of _0x196adc){const _0x30cb06=$gameActors['actor'](_0x49ec42);if(!_0x30cb06)continue;_0x30cb06[_0x2b46b1(0x20e)](_0x5341e7[_0x2b46b1(0x1ee)]['format'](_0x2b46b1(0x1d4)[_0x2b46b1(0x18d)](_0x30cb06[_0x2b46b1(0x26d)]())));}}),PluginManager[_0x4e22e6(0x321)](pluginData['name'],_0x4e22e6(0x240),_0x5018bf=>{const _0x54d4e5=_0x4e22e6;VisuMZ[_0x54d4e5(0x31a)](_0x5018bf,_0x5018bf);const _0x1e248d=_0x5018bf['Step1'],_0x31ecb1=Game_BattlerBase[_0x54d4e5(0x35f)][_0x54d4e5(0x166)]();for(const _0x2398ec of _0x1e248d){const _0xad728f=$gameActors[_0x54d4e5(0x1df)](_0x2398ec);if(!_0xad728f)continue;for(const _0x18981a of _0x31ecb1){if(!_0x5018bf[_0x18981a])continue;if(_0x5018bf[_0x18981a][_0x54d4e5(0x356)](/UNCHANGED/i))continue;_0x5018bf[_0x18981a]['match'](/RANDOM/i)?_0xad728f['createRandomTraitSet'](_0x18981a):_0xad728f[_0x54d4e5(0x290)](_0x18981a,_0x5018bf[_0x18981a]);}}}),PluginManager[_0x4e22e6(0x321)](pluginData['name'],_0x4e22e6(0x2c3),_0x38c222=>{const _0x58dc5b=_0x4e22e6;VisuMZ[_0x58dc5b(0x31a)](_0x38c222,_0x38c222);const _0x290d13=_0x38c222[_0x58dc5b(0x1f8)]>=_0x38c222['Step1Start']?_0x38c222[_0x58dc5b(0x206)]:_0x38c222['Step1End'],_0x328b69=_0x38c222[_0x58dc5b(0x1f8)]>=_0x38c222[_0x58dc5b(0x206)]?_0x38c222[_0x58dc5b(0x1f8)]:_0x38c222[_0x58dc5b(0x206)],_0x4ead9a=Array(_0x328b69-_0x290d13+0x1)[_0x58dc5b(0x1b1)]()[_0x58dc5b(0x31c)]((_0x39a453,_0x4dedd2)=>_0x290d13+_0x4dedd2),_0x26a805=Game_BattlerBase[_0x58dc5b(0x35f)]['getTraitSetKeys']();for(const _0x572cf7 of _0x4ead9a){const _0xb5eb20=$gameActors['actor'](_0x572cf7);if(!_0xb5eb20)continue;for(const _0x314bb5 of _0x26a805){if(!_0x38c222[_0x314bb5])continue;if(_0x38c222[_0x314bb5][_0x58dc5b(0x356)](/UNCHANGED/i))continue;_0x38c222[_0x314bb5]['match'](/RANDOM/i)?_0xb5eb20[_0x58dc5b(0x1eb)](_0x314bb5):_0xb5eb20[_0x58dc5b(0x290)](_0x314bb5,_0x38c222[_0x314bb5]);}}}),PluginManager[_0x4e22e6(0x321)](pluginData[_0x4e22e6(0x24e)],_0x4e22e6(0x391),_0x2cc60c=>{const _0x1227ba=_0x4e22e6;VisuMZ[_0x1227ba(0x31a)](_0x2cc60c,_0x2cc60c);const _0x1d5664=_0x2cc60c['Step1'];let _0x445da2=[];while(_0x1d5664['length']>0x0){const _0x3a88d6=_0x1d5664[_0x1227ba(0x2ce)]();Array['isArray'](_0x3a88d6)?_0x445da2=_0x445da2[_0x1227ba(0x1c2)](_0x3a88d6):_0x445da2[_0x1227ba(0x273)](_0x3a88d6);}const _0x4fe522=Game_BattlerBase[_0x1227ba(0x35f)]['getTraitSetKeys']();for(const _0x3d2718 of _0x445da2){const _0x171464=$gameActors[_0x1227ba(0x1df)](_0x3d2718);if(!_0x171464)continue;for(const _0x3a1e50 of _0x4fe522){if(!_0x2cc60c[_0x3a1e50])continue;if(_0x2cc60c[_0x3a1e50]['match'](/UNCHANGED/i))continue;_0x2cc60c[_0x3a1e50]['match'](/RANDOM/i)?_0x171464[_0x1227ba(0x1eb)](_0x3a1e50):_0x171464[_0x1227ba(0x290)](_0x3a1e50,_0x2cc60c[_0x3a1e50]);}}}),PluginManager[_0x4e22e6(0x321)](pluginData['name'],'EnemyChangeTraitSetsGroup',_0x1458ca=>{const _0x5c353d=_0x4e22e6;if(!$gameParty[_0x5c353d(0x257)]())return;VisuMZ[_0x5c353d(0x31a)](_0x1458ca,_0x1458ca);const _0x377fb8=_0x1458ca['Step1'],_0x29e08c=Game_BattlerBase[_0x5c353d(0x35f)][_0x5c353d(0x166)]();for(const _0x3e5f0a of _0x377fb8){const _0x4019f9=$gameTroop['members']()[_0x3e5f0a];if(!_0x4019f9)continue;for(const _0x367729 of _0x29e08c){if(!_0x1458ca[_0x367729])continue;if(_0x1458ca[_0x367729][_0x5c353d(0x356)](/UNCHANGED/i))continue;_0x1458ca[_0x367729][_0x5c353d(0x356)](/RANDOM/i)?_0x4019f9[_0x5c353d(0x1eb)](_0x367729):_0x4019f9['setTraitSet'](_0x367729,_0x1458ca[_0x367729]);}}$gameTroop[_0x5c353d(0x183)]();}),PluginManager[_0x4e22e6(0x321)](pluginData[_0x4e22e6(0x24e)],_0x4e22e6(0x37a),_0x3a3389=>{const _0x116e2d=_0x4e22e6;if(!$gameParty[_0x116e2d(0x257)]())return;VisuMZ['ConvertParams'](_0x3a3389,_0x3a3389);const _0x55be87=_0x3a3389[_0x116e2d(0x1f8)]>=_0x3a3389[_0x116e2d(0x206)]?_0x3a3389['Step1Start']:_0x3a3389[_0x116e2d(0x1f8)],_0xf4ad77=_0x3a3389[_0x116e2d(0x1f8)]>=_0x3a3389[_0x116e2d(0x206)]?_0x3a3389[_0x116e2d(0x1f8)]:_0x3a3389[_0x116e2d(0x206)],_0xa096ab=Array(_0xf4ad77-_0x55be87+0x1)[_0x116e2d(0x1b1)]()[_0x116e2d(0x31c)]((_0x1613ec,_0x327def)=>_0x55be87+_0x327def),_0x11f4e7=Game_BattlerBase[_0x116e2d(0x35f)]['getTraitSetKeys']();for(const _0x5c0749 of _0xa096ab){const _0x58132a=$gameTroop[_0x116e2d(0x155)]()[_0x5c0749];if(!_0x58132a)continue;for(const _0x487239 of _0x11f4e7){if(!_0x3a3389[_0x487239])continue;if(_0x3a3389[_0x487239][_0x116e2d(0x356)](/UNCHANGED/i))continue;_0x3a3389[_0x487239]['match'](/RANDOM/i)?_0x58132a[_0x116e2d(0x1eb)](_0x487239):_0x58132a['setTraitSet'](_0x487239,_0x3a3389[_0x487239]);}}$gameTroop[_0x116e2d(0x183)]();}),PluginManager['registerCommand'](pluginData[_0x4e22e6(0x24e)],_0x4e22e6(0x167),_0x61de40=>{const _0x5b5ab6=_0x4e22e6;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x61de40,_0x61de40);const _0x1f5e6a=_0x61de40[_0x5b5ab6(0x2a5)];let _0x5e4ed5=[];while(_0x1f5e6a['length']>0x0){const _0x41909d=_0x1f5e6a[_0x5b5ab6(0x2ce)]();Array[_0x5b5ab6(0x30c)](_0x41909d)?_0x5e4ed5=_0x5e4ed5[_0x5b5ab6(0x1c2)](_0x41909d):_0x5e4ed5[_0x5b5ab6(0x273)](_0x41909d);}const _0x4fd7fa=Game_BattlerBase[_0x5b5ab6(0x35f)][_0x5b5ab6(0x166)]();for(const _0x385d68 of _0x5e4ed5){const _0x53ad7d=$gameTroop['members']()[_0x385d68];if(!_0x53ad7d)continue;for(const _0x214591 of _0x4fd7fa){if(!_0x61de40[_0x214591])continue;if(_0x61de40[_0x214591]['match'](/UNCHANGED/i))continue;_0x61de40[_0x214591]['match'](/RANDOM/i)?_0x53ad7d[_0x5b5ab6(0x1eb)](_0x214591):_0x53ad7d[_0x5b5ab6(0x290)](_0x214591,_0x61de40[_0x214591]);}}$gameTroop[_0x5b5ab6(0x183)]();}),VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x23a)]=Scene_Boot[_0x4e22e6(0x35f)][_0x4e22e6(0x2c2)],Scene_Boot[_0x4e22e6(0x35f)][_0x4e22e6(0x2c2)]=function(){const _0x39bb48=_0x4e22e6;VisuMZ[_0x39bb48(0x29e)][_0x39bb48(0x23a)][_0x39bb48(0x16c)](this),this[_0x39bb48(0x27d)](),this['process_VisuMZ_ElementStatusCore_TraitSets'](),this['process_VisuMZ_ElementStatusCore_RegExp'](),this['process_VisuMZ_ElementStatusCore_Battler_RegExp'](),this['process_VisuMZ_ElementStatusCore_Compatible_RegExp']();},Scene_Boot[_0x4e22e6(0x35f)]['process_VisuMZ_ElementStatusCore_Parameters']=function(){const _0x333753=_0x4e22e6,_0x5a5785=VisuMZ['ElementStatusCore'][_0x333753(0x1d3)][_0x333753(0x2b6)];Window_StatusData['traitCol1']=(_0x5a5785['TraitCol1']||Window_StatusData[_0x333753(0x239)])[_0x333753(0x20b)](_0x3fa0b2=>{const _0x5b404e=_0x333753,_0x6d8a9=DataManager[_0x5b404e(0x278)](_0x3fa0b2);return _0x6d8a9&&_0x6d8a9[_0x5b404e(0x15e)];}),Window_StatusData[_0x333753(0x298)]=(_0x5a5785[_0x333753(0x2fa)]||Window_StatusData[_0x333753(0x298)])[_0x333753(0x20b)](_0x5df300=>{const _0x17b2a2=_0x333753,_0x41655e=DataManager[_0x17b2a2(0x278)](_0x5df300);return _0x41655e&&_0x41655e[_0x17b2a2(0x15e)];});},Scene_Boot[_0x4e22e6(0x35f)][_0x4e22e6(0x19e)]=function(){const _0x2e7113=_0x4e22e6,_0x572825=VisuMZ[_0x2e7113(0x29e)][_0x2e7113(0x1d3)],_0x45e386=Game_BattlerBase[_0x2e7113(0x35f)][_0x2e7113(0x166)]();DataManager[_0x2e7113(0x325)]={};for(const _0x3ef30b of _0x45e386){const _0x5c5e5e=_0x3ef30b[_0x2e7113(0x15d)]()[_0x2e7113(0x24f)]();DataManager[_0x2e7113(0x325)][_0x5c5e5e]={},DataManager['_traitSets'][_0x5c5e5e]['DEFAULT']=_0x572825[_0x3ef30b][_0x2e7113(0x37c)];const _0x5d555a=_0x572825[_0x3ef30b][_0x2e7113(0x37c)][_0x2e7113(0x346)][_0x2e7113(0x15d)]()[_0x2e7113(0x24f)]();DataManager[_0x2e7113(0x325)][_0x5c5e5e][_0x5d555a]=_0x572825[_0x3ef30b][_0x2e7113(0x37c)];const _0x33ec57=_0x572825[_0x3ef30b][_0x2e7113(0x218)];for(const _0x442389 of _0x33ec57){const _0x171f9c=_0x442389['Name']['toUpperCase']()[_0x2e7113(0x24f)]();DataManager[_0x2e7113(0x325)][_0x5c5e5e][_0x171f9c]=_0x442389;}}},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x263)]={},Scene_Boot['prototype'][_0x4e22e6(0x201)]=function(){const _0x2aeac7=_0x4e22e6,_0x1af168=VisuMZ[_0x2aeac7(0x29e)][_0x2aeac7(0x263)],_0x2b6008=$dataSystem[_0x2aeac7(0x378)],_0x4694e=_0x2aeac7(0x364),_0x3d4208='<%1DEALT\x20ELEMENT\x20%2\x20%3:[\x20]%4>',_0xed23b9=_0x2aeac7(0x1af),_0x7893ac=_0x2aeac7(0x168),_0x85634c=_0x2aeac7(0x211),_0x7c4cbc=_0x2aeac7(0x2e2),_0x1d3381=_0x2aeac7(0x238),_0x3bea46=['EleRec','EleDmg'],_0x27ff18=[_0x2aeac7(0x2d1),_0x2aeac7(0x2fc),_0x2aeac7(0x215)],_0x314940=[_0x2aeac7(0x315),_0x2aeac7(0x352),'JS'],_0x3c98a9=[_0x85634c,_0x7c4cbc,_0x1d3381],_0x2761fb=[_0xed23b9,_0x7893ac,_0x1d3381],_0x4d084c='<%1FORCE\x20RECEIVED\x20ELEMENT\x20(?:%2|%3)\x20RATE:[\x20]%4>';_0x1af168['EleForcePer']=[],_0x1af168['EleForceFlt']=[],_0x1af168[_0x2aeac7(0x25d)]=[];for(let _0x113d14=0x0;_0x113d14<_0x2b6008[_0x2aeac7(0x355)];_0x113d14++){let _0x51fa7e=_0x2b6008[_0x113d14]['toUpperCase']()[_0x2aeac7(0x24f)]();_0x51fa7e=_0x51fa7e[_0x2aeac7(0x1ef)](/\x1I\[(\d+)\]/gi,''),_0x51fa7e=_0x51fa7e[_0x2aeac7(0x1ef)](/\\I\[(\d+)\]/gi,'');for(const _0x1d3cf9 of _0x3bea46){for(const _0x3a478f of _0x27ff18){for(const _0x3916b1 of _0x314940){const _0x484035='%1%2%3'[_0x2aeac7(0x18d)](_0x1d3cf9,_0x3a478f,_0x3916b1);_0x1af168[_0x484035]=_0x1af168[_0x484035]||[];const _0x3b0263=_0x1d3cf9===_0x2aeac7(0x2b7)?_0x4694e:_0x3d4208,_0x3bd386=_0x3916b1[_0x2aeac7(0x356)](/JS/i)?_0x2aeac7(0x2f9):'',_0x3be8d2=_0x2aeac7(0x389)['format'](_0x51fa7e,_0x113d14),_0x1523ee=_0x3a478f[_0x2aeac7(0x15d)](),_0x81c57c=_0x3a478f['match'](/RATE/i)?_0x2761fb:_0x3c98a9,_0x8eee50=_0x81c57c[_0x314940[_0x2aeac7(0x2bf)](_0x3916b1)];_0x1af168[_0x484035][_0x113d14]=new RegExp(_0x3b0263[_0x2aeac7(0x18d)](_0x3bd386,_0x3be8d2,_0x1523ee,_0x8eee50),'i');}}}_0x1af168['EleForcePer'][_0x113d14]=new RegExp(_0x4d084c[_0x2aeac7(0x18d)]('',_0x51fa7e,_0x113d14,_0xed23b9),'i'),_0x1af168[_0x2aeac7(0x33f)][_0x113d14]=new RegExp(_0x4d084c[_0x2aeac7(0x18d)]('',_0x51fa7e,_0x113d14,_0x7893ac),'i'),_0x1af168[_0x2aeac7(0x25d)][_0x113d14]=new RegExp(_0x4d084c[_0x2aeac7(0x18d)](_0x2aeac7(0x2f9),_0x51fa7e,_0x113d14,_0x1d3381),'i');}},Scene_Boot[_0x4e22e6(0x35f)][_0x4e22e6(0x304)]=function(){const _0x5a989b=_0x4e22e6,_0x146d2e=Game_BattlerBase[_0x5a989b(0x35f)]['getTraitSetKeys'](),_0x48690e=_0x5a989b(0x348),_0x3b78cd=_0x5a989b(0x1f0),_0x4952ab=_0x5a989b(0x15c),_0x7117b0='<%1\x20BATTLER\x20HUES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20HUES>';for(const _0xd5d35f of _0x146d2e){const _0x52c100=_0xd5d35f[_0x5a989b(0x15d)]()[_0x5a989b(0x24f)]();for(const _0x1aa6cb in DataManager[_0x5a989b(0x325)][_0x52c100]){const _0x9a718c=_0x5a989b(0x306)[_0x5a989b(0x18d)](_0x52c100,_0x1aa6cb);VisuMZ['ElementStatusCore'][_0x5a989b(0x263)][_0x9a718c]=new RegExp(_0x48690e['format'](_0x1aa6cb),'i');const _0x3675f5='BattlerHueSolo-%1-%2'['format'](_0x52c100,_0x1aa6cb);VisuMZ[_0x5a989b(0x29e)][_0x5a989b(0x263)][_0x3675f5]=new RegExp(_0x3b78cd[_0x5a989b(0x18d)](_0x1aa6cb),'i');const _0x39946b=_0x5a989b(0x194)[_0x5a989b(0x18d)](_0x52c100,_0x1aa6cb);VisuMZ[_0x5a989b(0x29e)]['RegExp'][_0x39946b]=new RegExp(_0x4952ab[_0x5a989b(0x18d)](_0x1aa6cb),'i');const _0x4624be=_0x5a989b(0x160)[_0x5a989b(0x18d)](_0x52c100,_0x1aa6cb);VisuMZ['ElementStatusCore'][_0x5a989b(0x263)][_0x4624be]=new RegExp(_0x7117b0[_0x5a989b(0x18d)](_0x1aa6cb),'i');}}},Scene_Boot[_0x4e22e6(0x35f)]['process_VisuMZ_ElementStatusCore_Compatible_RegExp']=function(){const _0x493f08=_0x4e22e6,_0x5a4786=Game_BattlerBase[_0x493f08(0x35f)]['getTraitSetKeys']();if(Imported['VisuMZ_1_BattleCore']){const _0x72f36e=_0x493f08(0x1ed),_0x26f656='<%1\x20SIDEVIEW\x20WEAPON:\x20(.*)>',_0x2a9ee7=_0x493f08(0x336),_0x500df1=_0x493f08(0x293),_0x42afc8='<%1\x20SIDEVIEW\x20WEAPONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20WEAPONS>',_0x1de8c7=_0x493f08(0x333);for(const _0x8a29c2 of _0x5a4786){const _0x11b09a=_0x8a29c2[_0x493f08(0x15d)]()[_0x493f08(0x24f)]();for(const _0x2ce0f7 in DataManager[_0x493f08(0x325)][_0x11b09a]){const _0x52a08a=_0x493f08(0x30b)[_0x493f08(0x18d)](_0x11b09a,_0x2ce0f7);VisuMZ[_0x493f08(0x29e)][_0x493f08(0x263)][_0x52a08a]=new RegExp(_0x72f36e['format'](_0x2ce0f7),'i');const _0x385069=_0x493f08(0x220)['format'](_0x11b09a,_0x2ce0f7);VisuMZ['ElementStatusCore']['RegExp'][_0x385069]=new RegExp(_0x26f656[_0x493f08(0x18d)](_0x2ce0f7),'i');const _0x4ab5a5=_0x493f08(0x20c)[_0x493f08(0x18d)](_0x11b09a,_0x2ce0f7);VisuMZ[_0x493f08(0x29e)][_0x493f08(0x263)][_0x4ab5a5]=new RegExp(_0x2a9ee7[_0x493f08(0x18d)](_0x2ce0f7),'i');const _0x4774df=_0x493f08(0x272)['format'](_0x11b09a,_0x2ce0f7);VisuMZ[_0x493f08(0x29e)][_0x493f08(0x263)][_0x4774df]=new RegExp(_0x500df1[_0x493f08(0x18d)](_0x2ce0f7),'i');const _0xfe0829=_0x493f08(0x294)['format'](_0x11b09a,_0x2ce0f7);VisuMZ[_0x493f08(0x29e)][_0x493f08(0x263)][_0xfe0829]=new RegExp(_0x42afc8['format'](_0x2ce0f7),'i');const _0x3a54df='SvMotionIdleMass-%1-%2'[_0x493f08(0x18d)](_0x11b09a,_0x2ce0f7);VisuMZ[_0x493f08(0x29e)][_0x493f08(0x263)][_0x3a54df]=new RegExp(_0x1de8c7[_0x493f08(0x18d)](_0x2ce0f7),'i');}}}},DataManager['traitSetsEnabled']=function(){const _0x301402=_0x4e22e6;return VisuMZ[_0x301402(0x29e)]['Settings'][_0x301402(0x2b6)][_0x301402(0x2cb)];},DataManager['traitSetType']=function(_0x504dfc){const _0x3756ea=_0x4e22e6;return VisuMZ[_0x3756ea(0x29e)][_0x3756ea(0x1d3)][_0x504dfc];},DataManager[_0x4e22e6(0x23f)]=function(_0x18de45,_0x5bcbc4){const _0xab68a8=_0x4e22e6;return _0x18de45=_0x18de45[_0xab68a8(0x15d)]()['trim'](),_0x5bcbc4=_0x5bcbc4[_0xab68a8(0x15d)]()[_0xab68a8(0x24f)](),this[_0xab68a8(0x325)][_0x18de45][_0x5bcbc4]?this[_0xab68a8(0x325)][_0x18de45][_0x5bcbc4]:this[_0xab68a8(0x325)][_0x18de45][_0xab68a8(0x24b)];},DataManager[_0x4e22e6(0x286)]=function(_0x3f24f5,_0x1e26e2){const _0x4c3906=_0x4e22e6;if(!_0x1e26e2)return;this['makeMassTraitSetFromNotetags'](_0x3f24f5,_0x1e26e2),this[_0x4c3906(0x2a2)](_0x3f24f5,_0x1e26e2),this[_0x4c3906(0x2b5)](_0x3f24f5,_0x1e26e2);},DataManager['getRandomTraitSetFromString']=function(_0x2c38c4){const _0xdb1cff=_0x4e22e6;return data=_0x2c38c4[_0xdb1cff(0x25c)](','),data[Math[_0xdb1cff(0x20d)](data[_0xdb1cff(0x355)])][_0xdb1cff(0x24f)]();},DataManager[_0x4e22e6(0x2af)]=function(_0x3b6ea4,_0x334816){const _0x228601=_0x4e22e6,_0x3fc0d6={'ELEMENT':'Element','SUBELEMENT':_0x228601(0x32c),'GENDER':_0x228601(0x34a),'RACE':_0x228601(0x383),'NATURE':_0x228601(0x2f6),'ALIGNMENT':_0x228601(0x1e5),'BLESSING':_0x228601(0x1d5),'CURSE':'Curse','ZODIAC':_0x228601(0x2c0),'VARIANT':_0x228601(0x169)},_0x347fbf=_0x334816[_0x228601(0x14e)];if(_0x347fbf[_0x228601(0x356)](/<TRAIT SETS>\s*([\s\S]*)\s*<\/TRAIT SETS>/i)){const _0x2eef53=String(RegExp['$1'])[_0x228601(0x25c)](/[\r\n]+/);for(const _0x20c13c of _0x2eef53){if(_0x20c13c[_0x228601(0x356)](/(.*):[ ](.*)/i)){const _0x3cca8b=String(RegExp['$1'])['toUpperCase']()['trim'](),_0xd9221a=String(RegExp['$2']),_0x573827=_0x3fc0d6[_0x3cca8b];_0x573827&&(_0x3b6ea4[_0x573827]=this[_0x228601(0x327)](_0xd9221a));}}}},DataManager[_0x4e22e6(0x2a2)]=function(_0x4a156f,_0x34271d){const _0x2084dd=_0x4e22e6,_0x4e32a2=_0x34271d[_0x2084dd(0x14e)],_0x447dff={'Element':/<ELEMENT:[ ](.*)>/i,'SubElement':/<SUBELEMENT:[ ](.*)>/i,'Gender':/<GENDER:[ ](.*)>/i,'Race':/<RACE:[ ](.*)>/i,'Nature':/<NATURE:[ ](.*)>/i,'Alignment':/<ALIGNMENT:[ ](.*)>/i,'Blessing':/<BLESSING:[ ](.*)>/i,'Curse':/<CURSE:[ ](.*)>/i,'Zodiac':/<ZODIAC:[ ](.*)>/i,'Variant':/<VARIANT:[ ](.*)>/i};for(const _0x100b7f in _0x447dff){const _0x230ccb=_0x447dff[_0x100b7f];_0x4e32a2[_0x2084dd(0x356)](_0x230ccb)&&(_0x4a156f[_0x100b7f]=this[_0x2084dd(0x327)](RegExp['$1']));}_0x4e32a2[_0x2084dd(0x356)](/<ELEMENT:[ ](.*)\/(.*)>/i)&&(_0x4a156f[_0x2084dd(0x363)]=String(RegExp['$1'])[_0x2084dd(0x24f)](),_0x4a156f[_0x2084dd(0x32c)]=String(RegExp['$2'])[_0x2084dd(0x24f)]());},DataManager[_0x4e22e6(0x2b5)]=function(_0x406afb,_0x3842b4){const _0x16ac76=_0x4e22e6,_0x733d58=_0x3842b4[_0x16ac76(0x14e)],_0x2d0381={'Element':/<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i,'SubElement':/<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i,'Gender':/<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i,'Race':/<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i,'Nature':/<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i,'Alignment':/<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i,'Blessing':/<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i,'Curse':/<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i,'Zodiac':/<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i,'Variant':/<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i};for(const _0x19b804 in _0x2d0381){const _0x252041=_0x2d0381[_0x19b804];if(_0x733d58[_0x16ac76(0x356)](_0x252041)){const _0xf8346c=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x16ac76(0x338)]('');_0x406afb[_0x19b804]=this[_0x16ac76(0x1bc)](_0xf8346c);}}},DataManager[_0x4e22e6(0x1bc)]=function(_0x48c897){const _0x2a2240=_0x4e22e6;let _0x2aed75=0x0;const _0x571d19={};for(const _0x24b94d of _0x48c897){if(_0x24b94d['match'](/(.*):[ ](\d+)/i)){const _0x11e283=String(RegExp['$1'])[_0x2a2240(0x24f)](),_0x231860=Number(RegExp['$2']);_0x571d19[_0x11e283]=_0x231860,_0x2aed75+=_0x231860;}else{if(_0x24b94d[_0x2a2240(0x356)](/(.*):[ ](\d+\.?\d+)/i)){const _0xc8a77c=String(RegExp['$1'])['trim'](),_0x1a0cc4=Number(RegExp['$2']);_0x571d19[_0xc8a77c]=_0x1a0cc4,_0x2aed75+=_0x1a0cc4;}else _0x24b94d!==''&&(_0x571d19[_0x24b94d]=0x1,_0x2aed75++);}}if(_0x2aed75<=0x0)return'';let _0x1b02ae=Math[_0x2a2240(0x173)]()*_0x2aed75;for(const _0x34a2ac in _0x571d19){_0x1b02ae-=_0x571d19[_0x34a2ac];if(_0x1b02ae<=0x0)return _0x34a2ac;}return'';},DataManager[_0x4e22e6(0x216)]=function(_0x469fba){const _0xa3c36e=_0x4e22e6;let _0x13c2e3=[],_0x22f400=0x0;_0x469fba=_0x469fba['toUpperCase']()[_0xa3c36e(0x24f)]();const _0x28f6de=this[_0xa3c36e(0x325)][_0x469fba];for(const _0x5d0dc8 in _0x28f6de){const _0x2cbe22=_0x28f6de[_0x5d0dc8];_0x2cbe22[_0xa3c36e(0x35d)]&&(_0x13c2e3[_0xa3c36e(0x273)](_0x5d0dc8),_0x22f400+=_0x2cbe22[_0xa3c36e(0x1b8)]);}if(_0x22f400<=0x0)return'';let _0x4f0ddb=Math[_0xa3c36e(0x173)]()*_0x22f400;for(const _0x304ac6 of _0x13c2e3){_0x4f0ddb-=_0x28f6de[_0x304ac6][_0xa3c36e(0x1b8)];if(_0x4f0ddb<=0x0)return _0x304ac6;}return'';},DataManager[_0x4e22e6(0x265)]=function(_0x5db069){const _0x3adae6=_0x4e22e6;_0x5db069=_0x5db069[_0x3adae6(0x15d)]()[_0x3adae6(0x24f)](),this[_0x3adae6(0x367)]=this[_0x3adae6(0x367)]||{};if(this[_0x3adae6(0x367)][_0x5db069])return this[_0x3adae6(0x367)][_0x5db069];let _0x471636=0x1;for(const _0x2d7893 of $dataSystem[_0x3adae6(0x378)]){if(!_0x2d7893)continue;let _0x12355d=_0x2d7893[_0x3adae6(0x15d)]();_0x12355d=_0x12355d['replace'](/\x1I\[(\d+)\]/gi,''),_0x12355d=_0x12355d[_0x3adae6(0x1ef)](/\\I\[(\d+)\]/gi,''),this[_0x3adae6(0x367)][_0x12355d]=_0x471636,_0x471636++;}return this[_0x3adae6(0x367)][_0x5db069]||0x0;},DataManager[_0x4e22e6(0x174)]=function(_0x30a029){const _0x12bf10=_0x4e22e6;let _0x16dd3f=[];const _0x258217=_0x30a029['note'][_0x12bf10(0x356)](/<MULTI-ELEMENT:[ ](.*)>/gi);if(_0x258217)for(const _0x20721b of _0x258217){_0x20721b[_0x12bf10(0x356)](/<MULTI-ELEMENT:[ ](.*)>/gi);const _0x2d8e33=String(RegExp['$1'])[_0x12bf10(0x25c)](',')[_0x12bf10(0x31c)](_0x283209=>_0x283209['trim']());for(const _0x9bb82e of _0x2d8e33){const _0x230283=/^\d+$/[_0x12bf10(0x274)](_0x9bb82e);if(_0x230283)_0x16dd3f[_0x12bf10(0x273)](Number(_0x9bb82e));else{const _0x3a3edc=this[_0x12bf10(0x265)](_0x9bb82e);if(_0x3a3edc)_0x16dd3f[_0x12bf10(0x273)](_0x3a3edc);}}}return _0x16dd3f;},TextManager[_0x4e22e6(0x36e)]=VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x1d3)][_0x4e22e6(0x2ea)][_0x4e22e6(0x328)],TextManager[_0x4e22e6(0x162)]=VisuMZ['ElementStatusCore'][_0x4e22e6(0x1d3)][_0x4e22e6(0x2ea)][_0x4e22e6(0x22f)],TextManager['statusMenuDmgReceive']=VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x1d3)][_0x4e22e6(0x2ea)][_0x4e22e6(0x27b)],TextManager[_0x4e22e6(0x15b)]=VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x1d3)][_0x4e22e6(0x2ea)][_0x4e22e6(0x362)],TextManager['statusMenuStype']=VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x1d3)][_0x4e22e6(0x2ea)]['VocabStype'],TextManager[_0x4e22e6(0x255)]=VisuMZ['ElementStatusCore'][_0x4e22e6(0x1d3)][_0x4e22e6(0x2ea)][_0x4e22e6(0x2bd)],TextManager['statusMenuAtype']=VisuMZ[_0x4e22e6(0x29e)]['Settings'][_0x4e22e6(0x2ea)][_0x4e22e6(0x1fd)],ColorManager['getColor']=function(_0x586593){const _0x416b2d=_0x4e22e6;return _0x586593=String(_0x586593),_0x586593[_0x416b2d(0x356)](/#(.*)/i)?_0x416b2d(0x230)[_0x416b2d(0x18d)](String(RegExp['$1'])):this['textColor'](Number(_0x586593));},VisuMZ[_0x4e22e6(0x29e)]['Game_Action_clear']=Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1a4)],Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1a4)]=function(){const _0x2866f1=_0x4e22e6;VisuMZ['ElementStatusCore'][_0x2866f1(0x350)]['call'](this),this[_0x2866f1(0x153)]();},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x153)]=function(){const _0x2bcb79=_0x4e22e6;this['_battleCoreNoElement']=![],this['_battleCoreForcedElements']=[],this[_0x2bcb79(0x2e7)]=[];},Game_Action[_0x4e22e6(0x35f)]['elements']=function(){const _0x37ee3b=_0x4e22e6;if(!this[_0x37ee3b(0x24a)]())return[];if(this[_0x37ee3b(0x390)]()[_0x37ee3b(0x25f)]())return[];if(this['_battleCoreNoElement'])return[];if(this[_0x37ee3b(0x26e)][_0x37ee3b(0x355)]>0x0)return this['_battleCoreForcedElements'];const _0x59148a=this['subject']()[_0x37ee3b(0x30d)]();if(_0x59148a['length']>0x0)return _0x59148a;let _0x2e08bd=[];const _0x376892=this[_0x37ee3b(0x24a)]()[_0x37ee3b(0x158)][_0x37ee3b(0x399)];return _0x376892<0x0?_0x2e08bd=_0x2e08bd[_0x37ee3b(0x1c2)](this[_0x37ee3b(0x390)]()[_0x37ee3b(0x1b5)]()):_0x2e08bd[_0x37ee3b(0x273)](_0x376892),_0x2e08bd=_0x2e08bd[_0x37ee3b(0x1c2)](this['_battleCoreAddedElements']),_0x2e08bd=_0x2e08bd[_0x37ee3b(0x1c2)](DataManager[_0x37ee3b(0x174)](this[_0x37ee3b(0x24a)]())),_0x2e08bd[_0x37ee3b(0x20b)]((_0x55ce94,_0x5c2bed,_0x2f8ce0)=>_0x2f8ce0[_0x37ee3b(0x2bf)](_0x55ce94)===_0x5c2bed);},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x381)]=Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1f2)],Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1f2)]=function(_0x3aa0c4){const _0x48ea7c=_0x4e22e6;if(this['canPierceElement']())return 0x0;const _0x28ec8c=_0x3aa0c4[_0x48ea7c(0x2f4)]();if(this['elements']()[_0x48ea7c(0x20b)](_0x1b88f7=>_0x28ec8c['includes'](_0x1b88f7))['length']>0x0){const _0x564638=this[_0x48ea7c(0x390)]()?this[_0x48ea7c(0x390)]()['getPiercedElements']():[];if(_0x28ec8c['some'](_0x280b22=>_0x564638[_0x48ea7c(0x23c)](_0x280b22)))return 0x0;if(this['canBypassElementReflect']())return 0x0;return 0x1;}return VisuMZ[_0x48ea7c(0x29e)][_0x48ea7c(0x381)][_0x48ea7c(0x16c)](this,_0x3aa0c4);},Game_Action['prototype'][_0x4e22e6(0x188)]=function(_0x1134bd){const _0x3ce46d=_0x4e22e6;let _0x2cb900=VisuMZ[_0x3ce46d(0x29e)][_0x3ce46d(0x1d3)][_0x3ce46d(0x38f)][_0x3ce46d(0x16f)][_0x3ce46d(0x16c)](this,_0x1134bd);const _0x2d73b=this[_0x3ce46d(0x390)]()?this[_0x3ce46d(0x390)]()[_0x3ce46d(0x335)]():[];return this[_0x3ce46d(0x378)]()[_0x3ce46d(0x193)](_0x4e9a91=>_0x2d73b[_0x3ce46d(0x23c)](_0x4e9a91))&&(_0x2cb900=Math[_0x3ce46d(0x2de)](0x1,_0x2cb900)),this[_0x3ce46d(0x316)]()&&(_0x2cb900=Math[_0x3ce46d(0x2de)](0x1,_0x2cb900)),_0x2cb900;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x2d4)]=function(_0x19d428,_0x563cf2){const _0xc41d41=_0x4e22e6,_0xa76610=this['elementRateRuling']();switch(_0xa76610){case'min':return this['elementsMinRate'](_0x19d428,_0x563cf2);break;case'multiply':return this[_0xc41d41(0x221)](_0x19d428,_0x563cf2);break;case _0xc41d41(0x35c):return this[_0xc41d41(0x2bb)](_0x19d428,_0x563cf2);break;case _0xc41d41(0x29d):return this[_0xc41d41(0x1c7)](_0x19d428,_0x563cf2);break;default:return this[_0xc41d41(0x394)](_0x19d428,_0x563cf2);break;}},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x344)]=function(){const _0x3f7fea=_0x4e22e6;if(this[_0x3f7fea(0x24a)]()[_0x3f7fea(0x14e)][_0x3f7fea(0x356)](/<MULTI-ELEMENT RULE:[ ](.*)>/i)){const _0x33a386=String(RegExp['$1'])[_0x3f7fea(0x24f)]()[_0x3f7fea(0x358)]();switch(_0x33a386){case _0x3f7fea(0x2de):case _0x3f7fea(0x297):case _0x3f7fea(0x27c):return'max';break;case _0x3f7fea(0x277):case'minimum':case _0x3f7fea(0x312):return _0x3f7fea(0x277);break;case _0x3f7fea(0x210):case'multiplicative':case _0x3f7fea(0x300):return _0x3f7fea(0x210);break;case _0x3f7fea(0x35c):case _0x3f7fea(0x195):case'sum':return _0x3f7fea(0x35c);break;case _0x3f7fea(0x29d):case _0x3f7fea(0x2c6):return _0x3f7fea(0x29d);break;}}return VisuMZ[_0x3f7fea(0x29e)][_0x3f7fea(0x1d3)][_0x3f7fea(0x38f)][_0x3f7fea(0x1d1)];},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x394)]=function(_0x264e36,_0x5d8652){const _0x120c3d=_0x4e22e6;if(_0x5d8652[_0x120c3d(0x355)]>0x0){if(VisuMZ[_0x120c3d(0x29e)]['Settings']['ElementRules'][_0x120c3d(0x243)])return VisuMZ[_0x120c3d(0x29e)][_0x120c3d(0x1d3)]['ElementRules'][_0x120c3d(0x243)][_0x120c3d(0x16c)](this,_0x264e36,_0x5d8652);const _0x16abd1=this[_0x120c3d(0x276)]()?[]:_0x264e36[_0x120c3d(0x15f)]();let _0x2baa69=-0x3e8;for(const _0x1c494f of _0x5d8652){const _0x4e9a0f=_0x16abd1[_0x120c3d(0x23c)](_0x1c494f)?-0x1:0x1;_0x2baa69=Math[_0x120c3d(0x2de)](_0x2baa69,_0x264e36[_0x120c3d(0x2c1)](_0x1c494f)*_0x4e9a0f);}return _0x2baa69;}else return 0x1;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x37f)]=function(_0x3ca1af,_0x4a2f3e){const _0x2fe638=_0x4e22e6;return _0x4a2f3e[_0x2fe638(0x355)]>0x0?VisuMZ[_0x2fe638(0x29e)][_0x2fe638(0x1d3)][_0x2fe638(0x38f)][_0x2fe638(0x235)][_0x2fe638(0x16c)](this,_0x3ca1af,_0x4a2f3e):0x1;},Game_Action['prototype'][_0x4e22e6(0x221)]=function(_0x2edce2,_0x4a5527){const _0x30338b=_0x4e22e6;return _0x4a5527['length']>0x0?VisuMZ[_0x30338b(0x29e)][_0x30338b(0x1d3)][_0x30338b(0x38f)][_0x30338b(0x1a9)][_0x30338b(0x16c)](this,_0x2edce2,_0x4a5527):0x1;},Game_Action[_0x4e22e6(0x35f)]['elementsRateSum']=function(_0x5760f4,_0x3f1610){const _0x5f4391=_0x4e22e6;return _0x3f1610['length']>0x0?VisuMZ['ElementStatusCore'][_0x5f4391(0x1d3)]['ElementRules'][_0x5f4391(0x189)][_0x5f4391(0x16c)](this,_0x5760f4,_0x3f1610):0x1;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1c7)]=function(_0x379b9c,_0x1c158c){const _0x561bb8=_0x4e22e6;return _0x1c158c['length']>0x0?VisuMZ[_0x561bb8(0x29e)]['Settings'][_0x561bb8(0x38f)]['RuleAverageCalcJS'][_0x561bb8(0x16c)](this,_0x379b9c,_0x1c158c):0x1;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x252)]=function(_0x408a6d,_0x45cb40){const _0x265ada=_0x4e22e6;if(_0x45cb40[_0x265ada(0x355)]<=0x0)return 0x0;return _0x45cb40[_0x265ada(0x254)]((_0x234acc,_0x1efc01)=>_0x234acc+this[_0x265ada(0x390)]()['getDealtElementPlus'](_0x1efc01),0x0);},Game_Action[_0x4e22e6(0x35f)]['calcUserElementDamageRate']=function(_0x3edd6f,_0x4e30fe){const _0x1ad63d=_0x4e22e6;if(_0x4e30fe[_0x1ad63d(0x355)]<=0x0)return 0x1;return _0x4e30fe[_0x1ad63d(0x254)]((_0x9913a,_0x17b6c5)=>_0x9913a*this['subject']()[_0x1ad63d(0x262)](_0x17b6c5),0x1);},Game_Action[_0x4e22e6(0x35f)]['calcUserElementDamageFlat']=function(_0x590d15,_0x54bfbe){const _0x27bf3b=_0x4e22e6;if(_0x54bfbe[_0x27bf3b(0x355)]<=0x0)return 0x0;return _0x54bfbe[_0x27bf3b(0x254)]((_0x1d3339,_0x3017c6)=>_0x1d3339+this['subject']()[_0x27bf3b(0x279)](_0x3017c6),0x0);},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x156)]=function(){const _0x431b2c=_0x4e22e6;if(!this[_0x431b2c(0x24a)]())return![];if(!this[_0x431b2c(0x24a)]()[_0x431b2c(0x14e)])return![];return this['item']()[_0x431b2c(0x14e)][_0x431b2c(0x356)](/<BYPASS ELEMENT REFLECT>/i);},Game_Action[_0x4e22e6(0x35f)]['canPierceElement']=function(){const _0x5444bb=_0x4e22e6;if(!this[_0x5444bb(0x24a)]())return![];if(!this[_0x5444bb(0x24a)]()[_0x5444bb(0x14e)])return![];return this['item']()[_0x5444bb(0x14e)]['match'](/<(?:ELEMENT |)PIERCE>/i);},VisuMZ['ElementStatusCore'][_0x4e22e6(0x17e)]=Game_Action['prototype']['itemHit'],Game_Action[_0x4e22e6(0x35f)]['itemHit']=function(_0x87790b){const _0x2bcfbf=_0x4e22e6;let _0xd0f426=VisuMZ['ElementStatusCore'][_0x2bcfbf(0x17e)][_0x2bcfbf(0x16c)](this,_0x87790b);if(Imported[_0x2bcfbf(0x29a)]){const _0x1fd9d8=this[_0x2bcfbf(0x24a)]()['note']||'';if(_0x1fd9d8['match'](/<ALWAYS HIT>/i))return 0x1;if(_0x1fd9d8[_0x2bcfbf(0x356)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;}return _0xd0f426*=this[_0x2bcfbf(0x1a7)](_0x87790b),_0xd0f426*=this['subject']()['traitHitRateMultipliersVs'](_0x87790b),_0xd0f426+=this[_0x2bcfbf(0x203)](_0x87790b),_0xd0f426+=this[_0x2bcfbf(0x390)]()['traitHitPlusMultipliersVs'](_0x87790b),_0xd0f426;},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x1f9)]=Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1c3)],Game_Action[_0x4e22e6(0x35f)]['itemCri']=function(_0x5c569b){const _0x340461=_0x4e22e6;let _0xf12a54=VisuMZ['ElementStatusCore'][_0x340461(0x1f9)][_0x340461(0x16c)](this,_0x5c569b);if(!this[_0x340461(0x24a)]()['damage'][_0x340461(0x21a)])return _0xf12a54;if(Imported[_0x340461(0x29a)]){const _0x31261a=this[_0x340461(0x24a)]()[_0x340461(0x14e)]||'';if(_0x31261a['match'](/<ALWAYS CRITICAL>/i))return 0x1;}return _0xf12a54*=this['traitCriticalRateMultipliersVs'](_0x5c569b),_0xf12a54*=this['subject']()[_0x340461(0x1ff)](_0x5c569b),_0xf12a54+=this[_0x340461(0x1a2)](_0x5c569b),_0xf12a54+=this[_0x340461(0x390)]()['traitCriticalPlusMultipliersVs'](_0x5c569b),_0xf12a54;},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x275)]=Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x19d)],Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x19d)]=function(_0x699997,_0x38b633){const _0x1edaab=_0x4e22e6;if(_0x38b633>0x0)_0x38b633*=this['traitDmgMultipliersVs'](_0x699997),_0x38b633*=this['subject']()['traitDmgMultipliersVs'](_0x699997),_0x38b633=Math[_0x1edaab(0x28b)](_0x38b633);else _0x38b633<0x0&&(_0x38b633*=this['traitHealMultipliersVs'](_0x699997),_0x38b633*=this[_0x1edaab(0x390)]()[_0x1edaab(0x267)](_0x699997),_0x38b633=Math[_0x1edaab(0x28b)](_0x38b633));return VisuMZ[_0x1edaab(0x29e)][_0x1edaab(0x275)][_0x1edaab(0x16c)](this,_0x699997,_0x38b633);},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x209)]=function(_0x3b2be1,_0x2a159d,_0xce87a5){const _0x20bea1=_0x4e22e6;let _0x390171=0x1;if(!_0x2a159d)return _0x390171;const _0x13d6d0=_0x2a159d['note']||'',_0x4ee4b9=_0x13d6d0[_0x20bea1(0x356)](_0xce87a5);if(_0x4ee4b9)for(const _0x422880 of _0x4ee4b9){_0x422880['match'](_0xce87a5);const _0xce64c3=String(RegExp['$1']),_0x145373=Number(RegExp['$2'])*0.01;_0x3b2be1[_0x20bea1(0x28f)](_0xce64c3)&&(_0x390171*=_0x145373);}return _0x390171;},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x14f)]=function(_0x161328,_0x2bdeb6,_0x3b4095){const _0x6d7742=_0x4e22e6;let _0x523820=0x0;if(!_0x2bdeb6)return _0x523820;const _0x3b1ac3=_0x2bdeb6[_0x6d7742(0x14e)]||'',_0x15a8df=_0x3b1ac3[_0x6d7742(0x356)](_0x3b4095);if(_0x15a8df)for(const _0xf09af7 of _0x15a8df){_0xf09af7['match'](_0x3b4095);const _0x4cd8d7=String(RegExp['$1']),_0x3010a=Number(RegExp['$2'])*0.01;_0x161328[_0x6d7742(0x28f)](_0x4cd8d7)&&(_0x523820+=_0x3010a);}return _0x523820;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x163)]=function(_0x213d5a){let _0x25dcfd=0x1;if(!_0x213d5a)return _0x25dcfd;const _0x55e162=/<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ['ElementStatusCore']['TraitCheckNotetagRate'](_0x213d5a,this['item'](),_0x55e162);},Game_BattlerBase['prototype'][_0x4e22e6(0x163)]=function(_0xf5609c){const _0x3b6e48=_0x4e22e6;let _0x44a43f=0x1;if(!_0xf5609c)return _0x44a43f;const _0x42daec=/<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x3a87e3=this[_0x3b6e48(0x22a)]();for(const _0x2d77ea of _0x3a87e3){_0x44a43f*=VisuMZ['ElementStatusCore'][_0x3b6e48(0x209)](_0xf5609c,_0x2d77ea,_0x42daec);}return _0x44a43f;},Game_Action['prototype'][_0x4e22e6(0x267)]=function(_0x102c80){const _0x4c3700=_0x4e22e6;let _0x40f2f1=0x1;if(!_0x102c80)return _0x40f2f1;const _0x253289=/<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ[_0x4c3700(0x29e)][_0x4c3700(0x209)](_0x102c80,this[_0x4c3700(0x24a)](),_0x253289);},Game_BattlerBase['prototype'][_0x4e22e6(0x267)]=function(_0x3ef64c){const _0x27e6ae=_0x4e22e6;let _0x53b42b=0x1;if(!_0x3ef64c)return _0x53b42b;const _0x473ce2=/<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x22b5c5=this[_0x27e6ae(0x22a)]();for(const _0x475c98 of _0x22b5c5){_0x53b42b*=VisuMZ[_0x27e6ae(0x29e)][_0x27e6ae(0x209)](_0x3ef64c,_0x475c98,_0x473ce2);}return _0x53b42b;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1a7)]=function(_0x3d30bd){const _0x1f2fe2=_0x4e22e6;let _0x3d850b=0x1;if(!_0x3d30bd)return _0x3d850b;const _0x59bf5c=/<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ[_0x1f2fe2(0x29e)][_0x1f2fe2(0x209)](_0x3d30bd,this[_0x1f2fe2(0x24a)](),_0x59bf5c);},Game_BattlerBase['prototype'][_0x4e22e6(0x1a7)]=function(_0x59bdee){const _0x5eda93=_0x4e22e6;let _0x5b8049=0x1;if(!_0x59bdee)return _0x5b8049;const _0x4c77ba=/<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x5bab4e=this[_0x5eda93(0x22a)]();for(const _0xb995ab of _0x5bab4e){_0x5b8049*=VisuMZ[_0x5eda93(0x29e)][_0x5eda93(0x209)](_0x59bdee,_0xb995ab,_0x4c77ba);}return _0x5b8049;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x203)]=function(_0x212835){const _0x2a3495=_0x4e22e6;let _0x2c7583=0x0;if(!_0x212835)return _0x2c7583;const _0x4748f7=/<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi;return VisuMZ[_0x2a3495(0x29e)][_0x2a3495(0x14f)](_0x212835,this['item'](),_0x4748f7);},Game_BattlerBase[_0x4e22e6(0x35f)]['traitHitPlusMultipliersVs']=function(_0x41295c){let _0x43ad96=0x0;if(!_0x41295c)return _0x43ad96;const _0x1c86b8=/<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi,_0x32ad5a=this['traitObjects']();for(const _0x3e3bfa of _0x32ad5a){_0x43ad96+=VisuMZ['ElementStatusCore']['TraitCheckNotetagPlus'](_0x41295c,_0x3e3bfa,_0x1c86b8);}return _0x43ad96;},Game_Action['prototype'][_0x4e22e6(0x1ff)]=function(_0x19d565){const _0x215dc6=_0x4e22e6;let _0x448324=0x1;if(!_0x19d565)return _0x448324;const _0x4934d9=/<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ[_0x215dc6(0x29e)]['TraitCheckNotetagRate'](_0x19d565,this[_0x215dc6(0x24a)](),_0x4934d9);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x1ff)]=function(_0x256f83){const _0x2c6e0b=_0x4e22e6;let _0xc596c=0x1;if(!_0x256f83)return _0xc596c;const _0x478faf=/<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x1ebfc4=this[_0x2c6e0b(0x22a)]();for(const _0x51d57d of _0x1ebfc4){_0xc596c*=VisuMZ[_0x2c6e0b(0x29e)][_0x2c6e0b(0x209)](_0x256f83,_0x51d57d,_0x478faf);}return _0xc596c;},Game_Action[_0x4e22e6(0x35f)][_0x4e22e6(0x1a2)]=function(_0x527d27){const _0x417966=_0x4e22e6;let _0x23e510=0x0;if(!_0x527d27)return _0x23e510;const _0x3d85ce=/<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi;return VisuMZ[_0x417966(0x29e)][_0x417966(0x14f)](_0x527d27,this[_0x417966(0x24a)](),_0x3d85ce);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x1a2)]=function(_0x1efa01){const _0x5b232a=_0x4e22e6;let _0x3e7ef5=0x0;if(!_0x1efa01)return _0x3e7ef5;const _0x4c79d3=/<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi,_0xade04=this[_0x5b232a(0x22a)]();for(const _0x4c466b of _0xade04){_0x3e7ef5+=VisuMZ[_0x5b232a(0x29e)][_0x5b232a(0x14f)](_0x1efa01,_0x4c466b,_0x4c79d3);}return _0x3e7ef5;},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x248)]=Game_BattlerBase[_0x4e22e6(0x35f)]['initMembers'],Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x374)]=function(){const _0x41ef9d=_0x4e22e6;this[_0x41ef9d(0x392)]={},VisuMZ[_0x41ef9d(0x29e)][_0x41ef9d(0x248)][_0x41ef9d(0x16c)](this);},VisuMZ[_0x4e22e6(0x29e)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x4e22e6(0x35f)]['refresh'],Game_BattlerBase[_0x4e22e6(0x35f)]['refresh']=function(){const _0x3d48eb=_0x4e22e6;this[_0x3d48eb(0x392)]={},this[_0x3d48eb(0x16a)]=this[_0x3d48eb(0x16a)]['clamp'](0x0,this[_0x3d48eb(0x292)]()),VisuMZ[_0x3d48eb(0x29e)]['Game_BattlerBase_refresh'][_0x3d48eb(0x16c)](this);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x21b)]=function(_0x5d2c33){const _0x368fe1=_0x4e22e6;return this[_0x368fe1(0x392)]=this['_cache']||{},this[_0x368fe1(0x392)][_0x5d2c33]!==undefined;},Game_BattlerBase['prototype'][_0x4e22e6(0x291)]=function(){const _0x11818a=_0x4e22e6;this[_0x11818a(0x325)]={};const _0x1de49b=this[_0x11818a(0x166)]();for(const _0x4c9410 of _0x1de49b){this[_0x11818a(0x325)][_0x4c9410]='';}this['applyRandomTraitSets'](),this[_0x11818a(0x232)]();},Game_BattlerBase['prototype'][_0x4e22e6(0x251)]=function(){},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x232)]=function(){const _0x5a456d=_0x4e22e6,_0x36e051=this[_0x5a456d(0x37d)]();DataManager[_0x5a456d(0x286)](this[_0x5a456d(0x325)],_0x36e051);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x37d)]=function(){return null;},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x166)]=function(){const _0x220caf=_0x4e22e6;return['Element',_0x220caf(0x32c),_0x220caf(0x34a),_0x220caf(0x383),_0x220caf(0x2f6),_0x220caf(0x1e5),'Blessing',_0x220caf(0x280),_0x220caf(0x2c0),_0x220caf(0x169)];},Game_BattlerBase['prototype'][_0x4e22e6(0x26f)]=function(_0x276a3d){const _0x53de78=_0x4e22e6;if(this['_traitSets']===undefined)this[_0x53de78(0x291)]();if(this['_traitSets'][_0x276a3d]===undefined)this['initElementStatusCore']();return this[_0x53de78(0x325)][_0x276a3d];},Game_BattlerBase[_0x4e22e6(0x35f)]['setTraitSet']=function(_0x1ecec7,_0xa12fb3){const _0x3721eb=_0x4e22e6;if(this[_0x3721eb(0x325)]===undefined)this['initElementStatusCore']();if(this[_0x3721eb(0x325)][_0x1ecec7]===undefined)this['initElementStatusCore']();this['_traitSets'][_0x1ecec7]=_0xa12fb3,this[_0x3721eb(0x16e)]();},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x23f)]=function(_0x5e3a16){const _0x2c9ca=_0x4e22e6;if(this['_traitSets']===undefined)this[_0x2c9ca(0x291)]();if(this[_0x2c9ca(0x325)][_0x5e3a16]===undefined)this['initElementStatusCore']();const _0x22ca72=this['_traitSets'][_0x5e3a16];return DataManager[_0x2c9ca(0x23f)](_0x5e3a16,_0x22ca72);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x2eb)]=function(){const _0x4e8c91=_0x4e22e6;if($gameTemp['isPlaytest']()){console[_0x4e8c91(0x179)]('===\x20%1\x27s\x20Trait\x20Sets\x20==='['format'](this[_0x4e8c91(0x24e)]()));for(const _0x561882 in this[_0x4e8c91(0x325)]){console[_0x4e8c91(0x179)]('%1:\x20%2'['format'](_0x561882,this[_0x4e8c91(0x325)][_0x561882]));}console['log'](_0x4e8c91(0x17b));}},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x1eb)]=function(_0xe1c310){const _0x2e4a14=_0x4e22e6;this[_0x2e4a14(0x325)][_0xe1c310]=DataManager['getRandomTraitSetFromList'](_0xe1c310),!this[_0x2e4a14(0x33d)]&&this['refresh']();},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x2e9)]=Game_BattlerBase['prototype'][_0x4e22e6(0x16d)],Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x16d)]=function(_0x589d33){const _0x267690=_0x4e22e6;return VisuMZ[_0x267690(0x29e)]['Game_BattlerBase_canEquip'][_0x267690(0x16c)](this,_0x589d33)&&this[_0x267690(0x1bb)](_0x589d33);},Game_BattlerBase[_0x4e22e6(0x35f)]['meetsEquipTraitRequirements']=function(_0x3a71d2){const _0x1063fb=_0x4e22e6;if(!_0x3a71d2)return!![];if(_0x3a71d2['note'][_0x1063fb(0x356)](/<EQUIP TRAIT (?:REQUIREMENT|REQUIREMENTS):[ ](.*)>/i)){const _0x8f9325=this[_0x1063fb(0x166)](),_0x3db699=String(RegExp['$1'])['split'](',')[_0x1063fb(0x31c)](_0x42fd13=>_0x42fd13[_0x1063fb(0x15d)]()[_0x1063fb(0x24f)]());for(const _0x29d615 of _0x3db699){if(_0x8f9325[_0x1063fb(0x193)](_0x430fb6=>this[_0x1063fb(0x26f)](_0x430fb6)[_0x1063fb(0x15d)]()[_0x1063fb(0x24f)]()===_0x29d615))continue;return![];}}return!![];},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x28f)]=function(_0x59ccbf){const _0x3ceef9=_0x4e22e6;_0x59ccbf=_0x59ccbf['toUpperCase']();const _0x43d571=this['getTraitSetKeys']();return _0x43d571['some'](_0x256fca=>this[_0x3ceef9(0x26f)](_0x256fca)[_0x3ceef9(0x15d)]()[_0x3ceef9(0x24f)]()===_0x59ccbf);},VisuMZ[_0x4e22e6(0x29e)]['Game_BattlerBase_elementRate']=Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x2c1)],Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x2c1)]=function(_0x5e9587){const _0x892d0c=_0x4e22e6;if(_0x5e9587<=0x0)return 0x1;const _0xff75f='Element-%1'['format'](_0x5e9587);if(this[_0x892d0c(0x21b)](_0xff75f))return this[_0x892d0c(0x392)][_0xff75f];const _0x386c03=this[_0x892d0c(0x23b)](_0x5e9587);return _0x386c03===![]?this['_cache'][_0xff75f]=VisuMZ[_0x892d0c(0x29e)]['Settings'][_0x892d0c(0x38f)][_0x892d0c(0x288)][_0x892d0c(0x16c)](this,_0x5e9587):this[_0x892d0c(0x392)][_0xff75f]=_0x386c03,this['_cache'][_0xff75f];},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x23b)]=function(_0x4fdf4e){const _0x39702f=_0x4e22e6,_0x322984=VisuMZ[_0x39702f(0x29e)][_0x39702f(0x263)];for(const _0x3127ba of this[_0x39702f(0x22a)]()){if(!_0x3127ba)continue;const _0xd46af5=_0x3127ba[_0x39702f(0x14e)];if(_0xd46af5[_0x39702f(0x356)](_0x322984['EleForcePer'][_0x4fdf4e]))return Number(RegExp['$1'])/0x64;else{if(_0xd46af5[_0x39702f(0x356)](_0x322984[_0x39702f(0x33f)][_0x4fdf4e]))Number(RegExp['$1']);else{if(_0xd46af5[_0x39702f(0x356)](_0x322984['EleForceJS'][_0x4fdf4e])){var _0x4d701b=String(RegExp['$1']);try{return eval(_0x4d701b);}catch(_0x4fefa6){if($gameTemp[_0x39702f(0x18a)]())console[_0x39702f(0x179)](_0x4fefa6);return![];}}}}}return![];},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x1d9)]=function(_0x14b3db){const _0x9e4398=_0x4e22e6,_0x1d2db1=VisuMZ['ElementStatusCore'][_0x9e4398(0x263)],_0x2f159a=(_0xad2b9f,_0x565039)=>{const _0x9bbc10=_0x9e4398;if(!_0x565039)return _0xad2b9f;const _0x2311f5=_0x565039[_0x9bbc10(0x14e)];if(_0x2311f5[_0x9bbc10(0x356)](_0x1d2db1['EleRecPlusPer'][_0x14b3db])){var _0x30ac33=Number(RegExp['$1'])/0x64;_0xad2b9f+=_0x30ac33;}if(_0x2311f5[_0x9bbc10(0x356)](_0x1d2db1[_0x9bbc10(0x1dd)][_0x14b3db])){var _0x30ac33=Number(RegExp['$1']);_0xad2b9f+=_0x30ac33;}if(_0x2311f5[_0x9bbc10(0x356)](_0x1d2db1['EleRecPlusJS'][_0x14b3db])){var _0x24d119=String(RegExp['$1']);try{_0xad2b9f+=eval(_0x24d119);}catch(_0x265a10){if($gameTemp['isPlaytest']())console[_0x9bbc10(0x179)](_0x265a10);}}return _0xad2b9f;};return this[_0x9e4398(0x22a)]()[_0x9e4398(0x254)](_0x2f159a,0x0);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x375)]=function(_0x5e075d){const _0x5e9d95=_0x4e22e6;let _0x1e9612=VisuMZ['ElementStatusCore'][_0x5e9d95(0x2b1)][_0x5e9d95(0x16c)](this,_0x5e075d);const _0x629aa7=this[_0x5e9d95(0x166)](),_0x71078f='Element%1'[_0x5e9d95(0x18d)](_0x5e075d);for(const _0x2cfc87 of _0x629aa7){const _0x364dde=this[_0x5e9d95(0x26f)](_0x2cfc87),_0x249533=DataManager['traitSet'](_0x2cfc87,_0x364dde);_0x1e9612*=_0x249533[_0x5e9d95(0x37e)][_0x71078f]??0x1;}const _0x498fc5=VisuMZ['ElementStatusCore']['RegExp'],_0x12a90f=(_0x23eed6,_0x50966e)=>{const _0x3bf6ed=_0x5e9d95;if(!_0x50966e)return _0x23eed6;const _0x2320b1=_0x50966e[_0x3bf6ed(0x14e)];if(_0x2320b1[_0x3bf6ed(0x356)](_0x498fc5[_0x3bf6ed(0x1c5)][_0x5e075d])){var _0x3f5953=Number(RegExp['$1'])/0x64;_0x23eed6*=_0x3f5953;}if(_0x2320b1['match'](_0x498fc5[_0x3bf6ed(0x196)][_0x5e075d])){var _0x3f5953=Number(RegExp['$1']);_0x23eed6*=_0x3f5953;}if(_0x2320b1[_0x3bf6ed(0x356)](_0x498fc5[_0x3bf6ed(0x2d8)][_0x5e075d])){var _0xd2c36c=String(RegExp['$1']);try{_0x23eed6*=eval(_0xd2c36c);}catch(_0xdafb11){if($gameTemp[_0x3bf6ed(0x18a)]())console[_0x3bf6ed(0x179)](_0xdafb11);}}return _0x23eed6;};return this[_0x5e9d95(0x22a)]()[_0x5e9d95(0x254)](_0x12a90f,_0x1e9612);},Game_BattlerBase['prototype'][_0x4e22e6(0x2a7)]=function(_0x200e16){const _0x5395c3=_0x4e22e6,_0x3ba781=VisuMZ['ElementStatusCore'][_0x5395c3(0x263)],_0x361965=(_0x18d85d,_0x863b45)=>{const _0x1b7eaa=_0x5395c3;if(!_0x863b45)return _0x18d85d;const _0x539603=_0x863b45[_0x1b7eaa(0x14e)];if(_0x539603[_0x1b7eaa(0x356)](_0x3ba781['EleRecFlatPer'][_0x200e16])){var _0x250036=Number(RegExp['$1'])/0x64;_0x18d85d+=_0x250036;}if(_0x539603['match'](_0x3ba781[_0x1b7eaa(0x2bc)][_0x200e16])){var _0x250036=Number(RegExp['$1']);_0x18d85d+=_0x250036;}if(_0x539603['match'](_0x3ba781[_0x1b7eaa(0x307)][_0x200e16])){var _0x33a054=String(RegExp['$1']);try{_0x18d85d+=eval(_0x33a054);}catch(_0x53ceba){if($gameTemp[_0x1b7eaa(0x18a)]())console[_0x1b7eaa(0x179)](_0x53ceba);}}return _0x18d85d;};return this['traitObjects']()[_0x5395c3(0x254)](_0x361965,0x0);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x253)]=function(_0x3ddb23){const _0x31c6d3=_0x4e22e6,_0x180511=VisuMZ[_0x31c6d3(0x29e)][_0x31c6d3(0x263)],_0x3be794=(_0x43061c,_0x2ee858)=>{const _0x51e173=_0x31c6d3;if(!_0x2ee858)return _0x43061c;const _0x5df434=_0x2ee858['note'];if(_0x5df434[_0x51e173(0x356)](_0x180511[_0x51e173(0x1e8)][_0x3ddb23])){var _0x5e7057=Number(RegExp['$1'])/0x64;_0x43061c+=_0x5e7057;}if(_0x5df434['match'](_0x180511[_0x51e173(0x226)][_0x3ddb23])){var _0x5e7057=Number(RegExp['$1']);console[_0x51e173(0x179)](_0x180511[_0x51e173(0x226)][_0x3ddb23],_0x5e7057),_0x43061c+=_0x5e7057;}if(_0x5df434[_0x51e173(0x356)](_0x180511[_0x51e173(0x190)][_0x3ddb23])){var _0xeb61ef=String(RegExp['$1']);try{_0x43061c+=eval(_0xeb61ef);}catch(_0x29fc9d){if($gameTemp[_0x51e173(0x18a)]())console[_0x51e173(0x179)](_0x29fc9d);}}return _0x43061c;};return this['traitObjects']()[_0x31c6d3(0x254)](_0x3be794,0x0);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x262)]=function(_0x745279){const _0x26b243=_0x4e22e6,_0x1c5943=VisuMZ[_0x26b243(0x29e)][_0x26b243(0x263)],_0x172d14=(_0x4c707e,_0x33c6f0)=>{const _0xa5fc9a=_0x26b243;if(!_0x33c6f0)return _0x4c707e;const _0x2375e5=_0x33c6f0[_0xa5fc9a(0x14e)];if(_0x2375e5[_0xa5fc9a(0x356)](_0x1c5943[_0xa5fc9a(0x33b)][_0x745279])){var _0x9d2b8f=Number(RegExp['$1'])/0x64;_0x4c707e*=_0x9d2b8f;}if(_0x2375e5['match'](_0x1c5943[_0xa5fc9a(0x314)][_0x745279])){var _0x9d2b8f=Number(RegExp['$1']);_0x4c707e*=_0x9d2b8f;}if(_0x2375e5[_0xa5fc9a(0x356)](_0x1c5943[_0xa5fc9a(0x380)][_0x745279])){var _0x343a40=String(RegExp['$1']);try{_0x4c707e*=eval(_0x343a40);}catch(_0x37fddb){if($gameTemp[_0xa5fc9a(0x18a)]())console['log'](_0x37fddb);}}return _0x4c707e;};return this[_0x26b243(0x22a)]()['reduce'](_0x172d14,0x1);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x279)]=function(_0x242163){const _0x24cdfd=_0x4e22e6,_0x4a221c=VisuMZ[_0x24cdfd(0x29e)][_0x24cdfd(0x263)],_0x1afc54=(_0x3caa5c,_0x1a2911)=>{const _0x39fdf7=_0x24cdfd;if(!_0x1a2911)return _0x3caa5c;const _0x450d1f=_0x1a2911[_0x39fdf7(0x14e)];if(_0x450d1f[_0x39fdf7(0x356)](_0x4a221c[_0x39fdf7(0x19a)][_0x242163])){var _0x4e3037=Number(RegExp['$1'])/0x64;_0x3caa5c+=_0x4e3037;}if(_0x450d1f[_0x39fdf7(0x356)](_0x4a221c[_0x39fdf7(0x330)][_0x242163])){var _0x4e3037=Number(RegExp['$1']);_0x3caa5c+=_0x4e3037;}if(_0x450d1f['match'](_0x4a221c['EleDmgFlatJS'][_0x242163])){var _0x99737d=String(RegExp['$1']);try{_0x3caa5c+=eval(_0x99737d);}catch(_0x47d1f4){if($gameTemp[_0x39fdf7(0x18a)]())console['log'](_0x47d1f4);}}return _0x3caa5c;};return this[_0x24cdfd(0x22a)]()[_0x24cdfd(0x254)](_0x1afc54,0x0);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x15f)]=function(){const _0x2b88fd=_0x4e22e6;let _0x15b50f=[];for(const _0x151872 of this[_0x2b88fd(0x22a)]()){if(!_0x151872)continue;const _0x1de6aa=_0x151872[_0x2b88fd(0x14e)][_0x2b88fd(0x356)](/<ELEMENT ABSORB:[ ](.*)>/gi);if(_0x1de6aa)for(const _0x2098f0 of _0x1de6aa){_0x2098f0[_0x2b88fd(0x356)](/<ELEMENT ABSORB:[ ](.*)>/i);const _0x2555ab=RegExp['$1'];if(_0x2555ab[_0x2b88fd(0x356)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x43b0d9=JSON['parse']('['+RegExp['$1'][_0x2b88fd(0x356)](/\d+/g)+']');_0x15b50f=_0x15b50f[_0x2b88fd(0x1c2)](_0x43b0d9);}else{const _0x253a0b=_0x2555ab[_0x2b88fd(0x25c)](',');for(const _0x412d1d of _0x253a0b){const _0x289207=DataManager[_0x2b88fd(0x265)](_0x412d1d);if(_0x289207)_0x15b50f['push'](_0x289207);}}}}return _0x15b50f;},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x2f4)]=function(){const _0x19f34c=_0x4e22e6;let _0x3b8613=[];for(const _0x17e37e of this[_0x19f34c(0x22a)]()){if(!_0x17e37e)continue;const _0x4205d9=_0x17e37e['note']['match'](/<ELEMENT REFLECT:[ ](.*)>/gi);if(_0x4205d9)for(const _0x18a15 of _0x4205d9){_0x18a15[_0x19f34c(0x356)](/<ELEMENT REFLECT:[ ](.*)>/i);const _0x832849=RegExp['$1'];if(_0x832849[_0x19f34c(0x356)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x471bbb=JSON[_0x19f34c(0x2c4)]('['+RegExp['$1'][_0x19f34c(0x356)](/\d+/g)+']');_0x3b8613=_0x3b8613['concat'](_0x471bbb);}else{const _0x4ad831=_0x832849[_0x19f34c(0x25c)](',');for(const _0x4f37b6 of _0x4ad831){const _0x30ef87=DataManager[_0x19f34c(0x265)](_0x4f37b6);if(_0x30ef87)_0x3b8613['push'](_0x30ef87);}}}}return _0x3b8613;},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x335)]=function(){const _0x21cfa8=_0x4e22e6;let _0x4eedf9=[];for(const _0x4143da of this['traitObjects']()){if(!_0x4143da)continue;const _0x18bb1c=_0x4143da[_0x21cfa8(0x14e)][_0x21cfa8(0x356)](/<ELEMENT PIERCE:[ ](.*)>/gi);if(_0x18bb1c)for(const _0x24354a of _0x18bb1c){_0x24354a[_0x21cfa8(0x356)](/<ELEMENT PIERCE:[ ](.*)>/i);const _0x303fb5=RegExp['$1'];if(_0x303fb5[_0x21cfa8(0x356)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x4f8ff8=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');_0x4eedf9=_0x4eedf9[_0x21cfa8(0x1c2)](_0x4f8ff8);}else{const _0x1e7cb1=_0x303fb5[_0x21cfa8(0x25c)](',');for(const _0x5d782f of _0x1e7cb1){const _0x3e1f0c=DataManager[_0x21cfa8(0x265)](_0x5d782f);if(_0x3e1f0c)_0x4eedf9[_0x21cfa8(0x273)](_0x3e1f0c);}}}}return _0x4eedf9;},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x25f)]=function(){const _0x49d7bc=_0x4e22e6;for(const _0x2b43b5 of this[_0x49d7bc(0x22a)]()){if(!_0x2b43b5)continue;if(_0x2b43b5[_0x49d7bc(0x14e)]['match'](/<FORCE ACTION ELEMENT:[ ]NULL>/i))return!![];}return![];},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x30d)]=function(){const _0x4ab065=_0x4e22e6;for(const _0x1f90cb of this[_0x4ab065(0x22a)]()){if(!_0x1f90cb)continue;if(_0x1f90cb[_0x4ab065(0x14e)][_0x4ab065(0x356)](/<FORCE ACTION ELEMENT:[ ](.*)>/i)){const _0x15fa33=RegExp['$1'];if(_0x15fa33[_0x4ab065(0x356)](/(\d+(?:\s*,\s*\d+)*)/i))return JSON[_0x4ab065(0x2c4)]('['+RegExp['$1'][_0x4ab065(0x356)](/\d+/g)+']');else{const _0xa28f2b=_0x15fa33[_0x4ab065(0x25c)](',');let _0x5ce2f5=[];for(const _0x3f41a1 of _0xa28f2b){const _0x417fa3=DataManager['getElementIdWithName'](_0x3f41a1);if(_0x417fa3)_0x5ce2f5['push'](_0x417fa3);}return _0x5ce2f5;}}}return[];},VisuMZ['ElementStatusCore'][_0x4e22e6(0x1f6)]=Game_BattlerBase['prototype']['paramRate'],Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x157)]=function(_0x457199){const _0x21696f=_0x4e22e6;let _0x37c01d=VisuMZ[_0x21696f(0x29e)][_0x21696f(0x1f6)][_0x21696f(0x16c)](this,_0x457199);return this[_0x21696f(0x247)](_0x457199,_0x37c01d);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x247)]=function(_0x5f2a5b,_0xa94978){const _0x1a2eae=_0x4e22e6;if(!DataManager['traitSetsEnabled']())return _0xa94978;const _0x119bf3=this[_0x1a2eae(0x166)](),_0x34b9d2=_0x1a2eae(0x2e3)[_0x1a2eae(0x18d)](_0x5f2a5b);for(const _0x1a2b6c of _0x119bf3){const _0x1a51d3=this[_0x1a2eae(0x26f)](_0x1a2b6c),_0x27039d=DataManager['traitSet'](_0x1a2b6c,_0x1a51d3);_0xa94978*=_0x27039d[_0x1a2eae(0x258)][_0x34b9d2]??0x1;}return _0xa94978;},VisuMZ[_0x4e22e6(0x29e)]['Game_BattlerBase_xparam']=Game_BattlerBase[_0x4e22e6(0x35f)]['xparam'],Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x31e)]=function(_0x40dcfb){const _0x397fc3=_0x4e22e6;let _0x45adef=VisuMZ[_0x397fc3(0x29e)][_0x397fc3(0x1db)]['call'](this,_0x40dcfb);if(Imported[_0x397fc3(0x256)])return _0x45adef;return this[_0x397fc3(0x18f)](_0x40dcfb,_0x45adef);},Game_BattlerBase[_0x4e22e6(0x35f)]['xparamRateTraitSets']=function(_0x1efd79,_0x3f2bd7){const _0x98b85a=_0x4e22e6;if(!DataManager[_0x98b85a(0x228)]())return _0x3f2bd7;const _0x915742=this[_0x98b85a(0x166)](),_0xd50687=_0x98b85a(0x28e)[_0x98b85a(0x18d)](_0x1efd79);for(const _0x18f5ea of _0x915742){const _0x41cae4=this['getTraitSet'](_0x18f5ea),_0x4e48eb=DataManager[_0x98b85a(0x23f)](_0x18f5ea,_0x41cae4);_0x3f2bd7+=_0x4e48eb[_0x98b85a(0x1e1)][_0xd50687]||0x0;}return _0x3f2bd7;},VisuMZ['ElementStatusCore']['Game_BattlerBase_sparam']=Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x1cc)],Game_BattlerBase['prototype'][_0x4e22e6(0x1cc)]=function(_0x37cf99){const _0xe7acf2=_0x4e22e6;let _0x1815ea=VisuMZ['ElementStatusCore'][_0xe7acf2(0x182)][_0xe7acf2(0x16c)](this,_0x37cf99);if(Imported[_0xe7acf2(0x256)])return _0x1815ea;return this[_0xe7acf2(0x31b)](_0x37cf99,_0x1815ea);},Game_BattlerBase['prototype'][_0x4e22e6(0x31b)]=function(_0x32601c,_0x14f069){const _0x21d53b=_0x4e22e6;if(!DataManager['traitSetsEnabled']())return _0x14f069;const _0xf334be=this[_0x21d53b(0x166)](),_0x2c300c=_0x21d53b(0x180)['format'](_0x32601c);for(const _0x1d49aa of _0xf334be){const _0x3c1183=this['getTraitSet'](_0x1d49aa),_0x48829b=DataManager[_0x21d53b(0x23f)](_0x1d49aa,_0x3c1183);_0x14f069*=_0x48829b['SParams'][_0x2c300c]??0x1;}return _0x14f069;};Imported[_0x4e22e6(0x256)]&&(VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x199)]=Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x191)],Game_BattlerBase['prototype']['xparamPlus']=function(_0x2cfffe){const _0x3ddcb0=_0x4e22e6;let _0x52fafa=VisuMZ[_0x3ddcb0(0x29e)][_0x3ddcb0(0x199)][_0x3ddcb0(0x16c)](this,_0x2cfffe);return _0x52fafa=this[_0x3ddcb0(0x18f)](_0x2cfffe,_0x52fafa),_0x52fafa;},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x283)]=Game_BattlerBase['prototype'][_0x4e22e6(0x2be)],Game_BattlerBase['prototype']['sparamRate']=function(_0x4317cc){const _0x2a53a3=_0x4e22e6;let _0x441776=VisuMZ[_0x2a53a3(0x29e)][_0x2a53a3(0x283)]['call'](this,_0x4317cc);return _0x441776=this[_0x2a53a3(0x31b)](_0x4317cc,_0x441776),_0x441776;});;Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x2b2)]=function(_0x59c70f){const _0x3868c7=_0x4e22e6,_0x7901e0=_0x3868c7(0x2c9);if(this['checkCacheKey'](_0x7901e0))return this['_cache'][_0x7901e0]['includes'](_0x59c70f);const _0x280ae9=this[_0x3868c7(0x2e8)](Game_BattlerBase[_0x3868c7(0x1e4)]),_0x2da4eb=this[_0x3868c7(0x198)]();return this['_cache'][_0x7901e0]=_0x280ae9[_0x3868c7(0x1c2)](_0x2da4eb),this[_0x3868c7(0x392)][_0x7901e0][_0x3868c7(0x23c)](_0x59c70f);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x198)]=function(){const _0x3ee0a7=_0x4e22e6;if(!DataManager[_0x3ee0a7(0x228)]())return[];let _0x556ae6=[];const _0x505c3a=this['getTraitSetKeys']();for(const _0x406836 of _0x505c3a){const _0x13f0fb=this[_0x3ee0a7(0x26f)](_0x406836),_0x47f227=DataManager['traitSet'](_0x406836,_0x13f0fb);_0x556ae6=_0x556ae6[_0x3ee0a7(0x1c2)](_0x47f227[_0x3ee0a7(0x1c8)]);}return _0x556ae6;},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x332)]=function(_0x3fd8d7){const _0x3b7e6e=_0x4e22e6,_0x173bee='AtypeOk';if(this[_0x3b7e6e(0x21b)](_0x173bee))return this[_0x3b7e6e(0x392)][_0x173bee][_0x3b7e6e(0x23c)](_0x3fd8d7);const _0x4f4cd0=this[_0x3b7e6e(0x2e8)](Game_BattlerBase[_0x3b7e6e(0x204)]),_0x1e6619=this[_0x3b7e6e(0x1cb)]();return this[_0x3b7e6e(0x392)][_0x173bee]=_0x4f4cd0[_0x3b7e6e(0x1c2)](_0x1e6619),this['_cache'][_0x173bee][_0x3b7e6e(0x23c)](_0x3fd8d7);},Game_BattlerBase[_0x4e22e6(0x35f)][_0x4e22e6(0x1cb)]=function(){const _0x3ebb7c=_0x4e22e6;if(!DataManager[_0x3ebb7c(0x228)]())return[];let _0x2d181c=[];const _0x7b4710=this['getTraitSetKeys']();for(const _0xa63c09 of _0x7b4710){const _0x5e1031=this[_0x3ebb7c(0x26f)](_0xa63c09),_0xa6a0f6=DataManager[_0x3ebb7c(0x23f)](_0xa63c09,_0x5e1031);_0x2d181c=_0x2d181c[_0x3ebb7c(0x1c2)](_0xa6a0f6[_0x3ebb7c(0x324)]);}return _0x2d181c;},Game_BattlerBase['prototype'][_0x4e22e6(0x398)]=function(){const _0x59b32d=_0x4e22e6;if(!DataManager[_0x59b32d(0x228)]())return[];this['_addingPassiveStateTraitSets']=!![],this[_0x59b32d(0x392)]['passiveStates']=this[_0x59b32d(0x392)][_0x59b32d(0x2d6)]||[];const _0x300cdf=this[_0x59b32d(0x166)]();for(const _0x3348ca of _0x300cdf){const _0x274b76=this[_0x59b32d(0x26f)](_0x3348ca),_0x41a6c1=DataManager['traitSet'](_0x3348ca,_0x274b76);this['_cache'][_0x59b32d(0x2d6)]=this[_0x59b32d(0x392)][_0x59b32d(0x2d6)][_0x59b32d(0x1c2)](_0x41a6c1['PassiveStates']);}this[_0x59b32d(0x33d)]=undefined;},Game_Actor[_0x4e22e6(0x35f)][_0x4e22e6(0x37d)]=function(){const _0x12213e=_0x4e22e6;return this[_0x12213e(0x1df)]();},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x250)]=Game_Actor[_0x4e22e6(0x35f)][_0x4e22e6(0x264)],Game_Actor[_0x4e22e6(0x35f)]['setup']=function(_0x245a7a){const _0x41dd8d=_0x4e22e6;VisuMZ[_0x41dd8d(0x29e)][_0x41dd8d(0x250)][_0x41dd8d(0x16c)](this,_0x245a7a),this[_0x41dd8d(0x291)](),this[_0x41dd8d(0x326)]();},Game_Actor[_0x4e22e6(0x35f)][_0x4e22e6(0x291)]=function(){const _0x3b2f30=_0x4e22e6;Game_Battler[_0x3b2f30(0x35f)][_0x3b2f30(0x291)][_0x3b2f30(0x16c)](this),this[_0x3b2f30(0x237)]();},Game_Actor[_0x4e22e6(0x35f)][_0x4e22e6(0x251)]=function(){const _0x547d68=_0x4e22e6;if(this[_0x547d68(0x1df)]()[_0x547d68(0x14e)][_0x547d68(0x356)](/<NO RANDOM TRAIT SETS>/i))return;const _0x137bc6=this[_0x547d68(0x166)](),_0x1a8a76=VisuMZ['ElementStatusCore'][_0x547d68(0x1d3)];for(const _0x45e7d0 of _0x137bc6){_0x1a8a76[_0x547d68(0x2cf)]&&this['createRandomTraitSet'](_0x45e7d0);}},Game_Actor[_0x4e22e6(0x35f)][_0x4e22e6(0x237)]=function(){const _0xd5a69a=_0x4e22e6;this[_0xd5a69a(0x377)]=this['profile'](),this[_0xd5a69a(0x1df)]()[_0xd5a69a(0x14e)]['match'](/<BIOGRAPHY>\s*([\s\S]*)\s*<\/BIOGRAPHY>/i)&&this['setBiography'](RegExp['$1']);},Game_Actor['prototype']['getBiography']=function(){const _0x574191=_0x4e22e6;if(this[_0x574191(0x377)]===undefined)this['initBiography']();return this[_0x574191(0x377)];},Game_Actor[_0x4e22e6(0x35f)][_0x4e22e6(0x20e)]=function(_0x1d7ddc){const _0x1d2c5c=_0x4e22e6;if(this[_0x1d2c5c(0x377)]===undefined)this[_0x1d2c5c(0x237)]();this['_biography']=_0x1d7ddc;},Game_Actor['prototype'][_0x4e22e6(0x227)]=function(){const _0x351d92=_0x4e22e6,_0x58fa21=this[_0x351d92(0x2e8)](Game_BattlerBase['TRAIT_EQUIP_WTYPE'])[_0x351d92(0x217)]((_0x34bf7c,_0x5dcc0b)=>_0x34bf7c-_0x5dcc0b);return _0x58fa21[_0x351d92(0x20b)]((_0x43faf4,_0xd269bb,_0x2d88cd)=>_0x2d88cd[_0x351d92(0x2bf)](_0x43faf4)===_0xd269bb);},Game_Actor[_0x4e22e6(0x35f)][_0x4e22e6(0x1ce)]=function(){const _0x52b540=_0x4e22e6,_0x424b7e=this[_0x52b540(0x2e8)](Game_BattlerBase['TRAIT_EQUIP_ATYPE'])[_0x52b540(0x217)]((_0x3df49d,_0xfedda7)=>_0x3df49d-_0xfedda7);return _0x424b7e[_0x52b540(0x20b)]((_0x5478e7,_0x29507e,_0x1611bd)=>_0x1611bd[_0x52b540(0x2bf)](_0x5478e7)===_0x29507e);},Game_Enemy[_0x4e22e6(0x35f)]['getTraitSetObject']=function(){return this['enemy']();},VisuMZ['ElementStatusCore'][_0x4e22e6(0x1ec)]=Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x264)],Game_Enemy['prototype']['setup']=function(_0x57e1de,_0x50b539,_0x20b97c){const _0x4c69be=_0x4e22e6;VisuMZ[_0x4c69be(0x29e)][_0x4c69be(0x1ec)]['call'](this,_0x57e1de,_0x50b539,_0x20b97c),!Imported[_0x4c69be(0x29a)]&&this[_0x4c69be(0x291)](),this[_0x4c69be(0x16e)](),this['recoverAll']();},Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x291)]=function(){const _0x1cb942=_0x4e22e6;Game_Battler['prototype'][_0x1cb942(0x291)][_0x1cb942(0x16c)](this),this[_0x1cb942(0x2b3)]();},Game_Enemy[_0x4e22e6(0x35f)]['applyRandomTraitSets']=function(){const _0x1bfa56=_0x4e22e6;if(this[_0x1bfa56(0x38e)]()[_0x1bfa56(0x14e)][_0x1bfa56(0x356)](/<NO RANDOM TRAIT SETS>/i))return;const _0x18e217=this[_0x1bfa56(0x166)](),_0x115fa0=VisuMZ[_0x1bfa56(0x29e)][_0x1bfa56(0x1d3)];for(const _0x45eae3 of _0x18e217){_0x115fa0[_0x45eae3]['RandomizeEnemy']&&this['createRandomTraitSet'](_0x45eae3);}},VisuMZ[_0x4e22e6(0x29e)]['Game_Enemy_name']=Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x24e)],Game_Enemy[_0x4e22e6(0x35f)]['name']=function(){const _0x41832a=_0x4e22e6;return DataManager[_0x41832a(0x228)]()?this[_0x41832a(0x249)]():VisuMZ['ElementStatusCore']['Game_Enemy_name'][_0x41832a(0x16c)](this);},Game_Enemy[_0x4e22e6(0x35f)]['nameElementStatusCore']=function(){const _0x5e98f4=_0x4e22e6,_0xe559e7=_0x5e98f4(0x24e);if(this[_0x5e98f4(0x21b)](_0xe559e7))return this[_0x5e98f4(0x392)][_0xe559e7];const _0x329c0e=this[_0x5e98f4(0x2c8)]();return _0x329c0e[_0x5e98f4(0x18d)](this[_0x5e98f4(0x23f)]('Element')[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x23f)](_0x5e98f4(0x32c))[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x23f)]('Gender')[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x23f)](_0x5e98f4(0x383))[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x23f)](_0x5e98f4(0x2f6))[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x23f)]('Alignment')['FmtText']||'',this[_0x5e98f4(0x23f)](_0x5e98f4(0x1d5))['FmtText']||'',this[_0x5e98f4(0x23f)](_0x5e98f4(0x280))[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x23f)](_0x5e98f4(0x2c0))[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x23f)](_0x5e98f4(0x169))[_0x5e98f4(0x2f2)]||'',this[_0x5e98f4(0x1ca)](),this['_plural']?this[_0x5e98f4(0x1b2)]:'')[_0x5e98f4(0x1ef)](/[\s\n\r]+/g,'\x20')['trim']();},Game_Enemy['prototype'][_0x4e22e6(0x2c8)]=function(){const _0x51c94d=_0x4e22e6;let _0x2551fb=VisuMZ['ElementStatusCore'][_0x51c94d(0x1d3)][_0x51c94d(0x2b6)]['EnemyNameFmt'];return this[_0x51c94d(0x38e)]()['note'][_0x51c94d(0x356)](/<TRAIT SET NAME FORMAT>\s*([\s\S]*)\s*<\/TRAIT SET NAME FORMAT>/i)&&(_0x2551fb=String(RegExp['$1'])),_0x2551fb=_0x2551fb['replace'](/\[ELEMENT\]/gi,'%1'),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[SUBELEMENT\]/gi,'%2'),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[GENDER\]/gi,'%3'),_0x2551fb=_0x2551fb['replace'](/\[RACE\]/gi,'%4'),_0x2551fb=_0x2551fb['replace'](/\[NATURE\]/gi,'%5'),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[ALIGNMENT\]/gi,'%6'),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[BLESSING\]/gi,'%7'),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[CURSE\]/gi,'%8'),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[ZODIAC\]/gi,'%9'),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[VARIANT\]/gi,_0x51c94d(0x317)),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[NAME\]/gi,_0x51c94d(0x36b)),_0x2551fb=_0x2551fb[_0x51c94d(0x1ef)](/\[LETTER\]/gi,'%12'),_0x2551fb;},VisuMZ[_0x4e22e6(0x29e)]['Game_Enemy_setLetter']=Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x342)],Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x342)]=function(_0x5954b3){const _0xc6f76e=_0x4e22e6;this[_0xc6f76e(0x392)]={},VisuMZ[_0xc6f76e(0x29e)][_0xc6f76e(0x1de)][_0xc6f76e(0x16c)](this,_0x5954b3);},VisuMZ['ElementStatusCore']['Game_Enemy_setPlural']=Game_Enemy[_0x4e22e6(0x35f)]['setPlural'],Game_Enemy['prototype'][_0x4e22e6(0x2a0)]=function(_0x727612){const _0xbca34d=_0x4e22e6;this['_cache']={},VisuMZ[_0xbca34d(0x29e)][_0xbca34d(0x337)][_0xbca34d(0x16c)](this,_0x727612);},VisuMZ[_0x4e22e6(0x29e)]['Game_Enemy_exp']=Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x2ba)],Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x2ba)]=function(){const _0x2620bb=_0x4e22e6;let _0xd60172=VisuMZ[_0x2620bb(0x29e)]['Game_Enemy_exp'][_0x2620bb(0x16c)](this);return this['expTraitSets'](_0xd60172);},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x19f)]=Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x164)],Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x164)]=function(){const _0x1ce0e9=_0x4e22e6;let _0x3c0c41=VisuMZ[_0x1ce0e9(0x29e)][_0x1ce0e9(0x19f)][_0x1ce0e9(0x16c)](this);return this[_0x1ce0e9(0x1e9)](_0x3c0c41);},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x1d0)]=Game_Enemy['prototype']['dropItemRate'],Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x33a)]=function(){const _0x48f2fd=_0x4e22e6;let _0x123a5e=VisuMZ[_0x48f2fd(0x29e)][_0x48f2fd(0x1d0)][_0x48f2fd(0x16c)](this);return this[_0x48f2fd(0x245)](_0x123a5e);},Game_Enemy['prototype']['expTraitSets']=function(_0x120f15){const _0x2fdc55=_0x4e22e6;if(!DataManager[_0x2fdc55(0x228)]())return _0x120f15;const _0x407599=this[_0x2fdc55(0x166)]();for(const _0x1e7fbc of _0x407599){const _0x2247f2=this[_0x2fdc55(0x26f)](_0x1e7fbc),_0x4f3dd8=DataManager[_0x2fdc55(0x23f)](_0x1e7fbc,_0x2247f2);_0x120f15*=_0x4f3dd8[_0x2fdc55(0x349)]!==undefined?_0x4f3dd8[_0x2fdc55(0x349)]:0x1;}return Math[_0x2fdc55(0x28b)](_0x120f15);},Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x1e9)]=function(_0x5947c4){const _0x3eba51=_0x4e22e6;if(!DataManager[_0x3eba51(0x228)]())return _0x5947c4;const _0x217a35=this['getTraitSetKeys']();for(const _0xb968c of _0x217a35){const _0x2edc2e=this[_0x3eba51(0x26f)](_0xb968c),_0x23a702=DataManager[_0x3eba51(0x23f)](_0xb968c,_0x2edc2e);_0x5947c4*=_0x23a702[_0x3eba51(0x224)]!==undefined?_0x23a702[_0x3eba51(0x224)]:0x1;}return Math[_0x3eba51(0x28b)](_0x5947c4);},Game_Enemy['prototype'][_0x4e22e6(0x245)]=function(_0x4c5faf){const _0x238d24=_0x4e22e6;if(!DataManager[_0x238d24(0x228)]())return _0x4c5faf;const _0x15b532=this[_0x238d24(0x166)]();for(const _0x149121 of _0x15b532){const _0x210cb9=this[_0x238d24(0x26f)](_0x149121),_0x48c816=DataManager[_0x238d24(0x23f)](_0x149121,_0x210cb9);_0x4c5faf*=_0x48c816[_0x238d24(0x34c)]!==undefined?_0x48c816[_0x238d24(0x34c)]:0x1;}return _0x4c5faf;},Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x2b3)]=function(){const _0x2bc5b3=_0x4e22e6;this[_0x2bc5b3(0x25e)]={'name':this[_0x2bc5b3(0x38e)]()[_0x2bc5b3(0x1c6)],'hue':this[_0x2bc5b3(0x38e)]()[_0x2bc5b3(0x323)]};const _0x3a5404=this[_0x2bc5b3(0x38e)]()[_0x2bc5b3(0x14e)],_0x435a73=this[_0x2bc5b3(0x166)]();for(const _0x4bf719 of _0x435a73){const _0x2bbf71=this['traitSet'](_0x4bf719)['Name'][_0x2bc5b3(0x15d)]()['trim'](),_0x3f25d9=_0x4bf719[_0x2bc5b3(0x15d)]()['trim']();if(_0x3a5404[_0x2bc5b3(0x356)](VisuMZ[_0x2bc5b3(0x29e)]['RegExp']['BattlerNameSolo-%1-%2'[_0x2bc5b3(0x18d)](_0x3f25d9,_0x2bbf71)]))this['_specialBattler']['name']=String(RegExp['$1']);else{if(_0x3a5404['match'](VisuMZ['ElementStatusCore'][_0x2bc5b3(0x263)]['BattlerNameMass-%1-%2'[_0x2bc5b3(0x18d)](_0x3f25d9,_0x2bbf71)])){const _0x5d7654=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x2bc5b3(0x338)]('');this[_0x2bc5b3(0x25e)]['name']=DataManager[_0x2bc5b3(0x1bc)](_0x5d7654);}}if(_0x3a5404[_0x2bc5b3(0x356)](VisuMZ['ElementStatusCore'][_0x2bc5b3(0x263)]['BattlerHueSolo-%1-%2'['format'](_0x3f25d9,_0x2bbf71)]))this[_0x2bc5b3(0x25e)][_0x2bc5b3(0x329)]=Number(RegExp['$1'])[_0x2bc5b3(0x2ef)](0x0,0x168);else{if(_0x3a5404[_0x2bc5b3(0x356)](VisuMZ[_0x2bc5b3(0x29e)][_0x2bc5b3(0x263)]['BattlerHueMass-%1-%2'[_0x2bc5b3(0x18d)](_0x3f25d9,_0x2bbf71)])){const _0x1a1a93=String(RegExp['$1'])[_0x2bc5b3(0x25c)](/[\r\n]+/)['remove']('');this[_0x2bc5b3(0x25e)][_0x2bc5b3(0x329)]=Number(DataManager[_0x2bc5b3(0x1bc)](_0x1a1a93))[_0x2bc5b3(0x2ef)](0x0,0x168);}}}},Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x2d3)]=function(){const _0x5ecbaa=_0x4e22e6;this[_0x5ecbaa(0x2b3)]();if(!Imported[_0x5ecbaa(0x29a)])return;this[_0x5ecbaa(0x21f)]=this[_0x5ecbaa(0x21f)]||{'name':'','wtypeId':settings[_0x5ecbaa(0x152)],'collapse':settings[_0x5ecbaa(0x2e6)],'motionIdle':settings[_0x5ecbaa(0x36f)],'width':settings[_0x5ecbaa(0x354)]||0x40,'height':settings[_0x5ecbaa(0x39a)]||0x40,'anchorX':settings[_0x5ecbaa(0x271)]||0x0,'anchorY':settings[_0x5ecbaa(0x1be)]||0x0,'shadow':settings[_0x5ecbaa(0x376)]};const _0x33e89f=this[_0x5ecbaa(0x21f)],_0x1528ce=this[_0x5ecbaa(0x38e)]()[_0x5ecbaa(0x14e)],_0x3e4390=this[_0x5ecbaa(0x166)]();for(const _0x4d9258 of _0x3e4390){const _0x128c91=this[_0x5ecbaa(0x23f)](_0x4d9258)['Name'][_0x5ecbaa(0x15d)]()[_0x5ecbaa(0x24f)](),_0x31912a=_0x4d9258[_0x5ecbaa(0x15d)]()['trim']();if(_0x1528ce[_0x5ecbaa(0x356)](VisuMZ[_0x5ecbaa(0x29e)][_0x5ecbaa(0x263)]['SvBattlerSolo-%1-%2'[_0x5ecbaa(0x18d)](_0x31912a,_0x128c91)]))_0x33e89f[_0x5ecbaa(0x24e)]=String(RegExp['$1']);else{if(_0x1528ce['match'](VisuMZ['ElementStatusCore']['RegExp'][_0x5ecbaa(0x272)[_0x5ecbaa(0x18d)](_0x31912a,_0x128c91)])){const _0x43492d=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x5ecbaa(0x338)]('');_0x33e89f[_0x5ecbaa(0x24e)]=DataManager[_0x5ecbaa(0x1bc)](_0x43492d),console[_0x5ecbaa(0x179)](_0x33e89f[_0x5ecbaa(0x24e)]);}}if(_0x1528ce[_0x5ecbaa(0x356)](VisuMZ[_0x5ecbaa(0x29e)][_0x5ecbaa(0x263)][_0x5ecbaa(0x220)[_0x5ecbaa(0x18d)](_0x31912a,_0x128c91)]))_0x33e89f['wtypeId']=DataManager[_0x5ecbaa(0x1d7)](RegExp['$1']);else{if(_0x1528ce['match'](VisuMZ[_0x5ecbaa(0x29e)]['RegExp']['SvWeaponMass-%1-%2'[_0x5ecbaa(0x18d)](_0x31912a,_0x128c91)])){const _0xf2fcdb=String(RegExp['$1'])[_0x5ecbaa(0x25c)](/[\r\n]+/)[_0x5ecbaa(0x338)](''),_0x3de1fd=DataManager[_0x5ecbaa(0x1bc)](_0xf2fcdb);_0x33e89f[_0x5ecbaa(0x308)]=DataManager[_0x5ecbaa(0x1d7)](_0x3de1fd);}}if(_0x1528ce[_0x5ecbaa(0x356)](VisuMZ[_0x5ecbaa(0x29e)][_0x5ecbaa(0x263)]['SvMotionIdleSolo-%1-%2'['format'](_0x31912a,_0x128c91)]))_0x33e89f[_0x5ecbaa(0x2dc)]=String(RegExp['$1'])['toLowerCase']()[_0x5ecbaa(0x24f)]();else{if(_0x1528ce['match'](VisuMZ[_0x5ecbaa(0x29e)][_0x5ecbaa(0x263)]['SvMotionIdleMass-%1-%2'[_0x5ecbaa(0x18d)](_0x31912a,_0x128c91)])){const _0x4b298f=String(RegExp['$1'])[_0x5ecbaa(0x25c)](/[\r\n]+/)['remove']('');_0x33e89f[_0x5ecbaa(0x2dc)]=DataManager[_0x5ecbaa(0x1bc)](_0x4b298f);}}}},Game_Enemy['prototype'][_0x4e22e6(0x1c6)]=function(){const _0x142164=_0x4e22e6;if(!this[_0x142164(0x25e)])this[_0x142164(0x2b3)]();return this[_0x142164(0x25e)][_0x142164(0x24e)];},Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x323)]=function(){const _0x515095=_0x4e22e6;if(!this['_specialBattler'])this[_0x515095(0x2b3)]();return this[_0x515095(0x25e)][_0x515095(0x329)];},VisuMZ[_0x4e22e6(0x29e)]['Game_Enemy_transform']=Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x2b4)],Game_Enemy[_0x4e22e6(0x35f)][_0x4e22e6(0x2b4)]=function(_0x1dc9d8){const _0x4b220d=_0x4e22e6;VisuMZ['ElementStatusCore'][_0x4b220d(0x397)]['call'](this,_0x1dc9d8),this[_0x4b220d(0x291)](),this['createSpecialBattlers'](),this[_0x4b220d(0x16e)]();},Game_Troop[_0x4e22e6(0x35f)][_0x4e22e6(0x183)]=function(){const _0x359f61=_0x4e22e6;for(const _0x8217a4 of this[_0x359f61(0x155)]()){_0x8217a4&&(_0x8217a4[_0x359f61(0x1b2)]='',_0x8217a4[_0x359f61(0x236)]=![],_0x8217a4['updateSpecialBattlers']());}this[_0x359f61(0x1a1)]={},this[_0x359f61(0x2ae)]();},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x2d5)]=function(){const _0x280af2=_0x4e22e6;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x280af2(0x16b)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseElementStatusCoreUpdatedLayout']())return this[_0x280af2(0x170)]()['match'](/LOWER/i);else Scene_MenuBase['prototype'][_0x280af2(0x282)][_0x280af2(0x16c)](this);}},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x170)]=function(){const _0x3a7e99=_0x4e22e6;return VisuMZ[_0x3a7e99(0x29e)][_0x3a7e99(0x1d3)][_0x3a7e99(0x2ea)][_0x3a7e99(0x302)];},Scene_Status[_0x4e22e6(0x35f)]['isUseElementStatusCoreUpdatedLayout']=function(){const _0x48b6e5=_0x4e22e6;return VisuMZ[_0x48b6e5(0x29e)][_0x48b6e5(0x1d3)][_0x48b6e5(0x2ea)][_0x48b6e5(0x1a5)];},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x2e5)]=Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x1ae)],Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x1ae)]=function(){const _0x4df2b3=_0x4e22e6;this[_0x4df2b3(0x25b)]()?(this['createElementStatusCore'](),this[_0x4df2b3(0x32a)]()):VisuMZ[_0x4df2b3(0x29e)]['Scene_Status_create'][_0x4df2b3(0x16c)](this);},Scene_Status['prototype'][_0x4e22e6(0x161)]=function(){const _0x19c7c8=_0x4e22e6;Scene_MenuBase[_0x19c7c8(0x35f)][_0x19c7c8(0x1ae)]['call'](this),this[_0x19c7c8(0x318)](),this['createCategoryWindow'](),this[_0x19c7c8(0x285)]();},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x32a)]=function(){const _0x32feb9=_0x4e22e6;if(!Imported[_0x32feb9(0x256)])return;const _0xf67d8b=Scene_Status[_0x32feb9(0x2aa)][_0x32feb9(0x270)];this[_0x32feb9(0x2ad)][_0x32feb9(0x246)](_0xf67d8b),this[_0x32feb9(0x38c)][_0x32feb9(0x246)](_0xf67d8b),this[_0x32feb9(0x18b)][_0x32feb9(0x246)](_0xf67d8b);},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x205)]=function(){const _0x5f533a=_0x4e22e6;return this['isUseElementStatusCoreUpdatedLayout']()?Scene_MenuBase['prototype'][_0x5f533a(0x205)][_0x5f533a(0x16c)](this):0x0;},Scene_Status['prototype'][_0x4e22e6(0x30e)]=function(){const _0x179970=_0x4e22e6;return this[_0x179970(0x25b)]()?this['helpWindowRectElementStatusCore']():Scene_MenuBase[_0x179970(0x35f)][_0x179970(0x30e)][_0x179970(0x16c)](this);},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x313)]=function(){const _0xb24840=_0x4e22e6,_0x51d6c7=0x0,_0xa9f791=this[_0xb24840(0x29b)](),_0x24a617=Graphics['boxWidth'],_0x2f62cf=this[_0xb24840(0x205)]();return new Rectangle(_0x51d6c7,_0xa9f791,_0x24a617,_0x2f62cf);},Scene_Status['prototype']['createCategoryWindow']=function(){const _0x25b89c=_0x4e22e6,_0x49a6e1=this['categoryWindowRect']();this[_0x25b89c(0x38c)]=new Window_StatusCategory(_0x49a6e1),this['_categoryWindow'][_0x25b89c(0x1ea)]('cancel',this['popScene']['bind'](this)),this[_0x25b89c(0x38c)][_0x25b89c(0x1ea)](_0x25b89c(0x1a0),this[_0x25b89c(0x1f3)]['bind'](this)),this['_categoryWindow']['setHandler'](_0x25b89c(0x26c),this[_0x25b89c(0x200)][_0x25b89c(0x2c5)](this)),this[_0x25b89c(0x22d)](this[_0x25b89c(0x38c)]);},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x165)]=function(){const _0x6faa1c=_0x4e22e6,_0x428737=Graphics[_0x6faa1c(0x208)],_0x2ca84e=this[_0x6faa1c(0x372)](0x1,!![]),_0x344128=0x0;let _0x2a2cf1=0x0;return this[_0x6faa1c(0x170)]()[_0x6faa1c(0x356)](/TOP/i)?_0x2a2cf1=this[_0x6faa1c(0x2fd)]():_0x2a2cf1=this[_0x6faa1c(0x31f)]()-_0x2ca84e,new Rectangle(_0x344128,_0x2a2cf1,_0x428737,_0x2ca84e);},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x285)]=function(){const _0x2d9d47=_0x4e22e6,_0x3c45c7=this[_0x2d9d47(0x366)]();this[_0x2d9d47(0x18b)]=new Window_StatusData(_0x3c45c7),this[_0x2d9d47(0x22d)](this[_0x2d9d47(0x18b)]),this['_categoryWindow']['setItemWindow'](this[_0x2d9d47(0x18b)]);},Scene_Status['prototype'][_0x4e22e6(0x366)]=function(){const _0x207079=_0x4e22e6,_0x423646=Graphics[_0x207079(0x208)],_0x19fabe=this[_0x207079(0x1d6)]()-this[_0x207079(0x38c)][_0x207079(0x20a)],_0x404425=0x0;let _0x27476d=0x0;return this[_0x207079(0x170)]()[_0x207079(0x356)](/TOP/i)?_0x27476d=this[_0x207079(0x38c)]['y']+this[_0x207079(0x38c)]['height']:_0x27476d=this[_0x207079(0x2fd)](),new Rectangle(_0x404425,_0x27476d,_0x423646,_0x19fabe);},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x2a8)]=Scene_Status[_0x4e22e6(0x35f)]['refreshActor'],Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x1f7)]=function(){const _0x194e18=_0x4e22e6;this[_0x194e18(0x25b)]()?this[_0x194e18(0x17d)]():VisuMZ[_0x194e18(0x29e)][_0x194e18(0x2a8)][_0x194e18(0x16c)](this);},Scene_Status[_0x4e22e6(0x35f)]['refreshActorElementStatusCore']=function(){const _0x5ec096=_0x4e22e6,_0x51a1eb=this[_0x5ec096(0x1df)]();this[_0x5ec096(0x2ad)][_0x5ec096(0x1cd)](_0x51a1eb[_0x5ec096(0x266)]()),this['_dataWindow'][_0x5ec096(0x1fe)](_0x51a1eb);},VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x2ff)]=Scene_Status['prototype'][_0x4e22e6(0x29f)],Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x29f)]=function(){const _0x35278c=_0x4e22e6;this[_0x35278c(0x25b)]()?this[_0x35278c(0x30a)]():VisuMZ[_0x35278c(0x29e)][_0x35278c(0x2ff)]['call'](this);},Scene_Status[_0x4e22e6(0x35f)][_0x4e22e6(0x30a)]=function(){const _0x214292=_0x4e22e6;Scene_MenuBase[_0x214292(0x35f)][_0x214292(0x29f)]['call'](this),this[_0x214292(0x1f7)](),this[_0x214292(0x38c)][_0x214292(0x2f5)]();},Window_Base[_0x4e22e6(0x35f)]['drawItemDarkRect']=function(_0x146187,_0xce41bd,_0x5148bd,_0x246a0c,_0xdcc9a0){const _0x935ded=_0x4e22e6;_0xdcc9a0=Math['max'](_0xdcc9a0||0x1,0x1);while(_0xdcc9a0--){_0x246a0c=_0x246a0c||this[_0x935ded(0x1aa)](),this[_0x935ded(0x331)]['paintOpacity']=0xa0;const _0x67d4e8=ColorManager[_0x935ded(0x19c)]();this[_0x935ded(0x331)][_0x935ded(0x20f)](_0x146187+0x1,_0xce41bd+0x1,_0x5148bd-0x2,_0x246a0c-0x2,_0x67d4e8),this[_0x935ded(0x331)][_0x935ded(0x370)]=0xff;}};function Window_StatusCategory(){const _0x238171=_0x4e22e6;this[_0x238171(0x33e)](...arguments);}Window_StatusCategory[_0x4e22e6(0x151)]=VisuMZ[_0x4e22e6(0x29e)][_0x4e22e6(0x1d3)][_0x4e22e6(0x28a)],Window_StatusCategory[_0x4e22e6(0x35f)]=Object['create'](Window_HorzCommand[_0x4e22e6(0x35f)]),Window_StatusCategory[_0x4e22e6(0x35f)]['constructor']=Window_StatusCategory,Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x33e)]=function(_0x56ee7c){const _0x4f313f=_0x4e22e6;Window_HorzCommand[_0x4f313f(0x35f)][_0x4f313f(0x33e)][_0x4f313f(0x16c)](this,_0x56ee7c),this['createCommandNameWindow'](_0x56ee7c);},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x386)]=function(_0x48c7f6){const _0xb67b54=_0x4e22e6,_0x1901b3=new Rectangle(0x0,0x0,_0x48c7f6[_0xb67b54(0x359)],_0x48c7f6[_0xb67b54(0x20a)]);this['_commandNameWindow']=new Window_Base(_0x1901b3),this[_0xb67b54(0x387)]['opacity']=0x0,this[_0xb67b54(0x1d2)](this[_0xb67b54(0x387)]),this[_0xb67b54(0x2f3)]();},Window_StatusCategory['prototype']['callUpdateHelp']=function(){const _0x38beed=_0x4e22e6;Window_HorzCommand[_0x38beed(0x35f)][_0x38beed(0x1f5)][_0x38beed(0x16c)](this);if(this[_0x38beed(0x387)])this['updateCommandNameWindow']();},Window_StatusCategory['prototype'][_0x4e22e6(0x2f3)]=function(){const _0x1a0910=_0x4e22e6,_0x3f096d=this['_commandNameWindow'];_0x3f096d[_0x1a0910(0x361)][_0x1a0910(0x1a4)]();const _0xeea8f1=this[_0x1a0910(0x2d7)](this['index']());if(_0xeea8f1==='icon'){const _0x23263c=this['itemLineRect'](this[_0x1a0910(0x34f)]());let _0x283b5d=this[_0x1a0910(0x261)](this[_0x1a0910(0x34f)]());_0x283b5d=_0x283b5d[_0x1a0910(0x1ef)](/\\I\[(\d+)\]/gi,''),_0x3f096d['resetFontSettings'](),this[_0x1a0910(0x310)](_0x283b5d,_0x23263c),this['commandNameWindowDrawText'](_0x283b5d,_0x23263c),this[_0x1a0910(0x357)](_0x283b5d,_0x23263c);}},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x310)]=function(_0x3c8da1,_0x5a47bb){},Window_StatusCategory['prototype'][_0x4e22e6(0x212)]=function(_0x14edde,_0x44df58){const _0x33b51b=_0x4e22e6,_0xfb6701=this[_0x33b51b(0x387)];_0xfb6701['drawText'](_0x14edde,0x0,_0x44df58['y'],_0xfb6701[_0x33b51b(0x185)],_0x33b51b(0x242));},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x357)]=function(_0x5706be,_0x6fda4){const _0x5d70dd=_0x4e22e6,_0x1132d2=this[_0x5d70dd(0x387)],_0x482a65=$gameSystem[_0x5d70dd(0x368)](),_0x4ddabb=_0x6fda4['x']+Math[_0x5d70dd(0x2ab)](_0x6fda4[_0x5d70dd(0x359)]/0x2)+_0x482a65;_0x1132d2['x']=_0x1132d2[_0x5d70dd(0x359)]/-0x2+_0x4ddabb,_0x1132d2['y']=Math[_0x5d70dd(0x2ab)](_0x6fda4[_0x5d70dd(0x20a)]/0x2);},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x382)]=function(){const _0x2854a3=_0x4e22e6;return VisuMZ[_0x2854a3(0x29e)][_0x2854a3(0x1d3)][_0x2854a3(0x28a)][_0x2854a3(0x355)];},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x2cd)]=function(){const _0x7bd46f=_0x4e22e6;Window_HorzCommand[_0x7bd46f(0x35f)][_0x7bd46f(0x2cd)][_0x7bd46f(0x16c)](this),this[_0x7bd46f(0x150)]&&this[_0x7bd46f(0x150)][_0x7bd46f(0x2b8)](this[_0x7bd46f(0x1ac)]());},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x260)]=function(_0x4eaae9){const _0x4ebb82=_0x4e22e6;this[_0x4ebb82(0x150)]=_0x4eaae9;},Window_StatusCategory['prototype']['makeCommandList']=function(){const _0x254dfc=_0x4e22e6;for(const _0x16d4f9 of Window_StatusCategory[_0x254dfc(0x151)]){const _0x125a63=_0x16d4f9['Symbol'],_0x1e28c2=_0x16d4f9[_0x254dfc(0x322)];let _0x30415e=_0x16d4f9[_0x254dfc(0x343)];if(['',_0x254dfc(0x281)][_0x254dfc(0x23c)](_0x30415e))continue;_0x1e28c2>0x0&&this[_0x254dfc(0x207)]()!==_0x254dfc(0x1da)&&(_0x30415e=_0x254dfc(0x284)['format'](_0x1e28c2,_0x30415e));const _0x355b2c=_0x16d4f9[_0x254dfc(0x181)];this[_0x254dfc(0x2a1)](_0x30415e,_0x125a63,!![],_0x355b2c);}},Window_StatusCategory['prototype'][_0x4e22e6(0x269)]=function(){const _0x193a75=_0x4e22e6;return VisuMZ[_0x193a75(0x29e)]['Settings'][_0x193a75(0x2ea)][_0x193a75(0x1dc)];},Window_StatusCategory['prototype'][_0x4e22e6(0x303)]=function(_0x5f27cf){const _0x143eb0=_0x4e22e6,_0x38672f=this[_0x143eb0(0x2d7)](_0x5f27cf);if(_0x38672f===_0x143eb0(0x244))this['drawItemStyleIconText'](_0x5f27cf);else _0x38672f===_0x143eb0(0x1a6)?this[_0x143eb0(0x2f8)](_0x5f27cf):Window_HorzCommand['prototype'][_0x143eb0(0x303)][_0x143eb0(0x16c)](this,_0x5f27cf);},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x207)]=function(){const _0x5ac7e8=_0x4e22e6;return VisuMZ[_0x5ac7e8(0x29e)]['Settings'][_0x5ac7e8(0x2ea)][_0x5ac7e8(0x177)];},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x2d7)]=function(_0x13e287){const _0x24627c=_0x4e22e6;if(_0x13e287<0x0)return _0x24627c(0x1da);const _0x116d6d=this['commandStyle']();if(_0x116d6d!==_0x24627c(0x2ee))return _0x116d6d;else{if(this[_0x24627c(0x341)]()>0x0){const _0x3dab28=this['commandName'](_0x13e287);if(_0x3dab28[_0x24627c(0x356)](/\\I\[(\d+)\]/i)){const _0x17f800=this[_0x24627c(0x384)](_0x13e287),_0x38d907=this['textSizeEx'](_0x3dab28)[_0x24627c(0x359)];return _0x38d907<=_0x17f800['width']?'iconText':_0x24627c(0x1a6);}}}return _0x24627c(0x1da);},Window_StatusCategory[_0x4e22e6(0x35f)]['drawItemStyleIconText']=function(_0x2d90aa){const _0x2737f1=_0x4e22e6,_0x5a7d91=this[_0x2737f1(0x384)](_0x2d90aa),_0xab1d95=this[_0x2737f1(0x261)](_0x2d90aa),_0x48764d=this[_0x2737f1(0x31d)](_0xab1d95)['width'];this[_0x2737f1(0x1e0)](this[_0x2737f1(0x2ed)](_0x2d90aa));const _0x2c3824=this[_0x2737f1(0x269)]();if(_0x2c3824===_0x2737f1(0x2d2))this['drawTextEx'](_0xab1d95,_0x5a7d91['x']+_0x5a7d91[_0x2737f1(0x359)]-_0x48764d,_0x5a7d91['y'],_0x48764d);else{if(_0x2c3824===_0x2737f1(0x242)){const _0x2f9413=_0x5a7d91['x']+Math[_0x2737f1(0x2ab)]((_0x5a7d91[_0x2737f1(0x359)]-_0x48764d)/0x2);this[_0x2737f1(0x29c)](_0xab1d95,_0x2f9413,_0x5a7d91['y'],_0x48764d);}else this[_0x2737f1(0x29c)](_0xab1d95,_0x5a7d91['x'],_0x5a7d91['y'],_0x48764d);}},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x2f8)]=function(_0x3e020b){const _0x2f4a20=_0x4e22e6;this[_0x2f4a20(0x261)](_0x3e020b)[_0x2f4a20(0x356)](/\\I\[(\d+)\]/i);const _0x437966=Number(RegExp['$1'])||0x0,_0x5d89fc=this[_0x2f4a20(0x384)](_0x3e020b),_0x56054b=_0x5d89fc['x']+Math[_0x2f4a20(0x2ab)]((_0x5d89fc[_0x2f4a20(0x359)]-ImageManager[_0x2f4a20(0x373)])/0x2),_0x26536a=_0x5d89fc['y']+(_0x5d89fc[_0x2f4a20(0x20a)]-ImageManager[_0x2f4a20(0x1ad)])/0x2;this[_0x2f4a20(0x1c4)](_0x437966,_0x56054b,_0x26536a);},Window_StatusCategory[_0x4e22e6(0x35f)][_0x4e22e6(0x319)]=function(){const _0x291dd6=_0x4e22e6;this[_0x291dd6(0x1fa)]()===_0x291dd6(0x1d8)&&SoundManager['playOk']();};function _0x179c(_0x8974aa,_0x5838ae){const _0x4a61ad=_0x4a61();return _0x179c=function(_0x179c6e,_0x55aca4){_0x179c6e=_0x179c6e-0x14c;let _0x7aab9c=_0x4a61ad[_0x179c6e];return _0x7aab9c;},_0x179c(_0x8974aa,_0x5838ae);}function Window_StatusData(){const _0x1a9282=_0x4e22e6;this[_0x1a9282(0x33e)](...arguments);}Window_StatusData[_0x4e22e6(0x35f)]=Object[_0x4e22e6(0x1ae)](Window_StatusBase[_0x4e22e6(0x35f)]),Window_StatusData['prototype']['constructor']=Window_MenuStatus,Window_StatusData['traitCol1']=[_0x4e22e6(0x34a),_0x4e22e6(0x2f6),'Blessing',_0x4e22e6(0x2c0)][_0x4e22e6(0x20b)](_0x1c4ac4=>{const _0x2d75a2=_0x4e22e6,_0x47a264=DataManager[_0x2d75a2(0x278)](_0x1c4ac4);return _0x47a264&&_0x47a264[_0x2d75a2(0x15e)];}),Window_StatusData['traitCol2']=[_0x4e22e6(0x383),_0x4e22e6(0x1e5),_0x4e22e6(0x280),_0x4e22e6(0x169)][_0x4e22e6(0x20b)](_0x320ad3=>{const _0x30f4b5=_0x4e22e6,_0x181606=DataManager[_0x30f4b5(0x278)](_0x320ad3);return _0x181606&&_0x181606[_0x30f4b5(0x15e)];}),Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x33e)]=function(_0x2c9082){const _0xc79303=_0x4e22e6;this[_0xc79303(0x213)]=$gameSystem[_0xc79303(0x38d)](),Window_StatusBase[_0xc79303(0x35f)][_0xc79303(0x33e)][_0xc79303(0x16c)](this,_0x2c9082),this[_0xc79303(0x1b7)]=null,this[_0xc79303(0x305)]=null;},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x23d)]=function(){const _0x1b41bb=_0x4e22e6;Window_StatusBase[_0x1b41bb(0x35f)][_0x1b41bb(0x23d)]['call'](this),this[_0x1b41bb(0x361)]['fontSize']=this[_0x1b41bb(0x213)];},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x347)]=function(){const _0x49535e=_0x4e22e6;return this[_0x49535e(0x361)]['fontSize']/$gameSystem[_0x49535e(0x38d)]();},Window_StatusData[_0x4e22e6(0x35f)]['drawIcon']=function(_0x284e07,_0x32cff4,_0x5de51f){const _0x5f432b=_0x4e22e6,_0xbfac5b=ImageManager[_0x5f432b(0x1b9)](_0x5f432b(0x186)),_0x8c6f37=ImageManager[_0x5f432b(0x373)],_0x380536=ImageManager[_0x5f432b(0x1ad)],_0x5c860a=_0x284e07%0x10*_0x8c6f37,_0x27cadb=Math[_0x5f432b(0x2ab)](_0x284e07/0x10)*_0x380536,_0x36ed2a=Math[_0x5f432b(0x1a3)](_0x8c6f37*this[_0x5f432b(0x347)]()),_0x428061=Math['ceil'](_0x380536*this[_0x5f432b(0x347)]());this[_0x5f432b(0x361)][_0x5f432b(0x351)](_0xbfac5b,_0x5c860a,_0x27cadb,_0x8c6f37,_0x380536,_0x32cff4,_0x5de51f,_0x36ed2a,_0x428061);},Window_StatusData['prototype'][_0x4e22e6(0x268)]=function(_0x16c54f,_0x58847c){const _0x1df7a5=_0x4e22e6;_0x58847c[_0x1df7a5(0x345)]&&this['drawIcon'](_0x16c54f,_0x58847c['x'],_0x58847c['y']+0x2);_0x58847c['x']+=Math[_0x1df7a5(0x1a3)](ImageManager[_0x1df7a5(0x373)]*this['fontSizeRatio']());if(this[_0x1df7a5(0x347)]()===0x1)_0x58847c['x']+=0x4;},Window_StatusData['prototype'][_0x4e22e6(0x1fe)]=function(_0x39ef52){const _0x3069b5=_0x4e22e6;this[_0x3069b5(0x1b7)]!==_0x39ef52&&(this[_0x3069b5(0x1b7)]=_0x39ef52,this[_0x3069b5(0x16e)]());},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x2b8)]=function(_0x2172de){const _0x56730e=_0x4e22e6;this[_0x56730e(0x305)]!==_0x2172de&&(this['_drawData']=_0x2172de,this[_0x56730e(0x16e)]());},Window_StatusData[_0x4e22e6(0x35f)]['setWordWrap']=function(_0x29751a){const _0x3fdc3a=_0x4e22e6;if(Imported['VisuMZ_1_MessageCore'])Window_Base[_0x3fdc3a(0x35f)][_0x3fdc3a(0x2f0)][_0x3fdc3a(0x16c)](this,_0x29751a);return'';},Window_StatusData['prototype'][_0x4e22e6(0x17f)]=function(){const _0x747980=_0x4e22e6;if(Imported[_0x747980(0x1a8)])Window_StatusBase[_0x747980(0x35f)][_0x747980(0x17f)][_0x747980(0x16c)](this);},Window_StatusData['prototype'][_0x4e22e6(0x29c)]=function(_0x2f69d9,_0x1bd8ae,_0x4d5368,_0x426924){const _0xaf7de2=_0x4e22e6,_0x358be6=Window_StatusBase['prototype'][_0xaf7de2(0x29c)][_0xaf7de2(0x16c)](this,_0x2f69d9,_0x1bd8ae,_0x4d5368,_0x426924);return this[_0xaf7de2(0x17f)](),_0x358be6;},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x16e)]=function(){const _0x15b9ce=_0x4e22e6;Window_StatusBase['prototype']['refresh'][_0x15b9ce(0x16c)](this),this[_0x15b9ce(0x1fb)](),this[_0x15b9ce(0x23d)](),this['resetWordWrap']();if(this[_0x15b9ce(0x1b7)]&&this[_0x15b9ce(0x305)])this['_drawData']['call'](this);},Window_StatusData[_0x4e22e6(0x35f)]['isActorMenuImageAvailable']=function(){const _0x5535bf=_0x4e22e6;return Imported['VisuMZ_1_MainMenuCore']&&this['_actor'][_0x5535bf(0x1cf)]()!=='';},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x2d9)]=function(_0x3ec327,_0x4a7e7f,_0x541aeb,_0x5cf68a,_0x1b6d63){const _0x312dce=_0x4e22e6,_0x54bf9d=ImageManager[_0x312dce(0x1b4)](_0x3ec327[_0x312dce(0x1cf)]());_0x54bf9d['addLoadListener'](this['onLoadDrawItemActorMenuImage'][_0x312dce(0x2c5)](this,_0x54bf9d,_0x3ec327,_0x4a7e7f,_0x541aeb,_0x5cf68a,_0x1b6d63));},Window_StatusData[_0x4e22e6(0x35f)]['onLoadDrawItemActorMenuImage']=function(_0x432c37,_0x214032,_0x3b6a34,_0x41de30,_0xa96500,_0x37f22e){const _0x212976=_0x4e22e6,_0x4c0d48=_0xa96500-_0x432c37[_0x212976(0x359)];_0x3b6a34+=_0x4c0d48/0x2;if(_0x4c0d48<0x0)_0xa96500-=_0x4c0d48;_0xa96500=(_0xa96500||ImageManager[_0x212976(0x1e2)])-0x2,_0x37f22e=(_0x37f22e||ImageManager['faceHeight'])-0x2;const _0x1c68fd=_0x432c37[_0x212976(0x359)],_0x5316f0=_0x432c37[_0x212976(0x20a)],_0x452492=_0xa96500,_0x46ea81=_0x37f22e-0x2,_0x44491d=_0x3b6a34+Math[_0x212976(0x2ab)](_0x452492/0x2),_0x2e91f2=_0x41de30+Math[_0x212976(0x1a3)]((_0x37f22e+_0x5316f0)/0x2),_0x581fa1=Math[_0x212976(0x277)](_0xa96500,_0x1c68fd),_0x59bb39=Math[_0x212976(0x277)](_0x37f22e,_0x5316f0),_0x8105bc=_0x3b6a34+0x1,_0x3e3dde=Math[_0x212976(0x2de)](_0x41de30+0x1,_0x41de30+_0x46ea81-_0x5316f0+0x3),_0x3fd9fc=(_0x1c68fd-_0x581fa1)/0x2,_0x5c3ba1=(_0x5316f0-_0x59bb39)/0x2;this[_0x212976(0x331)]['blt'](_0x432c37,_0x3fd9fc,_0x5c3ba1,_0x581fa1,_0x59bb39,_0x8105bc,_0x3e3dde);},Window_StatusData[_0x4e22e6(0x35f)]['basicDataHeight']=function(){const _0x3ab95c=_0x4e22e6;let _0x36adb7=0x5;return this['innerHeight']-this[_0x3ab95c(0x1aa)]()*0x5<this[_0x3ab95c(0x1aa)]()*0x6&&(_0x36adb7=0x4),this[_0x3ab95c(0x233)]-this[_0x3ab95c(0x1aa)]()*_0x36adb7;},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x2cc)]=function(_0x5bb896,_0x4c3ba4){const _0x325a79=_0x4e22e6,_0x490334=this[_0x325a79(0x1b7)],_0x33261=new Rectangle(_0x5bb896,0x0,_0x4c3ba4,this[_0x325a79(0x233)]),_0xb43768=this[_0x325a79(0x35e)]();if(this['isActorMenuImageAvailable']()){const _0x34393b=_0x33261[_0x325a79(0x359)],_0x25792d=_0x33261[_0x325a79(0x20a)],_0x5df89b=_0x33261['x'],_0x1cafba=_0x33261['y'];this[_0x325a79(0x2d9)](_0x490334,_0x5df89b,_0x1cafba,_0x34393b,_0x25792d);}else{const _0x2ea96f=ImageManager[_0x325a79(0x1e2)],_0x41e942=ImageManager[_0x325a79(0x26b)],_0x1cdf77=_0x33261['x']+Math[_0x325a79(0x2ab)]((_0x33261[_0x325a79(0x359)]-_0x2ea96f)/0x2),_0x11502f=_0x33261['y']+Math[_0x325a79(0x2ab)]((this[_0x325a79(0x233)]-_0xb43768-_0x41e942)/0x2);this['drawActorFaceBack'](_0x490334,_0x1cdf77,_0x11502f,_0x2ea96f,_0x41e942);}},Window_Base[_0x4e22e6(0x35f)][_0x4e22e6(0x219)]=function(_0x465c83,_0x5658b7,_0x3f937d,_0x140a84,_0x192ddb){const _0x3478bb=_0x4e22e6,_0x238d03=_0x465c83[_0x3478bb(0x187)](),_0x17570d=_0x465c83[_0x3478bb(0x2e1)]();_0x140a84=_0x140a84||ImageManager[_0x3478bb(0x1e2)],_0x192ddb=_0x192ddb||ImageManager[_0x3478bb(0x26b)];const _0x58bcdf=ImageManager[_0x3478bb(0x21e)](_0x238d03),_0x5df33e=ImageManager[_0x3478bb(0x1e2)],_0x29d44c=ImageManager[_0x3478bb(0x26b)],_0x3160ba=Math[_0x3478bb(0x277)](_0x140a84,_0x5df33e),_0x11f4f9=Math['min'](_0x192ddb,_0x29d44c),_0x141b3f=Math[_0x3478bb(0x2ab)](_0x5658b7+Math[_0x3478bb(0x2de)](_0x140a84-_0x5df33e,0x0)/0x2),_0x728baf=Math[_0x3478bb(0x2ab)](_0x3f937d+Math[_0x3478bb(0x2de)](_0x192ddb-_0x29d44c,0x0)/0x2),_0x5ee0d6=_0x17570d%0x4*_0x5df33e+(_0x5df33e-_0x3160ba)/0x2,_0x6ddabf=Math[_0x3478bb(0x2ab)](_0x17570d/0x4)*_0x29d44c+(_0x29d44c-_0x11f4f9)/0x2;this[_0x3478bb(0x331)][_0x3478bb(0x351)](_0x58bcdf,_0x5ee0d6,_0x6ddabf,_0x3160ba,_0x11f4f9,_0x141b3f,_0x728baf);},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x14d)]=function(_0x1af031){const _0x241a5c=_0x4e22e6,_0x8f0d91='Col%1'['format'](_0x1af031);return VisuMZ[_0x241a5c(0x29e)][_0x241a5c(0x1d3)]['StatusMenu'][_0x8f0d91];},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x21c)]=function(_0x526042,_0x293d94,_0x4b92a8,_0xdb3266){const _0xbb17dc=_0x4e22e6,_0x24a699=this[_0xbb17dc(0x38a)]();_0xdb3266-=_0x24a699*0x2;if(Imported[_0xbb17dc(0x256)])this['drawParamText'](_0x293d94+_0x24a699,_0x4b92a8,_0xdb3266,_0x526042,![]);else{const _0xedd40e=this[_0xbb17dc(0x222)](_0x526042);this[_0xbb17dc(0x2f1)](ColorManager[_0xbb17dc(0x1e3)]()),this['drawText'](_0xedd40e,_0x293d94+_0x24a699,_0x4b92a8,_0xdb3266);}},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x222)]=function(_0xbe1761){const _0x10a4bf=_0x4e22e6;_0xbe1761=_0xbe1761['toUpperCase']()[_0x10a4bf(0x24f)]();const _0x4e1bf1=[_0x10a4bf(0x15a),_0x10a4bf(0x287),'ATK',_0x10a4bf(0x2a9),_0x10a4bf(0x18e),_0x10a4bf(0x1c0),_0x10a4bf(0x17a),'LUK'],_0x5b5aaf=[_0x10a4bf(0x34d),'EVA',_0x10a4bf(0x24c),_0x10a4bf(0x2a3),'MEV',_0x10a4bf(0x1b0),'CNT',_0x10a4bf(0x1f1),_0x10a4bf(0x23e),_0x10a4bf(0x192)],_0x42bf94=[_0x10a4bf(0x259),'GRD',_0x10a4bf(0x159),_0x10a4bf(0x223),'MCR',_0x10a4bf(0x320),_0x10a4bf(0x176),_0x10a4bf(0x295),_0x10a4bf(0x27a),_0x10a4bf(0x171)];if(_0x4e1bf1['includes'](_0xbe1761))return TextManager[_0x10a4bf(0x2dd)](_0x4e1bf1[_0x10a4bf(0x2bf)](_0xbe1761));return _0xbe1761;},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x2ca)]=function(_0x4db0ae,_0x28008f,_0x35ddd5,_0x1bc53a){const _0x26a2c0=_0x4e22e6;this[_0x26a2c0(0x23d)]();const _0x158c73=this[_0x26a2c0(0x38a)](),_0x266095=this[_0x26a2c0(0x36d)](_0x4db0ae);this[_0x26a2c0(0x229)](_0x266095,_0x28008f+_0x158c73,_0x35ddd5,_0x1bc53a-_0x158c73*0x2,_0x26a2c0(0x2d2));},Window_StatusData[_0x4e22e6(0x35f)]['getParamValue']=function(_0x58207e){const _0x4413b1=_0x4e22e6;_0x58207e=_0x58207e[_0x4413b1(0x15d)]()['trim']();const _0x15e619=this[_0x4413b1(0x1b7)];if(Imported['VisuMZ_0_CoreEngine'])return _0x15e619[_0x4413b1(0x26a)](_0x58207e,!![]);else{const _0x88ac89=[_0x4413b1(0x15a),'MAXMP',_0x4413b1(0x18c),_0x4413b1(0x2a9),_0x4413b1(0x18e),_0x4413b1(0x1c0),_0x4413b1(0x17a),_0x4413b1(0x35a)],_0x43dabc=['HIT',_0x4413b1(0x2a6),_0x4413b1(0x24c),'CEV',_0x4413b1(0x365),_0x4413b1(0x1b0),_0x4413b1(0x2da),_0x4413b1(0x1f1),_0x4413b1(0x23e),_0x4413b1(0x192)],_0x4d9225=['TGR',_0x4413b1(0x2db),_0x4413b1(0x159),_0x4413b1(0x223),'MCR',_0x4413b1(0x320),_0x4413b1(0x176),_0x4413b1(0x295),_0x4413b1(0x27a),_0x4413b1(0x171)];if(_0x88ac89[_0x4413b1(0x23c)](_0x58207e))return _0x15e619[_0x4413b1(0x2dd)](_0x88ac89['indexOf'](_0x58207e));else{if(_0x43dabc[_0x4413b1(0x23c)](_0x58207e)){const _0x264cb7=_0x15e619['xparam'](_0x43dabc[_0x4413b1(0x2bf)](_0x58207e));return _0x4413b1(0x1fc)[_0x4413b1(0x18d)](Math['round'](_0x264cb7*0x64));}else{if(_0x4d9225[_0x4413b1(0x23c)](_0x58207e)){const _0x2bca75=_0x15e619[_0x4413b1(0x1cc)](_0x4d9225[_0x4413b1(0x2bf)](_0x58207e));return _0x4413b1(0x1fc)[_0x4413b1(0x18d)](Math[_0x4413b1(0x28b)](_0x2bca75*0x64));}}}}},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x225)]=function(){const _0xd8bd22=_0x4e22e6;VisuMZ[_0xd8bd22(0x29e)][_0xd8bd22(0x1d3)]['StatusMenuList'][0x0][_0xd8bd22(0x181)][_0xd8bd22(0x16c)](this);},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x1b3)]=function(){const _0x194834=_0x4e22e6;this[_0x194834(0x213)]=VisuMZ['ElementStatusCore'][_0x194834(0x1d3)]['StatusMenu'][_0x194834(0x2e4)];},Window_StatusData['prototype'][_0x4e22e6(0x1fb)]=function(){const _0x315c40=_0x4e22e6;this[_0x315c40(0x213)]=$gameSystem[_0x315c40(0x38d)]();},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x311)]=function(_0x410f33,_0x152449,_0xb54aa4,_0x52143a,_0x5a045b){const _0x56da41=_0x4e22e6;if(VisuMZ['ElementStatusCore']['Settings'][_0x56da41(0x2ea)]['DrawBackRect']===![])return;_0x5a045b=Math['max'](_0x5a045b||0x1,0x1);while(_0x5a045b--){_0x52143a=_0x52143a||this[_0x56da41(0x1aa)](),this['contents'][_0x56da41(0x370)]=0xa0;const _0x221a53=ColorManager[_0x56da41(0x231)]();this[_0x56da41(0x361)][_0x56da41(0x20f)](_0x410f33+0x1,_0x152449+0x1,_0xb54aa4-0x2,_0x52143a-0x2,_0x221a53),this['contents'][_0x56da41(0x370)]=0xff;}},ColorManager['getElementStatusCoreBackColor']=function(){const _0x36069a=_0x4e22e6,_0xe42d8=VisuMZ['ElementStatusCore'][_0x36069a(0x1d3)][_0x36069a(0x2ea)];let _0x46dbab=_0xe42d8['BackRectColor']!==undefined?_0xe42d8[_0x36069a(0x2ac)]:0x13;return ColorManager[_0x36069a(0x1c1)](_0x46dbab);},Window_StatusData['prototype'][_0x4e22e6(0x184)]=function(){const _0x50026e=_0x4e22e6,_0x4e4e36='-------',_0x477eeb=this['lineHeight'](),_0x459fb7=this['gaugeLineHeight'](),_0x3e04a0=this['basicDataHeight'](),_0x179f11=this[_0x50026e(0x1b7)],_0x54739b=this['itemPadding'](),_0xb7b8f3=this[_0x50026e(0x185)]/0x2;let _0x5edebc=new Rectangle(0x0,0x0,_0xb7b8f3,this[_0x50026e(0x233)]),_0x5d3b00=0x0,_0xe88f4=0x0;this[_0x50026e(0x2cc)](0x0,this[_0x50026e(0x185)]/0x2);let _0x1a3cbe=_0x5edebc['x'],_0x5e354b=Math[_0x50026e(0x2de)](_0x5edebc['y'],_0x5edebc['y']+(_0x5edebc[_0x50026e(0x20a)]-_0x3e04a0)),_0x28d26a=_0x5edebc[_0x50026e(0x359)],_0x345113=_0x5edebc['y']+_0x5edebc[_0x50026e(0x20a)]-_0x5e354b;this[_0x50026e(0x311)](0x0,_0x5e354b,_0x28d26a,_0x477eeb,0x2),this[_0x50026e(0x229)](_0x179f11['name'](),_0x1a3cbe,_0x5e354b,_0x28d26a,_0x50026e(0x242)),_0x1a3cbe=_0x5edebc['x']+Math['round']((_0x5edebc[_0x50026e(0x359)]-0x80)/0x2),_0x5e354b+=_0x477eeb,this[_0x50026e(0x311)](0x0,_0x5e354b,_0x28d26a,_0x477eeb),this[_0x50026e(0x296)](_0x179f11,_0x1a3cbe,_0x5e354b);const _0x23c2cc=_0x179f11[_0x50026e(0x14c)]()['name'];_0x1a3cbe=_0x5edebc['x']+Math[_0x50026e(0x28b)]((_0x5edebc[_0x50026e(0x359)]-this[_0x50026e(0x31d)](_0x23c2cc)['width'])/0x2),_0x5e354b+=_0x477eeb,this['drawItemDarkRect'](0x0,_0x5e354b,_0x28d26a,_0x477eeb),this['drawTextEx'](_0x23c2cc,_0x1a3cbe,_0x5e354b,_0x28d26a),_0x1a3cbe=_0x5edebc['x']+Math['round']((_0x5edebc[_0x50026e(0x359)]-0x90)/0x2),_0x5e354b+=_0x477eeb,this['drawItemDarkRect'](0x0,_0x5e354b,_0x28d26a,_0x477eeb),this['drawActorIcons'](_0x179f11,_0x1a3cbe,_0x5e354b),_0x1a3cbe=_0x5edebc['x']+Math[_0x50026e(0x28b)]((_0x5edebc[_0x50026e(0x359)]-0x80)/0x2),_0x5e354b+=_0x477eeb,this[_0x50026e(0x311)](0x0,_0x5e354b,_0x28d26a,this['innerHeight']-_0x5e354b),this[_0x50026e(0x30f)](_0x179f11,'hp',_0x1a3cbe,_0x5e354b),_0x5e354b+=_0x459fb7,this[_0x50026e(0x30f)](_0x179f11,'mp',_0x1a3cbe,_0x5e354b),_0x5e354b+=_0x459fb7;$dataSystem[_0x50026e(0x360)]&&this[_0x50026e(0x30f)](_0x179f11,'tp',_0x1a3cbe,_0x5e354b);_0x5edebc=new Rectangle(_0xb7b8f3,0x0,_0xb7b8f3,this[_0x50026e(0x233)]),this[_0x50026e(0x2f1)](ColorManager['systemColor']()),this['drawItemDarkRect'](_0x5edebc['x'],_0x5edebc['y'],_0x5edebc['width'],_0x477eeb,0x2),this[_0x50026e(0x229)](TextManager[_0x50026e(0x2ba)],_0x5edebc['x'],_0x5edebc['y'],_0x5edebc[_0x50026e(0x359)],_0x50026e(0x242));const _0x5f2327=_0x477eeb*0x5;this['drawItemDarkRect'](_0x5edebc['x'],_0x5edebc['y']+_0x477eeb*0x1,_0x5edebc[_0x50026e(0x359)],_0x477eeb*0x2),this[_0x50026e(0x311)](_0x5edebc['x'],_0x5edebc['y']+_0x477eeb*0x3,_0x5edebc['width'],_0x477eeb*0x2);const _0x4d861d=TextManager[_0x50026e(0x299)]['format'](TextManager[_0x50026e(0x2ba)]),_0x32bd78=TextManager['expNext'][_0x50026e(0x18d)](TextManager[_0x50026e(0x2b0)]);this[_0x50026e(0x2f1)](ColorManager[_0x50026e(0x1e3)]()),this[_0x50026e(0x229)](_0x4d861d,_0x5edebc['x']+_0x54739b,_0x5edebc['y']+_0x477eeb*0x1,_0x5edebc[_0x50026e(0x359)]-_0x54739b*0x2),this[_0x50026e(0x229)](_0x32bd78,_0x5edebc['x']+_0x54739b,_0x5edebc['y']+_0x477eeb*0x3,_0x5edebc[_0x50026e(0x359)]-_0x54739b*0x2),this[_0x50026e(0x334)]();const _0x2635e3=_0x179f11[_0x50026e(0x27e)](),_0x25ae86=_0x179f11[_0x50026e(0x19b)]()?_0x4e4e36:_0x179f11[_0x50026e(0x32d)]();this[_0x50026e(0x229)](_0x2635e3,_0x5edebc['x']+_0x54739b,_0x5edebc['y']+_0x477eeb*0x1,_0x5edebc[_0x50026e(0x359)]-_0x54739b*0x2,'right'),this[_0x50026e(0x229)](_0x25ae86,_0x5edebc['x']+_0x54739b,_0x5edebc['y']+_0x477eeb*0x3,_0x5edebc[_0x50026e(0x359)]-_0x54739b*0x2,_0x50026e(0x2d2)),_0xe88f4=_0x5edebc['y']+_0x5f2327,this[_0x50026e(0x2f1)](ColorManager[_0x50026e(0x1e3)]()),this[_0x50026e(0x311)](_0x5edebc['x'],_0xe88f4,_0x5edebc[_0x50026e(0x359)],_0x477eeb,0x2),this['drawText'](TextManager[_0x50026e(0x36e)],_0x5edebc['x'],_0xe88f4,_0x5edebc['width'],_0x50026e(0x242)),this[_0x50026e(0x334)](),_0xe88f4+=_0x477eeb;const _0x22d6b7=_0x179f11[_0x50026e(0x2df)]();this[_0x50026e(0x311)](_0x5edebc['x'],_0xe88f4,_0x5edebc[_0x50026e(0x359)],this[_0x50026e(0x233)]-_0xe88f4),this[_0x50026e(0x29c)](_0x22d6b7,_0x5edebc['x']+_0x54739b,_0xe88f4,_0x5edebc['width']-_0x54739b*0x2);},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x22b)]=function(){const _0x5e64fe=_0x4e22e6,_0x3bb323=this['lineHeight'](),_0x43970a=this[_0x5e64fe(0x309)](),_0x4e9a54=this[_0x5e64fe(0x35e)](),_0x6596e6=this[_0x5e64fe(0x38a)]()*0x2,_0x38d093=Math[_0x5e64fe(0x2ab)](this[_0x5e64fe(0x185)]/0x3);let _0xa4f8d9=0x0,_0x51b4c5=0x0,_0x44e13f=0x0;this[_0x5e64fe(0x2cc)](0x0,this[_0x5e64fe(0x185)]/0x2);let _0x246b38=new Rectangle(0x0,0x0,_0x38d093,this['innerHeight']);const _0x561d43=this['getParameterList'](0x1),_0x5a3715=this[_0x5e64fe(0x14d)](0x2),_0x2609eb=this[_0x5e64fe(0x14d)](0x3),_0x137427=Math['max'](_0x561d43['length'],_0x5a3715[_0x5e64fe(0x355)],_0x2609eb[_0x5e64fe(0x355)]),_0x37ca15=_0x246b38[_0x5e64fe(0x359)]-_0x6596e6*0x2-this[_0x5e64fe(0x301)](_0x5e64fe(0x22c)),_0x4147c5=Math[_0x5e64fe(0x2de)]((this[_0x5e64fe(0x233)]-_0x137427*_0x3bb323)/0x2,0x0);_0xa4f8d9=_0x246b38['x']+_0x6596e6,_0x51b4c5=_0x4147c5,_0x44e13f=_0x246b38['width']-_0x6596e6*0x2;if(_0x51b4c5!==0x0)this[_0x5e64fe(0x311)](_0x246b38['x'],0x0,_0x246b38['width'],_0x51b4c5);for(const _0x57e667 of _0x561d43){this['drawItemDarkRect'](_0x246b38['x'],_0x51b4c5,_0x246b38[_0x5e64fe(0x359)],_0x3bb323),this[_0x5e64fe(0x21c)](_0x57e667,_0xa4f8d9,_0x51b4c5,_0x37ca15),this[_0x5e64fe(0x2ca)](_0x57e667,_0xa4f8d9,_0x51b4c5,_0x44e13f),_0x51b4c5+=_0x3bb323;}this[_0x5e64fe(0x311)](_0x246b38['x'],_0x51b4c5,_0x246b38[_0x5e64fe(0x359)],this[_0x5e64fe(0x233)]-_0x51b4c5),_0x246b38['x']+=_0x246b38[_0x5e64fe(0x359)],_0xa4f8d9=_0x246b38['x']+_0x6596e6,_0x51b4c5=_0x4147c5,_0x44e13f=_0x246b38['width']-_0x6596e6*0x2;if(_0x51b4c5!==0x0)this[_0x5e64fe(0x311)](_0x246b38['x'],0x0,_0x246b38[_0x5e64fe(0x359)],_0x51b4c5);for(const _0x4c8504 of _0x5a3715){this[_0x5e64fe(0x311)](_0x246b38['x'],_0x51b4c5,_0x246b38[_0x5e64fe(0x359)],_0x3bb323),this[_0x5e64fe(0x21c)](_0x4c8504,_0xa4f8d9,_0x51b4c5,_0x37ca15),this['drawParamValue'](_0x4c8504,_0xa4f8d9,_0x51b4c5,_0x44e13f),_0x51b4c5+=_0x3bb323;}this[_0x5e64fe(0x311)](_0x246b38['x'],_0x51b4c5,_0x246b38['width'],this[_0x5e64fe(0x233)]-_0x51b4c5),_0x246b38['x']+=_0x246b38[_0x5e64fe(0x359)],_0x246b38['width']=this['innerWidth']-_0x246b38['x'],_0xa4f8d9=_0x246b38['x']+_0x6596e6,_0x51b4c5=_0x4147c5,_0x44e13f=_0x246b38[_0x5e64fe(0x359)]-_0x6596e6*0x2;if(_0x51b4c5!==0x0)this['drawItemDarkRect'](_0x246b38['x'],0x0,_0x246b38[_0x5e64fe(0x359)],_0x51b4c5);for(const _0x50e8d6 of _0x2609eb){this[_0x5e64fe(0x311)](_0x246b38['x'],_0x51b4c5,_0x246b38['width'],_0x3bb323),this['drawParamName'](_0x50e8d6,_0xa4f8d9,_0x51b4c5,_0x37ca15),this['drawParamValue'](_0x50e8d6,_0xa4f8d9,_0x51b4c5,_0x44e13f),_0x51b4c5+=_0x3bb323;}this[_0x5e64fe(0x311)](_0x246b38['x'],_0x51b4c5,_0x246b38[_0x5e64fe(0x359)],this[_0x5e64fe(0x233)]-_0x51b4c5);},Window_StatusData['prototype']['drawProperties']=function(){const _0x488834=_0x4e22e6,_0xda6690=Window_StatusData[_0x488834(0x239)],_0x4311a2=Window_StatusData[_0x488834(0x298)],_0x4df300=this[_0x488834(0x1aa)](),_0x25b1b9=this[_0x488834(0x1b7)],_0x36154f=this[_0x488834(0x38a)](),_0x3b008d=this[_0x488834(0x233)]/Math[_0x488834(0x2de)](_0xda6690[_0x488834(0x355)],_0x4311a2[_0x488834(0x355)])-_0x4df300,_0x2cd445=this[_0x488834(0x185)]/0x2;let _0xdf75ca=0x0,_0x267d49=0x0;this[_0x488834(0x2cc)](0x0,_0x2cd445);for(const _0x1f24be of _0xda6690){const _0x5021b0=DataManager['traitSetType'](_0x1f24be),_0x4f6e41=_0x25b1b9['traitSet'](_0x1f24be);this['drawItemDarkRect'](0x0,_0x267d49,_0x2cd445,_0x4df300,0x2);const _0x3cc98c='\x5cC[16]%1:\x20\x5cC[0]%2'[_0x488834(0x18d)](_0x5021b0['Label'],_0x4f6e41[_0x488834(0x1bf)]);this[_0x488834(0x29c)](_0x3cc98c,_0x36154f,_0x267d49,_0x2cd445-_0x36154f*0x2),_0x267d49+=_0x4df300,this[_0x488834(0x1b3)](),this[_0x488834(0x311)](0x0,_0x267d49,_0x2cd445,_0x3b008d),this[_0x488834(0x29c)](_0x4f6e41[_0x488834(0x28c)],_0x36154f,_0x267d49,_0x2cd445-_0x36154f*0x2),_0x267d49+=_0x3b008d,this[_0x488834(0x1fb)]();}this[_0x488834(0x233)]-_0x267d49>0x0&&this[_0x488834(0x311)](0x0,_0x267d49,_0x2cd445,this['innerHeight']-_0x267d49);_0x267d49=0x0;for(const _0xc593d8 of _0x4311a2){const _0x456b72=DataManager[_0x488834(0x278)](_0xc593d8),_0x3d9464=_0x25b1b9[_0x488834(0x23f)](_0xc593d8);this[_0x488834(0x311)](_0x2cd445,_0x267d49,_0x2cd445,_0x4df300,0x2);const _0x3490fd=_0x488834(0x2b9)[_0x488834(0x18d)](_0x456b72[_0x488834(0x32e)],_0x3d9464['Display']);this['drawTextEx'](_0x3490fd,_0x2cd445+_0x36154f,_0x267d49,_0x2cd445-_0x36154f*0x2),_0x267d49+=_0x4df300,this['setDescriptionFontSizeToTraitSet'](),this['drawItemDarkRect'](_0x2cd445,_0x267d49,_0x2cd445,_0x3b008d),this['drawTextEx'](_0x3d9464['Description'],_0x2cd445+_0x36154f,_0x267d49,_0x2cd445-_0x36154f*0x2),_0x267d49+=_0x3b008d,this['resetDescriptionFontSize']();}this[_0x488834(0x233)]-_0x267d49>0x0&&this[_0x488834(0x311)](_0x2cd445,_0x267d49,_0x2cd445,this['innerHeight']-_0x267d49);},Window_StatusData['prototype'][_0x4e22e6(0x1b6)]=function(){const _0x2b5dc3=_0x4e22e6,_0x3c7aa9=[0x0]['concat'](this[_0x2b5dc3(0x2e0)]());return[...Array($dataSystem['elements'][_0x2b5dc3(0x355)])[_0x2b5dc3(0x2ec)]()][_0x2b5dc3(0x20b)](_0x310d82=>!_0x3c7aa9[_0x2b5dc3(0x23c)](_0x310d82));},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x2e0)]=function(){const _0x5cc9a3=_0x4e22e6;return[0x0]['concat'](VisuMZ['ElementStatusCore'][_0x5cc9a3(0x1d3)][_0x5cc9a3(0x2ea)]['ExcludeElements']);},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x289)]=function(){const _0x29d31a=_0x4e22e6,_0x216186=[0x0]['concat'](this['getExcludedElementIDs']());let _0x3c4f35=this[_0x29d31a(0x2f7)](0x1);return _0x3c4f35[_0x29d31a(0x355)]<=0x0&&(_0x3c4f35=this['getElementIDsColRaw'](0x2),_0x3c4f35['length']<=0x0&&(_0x3c4f35=this['getElementIDs']())),_0x3c4f35['filter'](_0xdf840=>!_0x216186[_0x29d31a(0x23c)](_0xdf840));},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x396)]=function(){const _0x13e4cb=_0x4e22e6,_0x17cb37=[0x0][_0x13e4cb(0x1c2)](this[_0x13e4cb(0x2e0)]());let _0x141a3c=this[_0x13e4cb(0x2f7)](0x2);return _0x141a3c[_0x13e4cb(0x20b)](_0x4eac2f=>!_0x17cb37[_0x13e4cb(0x23c)](_0x4eac2f));},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x2f7)]=function(_0x3e86e8){const _0x2423fe=_0x4e22e6,_0x5b665d=[0x0][_0x2423fe(0x1c2)](this['getExcludedElementIDs']());let _0x13a1a5=VisuMZ[_0x2423fe(0x29e)][_0x2423fe(0x1d3)][_0x2423fe(0x2ea)][_0x2423fe(0x33c)[_0x2423fe(0x18d)](_0x3e86e8)]??[];return _0x13a1a5['filter'](_0x179b89=>!_0x5b665d[_0x2423fe(0x23c)](_0x179b89));},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x34e)]=function(){const _0x45ad71=_0x4e22e6,_0x43ff7a=this['lineHeight'](),_0x6a4d34=this[_0x45ad71(0x1b7)],_0x2248db=this[_0x45ad71(0x38a)](),_0x31ac03=_0x45ad71(0x2b9),_0x407489=DataManager['traitSetType'](_0x45ad71(0x363)),_0x3c48c7=_0x6a4d34[_0x45ad71(0x23f)](_0x45ad71(0x363)),_0x3498c4=DataManager[_0x45ad71(0x278)]('SubElement'),_0x4d865d=_0x6a4d34[_0x45ad71(0x23f)](_0x45ad71(0x32c)),_0x13bc3c=this['innerHeight']/Math[_0x45ad71(0x2de)](Window_StatusData['traitCol1'][_0x45ad71(0x355)],Window_StatusData[_0x45ad71(0x298)]['length'])-_0x43ff7a;let _0x446ab3=0x0,_0x3753bd=0x0,_0xd79af=this[_0x45ad71(0x185)]/0x2;this[_0x45ad71(0x2cc)](0x0,_0xd79af);(_0x407489[_0x45ad71(0x15e)]||_0x3498c4[_0x45ad71(0x15e)])&&(this['drawItemDarkRect'](_0x446ab3,_0x3753bd,_0xd79af,_0x43ff7a,0x2),this[_0x45ad71(0x311)](_0xd79af,_0x3753bd,_0xd79af,_0x43ff7a,0x2),_0x407489['Visible']&&this[_0x45ad71(0x29c)](_0x31ac03[_0x45ad71(0x18d)](_0x407489['Label'],_0x3c48c7[_0x45ad71(0x1bf)]),_0x2248db,_0x3753bd,_0xd79af-_0x2248db*0x2),_0x3498c4[_0x45ad71(0x15e)]&&this['drawTextEx'](_0x31ac03[_0x45ad71(0x18d)](_0x3498c4[_0x45ad71(0x32e)],_0x4d865d[_0x45ad71(0x1bf)]),_0xd79af+_0x2248db,_0x3753bd,_0xd79af-_0x2248db*0x2),_0x3753bd+=_0x43ff7a,this['setDescriptionFontSizeToTraitSet'](),this[_0x45ad71(0x311)](_0x446ab3,_0x3753bd,_0xd79af,_0x13bc3c),this[_0x45ad71(0x311)](_0xd79af,_0x3753bd,_0xd79af,_0x13bc3c),_0x407489[_0x45ad71(0x15e)]&&this['drawTextEx'](_0x3c48c7[_0x45ad71(0x28c)],_0x2248db,_0x3753bd,_0xd79af-_0x2248db*0x2),_0x3498c4[_0x45ad71(0x15e)]&&this[_0x45ad71(0x29c)](_0x4d865d[_0x45ad71(0x28c)],_0xd79af+_0x2248db,_0x3753bd,_0xd79af-_0x2248db*0x2),this[_0x45ad71(0x1fb)](),this[_0x45ad71(0x23d)](),_0x3753bd+=_0x13bc3c);const _0x5076a1=_0x3753bd,_0x386277=this[_0x45ad71(0x289)](),_0x4247bb=this['getElementIDsCol2']();let _0x557c84;_0x4247bb[_0x45ad71(0x355)]>0x0?_0x557c84=[_0x45ad71(0x172),_0x45ad71(0x172),'Bonus',_0x45ad71(0x34b)]:_0x557c84=[_0x45ad71(0x172),_0x45ad71(0x34b)];const _0x1be3ad=Math[_0x45ad71(0x2de)](_0x386277['length'],_0x4247bb[_0x45ad71(0x355)],0x1),_0x8ddedb=_0x557c84[_0x45ad71(0x355)];this[_0x45ad71(0x311)](_0xd79af*0x0,_0x3753bd,_0xd79af,_0x43ff7a,0x2),this['drawItemDarkRect'](_0xd79af*0x1,_0x3753bd,_0xd79af,_0x43ff7a,0x2),this[_0x45ad71(0x2f1)](ColorManager[_0x45ad71(0x1e3)]()),this[_0x45ad71(0x229)](TextManager[_0x45ad71(0x17c)],_0xd79af*0x0,_0x3753bd,_0xd79af,_0x45ad71(0x242)),this[_0x45ad71(0x229)](TextManager[_0x45ad71(0x15b)],_0xd79af*0x1,_0x3753bd,_0xd79af,_0x45ad71(0x242)),_0x3753bd+=_0x43ff7a,this['setDescriptionFontSizeToTraitSet']();const _0x5db60d=this[_0x45ad71(0x31d)]('\x20')[_0x45ad71(0x20a)];for(let _0x471472=0x0;_0x471472<_0x1be3ad;_0x471472++){for(let _0x402a06=0x0;_0x402a06<_0x8ddedb;_0x402a06++){const _0x495400=this['innerWidth']/_0x8ddedb;this[_0x45ad71(0x311)](_0x495400*_0x402a06,_0x3753bd,_0x495400,_0x5db60d);let _0x27e17e=_0x386277[_0x471472];_0x8ddedb===0x4&&(_0x27e17e=_0x402a06%0x2===0x0?_0x386277[_0x471472]:_0x4247bb[_0x471472]);if(!_0x27e17e)continue;const _0x41f5cb=$dataSystem['elements'][_0x27e17e];this[_0x45ad71(0x29c)](_0x41f5cb,_0x495400*(_0x402a06+0x1/0x3)+_0x2248db,_0x3753bd,_0x495400*0x2/0x3);const _0x3f491c=_0x557c84[_0x402a06];this[_0x45ad71(0x23d)]();let _0x31f64d='';if(_0x3f491c===_0x45ad71(0x172)){const _0x21e556=_0x6a4d34['elementRate'](_0x27e17e),_0x3bb299=(_0x21e556-0x1)*-0x1;this[_0x45ad71(0x2f1)](ColorManager[_0x45ad71(0x234)](_0x3bb299)),_0x31f64d='%1%'['format'](Math[_0x45ad71(0x28b)](_0x3bb299*0x64));if(_0x6a4d34[_0x45ad71(0x15f)]()['includes'](_0x27e17e))this[_0x45ad71(0x2f1)](ColorManager[_0x45ad71(0x32b)]()),_0x31f64d=TextManager[_0x45ad71(0x162)]['format'](Math[_0x45ad71(0x28b)](_0x21e556*0x64));else{if(_0x21e556>0x1)_0x31f64d='%1'[_0x45ad71(0x18d)](_0x31f64d);else _0x21e556<=0x1&&(_0x31f64d=_0x45ad71(0x2c7)[_0x45ad71(0x18d)](_0x31f64d));}}else{if(_0x3f491c===_0x45ad71(0x34b)){const _0xc09a30=_0x6a4d34['getDealtElementPlus'](_0x27e17e),_0x1c27b9=_0x6a4d34[_0x45ad71(0x262)](_0x27e17e),_0x5257fb=_0x6a4d34[_0x45ad71(0x279)](_0x27e17e),_0x3626f7=(0x1+_0xc09a30)*_0x1c27b9+_0x5257fb-0x1;this[_0x45ad71(0x2f1)](ColorManager[_0x45ad71(0x234)](_0x3626f7)),_0x31f64d='%1%'[_0x45ad71(0x18d)](Math[_0x45ad71(0x28b)](_0x3626f7*0x64));if(_0x3626f7>=0x0)_0x31f64d=_0x45ad71(0x2c7)[_0x45ad71(0x18d)](_0x31f64d);}}this['contents'][_0x45ad71(0x229)](_0x31f64d,_0x495400*_0x402a06,_0x3753bd,_0x495400/0x3-_0x2248db,_0x5db60d,_0x45ad71(0x2d2));}_0x3753bd+=_0x5db60d;}for(let _0x2e0acf=0x0;_0x2e0acf<_0x8ddedb;_0x2e0acf++){const _0x270142=this[_0x45ad71(0x185)]/_0x8ddedb;this[_0x45ad71(0x311)](_0x270142*_0x2e0acf,_0x3753bd,_0x270142,this[_0x45ad71(0x233)]-_0x3753bd);}},Window_StatusData['prototype'][_0x4e22e6(0x38b)]=function(_0x44ac07){const _0x2be6f1=_0x4e22e6;this[_0x2be6f1(0x23d)]();let _0x29d017=0x0;for(const _0x5575da of _0x44ac07){if(!_0x5575da)continue;if(_0x5575da[_0x2be6f1(0x24f)]()==='')continue;if(_0x5575da[_0x2be6f1(0x356)](/-----/i))continue;_0x29d017=Math['max'](_0x29d017,this['textSizeEx'](_0x5575da[_0x2be6f1(0x24f)]())[_0x2be6f1(0x359)]);}return _0x29d017;},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x28d)]=function(){const _0x14ca93=_0x4e22e6;if(this[_0x14ca93(0x371)])return this[_0x14ca93(0x371)];return this['_stypeWidth']=this[_0x14ca93(0x38b)]($dataSystem[_0x14ca93(0x214)]),this[_0x14ca93(0x371)];},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x339)]=function(){const _0x39d585=_0x4e22e6;if(this[_0x39d585(0x2fe)])return this[_0x39d585(0x2fe)];return this[_0x39d585(0x2fe)]=this[_0x39d585(0x38b)]($dataSystem[_0x39d585(0x227)]),this[_0x39d585(0x2fe)];},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x1e7)]=function(){const _0x4290fe=_0x4e22e6;if(this[_0x4290fe(0x388)])return this[_0x4290fe(0x388)];return this[_0x4290fe(0x388)]=this[_0x4290fe(0x38b)]($dataSystem[_0x4290fe(0x1ce)]),this[_0x4290fe(0x388)];},Window_StatusData[_0x4e22e6(0x35f)][_0x4e22e6(0x197)]=function(){const _0x5b7be0=_0x4e22e6,_0x17864b=this[_0x5b7be0(0x1aa)](),_0x3e8d66=this['_actor'],_0x4595e8=Math[_0x5b7be0(0x2ab)](this[_0x5b7be0(0x185)]/0x3);let _0x125dd8=0x0,_0xd5e960=0x0;this[_0x5b7be0(0x2cc)](0x0,this[_0x5b7be0(0x185)]/0x2);let _0xc0ee74=new Rectangle(0x0,0x0,_0x4595e8,this[_0x5b7be0(0x233)]);_0x125dd8=_0xc0ee74['x'],_0xd5e960=0x0,this['resetFontSettings'](),this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74['width'],_0x17864b,0x2),this[_0x5b7be0(0x2f1)](ColorManager['systemColor']()),this[_0x5b7be0(0x229)](TextManager[_0x5b7be0(0x340)],_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],'center'),_0xd5e960+=_0x17864b;for(const _0x47cab4 of _0x3e8d66[_0x5b7be0(0x214)]()){this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],_0x17864b);if(_0x47cab4>0x0){const _0x3c8f6a=$dataSystem['skillTypes'][_0x47cab4],_0x29579f=Math[_0x5b7be0(0x28b)]((_0xc0ee74[_0x5b7be0(0x359)]-this['stypeWidth']())/0x2);this[_0x5b7be0(0x29c)](_0x3c8f6a,_0x125dd8+_0x29579f,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)]-_0x29579f*0x2);}_0xd5e960+=_0x17864b;}this['drawItemDarkRect'](_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],this[_0x5b7be0(0x233)]-_0xd5e960),_0xc0ee74['x']+=_0xc0ee74[_0x5b7be0(0x359)],_0x125dd8=_0xc0ee74['x'],_0xd5e960=0x0,this['resetFontSettings'](),this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],_0x17864b,0x2),this[_0x5b7be0(0x2f1)](ColorManager[_0x5b7be0(0x1e3)]()),this[_0x5b7be0(0x229)](TextManager[_0x5b7be0(0x255)],_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],_0x5b7be0(0x242)),_0xd5e960+=_0x17864b;for(const _0x50b94f of _0x3e8d66[_0x5b7be0(0x227)]()){this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],_0x17864b);if(_0x50b94f>0x0){const _0x4f0cd6=$dataSystem[_0x5b7be0(0x227)][_0x50b94f],_0x1abbc3=Math[_0x5b7be0(0x28b)]((_0xc0ee74['width']-this[_0x5b7be0(0x339)]())/0x2);this[_0x5b7be0(0x29c)](_0x4f0cd6,_0x125dd8+_0x1abbc3,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)]-_0x1abbc3*0x2);}_0xd5e960+=_0x17864b;}this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],this[_0x5b7be0(0x233)]-_0xd5e960),_0xc0ee74['x']+=_0xc0ee74[_0x5b7be0(0x359)],_0x125dd8=_0xc0ee74['x'],_0xd5e960=0x0,_0xc0ee74['width']=this[_0x5b7be0(0x185)]-_0xc0ee74['x'],this[_0x5b7be0(0x23d)](),this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74['width'],_0x17864b,0x2),this[_0x5b7be0(0x2f1)](ColorManager[_0x5b7be0(0x1e3)]()),this[_0x5b7be0(0x229)](TextManager[_0x5b7be0(0x2fb)],_0x125dd8,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)],_0x5b7be0(0x242)),_0xd5e960+=_0x17864b;for(const _0x403dd7 of _0x3e8d66[_0x5b7be0(0x1ce)]()){this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74['width'],_0x17864b);if(_0x403dd7>0x0){const _0xa2fb01=$dataSystem[_0x5b7be0(0x1ce)][_0x403dd7],_0x25167c=Math[_0x5b7be0(0x28b)]((_0xc0ee74[_0x5b7be0(0x359)]-this[_0x5b7be0(0x1e7)]())/0x2);this[_0x5b7be0(0x29c)](_0xa2fb01,_0x125dd8+_0x25167c,_0xd5e960,_0xc0ee74[_0x5b7be0(0x359)]-_0x25167c*0x2);}_0xd5e960+=_0x17864b;}this[_0x5b7be0(0x311)](_0x125dd8,_0xd5e960,_0xc0ee74['width'],this[_0x5b7be0(0x233)]-_0xd5e960);};