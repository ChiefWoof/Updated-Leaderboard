"use strict";

const fs = require("fs");

const BaseEndpoint = require("../BaseEndpoint");

class BaseDatabase extends BaseEndpoint {

    static PROPERTIES_LOADED = -1;
    static SETS = {};

    async getNextSubmissionID() {
        let files = await fs.readdirSync(this.getDirectoryPath());
        return files.reduce((v, a) => {
            return v += 1n;
        }, 0n) + 1n;
    }

    /**
     * @description Loads and fills by an existing entry if applicable
     */

    async loadEntryItem() {
        if (await this.entryExists()) {
            let req = await this.getEntryAsItem();
            this.buildByObj(req);
        }
        return this;
    }

}

module.exports = BaseDatabase;