"use strict";

const BaseTerritory = require("./BaseTerritory");
const Util = require("../util/Util");
const regions = require("../storage/regions.json");

/**
 * The general region data
 */

class Region extends BaseTerritory {

    constructor() {

        super();

        /**
         * @description The abbreviation
         * @type {?string}
         */

        this.abbrev = null;

        /**
         * @description Whether the region is flagged as featured
         * @type {boolean}
         */

        this.featured = false;

        /**
         * @description The Discord emote representation
         * @type {?string}
         */

        this.emote = null;

        /**
         * @description The respective regions
         * @type {BigInt[]}
         */

        this.regions = [];

        /**
         * @description The respective languages
         * @type {BigInt[]}
         */

        this.languages = [];

    }

    /**
     * Retrieves a Discord text version of the emote else null
     * @returns {?string}
     */

    get emoteDiscordString() { return Util.discordEmoteDataToString(this.emote); }

    /**
     * JSON encoding for key, value pairs
     * @param {string} key
     * @param {*} value
     */

    jsonEncoding(key, value) {
        switch (key) {
            default: { return super.jsonEncoding(key, value); }
            case "featured": { return Util.isTrue(data) ? 1 : 0; }
            case "regions":
                case "languages": { return value?.join(",")?.split(",").filter(a => a) || []; }
        }
    }

    /**
     * JSON decoding for key, value pairs
     * @param {string} key
     * @param {*} value
     */

    jsonDecoding(key, value) {
        switch (key) {
            default: { return super.jsonDecoding(key, value); }
            case "featured": { return Util.isTrue(data); }
            case "regions":
                case "languages": { return value?.map(n => BigInt(n)) || []; }
        }
    }

}

/**
 * A object with id, Region pairs
 * @type {Object<string, Region>}
 */

Region.regions = Object.entries(regions)
.reduce((res, [id, item]) => {
    res[id] = new Region().fromJSON(item);
    return res;
}, {});

/**
 * An array of Regions
 * @type {Region[]}
 */

Region.list = Object.values(regions)
.map(item => new Region().fromJSON(item));

module.exports = Region;
