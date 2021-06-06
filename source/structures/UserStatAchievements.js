"use strict";

const UserStatAchievement = require("../foundation/UserStatAchievement");
const UserStatAchievementEntry = require("../foundation/UserStatAchievementEntry");
const { USER_ACHIEVEMENTS_THRESHOLDS: THRESHOLDS } = require("../util/Constants");

class UserStatAchievements {

    static THRESHOLDS = THRESHOLDS;
 
    constructor(statsCurrent, statsOld=null) {
        
        this.statsCurrent = statsCurrent instanceof UserStatAchievementEntry
        ? statsCurrent
        : null;
        
        this.statsOld = statsOld instanceof UserStatAchievementEntry
        ? statsOld
        : null;

    }

    isCompareable() { return [this.statsCurrent, this.statsOld].every(v => v instanceof UserStatAchievementEntry); }

    /**
     * @description Creates a UserStatAchievement object with added constant values
     * @returns {UserStatAchievement}
     */

    getAchievementBase() {
        return new UserStatAchievement(this.statsCurrent)
            .setUsernameOld(this.statsOld.username)
            .setModOld(this.statsOld.mod);
    }

    getAchievements() {
        if (!this.isCompareable()) return [];
        
        return [
            ...this.checkUsername(),
            ...this.checkStars(),
            ...this.checkDiamonds(),
            ...this.checkScoins(),
            ...this.checkUcoins(),
            ...this.checkDemons(),
            ...this.checkCP(),
            ...this.checkMod()
        ];
    }

    checkStat(statName="") {
        const achievements = [];
        const baseA = this.getAchievementBase()
            .setThreshold(this.statsCurrent.inSG && `${statName.toUpperCase()}_SG` in THRESHOLDS ? THRESHOLDS[`${statName.toUpperCase()}_SG`] : statName.toUpperCase() in THRESHOLDS ? THRESHOLDS[statName.toUpperCase()] : 0n)
            .setStatCurrent(statName in this.statsCurrent ? this.statsCurrent[statName] : 0n)
            .setStatOld(statName in this.statsOld ? this.statsOld[statName] : 0n);
        if (baseA.hasDifferenceByThreshold())
            achievements.push(baseA);
        return achievements;
    }

    checkStars() { return this.checkStat("stars"); }
    checkDiamonds() { return this.checkStat("diamonds"); }
    checkScoins() { return this.checkStat("scoins"); }
    checkUcoins() { return this.checkStat("ucoins"); }
    checkDemons() { return this.checkStat("demons"); }
    checkCP() { return this.checkStat("cp"); }

    checkUsername() {
        const achievements = [];
        const baseA = this.getAchievementBase()
            .setUsernameOld(this.statsOld.username);
        if (baseA.isUsernameChange())
            achievements.push(baseA);
        return achievements;
    }

    checkMod() {
        const achievements = [];
        const baseA = this.getAchievementBase()
            .setModOld(this.statsOld.mod);
        if (baseA.isModChange())
            achievements.push(baseA);
        return achievements;
    }
    
}

module.exports = UserStatAchievements;