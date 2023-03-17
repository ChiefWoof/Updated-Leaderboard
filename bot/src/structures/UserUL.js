"use strict";

const StatProgressManager = require("../managers/StatProgressManager");

const Base = require("./Base");
const UserULFlags = require("./UserULFlags");

class UserUL extends Base {

    constructor() {

        super();

        /**
         * @description The ul user identifier
         * @type {BigInt}
         */

        this.ulID = 0n;

        /**
         * @description The ul user flags
         * @type {UserULFlags}
         */

        this.flags = new UserULFlags();

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
         * @description The user's Discord account identifier
         * @type {BigInt}
         */

        this.disID = 0n;

        /**
         * @description The user's Discord account tag
         * @type {?string}
         */

        this.disTag = null;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.stars = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.diamonds = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.scoins = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.ucoins = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.demons = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.cp = 0;

        /**
         * @description Timestamp added to the UL or 0
         * @type {number}
         */

        this.timestampAdded = 0;

        /**
         * @description The user, who added the user, Discord account identifier
         * @type {BigInt}
         */

        this.addedByDisID = 0n;

        /**
         * @description The user's star global rank on GD
         * @type {number}
         */

        this.rankGlobal = 0;

        /**
         * @description The user's GD cube icon identifier
         * @type {BigInt}
         */

        this.cubeID = 0n;

        /**
         * @description The user's GD ship icon identifier
         * @type {BigInt}
         */

        this.shipID = 0n;

        /**
         * @description The user's GD ball icon identifier
         * @type {BigInt}
         */

        this.ballID = 0n;

        /**
         * @description The user's GD ufo icon identifier
         * @type {BigInt}
         */

        this.ufoID = 0n;

        /**
         * @description The user's GD dart icon identifier
         * @type {BigInt}
         */

        this.dartID = 0n;

        /**
         * @description The user's GD robot icon identifier
         * @type {BigInt}
         */

        this.robotID = 0n;

        /**
         * @description The user's GD spider icon identifier
         * @type {BigInt}
         */

        this.spiderID = 0n;

        /**
         * @description The user's GD icon primary color identifier
         * @type {BigInt}
         */

        this.iconColor1ID = 0n;

        /**
         * @description The user's GD icon secondary color identifier
         * @type {BigInt}
         */

        this.iconColor2ID = 0n;

        /**
         * @description The user's GD icon glow identifier (0 = no glow, 1 = glow)
         * @type {BigInt}
         */

        this.glowID = 0n;

        /**
         * @description The user's GD primary gamemode
         * `0` - Cube
         * `1` - Ship
         * `2` - Ball
         * `3` - UFO
         * `4` - Dart
         * `5` - Robot
         * `6` - Spider
         * @type {BigInt}
         */

        this.gamemode = 0n;

        /**
         * @description The user's GD selected gamemode through UL
         * `0` - Default ("gamemode" key)
         * `1` - Cube
         * `2` - Ship
         * `3` - Ball
         * `4` - UFO
         * `5` - Dart
         * `6` - Robot
         * `7` - Spider
         * @type {BigInt}
         */

        this.gamemodeOverride = 0n;

        /**
         * @description Timestamp the user's GD stats were last refreshed or 0
         * @type {number}
         */

        this.timestampStatsRefreshed = 0;

        /**
         * @description The user's region
         * @type {string[]}
         */

        this.pastUsernames = [];

        /**
         * @description The user's region
         * @type {?string}
         */

        this.region = null;

        /**
         * @description The user's country
         * @type {?string}
         */

        this.country = null;

        /**
         * @description The user's state or province
         * @type {?string}
         */

        this.state = null;

        /**
         * @description The user's bio
         * @type {?string}
         */

        this.bio = null;

        /**
         * @description The user's Youtube userID
         * @type {?string}
         */

        this.youtube = null;

        /**
         * @description The user's Twitter username
         * @type {?string}
         */

        this.twitter = null;

        /**
         * @description The user's Twitter username
         * @type {?string}
         */

        this.twitch = null;

        /**
         * @description The user's GitHub username
         * @type {?string}
         */

        this.github = null;

        /**
         * @description The user's Instagram username
         * @type {?string}
         */

        this.instagram = null;

        /**
         * @description The user's Discord server invite
         * @type {?string}
         */

        this.disServerInvite = null;

        /**
         * @description The user's UL profile color
         * @type {?string}
         */

        this.pColor = null;

        /**
         * @description The user's chosen background progression chart image
         * @type {?string}
         */

        this.bgprog = null;

        /**
         * @description The user that requested the UL user's Discord account identifier
         * @type {BigInt}
         */

        this.requestedByDisID = 0n;

        /**
         * @description The user that requested the UL user's Discord account tag
         * @type {?string}
         */

        this.requestedByDisTag = null;

        /**
         * @description Timestamp requested to the UL or 0
         * @type {number}
         */

        this.timestampRequested = 0;

        /**
         * @description The user's position in a list
         * @type {number}
         */

        this.position = 0;

        /**
         * @description The user's numeric value in relation to their position in a list
         * @type {number}
         */

        this.positionValue = 0;

        /**
         * @description The user's stat progression progress
         * @type {StatProgressManager}
         */

        this.progress = new StatProgressManager();

    }

    /**
     * @type {Object}
     */

    get stats() {
        return {
            stars: this.stars,
            diamonds: this.diamonds,
            scoins: this.scoins,
            ucoins: this.ucoins,
            demons: this.demons,
            cp: this.cp
        };
    }

    /**
     * @type {boolean}
     */

    get hasULID() { return this.ulID != 0; }

    jsonEncoding(key, value) {
        switch (key) {
            default: { return super.jsonEncoding(key, value); }
            case "pastUsernames": { return Buffer.from(value.join(","), "utf8").toString("base64"); }
            case "bio":
                case "disTag":
                    { return value ? Buffer.from(value, "utf8").toString("base64") : null; }
            case "progress": { return Array.isArray(value) ? value.reduce((res, entry) => { res.push(entry.toJSON()); return res; }, []) : []; }
        }
    }

    jsonDecoding(key, value) {
        switch (key) {
            default: { return super.jsonDecoding(key, value); }
            case "pastUsernames": { return value ? Buffer.from(value, "base64").toString("utf8").split(",") : []; }
            case "bio": 
                case "disTag":
                    { return value ? Buffer.from(value, "base64").toString("utf8") : null; }
            case "progress": { return Array.isArray(value) ? new StatProgressManager().add(...value.map(entry => new UserUL().fromJSON(entry))) : new StatProgressManager(); }
        }
    }

    saveAsProgressEntry() {
        this.progress.add(new UserUL().fromJSON(this.toJSON()));
        return this;
    }

    setAsProgressEntryCurrent() {
        this.progress.setCurrent(new UserUL().fromJSON(this.toJSON()));
        return this;
    }

    /**
     * @param {string} user 
     */

    updateUsername(username) {
        if (this.username !== null && username.toLowerCase() !== this.username.toLowerCase()) {
            if (this.pastUsernames.length > 0) {
                if (this.pastUsernames.findIndex(u => u.toLowerCase() === username.toLowerCase()) === -1) {
                    this.pastUsernames.push(this.username);
                }
            } else {
                this.pastUsernames.push(this.username);
            }
        }
        this.username = username;
    }

    /**
     * @returns {boolean} Whether the action was successful
     */
    
    async load() { return false; }

    /**
     * @returns {boolean} Whether the action was successful
     */
    
    async loadUserInfoGD() { return false; }

    /**
     * @returns {boolean} Whether the action was successful
     */
    
    async add() { return false; }

    /**
     * @returns {boolean} Whether the action was successful
     */
    
    async save() { return false; }

    /**
     * @returns {boolean} Whether the action was successful
     */
    
    async loadProgress() { return false; }

    /**
     * @returns {boolean} Whether the action was successful
     */
    
    async saveProgress() { return false; }

}

module.exports = UserUL;