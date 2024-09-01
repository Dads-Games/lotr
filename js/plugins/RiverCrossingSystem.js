/*:
 * @plugindesc Allows players to cross rivers with a canoe, disembark on any land, and manages followers
 * @author DadsGames
 *
 * @param CanoeItemID
 * @desc The ID of the item that represents the canoe
 * @default 100
 *
 * @param RiverTerrainTag
 * @desc The terrain tag used for river tiles
 * @default 1
 *
 * @param BoatCharacterName
 * @desc The character image name for the boat sprite
 * @default Boat
 *
 * @param BoatCharacterIndex
 * @desc The index of the boat character in the character sheet
 * @default 0
 */

(function() {
    // Load plugin parameters
    var parameters = PluginManager.parameters('RiverCrossingSystem');
    var canoeItemId = Number(parameters['CanoeItemID'] || 100);
    var riverTerrainTag = Number(parameters['RiverTerrainTag'] || 7);
    var boatCharacterName = String(parameters['BoatCharacterName'] || 'Vehicle');
    var boatCharacterIndex = Number(parameters['BoatCharacterIndex'] || 0);


    var _Game_Player_canPass = Game_Player.prototype.canPass;
    Game_Player.prototype.canPass = function(x, y, d) {
        var newX = $gameMap.roundXWithDirection(x, d);
        var newY = $gameMap.roundYWithDirection(y, d);
        var currentTerrainTag = $gameMap.terrainTag(this.x, this.y);
        var newTerrainTag = $gameMap.terrainTag(newX, newY);
        var conoeable = isConoeable(newX, newY)
        showme(newX, newY);
        console.log($gamePlayer.isInShip())
        if (currentTerrainTag === riverTerrainTag && newTerrainTag !== riverTerrainTag && newTerrainTag == riverTerrainTag + 2 && conoeable) {

            // Behavior: Exiting the river
            // - Restore original character appearance
            // - Show followers
            // - Allow movement
            this.setImage(this._originalCharacterName, this._originalCharacterIndex);
            this._inCanoe = false;
            this.showFollowers1();
            $gamePlayer.showFollowers();
            $gamePlayer.refresh();
            return true;
        } else if (newTerrainTag === riverTerrainTag && conoeable) {
            // Behavior: Attempting to enter river
            if ($gameParty.hasItem($dataItems[canoeItemId]) && $gamePlayer.isInShip() == false) {
                // Player has canoe item
                if (!this._inCanoe) {
                    // Behavior: Entering the river for the first time
                    // - Store original character appearance
                    // - Change to boat sprite
                    // - Hide followers
                    this._originalCharacterName = this._characterName;
                    this._originalCharacterIndex = this._characterIndex;
                    this._inCanoe = true;

                    //this.hideFollowers();
                    $gamePlayer.hideFollowers();
                    $gamePlayer.refresh();
                    this.setImage(boatCharacterName, boatCharacterIndex);
                }
                // Allow movement on river
                return true;
            } else {
                // Behavior: Attempt to enter river without canoe
                // - Display message
                // - Block movement
                //$gameMessage.add("You need a canoe to cross the river.");
                return false;
            }
        }
        // Default behavior for non-river tiles
        return _Game_Player_canPass.call(this, x, y, d);
    };

    var _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.call(this);
        // Initialize canoe-related properties
        this._inCanoe = false;
        this._originalCharacterName = '';
        this._originalCharacterIndex = 0;
    };

    var _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        // Behavior: Continuous check for exiting river
        // This handles cases where the player might end up on non-river tile
        // without going through the normal exit process (e.g., via events)
        if ($gameMap.terrainTag(this.x, this.y) !== riverTerrainTag && this._inCanoe) {
            this.setImage(this._originalCharacterName, this._originalCharacterIndex);
            this._inCanoe = false;
            this.warpFollowers();

            $gamePlayer.showFollowers();
            $gamePlayer.refresh();
        }
    };

    Game_Player.prototype.warpFollowers = function() {
        // Behavior: Hide followers when entering canoe
        // - Make followers invisible
        // - Make followers passable
        // - Move followers to player's position
        var followers = this.followers().visibleFollowers();
        for (var i = 0; i < followers.length; i++) {
            var follower = followers[i];
            if (follower) {

                follower.setPosition(this.x, this.y);
            }
        }
        this.refresh();
    };
    showme = function(x, y){
        //console.log($gamePlayer.x + " " + x);
        //console.log($gamePlayer.y + " " + y);
        //console.log('---------------------------------------')
        

        var conoeable = isConoeable(x, y);  // Check if all layers are blank

        //console.log("isConoeable?: ", conoeable);  // Log the result for debugging

        //console.log('---------------------------------------')

    }
    // Function to check if a specific layer is blank (no tile present)
    function isLayerBlank(tileId) {
        return tileId === 0; // Typically, a tile ID of 0 means no tile is present
    }

    // Function to get tile IDs for all layers at a given coordinate
    function getTileDataAt(x, y) {
        // Retrieve all tile IDs for the specified coordinates
        var tileIds = $gameMap.layeredTiles(x, y);
        //console.log("LAYER DATA: " + $gameMap.layeredTiles(x, y));
        
        // Check if the tileIds array is defined and has the expected number of layers
        if (Array.isArray(tileIds) && tileIds.length >= 4) {
            return {
                lowerLayer: tileIds[3], // Layer 0 (lower layer)
                upperLayer: tileIds[2], // Layer 1 (upper layer)
                shadowLayer1: tileIds[1], // Layer 2 (shadow layer 1)
                shadowLayer2: tileIds[0] // Layer 3 (shadow layer 2)
            };
        }
        return {
            lowerLayer: 0,
            upperLayer: 0,
            shadowLayer1: 0,
            shadowLayer2: 0
        };
    }

    // Function to check if all layers at a given coordinate are blank
    function isConoeable(x, y) {
        var tileData = getTileDataAt(x, y); // Get tile data for all layers at the given coordinates

        return isLayerBlank(tileData.upperLayer) &&
            isLayerBlank(tileData.shadowLayer1) &&
            isLayerBlank(tileData.shadowLayer2);
    }

    Game_Player.prototype.showFollowers1 = function() {

        // Behavior: Show followers when exiting canoe
        // - Make followers visible
        // - Make followers impassable
        // - Position followers at player's location
        var followers = this.followers()._data;

        for (var i = 0; i < followers.length; i++) {

            var follower = followers[i];

            if (follower) {
                // follower.setOpacity(255);
                // $gamePlayer.setOpacity(255);
                // follower.setThrough(false);
                var direction = $gamePlayer.getInputDirection();
                var spotX = this.x;
                var spotY = this.y;
                if (direction == 2){ //down
                    spotY++;
                }
                if (direction == 4){ //left
                    spotX--;
                }
                if (direction == 6){ // right
                    spotX++;
                }
                if (direction == 8){ //up
                    spotY--;
                }
                follower.setPosition(spotX, spotY);
            }
        }
        this.refresh();
    };

    // Override follower movement
    var _Game_Follower_chaseCharacter = Game_Follower.prototype.chaseCharacter;
    Game_Follower.prototype.chaseCharacter = function(character) {
        // Behavior: Prevent followers from moving when in canoe
        if ($gamePlayer._inCanoe) return;
        _Game_Follower_chaseCharacter.call(this, character);
    };
})();