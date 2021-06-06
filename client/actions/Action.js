"use strict";

/**
 * @description Actions that go on within a client,
 * inspired by Discord.js
 */

class Action {

    constructor(client) {
        this.client = client;
    }

    handle(data) {
        return data;
    }

}

module.exports = Action;