"use strict";

const Base = require("./Base");

class UserULStatProgressEntry extends Base {

    constructor() {

        super();

        /**
         * @description The user's GD account identifier
         * @type {BigInt}
         */

        this.accountID = 0n;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.stars = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.diamonds = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.scoins = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.ucoins = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.demons = 0;

        /**
         * @description The user's GD star count
         * @type {number}
         */

        this.cp = 0;

        /**
         * @description Timestamp the user's GD stats were last refreshed or 0
         * @type {number}
         */

        this.timestampStatsRefreshed = 0;

        /**
         * @description Whether the entry is estimated
         * @type {boolean}
         */

        this.estimated = false;

        /**
         * @description Whether the entry is labeled as the current entry
         * @type {boolean}
         */

        this.current = false;

    }

}

module.exports = UserULStatProgressEntry;