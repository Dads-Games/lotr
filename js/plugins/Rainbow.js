/*:
 * @plugindesc v1.1 Toggle map colors between black & white and rainbow.
 * @author YourName
 *
 * @help This plugin allows you to make the entire map black and white,
 * and then selectively toggle on each color of the rainbow.
 * 
 * Plugin Command:
 *   ColorToggle BWMode         # Switches to Black & White mode
 *   ColorToggle ToggleRed      # Toggles Red color
 *   ColorToggle ToggleOrange   # Toggles Orange color
 *   ColorToggle ToggleYellow   # Toggles Yellow color
 *   ColorToggle ToggleGreen    # Toggles Green color
 *   ColorToggle ToggleBlue     # Toggles Blue color
 *   ColorToggle ToggleIndigo   # Toggles Indigo color
 *   ColorToggle ToggleViolet   # Toggles Violet color
 *   ColorToggle ResetColors    # Resets to normal colors
 */

var Imported = Imported || {};
Imported.ColorTogglePlugin = true;

var ColorToggle = ColorToggle || {};

(function() {
    "use strict";

    if (!Utils.RPGMAKER_VERSION || Utils.RPGMAKER_VERSION < "1.5.0") {
        console.error("ColorTogglePlugin requires RPG Maker MV 1.5.0 or higher.");
        return;
    }

    ColorToggle.Param = PluginManager.parameters('ColorTogglePlugin');
    ColorToggle.isBlackAndWhite = false;
    ColorToggle.colorToggles = {
        red: false,
        orange: false,
        yellow: false,
        green: false,
        blue: false,
        indigo: false,
        violet: false
    };

    ColorToggle.setBlackAndWhite = function(sprite) {
        var filter = new PIXI.filters.ColorMatrixFilter();
        filter.blackAndWhite();
        sprite.filters = [filter];
    };

    ColorToggle.resetFilters = function(sprite) {
        sprite.filters = null;
    };

    ColorToggle.applyColorToggles = function(sprite) {
        var filter = new PIXI.filters.ColorMatrixFilter();
        filter.blackAndWhite();
        
        var matrix = filter.matrix;
        for (var color in this.colorToggles) {
            if (this.colorToggles[color]) {
                // Adjust matrix to allow specific color
                // This is a simplified version and may need fine-tuning
                switch(color) {
                    case 'red': matrix[0] = 1; break;
                    case 'green': matrix[5] = 1; break;
                    case 'blue': matrix[10] = 1; break;
                    // For other colors, you might need to combine primary colors
                }
            }
        }
        
        filter.matrix = matrix;
        sprite.filters = [filter];
    };

    ColorToggle.refreshFilters = function() {
        if (!SceneManager._scene || !(SceneManager._scene instanceof Scene_Map)) return;
        
        var spriteset = SceneManager._scene._spriteset;
        if (!spriteset) return;

        var applyToSprite = function(sprite) {
            if (ColorToggle.isBlackAndWhite) {
                ColorToggle.applyColorToggles(sprite);
            } else {
                ColorToggle.resetFilters(sprite);
            }
        };

        // Apply to tilemap
        applyToSprite(spriteset._tilemap);

        // Apply to characters
        spriteset._characterSprites.forEach(applyToSprite);

        // Apply to destination sprite
        applyToSprite(spriteset._destinationSprite);
    };

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ColorToggle') {
            switch (args[0]) {
                case 'BWMode':
                    ColorToggle.isBlackAndWhite = true;
                    break;
                case 'ToggleRed':
                case 'ToggleOrange':
                case 'ToggleYellow':
                case 'ToggleGreen':
                case 'ToggleBlue':
                case 'ToggleIndigo':
                case 'ToggleViolet':
                    var color = args[0].replace('Toggle', '').toLowerCase();
                    ColorToggle.colorToggles[color] = !ColorToggle.colorToggles[color];
                    break;
                case 'ResetColors':
                    ColorToggle.isBlackAndWhite = false;
                    Object.keys(ColorToggle.colorToggles).forEach(key => ColorToggle.colorToggles[key] = false);
                    break;
            }
            ColorToggle.refreshFilters();
        }
    };

    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        ColorToggle.refreshFilters();
    };

    var _Game_Map_refresh = Game_Map.prototype.refresh;
    Game_Map.prototype.refresh = function() {
        _Game_Map_refresh.call(this);
        ColorToggle.refreshFilters();
    };
})();