"use strict";

const Base = require("./Base");
const PROPERTY_LIST = (require("../properties/foundation").UserTwitch);

/**
 * @description An object for users on Twitch
 * @extends {Base}
 */

class UserTwitch extends Base {
    
    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;
    
    build(data) {
        data = this.parse(data);

        /**
         * @description The identification number of the user on Twitch
         * @type {BigInt}
         */

        this.twitchUserID = "twitchUserID" in data ? data.twitchUserID : 0n;

        /**
         * @description ID representation of a user on the UL
         * @default 0n
         * @type {BigInt}
         */

        this.ulID = "ulID" in data ? data.ulID : 0n;

        /**
         * @description Whether the user is banned from requesting through Twitch
         * @default false
         * @type {boolean}
         */

        this.twitchRequestBan = "twitchRequestBan" in data ? data.twitchRequestBan : false;
 
        return this;
    }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setTwitchUserID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setULID(value=0n) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setTwitchRequestBan(value=false) { return this; }

}

module.exports = UserTwitch;