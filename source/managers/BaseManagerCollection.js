"use strict";

const Collection = require("../util/Collection");

/**
 * @description The base manager for Collections
 * @extends {Collection}
 */

class BaseManagerCollection extends Collection {
    
    static ITEM_CONSTRUCTOR = null;
    static SEPARATOR_VALUE = ":";
    static SEPARATOR_ITEM = ",";

    constructor(data) {
        super();
        if (this.constructor.ITEM_CONSTRUCTOR == null)
            throw new Error("No property list constructor specified");
        this.build(data);
    }

    /**
     * @description Combines all stringifes into a single string with a separator
     * @param {Object} [data=this] the data object
     * @returns {string}
     */

    stringify(data=this) {
        return [...data.entries()].reduce((v, [k, a]) => {
            if (a instanceof this.constructor.ITEM_CONSTRUCTOR)
                v.push([k, a.stringify()].join(this.constructor.SEPARATOR_VALUE));
            return v;
        }, []).join(this.constructor.SEPARATOR_ITEM);
    }

    /**
     * @description Converts a stringified property list into object data
     * @param {string} [data=""] the data string
     * @returns {BaseManagerCollection} attributes
     */

    parse(data="") {
        let r = new this.constructor();

        if (typeof data === "string") {
            data.split(this.constructor.SEPARATOR_ITEM).map(a => {
                let [k, v] = a.split(this.constructor.SEPARATOR_VALUE);
                v = new this.constructor.ITEM_CONSTRUCTOR(v);
                if (v && Object.keys(v).length !== 0) r.register(k, v);
            });
        };

        return r;
    }

    build(data) {
        if (data) {
            let d = this.parse(data);
            this.clear();
            [...d.entries()].map(([k, v]) => {
                this.register(k, v);
            });
        }
    }

    register(key, value) {
        if (typeof key !== "string" || key.length === 0)
            throw new Error("Key must be a string with a length greater than 0");
        this.set(key, new this.constructor.ITEM_CONSTRUCTOR(value));
    }
}

module.exports = BaseManagerCollection;