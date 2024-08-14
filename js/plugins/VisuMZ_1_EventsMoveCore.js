//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.60;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.60] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Character Sprite Filename Tags
 * ============================================================================
 * 
 * For the files located inside of your project's /img/characters/ folder, if
 * the filenames themselves have specific "tags" in them, special properties
 * will be applied to them. These tags can be combined together with a few
 * exceptions.
 * 
 * Some of these are new to VisuStella MZ, while others are default to MZ.
 * 
 * ---
 * 
 *   !filename.png
 *   - Tag: !
 *   - Causes this character's sprite to align with the tile grid instead of
 *     being lifted a few pixels higher.
 *   - This is primarily used for things like doors, chests, and floor plates.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   $filename.png
 *   - Tag: $
 *   - Causes this character's sprite to use the "big character" format.
 *   - Primarily used for sprites like the big monsters and such which only
 *     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
 *   - Cannot be combined with the [VS8] tag.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   filename[Invisible].png
 *   - Tag: [Invisible] or [Inv]
 *   - This character's sprite will become invisible on the map screen in-game
 *     while almost everything else about it is visible.
 *   - This is used for those who wish to use sprite labels for things such as
 *     autorun and parallel events.
 * 
 * ---
 * 
 *   filename[VS8].png
 *   - Tag: [VS8]
 *   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
 *   - Refer to the section below.
 *   - Cannot be combined with the $ tag.
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 *
 * ---
 * 
 * <Label Range Type: Square>
 * <Label Range Type: Circle>
 * <Label Range Type: Diamond>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range type for the label to appear visible for.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Diamond: A diamond-shaped range with the event at the center.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 * 
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Location X: +x>
 * <Location X: -x>
 * 
 * <Location Y: +x>
 * <Location Y: -x>
 * 
 * <Location: +x, +y>
 * <Location: +x, -y>
 * <Location: -x, +y>
 * <Location: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the initial location of this event by +x and +y (or -x and -y).
 * - This allows you to stack events on top of each other or even move them to
 *   various places of the map.
 * - Replace 'x' with a number that represents the horizontal tiles to adjust
 *   the initial starting location by.
 * - Replace 'y' with a number that represents the vertical tiles to adjust
 *   the initial starting location by.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Type: Enemy>
 * <Picture Type: SV Enemy>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *   grab a picture graphic from.
 * - Other picture graphic sprite related notetags will apply as normal.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Tile Expand Up: x>
 * <Tile Expand Down: x>
 * <Tile Expand Left: x>
 * <Tile Expand Right: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used for events with tile graphics. Expands the graphic up, down, left, or
 *   right from the spritesheet.
 *   - This does NOT expand the hitbox.
 * - The graphic will be anchored to the tile it's expanded from. This means
 *   even if you expanded downward, the actual event's position will still be
 *   the current event's X/Y coordinates. It's just grown more vertically and
 *   is still centered horizontally.
 * - This is primarily used to save on having to use too many events for tiles
 *   that expanded past 1x1 tile sizes.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 * - This change is temporary and resets upon new events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Change (Forced)
 * - Change the icon that appears on an event.
 * - This change is forced and needs to be restored.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * Event Icon: Restore
 * - Restores a deleted or forced icon that appears on an event.
 * 
 *   Map ID: 
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 * 
 *     Range Type:
 *     - What do you want the default label visible range type?
 *       - Square
 *       - Diamond
 *       - Circle
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.60: August 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Event Labels will adjust their vertical position to the picture of any
 *    attached event picture if one is present. Update by Arisu.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Picture Type: Enemy>
 * *** <Picture Type: SV Enemy>
 * **** Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *      grab a picture graphic from.
 * **** Other picture graphic sprite related notetags will apply as normal.
 * *** <Label Range Type: Square>
 * *** <Label Range Type: Circle>
 * *** <Label Range Type: Diamond>
 * **** Sets a range type for the label to appear visible for.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Event Label Settings > Visible Range > Range Type:
 * **** What do you want the default label visible range type?
 * 
 * Version 1.59: June 13, 2024
 * * Bug Fixes!
 * ** Added a cache check for character sprite tag names to reduce frame drops.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Location X: +x>, <Location X: -x>
 * *** <Location Y: +y>, <Location Y: -y>
 * *** <Location: +x, +y>, <Location: +x, -y>
 * *** <Location: -x, +y>, <Location: -x, -y>
 * **** Adjusts the initial location of this event by +x and +y (or -x and -y).
 * **** This allows you to stack events on top of each other or even move them
 *      to various places of the map.
 * *** <Tile Expand Up: x>
 * *** <Tile Expand Down: x>
 * *** <Tile Expand Left: x>
 * *** <Tile Expand Right: x>
 * **** Used for events with tile graphics. Expands the graphic up, down, left,
 *      or right from the spritesheet.
 * **** This does NOT expand the hitbox.
 * **** The graphic will be anchored to the tile it's expanded from. This means
 *      even if you expanded downward, the actual event's position will still
 *      be the current event's X/Y coordinates. It's just grown more vertically
 *      and is still centered horizontally.
 * **** This is primarily used to save on having to use too many events for
 *      tiles that expanded past 1x1 tile sizes.
 * 
 * Version 1.58: May 16, 2024
 * * Documentation Update!
 * ** Added "Features: Character Sprite Filename Tags" section.
 * * New Features!
 * ** [Invisible] tag added to character sprite filenames.
 * *** If a character sprite's filename has [invisible] in it, it will become
 *     invisible on the map screen in-game while almost everything else about
 *     it is visible. This is used for those who wish to use sprite labels for
 *     things such as autorun and parallel events.
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 * @param RangeType:str
 * @text Range Type
 * @parent VisibleRange:num
 * @type select
 * @option square
 * @option circle
 * @option diamond
 * @desc What do you want the default label visible range type?
 * @default square
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0x1f2382=_0xcc2a;(function(_0x26db26,_0x2b3684){const _0x2ef398=_0xcc2a,_0x550b96=_0x26db26();while(!![]){try{const _0x296368=-parseInt(_0x2ef398(0x1e2))/0x1+-parseInt(_0x2ef398(0x126))/0x2*(parseInt(_0x2ef398(0x516))/0x3)+-parseInt(_0x2ef398(0x4aa))/0x4*(-parseInt(_0x2ef398(0x2f0))/0x5)+parseInt(_0x2ef398(0x3de))/0x6*(parseInt(_0x2ef398(0x39e))/0x7)+-parseInt(_0x2ef398(0x1ac))/0x8+parseInt(_0x2ef398(0x1e9))/0x9*(-parseInt(_0x2ef398(0x20a))/0xa)+-parseInt(_0x2ef398(0x107))/0xb*(-parseInt(_0x2ef398(0x11e))/0xc);if(_0x296368===_0x2b3684)break;else _0x550b96['push'](_0x550b96['shift']());}catch(_0x4d55db){_0x550b96['push'](_0x550b96['shift']());}}}(_0x1b24,0x8b14e));var label=_0x1f2382(0x4a7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1f2382(0x49f)](function(_0x3b4501){const _0x551e20=_0x1f2382;return _0x3b4501[_0x551e20(0xff)]&&_0x3b4501[_0x551e20(0x13f)][_0x551e20(0x48f)]('['+label+']');})[0x0];VisuMZ[label][_0x1f2382(0x196)]=VisuMZ[label][_0x1f2382(0x196)]||{},VisuMZ[_0x1f2382(0x3ae)]=function(_0x52fa44,_0x4dc397){const _0x5d1f18=_0x1f2382;for(const _0x1dec59 in _0x4dc397){if(_0x1dec59[_0x5d1f18(0x4e7)](/(.*):(.*)/i)){const _0x2b4e42=String(RegExp['$1']),_0x3cbf81=String(RegExp['$2'])['toUpperCase']()[_0x5d1f18(0x122)]();let _0x8b042c,_0x3efb24,_0x3e5cc4;switch(_0x3cbf81){case _0x5d1f18(0x104):_0x8b042c=_0x4dc397[_0x1dec59]!==''?Number(_0x4dc397[_0x1dec59]):0x0;break;case'ARRAYNUM':_0x3efb24=_0x4dc397[_0x1dec59]!==''?JSON[_0x5d1f18(0x440)](_0x4dc397[_0x1dec59]):[],_0x8b042c=_0x3efb24[_0x5d1f18(0x302)](_0x322b7c=>Number(_0x322b7c));break;case _0x5d1f18(0xf1):_0x8b042c=_0x4dc397[_0x1dec59]!==''?eval(_0x4dc397[_0x1dec59]):null;break;case _0x5d1f18(0x53a):_0x3efb24=_0x4dc397[_0x1dec59]!==''?JSON[_0x5d1f18(0x440)](_0x4dc397[_0x1dec59]):[],_0x8b042c=_0x3efb24[_0x5d1f18(0x302)](_0x202a51=>eval(_0x202a51));break;case _0x5d1f18(0x27d):_0x8b042c=_0x4dc397[_0x1dec59]!==''?JSON[_0x5d1f18(0x440)](_0x4dc397[_0x1dec59]):'';break;case _0x5d1f18(0x2f4):_0x3efb24=_0x4dc397[_0x1dec59]!==''?JSON[_0x5d1f18(0x440)](_0x4dc397[_0x1dec59]):[],_0x8b042c=_0x3efb24[_0x5d1f18(0x302)](_0x2debfd=>JSON[_0x5d1f18(0x440)](_0x2debfd));break;case _0x5d1f18(0x1a3):_0x8b042c=_0x4dc397[_0x1dec59]!==''?new Function(JSON['parse'](_0x4dc397[_0x1dec59])):new Function(_0x5d1f18(0x596));break;case _0x5d1f18(0x2fe):_0x3efb24=_0x4dc397[_0x1dec59]!==''?JSON['parse'](_0x4dc397[_0x1dec59]):[],_0x8b042c=_0x3efb24[_0x5d1f18(0x302)](_0x373524=>new Function(JSON[_0x5d1f18(0x440)](_0x373524)));break;case _0x5d1f18(0x1b5):_0x8b042c=_0x4dc397[_0x1dec59]!==''?String(_0x4dc397[_0x1dec59]):'';break;case _0x5d1f18(0x3ff):_0x3efb24=_0x4dc397[_0x1dec59]!==''?JSON[_0x5d1f18(0x440)](_0x4dc397[_0x1dec59]):[],_0x8b042c=_0x3efb24[_0x5d1f18(0x302)](_0x253372=>String(_0x253372));break;case _0x5d1f18(0x2ed):_0x3e5cc4=_0x4dc397[_0x1dec59]!==''?JSON['parse'](_0x4dc397[_0x1dec59]):{},_0x52fa44[_0x2b4e42]={},VisuMZ[_0x5d1f18(0x3ae)](_0x52fa44[_0x2b4e42],_0x3e5cc4);continue;case _0x5d1f18(0x1be):_0x3efb24=_0x4dc397[_0x1dec59]!==''?JSON[_0x5d1f18(0x440)](_0x4dc397[_0x1dec59]):[],_0x8b042c=_0x3efb24[_0x5d1f18(0x302)](_0x52bc2e=>VisuMZ[_0x5d1f18(0x3ae)]({},JSON['parse'](_0x52bc2e)));break;default:continue;}_0x52fa44[_0x2b4e42]=_0x8b042c;}}return _0x52fa44;},(_0x2b9a70=>{const _0x326bd9=_0x1f2382,_0x35efeb=_0x2b9a70[_0x326bd9(0x1f1)];for(const _0x397e1b of dependencies){if(!Imported[_0x397e1b]){alert(_0x326bd9(0x3e9)[_0x326bd9(0x504)](_0x35efeb,_0x397e1b)),SceneManager[_0x326bd9(0x3c8)]();break;}}const _0x4e412e=_0x2b9a70[_0x326bd9(0x13f)];if(_0x4e412e[_0x326bd9(0x4e7)](/\[Version[ ](.*?)\]/i)){const _0x3cf855=Number(RegExp['$1']);_0x3cf855!==VisuMZ[label][_0x326bd9(0x37d)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x326bd9(0x504)](_0x35efeb,_0x3cf855)),SceneManager[_0x326bd9(0x3c8)]());}if(_0x4e412e['match'](/\[Tier[ ](\d+)\]/i)){const _0x12e193=Number(RegExp['$1']);_0x12e193<tier?(alert(_0x326bd9(0x208)['format'](_0x35efeb,_0x12e193,tier)),SceneManager[_0x326bd9(0x3c8)]()):tier=Math[_0x326bd9(0x238)](_0x12e193,tier);}VisuMZ[_0x326bd9(0x3ae)](VisuMZ[label][_0x326bd9(0x196)],_0x2b9a70[_0x326bd9(0x1fc)]);})(pluginData),VisuMZ[_0x1f2382(0xd8)]=function(_0x276a45,_0x3d0638,_0x5b0577){switch(_0x5b0577){case'=':return _0x3d0638;break;case'+':return _0x276a45+_0x3d0638;break;case'-':return _0x276a45-_0x3d0638;break;case'*':return _0x276a45*_0x3d0638;break;case'/':return _0x276a45/_0x3d0638;break;case'%':return _0x276a45%_0x3d0638;break;}return _0x276a45;},PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x20c),_0x39fd85=>{const _0x38d344=_0x1f2382;VisuMZ[_0x38d344(0x3ae)](_0x39fd85,_0x39fd85);switch(_0x39fd85[_0x38d344(0x4c3)]){case'Allow':$gameSystem[_0x38d344(0x1a7)](!![]);break;case'Stop':$gameSystem[_0x38d344(0x1a7)](![]);break;case _0x38d344(0x546):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x38d344(0x513)]());break;}}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x201),_0x3eeab0=>{const _0x59e588=_0x1f2382;VisuMZ[_0x59e588(0x3ae)](_0x3eeab0,_0x3eeab0);const _0x4f86eb=$gameTemp[_0x59e588(0x1bd)](),_0x2d03bc={'mapId':_0x3eeab0[_0x59e588(0x23f)],'eventId':_0x3eeab0['EventId']||_0x4f86eb[_0x59e588(0x37b)](),'pageId':_0x3eeab0[_0x59e588(0x58a)]};if(_0x2d03bc[_0x59e588(0x490)]<=0x0)_0x2d03bc[_0x59e588(0x490)]=$gameMap?$gameMap[_0x59e588(0x490)]():0x1;$gameTemp[_0x59e588(0x1bd)]()[_0x59e588(0x1a5)](_0x2d03bc);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'DashEnableToggle',_0x3ee803=>{const _0x378da2=_0x1f2382;VisuMZ[_0x378da2(0x3ae)](_0x3ee803,_0x3ee803);switch(_0x3ee803[_0x378da2(0x4c3)]){case _0x378da2(0x565):$gameSystem[_0x378da2(0x14e)](!![]);break;case _0x378da2(0x48c):$gameSystem[_0x378da2(0x14e)](![]);break;case _0x378da2(0x546):$gameSystem['setDashingEnabled'](!$gameSystem[_0x378da2(0x3ec)]());break;}}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x237),_0x3eb92a=>{const _0x315b25=_0x1f2382;VisuMZ[_0x315b25(0x3ae)](_0x3eb92a,_0x3eb92a);const _0x24e504=$gameTemp[_0x315b25(0x1bd)]();_0x3eb92a[_0x315b25(0x23f)]=_0x3eb92a[_0x315b25(0x23f)]||$gameMap[_0x315b25(0x490)](),$gameSystem[_0x315b25(0x4f4)](_0x3eb92a[_0x315b25(0x23f)],_0x3eb92a[_0x315b25(0x3bb)]||_0x24e504[_0x315b25(0x37b)](),_0x3eb92a[_0x315b25(0x540)],_0x3eb92a[_0x315b25(0x220)],_0x3eb92a[_0x315b25(0x1b0)],_0x3eb92a[_0x315b25(0x35d)],![]);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x3a5),_0x519516=>{const _0x3cef6e=_0x1f2382;VisuMZ[_0x3cef6e(0x3ae)](_0x519516,_0x519516);const _0x4dd3df=$gameTemp[_0x3cef6e(0x1bd)]();_0x519516[_0x3cef6e(0x23f)]=_0x519516[_0x3cef6e(0x23f)]||$gameMap[_0x3cef6e(0x490)](),$gameSystem[_0x3cef6e(0x4f4)](_0x519516[_0x3cef6e(0x23f)],_0x519516[_0x3cef6e(0x3bb)]||_0x4dd3df[_0x3cef6e(0x37b)](),_0x519516[_0x3cef6e(0x540)],_0x519516['IconBufferX'],_0x519516[_0x3cef6e(0x1b0)],_0x519516['IconBlendMode'],!![]);}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0xe6),_0x39d401=>{const _0x2f8766=_0x1f2382;VisuMZ['ConvertParams'](_0x39d401,_0x39d401);const _0x14530d=$gameTemp[_0x2f8766(0x1bd)]();_0x39d401[_0x2f8766(0x23f)]=_0x39d401['MapId']||$gameMap[_0x2f8766(0x490)](),$gameSystem[_0x2f8766(0x414)](_0x39d401[_0x2f8766(0x23f)],_0x39d401[_0x2f8766(0x3bb)]||_0x14530d[_0x2f8766(0x37b)]());}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'EventIconRestore',_0x5b2303=>{const _0x3451c6=_0x1f2382;VisuMZ[_0x3451c6(0x3ae)](_0x5b2303,_0x5b2303);const _0x440192=$gameTemp[_0x3451c6(0x1bd)]();_0x5b2303[_0x3451c6(0x23f)]=_0x5b2303[_0x3451c6(0x23f)]||$gameMap[_0x3451c6(0x490)](),$gameSystem[_0x3451c6(0x43c)](_0x5b2303[_0x3451c6(0x23f)],_0x5b2303[_0x3451c6(0x3bb)]||_0x440192[_0x3451c6(0x37b)]());}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x503),_0x596e6e=>{const _0x364a09=_0x1f2382;if($gameMap)for(const _0x5519ab of $gameMap[_0x364a09(0x252)]()){_0x5519ab['refresh'](),_0x5519ab[_0x364a09(0x1b1)]();}if(SceneManager['isSceneMap']()){const _0x2ad553=SceneManager[_0x364a09(0x4c5)][_0x364a09(0x1e4)];if(_0x2ad553)_0x2ad553[_0x364a09(0x1a0)]();}}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x376),_0x4e2e9d=>{const _0x3a2111=_0x1f2382;VisuMZ[_0x3a2111(0x3ae)](_0x4e2e9d,_0x4e2e9d);switch(_0x4e2e9d['Visibility']){case _0x3a2111(0x364):$gameSystem[_0x3a2111(0x21e)](!![]);break;case _0x3a2111(0xf0):$gameSystem['setEventLabelsVisible'](![]);break;case'Toggle':$gameSystem[_0x3a2111(0x21e)](!$gameSystem[_0x3a2111(0x47c)]());break;}}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x19e),_0x483ba3=>{const _0x3d979b=_0x1f2382;VisuMZ[_0x3d979b(0x3ae)](_0x483ba3,_0x483ba3);const _0x45f9d5=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x310c87=$gameMap[_0x3d979b(0x451)](_0x483ba3['EventId']||_0x45f9d5[_0x3d979b(0x37b)]());if(_0x310c87)_0x310c87[_0x3d979b(0x1e0)]();}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'EventLocationCreate',_0x4eb986=>{const _0x202cfb=_0x1f2382;VisuMZ[_0x202cfb(0x3ae)](_0x4eb986,_0x4eb986);const _0x12189c=$gameTemp[_0x202cfb(0x1bd)](),_0x3202f8=_0x4eb986['MapId']||$gameMap[_0x202cfb(0x490)](),_0x360173=_0x4eb986['EventId']||_0x12189c[_0x202cfb(0x37b)](),_0x3bd2b0=_0x4eb986[_0x202cfb(0x18f)]||0x0,_0x88a0ec=_0x4eb986['PosY']||0x0,_0x13a86=_0x4eb986[_0x202cfb(0x14d)]||0x2,_0x3e859a=((_0x4eb986['PageId']||0x1)-0x1)[_0x202cfb(0x1ad)](0x0,0x13),_0x3887e0=_0x4eb986['MoveRouteIndex']||0x0;$gameSystem[_0x202cfb(0x54d)](_0x3202f8,_0x360173,_0x3bd2b0,_0x88a0ec,_0x13a86,_0x3e859a,_0x3887e0);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x445),_0x27fc8b=>{const _0x12a593=_0x1f2382;VisuMZ[_0x12a593(0x3ae)](_0x27fc8b,_0x27fc8b);const _0x1210e4=$gameTemp['getLastPluginCommandInterpreter'](),_0x4aa9e6=_0x27fc8b[_0x12a593(0x23f)]||$gameMap[_0x12a593(0x490)](),_0x2b7dbd=_0x27fc8b[_0x12a593(0x3bb)]||_0x1210e4[_0x12a593(0x37b)]();$gameSystem[_0x12a593(0x2f5)](_0x4aa9e6,_0x2b7dbd);}),VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x1d5)]=function(_0x61a621,_0x14ddb7){const _0x5bd13e=_0x1f2382;_0x14ddb7=_0x14ddb7||{},_0x61a621['fadeDuration']={'fadeIn':_0x14ddb7['fadeInDuration']||0x0,'fadeOut':_0x14ddb7[_0x5bd13e(0x299)]||0x0},_0x61a621[_0x5bd13e(0x3a1)]={'x':_0x14ddb7[_0x5bd13e(0x138)]||0x0,'y':_0x14ddb7[_0x5bd13e(0x2e7)]||0x0},_0x61a621[_0x5bd13e(0x4e3)]={'x':_0x14ddb7['endOffsetX']||0x0,'y':_0x14ddb7[_0x5bd13e(0x3d3)]||0x0},_0x61a621['endScale']={'x':_0x14ddb7['endScaleX']||0x0,'y':_0x14ddb7[_0x5bd13e(0x17a)]||0x0},_0x61a621[_0x5bd13e(0x33f)]={'x':_0x14ddb7['startScaleX']||0x0,'y':_0x14ddb7[_0x5bd13e(0x50d)]||0x0},_0x61a621['angle']={'start':_0x14ddb7['startAngle']||0x0,'end':_0x14ddb7[_0x5bd13e(0x57a)]||0x0},_0x61a621[_0x5bd13e(0x10b)]={'arc':_0x14ddb7[_0x5bd13e(0x2f9)]||0x0};},PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x4cf),_0x4cad66=>{const _0x5b7241=_0x1f2382;if(!SceneManager[_0x5b7241(0x2c4)]())return;if(!Imported[_0x5b7241(0x3a2)]){$gameTemp[_0x5b7241(0x282)]()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+_0x5b7241(0x221));return;}VisuMZ[_0x5b7241(0x3ae)](_0x4cad66,_0x4cad66);const _0x42ca78={'text':_0x4cad66[_0x5b7241(0x2b7)]||'','duration':Math[_0x5b7241(0x238)](_0x4cad66['MsgDuration']||0x3c,0xc)},_0x3709b8=_0x4cad66[_0x5b7241(0x326)]||{};VisuMZ[_0x5b7241(0x4a7)]['ApplyPopupExtraSettings'](_0x42ca78,_0x3709b8);const _0x323ffd=SceneManager[_0x5b7241(0x4c5)][_0x5b7241(0x1e4)];if(_0x323ffd){const _0x418c54=$gamePlayer;_0x323ffd[_0x5b7241(0x164)](_0x418c54,_0x42ca78);}}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'MsgPopupFollower',_0x48d829=>{const _0x5efe8a=_0x1f2382;if(!SceneManager[_0x5efe8a(0x2c4)]())return;if(!Imported[_0x5efe8a(0x3a2)]){$gameTemp['isPlaytest']()&&alert(_0x5efe8a(0x1bc)+_0x5efe8a(0x221));return;}VisuMZ['ConvertParams'](_0x48d829,_0x48d829);const _0x449499=_0x48d829[_0x5efe8a(0x2ee)]||0x0,_0x143324={'text':_0x48d829[_0x5efe8a(0x2b7)]||'','duration':Math[_0x5efe8a(0x238)](_0x48d829[_0x5efe8a(0x1f5)]||0x3c,0xc)},_0xe3aab7=_0x48d829[_0x5efe8a(0x326)]||{};VisuMZ[_0x5efe8a(0x4a7)][_0x5efe8a(0x1d5)](_0x143324,_0xe3aab7);const _0x5900b1=SceneManager[_0x5efe8a(0x4c5)][_0x5efe8a(0x1e4)];if(_0x5900b1){const _0x458f66=$gamePlayer[_0x5efe8a(0x447)]()['follower'](_0x449499);_0x5900b1[_0x5efe8a(0x164)](_0x458f66,_0x143324);}}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x279),_0x50492b=>{const _0x46bf9d=_0x1f2382;if(!SceneManager[_0x46bf9d(0x2c4)]())return;if(!Imported['VisuMZ_1_MessageCore']){$gameTemp['isPlaytest']()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+_0x46bf9d(0x221));return;}VisuMZ[_0x46bf9d(0x3ae)](_0x50492b,_0x50492b);const _0x48605=$gameTemp[_0x46bf9d(0x1bd)](),_0x465c27=_0x50492b[_0x46bf9d(0x3bb)]||(_0x48605?_0x48605['eventId']():0x1),_0x4b4406={'text':_0x50492b[_0x46bf9d(0x2b7)]||'','duration':Math['max'](_0x50492b[_0x46bf9d(0x1f5)]||0x3c,0xc)},_0x2acbe7=_0x50492b['PopupExtra']||{};VisuMZ['EventsMoveCore'][_0x46bf9d(0x1d5)](_0x4b4406,_0x2acbe7);const _0x3695ce=SceneManager[_0x46bf9d(0x4c5)][_0x46bf9d(0x1e4)];if(_0x3695ce){const _0x35936c=$gameMap[_0x46bf9d(0x451)](_0x465c27);_0x3695ce[_0x46bf9d(0x164)](_0x35936c,_0x4b4406);}}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x2ca),_0x3fb927=>{const _0x55c238=_0x1f2382;if(!SceneManager[_0x55c238(0x2c4)]())return;if(!Imported[_0x55c238(0x3a2)]){$gameTemp['isPlaytest']()&&alert(_0x55c238(0x1bc)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x55c238(0x3ae)](_0x3fb927,_0x3fb927);const _0x480ab9={'text':_0x3fb927[_0x55c238(0x2b7)]||'','duration':Math['max'](_0x3fb927[_0x55c238(0x1f5)]||0x3c,0xc),'tileCoordinates':{'x':Math[_0x55c238(0x49e)](_0x3fb927[_0x55c238(0x34e)]||0x0),'y':Math[_0x55c238(0x49e)](_0x3fb927[_0x55c238(0x3f6)]||0x0)}},_0x2578e4=_0x3fb927['PopupExtra']||{};VisuMZ[_0x55c238(0x4a7)][_0x55c238(0x1d5)](_0x480ab9,_0x2578e4);const _0x1f219b=SceneManager[_0x55c238(0x4c5)][_0x55c238(0x1e4)];_0x1f219b&&_0x1f219b[_0x55c238(0x1a2)](_0x480ab9);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x538),_0x4e2711=>{const _0x5e56b0=_0x1f2382;VisuMZ[_0x5e56b0(0x3ae)](_0x4e2711,_0x4e2711);const _0x45203e=_0x4e2711['CommonEventID'];$gameTimer[_0x5e56b0(0x2b2)](_0x45203e);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0xe8),_0x4d1480=>{const _0x189b08=_0x1f2382;$gameTimer[_0x189b08(0x2b2)](0x0);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x40a),_0x42f054=>{const _0x395dfd=_0x1f2382;if(!$gameTimer[_0x395dfd(0x17f)]())return;VisuMZ[_0x395dfd(0x3ae)](_0x42f054,_0x42f054);let _0x23388c=0x0;_0x23388c+=_0x42f054['Frames'],_0x23388c+=_0x42f054[_0x395dfd(0x106)]*0x3c,_0x23388c+=_0x42f054['Minutes']*0x3c*0x3c,_0x23388c+=_0x42f054[_0x395dfd(0x142)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x23388c);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x19c),_0x43436b=>{const _0x2dda31=_0x1f2382;if(!$gameTimer[_0x2dda31(0x17f)]())return;VisuMZ[_0x2dda31(0x3ae)](_0x43436b,_0x43436b);let _0x55dd01=0x0;_0x55dd01+=_0x43436b[_0x2dda31(0x251)],_0x55dd01+=_0x43436b['Seconds']*0x3c,_0x55dd01+=_0x43436b[_0x2dda31(0x4b6)]*0x3c*0x3c,_0x55dd01+=_0x43436b['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x2dda31(0x24e)](_0x55dd01);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'EventTimerPause',_0x3f2ac3=>{const _0x23ba94=_0x1f2382;if(!$gameTimer[_0x23ba94(0x17f)]())return;$gameTimer[_0x23ba94(0x2df)]();}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x1f0),_0x1fdc9a=>{if(!$gameTimer['isWorking']())return;$gameTimer['resume']();}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x13b),_0xd7915d=>{VisuMZ['ConvertParams'](_0xd7915d,_0xd7915d);const _0x56d9fb=_0xd7915d['Speed']||0x0;$gameTimer['changeSpeed'](_0x56d9fb);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x18a),_0x3f8c56=>{const _0xe4ffda=_0x1f2382;VisuMZ[_0xe4ffda(0x3ae)](_0x3f8c56,_0x3f8c56);const _0x4ab65a=!_0x3f8c56[_0xe4ffda(0x2cc)];$gameSystem['setStopFollowerChasing'](_0x4ab65a);}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],'FollowerSetTargetChase',_0x36670c=>{const _0xc00b38=_0x1f2382;VisuMZ[_0xc00b38(0x3ae)](_0x36670c,_0x36670c);const _0x425a63=(_0x36670c[_0xc00b38(0xd4)]||0x0)-0x1,_0x468fdb=!_0x36670c['Chase'],_0xfaff0f=$gamePlayer[_0xc00b38(0x447)]()['follower'](_0x425a63);if(_0xfaff0f)_0xfaff0f[_0xc00b38(0x2af)](_0x468fdb);}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x3a6),_0x3ff492=>{const _0x1eb565=_0x1f2382;VisuMZ[_0x1eb565(0x3ae)](_0x3ff492,_0x3ff492);const _0x35244f=_0x3ff492[_0x1eb565(0xd4)];$gameSystem[_0x1eb565(0x2d0)](_0x35244f);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'FollowerReset',_0x4660a9=>{const _0x52271e=_0x1f2382;VisuMZ['ConvertParams'](_0x4660a9,_0x4660a9),$gameSystem['setControlledFollowerID'](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x5d7b4b of $gamePlayer[_0x52271e(0x447)]()[_0x52271e(0x568)]){if(_0x5d7b4b)_0x5d7b4b[_0x52271e(0x2af)](![]);}}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x453),_0x837523=>{const _0x186b0a=_0x1f2382;VisuMZ[_0x186b0a(0x3ae)](_0x837523,_0x837523);const _0x225660=$gameTemp[_0x186b0a(0x1bd)]();_0x837523[_0x186b0a(0x23f)]=_0x837523[_0x186b0a(0x23f)]||$gameMap[_0x186b0a(0x490)]();const _0x48c0eb=[_0x837523[_0x186b0a(0x23f)],_0x837523[_0x186b0a(0x3bb)]||_0x225660[_0x186b0a(0x37b)](),_0x837523[_0x186b0a(0x11f)]],_0x30667a=_0x837523[_0x186b0a(0x2e5)],_0x32c149=$gameSelfSwitches[_0x186b0a(0x272)](_0x48c0eb)||![];$gameSwitches[_0x186b0a(0x2be)](_0x30667a,_0x32c149);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x2d2),_0x13002e=>{const _0x944fe0=_0x1f2382;VisuMZ['ConvertParams'](_0x13002e,_0x13002e);const _0x46eccd=$gameTemp[_0x944fe0(0x1bd)]();_0x13002e[_0x944fe0(0x23f)]=_0x13002e['MapId']||$gameMap[_0x944fe0(0x490)]();const _0x247f7a=[_0x13002e['MapId'],_0x13002e[_0x944fe0(0x3bb)]||_0x46eccd[_0x944fe0(0x37b)](),_0x944fe0(0x168)['format'](_0x13002e[_0x944fe0(0x25d)])],_0x1494dd=_0x13002e[_0x944fe0(0x2e5)],_0x44b151=$gameSelfSwitches[_0x944fe0(0x272)](_0x247f7a)||![];$gameSwitches[_0x944fe0(0x2be)](_0x1494dd,_0x44b151);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x2f2),_0x20daf4=>{const _0x24d974=_0x1f2382;VisuMZ['ConvertParams'](_0x20daf4,_0x20daf4);const _0x36639d=$gameTemp[_0x24d974(0x1bd)]();_0x20daf4[_0x24d974(0x23f)]=_0x20daf4[_0x24d974(0x23f)]||$gameMap['mapId']();const _0x27d1d7=[_0x20daf4[_0x24d974(0x23f)],_0x20daf4[_0x24d974(0x3bb)]||_0x36639d[_0x24d974(0x37b)](),'Self\x20Variable\x20%1'['format'](_0x20daf4['VariableId'])],_0x160eeb=_0x20daf4[_0x24d974(0x572)],_0x5467c0=$gameSelfSwitches['value'](_0x27d1d7)||![];$gameVariables[_0x24d974(0x2be)](_0x160eeb,_0x5467c0);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],'MorphEventTo',_0x532ef5=>{const _0x4aae23=_0x1f2382;VisuMZ[_0x4aae23(0x3ae)](_0x532ef5,_0x532ef5);if(!$gameMap)return;const _0x10af6d=$gameTemp[_0x4aae23(0x1bd)](),_0x38ea07=_0x532ef5['Step2Preserve'];_0x532ef5[_0x4aae23(0x103)]=_0x532ef5[_0x4aae23(0x103)]||$gameMap[_0x4aae23(0x490)](),_0x532ef5['Step2MapId']=_0x532ef5[_0x4aae23(0x3c3)]||$gameMap[_0x4aae23(0x490)](),_0x532ef5[_0x4aae23(0x3ce)]=_0x532ef5[_0x4aae23(0x3ce)][_0x4aae23(0x2b4)]()[_0x4aae23(0x122)]();if(!_0x38ea07&&_0x532ef5[_0x4aae23(0x103)]!==$gameMap[_0x4aae23(0x490)]())return;if($gameMap['mapId']()===_0x532ef5[_0x4aae23(0x103)]){const _0x57af5d=$gameMap[_0x4aae23(0x451)](_0x532ef5[_0x4aae23(0x4d9)]||_0x10af6d['eventId']());if(!_0x57af5d)return;_0x532ef5[_0x4aae23(0x3ce)]!=='UNTITLED'?_0x57af5d[_0x4aae23(0x4da)](_0x532ef5[_0x4aae23(0x3ce)]):_0x57af5d[_0x4aae23(0x510)](_0x532ef5[_0x4aae23(0x3c3)],_0x532ef5[_0x4aae23(0x1dc)]||_0x10af6d[_0x4aae23(0x37b)]());}_0x38ea07&&$gameSystem[_0x4aae23(0x430)](_0x532ef5[_0x4aae23(0x103)],_0x532ef5['Step1EventId'],_0x532ef5['TemplateName'],_0x532ef5['Step2MapId'],_0x532ef5['Step2EventId']);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x57f),_0x1c7dd7=>{const _0x10ef20=_0x1f2382;VisuMZ['ConvertParams'](_0x1c7dd7,_0x1c7dd7);if(!$gameMap)return;const _0x11377b=$gameTemp[_0x10ef20(0x1bd)]();_0x1c7dd7['MapId']=_0x1c7dd7[_0x10ef20(0x23f)]||$gameMap['mapId']();if($gameMap['mapId']()===_0x1c7dd7['MapId']){const _0x4e298f=$gameMap[_0x10ef20(0x451)](_0x1c7dd7[_0x10ef20(0x3bb)]||_0x11377b[_0x10ef20(0x37b)]());_0x4e298f[_0x10ef20(0x3fc)]();}_0x1c7dd7['RemovePreserve']&&$gameSystem[_0x10ef20(0x222)](_0x1c7dd7[_0x10ef20(0x23f)],_0x1c7dd7[_0x10ef20(0x3bb)]||_0x11377b[_0x10ef20(0x37b)]());}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x147),_0x549447=>{const _0x1c0a6a=_0x1f2382;VisuMZ['ConvertParams'](_0x549447,_0x549447),$gameSystem['setEventIconData']($gamePlayer,_0x549447[_0x1c0a6a(0x540)],_0x549447['IconBufferX'],_0x549447[_0x1c0a6a(0x1b0)],_0x549447[_0x1c0a6a(0x35d)]);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],'PlayerIconDelete',_0x47d92e=>{const _0x2b299b=_0x1f2382;VisuMZ[_0x2b299b(0x3ae)](_0x47d92e,_0x47d92e),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],'PlayerMovementChange',_0x54334e=>{const _0x684a14=_0x1f2382;VisuMZ[_0x684a14(0x3ae)](_0x54334e,_0x54334e),$gameSystem[_0x684a14(0x241)](!_0x54334e[_0x684a14(0x565)]);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x29c),_0x2bcb04=>{const _0x5a9e38=_0x1f2382;VisuMZ[_0x5a9e38(0x3ae)](_0x2bcb04,_0x2bcb04),$gameSystem[_0x5a9e38(0x493)](_0x2bcb04['Setting']);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x424),_0x3eec16=>{const _0x264696=_0x1f2382;VisuMZ[_0x264696(0x3ae)](_0x3eec16,_0x3eec16);const _0x1fe98e=_0x3eec16[_0x264696(0x23f)]||$gameMap[_0x264696(0x490)]();$gameSelfSwitches[_0x264696(0x583)](_0x1fe98e);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x16c),_0x217b94=>{const _0x108687=_0x1f2382;VisuMZ[_0x108687(0x3ae)](_0x217b94,_0x217b94);const _0x5f22d5=$gameTemp['getLastPluginCommandInterpreter']();_0x217b94[_0x108687(0x23f)]=_0x217b94[_0x108687(0x23f)]||$gameMap[_0x108687(0x490)]();const _0x2595d3=[_0x217b94[_0x108687(0x23f)],_0x217b94['EventId']||_0x5f22d5[_0x108687(0x37b)](),_0x217b94[_0x108687(0x11f)]];switch(_0x217b94['Value']){case'ON':$gameSelfSwitches['setValue'](_0x2595d3,!![]);break;case'OFF':$gameSelfSwitches[_0x108687(0x2be)](_0x2595d3,![]);break;case _0x108687(0x546):$gameSelfSwitches[_0x108687(0x2be)](_0x2595d3,!$gameSelfSwitches[_0x108687(0x272)](_0x2595d3));break;}}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],'SelfSwitchID',_0x52626c=>{const _0x2e37e2=_0x1f2382;VisuMZ[_0x2e37e2(0x3ae)](_0x52626c,_0x52626c);const _0x565329=$gameTemp[_0x2e37e2(0x1bd)]();_0x52626c[_0x2e37e2(0x23f)]=_0x52626c[_0x2e37e2(0x23f)]||$gameMap[_0x2e37e2(0x490)]();const _0x4f2a3b=[_0x52626c['MapId'],_0x52626c[_0x2e37e2(0x3bb)]||_0x565329[_0x2e37e2(0x37b)](),_0x2e37e2(0x168)[_0x2e37e2(0x504)](_0x52626c['SwitchId'])];switch(_0x52626c[_0x2e37e2(0x4c3)]){case'ON':$gameSelfSwitches['setValue'](_0x4f2a3b,!![]);break;case'OFF':$gameSelfSwitches[_0x2e37e2(0x2be)](_0x4f2a3b,![]);break;case _0x2e37e2(0x546):$gameSelfSwitches[_0x2e37e2(0x2be)](_0x4f2a3b,!$gameSelfSwitches[_0x2e37e2(0x272)](_0x4f2a3b));break;}}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x2f1),_0x349262=>{const _0x1c2604=_0x1f2382;VisuMZ[_0x1c2604(0x3ae)](_0x349262,_0x349262);const _0x1c7ccb=$gameTemp[_0x1c2604(0x1bd)]();_0x349262[_0x1c2604(0x23f)]=_0x349262[_0x1c2604(0x23f)]||$gameMap[_0x1c2604(0x490)]();const _0x423ee2=[_0x349262[_0x1c2604(0x23f)],_0x349262[_0x1c2604(0x3bb)]||_0x1c7ccb[_0x1c2604(0x37b)](),'Self\x20Variable\x20%1'[_0x1c2604(0x504)](_0x349262[_0x1c2604(0x1df)])],_0x40cc32=VisuMZ[_0x1c2604(0xd8)]($gameSelfSwitches[_0x1c2604(0x272)](_0x423ee2),_0x349262[_0x1c2604(0x4c3)],_0x349262['Operation']);$gameSelfSwitches['setValue'](_0x423ee2,_0x40cc32);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x274),_0x67b43e=>{const _0x354a75=_0x1f2382;VisuMZ[_0x354a75(0x3ae)](_0x67b43e,_0x67b43e);const _0x3fdd6d=$gameTemp['getLastPluginCommandInterpreter'](),_0x536e9b={'template':_0x67b43e[_0x354a75(0x3ce)],'mapId':_0x67b43e[_0x354a75(0x23f)]||$gameMap['mapId'](),'eventId':_0x67b43e[_0x354a75(0x3bb)]||_0x3fdd6d['eventId'](),'x':_0x67b43e[_0x354a75(0x18f)],'y':_0x67b43e['PosY'],'spawnPreserved':_0x67b43e['Preserve'],'spawnEventId':$gameMap['_spawnedEvents'][_0x354a75(0x485)]+0x3e8},_0x1f1c97=_0x67b43e[_0x354a75(0x25e)]||0x0;if(!VisuMZ[_0x354a75(0x51d)][_0x536e9b[_0x354a75(0x490)]]&&_0x536e9b['mapId']!==$gameMap[_0x354a75(0x490)]()){let _0x2bf562=_0x354a75(0x131)[_0x354a75(0x504)](_0x536e9b[_0x354a75(0x490)]);_0x2bf562+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x2bf562+=_0x354a75(0x347),_0x2bf562+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x2bf562+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x354a75(0x504)](_0x536e9b[_0x354a75(0x490)]),alert(_0x2bf562);return;}const _0x1c3df5=$gameMap[_0x354a75(0x145)](_0x536e9b,_0x67b43e['Collision'],_0x67b43e[_0x354a75(0x11b)]);_0x1f1c97&&$gameSwitches['setValue'](_0x1f1c97,!!_0x1c3df5);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x56b),_0x88d180=>{const _0x4e6343=_0x1f2382;VisuMZ[_0x4e6343(0x3ae)](_0x88d180,_0x88d180);const _0x5779ad=$gameTemp[_0x4e6343(0x1bd)](),_0x5f4762={'template':_0x88d180[_0x4e6343(0x3ce)],'mapId':_0x88d180['MapId']||$gameMap[_0x4e6343(0x490)](),'eventId':_0x88d180[_0x4e6343(0x3bb)]||_0x5779ad[_0x4e6343(0x37b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x88d180[_0x4e6343(0x223)],'spawnEventId':$gameMap[_0x4e6343(0x3a7)]['length']+0x3e8},_0x378f5e=_0x88d180['SuccessSwitchId']||0x0;if(!VisuMZ[_0x4e6343(0x51d)][_0x5f4762[_0x4e6343(0x490)]]&&_0x5f4762[_0x4e6343(0x490)]!==$gameMap[_0x4e6343(0x490)]()){let _0x3ea2ab=_0x4e6343(0x131)[_0x4e6343(0x504)](_0x5f4762['mapId']);_0x3ea2ab+=_0x4e6343(0x51f),_0x3ea2ab+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x3ea2ab+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x3ea2ab+=_0x4e6343(0x24b)[_0x4e6343(0x504)](_0x5f4762[_0x4e6343(0x490)]),alert(_0x3ea2ab);return;}const _0x230db3=$gameMap['prepareSpawnedEventAtRegion'](_0x5f4762,_0x88d180[_0x4e6343(0x1f2)],_0x88d180['Collision'],_0x88d180[_0x4e6343(0x11b)]);_0x378f5e&&$gameSwitches[_0x4e6343(0x2be)](_0x378f5e,!!_0x230db3);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'SpawnEventAtTerrainTag',_0x402788=>{const _0x1af377=_0x1f2382;VisuMZ['ConvertParams'](_0x402788,_0x402788);const _0x34dfdd=$gameTemp[_0x1af377(0x1bd)](),_0x5905b7={'template':_0x402788[_0x1af377(0x3ce)],'mapId':_0x402788[_0x1af377(0x23f)]||$gameMap[_0x1af377(0x490)](),'eventId':_0x402788[_0x1af377(0x3bb)]||_0x34dfdd[_0x1af377(0x37b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x402788['Preserve'],'spawnEventId':$gameMap[_0x1af377(0x3a7)][_0x1af377(0x485)]+0x3e8},_0x3978ea=_0x402788['SuccessSwitchId']||0x0;if(!VisuMZ[_0x1af377(0x51d)][_0x5905b7[_0x1af377(0x490)]]&&_0x5905b7['mapId']!==$gameMap[_0x1af377(0x490)]()){let _0x36c94c='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x1af377(0x504)](_0x5905b7[_0x1af377(0x490)]);_0x36c94c+=_0x1af377(0x51f),_0x36c94c+=_0x1af377(0x347),_0x36c94c+=_0x1af377(0x427),_0x36c94c+=_0x1af377(0x24b)[_0x1af377(0x504)](_0x5905b7['mapId']),alert(_0x36c94c);return;}const _0x47d1b6=$gameMap[_0x1af377(0x55a)](_0x5905b7,_0x402788[_0x1af377(0x470)],_0x402788[_0x1af377(0x3f7)],_0x402788[_0x1af377(0x11b)]);_0x3978ea&&$gameSwitches[_0x1af377(0x2be)](_0x3978ea,!!_0x47d1b6);}),PluginManager[_0x1f2382(0x573)](pluginData['name'],_0x1f2382(0x170),_0x4bc6e7=>{const _0xc4631d=_0x1f2382;VisuMZ[_0xc4631d(0x3ae)](_0x4bc6e7,_0x4bc6e7);const _0x6def17=$gameTemp[_0xc4631d(0x1bd)]();$gameMap[_0xc4631d(0x1cf)](_0x4bc6e7[_0xc4631d(0x4eb)]||_0x6def17[_0xc4631d(0x37b)]());}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],'SpawnEventDespawnAtXY',_0x16c68f=>{const _0x2b7aca=_0x1f2382;VisuMZ[_0x2b7aca(0x3ae)](_0x16c68f,_0x16c68f);const _0x46d781=_0x16c68f['PosX'],_0x2711b2=_0x16c68f['PosY'];$gameMap[_0x2b7aca(0x3b4)](_0x46d781,_0x2711b2);}),PluginManager[_0x1f2382(0x573)](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x415),_0x40b6bc=>{const _0x2d02d0=_0x1f2382;VisuMZ[_0x2d02d0(0x3ae)](_0x40b6bc,_0x40b6bc),$gameMap[_0x2d02d0(0x588)](_0x40b6bc[_0x2d02d0(0x1f2)]);}),PluginManager['registerCommand'](pluginData['name'],_0x1f2382(0x189),_0x411538=>{const _0x5ed3f1=_0x1f2382;VisuMZ[_0x5ed3f1(0x3ae)](_0x411538,_0x411538),$gameMap[_0x5ed3f1(0x4f7)](_0x411538[_0x5ed3f1(0x470)]);}),PluginManager['registerCommand'](pluginData[_0x1f2382(0x1f1)],_0x1f2382(0x393),_0x245136=>{const _0x422e62=_0x1f2382;VisuMZ[_0x422e62(0x3ae)](_0x245136,_0x245136),$gameMap[_0x422e62(0x278)]();}),VisuMZ['EventsMoveCore'][_0x1f2382(0x43e)]=Scene_Boot['prototype'][_0x1f2382(0x4ca)],Scene_Boot[_0x1f2382(0x433)][_0x1f2382(0x4ca)]=function(){const _0x5ea4d8=_0x1f2382;VisuMZ[_0x5ea4d8(0x4a7)]['Scene_Boot_onDatabaseLoaded'][_0x5ea4d8(0x49d)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x5ea4d8(0x591)]();if(VisuMZ[_0x5ea4d8(0x4a7)][_0x5ea4d8(0x2f3)])VisuMZ[_0x5ea4d8(0x4a7)][_0x5ea4d8(0x2f3)][_0x5ea4d8(0x309)]();},VisuMZ[_0x1f2382(0x51d)]=[],VisuMZ[_0x1f2382(0x151)]={},Scene_Boot[_0x1f2382(0x433)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x3e39bc=_0x1f2382;if(DataManager['isBattleTest']()||DataManager[_0x3e39bc(0x357)]())return;const _0x42e019=VisuMZ[_0x3e39bc(0x4a7)]['Settings'][_0x3e39bc(0x1ee)],_0x20b097=_0x42e019['PreloadMaps']['slice'](0x0);for(const _0x3a1db5 of _0x42e019[_0x3e39bc(0x4b2)]){_0x3a1db5[_0x3e39bc(0x55e)]=_0x3a1db5[_0x3e39bc(0x55e)]['toUpperCase']()['trim'](),VisuMZ[_0x3e39bc(0x151)][_0x3a1db5[_0x3e39bc(0x55e)]]=_0x3a1db5;if(!_0x20b097[_0x3e39bc(0x48f)](_0x3a1db5[_0x3e39bc(0x47f)]))_0x20b097[_0x3e39bc(0x193)](_0x3a1db5[_0x3e39bc(0x47f)]);}for(const _0x3afca9 of _0x20b097){if(VisuMZ['PreloadedMaps'][_0x3afca9])continue;const _0x4298f4='Map%1.json'[_0x3e39bc(0x504)](_0x3afca9['padZero'](0x3)),_0x58b50d=_0x3e39bc(0x401)[_0x3e39bc(0x504)](_0x3afca9);DataManager[_0x3e39bc(0xec)](_0x58b50d,_0x4298f4),setTimeout(this[_0x3e39bc(0x287)][_0x3e39bc(0x359)](this,_0x3afca9,_0x58b50d),0x64);}},Scene_Boot['prototype'][_0x1f2382(0x287)]=function(_0x484248,_0x186108){const _0x3c4be1=_0x1f2382;window[_0x186108]?(VisuMZ[_0x3c4be1(0x51d)][_0x484248]=window[_0x186108],window[_0x186108]=undefined):setTimeout(this[_0x3c4be1(0x287)][_0x3c4be1(0x359)](this,_0x484248,_0x186108),0x64);},VisuMZ[_0x1f2382(0x4ad)]=[],VisuMZ['SelfSwitches']=[],VisuMZ['MapSwitches']=[],VisuMZ[_0x1f2382(0x100)]=[],VisuMZ[_0x1f2382(0x277)]=[],VisuMZ[_0x1f2382(0x216)]=[],Scene_Boot[_0x1f2382(0x433)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x2630e3=_0x1f2382;for(let _0x30717d=0x1;_0x30717d<$dataSystem['switches'][_0x2630e3(0x485)];_0x30717d++){if($dataSystem[_0x2630e3(0x261)][_0x30717d]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches'][_0x2630e3(0x193)](_0x30717d);if($dataSystem[_0x2630e3(0x261)][_0x30717d][_0x2630e3(0x4e7)](/<SELF>/i))VisuMZ[_0x2630e3(0x526)]['push'](_0x30717d);if($dataSystem[_0x2630e3(0x261)][_0x30717d]['match'](/<MAP>/i))VisuMZ[_0x2630e3(0x4c4)]['push'](_0x30717d);}for(let _0x33460b=0x1;_0x33460b<$dataSystem[_0x2630e3(0x50a)]['length'];_0x33460b++){if($dataSystem[_0x2630e3(0x50a)][_0x33460b][_0x2630e3(0x4e7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables']['push'](_0x33460b);if($dataSystem['variables'][_0x33460b][_0x2630e3(0x4e7)](/<SELF>/i))VisuMZ[_0x2630e3(0x277)][_0x2630e3(0x193)](_0x33460b);if($dataSystem[_0x2630e3(0x50a)][_0x33460b][_0x2630e3(0x4e7)](/<MAP>/i))VisuMZ[_0x2630e3(0x216)]['push'](_0x33460b);}},VisuMZ['EventsMoveCore']['CustomPageConditions']={},VisuMZ[_0x1f2382(0x4a7)]['CustomPageConditions'][_0x1f2382(0x309)]=function(){const _0x38a81c=_0x1f2382;this[_0x38a81c(0x338)]=new Game_CPCInterpreter(),this[_0x38a81c(0x532)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x2f3)][_0x1f2382(0x532)]=function(){const _0x22696c=_0x1f2382;this[_0x22696c(0x4f8)]=[];for(const _0xd791ad of $dataCommonEvents){if(!_0xd791ad)continue;VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x22696c(0x3d1)](_0xd791ad);if(_0xd791ad['CPC'][_0x22696c(0x485)]>0x0)this[_0x22696c(0x4f8)][_0x22696c(0x193)](_0xd791ad['id']);}},VisuMZ['EventsMoveCore'][_0x1f2382(0x2f3)][_0x1f2382(0x20b)]=function(_0x2c5745,_0x3016ec,_0x2ae79f){const _0x537ef2=_0x1f2382;return this[_0x537ef2(0x338)][_0x537ef2(0x434)](_0x2c5745,_0x3016ec),_0x2ae79f?this[_0x537ef2(0x338)][_0x537ef2(0x333)](_0x2ae79f):this[_0x537ef2(0x338)][_0x537ef2(0xfb)](),this['_interpreter'][_0x537ef2(0x533)];},VisuMZ[_0x1f2382(0x4a7)]['CustomPageConditions'][_0x1f2382(0x3d1)]=function(_0x8e36cc){const _0x5618b6=_0x1f2382;let _0x32fac2=![];_0x8e36cc[_0x5618b6(0x594)]=[];for(const _0x541f6c of _0x8e36cc[_0x5618b6(0x4d6)]){if([0x6c,0x198][_0x5618b6(0x48f)](_0x541f6c[_0x5618b6(0xc9)])){const _0x509e8a=_0x541f6c['parameters'][0x0];if(_0x509e8a[_0x5618b6(0x4e7)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x32fac2=!![];else _0x509e8a[_0x5618b6(0x4e7)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x32fac2=![]);}_0x32fac2&&_0x8e36cc[_0x5618b6(0x594)][_0x5618b6(0x193)](_0x541f6c);}},getSelfSwitchValue=function(_0x1f3dba,_0x324d74,_0x4cd075){const _0x5b4023=_0x1f2382;let _0x2a73a9=[_0x1f3dba,_0x324d74,_0x5b4023(0x168)[_0x5b4023(0x504)](_0x4cd075)];return typeof _0x4cd075===_0x5b4023(0x2c1)&&(_0x2a73a9=[_0x1f3dba,_0x324d74,_0x4cd075[_0x5b4023(0x2b4)]()[_0x5b4023(0x122)]()]),$gameSelfSwitches[_0x5b4023(0x272)](_0x2a73a9);},getMapSwitchValue=function(_0x571758,_0xdc4da1){const _0x4941dd=_0x1f2382;let _0x510769=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'['format'](_0x571758,_0xdc4da1)];return $gameSelfSwitches[_0x4941dd(0x272)](_0x510769);},getMapVariableValue=function(_0x3ffc73,_0x462f01){const _0x1a8382=_0x1f2382;let _0x5b97cf=[0x0,0x0,_0x1a8382(0x40d)[_0x1a8382(0x504)](_0x3ffc73,_0x462f01)];return $gameSelfSwitches[_0x1a8382(0x272)](_0x5b97cf);},getSelfVariableValue=function(_0x15215e,_0x192ea5,_0x3f4c69){const _0x526237=_0x1f2382,_0x457303=[_0x15215e,_0x192ea5,'Self\x20Variable\x20%1'[_0x526237(0x504)](_0x3f4c69)];return $gameSelfSwitches[_0x526237(0x272)](_0x457303);},setSelfSwitchValue=function(_0x4323f1,_0x37e3da,_0x231b94,_0x45100e){const _0x348a4e=_0x1f2382;let _0x1d34e0=[_0x4323f1,_0x37e3da,'Self\x20Switch\x20%1'[_0x348a4e(0x504)](_0x231b94)];typeof _0x231b94===_0x348a4e(0x2c1)&&(_0x1d34e0=[_0x4323f1,_0x37e3da,_0x231b94[_0x348a4e(0x2b4)]()[_0x348a4e(0x122)]()]),$gameSelfSwitches[_0x348a4e(0x2be)](_0x1d34e0,_0x45100e);},setSelfVariableValue=function(_0x488b4a,_0x19aab2,_0x14310c,_0x13a62f){const _0x3512c9=_0x1f2382,_0x260635=[_0x488b4a,_0x19aab2,_0x3512c9(0x29e)[_0x3512c9(0x504)](_0x14310c)];$gameSelfSwitches['setValue'](_0x260635,_0x13a62f);},setMapSwitchValue=function(_0x5bd884,_0x314520,_0x5a6b12){const _0x5b86c6=_0x1f2382;let _0x247bd2=[0x0,0x0,_0x5b86c6(0x3d8)[_0x5b86c6(0x504)](_0x5bd884,_0x314520)];$gameSelfSwitches[_0x5b86c6(0x2be)](_0x247bd2,_0x5a6b12);},setMapVariableValue=function(_0x10cf36,_0x3f520f,_0xe83be9){const _0x5bafee=_0x1f2382;let _0x2649f7=[0x0,0x0,_0x5bafee(0x40d)[_0x5bafee(0x504)](_0x10cf36,_0x3f520f)];$gameSelfSwitches[_0x5bafee(0x2be)](_0x2649f7,_0xe83be9);},DataManager[_0x1f2382(0x398)]=function(_0x41a98c){const _0x58a121=_0x1f2382;if(SceneManager['_scene'][_0x58a121(0x15e)]===Scene_Debug)return![];return VisuMZ[_0x58a121(0x4ad)]['includes'](_0x41a98c);},DataManager[_0x1f2382(0x337)]=function(_0x3fa737){const _0x204063=_0x1f2382;if(SceneManager[_0x204063(0x4c5)][_0x204063(0x15e)]===Scene_Debug)return![];return VisuMZ[_0x204063(0x100)][_0x204063(0x48f)](_0x3fa737);},DataManager[_0x1f2382(0x558)]=function(_0x254571){const _0x426736=_0x1f2382;if(SceneManager[_0x426736(0x4c5)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x426736(0x526)]['includes'](_0x254571);},DataManager['isSelfVariable']=function(_0x5be9ad){const _0x3a4f22=_0x1f2382;if(SceneManager[_0x3a4f22(0x4c5)][_0x3a4f22(0x15e)]===Scene_Debug)return![];return VisuMZ['SelfVariables']['includes'](_0x5be9ad);},DataManager[_0x1f2382(0x3eb)]=function(_0x559775){const _0x19b413=_0x1f2382;if(BattleManager[_0x19b413(0xc8)]())return![];return VisuMZ[_0x19b413(0x4c4)][_0x19b413(0x48f)](_0x559775);},DataManager['isMapVariable']=function(_0x425093){const _0x4df91d=_0x1f2382;if(BattleManager[_0x4df91d(0xc8)]())return![];return VisuMZ[_0x4df91d(0x216)][_0x4df91d(0x48f)](_0x425093);},ImageManager['isInvisibleCharacter']=function(_0x3d5071){const _0x1b697d=_0x1f2382;return _0x3d5071[_0x1b697d(0x4e7)](/\[INV(?:|ISIBLE)\]/i);},SceneManager[_0x1f2382(0x108)]=function(){const _0x3ab788=_0x1f2382;return this[_0x3ab788(0x4c5)]&&this['_scene']['constructor']===Scene_Map;},SceneManager[_0x1f2382(0x2c4)]=function(){const _0x2116ba=_0x1f2382;return this[_0x2116ba(0x4c5)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x239)]=Game_Temp[_0x1f2382(0x433)][_0x1f2382(0x391)],Game_Temp['prototype'][_0x1f2382(0x391)]=function(_0x43910a,_0x14479e){const _0x8369f9=_0x1f2382;if(this[_0x8369f9(0x191)](_0x43910a,_0x14479e))return;VisuMZ[_0x8369f9(0x4a7)][_0x8369f9(0x239)]['call'](this,_0x43910a,_0x14479e);},Game_Temp['prototype']['isEventClickTriggered']=function(_0x35f99a,_0xc71e31){const _0x241fb0=_0x1f2382,_0xc2e90c=$gameMap[_0x241fb0(0xd9)](_0x35f99a,_0xc71e31);for(const _0x24c9d7 of _0xc2e90c){if(_0x24c9d7&&_0x24c9d7['hasClickTrigger']())return _0x24c9d7[_0x241fb0(0x547)](),!![];}return TouchInput[_0x241fb0(0xe9)]()&&_0xc2e90c[_0x241fb0(0x485)]>0x0&&TouchInput[_0x241fb0(0x118)](),![];},Game_Temp[_0x1f2382(0x433)][_0x1f2382(0x31b)]=function(_0x4f22e0){const _0x49a6da=_0x1f2382;this[_0x49a6da(0x3b5)]=_0x4f22e0;},Game_Temp[_0x1f2382(0x433)]['getLastPluginCommandInterpreter']=function(){const _0x5f113f=_0x1f2382;return this[_0x5f113f(0x3b5)];},Game_Temp[_0x1f2382(0x433)][_0x1f2382(0x394)]=function(_0x37cf33){const _0x2323af=_0x1f2382;this[_0x2323af(0x13a)]=_0x37cf33;},Game_Temp[_0x1f2382(0x433)][_0x1f2382(0x46a)]=function(){const _0x5d14f6=_0x1f2382;this[_0x5d14f6(0x13a)]=undefined;},Game_Temp[_0x1f2382(0x433)][_0x1f2382(0x2ea)]=function(){const _0xca2d3d=_0x1f2382;return this[_0xca2d3d(0x13a)];},VisuMZ[_0x1f2382(0x4a7)]['Game_System_initialize']=Game_System['prototype'][_0x1f2382(0x309)],Game_System[_0x1f2382(0x433)][_0x1f2382(0x309)]=function(){const _0x3717e6=_0x1f2382;VisuMZ['EventsMoveCore'][_0x3717e6(0x4e8)][_0x3717e6(0x49d)](this),this['initEventsMoveCore'](),this[_0x3717e6(0x1f6)]();},Game_System[_0x1f2382(0x433)][_0x1f2382(0x53e)]=function(){const _0x2de11a=_0x1f2382;this[_0x2de11a(0x502)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x2de11a(0x50b)]=[],this[_0x2de11a(0x543)]={},this[_0x2de11a(0x315)]={},this[_0x2de11a(0x514)]=![],this[_0x2de11a(0x294)]=_0x2de11a(0x1cc);},Game_System[_0x1f2382(0x433)]['isDashingEnabled']=function(){const _0x15842d=_0x1f2382;if(this[_0x15842d(0x502)]===undefined)this[_0x15842d(0x53e)]();if(this[_0x15842d(0x502)][_0x15842d(0x16a)]===undefined)this['initEventsMoveCore']();return this[_0x15842d(0x502)][_0x15842d(0x16a)];},Game_System['prototype']['setDashingEnabled']=function(_0x5251e9){const _0x20ad10=_0x1f2382;if(this[_0x20ad10(0x502)]===undefined)this[_0x20ad10(0x53e)]();if(this['_EventsMoveCoreSettings'][_0x20ad10(0x16a)]===undefined)this[_0x20ad10(0x53e)]();this[_0x20ad10(0x502)][_0x20ad10(0x16a)]=_0x5251e9;},Game_System[_0x1f2382(0x433)][_0x1f2382(0x513)]=function(){const _0x3012f5=_0x1f2382;if(this[_0x3012f5(0x502)]===undefined)this['initEventsMoveCore']();if(this[_0x3012f5(0x502)][_0x3012f5(0x3a9)]===undefined)this[_0x3012f5(0x53e)]();return this[_0x3012f5(0x502)][_0x3012f5(0x3a9)];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x1a7)]=function(_0x56bfec){const _0x55c09d=_0x1f2382;if(this[_0x55c09d(0x502)]===undefined)this[_0x55c09d(0x53e)]();if(this[_0x55c09d(0x502)][_0x55c09d(0x3a9)]===undefined)this[_0x55c09d(0x53e)]();this['_EventsMoveCoreSettings'][_0x55c09d(0x3a9)]=_0x56bfec;},Game_System[_0x1f2382(0x433)]['eventLabelsVisible']=function(){const _0x53cffa=_0x1f2382;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x53cffa(0x502)][_0x53cffa(0x1d7)]===undefined)this['initEventsMoveCore']();return this[_0x53cffa(0x502)][_0x53cffa(0x1d7)];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x21e)]=function(_0x8cd32c){const _0x7bcc43=_0x1f2382;if(this['_EventsMoveCoreSettings']===undefined)this[_0x7bcc43(0x53e)]();if(this[_0x7bcc43(0x502)][_0x7bcc43(0x1d7)]===undefined)this[_0x7bcc43(0x53e)]();this[_0x7bcc43(0x502)][_0x7bcc43(0x1d7)]=_0x8cd32c;},Game_System[_0x1f2382(0x433)][_0x1f2382(0x446)]=function(){return this['_DisablePlayerControl']===undefined&&(this['_DisablePlayerControl']=![]),this['_DisablePlayerControl'];},Game_System[_0x1f2382(0x433)]['setPlayerControlDisable']=function(_0x488dde){const _0x328a2f=_0x1f2382;this[_0x328a2f(0x514)]=_0x488dde;},Game_System[_0x1f2382(0x433)][_0x1f2382(0x442)]=function(){const _0x2ee7fb=_0x1f2382;return this[_0x2ee7fb(0x294)];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x493)]=function(_0x345d22){const _0x3dbf2a=_0x1f2382;this[_0x3dbf2a(0x294)]=String(_0x345d22)['toLowerCase']()['trim']();},Game_System[_0x1f2382(0x433)][_0x1f2382(0x16f)]=function(_0x43b961){const _0x236691=_0x1f2382;if(this[_0x236691(0x515)]===undefined)this['initEventsMoveCore']();if(!_0x43b961)return null;if(_0x43b961===$gamePlayer)return this['_EventIcons'][_0x236691(0x1a6)];else{const _0x31d450=VisuMZ[_0x236691(0x4a7)][_0x236691(0x196)],_0xa970fc=_0x236691(0x4d1)[_0x236691(0x504)](_0x43b961['_mapId'],_0x43b961[_0x236691(0x3af)]);return this['_EventIcons'][_0xa970fc]=this['_EventIcons'][_0xa970fc]||{'iconIndex':0x0,'bufferX':_0x31d450[_0x236691(0x214)][_0x236691(0x580)],'bufferY':_0x31d450['Icon'][_0x236691(0x4af)],'blendMode':_0x31d450[_0x236691(0x214)][_0x236691(0x431)]},this[_0x236691(0x515)][_0xa970fc];}},Game_System[_0x1f2382(0x433)]['setEventIconData']=function(_0x51ce99,_0x281654,_0x49a1db,_0x38343f,_0xb6d247){const _0x3f9395=_0x1f2382;if(this[_0x3f9395(0x515)]===undefined)this[_0x3f9395(0x53e)]();const _0x3862a1=_0x51ce99===$gamePlayer?_0x3f9395(0x1a6):_0x3f9395(0x4d1)[_0x3f9395(0x504)](_0x51ce99[_0x3f9395(0x34c)],_0x51ce99['_eventId']);this['_EventIcons'][_0x3862a1]={'iconIndex':_0x281654,'bufferX':_0x49a1db,'bufferY':_0x38343f,'blendMode':_0xb6d247};},Game_System[_0x1f2382(0x433)][_0x1f2382(0x4f4)]=function(_0x51da23,_0xe65ae6,_0x2099c1,_0xd7742a,_0x13e11d,_0x55ec11,_0x26f14a){const _0x334817=_0x1f2382;if(this[_0x334817(0x515)]===undefined)this[_0x334817(0x53e)]();const _0x44f1cf=_0x334817(0x4d1)[_0x334817(0x504)](_0x51da23,_0xe65ae6);this[_0x334817(0x515)][_0x44f1cf]={'iconIndex':_0x2099c1,'forced':_0x26f14a,'bufferX':_0xd7742a,'bufferY':_0x13e11d,'blendMode':_0x55ec11};},Game_System['prototype']['deleteIconsOnEventsData']=function(_0x1f9c19){const _0x3d3db4=_0x1f2382;if(this[_0x3d3db4(0x515)]===undefined)this['initEventsMoveCore']();if(!_0x1f9c19)return null;_0x1f9c19===$gamePlayer?delete this[_0x3d3db4(0x515)][_0x3d3db4(0x1a6)]:this[_0x3d3db4(0x414)](_0x1f9c19[_0x3d3db4(0x34c)],_0x1f9c19['_eventId']);},Game_System[_0x1f2382(0x433)][_0x1f2382(0x414)]=function(_0x8eff8c,_0xe8e3a5){const _0x180bf7=_0x1f2382;if(this[_0x180bf7(0x515)]===undefined)this['initEventsMoveCore']();this[_0x180bf7(0x4f4)](_0x8eff8c,_0xe8e3a5,-0x1,0x0,0x0,0x0,![]);},Game_System[_0x1f2382(0x433)]['resetIconsOnEventsData']=function(_0x4a1d8e){const _0x4c9acf=_0x1f2382;if(this[_0x4c9acf(0x515)]===undefined)this['initEventsMoveCore']();if(!_0x4a1d8e)return null;_0x4a1d8e===$gamePlayer?delete this[_0x4c9acf(0x515)][_0x4c9acf(0x1a6)]:this[_0x4c9acf(0x13c)](_0x4a1d8e[_0x4c9acf(0x34c)],_0x4a1d8e[_0x4c9acf(0x3af)]);},Game_System['prototype'][_0x1f2382(0x13c)]=function(_0x4467a0,_0x3fadd9){const _0x2384d5=_0x1f2382;if(this[_0x2384d5(0x515)]===undefined)this[_0x2384d5(0x53e)]();const _0x31ed62='Map%1-Event%2'['format'](_0x4467a0,_0x3fadd9);if(this[_0x2384d5(0x515)][_0x31ed62]){if(this[_0x2384d5(0x515)][_0x31ed62]['iconIndex']<0x0)return;if(this['_EventIcons'][_0x31ed62][_0x2384d5(0x34f)])return;}delete this[_0x2384d5(0x515)][_0x31ed62];},Game_System['prototype'][_0x1f2382(0x43c)]=function(_0x2a30bd,_0x324e43){const _0x4cdc0b=_0x1f2382;if(this[_0x4cdc0b(0x515)]===undefined)this[_0x4cdc0b(0x53e)]();const _0x4676d8='Map%1-Event%2'[_0x4cdc0b(0x504)](_0x2a30bd,_0x324e43);delete this['_EventIcons'][_0x4676d8];if(_0x2a30bd!==$gameMap['mapId']())return;const _0x599b61=$gameMap[_0x4cdc0b(0x451)](_0x324e43);if(!_0x599b61)return;_0x599b61[_0x4cdc0b(0x505)]();},Game_System[_0x1f2382(0x433)]['getSavedEventLocation']=function(_0x259094){const _0x39a577=_0x1f2382;if(this[_0x39a577(0x315)]===undefined)this[_0x39a577(0x53e)]();if(!_0x259094)return null;const _0x4c5a90=_0x39a577(0x4d1)[_0x39a577(0x504)](_0x259094[_0x39a577(0x34c)],_0x259094['_eventId']);return this[_0x39a577(0x315)][_0x4c5a90];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x1e0)]=function(_0x3dcd39){const _0xed02b5=_0x1f2382;if(this[_0xed02b5(0x315)]===undefined)this['initEventsMoveCore']();if(!_0x3dcd39)return;const _0x3999e5=_0xed02b5(0x4d1)['format'](_0x3dcd39['_mapId'],_0x3dcd39[_0xed02b5(0x3af)]);this['_SavedEventLocations'][_0x3999e5]={'direction':_0x3dcd39[_0xed02b5(0x2a1)](),'x':Math[_0xed02b5(0x49e)](_0x3dcd39['x']),'y':Math[_0xed02b5(0x49e)](_0x3dcd39['y']),'pageIndex':_0x3dcd39['_pageIndex'],'moveRouteIndex':_0x3dcd39[_0xed02b5(0x4d0)]};},Game_System['prototype'][_0x1f2382(0x383)]=function(_0x585932){const _0x571487=_0x1f2382;if(this[_0x571487(0x315)]===undefined)this[_0x571487(0x53e)]();if(!_0x585932)return;this['deleteSavedEventLocationKey'](_0x585932[_0x571487(0x34c)],_0x585932['_eventId']);},Game_System[_0x1f2382(0x433)]['deleteSavedEventLocationKey']=function(_0x17e6d5,_0x28ee22){const _0x4fca65=_0x1f2382;if(this[_0x4fca65(0x315)]===undefined)this[_0x4fca65(0x53e)]();const _0xb1ce88=_0x4fca65(0x4d1)['format'](_0x17e6d5,_0x28ee22);delete this['_SavedEventLocations'][_0xb1ce88];},Game_System['prototype']['createSaveEventLocationData']=function(_0x45c891,_0x103b43,_0x13a6f,_0x14b2a3,_0x34148e,_0x3b2e95,_0x531eaf){const _0x243d3f=_0x1f2382;if(this[_0x243d3f(0x315)]===undefined)this['initEventsMoveCore']();const _0x1d1dc2=_0x243d3f(0x4d1)['format'](_0x45c891,_0x103b43);this['_SavedEventLocations'][_0x1d1dc2]={'direction':_0x34148e,'x':Math[_0x243d3f(0x49e)](_0x13a6f),'y':Math[_0x243d3f(0x49e)](_0x14b2a3),'pageIndex':_0x3b2e95,'moveRouteIndex':_0x531eaf};},Game_System[_0x1f2382(0x433)][_0x1f2382(0x388)]=function(_0x335bb6){const _0x28df7b=_0x1f2382;if(this[_0x28df7b(0x543)]===undefined)this['initEventsMoveCore']();if(!_0x335bb6)return;const _0x577823=_0x28df7b(0x4d1)[_0x28df7b(0x504)](_0x335bb6[_0x28df7b(0x34c)],_0x335bb6[_0x28df7b(0x3af)]);return this[_0x28df7b(0x543)][_0x577823];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x430)]=function(_0x57cd0a,_0x2c6818,_0x2e75e4,_0x57cf54,_0x4ec985){const _0x47b0d5=_0x1f2382;if(this[_0x47b0d5(0x543)]===undefined)this[_0x47b0d5(0x53e)]();const _0x11a24d=_0x47b0d5(0x4d1)[_0x47b0d5(0x504)](_0x57cd0a,_0x2c6818);this['_PreservedEventMorphData'][_0x11a24d]={'template':_0x2e75e4,'mapId':_0x57cf54,'eventId':_0x4ec985};},Game_System[_0x1f2382(0x433)][_0x1f2382(0x222)]=function(_0x36a431,_0x5624e1){const _0x58a150=_0x1f2382;if(this[_0x58a150(0x543)]===undefined)this[_0x58a150(0x53e)]();const _0x23d1b3='Map%1-Event%2'[_0x58a150(0x504)](_0x36a431,_0x5624e1);delete this[_0x58a150(0x543)][_0x23d1b3];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x3a8)]=function(_0x427db0){const _0x4eb7be=_0x1f2382;if(this[_0x4eb7be(0x50b)]===undefined)this[_0x4eb7be(0x53e)]();return this[_0x4eb7be(0x50b)][_0x427db0]=this[_0x4eb7be(0x50b)][_0x427db0]||[],this[_0x4eb7be(0x50b)][_0x427db0];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x20e)]=function(_0x29f5b6){const _0x531a94=_0x1f2382,_0x2a4ff2=this[_0x531a94(0x3a8)](_0x29f5b6);for(const _0x2a276f of _0x2a4ff2){if(!_0x2a276f)continue;if(_0x2a276f[_0x531a94(0x119)])continue;const _0x138662=_0x2a4ff2['indexOf'](_0x2a276f);_0x2a4ff2[_0x138662]=null;}},Game_System[_0x1f2382(0x433)][_0x1f2382(0x1f6)]=function(){const _0x1a0827=_0x1f2382;this[_0x1a0827(0x190)]=0x0,this['_followerChaseOff']=![];},Game_System[_0x1f2382(0x433)][_0x1f2382(0xcd)]=function(){const _0x7db929=_0x1f2382;if(this[_0x7db929(0x190)]===undefined)this[_0x7db929(0x1f6)]();return this[_0x7db929(0x190)];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x2d0)]=function(_0xb67748){const _0x1a1756=_0x1f2382;if(this[_0x1a1756(0x190)]===undefined)this[_0x1a1756(0x1f6)]();this[_0x1a1756(0x190)]=_0xb67748;;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3dc)]=Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x150)],Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x150)]=function(_0x35f004){const _0x353981=_0x1f2382;if(!$gameParty[_0x353981(0x473)]()&&_0x35f004<0x0){let _0x28dbb0=$gameSystem['getControlledFollowerID']();if(_0x28dbb0>0x0)return $gamePlayer[_0x353981(0x447)]()['follower'](_0x28dbb0-0x1);}return VisuMZ[_0x353981(0x4a7)]['Game_Interpreter_character']['call'](this,_0x35f004);},Game_System['prototype']['isStopFollowerChasing']=function(){const _0x1e82ee=_0x1f2382;if(this[_0x1e82ee(0x33e)]===undefined)this[_0x1e82ee(0x1f6)]();return this[_0x1e82ee(0x33e)];},Game_System[_0x1f2382(0x433)][_0x1f2382(0x247)]=function(_0x18fde2){const _0xce0413=_0x1f2382;if(this[_0xce0413(0x33e)]===undefined)this[_0xce0413(0x1f6)]();this[_0xce0413(0x33e)]=_0x18fde2;;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x38d)]=Game_Followers[_0x1f2382(0x433)][_0x1f2382(0x439)],Game_Followers[_0x1f2382(0x433)][_0x1f2382(0x439)]=function(){const _0xcf004d=_0x1f2382;if($gameSystem[_0xcf004d(0x268)]())return;VisuMZ[_0xcf004d(0x4a7)][_0xcf004d(0x38d)][_0xcf004d(0x49d)](this);},VisuMZ['EventsMoveCore'][_0x1f2382(0x250)]=Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x309)],Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x309)]=function(){const _0x5d1321=_0x1f2382;VisuMZ[_0x5d1321(0x4a7)][_0x5d1321(0x250)][_0x5d1321(0x49d)](this),this['initEventsMoveCore']();},Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x53e)]=function(){const _0x397843=_0x1f2382;this[_0x397843(0x115)]=![],this[_0x397843(0x2b3)]=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer['prototype']['update']=function(_0x38956f){const _0x42b318=_0x1f2382;if(!_0x38956f)return;if(!this[_0x42b318(0x436)])return;if(this[_0x42b318(0x115)])return;if(this[_0x42b318(0x2d1)]<=0x0)return;if(this[_0x42b318(0x2b3)]===undefined)this[_0x42b318(0x53e)]();this[_0x42b318(0x2d1)]+=this[_0x42b318(0x2b3)],this[_0x42b318(0x2d1)]<=0x0&&this[_0x42b318(0x409)]();},VisuMZ['EventsMoveCore'][_0x1f2382(0x2d7)]=Game_Timer[_0x1f2382(0x433)]['start'],Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x36e)]=function(_0x3dbf5a){const _0x3cca4b=_0x1f2382;VisuMZ[_0x3cca4b(0x4a7)][_0x3cca4b(0x2d7)][_0x3cca4b(0x49d)](this,_0x3dbf5a);if(this['_paused']===undefined)this['initEventsMoveCore']();this['_paused']=![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x1d1)]=Game_Timer['prototype'][_0x1f2382(0x483)],Game_Timer[_0x1f2382(0x433)]['stop']=function(){const _0x311340=_0x1f2382;VisuMZ[_0x311340(0x4a7)][_0x311340(0x1d1)][_0x311340(0x49d)](this);if(this[_0x311340(0x115)]===undefined)this[_0x311340(0x53e)]();this[_0x311340(0x115)]=![];},Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x2df)]=function(){const _0x29ead0=_0x1f2382;if(this[_0x29ead0(0x2d1)]<=0x0)return;this['_paused']=!![],this[_0x29ead0(0x436)]=!![];},Game_Timer[_0x1f2382(0x433)]['resume']=function(){const _0x5ddd72=_0x1f2382;if(this[_0x5ddd72(0x2d1)]<=0x0)return;this[_0x5ddd72(0x115)]=![],this['_working']=!![];},Game_Timer[_0x1f2382(0x433)]['gainFrames']=function(_0x49559f){const _0x54269f=_0x1f2382;this['_frames']=this[_0x54269f(0x2d1)]||0x0,this[_0x54269f(0x2d1)]+=_0x49559f,this[_0x54269f(0x436)]=!![],this['_frames']=Math[_0x54269f(0x238)](0x1,this['_frames']);},Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x24e)]=function(_0x240f30){const _0x1b4718=_0x1f2382;this['_frames']=this[_0x1b4718(0x2d1)]||0x0,this['_frames']=_0x240f30,this[_0x1b4718(0x436)]=!![],this[_0x1b4718(0x2d1)]=Math[_0x1b4718(0x238)](0x1,this[_0x1b4718(0x2d1)]);},Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x42f)]=function(_0x3f12ef){const _0x5f52ed=_0x1f2382;this['_speed']=_0x3f12ef,this['_working']=!![],_0x3f12ef>0x0&&(this[_0x5f52ed(0x2d1)]=Math[_0x5f52ed(0x238)](this['_frames'],0x1));},Game_Timer[_0x1f2382(0x433)][_0x1f2382(0x2b2)]=function(_0x260ad1){const _0x84fdaa=_0x1f2382;if(this[_0x84fdaa(0xeb)]===undefined)this['initEventsMoveCore']();this[_0x84fdaa(0xeb)]=_0x260ad1;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x4fa)]=Game_Timer[_0x1f2382(0x433)]['onExpire'],Game_Timer['prototype'][_0x1f2382(0x409)]=function(){const _0x277adf=_0x1f2382;if(this['_expireCommonEvent']===undefined)this[_0x277adf(0x53e)]();this[_0x277adf(0xeb)]?$gameTemp['reserveCommonEvent'](this[_0x277adf(0xeb)]):VisuMZ['EventsMoveCore'][_0x277adf(0x4fa)]['call'](this);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x127)]=Game_Message[_0x1f2382(0x433)]['add'],Game_Message[_0x1f2382(0x433)][_0x1f2382(0x34b)]=function(_0x1c5ee6){const _0x594952=_0x1f2382;VisuMZ[_0x594952(0x4a7)][_0x594952(0x127)][_0x594952(0x49d)](this,_0x1c5ee6),this['_selfEvent']=$gameTemp['getSelfTarget']();},Game_Message['prototype']['registerSelfEvent']=function(){const _0xdae166=_0x1f2382;$gameTemp[_0xdae166(0x394)](this[_0xdae166(0x4d8)]);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x4f6)]=Game_Switches['prototype'][_0x1f2382(0x272)],Game_Switches[_0x1f2382(0x433)][_0x1f2382(0x272)]=function(_0x76c6fe){const _0x3a2627=_0x1f2382;if(DataManager[_0x3a2627(0x398)](_0x76c6fe))return!!this[_0x3a2627(0x2e1)](_0x76c6fe);else{if(DataManager['isSelfSwitch'](_0x76c6fe))return!!this[_0x3a2627(0x4e1)](_0x76c6fe);else return DataManager[_0x3a2627(0x3eb)](_0x76c6fe)?!!this[_0x3a2627(0x367)](_0x76c6fe):VisuMZ[_0x3a2627(0x4a7)][_0x3a2627(0x4f6)][_0x3a2627(0x49d)](this,_0x76c6fe);}},Game_Switches['advancedFunc']={},Game_Switches[_0x1f2382(0x433)][_0x1f2382(0x2e1)]=function(_0x398a21){const _0x44db0e=_0x1f2382;if(!Game_Switches[_0x44db0e(0x290)][_0x398a21]){$dataSystem['switches'][_0x398a21][_0x44db0e(0x4e7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3abf55=_0x44db0e(0x4f1)[_0x44db0e(0x504)](String(RegExp['$1']));Game_Switches[_0x44db0e(0x290)][_0x398a21]=new Function(_0x44db0e(0x2c7),_0x3abf55);}const _0x244823=$gameTemp[_0x44db0e(0x2ea)]()||this;return Game_Switches[_0x44db0e(0x290)][_0x398a21][_0x44db0e(0x49d)](_0x244823,_0x398a21);},Game_Switches[_0x1f2382(0x433)][_0x1f2382(0x4e1)]=function(_0x259bb9){const _0x223a24=_0x1f2382,_0x1d7011=$gameTemp[_0x223a24(0x2ea)]()||this;if(_0x1d7011[_0x223a24(0x15e)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x223a24(0x4f6)]['call'](this,_0x259bb9);else{const _0x1cc0b3=[_0x1d7011[_0x223a24(0x34c)],_0x1d7011[_0x223a24(0x3af)],_0x223a24(0x168)[_0x223a24(0x504)](_0x259bb9)];return $gameSelfSwitches['value'](_0x1cc0b3);}},Game_Switches['prototype']['mapValue']=function(_0x596c43){const _0x461bd6=_0x1f2382,_0x40a80c=$gameMap?$gameMap[_0x461bd6(0x490)]():0x0,_0x153f81=[0x0,0x0,_0x461bd6(0x3d8)[_0x461bd6(0x504)](_0x40a80c,_0x596c43)];return $gameSelfSwitches[_0x461bd6(0x272)](_0x153f81);},VisuMZ['EventsMoveCore']['Game_Switches_setValue']=Game_Switches['prototype']['setValue'],Game_Switches[_0x1f2382(0x433)]['setValue']=function(_0x155add,_0x287582){const _0x31a299=_0x1f2382;if(DataManager[_0x31a299(0x558)](_0x155add))this[_0x31a299(0x380)](_0x155add,_0x287582);else DataManager[_0x31a299(0x3eb)](_0x155add)?this[_0x31a299(0x4d7)](_0x155add,_0x287582):VisuMZ[_0x31a299(0x4a7)][_0x31a299(0x47e)][_0x31a299(0x49d)](this,_0x155add,_0x287582);},Game_Switches[_0x1f2382(0x433)]['setSelfValue']=function(_0x2812bb,_0x58246c){const _0x2ae39e=_0x1f2382,_0x175eaf=$gameTemp[_0x2ae39e(0x2ea)]()||this;if(_0x175eaf[_0x2ae39e(0x15e)]!==Game_Event)VisuMZ[_0x2ae39e(0x4a7)]['Game_Switches_setValue']['call'](this,_0x2812bb,_0x58246c);else{const _0x5e15c8=[_0x175eaf['_mapId'],_0x175eaf['_eventId'],_0x2ae39e(0x168)[_0x2ae39e(0x504)](_0x2812bb)];$gameSelfSwitches[_0x2ae39e(0x2be)](_0x5e15c8,_0x58246c);}},Game_Switches[_0x1f2382(0x433)][_0x1f2382(0x4d7)]=function(_0x4e4613,_0x5d4b1d){const _0x4e8d5c=_0x1f2382,_0x50bbf3=$gameMap?$gameMap['mapId']():0x0,_0x41eb62=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x4e8d5c(0x504)](_0x50bbf3,_0x4e4613)];return $gameSelfSwitches[_0x4e8d5c(0x2be)](_0x41eb62,_0x5d4b1d);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x36a)]=Game_Variables[_0x1f2382(0x433)][_0x1f2382(0x272)],Game_Variables['prototype'][_0x1f2382(0x272)]=function(_0x56d009){const _0x40465b=_0x1f2382;if(DataManager[_0x40465b(0x337)](_0x56d009))return this['advancedValue'](_0x56d009);else{if(DataManager['isSelfVariable'](_0x56d009))return this[_0x40465b(0x4e1)](_0x56d009);else return DataManager[_0x40465b(0x4ea)](_0x56d009)?this[_0x40465b(0x367)](_0x56d009):VisuMZ[_0x40465b(0x4a7)]['Game_Variables_value'][_0x40465b(0x49d)](this,_0x56d009);}},Game_Variables['advancedFunc']={},Game_Variables[_0x1f2382(0x433)]['advancedValue']=function(_0x585e1a){const _0x4e6e00=_0x1f2382;if(!Game_Variables['advancedFunc'][_0x585e1a]){$dataSystem[_0x4e6e00(0x50a)][_0x585e1a][_0x4e6e00(0x4e7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1e68a3=_0x4e6e00(0x4f1)[_0x4e6e00(0x504)](String(RegExp['$1']));Game_Variables[_0x4e6e00(0x290)][_0x585e1a]=new Function(_0x4e6e00(0xcf),_0x1e68a3);}const _0x5afae3=$gameTemp[_0x4e6e00(0x2ea)]()||this;return Game_Variables[_0x4e6e00(0x290)][_0x585e1a]['call'](_0x5afae3,_0x585e1a);},Game_Variables[_0x1f2382(0x433)][_0x1f2382(0x4e1)]=function(_0x5b988c){const _0x5174a0=_0x1f2382,_0x1b2ee9=$gameTemp[_0x5174a0(0x2ea)]()||this;if(_0x1b2ee9['constructor']!==Game_Event)return VisuMZ[_0x5174a0(0x4a7)][_0x5174a0(0x36a)]['call'](this,_0x5b988c);else{const _0x46e871=[_0x1b2ee9[_0x5174a0(0x34c)],_0x1b2ee9[_0x5174a0(0x3af)],_0x5174a0(0x29e)[_0x5174a0(0x504)](_0x5b988c)];return $gameSelfSwitches[_0x5174a0(0x272)](_0x46e871);}},Game_Variables['prototype'][_0x1f2382(0x367)]=function(_0x1dd946){const _0x2aad51=_0x1f2382,_0x2c1ee7=$gameMap?$gameMap[_0x2aad51(0x490)]():0x0,_0x153e66=[0x0,0x0,_0x2aad51(0x40d)[_0x2aad51(0x504)](_0x2c1ee7,_0x1dd946)];return $gameSelfSwitches[_0x2aad51(0x272)](_0x153e66)||0x0;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x270)]=Game_Variables['prototype']['setValue'],Game_Variables['prototype'][_0x1f2382(0x2be)]=function(_0x3067a4,_0xe21ae3){const _0x2bbbcf=_0x1f2382;if(DataManager[_0x2bbbcf(0x375)](_0x3067a4))this[_0x2bbbcf(0x380)](_0x3067a4,_0xe21ae3);else DataManager[_0x2bbbcf(0x4ea)](_0x3067a4)?this['setMapValue'](_0x3067a4,_0xe21ae3):VisuMZ[_0x2bbbcf(0x4a7)][_0x2bbbcf(0x270)][_0x2bbbcf(0x49d)](this,_0x3067a4,_0xe21ae3);},Game_Variables[_0x1f2382(0x433)][_0x1f2382(0x380)]=function(_0x3c498a,_0x352189){const _0x57ac5d=_0x1f2382,_0x347751=$gameTemp[_0x57ac5d(0x2ea)]()||this;if(_0x347751['constructor']!==Game_Event)VisuMZ[_0x57ac5d(0x4a7)][_0x57ac5d(0x270)]['call'](this,_0x3c498a,_0x352189);else{const _0x2a4fbd=[_0x347751[_0x57ac5d(0x34c)],_0x347751['_eventId'],_0x57ac5d(0x29e)['format'](_0x3c498a)];$gameSelfSwitches['setValue'](_0x2a4fbd,_0x352189);}},Game_Variables['prototype'][_0x1f2382(0x4d7)]=function(_0x106a2e,_0x11a1ce){const _0x2c3799=_0x1f2382,_0x1e47d8=$gameMap?$gameMap['mapId']():0x0,_0x308bdb=[0x0,0x0,_0x2c3799(0x40d)[_0x2c3799(0x504)](_0x1e47d8,_0x106a2e)];$gameSelfSwitches[_0x2c3799(0x2be)](_0x308bdb,_0x11a1ce);},VisuMZ['EventsMoveCore']['Game_SelfSwitches_value']=Game_SelfSwitches[_0x1f2382(0x433)][_0x1f2382(0x272)],Game_SelfSwitches['prototype'][_0x1f2382(0x272)]=function(_0x38e715){const _0x4e7004=_0x1f2382;if(_0x38e715[0x2][_0x4e7004(0x4e7)](/(?:SELF|MAP)/i))return this[_0x4e7004(0x4e1)](_0x38e715);else{return VisuMZ[_0x4e7004(0x4a7)]['Game_SelfSwitches_value'][_0x4e7004(0x49d)](this,_0x38e715);;}},Game_SelfSwitches[_0x1f2382(0x433)]['selfValue']=function(_0x59ea12){const _0x46d2af=_0x1f2382;return _0x59ea12[0x2][_0x46d2af(0x4e7)](/VAR/i)?this['_data'][_0x59ea12]||0x0:!!this[_0x46d2af(0x568)][_0x59ea12];},VisuMZ[_0x1f2382(0x4a7)]['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x1f2382(0x433)]['setValue'],Game_SelfSwitches[_0x1f2382(0x433)][_0x1f2382(0x2be)]=function(_0xdf42e1,_0x677bf){const _0x401aa4=_0x1f2382;_0xdf42e1[0x2][_0x401aa4(0x4e7)](/(?:SELF|MAP)/i)?this[_0x401aa4(0x380)](_0xdf42e1,_0x677bf):VisuMZ[_0x401aa4(0x4a7)]['Game_SelfSwitches_setValue'][_0x401aa4(0x49d)](this,_0xdf42e1,_0x677bf);},Game_SelfSwitches[_0x1f2382(0x433)]['setSelfValue']=function(_0x428402,_0xbdd06a){const _0x343dee=_0x1f2382;this['_data'][_0x428402]=_0x428402[0x2][_0x343dee(0x4e7)](/VAR/i)?_0xbdd06a:!!_0xbdd06a,this[_0x343dee(0x355)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x48b)]=Scene_Map[_0x1f2382(0x433)]['createDisplayObjects'],Scene_Map[_0x1f2382(0x433)]['createDisplayObjects']=function(){const _0xdb3697=_0x1f2382;$gameMap[_0xdb3697(0x4d4)](),VisuMZ[_0xdb3697(0x4a7)]['Scene_Map_createDisplayObjects']['call'](this);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x4d4)]=function(){const _0x42bb6f=_0x1f2382;if(this[_0x42bb6f(0x39d)]===this[_0x42bb6f(0x490)]())return;this[_0x42bb6f(0x39d)]=this[_0x42bb6f(0x490)](),this[_0x42bb6f(0xee)]=undefined;const _0x51c66a=this[_0x42bb6f(0x252)]();for(const _0x315b68 of _0x51c66a){if(_0x315b68)$gameSelfSwitches[_0x42bb6f(0x44b)](_0x315b68);}},Game_SelfSwitches[_0x1f2382(0x433)]['resetSelfSwitchesForEvent']=function(_0x460159){const _0x2586c0=_0x1f2382;if(!_0x460159)return;if(!_0x460159['event']())return;const _0x3e2c8e=_0x460159[_0x2586c0(0x451)]()[_0x2586c0(0x2ce)]||'';if(_0x3e2c8e[_0x2586c0(0x4e7)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0xa4ecfa='%1,%2,'['format']($gameMap[_0x2586c0(0x34c)],_0x460159[_0x2586c0(0x3af)]),_0x368d87=Object[_0x2586c0(0x50c)](this['_data'])[_0x2586c0(0x49f)](_0x2c6bfb=>_0x2c6bfb['startsWith'](_0xa4ecfa));while(_0x368d87[_0x2586c0(0x485)]>0x0){const _0x329a53=_0x368d87[_0x2586c0(0x404)]();delete this[_0x2586c0(0x568)][_0x329a53];}}},Game_SelfSwitches[_0x1f2382(0x433)][_0x1f2382(0x583)]=function(_0x265ed9){const _0x1569fc=_0x1f2382,_0x13fa4a=_0x1569fc(0x160)['format']($gameMap[_0x1569fc(0x34c)]),_0x4f837f=Object[_0x1569fc(0x50c)](this[_0x1569fc(0x568)])[_0x1569fc(0x49f)](_0x4ad86f=>_0x4ad86f[_0x1569fc(0x33d)](_0x13fa4a));while(_0x4f837f[_0x1569fc(0x485)]>0x0){const _0xa568fc=_0x4f837f[_0x1569fc(0x404)]();delete this[_0x1569fc(0x568)][_0xa568fc];}_0x265ed9===$gameMap[_0x1569fc(0x490)]()&&$gameMap['requestRefresh']();},VisuMZ[_0x1f2382(0x4a7)]['Game_Enemy_meetsSwitchCondition']=Game_Enemy[_0x1f2382(0x433)][_0x1f2382(0x30b)],Game_Enemy['prototype'][_0x1f2382(0x30b)]=function(_0x2db970){const _0x37bb3c=_0x1f2382;$gameTemp[_0x37bb3c(0x394)](this);const _0x41fc4a=VisuMZ['EventsMoveCore'][_0x37bb3c(0x2d8)][_0x37bb3c(0x49d)](this,_0x2db970);return $gameTemp[_0x37bb3c(0x46a)](),_0x41fc4a;},VisuMZ['EventsMoveCore']['Game_Party_hasEncounterHalf']=Game_Party['prototype'][_0x1f2382(0x3ed)],Game_Party[_0x1f2382(0x433)][_0x1f2382(0x3ed)]=function(){const _0x211428=_0x1f2382;if(this[_0x211428(0x365)]())return!![];return VisuMZ[_0x211428(0x4a7)]['Game_Party_hasEncounterHalf'][_0x211428(0x49d)](this);},Game_Party[_0x1f2382(0x433)][_0x1f2382(0x365)]=function(){const _0x2ffdcb=_0x1f2382;if(this[_0x2ffdcb(0x1f7)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ['EventsMoveCore'][_0x1f2382(0x49b)]=Game_Party[_0x1f2382(0x433)]['hasEncounterNone'],Game_Party[_0x1f2382(0x433)][_0x1f2382(0x284)]=function(){const _0x39446d=_0x1f2382;if(this[_0x39446d(0x218)]())return!![];return VisuMZ[_0x39446d(0x4a7)][_0x39446d(0x49b)][_0x39446d(0x49d)](this);},Game_Party[_0x1f2382(0x433)][_0x1f2382(0x218)]=function(){const _0x473b46=_0x1f2382;if(this[_0x473b46(0x1f7)])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};var $isTileEncounterHalf=function(_0x401f68,_0x27ad93){const _0x29e495=_0x1f2382;if(!$gameMap)return![];_0x401f68=Math[_0x29e495(0x49e)](_0x401f68||0x0),_0x27ad93=Math[_0x29e495(0x49e)](_0x27ad93||0x0);const _0x1fd45d=$gameMap[_0x29e495(0x252)]();for(const _0x3411e4 of _0x1fd45d){if(!_0x3411e4)continue;if(_0x3411e4[_0x29e495(0x2fc)])continue;const _0x46dc0c=_0x3411e4[_0x29e495(0x255)](!![]),_0x26c5e0=_0x3411e4['encounterProximityDistance'](!![]);if($gameMap[_0x29e495(0xf3)](_0x401f68,_0x27ad93,_0x3411e4,_0x46dc0c,_0x26c5e0))return!![];}return![];},$isTileEncounterNone=function(_0x1691ce,_0x4c7cad){const _0x28d4dd=_0x1f2382;if(!$gameMap)return![];_0x1691ce=Math[_0x28d4dd(0x49e)](_0x1691ce||0x0),_0x4c7cad=Math[_0x28d4dd(0x49e)](_0x4c7cad||0x0);const _0x2513fe=$gameMap[_0x28d4dd(0x252)]();for(const _0x5f2ecc of _0x2513fe){if(!_0x5f2ecc)continue;if(_0x5f2ecc[_0x28d4dd(0x2fc)])continue;const _0x3cdfba=_0x5f2ecc[_0x28d4dd(0x255)](![]),_0x28a691=_0x5f2ecc['encounterProximityDistance'](![]);if($gameMap[_0x28d4dd(0xf3)](_0x1691ce,_0x4c7cad,_0x5f2ecc,_0x3cdfba,_0x28a691))return!![];}return![];};VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x449)]=Game_Troop[_0x1f2382(0x433)][_0x1f2382(0x53c)],Game_Troop[_0x1f2382(0x433)][_0x1f2382(0x53c)]=function(_0x4f84d8){const _0x3c7e14=_0x1f2382;$gameTemp[_0x3c7e14(0x394)](this);const _0x2d640e=VisuMZ[_0x3c7e14(0x4a7)][_0x3c7e14(0x449)][_0x3c7e14(0x49d)](this,_0x4f84d8);return $gameTemp[_0x3c7e14(0x46a)](),_0x2d640e;},VisuMZ['EventsMoveCore'][_0x1f2382(0x45a)]=Game_Map[_0x1f2382(0x433)][_0x1f2382(0x434)],Game_Map[_0x1f2382(0x433)]['setup']=function(_0xf74bc8){const _0x5d248e=_0x1f2382;this[_0x5d248e(0x20e)](_0xf74bc8),this[_0x5d248e(0x242)](),VisuMZ[_0x5d248e(0x4a7)][_0x5d248e(0x45a)][_0x5d248e(0x49d)](this,_0xf74bc8),this[_0x5d248e(0x242)](),this[_0x5d248e(0x2c5)](),this[_0x5d248e(0x381)](),this[_0x5d248e(0x351)](),this[_0x5d248e(0x180)](),this[_0x5d248e(0x140)](),this[_0x5d248e(0x1b2)](),this[_0x5d248e(0x33c)](),this[_0x5d248e(0x19b)](),this[_0x5d248e(0x242)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x53d)]=Game_Map['prototype'][_0x1f2382(0x1f3)],Game_Map['prototype'][_0x1f2382(0x1f3)]=function(){const _0x413ace=_0x1f2382;VisuMZ['EventsMoveCore'][_0x413ace(0x53d)][_0x413ace(0x49d)](this),this[_0x413ace(0x4fd)]();},Game_Map[_0x1f2382(0xc5)]=0xc8,Game_Map[_0x1f2382(0x433)]['determineEventOverload']=function(){const _0xc13e0a=_0x1f2382,_0xf81eaf=Game_Map['_eventOverloadThreshold'];this[_0xc13e0a(0x400)]=this['events']()[_0xc13e0a(0x485)]>_0xf81eaf;if(this[_0xc13e0a(0x400)]&&$gameTemp[_0xc13e0a(0x282)]()){}},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x1c7)]=function(){const _0x354970=_0x1f2382;return this[_0x354970(0x400)];},Game_Map[_0x1f2382(0x433)]['clearEventCache']=function(){const _0x504964=_0x1f2382;this[_0x504964(0xee)]=undefined;},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x2c5)]=function(){const _0x54047e=_0x1f2382;this['_diagonalSupport']=VisuMZ[_0x54047e(0x4a7)][_0x54047e(0x196)][_0x54047e(0x1c6)][_0x54047e(0x423)];const _0x403b37=$dataMap[_0x54047e(0x2ce)]||'';if(_0x403b37[_0x54047e(0x4e7)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x403b37[_0x54047e(0x4e7)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x54047e(0x4b1)]=![]);},Game_Map[_0x1f2382(0x2f7)]=VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x196)]['Movement'][_0x1f2382(0x336)]??![],Game_Map[_0x1f2382(0x433)][_0x1f2382(0x3fb)]=function(){const _0x3487b2=_0x1f2382;if(Utils[_0x3487b2(0x44d)]()){if(!Game_Map[_0x3487b2(0x2f7)])return![];}const _0x42e03c=$gameSystem[_0x3487b2(0x442)]();if(_0x42e03c===_0x3487b2(0x35e))return!![];if(_0x42e03c==='disable')return![];if(this[_0x3487b2(0x4b1)]===undefined)this['setupDiagonalSupport']();return this[_0x3487b2(0x4b1)];},Game_Map[_0x1f2382(0x433)][_0x1f2382(0xfe)]=function(_0x41e32e,_0x3bbb93){const _0x474b22=_0x1f2382;if([0x1,0x4,0x7][_0x474b22(0x48f)](_0x3bbb93))_0x41e32e-=0x1;if([0x3,0x6,0x9][_0x474b22(0x48f)](_0x3bbb93))_0x41e32e+=0x1;return this[_0x474b22(0x23b)](_0x41e32e);},Game_Map['prototype']['roundYWithDirection']=function(_0x325bff,_0x5bb81c){const _0x347ed4=_0x1f2382;if([0x1,0x2,0x3][_0x347ed4(0x48f)](_0x5bb81c))_0x325bff+=0x1;if([0x7,0x8,0x9][_0x347ed4(0x48f)](_0x5bb81c))_0x325bff-=0x1;return this[_0x347ed4(0x57d)](_0x325bff);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x3cd)]=function(_0x424ae2,_0x1b1fbf,_0x51717c,_0x5e1820){const _0x208a66=_0x1f2382;return Math[_0x208a66(0x238)](Math[_0x208a66(0x11d)](this[_0x208a66(0x484)](_0x424ae2,_0x51717c)),Math[_0x208a66(0x11d)](this['deltaY'](_0x1b1fbf,_0x5e1820)));},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x381)]=function(){const _0x3942d7=_0x1f2382,_0x5cd831=VisuMZ[_0x3942d7(0x4a7)][_0x3942d7(0x196)][_0x3942d7(0x1f2)],_0x527f60={},_0x356a91=['Allow',_0x3942d7(0x4f5),'Dock'],_0x40c729=['All',_0x3942d7(0x1a1),_0x3942d7(0x1a6),_0x3942d7(0x18d),_0x3942d7(0x509),_0x3942d7(0x166),'Ship','Airship'];for(const _0x55d22d of _0x356a91){for(const _0x46fb16 of _0x40c729){const _0x3668e6='%1%2'[_0x3942d7(0x504)](_0x46fb16,_0x55d22d);_0x5cd831[_0x3668e6]&&(_0x527f60[_0x3668e6]=_0x5cd831[_0x3668e6][_0x3942d7(0x21f)](0x0));}}const _0x5235e3=$dataMap[_0x3942d7(0x2ce)]||'',_0x2094a7=_0x5235e3['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x2094a7)for(const _0x16be37 of _0x2094a7){_0x16be37[_0x3942d7(0x4e7)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x2c5b2b=String(RegExp['$1'])['toLowerCase']()[_0x3942d7(0x122)](),_0x43093b=String(RegExp['$2'])[_0x3942d7(0x4b8)]()['trim']();const _0xe51757=JSON[_0x3942d7(0x440)]('['+RegExp['$3'][_0x3942d7(0x4e7)](/\d+/g)+']');_0x2c5b2b=_0x2c5b2b[_0x3942d7(0x487)](0x0)[_0x3942d7(0x2b4)]()+_0x2c5b2b[_0x3942d7(0x21f)](0x1),_0x43093b=_0x43093b['charAt'](0x0)[_0x3942d7(0x2b4)]()+_0x43093b['slice'](0x1);const _0x37492f=_0x3942d7(0x26b)[_0x3942d7(0x504)](_0x2c5b2b,_0x43093b);if(_0x527f60[_0x37492f])_0x527f60[_0x37492f]=_0x527f60[_0x37492f]['concat'](_0xe51757);}this[_0x3942d7(0x4df)]=_0x527f60;},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x2b6)]=function(_0x26118d,_0x2165d8,_0x292fdf,_0x4f4a7c){const _0x3f601f=_0x1f2382,_0x34a779=this[_0x3f601f(0xfe)](_0x26118d,_0x292fdf),_0x203ad5=this['roundYWithDirection'](_0x2165d8,_0x292fdf),_0x50d24d=this['regionId'](_0x34a779,_0x203ad5),_0x243147=this[_0x3f601f(0x4df)];if(_0x243147[_0x3f601f(0x2f6)]['includes'](_0x50d24d))return!![];else{if(_0x4f4a7c===_0x3f601f(0x369))return _0x243147['PlayerAllow'][_0x3f601f(0x48f)](_0x50d24d)||_0x243147['WalkAllow'][_0x3f601f(0x48f)](_0x50d24d);else{if(_0x4f4a7c===_0x3f601f(0x451))return _0x243147[_0x3f601f(0x3b0)][_0x3f601f(0x48f)](_0x50d24d)||_0x243147[_0x3f601f(0x343)]['includes'](_0x50d24d);else{if(_0x243147[_0x3f601f(0x54e)][_0x3f601f(0x48f)](_0x50d24d))return!![];else{const _0x3c139b=_0x3f601f(0x296)['format'](_0x4f4a7c[_0x3f601f(0x487)](0x0)[_0x3f601f(0x2b4)]()+_0x4f4a7c['slice'](0x1));if(_0x243147[_0x3c139b])return _0x243147[_0x3c139b]['includes'](_0x50d24d);}}}}return![];},Game_Map['prototype'][_0x1f2382(0x3b3)]=function(_0x270934,_0x2c7c3e,_0x1d51ac,_0x497962){const _0x47981b=_0x1f2382,_0x2ee094=this[_0x47981b(0xfe)](_0x270934,_0x1d51ac),_0x407ab2=this['roundYWithDirection'](_0x2c7c3e,_0x1d51ac),_0x4d8571=this[_0x47981b(0x542)](_0x2ee094,_0x407ab2),_0x4280eb=this['_regionRules'];if(_0x4280eb[_0x47981b(0x197)][_0x47981b(0x48f)](_0x4d8571))return!![];else{if(_0x497962===_0x47981b(0x369))return _0x4280eb[_0x47981b(0x472)][_0x47981b(0x48f)](_0x4d8571)||_0x4280eb[_0x47981b(0x1fd)][_0x47981b(0x48f)](_0x4d8571);else{if(_0x497962===_0x47981b(0x451))return _0x4280eb[_0x47981b(0x3c9)][_0x47981b(0x48f)](_0x4d8571)||_0x4280eb[_0x47981b(0x1fd)]['includes'](_0x4d8571);else{if(_0x4280eb['VehicleForbid']['includes'](_0x4d8571))return!![];else{const _0x4e115b=_0x47981b(0x4ff)['format'](_0x497962[_0x47981b(0x487)](0x0)[_0x47981b(0x2b4)]()+_0x497962[_0x47981b(0x21f)](0x1));if(_0x4280eb[_0x4e115b])return _0x4280eb[_0x4e115b][_0x47981b(0x48f)](_0x4d8571);}}}}return![];},Game_Map['prototype']['isRegionDockable']=function(_0xa0034c,_0x2ade88,_0x4f07f2,_0x45eeb2){const _0x1f96e7=_0x1f2382;_0x4f07f2=_0x45eeb2===_0x1f96e7(0x1e7)?0x5:_0x4f07f2;const _0x2d6fbb=this[_0x1f96e7(0xfe)](_0xa0034c,_0x4f07f2),_0x30fd52=this[_0x1f96e7(0x318)](_0x2ade88,_0x4f07f2),_0x4c00c0=this[_0x1f96e7(0x542)](_0x2d6fbb,_0x30fd52),_0xad4e1d=this[_0x1f96e7(0x4df)];if(_0xad4e1d['VehicleDock'][_0x1f96e7(0x48f)](_0x4c00c0))return!![];else{const _0x2906ff=_0x1f96e7(0x584)[_0x1f96e7(0x504)](_0x45eeb2[_0x1f96e7(0x487)](0x0)[_0x1f96e7(0x2b4)]()+_0x45eeb2[_0x1f96e7(0x21f)](0x1));if(_0xad4e1d[_0x2906ff])return _0xad4e1d[_0x2906ff][_0x1f96e7(0x48f)](_0x4c00c0);}return![];},VisuMZ['EventsMoveCore'][_0x1f2382(0x195)]=Game_Map[_0x1f2382(0x433)][_0x1f2382(0xc6)],Game_Map[_0x1f2382(0x433)]['refresh']=function(){const _0x5f3629=_0x1f2382;VisuMZ['EventsMoveCore']['Game_Map_refresh'][_0x5f3629(0x49d)](this),this[_0x5f3629(0x1eb)]();},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x1eb)]=function(){const _0x154a26=_0x1f2382;this[_0x154a26(0x45c)]=![];if(this[_0x154a26(0x252)]()[_0x154a26(0x2d3)](_0x3bb14e=>_0x3bb14e[_0x154a26(0x3d6)]())){this[_0x154a26(0x45c)]=!![];return;}if(this['events']()[_0x154a26(0x2d3)](_0x17de6b=>_0x17de6b[_0x154a26(0xdc)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x154a26(0x4f8)][_0x154a26(0x2d3)](_0x25f632=>_0x25f632['hasAdvancedSwitchVariable']())){this[_0x154a26(0x45c)]=!![];return;}if(this[_0x154a26(0x4f8)][_0x154a26(0x2d3)](_0x74b933=>_0x74b933[_0x154a26(0xdc)]())){this[_0x154a26(0x45c)]=!![];return;}},VisuMZ['EventsMoveCore'][_0x1f2382(0x550)]=Game_Map[_0x1f2382(0x433)][_0x1f2382(0x379)],Game_Map['prototype'][_0x1f2382(0x379)]=function(_0xb8f1a8){const _0x45ce24=_0x1f2382;this[_0x45ce24(0x123)](),VisuMZ[_0x45ce24(0x4a7)][_0x45ce24(0x550)][_0x45ce24(0x49d)](this,_0xb8f1a8);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x123)]=function(){const _0x207d6e=_0x1f2382;if(!this[_0x207d6e(0x45c)])return;this[_0x207d6e(0xfc)]=this['_periodicRefreshTimer']||0x3c,this[_0x207d6e(0xfc)]--,this[_0x207d6e(0xfc)]<=0x0&&(this[_0x207d6e(0x4b9)](),this[_0x207d6e(0xfc)]=0x3c);},VisuMZ[_0x1f2382(0x4a7)]['Game_Map_isDashDisabled']=Game_Map[_0x1f2382(0x433)][_0x1f2382(0x590)],Game_Map[_0x1f2382(0x433)][_0x1f2382(0x590)]=function(){const _0x5afadd=_0x1f2382;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0x5afadd(0x4a7)][_0x5afadd(0x45b)][_0x5afadd(0x49d)](this);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x351)]=function(){const _0x14f3bb=_0x1f2382;this[_0x14f3bb(0x16b)]=![];const _0x2d4af=$dataMap[_0x14f3bb(0x2ce)]||'';_0x2d4af['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x3a4)]=function(){const _0x56893f=_0x1f2382;if(this[_0x56893f(0x16b)]===undefined)this[_0x56893f(0x351)]();return this[_0x56893f(0x16b)];},Game_Map['prototype'][_0x1f2382(0x20e)]=function(_0x3ab142){const _0x1b1284=_0x1f2382;_0x3ab142!==this['mapId']()&&$gamePlayer&&$gameSystem[_0x1b1284(0x20e)](this[_0x1b1284(0x490)]());},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x180)]=function(){const _0x3800b2=_0x1f2382;this[_0x3800b2(0x3a7)]=$gameSystem[_0x3800b2(0x3a8)](this[_0x3800b2(0x490)]()),this[_0x3800b2(0x56c)]=!![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x257)]=Game_Map[_0x1f2382(0x433)][_0x1f2382(0x252)],Game_Map['prototype'][_0x1f2382(0x252)]=function(){const _0x23c199=_0x1f2382;if(this[_0x23c199(0xee)])return this[_0x23c199(0xee)];const _0x2b1181=VisuMZ[_0x23c199(0x4a7)][_0x23c199(0x257)][_0x23c199(0x49d)](this),_0x51ba6d=_0x2b1181[_0x23c199(0x14c)](this['_spawnedEvents']||[]);return this[_0x23c199(0xee)]=_0x51ba6d[_0x23c199(0x49f)](_0x266fbb=>!!_0x266fbb),this['_eventCache'];},VisuMZ['EventsMoveCore']['Game_Map_event']=Game_Map[_0x1f2382(0x433)][_0x1f2382(0x451)],Game_Map[_0x1f2382(0x433)][_0x1f2382(0x451)]=function(_0x500c0e){const _0x3339b5=_0x1f2382;return _0x500c0e>=0x3e8?(_0x500c0e-=0x3e8,this[_0x3339b5(0x3a7)][_0x500c0e]):VisuMZ['EventsMoveCore'][_0x3339b5(0x496)][_0x3339b5(0x49d)](this,_0x500c0e);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x27e)]=function(_0x4bc731){const _0x3d12a6=_0x1f2382,_0xe4e7a=this[_0x3d12a6(0x451)](_0x4bc731);if(_0xe4e7a)_0xe4e7a[_0x3d12a6(0x29d)]();},Game_Map['prototype'][_0x1f2382(0x236)]=function(){const _0x4dcf99=_0x1f2382,_0x50e115={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x4dcf99(0x485)]+0x3e8};this[_0x4dcf99(0x32f)](_0x50e115);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x29f)]=function(_0x478412,_0x5ef88a){const _0x2b8692=_0x1f2382;if(this['eventsXy'](_0x478412,_0x5ef88a)[_0x2b8692(0x485)]>0x0)return!![];if($gamePlayer['x']===_0x478412&&$gamePlayer['y']===_0x5ef88a)return!![];if(this[_0x2b8692(0xf2)]()[_0x2b8692(0x1c1)](_0x478412,_0x5ef88a))return!![];if(this[_0x2b8692(0x3ba)]()['posNt'](_0x478412,_0x5ef88a))return!![];return![];},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x1af)]=function(_0x396ec8,_0x139c98,_0x481d7a){const _0x3a8608=_0x1f2382;$gameTemp[_0x3a8608(0x384)]=_0x396ec8;const _0x596e21=new Game_Event(_0x396ec8[_0x3a8608(0x490)],_0x396ec8['eventId']);$gameTemp[_0x3a8608(0x384)]=undefined,_0x596e21['refresh']();let _0x46be25=_0x139c98-_0x596e21[_0x3a8608(0x174)][_0x3a8608(0x455)],_0x3041c4=_0x139c98+_0x596e21['_addedHitbox'][_0x3a8608(0x26c)],_0x3ec16f=_0x481d7a-_0x596e21[_0x3a8608(0x174)]['up'],_0x25aca3=_0x481d7a+_0x596e21[_0x3a8608(0x174)][_0x3a8608(0x478)];for(let _0x19cde1=_0x46be25;_0x19cde1<=_0x3041c4;_0x19cde1++){for(let _0x51376d=_0x3ec16f;_0x51376d<=_0x25aca3;_0x51376d++){if(this[_0x3a8608(0x29f)](_0x19cde1,_0x51376d))return![];}}return!![];},Game_Map['prototype']['createSpawnedEventWithData']=function(_0x4de228){const _0x10a1c5=_0x1f2382;$gameTemp[_0x10a1c5(0x384)]=_0x4de228;const _0x55fb49=new Game_Event(_0x4de228[_0x10a1c5(0x490)],_0x4de228[_0x10a1c5(0x37b)]);$gameTemp[_0x10a1c5(0x384)]=undefined,this[_0x10a1c5(0x3a7)][_0x10a1c5(0x193)](_0x55fb49),_0x55fb49[_0x10a1c5(0x429)](_0x4de228),this['clearEventCache']();},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x145)]=function(_0x5d9f09,_0x221845,_0x2ab29d){const _0x5414f5=_0x1f2382,_0x488763=_0x5d9f09['template'][_0x5414f5(0x2b4)]()[_0x5414f5(0x122)]();if(_0x488763!==_0x5414f5(0x432)){const _0x5e186c=VisuMZ[_0x5414f5(0x151)][_0x488763];_0x5e186c&&(_0x5d9f09['mapId']=_0x5e186c[_0x5414f5(0x47f)],_0x5d9f09[_0x5414f5(0x37b)]=_0x5e186c[_0x5414f5(0x4eb)]);}const _0x4f4345=_0x5d9f09['x'],_0x3b47a0=_0x5d9f09['y'];if(!this[_0x5414f5(0x295)](_0x4f4345,_0x3b47a0))return![];if(_0x221845){if(this[_0x5414f5(0x29f)](_0x4f4345,_0x3b47a0))return![];if(!this[_0x5414f5(0x1af)](_0x5d9f09,_0x4f4345,_0x3b47a0))return![];}if(_0x2ab29d){if(!this['isPassableByAnyDirection'](_0x4f4345,_0x3b47a0))return![];}return this[_0x5414f5(0x32f)](_0x5d9f09),!![];},Game_Map['prototype']['prepareSpawnedEventAtRegion']=function(_0x3e5bbb,_0x5cbcdf,_0x4510a3,_0x2b453f){const _0x41614c=_0x1f2382,_0x3b0720=_0x3e5bbb[_0x41614c(0x475)][_0x41614c(0x2b4)]()[_0x41614c(0x122)]();if(_0x3b0720!==_0x41614c(0x432)){const _0x10a9be=VisuMZ['EventTemplates'][_0x3b0720];_0x10a9be&&(_0x3e5bbb['mapId']=_0x10a9be[_0x41614c(0x47f)],_0x3e5bbb[_0x41614c(0x37b)]=_0x10a9be[_0x41614c(0x4eb)]);}const _0xfe2cd8=[],_0x55ce85=this[_0x41614c(0x11a)](),_0xa57a78=this[_0x41614c(0x408)]();for(let _0x4e028a=0x0;_0x4e028a<_0x55ce85;_0x4e028a++){for(let _0x44cf83=0x0;_0x44cf83<_0xa57a78;_0x44cf83++){if(!_0x5cbcdf[_0x41614c(0x48f)](this[_0x41614c(0x542)](_0x4e028a,_0x44cf83)))continue;if(!this[_0x41614c(0x295)](_0x4e028a,_0x44cf83))continue;if(_0x4510a3){if(this[_0x41614c(0x29f)](_0x4e028a,_0x44cf83))continue;if(!this[_0x41614c(0x1af)](_0x3e5bbb,_0x4e028a,_0x44cf83))continue;}if(_0x2b453f){if(!this[_0x41614c(0x4a4)](_0x4e028a,_0x44cf83))continue;}_0xfe2cd8[_0x41614c(0x193)]([_0x4e028a,_0x44cf83]);}}if(_0xfe2cd8['length']>0x0){const _0x1eaf2d=_0xfe2cd8[Math[_0x41614c(0x113)](_0xfe2cd8[_0x41614c(0x485)])];return _0x3e5bbb['x']=_0x1eaf2d[0x0],_0x3e5bbb['y']=_0x1eaf2d[0x1],this[_0x41614c(0x32f)](_0x3e5bbb),!![];}return![];},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x55a)]=function(_0xddc1b0,_0x972faf,_0x5b4047,_0x2f426a){const _0x29294d=_0x1f2382,_0x9a0d2a=_0xddc1b0[_0x29294d(0x475)]['toUpperCase']()[_0x29294d(0x122)]();if(_0x9a0d2a!==_0x29294d(0x432)){const _0x5d0216=VisuMZ['EventTemplates'][_0x9a0d2a];_0x5d0216&&(_0xddc1b0[_0x29294d(0x490)]=_0x5d0216['MapID'],_0xddc1b0['eventId']=_0x5d0216[_0x29294d(0x4eb)]);}const _0x54dd27=[],_0x840669=this[_0x29294d(0x11a)](),_0x4e657a=this[_0x29294d(0x408)]();for(let _0x4d4006=0x0;_0x4d4006<_0x840669;_0x4d4006++){for(let _0x456b44=0x0;_0x456b44<_0x4e657a;_0x456b44++){if(!_0x972faf['includes'](this[_0x29294d(0xef)](_0x4d4006,_0x456b44)))continue;if(!this[_0x29294d(0x295)](_0x4d4006,_0x456b44))continue;if(_0x5b4047){if(this[_0x29294d(0x29f)](_0x4d4006,_0x456b44))continue;if(!this[_0x29294d(0x1af)](_0xddc1b0,_0x4d4006,_0x456b44))continue;}if(_0x2f426a){if(!this[_0x29294d(0x4a4)](_0x4d4006,_0x456b44))continue;}_0x54dd27['push']([_0x4d4006,_0x456b44]);}}if(_0x54dd27[_0x29294d(0x485)]>0x0){const _0x1cf845=_0x54dd27[Math['randomInt'](_0x54dd27[_0x29294d(0x485)])];return _0xddc1b0['x']=_0x1cf845[0x0],_0xddc1b0['y']=_0x1cf845[0x1],this[_0x29294d(0x32f)](_0xddc1b0),!![];}return![];},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x4a4)]=function(_0x23a25e,_0x144ba9){const _0x1f6df0=_0x1f2382;if(this[_0x1f6df0(0x210)](_0x23a25e,_0x144ba9,0x2))return!![];if(this['isPassable'](_0x23a25e,_0x144ba9,0x4))return!![];if(this['isPassable'](_0x23a25e,_0x144ba9,0x6))return!![];if(this[_0x1f6df0(0x210)](_0x23a25e,_0x144ba9,0x8))return!![];return![];},Game_Map['prototype'][_0x1f2382(0x1cf)]=function(_0x32ae3c){const _0x4c91c2=_0x1f2382;if(_0x32ae3c<0x3e8)return;if(!this[_0x4c91c2(0x3a7)])return;const _0x2d8e56=this['event'](_0x32ae3c);_0x2d8e56[_0x4c91c2(0x15b)](-0x1,-0x1),_0x2d8e56[_0x4c91c2(0x29d)](),this[_0x4c91c2(0x3a7)][_0x32ae3c-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x17b)]=function(){const _0x3a638d=_0x1f2382;for(const _0x4ef1e2 of this[_0x3a638d(0x3a7)]){if(_0x4ef1e2)return _0x4ef1e2;}return null;},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x340)]=function(){const _0x15f97e=_0x1f2382,_0x516c2c=this[_0x15f97e(0x17b)]();return _0x516c2c?_0x516c2c[_0x15f97e(0x3af)]:0x0;},Game_Map['prototype']['lastSpawnedEvent']=function(){const _0x54318b=_0x1f2382,_0x5881a0=this[_0x54318b(0x3a7)][_0x54318b(0x21f)](0x0)[_0x54318b(0x435)]();for(const _0x138037 of _0x5881a0){if(_0x138037)return _0x138037;}return null;},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x35c)]=function(){const _0x54bbca=_0x1f2382,_0x159a8b=this['lastSpawnedEvent']();return _0x159a8b?_0x159a8b[_0x54bbca(0x3af)]:0x0;},Game_Map[_0x1f2382(0x433)]['despawnAtXY']=function(_0x3f4ed4,_0x2d5199){const _0x47af2c=_0x1f2382,_0x12ea8a=this[_0x47af2c(0xd9)](_0x3f4ed4,_0x2d5199);for(const _0x39f439 of _0x12ea8a){if(!_0x39f439)continue;if(_0x39f439[_0x47af2c(0x1a9)]())this[_0x47af2c(0x1cf)](_0x39f439[_0x47af2c(0x3af)]);}},Game_Map['prototype']['despawnRegions']=function(_0x3a9169){const _0x1b0f59=_0x1f2382;for(const _0x1980e4 of this[_0x1b0f59(0x3a7)]){if(!_0x1980e4)continue;_0x3a9169[_0x1b0f59(0x48f)](_0x1980e4[_0x1b0f59(0x542)]())&&this['despawnEventId'](_0x1980e4[_0x1b0f59(0x3af)]);}},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x4f7)]=function(_0x266c2a){const _0x5102b7=_0x1f2382;for(const _0x3cbb2a of this[_0x5102b7(0x3a7)]){if(!_0x3cbb2a)continue;_0x266c2a['includes'](_0x3cbb2a[_0x5102b7(0xef)]())&&this[_0x5102b7(0x1cf)](_0x3cbb2a[_0x5102b7(0x3af)]);}},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x278)]=function(){const _0x5479cd=_0x1f2382;for(const _0x48cb31 of this[_0x5479cd(0x3a7)]){if(!_0x48cb31)continue;this[_0x5479cd(0x1cf)](_0x48cb31[_0x5479cd(0x3af)]);}},VisuMZ[_0x1f2382(0x4a7)]['Game_Map_unlockEvent']=Game_Map[_0x1f2382(0x433)][_0x1f2382(0x412)],Game_Map[_0x1f2382(0x433)][_0x1f2382(0x412)]=function(_0x29ddd2){const _0x2d5be3=_0x1f2382;VisuMZ[_0x2d5be3(0x4a7)]['Game_Map_unlockEvent'][_0x2d5be3(0x49d)](this,_0x29ddd2);if(_0x29ddd2>=0x3e8){const _0x1c5299=this[_0x2d5be3(0x451)](_0x29ddd2);if(_0x1c5299)_0x1c5299[_0x2d5be3(0x586)]();}},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x140)]=function(){const _0x1bdc29=_0x1f2382;this[_0x1bdc29(0x1a8)]=![],this[_0x1bdc29(0x260)]=![];if(!$dataMap)return;const _0x3772fe=$dataMap[_0x1bdc29(0x2ce)]||'';if(_0x3772fe[_0x1bdc29(0x4e7)](/<HIDE PLAYER>/i))this[_0x1bdc29(0x1a8)]=![],this[_0x1bdc29(0x260)]=!![];else _0x3772fe[_0x1bdc29(0x4e7)](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this[_0x1bdc29(0x260)]=![]);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0xd5)]=function(){const _0x3fd84e=_0x1f2382;return this[_0x3fd84e(0x1a8)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x3fd84e(0x1a8)];},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x19f)]=function(){const _0x25a491=_0x1f2382;return this[_0x25a491(0x260)]===undefined&&this[_0x25a491(0x140)](),this[_0x25a491(0x260)];},VisuMZ['EventsMoveCore'][_0x1f2382(0x54c)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x226)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x226)]=function(){const _0x28ef2a=_0x1f2382;if(this===$gamePlayer){if($gameMap[_0x28ef2a(0xd5)]())return![];if($gameMap[_0x28ef2a(0x19f)]())return!![];}return VisuMZ['EventsMoveCore'][_0x28ef2a(0x54c)][_0x28ef2a(0x49d)](this);},Game_Map[_0x1f2382(0x433)]['setupFollowerVisibilityOverrides']=function(){const _0x44a50c=_0x1f2382;this[_0x44a50c(0x124)]=![],this[_0x44a50c(0x581)]=![];if(!$dataMap)return;const _0x3e4b1=$dataMap[_0x44a50c(0x2ce)]||'';if(_0x3e4b1[_0x44a50c(0x4e7)](/<HIDE FOLLOWERS>/i))this[_0x44a50c(0x124)]=![],this['_forceHideFollower']=!![];else _0x3e4b1['match'](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this[_0x44a50c(0x581)]=![]);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x1c2)]=function(){const _0x53cb7d=_0x1f2382;return this[_0x53cb7d(0x124)]===undefined&&this[_0x53cb7d(0x1b2)](),this[_0x53cb7d(0x124)];},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x4e9)]=function(){const _0x670e4f=_0x1f2382;return this[_0x670e4f(0x581)]===undefined&&this[_0x670e4f(0x1b2)](),this[_0x670e4f(0x581)];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3f9)]=Game_Followers[_0x1f2382(0x433)]['isVisible'],Game_Followers[_0x1f2382(0x433)][_0x1f2382(0x319)]=function(){const _0x2268fc=_0x1f2382;if($gameMap[_0x2268fc(0x1c2)]())return!![];if($gameMap[_0x2268fc(0x4e9)]())return![];return VisuMZ[_0x2268fc(0x4a7)]['Game_Followers_isVisible'][_0x2268fc(0x49d)](this);},Game_Map['prototype'][_0x1f2382(0x33c)]=function(){const _0x123850=_0x1f2382,_0x23e65d=this[_0x123850(0x252)](),_0x53dfc0=[];$gameParty[_0x123850(0x1f7)]=!![];for(const _0x52e8a4 of _0x23e65d){if(!_0x52e8a4)continue;if(_0x52e8a4['_erased'])continue;_0x52e8a4[_0x123850(0x31d)]()&&_0x53dfc0[_0x123850(0x193)](_0x52e8a4);}$gameParty['_checkEncounterRaw']=undefined;for(const _0x4b6069 of _0x53dfc0){if(!_0x4b6069)continue;if(_0x4b6069['_erased'])continue;this[_0x123850(0x27e)](_0x4b6069[_0x123850(0x37b)]());}},Game_Event['prototype'][_0x1f2382(0x31d)]=function(){const _0x14e7d0=_0x1f2382,_0x268a3a=this[_0x14e7d0(0x451)]()[_0x14e7d0(0x2ce)]||'';if(_0x268a3a[_0x14e7d0(0x4e7)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty[_0x14e7d0(0x3ed)]())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x268a3a['match'](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty['hasEncounterNone']())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x27b)]=Scene_Map['prototype']['onMapLoaded'],Scene_Map[_0x1f2382(0x433)][_0x1f2382(0x335)]=function(){const _0x29bfd8=_0x1f2382;VisuMZ['EventsMoveCore'][_0x29bfd8(0x27b)]['call'](this),$gameMap[_0x29bfd8(0x33c)]();},Game_Map[_0x1f2382(0x433)]['requestMapLoadCommonEvents']=function(){const _0x5eb4d3=_0x1f2382;if(!$dataMap)return;if(!$dataMap[_0x5eb4d3(0x2ce)])return;const _0x8b9b8=$dataMap[_0x5eb4d3(0x2ce)];if(_0x8b9b8[_0x5eb4d3(0x4e7)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x1c3838=String(RegExp['$1'])[_0x5eb4d3(0x469)](',')[_0x5eb4d3(0x302)](_0x2af0c8=>Number(_0x2af0c8));for(const _0x3f24c8 of _0x1c3838){$gameTemp[_0x5eb4d3(0x27f)](_0x3f24c8);}}},Game_CommonEvent['prototype'][_0x1f2382(0x3d6)]=function(){const _0x16cafe=_0x1f2382,_0x451a32=this[_0x16cafe(0x451)]();return this['isActive']()&&_0x451a32['trigger']>=0x1&&DataManager[_0x16cafe(0x398)](_0x451a32[_0x16cafe(0x2c7)]);},Game_CommonEvent['prototype'][_0x1f2382(0xdc)]=function(){const _0x44b9b0=_0x1f2382;return VisuMZ['EventsMoveCore'][_0x44b9b0(0x2f3)]['_commonEvents'][_0x44b9b0(0x48f)](this[_0x44b9b0(0x178)]);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x22e)]=Game_CommonEvent[_0x1f2382(0x433)][_0x1f2382(0x3a3)],Game_CommonEvent['prototype'][_0x1f2382(0x3a3)]=function(){const _0x526b26=_0x1f2382;if(VisuMZ[_0x526b26(0x4a7)][_0x526b26(0x22e)]['call'](this))return!![];else{const _0x3f55fe=this[_0x526b26(0x451)]();return VisuMZ[_0x526b26(0x4a7)]['CustomPageConditions']['metCPC'](this['event']()[_0x526b26(0x594)],this['_commonEventId'],_0x3f55fe);}},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x300)]=Game_Map['prototype'][_0x1f2382(0x506)],Game_Map[_0x1f2382(0x433)][_0x1f2382(0x506)]=function(){const _0x5e5674=_0x1f2382,_0x528a42=VisuMZ['EventsMoveCore'][_0x5e5674(0x300)]['call'](this),_0x40cc37=VisuMZ[_0x5e5674(0x4a7)][_0x5e5674(0x2f3)][_0x5e5674(0x4f8)]['map'](_0x13278d=>$dataCommonEvents[_0x13278d]);return _0x528a42[_0x5e5674(0x14c)](_0x40cc37)[_0x5e5674(0x49f)]((_0x3e7d64,_0x225c3a,_0x36d778)=>_0x36d778[_0x5e5674(0x225)](_0x3e7d64)===_0x225c3a);},Game_CharacterBase[_0x1f2382(0x16d)]=VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x196)][_0x1f2382(0x1c6)][_0x1f2382(0x58f)]??![],VisuMZ[_0x1f2382(0x4a7)]['Game_CharacterBase_initMembers']=Game_CharacterBase['prototype'][_0x1f2382(0x297)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x297)]=function(){const _0x313e50=_0x1f2382;VisuMZ['EventsMoveCore'][_0x313e50(0x3ab)][_0x313e50(0x49d)](this),this['initEventsMoveCoreSettings']();},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x1ab)]=function(){const _0x311014=_0x1f2382;this[_0x311014(0x227)]=0x1,this[_0x311014(0x40f)]=0x1,this[_0x311014(0x403)]=![],this[_0x311014(0x3bf)](),this[_0x311014(0xd3)](),this[_0x311014(0x495)](),this[_0x311014(0x334)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x148)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x569)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x569)]=function(){const _0x34af16=_0x1f2382;let _0x243cbc=VisuMZ[_0x34af16(0x4a7)][_0x34af16(0x148)][_0x34af16(0x49d)](this);return _0x243cbc=this['adjustMoveSynchOpacityDelta'](_0x243cbc),_0x243cbc;},Game_CharacterBase[_0x1f2382(0x433)]['adjustMoveSynchOpacityDelta']=function(_0x46d45e){return _0x46d45e;},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x1c8)]=function(){const _0x1931c7=_0x1f2382;if(this['constructor']===Game_Player&&this[_0x1931c7(0x35b)]())return this[_0x1931c7(0x175)]()[_0x1931c7(0x392)]()['match'](/\[VS8\]/i);else return Imported[_0x1931c7(0x2da)]&&this[_0x1931c7(0x3c6)]()?!![]:this[_0x1931c7(0x392)]()[_0x1931c7(0x4e7)](/\[VS8\]/i);},VisuMZ[_0x1f2382(0x4a7)]['Game_CharacterBase_direction']=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x2a1)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x2a1)]=function(){const _0x39c40f=_0x1f2382;if(!$dataMap)return this[_0x39c40f(0x185)]||0x2;if(this['isOnLadder']()&&!this['isJumping']()&&this[_0x39c40f(0x1c8)]())return this['directionOnLadderSpriteVS8dir']();else{if(this[_0x39c40f(0x179)]()&&!this[_0x39c40f(0x353)]())return 0x8;else return this['isPosing']()&&this[_0x39c40f(0x1c8)]()?this[_0x39c40f(0x243)]():VisuMZ[_0x39c40f(0x4a7)][_0x39c40f(0x23e)]['call'](this);}},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x587)]=Game_CharacterBase['prototype'][_0x1f2382(0x477)],Game_CharacterBase[_0x1f2382(0x433)]['setDirection']=function(_0x7e5f2b){const _0x1f8751=_0x1f2382;if(!this[_0x1f8751(0x1c8)]())_0x7e5f2b=this[_0x1f8751(0x22c)](_0x7e5f2b);VisuMZ[_0x1f8751(0x4a7)]['Game_CharacterBase_setDirection'][_0x1f8751(0x49d)](this,_0x7e5f2b),this[_0x1f8751(0x374)]();},Game_CharacterBase['prototype'][_0x1f2382(0x22c)]=function(_0x1a530c){const _0x3f6e4f=_0x1f2382;if(_0x1a530c===0x1)return this[_0x3f6e4f(0x269)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x1a530c===0x3)return this[_0x3f6e4f(0x269)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x1a530c===0x7)return this[_0x3f6e4f(0x269)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x1a530c===0x9)return this[_0x3f6e4f(0x269)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x1a530c;},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x206)]=function(_0x54e0b1){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x54e0b1);},Game_CharacterBase['prototype'][_0x1f2382(0x1e3)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x4bf)]=Game_CharacterBase[_0x1f2382(0x433)]['moveStraight'],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x4c1)]=function(_0x484bac){const _0x3ca7dc=_0x1f2382;this[_0x3ca7dc(0x346)]=_0x484bac,VisuMZ[_0x3ca7dc(0x4a7)][_0x3ca7dc(0x4bf)]['call'](this,_0x484bac);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x441)]=function(_0x16e81b){const _0x2b99a9=_0x1f2382;if(!this['isDiagonalDirection'](_0x16e81b))return this[_0x2b99a9(0x4c1)](_0x16e81b);let _0x495105=0x0,_0x47c2da=0x0;switch(_0x16e81b){case 0x1:_0x495105=0x4,_0x47c2da=0x2;break;case 0x3:_0x495105=0x6,_0x47c2da=0x2;break;case 0x7:_0x495105=0x4,_0x47c2da=0x8;break;case 0x9:_0x495105=0x6,_0x47c2da=0x8;break;}if(VisuMZ[_0x2b99a9(0x4a7)]['Settings'][_0x2b99a9(0x1c6)][_0x2b99a9(0x4c2)]){if(!this[_0x2b99a9(0x269)](this['_x'],this['_y'],_0x495105))return this[_0x2b99a9(0x4c1)](_0x47c2da);if(!this[_0x2b99a9(0x269)](this['_x'],this['_y'],_0x47c2da))return this[_0x2b99a9(0x4c1)](_0x495105);if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x495105,_0x47c2da)){let _0x58510f=VisuMZ[_0x2b99a9(0x4a7)][_0x2b99a9(0x196)]['Movement'][_0x2b99a9(0x331)]?_0x495105:_0x47c2da;return this['moveStraight'](_0x58510f);}}this[_0x2b99a9(0x346)]=_0x16e81b,this[_0x2b99a9(0x167)](_0x495105,_0x47c2da);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x2f8)]=Game_CharacterBase[_0x1f2382(0x433)]['realMoveSpeed'],Game_CharacterBase['prototype']['realMoveSpeed']=function(){const _0x30be98=_0x1f2382;let _0x4be8ac=this[_0x30be98(0x275)];return this[_0x30be98(0x534)]()&&(_0x4be8ac+=this[_0x30be98(0x144)]()),this['adjustDir8MovementSpeed'](_0x4be8ac);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x144)]=function(){const _0x553c2b=_0x1f2382,_0x322d84=VisuMZ[_0x553c2b(0x4a7)]['Settings']['Movement'];return _0x322d84[_0x553c2b(0x254)]!==undefined?_0x322d84[_0x553c2b(0x254)]:VisuMZ['EventsMoveCore'][_0x553c2b(0x2f8)]['call'](this)-this[_0x553c2b(0x275)];},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x314)]=function(_0x32a4d1){const _0x29573b=_0x1f2382,_0x15a1e0=VisuMZ[_0x29573b(0x4a7)][_0x29573b(0x196)][_0x29573b(0x1c6)];if(!_0x15a1e0[_0x29573b(0x352)])return _0x32a4d1;return[0x1,0x3,0x7,0x9][_0x29573b(0x48f)](this[_0x29573b(0x346)])&&(_0x32a4d1*=_0x15a1e0[_0x29573b(0x137)]||0.01),_0x32a4d1;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x541)]=Game_CharacterBase['prototype']['isDashing'],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x534)]=function(){const _0x2057f8=_0x1f2382;if(!Game_CharacterBase[_0x2057f8(0x16d)]&&this[_0x2057f8(0x179)]())return![];if(this[_0x2057f8(0x512)])return!![];return VisuMZ[_0x2057f8(0x4a7)]['Game_CharacterBase_isDashing'][_0x2057f8(0x49d)](this);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x37a)]=function(){const _0x5ecb9b=_0x1f2382;return this[_0x5ecb9b(0x534)]()&&this[_0x5ecb9b(0x555)]===0x0;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3e8)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x38b)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x38b)]=function(){const _0x503697=_0x1f2382;return this[_0x503697(0x32b)]()?this[_0x503697(0x55d)]():VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern']['call'](this);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x58e)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x471)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x471)]=function(){const _0x444a01=_0x1f2382;VisuMZ[_0x444a01(0x4a7)][_0x444a01(0x58e)][_0x444a01(0x49d)](this),this['clearPose']();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x47d)]=Game_CharacterBase['prototype'][_0x1f2382(0x1c5)],Game_CharacterBase['prototype']['characterIndex']=function(){const _0x331e5a=_0x1f2382;if(this[_0x331e5a(0x1c8)]())return this[_0x331e5a(0x3e6)]();return VisuMZ[_0x331e5a(0x4a7)]['Game_CharacterBase_characterIndex'][_0x331e5a(0x49d)](this);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x3e6)]=function(){const _0x4bc45b=_0x1f2382,_0x2f5aac=this[_0x4bc45b(0x2a1)]();if(this['isJumping']()){if([0x2,0x4,0x6,0x8]['includes'](_0x2f5aac))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x2f5aac))return 0x5;}else{if(this[_0x4bc45b(0x179)]())return 0x6;else{if(this['isPosing']())return this[_0x4bc45b(0x15f)]();else{if(this[_0x4bc45b(0xe3)]){if([0x2,0x4,0x6,0x8][_0x4bc45b(0x48f)](_0x2f5aac))return 0x4;if([0x1,0x3,0x7,0x9][_0x4bc45b(0x48f)](_0x2f5aac))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x4bc45b(0x4cd)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x2f5aac))return 0x4;if([0x1,0x3,0x7,0x9][_0x4bc45b(0x48f)](_0x2f5aac))return 0x5;}else{if(this[_0x4bc45b(0x37a)]()){if([0x2,0x4,0x6,0x8][_0x4bc45b(0x48f)](_0x2f5aac))return 0x2;if([0x1,0x3,0x7,0x9][_0x4bc45b(0x48f)](_0x2f5aac))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x4bc45b(0x48f)](_0x2f5aac))return 0x0;if([0x1,0x3,0x7,0x9][_0x4bc45b(0x48f)](_0x2f5aac))return 0x1;}}}}}}},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x4cd)]=function(){const _0x29a305=_0x1f2382;return VisuMZ[_0x29a305(0x4a7)][_0x29a305(0x196)]['VS8']['CarryPose'];},Game_CharacterBase[_0x1f2382(0x433)]['isOnRope']=function(){const _0x1b15d1=_0x1f2382;return this[_0x1b15d1(0x179)]()&&this['terrainTag']()===VisuMZ[_0x1b15d1(0x4a7)][_0x1b15d1(0x196)]['TerrainTag'][_0x1b15d1(0xf6)];},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x548)]=function(){const _0x193e96=_0x1f2382;return this[_0x193e96(0xd6)]()?0x4:0x2;},VisuMZ['EventsMoveCore'][_0x1f2382(0x156)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x379)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x379)]=function(){const _0x4ed8e2=_0x1f2382;this[_0x4ed8e2(0x1de)](),VisuMZ['EventsMoveCore'][_0x4ed8e2(0x156)][_0x4ed8e2(0x49d)](this),this[_0x4ed8e2(0x2ae)]();},Game_CharacterBase['prototype'][_0x1f2382(0x1de)]=function(){const _0x598ac9=_0x1f2382;this[_0x598ac9(0x3f1)]=this[_0x598ac9(0x227)]??0x1,this[_0x598ac9(0x1fb)]=this[_0x598ac9(0x40f)]??0x1;},VisuMZ[_0x1f2382(0x4a7)]['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0x1f2382(0x433)]['bushDepth'],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x1ef)]=function(){const _0x3db79f=_0x1f2382;let _0x28f73b=VisuMZ[_0x3db79f(0x4a7)][_0x3db79f(0x2a6)][_0x3db79f(0x49d)](this);return this['_scaleY']!==undefined&&(_0x28f73b/=Math[_0x3db79f(0x238)](this[_0x3db79f(0x1fb)],0.00001)),Math[_0x3db79f(0x2aa)](_0x28f73b);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x2ae)]=function(){const _0x55eefc=_0x1f2382;this[_0x55eefc(0x40c)]=this[_0x55eefc(0x40c)]||0x0;if(this[_0x55eefc(0x40c)]>0x0){this[_0x55eefc(0x40c)]--;if(this[_0x55eefc(0x40c)]<=0x0&&this[_0x55eefc(0x56e)]!=='ZZZ')this['clearPose']();}},VisuMZ['EventsMoveCore'][_0x1f2382(0x44c)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x167)],Game_CharacterBase['prototype'][_0x1f2382(0x167)]=function(_0x4c32e2,_0x155ed9){const _0x47737d=_0x1f2382;VisuMZ[_0x47737d(0x4a7)]['Game_CharacterBase_moveDiagonally'][_0x47737d(0x49d)](this,_0x4c32e2,_0x155ed9);if(this['isSpriteVS8dir']())this['setDiagonalDirection'](_0x4c32e2,_0x155ed9);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x234)]=function(_0x567443,_0x4edd41){const _0x474035=_0x1f2382;if(_0x567443===0x4&&_0x4edd41===0x2)this[_0x474035(0x477)](0x1);if(_0x567443===0x6&&_0x4edd41===0x2)this['setDirection'](0x3);if(_0x567443===0x4&&_0x4edd41===0x8)this[_0x474035(0x477)](0x7);if(_0x567443===0x6&&_0x4edd41===0x8)this[_0x474035(0x477)](0x9);},VisuMZ['EventsMoveCore'][_0x1f2382(0x152)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x4bc)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x4bc)]=function(){const _0x52f0e9=_0x1f2382;if(this['isPosing']()&&this[_0x52f0e9(0x597)]()===_0x52f0e9(0x46b))return!![];return VisuMZ[_0x52f0e9(0x4a7)][_0x52f0e9(0x152)][_0x52f0e9(0x49d)](this);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x141)]=function(_0x5e52b5,_0x1b0ef2){const _0x50d9a3=_0x1f2382;if(_0x5e52b5[_0x50d9a3(0x4e7)](/Z/i))_0x5e52b5=_0x50d9a3(0x46b);if(_0x5e52b5[_0x50d9a3(0x4e7)](/SLEEP/i))_0x5e52b5=_0x50d9a3(0x46b);this['isSpriteVS8dir']()&&(this[_0x50d9a3(0x56e)]=_0x5e52b5['toUpperCase']()[_0x50d9a3(0x122)](),this['_poseDuration']=_0x1b0ef2||Infinity);},Game_CharacterBase['prototype'][_0x1f2382(0x597)]=function(){const _0x470b9e=_0x1f2382;return this['isSpriteVS8dir']()?(this[_0x470b9e(0x56e)]||'')[_0x470b9e(0x2b4)]()['trim']():''[_0x470b9e(0x2b4)]()[_0x470b9e(0x122)]();},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x479)]=function(_0x50bb20,_0x30afba){const _0x3c2ecd=_0x1f2382;if(this['isSpriteVS8dir']()){const _0x1119aa=['',_0x3c2ecd(0x518),_0x3c2ecd(0x17e),_0x3c2ecd(0xf4),_0x3c2ecd(0x3db),'ANGER','SWEAT','COBWEB','SILENCE',_0x3c2ecd(0x3ef),'ZZZ','','','','',''][_0x50bb20];this[_0x3c2ecd(0x141)](_0x1119aa,_0x30afba);}},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x3bf)]=function(){const _0x5b696f=_0x1f2382;this[_0x5b696f(0x56e)]='',this[_0x5b696f(0x40c)]=0x0;},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x32b)]=function(){const _0x427f15=_0x1f2382;return this[_0x427f15(0x1c8)]()&&!!this[_0x427f15(0x56e)];},Game_CharacterBase['prototype'][_0x1f2382(0x15f)]=function(){const _0x3636ad=_0x1f2382,_0x1276e0=this[_0x3636ad(0x56e)]['toUpperCase']();switch(this[_0x3636ad(0x56e)]['toUpperCase']()['trim']()){case'ITEM':case _0x3636ad(0x22a):case _0x3636ad(0x2bc):case _0x3636ad(0x1cb):case _0x3636ad(0x4d2):case _0x3636ad(0x54b):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x243)]=function(){const _0x339169=_0x1f2382;switch(this[_0x339169(0x56e)][_0x339169(0x2b4)]()){case _0x339169(0x518):case _0x339169(0x17e):case _0x339169(0xf4):case'!':case'?':return 0x2;break;case'HEART':case _0x339169(0x521):case _0x339169(0x1d4):return 0x4;break;case _0x339169(0x3f5):case'HMPH':case _0x339169(0x2bc):case _0x339169(0x1e1):case'SILENCE':case _0x339169(0x3ef):return 0x6;break;case _0x339169(0x1cb):case _0x339169(0x4d2):case _0x339169(0x54b):case'ZZZ':case _0x339169(0x32a):return 0x8;break;default:return VisuMZ[_0x339169(0x4a7)][_0x339169(0x587)][_0x339169(0x49d)](this);break;}},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x55d)]=function(){const _0x1613fb=_0x1f2382;switch(this[_0x1613fb(0x56e)][_0x1613fb(0x2b4)]()){case _0x1613fb(0x3f5):case _0x1613fb(0x1cb):case _0x1613fb(0x518):case'!':case'HEART':case _0x1613fb(0x1e1):return 0x0;break;case _0x1613fb(0x22a):case _0x1613fb(0x4d2):case'QUESTION':case'?':case'ANGER':case _0x1613fb(0x48d):return 0x1;break;case _0x1613fb(0x2bc):case _0x1613fb(0x54b):case _0x1613fb(0xf4):case _0x1613fb(0x1d4):case _0x1613fb(0x3ef):return 0x2;break;default:return VisuMZ['EventsMoveCore'][_0x1613fb(0x3e8)]['call'](this);break;}},Game_CharacterBase['prototype'][_0x1f2382(0x551)]=function(){const _0x3f3f23=_0x1f2382;this[_0x3f3f23(0xe3)]=!![];},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x186)]=function(){this['_forceCarrying']=![];},Game_CharacterBase['prototype']['forceDashing']=function(){const _0x36cbee=_0x1f2382;this[_0x36cbee(0x512)]=!![];},Game_CharacterBase[_0x1f2382(0x433)]['clearDashing']=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x2b8)]=function(){const _0x4351a1=_0x1f2382;if(this[_0x4351a1(0x4b5)]())return![];if(this[_0x4351a1(0x537)])return![];if(this[_0x4351a1(0x163)]==='')return![];if(this[_0x4351a1(0x15e)]===Game_Vehicle)return![];if(this[_0x4351a1(0x226)]())return![];return!![];},Game_CharacterBase[_0x1f2382(0x433)]['isShadowShrink']=function(){const _0x28b2c8=_0x1f2382;if(this[_0x28b2c8(0x179)]())return!![];if(this[_0x28b2c8(0x15e)]===Game_Player&&this[_0x28b2c8(0x35b)]())return!![];return![];},Game_CharacterBase['prototype'][_0x1f2382(0x56a)]=function(){const _0x1f8b38=_0x1f2382;return VisuMZ['EventsMoveCore'][_0x1f8b38(0x196)][_0x1f8b38(0x1c6)][_0x1f8b38(0x4c9)];},Game_CharacterBase[_0x1f2382(0x433)]['shadowX']=function(){return this['screenX']();},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x23c)]=function(){const _0x4cd15b=_0x1f2382,_0x184e8f=$gameMap['tileHeight']();return Math[_0x4cd15b(0x2aa)](this[_0x4cd15b(0x157)]()*_0x184e8f+_0x184e8f);},Game_CharacterBase[_0x1f2382(0x416)]=0x64,Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x4a0)]=function(_0x20ac0d,_0x3970eb){const _0x3e5a76=_0x1f2382;if(TouchInput[_0x3e5a76(0xda)]())return![];if(!$gameMap[_0x3e5a76(0x3fb)]())return![];if($gameMap['eventsXyNt'](_0x20ac0d,_0x3970eb)[_0x3e5a76(0x485)]>0x0)return![];if(!$gameMap[_0x3e5a76(0x4a4)](_0x20ac0d,_0x3970eb))return![];const _0x148bd0=$gameMap[_0x3e5a76(0x36f)]['length'];if(_0x148bd0>=Game_CharacterBase[_0x3e5a76(0x416)])return![];return!![];},Game_Character['prototype'][_0x1f2382(0x28b)]=function(_0x46ae41,_0x26583e){const _0x49613d=_0x1f2382;let _0x29d3bd=this[_0x49613d(0x301)](_0x46ae41,_0x26583e);if(!this['getDiagonalDestination'](_0x46ae41,_0x26583e))return _0x29d3bd;if(this[_0x49613d(0x249)](_0x46ae41,_0x26583e))return _0x29d3bd;const _0x1f89a3=_0x29d3bd;if(_0x29d3bd===0x2){if(_0x46ae41>this['x']&&this[_0x49613d(0x269)](this['x'],this['y'],0x6))_0x29d3bd=0x3;if(_0x46ae41<this['x']&&this[_0x49613d(0x269)](this['x'],this['y'],0x4))_0x29d3bd=0x1;}else{if(_0x29d3bd===0x4){if(_0x26583e>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x29d3bd=0x1;if(_0x26583e<this['y']&&this[_0x49613d(0x269)](this['x'],this['y'],0x6))_0x29d3bd=0x7;}else{if(_0x29d3bd===0x6){if(_0x26583e>this['y']&&this[_0x49613d(0x269)](this['x'],this['y'],0x4))_0x29d3bd=0x3;if(_0x26583e<this['y']&&this['canPass'](this['x'],this['y'],0x6))_0x29d3bd=0x9;}else{if(_0x29d3bd===0x8){if(_0x46ae41>this['x']&&this[_0x49613d(0x269)](this['x'],this['y'],0x6))_0x29d3bd=0x9;if(_0x46ae41<this['x']&&this['canPass'](this['x'],this['y'],0x4))_0x29d3bd=0x7;}}}}if(!this['canPass'](this['x'],this['y'],_0x29d3bd))return _0x1f89a3;const _0x2124e1=$gameMap['roundXWithDirection'](this['x'],_0x29d3bd),_0x47d6d1=$gameMap[_0x49613d(0x318)](this['y'],_0x29d3bd);if(this[_0x49613d(0x249)](_0x2124e1,_0x47d6d1))_0x29d3bd=_0x1f89a3;return _0x29d3bd;},VisuMZ['EventsMoveCore'][_0x1f2382(0x599)]=Game_CharacterBase[_0x1f2382(0x433)]['canPass'],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x269)]=function(_0x113423,_0xf5366a,_0x38038a){const _0xc14923=_0x1f2382;return this['_vehicleType']===_0xc14923(0x1e7)?this[_0xc14923(0x175)]()[_0xc14923(0x491)](_0x113423,_0xf5366a,_0x38038a):VisuMZ[_0xc14923(0x4a7)][_0xc14923(0x599)][_0xc14923(0x49d)](this,_0x113423,_0xf5366a,_0x38038a);},Game_CharacterBase[_0x1f2382(0x433)]['clearSpriteOffsets']=function(){const _0x27a081=_0x1f2382;this[_0x27a081(0x2e3)]=0x0,this[_0x27a081(0xe1)]=0x0;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3d7)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x32d)],Game_CharacterBase[_0x1f2382(0x433)]['screenX']=function(){const _0x2683a2=_0x1f2382;return VisuMZ[_0x2683a2(0x4a7)][_0x2683a2(0x3d7)][_0x2683a2(0x49d)](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x1f2382(0x4a7)]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x49c)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x49c)]=function(){const _0x553574=_0x1f2382;return VisuMZ[_0x553574(0x4a7)][_0x553574(0xde)][_0x553574(0x49d)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x1f2382(0x4e2)]=VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x196)][_0x1f2382(0x1c6)]['ShiftY']??-0x6,Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x33b)]=function(){const _0xa1fb15=_0x1f2382;let _0x565de7=this['isObjectCharacter']()?0x0:-Game_CharacterBase[_0xa1fb15(0x4e2)];return this['_scaleY']&&(_0x565de7*=this[_0xa1fb15(0x1fb)]),Math[_0xa1fb15(0x49e)](_0x565de7);},Game_CharacterBase['prototype'][_0x1f2382(0x334)]=function(){const _0x3d982f=_0x1f2382;this[_0x3d982f(0x12a)]='';},VisuMZ['EventsMoveCore'][_0x1f2382(0x125)]=Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x406)],Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x406)]=function(){const _0x572d90=_0x1f2382;if(this['_patternLocked'])return;if(this[_0x572d90(0x410)]())return;VisuMZ[_0x572d90(0x4a7)][_0x572d90(0x125)][_0x572d90(0x49d)](this);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x410)]=function(){const _0x2f17a4=_0x1f2382;if(!this[_0x2f17a4(0x4bc)]()&&this[_0x2f17a4(0x555)]>0x0)return![];switch(String(this[_0x2f17a4(0x12a)])['toUpperCase']()[_0x2f17a4(0x122)]()){case _0x2f17a4(0x3c4):this[_0x2f17a4(0x28c)]+=0x1;if(this['_pattern']>0x2)this[_0x2f17a4(0x328)](0x0);break;case _0x2f17a4(0x4e5):this[_0x2f17a4(0x28c)]-=0x1;if(this['_pattern']<0x0)this['setPattern'](0x2);break;case _0x2f17a4(0x520):case _0x2f17a4(0x280):this['turnRight90']();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x2f17a4(0x39b):case'SPIN\x20ANTICLOCKWISE':case _0x2f17a4(0x41e):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x16f)]=function(){const _0x2eca8d=_0x1f2382;return $gameSystem[_0x2eca8d(0x16f)](this);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x556)]=function(){const _0x110ed9=_0x1f2382,_0x5de2c2=this['getEventIconData']();if(!_0x5de2c2)return![];return _0x5de2c2[_0x110ed9(0x563)]>0x0;},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x34a)]=function(){const _0x594548=_0x1f2382,_0x313970=this[_0x594548(0x2a1)]();return $gameMap[_0x594548(0xfe)](this['x'],_0x313970);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x22f)]=function(){const _0x316a71=_0x1f2382,_0x12fd86=this[_0x316a71(0x2a1)]();return $gameMap[_0x316a71(0x318)](this['y'],_0x12fd86);},Game_CharacterBase['prototype'][_0x1f2382(0x110)]=function(){const _0x6b1f6c=_0x1f2382,_0x22ef39=this[_0x6b1f6c(0x2c9)](this[_0x6b1f6c(0x2a1)]());return $gameMap['roundXWithDirection'](this['x'],_0x22ef39);},Game_CharacterBase['prototype'][_0x1f2382(0x570)]=function(){const _0x4505ac=_0x1f2382,_0x25a8d8=this['reverseDir'](this[_0x4505ac(0x2a1)]());return $gameMap[_0x4505ac(0x318)](this['y'],_0x25a8d8);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x154)]=function(){const _0x2de8ce=_0x1f2382,_0xeec01f=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x2de8ce(0x2a1)]()];return $gameMap[_0x2de8ce(0xfe)](this['x'],_0xeec01f);},Game_CharacterBase[_0x1f2382(0x433)]['ccwY']=function(){const _0x200745=_0x1f2382,_0x2286c4=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x200745(0x2a1)]()];return $gameMap[_0x200745(0x318)](this['y'],_0x2286c4);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x530)]=function(){const _0x5d2c4d=_0x1f2382,_0x150152=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x5d2c4d(0x2a1)]()];return $gameMap['roundXWithDirection'](this['x'],_0x150152);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x4ab)]=function(){const _0x719fe4=_0x1f2382,_0x3b6d1f=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x719fe4(0x2a1)]()];return $gameMap[_0x719fe4(0x318)](this['y'],_0x3b6d1f);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x224)]=Game_Character[_0x1f2382(0x433)][_0x1f2382(0x2c2)],Game_Character[_0x1f2382(0x433)][_0x1f2382(0x2c2)]=function(_0x3f86b9){const _0x598e50=_0x1f2382;route=JsonEx[_0x598e50(0x3f2)](_0x3f86b9),VisuMZ[_0x598e50(0x4a7)]['Game_Character_setMoveRoute']['call'](this,route);},VisuMZ[_0x1f2382(0x4a7)]['Game_Character_forceMoveRoute']=Game_Character[_0x1f2382(0x433)][_0x1f2382(0x3da)],Game_Character[_0x1f2382(0x433)][_0x1f2382(0x3da)]=function(_0xc2986a){const _0x578c8e=_0x1f2382;route=JsonEx[_0x578c8e(0x3f2)](_0xc2986a),VisuMZ[_0x578c8e(0x4a7)][_0x578c8e(0x26f)][_0x578c8e(0x49d)](this,route);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x467)]=Game_Character['prototype']['processMoveCommand'],Game_Character[_0x1f2382(0x433)]['processMoveCommand']=function(_0x16788e){const _0x1e43d5=_0x1f2382,_0x95825b=Game_Character,_0x18b979=_0x16788e[_0x1e43d5(0x1fc)];if(_0x16788e[_0x1e43d5(0xc9)]===_0x95825b[_0x1e43d5(0x42a)]){let _0x5ba1ff=_0x16788e[_0x1e43d5(0x1fc)][0x0];_0x5ba1ff=this['convertVariableValuesInScriptCall'](_0x5ba1ff),_0x5ba1ff=this[_0x1e43d5(0x4fe)](_0x5ba1ff),this[_0x1e43d5(0x2a9)](_0x16788e,_0x5ba1ff);}else VisuMZ['EventsMoveCore'][_0x1e43d5(0x467)][_0x1e43d5(0x49d)](this,_0x16788e);},Game_Character['prototype'][_0x1f2382(0x524)]=function(_0x5a6fa6){const _0x25d009=_0x1f2382,_0x5e6c10=/\$gameVariables\.value\((\d+)\)/gi,_0x317aa1=/\\V\[(\d+)\]/gi;while(_0x5a6fa6[_0x25d009(0x4e7)](_0x5e6c10)){_0x5a6fa6=_0x5a6fa6['replace'](_0x5e6c10,(_0x53db7c,_0x16a3e8)=>$gameVariables[_0x25d009(0x272)](parseInt(_0x16a3e8)));}while(_0x5a6fa6[_0x25d009(0x4e7)](_0x317aa1)){_0x5a6fa6=_0x5a6fa6[_0x25d009(0x2b0)](_0x317aa1,(_0x4d0e18,_0x39f16f)=>$gameVariables[_0x25d009(0x272)](parseInt(_0x39f16f)));}return _0x5a6fa6;},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x4fe)]=function(_0x5bd699){const _0x2c644f=_0x1f2382,_0x261144=/\\SELFVAR\[(\d+)\]/gi;while(_0x5bd699[_0x2c644f(0x4e7)](_0x261144)){_0x5bd699=_0x5bd699[_0x2c644f(0x2b0)](_0x261144,(_0x48d5b5,_0x313660)=>getSelfVariableValue(this[_0x2c644f(0x34c)],this[_0x2c644f(0x3af)],parseInt(_0x313660)));}return _0x5bd699;},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x2a9)]=function(_0x51f1fd,_0x5d4bfe){const _0x4d6440=_0x1f2382;if(_0x5d4bfe[_0x4d6440(0x4e7)](/ANIMATION:[ ](\d+)/i))return this[_0x4d6440(0x511)](Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/BALLOON:[ ](.*)/i))return this[_0x4d6440(0x4b7)](String(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/FADE IN:[ ](\d+)/i))return this[_0x4d6440(0x428)](Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/FADE OUT:[ ](\d+)/i))return this[_0x4d6440(0x1ba)](Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x4d6440(0x551)]();if(_0x5d4bfe[_0x4d6440(0x4e7)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x4d6440(0x186)]();if(_0x5d4bfe[_0x4d6440(0x4e7)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x4d6440(0x552)]();if(_0x5d4bfe[_0x4d6440(0x4e7)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x4d6440(0xd3)]();if(_0x5d4bfe[_0x4d6440(0x4e7)](/HUG:[ ]LEFT/i))return this[_0x4d6440(0x4fc)](_0x4d6440(0x455));if(_0x5d4bfe[_0x4d6440(0x4e7)](/HUG:[ ]RIGHT/i))return this[_0x4d6440(0x4fc)](_0x4d6440(0x26c));if(_0x5d4bfe['match'](/INDEX:[ ](\d+)/i))return this[_0x4d6440(0x136)](Number(RegExp['$1']));if(_0x5d4bfe['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0x34acec=this[_0x4d6440(0x105)]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0x34acec);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x4d6440(0x362)](Number(RegExp['$1']));if(_0x5d4bfe['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4d6440(0x49a)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x41ccf2=$gameMap[_0x4d6440(0x451)](Number(RegExp['$1']));return this[_0x4d6440(0x564)](_0x41ccf2);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/JUMP TO PLAYER/i))return this['processMoveRouteJumpToCharacter']($gamePlayer);if(_0x5d4bfe[_0x4d6440(0x4e7)](/JUMP TO HOME/i)&&this[_0x4d6440(0x37b)]){const _0x2565ab=this[_0x4d6440(0x30c)],_0x9cc967=this[_0x4d6440(0x58c)];return this[_0x4d6440(0x49a)](_0x2565ab,_0x9cc967);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x4c4f5a=String(RegExp['$1']),_0x35d6d1=this[_0x4d6440(0x1d9)](_0x5d4bfe);return this[_0x4d6440(0x1c0)](_0x4c4f5a,_0x35d6d1);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x207bba=Number(RegExp['$1']),_0xb66b1d=Number(RegExp['$2']),_0x2a2244=this[_0x4d6440(0x1d9)](_0x5d4bfe);return this[_0x4d6440(0x1b6)](_0x207bba,_0xb66b1d,_0x2a2244);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x3ed33b=$gameMap['event'](Number(RegExp['$1'])),_0x1e48d6=this[_0x4d6440(0x1d9)](_0x5d4bfe);return this[_0x4d6440(0x322)](_0x3ed33b,_0x1e48d6);}if(_0x5d4bfe['match'](/MOVE TO PLAYER/i)){const _0x46efbf=this[_0x4d6440(0x1d9)](_0x5d4bfe);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x46efbf);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE TO HOME/i)&&this['eventId']){const _0x401938=this[_0x4d6440(0x30c)],_0x492fea=this[_0x4d6440(0x58c)],_0x4ed9f7=this[_0x4d6440(0x1d9)](_0x5d4bfe);return this[_0x4d6440(0x1b6)](_0x401938,_0x492fea,_0x4ed9f7);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x1,Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE DOWN:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x2,Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x3,Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE LEFT:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x4,Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x6,Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x7,Number(RegExp['$1']));if(_0x5d4bfe['match'](/MOVE UP:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x8,Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x4d6440(0x55f)](0x9,Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/OPACITY:[ ](\d+)([%％])/i)){const _0x36897b=Math[_0x4d6440(0x49e)](Number(RegExp['$1'])/0x64*0xff);return this[_0x4d6440(0x342)](_0x36897b['clamp'](0x0,0xff));}if(_0x5d4bfe[_0x4d6440(0x4e7)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x5b167f=this[_0x4d6440(0x2ab)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x4d6440(0x342)](_0x5b167f[_0x4d6440(0x1ad)](0x0,0xff));}if(_0x5d4bfe[_0x4d6440(0x4e7)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x29c48a=this[_0x4d6440(0x2ab)]+Number(RegExp['$1']);return this['setOpacity'](_0x29c48a['clamp'](0x0,0xff));}if(_0x5d4bfe[_0x4d6440(0x4e7)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x4d6440(0x2a2)](Number(RegExp['$1']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/PATTERN UNLOCK/i))return this[_0x4d6440(0x403)]=![];if(_0x5d4bfe[_0x4d6440(0x4e7)](/POSE:[ ](.*)/i)){const _0x1cca27=String(RegExp['$1'])[_0x4d6440(0x2b4)]()[_0x4d6440(0x122)]();return this[_0x4d6440(0x141)](_0x1cca27);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x47dbb9=Number(RegExp['$1']),_0x2bebcc=Number(RegExp['$2']);return this[_0x4d6440(0x508)](_0x47dbb9,_0x2bebcc);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x518e48=$gameMap[_0x4d6440(0x451)](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x518e48);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/STEP TOWARD PLAYER/i))return this[_0x4d6440(0x463)]($gamePlayer);if(_0x5d4bfe[_0x4d6440(0x4e7)](/STEP TOWARD HOME/i)&&this[_0x4d6440(0x37b)]){const _0x4bdb82=this[_0x4d6440(0x30c)],_0x6cc8fe=this[_0x4d6440(0x58c)];return this[_0x4d6440(0x508)](_0x4bdb82,_0x6cc8fe);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4d6440(0x589)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x325cc1=$gameMap['event'](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x325cc1);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/STEP AWAY FROM PLAYER/i))return this[_0x4d6440(0x10f)]($gamePlayer);if(_0x5d4bfe['match'](/STEP AWAY FROM HOME/i)&&this[_0x4d6440(0x37b)]){const _0x40b815=this[_0x4d6440(0x30c)],_0x1a2060=this[_0x4d6440(0x58c)];return this['moveAwayFromPoint'](_0x40b815,_0x1a2060);}if(_0x5d4bfe['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4d6440(0x10c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5d4bfe['match'](/TURN TO EVENT:[ ](\d+)/i)){const _0x5c7b01=$gameMap[_0x4d6440(0x451)](Number(RegExp['$1']));return this[_0x4d6440(0x574)](_0x5c7b01);}if(_0x5d4bfe['match'](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x5d4bfe[_0x4d6440(0x4e7)](/TURN TO HOME/i)&&this[_0x4d6440(0x37b)]){const _0x11a8b1=this['_randomHomeX'],_0x179895=this['_randomHomeY'];return this['turnTowardPoint'](_0x11a8b1,_0x179895);}if(_0x5d4bfe['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4d6440(0x57c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5d4bfe['match'](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x21c4f9=$gameMap['event'](Number(RegExp['$1']));return this[_0x4d6440(0x1ae)](_0x21c4f9);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x5d4bfe[_0x4d6440(0x4e7)](/TURN AWAY FROM HOME/i)&&this[_0x4d6440(0x37b)]){const _0x1ed7f5=this[_0x4d6440(0x30c)],_0x5ddb08=this['_randomHomeY'];return this[_0x4d6440(0x57c)](_0x1ed7f5,_0x5ddb08);}if(_0x5d4bfe[_0x4d6440(0x4e7)](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x5d4bfe['match'](/TURN LOWER RIGHT/i))return this[_0x4d6440(0x477)](0x3);if(_0x5d4bfe[_0x4d6440(0x4e7)](/TURN UPPER LEFT/i))return this[_0x4d6440(0x477)](0x7);if(_0x5d4bfe[_0x4d6440(0x4e7)](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x5d4bfe[_0x4d6440(0x4e7)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x4d6440(0x30e)](RegExp['$1'],RegExp['$2']);if(_0x5d4bfe['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x4d6440(0x46e)](RegExp['$1'],RegExp['$2']);if(_0x5d4bfe[_0x4d6440(0x4e7)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5d4bfe[_0x4d6440(0x4e7)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x1d8ccd=$gameMap[_0x4d6440(0x451)](Number(RegExp['$1']));return this[_0x4d6440(0x582)](_0x1d8ccd);}if(_0x5d4bfe['match'](/TELEPORT TO PLAYER/i))return this[_0x4d6440(0x582)]($gamePlayer);if(_0x5d4bfe[_0x4d6440(0x4e7)](/TELEPORT TO HOME/i)&&this[_0x4d6440(0x37b)]){const _0x151d97=this[_0x4d6440(0x30c)],_0x271622=this[_0x4d6440(0x58c)];return this[_0x4d6440(0x554)](_0x151d97,_0x271622);}try{VisuMZ['EventsMoveCore'][_0x4d6440(0x467)]['call'](this,_0x51f1fd);}catch(_0x36d8db){if($gameTemp[_0x4d6440(0x282)]())console['log'](_0x36d8db);}},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x511)]=function(_0x3a2937){const _0x585c7e=_0x1f2382;$gameTemp[_0x585c7e(0x4a1)]([this],_0x3a2937);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x4b7)]=function(_0xd26f23){const _0x5e131b=_0x1f2382;let _0x31080e=0x0;switch(_0xd26f23[_0x5e131b(0x2b4)]()[_0x5e131b(0x122)]()){case'!':case _0x5e131b(0x518):_0x31080e=0x1;break;case'?':case _0x5e131b(0x17e):_0x31080e=0x2;break;case _0x5e131b(0x461):case _0x5e131b(0x25f):case'MUSIC\x20NOTE':case _0x5e131b(0x2ef):case _0x5e131b(0x330):_0x31080e=0x3;break;case'HEART':case _0x5e131b(0x373):_0x31080e=0x4;break;case'ANGER':_0x31080e=0x5;break;case'SWEAT':_0x31080e=0x6;break;case _0x5e131b(0x1e1):case _0x5e131b(0x40e):case _0x5e131b(0x2e4):_0x31080e=0x7;break;case _0x5e131b(0x48d):case'...':_0x31080e=0x8;break;case _0x5e131b(0x385):case _0x5e131b(0x258):case'LIGHT\x20BULB':case _0x5e131b(0x419):case _0x5e131b(0x11c):_0x31080e=0x9;break;case'Z':case'ZZ':case _0x5e131b(0x46b):case'SLEEP':_0x31080e=0xa;break;case'USER-DEFINED\x201':_0x31080e=0xb;break;case _0x5e131b(0x30f):_0x31080e=0xc;break;case'USER-DEFINED\x203':_0x31080e=0xd;break;case'USER-DEFINED\x204':_0x31080e=0xe;break;case _0x5e131b(0x468):_0x31080e=0xf;break;}$gameTemp['requestBalloon'](this,_0x31080e);},Game_Character['prototype'][_0x1f2382(0x428)]=function(_0x258010){const _0x4a095c=_0x1f2382;_0x258010+=this[_0x4a095c(0x2ab)],this['setOpacity'](_0x258010[_0x4a095c(0x1ad)](0x0,0xff));if(this[_0x4a095c(0x2ab)]<0xff)this[_0x4a095c(0x4d0)]--;},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x1ba)]=function(_0x4c1e90){const _0x26cb42=_0x1f2382;_0x4c1e90=this['_opacity']-_0x4c1e90,this['setOpacity'](_0x4c1e90['clamp'](0x0,0xff));if(this['_opacity']>0x0)this[_0x26cb42(0x4d0)]--;},Game_Character['prototype'][_0x1f2382(0x4fc)]=function(_0x3084be){const _0x2e08c9=_0x1f2382,_0xcae4bc=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x5bb27b=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x3a606a=this[_0x2e08c9(0x2a1)](),_0xc2ccd2=(_0x3084be===_0x2e08c9(0x455)?_0xcae4bc:_0x5bb27b)[_0x3a606a],_0x4aae1c=(_0x3084be==='left'?_0x5bb27b:_0xcae4bc)[_0x3a606a];if(this['canPass'](this['x'],this['y'],_0xc2ccd2))_0x3084be===_0x2e08c9(0x455)?this[_0x2e08c9(0x1b9)]():this[_0x2e08c9(0x2fd)]();else!this['canPass'](this['x'],this['y'],this[_0x2e08c9(0x2a1)]())&&(this[_0x2e08c9(0x269)](this['x'],this['y'],_0x4aae1c)?_0x3084be==='left'?this[_0x2e08c9(0x2fd)]():this['turnLeft90']():this[_0x2e08c9(0x32e)]());this[_0x2e08c9(0x269)](this['x'],this['y'],this[_0x2e08c9(0x2a1)]())&&this['moveForward']();},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x136)]=function(_0x3b2bf7){const _0x25550a=_0x1f2382;if(ImageManager[_0x25550a(0x595)](this[_0x25550a(0x163)]))return;_0x3b2bf7=_0x3b2bf7['clamp'](0x0,0x7),this['setImage'](this['_characterName'],_0x3b2bf7);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x362)]=function(_0x5cf408){const _0x490e3e=_0x1f2382;switch(this[_0x490e3e(0x2a1)]()){case 0x1:this['jump'](-_0x5cf408,_0x5cf408);break;case 0x2:this[_0x490e3e(0x313)](0x0,_0x5cf408);break;case 0x3:this[_0x490e3e(0x313)](_0x5cf408,_0x5cf408);break;case 0x4:this[_0x490e3e(0x313)](-_0x5cf408,0x0);break;case 0x6:this[_0x490e3e(0x313)](_0x5cf408,0x0);break;case 0x7:this[_0x490e3e(0x313)](-_0x5cf408,-_0x5cf408);break;case 0x8:this[_0x490e3e(0x313)](0x0,-_0x5cf408);break;case 0x9:this[_0x490e3e(0x313)](_0x5cf408,-_0x5cf408);break;}},Game_Character[_0x1f2382(0x433)]['processMoveRouteJumpTo']=function(_0x26873d,_0x3a63ea){const _0x1ff018=_0x1f2382,_0x4ba855=Math[_0x1ff018(0x49e)](_0x26873d-this['x']),_0x565222=Math[_0x1ff018(0x49e)](_0x3a63ea-this['y']);this[_0x1ff018(0x313)](_0x4ba855,_0x565222);},Game_Character['prototype'][_0x1f2382(0x564)]=function(_0x45a51d){const _0xf4422a=_0x1f2382;if(_0x45a51d)this[_0xf4422a(0x49a)](_0x45a51d['x'],_0x45a51d['y']);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x508)]=function(_0x5dc3d0,_0xb72e46,_0x1ba55c){const _0x291b2d=_0x1f2382;let _0x317cd9=0x0;if(_0x1ba55c)$gameTemp[_0x291b2d(0x51a)]=!![];$gameMap['isSupportDiagonalMovement']()?_0x317cd9=this[_0x291b2d(0x28b)](_0x5dc3d0,_0xb72e46):_0x317cd9=this['findDirectionTo'](_0x5dc3d0,_0xb72e46);if(_0x1ba55c)$gameTemp[_0x291b2d(0x51a)]=![];this[_0x291b2d(0x441)](_0x317cd9),this[_0x291b2d(0xe7)](!![]);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x463)]=function(_0x335d4f){const _0x917f75=_0x1f2382;if(_0x335d4f)this[_0x917f75(0x508)](_0x335d4f['x'],_0x335d4f['y']);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x2a5)]=function(_0x35b861,_0x27489b){const _0x20cdc2=_0x1f2382,_0x31b71e=this[_0x20cdc2(0x102)](_0x35b861),_0x2d61c0=this['deltaYFrom'](_0x27489b);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x1d9)]=function(_0x3eacdf){const _0x2f4667=_0x1f2382;if(_0x3eacdf[_0x2f4667(0x4e7)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x3eacdf[_0x2f4667(0x4e7)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x4e4)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x228)],Game_Event[_0x1f2382(0x433)]['isCollidedWithPlayerCharacters']=function(_0x3b7ebf,_0x40ad49){const _0x13c72e=_0x1f2382;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x13c72e(0x4a7)][_0x13c72e(0x4e4)]['call'](this,_0x3b7ebf,_0x40ad49);},Game_Character[_0x1f2382(0x433)]['processMoveRouteMoveUntilStop']=function(_0x2223a2,_0x27f53c){const _0x4cb626=_0x1f2382,_0xcf9843=['',_0x4cb626(0x4f9),_0x4cb626(0x159),_0x4cb626(0x133),_0x4cb626(0x24f),'',_0x4cb626(0xfd),_0x4cb626(0x354),'UP',_0x4cb626(0x292)],_0x1efe63=_0xcf9843[_0x4cb626(0x225)](_0x2223a2[_0x4cb626(0x2b4)]()['trim']());if(_0x1efe63<=0x0)return;if(_0x27f53c)$gameTemp[_0x4cb626(0x51a)]=!![];if(this[_0x4cb626(0x269)](this['x'],this['y'],_0x1efe63)){if(_0x27f53c)$gameTemp[_0x4cb626(0x51a)]=![];this[_0x4cb626(0x441)](_0x1efe63),this[_0x4cb626(0x4d0)]-=0x1;}if(_0x27f53c)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x1b6)]=function(_0x4bc6cc,_0x154c64,_0x275e6e){const _0x277c5f=_0x1f2382;this['processMoveRouteStepTo'](_0x4bc6cc,_0x154c64,_0x275e6e);if(this['x']!==_0x4bc6cc||this['y']!==_0x154c64)this[_0x277c5f(0x4d0)]--;},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x322)]=function(_0xc2f6e5,_0x8ed5c9){const _0x739cd1=_0x1f2382;if(_0xc2f6e5&&!_0xc2f6e5['_erased']){this[_0x739cd1(0x1b6)](_0xc2f6e5['x'],_0xc2f6e5['y'],_0x8ed5c9);if(_0xc2f6e5[_0x739cd1(0x44e)]()&&this[_0x739cd1(0x44e)]()){const _0x34298a=$gameMap[_0x739cd1(0x57b)](this['x'],this['y'],_0xc2f6e5['x'],_0xc2f6e5['y']);if(_0x34298a<=0x1)this['_moveRouteIndex']++;}}},Game_Character[_0x1f2382(0x433)]['processMoveRouteMoveRepeat']=function(_0x2dbaa7,_0x2b3ebf){const _0x2b3cec=_0x1f2382;_0x2b3ebf=_0x2b3ebf||0x0;const _0x401593={'code':0x1,'indent':null,'parameters':[]};_0x401593[_0x2b3cec(0xc9)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x2dbaa7],this[_0x2b3cec(0x458)][_0x2b3cec(0x4d6)][this[_0x2b3cec(0x4d0)]][_0x2b3cec(0x1fc)][0x0]='';while(_0x2b3ebf--){this['_moveRoute'][_0x2b3cec(0x4d6)]['splice'](this[_0x2b3cec(0x4d0)]+0x1,0x0,_0x401593);}},Game_Character['prototype']['processMoveRoutePatternLock']=function(_0x2033ad){const _0x3d139b=_0x1f2382;this[_0x3d139b(0x403)]=!![],this[_0x3d139b(0x328)](_0x2033ad);},Game_Character[_0x1f2382(0x433)]['processMoveRouteSelfSwitch']=function(_0x5de8bd,_0x15ed02){const _0x574d82=_0x1f2382;if(this===$gamePlayer)return;const _0x2ece2d=[this['_mapId'],this[_0x574d82(0x3af)],'A'];_0x5de8bd[_0x574d82(0x4e7)](/\b[ABCD]\b/i)?_0x2ece2d[0x2]=String(_0x5de8bd)[_0x574d82(0x487)](0x0)['toUpperCase']()[_0x574d82(0x122)]():_0x2ece2d[0x2]=_0x574d82(0x168)['format'](_0x5de8bd);switch(_0x15ed02[_0x574d82(0x2b4)]()[_0x574d82(0x122)]()){case'ON':case'TRUE':$gameSelfSwitches['setValue'](_0x2ece2d,!![]);break;case _0x574d82(0x320):case _0x574d82(0x519):$gameSelfSwitches[_0x574d82(0x2be)](_0x2ece2d,![]);break;case _0x574d82(0x48a):$gameSelfSwitches[_0x574d82(0x2be)](_0x2ece2d,!$gameSelfSwitches[_0x574d82(0x272)](_0x2ece2d));break;}},Game_Character['prototype']['processMoveRouteSelfVariable']=function(_0x89ab2d,_0x1d7ff7){const _0x30c697=_0x1f2382;if(this===$gamePlayer)return;const _0x38058c=[this[_0x30c697(0x34c)],this[_0x30c697(0x3af)],_0x30c697(0x29e)[_0x30c697(0x504)](_0x89ab2d)];$gameSelfSwitches[_0x30c697(0x2be)](_0x38058c,Number(_0x1d7ff7));},Game_Character['prototype'][_0x1f2382(0x554)]=function(_0x15ef67,_0x12d7be){const _0x5c7018=_0x1f2382;this[_0x5c7018(0x15b)](_0x15ef67,_0x12d7be);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x582)]=function(_0x3ecb2e){const _0x6bb575=_0x1f2382;if(_0x3ecb2e)this[_0x6bb575(0x554)](_0x3ecb2e['x'],_0x3ecb2e['y']);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x2fd)]=function(){const _0x4ecc9d=_0x1f2382;switch(this[_0x4ecc9d(0x2a1)]()){case 0x1:this['setDirection'](0x7);break;case 0x2:this[_0x4ecc9d(0x477)](0x4);break;case 0x3:this[_0x4ecc9d(0x477)](0x1);break;case 0x4:this[_0x4ecc9d(0x477)](0x8);break;case 0x6:this[_0x4ecc9d(0x477)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this[_0x4ecc9d(0x477)](0x6);break;case 0x9:this[_0x4ecc9d(0x477)](0x3);break;}},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x1b9)]=function(){const _0x3e96f9=_0x1f2382;switch(this[_0x3e96f9(0x2a1)]()){case 0x1:this['setDirection'](0x3);break;case 0x2:this[_0x3e96f9(0x477)](0x6);break;case 0x3:this[_0x3e96f9(0x477)](0x9);break;case 0x4:this[_0x3e96f9(0x477)](0x2);break;case 0x6:this[_0x3e96f9(0x477)](0x8);break;case 0x7:this[_0x3e96f9(0x477)](0x1);break;case 0x8:this[_0x3e96f9(0x477)](0x4);break;case 0x9:this[_0x3e96f9(0x477)](0x7);break;}},Game_Character['prototype']['getDirectionToPoint']=function(_0x2cad60,_0x1d20f0,_0x586c97){const _0x529d3e=_0x1f2382,_0x46fb50=this[_0x529d3e(0x102)](_0x2cad60),_0x3f2e3f=this[_0x529d3e(0x4db)](_0x1d20f0);if($gameMap['isSupportDiagonalMovement']()){if(_0x586c97||this['isSpriteVS8dir']()){if(_0x46fb50>0x0&&_0x3f2e3f<0x0)return 0x1;if(_0x46fb50<0x0&&_0x3f2e3f<0x0)return 0x3;if(_0x46fb50>0x0&&_0x3f2e3f>0x0)return 0x7;if(_0x46fb50<0x0&&_0x3f2e3f>0x0)return 0x9;}}if(Math['abs'](_0x46fb50)>Math[_0x529d3e(0x11d)](_0x3f2e3f))return _0x46fb50>0x0?0x4:0x6;else{if(_0x3f2e3f!==0x0)return _0x3f2e3f>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x1f2382(0x433)]['getDirectionFromPoint']=function(_0x198f0e,_0x515a87,_0x43423b){const _0x4c5d10=_0x1f2382,_0x12370c=this[_0x4c5d10(0x102)](_0x198f0e),_0x35cc27=this[_0x4c5d10(0x4db)](_0x515a87);if($gameMap[_0x4c5d10(0x3fb)]()){if(_0x43423b||this[_0x4c5d10(0x1c8)]()){if(_0x12370c>0x0&&_0x35cc27<0x0)return 0x9;if(_0x12370c<0x0&&_0x35cc27<0x0)return 0x7;if(_0x12370c>0x0&&_0x35cc27>0x0)return 0x3;if(_0x12370c<0x0&&_0x35cc27>0x0)return 0x1;}}if(Math[_0x4c5d10(0x11d)](_0x12370c)>Math[_0x4c5d10(0x11d)](_0x35cc27))return _0x12370c>0x0?0x6:0x4;else{if(_0x35cc27!==0x0)return _0x35cc27>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x10c)]=function(_0x4785dd,_0x4b875a){const _0xb69a58=_0x1f2382,_0x53be06=this['getDirectionToPoint'](_0x4785dd,_0x4b875a,!![]);if(_0x53be06)this[_0xb69a58(0x441)](_0x53be06);},Game_Character[_0x1f2382(0x433)]['moveAwayFromPoint']=function(_0x52c642,_0x1451cf){const _0x4cdabb=_0x1f2382,_0x3a19e=this[_0x4cdabb(0x1da)](_0x52c642,_0x1451cf,!![]);if(_0x3a19e)this['executeMoveDir8'](_0x3a19e);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x51b)]=function(_0x45bb0d,_0x431abb){const _0x505725=_0x1f2382,_0x18fac8=this[_0x505725(0x561)](_0x45bb0d,_0x431abb,![]);if(_0x18fac8)this['setDirection'](_0x18fac8);},Game_Character['prototype'][_0x1f2382(0x57c)]=function(_0x3347d1,_0x5b81bd){const _0x1cd13e=_0x1f2382,_0x568d69=this[_0x1cd13e(0x1da)](_0x3347d1,_0x5b81bd,![]);if(_0x568d69)this[_0x1cd13e(0x477)](_0x568d69);},Game_Character[_0x1f2382(0x433)]['moveTowardCharacter']=function(_0x1a80f0){const _0x5b4fbf=_0x1f2382;if(_0x1a80f0)this[_0x5b4fbf(0x10c)](_0x1a80f0['x'],_0x1a80f0['y']);},Game_Character['prototype']['moveAwayFromCharacter']=function(_0x5a77ae){const _0x563145=_0x1f2382;if(_0x5a77ae)this[_0x563145(0x589)](_0x5a77ae['x'],_0x5a77ae['y']);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x574)]=function(_0x3e34f8){const _0x4c9dc8=_0x1f2382;if(_0x3e34f8)this[_0x4c9dc8(0x51b)](_0x3e34f8['x'],_0x3e34f8['y']);},Game_Character[_0x1f2382(0x433)][_0x1f2382(0x1ae)]=function(_0xacad8e){const _0xda1aa3=_0x1f2382;if(_0xacad8e)this[_0xda1aa3(0x57c)](_0xacad8e['x'],_0xacad8e['y']);},VisuMZ['EventsMoveCore']['Game_Player_isDashing']=Game_Player['prototype'][_0x1f2382(0x534)],Game_Player['prototype'][_0x1f2382(0x534)]=function(){const _0xf70f29=_0x1f2382;if(!Game_CharacterBase[_0xf70f29(0x16d)]&&this[_0xf70f29(0x179)]())return![];if(this[_0xf70f29(0x512)])return!![];return VisuMZ[_0xf70f29(0x4a7)]['Game_Player_isDashing'][_0xf70f29(0x49d)](this);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x33a)]=Game_Player[_0x1f2382(0x433)][_0x1f2382(0x259)],Game_Player[_0x1f2382(0x433)][_0x1f2382(0x259)]=function(){const _0x3537cc=_0x1f2382;return $gameMap[_0x3537cc(0x3fb)]()?this['getInputDir8']():VisuMZ[_0x3537cc(0x4a7)][_0x3537cc(0x33a)]['call'](this);},Game_Player['prototype'][_0x1f2382(0x1b7)]=function(){const _0x3deb6c=_0x1f2382;return Input[_0x3deb6c(0x37e)];},Game_Player[_0x1f2382(0x433)]['moveByInput']=function(){const _0x1c0263=_0x1f2382;if($gameSystem[_0x1c0263(0x446)]())return 0x0;if(!this[_0x1c0263(0x2de)]()&&this[_0x1c0263(0x438)]()){let _0x55022b=this[_0x1c0263(0x259)]();if(_0x55022b>0x0)$gameTemp['clearDestination']();else{if($gameTemp[_0x1c0263(0x18c)]()){const _0x4efba7=$gameTemp['destinationX'](),_0x2c12a1=$gameTemp['destinationY']();this[_0x1c0263(0x4a0)](_0x4efba7,_0x2c12a1)?_0x55022b=this[_0x1c0263(0x28b)](_0x4efba7,_0x2c12a1):_0x55022b=this[_0x1c0263(0x301)](_0x4efba7,_0x2c12a1);}}_0x55022b>0x0?(this[_0x1c0263(0x459)]=this[_0x1c0263(0x459)]||0x0,this[_0x1c0263(0x253)]()?this['setDirection'](_0x55022b):this['executeMove'](_0x55022b),this['_inputTime']++):this[_0x1c0263(0x459)]=0x0;}},Game_Player['prototype'][_0x1f2382(0x253)]=function(){const _0x10e51f=_0x1f2382,_0x171fa0=VisuMZ[_0x10e51f(0x4a7)][_0x10e51f(0x196)][_0x10e51f(0x1c6)];if(!_0x171fa0['EnableTurnInPlace'])return![];if($gameTemp[_0x10e51f(0x18c)]())return![];if(this[_0x10e51f(0x534)]()||this[_0x10e51f(0x2de)]()||this['isOnLadder']())return![];return this[_0x10e51f(0x459)]<_0x171fa0[_0x10e51f(0x426)];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x18b)]=Game_Player[_0x1f2382(0x433)][_0x1f2382(0x422)],Game_Player[_0x1f2382(0x433)][_0x1f2382(0x422)]=function(_0x377bd1){const _0x516c8f=_0x1f2382;$gameMap[_0x516c8f(0x3fb)]()?this[_0x516c8f(0x441)](_0x377bd1):VisuMZ[_0x516c8f(0x4a7)][_0x516c8f(0x18b)][_0x516c8f(0x49d)](this,_0x377bd1);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x390)]=Game_Player[_0x1f2382(0x433)][_0x1f2382(0x246)],Game_Player['prototype'][_0x1f2382(0x246)]=function(_0x2e3d1a,_0x3f9452,_0x1c191d){const _0x5211a8=_0x1f2382;if($gameMap[_0x5211a8(0x2b6)](_0x2e3d1a,_0x3f9452,_0x1c191d,'player'))return this[_0x5211a8(0x35b)]()&&this['vehicle']()?this[_0x5211a8(0x175)]()[_0x5211a8(0x246)](_0x2e3d1a,_0x3f9452,_0x1c191d):!![];if($gameMap['isRegionForbidPass'](_0x2e3d1a,_0x3f9452,_0x1c191d,_0x5211a8(0x369)))return![];return VisuMZ[_0x5211a8(0x4a7)]['Game_Player_isMapPassable'][_0x5211a8(0x49d)](this,_0x2e3d1a,_0x3f9452,_0x1c191d);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x12e)]=Game_Player[_0x1f2382(0x433)][_0x1f2382(0x3d2)],Game_Player['prototype']['checkEventTriggerHere']=function(_0x292204){const _0x3c6091=_0x1f2382;VisuMZ[_0x3c6091(0x4a7)][_0x3c6091(0x12e)][_0x3c6091(0x49d)](this,_0x292204);if(this[_0x3c6091(0x1a4)]()){this[_0x3c6091(0x2a0)](_0x292204);if(_0x292204[_0x3c6091(0x48f)](0x0)&&this[_0x3c6091(0x497)]()===_0x3c6091(0x4ef))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x292204[_0x3c6091(0x48f)](0x1)||_0x292204[_0x3c6091(0x48f)](0x2))&&this[_0x3c6091(0x25b)]();}},VisuMZ[_0x1f2382(0x4a7)]['Game_Player_checkEventTriggerThere']=Game_Player[_0x1f2382(0x433)][_0x1f2382(0x368)],Game_Player[_0x1f2382(0x433)]['checkEventTriggerThere']=function(_0x3ba9ac){const _0x214859=_0x1f2382;VisuMZ[_0x214859(0x4a7)][_0x214859(0xdf)][_0x214859(0x49d)](this,_0x3ba9ac);if(this[_0x214859(0x1a4)]()&&_0x3ba9ac[_0x214859(0x48f)](0x0)&&this[_0x214859(0x497)]()===_0x214859(0x235)){const _0x1130a1=this[_0x214859(0x2a1)](),_0x543107=$gameMap['roundXWithDirection'](this['x'],_0x1130a1),_0x26ac2f=$gameMap[_0x214859(0x318)](this['y'],_0x1130a1);this[_0x214859(0x482)](_0x543107,_0x26ac2f);}},Game_Player['prototype'][_0x1f2382(0x2a0)]=function(_0x2e851d){const _0x48faee=_0x1f2382;if($gameMap[_0x48faee(0x528)]())return;if($gameMap[_0x48faee(0x517)]())return;const _0xaec3f5=$gameMap[_0x48faee(0x252)]();for(const _0x63157 of _0xaec3f5){if(!_0x63157)continue;if(!_0x63157['isTriggerIn'](_0x2e851d))continue;if(this[_0x48faee(0x3b7)](_0x63157))return _0x63157['start']();if(this[_0x48faee(0x283)](_0x63157))return _0x63157['start']();}},Game_Player[_0x1f2382(0x433)][_0x1f2382(0x3b7)]=function(_0x32654d){const _0xedaa28=_0x1f2382;if($gameMap['isEventRunning']())return![];if($gameMap[_0xedaa28(0x517)]())return![];return _0x32654d[_0xedaa28(0x1c9)]()[_0xedaa28(0x48f)](this[_0xedaa28(0x542)]());},Game_Player[_0x1f2382(0x433)][_0x1f2382(0x283)]=function(_0x42ab03){const _0x3dab82=_0x1f2382;if($gameMap[_0x3dab82(0x528)]())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x3dab82(0x4a9),_0x3dab82(0x139)][_0x3dab82(0x48f)](_0x42ab03[_0x3dab82(0x217)]()))return![];const _0x15ce89=_0x42ab03['activationProximityType'](),_0x274325=_0x42ab03[_0x3dab82(0x1ff)]();return this['checkEventProximity'](_0x42ab03,_0x15ce89,_0x274325);},Game_Map[_0x1f2382(0x433)][_0x1f2382(0xf3)]=function(_0x509a47,_0x7006c0,_0x20d1ef,_0x592e1b,_0x485f5d){const _0x3b91c2=_0x1f2382;switch(_0x592e1b){case'square':return _0x485f5d>=Math[_0x3b91c2(0x11d)](_0x20d1ef[_0x3b91c2(0x102)](_0x509a47))&&_0x485f5d>=Math['abs'](_0x20d1ef['deltaYFrom'](_0x7006c0));break;case _0x3b91c2(0x486):const _0x2616b4=Math['pow'](_0x20d1ef['x']-_0x509a47,0x2),_0x4e531d=Math[_0x3b91c2(0x4ac)](_0x20d1ef['y']-_0x7006c0,0x2);return _0x485f5d>=Math[_0x3b91c2(0x49e)](Math[_0x3b91c2(0x117)](_0x2616b4+_0x4e531d));break;case'radius':case _0x3b91c2(0x13d):case _0x3b91c2(0x205):const _0x47223b=$gameMap['distance'](_0x509a47,_0x7006c0,_0x20d1ef['x'],_0x20d1ef['y']);return _0x485f5d>=_0x47223b;break;case _0x3b91c2(0x1dd):return _0x485f5d>=Math[_0x3b91c2(0x11d)](_0x20d1ef['deltaYFrom'](_0x7006c0));break;case _0x3b91c2(0x38f):return _0x485f5d>=Math[_0x3b91c2(0x11d)](_0x20d1ef['deltaXFrom'](_0x509a47));break;}return![];},Game_Player[_0x1f2382(0x433)][_0x1f2382(0xf3)]=function(_0x4b287d,_0x29cc10,_0x1ad8fb){const _0xd519b7=_0x1f2382,_0x4f7557=this['x'],_0x35d122=this['y'];return $gameMap[_0xd519b7(0xf3)](_0x4f7557,_0x35d122,_0x4b287d,_0x29cc10,_0x1ad8fb);},Game_Player['prototype'][_0x1f2382(0x482)]=function(_0x29a219,_0x1dd114){const _0x126bd4=_0x1f2382;if($gameMap['isEventRunning']())return;if($gameMap[_0x126bd4(0x517)]())return;let _0x30202d=VisuMZ[_0x126bd4(0x4a7)]['Settings'][_0x126bd4(0xcc)],_0x4edcbb=$gameMap['regionId'](_0x29a219,_0x1dd114);const _0x384f52=_0x126bd4(0x26a)['format'](_0x4edcbb);_0x30202d[_0x384f52]&&$gameTemp[_0x126bd4(0x27f)](_0x30202d[_0x384f52]);},Game_Player[_0x1f2382(0x433)][_0x1f2382(0x497)]=function(){const _0x303110=_0x1f2382;return VisuMZ[_0x303110(0x4a7)][_0x303110(0x196)][_0x303110(0x2d4)];},Game_Player['prototype']['startMapCommonEventOnTouch']=function(){const _0x3b6a97=_0x1f2382;if($gameMap[_0x3b6a97(0x528)]())return;if($gameMap[_0x3b6a97(0x517)]())return;let _0x3b691d=VisuMZ[_0x3b6a97(0x4a7)][_0x3b6a97(0x196)][_0x3b6a97(0x263)];const _0x1f2454=_0x3b6a97(0x26a)[_0x3b6a97(0x504)](this[_0x3b6a97(0x542)]());_0x3b691d[_0x1f2454]&&$gameTemp[_0x3b6a97(0x27f)](_0x3b691d[_0x1f2454]);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x53b)]=Game_Player[_0x1f2382(0x433)]['increaseSteps'],Game_Player[_0x1f2382(0x433)][_0x1f2382(0x471)]=function(){const _0x9dd926=_0x1f2382;VisuMZ[_0x9dd926(0x4a7)]['Game_Player_increaseSteps'][_0x9dd926(0x49d)](this),VisuMZ[_0x9dd926(0x3ea)](0x0);},Game_Player[_0x1f2382(0x433)][_0x1f2382(0x374)]=function(){const _0x24e1e4=_0x1f2382;VisuMZ[_0x24e1e4(0x114)](0x0);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x165)]=Game_Follower['prototype']['initialize'],Game_Follower[_0x1f2382(0x433)]['initialize']=function(_0x396a4e){const _0xe336f6=_0x1f2382;VisuMZ['EventsMoveCore'][_0xe336f6(0x165)][_0xe336f6(0x49d)](this,_0x396a4e),this[_0xe336f6(0x29b)]=![];},Game_Follower[_0x1f2382(0x433)][_0x1f2382(0x534)]=function(){const _0x26d0b1=_0x1f2382;if(this[_0x26d0b1(0x29b)])return Game_Character[_0x26d0b1(0x433)][_0x26d0b1(0x534)][_0x26d0b1(0x49d)](this);return $gamePlayer[_0x26d0b1(0x534)]();},Game_Follower['prototype'][_0x1f2382(0x37a)]=function(){const _0x28d743=_0x1f2382;if(this[_0x28d743(0x29b)])return Game_Character['prototype'][_0x28d743(0x37a)][_0x28d743(0x49d)](this);return $gamePlayer[_0x28d743(0x37a)]()&&this[_0x28d743(0x39c)];},Game_Follower[_0x1f2382(0x433)][_0x1f2382(0x187)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0x1f2382(0x433)]['updateStop']=function(){const _0x4d0e8b=_0x1f2382;Game_Character[_0x4d0e8b(0x433)][_0x4d0e8b(0x112)][_0x4d0e8b(0x49d)](this),this[_0x4d0e8b(0x555)]>0x0&&(this[_0x4d0e8b(0x39c)]=![]);},Game_Follower[_0x1f2382(0x433)][_0x1f2382(0x2af)]=function(_0x5957ff){const _0x42a100=_0x1f2382;this[_0x42a100(0x29b)]=_0x5957ff;},VisuMZ[_0x1f2382(0x4a7)]['Game_Follower_chaseCharacter']=Game_Follower['prototype'][_0x1f2382(0x42b)],Game_Follower[_0x1f2382(0x433)][_0x1f2382(0x42b)]=function(_0x24167f){const _0x55e93b=_0x1f2382;if(this[_0x55e93b(0x29b)])return;if($gameSystem[_0x55e93b(0x268)]())return;VisuMZ[_0x55e93b(0x4a7)][_0x55e93b(0x3e2)][_0x55e93b(0x49d)](this,_0x24167f),this['_actuallyMoving']=!![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3fa)]=Game_Vehicle['prototype']['isMapPassable'],Game_Vehicle[_0x1f2382(0x433)][_0x1f2382(0x246)]=function(_0x4b67ca,_0x27cc23,_0x4e0755){const _0x126ae8=_0x1f2382;if($gameMap[_0x126ae8(0x2b6)](_0x4b67ca,_0x27cc23,_0x4e0755,this[_0x126ae8(0x1e8)]))return!![];if($gameMap[_0x126ae8(0x3b3)](_0x4b67ca,_0x27cc23,_0x4e0755,this[_0x126ae8(0x1e8)]))return![];return VisuMZ[_0x126ae8(0x4a7)][_0x126ae8(0x3fa)][_0x126ae8(0x49d)](this,_0x4b67ca,_0x27cc23,_0x4e0755);},Game_Vehicle[_0x1f2382(0x433)][_0x1f2382(0x491)]=function(_0x260418,_0x127594,_0x3523c9){const _0x52c714=_0x1f2382;if($gameMap['isRegionAllowPass'](_0x260418,_0x127594,_0x3523c9,this['_type']))return!![];if($gameMap[_0x52c714(0x3b3)](_0x260418,_0x127594,_0x3523c9,this[_0x52c714(0x1e8)]))return![];return VisuMZ[_0x52c714(0x4a7)][_0x52c714(0x599)][_0x52c714(0x49d)]($gamePlayer,_0x260418,_0x127594,_0x3523c9);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0xce)]=Game_Vehicle[_0x1f2382(0x433)][_0x1f2382(0x256)],Game_Vehicle[_0x1f2382(0x433)][_0x1f2382(0x256)]=function(_0x4b6f3c,_0x581d10,_0x425155){const _0x5b7e20=_0x1f2382;if($gameMap[_0x5b7e20(0x593)](_0x4b6f3c,_0x581d10,_0x425155,this[_0x5b7e20(0x1e8)]))return!![];const _0x3e3d29=this[_0x5b7e20(0x1e8)][_0x5b7e20(0x487)](0x0)[_0x5b7e20(0x2b4)]()+this['_type'][_0x5b7e20(0x21f)](0x1),_0x19b8c2=_0x5b7e20(0x130)[_0x5b7e20(0x504)](_0x3e3d29);return VisuMZ['EventsMoveCore'][_0x5b7e20(0x196)][_0x5b7e20(0x1f2)][_0x19b8c2]?![]:VisuMZ[_0x5b7e20(0x4a7)][_0x5b7e20(0xce)][_0x5b7e20(0x49d)](this,_0x4b6f3c,_0x581d10,_0x425155);},VisuMZ['EventsMoveCore']['Game_Vehicle_initMoveSpeed']=Game_Vehicle['prototype']['initMoveSpeed'],Game_Vehicle[_0x1f2382(0x433)][_0x1f2382(0x396)]=function(){const _0xf3b534=_0x1f2382;VisuMZ['EventsMoveCore'][_0xf3b534(0x42c)][_0xf3b534(0x49d)](this);const _0x1a43f4=VisuMZ[_0xf3b534(0x4a7)][_0xf3b534(0x196)]['Movement'];if(this[_0xf3b534(0x52a)]()){if(_0x1a43f4[_0xf3b534(0x348)])this[_0xf3b534(0x3c0)](_0x1a43f4[_0xf3b534(0x348)]);}else{if(this[_0xf3b534(0x52e)]()){if(_0x1a43f4['ShipSpeed'])this['setMoveSpeed'](_0x1a43f4[_0xf3b534(0x420)]);}else{if(this[_0xf3b534(0x2ec)]()){if(_0x1a43f4['AirshipSpeed'])this[_0xf3b534(0x3c0)](_0x1a43f4['AirshipSpeed']);}}}},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x219)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x309)],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x309)]=function(_0x229e04,_0x37b9f3){const _0x41b788=_0x1f2382;this[_0x41b788(0xc7)]=!![],VisuMZ[_0x41b788(0x4a7)][_0x41b788(0x219)][_0x41b788(0x49d)](this,_0x229e04,_0x37b9f3),this[_0x41b788(0xc7)]=undefined,this[_0x41b788(0x3cb)](),this[_0x41b788(0x327)](),this[_0x41b788(0x421)]();},Game_Map[_0x1f2382(0x433)][_0x1f2382(0x161)]=function(_0x1ef44e,_0x4467b1){const _0x530911=_0x1f2382;return _0x1ef44e===$gameMap[_0x530911(0x490)]()?$dataMap['events'][_0x4467b1]:VisuMZ['PreloadedMaps'][_0x1ef44e][_0x530911(0x252)][_0x4467b1];},VisuMZ['EventsMoveCore'][_0x1f2382(0x31c)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x451)],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x451)]=function(){const _0x1d29d8=_0x1f2382;if(this[_0x1d29d8(0x1d0)]!==undefined){const _0xde59ee=this[_0x1d29d8(0x1d0)][_0x1d29d8(0x490)],_0x48f202=this[_0x1d29d8(0x1d0)][_0x1d29d8(0x37b)];return $gameMap[_0x1d29d8(0x161)](_0xde59ee,_0x48f202);}if(this[_0x1d29d8(0x4c7)]!==undefined){const _0x2cdc32=this[_0x1d29d8(0x4c7)][_0x1d29d8(0x490)],_0x1fa214=this['_eventCopyData'][_0x1d29d8(0x37b)];return $gameMap[_0x1d29d8(0x161)](_0x2cdc32,_0x1fa214);}if(this[_0x1d29d8(0x44a)]!==undefined){const _0x291b45=this[_0x1d29d8(0x44a)][_0x1d29d8(0x490)],_0x138af8=this['_eventSpawnData'][_0x1d29d8(0x37b)];return $gameMap[_0x1d29d8(0x161)](_0x291b45,_0x138af8);}if($gameTemp['_spawnData']!==undefined){const _0x3bc1df=$gameTemp['_spawnData'][_0x1d29d8(0x490)],_0x597d9a=$gameTemp[_0x1d29d8(0x384)]['eventId'];return $gameMap['referEvent'](_0x3bc1df,_0x597d9a);}return VisuMZ[_0x1d29d8(0x4a7)][_0x1d29d8(0x31c)][_0x1d29d8(0x49d)](this);},Game_Event[_0x1f2382(0x433)]['checkValidEventerMap']=function(_0x3975e8,_0x3aec07){const _0x53ce77=_0x1f2382;if(_0x3975e8===0x0||_0x3aec07===0x0)return![];if(_0x3975e8===$gameMap[_0x53ce77(0x490)]())return!![];if(!VisuMZ[_0x53ce77(0x51d)][_0x3975e8]&&_0x3975e8!==$gameMap[_0x53ce77(0x490)]())return $gameTemp['isPlaytest']()&&console['log'](_0x53ce77(0x200)['format'](_0x3975e8)),![];return!![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x4f0)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x36e)],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x36e)]=function(){const _0x151314=_0x1f2382;VisuMZ['EventsMoveCore'][_0x151314(0x4f0)][_0x151314(0x49d)](this),Imported[_0x151314(0x3a2)]&&Input[_0x151314(0xda)](VisuMZ[_0x151314(0x386)][_0x151314(0x196)]['General']['FastForwardKey'])&&Input[_0x151314(0x118)]();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x3cb)]=function(){const _0x3cc30d=_0x1f2382,_0x47bcb8=this[_0x3cc30d(0x451)]()['note'];if(_0x47bcb8==='')return;if(DataManager[_0x3cc30d(0xc8)]()||DataManager[_0x3cc30d(0x357)]())return;const _0x3d3b63=VisuMZ[_0x3cc30d(0x4a7)][_0x3cc30d(0x196)][_0x3cc30d(0x1ee)];let _0x19aee7=null,_0x2ba819=0x0,_0x4bc8c0=0x0;if(_0x47bcb8[_0x3cc30d(0x4e7)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x2ba819=Number(RegExp['$1']),_0x4bc8c0=Number(RegExp['$2']);if(_0x2ba819===0x0)_0x2ba819=$gameMap[_0x3cc30d(0x490)]();}else{if(_0x47bcb8[_0x3cc30d(0x4e7)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x2ba819=Number(RegExp['$1']),_0x4bc8c0=Number(RegExp['$2']);if(_0x2ba819===0x0)_0x2ba819=$gameMap[_0x3cc30d(0x490)]();}else{if(_0x47bcb8[_0x3cc30d(0x4e7)](/<COPY EVENT:[ ](.*?)>/i)){const _0x3472ac=String(RegExp['$1'])[_0x3cc30d(0x2b4)]()['trim']();_0x19aee7=VisuMZ[_0x3cc30d(0x151)][_0x3472ac];if(!_0x19aee7)return;_0x2ba819=_0x19aee7[_0x3cc30d(0x47f)],_0x4bc8c0=_0x19aee7[_0x3cc30d(0x4eb)];}}}if(!this[_0x3cc30d(0xd0)](_0x2ba819,_0x4bc8c0))return;_0x3d3b63[_0x3cc30d(0x2d6)]['call'](this,_0x2ba819,_0x4bc8c0,this);if(_0x19aee7)_0x19aee7['PreCopyJS'][_0x3cc30d(0x49d)](this,_0x2ba819,_0x4bc8c0,this);this['_eventCopyData']={'mapId':_0x2ba819,'eventId':_0x4bc8c0},this['_pageIndex']=-0x2,this[_0x3cc30d(0xc6)](),_0x3d3b63[_0x3cc30d(0x308)]['call'](this,_0x2ba819,_0x4bc8c0,this);if(_0x19aee7)_0x19aee7[_0x3cc30d(0x308)][_0x3cc30d(0x49d)](this,_0x2ba819,_0x4bc8c0,this);$gameMap[_0x3cc30d(0x242)]();},Game_Event['prototype'][_0x1f2382(0x327)]=function(){const _0x37c6b3=_0x1f2382,_0x2d1abf=$gameSystem[_0x37c6b3(0x388)](this);if(!_0x2d1abf)return;const _0x14cd1a=_0x2d1abf[_0x37c6b3(0x475)][_0x37c6b3(0x2b4)]()['trim']();_0x14cd1a!==_0x37c6b3(0x432)?this[_0x37c6b3(0x4da)](_0x14cd1a,!![]):this['morphInto'](_0x2d1abf['mapId'],_0x2d1abf[_0x37c6b3(0x37b)],!![]);},Game_Event[_0x1f2382(0x433)]['morphInto']=function(_0x5063da,_0xfa5300,_0x4ceb6a){const _0x50feef=_0x1f2382;if(!this['checkValidEventerMap'](_0x5063da,_0xfa5300))return;const _0x1ef128=VisuMZ[_0x50feef(0x4a7)][_0x50feef(0x196)][_0x50feef(0x1ee)];if(!_0x4ceb6a)_0x1ef128['PreMorphJS'][_0x50feef(0x49d)](this,_0x5063da,_0xfa5300,this);this[_0x50feef(0x1d0)]={'mapId':_0x5063da,'eventId':_0xfa5300},this['_pageIndex']=-0x2,this['refresh']();if(!_0x4ceb6a)_0x1ef128[_0x50feef(0x566)][_0x50feef(0x49d)](this,_0x5063da,_0xfa5300,this);$gameMap[_0x50feef(0x242)]();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x4da)]=function(_0x425632,_0x57f8e7){const _0x1c44ab=_0x1f2382;_0x425632=_0x425632['toUpperCase']()[_0x1c44ab(0x122)]();const _0x4e9c27=VisuMZ[_0x1c44ab(0x151)][_0x425632];if(!_0x4e9c27)return;const _0x101b08=_0x4e9c27[_0x1c44ab(0x47f)],_0x229740=_0x4e9c27[_0x1c44ab(0x4eb)];if(!this[_0x1c44ab(0xd0)](_0x101b08,_0x229740))return;if(!_0x57f8e7)_0x4e9c27[_0x1c44ab(0x15c)][_0x1c44ab(0x49d)](this,_0x101b08,_0x229740,this);this['morphInto'](_0x101b08,_0x229740,_0x57f8e7);if(!_0x57f8e7)_0x4e9c27[_0x1c44ab(0x566)][_0x1c44ab(0x49d)](this,_0x101b08,_0x229740,this);if($gameMap)$gameMap[_0x1c44ab(0x242)]();},Game_Event['prototype'][_0x1f2382(0x3fc)]=function(){const _0x5cd32f=_0x1f2382;this[_0x5cd32f(0x1d0)]=undefined,this[_0x5cd32f(0x51c)]=-0x2,this[_0x5cd32f(0xc6)]();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x429)]=function(_0x57ca0f){const _0x1ee3af=_0x1f2382,_0xcecbf2=VisuMZ[_0x1ee3af(0x4a7)][_0x1ee3af(0x196)]['Template'],_0x34611d=_0x57ca0f[_0x1ee3af(0x475)]['toUpperCase']()[_0x1ee3af(0x122)](),_0x159685=!['',_0x1ee3af(0x432)][_0x1ee3af(0x48f)](_0x34611d);let _0x5d7c05=0x0,_0x3812ef=0x0;if(_0x159685){const _0x5946e0=VisuMZ[_0x1ee3af(0x151)][_0x34611d];if(!_0x5946e0)return;_0x5d7c05=_0x5946e0[_0x1ee3af(0x47f)],_0x3812ef=_0x5946e0[_0x1ee3af(0x4eb)];}else _0x5d7c05=_0x57ca0f[_0x1ee3af(0x490)],_0x3812ef=_0x57ca0f[_0x1ee3af(0x37b)];if(!this['checkValidEventerMap'](_0x5d7c05,_0x3812ef))return;if(_0x159685){const _0x4a5571=VisuMZ[_0x1ee3af(0x151)][_0x34611d];_0x4a5571[_0x1ee3af(0x1b3)][_0x1ee3af(0x49d)](this,_0x5d7c05,_0x3812ef,this);}_0xcecbf2[_0x1ee3af(0x1b3)][_0x1ee3af(0x49d)](this,_0x5d7c05,_0x3812ef,this),this[_0x1ee3af(0x44a)]=_0x57ca0f,this[_0x1ee3af(0x51c)]=-0x2,this[_0x1ee3af(0x34c)]=$gameMap[_0x1ee3af(0x490)](),this[_0x1ee3af(0x3af)]=_0x57ca0f[_0x1ee3af(0x457)],this[_0x1ee3af(0x119)]=_0x57ca0f[_0x1ee3af(0x158)],this[_0x1ee3af(0x15b)](_0x57ca0f['x'],_0x57ca0f['y']),this[_0x1ee3af(0x477)](_0x57ca0f[_0x1ee3af(0x2a1)]),this[_0x1ee3af(0xc6)]();if(_0x159685){const _0x28549b=VisuMZ[_0x1ee3af(0x151)][_0x34611d];if(!_0x28549b)return;_0x28549b['PostSpawnJS']['call'](this,_0x5d7c05,_0x3812ef,this);}_0xcecbf2[_0x1ee3af(0x1bb)][_0x1ee3af(0x49d)](this,_0x5d7c05,_0x3812ef,this);const _0x34f4f2=SceneManager[_0x1ee3af(0x4c5)];if(_0x34f4f2&&_0x34f4f2[_0x1ee3af(0x1e4)])_0x34f4f2['_spriteset']['createSpawnedEvent'](this);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x1a9)]=function(){return!!this['_eventSpawnData'];},Game_Event['prototype'][_0x1f2382(0x36e)]=function(){const _0x6ee971=_0x1f2382;if(!this['list']())return;const _0x4b0090=this[_0x6ee971(0x4d6)]()[_0x6ee971(0x49f)](_0x559782=>_0x559782['code']!==0x6c&&_0x559782[_0x6ee971(0xc9)]!==0x198);_0x4b0090[_0x6ee971(0x485)]>0x1&&(this[_0x6ee971(0x43f)]=!![],this[_0x6ee971(0x20d)]([0x0,0x1,0x2])&&this[_0x6ee971(0x3d9)]());},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x30a)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x2e8)],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x2e8)]=function(){const _0x39f085=_0x1f2382;VisuMZ[_0x39f085(0x4a7)][_0x39f085(0x30a)]['call'](this),this[_0x39f085(0x356)](),this['autosaveEventLocation']();},VisuMZ['EventsMoveCore'][_0x1f2382(0x397)]=Game_Event[_0x1f2382(0x433)]['setupPageSettings'],Game_Event['prototype'][_0x1f2382(0x505)]=function(){const _0x14c351=_0x1f2382;this[_0x14c351(0x10d)]=!![],VisuMZ['EventsMoveCore'][_0x14c351(0x397)][_0x14c351(0x49d)](this),this[_0x14c351(0x229)](),this[_0x14c351(0x1c4)](),this[_0x14c351(0x10d)]=![];},Game_Event[_0x1f2382(0x433)]['setupEventsMoveCoreEffects']=function(){const _0x2562af=_0x1f2382;if(!this[_0x2562af(0x451)]())return;this[_0x2562af(0x356)](),this['setupEventsMoveCoreNotetags'](),this[_0x2562af(0x21c)](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x28a)]=function(){const _0x44bb28=_0x1f2382,_0x10a1bb=this[_0x44bb28(0x451)]()['note'];if(_0x10a1bb==='')return;this[_0x44bb28(0x1b4)](_0x10a1bb);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x21c)]=function(){const _0xf6c8be=_0x1f2382;if(!this['page']())return;const _0x5ba5d7=this[_0xf6c8be(0x4d6)]();let _0x47e561='';for(const _0xda39d4 of _0x5ba5d7){if([0x6c,0x198][_0xf6c8be(0x48f)](_0xda39d4[_0xf6c8be(0xc9)])){if(_0x47e561!=='')_0x47e561+='\x0a';_0x47e561+=_0xda39d4[_0xf6c8be(0x1fc)][0x0];}}this['checkEventsMoveCoreStringTags'](_0x47e561);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x356)]=function(){const _0x40ff96=_0x1f2382,_0x5b2eba=VisuMZ[_0x40ff96(0x4a7)][_0x40ff96(0x196)];this[_0x40ff96(0x444)]={'type':'none','distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x40ff96(0x233)](),this[_0x40ff96(0x42d)]=![],this[_0x40ff96(0x134)]=![],this[_0x40ff96(0x174)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x40ff96(0x248)]={'type':'none','distance':0x0},this[_0x40ff96(0x52b)]={'type':_0x40ff96(0x4a9),'distance':0x0},$gameSystem[_0x40ff96(0x3f3)](this),this['_eventIcon']=$gameSystem[_0x40ff96(0x16f)](this),this[_0x40ff96(0x288)]={'originalText':'','text':'','visibleRange':_0x5b2eba[_0x40ff96(0x418)][_0x40ff96(0x1cd)],'rangeType':_0x5b2eba[_0x40ff96(0x418)][_0x40ff96(0x577)],'offsetX':_0x5b2eba[_0x40ff96(0x418)][_0x40ff96(0x4de)],'offsetY':_0x5b2eba[_0x40ff96(0x418)][_0x40ff96(0x358)],'hueShift':0x0},this[_0x40ff96(0x4f2)]=![],this[_0x40ff96(0x286)]=[],this['_moveSynch']={'target':-0x1,'type':'random','delay':0x1,'opacityDelta':0x0},this[_0x40ff96(0x382)]=_0x5b2eba[_0x40ff96(0x1c6)][_0x40ff96(0x203)]??0x0,this[_0x40ff96(0x24d)]=![],this[_0x40ff96(0x227)]=0x1,this[_0x40ff96(0x40f)]=0x1,this[_0x40ff96(0x2e6)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x5b2eba[_0x40ff96(0x1c6)]['DefaultShadow']},this[_0x40ff96(0x399)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x40ff96(0x495)](),this['clearStepPattern']();},Game_Event[_0x1f2382(0x433)]['checkEventsMoveCoreStringTags']=function(_0x31f9d2){const _0x5c0b48=_0x1f2382;if(_0x31f9d2['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x5c0b48(0x444)]['regionList']=JSON[_0x5c0b48(0x440)]('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x5c0b48(0x444)]['type']=_0x5c0b48(0x139);else _0x31f9d2[_0x5c0b48(0x4e7)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x5c0b48(0x4b8)]()['trim'](),this[_0x5c0b48(0x444)][_0x5c0b48(0x585)]=type,this[_0x5c0b48(0x444)][_0x5c0b48(0x57b)]=Number(RegExp['$2']));_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)PICTURE FILENAME:[ ](.*?)>/i)&&(this['_attachPicture'][_0x5c0b48(0x1f9)]=String(RegExp['$1']),this[_0x5c0b48(0x345)][_0x5c0b48(0x585)]='picture');if(_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE:[ ](.*?)>/i)){const _0x4195ab=String(RegExp['$1'])['toUpperCase']()[_0x5c0b48(0x122)](),_0x56d70a=[_0x5c0b48(0x41a),_0x5c0b48(0x3f8),'MULTIPLY','SCREEN'];this[_0x5c0b48(0x345)][_0x5c0b48(0x578)]=_0x56d70a[_0x5c0b48(0x225)](_0x4195ab)[_0x5c0b48(0x1ad)](0x0,0x3);}_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this['_attachPicture'][_0x5c0b48(0x499)]=Number(RegExp['$1']));_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x5c0b48(0x345)][_0x5c0b48(0x2c6)]=Number(RegExp['$1']));_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5c0b48(0x345)][_0x5c0b48(0x4bb)]=Number(RegExp['$1']));_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_attachPicture']['offsetX']=Number(RegExp['$1']),this[_0x5c0b48(0x345)][_0x5c0b48(0x4bb)]=Number(RegExp['$2']));_0x31f9d2['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x5c0b48(0x345)]['scale']=Number(RegExp['$1'])*0.01);_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)PICTURE TYPE:[ ](.*?)>/i)&&(this[_0x5c0b48(0x345)]['type']=String(RegExp['$1'])['toLowerCase']()[_0x5c0b48(0x122)]());_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)ENEMY FILENAME:[ ](.*?)>/i)&&(this['_attachPicture']['filename']=String(RegExp['$1']),this[_0x5c0b48(0x345)][_0x5c0b48(0x585)]='enemy');_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:ATTACH |)SV ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x5c0b48(0x345)][_0x5c0b48(0x1f9)]=String(RegExp['$1']),this[_0x5c0b48(0x345)][_0x5c0b48(0x585)]='sv\x20enemy');_0x31f9d2[_0x5c0b48(0x4e7)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x5c0b48(0x3e7)]=!![]);_0x31f9d2['match'](/<CLICK TRIGGER>/i)&&(this[_0x5c0b48(0x42d)]=!![]);_0x31f9d2[_0x5c0b48(0x4e7)](/<CUSTOM Z:[ ](.*?)>/i)&&(this['_customZ']=Number(RegExp['$1'])||0x0);_0x31f9d2[_0x5c0b48(0x4e7)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x5c0b48(0x4b8)]()[_0x5c0b48(0x122)](),this[_0x5c0b48(0x248)][_0x5c0b48(0x585)]=type,this[_0x5c0b48(0x248)][_0x5c0b48(0x57b)]=Number(RegExp['$2']));_0x31f9d2['match'](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x5c0b48(0x122)](),this['_encounterNoneProximity'][_0x5c0b48(0x585)]=type,this['_encounterNoneProximity']['distance']=Number(RegExp['$2']));const _0x4b4052=_0x31f9d2[_0x5c0b48(0x4e7)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x4b4052)for(const _0x51a7a0 of _0x4b4052){if(_0x51a7a0[_0x5c0b48(0x4e7)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x1decb5=String(RegExp['$1'])[_0x5c0b48(0x4b8)]()['trim'](),_0x512edb=Number(RegExp['$2']);this[_0x5c0b48(0x174)][_0x1decb5]=_0x512edb;}}if(this[_0x5c0b48(0x54f)]['iconIndex']>=0x0&&!this[_0x5c0b48(0x54f)]['forced']){_0x31f9d2[_0x5c0b48(0x4e7)](/<ICON:[ ](\d+)>/i)&&(this['_eventIcon'][_0x5c0b48(0x563)]=Number(RegExp['$1']));_0x31f9d2['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5c0b48(0x54f)][_0x5c0b48(0x1b8)]=Number(RegExp['$1']));_0x31f9d2[_0x5c0b48(0x4e7)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5c0b48(0x54f)][_0x5c0b48(0x211)]=Number(RegExp['$1']));_0x31f9d2['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5c0b48(0x54f)]['bufferX']=Number(RegExp['$1']),this['_eventIcon'][_0x5c0b48(0x211)]=Number(RegExp['$2']));if(_0x31f9d2[_0x5c0b48(0x4e7)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x2f9783=String(RegExp['$1'])[_0x5c0b48(0x2b4)]()[_0x5c0b48(0x122)](),_0x2f29c9=[_0x5c0b48(0x41a),_0x5c0b48(0x3f8),'MULTIPLY',_0x5c0b48(0x54a)];this['_eventIcon']['blendMode']=_0x2f29c9[_0x5c0b48(0x225)](_0x2f9783)[_0x5c0b48(0x1ad)](0x0,0x3);}$gameSystem[_0x5c0b48(0x24c)](this,this['_eventIcon'][_0x5c0b48(0x563)],this[_0x5c0b48(0x54f)][_0x5c0b48(0x1b8)],this[_0x5c0b48(0x54f)]['bufferY'],this['_eventIcon']['blendMode']);}if(_0x31f9d2[_0x5c0b48(0x4e7)](/<LABEL:[ ](.*?)>/i)){let _0x529cf0=String(RegExp['$1'])[_0x5c0b48(0x122)]();this[_0x5c0b48(0x288)][_0x5c0b48(0x437)]=_0x529cf0,this[_0x5c0b48(0x288)][_0x5c0b48(0x349)]=_0x529cf0;}if(_0x31f9d2[_0x5c0b48(0x4e7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x2d49c6=String(RegExp['$1'])[_0x5c0b48(0x122)]();this['_labelWindow'][_0x5c0b48(0x437)]=_0x2d49c6,this[_0x5c0b48(0x288)][_0x5c0b48(0x349)]=_0x2d49c6;}_0x31f9d2[_0x5c0b48(0x4e7)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x5c0b48(0x2c6)]=Number(RegExp['$1']));_0x31f9d2['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x5c0b48(0x4bb)]=Number(RegExp['$1']));_0x31f9d2[_0x5c0b48(0x4e7)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x5c0b48(0x2c6)]=Number(RegExp['$1']),this[_0x5c0b48(0x288)][_0x5c0b48(0x4bb)]=Number(RegExp['$2']));_0x31f9d2[_0x5c0b48(0x4e7)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x5c0b48(0x288)]['hueShift']=Number(RegExp['$1']));_0x31f9d2[_0x5c0b48(0x4e7)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x5c0b48(0x288)]['visibleRange']=Number(RegExp['$1']));_0x31f9d2['match'](/<LABEL RANGE TYPE: SQUARE>/i)&&(this['_labelWindow'][_0x5c0b48(0x425)]='square');_0x31f9d2['match'](/<LABEL RANGE TYPE: (?:RADIUS|DELTA|DIAMOND)>/i)&&(this[_0x5c0b48(0x288)][_0x5c0b48(0x425)]=_0x5c0b48(0x13d));_0x31f9d2[_0x5c0b48(0x4e7)](/<LABEL RANGE TYPE: CIRCLE>/i)&&(this[_0x5c0b48(0x288)]['rangeType']=_0x5c0b48(0x486));this[_0x5c0b48(0x1b1)]();_0x31f9d2[_0x5c0b48(0x4e7)](/<MIRROR SPRITE>/i)&&(this[_0x5c0b48(0x4f2)]=!![]);if(_0x31f9d2[_0x5c0b48(0x4e7)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x129308=JSON[_0x5c0b48(0x440)]('['+RegExp['$1'][_0x5c0b48(0x4e7)](/\d+/g)+']');this[_0x5c0b48(0x286)]=this[_0x5c0b48(0x286)][_0x5c0b48(0x14c)](_0x129308),this[_0x5c0b48(0x286)][_0x5c0b48(0x14b)](0x0);}if(_0x31f9d2[_0x5c0b48(0x4e7)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x566ecb=String(RegExp['$1']);if(_0x566ecb[_0x5c0b48(0x4e7)](/PLAYER/i))this[_0x5c0b48(0x2e9)][_0x5c0b48(0x523)]=0x0;else _0x566ecb[_0x5c0b48(0x4e7)](/EVENT[ ](\d+)/i)&&(this[_0x5c0b48(0x2e9)][_0x5c0b48(0x523)]=Number(RegExp['$1']));}_0x31f9d2[_0x5c0b48(0x4e7)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x5c0b48(0x2e9)][_0x5c0b48(0x585)]=String(RegExp['$1'])[_0x5c0b48(0x4b8)]()['trim']());_0x31f9d2['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this['_moveSynch'][_0x5c0b48(0x1e6)]=Number(RegExp['$1']));_0x31f9d2[_0x5c0b48(0x4e7)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this['_moveSynch'][_0x5c0b48(0x498)]=Number(RegExp['$1']));if(_0x31f9d2[_0x5c0b48(0x4e7)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x31f9d2[_0x5c0b48(0x4e7)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x5c0b48(0x382)]=Number(RegExp['$1'])||0x0);_0x31f9d2['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x5c0b48(0x24d)]=!![]);_0x31f9d2['match'](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x5c0b48(0x227)]=Number(RegExp['$1'])*0.01);_0x31f9d2[_0x5c0b48(0x4e7)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this['_scaleBaseY']=Number(RegExp['$1'])*0.01);if(_0x31f9d2[_0x5c0b48(0x4e7)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x34d666=Number(RegExp['$1'])*0.01;this[_0x5c0b48(0x227)]=_0x34d666,this[_0x5c0b48(0x40f)]=_0x34d666;}_0x31f9d2[_0x5c0b48(0x4e7)](/<SCREEN ACTIVATION>/i)&&(this['_screenActivation']=!![]),_0x31f9d2[_0x5c0b48(0x4e7)](/<HIDE SHADOW>/i)&&(this[_0x5c0b48(0x172)][_0x5c0b48(0x271)]=![]),_0x31f9d2[_0x5c0b48(0x4e7)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x5c0b48(0x172)][_0x5c0b48(0x1f9)]=String(RegExp['$1'])),_0x31f9d2[_0x5c0b48(0x4e7)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x5c0b48(0x2e3)]=Number(RegExp['$1'])),_0x31f9d2[_0x5c0b48(0x4e7)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetY']=Number(RegExp['$1'])),_0x31f9d2[_0x5c0b48(0x4e7)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5c0b48(0x2e3)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2'])),_0x31f9d2['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x5c0b48(0x12a)]=String(RegExp['$1'])[_0x5c0b48(0x2b4)]()[_0x5c0b48(0x122)]()),_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x5c0b48(0x399)]||{},this[_0x5c0b48(0x399)]['up']=Number(RegExp['$1'])),_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x5c0b48(0x399)]||{},this[_0x5c0b48(0x399)][_0x5c0b48(0x478)]=Number(RegExp['$1'])),_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x5c0b48(0x399)]||{},this[_0x5c0b48(0x399)][_0x5c0b48(0x455)]=Number(RegExp['$1'])),_0x31f9d2[_0x5c0b48(0x4e7)](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i)&&(this[_0x5c0b48(0x399)]=this['_tileExpand']||{},this['_tileExpand'][_0x5c0b48(0x26c)]=Number(RegExp['$1']));},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x1b1)]=function(){const _0x534f55=_0x1f2382;$gameTemp['registerSelfTarget'](this),this[_0x534f55(0x288)][_0x534f55(0x437)]=this[_0x534f55(0x288)][_0x534f55(0x349)];for(;;){if(this[_0x534f55(0x288)][_0x534f55(0x437)][_0x534f55(0x4e7)](/\\V\[(\d+)\]/gi))this[_0x534f55(0x288)]['text']=this[_0x534f55(0x288)]['originalText'][_0x534f55(0x2b0)](/\\V\[(\d+)\]/gi,(_0x42e58f,_0x23da72)=>$gameVariables[_0x534f55(0x272)](parseInt(_0x23da72)));else break;}$gameTemp[_0x534f55(0x46a)]();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x2e2)]=function(){const _0x573bb3=_0x1f2382;this[_0x573bb3(0x47b)]();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x443)]=function(){const _0x4f04f2=_0x1f2382;if(this[_0x4f04f2(0x3e7)])return!![];return Game_Character['prototype'][_0x4f04f2(0x443)][_0x4f04f2(0x49d)](this);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x339)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x1ca)],Game_Event[_0x1f2382(0x433)]['updateSelfMovement']=function(){const _0x43915b=_0x1f2382;if(this[_0x43915b(0x120)]())return;VisuMZ[_0x43915b(0x4a7)][_0x43915b(0x339)][_0x43915b(0x49d)](this),this[_0x43915b(0x2de)]()&&VisuMZ[_0x43915b(0x3ea)](this['_eventId']);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x120)]=function(){const _0x288cd0=_0x1f2382,_0x152c9f=VisuMZ[_0x288cd0(0x4a7)][_0x288cd0(0x196)][_0x288cd0(0x1c6)];if($gameMap[_0x288cd0(0x528)]()&&_0x152c9f[_0x288cd0(0x304)])return!![];if($gameMessage['isBusy']()&&_0x152c9f[_0x288cd0(0x24a)])return!![];if(!$gameSystem[_0x288cd0(0x513)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];if(!SceneManager[_0x288cd0(0x4c5)][_0x288cd0(0x58d)])return!![];return![];},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x47b)]=function(){const _0x2cd8c3=_0x1f2382,_0x2f46a6=SceneManager['_scene'][_0x2cd8c3(0x1e4)];if(_0x2f46a6){const _0x459c4f=_0x2f46a6[_0x2cd8c3(0x544)](this);_0x459c4f&&_0x459c4f[_0x2cd8c3(0x417)]&&_0x459c4f[_0x2cd8c3(0x417)]['_filename']!==this[_0x2cd8c3(0x56a)]()&&(_0x459c4f['_shadowSprite'][_0x2cd8c3(0x3fe)]=this['shadowFilename'](),_0x459c4f[_0x2cd8c3(0x417)]['bitmap']=ImageManager[_0x2cd8c3(0x276)](_0x459c4f[_0x2cd8c3(0x417)][_0x2cd8c3(0x3fe)]));}},Game_Event['prototype'][_0x1f2382(0x56a)]=function(){const _0x4c78d4=_0x1f2382;return this['_shadowGraphic'][_0x4c78d4(0x1f9)];},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x2b8)]=function(){const _0x31e711=_0x1f2382;if(!this['_shadowGraphic'][_0x31e711(0x271)])return![];return Game_CharacterBase[_0x31e711(0x433)]['isShadowVisible']['call'](this);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x474)]=function(){const _0x25510e=_0x1f2382;return this['_labelWindow'][_0x25510e(0x437)];},Game_Event['prototype'][_0x1f2382(0x45f)]=function(){const _0x49cc8b=_0x1f2382;return this[_0x49cc8b(0x288)][_0x49cc8b(0x464)]??VisuMZ['EventsMoveCore']['Settings']['Label'][_0x49cc8b(0x1cd)];},Game_Event['prototype'][_0x1f2382(0x4be)]=function(){const _0x2a856d=_0x1f2382;return this['_labelWindow'][_0x2a856d(0x425)]??VisuMZ['EventsMoveCore'][_0x2a856d(0x196)]['Label']['RangeType']??_0x2a856d(0x465);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0xe5)]=function(_0x2851dd){const _0x181948=_0x1f2382,_0x2c0ccb=_0x2851dd[_0x181948(0x4be)](),_0x1963f1=_0x2851dd[_0x181948(0x45f)]();return $gameMap[_0x181948(0xf3)]($gamePlayer['x'],$gamePlayer['y'],_0x2851dd,_0x2c0ccb,_0x1963f1);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x246)]=function(_0x4dd037,_0x3814f,_0x16dba5){const _0x199020=_0x1f2382;if(this[_0x199020(0x557)]())return this['isMoveOnlyRegionPassable'](_0x4dd037,_0x3814f,_0x16dba5);if($gameMap[_0x199020(0x2b6)](_0x4dd037,_0x3814f,_0x16dba5,_0x199020(0x451)))return!![];if($gameMap[_0x199020(0x3b3)](_0x4dd037,_0x3814f,_0x16dba5,_0x199020(0x451)))return![];return Game_Character[_0x199020(0x433)]['isMapPassable'][_0x199020(0x49d)](this,_0x4dd037,_0x3814f,_0x16dba5);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x557)]=function(){const _0x474364=_0x1f2382;if(this[_0x474364(0x286)]===undefined)this[_0x474364(0x356)]();return this[_0x474364(0x286)][_0x474364(0x485)]>0x0;},Game_Event[_0x1f2382(0x433)]['isMoveOnlyRegionPassable']=function(_0x4e1a78,_0x43e9d6,_0x52e9df){const _0x1e4140=_0x1f2382,_0x42bff4=$gameMap['roundXWithDirection'](_0x4e1a78,_0x52e9df),_0x2f966d=$gameMap[_0x1e4140(0x318)](_0x43e9d6,_0x52e9df),_0x371913=$gameMap[_0x1e4140(0x542)](_0x42bff4,_0x2f966d);return this[_0x1e4140(0x286)][_0x1e4140(0x48f)](_0x371913);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0xe4)]=Game_Event[_0x1f2382(0x433)]['findProperPageIndex'],Game_Event[_0x1f2382(0x433)]['findProperPageIndex']=function(){const _0x575299=_0x1f2382;if(this['event']()&&!$gameTemp[_0x575299(0x282)]()){if(this[_0x575299(0x451)]()[_0x575299(0x2ce)][_0x575299(0x4e7)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x575299(0x407)]=![],this[_0x575299(0x2bb)]=![],this[_0x575299(0x451)]()?VisuMZ[_0x575299(0x4a7)][_0x575299(0xe4)][_0x575299(0x49d)](this):-0x1;},VisuMZ['EventsMoveCore'][_0x1f2382(0xf7)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x53c)],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x53c)]=function(_0xc26229){const _0x2a389e=_0x1f2382;this[_0x2a389e(0x3e1)](_0xc26229),$gameTemp[_0x2a389e(0x394)](this);const _0x32e29f=VisuMZ[_0x2a389e(0x4a7)]['Game_Event_meetsConditions'][_0x2a389e(0x49d)](this,_0xc26229);return $gameTemp[_0x2a389e(0x46a)](),_0x32e29f;},Game_Event['prototype']['hasAdvancedSwitchVariable']=function(){const _0x4d7ac7=_0x1f2382;return this[_0x4d7ac7(0x407)];},Game_Event['prototype'][_0x1f2382(0x3e1)]=function(_0x16cd49){const _0x5788c3=_0x1f2382,_0xaa46f7=_0x16cd49[_0x5788c3(0x2d5)];if(_0xaa46f7[_0x5788c3(0x3aa)]&&DataManager['isAdvancedSwitch'](_0xaa46f7[_0x5788c3(0x41b)]))this[_0x5788c3(0x407)]=!![];else{if(_0xaa46f7[_0x5788c3(0xd7)]&&DataManager[_0x5788c3(0x398)](_0xaa46f7['switch2Id']))this['_advancedSwitchVariable']=!![];else _0xaa46f7[_0x5788c3(0x37f)]&&DataManager[_0x5788c3(0x337)](_0xaa46f7[_0x5788c3(0xcf)])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0x1f2382(0x433)]['hasClickTrigger']=function(){const _0x5649e6=_0x1f2382;if(this['_erased'])return![];return this[_0x5649e6(0x42d)];},Game_Event[_0x1f2382(0x433)]['onClickTrigger']=function(){$gameTemp['clearDestination'](),this['start']();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x129)]=function(_0x45271b,_0x39481d){const _0x9ee2ad=_0x1f2382;return this[_0x9ee2ad(0x174)]?this['posEventsMoveCore'](_0x45271b,_0x39481d):Game_Character[_0x9ee2ad(0x433)]['pos'][_0x9ee2ad(0x49d)](this,_0x45271b,_0x39481d);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x18e)]=function(_0x1ab7e7,_0x14c3b1){const _0x2c8804=_0x1f2382;var _0xf30c57=this['x']-this['_addedHitbox'][_0x2c8804(0x455)],_0x4a66d5=this['x']+this['_addedHitbox'][_0x2c8804(0x26c)],_0x138c53=this['y']-this[_0x2c8804(0x174)]['up'],_0x46e5e7=this['y']+this[_0x2c8804(0x174)][_0x2c8804(0x478)];return _0xf30c57<=_0x1ab7e7&&_0x1ab7e7<=_0x4a66d5&&_0x138c53<=_0x14c3b1&&_0x14c3b1<=_0x46e5e7;},Game_Event['prototype'][_0x1f2382(0x269)]=function(_0x378c30,_0x174b87,_0x255d21){const _0xf66f43=_0x1f2382;for(let _0x49caa1=-this['_addedHitbox'][_0xf66f43(0x455)];_0x49caa1<=this[_0xf66f43(0x174)][_0xf66f43(0x26c)];_0x49caa1++){for(let _0x491d06=-this[_0xf66f43(0x174)]['up'];_0x491d06<=this['_addedHitbox'][_0xf66f43(0x478)];_0x491d06++){if(!Game_Character[_0xf66f43(0x433)][_0xf66f43(0x269)][_0xf66f43(0x49d)](this,_0x378c30+_0x49caa1,_0x174b87+_0x491d06,_0x255d21))return![];}}return!![];},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x249)]=function(_0x2cd91a,_0x53671d){const _0x2286f6=_0x1f2382;if(Imported['VisuMZ_0_CoreEngine']&&this['isSmartEventCollisionOn']())return this[_0x2286f6(0x317)](_0x2cd91a,_0x53671d);else{const _0xaaba24=$gameMap[_0x2286f6(0x41f)](_0x2cd91a,_0x53671d)['filter'](_0xcfddd7=>_0xcfddd7!==this);return _0xaaba24[_0x2286f6(0x485)]>0x0;}},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x317)]=function(_0x192a48,_0x52d2d1){const _0x19f830=_0x1f2382;if(!this[_0x19f830(0x44e)]())return![];else{const _0x36a59d=$gameMap[_0x19f830(0x41f)](_0x192a48,_0x52d2d1)[_0x19f830(0x49f)](_0x2d01da=>_0x2d01da!==this&&_0x2d01da[_0x19f830(0x44e)]());return _0x36a59d[_0x19f830(0x485)]>0x0;}},Game_Event[_0x1f2382(0x433)]['activationProximityType']=function(){const _0x23d9eb=_0x1f2382;if(!this[_0x23d9eb(0x444)])return _0x23d9eb(0x4a9);return this[_0x23d9eb(0x444)][_0x23d9eb(0x585)]||_0x23d9eb(0x4a9);},Game_Event[_0x1f2382(0x433)]['activationProximityDistance']=function(){const _0x153dfc=_0x1f2382;if(!this[_0x153dfc(0x444)])return 0x0;return this[_0x153dfc(0x444)][_0x153dfc(0x57b)]||0x0;},Game_Event['prototype'][_0x1f2382(0x1c9)]=function(){const _0x3aaaa1=_0x1f2382;if(!this[_0x3aaaa1(0x444)])return[];return this[_0x3aaaa1(0x444)][_0x3aaaa1(0x4ed)]||[];},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x471)]=function(){const _0x10fbb5=_0x1f2382;Game_Character[_0x10fbb5(0x433)][_0x10fbb5(0x471)][_0x10fbb5(0x49d)](this);if(['none','region'][_0x10fbb5(0x48f)](this[_0x10fbb5(0x217)]()))return;$gamePlayer[_0x10fbb5(0x2a0)]([0x2]);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x4b0)]=function(){const _0x501614=_0x1f2382,_0x115cc4=Math[_0x501614(0x49e)]($gameMap[_0x501614(0x198)]),_0x24008b=_0x115cc4+Math[_0x501614(0x173)]($gameMap[_0x501614(0x14f)]())-0x1,_0x48331c=Math[_0x501614(0x49e)]($gameMap[_0x501614(0x262)]),_0x34773b=_0x48331c+Math[_0x501614(0x173)]($gameMap[_0x501614(0x2ba)]())-0x1;return this['x']>=_0x115cc4&&this['x']<=_0x24008b&&this['y']>=_0x48331c&&this['y']<=_0x34773b;},VisuMZ[_0x1f2382(0x4a7)]['Game_Event_checkEventTriggerAuto']=Game_Event[_0x1f2382(0x433)]['checkEventTriggerAuto'],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x31e)]=function(){const _0x3212a8=_0x1f2382;if(this[_0x3212a8(0x2e6)]){if(this[_0x3212a8(0x4b0)]()){if(this[_0x3212a8(0x567)])return;this[_0x3212a8(0x567)]=!![],this[_0x3212a8(0x36e)]();return;}else{this[_0x3212a8(0x567)]=![];return;}}if(this[_0x3212a8(0x183)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0x3212a8(0x4cb)](![]))return;VisuMZ['EventsMoveCore']['Game_Event_checkEventTriggerAuto'][_0x3212a8(0x49d)](this);},VisuMZ['EventsMoveCore'][_0x1f2382(0x232)]=Game_Event['prototype'][_0x1f2382(0xc4)],Game_Event[_0x1f2382(0x433)][_0x1f2382(0xc4)]=function(){const _0x4775a4=_0x1f2382;if(!this[_0x4775a4(0x338)])return;if(!this[_0x4775a4(0x3f4)](!![]))return;if(!this[_0x4775a4(0x4cb)](!![]))return;if(this[_0x4775a4(0x2e6)])return;VisuMZ[_0x4775a4(0x4a7)][_0x4775a4(0x232)]['call'](this);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x3f4)]=function(_0x305cb0){const _0x1a6233=_0x1f2382;if(!_0x305cb0&&$gameMap[_0x1a6233(0x528)]())return![];if(!_0x305cb0&&$gameMap[_0x1a6233(0x517)]())return![];if(this[_0x1a6233(0x1c9)]()<=0x0)return!![];return $gamePlayer[_0x1a6233(0x3b7)](this);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x4cb)]=function(_0x403fe2){const _0x1d68a8=_0x1f2382;if(!_0x403fe2&&$gameMap['isEventRunning']())return![];if(!_0x403fe2&&$gameMap[_0x1d68a8(0x517)]())return![];if([_0x1d68a8(0x4a9),'region'][_0x1d68a8(0x48f)](this[_0x1d68a8(0x217)]()))return!![];return $gamePlayer[_0x1d68a8(0x283)](this);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x255)]=function(_0x283082){const _0xf7c0c7=_0x1f2382,_0x11e091=_0x283082?this[_0xf7c0c7(0x248)]:this[_0xf7c0c7(0x52b)];return _0x11e091?_0x11e091[_0xf7c0c7(0x585)]:_0xf7c0c7(0x4a9);},Game_Event['prototype'][_0x1f2382(0xca)]=function(_0x23769b){const _0x1a236f=_0x1f2382,_0x1eab10=_0x23769b?this[_0x1a236f(0x248)]:this['_encounterNoneProximity'];return _0x1eab10?_0x1eab10[_0x1a236f(0x57b)]:0x0;},VisuMZ[_0x1f2382(0x3ea)]=function(_0x32cbde){const _0x2f7934=_0x1f2382;for(const _0x59d15 of $gameMap[_0x2f7934(0x252)]()){if(!_0x59d15)continue;_0x59d15['moveSynchTarget']()===_0x32cbde&&_0x59d15['updateMoveSynch']();}},VisuMZ[_0x1f2382(0x4fb)]=function(_0x460ba9){if(_0x460ba9===0x0)return $gamePlayer;return $gameMap['event'](_0x460ba9);},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x374)]=function(){},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x374)]=function(){const _0x27127b=_0x1f2382;VisuMZ[_0x27127b(0x114)](this[_0x27127b(0x3af)]);},VisuMZ['FaceSynchAllSynchTargets']=function(_0x15bdad){const _0x3f6f53=_0x1f2382;for(const _0xe82cd4 of $gameMap[_0x3f6f53(0x252)]()){if(!_0xe82cd4)continue;_0xe82cd4[_0x3f6f53(0x169)]()===_0x15bdad&&_0xe82cd4['processMoveSynchDirection']();}},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x169)]=function(){const _0x48663f=_0x1f2382;return this[_0x48663f(0x2e9)][_0x48663f(0x523)];},Game_Event[_0x1f2382(0x433)][_0x1f2382(0xf5)]=function(){const _0x217498=_0x1f2382;return this[_0x217498(0x2e9)][_0x217498(0x585)];},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x187)]=function(){const _0x41c512=_0x1f2382;if(this[_0x41c512(0x169)]()>=0x0){const _0x1f754e=VisuMZ[_0x41c512(0x4fb)](this[_0x41c512(0x169)]());if(_0x1f754e)return _0x1f754e[_0x41c512(0x187)]();}return Game_Character['prototype']['realMoveSpeed'][_0x41c512(0x49d)](this);},Game_Event['prototype'][_0x1f2382(0x101)]=function(){const _0x2dbaaf=_0x1f2382;this[_0x2dbaaf(0x2e9)][_0x2dbaaf(0x1c3)]=this[_0x2dbaaf(0x2e9)][_0x2dbaaf(0x1c3)]||0x0,this[_0x2dbaaf(0x2e9)][_0x2dbaaf(0x1c3)]--;if(this[_0x2dbaaf(0x2e9)][_0x2dbaaf(0x1c3)]>0x0)return;this[_0x2dbaaf(0x2e9)][_0x2dbaaf(0x1c3)]=this[_0x2dbaaf(0x2e9)][_0x2dbaaf(0x1e6)],this[_0x2dbaaf(0x202)]();},Game_Event[_0x1f2382(0x433)]['adjustMoveSynchOpacityDelta']=function(_0x2b3b80){const _0x5a5ef0=_0x1f2382;if(this['moveSynchTarget']()>=0x0){const _0x1d9ad2=VisuMZ[_0x5a5ef0(0x4fb)](this[_0x5a5ef0(0x169)]());if(_0x1d9ad2){const _0x2fc46e=$gameMap[_0x5a5ef0(0x57b)](this['_realX'],this[_0x5a5ef0(0x3c1)],_0x1d9ad2[_0x5a5ef0(0x2c8)],_0x1d9ad2[_0x5a5ef0(0x3c1)])-0x1,_0xcf7a30=Math[_0x5a5ef0(0x57e)]($gameMap[_0x5a5ef0(0x109)](),$gameMap[_0x5a5ef0(0x488)]()),_0x3f021f=this['_moveSynch'][_0x5a5ef0(0x498)]||0x0;_0x2b3b80-=Math[_0x5a5ef0(0x238)](0x0,_0x2fc46e)*_0xcf7a30*_0x3f021f;}}return _0x2b3b80;},Game_Event[_0x1f2382(0x433)]['processMoveSynch']=function(){const _0x113376=_0x1f2382;switch(this[_0x113376(0xf5)]()){case _0x113376(0xed):this['processMoveSynchRandom']();break;case'approach':this[_0x113376(0x1d3)]();break;case _0x113376(0x3fd):this[_0x113376(0x58b)]();break;case _0x113376(0x2dc):this[_0x113376(0x10a)]();break;case _0x113376(0x3e3):case _0x113376(0x525):this['processMoveSynchMimic']();break;case'reverse\x20mimic':case _0x113376(0x3f0):this[_0x113376(0x231)]();break;case _0x113376(0x20f):case _0x113376(0x575):case _0x113376(0x529):case _0x113376(0x3d4):this['processMoveSynchMirrorHorz']();break;case _0x113376(0x2bf):case _0x113376(0x305):case _0x113376(0x128):case _0x113376(0x371):this[_0x113376(0x3ca)]();break;default:this['processMoveSynchRandom']();break;}this[_0x113376(0x379)]();},Game_Event[_0x1f2382(0x433)]['processMoveSynchRandom']=function(){const _0x2b1024=_0x1f2382,_0x25bfe8=[0x2,0x4,0x6,0x8];$gameMap[_0x2b1024(0x3fb)]()&&_0x25bfe8[_0x2b1024(0x193)](0x1,0x3,0x7,0x9);const _0x25a04f=[];for(const _0x420eb3 of _0x25bfe8){if(this[_0x2b1024(0x269)](this['x'],this['y'],_0x420eb3))_0x25a04f[_0x2b1024(0x193)](_0x420eb3);}if(_0x25a04f['length']>0x0){const _0x555f75=_0x25a04f[Math[_0x2b1024(0x113)](_0x25a04f[_0x2b1024(0x485)])];this[_0x2b1024(0x441)](_0x555f75);}},Game_Event['prototype'][_0x1f2382(0x1d3)]=function(){const _0x4eda32=_0x1f2382,_0xf0ef95=VisuMZ[_0x4eda32(0x4fb)](this[_0x4eda32(0x169)]());this[_0x4eda32(0x25a)](_0xf0ef95);},Game_Event['prototype'][_0x1f2382(0x58b)]=function(){const _0x273b81=_0x1f2382,_0x5cd321=VisuMZ[_0x273b81(0x4fb)](this[_0x273b81(0x169)]());this['moveAwayFromCharacter'](_0x5cd321);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x10a)]=function(){const _0x48ddaf=_0x1f2382;this[_0x48ddaf(0x45d)]();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x1f8)]=function(){const _0x58a129=_0x1f2382,_0x3baf78=VisuMZ[_0x58a129(0x4fb)](this['moveSynchTarget']());this['executeMoveDir8'](_0x3baf78[_0x58a129(0x1e3)]());},Game_Event[_0x1f2382(0x433)]['processMoveSynchReverseMimic']=function(){const _0x4dc84f=_0x1f2382,_0x549ab6=VisuMZ[_0x4dc84f(0x4fb)](this['moveSynchTarget']());this[_0x4dc84f(0x441)](this[_0x4dc84f(0x2c9)](_0x549ab6['lastMovedDirection']()));},Game_Event[_0x1f2382(0x433)][_0x1f2382(0xfa)]=function(){const _0xe28544=_0x1f2382,_0x804e22=VisuMZ[_0xe28544(0x4fb)](this[_0xe28544(0x169)]()),_0x5b9602=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x804e22[_0xe28544(0x1e3)]()];this['executeMoveDir8'](_0x5b9602);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x3ca)]=function(){const _0x3ff79d=_0x1f2382,_0x487866=VisuMZ['GetMoveSynchTarget'](this[_0x3ff79d(0x169)]()),_0x3955f6=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x487866[_0x3ff79d(0x1e3)]()];this['executeMoveDir8'](_0x3955f6);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x3b6)]=function(){const _0x5a6419=_0x1f2382,_0x1ada86=VisuMZ[_0x5a6419(0x4fb)](this[_0x5a6419(0x169)]()),_0x552b74=_0x1ada86[_0x5a6419(0x2a1)]();switch(this[_0x5a6419(0xf5)]()){case _0x5a6419(0x3e3):case _0x5a6419(0x525):this[_0x5a6419(0x477)](_0x552b74);break;case _0x5a6419(0x135):case _0x5a6419(0x3f0):this[_0x5a6419(0x477)](this[_0x5a6419(0x2c9)](_0x552b74));break;case'mirror\x20horizontal':case'horizontal\x20mirror':case'mirror\x20horz':case'horz\x20mirror':this['setDirection']([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x552b74]);break;case _0x5a6419(0x2bf):case _0x5a6419(0x305):case'mirror\x20vert':case _0x5a6419(0x371):this[_0x5a6419(0x477)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x552b74]);break;default:return;}this[_0x5a6419(0x379)]();},Game_Event['prototype'][_0x1f2382(0x421)]=function(){const _0x38c791=_0x1f2382,_0x10928f=$gameSystem[_0x38c791(0x2b9)](this);if(!_0x10928f)return;this[_0x38c791(0x323)](_0x10928f['x'],_0x10928f['y']),this[_0x38c791(0x28e)](),this[_0x38c791(0x477)](_0x10928f[_0x38c791(0x2a1)]),this[_0x38c791(0x51c)]===_0x10928f[_0x38c791(0x26d)]&&(this[_0x38c791(0x4d0)]=_0x10928f[_0x38c791(0x12c)]);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x194)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x379)],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x379)]=function(){const _0x3f828c=_0x1f2382;VisuMZ['EventsMoveCore'][_0x3f828c(0x194)][_0x3f828c(0x49d)](this),!Utils[_0x3f828c(0x44d)]()&&this[_0x3f828c(0x264)]();},Game_Event[_0x1f2382(0x433)]['updateMove']=function(){const _0x1d967c=_0x1f2382;Game_Character[_0x1d967c(0x433)][_0x1d967c(0x38e)][_0x1d967c(0x49d)](this),this[_0x1d967c(0x1c4)]();},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x332)]=function(){const _0x2126b4=_0x1f2382;if($gameMap[_0x2126b4(0x3a4)]())return!![];return this[_0x2126b4(0x24d)];},Game_Event['prototype'][_0x1f2382(0x1c4)]=function(){const _0x4bb46b=_0x1f2382;if(!this[_0x4bb46b(0x332)]())return;this['saveEventLocation']();},Game_Event['prototype'][_0x1f2382(0x1e0)]=function(){const _0x3d9ad5=_0x1f2382;this[_0x3d9ad5(0x3cf)]=!![];},Game_Event['prototype'][_0x1f2382(0x264)]=function(){const _0x5bb37d=_0x1f2382;this[_0x5bb37d(0x3cf)]&&this[_0x5bb37d(0x38c)]();},Game_Event[_0x1f2382(0x433)]['processSaveEventLocation']=function(){this['_requestSaveEventLocation']=![],$gameSystem['saveEventLocation'](this);},Game_Event[_0x1f2382(0x433)]['deleteEventLocation']=function(){const _0x1f89a6=_0x1f2382;$gameSystem[_0x1f89a6(0x383)](this);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x16f)]=function(){const _0x1191ad=_0x1f2382;return $gameSystem['getEventIconData'](this)?Game_Character[_0x1191ad(0x433)][_0x1191ad(0x16f)]['call'](this):{'iconIndex':0x0,'bufferX':settings['Icon'][_0x1191ad(0x580)],'bufferY':settings['Icon'][_0x1191ad(0x4af)],'blendMode':settings[_0x1191ad(0x214)][_0x1191ad(0x431)]};},Game_Event[_0x1f2382(0x433)][_0x1f2382(0xdc)]=function(){const _0x5cb326=_0x1f2382;return this[_0x5cb326(0x2bb)];},VisuMZ['EventsMoveCore'][_0x1f2382(0x182)]=Game_Event[_0x1f2382(0x433)][_0x1f2382(0x53c)],Game_Event['prototype'][_0x1f2382(0x53c)]=function(_0xd3bc91){const _0x2cebca=_0x1f2382,_0x183e5d=VisuMZ[_0x2cebca(0x4a7)]['Game_Event_meetsConditionsCPC']['call'](this,_0xd3bc91);if(!_0x183e5d)return![];return this[_0x2cebca(0x19d)](_0xd3bc91);},Game_Event[_0x1f2382(0x433)][_0x1f2382(0x19d)]=function(_0x2f1f53){const _0x524a82=_0x1f2382;VisuMZ[_0x524a82(0x4a7)][_0x524a82(0x2f3)][_0x524a82(0x3d1)](_0x2f1f53),this[_0x524a82(0x2bb)]=_0x2f1f53['CPC'][_0x524a82(0x485)]>0x0;_0x2f1f53[_0x524a82(0x594)]===undefined&&VisuMZ[_0x524a82(0x4a7)][_0x524a82(0x2f3)][_0x524a82(0x3d1)](_0x2f1f53);if(_0x2f1f53['CPC']['length']>0x0)return $gameMap[_0x524a82(0x451)](this[_0x524a82(0x3af)])&&VisuMZ['EventsMoveCore']['CustomPageConditions']['metCPC'](_0x2f1f53['CPC'],this[_0x524a82(0x3af)]);return!![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x207)]=Game_Troop[_0x1f2382(0x433)]['meetsConditions'],Game_Troop[_0x1f2382(0x433)][_0x1f2382(0x53c)]=function(_0x60a6b2){const _0x1662bb=_0x1f2382;var _0x4f312e=VisuMZ[_0x1662bb(0x4a7)][_0x1662bb(0x207)][_0x1662bb(0x49d)](this,_0x60a6b2);return _0x4f312e&&this[_0x1662bb(0x303)](_0x60a6b2);},Game_Troop[_0x1f2382(0x433)][_0x1f2382(0x303)]=function(_0x15ad3e){const _0x466871=_0x1f2382;_0x15ad3e[_0x466871(0x594)]===undefined&&VisuMZ[_0x466871(0x4a7)][_0x466871(0x2f3)][_0x466871(0x3d1)](_0x15ad3e);if(_0x15ad3e[_0x466871(0x594)][_0x466871(0x485)]>0x0)return VisuMZ[_0x466871(0x4a7)][_0x466871(0x2f3)][_0x466871(0x20b)](_0x15ad3e[_0x466871(0x594)],0x0);return!![];},VisuMZ['EventsMoveCore']['Game_Event_locate']=Game_Event[_0x1f2382(0x433)]['locate'],Game_Event['prototype'][_0x1f2382(0x15b)]=function(_0x4282fa,_0x26d9bb){const _0x26a6f5=_0x1f2382;if(this[_0x26a6f5(0xc7)]){const _0x14886d=this[_0x26a6f5(0x451)]()['note']||'';if(_0x14886d[_0x26a6f5(0x4e7)](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)){const _0x8b0782=String(RegExp['$1'])[_0x26a6f5(0x469)](',')['map'](_0x1843f5=>Number(_0x1843f5));_0x4282fa+=Number(_0x8b0782[0x0]||0x0)||0x0,_0x26d9bb+=Number(_0x8b0782[0x1]||0x0)||0x0;}_0x14886d[_0x26a6f5(0x4e7)](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i)&&(_0x4282fa+=Number(RegExp['$1'])),_0x14886d[_0x26a6f5(0x4e7)](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i)&&(_0x26d9bb+=Number(RegExp['$1']));}VisuMZ[_0x26a6f5(0x4a7)][_0x26a6f5(0x50f)]['call'](this,_0x4282fa,_0x26d9bb),this[_0x26a6f5(0x30c)]=_0x4282fa,this['_randomHomeY']=_0x26d9bb,this[_0x26a6f5(0x1c4)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3e4)]=Game_Event[_0x1f2382(0x433)]['moveTypeRandom'],Game_Event[_0x1f2382(0x433)][_0x1f2382(0x55c)]=function(){const _0x297e06=_0x1f2382,_0x5c07e6=$gameMap['distance'](this['x'],this['y'],this[_0x297e06(0x30c)],this[_0x297e06(0x58c)]),_0x383f0d=_0x5c07e6*(this['_randomMoveWeight']||0x0);Math['random']()>=_0x383f0d?VisuMZ[_0x297e06(0x4a7)]['Game_Event_moveTypeRandom']['call'](this):this[_0x297e06(0x181)]();},Game_Event[_0x1f2382(0x433)]['moveBackToRandomHome']=function(){const _0x57ee33=_0x1f2382,_0x9b2656=this[_0x57ee33(0x102)](this[_0x57ee33(0x30c)]),_0x46e8f2=this['deltaYFrom'](this['_randomHomeY']);if(Math[_0x57ee33(0x11d)](_0x9b2656)>Math[_0x57ee33(0x11d)](_0x46e8f2))this[_0x57ee33(0x4c1)](_0x9b2656>0x0?0x4:0x6),!this[_0x57ee33(0x3b8)]()&&_0x46e8f2!==0x0&&this['moveStraight'](_0x46e8f2>0x0?0x8:0x2);else _0x46e8f2!==0x0&&(this[_0x57ee33(0x4c1)](_0x46e8f2>0x0?0x8:0x2),!this[_0x57ee33(0x3b8)]()&&_0x9b2656!==0x0&&this[_0x57ee33(0x4c1)](_0x9b2656>0x0?0x4:0x6));},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x233)]=function(){const _0x2041fd=_0x1f2382;this[_0x2041fd(0x345)]={'filename':'','type':_0x2041fd(0x21b),'blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x350)]=function(){const _0x431ba0=_0x1f2382;if(this[_0x431ba0(0x345)]===undefined)this[_0x431ba0(0x233)]();return this['_attachPicture'];},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x17c)]=function(){const _0x24b30f=_0x1f2382;return this['attachPictureSettings']()[_0x24b30f(0x1f9)]??'';},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x291)]=function(){const _0x522579=_0x1f2382;return this[_0x522579(0x350)]()[_0x522579(0x21b)]??'picture';},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x2fa)]=function(){const _0x5a1d01=_0x1f2382;return this['attachPictureSettings']()[_0x5a1d01(0x578)]??0x0;},Game_CharacterBase['prototype'][_0x1f2382(0x1d8)]=function(){return this['attachPictureSettings']()['maxSize']??0x0;},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x378)]=function(){const _0x422a82=_0x1f2382;return this[_0x422a82(0x350)]()[_0x422a82(0x2c6)]??0x0;},Game_CharacterBase[_0x1f2382(0x433)]['attachPictureOffsetY']=function(){const _0x585269=_0x1f2382;return this[_0x585269(0x350)]()[_0x585269(0x4bb)]??0x0;},Game_CharacterBase[_0x1f2382(0x433)][_0x1f2382(0x298)]=function(){return this['attachPictureSettings']()['scale']??0x1;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x56d)]=Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x15d)],Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x15d)]=function(){const _0x2310d7=_0x1f2382;if(this['_waitMode']===_0x2310d7(0x201)){if(window[this[_0x2310d7(0x389)]])this[_0x2310d7(0xf8)]='',this['startCallEvent']();else return!![];}else return VisuMZ[_0x2310d7(0x4a7)][_0x2310d7(0x56d)][_0x2310d7(0x49d)](this);},VisuMZ['EventsMoveCore']['Game_Interpreter_executeCommand']=Game_Interpreter['prototype'][_0x1f2382(0x31f)],Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x31f)]=function(){const _0x5e00be=_0x1f2382,_0x24edc8=$gameMap&&this['_eventId']?$gameMap[_0x5e00be(0x451)](this['_eventId']):null;$gameTemp[_0x5e00be(0x394)](_0x24edc8);const _0x5b1751=VisuMZ['EventsMoveCore'][_0x5e00be(0x2db)][_0x5e00be(0x49d)](this);return $gameTemp[_0x5e00be(0x46a)](),_0x5b1751;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x2dd)]=Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x545)],Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x545)]=function(_0x3ea0c5){const _0x18d106=_0x1f2382;return $gameTemp[_0x18d106(0x31b)](this),VisuMZ[_0x18d106(0x4a7)][_0x18d106(0x2dd)][_0x18d106(0x49d)](this,_0x3ea0c5);},Game_Interpreter[_0x1f2382(0x433)]['pluginCommandCallEvent']=function(_0x393674){const _0x477aaa=_0x1f2382;this[_0x477aaa(0x3d0)]=_0x393674;const _0x2e693e=_0x477aaa(0x153)[_0x477aaa(0x504)](_0x393674[_0x477aaa(0x490)][_0x477aaa(0x25c)](0x3));this[_0x477aaa(0x389)]=_0x477aaa(0x549)+Graphics[_0x477aaa(0x361)]+'_'+this[_0x477aaa(0x37b)](),DataManager['loadDataFile'](this['_callEventMap'],_0x2e693e),window[this[_0x477aaa(0x389)]]?this[_0x477aaa(0x213)]():this[_0x477aaa(0x46d)](_0x477aaa(0x201));},Game_Interpreter[_0x1f2382(0x433)][_0x1f2382(0x213)]=function(){const _0x565fe5=_0x1f2382,_0x34f5cd=this['_callEventData'],_0x2a7740=window[this['_callEventMap']],_0x1992e8=_0x2a7740[_0x565fe5(0x252)][_0x34f5cd[_0x565fe5(0x37b)]];if(_0x1992e8&&_0x1992e8[_0x565fe5(0x3ad)][_0x34f5cd[_0x565fe5(0x35f)]-0x1]){const _0x4460ec=_0x1992e8[_0x565fe5(0x3ad)][_0x34f5cd[_0x565fe5(0x35f)]-0x1][_0x565fe5(0x4d6)];this[_0x565fe5(0x265)](_0x4460ec,this[_0x565fe5(0x37b)]());}window[this[_0x565fe5(0x389)]]=undefined,this[_0x565fe5(0x389)]=undefined,this[_0x565fe5(0x3d0)]=undefined;};function Game_CPCInterpreter(){const _0x4bca5c=_0x1f2382;this[_0x4bca5c(0x309)][_0x4bca5c(0x30d)](this,arguments);};function _0x1b24(){const _0x2c7b1c=['_selfTargetNumberInput','offsetY','hasStepAnime','_seconds','labelWindowRangeType','Game_CharacterBase_moveStraight','rotation','moveStraight','StrictCollision','Value','MapSwitches','_scene','boxWidth','_eventCopyData','zoomScale','DefaultShadow','onDatabaseLoaded','checkActivationProximity','_startAngle','useCarryPoseForIcons','characterPatternYVS8','MsgPopupPlayer','_moveRouteIndex','Map%1-Event%2','KNEEL','updateShadow','resetExitSelfSwitches','updateScale','list','setMapValue','_selfEvent','Step1EventId','morphIntoTemplate','deltaYFrom','_settings','_hue','OffsetX','_regionRules','updateFadeOut','selfValue','DEFAULT_SHIFT_Y','endOffset','Game_Event_isCollidedWithPlayerCharacters','RIGHT\x20TO\x20LEFT','angle','match','Game_System_initialize','areFollowersForceHidden','isMapVariable','EventID','_character','regionList','TiltRight','standing','Game_Event_start','return\x20%1','_mirrorSprite','_lastAttachPictureMaxSize','setEventIconDataKey','Forbid','Game_Switches_value','despawnTerrainTags','_commonEvents','LOWER\x20LEFT','Game_Timer_onExpire','GetMoveSynchTarget','processMoveRouteHugWall','refreshIfNeeded','convertSelfVariableValuesInScriptCall','%1Forbid','createIconSprite','_hidden','_EventsMoveCoreSettings','EventLabelRefresh','format','setupPageSettings','parallelCommonEvents','_wholeDuration','processMoveRouteStepTo','Vehicle','variables','_MapSpawnedEventData','keys','startScaleY','executeCommandCommonEvent','Game_Event_locate','morphInto','processMoveRouteAnimation','_forceDashing','isAllowEventAutoMovement','_DisablePlayerControl','_EventIcons','3oNPRZU','isAnyEventStarting','EXCLAMATION','FALSE','_moveAllowPlayerCollision','turnTowardPoint','_pageIndex','PreloadedMaps','_tilemap','of\x20Preloaded\x20Maps.\x0a\x0a','SPIN\x20CLOCKWISE','ANGER','createProxyWindow','target','convertVariableValuesInScriptCall','copy','SelfSwitches','Window_NumberInput_start','isEventRunning','mirror\x20horz','isBoat','_encounterNoneProximity','MobileEnabled','isEventsMoveCoreInvisible','isShip','updateEventCustomZ','cwX','opacitySpeed','determineCommonEventsWithCPC','_cpc','isDashing','updateVisibility','tileCoordinates','_isObjectCharacter','EventTimerExpireEvent','getTileExpandData','ARRAYEVAL','Game_Player_increaseSteps','meetsConditions','Game_Map_setupEvents','initEventsMoveCore','FontSize','IconIndex','Game_CharacterBase_isDashing','regionId','_PreservedEventMorphData','findTargetSprite','command357','Toggle','onClickTrigger','directionOnLadderSpriteVS8dir','$callEventMap','SCREEN','COLLAPSE','Game_CharacterBase_isTransparent','createSaveEventLocationData','VehicleAllow','_eventIcon','Game_Map_update','forceCarrying','forceDashing','_arcPeak','processMoveRouteTeleportTo','_stopCount','hasEventIcon','hasMoveOnlyRegions','isSelfSwitch','initMembersEventsMoveCore','prepareSpawnedEventAtTerrainTag','updateBitmapSmoothing','moveTypeRandom','getPosingCharacterPattern','Name','processMoveRouteMoveRepeat','updateEventMirrorSprite','getDirectionToPoint','BalloonOffsetX','iconIndex','processMoveRouteJumpToCharacter','Enable','PostMorphJS','_screenActivated','_data','opacity','shadowFilename','SpawnEventAtRegion','_needsRefresh','Game_Interpreter_updateWaitMode','_pose','_tileId','backY','onLoadAttachPicture','TargetVariableId','registerCommand','turnTowardCharacter','horizontal\x20mirror','blt','RangeType','blendMode','_visiblePlayerY','endAngle','distance','turnAwayFromPoint','roundY','min','MorphEventRemove','BufferX','_forceHideFollower','processMoveRouteTeleportToCharacter','resetSelfSwitchesForMap','%1Dock','type','unlock','Game_CharacterBase_setDirection','despawnRegions','moveAwayFromPoint','PageId','processMoveSynchAway','_randomHomeY','_active','Game_CharacterBase_increaseSteps','DashOnLadder','isDashDisabled','process_VisuMZ_EventsMoveCore_Switches_Variables','Sprite_Balloon_updatePosition','isRegionDockable','CPC','isBigCharacter','return\x200','getPose','onCancel','Game_CharacterBase_canPass','updateParallel','_eventOverloadThreshold','refresh','_checkRelocateNotetag','isBattleTest','code','encounterProximityDistance','EnableDashTilt','RegionOk','getControlledFollowerID','Game_Vehicle_isLandOk','variableId','checkValidEventerMap','timerText','setupAttachPictureBitmap','clearDashing','FollowerID','isPlayerForceShown','isOnRope','switch2Valid','OperateValues','eventsXy','isPressed','VS8','hasCPCs','_targetAngle','Game_CharacterBase_screenY','Game_Player_checkEventTriggerThere','isAllowCharacterTilt','_spriteOffsetY','needsAttachPictureUpdate','_forceCarrying','Game_Event_findProperPageIndex','isInsideLabelRange','EventIconDelete','setMovementSuccess','EventTimerExpireClear','isLongPressed','Sprite_Character_initMembers','_expireCommonEvent','loadDataFile','random','_eventCache','terrainTag','Hidden','EVAL','boat','checkEventProximity','MUSIC\x20NOTE','moveSynchType','Rope','Game_Event_meetsConditions','_waitMode','getAttachPictureBitmapWidth','processMoveSynchMirrorHorz','execute','_periodicRefreshTimer','RIGHT','roundXWithDirection','status','AdvancedVariables','updateMoveSynch','deltaXFrom','Step1MapId','NUM','_characterIndex','Seconds','33asxreN','isSceneMap','tileWidth','processMoveSynchCustom','misc','moveTowardPoint','_activationProximityAutoTriggerBypass','_labelWindows','moveAwayFromCharacter','backX','isRunning','updateStop','randomInt','FaceSynchAllSynchTargets','_paused','scale','sqrt','clear','_spawnPreserved','width','Passability','LIGHTBULB','abs','3550860sblFtm','Letter','isPreventSelfMovement','processOk','trim','updatePeriodicRefresh','_forceShowFollower','Game_CharacterBase_updatePattern','494734Ugpifu','Game_Message_add','mirror\x20vert','pos','_stepPattern','updateTextPosition','moveRouteIndex','lineHeight','Game_Player_checkEventTriggerHere','anchor','%1DockRegionOnly','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','AutoBalloon','LOWER\x20RIGHT','_customZ','reverse\x20mimic','processMoveRouteSetIndex','DiagonalSpeedMultiplier','startOffsetX','region','_selfTarget','EventTimerSpeed','resetIconsOnEventsDataKey','delta','_fadeOutStart','description','setupPlayerVisibilityOverrides','setPose','Hours','_startScaleX','dashSpeedModifier','prepareSpawnedEventAtXY','Sprite_Character_update','PlayerIconChange','Game_CharacterBase_opacity','updateFadeIn','_offsetX','remove','concat','Direction','setDashingEnabled','screenTileX','character','EventTemplates','Game_CharacterBase_hasStepAnime','Map%1.json','ccwX','characterPatternY','Game_CharacterBase_update','scrolledY','spawnPreserved','DOWN','create','locate','PreMorphJS','updateWaitMode','constructor','getPosingCharacterIndex','%1,','referEvent','textSizeEx','_characterName','createEventsMoveCoreMessagePopup','Game_Follower_initialize','Boat','moveDiagonally','Self\x20Switch\x20%1','moveSynchTarget','DashingEnable','_saveEventLocations','SelfSwitchABCD','ALLOW_LADDER_DASH','getEventIconIndex','getEventIconData','SpawnEventDespawnEventID','_selfTargetItemChoice','_shadowGraphic','ceil','_addedHitbox','vehicle','_duration','registerSelfEvent','_commonEventId','isOnLadder','endScaleY','firstSpawnedEvent','attachPictureFilename','attachPictureOffsetY','QUESTION','isWorking','setupSpawnedEvents','moveBackToRandomHome','Game_Event_meetsConditionsCPC','_trigger','move','_direction','clearCarrying','realMoveSpeed','_cacheVisibility','SpawnEventDespawnTerrainTags','FollowerSetGlobalChase','Game_Player_executeMove','isDestinationValid','Event','posEventsMoveCore','PosX','_followerControlID','isEventClickTriggered','_visibleEventX','push','Game_Event_update','Game_Map_refresh','Settings','AllForbid','_displayX','updateTileFrame','SpriteBased','requestMapLoadCommonEvents','EventTimerFramesSet','meetsCPC','EventLocationSave','isPlayerForceHidden','refreshEventLabels','Walk','createEventsMoveCoreTileMessagePopup','FUNC','canStartLocalEvents','pluginCommandCallEvent','Player','setAllowEventAutoMovement','_forceShowPlayer','isSpawnedEvent','_eventLabelOffsetX','initEventsMoveCoreSettings','2587832szuMBX','clamp','turnAwayFromCharacter','isSpawnHitboxCollisionOk','IconBufferY','updateEventLabelText','setupFollowerVisibilityOverrides','PreSpawnJS','checkEventsMoveCoreStringTags','STR','processMoveRouteMoveTo','getInputDir8','bufferX','turnLeft90','processMoveRouteFadeOut','PostSpawnJS','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','getLastPluginCommandInterpreter','ARRAYSTRUCT','_targetY','processMoveRouteMoveUntilStop','posNt','areFollowersForceShown','timer','autosaveEventLocation','characterIndex','Movement','isEventOverloaded','isSpriteVS8dir','activationRegionList','updateSelfMovement','HURT','default','VisibleRange','createAttachPictureSprite','despawnEventId','_eventMorphData','Game_Timer_stop','fontFace','processMoveSynchApproach','SWEAT','ApplyPopupExtraSettings','Sprite_Character_setCharacterBitmap','VisibleEventLabels','attachPictureMaxSize','checkCollisionKeywords','getDirectionFromPoint','_startScaleY','Step2EventId','row','updateScaleBase','VariableId','saveEventLocation','COBWEB','1054529EUHtLU','lastMovedDirection','_spriteset','_fadeOutDuration','delay','airship','_type','99xdHPnp','_dragonbones','checkNeedForPeriodicRefresh','Sprite_Character_characterPatternY','createBitmap','Template','bushDepth','EventTimerResume','name','Region','setupEvents','IconSize','MsgDuration','initFollowerController','_checkEncounterRaw','processMoveSynchMimic','filename','iconSize','_scaleY','parameters','WalkForbid','characterPatternYBasic','activationProximityDistance','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','CallEvent','processMoveSynch','RandomMoveWeight','setNumberInput','diamond','isDiagonalDirection','Game_Troop_meetsConditionsCPC','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_eventLabelOffsetY','540730WKVgoO','metCPC','AutoMoveEvents','isTriggerIn','removeTemporaryMapSpawnedEvents','mirror\x20horizontal','isPassable','bufferY','_shadowOpacity','startCallEvent','Icon','canUpdate','MapVariables','activationProximityType','isPlayerWithinEncounterNoneEvents','Game_Event_initialize','loadPicture','picture','setupEventsMoveCoreCommentTags','startMessage','setEventLabelsVisible','slice','IconBufferX','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','deletePreservedMorphEventDataKey','Preserve','Game_Character_setMoveRoute','indexOf','isTransparent','_scaleBaseX','isCollidedWithPlayerCharacters','setupEventsMoveCoreEffects','HMPH','drawing','correctFacingDirection','onOk','Game_CommonEvent_isActive','frontY','fontSize','processMoveSynchReverseMimic','Game_Event_updateParallel','clearAttachPictureSettings','setDiagonalDirection','front','setupSpawnTest','EventIconChange','max','Game_Temp_setDestination','Window_EventItem_onOk','roundX','shadowY','duration','Game_CharacterBase_direction','MapId','_startX','setPlayerControlDisable','clearEventCache','getPosingCharacterDirection','_eventIconSprite','isInvisibleCharacter','isMapPassable','setStopFollowerChasing','_encounterHalfProximity','isCollidedWithEvents','StopAutoMoveMessages','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','setEventIconData','_saveEventLocation','setFrames','LEFT','Game_Timer_initialize','Frames','events','isTurnInPlace','DashModifier','encounterProximityType','isLandOk','Game_Map_events','BULB','getInputDirection','moveTowardCharacter','startMapCommonEventOnTouch','padZero','SwitchId','SuccessSwitchId','NOTE','_forceHidePlayer','switches','_displayY','RegionTouch','updateSaveEventLocation','setupChild','isTargetEventValidForLabelWindow','createShadows','isStopFollowerChasing','canPass','Region%1','%1%2','right','pageIndex','isAutoBufferIcon','Game_Character_forceMoveRoute','Game_Variables_setValue','visible','value','updateAttachPictureSprite','SpawnEventAtXY','_moveSpeed','loadSystem','SelfVariables','despawnEverything','MsgPopupEvent','createLowerLayer','Scene_Map_onMapLoadedEncErase','Window_NumberInput_processOk','JSON','eraseEvent','reserveCommonEvent','SPIN\x20CW','_fadeInDuration','isPlaytest','meetActivationProximityConditions','hasEncounterNone','setCharacterSpriteSheetInvisible','_moveOnlyRegions','VisuMZ_Setup_Preload_Map','_labelWindow','Scene_Map_startEncounterEffect','setupEventsMoveCoreNotetags','findDiagonalDirectionTo','_pattern','_encounterEffectDuration','refreshBushDepth','TiltVert','advancedFunc','attachPictureType','UPPER\x20RIGHT','_targetScaleY','_PlayerDiagonalSetting','isValid','%1Allow','initMembers','attachPictureScale','fadeOutDuration','needsUpdate','_chaseOff','PlayerMovementDiagonal','erase','Self\x20Variable\x20%1','checkExistingEntitiesAt','checkEventTriggerEventsMoveCore','direction','processMoveRoutePatternLock','_eventErased','createTextSprite','processMoveRouteStepFrom','Game_CharacterBase_bushDepth','_eventScreenX','smooth','processMoveCommandEventsMoveCore','floor','_opacity','AutoBuffer','updateDuration','updatePose','setChaseOff','replace','updateTextScale','setCommonEvent','_speed','toUpperCase','Window_EventItem_onCancel','isRegionAllowPass','MessageText','isShadowVisible','getSavedEventLocation','screenTileY','_CPCs','VICTORY','processDrawIcon','setValue','mirror\x20vertical','updateTextAngle','string','setMoveRoute','Window_Message_startMessage','isInstanceOfSceneMap','setupDiagonalSupport','offsetX','switchId','_realX','reverseDir','MsgPopupTargetTile','_startY','Chase','_characterSprites','note','_currentArc','setControlledFollowerID','_frames','SwitchGetSelfSwitchID','some','RegionOkTarget','conditions','PreCopyJS','Game_Timer_start','Game_Enemy_meetsSwitchCondition','setFrame','VisuMZ_2_DragonbonesUnion','Game_Interpreter_executeCommand','custom','Game_Interpreter_PluginCommand','isMoving','pause','createLabelWindows','advancedValue','updateEventsMoveCoreTagChanges','_spriteOffsetX','FRUSTRATION','TargetSwitchId','_screenActivation','startOffsetY','clearPageSettings','_moveSynch','getSelfTarget','drawText','isAirship','STRUCT','FollowerIndex','MUSIC-NOTE','4490065UrWnFP','SelfVariableID','VariableGetSelfVariableID','CustomPageConditions','ARRAYJSON','deleteSavedEventLocationKey','AllAllow','MOBILE_DIAGONAL_PATHFINDING','Game_CharacterBase_realMoveSpeed','Arc','attachPictureBlendMode','sv\x20enemy','_erased','turnRight90','ARRAYFUNC','_proxyWindow','Game_Map_parallelCommonEvents','findDirectionTo','map','CPCsMet','StopAutoMoveEvents','vertical\x20mirror','_offsetY','_attachPictureSprite','PostCopyJS','initialize','Game_Event_clearPageSettings','meetsSwitchCondition','_randomHomeX','apply','processMoveRouteSelfSwitch','USER-DEFINED\x202','loadEnemy','_cacheSystemVisible','Sprite_Character_setTileBitmap','jump','adjustDir8MovementSpeed','_SavedEventLocations','updateEventsAndMovementCore','checkSmartEventCollision','roundYWithDirection','isVisible','enemy','setLastPluginCommandInterpreter','Game_Event_event','processEraseEncounterSpawn','checkEventTriggerAuto','executeCommand','OFF','iconHeight','processMoveRouteMoveToCharacter','setPosition','updateTilt','fadeIn','PopupExtra','setupMorphEvent','setPattern','resizeWindow','SLEEP','isPosing','getAttachPictureBitmapHeight','screenX','turn180','createSpawnedEventWithData','MUSICNOTE','FavorHorz','isSaveEventLocation','executeCommonEvent','clearStepPattern','onMapLoaded','PathfindMobileEnabled','isAdvancedVariable','_interpreter','Game_Event_updateSelfMovement','Game_Player_getInputDirection','shiftY','processEraseEncounterEvents','startsWith','_followerChaseOff','startScale','firstSpawnedEventID','createCharacterShadow','setOpacity','WalkAllow','TiltLeft','_attachPicture','_lastMovedDirection','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','BoatSpeed','originalText','frontX','add','_mapId','parent','TileX','forced','attachPictureSettings','setupSaveEventLocations','SlowerSpeed','isJumping','UPPER\x20LEFT','onChange','initEventsMoveCoreEffects','isEventTest','OffsetY','bind','defaultFontSize','isInVehicle','lastSpawnedEventID','IconBlendMode','enable','pageId','ShowShadows','frameCount','processMoveRouteJumpForward','fittingHeight','Visible','isPlayerWithinEncounterHalfEvents','updateText','mapValue','checkEventTriggerThere','player','Game_Variables_value','setItemChoice','_dummyWindow','isEmptyCharacter','start','_events','mainFontSize','vert\x20mirror','_eventPageIndex','LOVE','updateMoveSynchDirection','isSelfVariable','EventLabelVisible','_lastAttachPictureType','attachPictureOffsetX','update','isDashingAndMoving','eventId','updateAttachPictureBitmap','version','dir8','variableValid','setSelfValue','setupRegionRestrictions','_randomMoveWeight','deleteSavedEventLocation','_spawnData','LIGHT','MessageCore','_event','getPreservedMorphEventData','_callEventMap','itemPadding','pattern','processSaveEventLocation','Game_Followers_jumpAll','updateMove','column','Game_Player_isMapPassable','setDestination','characterName','SpawnEventDespawnEverything','registerSelfTarget','Spriteset_Map_createShadow','initMoveSpeed','Game_Event_setupPageSettings','isAdvancedSwitch','_tileExpand','Spriteset_Map_createLowerLayer','SPIN\x20CCW','_actuallyMoving','_lastSesetExitSelfSwitchesMapId','878612ZHjUuS','Scene_Load_onLoadSuccess','_lastAttachPictureFilename','startOffset','VisuMZ_1_MessageCore','isActive','isSaveEventLocations','EventIconChangeForced','FollowerSetControl','_spawnedEvents','getMapSpawnedEventData','EventAutoMovement','switch1Valid','Game_CharacterBase_initMembers','bitmap','pages','ConvertParams','_eventId','EventAllow','outlineColor','command108','isRegionForbidPass','despawnAtXY','_lastPluginCommandInterpreter','processMoveSynchDirection','meetActivationRegionConditions','isMovementSucceeded','LineHeight','ship','EventId','fadeDuration','_eventScreenY','setCharacterBitmap','clearPose','setMoveSpeed','_realY','Sprite_Balloon_setup','Step2MapId','LEFT\x20TO\x20RIGHT','updateOpacity','hasDragonbones','_isCharacterSpriteSheetInvisible','exit','EventForbid','processMoveSynchMirrorVert','setupCopyEvent','createSpawnedEvent','absDistance','TemplateName','_requestSaveEventLocation','_callEventData','loadCPC','checkEventTriggerHere','endOffsetY','horz\x20mirror','_textSprite','hasAdvancedSwitchVariable','Game_CharacterBase_screenX','Map\x20%1\x20Switch\x20%2','lock','forceMoveRoute','HEART','Game_Interpreter_character','Game_Message_setItemChoice','48gRAEGS','_visiblePlayerX','drawTextEx','checkAdvancedSwitchVariablePresent','Game_Follower_chaseCharacter','mimic','Game_Event_moveTypeRandom','updateHueShift','characterIndexVS8','_alwaysUpdateMove','Game_CharacterBase_pattern','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','MoveAllSynchTargets','isMapSwitch','isDashingEnabled','hasEncounterHalf','updateEventIconSprite','LIGHT\x20BULB','reverse\x20copy','_scaleX','makeDeepCopy','resetIconsOnEventsData','checkRegionEventTrigger','ITEM','TileY','Collision','ADDITIVE','Game_Followers_isVisible','Game_Vehicle_isMapPassable','isSupportDiagonalMovement','removeMorph','away','_filename','ARRAYSTR','_eventOverload','$preloadedMap_%1','_targetScaleX','_patternLocked','shift','patternHeight','updatePattern','_advancedSwitchVariable','height','onExpire','EventTimerFramesGain','isLabelVisible','_poseDuration','Map\x20%1\x20Variable\x20%2','ANNOYED','_scaleBaseY','updatePatternEventsMoveCore','IconSet','unlockEvent','updateSpritePosition','deleteIconsOnEventsDataKey','SpawnEventDespawnRegions','DIAGONAL_PATHFINDING_EVENT_LIMIT','_shadowSprite','Label','LIGHT-BULB','NORMAL','switch1Id','removeChild','end','SPIN\x20ACW','eventsXyNt','ShipSpeed','restoreSavedEventPosition','executeMove','EnableDir8','SelfDataResetAll','rangeType','TurnInPlaceDelay','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','processMoveRouteFadeIn','setupSpawn','ROUTE_SCRIPT','chaseCharacter','Game_Vehicle_initMoveSpeed','_clickTrigger','_text','changeSpeed','savePreservedMorphEventDataKey','BlendMode','UNTITLED','prototype','setup','reverse','_working','text','canMove','jumpAll','OpacitySpeed','drawIcon','restoreIconsOnEventsDataKey','contentsOpacity','Scene_Boot_onDatabaseLoaded','_starting','parse','executeMoveDir8','getPlayerDiagonalSetting','isNearTheScreen','_activationProximity','EventLocationDelete','isPlayerControlDisabled','followers','BitmapSmoothing','Game_Troop_meetsConditions','_eventSpawnData','resetSelfSwitchesForEvent','Game_CharacterBase_moveDiagonally','isMobileDevice','isNormalPriority','createDummyWindow','_screenZoomScale','event','patternWidth','SwitchGetSelfSwitchABCD','addLoadListener','left','_visibleEventY','spawnEventId','_moveRoute','_inputTime','Game_Map_setup','Game_Map_isDashDisabled','_needsPeriodicRefresh','updateRoutineMove','resetFontSettings','labelWindowRange','contents','MUSIC','updateVS8BalloonOffsets','processMoveRouteStepToCharacter','visibleRange','square','adjustY','Game_Character_processMoveCommand','USER-DEFINED\x205','split','clearSelfTarget','ZZZ','addChild','setWaitMode','processMoveRouteSelfVariable','Window_ScrollText_startMessage','TerrainTags','increaseSteps','PlayerForbid','inBattle','labelWindowText','template','windowPadding','setDirection','down','setBalloonPose','isShadowShrink','updateShadowChanges','eventLabelsVisible','Game_CharacterBase_characterIndex','Game_Switches_setValue','MapID','createLabelWindowForTarget','_counter','startMapCommonEventOnOK','stop','deltaX','length','circle','charAt','tileHeight','createShadow','TOGGLE','Scene_Map_createDisplayObjects','Disable','SILENCE','shadowX','includes','mapId','isAirshipPassable','fadeOut','setPlayerDiagonalSetting','_target','clearSpriteOffsets','Game_Map_event','startMapCommonEventOnOKTarget','opacityDelta','maxSize','processMoveRouteJumpTo','Game_Party_hasEncounterNone','screenY','call','round','filter','getDiagonalDestination','requestAnimation','onLoadSuccess','updatePosition','isPassableByAnyDirection','autoEventIconBuffer','adjustX','EventsMoveCore','createContents','none','4SvEQjI','cwY','pow','AdvancedSwitches','iconWidth','BufferY','isOnScreen','_diagonalSupport','List','setTileBitmap','hideShadows','isTile','Minutes','processMoveRouteBalloon','toLowerCase','requestRefresh'];_0x1b24=function(){return _0x2c7b1c;};return _0x1b24();}Game_CPCInterpreter[_0x1f2382(0x433)]=Object['create'](Game_Interpreter[_0x1f2382(0x433)]),Game_CPCInterpreter[_0x1f2382(0x433)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x1f2382(0x118)]=function(){const _0x46db14=_0x1f2382;Game_Interpreter[_0x46db14(0x433)][_0x46db14(0x118)]['call'](this),this['_cpc']=![];},Game_CPCInterpreter['prototype'][_0x1f2382(0xfb)]=function(){const _0x56c216=_0x1f2382;while(this['isRunning']()){this[_0x56c216(0x31f)]();}},Game_CPCInterpreter['prototype'][_0x1f2382(0x333)]=function(_0x4cbe1e){const _0x1ea1f1=_0x1f2382;while(this[_0x1ea1f1(0x111)]()){this[_0x1ea1f1(0x50e)](_0x4cbe1e);}},Game_CPCInterpreter[_0x1f2382(0x433)][_0x1f2382(0x50e)]=function(_0x30357e){const _0x102800=_0x1f2382,_0x348121=_0x30357e;$gameTemp[_0x102800(0x394)](_0x348121);const _0x4742b4=VisuMZ[_0x102800(0x4a7)][_0x102800(0x2db)][_0x102800(0x49d)](this);return $gameTemp['clearSelfTarget'](),_0x4742b4;},Game_CPCInterpreter['prototype'][_0x1f2382(0x3b2)]=function(_0x23ec02){const _0x25410d=_0x1f2382;return Game_Interpreter[_0x25410d(0x433)][_0x25410d(0x3b2)][_0x25410d(0x49d)](this,_0x23ec02),this['_comments'][_0x25410d(0x2d3)](_0x1830c1=>_0x1830c1[_0x25410d(0x4e7)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x25410d(0x533)]=!![]),!![];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x289)]=Scene_Map[_0x1f2382(0x433)]['startEncounterEffect'],Scene_Map[_0x1f2382(0x433)]['startEncounterEffect']=function(){const _0x35d951=_0x1f2382;VisuMZ[_0x35d951(0x4a7)]['Scene_Map_startEncounterEffect'][_0x35d951(0x49d)](this),this['_spriteset'][_0x35d951(0x4b4)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x39f)]=Scene_Load['prototype'][_0x1f2382(0x4a2)],Scene_Load['prototype'][_0x1f2382(0x4a2)]=function(){const _0x184597=_0x1f2382;if($gameMap)$gameMap[_0x184597(0x242)]();VisuMZ['EventsMoveCore'][_0x184597(0x39f)][_0x184597(0x49d)](this);},VisuMZ[_0x1f2382(0x4a7)]['Sprite_Character_initMembers']=Sprite_Character['prototype'][_0x1f2382(0x297)],Sprite_Character[_0x1f2382(0x433)]['initMembers']=function(){const _0x5db854=_0x1f2382;VisuMZ[_0x5db854(0x4a7)][_0x5db854(0xea)]['call'](this),this[_0x5db854(0x559)](),this['createAttachPictureSprite'](),this[_0x5db854(0x500)]();},Sprite_Character[_0x1f2382(0x433)]['initMembersEventsMoveCore']=function(){const _0x17283e=_0x1f2382;this[_0x17283e(0x212)]=0xff,this[_0x17283e(0x3c7)]=![];},Sprite_Character['prototype'][_0x1f2382(0x1c8)]=function(){const _0x104380=_0x1f2382;return this[_0x104380(0x163)]&&this[_0x104380(0x163)]['match'](/\[VS8\]/i);},Sprite_Character['prototype']['isAutoBufferIcon']=function(){const _0x346b3f=_0x1f2382;return this[_0x346b3f(0x1c8)]()&&VisuMZ[_0x346b3f(0x4a7)][_0x346b3f(0x196)][_0x346b3f(0xdb)][_0x346b3f(0x2ac)];},Sprite_Character['prototype'][_0x1f2382(0x1ce)]=function(){const _0x4a777a=_0x1f2382;this[_0x4a777a(0x307)]=new Sprite(),this[_0x4a777a(0x307)][_0x4a777a(0x12f)]['x']=0.5,this[_0x4a777a(0x307)][_0x4a777a(0x12f)]['y']=0x1,this[_0x4a777a(0x46c)](this[_0x4a777a(0x307)]),this['updateAttachPictureSprite']();},Sprite_Character['prototype'][_0x1f2382(0x500)]=function(){const _0x4ae9ee=_0x1f2382;this[_0x4ae9ee(0x244)]=new Sprite(),this[_0x4ae9ee(0x244)][_0x4ae9ee(0x3ac)]=ImageManager[_0x4ae9ee(0x276)]('IconSet'),this[_0x4ae9ee(0x244)]['bitmap'][_0x4ae9ee(0x2a8)]=![],this[_0x4ae9ee(0x244)][_0x4ae9ee(0x2d9)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x4ae9ee(0x12f)]['x']=0.5,this['_eventIconSprite'][_0x4ae9ee(0x12f)]['y']=0x1,this['addChild'](this[_0x4ae9ee(0x244)]);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x146)]=Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x379)],Sprite_Character[_0x1f2382(0x433)]['update']=function(){const _0x53d47c=_0x1f2382;VisuMZ['EventsMoveCore'][_0x53d47c(0x146)][_0x53d47c(0x49d)](this),this[_0x53d47c(0x316)]();},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x535)]=function(){const _0x53593d=_0x1f2382;Sprite[_0x53593d(0x433)]['updateVisibility'][_0x53593d(0x49d)](this),this[_0x53593d(0x52d)]()&&(this[_0x53593d(0x271)]=![]);},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x52d)]=function(){const _0x2d1c0d=_0x1f2382;if(this[_0x2d1c0d(0x16e)]()>0x0)return![];if(this[_0x2d1c0d(0x4ec)]){if(this[_0x2d1c0d(0x4ec)][_0x2d1c0d(0x17c)]()!=='')return![];}return this[_0x2d1c0d(0x36d)]()||this[_0x2d1c0d(0x4ec)]&&this['_character'][_0x2d1c0d(0x226)]();},Sprite_Character[_0x1f2382(0x433)]['updateBitmapSmoothing']=function(){const _0x287f17=_0x1f2382;if(!this[_0x287f17(0x3ac)])return;this['bitmap'][_0x287f17(0x2a8)]=!!VisuMZ[_0x287f17(0x4a7)][_0x287f17(0x196)]['Movement'][_0x287f17(0x448)];},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x316)]=function(){const _0x3528a4=_0x1f2382;this[_0x3528a4(0x1de)](),this[_0x3528a4(0x324)](),this[_0x3528a4(0x4d3)](),this['updateEventIconSprite'](),this[_0x3528a4(0x52f)](),this[_0x3528a4(0x560)](),this[_0x3528a4(0x273)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x312)]=Sprite_Character['prototype'][_0x1f2382(0x4b3)],Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x4b3)]=function(){const _0x4313a3=_0x1f2382;VisuMZ['EventsMoveCore'][_0x4313a3(0x312)][_0x4313a3(0x49d)](this),this[_0x4313a3(0x3ac)][_0x4313a3(0x454)](this[_0x4313a3(0x55b)][_0x4313a3(0x359)](this));},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x199)]=function(){const _0x18fed7=_0x1f2382,_0x8a676a=this[_0x18fed7(0x56f)],_0x50bfc5=this[_0x18fed7(0x452)](),_0x2f1f16=this[_0x18fed7(0x405)](),_0x1ee10c=(Math[_0x18fed7(0x2aa)](_0x8a676a/0x80)%0x2*0x8+_0x8a676a%0x8)*_0x50bfc5,_0x456a0f=Math['floor'](_0x8a676a%0x100/0x8)%0x10*_0x2f1f16,_0x45d64e=this[_0x18fed7(0x539)]();let _0x58a9f6=_0x1ee10c,_0x2d1a58=_0x456a0f,_0x54666f=_0x50bfc5,_0x5b932b=_0x2f1f16;_0x45d64e['up']&&_0x45d64e['up']>0x0&&(_0x2d1a58-=_0x2f1f16*_0x45d64e['up'],_0x5b932b+=_0x2f1f16*_0x45d64e['up']),_0x45d64e[_0x18fed7(0x478)]&&_0x45d64e[_0x18fed7(0x478)]>0x0&&(_0x5b932b+=_0x2f1f16*_0x45d64e[_0x18fed7(0x478)]),_0x45d64e['left']&&_0x45d64e[_0x18fed7(0x455)]>0x0&&(_0x58a9f6-=_0x50bfc5*_0x45d64e[_0x18fed7(0x455)],_0x54666f+=_0x50bfc5*_0x45d64e[_0x18fed7(0x455)]),_0x45d64e[_0x18fed7(0x26c)]&&_0x45d64e[_0x18fed7(0x26c)]>0x0&&(_0x54666f+=_0x50bfc5*_0x45d64e[_0x18fed7(0x26c)]),this[_0x18fed7(0x2d9)](_0x58a9f6,_0x2d1a58,_0x54666f,_0x5b932b);},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x539)]=function(){const _0x408144=_0x1f2382;return this[_0x408144(0x4ec)]?this[_0x408144(0x4ec)]['_tileExpand']||{}:{};},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x1d6)]=Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x3be)],Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x3be)]=function(){const _0x3011ea=_0x1f2382;VisuMZ[_0x3011ea(0x4a7)][_0x3011ea(0x1d6)][_0x3011ea(0x49d)](this),this['bitmap'][_0x3011ea(0x454)](this['updateBitmapSmoothing'][_0x3011ea(0x359)](this)),this[_0x3011ea(0x3c7)]=ImageManager[_0x3011ea(0x245)](this[_0x3011ea(0x163)]),this['_isCharacterSpriteSheetInvisible']&&this['bitmap'][_0x3011ea(0x454)](this[_0x3011ea(0x285)][_0x3011ea(0x359)](this));},Sprite_Character['prototype'][_0x1f2382(0x285)]=function(){const _0x22d846=_0x1f2382;this['bitmap']=new Bitmap(this[_0x22d846(0x3ac)][_0x22d846(0x11a)],this['bitmap']['height']);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x1ec)]=Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x155)],Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x155)]=function(){const _0x2e3269=_0x1f2382;return this['isSpriteVS8dir']()?this['characterPatternYVS8']():this[_0x2e3269(0x1fe)]();},Sprite_Character['prototype'][_0x1f2382(0x4ce)]=function(){const _0x17d181=_0x1f2382,_0x305864=this[_0x17d181(0x4ec)][_0x17d181(0x2a1)]();let _0x4c99f0=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x17d181(0x4ec)][_0x17d181(0x4f2)]&&(_0x4c99f0=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x4c99f0[_0x305864]-0x2)/0x2;},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x1fe)]=function(){const _0xd2ffeb=_0x1f2382;let _0x5a04e4=this[_0xd2ffeb(0x4ec)][_0xd2ffeb(0x2a1)]();if(this['_character'][_0xd2ffeb(0x4f2)]){if(_0x5a04e4===0x4)_0x5a04e4=0x6;else _0x5a04e4===0x6&&(_0x5a04e4=0x4);}return(_0x5a04e4-0x2)/0x2;},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x1de)]=function(){const _0x30e28b=_0x1f2382;this[_0x30e28b(0x116)]['x']=this['_character']['_scaleX']??0x1,this[_0x30e28b(0x116)]['y']=this[_0x30e28b(0x4ec)][_0x30e28b(0x1fb)]??0x1;},Sprite_Character[_0x1f2382(0x433)]['updateTilt']=function(){const _0x506209=_0x1f2382;if(!VisuMZ['EventsMoveCore']['Settings'][_0x506209(0x1c6)][_0x506209(0xcb)])return;this[_0x506209(0x4c0)]=0x0;if(this[_0x506209(0xe0)]()){const _0x5224c7=VisuMZ[_0x506209(0x4a7)][_0x506209(0x196)][_0x506209(0x1c6)],_0x3e8ac8=this[_0x506209(0x4ec)][_0x506209(0x2a1)]();let _0x5beecc=0x0;if([0x1,0x4,0x7]['includes'](_0x3e8ac8))_0x5beecc=_0x5224c7[_0x506209(0x344)];if([0x3,0x6,0x9][_0x506209(0x48f)](_0x3e8ac8))_0x5beecc=_0x5224c7[_0x506209(0x4ee)];[0x2,0x8]['includes'](_0x3e8ac8)&&(_0x5beecc=[-_0x5224c7['TiltVert'],0x0,_0x5224c7[_0x506209(0x28f)]][this[_0x506209(0x4ec)][_0x506209(0x38b)]()]);if(this['_reflection'])_0x5beecc*=-0x1;this['rotation']=_0x5beecc;}},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0xe0)]=function(){const _0x3ed0be=_0x1f2382;if(this[_0x3ed0be(0x1ea)])return![];return this['_character'][_0x3ed0be(0x37a)]()&&!this[_0x3ed0be(0x4ec)]['isOnLadder']()&&!this['_character']['isPosing']()&&this[_0x3ed0be(0x16e)]()===0x0;},Sprite_Character['prototype']['updateShadow']=function(){const _0x37eed5=_0x1f2382;if(!this[_0x37eed5(0x417)])return;this[_0x37eed5(0x417)]['x']=this[_0x37eed5(0x4ec)][_0x37eed5(0x48e)](),this[_0x37eed5(0x417)]['y']=this['_character'][_0x37eed5(0x23c)](),this[_0x37eed5(0x417)][_0x37eed5(0x569)]=this['opacity'],this[_0x37eed5(0x417)][_0x37eed5(0x271)]=this[_0x37eed5(0x4ec)][_0x37eed5(0x2b8)](),this['_shadowSprite']['_hidden']=this[_0x37eed5(0x501)];if(this[_0x37eed5(0x4ec)][_0x37eed5(0x47a)]())this['_shadowSprite'][_0x37eed5(0x116)]['x']=Math[_0x37eed5(0x238)](0x0,this[_0x37eed5(0x417)][_0x37eed5(0x116)]['x']-0.1),this[_0x37eed5(0x417)][_0x37eed5(0x116)]['y']=Math[_0x37eed5(0x238)](0x0,this['_shadowSprite'][_0x37eed5(0x116)]['y']-0.1);else{if(this[_0x37eed5(0x417)]['scale']['x']!==this[_0x37eed5(0x116)]['x']){if(this['_shadowSprite'][_0x37eed5(0x116)]['x']>this[_0x37eed5(0x116)]['x'])this[_0x37eed5(0x417)][_0x37eed5(0x116)]['x']=Math['min'](this[_0x37eed5(0x417)][_0x37eed5(0x116)]['x']+0.1,this['scale']['x']);if(this[_0x37eed5(0x417)][_0x37eed5(0x116)]['x']<this[_0x37eed5(0x116)]['x'])this[_0x37eed5(0x417)]['scale']['x']=Math[_0x37eed5(0x238)](this[_0x37eed5(0x417)][_0x37eed5(0x116)]['x']-0.1,this[_0x37eed5(0x116)]['x']);}if(this[_0x37eed5(0x417)][_0x37eed5(0x116)]['y']!==this['scale']['y']){if(this[_0x37eed5(0x417)][_0x37eed5(0x116)]['y']>this[_0x37eed5(0x116)]['y'])this[_0x37eed5(0x417)]['scale']['y']=Math['min'](this[_0x37eed5(0x417)][_0x37eed5(0x116)]['y']+0.1,this[_0x37eed5(0x116)]['y']);if(this[_0x37eed5(0x417)][_0x37eed5(0x116)]['y']<this['scale']['y'])this[_0x37eed5(0x417)]['scale']['y']=Math['max'](this[_0x37eed5(0x417)][_0x37eed5(0x116)]['y']-0.1,this[_0x37eed5(0x116)]['y']);}}},Sprite_Character['prototype'][_0x1f2382(0x3ee)]=function(){const _0x1a4e4b=_0x1f2382;if(!this['_eventIconSprite'])return;const _0x195cbd=this['_eventIconSprite'],_0xcda335=this[_0x1a4e4b(0x16e)]();if(_0xcda335<=0x0)return _0x195cbd[_0x1a4e4b(0x2d9)](0x0,0x0,0x0,0x0);else{const _0xc70baf=ImageManager[_0x1a4e4b(0x4ae)],_0x48aa6f=ImageManager['iconHeight'],_0x4d8fc3=_0xcda335%0x10*_0xc70baf,_0x4c9664=Math['floor'](_0xcda335/0x10)*_0x48aa6f;_0x195cbd[_0x1a4e4b(0x2d9)](_0x4d8fc3,_0x4c9664,_0xc70baf,_0x48aa6f),this[_0x1a4e4b(0x271)]=!![];}const _0x486b67=this['_character'][_0x1a4e4b(0x16f)]();this[_0x1a4e4b(0x26e)]()?this[_0x1a4e4b(0x4a5)](_0x195cbd):(_0x195cbd['x']=_0x486b67?_0x486b67[_0x1a4e4b(0x1b8)]:0x0,_0x195cbd['y']=_0x486b67?-this[_0x1a4e4b(0x408)]+_0x486b67[_0x1a4e4b(0x211)]:0x0),_0x195cbd[_0x1a4e4b(0x578)]=_0x486b67?_0x486b67[_0x1a4e4b(0x578)]:0x0,this[_0x1a4e4b(0x41c)](_0x195cbd),this['addChild'](_0x195cbd),_0x195cbd[_0x1a4e4b(0x4c0)]=-this[_0x1a4e4b(0x4c0)];},Sprite_Character['prototype'][_0x1f2382(0x4a5)]=function(_0x44ea5d){const _0x5905ed=_0x1f2382;_0x44ea5d['x']=0x0,_0x44ea5d['y']=-this['height']+this['height']*0x2/0x5,this[_0x5905ed(0x4ec)][_0x5905ed(0x38b)]()!==0x1&&(_0x44ea5d['y']+=0x1);},Sprite_Character['prototype'][_0x1f2382(0x16e)]=function(){const _0xf187cd=_0x1f2382;if(!this[_0xf187cd(0x4ec)])return 0x0;if(this['_character'][_0xf187cd(0x2fc)])return 0x0;const _0x4cc99c=this[_0xf187cd(0x4ec)]['getEventIconData']();return _0x4cc99c?_0x4cc99c[_0xf187cd(0x563)]||0x0:0x0;},Sprite_Character[_0x1f2382(0x433)]['updateEventCustomZ']=function(){const _0x43a364=_0x1f2382;if(!this['_character'])return;if(this['_character']['_customZ']===undefined)return;if(this['_character'][_0x43a364(0x134)]===![])return;this['z']=this[_0x43a364(0x4ec)][_0x43a364(0x134)],this[_0x43a364(0x417)]&&(this['z']<0x0?this['_shadowSprite']['z']=this['z']-0x1:this['_shadowSprite']['z']=0x0);},Sprite_Character['prototype'][_0x1f2382(0x560)]=function(){const _0x26ea42=_0x1f2382;if(!this[_0x26ea42(0x4ec)])return;let _0x4b4093=!!this['_character'][_0x26ea42(0x4f2)];this[_0x26ea42(0x116)]['x']=Math[_0x26ea42(0x11d)](this[_0x26ea42(0x116)]['x'])*(_0x4b4093?-0x1:0x1);},Sprite_Character['prototype'][_0x1f2382(0x273)]=function(){const _0x31c4fa=_0x1f2382;if(!this[_0x31c4fa(0x307)])return;if(!this[_0x31c4fa(0x4ec)])return;this[_0x31c4fa(0xd2)](),this['updateAttachPictureBitmap']();},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0xd2)]=function(){const _0x2894e0=_0x1f2382;if(!this[_0x2894e0(0xe2)]())return;const _0x4b1302=this[_0x2894e0(0x4ec)]['attachPictureSettings']();this[_0x2894e0(0x3a0)]=_0x4b1302[_0x2894e0(0x1f9)],this[_0x2894e0(0x377)]=_0x4b1302[_0x2894e0(0x585)],this[_0x2894e0(0x4f3)]=_0x4b1302[_0x2894e0(0x499)],this['_lastAttachPictureScale']=_0x4b1302['scale'];if(_0x4b1302[_0x2894e0(0x1f9)]!==''){if(_0x4b1302['type']===_0x2894e0(0x31a)){const _0x49e6fc=ImageManager[_0x2894e0(0x310)](_0x4b1302[_0x2894e0(0x1f9)]);_0x49e6fc['addLoadListener'](this[_0x2894e0(0x571)][_0x2894e0(0x359)](this,_0x49e6fc));}else{if(_0x4b1302[_0x2894e0(0x585)]===_0x2894e0(0x2fb)){const _0x17ff19=ImageManager['loadSvEnemy'](_0x4b1302[_0x2894e0(0x1f9)]);_0x17ff19[_0x2894e0(0x454)](this[_0x2894e0(0x571)][_0x2894e0(0x359)](this,_0x17ff19));}else{const _0x2212e5=ImageManager[_0x2894e0(0x21a)](_0x4b1302[_0x2894e0(0x1f9)]);_0x2212e5['addLoadListener'](this[_0x2894e0(0x571)][_0x2894e0(0x359)](this,_0x2212e5));}}}else this[_0x2894e0(0x307)]['bitmap']=new Bitmap(0x1,0x1);},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x37c)]=function(){const _0x2650ee=_0x1f2382,_0x534e97=this['_attachPictureSprite'];_0x534e97['x']=this[_0x2650ee(0x4ec)][_0x2650ee(0x378)](),_0x534e97['y']=this[_0x2650ee(0x4ec)][_0x2650ee(0x17d)](),_0x534e97['blendMode']=this[_0x2650ee(0x4ec)]['attachPictureBlendMode']();},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0xe2)]=function(){const _0x3a1e7e=_0x1f2382,_0x2c5432=this[_0x3a1e7e(0x4ec)][_0x3a1e7e(0x350)]();if(_0x2c5432){if(this[_0x3a1e7e(0x3a0)]!==_0x2c5432[_0x3a1e7e(0x1f9)])return!![];if(this['_lastAttachPictureType']!==_0x2c5432[_0x3a1e7e(0x585)])return!![];if(this[_0x3a1e7e(0x4f3)]!==_0x2c5432['maxSize'])return!![];if(this['_lastAttachPictureScale']!==_0x2c5432[_0x3a1e7e(0x116)])return!![];}return![];},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x571)]=function(_0x1468c7){const _0x227125=_0x1f2382,_0x554d19=this['_attachPictureSprite'];_0x554d19['bitmap']=_0x1468c7;const _0x2f5548=this[_0x227125(0x4ec)][_0x227125(0x350)](),_0x22bf76=_0x2f5548['maxSize'],_0x4dccce=_0x2f5548[_0x227125(0x116)];let _0x499947=0x1;if(_0x22bf76>0x0){let _0x54ca41=this[_0x227125(0xf9)]()||0x1,_0x4d3f59=this['getAttachPictureBitmapHeight']()||0x1;const _0x1c2a5b=Math[_0x227125(0x238)](0x1,_0x54ca41,_0x4d3f59);_0x499947=_0x22bf76/_0x1c2a5b;}_0x499947*=_0x4dccce,_0x499947!==0x1&&(this[_0x227125(0x307)]['bitmap'][_0x227125(0x2a8)]=!![]),_0x554d19[_0x227125(0x116)]['x']=_0x499947,_0x554d19[_0x227125(0x116)]['y']=_0x499947,this[_0x227125(0x271)]=!![],this[_0x227125(0x37c)]();},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0xf9)]=function(){const _0x18d73b=_0x1f2382,_0x465564=this[_0x18d73b(0x307)];if(!_0x465564)return 0x0;return _0x465564[_0x18d73b(0x3ac)]['width'];},Sprite_Character[_0x1f2382(0x433)][_0x1f2382(0x32c)]=function(){const _0xc0df67=_0x1f2382,_0x11c5fe=this[_0xc0df67(0x307)];if(!_0x11c5fe)return 0x0;return _0x11c5fe[_0xc0df67(0x3ac)][_0xc0df67(0x408)];},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3c2)]=Sprite_Balloon[_0x1f2382(0x433)][_0x1f2382(0x434)],Sprite_Balloon[_0x1f2382(0x433)][_0x1f2382(0x434)]=function(_0x2696e2,_0xcdae41){const _0x552cfa=_0x1f2382;VisuMZ[_0x552cfa(0x4a7)][_0x552cfa(0x3c2)][_0x552cfa(0x49d)](this,_0x2696e2,_0xcdae41),VisuMZ[_0x552cfa(0x4a7)][_0x552cfa(0x196)][_0x552cfa(0xdb)][_0x552cfa(0x132)]&&this['_target'][_0x552cfa(0x4ec)]['setBalloonPose'](_0xcdae41,this[_0x552cfa(0x176)]);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x592)]=Sprite_Balloon[_0x1f2382(0x433)]['updatePosition'],Sprite_Balloon['prototype']['updatePosition']=function(){const _0x2dc970=_0x1f2382;VisuMZ[_0x2dc970(0x4a7)][_0x2dc970(0x592)][_0x2dc970(0x49d)](this),this[_0x2dc970(0x462)]();},Sprite_Balloon[_0x1f2382(0x433)][_0x1f2382(0x462)]=function(){const _0x1f28fe=_0x1f2382;this[_0x1f28fe(0x494)][_0x1f28fe(0x4ec)][_0x1f28fe(0x1c8)]()&&(this['x']+=VisuMZ[_0x1f28fe(0x4a7)]['Settings']['VS8'][_0x1f28fe(0x562)],this['y']+=VisuMZ['EventsMoveCore'][_0x1f28fe(0x196)][_0x1f28fe(0xdb)]['BalloonOffsetY']);},Sprite_Timer[_0x1f2382(0x433)][_0x1f2382(0x1ed)]=function(){const _0x2637a0=_0x1f2382;this[_0x2637a0(0x3ac)]=new Bitmap(Math[_0x2637a0(0x49e)](Graphics[_0x2637a0(0x4c6)]/0x2),0x30),this[_0x2637a0(0x3ac)][_0x2637a0(0x1d2)]=this['fontFace'](),this[_0x2637a0(0x3ac)][_0x2637a0(0x230)]=this[_0x2637a0(0x230)](),this[_0x2637a0(0x3ac)]['outlineColor']=ColorManager[_0x2637a0(0x3b1)]();},Sprite_Timer['prototype'][_0x1f2382(0xd1)]=function(){const _0x4c0ef2=_0x1f2382,_0x2655e3=Math[_0x4c0ef2(0x2aa)](this[_0x4c0ef2(0x4bd)]/0x3c/0x3c),_0x12d046=Math[_0x4c0ef2(0x2aa)](this[_0x4c0ef2(0x4bd)]/0x3c)%0x3c,_0x164bc9=this[_0x4c0ef2(0x4bd)]%0x3c;let _0x3d85ee=_0x12d046[_0x4c0ef2(0x25c)](0x2)+':'+_0x164bc9['padZero'](0x2);if(_0x2655e3>0x0)_0x3d85ee='%1:%2'[_0x4c0ef2(0x504)](_0x2655e3,_0x3d85ee);return _0x3d85ee;};function Sprite_EventLabel(){const _0x20f292=_0x1f2382;this[_0x20f292(0x309)](...arguments);}Sprite_EventLabel['prototype']=Object[_0x1f2382(0x15a)](Sprite[_0x1f2382(0x433)]),Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x15e)]=Sprite_EventLabel,Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x309)]=function(_0x49f288){const _0x2c383c=_0x1f2382;this[_0x2c383c(0x387)]=_0x49f288,Sprite[_0x2c383c(0x433)][_0x2c383c(0x309)][_0x2c383c(0x49d)](this),this['initMembers'](),this[_0x2c383c(0x522)]();},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x297)]=function(){const _0x20abac=_0x1f2382;this['anchor']['x']=0.5,this[_0x20abac(0x12f)]['y']=0x1;},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x522)]=function(){const _0x244645=_0x1f2382,_0x1e4c3e=new Rectangle(0x0,0x0,0x1,0x1);this[_0x244645(0x2ff)]=new Window_Base(_0x1e4c3e),this[_0x244645(0x2ff)]['padding']=0x0,this['opacity']=this[_0x244645(0x40b)]()?0xff:0x0;},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x379)]=function(){const _0x2b2067=_0x1f2382;Sprite[_0x2b2067(0x433)][_0x2b2067(0x379)][_0x2b2067(0x49d)](this),this[_0x2b2067(0x366)](),this['updateScale'](),this[_0x2b2067(0x4a3)](),this[_0x2b2067(0x3c5)](),this[_0x2b2067(0x3e5)]();},Sprite_EventLabel[_0x1f2382(0x433)]['updateText']=function(){const _0x32d214=_0x1f2382;this[_0x32d214(0x387)][_0x32d214(0x474)]()!==this[_0x32d214(0x42e)]&&(this[_0x32d214(0x42e)]=this[_0x32d214(0x387)][_0x32d214(0x474)](),this['refresh']());},Sprite_EventLabel['prototype'][_0x1f2382(0xc6)]=function(){const _0x2de966=_0x1f2382;if(!this[_0x2de966(0x2ff)])return;this[_0x2de966(0x329)](),this[_0x2de966(0x2eb)]();},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x329)]=function(){const _0x2067af=_0x1f2382,_0x3ffcc1=this[_0x2067af(0x2ff)][_0x2067af(0x162)](this[_0x2067af(0x42e)]),_0xd0079=this['_proxyWindow'][_0x2067af(0x38a)](),_0x404405=_0x3ffcc1[_0x2067af(0x11a)]+_0xd0079*0x2,_0x24df43=_0x3ffcc1[_0x2067af(0x408)];this[_0x2067af(0x2ff)][_0x2067af(0x184)](0x0,0x0,_0x404405,_0x24df43),this[_0x2067af(0x2ff)][_0x2067af(0x4a8)](),this[_0x2067af(0x3ac)]=this[_0x2067af(0x2ff)][_0x2067af(0x460)];},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x2eb)]=function(){const _0x377d73=_0x1f2382,_0x1e1a4e=this[_0x377d73(0x2ff)][_0x377d73(0x38a)]();this[_0x377d73(0x2ff)][_0x377d73(0x3e0)](this[_0x377d73(0x42e)],_0x1e1a4e,0x0);},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x4d5)]=function(){const _0x36c2c7=_0x1f2382,_0x29a291=VisuMZ['EventsMoveCore'][_0x36c2c7(0x196)][_0x36c2c7(0x418)][_0x36c2c7(0x53f)],_0x423ee3=$gameSystem[_0x36c2c7(0x370)]()||0x1;this['scale']['x']=this[_0x36c2c7(0x116)]['y']=_0x29a291/_0x423ee3;},Sprite_EventLabel['prototype'][_0x1f2382(0x4a3)]=function(){const _0x4bf1af=_0x1f2382;if(!SceneManager['_scene'])return;if(!SceneManager[_0x4bf1af(0x4c5)]['_spriteset'])return;const _0x106402=SceneManager['_scene'][_0x4bf1af(0x1e4)][_0x4bf1af(0x544)](this[_0x4bf1af(0x387)]);if(!_0x106402)return;this['x']=this[_0x4bf1af(0x387)][_0x4bf1af(0x32d)](),this['x']+=this[_0x4bf1af(0x387)][_0x4bf1af(0x288)][_0x4bf1af(0x2c6)];if(_0x106402[_0x4bf1af(0x3a0)]){const _0x13bb66=_0x106402[_0x4bf1af(0x307)];this['y']=this[_0x4bf1af(0x387)][_0x4bf1af(0x49c)]()-_0x13bb66[_0x4bf1af(0x408)]*_0x13bb66['scale']['y'];}else this['y']=this[_0x4bf1af(0x387)][_0x4bf1af(0x49c)]()-_0x106402[_0x4bf1af(0x408)]*_0x106402['scale']['y'];this['y']+=$gameSystem[_0x4bf1af(0x476)]()*-0.5,this['y']+=this[_0x4bf1af(0x387)][_0x4bf1af(0x288)][_0x4bf1af(0x4bb)];},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x3c5)]=function(){const _0x32392c=_0x1f2382;if(this[_0x32392c(0x40b)]())this[_0x32392c(0x569)]+=this[_0x32392c(0x531)]();else SceneManager['_scene'][_0x32392c(0x28d)]>0x0?this[_0x32392c(0x569)]=0x0:this[_0x32392c(0x569)]-=this[_0x32392c(0x531)]();},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x3e5)]=function(){const _0x1d1e9b=_0x1f2382;if(this[_0x1d1e9b(0x40b)]()&&this['_event']&&this['_event'][_0x1d1e9b(0x288)]['hueShift']){const _0x3ab6d3=this[_0x1d1e9b(0x4dd)]+(this[_0x1d1e9b(0x387)][_0x1d1e9b(0x288)]['hueShift']||0x0);this['setHue'](_0x3ab6d3);}},Sprite_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x40b)]=function(){const _0x21b273=_0x1f2382;if(!$gameSystem[_0x21b273(0x47c)]())return![];if(this['_event']?.[_0x21b273(0x2fc)])return![];if(this['_event']&&this[_0x21b273(0x387)][_0x21b273(0x51c)]<0x0)return![];if(SceneManager[_0x21b273(0x4c5)][_0x21b273(0x28d)]>0x0)return![];const _0x322f16=$gamePlayer['x'],_0x5e5c07=$gamePlayer['y'],_0x1dc1ac=this[_0x21b273(0x387)]['x'],_0x31f239=this[_0x21b273(0x387)]['y'];if(this[_0x21b273(0x3df)]===_0x322f16&&this['_visiblePlayerY']===_0x5e5c07&&this[_0x21b273(0x192)]===_0x1dc1ac&&this['_visibleEventY']===_0x31f239)return this[_0x21b273(0x188)];this[_0x21b273(0x3df)]=$gamePlayer['x'],this[_0x21b273(0x579)]=$gamePlayer['y'],this[_0x21b273(0x192)]=this['_event']['x'],this[_0x21b273(0x456)]=this['_event']['y'];if(!VisuMZ[_0x21b273(0x4a7)][_0x21b273(0xe5)](this[_0x21b273(0x387)]))return this[_0x21b273(0x188)]=![],![];return this[_0x21b273(0x188)]=!![],!![];},Sprite_EventLabel[_0x1f2382(0x433)]['opacitySpeed']=function(){const _0x3d0d58=_0x1f2382;return VisuMZ[_0x3d0d58(0x4a7)]['Settings']['Label']['OpacitySpeed'];};function _0xcc2a(_0x1d8441,_0x48bfec){const _0x1b24f9=_0x1b24();return _0xcc2a=function(_0xcc2ad8,_0x443e1d){_0xcc2ad8=_0xcc2ad8-0xc4;let _0x9ba241=_0x1b24f9[_0xcc2ad8];return _0x9ba241;},_0xcc2a(_0x1d8441,_0x48bfec);}function Sprite_VisuMz_MessagePopup(){const _0x2a3dcb=_0x1f2382;this[_0x2a3dcb(0x309)](...arguments);}Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)]=Object[_0x1f2382(0x15a)](Sprite[_0x1f2382(0x433)]),Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x15e)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x309)]=function(_0x4f42ff){const _0x226add=_0x1f2382;this[_0x226add(0x4dc)]=_0x4f42ff,Sprite[_0x226add(0x433)][_0x226add(0x309)][_0x226add(0x49d)](this),this[_0x226add(0x297)](),this[_0x226add(0x44f)](),this[_0x226add(0x2a4)](),this[_0x226add(0x379)]();},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x297)]=function(){const _0x16f868=_0x1f2382;this[_0x16f868(0x176)]=this[_0x16f868(0x4dc)]['duration'],this[_0x16f868(0x507)]=this[_0x16f868(0x4dc)][_0x16f868(0x23d)],this['z']=0x6,this[_0x16f868(0x281)]=this[_0x16f868(0x4dc)][_0x16f868(0x3bc)][_0x16f868(0x325)],this[_0x16f868(0x281)]>0x0&&this[_0x16f868(0x281)]>=Math[_0x16f868(0x2aa)](this['_duration']*0.48)&&(this['_fadeInDuration']=Math[_0x16f868(0x2aa)](this['_duration']*0.48)),this['opacity']=this[_0x16f868(0x281)]>0x0?0x0:0xff,this[_0x16f868(0x1e5)]=this['_settings']['fadeDuration'][_0x16f868(0x492)],this[_0x16f868(0x1e5)]>0x0&&this[_0x16f868(0x1e5)]>=Math[_0x16f868(0x2aa)](this[_0x16f868(0x176)]*0.48)&&(this['_fadeOutDuration']=Math[_0x16f868(0x2aa)](this[_0x16f868(0x176)]*0.48)),this[_0x16f868(0x13e)]=this[_0x16f868(0x1e5)],this[_0x16f868(0x240)]=this['_settings'][_0x16f868(0x3a1)]['x'],this['_startY']=this[_0x16f868(0x4dc)]['startOffset']['y'],this['_targetX']=this['_settings'][_0x16f868(0x4e3)]['x'],this['_targetY']=this[_0x16f868(0x4dc)][_0x16f868(0x4e3)]['y'],this[_0x16f868(0x14a)]=this[_0x16f868(0x240)],this[_0x16f868(0x306)]=this['_startY'],this['_startScaleX']=this[_0x16f868(0x4dc)][_0x16f868(0x33f)]['x'],this[_0x16f868(0x1db)]=this[_0x16f868(0x4dc)]['startScale']['y'],this[_0x16f868(0x402)]=this[_0x16f868(0x4dc)]['endScale']['x'],this[_0x16f868(0x293)]=this[_0x16f868(0x4dc)]['endScale']['y'],this[_0x16f868(0x4cc)]=-this[_0x16f868(0x4dc)][_0x16f868(0x4e6)]['start'],this[_0x16f868(0xdd)]=-this[_0x16f868(0x4dc)][_0x16f868(0x4e6)][_0x16f868(0x41d)],this['_arcPeak']=-this[_0x16f868(0x4dc)][_0x16f868(0x10b)]['arc'],this[_0x16f868(0x2cf)]=0x0;},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x44f)]=function(){const _0x51eba9=_0x1f2382,_0x157b96=this[_0x51eba9(0x4dc)],_0x12b6ec=new Rectangle(0x0,0x0,Graphics[_0x51eba9(0x11a)],Graphics[_0x51eba9(0x408)]);this['_dummyWindow']=new Window_Base(_0x12b6ec);const _0xca139b=this['_dummyWindow'][_0x51eba9(0x162)](_0x157b96[_0x51eba9(0x437)]),_0x1580f3=_0xca139b[_0x51eba9(0x11a)],_0x389b69=_0xca139b[_0x51eba9(0x408)],_0x4dbf14=_0x1580f3+$gameSystem[_0x51eba9(0x476)]()*0x2,_0x2810c4=_0x389b69+$gameSystem['windowPadding']()*0x2;this[_0x51eba9(0x36c)][_0x51eba9(0x184)](0x0,0x0,_0x4dbf14,_0x2810c4),this[_0x51eba9(0x36c)][_0x51eba9(0x4a8)](),this['_dummyWindow'][_0x51eba9(0x3e0)](_0x157b96[_0x51eba9(0x437)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x2a4)]=function(){const _0x24038a=_0x1f2382;this[_0x24038a(0x3d5)]=new Sprite(),this[_0x24038a(0x3d5)][_0x24038a(0x3ac)]=this[_0x24038a(0x36c)][_0x24038a(0x460)],this[_0x24038a(0x3d5)][_0x24038a(0x12f)]['x']=0.5,this[_0x24038a(0x3d5)]['anchor']['y']=0.5,this[_0x24038a(0x3d5)]['x']=this['_startX'],this[_0x24038a(0x3d5)]['y']=this[_0x24038a(0x2cb)],this[_0x24038a(0x3d5)][_0x24038a(0x116)]['x']=this[_0x24038a(0x143)],this[_0x24038a(0x3d5)][_0x24038a(0x116)]['y']=this[_0x24038a(0x1db)],this[_0x24038a(0x3d5)][_0x24038a(0x4e6)]=this['_startAngle'],this['addChild'](this['_textSprite']);},Sprite_VisuMz_MessagePopup['prototype'][_0x1f2382(0x379)]=function(){const _0x20c620=_0x1f2382;Sprite[_0x20c620(0x433)][_0x20c620(0x379)][_0x20c620(0x49d)](this);if(!this[_0x20c620(0x215)]())return;this[_0x20c620(0x413)](),this['updateTextPosition'](),this['updateTextScale'](),this[_0x20c620(0x2c0)](),this[_0x20c620(0x3c5)](),this['updateDuration']();},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)]['canUpdate']=function(){return!!this['_textSprite'];},Sprite_VisuMz_MessagePopup['prototype'][_0x1f2382(0x413)]=function(){const _0x2cc6ea=_0x1f2382,_0x1493e1=this[_0x2cc6ea(0x4dc)];{const _0x39df73=$gameMap[_0x2cc6ea(0x109)](),_0x437cc5=_0x1493e1[_0x2cc6ea(0x536)]['x'],_0x54ddaf=$gameMap[_0x2cc6ea(0x4a6)](_0x437cc5);this['x']=Math[_0x2cc6ea(0x2aa)](_0x54ddaf*_0x39df73+_0x39df73/0x2);}{const _0xf206a3=$gameMap[_0x2cc6ea(0x488)](),_0x6650d8=_0x1493e1[_0x2cc6ea(0x536)]['y'],_0x1a857d=$gameMap[_0x2cc6ea(0x466)](_0x6650d8);this['y']=Math[_0x2cc6ea(0x2aa)](_0x1a857d*_0xf206a3+_0xf206a3);}},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x12b)]=function(){const _0x3b30e0=_0x1f2382;if(this[_0x3b30e0(0x176)]<=0x0)return;const _0x1247c5=this[_0x3b30e0(0x176)],_0x2ef386=this[_0x3b30e0(0x507)];{this[_0x3b30e0(0x14a)]=(this[_0x3b30e0(0x14a)]*(_0x1247c5-0x1)+this['_targetX'])/_0x1247c5,this[_0x3b30e0(0x306)]=(this[_0x3b30e0(0x306)]*(_0x1247c5-0x1)+this[_0x3b30e0(0x1bf)])/_0x1247c5;}{const _0x42b2c4=_0x2ef386-_0x1247c5,_0x15f96b=_0x2ef386/0x2,_0x9d35d3=this[_0x3b30e0(0x553)],_0x565dbf=-_0x9d35d3/Math[_0x3b30e0(0x4ac)](_0x15f96b,0x2);this[_0x3b30e0(0x2cf)]=_0x565dbf*Math[_0x3b30e0(0x4ac)](_0x42b2c4-_0x15f96b,0x2)+_0x9d35d3;}this['_textSprite']['x']=this['_offsetX'],this[_0x3b30e0(0x3d5)]['y']=this[_0x3b30e0(0x306)]+this['_currentArc'];},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x2b1)]=function(){const _0x446ecb=_0x1f2382;if(this[_0x446ecb(0x176)]<=0x0)return;const _0x33df5f=this['_duration'];this[_0x446ecb(0x3d5)][_0x446ecb(0x116)]['x']=(this[_0x446ecb(0x3d5)][_0x446ecb(0x116)]['x']*(_0x33df5f-0x1)+this['_targetScaleX'])/_0x33df5f,this[_0x446ecb(0x3d5)][_0x446ecb(0x116)]['y']=(this[_0x446ecb(0x3d5)][_0x446ecb(0x116)]['y']*(_0x33df5f-0x1)+this[_0x446ecb(0x293)])/_0x33df5f;},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x2c0)]=function(){const _0x151a4c=_0x1f2382;if(this[_0x151a4c(0x176)]<=0x0)return;const _0x5a0e0f=this['_duration'];this[_0x151a4c(0x3d5)][_0x151a4c(0x4e6)]=(this[_0x151a4c(0x3d5)][_0x151a4c(0x4e6)]*(_0x5a0e0f-0x1)+this[_0x151a4c(0xdd)])/_0x5a0e0f;},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x3c5)]=function(){const _0x17061d=_0x1f2382;this['updateFadeIn'](),this[_0x17061d(0x4e0)]();},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x149)]=function(){const _0xe3eb59=_0x1f2382;if(this[_0xe3eb59(0x281)]<=0x0)return;const _0x4293b0=this['_fadeInDuration'];this['opacity']=(this['opacity']*(_0x4293b0-0x1)+0xff)/_0x4293b0,this[_0xe3eb59(0x281)]--,this[_0xe3eb59(0x281)]<=0x0&&(this['opacity']=0xff);},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x4e0)]=function(){const _0x1159f2=_0x1f2382;if(this[_0x1159f2(0x1e5)]<=0x0)return;if(this[_0x1159f2(0x176)]>this['_fadeOutStart'])return;const _0x31a64a=this[_0x1159f2(0x1e5)];this[_0x1159f2(0x569)]=(this[_0x1159f2(0x569)]*(_0x31a64a-0x1)+0x0)/_0x31a64a,this[_0x1159f2(0x1e5)]--,this[_0x1159f2(0x1e5)]<=0x0&&(this[_0x1159f2(0x569)]=0x0);},Sprite_VisuMz_MessagePopup[_0x1f2382(0x433)][_0x1f2382(0x2ad)]=function(){const _0x5c7ffa=_0x1f2382;if(this[_0x5c7ffa(0x176)]<=0x0)return;this['_duration']--;if(this['_duration']<=0x0){if(this[_0x5c7ffa(0x34d)])this[_0x5c7ffa(0x34d)][_0x5c7ffa(0x41c)](this);this[_0x5c7ffa(0x3d5)][_0x5c7ffa(0x3ac)]&&this[_0x5c7ffa(0x3d5)][_0x5c7ffa(0x3ac)]['destroy']();}},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x39a)]=Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x27a)],Spriteset_Map[_0x1f2382(0x433)]['createLowerLayer']=function(){const _0xf0cca9=_0x1f2382;VisuMZ[_0xf0cca9(0x4a7)][_0xf0cca9(0x39a)]['call'](this),this[_0xf0cca9(0x2e0)]();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x395)]=Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x489)],Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x489)]=function(){const _0x204e27=_0x1f2382;VisuMZ[_0x204e27(0x4a7)][_0x204e27(0x395)][_0x204e27(0x49d)](this),this[_0x204e27(0x267)]();},Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x267)]=function(){const _0x57e98f=_0x1f2382;if(!VisuMZ[_0x57e98f(0x4a7)][_0x57e98f(0x196)][_0x57e98f(0x1c6)][_0x57e98f(0x360)])return;for(const _0x1a7eb2 of this[_0x57e98f(0x2cd)]){this['createCharacterShadow'](_0x1a7eb2);}},Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x341)]=function(_0x22fe0c){const _0x48092b=_0x1f2382;_0x22fe0c[_0x48092b(0x417)]=new Sprite(),_0x22fe0c['_shadowSprite'][_0x48092b(0x3fe)]=_0x22fe0c[_0x48092b(0x4ec)]['shadowFilename'](),_0x22fe0c[_0x48092b(0x417)][_0x48092b(0x3ac)]=ImageManager[_0x48092b(0x276)](_0x22fe0c[_0x48092b(0x417)][_0x48092b(0x3fe)]),_0x22fe0c[_0x48092b(0x417)][_0x48092b(0x12f)]['x']=0.5,_0x22fe0c[_0x48092b(0x417)][_0x48092b(0x12f)]['y']=0x1,_0x22fe0c[_0x48092b(0x417)]['z']=0x0,this[_0x48092b(0x51e)][_0x48092b(0x46c)](_0x22fe0c[_0x48092b(0x417)]);},Spriteset_Map['prototype']['hideShadows']=function(){const _0x53c41d=_0x1f2382;if(!VisuMZ[_0x53c41d(0x4a7)][_0x53c41d(0x196)][_0x53c41d(0x1c6)]['ShowShadows'])return;for(const _0x1b54da of this['_characterSprites']){this[_0x53c41d(0x51e)][_0x53c41d(0x41c)](_0x1b54da[_0x53c41d(0x417)]);}},Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x2e0)]=function(){const _0x22b38a=_0x1f2382;this[_0x22b38a(0x10e)]=[];for(const _0x50ad7a of $gameMap[_0x22b38a(0x252)]()){this[_0x22b38a(0x480)](_0x50ad7a);}},Spriteset_Map['MOBILE_EVENT_LABELS']=VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x196)][_0x1f2382(0x418)][_0x1f2382(0x52c)]??!![],Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x480)]=function(_0x418f58){const _0x38c8a4=_0x1f2382;if(!this[_0x38c8a4(0x266)](_0x418f58))return;if(Utils[_0x38c8a4(0x44d)]()){if(!Spriteset_Map['MOBILE_EVENT_LABELS'])return;}let _0xc12aa0;const _0x390d6d=VisuMZ[_0x38c8a4(0x4a7)][_0x38c8a4(0x196)][_0x38c8a4(0x418)][_0x38c8a4(0x19a)]??!![];_0xc12aa0=_0x390d6d?new Sprite_EventLabel(_0x418f58):new Window_EventLabel(_0x418f58),_0xc12aa0['z']=0x8,_0xc12aa0['spriteId']=Sprite[_0x38c8a4(0x481)]++,this['_tilemap'][_0x38c8a4(0x46c)](_0xc12aa0),this[_0x38c8a4(0x10e)][_0x38c8a4(0x193)](_0xc12aa0);},Spriteset_Map[_0x1f2382(0x433)]['isTargetEventValidForLabelWindow']=function(_0x21ea4b){const _0x2364f9=_0x1f2382,_0x233347=_0x21ea4b['event']();if(_0x233347[_0x2364f9(0x2ce)][_0x2364f9(0x4e7)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x233347[_0x2364f9(0x2ce)][_0x2364f9(0x4e7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x2d352d of _0x233347[_0x2364f9(0x3ad)]){let _0x5a8980='';for(const _0xb80484 of _0x2d352d[_0x2364f9(0x4d6)]){[0x6c,0x198][_0x2364f9(0x48f)](_0xb80484[_0x2364f9(0xc9)])&&(_0x5a8980+=_0xb80484[_0x2364f9(0x1fc)][0x0]);}if(_0x5a8980[_0x2364f9(0x4e7)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5a8980[_0x2364f9(0x4e7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x3cc)]=function(_0x4c65e9){const _0xd84af5=_0x1f2382;this['_characterSprites']=this['_characterSprites']||[];const _0x3d3e32=new Sprite_Character(_0x4c65e9);this[_0xd84af5(0x2cd)][_0xd84af5(0x193)](_0x3d3e32),this['_tilemap'][_0xd84af5(0x46c)](_0x3d3e32),this['createCharacterShadow'](_0x3d3e32),this[_0xd84af5(0x480)](_0x4c65e9),_0x3d3e32[_0xd84af5(0x379)]();},Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x1a0)]=function(){const _0x45406a=_0x1f2382;if(!this[_0x45406a(0x10e)])return;for(const _0x56fe1c of this[_0x45406a(0x10e)]){_0x56fe1c&&(_0x56fe1c[_0x45406a(0x3df)]=undefined,_0x56fe1c[_0x45406a(0xc6)]());}},Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x164)]=function(_0x550fe6,_0x3b3355){const _0x369e25=_0x1f2382;if(!_0x550fe6)return;_0x3b3355['tileCoordinates']={'x':_0x550fe6['x'],'y':_0x550fe6['y']},this[_0x369e25(0x1a2)](_0x3b3355);},Spriteset_Map[_0x1f2382(0x433)][_0x1f2382(0x1a2)]=function(_0x1f16f9){const _0x18de06=_0x1f2382;if(!this[_0x18de06(0x51e)])return;const _0x43e8b4=new Sprite_VisuMz_MessagePopup(_0x1f16f9);this['_tilemap'][_0x18de06(0x46c)](_0x43e8b4);},VisuMZ[_0x1f2382(0x4a7)]['Game_Message_setNumberInput']=Game_Message[_0x1f2382(0x433)][_0x1f2382(0x204)],Game_Message[_0x1f2382(0x433)][_0x1f2382(0x204)]=function(_0x1245cb,_0x5c63ad){const _0x155b83=_0x1f2382;this['_selfTargetNumberInput']=$gameTemp[_0x155b83(0x2ea)](),VisuMZ[_0x155b83(0x4a7)]['Game_Message_setNumberInput'][_0x155b83(0x49d)](this,_0x1245cb,_0x5c63ad);},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x527)]=Window_NumberInput[_0x1f2382(0x433)][_0x1f2382(0x36e)],Window_NumberInput['prototype'][_0x1f2382(0x36e)]=function(){const _0x13d603=_0x1f2382;$gameTemp[_0x13d603(0x394)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x13d603(0x4a7)][_0x13d603(0x527)][_0x13d603(0x49d)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x27c)]=Window_NumberInput[_0x1f2382(0x433)][_0x1f2382(0x121)],Window_NumberInput[_0x1f2382(0x433)][_0x1f2382(0x121)]=function(){const _0x4ecbc6=_0x1f2382;$gameTemp[_0x4ecbc6(0x394)]($gameMessage[_0x4ecbc6(0x4ba)]),VisuMZ[_0x4ecbc6(0x4a7)][_0x4ecbc6(0x27c)][_0x4ecbc6(0x49d)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x4ecbc6(0x4ba)]=undefined;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x3dd)]=Game_Message[_0x1f2382(0x433)][_0x1f2382(0x36b)],Game_Message['prototype']['setItemChoice']=function(_0x11853a,_0x1fc615){const _0x168955=_0x1f2382;this[_0x168955(0x171)]=$gameTemp[_0x168955(0x2ea)](),VisuMZ['EventsMoveCore']['Game_Message_setItemChoice']['call'](this,_0x11853a,_0x1fc615);},VisuMZ['EventsMoveCore'][_0x1f2382(0x23a)]=Window_EventItem[_0x1f2382(0x433)][_0x1f2382(0x22d)],Window_EventItem[_0x1f2382(0x433)][_0x1f2382(0x22d)]=function(){const _0xfb10ec=_0x1f2382;$gameTemp[_0xfb10ec(0x394)]($gameMessage[_0xfb10ec(0x171)]),VisuMZ[_0xfb10ec(0x4a7)][_0xfb10ec(0x23a)][_0xfb10ec(0x49d)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0xfb10ec(0x171)]=undefined;},VisuMZ[_0x1f2382(0x4a7)][_0x1f2382(0x2b5)]=Window_EventItem[_0x1f2382(0x433)]['onCancel'],Window_EventItem[_0x1f2382(0x433)][_0x1f2382(0x598)]=function(){const _0x52c61d=_0x1f2382;$gameTemp['registerSelfTarget']($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x52c61d(0x4a7)][_0x52c61d(0x2b5)]['call'](this),$gameTemp[_0x52c61d(0x46a)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ['EventsMoveCore']['Window_Message_startMessage']=Window_Message[_0x1f2382(0x433)][_0x1f2382(0x21d)],Window_Message['prototype'][_0x1f2382(0x21d)]=function(){const _0x511945=_0x1f2382;$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore'][_0x511945(0x2c3)][_0x511945(0x49d)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x1f2382(0x4a7)]['Window_ScrollText_startMessage']=Window_ScrollText['prototype'][_0x1f2382(0x21d)],Window_ScrollText[_0x1f2382(0x433)]['startMessage']=function(){const _0x611711=_0x1f2382;$gameMessage[_0x611711(0x177)](),VisuMZ['EventsMoveCore'][_0x611711(0x46f)][_0x611711(0x49d)](this),$gameTemp[_0x611711(0x46a)]();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel[_0x1f2382(0x433)]=Object[_0x1f2382(0x15a)](Window_Base['prototype']),Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x15e)]=Window_EventLabel,Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x309)]=function(_0xa8a28){const _0x2fff37=_0x1f2382;this[_0x2fff37(0x387)]=_0xa8a28;const _0x22d786=new Rectangle(0x0,0x0,Graphics[_0x2fff37(0x4c6)]/0x4,this[_0x2fff37(0x363)](0x1));this['initMembers'](),Window_Base['prototype'][_0x2fff37(0x309)][_0x2fff37(0x49d)](this,_0x22d786),this[_0x2fff37(0x43d)]=0x0,this['setBackgroundType'](0x2),this[_0x2fff37(0x42e)]='';},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x297)]=function(){const _0x22dfbf=_0x1f2382;this[_0x22dfbf(0x2a3)]=![],this[_0x22dfbf(0x450)]=$gameScreen[_0x22dfbf(0x4c8)](),this[_0x22dfbf(0x2a7)]=this[_0x22dfbf(0x387)][_0x22dfbf(0x32d)](),this[_0x22dfbf(0x3bd)]=this['_event'][_0x22dfbf(0x49c)](),this[_0x22dfbf(0x1aa)]=this[_0x22dfbf(0x387)][_0x22dfbf(0x288)]['offsetX'],this[_0x22dfbf(0x209)]=this[_0x22dfbf(0x387)][_0x22dfbf(0x288)][_0x22dfbf(0x4bb)],this[_0x22dfbf(0x372)]=this['_event'][_0x22dfbf(0x51c)],this[_0x22dfbf(0x188)]=this['isLabelVisible'](),this[_0x22dfbf(0x311)]=$gameSystem[_0x22dfbf(0x47c)](),this['_visiblePlayerX']=$gamePlayer['x'],this[_0x22dfbf(0x579)]=$gamePlayer['y'],this[_0x22dfbf(0x192)]=this[_0x22dfbf(0x387)]['x'],this['_visibleEventY']=this[_0x22dfbf(0x387)]['y'];},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x379)]=function(){const _0x25ed1d=_0x1f2382;Window_Base[_0x25ed1d(0x433)][_0x25ed1d(0x379)][_0x25ed1d(0x49d)](this);if(!this[_0x25ed1d(0x29a)]())return;this['updateText'](),this[_0x25ed1d(0x4d5)](),this[_0x25ed1d(0x4a3)](),this[_0x25ed1d(0x3c5)]();},Window_EventLabel['prototype'][_0x1f2382(0x29a)]=function(){const _0x4e70a6=_0x1f2382;if(!this['_event'])return![];if(!this['_event'][_0x4e70a6(0x288)])return![];if(this[_0x4e70a6(0x372)]!==this['_event'][_0x4e70a6(0x51c)])return!![];if(this['_event'][_0x4e70a6(0x2fc)]&&!this[_0x4e70a6(0x2a3)])return!![];if(this[_0x4e70a6(0x387)][_0x4e70a6(0x288)][_0x4e70a6(0x437)]==='')return![];if(this['_screenZoomScale']!==$gameScreen[_0x4e70a6(0x4c8)]())return!![];if(this[_0x4e70a6(0x2a7)]!==this['_event']['screenX']())return!![];if(this[_0x4e70a6(0x3bd)]!==this[_0x4e70a6(0x387)]['screenY']())return!![];if(this[_0x4e70a6(0x1aa)]!==this['_event']['_labelWindow'][_0x4e70a6(0x2c6)])return!![];if(this[_0x4e70a6(0x209)]!==this[_0x4e70a6(0x387)][_0x4e70a6(0x288)]['offsetY'])return!![];if(this[_0x4e70a6(0x3df)]!==$gamePlayer['x'])return!![];if(this[_0x4e70a6(0x579)]!==$gamePlayer['y'])return!![];if(this[_0x4e70a6(0x192)]!==this[_0x4e70a6(0x387)]['x'])return!![];if(this[_0x4e70a6(0x456)]!==this[_0x4e70a6(0x387)]['y'])return!![];if(this[_0x4e70a6(0x311)]!==$gameSystem[_0x4e70a6(0x47c)]())return!![];if(this[_0x4e70a6(0x188)]&&this['contentsOpacity']<0xff)return!![];if(!this[_0x4e70a6(0x188)]&&this[_0x4e70a6(0x43d)]>0x0)return!![];if(SceneManager['_scene'][_0x4e70a6(0x28d)]>0x0)return!![];return![];},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x366)]=function(){const _0x268dc8=_0x1f2382;this[_0x268dc8(0x387)][_0x268dc8(0x474)]()!==this[_0x268dc8(0x42e)]&&(this['_text']=this[_0x268dc8(0x387)][_0x268dc8(0x474)](),this[_0x268dc8(0xc6)]());},Window_EventLabel[_0x1f2382(0x433)]['updateScale']=function(){const _0x145e8a=_0x1f2382;this[_0x145e8a(0x116)]['x']=0x1/$gameScreen[_0x145e8a(0x4c8)](),this[_0x145e8a(0x116)]['y']=0x1/$gameScreen[_0x145e8a(0x4c8)](),this[_0x145e8a(0x450)]=$gameScreen[_0x145e8a(0x4c8)]();},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x4a3)]=function(){const _0x14f15d=_0x1f2382;if(!SceneManager[_0x14f15d(0x4c5)])return;if(!SceneManager[_0x14f15d(0x4c5)]['_spriteset'])return;const _0x5920e3=SceneManager[_0x14f15d(0x4c5)]['_spriteset'][_0x14f15d(0x544)](this[_0x14f15d(0x387)]);if(!_0x5920e3)return;this['x']=Math['round'](this[_0x14f15d(0x387)]['screenX']()-Math[_0x14f15d(0x2aa)](this[_0x14f15d(0x11a)]*this[_0x14f15d(0x116)]['x']/0x2)),this['x']+=this[_0x14f15d(0x387)]['_labelWindow'][_0x14f15d(0x2c6)],this['y']=this['_event'][_0x14f15d(0x49c)]()-_0x5920e3[_0x14f15d(0x408)],this['y']+=Math[_0x14f15d(0x49e)]($gameSystem[_0x14f15d(0x476)]()*0.5),this['y']-=Math[_0x14f15d(0x49e)](this[_0x14f15d(0x408)]*this[_0x14f15d(0x116)]['y']),this['y']+=this[_0x14f15d(0x387)][_0x14f15d(0x288)]['offsetY'],this[_0x14f15d(0x2a3)]=this[_0x14f15d(0x387)][_0x14f15d(0x2fc)],this['_eventScreenX']=this[_0x14f15d(0x387)][_0x14f15d(0x32d)](),this[_0x14f15d(0x3bd)]=this[_0x14f15d(0x387)][_0x14f15d(0x49c)](),this[_0x14f15d(0x1aa)]=this['_event'][_0x14f15d(0x288)]['offsetX'],this[_0x14f15d(0x209)]=this[_0x14f15d(0x387)][_0x14f15d(0x288)][_0x14f15d(0x4bb)],this['_eventPageIndex']=this[_0x14f15d(0x387)][_0x14f15d(0x51c)],this['_eventErased']&&(this['contentsOpacity']=0x0);},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x3c5)]=function(){const _0x35855e=_0x1f2382;if(this[_0x35855e(0x40b)]())this[_0x35855e(0x43d)]+=this[_0x35855e(0x531)]();else SceneManager[_0x35855e(0x4c5)][_0x35855e(0x28d)]>0x0?this[_0x35855e(0x43d)]=0x0:this['contentsOpacity']-=this[_0x35855e(0x531)]();},Window_EventLabel['prototype'][_0x1f2382(0x40b)]=function(){const _0x9e5677=_0x1f2382;if(!$gameSystem[_0x9e5677(0x47c)]())return![];if(this[_0x9e5677(0x387)]?.[_0x9e5677(0x2fc)])return![];if(SceneManager[_0x9e5677(0x4c5)][_0x9e5677(0x28d)]>0x0)return![];const _0x5fed6d=$gamePlayer['x'],_0x2bb7c0=$gamePlayer['y'],_0x4a3d0a=this[_0x9e5677(0x387)]['x'],_0x558e3c=this[_0x9e5677(0x387)]['y'];if(this[_0x9e5677(0x3df)]===_0x5fed6d&&this[_0x9e5677(0x579)]===_0x2bb7c0&&this[_0x9e5677(0x192)]===_0x4a3d0a&&this[_0x9e5677(0x456)]===_0x558e3c)return this['_cacheVisibility'];this[_0x9e5677(0x3df)]=$gamePlayer['x'],this[_0x9e5677(0x579)]=$gamePlayer['y'],this[_0x9e5677(0x192)]=this[_0x9e5677(0x387)]['x'],this[_0x9e5677(0x456)]=this[_0x9e5677(0x387)]['y'];if(!VisuMZ['EventsMoveCore'][_0x9e5677(0xe5)](this['_event']))return this[_0x9e5677(0x188)]=![],![];return this[_0x9e5677(0x188)]=!![],!![];},Window_EventLabel['prototype'][_0x1f2382(0x531)]=function(){const _0x50d9d3=_0x1f2382;return VisuMZ[_0x50d9d3(0x4a7)][_0x50d9d3(0x196)][_0x50d9d3(0x418)][_0x50d9d3(0x43a)];},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x329)]=function(){const _0x2df074=_0x1f2382,_0x13f863=this[_0x2df074(0x162)](this[_0x2df074(0x42e)]);this[_0x2df074(0x11a)]=_0x13f863[_0x2df074(0x11a)]+($gameSystem['windowPadding']()+this[_0x2df074(0x38a)]())*0x2,this[_0x2df074(0x408)]=Math[_0x2df074(0x238)](this[_0x2df074(0x12d)](),_0x13f863[_0x2df074(0x408)])+$gameSystem[_0x2df074(0x476)]()*0x2,this['createContents']();},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x12d)]=function(){const _0x5e96cf=_0x1f2382;return VisuMZ['EventsMoveCore'][_0x5e96cf(0x196)][_0x5e96cf(0x418)][_0x5e96cf(0x3b9)];},Window_EventLabel['prototype'][_0x1f2382(0x45e)]=function(){const _0x139a6f=_0x1f2382;Window_Base[_0x139a6f(0x433)]['resetFontSettings'][_0x139a6f(0x49d)](this),this[_0x139a6f(0x460)][_0x139a6f(0x230)]=this[_0x139a6f(0x35a)]();},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x35a)]=function(){const _0x215f70=_0x1f2382;return VisuMZ[_0x215f70(0x4a7)]['Settings'][_0x215f70(0x418)][_0x215f70(0x53f)];},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0xc6)]=function(){const _0x3e1207=_0x1f2382;this[_0x3e1207(0x329)](),this[_0x3e1207(0x460)][_0x3e1207(0x118)]();const _0xa9a523=this[_0x3e1207(0x42e)][_0x3e1207(0x469)](/[\r\n]+/);let _0x5e7b26=0x0;for(const _0x188ddd of _0xa9a523){const _0x301294=this[_0x3e1207(0x162)](_0x188ddd),_0x3d0ba1=Math[_0x3e1207(0x2aa)]((this['innerWidth']-_0x301294['width'])/0x2);this['drawTextEx'](_0x188ddd,_0x3d0ba1,_0x5e7b26),_0x5e7b26+=_0x301294['height'];}},Window_EventLabel['prototype'][_0x1f2382(0x2bd)]=function(_0x13aa78,_0x105181){const _0x37777e=_0x1f2382;_0x105181[_0x37777e(0x22b)]&&this[_0x37777e(0x43b)](_0x13aa78,_0x105181['x']+0x2,_0x105181['y']),_0x105181['x']+=Math[_0x37777e(0x57e)](this[_0x37777e(0x1fa)](),ImageManager[_0x37777e(0x4ae)])+0x4;},Window_EventLabel[_0x1f2382(0x433)][_0x1f2382(0x43b)]=function(_0x214f42,_0xe3ca1d,_0x38e671){const _0x244bb8=_0x1f2382,_0x2c0be8=ImageManager['loadSystem'](_0x244bb8(0x411)),_0x318ef1=ImageManager['iconWidth'],_0x3ffa98=ImageManager[_0x244bb8(0x321)],_0x3ed6b9=_0x214f42%0x10*_0x318ef1,_0x5a4d40=Math[_0x244bb8(0x2aa)](_0x214f42/0x10)*_0x3ffa98,_0x27fac3=Math['min'](this[_0x244bb8(0x1fa)]()),_0x3203c1=Math[_0x244bb8(0x57e)](this[_0x244bb8(0x1fa)]());this[_0x244bb8(0x460)][_0x244bb8(0x576)](_0x2c0be8,_0x3ed6b9,_0x5a4d40,_0x318ef1,_0x3ffa98,_0xe3ca1d,_0x38e671,_0x27fac3,_0x3203c1);},Window_EventLabel[_0x1f2382(0x433)]['iconSize']=function(){const _0x39c64a=_0x1f2382;return VisuMZ['EventsMoveCore'][_0x39c64a(0x196)][_0x39c64a(0x418)][_0x39c64a(0x1f4)];};