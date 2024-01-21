"use strict";

const Base = require("./Base");
const Util = require("../util/Util");
const languages = require("../storage/languages.json");

/**
 * The general language data
 */

class Language extends Base {

    constructor() {

        super();

        /**
         * @description The identification number
         * @type {BigInt}
         */

        this.id = 0n;

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
         * @description The abbreviation
         * @type {?string}
         */

        this.abbrev = null;

        /**
         * @description The Discord emote representation
         * @type {?string}
         */

        this.emote = null;

    }

    /**
     * Retrieves a Discord text version of the emote else null
     * @returns {?string}
     */

    get emoteDiscordString() { return Util.discordEmoteDataToString(this.emote); }

}

/**
 * A object with id, Language pairs
 * @type {Object<string, Language>}
 */

Language.languages = Object.entries(languages)
.reduce((res, [id, item]) => {
    res[id] = new Language().fromJSON(item);
    return res;
}, {});

/**
 * An array of Languages
 * @type {Language[]}
 */

Language.list = Object.values(languages)
.map(item => new Language().fromJSON(item));

module.exports = Language;