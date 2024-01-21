"use strict";

const Base = require("./Base");
const Util = require("../../src/util/Util");

/**
 * The most general version of any territorial area
 */

class BaseTerritory extends Base {

    constructor() {
        
        super();

        /**
         * @description The common name to display
         * @type {?string}
         */

        this.nameDisplay = null;

        /**
         * @description The official name
         * @type {?string}
         */

        this.name = null;

        /**
         * @description The text version of the flag
         * @type {?string}
         */

        this.emote = null;

    }

    /**
     * Removes accents from characters in nameDisplay and returns the result
     * @returns {?string}
     */

    get emoteDiscordString() { return Util.discordEmoteDataToString(this.emote); }

    /**
     * Removes accents from characters in nameDisplay and returns the result
     * @returns {?string}
     */

    get nameDisplayNormalized() {
        return this.nameDisplay
        ? this.nameDisplay.normalize("NFKD").replace(/[^(\w -)]/g, '')
        : null;
    }

    /**
     * Removes accents from characters in name and returns the result
     * @returns {?string}
     */

    get nameNormalized() {
        return this.name
        ? this.name.normalize("NFKD").replace(/[^(\w -)]/g, '')
        : null;
    }

}

module.exports = BaseTerritory;