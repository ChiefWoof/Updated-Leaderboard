"use strict";

const StatsObject = require("./StatsObject");
const PROPERTY_LIST = (require("../properties/foundation").User);

/**
 * @description Representation of a UL User
 * @extends {StatsObject}
 */

class User extends StatsObject {

    static PROPERTIES_LOADED = -1;
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
     * @description Checks if the user is considered a verified player on the UL
     * @returns {boolean}
     */

    isVerified() { return this.accountID > 0; }

    /**
     * @description This is just for easily converting from how the UL bot was
     * initially made to the more object-oriented version of the UL bot (this)
     * and to add the "UGDB" part
     * @param {BigInt} disID Discord user ID of the user being converted
     * @param {string} str The stingifed version of the data
     * @returns 
     */

    buildByOldData(disID=0n, str="") {
        this.setDateAdded(new Date());

        if ([
            "272872694473687041",
            "191709026113945600",
            "275291375409561613",
            "425037168914726923",
            "216708683290247168",
            "278266693757698048"
        ].includes(`${disID}`)) this.setUGDBAdmin(true);

        str.split(":").reduce((v, a, i) => {
            if (i%2 === 0) v.push([+a]);
            else v[Math.floor(i/2)].push(a);
            return v;
        }, []).map(([id, value]) => {
            this.setDisID(disID);
            if (id === 4) {
                if (value === "-2") this.setBlocked(true);
                if (value === "-1") this.setLimited(true);
                if (value === "2") this.setHelper(true);
                if (value === "3") this.setOfficer(true);
                if (value === "4") this.setDev(true);
                if (value === "5") this.setAlpha(true);
            }
            if (id === 83) this.setReasonBlocked(Buffer.from(value, "base64").toString("utf-8"));
            if (id === 24) this.setUsername(value);
            if (id === 26) this.setAccountID(value);
            if (id === 22) this.setDisTag(Buffer.from(value, "base64").toString("utf-8"))
        });

        return this;
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
     * @description Whether the user is able to use bot commands
     * @returns {boolean}
     */

    hasCommandUse() { return !this.blocked; }

    /**
     * @description Whether the user is able to use commands that don't api requests
     * @returns {boolean}
     */

    hasCommandLoadUse() { return this.hasCommandUse() || !this.limited; }

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
    
    build(data) {

        data = this.parse(data);

        /**
         * @description ID representation of a user's index on the UL database
         * @default 0n
         * @type {BigInt}
         */

        this.index = "index" in data ? data.index : 0n;

        /**
         * @description The date the user was added into storage
         * @default 0n
         * @type {?Date}
         */

        this.dateAdded = "dateAdded" in data ? data.dateAdded : null;

        /**
         * @description ID representation of a user's Discord account
         * @default 0n
         * @type {BigInt}
         */

        this.disID = "disID" in data ? data.disID : 0n;

        /**
         * @description User's Discord tag
         * @default null
         * @type {?string}
         */

        this.disTag = "disTag" in data ? data.disTag : null;

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
         * @description Whether the user is banned from command usage
         * @default false
         * @type {boolean}
         */

        this.blocked = "blocked" in data ? data.blocked : false;

        /**
         * @description Whether the user is limited on command usage
         * @default false
         * @type {boolean}
         */

        this.limited = "limited" in data ? data.limited : false;

        /**
         * @description Whether the user is UL Trainee
         * @default false
         * @type {boolean}
         */

        this.trainee = "trainee" in data ? data.trainee : false;

        /**
         * @description Whether the user is UL Helper
         * @default false
         * @type {boolean}
         */

        this.helper = "helper" in data ? data.helper : false;

        /**
         * @description Whether the user is UL Officer
         * @default false
         * @type {boolean}
         */

        this.officer = "officer" in data ? data.officer : false;

        /**
         * @description Whether the user is UL Developer
         * @default false
         * @type {boolean}
         */

        this.dev = "dev" in data ? data.dev : false;

        /**
         * @description Whether the user is the Alpha woof (XShadowWizardX)
         * @default false
         * @type {boolean}
         */

        this.alpha = "alpha" in data ? data.alpha : false;

        /**
         * @description Whether the user is an UltimateGDBot Admin
         * @default false
         * @type {boolean}
         */

        this.ugdbAdmin = "ugdbAdmin" in data ? data.ugdbAdmin : false;

        /**
         * @description Whether the user is a staff member in the official GD server
         * @default false
         * @type {boolean}
         */

        this.gdServerStaff = "gdServerStaff" in data ? data.gdServerStaff : false;

        /**
         * @description Whether the user is a staff member in the official UL server
         * @default false
         * @type {boolean}
         */

        this.ulServerStaff = "ulServerStaff" in data ? data.ulServerStaff : false;

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
         * @description The reason the user was blocked
         * @default null
         * @type {?string}
         */

        this.reasonBlocked = "reasonBlocked" in data ? data.reasonBlocked : null;

        /**
         * @description The reason the user was limited
         * @default null
         * @type {?string}
         */

        this.reasonLimited = "reasonLimited" in data ? data.reasonLimited : null;

        /**
         * @description The total amount of commands the user has used on Discord
         * @default 0n
         * @type {BigInt}
         */

        this.disCommandsUsed = "disCommandsUsed" in data ? data.disCommandsUsed : 0n;

        super.build(data);

        /**
         * @description Whether the user is a member of Star Grinders
         * @default false
         * @type {boolean}
         */

        this.inSG = "inSG" in data ? data.inSG : false;

        /**
         * @description Whether the user is has glow enabled on GD
         * @default false
         * @type {boolean}
         */

        this.hasGlow = "hasGlow" in data ? data.hasGlow : false;

        /**
         * @description The identification number of the player's primary color
         * @default 1n
         * @type {BigInt}
         */

        this.color1 = "color1" in data ? data.color1 : 1n;

        /**
         * @description The identification number of the player's secondary color
         * @default 1n
         * @type {BigInt}
         */

        this.color2 = "color2" in data ? data.color2 : 1n;

        /**
         * @description The identification number of the player's primary gamemode
         * * `0` - Cube
         * * `1` - Ship
         * * `2` - Ball
         * * `3` - UFO
         * * `4` - Dart
         * * `5` - Robot
         * * `6` - Spider
         * @default 0n
         * @type {BigInt}
         */

        this.gamemode = "gamemode" in data ? data.gamemode : 0n;

        /**
         * @description The identification number of what gamemode the player WANTS to display
         * * `0` - Default gamemode
         * * `1` - Cube
         * * `2` - Ship
         * * `3` - Ball
         * * `4` - UFO
         * * `5` - Dart
         * * `6` - Robot
         * * `7` - Spider
         * @default 0n
         * @type {BigInt}
         */

        this.gamemodeOverride = "gamemodeOverride" in data ? data.gamemodeOverride : 0n;

        /**
         * @description The identification number of the player's cube
         * @default 1n
         * @type {BigInt}
         */

        this.cubeID = "cubeID" in data ? data.cubeID : 1n;

        /**
         * @description The identification number of the player's ship
         * @default 1n
         * @type {BigInt}
         */

        this.shipID = "shipID" in data ? data.shipID : 1n;

        /**
         * @description The identification number of the player's ball
         * @default 1n
         * @type {BigInt}
         */

        this.ballID = "ballID" in data ? data.ballID : 1n;

        /**
         * @description The identification number of the player's ufo
         * @default 1n
         * @type {BigInt}
         */

        this.ufoID = "ufoID" in data ? data.ufoID : 1n;

        /**
         * @description The identification number of the player's dart
         * @default 1n
         * @type {BigInt}
         */

        this.dartID = "dartID" in data ? data.dartID : 1n;

        /**
         * @description The identification number of the player's robot
         * @default 1n
         * @type {BigInt}
         */

        this.robotID = "robotID" in data ? data.robotID : 1n;

        /**
         * @description The identification number of the player's spider
         * @default 1n
         * @type {BigInt}
         */

        this.spiderID = "spiderID" in data ? data.spiderID : 1n;

        /**
         * @description The player's youtube channel ID
         * @default null
         * @type {?string}
         */

        this.youtube = "youtube" in data ? data.youtube : null;

        /**
         * @description The player's twitter handle
         * @default null
         * @type {?string}
         */

        this.twitter = "twitter" in data ? data.twitter : null;

        /**
         * @description The player's twitch handle
         * @default null
         * @type {?string}
         */

        this.twitch = "twitch" in data ? data.twitch : null;

        /**
         * @description The player's Discord server invite code
         * @default null
         * @type {?string}
         */

        this.server = "server" in data ? data.server : null;

        /**
         * @description The player's Github handle
         * @default null
         * @type {?string}
         */

        this.github = "github" in data ? data.github : null;

        /**
         * @description The player's Instagram handle
         * @default null
         * @type {?string}
         */

        this.instagram = "instagram" in data ? data.instagram : null;

        /**
         * @description Whether the user plays GD on mobile
         * @default false
         * @type {boolean}
         */

        this.isMobile = "isMobile" in data ? data.isMobile : false;

        /**
         * @description Whether the user plays GD on pc
         * @default false
         * @type {boolean}
         */

        this.isPC = "isPC" in data ? data.isPC : false;

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
         * @description The player's GD rank on the Global leaderboard
         * @default 0n
         * @type {BigInt}
         */

        this.rankGlobal = "rankGlobal" in data ? data.rankGlobal : 0n;

        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setIndex(value=0n) { return this; }

    /**
     * @default null
     * @param {?Date|string|number} [value=null]
     */

    setDateAdded(value=null) { return this; }

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
     * @default null
     * @param {string} [value=null]
     */

    setUsername(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBlocked(value=null) { return this; }

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
     * @default false
     * @param {boolean} [value=false]
     */

    setUGDBAdmin(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setGDServerStaff(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setULServerStaff(value=null) { return this; }

    /**
     * @default 0n
     * @param {number} [value=0]
     */

    setMod(value=0n) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setReasonBlocked(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setReasonLimited(value=null) { return this; }

    /**
     * @default 0n
     * @param {number} [value=0n]
     */

    setDisCommandsUsed(value=0n) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setInSG(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setHasGlow(value=false) { return this; }

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
     * @param {number} [value=0n]
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
     * @default null
     * @param {string} [value=null]
     */

    setServer(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setGithub(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setInstagram(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setIsMobile(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setIsPC(value=false) { return this; }

    /**
     * @default 0n
     * @param {BigInt} [value=0n]
     */

    setGamemodeOverride(value=0n) { return this; }

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
     * @default 0n
     * @param {BigInt} [value=0n]
     */

    setRankGlobal(value=0n) { return this; }

}

module.exports = User;
