"use strict";

const Base = require("../Base");
const PROPERTY_LIST = (require("../../properties/foundationIcons").IconGamemodeData);

/**
 * @description An object with only gamemodes
 * @extends {Base}
 */

class IconGamemodeData extends Base {
    
    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    build(data) {
        data = this.parse(data);

        /**
         * @description The identification number of the player's cube
         * @default 1n
         * @type {BigInt}
         */

        this.cubeID = "cubeID" in data ? data.cubeID : 1n;

        /**
         * @description The identification number of the player's ship
         * @default 1n
         * @type {BigInt}
         */

        this.shipID = "shipID" in data ? data.shipID : 1n;

        /**
         * @description The identification number of the player's ball
         * @default 1n
         * @type {BigInt}
         */

        this.ballID = "ballID" in data ? data.ballID : 1n;

        /**
         * @description The identification number of the player's ufo
         * @default 1n
         * @type {BigInt}
         */

        this.ufoID = "ufoID" in data ? data.ufoID : 1n;

        /**
         * @description The identification number of the player's dart
         * @default 1n
         * @type {BigInt}
         */

        this.dartID = "dartID" in data ? data.dartID : 1n;

        /**
         * @description The identification number of the player's robot
         * @default 1n
         * @type {BigInt}
         */

        this.robotID = "robotID" in data ? data.robotID : 1n;

        /**
         * @description The identification number of the player's spider
         * @default 1n
         * @type {BigInt}
         */

        this.spiderID = "spiderID" in data ? data.spiderID : 1n;

        /**
         * @description The identification number of what gamemode the player WANTS to display
         * * `0` - Default gamemode
         * * `1` - Cube
         * * `2` - Ship
         * * `3` - Ball
         * * `4` - UFO
         * * `5` - Dart
         * * `6` - Robot
         * * `7` - Spider
         * @default 0n
         * @type {BigInt}
         */

        this.gamemodeOverride = "gamemodeOverride" in data ? data.gamemodeOverride : 0n;
 
        /**
         * @description The identification number of the player's primary gamemode
         * * `0` - Cube
         * * `1` - Ship
         * * `2` - Ball
         * * `3` - UFO
         * * `4` - Dart
         * * `5` - Robot
         * * `6` - Spider
         * @default 0n
         * @type {BigInt}
         */

        this.gamemode = "gamemode" in data ? data.gamemode : 0n;

        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setCubeID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setShipID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setBallID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setUFOID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setDartID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setRobotID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setSpiderID(value=1n) { return this; }

    /**
     * @default 0n
     * @param {number} [value=0n]
     */

    setGamemodeOverride(value=0n) { return this; }

    /**
     * @default 0n
     * @param {number} [value=0n]
     */

    setGamemode(value=0n) { return this; }

}

module.exports = IconGamemodeData;