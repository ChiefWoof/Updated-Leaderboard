"use strict";

const UserProgressEntry = require("../foundation/UserProgressEntry");

/**
 * @description A collection of stored entries of a user's progress
 * in the format (entryID, UserProgressEntry)
 * @extends {Map<string, UserProgressEntry>}
 */

class ulLeaderboardManager extends Map {

    /**
     * @returns {boolean} Whether a accountID exists in the cache
     */

    hasEntryID(id) { return this.has(`${id}`); }
    
    /**
     * @description Attempts to register an entry into the cache
     * @param {UserProgressEntry} entry 
     * @returns {boolean} Whether the entry was added
     */

    add(entry) {
        if (!(entry instanceof UserProgressEntry))
            throw new Error("Entry is not a proper instance");
        if (entry.entryID > 0 && !this.hasEntryID(entry.entryID)) {
            this.set(`${entry.entryID}`, entry);
            return true;
        }
        return false;
    }
    
    /**
     * @description Attempts to update a entry's data
     * @param {UserProgressEntry} entry 
     * @returns {boolean} Whether the entry was updated
     */

    update(entry) {
        if (!(entry instanceof UserProgressEntry))
            throw new Error("Entry is not a proper instance");
        if (this.hasEntryID(entry.entryID)) {
            this.set(`${entry.entryID}`, entry);
            return true;
        }
        return false;
    }

    /**
     * @description Attempts to remove a registered entry
     * @param {string|number} index the index to be removed
     * @returns {boolean} Whether the entry was removed
     * @override
     */

    delete(index) {
        if (this.hasEntryID(index)) {
            super.delete(`${index}`);
            return true;
        }
        return false;
    }

    /**
     * @description Attempts to remove a registered entry by the entry object
     * @param {UserProgressEntry} entry the entry
     * @returns {boolean} Whether the entry was removed
     * @override
     */

    deleteEntry(entry) { return this.delete(entry.entryID); }

}

module.exports = ulLeaderboardManager;