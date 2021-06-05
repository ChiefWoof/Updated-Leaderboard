"use strict";

/* PROPERTIES INFORMATION

This file is used to organize each property for easy implementation with the PList utility.

FILE NOTES:
    * Encoding responses should return a string
    * "d" indicates entered data

*/

const CONSTANTS = require("../util/Constants");
const PList = require("../util/PList");
const Color = require("../util/Color");
const Emoji = require("../util/Emoji");

const { create, createWithKeyName } = PList;
const { GENERAL } = PList.PRESETS;

const STRING_BASE64 = GENERAL.string(({ source }={}, d) => {
    if (typeof d !== "string") return null;
    if (source === "SET") return d;
    return Buffer.from(d, source === "STRINGIFY" ? "utf-8" : "base64").toString(source === "STRINGIFY" ? "base64" : "utf-8");
});

const COLOR = createWithKeyName("color", {
    encoding: (details, d) => d instanceof Color && d.valid() ? Buffer.from(String(d.color), "utf-8").toString("base64") : null,
    decoding: ({ source }={}, d) => {
        if (!d) return new Color();
        if (source === "SET") return new Color(d);
        let dValue = Buffer.from(d, "base64").toString("utf-8");
        return new Color(isNaN(Number(dValue)) ? dValue : Number(dValue));
    }
});

const EMOJI = {
    encoding: (details, d) => d instanceof Emoji ? d.toStringShort() : null,
    decoding: (details, d) => d instanceof Emoji ? d : new Emoji(d)
};

// CREATIONS

const IDENTIFICATION = {
    index: createWithKeyName("index", GENERAL.BigInt()),
    name: createWithKeyName("name", STRING_BASE64),
    time: GENERAL.Date(),

    inSG: createWithKeyName("inSG", GENERAL.boolean()),
    gdServerStaff: createWithKeyName("gdServerStaff", GENERAL.boolean()),

    url: createWithKeyName("url", {
        encoding: (details, d) => d instanceof URL ? Buffer.from(d.toString(), "utf-8").toString("base64") : null,
        decoding: ({ source }={}, d) => d ? new URL(source === "SET" ? d : Buffer.from(d, "base64").toString("utf-8")) : null
    })
};

const ENDPOINTS = {
    version: createWithKeyName("version", GENERAL.BigInt())
};

const DISCORD = {
    guildID: createWithKeyName("guildID", GENERAL.BigInt()),
    guildName: createWithKeyName("guildName", STRING_BASE64),
    disID: createWithKeyName("disID", GENERAL.BigInt()),
    disTag: createWithKeyName("disTag", STRING_BASE64),
    dm: createWithKeyName("dm", GENERAL.boolean()),
    disCommandsUsed: createWithKeyName("disCommandsUsed", GENERAL.BigInt())
};

const BOT_LEVELS = {
    blocked: createWithKeyName("blocked", GENERAL.boolean()),
    limited: createWithKeyName("limited", GENERAL.boolean()),
    trainee: createWithKeyName("trainee", GENERAL.boolean()),
    helper: createWithKeyName("helper", GENERAL.boolean()),
    officer: createWithKeyName("officer", GENERAL.boolean()),
    dev: createWithKeyName("dev", GENERAL.boolean()),
    alpha: createWithKeyName("alpha", GENERAL.boolean()),
};

const UTIL = {
    text: createWithKeyName("text", STRING_BASE64),
    countBigInt: createWithKeyName("count", GENERAL.BigInt()),
    countNumber: createWithKeyName("count", GENERAL.number()),
    banned: createWithKeyName("banned", GENERAL.boolean()),

    gdStatType: createWithKeyName("statType", {...GENERAL.BigInt(),
        typeDefault: 0,
        types: {
            0: ["DEFAULT", "NONE"],
            1: "STARS",
            2: "DIAMONDS",
            3: "SCOINS",
            4: "UCOINS",
            5: "DEMONS",
            6: "CP"
        }
    })

};

const GD = {
    username: createWithKeyName("username", STRING_BASE64),
    pastUsernames: createWithKeyName("pastUsernames", GENERAL.list(STRING_BASE64, { separator: "," })),
    accountID: createWithKeyName("accountID",  GENERAL.BigInt()),
    playerID: createWithKeyName("playerID", GENERAL.BigInt()),
    mod: createWithKeyName("mod", GENERAL.BigInt()),

    onTop: createWithKeyName("onTop", GENERAL.boolean()),

    timelyID: createWithKeyName("timelyID", GENERAL.BigInt()),
    levelID: createWithKeyName("levelID", GENERAL.BigInt()),

    levelName: createWithKeyName("name", STRING_BASE64),
    songName: createWithKeyName("songName", STRING_BASE64),
    songPublisherName: createWithKeyName("songPublisherName", STRING_BASE64),
    
    difficultyFace: createWithKeyName("difficultyFace", GENERAL.BigInt()),
    difficultyDemon: createWithKeyName("difficultyDemon", GENERAL.BigInt()),
    isDemon: createWithKeyName("isDemon", GENERAL.boolean()),
    isAuto: createWithKeyName("isAuto", GENERAL.boolean()),
    epic: createWithKeyName("epic", GENERAL.boolean()),
    featured: createWithKeyName("featured", GENERAL.boolean()),

    ucoinsVerified: createWithKeyName("ucoinsVerified", GENERAL.boolean()),
    highObjects: createWithKeyName("highObjects", GENERAL.boolean()),

    downloads: createWithKeyName("downloads", GENERAL.BigInt()),
    likes: createWithKeyName("likes", GENERAL.BigInt()),
    levelLength: createWithKeyName("length", {...GENERAL.BigInt(),
        typeDefault: 0,
        types: {
            0: "TINY",
            1: "SHORT",
            2: "MEDIUM",
            3: "LONG",
            4: ["XL", "EXTRA LONG"]
        }
    }),

    stars: createWithKeyName("stars", GENERAL.BigInt()),
    diamonds: createWithKeyName("diamonds", GENERAL.BigInt()),
    scoins: createWithKeyName("scoins", GENERAL.BigInt()),
    ucoins: createWithKeyName("ucoins", GENERAL.BigInt()),
    demons: createWithKeyName("demons", GENERAL.BigInt()),
    cp: createWithKeyName("cp", GENERAL.BigInt()),
    net: createWithKeyName("net", GENERAL.BigInt()),
    
    hasGlow: createWithKeyName("hasGlow", GENERAL.boolean()),

    gamemode: createWithKeyName("gamemode", GENERAL.BigInt()),
    cubeID: createWithKeyName("cubeID", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    shipID: createWithKeyName("shipID", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    ballID: createWithKeyName("ballID", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    ufoID: createWithKeyName("ufoID", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    dartID: createWithKeyName("dartID", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    robotID: createWithKeyName("robotID", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    spiderID: createWithKeyName("spiderID", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    
    color1: createWithKeyName("color1", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
    color2: createWithKeyName("color2", GENERAL.BigInt((details, d) => d >= 0 ? d : 1)),
};

const MEDIAS = {
    youtube: createWithKeyName("youtube", STRING_BASE64),
    twitter: createWithKeyName("twitter", STRING_BASE64),
    twitch: createWithKeyName("twitch", STRING_BASE64),
    discordServerCode: createWithKeyName("server", STRING_BASE64),
    github: createWithKeyName("github", STRING_BASE64),
    instagram: createWithKeyName("instagram", STRING_BASE64),
};

const DEVICES = {
    isMobile: createWithKeyName("isMobile", GENERAL.boolean()),
    isPC: createWithKeyName("isPC", GENERAL.boolean())
};

// Properties for UltimateGDBot
const UGDB = {
    ugdbAdmin: createWithKeyName("ugdbAdmin", GENERAL.boolean()),
    blurb: createWithKeyName("blurb", STRING_BASE64),
    unrated: createWithKeyName("unrated", GENERAL.boolean()),
    isCopy: createWithKeyName("isCopy", GENERAL.boolean()),
};

const ulUser = {
    onUL: createWithKeyName("onUL", GENERAL.boolean()),
    onHL: createWithKeyName("onHL", GENERAL.boolean()),
    isLocked: createWithKeyName("isLocked", GENERAL.boolean()),
    setBan: createWithKeyName("setBan", GENERAL.boolean()),
    pastUsernames: createWithKeyName("pastUsernames", GENERAL.list(GD.username, { separator: "," })),
    region: createWithKeyName("region", GENERAL.BigInt()), // - needs to be created
    country: createWithKeyName("country", GENERAL.BigInt()), // - needs to be created
    state: createWithKeyName("state", GENERAL.BigInt()), // - needs to be created
    difficulty: createWithKeyName("difficulty", GENERAL.BigInt()),

    input: createWithKeyName("input", STRING_BASE64),
    encoded: createWithKeyName("encoded", GENERAL.boolean()),
    decoded: createWithKeyName("decoded", GENERAL.boolean()),
    spacing: createWithKeyName("spacing", GENERAL.BigInt()),

    linkCodeType: createWithKeyName("type", {...GENERAL.BigInt(),
        typeDefault: 0n,
        types: {
            "0": "DISCORD_TO_GD"
        }
    })
};

const COLLECTIONS = {
    // editors is listed in "woofPacks"
    levels: createWithKeyName("levels", GENERAL.list(GD.levelID, { separator: "," }))
};

const woofPacks = {
    woofPackID: createWithKeyName("woofPackID", GENERAL.BigInt()),
    timeCreated: createWithKeyName("timeCreated", IDENTIFICATION.time),
    timeEdited: createWithKeyName("timeEdited", IDENTIFICATION.time),
    editors: createWithKeyName("editors", GENERAL.list(DISCORD.disID, { separator: "," })),
    locked: createWithKeyName("locked", GENERAL.boolean()),
    viewable: createWithKeyName("viewable", GENERAL.boolean()),
    tier: createWithKeyName("tier", GENERAL.BigInt()),
    keys: createWithKeyName("keys", GENERAL.list(GENERAL.BigInt((details, d) => d > 0 || d < 0 ? d : null), { separator: "," })),
    verifiedWoof: createWithKeyName("verifiedWoof", GENERAL.boolean()),
    verifiedHustle: createWithKeyName("verifiedHustle", GENERAL.boolean()),
    verifiedUL: createWithKeyName("verifiedUL", GENERAL.boolean()),
    verifiedSG: createWithKeyName("verifiedSG", GENERAL.boolean()),
    description: createWithKeyName("description", STRING_BASE64),
    topic: createWithKeyName("topic", STRING_BASE64),
    note: createWithKeyName("note", STRING_BASE64),
    tags: createWithKeyName("tags", GENERAL.list(STRING_BASE64, { separator: "," })),
    color: COLOR,
    emote: createWithKeyName("emote", EMOJI),
    gdbPerPage: createWithKeyName("gdbPerPage", GENERAL.integer((details, d) => d > 0 ? d : 10)),
    sortByLevelID: createWithKeyName("sortByLevelID", GENERAL.BigInt((details, d) => d >= 0 && d <= 2 ? d : 0)),
    sortByDifficulty: createWithKeyName("sortByDifficulty", GENERAL.BigInt((details, d) => d >= 0 && d <= 2 ? d : 0)),
    sortByLevelName: createWithKeyName("sortByLevelName", GENERAL.BigInt((details, d) => d >= 0 && d <= 2 ? d : 0)),
    sortByLevelRating: createWithKeyName("sortByLevelRating", GENERAL.BigInt((details, d) => d >= 0 && d <= 2 ? d : 0)),
    sortByUsername: createWithKeyName("sortByUsername", GENERAL.BigInt((details, d) => d >= 0 && d <= 2 ? d : 0)),
    sortByPlayerID: createWithKeyName("sortByPlayerID", GENERAL.BigInt((details, d) => d >= 0 && d <= 2 ? d : 0)),
    sortByScore: createWithKeyName("sortByScore", GENERAL.BigInt((details, d) => d >= 0 && d <= 2 ? d : 0)),
    isRankPack: createWithKeyName("isRankPack", GENERAL.boolean()),
    isCopyPack: createWithKeyName("isCopyPack", GENERAL.boolean()),
    ytVid: createWithKeyName("ytVid", IDENTIFICATION.url),
    sortOrder: createWithKeyName("sortOrder", GENERAL.list(GENERAL.BigInt((details, d) => d > 0 ? d : null), { separator: "," }))
};

const woofPackLevel = {
    score: createWithKeyName("score", GENERAL.BigInt())
};

module.exports = {

    create,
    createWithKeyName,

    setFunctionOverrides: {
        ufo: "UFO",
        ufoID: "UFOID",
        dm: "DM",
        cp: "CP",
        ytVid: "YTVid",
        gdbPerPage: "GDBPerPage",
        gdServerStaff: "GDServerStaff",
        ugdbAdmin: "UGDBAdmin",
        bgprog: "BGProg",
        pcolor: "PColor"
    },

    PRESETS: {
        ...IDENTIFICATION,
        ...DISCORD,
        ...GD,
        ...COLLECTIONS,
        ...BOT_LEVELS,
        ...ENDPOINTS,
        ...UTIL,
        ...MEDIAS,
        ...DEVICES,

        ...ulUser,
        ...woofPacks,
        ...woofPackLevel,
        ...UGDB
    }

};