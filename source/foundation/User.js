"use strict";

const StatsObject = require("./StatsObject");
const PROPERTY_LIST = (require("../properties/foundation").User);

/**
 * @description Representation of a UL User
 * @extends {StatsObject}
 */

class User extends StatsObject {

    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Checks if the user is a helper, officer, developer, or alpha
     * @returns {boolean}
     */

    isHelper() {
        return this.helper
        || this.officer
        || this.dev
        || this.alpha;
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

        /**
         * @description ID representation of a user's Discord account
         * @type {BigInt}
         */

        this.disID = "disID" in data ? data.disID : 0n;

        /**
         * @description User's Discord tag
         * @type {?string}
         */

        this.disTag = "disTag" in data ? data.disTag : null;

        /**
         * @description ID representation of a user's GD playerID
         * @type {BigInt}
         */

        this.playerID = "playerID" in data ? data.playerID : 0n;

        /**
         * @description ID representation of a user's GD accountID
         * @type {BigInt}
         */

        this.accountID = "accountID" in data ? data.accountID : 0n;

        /**
         * @description Whether the user is banned from command usage
         * @type {boolean}
         */

        this.banned = "banned" in data ? data.banned : false;

        /**
         * @description Whether the user is limited on command usage
         * @type {boolean}
         */

        this.limited = "limited" in data ? data.limited : false;

        /**
         * @description Whether the user is UL Trainee
         * @type {boolean}
         */

        this.trainee = "trainee" in data ? data.trainee : false;

        /**
         * @description Whether the user is UL Helper
         * @type {boolean}
         */

        this.helper = "helper" in data ? data.helper : false;

        /**
         * @description Whether the user is UL Officer
         * @type {boolean}
         */

        this.officer = "officer" in data ? data.officer : false;

        /**
         * @description Whether the user is UL Developer
         * @type {boolean}
         */

        this.dev = "dev" in data ? data.dev : false;

        /**
         * @description Whether the user is the Alpha woof (XShadowWizardX)
         * @type {boolean}
         */

        this.alpha = "alpha" in data ? data.alpha : false;

        /**
         * @description The user's Geometry Dash mod status
         * `0` - None
         * `1` - Regular mod
         * `2` - Elder mod
         * @type {BigInt}
         */

        this.mod = "mod" in data ? data.mod : 0n;

        super.build(data);

        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setDisID(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setDisTag(value=null) { return this; }

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
     * @default false
     * @param {boolean} [value=false]
     */

    setBanned(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setLimited(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setTrainee(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setHelper(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setOfficer(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setDev(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setAlpha(value=null) { return this; }

    /**
     * @default 0
     * @param {number} [value=0]
     */

    setMod(value=0) { return this; }

}

module.exports = User;