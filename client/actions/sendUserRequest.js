"use strict";

const Action = require("./Action");
const UserRequest = require("../../source/foundation/UserRequest");

const {
    USER_REQUEST
} = require("../../source/util/Constants").ACTION_EVENTS;

class sendUserRequest extends Action {

    static HANDLER = USER_REQUEST;

    handle(data) {
        const d = new UserRequest().buildByObj(data);
        return d.isRequestable()
        ? super.handle(this.getHandler(), d)
        : false;
    }

}

module.exports = sendUserRequest;