"use strict";

const getLevelRequest = require("../../../api/database/getLevelRequest");
const submitLevelRequest = require("../../../api/database/submitLevelRequest");
const updateLevelRequest = require("../../../api/database/updateLevelRequest");

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
     * @param {?submitLevelRequest|string} data
     * @returns {submitLevelRequest}
     */

    submitLevelRequest(data) { return new submitLevelRequest(data, this.client); }

    /**
     * @param {?updateLevelRequest|string} data
     * @returns {updateLevelRequest}
     */

    updateLevelRequest(data) { return new updateLevelRequest(data, this.client); }

}

module.exports = EndpointsDatabaseManager;