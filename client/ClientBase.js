"use strict";

const { EventEmitter } = require("events");

const User = require("../source/foundation/User");
const ActionsManager = require("./actions/ActionsManager");

/**
 * @description Represents a user using an application that utilizes the library.
 * Heavily inspired by Discord.js
 * @extends {EventEmitter}
 */

class ClientBase extends EventEmitter {

    constructor(client) {
        super();
        this.build(client);
    }

    getUpTime() { return Date.now() - this.builtAt.getTime(); }

    build(client) {

        /**
         * @description The initial client
         * @type {*}
         */

        this.client = client || null;

        /**
         * @description Actions that go on within the client
         * @type {ActionsManager}
         */

        this.actions = new ActionsManager(this);

        /**
         * @description The date the client started to run/be built
         * @type {Date}
         */
        
        this.builtAt = new Date();

        /**
         * @description The user of the client
         * @type {User}
         */

        this.user = new User();

        return this;
    }

    // This is just for documentation purposes

    /**
     * @param {"USER_STAT_ACHIEVEMENT"} event 
     * @param  {...any} args 
     */

    emit(event, ...args) { super.emit(event, ...args); }

    /**
     * @param {"USER_STAT_ACHIEVEMENT"} event 
     * @param  {...any} args 
     */

    on(event, ...args) { super.on(event, ...args); }

}

module.exports = ClientBase;