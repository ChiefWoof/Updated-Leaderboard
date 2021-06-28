"use strict";

const EndpointsDatabaseManager = require("./EndpointsDatabaseManager");

/**
 * @description A manager for all API endpoints
 */

class EndpointsManager {

    constructor(client) {
        this.client = client;
        Object.defineProperty(this, "client", { enumerable: false });

        /**
         * @description A manager for API endpoints in the database directory
         * @type {EndpointsDatabaseManager}
         */
        
        this.database = new EndpointsDatabaseManager(this.client);

    }

}

module.exports = EndpointsManager;