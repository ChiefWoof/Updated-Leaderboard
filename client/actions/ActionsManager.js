"use strict";

/**
 * @description Manager for a client's actions,
 * inspired by Discord.js
 */

class ActionsManager {

    constructor(client) {

        this.client = client;

        this.register(require("./UserStatAchievement"));

    }

    register(action) {
        this[action.name] = new action(this.client);
    }

}

module.exports = ActionsManager;