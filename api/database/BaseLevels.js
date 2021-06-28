"use strict";

const BaseDatabase = require("./BaseDatabase");

class BaseLevels extends BaseDatabase {

    static PROPERTIES_LOADED = -1;
    static SETS = {};

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     * @override
     */

    isFaulty() {
        return super.isFaulty()
        || !(this.levelID > 0);
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
    
    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setLevelID(value=0n) { return this; }

}

module.exports = BaseLevels;