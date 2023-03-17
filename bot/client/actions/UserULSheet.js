"use strict";

const Action = require("./Action");

const UserUL = require("../../src/structures/UserUL");

/**
 * @typedef {Object} USER_OBJ
 * @property {BigInt} ulID
 * @property {BigInt} accountID
 * @property {BigInt} playerID
 * @property {string} username
 * @property {BigInt} addedByDisID
 * @property {number} addedTimestamp
 * @property {boolean} inSG
 * @property {boolean} isBanned
 * @property {boolean} isBannedSettings
 * @property {boolean} isBannedStars
 * @property {boolean} isBannedDiamonds
 * @property {boolean} isBannedScoins
 * @property {boolean} isBannedUcoins
 * @property {boolean} isBannedDemons
 * @property {boolean} isBannedCP
 * @property {number} stars
 * @property {number} diamonds
 * @property {number} scoins
 * @property {number} ucoins
 * @property {number} demons
 * @property {number} cp
 * @property {number} mod
 * @property {boolean} isMod
 * @property {boolean} isModElder
 * @property {number} rankGlobal
 * @property {string[]} pastUsernames
 * @property {number} refreshPrevious
 * @property {?string} region
 * @property {?string} country
 * @property {?string} state
 * @property {boolean} isMobile
 * @property {boolean} isPC
 * @property {?string} disTag
 * @property {BigInt} disID
 * @property {?string} bio
 * @property {?string} banGlobalReasoning
 * @property {?string} youtube
 * @property {?string} twitter
 * @property {?string} twitch
 * @property {?string} server
 * @property {?string} pcolor
 * @property {?string} bgprog
 * @property {?string} github
 * @property {?string} instagram
 * @property {BigInt} cubeID
 * @property {BigInt} shipID
 * @property {BigInt} ballID
 * @property {BigInt} ufoID
 * @property {BigInt} dartID
 * @property {BigInt} robotID
 * @property {BigInt} spiderID
 * @property {BigInt} iconColor1ID
 * @property {BigInt} iconColor2ID
 * @property {BigInt} glowID
 * @property {BigInt} gamemode
 * @property {BigInt} gamemodeOverride
 */

class UserULSheetAction extends Action {

    /**
     * @returns {Object<string, USER_OBJ>}
     */

    txtToObj(str) {

        let [ headers, ...data ] = str.replace(/\r\n/g, "").split("\t₪");
        headers = headers.split("\t");

        data = data.reduce((res, v, i) => {

            v = v.split("\t");

            // Headers => RAW OBJ
            let raw = headers.reduce((r, h, i) => {
                r[h] = v[i];
                return r;
            }, {});

            if (/^\d{1,}$/.test(raw.accountID)) {

                let ulID = i + 2;

                let disID = 0n;
                let disTag = null;

                let cubeID = 1n;
                let shipID = 1n;
                let ballID = 1n;
                let ufoID = 1n;
                let dartID = 1n;
                let robotID = 1n;
                let spiderID = 1n;
                let gamemode = 0n;
                let gamemodeOverride = 0n; // 0 = none, > 0 ? # - 1 : gamemode

                let iconColor1ID = 1n;
                let iconColor2ID = 1n;

                let glowID = 0n;

                if (raw.discord && raw.discord != "_") {
                    disID = BigInt((raw.discord.match(/\*\d{1,}$/g) || ["*"])[0].substr(1) || 0);
                    disTag = disID ? raw.discord.replace(/\*\d{1,}/, "") : raw.discord;
                }

                if (raw.iconData && raw.iconData != "_") {
                    raw.iconData.split("#").forEach((str, dataI) => {
                        str.match(/\d{1,}:\d{1,}/g).forEach(entry => {

                            let [key, value] = entry.split(":");
                            key = BigInt(key);
                            value = BigInt(value);

                            if (dataI == 0) {
                                if (key == 1n) cubeID = value;
                                else if (key == 2n) shipID = value;
                                else if (key == 3n) ballID = value;
                                else if (key == 4n) ufoID = value;
                                else if (key == 5n) dartID = value;
                                else if (key == 6n) robotID = value;
                                else if (key == 7n) spiderID = value;
                                else if (key == 98n) gamemodeOverride = value ? ({
                                    cube: 1n,
                                    ship: 2n,
                                    ball: 3n,
                                    ufo: 4n,
                                    dart: 5n,
                                    robot: 6n,
                                    spider: 7n
                                })[raw.gamemode] || 0n : value;
                                else if (key == 99n) gamemode = value;
                            } else if (dataI == 1) {
                                if (key == 1n) iconColor1ID = value;
                                else if (key == 2n) iconColor2ID = value;
                            } else if (dataI == 2) {
                                if (key == 1n) glowID = value;
                            }

                        });
                    });
                }

                res[ulID] = {
                    ulID: BigInt(ulID),
                    accountID: BigInt(raw.accountID),
                    playerID: BigInt(raw.playerID),
                    username: raw.username || null,
                    addedByDisID: raw.timestamp && raw.timestamp != "_" ? BigInt(raw.timestamp.split("*")[1] || 0) : 0n,
                    addedTimestamp: raw.timestamp && raw.timestamp != "_" ? (new Date(raw.timestamp.split("*")[0]).getTime()) || 0 : 0,
                    inSG: /^true$/i.test(raw.sg),
                    isBanned: /^true$/i.test(raw.locked),
                    isBannedSettings: /^true$/i.test(raw.setBan),
                    isBannedStars: /🌟/i.test(raw.banFrom),
                    isBannedDiamonds: /💎/i.test(raw.banFrom),
                    isBannedScoins: /🌕/i.test(raw.banFrom),
                    isBannedUcoins: /⚪️/i.test(raw.banFrom),
                    isBannedDemons: /😈/i.test(raw.banFrom),
                    isBannedCP: /🛠/i.test(raw.banFrom),
                    stars: Number(raw.stars) || 0,
                    diamonds: Number(raw.diamonds) || 0,
                    scoins: Number(raw.scoins) || 0,
                    ucoins: Number(raw.ucoins) || 0,
                    demons: Number(raw.demons) || 0,
                    cp: Number(raw.cp) || 0,
                    mod: Number(raw.mod) || 0,
                    isMod: (Number(raw.mod)) > 0,
                    isModElder: (Number(raw.mod)) > 1,
                    rankGlobal: Number(raw.rankGlobal) || 0,
                    pastUsernames: raw.pastUsernames.split(",").filter(a => a != "_"),
                    refreshPrevious: Number(raw.refreshPrevious),
                    region: raw.region && raw.region != "_" ? raw.region : null,
                    country: raw.country && raw.country != "_" ? raw.country : null,
                    state: raw.state && raw.state != "_" ? raw.state : null,
                    isMobile: /^true$/i.test(raw.mobile),
                    isPC: /^true$/i.test(raw.pc),
                    disTag,
                    disID,
                    bio: raw.bio && raw.bio != "_" ? raw.bio : null,
                    banGlobalReasoning: raw.banGlobalReasoning && raw.banGlobalReasoning != "_" ? raw.banGlobalReasoning : null,
                    youtube: raw.youtube && raw.youtube != "_" ? raw.youtube : null,
                    twitter: raw.twitter && raw.twitter != "_" ? raw.twitter : null,
                    twitch: raw.twitch && raw.twitch != "_" ? raw.twitch : null,
                    server: raw.server && raw.server != "_" ? (raw.server.match(/\w{1,}$/g) || [ null ])[0] : null,
                    pcolor: raw.pcolor && raw.pcolor != "_" ? raw.pcolor : null,
                    bgprog: raw.bgprog && raw.bgprog != "_" ? raw.bgprog : null,
                    github: raw.github && raw.github != "_" ? raw.github : null,
                    instagram: raw.instagram && raw.instagram != "_" ? raw.instagram : null,
                    cubeID,
                    shipID,
                    ballID,
                    ufoID,
                    dartID,
                    robotID,
                    spiderID,
                    iconColor1ID,
                    iconColor2ID,
                    glowID,
                    gamemode,
                    gamemodeOverride
                };

            }

            return res;

        }, {});

        return data;

    }

    /**
     * @param {USER_OBJ} obj 
     * @returns {UserUL}
     */

    userOBJToUserUL(obj) {
        let u = new UserUL();
        
        // IDENTIFICATION
        if (obj.ulID) u.ulID = obj.ulID;
        if (obj.accountID) u.accountID = obj.accountID;
        if (obj.playerID) u.playerID = obj.playerID;
        if (obj.username) u.username = obj.username;
        if (obj.pastUsernames) u.pastUsernames = obj.pastUsernames;

        // FLAGS
        u.flags.bannedStars = obj.isBannedStars;
        u.flags.bannedDiamonds = obj.isBannedDiamonds;
        u.flags.bannedScoins = obj.isBannedScoins;
        u.flags.bannedUcoins = obj.isBannedUcoins;
        u.flags.bannedDemons = obj.isBannedDemons;
        u.flags.bannedCP = obj.isBannedCP;
        
        if (obj.isModElder) u.flags.isGDModElder = true;
        else if (obj.isMod) u.flags.isGDMod = true;

        u.flags.mobilePlayer = obj.isMobile;
        u.flags.pcPlayer = obj.isPC;

        u.flags.settingsLocked = obj.isBannedSettings;
        u.flags.sg = obj.inSG;
        u.flags.verified = obj.isBanned ? false : true;

        // ICONS
        if (obj.cubeID) u.cubeID = obj.cubeID;
        if (obj.shipID) u.shipID = obj.shipID;
        if (obj.ballID) u.ballID = obj.ballID;
        if (obj.ufoID) u.ufoID = obj.ufoID;
        if (obj.dartID) u.dartID = obj.dartID;
        if (obj.robotID) u.robotID = obj.robotID;
        if (obj.spiderID) u.spiderID = obj.spiderID;

        if (obj.iconColor1ID) u.iconColor1ID = obj.iconColor1ID;
        if (obj.iconColor2ID) u.iconColor2ID = obj.iconColor2ID;

        if (obj.glowID) u.glowID = obj.glowID;
        
        if (obj.gamemode) u.gamemode = obj.gamemode;
        if (obj.gamemodeOverride) u.gamemodeOverride = obj.gamemodeOverride;

        // EXTRAS
        if (obj.bgprog) u.bgprog = obj.bgprog;
        if (obj.bio) u.bio = obj.bio;

        if (obj.addedByDisID) u.addedByDisID = obj.addedByDisID;
        if (obj.addedTimestamp) u.timestampAdded = obj.addedTimestamp;

        if (obj.region) u.region = obj.region;
        if (obj.country) u.country = obj.country;
        if (obj.state) u.state = obj.state;
        
        if (obj.stars) u.stars = obj.stars;
        if (obj.diamonds) u.diamonds = obj.diamonds;
        if (obj.scoins) u.scoins = obj.scoins;
        if (obj.ucoins) u.ucoins = obj.ucoins;
        if (obj.demons) u.demons = obj.demons;
        if (obj.cp) u.cp = obj.cp;

        if (obj.youtube) u.youtube = obj.youtube;
        if (obj.twitter) u.twitter = obj.twitter;
        if (obj.twitch) u.twitch = obj.twitch;
        if (obj.github) u.github = obj.github;
        if (obj.instagram) u.instagram = obj.instagram;

        if (obj.pcolor) u.pColor = obj.pcolor;

        if (obj.rankGlobal) u.rankGlobal = obj.rankGlobal;
        if (obj.disID) u.disID = obj.disID;
        if (obj.disTag) u.disTag = obj.disTag;
        if (obj.refreshPrevious) u.timestampStatsRefreshed = obj.refreshPrevious;
        if (obj.server) u.disServerInvite = obj.server;

        //obj.banGlobalReasoning

        return u;
    }

    /**
     * @returns {string} 
     */

    async loadFile() {
        return await this.client.actions.StorageFiles.loadFile(UserULSheetAction.USERS_STORAGE_FILE);
    }

    /**
     * @returns {string} 
     */

    async loadManagerFromFile() {
        return this.txtToObj(await this.loadFile());
    }

    async updateUsersULBySheet() {
        let m = await this.loadManagerFromFile();
        let users = Object.values(m);
        let i = 0;
        for await (let u of users) {
            u = this.userOBJToUserUL(u);
            u = this.client.actions.UserUL.construct(u);
            if (i == users.length - 1) await u.save(u);
            else await u.add(u);
            i++;
        }
    }

}

UserULSheetAction.USERS_STORAGE_FILE = "usersULSheet.txt";

module.exports = UserULSheetAction;