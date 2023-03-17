"use strict";

const ENTRY = require("../structures/UserULStatProgressEntry");

/**
 * @extends {Array<ENTRY>}
 */

class StatProgressManager extends Array {

    /**
     * @type {?ENTRY}
     */

    get recent() { return this.length > 0 ? this.searchNearest(Date.now()) : null; }

    /**
     * @type {?ENTRY}
     */

    get oldest() { return this.length > 0 ? this.searchNearest(0) : null; }

    clear() { this.splice(0, this.length); return this; }

    /**
     * @param {Object} data 
     * @returns {ENTRY}
     */

    objToEntry({
        accountID = 0,
        timestampStatsRefreshed = null,
        stars = 0,
        diamonds = 0,
        scoins = 0,
        ucoins = 0,
        demons = 0,
        cp = 0
    }={}) {
        let entry = new ENTRY();
        entry.accountID = accountID;
        entry.timestampStatsRefreshed = timestampStatsRefreshed;
        entry.stars = stars;
        entry.diamonds = diamonds;
        entry.scoins = scoins;
        entry.ucoins = ucoins;
        entry.demons = demons;
        entry.cp = cp;
        return entry;
    }

    /**
     * @param  {...ENTRY} entry 
     */

    add(...entry) {
        entry.forEach(e => {
            let i = this.searchAddIndex(e.timestampStatsRefreshed);
            if (i >= 0) this.splice(i, 0, e);
        });
        return this;
    }

    /**
     * @description Removes "current" entry if applicable
     */

    removeCurrent() {
        let recent = this.recent;
        if (recent && recent.current)
            this.splice(0, 1);
        return this;
    }

    /**
     * @param  {ENTRY|Object} entry 
     */

    setCurrent(entry) {
        this.removeCurrent();
        let e = this.objToEntry(entry);
        e.current = true;
        e.timestampStatsRefreshed = entry.timestampStatsRefreshed || Date.now();
        this.add(e);
        return this;
    }

    /**
     * @param {number} timestamp   
     * @returns {number}
     */

    searchIndex(timestamp) {
        if (typeof timestamp === "number") {
            let i = 0;
            let j = this.length - 1;
            while (i <= j) {
                let m = Math.floor((i + j) / 2);
                if (this[m].timestampStatsRefreshed == timestamp) return m;
                else if (this[m].timestampStatsRefreshed < timestamp) j = m - 1;
                else  i = m + 1;
            }
        }
        return -1;
    }
    
    /**
     * @param {number} timestamp 
     * @returns {?ENTRY}
     */

    search(timestamp) { return this[this.searchIndex(timestamp)] || null; }
    
    /**
     * @param {number} timestamp 
     * @returns {?ENTRY}
     */

    searchNearestOldest(timestamp) {
        let i = this.searchAddIndex(timestamp);
        if (i >= 0) {
            if (this.length > 0 && this.length == i) i--;
            if (this[i].timestampStatsRefreshed <= timestamp)
                return this[i];
            else if (this[++i])
                return this[i];
        }
        return null;
    }
    
    /**
     * @param {number} timestamp 
     * @returns {?ENTRY}
     */

    searchNearestRecent(timestamp) {
        let i = this.searchAddIndex(timestamp);
        if (i >= 0) {
            if (this.length > 0 && this.length == i) i--;
            if (this[i].timestampStatsRefreshed >= timestamp)
                return this[i];
            else if (this[--i])
                return this[i];
        }
        return null;
    }
    
    /**
     * @param {number} timestamp 
     * @returns {[ recent: ?ENTRY, oldest: ?ENTRY ]}
     */

    searchNearestBounded(timestamp) {
        return [
            this.searchNearestRecent(timestamp),
            this.searchNearestOldest(timestamp),
        ];
    }
    
    /**
     * @param {number} timestamp 
     * @returns {?UserUL}
     */

    searchNearest(timestamp) {
        if (this.length > 0) {
            let near = this.searchNearestBounded(timestamp);
            if (!near[0] && !near[1]) return null;
            else if (near[0] && !near[1]) return near[0]
            else if (!near[0] && near[1]) return near[1];
            else {
                return Math.abs(timestamp - near[0].timestampStatsRefreshed) < Math.abs(timestamp - near[1].timestampStatsRefreshed)
                ? near[0]
                : near[1];
            }
        }
        return null;
    }
    
    /**
     * @param {number} timestamp 
     * @returns {number}
     */

    searchAddIndex(timestamp) {
        if (typeof timestamp === "number") {
            let i = 0;
            let j = this.length - 1;
            while (i <= j) {
                var m = Math.floor((i + j) / 2);
                if (this[m].timestampStatsRefreshed == timestamp) return m;
                else if (this[m].timestampStatsRefreshed < timestamp) j = m - 1;
                else  i = m + 1;
            }
            return i;
        }
        return -1;
    }
    
    /**
     * @param {number} timestamp 
     * @returns {boolean}
     */

    has(timestamp) { return this.searchIndex(timestamp) >= 0; }
    
    /**
     * @param {number} timestamp 
     * @returns {[ recent: ?ENTRY, oldest: ?ENTRY ]}
     */

    getEstimateSources(timestamp) {
        if (this.length > 1) {
            let s = this.searchNearestBounded(timestamp);
            if (!s.every(v => v === null)) {
                let [ sRecent, sOldest ] = s;
                if (sRecent == null)
                    sRecent = this[this.searchIndex(sOldest.timestampStatsRefreshed) + 1];
                else if (sOldest == null)
                    sOldest = this[this.searchIndex(sRecent.timestampStatsRefreshed) - 1];
                return [ sRecent, sOldest ];
            }
        }
        return [ null, null ];
    }
    
    /**
     * @param {number} timestamp 
     * @returns {?ENTRY}
     */

    estimateToTimestamp(timestamp) {
        if (this.length == 1) return this.search(timestamp);
        let sources = this.getEstimateSources(timestamp);
        if (!sources.every(v => v === null)) {
            
            let [ sRecent, sOldest ] = sources;
            let timeDiffBounded = sRecent.timestampStatsRefreshed - sOldest.timestampStatsRefreshed;
            if (timeDiffBounded === 0) return sRecent;

            let res = new ENTRY().fromJSON(sRecent.toJSON());
            res.timestampStatsRefreshed = timestamp;
            res.estimated = true;

            [ "stars", "diamonds", "scoins", "ucoins", "demons", "cp" ].forEach(stat => {
                let statDiff = sRecent[stat] - sOldest[stat];
                res[stat] = sRecent[stat] + statDiff / timeDiffBounded * (timestamp - sRecent.timestampStatsRefreshed);
                res[stat] = Math.round(res[stat]);
            });

            return res;

        }
        return null;
    }

}

module.exports = StatProgressManager;
