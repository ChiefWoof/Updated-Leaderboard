"use strict";

const Base = require("./BaseLevelRequests");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = require("../../source/properties/endpoints").getLevelRequest;

class getLevelRequest extends Base {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    constructor(data, client) {
        super(data, client);
        this.build(data);
    }

    /**
     * @todo add a check for negative level IDs and certifying they're XShadowWizardX
     * @returns {boolean} Whether the current parameters indicate the user passes permission requirements
     * @override
     */

    hasPermission() { return super.hasPermission(); }

    async handlerAction() {
        if (await this.entryExists()) {
            let d = await this.getEntryAsLevelRequest();
            if (d.isUseable()) return d;
        }
        return API_CODES.NO_DATA;
    }

}

module.exports = getLevelRequest;
