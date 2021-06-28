"use strict";

const Base = require("./Base");
const PROPERTY_LIST = (require("../properties/foundation").UserYoutube);

/**
 * @description An object for users on Youtube
 * @extends {Base}
 */

class UserYoutube extends Base {
    
    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;
    
    build(data) {
        data = this.parse(data);

        /**
         * @description The identification number of the user on Youtube
         * @type {BigInt}
         */

        this.youtubeUserID = "youtubeUserID" in data ? data.youtubeUserID : 0n;

        /**
         * @description ID representation of a user on the UL
         * @default 0n
         * @type {BigInt}
         */

        this.ulID = "ulID" in data ? data.ulID : 0n;

        /**
         * @description Whether the user is banned from requesting through Youtube
         * @default false
         * @type {boolean}
         */

        this.youtubeRequestBan = "youtubeRequestBan" in data ? data.youtubeRequestBan : false;
 
        return this;
    }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setYoutubeUserID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setULID(value=0n) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setYoutubeRequestBan(value=false) { return this; }

}

module.exports = UserYoutube;