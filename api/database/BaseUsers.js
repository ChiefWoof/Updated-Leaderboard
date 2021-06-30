"use strict";

const BaseDatabase = require("./BaseDatabase");

class BaseUsers extends BaseDatabase {

    static PROPERTIES_LOADED = -1;
    static SETS = {};

    build(data) {
        data = this.parse(data);
        super.build(data);

        /**
         * @description ID representation of a user on the UL
         * @default 0n
         * @type {BigInt}
         */

        this.ulID = "ulID" in data ? data.ulID : 0n;
        
        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setULID(value=0n) { return this; }

}

module.exports = BaseUsers;