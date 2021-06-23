"use strict";

const {
    HANDLES_EVENTS,
    ACTION_EVENTS: { RAW }
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
            ? HANDLES_EVENTS[type]
        : this.constructor.name.startsWith(HANDLES_EVENTS.actionSend)
            ? HANDLES_EVENTS.actionSent
        : this.constructor.name.startsWith(HANDLES_EVENTS.actionCreate)
            ? HANDLES_EVENTS.actionCreated
        : this.constructor.name.startsWith(HANDLES_EVENTS.actionGet)
            ? HANDLES_EVENTS.actionGet
        : HANDLES_EVENTS.action;
    }

    getHandler(handlerType=this.getHandlerType()) {
        let handler = this.constructor.HANDLER;
        if (!handler)
            throw new Error("Invalid handler");
        return handlerType
        ? `${handlerType}${handler}`
        : handler;
    }

    handle(listener, ...params) {
        if (listener) this.client.emit(listener, ...params);
        return true;
    }

}

module.exports = Action;
