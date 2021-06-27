"use strict";

const http = require("http");
const Base = require("./Base");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = require("../../source/properties/endpoints").getLevelScore;
const fs = require("fs");
const path = require("path");

const LevelScore = require("../../source/foundation/LevelScore");

class getLevelRequest extends Base {

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
        return ![
            this.levelID > 0,
            this.levelID < 0
        ].includes(true);
    }

    get directoryScores() { return path.resolve(__dirname, "../../source/database/levelScores"); }

    async handler() {
        return await super.handler(async () => {
            let files = await fs.readdirSync(this.directoryScores);
            if (files.includes(`${this.levelID}.json`)) {
                let d = await fs.readFileSync(`${this.directoryScores}/${this.levelID}.json`).toString() || '""';
                d = new LevelScore(JSON.parse(d));
                if (d.isUseable()) return this.json ? d : d.stringify();
            }
            return API_CODES.NO_DATA;
        });
    }

    build(data) {
        data = this.parse(data);
        super.build(data);

        /**
         * @description The Level ID
         * @default 0n
         * @type {BigInt}
         */

        this.levelID = "levelID" in data ? data.levelID : 0n;
        
        return this;
    }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setLevelID(value=0n) { return this; }

}

module.exports = getLevelRequest;