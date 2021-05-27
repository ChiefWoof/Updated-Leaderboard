"use strict";

const Base = require("./Base");
const PROPERTY_LIST = (require("../properties/foundation").StatsObject);

/**
 * @description UL version of GD's primary stats
 * @extends {Base}
 */

class StatsObject extends Base {

    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Compares using a "compareTo" equivalent for each value
     * @param {{stars: number, diamonds: number, scoins: number, ucoins: number, demons: number, cp: number}} stats
     */

    compareTo(stats) {
        if (!(this instanceof StatsObject))
            throw new Error(`"this" is not an instance of the "StatsObject"`);
        if (!(stats instanceof StatsObject))
            throw new Error(`"stats" is not an instance of the "StatsObject"`);
        return {
            stars: this.stars - stats.stars,
            diamonds: this.diamonds - stats.diamonds,
            scoins: this.scoins - stats.scoins,
            ucoins: this.ucoins - stats.ucoins,
            demons: this.demons - stats.demons,
            cp: this.cp - stats.cp,
        };
    }

    build(data) {
        data = this.parse(data);

        /**
         * @description The stars
         * @type {number}
         */

        this.stars = "stars" in data ? data.stars : 0;

        /**
         * @description The diamonds
         * @type {number}
         */

        this.diamonds = "diamonds" in data ? data.diamonds : 0;

        /**
         * @description The secret coins
         * @type {number}
         */

        this.scoins = "scoins" in data ? data.scoins : 0;

        /**
         * @description The usercoins
         * @type {number}
         */

        this.ucoins = "ucoins" in data ? data.ucoins : 0;

        /**
         * @description The demons
         * @type {number}
         */

        this.demons = "demons" in data ? data.demons : 0;

        /**
         * @description The creator points
         * @type {number}
         */

        this.cp = "cp" in data ? data.cp : 0;

        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setStars(value=0) { return this; }

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setDiamonds(value=0) { return this; }

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setScoins(value=0) { return this; }

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setUcoins(value=0) { return this; }

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setDemons(value=0) { return this; }

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setCP(value=0) { return this; }

}

module.exports = StatsObject;