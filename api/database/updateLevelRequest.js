"use strict";

const BaseLevelRequests = require("./BaseLevelRequests");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = (require("../../source/properties/endpoints").updateLevelRequest);

const LevelScore = require("../../source/foundation/LevelScore");

class updateLevelRequest extends BaseLevelRequests {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;

    async handlerAction() {
        return this.forceOverwrite || await this.entryExists()
        ? await this.setEntry() || API_CODES.SUCCESS
        : API_CODES.FAILED;
    }

    build(data) {
        data = this.parse(data);

        /**
         * @description Whether to create a new entry if one doesn't already exist
         * @type {boolean}
         */

        this.forceOverwrite = "forceOverwrite" in data ? data.forceOverwrite : false;

        super.build(data);
        LevelScore.prototype.build.bind(this, data)();
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

    setLevelID(value=0n) { return this; }

    /**
     * @default null
     * @param {?Date|string|number} [value=null]
     */

    setTimestamp(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setViewed(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setIsNSFW(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setRejected(value=false) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setReview(value=null) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSenderDisID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSenderAccountID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSenderTwitchID(value=0n) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setSenderYoutubeID(value=null) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setReviewerDisID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setReviewerAccountID(value=0n) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setSenderBanResult(value=false) { return this; }

}

module.exports = updateLevelRequest;