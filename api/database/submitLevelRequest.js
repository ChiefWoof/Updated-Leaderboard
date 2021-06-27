"use strict";

const Base = require("./Base");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = (require("../../source/foundation/LevelScore").PROPERTY_LIST);
const fs = require("fs");
const path = require("path");

const LevelScore = require("../../source/foundation/LevelScore");

class submitLevelRequest extends Base {

    static DIRECTORY = `${this.DIRECTORY}/${this.name}`;
    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;

    constructor(data, client) {
        super(data, client);
        this.build(data);
    }

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     */

    isFaulty() {
        return this.levelID == 0
        || !this.levelRequest.hasSender();
    }

    get directoryScores() { return path.resolve(__dirname, "../../source/database/levelScores"); }
    get levelRequest() { return new LevelScore().buildByObj(this); }

    async handler() {
        return await super.handler(async () => {
            let files = await fs.readdirSync(this.directoryScores);
            if (!files.includes(`${this.levelID}.json`)) {
                let req = this.levelRequest;
                let dir = `${this.directoryScores}/${req.levelID}.json`;
                req.setTimestamp(Date.now());
                await fs.writeFileSync(dir, JSON.stringify(req.stringify()));
                return API_CODES.SUCCESS;
            }
            return API_CODES.TAKEN;
        });
    }

    build(data) {
        data = this.parse(data);
        super.build(data);
        LevelScore.prototype.build.bind(data);
        return this;
    }

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

module.exports = submitLevelRequest;