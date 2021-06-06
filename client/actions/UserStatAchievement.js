"use strict";

const Action = require("./Action");
const UserStatAchievements = require("../../source/structures/UserStatAchievements");

const {
    USER_STAT_ACHIEVEMENT
} = require("../../source/util/Constants").ACTION_EVENTS;

class UserStatAchievement extends Action {

    handle(currentStats, oldStats) {
        const achievementData = new UserStatAchievements(currentStats, oldStats);
        if (!achievementData.isCompareable()) return;
        achievementData.getAchievements().map(a => {
            this.client.emit(USER_STAT_ACHIEVEMENT, a);
        });
    }

}

module.exports = UserStatAchievement;