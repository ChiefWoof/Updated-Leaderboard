"use strict";

const BaseAPI = require("../BaseEndpoint");

class Base extends BaseAPI {

    static DIRECTORY = `${this.DIRECTORY}/database`;
    static PROPERTIES_LOADED = -1;

}

module.exports = Base;