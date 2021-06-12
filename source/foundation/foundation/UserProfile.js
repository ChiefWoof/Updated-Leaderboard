"use strict";

const User = require("./User");
const Color = require("../util/Color");
const BanFrom = require("../util/BanFrom");
const IconData = require("../structures/IconData");
const PROPERTY_LIST = (require("../properties/foundation").UserProfile);

/**
 * @description Representation of a UL User's profile
 * @extends {User}
 */

class UserProfile extends User {

    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    /**
     * @description Creates an GD user object for UL database conversion
     */

    getObjGDUser() {
        return {
            accountID: this.accountID,
            sg: this.inSG,
            locked: this.banned,
            setBan: this.bannedSettings,
            banFrom: this.getSetBansStringified() || null,
            playerID: this.playerID,
            username: this.username,
            stars: this.stars,
            diamonds: this.diamonds,
            scoins: this.scoins,
            ucoins: this.ucoins,
            demons: this.demons,
            cp: this.cp,
            mod: this.mod,
            iconData: this.getIconDataStringifed(),
            pastUsernames: this.pastUsernames.length === 0 ? null : this.pastUsernames.join(","),
            refreshPrevious: this.lastRefreshed ? this.lastRefreshed.toISOString() : null,
            region: this.areaRegion,
            country: this.areaCountry,
            state: this.areaSector,
            mobile: this.isMobile,
            pc: this.isPC,
            discord: this.disID > 0 ? `${this.disTag ? this.disTag : ""}*${this.disID}` : null,
            bio: this.bio,
            youtube: this.youtube,
            twitter: this.twitter,
            twitch: this.twitch,
            server: this.server,
            pcolor: this.pcolor.isPreset() ? this.pcolor.color : this.pcolor.getHex(),
            bgprog: this.bgprog,
            github: this.github,
            instagram: this.instagram
        };
    }

    /**
     * @description Retrives the stringifed form of the leaderboard bans
     * @returns {string}
     */

    getSetBansStringified() { return BanFrom.stringify(this); }

    /**
     * @description Retrives the stringifed form of the icon data
     * @returns {string}
     */

    getIconDataStringifed() { return this.getIconData().stringify(); }

    /**
     * @description Retrives an IconData object of the icon data
     * @returns {IconData}
     */

    getIconData() { return new IconData().buildByObj(this); }

    /**
     * @description Whether the user has previously had or currently has the entered username
     * @param {string} username
     * @returns {boolean}
     */

    hasHadUsername(username) { return this.pastUsernames.some(v => v.toLowerCase() === username.toLowerCase()); }

    /**
     * @description Whether the user should be banned from the net score leaderboard
     * @returns {boolean}
     */

    isBannedNet() {
        return [
            this.bannedStars,
            this.bannedDiamonds,
            this.bannedScoins,
            this.bannedUcoins,
            this.bannedDemons,
            this.bannedCP
        ].includes(true);
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
     * @description Whether the user's info should be displayed
     * @returns {boolean}
     */

    showInfo() { return !(this.banned || this.bannedSettings); }
    
    build(data) {
        data = this.parse(data);
        super.build(data);

        /**
         * @description Whether the user is banned from the UL
         * @default false
         * @type {boolean}
         */

        this.banned = "banned" in data ? data.banned : false;

        /**
         * @description Whether the user is banned from adjusting user settings
         * @default false
         * @type {boolean}
         */

        this.bannedSettings = "bannedSettings" in data ? data.bannedSettings : false;

        /**
         * @description The date the user's data was last refreshed
         * @default 0n
         * @type {?Date}
         */

        this.lastRefreshed = "lastRefreshed" in data ? data.lastRefreshed : null;

        /**
         * @description Whether the user is banned from the UL stars leaderboard
         * @default false
         * @type {boolean}
         */

        this.bannedStars = "bannedStars" in data ? data.bannedStars : false;

        /**
         * @description Whether the user is banned from the UL diamonds leaderboard
         * @default false
         * @type {boolean}
         */

        this.bannedDiamonds = "bannedDiamonds" in data ? data.bannedDiamonds : false;

        /**
         * @description Whether the user is banned from the UL secret coins leaderboard
         * @default false
         * @type {boolean}
         */

        this.bannedScoins = "bannedScoins" in data ? data.bannedScoins : false;

        /**
         * @description Whether the user is banned from the UL user coins leaderboard
         * @default false
         * @type {boolean}
         */

        this.bannedUcoins = "bannedUcoins" in data ? data.bannedUcoins : false;

        /**
         * @description Whether the user is banned from the UL demons leaderboard
         * @default false
         * @type {boolean}
         */

        this.bannedDemons = "bannedDemons" in data ? data.bannedDemons : false;

        /**
         * @description Whether the user is banned from the UL creator points leaderboard
         * @default false
         * @type {boolean}
         */

        this.bannedCP = "bannedCP" in data ? data.bannedCP : false;

        /**
         * @description A list of the player's current name and previous names on the UL
         * @default null
         * @type {string[]}
         */

        this.pastUsernames = "pastUsernames" in data ? data.pastUsernames : [];

        /**
         * @description Player's set region
         * @default null
         * @type {?string}
         */

        this.areaRegion = "areaRegion" in data ? data.areaRegion : null;

        /**
         * @description Player's set country
         * @default null
         * @type {?string}
         */

        this.areaCountry = "areaCountry" in data ? data.areaCountry : null;

        /**
         * @description Player's set state or province
         * @default null
         * @type {?string}
         */

        this.areaSector = "areaSector" in data ? data.areaSector : null;

        /**
         * @description Player's set bio
         * @default null
         * @type {?string}
         */

        this.bio = "bio" in data ? data.bio : null;

        /**
         * @description Player's set profile color
         * @default new Color()
         * @type {Color}
         */

        this.pcolor = "pcolor" in data ? data.pcolor : new Color();

        /**
         * @description Player's set background progression chart image link
         * @default null
         * @type {?string}
         */

        this.bgprog = "bgprog" in data ? data.bgprog : null;
        
        return this;
    }

    buildByObjGDUser({
        accountID,
        sg: inSG, locked: banned, setBan: bannedSettings,
        playerID, username,
        stars, diamonds, scoins, ucoins, demons, cp,
        mod, pastUsernames,
        refreshPrevious: lastRefreshed,
        region: areaRegion, country: areaCountry, state: areaSector,
        mobile: isMobile, pc: isPC,
        youtube, twitter, twitch,
        bio, server,
        pcolor, bgprog,
        github, instagram,
        banFrom="",
        iconData="",
        discord=""
    }) {
        return this.buildByObj(Object.assign({}, {
            accountID, inSG,  banned, bannedSettings, playerID, username,
            stars, diamonds, scoins, ucoins, demons, cp,
            mod, pastUsernames, lastRefreshed,
            areaRegion, areaCountry, areaSector,
            isMobile, isPC,
            youtube, twitter, twitch, bio, server,
            pcolor, bgprog,
            github, instagram
        },
        BanFrom.parse(banFrom),
        new IconData(iconData).getObj(),
        {
            disTag: discord.substr(0, discord.lastIndexOf("*")),
            disID: discord.substr(discord.lastIndexOf("*") + 1)
        }));
    }

    
    // This is for documentation purposes

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBanned(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBannedSettings(value=false) { return this; }

    /**
     * @default null
     * @param {?Date|string|number} [value=null]
     */

    setLastRefreshed(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBannedStars(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBannedDiamonds(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBannedScoins(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBannedUcoins(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBannedDemons(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setBannedCP(value=false) { return this; }

    /**
     * @default []
     * @param {...string} [value=...*]
     */

    setPastUsernames(...values) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setAreaRegion(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setAreaCountry(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setAreaSector(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setBio(value=null) { return this; }

    /**
     * @default null
     * @param {Color|number|string} [value=null]
     */

    setPColor(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setBGProg(value=null) { return this; }

}

module.exports = UserProfile;