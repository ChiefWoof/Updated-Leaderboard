"use strict";

const BitField = require("../util/BitField");

const {
    indicators: {
        VERIFIED: VERIFIED_INDICATOR,
        SG: SG_INDICATOR,
        BANNED: BANNED_INDICATOR,
        SETTINGS_LOCKED: SETTINGS_LOCKED_INDICATOR,
        MOBILE_PLAYER: MOBILE_PLAYER_INDICATOR,
        PC_PLAYER: PC_PLAYER_INDICATOR,
        STAFF_TRAINEE: STAFF_TRAINEE_INDICATOR,
        STAFF_HELPER: STAFF_HELPER_INDICATOR,
        STAFF_OFFICER: STAFF_OFFICER_INDICATOR,
        STAFF_DEVELOPER: STAFF_DEVELOPER_INDICATOR,
        STAFF_CHIEF: STAFF_CHIEF_INDICATOR,
        IS_VERIFICATION_REQUEST: IS_VERIFICATION_REQUEST_INDICATOR,
        IS_GD_MOD: IS_GD_MOD_INDICATOR,
        IS_GD_MOD_ELDER: IS_GD_MOD_ELDER_INDICATOR,
        IS_GD_MOD_LEADERBOARD: IS_GD_MOD_LEADERBOARD_INDICATOR,
        LEADERBOARD_TEAM: LEADERBOARD_TEAM_INDICATOR,
        BANNED_STARS: BANNED_STARS_INDICATOR,
        BANNED_DIAMONDS: BANNED_DIAMONDS_INDICATOR,
        BANNED_SCOINS: BANNED_SCOINS_INDICATOR,
        BANNED_UCOINS: BANNED_UCOINS_INDICATOR,
        BANNED_DEMONS: BANNED_DEMONS_INDICATOR,
        BANNED_CP: BANNED_CP_INDICATOR,
        SELECTED: SELECTED_INDICATOR
    }
} = require("../properties/flags/UserUL");

class UserULFlags extends BitField {

    /**
     * @description Whether the user is a verified UL user
     * @type {boolean}
     * @param {boolean|number} value
     */

    get verified() { return this.has(VERIFIED_INDICATOR); }
    set verified(value) { this.fromBitValue(VERIFIED_INDICATOR, value); }

    /**
     * @description Whether the user is a Star Grinders member
     * @type {boolean}
     * @param {boolean|number} value
     */

    get sg() { return this.has(SG_INDICATOR); }
    set sg(value) { this.fromBitValue(SG_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL
     * @type {boolean}
     * @param {boolean|number} value
     */

    get banned() { return this.has(BANNED_INDICATOR); }
    set banned(value) { this.fromBitValue(BANNED_INDICATOR, value); }

    /**
     * @description Whether the user settings can not be updated by the user
     * @type {boolean}
     * @param {boolean|number} value
     */

    get settingsLocked() { return this.has(SETTINGS_LOCKED_INDICATOR); }
    set settingsLocked(value) { this.fromBitValue(SETTINGS_LOCKED_INDICATOR, value); }

    /**
     * @description Whether the user is a mobile player
     * @type {boolean}
     * @param {boolean|number} value
     */

    get mobilePlayer() { return this.has(MOBILE_PLAYER_INDICATOR); }
    set mobilePlayer(value) { this.fromBitValue(MOBILE_PLAYER_INDICATOR, value); }

    /**
     * @description Whether the user is a pc player
     * @type {boolean}
     * @param {boolean|number} value
     */

    get pcPlayer() { return this.has(PC_PLAYER_INDICATOR); }
    set pcPlayer(value) { this.fromBitValue(PC_PLAYER_INDICATOR, value); }

    /**
     * @description Whether the user has a trainee staff role
     * @type {boolean}
     * @param {boolean|number} value
     */

    get staffTrainee() { return this.has(STAFF_TRAINEE_INDICATOR); }
    set staffTrainee(value) { this.fromBitValue(STAFF_TRAINEE_INDICATOR, value); }

    /**
     * @description Whether the user has a helper staff role
     * @type {boolean}
     * @param {boolean|number} value
     */

    get staffHelper() { return this.hasOne(STAFF_HELPER_INDICATOR, STAFF_OFFICER_INDICATOR, STAFF_DEVELOPER_INDICATOR, STAFF_CHIEF_INDICATOR); }
    set staffHelper(value) {
        if (value) {
            this.flex(
                STAFF_HELPER_INDICATOR
                + STAFF_OFFICER_INDICATOR
                + STAFF_DEVELOPER_INDICATOR
                + STAFF_CHIEF_INDICATOR,
                STAFF_HELPER_INDICATOR
            );
        } else {
            this.fromBitValue(STAFF_HELPER_INDICATOR, value);
        }
    }

    /**
     * @description Whether the user has an officer staff role
     * @type {boolean}
     * @param {boolean|number} value
     */

    get staffOfficer() { return this.hasOne(STAFF_OFFICER_INDICATOR, STAFF_DEVELOPER_INDICATOR, STAFF_CHIEF_INDICATOR); }
    set staffOfficer(value) {
        if (value) {
            this.flex(
                STAFF_HELPER_INDICATOR
                + STAFF_OFFICER_INDICATOR
                + STAFF_DEVELOPER_INDICATOR
                + STAFF_CHIEF_INDICATOR,
                STAFF_OFFICER_INDICATOR
            );
        } else {
            this.fromBitValue(STAFF_OFFICER_INDICATOR, value);
        }
    }

    /**
     * @description Whether the user has a developer staff role
     * @type {boolean}
     * @param {boolean|number} value
     */

    get staffDeveloper() { return this.hasOne(STAFF_DEVELOPER_INDICATOR, STAFF_CHIEF_INDICATOR); }
    set staffDeveloper(value) {
        if (value) {
            this.flex(
                STAFF_HELPER_INDICATOR
                + STAFF_OFFICER_INDICATOR
                + STAFF_DEVELOPER_INDICATOR
                + STAFF_CHIEF_INDICATOR,
                STAFF_DEVELOPER_INDICATOR
            );
        } else {
            this.fromBitValue(STAFF_DEVELOPER_INDICATOR, value);
        }
    }

    /**
     * @description Whether the user has a chief staff role
     * @type {boolean}
     * @param {boolean|number} value
     */

    get staffChief() { return this.has(STAFF_CHIEF_INDICATOR); }
    set staffChief(value) {
        if (value) {
            this.flex(
                STAFF_HELPER_INDICATOR
                + STAFF_OFFICER_INDICATOR
                + STAFF_DEVELOPER_INDICATOR
                + STAFF_CHIEF_INDICATOR,
                STAFF_CHIEF_INDICATOR
            );
        } else {
            this.fromBitValue(STAFF_CHIEF_INDICATOR, value);
        }
    }

    /**
     * @description Whether the user is currently being requested
     * @type {boolean}
     * @param {boolean|number} value
     */

    get isVerificationRequest() { return this.has(IS_VERIFICATION_REQUEST_INDICATOR); }
    set isVerificationRequest(value) { this.fromBitValue(IS_VERIFICATION_REQUEST_INDICATOR, value); }

    /**
     * @description Whether the user is a GD moderator
     * @type {boolean}
     * @param {boolean|number} value
     */

    get isGDMod() { return this.hasOne(IS_GD_MOD_INDICATOR, IS_GD_MOD_ELDER_INDICATOR); }
    set isGDMod(value) { this.fromBitValue(IS_GD_MOD_INDICATOR, value); }

    /**
     * @description Whether the user is a GD elder moderator
     * @type {boolean}
     * @param {boolean|number} value
     */

    get isGDModElder() { return this.has(IS_GD_MOD_ELDER_INDICATOR); }
    set isGDModElder(value) { this.fromBitValue(IS_GD_MOD_ELDER_INDICATOR, value); }

    /**
     * @description Whether the user is a GD leaderboard moderator
     * @type {boolean}
     * @param {boolean|number} value
     */

    get isGDModLeaderboard() { return this.has(IS_GD_MOD_LEADERBOARD_INDICATOR); }
    set isGDModLeaderboard(value) { this.fromBitValue(IS_GD_MOD_LEADERBOARD_INDICATOR, value); }

    /**
     * @description Whether the user is a GD leaderboard moderator
     * @type {boolean}
     * @param {boolean|number} value
     */

    get leaderboardTeam() { return this.hasOne(LEADERBOARD_TEAM_INDICATOR, IS_GD_MOD_LEADERBOARD_INDICATOR); }
    set leaderboardTeam(value) { this.fromBitValue(LEADERBOARD_TEAM_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL stars leaderboard
     * @type {boolean}
     * @param {boolean|number} value
     */

    get bannedStars() { return this.has(BANNED_STARS_INDICATOR); }
    set bannedStars(value) { this.fromBitValue(BANNED_STARS_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL diamonds leaderboard
     * @type {boolean}
     * @param {boolean|number} value
     */

    get bannedDiamonds() { return this.has(BANNED_DIAMONDS_INDICATOR); }
    set bannedDiamonds(value) { this.fromBitValue(BANNED_DIAMONDS_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL secret coins leaderboard
     * @type {boolean}
     * @param {boolean|number} value
     */

    get bannedScoins() { return this.has(BANNED_SCOINS_INDICATOR); }
    set bannedScoins(value) { this.fromBitValue(BANNED_SCOINS_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL user coins leaderboard
     * @type {boolean}
     * @param {boolean|number} value
     */

    get bannedUcoins() { return this.has(BANNED_UCOINS_INDICATOR); }
    set bannedUcoins(value) { this.fromBitValue(BANNED_UCOINS_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL demons leaderboard
     * @type {boolean}
     * @param {boolean|number} value
     */

    get bannedDemons() { return this.has(BANNED_DEMONS_INDICATOR); }
    set bannedDemons(value) { this.fromBitValue(BANNED_DEMONS_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL creator points leaderboard
     * @type {boolean}
     * @param {boolean|number} value
     */

    get bannedCP() { return this.has(BANNED_CP_INDICATOR); }
    set bannedCP(value) { this.fromBitValue(BANNED_CP_INDICATOR, value); }

    /**
     * @description Whether the user is labeled as a selected selection
     * @type {boolean}
     * @param {boolean|number} value
     */

    get selected() { return this.has(SELECTED_INDICATOR); }
    set selected(value) { this.fromBitValue(SELECTED_INDICATOR, value); }

    /**
     * @description Whether the user is banned from the UL net score leaderboard
     * @type {boolean}
     */

    get bannedNet() {
        return this.bannedStars
        || this.bannedDiamonds
        || this.bannedScoins
        || this.bannedUcoins
        || this.bannedDemons
        || this.bannedCP;
    }

    /**
     * @description The numerical value of a user's GD mod level
     * @type {BigInt}
     */

    get modGD() {
        return this.isGDModElder ? 2n
        : this.isGDMod ? 1n
        : 0n;
    }
 
}

module.exports = UserULFlags;
