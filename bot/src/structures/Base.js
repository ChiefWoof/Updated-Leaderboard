"use strict";

const BitField = require("../util/BitField");

class Base {

    jsonEncoding(key, value) {
        return this[key] instanceof BitField
            ? value.value
        : typeof value === "bigint"
            ? `${value}`
        : value;
    }

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

    fromJSON(obj) {
        if (typeof obj === "string") obj = JSON.parse(obj);
        Object.entries(obj).forEach(([key, value]) => {
            this[key] = this.jsonDecoding(key, value);
        });
        return this;
    }

}

module.exports = Base;
