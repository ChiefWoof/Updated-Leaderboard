"use strict";

const PList = require("../util/PList");
const { PRESETS, createWithKeyName } = require("./base");

exports.IconGamemodeData = new PList({
    separator: ":",
    objData: {
        1: PRESETS.cubeID,
        2: PRESETS.shipID,
        3: PRESETS.ballID,
        4: PRESETS.ufoID,
        5: PRESETS.dartID,
        6: PRESETS.robotID,
        7: PRESETS.spiderID,
        99: PRESETS.gamemode // Set to 99 since it's unlikely there will be 99 gamemodes
    }
});

exports.IconColorsData = new PList({
    separator: ":",
    objData: {
        1: PRESETS.color1,
        2: PRESETS.color2,
    }
});

exports.IconDetailsData = new PList({
    separator: ":",
    objData: {
        0: PRESETS.hasGlow, // Set to 0 because I initially set the original version of IconData with it so this just makes it easier
    }
});