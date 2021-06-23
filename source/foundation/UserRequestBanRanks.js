"use strict";

const StatsObject = require("./StatsObject");
const PROPERTY_LIST = (require("../properties/foundation").UserRequestBanRanks);

const { REQUEST_BAN_RANKS_LIMITS } = require("../util/Constants");
const {
    stars: LIMIT_STARS
} = REQUEST_BAN_RANKS_LIMITS;

const Attachment = require("./Attachment");

/**
 * @description Representation of a leaderboard mod request to ban a user
 * @extends {StatsObject}
 */

class UserRequestBanRanks extends StatsObject {

    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;

    static LIMITS = REQUEST_BAN_RANKS_LIMITS;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @returns {boolean} Whether the provided data is within bounded limits
     */

    withinLimits() {
        return this.stars < LIMIT_STARS;
    }

    /**
     * @returns {boolean} Whether the provided data is appropriate for the request
     */

    isAcceptable() {
        return this.description
        && this.username
        && this.playerID > 0
        && this.accountID > 0
        && this.withinLimits();
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
     * @description Appends an attachment to the attachment array
     * @param {Attachment} attachment The attachment to add
     * @param {number} [pos=this.attachments.length] the index to place the attachment add (defaults to last)
     * @returns {this}
     */

    addAttachment(attachment, index=this.attachments.length) { return this.setAttachments(...this.attachments.slice(0, index), attachment, ...this.attachments.slice(index)); }
    
    build(data) {

        data = this.parse(data);

        /**
         * @description ID representation of a user's GD accountID
         * @default 0n
         * @type {BigInt}
         */

        this.accountID = "accountID" in data ? data.accountID : 0n;

        /**
         * @description ID representation of a user's GD playerID
         * @default 0n
         * @type {BigInt}
         */

        this.playerID = "playerID" in data ? data.playerID : 0n;

        /**
         * @description User's GD username
         * @default null
         * @type {?string}
         */

        this.username = "username" in data ? data.username : null;

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
         * @description The description for the requested user
         * @default null
         * @type {?string}
         */

        this.description = "description" in data ? data.description : null;

        /**
         * @description list of images related to the request
         * @default []
         * @type {Attachment[]}
         */

        this.attachments = "attachments" in data ? data.attachments : [];

        super.build(data);

        /**
         * @description ID representation of the sender's Discord account
         * @default 0n
         * @type {BigInt}
         */

        this.senderDisID = "senderDisID" in data ? data.senderDisID : 0n;

        /**
         * @description Senders's Discord tag
         * @default null
         * @type {?string}
         */

        this.senderDisTag = "senderDisTag" in data ? data.senderDisTag : null;

        /**
         * @description Whether the user is on the UL
         * @default false
         * @type {boolean}
         */

        this.onUL = "onUL" in data ? data.onUL : false;

        /**
         * @description Whether the user is on the UL Hacker List
         * @default false
         * @type {boolean}
         */

        this.onHL = "onHL" in data ? data.onHL : false;

        /**
         * @description Whether the user is in the "Star Grinders" Discord server
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

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setAccountID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setPlayerID(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setUsername(value=null) { return this; }

    /**
     * @default 0n
     * @param {number} [value=0]
     */

    setMod(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setDescription(value=null) { return this; }

    /**
     * @default null
     * @param {...Attachment} [value]
     */

    setAttachments(...attachments) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSenderDisID(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setSenderDisTag(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setOnUL(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setOnHL(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setInSG(value=false) { return this; }

    /**
     * @default 0n
     * @param {BigInt} [value=0n]
     */

    setRankGlobal(value=0n) { return this; }

}

module.exports = UserRequestBanRanks;
