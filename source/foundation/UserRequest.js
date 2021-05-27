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

    static PROPERTY_LIST = PROPERTY_LIST;
    static REQUIREMENTS_GENERAL = REQUEST_REQUIREMENTS;
    static REQUIREMENTS_NORMAL = REQUEST_REQUIREMENTS_NORMAL;
    static REQUIREMENTS_LINKED = REQUEST_REQUIREMENTS_LINKED;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Checks if the user is requestable
     * @returns {boolean}
     */

    isRequestable({ checkIfOnUL=true, checkIfOnHL=true, checkIsLinked=true }={}, { reqGen=this.checkRequirementsGeneral(), reqNor=this.checkRequirementsNormal(), reqLink=this.checkRequirementsLinked() }={}) {
        return (checkIfOnHL && this.onHL) || (checkIfOnUL && this.onUL)
        ? false
        : this.passesRequirements(checkIsLinked, { reqGen, reqNor, reqLink });
    }

    /**
     * @description Checks if the user is requestable
     * @returns {boolean}
     */

    passesRequirements(checkIsLinked=true, { reqGen=this.checkRequirementsGeneral(), reqNor=this.checkRequirementsNormal(), reqLink=this.checkRequirementsLinked() }={}) {
        return reqGen.length > 0
        || reqNor.length > 0
        || (checkIsLinked && this.isLinked() ? reqLink.length > 0 : false);
    }

    /**
     * @description Checks if the user is linked
     * @returns {boolean}
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
    
    build(data) {
        data = this.parse(data);
        super.build(data);

        /**
         * @description The user's Geometry Dash mod status
         * `0` - None
         * `1` - Regular mod
         * `2` - Elder mod
         * @type {BigInt}
         */

        this.mod = "mod" in data ? data.mod : 0n;

        /**
         * @description ID representation of the sender's Discord account
         * @type {BigInt}
         */

        this.senderDisID = "senderDisID" in data ? data.senderDisID : 0n;

        /**
         * @description Senders's Discord tag
         * @type {?string}
         */

        this.senderDisTag = "senderDisTag" in data ? data.senderDisTag : null;

        /**
         * @description ID representation of a linked user's Discord account
         * @type {BigInt}
         */

        this.linkedDisID = "linkedDisID" in data ? data.linkedDisID : 0n;

        /**
         * @description Linked user's Discord tag
         * @type {?string}
         */

        this.linkedDisTag = "linkedDisTag" in data ? data.linkedDisTag : null;

        /**
         * @description ID representation of the admin that manually set the sender
         * @type {BigInt}
         */

        this.overriderDisID = "linkedDisID" in data ? data.linkedDisID : 0n;

        /**
         * @description Discord tag of the admin that manually set the sender
         * @type {?string}
         */

        this.overriderDisTag = "linkedDisTag" in data ? data.linkedDisTag : null;

        /**
         * @description ID representation of the guild the request was sent from
         * @type {BigInt}
         */

        this.guildID = "guildID" in data ? data.guildID : 0n;

        /**
         * @description Name of the guild the request was sent from
         * @type {?string}
         */

        this.guildName = "guildName" in data ? data.guildName : null;

        /**
         * @description Whether the user is on the UL
         * @type {boolean}
         */

        this.onUL = "onUL" in data ? data.onUL : false;

        /**
         * @description Whether the user is on the UL Hacker List
         * @type {boolean}
         */

        this.onHL = "onHL" in data ? data.onHL : false;

        /**
         * @description Whether the user is in the "Star Grinders" Discord server
         * @type {boolean}
         */

        this.inSG = "inSG" in data ? data.inSG : false;

        /**
         * @description Whether the user is a staff of the official GD server
         * @type {boolean}
         */

        this.gdServerStaff = "gdServerStaff" in data ? data.gdServerStaff : false;

        /**
         * @description GD playerID of the requested player
         * @type {BigInt}
         */

        this.playerID = "playerID" in data ? data.playerID : 0n;

        /**
         * @description GD accountID of the requested player
         * @type {BigInt}
         */

        this.accountID = "accountID" in data ? data.accountID : 0n;

        /**
         * @description GD username of the requested player
         * @type {BigInt}
         */

        this.username = "username" in data ? data.username : null;

        /**
         * @description The GD Cube ID of the requested player
         * @type {BigInt}
         */

        this.cubeID = "cubeID" in data ? data.cubeID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @type {BigInt}
         */

        this.shipID = "shipID" in data ? data.shipID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @type {BigInt}
         */

        this.ballID = "ballID" in data ? data.ballID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @type {BigInt}
         */

        this.ufoID = "ufoID" in data ? data.ufoID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @type {BigInt}
         */

        this.dartID = "dartID" in data ? data.dartID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @type {BigInt}
         */

        this.robotID = "robotID" in data ? data.robotID : 1n;

        /**
         * @description The GD Cube ID of the requested player
         * @type {BigInt}
         */

        this.spiderID = "spiderID" in data ? data.spiderID : 1n;
        
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

}

module.exports = UserRequest;
