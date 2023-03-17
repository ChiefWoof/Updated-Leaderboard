"use strict";

// UTILITY -------------------------------

const UTIL_CHARACTERS = {
    BULLET_POINT: "•",
    SPACE_BLOCK: " ‌‌‌",
    DASH_BOLD: "─",
    LIGHT_SHADE: "░",
    FULL_BLOCK: "█"
};

module.exports.util = {
    characters: UTIL_CHARACTERS
};


// UL -------------------------------

const UL_USERS_STATS_NET = {

    STARS_WEIGHT: 1,
    DIAMONDS_WEIGHT: 0.5,
    SCOINS_WEIGHT: 100,
    UCOINS_WEIGHT: 2,
    DEMONS_WEIGHT: 20,
    CP_WEIGHT: 50

};

const UL_USERS_STATS = {
    net: UL_USERS_STATS_NET
};

const UL_USERS = {
    stats: UL_USERS_STATS
};

module.exports.ul = {
    users: UL_USERS
};