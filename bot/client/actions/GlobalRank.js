"use strict";

const Action = require("./Action");

const Emote = require("../../src/util/DiscordEmote");

const {
    ul: {
        trophies: {
            top_1: EMOTE_TROPHY_1,
            top_2: EMOTE_TROPHY_2,
            top_3: EMOTE_TROPHY_3,
            top_4: EMOTE_TROPHY_4,
            top_5: EMOTE_TROPHY_5,
            top_6: EMOTE_TROPHY_6,
            top_7: EMOTE_TROPHY_7,
            top_8: EMOTE_TROPHY_8,
            top_9: EMOTE_TROPHY_9,
            top_10: EMOTE_TROPHY_10,
        }
    },
    gd: {
        trophies: {
            silver: EMOTE_TROPHY_SILVER,
            blue: EMOTE_TROPHY_BLUE,
            bronze: EMOTE_TROPHY_BRONZE,
            default: EMOTE_TROPHY_DEFAULT,
            green: EMOTE_TROPHY_GREEN,
            purple: EMOTE_TROPHY_PURPLE
        }
    }
} = require("../../src/util/Emotes");

/**
 * @typedef {|"NONE"
 * |"1"
 * |"2"
 * |"3"
 * |"4"
 * |"5"
 * |"6"
 * |"7"
 * |"8"
 * |"9"
 * |"10"
 * |"50"
 * |"100"
 * |"200"
 * |"500"
 * |"1000"
 * |"DEFAULT"
 * } TROPHY_GROUPS
 */

class GlobalRankAction extends Action {

    /**
     * @param {number|string|BigInt} rank
     * @returns {TROPHY_GROUPS}
     */

    globalRankToTrophyGroup(rank) {
        return  /^\d{1,}$/.test(rank) && rank != 0
        ? rank == 1 ? "1"
            : rank == 2 ? "2"
            : rank == 3 ? "3"
            : rank == 4 ? "4"
            : rank == 5 ? "5"
            : rank == 6 ? "6"
            : rank == 7 ? "7"
            : rank == 8 ? "8"
            : rank == 9 ? "9"
            : rank == 10 ? "10"
            : rank <= 50 ? "50"
            : rank <= 100 ? "100"
            : rank <= 200 ? "200"
            : rank <= 500 ? "500"
            : rank <= 1000 ? "1000"
            : "DEFAULT"
        : "NONE";
    }

    /**
     * @param {number|string|BigInt} rank
     * @returns {Emote}
     */

    globalRankToEmote(rank) {
        switch (this.globalRankToTrophyGroup(rank)) {
            case "1": { return EMOTE_TROPHY_1; }
            case "2": { return EMOTE_TROPHY_2; }
            case "3": { return EMOTE_TROPHY_3; }
            case "4": { return EMOTE_TROPHY_4; }
            case "5": { return EMOTE_TROPHY_5; }
            case "6": { return EMOTE_TROPHY_6; }
            case "7": { return EMOTE_TROPHY_7; }
            case "8": { return EMOTE_TROPHY_8; }
            case "9": { return EMOTE_TROPHY_9; }
            case "10": { return EMOTE_TROPHY_10; }
            case "50": { return EMOTE_TROPHY_SILVER; }
            case "100": { return EMOTE_TROPHY_BRONZE; }
            case "200": { return EMOTE_TROPHY_GREEN; }
            case "500": { return EMOTE_TROPHY_BLUE; }
            case "1000": { return EMOTE_TROPHY_PURPLE; }
            case "DEFAULT": { return EMOTE_TROPHY_DEFAULT; }
            default: { return null; }
        }
    }

}

module.exports = GlobalRankAction;