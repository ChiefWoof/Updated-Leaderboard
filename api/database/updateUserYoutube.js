"use strict";

const BaseUserYoutube = require("./BaseUserYoutube");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = (require("../../source/properties/endpoints").updateUserYoutube);

const UserYoutube = require("../../source/foundation/UserYoutube");

class updateUserYoutube extends BaseUserYoutube {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    async handlerAction() {
        let exists = await this.entryExists();
        
        if (exists) {
            this.setEntry();
            return API_CODES.SUCCESS;
        } else if (this.forceOverwrite) {
            let subID = API_CODES.FAILED;
            await this
                .setDateAdded(new Date())
                .setSubmissionID(subID = await this.getNextSubmissionID())
                .setEntry();
            return { submissionID: subID };
        }

        return API_CODES.FAILED;
    }

    build(data) {
        data = this.parse(data);

        /**
         * @description Whether to create a new entry if one doesn't already exist
         * @type {boolean}
         */

        this.forceOverwrite = "forceOverwrite" in data ? data.forceOverwrite : false;

        super.build(data);
        UserYoutube.prototype.build.bind(this, data)();
        return this;
    }
    
    
    // This is for documentation purposes

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setForceOverwrite(value=false) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSubmissionID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setYoutubeUserID(value=0n) { return this; }

    /**
     * @default null
     * @param {?Date|string|number} [value=null]
     */

    setDateAdded(value=null) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setULID(value=0n) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setYoutubeRequestBan(value=false) { return this; }

}

module.exports = updateUserYoutube;