"use strict";

const Action = require("./Action");
const UserRequestBanRanks = require("../../source/foundation/UserRequestBanRanks");

const {
    USER_REQUEST_BAN_GD
} = require("../../source/util/Constants").ACTION_EVENTS;

class sendUserRequestBanGD extends Action {

    static HANDLER = USER_REQUEST_BAN_GD;

    handle(data) {
        const d = new UserRequestBanRanks().buildByObj(data);
        return d.isAcceptable()
        ? super.handle(this.getHandler(), d)
        : false;
    }

}

module.exports = sendUserRequestBanGD;
