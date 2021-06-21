"use strict";

// Individually listing each one for documentation

const sendUserStatAchievement = require("./sendUserStatAchievement");
const sendUserRequestBanGD = require("./sendUserRequestBanGD");

/**
 * @description Manager for a client's actions,
 * inspired by Discord.js
 */

class ActionsManager {

    constructor(client) {

        this.client = client;

        this.sendUserStatAchievement = new sendUserStatAchievement(client);
        this.sendUserRequestBanGD = new sendUserRequestBanGD(client);
        
    }

}

module.exports = ActionsManager;
