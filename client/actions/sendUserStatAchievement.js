"use strict";

const Action = require("./Action");
const UserStatAchievements = require("../../source/structures/UserStatAchievements");

const {
    USER_STAT_ACHIEVEMENT
} = require("../../source/util/Constants").ACTION_EVENTS;

class sendUserStatAchievement extends Action {

    static HANDLER = USER_STAT_ACHIEVEMENT;

    handle(currentStats, oldStats) {
        const achievementData = new UserStatAchievements(currentStats, oldStats);
        if (!achievementData.isCompareable()) return false;
        achievementData.getAchievements().map(a => {
            this.client.emit(this.getHandler(), a);
        });
        super.handle();
    }

}

module.exports = sendUserStatAchievement;