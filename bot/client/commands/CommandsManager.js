"use strict";

const addUserCommand = require("./addUser");
const leaderboardWhitelistDownloadCommand = require("./leaderboardWhitelistDownload");
const usersULDownloadCommand = require("./usersULDownload");
const leaderboardCommand = require("./leaderboard");
const pingCommand = require("./ping");
const profileCommand = require("./profile");
const progressCommand = require("./progress");
const requestUserCommand = require("./requestUser");
const timeCommand = require("./time");
const statProgressDownloadCommand = require("./statProgressDownload");

class ActionsManager {

    constructor(client) {

        /** @type {addUserCommand} */
        this.addUser = new addUserCommand(client);
        this.addUser.useable = true;
        this.addUser.beta = true;

        /** @type {leaderboardWhitelistDownloadCommand} */
        this.leaderboardWhitelistDownload = new leaderboardWhitelistDownloadCommand(client);
        this.leaderboardWhitelistDownload.useable = true;
        this.leaderboardWhitelistDownload.beta = true;

        /** @type {usersULDownloadCommand} */
        this.usersULDownload = new usersULDownloadCommand(client);
        this.usersULDownload.useable = true;
        this.usersULDownload.beta = true;

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

        /** @type {requestUserCommand} */
        this.requestUser = new requestUserCommand(client);
        this.requestUser.useable = true;
        this.requestUser.beta = true;
        this.requestUser.betaOnly = true;

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
