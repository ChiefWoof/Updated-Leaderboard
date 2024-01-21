"use strict";

const BitField = require("../../src/util/BitField");

/**
 * The most general version of any area
 */

class Base {

    constructor() {

        /**
         * @description The identification number
         * @type {BigInt}
         */

        this.id = 0n;

    }

    /**
     * General decoding of JSON values for key, value pairs
     * @param {string} key
     * @param {*} value
     */

    jsonEncoding(key, value) {
        return this[key] instanceof BitField
            ? value.value
        : typeof value === "bigint"
            ? `${value}`
        : value;
    }

    /**
     * General decoding of JSON values for key, value pairs
     * @param {string} key
     * @param {*} value
     */

    jsonDecoding(key, value) {
        if (value === "") value = null;
        if (this[key] instanceof BitField) {
            this[key].value = Number(value || 0);
            return this[key];
        }
        return typeof this[key] === "bigint"
            ? BigInt(value || 0n)
        : typeof this[key] === "number"
            ? Number(value)
        : value;
    }

    /**
     * Returns a JSON version of the object
     * @param {Object} options
     * @param {boolean} [options.stringify = false] Whether to stringify the result
     * @returns {Object|string}
     */

    toJSON({
        stringify = false
    }={}) {
        let obj = Object.entries(this).reduce((res, [key, value]) => {
            if (typeof value !== "function") {
                res[key] = this.jsonEncoding(key, value);
            }
            return res;
        }, {});
        return stringify ? JSON.stringify(obj) : obj;
    }

    /**
     * Sets up object based on a JSON version
     * @param {Object} obj
     */
    
    fromJSON(obj) {
        if (typeof obj === "string") obj = JSON.parse(obj);
        Object.entries(obj).forEach(([key, value]) => {
            this[key] = this.jsonDecoding(key, value);
        });
        return this;
    }

}

module.exports = Base;