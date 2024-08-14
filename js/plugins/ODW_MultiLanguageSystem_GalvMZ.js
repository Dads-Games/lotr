//=============================================================================
// Open Digital World - Multi-Language System Plugin - Galv MZ Patch
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] - Patch for Galv MZ plugins.
 * @author Open Digital World
 * @url https://opendigitalworld.itch.io/rmmz-plugin-multi-language-system
 * @orderAfter ODW_MultiLanguageSystem
 * @orderAfter GALV_MessageStylesMZ
 * 
 * @help
 *-----------------------------------------------------------------------------
 * Open Digital World - Multi-Language System Plugin - Galv MZ Patch
 *-----------------------------------------------------------------------------
 * 
 * Plugin that corrects conflicts detected with Galv MZ plugins.
 * 
 * Compatibility:
 *   - ODW_MultiLanguageSystem v1.1.0+
 *   - GALV_MessageStylesMZ v2.1+
 * 
 *-----------------------------------------------------------------------------
 * How to use
 *-----------------------------------------------------------------------------
 * 
 * Plug & play plugin to be installed in the right order into the list of
 * plugins. No further action required.
 * 
 *-----------------------------------------------------------------------------
 * Known incompatibilities with other plugins
 *-----------------------------------------------------------------------------
 * 
 * In principle, none.
 * 
 *-----------------------------------------------------------------------------
 * Support and feedbacks
 *-----------------------------------------------------------------------------
 * 
 * For plugin support, please join us here:
 * 
 * https://forums.rpgmakerweb.com/index.php?threads/odw-multi-language-system-plugin.141442/
 * 
 *-----------------------------------------------------------------------------
 * Version history
 *-----------------------------------------------------------------------------
 * 
 * 25.05.2024 v1.0.0
 *   - Initial release.
 * 
 *-----------------------------------------------------------------------------
 * Terms of use - MIT License
 *-----------------------------------------------------------------------------
 * 
 * Copyright (c) 2024 Open Digital World
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 *-----------------------------------------------------------------------------
 */

var Imported = Imported || {};
Imported.ODW_MultiLanguageSystem_GalvMZ = true;

var ODW = ODW || {};
ODW.MLS = ODW.MLS || {};
ODW.MLS.GalvMZ = ODW.MLS.GalvMZ || {};
ODW.MLS.GalvMZ.pluginName = "ODW_MultiLanguageSystem_GalvMZ";
ODW.MLS.GalvMZ.pluginVersion = [1, 0, 0];

//=============================================================================
// Window_Message
//=============================================================================

// Rewrite.
Window_Message.prototype.changeWindowDimensions = function() {
	if (this.pTarget != null) {
		Galv.Mstyle.testActive = true;
		let w = 0;
		let h = 0;
		const faceoffset = $gameMessage.faceName() ? ImageManager.faceWidth + 25 : 0;
		const xO = $gameMessage.faceName() ? faceoffset : 8;
		const gameMessageTexts = $gameMessage._texts[0].split("\n");
		// Calc text width
		for (let i = 0; i < gameMessageTexts.length; i++) {
			let lineWidth = this.testWidthEx(gameMessageTexts[i]);
			if (w < lineWidth) w = lineWidth;
		};
		w = w + $gameSystem.windowPadding() * 2 + xO + Galv.Mstyle.padding[3] + Galv.Mstyle.padding[1]; // padding!
		w += this.galvExtraWidths();
		this.width = Math.min(Graphics.boxWidth,w); // can't be wider than the screen!

		// Calc minimum lines
		let minFaceHeight = 0;
		if ($gameMessage._faceName) minFaceHeight = ImageManager.faceHeight + $gameSystem.windowPadding() * 2;

		// Calc text height
		let textState = { index: 0 };
		let extraFontHeight = 0;
		const lines = gameMessageTexts

		// Dodgy way to modify text line height if the \{ \} text codes are used.
		for (let i = 0; i < lines.length; i++) {
			let up = (lines[i].match(/\\{/g) || []).length;
			let down = (lines[i].match(/\\}/g) || []).length;

			// Height
			extraFontHeight += extraFontHeight + ((up - down));
		}
		extraFontHeight *= 24;

		// Escape characters from text
		textState.text = this.convertEscapeCharacters($gameMessage.allText());


		// Build actual height from everything
		const allLineHeight = this.calcTextHeight(textState,true);
		const height = allLineHeight + $gameSystem.windowPadding() * 2 + extraFontHeight;
		const minHeight = this.fittingHeight(gameMessageTexts.length);
		this.height = Math.max(height,minHeight,minFaceHeight);
		this.height += Galv.Mstyle.padding[0] + Galv.Mstyle.padding[2];
		this.height += this.galvExtraHeights();
		this.yOffset = -Galv.Mstyle.yOffset - this.height;

		Galv.Mstyle.testActive = false;
		this.otherMStyleCommands(); // stop certain things happening when drawing the text that was used for determining size.
	} else { // if this.pTarget is null
		// normal message window
		this.yOffset = 0;
		this.width = this.windowWidth();
		this.height = this.fittingHeight(4) + Galv.Mstyle.padding[0] + Galv.Mstyle.padding[2];
		this.x = (Graphics.boxWidth - this.width) / 2;
	};
};
