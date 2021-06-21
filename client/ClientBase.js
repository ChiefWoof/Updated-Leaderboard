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

    constructor() {
        super();
        this.build();
    }

    getUpTime() { return Date.now() - this.builtAt.getTime(); }

    build() {

        /**
         * @description Actions that go on within the client
         * @type {ActionsManager}
         */

        this.actions = new ActionsManager(this);

        /**
         * @description The user of the client
         * @type {User}
         */

        this.user = new User();

        /**
         * @description The date the client started to run/be built
         * @type {Date}
         */
        
        this.builtAt = new Date();

        return this;
    }

    // This is just for documentation purposes

    /**
     * @param {"sentUserStatAchievement"
     * |"UserRequestBan-GD"} event 
     * @param  {...any} args 
     */

    emit(event, ...args) { super.emit(event, ...args); }

    /**
     * @param {"sentUserStatAchievement"
     * |"UserRequestBan-GD"} event
     * @param  {function():void} cb 
     */

    on(event, cb) { super.on(event, cb); }

}

module.exports = ClientBase;
