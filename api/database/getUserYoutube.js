"use strict";

const BaseUserYoutube = require("./BaseUserYoutube");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = require("../../source/properties/endpoints").getUserYoutube;

class getUserYoutube extends BaseUserYoutube {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    async handlerAction() {
        if (await this.entryExists()) {
            let d = await this.getEntryAsItem();
            if (d.isUseable()) return d;
        }
        return API_CODES.NO_DATA;
    }

}

module.exports = getUserYoutube;