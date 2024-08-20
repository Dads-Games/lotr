/*:
 * @target MZ
 * @plugindesc More robust gamepad status updates.
 * @author Lone Wolf, based on functions by Yoji Ojima
 *
 * @help Gamepad Extender MVZ
 * (version 2/20/2024c)
 * 
 * Expands MZ's (or MV's) gamepad implementation to 
 * support all standard buttons and axes, 
 * as well as multiple gamepads and force feedback.
 *
 * Compatibility Notes:
 * Native controller support varies by browser or NWJS version.
 * Disconnected Steam Input controllers will require an app restart
 * to reconnect.
 *
 * Controllers mapped through Steam Input will typically be detected
 * as Xbox 360 controllers, for compatibility reasons.
 *
 * Steam Input may be required for force feedback with some
 * controllers (including DualShock 4 and DualSense).
 *
 * Usage Notes:
 * Backwards compatibility with RPG Maker MV is limited.
 * Plugin commands only available in MZ.
 *
 * As most other features will require additional scripting,
 * knowledge of basic JavaScript syntax is highly recommended.
 * 
 * New Plugin Commands:
 *  - Vibrate Controller
 *  - Halt Vibration
 * (See Event Editor "Plugin Commands..." for details.)
 * 
 * New "script" functions compatible with conditional branches:
 *  - WolfPad.isPressed(button, pad*)
 *  - WolfPad.isTriggered(button, pad*)
 *  - WolfPad.isRepeated(button, pad*)
 *  - WolfPad.isLongPressed(button, pad*)
 * * Optional parameter. If blank, will use value from controller 1.
 *
 *  Possible values for 'button' (case-sensitive, quotes required):
 *   A, B, X, Y, LT, LB, RT, RB, L3, R3,
 *   START, SELECT, OPTIONS, BACK, 
 *   UP, DOWN, LEFT, RIGHT
 *  (see WolfPadMVZ.js for complete list)
 *
 * New "script" functions compatible with variable assignment:
 *  - WolfPad.lastButton(pad*)      - get the integer index of the
 *                                    current, latest button press
 *  - WolfPad.currentHoldTime(pad*) - get the ongoing duration (in frames)
 *                                    of the current, latest button press
 *  - WolfPad.lstick8(pad*) - numpad direction of left stick
 *  - WolfPad.rstick8(pad*) - numpad direction of right stick
 * * Optional parameter. If blank, will use value from controller 1.
 * 
 * ---------------------------------------------------------------------------
 * This script was posted at the official RPG Maker forums at rpgmakerweb.com.
 * Do not modify or redistribute this script by itself, 
 * though you may include it with your own script demos provided you
 * include this header in its entirety.
 *
 * Contact LoneWolf at the above website for inquiries
 * relating to commercial use. 日本語での連絡もOKです.
 *
 * You should have found this plugin here:
 * https://forums.rpgmakerweb.com/index.php?threads/gamepad-extender-mvz.127243/
 * ---------------------------------------------------------------------------
 * 
 * @param Analog as Digital
 * @desc Handle left analog stick as D-Pad input.
 * OFF - false     ON - true
 * Default: OFF
 * @default false
 *
 * @param Advanced Hold Tracking
 * @desc Track button hold states independently. (EXPERIMENTAL)
 * OFF - false     ON - true
 * Default: OFF
 * @default false
 *
 * @param Advanced Keyboard Tracking
 * @desc Track RM Input hold states independently. (EXPERIMENTAL)
 * OFF - false     ON - true
 * Default: OFF
 * @default false
 *
 * @param Analog Threshold
 * @desc The minimum viable analog value to count as input.
 * @default 0.1
 *
 * @command vibrate
 * @text Vibrate Controller
 * @desc Vibrate the specified controller. Successive calls will be queued to create more complex effects.
 *
 * @arg gamepadIndex
 * @type number
 * @min 0
 * @max 4
 * @default 1
 * @text Gamepad Index
 * @desc Select which gamepad to vibrate. Input '0' to vibrate all.
 
 * @arg duration
 * @type number
 * @min 1
 * @max 300
 * @default 60
 * @text Effect Duration
 * @desc Duration of the effect (in frames).
 
 * @arg strong
 * @type number
 * @min 0
 * @max 100
 * @default 50
 * @text Strong Motor Intensity
 * @desc Intensity of strong motor feedback. (%)
 
 * @arg weak
 * @type number
 * @min 0
 * @max 100
 * @default 50
 * @text Weak Motor Intensity
 * @desc Intensity of weak motor feedback. (%)
 
 * @command clearVibration
 * @text Halt Vibration
 * @desc Halt all current and queued controller vibration.
 
 * @arg gamepadIndex
 * @type number
 * @min 0
 * @max 4
 * @default 0
 * @text Gamepad Index
 * @desc Select which gamepad's vibration to halt. Input '0' to halt vibration for all controllers.
*/

function WolfPad() {
	throw new Error("This is a static class");
}


(() => {
	const PLUGIN_NAME = 'WolfPadMVZ';

	const parameters = PluginManager.parameters(PLUGIN_NAME);
	const analogToDigital = JSON.parse(parameters['Analog as Digital']);
	const analogThreshold = Number(parameters['Analog Threshold']);
	const advancedStateTracking = JSON.parse(parameters['Advanced Hold Tracking']);
	const advancedKeyTracking = JSON.parse(parameters['Advanced Keyboard Tracking']);

	const VIBRATION_FRAME_RATE = 16.6666666;

	const MFG_OTHER = 0
	const MFG_SONY = 1;
	const MFG_MSFT = 2;
	const MFG_NTDO = 3;

	WolfPad.padBrands = {
		[MFG_OTHER]: 'Other',
		[MFG_SONY]: 'Sony',
		[MFG_MSFT]: 'Microsoft',
		[MFG_NTDO]: 'Nintendo',
	}

	const SCHEME_GENERIC = 0;
	const SCHEME_DS5 = 5;

	const STANDARD = 'standard';

	// esoteric nonsense
	const HAT_CONVERSION = [8,9,6,3,2,1,4,7,5];
	const DIR_UP = [7,8,9];
	const DIR_DOWN = [1,2,3];
	const DIR_LEFT = [1,4,7];
	const DIR_RIGHT = [3,6,9];

	Input.__clearOld = Input.clear;
	Input.clear = function() {
		Input.__clearOld();
		Input._gamepadAxes = [];
		Input._gamepadStates = [];
		Input._gamepadData = [];
		Input._keyPressedTimes = {};
		Input._vibrationQueues = [];
		Input._vibrationTimers = [];
		Input._latestPadButtons = [null, null, null, null];
		Input._padPressedTimes = [0, 0, 0, 0];
	}

	if (PluginManager.registerCommand) {
		PluginManager.registerCommand(PLUGIN_NAME, 'vibrate', args => {
			const gamepadIndex = Number(args.gamepadIndex) - 1;
			const duration = Number(args.duration);
			const strong = Number(args.strong) / 100;
			const weak = Number(args.weak) / 100;
			const effect = Input.vibration(duration, strong, weak);
			Input.vibrate(effect, gamepadIndex);
		});
		
		PluginManager.registerCommand(PLUGIN_NAME, 'clearVibration', args => {
			const gamepadIndex = Number(args.gamepadIndex) - 1;
			if (gamepadIndex === -1) {
				Input.haltVibration(0);
				Input.haltVibration(1);
				Input.haltVibration(2);
				Input.haltVibration(3);
			} else {
				Input.haltVibration(gamepadIndex);
			}
		});
	}
	
	Input.gamepadMapper = {
		0: 'ok',        // A
		1: 'cancel',    // B
		2: 'shift',     // X
		3: 'menu',      // Y
		4: 'pageup',    // LB
		5: 'pagedown',  // RB
		6: 'lt',        // Lt
		7: 'rt',        // Rt
		8: 'select',    // Select/Back
		9: 'start',     // Start/Options
		10: 'l3',       // Left Stick (click)
		11: 'r3',       // Right Stick (click)
		12: 'up',       // D-pad up
		13: 'down',     // D-pad down
		14: 'left',     // D-pad left
		15: 'right',    // D-pad right
	};
	
	// modified from rmmz_core
	Input._updateGamepadState = function(gamepad) {
		console.log(gamepad);
		this._updateGamepadData(gamepad);
		var data = this.gamepadData(gamepad.index);
		var lastState = this._gamepadStates[gamepad.index] || [];
		var newState = [];
		var newAxes = [];
		var buttons = gamepad.buttons;
		var axes = gamepad.axes;
		var threshold = 0.5;
		newState[12] = false;
		newState[13] = false;
		newState[14] = false;
		newState[15] = false;
		for (var i = 0; i < buttons.length; i++) {
			newState[i] = buttons[i].pressed;
		}
		if ([SCHEME_DS5].includes(this.gamepadData(gamepad.index).scheme)) {
			// reorder face buttons to fit DS4 and XInput spec
			newState[0] = buttons[1].pressed;
			newState[1] = buttons[2].pressed;
			newState[2] = buttons[0].pressed;
			newState[3] = buttons[3].pressed;
			// move HOME and MIC out of the D-PAD section
			newState[16] = buttons[12].pressed;
			newState[18] = buttons[14] ? buttons[14].pressed : null;
			// swap SHARE and PAD
			newState[17] = buttons[8].pressed;
			newState[8] = buttons[13].pressed;
			// D-PAD reset
			newState[12] = false;
			newState[13] = false;
			newState[14] = false;
		}
		if (!!axes[9]) {
			// convert axis 9 to D-PAD values, using black magic
			const hatDir = Math.round((axes[9] + 1) * 3.5);
			const toNumpad = HAT_CONVERSION[hatDir];
			if (DIR_UP.includes(toNumpad)) newState[12] = true;
			if (DIR_DOWN.includes(toNumpad)) newState[13] = true;
			if (DIR_LEFT.includes(toNumpad)) newState[14] = true;
			if (DIR_RIGHT.includes(toNumpad)) newState[15] = true;
		}
		if(analogToDigital) {
			if (axes[1] < -threshold) {
				newState[12] = true;    // up
			} else if (axes[1] > threshold) {
				newState[13] = true;    // down
			}
			if (axes[0] < -threshold) {
				newState[14] = true;    // left
			} else if (axes[0] > threshold) {
				newState[15] = true;    // right
			}
		}
		for (var i = 0; i < axes.length; i++) {
			newAxes[i] = Math.abs(axes[i]) > analogThreshold ? axes[i] : 0;
		}
		for (var j = 0; j < newState.length; j++) {
			if (newState[j] !== lastState[j]) {
				var buttonName = this.gamepadMapper[j];
				if (buttonName) {
					this._currentState[buttonName] = newState[j];
				}
			}
		}
		this._updateGamepadStateTracking(gamepad.index, lastState, newState);
		this._gamepadStates[gamepad.index] = newState;
		this._gamepadAxes[gamepad.index] = newAxes;
		if (gamepad.vibrationActuator) {
			Input.updateVibration(gamepad);
		}
	};
	
	Input._updateGamepadStateTracking = function(index, previousState, currentState) {
		if (previousState.length !== currentState.length) {
			this._padPressedTimes[index] = Array(currentState.length);
			this._padPressedTimes[index].fill(0);
		}
		for (const name in currentState) {
			if (currentState[name])
				this._padPressedTimes[index][name]++;
			else
				this._padPressedTimes[index][name] = 0;
			if (currentState[name] && !previousState[name])
				this._latestPadButtons[index] = Number(name);
		}
	}
	
	Input.updateVibration = function(gamepad) {
		if (!Input._vibrationQueues[gamepad.index]) {
			Input._vibrationQueues[gamepad.index] = [];
			Input._vibrationTimers[gamepad.index] = 0;
			return;
		}
		if (Input._vibrationTimers[gamepad.index] > 0) {
			Input._vibrationTimers[gamepad.index] -= 1;
			return;
		}
		var queue = Input._vibrationQueues[gamepad.index];
		if (queue.length === 0) return;
		var effect = queue.shift();
		Input._vibrationTimers[gamepad.index] = Math.round(effect.duration / VIBRATION_FRAME_RATE);
		gamepad.vibrationActuator.playEffect('dual-rumble', effect);
	}

	Input._updateGamepadData = function(gamepad) {
		var currentPad = this._gamepadData[gamepad.index]
		if (currentPad && gamepad.id !== this._gamepadData[gamepad.index].id) {
			this._gamepadStates[gamepad.index] = [];
		}
		var id = gamepad.id;
		var mfg = MFG_OTHER;
		var scheme = SCHEME_GENERIC;
		var steamInput = false;
		var vibration = !!gamepad.vibrationActuator;
		if (id.includes('XInput STANDARD GAMEPAD')) {
			steamInput = true;
		}
		else if (id.includes('054c')) {
			mfg = MFG_SONY;
			if (id.includes('DualSense') && gamepad.mapping !== STANDARD)
				scheme = SCHEME_DS5;
		}
		else if (id.includes('Xbox')) {
			mfg = MFG_MSFT;
		}
		else if (id.includes('057e')) {
			mfg = MFG_NTDO;
		}
		this._gamepadData[gamepad.index] = {
			id,
			mfg,
			scheme,
			vibration,
			steamInput,
		};
	}

	Input.__updateOld = Input.update;
	Input.update = function() {
		Input.__updateOld();
		if (advancedKeyTracking) {
			Object.keys(this._currentState).forEach(k => {
				if (this._currentState[k])
					this._keyPressedTimes[k]++;
				else
					this._keyPressedTimes[k] = 0;
			})
		}
	};

	Input.vibration = function(d, sMag = 0, wMag = 0) {
		return {
			duration: d * VIBRATION_FRAME_RATE,
			strongMagnitude: sMag,
			weakMagnitude: wMag,
		};
	}
	
	Input.vibrate = (effect, id = 0) => {
		if (!Input._vibrationQueues[id]) return;
		Input._vibrationQueues[id].push(effect);
	}
	
	Input.haltVibration = (id = 0) => {
		if (!Input._vibrationQueues[id]) return;
		Input._vibrationQueues[id] = [];
	}
	
	Input.vibrationTest = function() {
		Input._vibrationQueues[0] = [];
		Input._vibrationQueues[0].push(Input.vibration(10, 0.1));
		Input._vibrationQueues[0].push(Input.vibration(10, 0.3));
		Input._vibrationQueues[0].push(Input.vibration(10, 0.4));
		Input._vibrationQueues[0].push(Input.vibration(30, 0.0));
		Input._vibrationQueues[0].push(Input.vibration(10, 0.6));
		Input._vibrationQueues[0].push(Input.vibration(10, 0.8));
		Input._vibrationQueues[0].push(Input.vibration(10, 1.0));
	}

	Input.axes = function(id = 0) {
		return this._gamepadAxes[id] || [0, 0, 0, 0];
	}
	
	Input.leftStick = function(id = 0) {
		var axis = this.axes(id);
		return [axis[0], axis[1]];
	}
	
	Input.rightStick = function(id = 0) {
		var axis = this.axes(id);
		return [axis[2], axis[Input.gamepadScheme(id) === SCHEME_DS5 ? 5 : 3]];
	}
	
	Input.lstick8 = function(id = 0) {
		var axes = this.leftStick(id);
		return this._makeNumpadDirection(Math.round(axes[0]), Math.round(axes[1]));
	}
	
	Input.rstick8 = function(id = 0) {
		var axes = this.rightStick(id);
		return this._makeNumpadDirection(Math.round(axes[0]), Math.round(axes[1]));
	}

	Input.gamepadData = function(id = 0) {
		return this._gamepadData[id] || {}
	}

	Input.gamepadScheme = function(id = 0) {
		return this.gamepadData(id).scheme
	}

	// Might be useful for displaying button prompts by maker
	Input.gamepadMaker = function(id = 0) {
		return WolfPad.padBrands[this.gamepadData(id).mfg];
	}

	Input.currentHoldTime = function(key) {
		return Input._keyPressedTimes[key] - 1;
	}

	Input.__isTriggered = Input.isTriggered;
	Input.isTriggered = function(key) {
		const oldValue = Input.__isTriggered(key);
		if (oldValue || !advancedKeyTracking)	return oldValue;
		return this.currentHoldTime(key) === 0;
	}

	Input.__isRepeated = Input.isRepeated;
	Input.isRepeated = function(key) {
		const oldValue = Input.__isRepeated(key);
		if (oldValue || !advancedKeyTracking)	return oldValue;
		const hold = this.currentHoldTime(key);
		return (hold === 0 || (hold >= Input.keyRepeatWait && hold % Input.keyRepeatInterval === 0));
	}

	Input.__isLongPressed = Input.isLongPressed;
	Input.isLongPressed = function(key) {
		const oldValue = Input.__isLongPressed(key);
		if (oldValue || !advancedKeyTracking)	return oldValue;
		return this.currentHoldTime(key) >= Input.keyRepeatWait;
	}

	WolfPad.maps = Object.entries(Input.gamepadMapper).reduce((maps, entry)  => {
		const [index, binding] = entry;
		return { ...maps, [binding]: Number(index) };
	}, {});

	// complete button reference, below lowercase values are supported
	const unused = {
		0: 'ok',        // A
		1: 'cancel',    // B
		2: 'shift',     // X
		3: 'menu',      // Y
		4: 'pageup',    // LB
		5: 'pagedown',  // RB
		6: 'lt',        // Lt
		7: 'rt',        // Rt
		8: 'select',    // Select/Back
		9: 'start',     // Start/Options
		10: 'l3',       // Left Stick (click)
		11: 'r3',       // Right Stick (click)
		12: 'up',       // D-pad up
		13: 'down',     // D-pad down
		14: 'left',     // D-pad left
		15: 'right',    // D-pad right
	};
	WolfPad.maps['A'] = 0;
	WolfPad.maps['B'] = 1;
	WolfPad.maps['X'] = 2;
	WolfPad.maps['Y'] = 3;
	WolfPad.maps['LB'] = 4;
	WolfPad.maps['RB'] = 5;
	WolfPad.maps['LT'] = 6;
	WolfPad.maps['RT'] = 7;
	WolfPad.maps['SELECT'] = 8;
	WolfPad.maps['BACK'] = 8;
	WolfPad.maps['START'] = 9;
	WolfPad.maps['OPTIONS'] = 9;
	WolfPad.maps['L3'] = 10;
	WolfPad.maps['R3'] = 11;
	WolfPad.maps['UP'] = 12;
	WolfPad.maps['DOWN'] = 13;
	WolfPad.maps['LEFT'] = 14;
	WolfPad.maps['RIGHT'] = 15;
	
	WolfPad.lastButton = function(pad = 0) {
		return Input._latestPadButtons[pad];
	}

	WolfPad.lastButtonIs = function(keyName, pad = 0) {
		if (advancedStateTracking) return true;
		const keyIndex = this.maps[keyName];
		return WolfPad.lastButton(pad) === keyIndex;
	}

	WolfPad.currentHoldTime = function(keyName, pad = 0) {
		const keyIndex = this.maps[keyName];
		return Input._padPressedTimes[pad][keyIndex] - 1;
	}
	
	WolfPad.isPressed = function(keyName, pad = 0) {
		const keyIndex = this.maps[keyName];
		return Input._gamepadStates[pad] && Input._gamepadStates[pad][keyIndex];
	}
	
	WolfPad.isTriggered = function(keyName, pad = 0) {
		return this.lastButtonIs(keyName, pad) && this.currentHoldTime(keyName, pad) === 0;
	}
	
	WolfPad.isRepeated = function(keyName, pad = 0) {
		const hold = this.currentHoldTime(keyName, pad);
		return (
			this.lastButtonIs(keyName, pad) &&
				(hold === 0 || (hold >= Input.keyRepeatWait && hold % Input.keyRepeatInterval === 0))
		);
	}
	
	WolfPad.isLongPressed = function(keyName, pad = 0) {
		return (
			this.lastButtonIs(keyName, pad) &&
			this.currentHoldTime(keyName, pad) >= Input.keyRepeatWait
		);
	}
	
	WolfPad.lstick8 = function(id = 0) {
		return Input.lstick8(id);
	}
	
	WolfPad.rstick8 = function(id = 0) {
		return Input.rstick8(id);
	}
})();
