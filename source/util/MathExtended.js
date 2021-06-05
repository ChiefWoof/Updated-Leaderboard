"use strict";

/**
 * @description An extension of some functions from the "Math" class for BigInt and stringed-number support
 */

class MathExtended {

    constructor() {
        throw new Error(`${this.constructor.name} class is not meant for instants`);
    }

    static sum(...nums) {
        return nums.reduce((v, a) => {
            return v += BigInt(a);
        }, 0n);
    }

    static floor(num) {
        if (typeof num === "number") return Math.floor(num);
        let n = BigInt(num);
        return typeof n === "string" ? `${n}` : n;
    }

    static ceil(num) {
        if (typeof num === "number") return Math.ceil(num);
        let n = this.floor(num);
        if (n === num) n = BigInt(n) + 1n;
        return typeof num === "string"
        ? `${n}`
        : n;
    }

    static increment(num, amount=1) {
        return typeof num === "number" ? num + Number(amount)
        : typeof num === "bigint" ? num + BigInt(amount)
        : num = `${this.increment(BigInt(num), BigInt(amount))}`;
    }

    static log(base, result) {
        let res = Math.log10(`${result}`)/Math.log10(`${base}`);
        return typeof result === "string"
        ? `${res}`
        : res;
    }

    static pow(base, exponent) {
        if (typeof base === "number") return Math.pow(base, exponent);
        let xBase = BigInt(base);
        let x = 1n;
        for (let i = 0; i < exponent; i++)
            x *= xBase;
        return typeof base === "string" ? `${x}` : x;
    }

    static abs(num) {
        if (typeof num === "number") return Math.abs(num);
        if (typeof num === "string") return num.replace(/-/g, "");
        return num < 0 ? num * -1n : num;
    }

    static max(...nums) {
        if (nums.length === 0 || typeof nums[0] === "number")
            return Math.max(...nums);
        return nums.reduce((v, a, i) => {
            if (v === null || BigInt(a) > v) v = nums[i];
            return v;
        }, null);
    }

    static min(...nums) {
        if (nums.length === 0 || typeof nums[0] === "number")
            return Math.max(...nums);
        return nums.reduce((v, a, i) => {
            if (v === null || BigInt(a) < v) v = nums[i];
            return v;
        }, null);
    }

}

module.exports = MathExtended;