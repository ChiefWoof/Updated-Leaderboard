"use strict";

const leaderboardWhitelistDownloadCommand = require("./leaderboardWhitelistDownload");
const usersULDownloadCommand = require("./usersULDownload");
const leaderboardCommand = require("./leaderboard");
const pingCommand = require("./ping");
const profileCommand = require("./profile");
const progressCommand = require("./progress");
const timeCommand = require("./time");
const statProgressDownloadCommand = require("./statProgressDownload");

class ActionsManager {

    constructor(client) {

        /** @type {leaderboardWhitelistDownloadCommand} */
        this.leaderboardWhitelistDownload = new leaderboardWhitelistDownloadCommand(client);
        this.leaderboardWhitelistDownload.useable = true;
        this.leaderboardWhitelistDownload.beta = true;
        this.leaderboardWhitelistDownload.sg = true;

        /** @type {usersULDownloadCommand} */
        this.usersULDownload = new usersULDownloadCommand(client);
        this.usersULDownload.useable = true;
        this.usersULDownload.beta = true;
        this.usersULDownload.sg = true;

        /** @type {pingCommand} */
        this.ping = new pingCommand(client);
        this.ping.useable = true;
        this.ping.beta = true;

        /** @type {profileCommand} */
        this.profile = new profileCommand(client);
        this.profile.useable = true;
        this.profile.beta = true;

        /** @type {progressCommand} */
        this.progress = new progressCommand(client);
        this.progress.useable = true;
        this.progress.beta = true;

        /** @type {statProgressDownloadCommand} */
        this.statProgressDownload = new statProgressDownloadCommand(client);
        this.statProgressDownload.useable = true;
        this.statProgressDownload.beta = true;

        /** @type {timeCommand} */
        this.time = new timeCommand(client);
        this.time.useable = true;
        this.time.beta = true;

        /** @type {leaderboardCommand} */
        this.leaderboard = new leaderboardCommand(client);
        this.leaderboard.useable = true;
        this.leaderboard.beta = true;

    }

}

module.exports = ActionsManager;