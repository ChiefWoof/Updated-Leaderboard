"use strict";

/**
 * @description Helpful common stuff
 */

class Util {

    static arrayToObj(input, keys=[]) {
        if (!Array.isArray(keys)) keys = [];
        return input.reduce((v, a, i) => {
            v[i in keys ? keys[i] : i] = a
            return v;
        }, {});
    }

    static objToArray(obj, keys=[]) {
        return keys.reduce((v, a) => {
            v.push(a in obj ? obj[a] : undefined);
            return v;
        }, []);
    }

    static toJSONValue(value) {
        if (Object.prototype.toString.call(value) === "[object Object]") return this.toJSON(value);
        if (["number", "string", "boolean"].some(a => typeof value === a)) return value;
        if (typeof value === "bigint") return `${value}`;
        if (value === null) return value;
        if (Array.isArray(value)) return value.reduce((v, a) => {
            if (a === undefined) return v;
            v.push(this.toJSONValue(a));
            return v;
        }, []);
        throw new Error(`value not supported in JSON (${value})`);
    }

    static toJSON(obj) {
        if (Object.prototype.toString.call(obj) !== "[object Object]")
            return this.toJSONValue(obj);
        return Object.entries(obj).reduce((v, [k, kV]) => {
            if (kV !== undefined)
                v[k] = this.toJSONValue(kV);
            return v;
        }, {});
    }

}

module.exports = Util;