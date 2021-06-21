"use strict";

const {
    HANDLES_EVENTS
} = require("../../source/util/Constants");

/**
 * @description Actions that go on within a client,
 * inspired by Discord.js
 */

class Action {

    static HANDLER = null;

    constructor(client) {
        this.client = client;
    }

    getHandler(withType=true) {
        let handler = this.constructor.HANDLER;
        if (!handler)
            throw new Error("Invalid handler");
        return withType
        ? [HANDLES_EVENTS.action, handler].join("-")
        : handler;
    }

    handle() { return true; }

}

module.exports = Action;
