"use strict";

const Base = require("./Base");
const PROPERTY_LIST = (require("../properties/foundation").StatsObject);

const { IS_CREATOR_CP } = (require("../util/Constants").USER_STATUS);
const NetScore = require("../util/NetScore");

/**
 * @description UL version of GD's primary stats
 * @extends {Base}
 */

class StatsObject extends Base {

    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Whether the user should be considered a level creator
     * @returns {boolean}
     */

    isCreator() { return this.cp >= IS_CREATOR_CP; }

    /**
     * @description Retrives the net score based on the current stats
     * @returns {boolean}
     */

    getNetScore(rounded=undefined) { return NetScore.calculate(rounded, this); }

    /**
     * @description Compares using a "compareTo" equivalent for each value
     * @param {StatsObject} stats
     */

    compareTo(stats) {
        if (!(this instanceof StatsObject))
            throw new Error(`"this" is not an instance of the "StatsObject"`);
        if (!(stats instanceof StatsObject))
            throw new Error(`"stats" is not an instance of the "StatsObject"`);
        return new StatsObject().buildByObj({
            stars: this.stars - stats.stars,
            diamonds: this.diamonds - stats.diamonds,
            scoins: this.scoins - stats.scoins,
            ucoins: this.ucoins - stats.ucoins,
            demons: this.demons - stats.demons,
            cp: this.cp - stats.cp,
        });
    }

    build(data) {
        data = this.parse(data);

        /**
         * @description The stars
         * @default 0n
         * @type {BigInt}
         */

        this.stars = "stars" in data ? data.stars : 0n;

        /**
         * @description The diamonds
         * @default 0n
         * @type {BigInt}
         */

        this.diamonds = "diamonds" in data ? data.diamonds : 0n;

        /**
         * @description The secret coins
         * @default 0n
         * @type {BigInt}
         */

        this.scoins = "scoins" in data ? data.scoins : 0n;

        /**
         * @description The usercoins
         * @default 0n
         * @type {BigInt}
         */

        this.ucoins = "ucoins" in data ? data.ucoins : 0n;

        /**
         * @description The demons
         * @default 0n
         * @type {BigInt}
         */

        this.demons = "demons" in data ? data.demons : 0n;

        /**
         * @description The creator points
         * @default 0n
         * @type {BigInt}
         */

        this.cp = "cp" in data ? data.cp : 0n;

        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?BigInt|number|string} [value=0n]
     */

    setStars(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string} [value=0n]
     */

    setDiamonds(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string} [value=0n]
     */

    setScoins(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string} [value=0n]
     */

    setUcoins(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string} [value=0n]
     */

    setDemons(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string} [value=0n]
     */

    setCP(value=0n) { return this; }

}

module.exports = StatsObject;