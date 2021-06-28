"use strict";

const BaseDatabase = require("./Base");

const LevelScore = require("../../source/foundation/LevelScore");
const fs = require("fs");
const path = require("path");

class Base extends BaseDatabase {

    static DIRECTORY = `${this.DIRECTORY}/requests`;
    static DIRECTORY_PATH = "../../source/database/levels/requests";
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    getDirectoryPath(full=false) { return `${path.resolve(__dirname, this.constructor.DIRECTORY_PATH)}${full ? `/${this.getDirectoryPathEntry()}` : ""}`; }
    getDirectoryPathEntry() { return `${this.levelID || 0}.json`; }
    async entryExists() { return await fs.readdirSync(this.getDirectoryPath()).includes(this.getDirectoryPathEntry()); }
    async getEntry() { return this.entryExists() ? (await fs.readFileSync(this.getDirectoryPath(true)) || '""') : null; }
    async setEntry() { await fs.writeFileSync(this.getDirectoryPath(true), JSON.stringify(this.levelRequest.stringify())); }
    
    async getEntryAsLevelRequest() {
        let entry = await this.getEntry();
        return entry ? new LevelScore(JSON.parse(entry)) : null;
    }

    async getNextSubmissionID() {
        let files = await fs.readdirSync(this.getDirectoryPath());
        return files.reduce((v, a) => {
            if (/^\d{1,}.json$/.test(a)) v += 1n;
            return v;
        }, 0n) + 1n;
    }

    get levelRequest() { return new LevelScore().buildByObj(this); }

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     * @override
     */

    isFaulty() {
        return super.isFaulty() || ![
            this.levelID > 0,
            this.levelID < 0
        ].includes(true);
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
     * @description Builds the object specifically based on API parameters
     * @returns {Promise<this>}
     * @override
     */

    async buildByParams(data) {
        return new Promise(async res => {
            this.build(this).buildByObj(data);

            if (Object.prototype.toString.call(data) === "[object Object]") {
                let entry = new this.constructor().buildByObj(data);
                if (await entry.entryExists()) {
                    let req = await entry.getEntryAsLevelRequest();
                    return res(this.buildByObj(req.buildByObj(data)));
                }
            }
            
            return res(this);
        });
    }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setLevelID(value=0n) { return this; }

}

module.exports = Base;