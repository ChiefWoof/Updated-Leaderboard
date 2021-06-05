"use strict";

const Base = require("../Base");
const PROPERTY_LIST = (require("../../properties/foundationIcons").IconColorsData);

/**
 * @description An object with only gamemodes
 * @extends {Base}
 */

class IconColorsData extends Base {
    
    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }
    
    build(data) {
        data = this.parse(data);

        /**
         * @description The identification number of the player's primary color
         * @default 1n
         * @type {BigInt}
         */
 
        this.color1 = "color1" in data ? data.color1 : 1n;
 
        /**
         * @description The identification number of the player's secondary color
         * @default 1n
         * @type {BigInt}
         */

        this.color2 = "color2" in data ? data.color2 : 1n;
 
        return this;
    }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setColor1(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setColor2(value=1n) { return this; }

}

module.exports = IconColorsData;