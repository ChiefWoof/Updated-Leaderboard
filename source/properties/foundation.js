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
        1: PRESETS.disID,
        2: PRESETS.disTag,
        3: PRESETS.accountID,
        4: PRESETS.playerID,
        5: PRESETS.blocked,
        6: PRESETS.limited,
        7: PRESETS.trainee,
        8: PRESETS.helper,
        9: PRESETS.officer,
        10: PRESETS.dev,
        11: PRESETS.alpha,
        12: PRESETS.mod,
    }
});

exports.UserProfile = exports.User.clone()
    .registerByObj({
        13: PRESETS.stars,
        14: PRESETS.diamonds,
        15: PRESETS.scoins,
        16: PRESETS.ucoins,
        17: PRESETS.demons,
        18: PRESETS.cp
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

exports.StatNotificationUserEntry = new PList({
    separator: ":",
    restricted: true,
    objData: {
        1: PRESETS.stars,
        2: PRESETS.diamonds,
        3: PRESETS.scoins,
        4: PRESETS.ucoins,
        5: PRESETS.demons,
        6: PRESETS.cp,
        7: PRESETS.username,
        8: PRESETS.mod
    }
});
