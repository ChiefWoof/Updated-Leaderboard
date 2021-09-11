"use strict";

const StatsObject = require("./StatsObject");
const PROPERTY_LIST = (require("../properties/foundation").UserProgressEntry);

/**
 * @description Representation of an entry of a user's progress
 * @extends {StatsObject}
 */

class UserProgressEntry extends StatsObject {

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    build(data) {

        data = this.parse(data);

        /**
         * @description The date timestamp of when the user's stats were refreshed or null.
         * Is null for dates before this index was recorded
         * @default 0n
         * @type {?Date}
         */

        this.timestamp = "timestamp" in data ? data.timestamp : null;

        /**
         * @description The entry's index based on the very first refresh
         * @default 0n
         * @type {BigInt}
         */

        this.entryID = "entryID" in data ? data.entryID : 0n;
        
        super.build(data);
        
        return this;
    }

    /**
     * @description Whether the timestamp is for the user's account refresh
     * @type {boolean}
     */
    
    get timestampIsAccountRefresh() { return this.timestamp instanceof Date; }

    
    // This is for documentation purposes

    /**
     * @default null
     * @param {?Date|string|number} [value=null]
     */

    setTimestamp(value=null) { return this; }

    /**
     * @default 0n
     * @param {string|number|BigInt} [value=0n]
     */

    setEntryID(value=0n) { return this; }

}

module.exports = UserProgressEntry;