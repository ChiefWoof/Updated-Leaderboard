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

    setULID(value=0n) { return this; }

}

module.exports = BaseUsers;