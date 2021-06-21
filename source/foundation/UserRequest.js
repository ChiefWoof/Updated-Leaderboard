"use strict";

const StatsObject = require("./StatsObject");
const PROPERTY_LIST = (require("../properties/foundation").UserRequest);
const {
    REQUEST_REQUIREMENTS,
    REQUEST_REQUIREMENTS_NORMAL,
    REQUEST_REQUIREMENTS_LINKED
} = require("../util/Constants");

function requirementCheck(requirements=new Map(), data={}) {
    if (!(requirements instanceof Map))
        throw new Error("Requirements is not an instance of Map");
    return [...requirements.entries()].reduce((v, [id, value]) => {
        let reqs = Object.entries(value);
        if (reqs.length > 0 && reqs.every(([k, v]) => k in data ? typeof v === "number" ? data[k] >= v : data[k] === v : false))
            v.push(id);
        return v;
    }, []);
}

/**
 * @description Representation of a UL request for a GD user
 * @extends {StatsObject}
 */

class UserRequest extends StatsObject {

    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;
    static REQUIREMENTS_GENERAL = REQUEST_REQUIREMENTS;
    static REQUIREMENTS_NORMAL = REQUEST_REQUIREMENTS_NORMAL;
    static REQUIREMENTS_LINKED = REQUEST_REQUIREMENTS_LINKED;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @returns {boolean} Whether the provided data provides use
     */

    isUseable() { return this.accountID > 0; }

    /**
     * @returns {boolean} Whether the user is requestable
     */

    isRequestable({ checkIfOnUL=true, checkIfOnHL=true, checkIsLinked=true }={}, { reqGen=this.checkRequirementsGeneral(), reqNor=this.checkRequirementsNormal(), reqLink=this.checkRequirementsLinked() }={}) {
        return !this.isUseable()
            ? false
        : !this.passesStatusChecks({ checkIfOnUL, checkIfOnHL })
            ? false
        : this.passesRequirements(checkIsLinked, { reqGen, reqNor, reqLink });
    }

    /**
     * @returns {boolean} Whether the user passes status checks
     */

    passesStatusChecks({ checkIfOnUL=true, checkIfOnHL=true }={}) {
        return !((checkIfOnHL && this.onHL) || (checkIfOnUL && this.onUL))
    }

    /**
     * @returns {boolean} Whether the user passes specified request requirements
     */

    passesRequirements(checkIsLinked=true, { reqGen=this.checkRequirementsGeneral(), reqNor=this.checkRequirementsNormal(), reqLink=this.checkRequirementsLinked() }={}) {
        return reqGen.length > 0
        || reqNor.length > 0
        || (checkIsLinked && this.isLinked() ? reqLink.length > 0 : false);
    }

    /**
     * @returns {boolean} Whether the user has a linked Discord account
     */

    isLinked() { return this.linkedDisID > 0; }

    /**
     * @description Looks to see what GENERAL requirements the user meets
     * @returns {number[]} the passed requirements ID
     */

    checkRequirementsGeneral() { return requirementCheck(this.constructor.REQUIREMENTS_GENERAL, this); }

    /**
     * @description Looks to see what NORMAL requirements the user meets
     * @returns {number[]} the passed requirements ID
     */

    checkRequirementsNormal() { return requirementCheck(this.constructor.REQUIREMENTS_NORMAL, this); }
    
    /**
     * @description Looks to see what LINKED requirements the user meets
     * @returns {number[]} the passed requirements ID
     */

    checkRequirementsLinked(checkIfLinked=true) {
        return checkIfLinked && !this.isLinked()
        ? []
        : requirementCheck(this.constructor.REQUIREMENTS_LINKED, this);
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
    
    build(data) {
        data = this.parse(data);
        super.build(data);

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
         * @description ID representation of a linked user's Discord account
         * @default 0n
         * @type {BigInt}
         */

        this.linkedDisID = "linkedDisID" in data ? data.linkedDisID : 0n;

        /**
         * @description Linked user's Discord tag
         * @default null
         * @type {?string}
         */

        this.linkedDisTag = "linkedDisTag" in data ? data.linkedDisTag : null;

        /**
         * @description ID representation of the admin that manually set the sender
         * @default 0n
         * @type {BigInt}
         */

        this.overriderDisID = "linkedDisID" in data ? data.linkedDisID : 0n;

        /**
         * @description Discord tag of the admin that manually set the sender
         * @default null
         * @type {?string}
         */

        this.overriderDisTag = "linkedDisTag" in data ? data.linkedDisTag : null;

        /**
         * @description Discord ID of the user that handled the request
         * @default 0n
         * @type {BigInt}
         */

        this.handlerDisID = "handlerDisID" in data ? data.handlerDisID : 0n;

        /**
         * @description Discord tag of the user that handled the request
         * @default null
         * @type {?string}
         */

        this.handlerDisTag = "handlerDisTag" in data ? data.handlerDisTag : null;

        /**
         * @description ID representation of the guild the request was sent from
         * @default 0n
         * @type {BigInt}
         */

        this.guildID = "guildID" in data ? data.guildID : 0n;

        /**
         * @description Name of the guild the request was sent from
         * @default null
         * @type {?string}
         */

        this.guildName = "guildName" in data ? data.guildName : null;

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
         * @description Whether the user is a staff of the official GD server
         * @default false
         * @type {boolean}
         */

        this.gdServerStaff = "gdServerStaff" in data ? data.gdServerStaff : false;

        /**
         * @description GD playerID of the requested player
         * @default 0n
         * @type {BigInt}
         */

        this.playerID = "playerID" in data ? data.playerID : 0n;

        /**
         * @description GD accountID of the requested player
         * @default 0n
         * @type {BigInt}
         */

        this.accountID = "accountID" in data ? data.accountID : 0n;

        /**
         * @description GD username of the requested player
         * @default null
         * @type {BigInt}
         */

        this.username = "username" in data ? data.username : null;

        /**
         * @description youtube channel ID of the requested player
         * @default null
         * @type {BigInt}
         */

        this.youtube = "youtube" in data ? data.youtube : null;

        /**
         * @description twitter username of the requested player
         * @default null
         * @type {BigInt}
         */

        this.twitter = "twitter" in data ? data.twitter : null;

        /**
         * @description twitch username of the requested player
         * @default null
         * @type {BigInt}
         */

        this.twitch = "twitch" in data ? data.twitch : null;

        /**
         * @description The user's primary icon color
         * @default 1n
         * @type {BigInt}
         */

        this.color1 = "color1" in data ? data.color1 : 1n;

        /**
         * @description The user's secondary icon color
         * @default 1n
         * @type {BigInt}
         */

        this.color2 = "color2" in data ? data.color2 : 0n;

        /**
         * @description The user's main GD icon
         * @default 0n
         * @type {BigInt}
         */

        this.gamemode = "gamemode" in data ? data.gamemode : 0n;

        /**
         * @description The GD Cube ID of the requested player
         * @default 1n
         * @type {BigInt}
         */

        this.cubeID = "cubeID" in data ? data.cubeID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @default 1n
         * @type {BigInt}
         */

        this.shipID = "shipID" in data ? data.shipID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @default 1n
         * @type {BigInt}
         */

        this.ballID = "ballID" in data ? data.ballID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @default 1n
         * @type {BigInt}
         */

        this.ufoID = "ufoID" in data ? data.ufoID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @default 1n
         * @type {BigInt}
         */

        this.dartID = "dartID" in data ? data.dartID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @default 1n
         * @type {BigInt}
         */

        this.robotID = "robotID" in data ? data.robotID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @default 1n
         * @type {BigInt}
         */

        this.spiderID = "spiderID" in data ? data.spiderID : 1n;

        /**
         * @description Whether the sender should be direct messaged upon successfully accepted request
         * @default false
         * @type {boolean}
         */

        this.dm = "dm" in data ? data.dm : false;

        /**
         * @description The difficulty in determining a user's legitimacy
         * @default 0n
         * @type {BigInt}
         */

        this.difficulty = "difficulty" in data ? data.difficulty : 0n;
        
        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 0
     * @param {number} [value=0]
     */

    setMod(value=0) { return this; }

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
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setLinkedDisID(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setLinkedDisTag(value=null) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setOverriderDisID(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setOverriderDisTag(value=null) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setHandlerDisID(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setHandlerDisTag(value=null) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setGuildID(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setGuildName(value=null) { return this; }

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
     * @default false
     * @param {boolean} [value=false]
     */

    setGDServerStaff(value=false) { return this; }

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
     * @default null
     * @param {string} [value=null]
     */

    setYoutube(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setTwitter(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setTwitch(value=null) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setColor1(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setColor2(value=1n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setGamemode(value=0n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setCubeID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setShipID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setBallID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setUFOID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setDartID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setRobotID(value=1n) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setSpiderID(value=1n) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setDM(value=false) { return this; }

    /**
     * @default 1n
     * @param {?number|string|BigInt} [value=1n]
     */

    setDifficulty(value=1n) { return this; }

}

module.exports = UserRequest;
