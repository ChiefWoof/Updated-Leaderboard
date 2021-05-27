"use strict";

const PList = require("../util/PList");
const { setFunctionOverrides } = require("../properties/base");


/**
 * @description The foundation for structures
 */

class Base {

    static OVERRIDES = setFunctionOverrides;
    static PROPERTY_LIST = null;
    static ENTRY_CONSTRUCTOR = null;

    /**
     * @description Property list set methods loaded status
     * * `-1` - Not loaded
     * * `0` - Loading
     * * `1` - Loaded
     * @type {number}
     */

    static PROPERTIES_LOADED = -1;
    static SETS = {};
    static LOAD_PROPERTY_METHODS = function(properties=this.PROPERTY_LIST) {
        for (const [key, options] of properties.entries()) {
            let kName = "keyName" in options && options.keyName ? options.keyName : key;
            let kNameNormal = kName;
            if (kName in (this.OVERRIDES || {})) kName = this.OVERRIDES[kName];
            let kNameClass = `set${kName.charAt(0).toUpperCase()}${kName.substring(1)}`;
            this.prototype[kNameClass] = function(...args) {
                this["keyName" in options && options.keyName ? options.keyName : key] = options.decoding({source: "SET"}, ...args);
                return this;
            }
            this.SETS[kNameNormal] = kNameClass;
        }
    }

    constructor() {
        if (!(this.constructor.PROPERTY_LIST instanceof PList))
            throw new Error(`No property list specified for ${this.constructor.name}`);
        if (this.constructor.PROPERTIES_LOADED === -1) {
            this.constructor.PROPERTIES_LOADED = 0;
            this.constructor.LOAD_PROPERTY_METHODS();
            this.constructor.PROPERTIES_LOADED = 1;
        }
    }

    getValueByKeyName(key) {
        let d = this.constructor.PROPERTY_LIST.getKeyName(key);
        return d && d in this
        ? this[d]
        : null;
    }

    /**
     * @description Combines all stringifes into a single string with a separator
     * @param {Object} [data=this] the data object
     * @returns {string}
     */

    stringify(data=this) {
        return this.constructor.PROPERTY_LIST.stringify(data);
    }

    /**
     * @description Converts a stringified property list into object data
     * @param {string} [data=""] the data string
     * @returns {Object} attributes
     */

    parse(data="") {
        return Object.prototype.toString.call(data) === "[object Object]"
        ? data
        : this.constructor.PROPERTY_LIST.parse(data);
    }

    build() {}

    /**
     * @description Builds the object by using the "set" function for matching keys
     * @returns {this}
     */

    buildByObj(data) {
        this.build();
        data = Object.prototype.toString.call(data) === "[object Object]"
        ? data
        : {};
        Object.entries(data).map(([k, v]) => {
            if (k in this.constructor.SETS)
                this[this.constructor.SETS[k]](v);
        });
        return this;
    }
    
}

module.exports = Base;