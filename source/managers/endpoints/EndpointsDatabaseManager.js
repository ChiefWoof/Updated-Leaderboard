"use strict";

const getLevelRequest = require("../../../api/database/getLevelRequest");
const getUserTwitch = require("../../../api/database/getUserTwitch");
const getUserYoutube = require("../../../api/database/getUserYoutube");

const submitLevelRequest = require("../../../api/database/submitLevelRequest");
const submitUserTwitch = require("../../../api/database/submitUserTwitch");
const submitUserYoutube = require("../../../api/database/submitUserYoutube");

const updateLevelRequest = require("../../../api/database/updateLevelRequest");
const updateUserTwitch = require("../../../api/database/updateUserTwitch");
const updateUserYoutube = require("../../../api/database/updateUserYoutube");

/**
 * @description A manager for API endpoints in the database directory
 */

class EndpointsDatabaseManager {

    constructor(client) {
        this.client = client;
        Object.defineProperty(this, "client", { enumerable: false });
    }

    /**
     * @param {?getLevelRequest|string} data
     * @returns {getLevelRequest}
     */

    getLevelRequest(data) { return new getLevelRequest(data, this.client); }

    /**
     * @param {?getUserTwitch|string} data
     * @returns {getUserTwitch}
     */

    getUserTwitch(data) { return new getUserTwitch(data, this.client); }

    /**
     * @param {?getUserYoutube|string} data
     * @returns {getUserYoutube}
     */

    getUserYoutube(data) { return new getUserYoutube(data, this.client); }
     
    /**
     * @param {?submitLevelRequest|string} data
     * @returns {submitLevelRequest}
     */
 
    submitLevelRequest(data) { return new submitLevelRequest(data, this.client); }

    /**
     * @param {?submitUserTwitch|string} data
     * @returns {submitUserTwitch}
     */

    submitUserTwitch(data) { return new submitUserTwitch(data, this.client); }
    
     /**
     * @param {?submitUserYoutube|string} data
     * @returns {submitUserYoutube}
     */

    submitUserYoutube(data) { return new submitUserYoutube(data, this.client); }

    /**
     * @param {?updateLevelRequest|string} data
     * @returns {updateLevelRequest}
     */

    updateLevelRequest(data) { return new updateLevelRequest(data, this.client); }
    
    /**
     * @param {?updateUserTwitch|string} data
     * @returns {updateUserTwitch}
     */
 
    updateUserTwitch(data) { return new updateUserTwitch(data, this.client); }
    
    /**
     * @param {?updateUserYoutube|string} data
     * @returns {updateUserYoutube}
     */
 
    updateUserYoutube(data) { return new updateUserYoutube(data, this.client); }

}

module.exports = EndpointsDatabaseManager;
