"use strict";

const Base = require("./Base");
const UserULFlags = require("./UserULFlags");

/**
 * @typedef {"GENERAL"
 * | "GLOBAL_RANK_MILESTONE"
 * | "GD_MOD_UPDATE"
 * | "STARS_MILESTONE"
 * | "DIAMONDS_MILESTONE"
 * | "SCOINS_MILESTONE"
 * | "UCOINS_MILESTONE"
 * | "DEMONS_MILESTONE"
 * | "CP_MILESTONE"
 * | "USERNAME_CHANGE"
 * } TYPES
 */

class Notification extends Base {

    constructor() {

        super();

        /**
         * @description The type of notification
         * @type {TYPES}
         */

        this.type = null;

        /**
         * @description The notification's text value
         * @type {?string}
         */

        this.value = null;

        /**
         * @description The notification's old text value
         * @type {?string}
         */

        this.valueOld = null;

        /**
         * @description The ul user identifier
         * @type {BigInt}
         */

        this.ulID = 0n;

        /**
         * @description The user's GD account identifier
         * @type {BigInt}
         */

        this.accountID = 0n;

        /**
         * @description The user's GD player identifier
         * @type {BigInt}
         */

        this.playerID = 0n;

        /**
         * @description The user's GD username
         * @type {?string}
         */

        this.username = null;

        /**
         * @description The ul user flags
         * @type {UserULFlags}
         */

        this.flags = new UserULFlags();

    }

    send() { return false; }

}

module.exports = Notification;