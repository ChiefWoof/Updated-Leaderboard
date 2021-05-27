"use strict";

/**
 * @description The base manager for Arrays
 * @extends {Array}
 */

class BaseManagerArray extends Array {

    static ITEM_CONSTRUCTOR = null;
    static SEPARATOR_ITEM = ",";

    constructor(data) {
        super();
        if (this.constructor.ITEM_CONSTRUCTOR == null)
            throw new Error("No property list constructor specified");
        this.build(data);
    }

    /**
     * @description Swaps 2 index values if both indexes are available
     * @param {number} index1 
     * @param {number} index2 
     * @returns 
     */

    swap(index1, index2) {
        if (index1 in this && index2 in this)
            [this[index1], this[index2]] = [this[index2], this[index1]];
        return this;
    }

    /**
     * @description Moves an element to a certain position in array by moving other elements
     * @param {number} index 
     * @param {number} newIndex 
     * @returns {this}
     */

    moveTo(index, newIndex) {
        newIndex = newIndex < 0 ? 0 : newIndex > this.length - 1 ? this.length - 1 : newIndex;
        if (newIndex in this && index in this) {
            let increment = index > newIndex ? -1 : 1;
            while (index !== newIndex) {
                this.swap(index, index+increment);
                index += increment;
            }
        }
        return this;
    }

    /**
     * @description Combines all stringifes into a single string with a separator
     * @param {Object} [data=this] the data object
     * @returns {string}
     */

    stringify(data=this) {
        return this.reduce((v, a) => {
            if (a instanceof this.constructor.ITEM_CONSTRUCTOR)
                v.push(a.stringify());
            return v;
        }, []).join(this.constructor.SEPARATOR_ITEM);
    }

    /**
     * @description Converts a stringified property list into object data
     * @param {string} [data=""] the data string
     * @returns {BaseManagerArray} attributes
     */

    parse(data="") {
        let r = new this.constructor();

        if (typeof data === "string") {
            data.split(this.constructor.SEPARATOR_ITEM).map(a => {
                a = new this.constructor.ITEM_CONSTRUCTOR(a);
                if (a && Object.keys(a).length !== 0) r.push(a);
            });
        };

        return r;
    }

    build(data) {
        if (data) this.push(...this.parse(data));
    }

}

module.exports = BaseManagerArray;