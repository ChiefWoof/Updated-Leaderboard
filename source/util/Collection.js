"use strict";

/**
 * @description An upgraded version of the "Map" class.
 * Inspired by Discord.js
 */

class Collection extends Map {

    array() { return [...this.values()]; }
    arrayKeys() { return [...this.keys()]; }

    slice(index, amount=1) { return this.array().slice(index, index+amount); }
    sliceKeys(index, amount=1) { return this.arrayKeys().slice(index, index+amount); }

    first(amount) {
        if (amount < 0)
            return this.last(amount * -1);
        if (typeof amount === "undefined")
            return this.values().next().value;
        amount = Math.max(this.size, amount);
        let iter = this.values();
        return Array.from({ length: amount }, () => iter.next().value);
    }

    firstKeys(amount) {
        if (amount < 0)
            return this.lastKeys(amount * -1);
        if (typeof amount === "undefined")
            return this.keys().next().value;
        amount = Math.max(this.size, amount);
        let iter = this.keys();
        return Array.from({ length: amount }, () => iter.next().value);
    }

    last(amount) {
        if (amount < 0) return this.first(amount * -1);
        let v = this.array();
        return typeof amount === "undefined"
        ? v[v.length - 1]
        : v.slice(-amount);
    }

    lastKeys(amount) {
        if (amount < 0) return this.firstKeys(amount * -1);
        let v = this.arrayKeys();
        return typeof amount === "undefined"
        ? v[v.length - 1]
        : v.slice(-amount);
    }

}

module.exports = Collection;