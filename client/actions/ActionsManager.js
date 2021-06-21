"use strict";

// Individually listing each one for documentation

const sendUserStatAchievement = require("./sendUserStatAchievement");

/**
 * @description Manager for a client's actions,
 * inspired by Discord.js
 */

class ActionsManager {

    constructor(client) {

        this.client = client;

        this.sendUserStatAchievement = new sendUserStatAchievement(client);
        
    }

}

module.exports = ActionsManager;
