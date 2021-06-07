"use strict";

const StatsObject = require("./StatsObject");
const PROPERTY_LIST = (require("../properties/foundation").UserStatAchievement);

const {
    USER_STATUS: {IS_CREATOR_CP},
    USER_ACHIEVEMENTS_THRESHOLDS: { NET_REQUIREMENT }
} = require("../util/Constants");
const MathExtended = require("../util/MathExtended");

/**
 * @description Object of data to compare for UserStatAchievements
 * @extends {StatsObject}
 */

class UserStatAchievement extends StatsObject {

    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Whether the given data has an achievement
     * @returns {boolean}
     */

    isUseable() { return this.isModChange || this.isUsernameChange() || this.isStatChange(); }

    /**
     * @description Whether the achievement should be announced
     * * Negative stat gains are disabled
     */

    isAnnounceable() {
        return this.isUseable()
        ? this.inSG || this.mod > 0 || this.getModOld() > 0 || this.getNetScore(false) >= NET_REQUIREMENT
            ? this.isStatChange() ? this.isPositive() : true
            : false
        : false;
    }

    /**
     * @description Retrives the difference between stat values
     * @returns {BigInt}
     */

    getDifferenceStat() { return this.statCurrent - this.statOld; }

    /**
     * @description Gets the numerical value of the user's previous mod status
     * @returns {BigInt}
     */

    getModOld() { return this.mod - this.modDifference; }

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
     * @description Whether the user was previously a mod
     * @returns {boolean}
     */

    wasMod() { return this.getModOld() > 0; }

    /**
     * @description Whether the user was previously a mod
     * @returns {boolean}
     */

    wasModElder() { return this.getModOld() > 1; }

    /**
     * @description Whether this is a stat change
     * @returns {boolean}
     */

    isStatChange() { return this.statType > 0; }

    /**
     * @description Whether this is a mod status change
     * @returns {boolean}
     */

    isModChange() { return this.modDifference != 0;}

    /**
     * @description Whether this is a username change
     * @returns {boolean}
     */

    isUsernameChange() { return [this.username, this.usernameOld].every(v => typeof v === "string") && this.username.toLowerCase() !== this.usernameOld.toLowerCase(); }

    /**
     * @description Whether this is a positive change
     * @returns {boolean}
     */

    isPositive() {
        return this.isStatChange() ? this.getDifferenceStat() > 0
        : this.isModChange ? this.modDifference > 0
        : false;
    }

    /**
     * @description Whether this is a negative change
     * @returns {boolean}
     */

    isNegative() {
        return this.isStatChange() ? this.getDifferenceStat() < 0
        : this.isModChange ? this.modDifference < 0
        : false;
    }

    /**
     * @description Whether the user should be considered a level creator
     * @returns {boolean}
     */

    isCreator() { return this.cp >= IS_CREATOR_CP; }

    /**
     * @description Whether there is a difference in a stat by the threshold
     * @returns {boolean}
     */

    hasDifferenceByThreshold(threshold=this.statThreshold, statOld=this.statOld, statCurrent=this.statCurrent) {
        return threshold > 0
        ? this.getStatByThreshold(threshold, statOld) != this.getStatByThreshold(threshold, statCurrent)
        : false;
    }

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
     * @description If a threshold is present, returns the threshold
     * value that's closest to the statValue else 0n
     * @returns {BigInt}
     */

    getStatByThreshold(threshold=this.statThreshold, statValue=0n) {
        return threshold > 0
        ? threshold * MathExtended.floor(BigInt(statValue)/threshold)
        : 0n;
    }

    build(data) {
        data = this.parse(data);

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
         * @description The creator points
         * @default 0n
         * @type {BigInt}
         */

        this.cp = "cp" in data ? data.cp : 0n;

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

        /**
         * @description The stat type
         * `0` - None
         * `1` - Stars
         * `3` - Diamonds
         * `4` - Secret coins
         * `5` - User coins
         * `6` - Demons
         * `7` - Creator points
         * @default 0n
         * @type {BigInt}
         */

        this.statType = "statType" in data ? data.statType : 0n;

        /**
         * @description Current mod status - previous mod status
         * `-1` - Went down by 2
         * `-2` - Went down by 1
         * `0` - No change
         * `1` - Went up by 1
         * `2` - Went up by 2
         * @default 0n
         * @type {BigInt}
         */

        this.modDifference = "modDifference" in data ? data.modDifference : 0n;

        /**
         * @description User's GD username
         * @default null
         * @type {?string}
         */

        this.usernameOld = "usernameOld" in data ? data.usernameOld : null;

        super.build(data);

        /**
         * @description The previous count for a stat
         * @default null
         * @type {?string}
         */

        this.statOld = "statOld" in data ? data.statOld : 0n;

        /**
         * @description The current count for a stat
         * @default null
         * @type {?string}
         */

        this.statCurrent = "statCurrent" in data ? data.statCurrent : 0n;

        /**
         * @description The threshold for a stat
         * @default 0n
         * @type {BigInt}
         */

        this.statThreshold = "threshold" in data ? data.threshold : 0n;

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
     * @default 0n
     * @param {?BigInt|number|string} [value=0n]
     */

    setCP(value=0n) { return this; }

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

    /**
     * @default 0n
     * @param {BigInt} [value=0n]
     */

    setStatType(value=0n) { return this; }

    /**
     * @default 0n
     * @param {BigInt} [value=0n]
     */

    setModDifference(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setUsernameOld(value=null) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setStatOld(value=null) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setStatCurrent(value=null) { return this; }

    /**
     * @default 0n
     * @param {BigInt} [value=0n]
     */

    setStatThreshold(value=0n) { return this; }

}

module.exports = UserStatAchievement;