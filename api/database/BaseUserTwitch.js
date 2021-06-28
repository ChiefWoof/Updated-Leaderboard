"use strict";

const BaseUsers = require("./BaseUsers");

const UserTwitch = require("../../source/foundation/UserTwitch");
const fs = require("fs");
const path = require("path");

class BaseUserTwitch extends BaseUsers {

    static PROPERTIES_LOADED = -1;
    static SETS = {};

    getDirectoryPath(full=false) { return `${path.resolve(__dirname, "../../source/database/users/twitch")}${full ? `/${this.getDirectoryPathEntry()}` : ""}`; }
    getDirectoryPathEntry() { return `${this.twitchUserID || 0}.json`; }
    async entryExists() { return await fs.readdirSync(this.getDirectoryPath()).includes(this.getDirectoryPathEntry()); }
    async getEntry() { return this.entryExists() ? (await fs.readFileSync(this.getDirectoryPath(true)) || '""') : null; }
    async setEntry() { await fs.writeFileSync(this.getDirectoryPath(true), JSON.stringify(this.userTwitch.stringify())); }
    
    async getEntryAsUser() {
        let entry = await this.getEntry();
        return entry ? new UserTwitch(JSON.parse(entry)) : null;
    }

    async getNextSubmissionID() {
        let files = await fs.readdirSync(this.getDirectoryPath());
        return files.reduce((v, a) => {
            if (/^\d{1,}.json$/.test(a)) v += 1n;
            return v;
        }, 0n) + 1n;
    }

    get userTwitch() { return new UserTwitch().buildByObj(this); }

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     * @override
     */

    isFaulty() {
        return super.isFaulty()
        || !(this.twitchUserID > 0);
    }

    build(data) {
        data = this.parse(data);
        super.build(data);

        /**
         * @description The identification number of the user on Twitch
         * @default 0n
         * @type {BigInt}
         */

        this.twitchUserID = "twitchUserID" in data ? data.twitchUserID : 0n;
        
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
                    let req = await entry.getEntryAsUser();
                    return res(this.buildByObj(req.buildByObj(data)));
                }
            }
            
            return res(this);
        });
    }

    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setTwitchUserID(value=0n) { return this; }

}

module.exports = BaseUserTwitch;