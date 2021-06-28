"use strict";

const BaseUsers = require("./BaseUsers");

const UserYoutube = require("../../source/foundation/UserYoutube");
const fs = require("fs");
const path = require("path");

class BaseUserTwitch extends BaseUsers {

    static PROPERTIES_LOADED = -1;
    static SETS = {};

    getDirectoryPath(full=false) { return `${path.resolve(__dirname, "../../source/database/users/youtube")}${full ? `/${this.getDirectoryPathEntry()}` : ""}`; }
    getDirectoryPathEntry() { return `${this.youtubeUserID || 0}.json`; }
    async entryExists() { return await fs.readdirSync(this.getDirectoryPath()).includes(this.getDirectoryPathEntry()); }
    async getEntry() { return this.entryExists() ? (await fs.readFileSync(this.getDirectoryPath(true)) || '""') : null; }
    async setEntry() { await fs.writeFileSync(this.getDirectoryPath(true), JSON.stringify(this.userYoutube.stringify())); }
    
    async getEntryAsUser() {
        let entry = await this.getEntry();
        return entry ? new UserYoutube(JSON.parse(entry)) : null;
    }

    async getNextSubmissionID() {
        let files = await fs.readdirSync(this.getDirectoryPath());
        return files.reduce((v, a) => {
            if (/^\d{1,}.json$/.test(a)) v += 1n;
            return v;
        }, 0n) + 1n;
    }

    get userYoutube() { return new UserYoutube().buildByObj(this); }

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     * @override
     */

    isFaulty() {
        return super.isFaulty()
        || !(this.youtubeUserID > 0);
    }

    build(data) {
        data = this.parse(data);
        super.build(data);

        /**
         * @description The identification number of the user on Youtube
         * @default 0n
         * @type {BigInt}
         */

        this.youtubeUserID = "youtubeUserID" in data ? data.youtubeUserID : 0n;
        
        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setYoutubeUserID(value=0n) { return this; }

}

module.exports = BaseUserTwitch;