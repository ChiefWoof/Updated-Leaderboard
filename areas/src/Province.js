"use strict";

const BaseTerritory = require("./BaseTerritory");
const Util = require("../../src/util/Util");
const provinces = require("../storage/provinces.json");

/**
 * @description Different types of provinces (small regions)
 * @typedef {"PROVINCE"
 * |"STATE"
 * |"TERRITORY"} TYPES
 */

/**
 * The general province data
 */

class Province extends BaseTerritory {

    constructor() {

        super();

        /**
         * @description The type of province
         * @type {TYPES}
         */

        this.type = "PROVINCE";

        /**
         * @description The abbreviation
         * @type {?string}
         */

        this.abbrev = null;

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
         * @description The respective countries
         * @type {BigInt[]}
         */

        this.countries = [];

        /**
         * @description The respective languages
         * @type {BigInt[]}
         */

        this.languages = [];

    }

    /**
     * @description Whether the area is disputed territory
     * @type {boolean}
     */

    get disputed() { return this.countries.length > 1; }

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
            case "regions":
                case "countries":
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
            case "regions":
                case "countries":
                    case "languages": { return value?.map(n => BigInt(n)) || []; }
        }
    }

}

/**
 * A object with id, Province pairs
 * @type {Object<string, Province>}
 */

Province.provinces = Object.entries(provinces)
.reduce((res, [id, item]) => {
    res[id] = new Province().fromJSON(item);
    return res;
}, {});

/**
 * An array of Provinces
 * @type {Province[]}
 */

Province.list = Object.values(provinces)
.map(item => new Province().fromJSON(item));

module.exports = Province;
