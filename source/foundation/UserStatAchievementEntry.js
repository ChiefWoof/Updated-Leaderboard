"use strict";

const StatsObject = require("./StatsObject");
const PROPERTY_LIST = (require("../properties/foundation").UserStatAchievementEntry);

/**
 * @description Object of data to compare for UserStatAchievements
 * @extends {StatsObject}
 */

class UserStatAchievementEntry extends StatsObject {

    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Checks if the user is a regular or an elder mod
     * @returns {boolean}
     */

    isMod() { return this.mod > 0; }

    /**
     * @description Checks if the user is an elder mod
     * @returns {boolean}
     */

    isModElder() { return this.mod > 1; }

    /**
     * @description Whether the user has a global rank on GD
     * @returns {boolean}
     */

    hasRank() { return this.rankGlobal > 0; }

    /**
     * @description Whether the user is on the GD Top 100 global ranks
     * @returns {boolean}
     */

    onTop100() { return this.hasRank() && this.rankGlobal <= 100; }

    /**
     * @description Whether the user is on the GD Top players cache
     * @returns {boolean}
     */

    onTop() { return this.hasRank() && this.rankGlobal <= 1000; }

    /**
     * @description Compares using a "compareTo" equivalent for each value
     * @param {UserStatAchievementEntry} stats
     */

    compareTo(stats) {
        if (!(this instanceof UserStatAchievementEntry))
            throw new Error(`"this" is not an instance of the "UserStatAchievementEntry"`);
        if (!(stats instanceof UserStatAchievementEntry))
            throw new Error(`"stats" is not an instance of the "UserStatAchievementEntry"`);
        let d = new UserStatAchievementEntry().buildByObj({
            stars: this.stars - stats.stars,
            diamonds: this.diamonds - stats.diamonds,
            scoins: this.scoins - stats.scoins,
            ucoins: this.ucoins - stats.ucoins,
            demons: this.demons - stats.demons,
            cp: this.cp - stats.cp,
            mod: this.mod - stats.mod
        });
        d.username = this.username && stats.username
        ? this.username.localeCompare(stats.username)
        : null;
        return d;
    }

    build(data) {
        data = this.parse(data);
        super.build(data);

        /**
         * @description User's GD username
         * @default null
         * @type {?string}
         */

        this.username = "username" in data ? data.username : null;

        /**
         * @description User's GD playerID
         * @default 0n
         * @type {BigInt}
         */

        this.playerID = "playerID" in data ? data.playerID : 0n;

        /**
         * @description User's GD accountID
         * @default 0n
         * @type {BigInt}
         */

        this.accountID = "accountID" in data ? data.accountID : 0n;

        /**
         * @description The user's Geometry Dash mod status
         * `0` - None
         * `1` - Regular mod
         * `2` - Elder mod
         * @default 0n
         * @type {BigInt}
         */

        this.mod = "mod" in data ? data.mod : 0n;

        /**
         * @description Whether the user is a member of Star Grinders
         * @default false
         * @type {boolean}
         */

        this.inSG = "inSG" in data ? data.inSG : false;

        /**
         * @description The player's GD rank on the Global leaderboard
         * @default 0n
         * @type {BigInt}
         */

        this.rankGlobal = "rankGlobal" in data ? data.rankGlobal : 0n;

        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default null
     * @param {string} [value=null]
     */

    setUsername(value=null) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setPlayerID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setAccountID(value=0n) { return this; }

    /**
     * @default 0
     * @param {number} [value=0]
     */

    setMod(value=0) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setInSG(value=null) { return this; }

    /**
     * @default 0n
     * @param {BigInt} [value=0n]
     */

    setRankGlobal(value=0n) { return this; }

}

module.exports = UserStatAchievementEntry;