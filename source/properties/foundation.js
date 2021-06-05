"use strict";

const PList = require("../util/PList");
const { PRESETS, createWithKeyName } = require("./base");


exports.woofPack = new PList({
    separator: ":",
    restricted: true,
    objData: {
        1: PRESETS.woofPackID,
        2: PRESETS.timeCreated,
        3: PRESETS.timeEdited,
        4: createWithKeyName("createdByDisID", PRESETS.disID),
        5: PRESETS.editors,
        // 6: levels - implemented in the woofPack class
        7: PRESETS.locked,
        8: PRESETS.viewable,
        9: PRESETS.tier,
        10: PRESETS.keys,
        11: PRESETS.verifiedWoof,
        12: PRESETS.verifiedHustle,
        13: PRESETS.verifiedUL,
        14: PRESETS.verifiedSG,
        15: PRESETS.name,
        16: PRESETS.description,
        17: PRESETS.topic,
        18: PRESETS.note,
        19: PRESETS.tags,
        20: PRESETS.color,

        22: PRESETS.emote,
        23: PRESETS.gdbPerPage,
        24: PRESETS.sortByLevelID,
        25: PRESETS.sortByDifficulty,
        26: PRESETS.sortByLevelName,
        27: PRESETS.sortByUsername,
        28: PRESETS.sortByPlayerID,
        29: PRESETS.sortByScore,
        30: PRESETS.isRankPack,
        31: PRESETS.isCopyPack,
        32: PRESETS.ytVid,
        33: PRESETS.sortByLevelRating,
        34: PRESETS.sortOrder
    }
});

exports.woofPackLevel = new PList({
    separator: ":",
    restricted: true,
    removeFaultyValues: true,
    objData: {
        1: PRESETS.levelID,
        2: createWithKeyName("levelIDOriginal", PRESETS.levelID),
        3: PRESETS.score,
    }
});

exports.User = new PList({
    separator: ":",
    restricted: true,
    removeFaultyValues: true,
    objData: {
        1: PRESETS.index,
        2: createWithKeyName("dateAdded", PRESETS.time),
        3: PRESETS.disID,
        4: PRESETS.disTag,
        5: PRESETS.accountID,
        6: PRESETS.playerID,
        7: PRESETS.username,
        8: PRESETS.blocked,
        9: PRESETS.limited,
        10: PRESETS.trainee,
        11: PRESETS.helper,
        12: PRESETS.officer,
        13: PRESETS.dev,
        14: PRESETS.alpha,
        15: PRESETS.ugdbAdmin,
        16: PRESETS.gdServerStaff,
        17: PRESETS.mod,
        18: createWithKeyName("reasonBlocked", PRESETS.text),
        19: createWithKeyName("reasonLimited", PRESETS.text),
        20: PRESETS.disCommandsUsed,
        21: PRESETS.stars,
        22: PRESETS.diamonds,
        23: PRESETS.scoins,
        24: PRESETS.ucoins,
        25: PRESETS.demons,
        26: PRESETS.cp,
        27: PRESETS.inSG,
        28: PRESETS.hasGlow,
        29: PRESETS.color1,
        30: PRESETS.color2,
        31: PRESETS.gamemode,
        32: PRESETS.cubeID,
        33: PRESETS.shipID,
        34: PRESETS.ballID,
        35: PRESETS.ufoID,
        36: PRESETS.dartID,
        37: PRESETS.robotID,
        38: PRESETS.spiderID,
        39: PRESETS.youtube,
        40: PRESETS.twitter,
        41: PRESETS.twitch,
        42: PRESETS.discordServerCode,
        43: PRESETS.github,
        44: PRESETS.instagram,
        45: PRESETS.isMobile,
        46: PRESETS.isPC
    }
});

exports.UserProfile = exports.User.clone()
    .registerByObj({
        47: createWithKeyName("banned", PRESETS.banned),
        48: createWithKeyName("bannedSettings", PRESETS.banned),
        49: createWithKeyName("lastRefreshed", PRESETS.time),
        50: createWithKeyName("bannedStars", PRESETS.banned),
        51: createWithKeyName("bannedDiamonds", PRESETS.banned),
        52: createWithKeyName("bannedScoins", PRESETS.banned),
        53: createWithKeyName("bannedUcoins", PRESETS.banned),
        54: createWithKeyName("bannedDemons", PRESETS.banned),
        55: createWithKeyName("bannedCP", PRESETS.banned),
        56: PRESETS.pastUsernames,
        57: createWithKeyName("areaRegion", PRESETS.text),
        58: createWithKeyName("areaCountry", PRESETS.text),
        59: createWithKeyName("areaSector", PRESETS.text),
        60: createWithKeyName("bio", PRESETS.text),
        61: createWithKeyName("pcolor", PRESETS.color),
        62: createWithKeyName("bgprog", PRESETS.text)
    });

exports.StatsObject = new PList({
    separator: ":",
    restricted: true,
    objData: {
        1: PRESETS.stars,
        2: PRESETS.diamonds,
        3: PRESETS.scoins,
        4: PRESETS.ucoins,
        5: PRESETS.demons,
        6: PRESETS.cp
    }
});

exports.UGDBLevelNotification = new PList({
    separator: ":",
    restricted: true,
    objData: {
        1: PRESETS.blurb,
        2: PRESETS.unrated,
        3: PRESETS.levelID,
        4: PRESETS.timelyID,
        5: PRESETS.name,
        6: PRESETS.username,
        7: PRESETS.stars,
        8: PRESETS.ucoins,
        9: PRESETS.downloads,
        10: PRESETS.likes,
        11: PRESETS.levelLength,
        12: PRESETS.difficultyFace,
        13: PRESETS.difficultyDemon,
        14: PRESETS.ucoinsVerified,
        15: PRESETS.isDemon,
        16: PRESETS.isAuto,
        17: PRESETS.epic,
        18: PRESETS.featured,
        19: PRESETS.highObjects,
        20: PRESETS.isCopy,
        21: PRESETS.songName,
        22: PRESETS.songPublisherName,
    }
});

exports.UserRequest = exports.StatsObject.clone()
    .setRemoveFaultyValues(true)
    .registerByObj({
        7: PRESETS.mod,
        8: createWithKeyName("senderDisID", PRESETS.disID),
        9: createWithKeyName("senderDisTag", PRESETS.disTag),
        10: createWithKeyName("linkedDisID", PRESETS.disID),
        11: createWithKeyName("linkedDisTag", PRESETS.disTag),
        12: createWithKeyName("overriderDisID", PRESETS.disID),
        13: createWithKeyName("overriderDisTag", PRESETS.disTag),
        14: createWithKeyName("handlerDisID", PRESETS.disID),
        15: createWithKeyName("handlerDisTag", PRESETS.disTag),
        16: PRESETS.guildID,
        17: PRESETS.guildName,
        18: PRESETS.onUL,
        19: PRESETS.onHL,
        20: PRESETS.inSG,
        21: PRESETS.gdServerStaff,
        22: PRESETS.accountID,
        23: PRESETS.playerID,
        24: PRESETS.username,
        25: PRESETS.youtube,
        26: PRESETS.twitter,
        27: PRESETS.twitch,
        28: PRESETS.color1,
        29: PRESETS.color2,
        30: PRESETS.gamemode,
        31: PRESETS.cubeID,
        32: PRESETS.shipID,
        33: PRESETS.ballID,
        34: PRESETS.ufoID,
        35: PRESETS.dartID,
        36: PRESETS.robotID,
        37: PRESETS.spiderID,
        38: PRESETS.dm,
        39: PRESETS.difficulty
    });

exports.UserStatAchievementEntry = exports.StatsObject.clone()
    .registerByObj({
        7: PRESETS.username,
        8: PRESETS.playerID,
        9: PRESETS.accountID,
        10: PRESETS.mod,
        11: PRESETS.inSG,
        12: PRESETS.onTop
    });

exports.UserStatAchievement = new PList({
    separator: ":",
    restricted: true,
    removeFaultyValues: true,
    objData: {
        1: PRESETS.username,
        2: PRESETS.playerID,
        3: PRESETS.accountID,
        4: PRESETS.mod,
        5: PRESETS.inSG,
        6: PRESETS.onTop,
        7: PRESETS.gdStatType,
        8: createWithKeyName("usernameOld", PRESETS.username),
        9: createWithKeyName("modOld", PRESETS.mod),
        10: createWithKeyName("statOld", PRESETS.countBigInt),
        11: createWithKeyName("statCurrent", PRESETS.countBigInt),
        12: createWithKeyName("threshold", PRESETS.countBigInt)
    }
});