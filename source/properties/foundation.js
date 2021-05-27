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
        4: PRESETS.createdByDisID,
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
        14: PRESETS.guildID,
        15: PRESETS.guildName,
        16: PRESETS.onUL,
        17: PRESETS.onHL,
        18: PRESETS.inSG,
        19: PRESETS.gdServerStaff,
        20: PRESETS.accountID,
        21: PRESETS.playerID,
        22: PRESETS.username,
        23: PRESETS.gamemode,
        24: PRESETS.cubeID,
        25: PRESETS.shipID,
        26: PRESETS.ballID,
        27: PRESETS.ufoID,
        28: PRESETS.dartID,
        29: PRESETS.robotID,
        30: PRESETS.spiderID,
        31: PRESETS.dm
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
