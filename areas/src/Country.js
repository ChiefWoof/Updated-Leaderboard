"use strict";

const BaseTerritory = require("./BaseTerritory");
const Util = require("../util/Util");
const countries = require("../storage/countries.json");

/**
 * The general country data
 */

class Country extends BaseTerritory {

    constructor() {

        super();

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
     * Assumes emoji is the flag ascii characters,
     * converts them into english alphabet characters
     * and returns it
     * @returns {?string}
     */

    get abbrev() {
        return this.emote
        ? this.emote.match(/.{2}/g).map(a => {
            let code = a[1].charCodeAt();
            return String.fromCharCode(code - 56741);
        }).join("")
        : null;
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
            case "regions":
                case "languages": { return value?.map(n => BigInt(n)) || []; }
        }
    }

}

/**
 * A object with id, Country pairs
 * @type {Object<string, Country>}
 */

Country.countries = Object.entries(countries)
.reduce((res, [id, item]) => {
    res[id] = new Country().fromJSON(item);
    return res;
}, {});

/**
 * An array of Countries
 * @type {Country[]}
 */

Country.list = Object.values(countries)
.map(item => new Country().fromJSON(item));

module.exports = Country;