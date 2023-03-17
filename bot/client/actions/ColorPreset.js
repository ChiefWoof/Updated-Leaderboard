"use strict";

const Action = require("./Action");

class ColorPresetAction extends Action {

    get presets() {
        return {
            "red": "EC1E1E",
            "dark red": "8F0000",
            "light red": "FF9575",
            "orange": "FF7400",
            "dark orange": "9F6400",
            "light orange": "FFA050",
            "yellow": "F5FA0D",
            "dark yellow": "D7DA12",
            "light yellow": "FCFF75",
            "green": "5BD211",
            "dark green": "377D0C",
            "light green": "ACFF77",
            "blue": "5186FF",
            "dark blue": "2336CC",
            "light blue": "91E3FF",
            "purple": "8943E0",
            "dark purple": "501896",
            "light purple": "C391FF",
            "pink": "F250ED",
            "dark pink": "961892",
            "light pink": "EE9AEC",
            "grey": "868686",
            "dark grey": "595959",
            "light grey": "D2D2D2",
            "black": "000000",
            "brown": "6f391c",
            "white": "FFFFFF",
            "8=8": "ff31a4",
            "ul": "abcdef",
            "valid": "6be160",
            "error": "E16060",
            "cooldown": "454545",
            "settings": "646464",
            "stars": "FFD91E",
            "diamonds": "1EB4FF",
            "scoins": "FEFF00",
            "ucoins": "A3A3A3",
            "demons": "E14B4B",
            "cp": "747474",
            "net": "ae34eb"
        }
    }

    /**
     * @param {?string} key
     * @returns {?string}
     */

    lookupPreset(key) {
        return Object.keys(this.presets).includes(`${key}`.toLowerCase())
        ? this.presets[`${key}`.toLowerCase()]
        : null;
    }

    /**
     * @param {?string} key
     * @returns {?string}
     */

    searchFaulty(key) { return this.lookupPreset(key) || key; }

    /**
     * @param {?string} key 
     */

    handler(key) { return this.searchFaulty(key); }

}

module.exports = ColorPresetAction;