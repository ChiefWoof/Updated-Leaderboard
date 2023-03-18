"use strict";

const ColorPresetAction = require("./ColorPreset");
const GlobalRankAction = require("./GlobalRank");
const LeaderboardAction = require("./Leaderboard");
const LeaderboardWhitelistAction = require("./LeaderboardWhitelist");
const NotificationAction = require("./Notification");
const StatProgressChartAction = require("./StatProgressChart");
const StorageFilesAction = require("./StorageFiles");
const UserULAction = require("./UserUL");
const UserULRequestAction = require("./UserULRequest");
const UserULSheetAction = require("./UserULSheet");

class ActionsManager {

    constructor(client) {

        /** @type {ColorPresetAction} */
        this.ColorPreset = new ColorPresetAction(client);

        /** @type {GlobalRankAction} */
        this.GlobalRank = new GlobalRankAction(client);

        /** @type {LeaderboardAction} */
        this.Leaderboard = new LeaderboardAction(client);

        /** @type {LeaderboardWhitelistAction} */
        this.LeaderboardWhitelist = new LeaderboardWhitelistAction(client);

        /** @type {NotificationAction} */
        this.Notification = new NotificationAction(client);

        /** @type {StatProgressChartAction} */
        this.StatProgressChart = new StatProgressChartAction(client);

        /** @type {StorageFilesAction} */
        this.StorageFiles = new StorageFilesAction(client);

        /** @type {UserULAction} */
        this.UserUL = new UserULAction(client);

        /** @type {UserULRequestAction} */
        this.UserULRequest = new UserULRequestAction(client);

        /** @type {UserULSheetAction} */
        this.UserULSheet = new UserULSheetAction(client);

    }

}

module.exports = ActionsManager;
