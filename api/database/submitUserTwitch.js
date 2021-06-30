"use strict";

const BaseUserTwitch = require("./BaseUserTwitch");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = (require("../../source/properties/endpoints").submitUserTwitch);

const updateUserTwitch = require("./updateUserTwitch");

class submitUserTwitch extends BaseUserTwitch {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    async handlerAction() {
        if (!(await this.entryExists())) {
            return await new updateUserTwitch()
                .buildByObj(this.userTwitch)
                .handler();
        }
        return API_CODES.TAKEN;
    }

}

module.exports = submitUserTwitch;