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

    getHandlerType(type=undefined) {
        return type && type in HANDLES_EVENTS
        ? type
        : this.constructor.name.startsWith("send")
        ? "actionSent"
        : "action";
    }

    getHandler(handlerType=this.getHandlerType()) {
        let handler = this.constructor.HANDLER;
        if (!handler)
            throw new Error("Invalid handler");
        return handlerType
        ? [handlerType, handler].join("-")
        : handler;
    }

    handle() { return true; }

}

module.exports = Action;
