"use strict";

/**
 * @typedef {"PROFILE"
 * | "PROGRESS"
 * } PROFILE_PAGES
 */

/**
 * @typedef {"STARS"
* | "DIAMONDS"
* | "SCOINS"
* | "UCOINS"
* | "DEMONS"
* | "CP"
* } STAT
*/

/**
 * @typedef {"WEEKLY"
 * |"WEEKLY_DEFAULT"
 * |"MONTHLY"
 * |"MONTHLY_DEFAULT"
 * |"YEARLY"
 * |"YEARLY_DEFAULT"
* } PROGRESS_TYPE
*/

const Base = require("./Base");

const UserUL = require("./UserUL");

class UserULProfile extends Base {

    constructor(user = new UserUL()) {

        super();

        /**
         * @description The raw profile
         * @type {UserUL}
         */

        this.profileRaw = user;

        /**
         * @description The editable version of the profile
         * @type {UserUL}
         */

        this.profile = new UserUL();

        /**
         * @description The page section to display of the profile
         * @type {PROFILE_PAGES}
         */

        this.page = "PROFILE";

        /**
         * @description The page of the page section to display
         * @type {number}
         */

        this.pageLocal = 0;

        /**
         * @description The selected stat
         * @type {STAT}
         */

        this.stat = "STARS";

        /**
         * @description The selected progression type
         * @type {PROGRESS_TYPE}
         */

        this.progressType = "WEEKLY_DEFAULT";

        /**
         * @description The lower bound of the progress chart
         * @type {number}
         */

        this.progressLB = 0;

        /**
         * @description The upper bound of the progress chart
         * @type {number}
         */

        this.progressUB = Infinity;

    }

    setOldestToProgressLB() {
        this.progressLB = this.profile.progress.oldest?.timestampStatsRefreshed || 0;
        return this;
    }

    setBoundsDefaultWeekly() {

        if (this.profile.progress.length === 0)
            throw new Error("No progress available");

        this.progressUB = Infinity;

        let tRecent = this.profile.timestampStatsRefreshed;
        let tOldest = this.profile.progress.oldest?.timestampStatsRefreshed || 0;

        let d = new Date(tOldest);
        while (d.setDate(d.getDate() + 7) <= tRecent);
        d.setMonth(d.getMonth() - 2);

        this.progressLB = d.getTime();

        return this;
    }

    setBoundsDefaultMonthly() {

        if (this.profile.progress.length === 0)
            throw new Error("No progress available");

        this.progressUB = Infinity;

        let tRecent = this.profile.timestampStatsRefreshed;
        let tOldest = this.profile.progress.oldest?.timestampStatsRefreshed || 0;

        let d = new Date(tOldest);
        while (d.setMonth(d.getMonth() + 1) <= tRecent);
        d.setFullYear(d.getFullYear() - 1);

        this.progressLB = d.getTime();

        return this;

    }

    setBoundsProgressType() {
        
        switch (this.progressType) {
            case "WEEKLY_DEFAULT": { this.setBoundsDefaultWeekly(); break; }
            case "MONTHLY_DEFAULT": { this.setBoundsDefaultMonthly(); break; }
            default: { this.progressLB = 0; this.progressUB = Infinity; break; }
        }

        return this;

    }

    copyProfileRaw() {
        this.profile.fromJSON(this.profileRaw.toJSON({ stringify: true }));
        return this;
    }

    async saveProfile() {
        this.profile.fromJSON(this.profileRaw.toJSON({ stringify: true }));
        return await this.profile.save();
    }

}

module.exports = UserULProfile;
