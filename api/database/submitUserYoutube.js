"use strict";

const BaseUserYoutube = require("./BaseUserYoutube");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = (require("../../source/properties/endpoints").submitUserYoutube);

const updateUserYoutube = require("./updateUserYoutube");

class submitUserYoutube extends BaseUserYoutube {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;

    async handlerAction() {
        if (!(await this.entryExists())) {
            let subID = API_CODES.FAILED;
            await new updateUserYoutube()
                .buildByObj(this.userYoutube)
                .setDateAdded(Date.now())
                .setSubmissionID(subID = await this.getNextSubmissionID())
                .setEntry();
            return subID;
        }
        return API_CODES.TAKEN;
    }

}

module.exports = submitUserYoutube;