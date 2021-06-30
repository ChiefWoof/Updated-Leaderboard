"use strict";

const BaseLevelRequests = require("./BaseLevelRequests");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = (require("../../source/properties/endpoints").updateLevelRequest);

const LevelScore = require("../../source/foundation/LevelScore");

const updateUserTwitch = require("./updateUserTwitch");
const updateUserYoutube = require("./updateUserYoutube");

class updateLevelRequest extends BaseLevelRequests {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    async handlerAction() {

        if (this.forceRequestabilityCheck && !(await this.senderCanRequest()))
            return API_CODES.FAILED_BAN;

        if (this.senderTwitchID) {
            let dTwitch = new updateUserTwitch({
                forceOverwrite: this.forceOverwrite,
                twitchUserID: this.senderTwitchID
            });
            await dTwitch.loadEntryItem();
            await dTwitch.handler();
        }
                
        if (this.senderYoutubeID) {
            let dYoutube = new updateUserYoutube({
                forceOverwrite: this.forceOverwrite,
                youtubeUserID: this.senderYoutubeID
            });
            await dYoutube.loadEntryItem();
            await dYoutube.handler();
        }

        let exists = await this.entryExists();
        
        if (exists) {
            this.setEntry();
            return API_CODES.SUCCESS;
        } else if (this.forceOverwrite) {

            let subID = API_CODES.FAILED;
            await this
                .setTimestamp(new Date())
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

        /**
         * @description Whether to force a check if the entered sender can request before updating
         * @type {boolean}
         */

        this.forceRequestabilityCheck = "forceRequestabilityCheck" in data ? data.forceRequestabilityCheck : false;

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
     * @default false
     * @param {boolean} [value=false]
     */

    setforceRequestabilityCheck(value=false) { return this; }

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