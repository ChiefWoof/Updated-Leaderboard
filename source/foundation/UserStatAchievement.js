"use strict";

const Base = require("./Base");
const PROPERTY_LIST = (require("../properties/foundation").UserStatAchievement);

const MathExtended = require("../util/MathExtended");

/**
 * @description Object of data to compare for UserStatAchievements
 * @extends {Base}
 */

class UserStatAchievement extends Base {

    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Whether the given data has an achievement
     * @returns {boolean}
     */

    isUseable() { return this.isModChange() || this.isUsernameChange() || this.isStatAchievement(); }

    /**
     * @description Whether the achievement should be announced
     * * Negative stat gains are disabled
     */

    isAnnounceable() {
        return this.isUseable() && !this.isStatAchievement()
        ? true
        : this.isPositiveDifferenceStat();
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
     * @description Whether the user was previously a mod
     * @returns {boolean}
     */


    wasMod() { return this.modOld > 0; }

    /**
     * @description Whether the user was previously a mod
     * @returns {boolean}
     */


    wasModElder() { return this.modOld > 1; }

    /**
     * @description Whether this is a stat achievement
     * @returns {boolean}
     */

    isStatAchievement() { return this.statType > 0; }

    /**
     * @description Whether this is a username change
     * @returns {boolean}
     */

    isUsernameChange() { return this.username && this.usernameOld && this.username.toLowerCase() != this.usernameOld.toLowerCase(); }

    /**
     * @description Whether this is a mod status change
     * @returns {boolean}
     */

    isModChange() { return this.mod != this.modOld; }

    /**
     * @description Whether this is a positive change
     * @returns {boolean}
     */

    isPositive() {
        return this.isStatAchievement() ? this.getDifferenceStat() > 0
        : this.isModChange() ? this.mod > this.modOld
        : false;
    }

    /**
     * @description Whether this is a negative change
     * @returns {boolean}
     */

    isNegative() {
        return this.isStatAchievement() ? this.getDifferenceStat() < 0
        : this.isModChange() ? this.mod < this.modOld
        : false;
    }

    /**
     * @description Retrives the difference between stat values
     * @returns {number|BigInt}
     */

    getDifferenceStat() { return this.statCurrent - this.statOld; }

    /**
     * @description Whether there is a difference in a stat by the threshold
     * @returns {boolean}
     */

    hasDifferenceByThreshold(threshold=this.threshold, statOld=this.statOld, statCurrent=this.statCurrent) {
        return threshold > 0
        ? this.getStatByThreshold(threshold, statOld) != this.getStatByThreshold(threshold, statCurrent)
        : false;
    }

    /**
     * @description If a threshold is present, returns the threshold
     * value that's closest to the statValue else 0n
     * @returns {BigInt}
     */

    getStatByThreshold(threshold=this.threshold, statValue=0n) {
        return threshold > 0
        ? threshold * MathExtended.floor(statValue/threshold)
        : 0n;
    }

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
        d.inSG = this.inSG && !stats.inSG ? 1
        : !this.inSG && stats.inSG ? -1
        : 0
        d.onTop = this.onTop && !stats.onTop ? 1
        : !this.onTop && stats.onTop ? -1
        : 0
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
         * @description Whether the user is on the GD Top 1000
         * @default false
         * @type {boolean}
         */

        this.onTop = "onTop" in data ? data.onTop : false;

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
         * @description User's old GD username
         * @default null
         * @type {?string}
         */

        this.usernameOld = "usernameOld" in data ? data.usernameOld : null;

        /**
         * @description The user's previous Geometry Dash mod status
         * `0` - None
         * `1` - Regular mod
         * `2` - Elder mod
         * @default 0n
         * @type {BigInt}
         */

        this.modOld = "modOld" in data ? data.modOld : 0n;

        /**
         * @description The previous count for a stat
         * @default 0n
         * @type {BigInt}
         */

        this.statOld = "statOld" in data ? data.statOld : 0n;

        /**
         * @description The current count for a stat
         * @default 0n
         * @type {BigInt}
         */

        this.statCurrent = "statCurrent" in data ? data.statCurrent : 0n;

        /**
         * @description The threshold for a stat
         * @default 0n
         * @type {BigInt}
         */

        this.threshold = "threshold" in data ? data.threshold : 0n;

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
     * @default false
     * @param {boolean} [value=false]
     */

    setOnTop(value=null) { return this; }

    /**
     * @default 0n
     * @param {boolean} [value=0n]
     */

    setStatType(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setUsernameOld(value=null) { return this; }

    /**
     * @default 0n
     * @param {boolean} [value=0n]
     */

    setModOld(value=0n) { return this; }

    /**
     * @default 0n
     * @param {boolean} [value=0n]
     */

    setStatOld(value=0n) { return this; }

    /**
     * @default 0n
     * @param {boolean} [value=0n]
     */

    setStatNew(value=0n) { return this; }

    /**
     * @default 0n
     * @param {boolean} [value=0n]
     */

    setThreshold(value=0n) { return this; }

}

module.exports = UserStatAchievement;
