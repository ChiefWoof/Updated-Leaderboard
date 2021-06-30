"use strict";

const BaseLevels = require("./BaseLevels");

const LevelScore = require("../../source/foundation/LevelScore");
const fs = require("fs");
const path = require("path");

const getUserYoutube = require("./getUserYoutube");
const getUserTwitch = require("./getUserTwitch");

class BaseLevelRequests extends BaseLevels {

    static PROPERTIES_LOADED = -1;
    static SETS = {};

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     * @override
     */

    isFaulty() {
        if (super.isFaulty()) return true;
        let req = this.levelRequest;
        return !(req.isUseable() && req.hasSender());
    }

    getDirectoryPath(full=false) { return `${path.resolve(__dirname, "../../source/database/levels/requests")}${full ? `/${this.getDirectoryPathEntry()}` : ""}`; }
    getDirectoryPathEntry() { return `${this.levelID || 0}.json`; }
    async entryExists() { return await fs.readdirSync(this.getDirectoryPath()).includes(this.getDirectoryPathEntry()); }
    async getEntry() { return this.entryExists() ? (await fs.readFileSync(this.getDirectoryPath(true)) || '""') : null; }
    async setEntry() { await fs.writeFileSync(this.getDirectoryPath(true), JSON.stringify(this.levelRequest.stringify())); }
    
    async getEntryAsItem() {
        let entry = await this.getEntry();
        return entry ? new LevelScore(JSON.parse(entry)) : null;
    }

    get levelRequest() { return new LevelScore().buildByObj(this); }

    /**
     * @returns {boolean} Whether the sender is able to submit a request.
     * Defaults to true if there is no sender
     */

    async senderCanRequest() {
        let req = this.levelRequest;

        if (req.hasSender()) {

            if (req.senderYoutubeID) {
                let senderYoutube = await new getUserYoutube()
                    .setJSON(true)
                    .setYoutubeUserID(req.senderYoutubeID)
                    .buildByObj(req)
                    .handler();
                if (!senderYoutube.isError && JSON.parse(senderYoutube.data).youtubeRequestBan)
                    return false;
            }
            
            if (req.senderTwitchID) {
                let senderTwitch = await new getUserTwitch()
                    .setJSON(true)
                    .setTwitchUserID(req.senderTwitchID)
                    .buildByObj(req)
                    .handler();
                if (!senderTwitch.isError && JSON.parse(senderTwitch.data).twitchRequestBan)
                    return false;
            }

        }

        return true;
    }

}

module.exports = BaseLevelRequests;