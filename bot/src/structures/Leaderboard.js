"use strict";

const Base = require("./Base");

const UserUL = require("./UserUL");


/**
 * @typedef {"STARS"
 * |"DIAMONDS"
 * |"SCOINS"
 * |"UCOINS"
 * |"DEMONS"
 * |"CP"
 * |"NET"
 * |"ACCOUNT_ID"
 * |"PLAYER_ID"
 * } STAT_TYPE
 */

/**
 * @typedef {"CURRENT"
 * |"WEEKLY"
 * |"MONTHLY"
 * |"YEARLY"
 * } LEADERBOARD_TYPE
 */

/**
 * @typedef {0|1|2
 * } SWITCH_3_WAY
 */


class Leaderboard extends Base {

    constructor() {

        super();

        /**
         * @description The leaderboard type
         * @type {LEADERBOARD_TYPE}
         */

        this.type = "CURRENT";

        /**
         * @description The stat type to make the leaderboard out of
         * @type {STAT_TYPE}
         */

        this.statType = "STARS";

        /**
         * @description The order of the leaderboard
         * * `0` - Unordered
         * * `1` - Ascending Order
         * * `2` - Descending Order
         * @type {SWITCH_3_WAY}
         */

        this.order = 2;

        /**
         * @description The users in Star Grinders
         * * `0` - Unfiltered
         * * `1` - Filter for true
         * @type {0|1}
         */

        this.sg = 0;

        /**
         * @description The users that are GD Mods
         * * `0` - Unfiltered
         * * `1` - Filter for Mod
         * * `2` - Filter for Elder Mod
         * @type {SWITCH_3_WAY}
         */

        this.mod = 0;

        /**
         * @description The users that play on a mobile device
         * * `0` - Unfiltered
         * * `1` - Filter for true
         * @type {0|1}
         */

        this.mobile = 0;

        /**
         * @description The users that play on a pc
         * * `0` - Unfiltered
         * * `1` - Filter for true
         * @type {0|1}
         */

        this.pc = 0;

        /**
         * @description 0-based page number
         * @type {number}
         */

        this.page = 0;

        /**
         * @description Number of users to display per page
         * @type {number}
         */

        this.perPage = 20;

        /**
         * @description Whether to reverse the display order
         * @type {boolean}
         */

        this.reverseOrder = false;

        /**
         * @description Whether to reverse position numbering
         * @type {boolean}
         */

        this.reversePositions = false;

        /**
         * @description The edited user entry cache
         * @type {UserUL[]}
         */

        this.cache = [];

    }

    get pageMax() { return this.cache.length > 0 ? Math.ceil(this.cache.length / this.perPage) - 1 : 0; }

    get pageFirstSelection() {
        let i = this.cache.findIndex(u => u.flags.selected);
        return i < 0
        ? i
        : Math.ceil((i + 1) / this.perPage) - 1;
    }

    setStatByString(str) {
        if (/^stars?$/i.test(str)) this.statType = "STARS";
        else if (/^diamonds?$/i.test(str)) this.statType = "DIAMONDS";
        else if (/^scoins?$/i.test(str)) this.statType = "SCOINS";
        else if (/^ucoins?$/i.test(str)) this.statType = "UCOINS";
        else if (/^demons?$/i.test(str)) this.statType = "DEMONS";
        else if (/^cp$/i.test(str)) this.statType = "CP";
        else if (/^account_?id$/i.test(str)) this.statType = "ACCOUNT_ID";
        else if (/^player_id$/i.test(str)) this.statType = "PLAYER_ID";
        return this;
    }

    /**
     * @param {UserUL} user 
     * @param {STAT_TYPE} statType 
     */

    filterUserByStatType(user, statType=this.statType) {
        switch (statType) {
            case "STARS": { return !user.flags.bannedStars; }
            case "DIAMONDS": { return !user.flags.bannedDiamonds; }
            case "SCOINS": { return !user.flags.bannedScoins; }
            case "UCOINS": { return !user.flags.bannedUcoins; }
            case "DEMONS": { return !user.flags.bannedDemons; }
            case "CP": { return !user.flags.bannedCP; }
            case "NET": { return !user.flags.bannedNet; }
        }
        return true;
    }

    /**
     * @param {UserUL} user 
     * @param {0|1} state 
     */

    filterUserBySG(user, state=this.sg) {
        return state > 0
        ? state == 1
            ? user.flags.sg
            : false
        : true;
    }

    /**
     * @param {UserUL} user 
     * @param {SWITCH_3_WAY} state 
     */

    filterUserByMod(user, state=this.mod) {
        return state > 0
        ? state == 1
            ? user.flags.isGDMod
            : state == 2
                ? user.flags.isGDModElder
                : false
        : true;
    }

    /**
     * @param {UserUL} user 
     * @param {0|1} state 
     */

    filterUserByMobile(user, state=this.mobile) {
        return state > 0
        ? state == 1
            ? user.flags.mobilePlayer
            : false
        : true;
    }

    /**
     * @param {UserUL} user 
     * @param {0|1} state 
     */

    filterUserByPC(user, state=this.pc) {
        return state > 0
        ? state == 1
            ? user.flags.pcPlayer
            : false
        : true;
    }

    filterCache({
        statType = this.statType,
        sg = this.sg,
        mod = this.mod,
        mobile = this.mobile,
        pc = this.pc
    }={}) {
        this.cache = this.cache.filter(u => 
            this.filterUserByStatType(u, statType)
            && this.filterUserBySG(u, sg)
            && this.filterUserByMod(u, mod)
            && this.filterUserByMobile(u, mobile)
            && this.filterUserByPC(u, pc)
        );
        return this;
    }

    setPositions() {
        this.cache.forEach((u, i) => {
            u.position = this.reversePositions ? this.cache.length - i : i + 1;
            u.flags.selected = false;
        });
    }

    setPageFirstSelection() {
        let pg = this.pageFirstSelection;
        this.page = pg >= 0 ? pg : this.page;
        return this.page;
    }

    setPositionValues() {
        this.cache.forEach(u => {
            this.setUserPositionValue(u);
        });
    }

    /**
     * @param {UserUL} user 
     */

    setUserPositionValue(user) {

        switch (this.type) {

            // GENERAL LEADERBOARD
            default:
                case "CURRENT": {
                    switch (this.statType) {
                        default: { user.positionValue = user.stars; break; }
                        case "DIAMONDS": { user.positionValue = user.diamonds; break; }
                        case "SCOINS": { user.positionValue = user.scoins; break; }
                        case "UCOINS": { user.positionValue = user.ucoins; break; }
                        case "DEMONS": { user.positionValue = user.demons; break; }
                        case "CP": { user.positionValue = user.cp; break; }
                        case "ACCOUNT_ID": { user.positionValue = user.accountID; break; }
                        case "PLAYER_ID": { user.positionValue = user.playerID; break; }
                    }
                }

        }
    
        return user;

    }

    sort() {
        this.cache
            .sort((a, b) => a.accountID > b.accountID ? 1 : -1)
            .sort((a, b) => 
                this.order == 2 ? (a.positionValue < b.positionValue ? 1 : a.positionValue > b.positionValue ? -1 : 0)
                : this.order == 1 ? (a.positionValue > b.positionValue ? 1 : a.positionValue < b.positionValue ? -1 : 0)
                : 0
            )
    }

    jsonEncoding(key, value) {
        switch (key) {
            default: { return super.jsonEncoding(key, value); }
        }
    }

    jsonDecoding(key, value) {
        switch (key) {
            default: { return super.jsonDecoding(key, value); }
        }
    }

    refresh({
        cache = true,
        filter = true,
        positions = true,
        positionValues = true
    }={}) {
        if (cache) this.resetCache();
        if (positionValues) this.setPositionValues();
        if (filter) this.filterCache();
        if (positions) {
            this.sort();
            this.setPositions();
        }
    }

    /**
     * @param {Object} options
     * @param {boolean} [options.clear = true] Whether to clear previous selections
     * @param  {...BigInt|string|number} value 
     */

    selectByAccountID({
        clear = true
    }={}, ...value) {
        this.cache.forEach(u => {
            if (clear) u.flags.selected = false;
            if (`${u.accountID}` === `${value}`) u.flags.selected = true;
        });
    }

    /**
     * @param {boolean} [options.clear = true] Whether to clear previous selections
     * @param  {...BigInt|string|number} value 
     */

    selectByPlayerID({
        clear = true
    }={}, ...value) {
        this.cache.forEach(u => {
            if (clear) u.flags.selected = false;
            if (`${u.playerID}` === `${value}`) u.flags.selected = true;
        });
    }

    /**
     * @param {boolean} [options.clear = true] Whether to clear previous selections
     * @param  {...BigInt|string|number} value 
     */

    selectByDisID({
        clear = true
    }={}, ...value) {
        this.cache.forEach(u => {
            if (clear) u.flags.selected = false;
            if (`${u.disID}` === `${value}`) u.flags.selected = true;
        });
    }

    resetCache() {}

}

/**
 * @description The full user entry cache for the leaderboard
 * @type {UserUL[]}
 */

Leaderboard.CACHE = [];

module.exports = Leaderboard;