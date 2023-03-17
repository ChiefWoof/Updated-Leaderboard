"use strict";

module.exports.indicators = {
    VERIFIED: 1 << 0,
    SG: 1 << 1,
    BANNED: 1 << 2,
    SETTINGS_LOCKED: 1 << 3,
    MOBILE_PLAYER: 1 << 4,
    PC_PLAYER: 1 << 5,
    STAFF_TRAINEE: 1 << 6,
    STAFF_HELPER: 1 << 7,
    STAFF_OFFICER: 1 << 8,
    STAFF_DEVELOPER: 1 << 9,
    STAFF_CHIEF: 1 << 10,
    IS_VERIFICATION_REQUEST: 1 << 11,
    IS_GD_MOD: 1 << 12,
    IS_GD_MOD_ELDER: 1 << 13,
    IS_GD_MOD_LEADERBOARD: 1 << 14,
    LEADERBOARD_TEAM: 1 << 15,
    BANNED_STARS: 1 << 16,
    BANNED_DIAMONDS: 1 << 17,
    BANNED_SCOINS: 1 << 18,
    BANNED_UCOINS: 1 << 19,
    BANNED_DEMONS: 1 << 20,
    BANNED_CP: 1 << 21,
    SELECTED: 1 << 22
};

module.exports.emotes = {
    stars: "🌟",
    diamonds: "💎",
    scoins: "🌕",
    ucoins: "⚪️",
    demons: "😈",
    cp: "🛠",
    net: "👑"
};
