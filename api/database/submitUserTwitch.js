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

    async handlerAction() {
        if (!(await this.entryExists())) {
            let subID = API_CODES.FAILED;
            await new updateUserTwitch()
                .buildByObj(this.userTwitch)
                .setDateAdded(Date.now())
                .setSubmissionID(subID = await this.getNextSubmissionID())
                .setEntry();
            return subID;
        }
        return API_CODES.TAKEN;
    }

}

module.exports = submitUserTwitch;