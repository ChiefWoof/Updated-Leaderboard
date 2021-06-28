"use strict";

const { API_CODES } = require("../source/util/Constants");
const PList = require("../source/util/PList");
const Util = require("../source/util/Util");

const PROPERTY_LIST = require("../source/properties/endpoints").base;
const { setFunctionOverrides } = require("../source/properties/base");

class Base {

    static SUPPORTED = false;
    static OFFLINE = true;
    
    static OVERRIDES = setFunctionOverrides;
    static PROPERTY_LIST = PROPERTY_LIST;

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

    constructor(data, client=null) {
        if (!(this.constructor.PROPERTY_LIST instanceof PList))
            throw new Error(`No property list specified for ${this.constructor.name}`);
        if (this.constructor.PROPERTIES_LOADED === -1) {
            this.constructor.PROPERTIES_LOADED = 0;
            this.constructor.LOAD_PROPERTY_METHODS();
            this.constructor.PROPERTIES_LOADED = 1;
        }

        this.client = client;

        Object.defineProperty(this, "client", {
            enumerable: false,
            writable: false
        });
    }

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     */

    isFaulty() { return false; }

    /**
     * @todo add a private API password and file backups as a safety measure
     * @returns {boolean} Whether the current parameters indicate the user passes permission requirements
     */

    hasPermission() { return true; }

    /**
     * @returns {boolean} Whether the endpoint is labeled as offline
     */

    isOffline() { return this.constructor.OFFLINE; }

    /**
     * @returns {boolean} Whether the endpoint is labeled as supported
     */

    isSupported() { return this.constructor.SUPPORTED; }

    async handler() {
        let res = this.isOffline() ? API_CODES.ENDPOINT_OFFLINE
        : !this.isSupported() ? API_CODES.ENDPOINT_NOT_SUPPORTED
        : !this.hasPermission() ? API_CODES.ENDPOINT_PERMISSION_FAILURE
        : this.isFaulty() ? API_CODES.ENDPOINT_FAULTY
        : await this.handlerAction();

        if (res === null) res = API_CODES.NO_DATA;
        if (res && res.constructor && !(res instanceof Base) && res.constructor.PROPERTY_LIST)
            if (this.json) res = JSON.stringify(Util.toJSON(res))
            else res = res.stringify();

        return res;
    }

    async handlerAction() { return API_CODES.FAILED; }

    get directory() { return this.constructor.DIRECTORY; }

    /**
     * @returns {Object} Returns an edited version of the parameters for a query string
     */

    toParamObject() {
        let o = {};
        for (const [key, value] of Object.entries(this))
            if (value !== null)
                o[key] = typeof value === "boolean"
                ? String(value ? 1 : 0)
                : String(value);
        return o;
    }

    /**
     * @description Converts object data into a stringified property list
     * @param {Object} [data=this] the data object
     * @param {Object} [options=this.constructor.PROPERTY_LIST] property list options + plistKey
     * @param {string} [options.separator=null] data separator
     * @param {boolean} [options.removeFaultyValues=plistConfigurations.remove_faulty_values] removes values that are generally uncessary (destructive editing if enabled)
     * @param {PListString} [options=this.constructor.PROPERTY_LIST] plist to stringify by
     * @returns {string}
     */

    stringify(data=this, { separator=undefined, removeFaultyValues=false, plist=this.constructor.PROPERTY_LIST } = this.constructor.PROPERTY_LIST || {}) {
        if (!plist) throw new Error(`no property list was specified`);
        return plist.stringify(data, {separator, removeFaultyValues});
    }

    /**
     * @description Converts a stringified property list into object data
     * @param {string} [data=""] the data string
     * @param {Object} [options=this.constructor.PROPERTY_LIST] property list options + plistKey
     * @param {string} [options.separator=null] data separator
     * @param {boolean} [options.restricted=plistConfigurations.add_unknown_values] adds values that aren't in the plist (destructive editing if disabled)
     * @param {PListString} [options=this.constructor.PROPERTY_LIST] plist to parse by
     * @returns 
     */

    parse(data="", { separator=undefined, restricted=false, plist=this.constructor.PROPERTY_LIST } = this.constructor.PROPERTY_LIST || {}) {
        if (!plist) throw new Error(`no property list was specified`);
        return Object.prototype.toString.call(data) !== "[object Object]"
        ? plist.parse(data, {separator, restricted})
        : data;
    }

    build(data) {
        data = this.parse(data);

        /**
         * @description Whether to return the data as a stringifed JSON
         * @default false
         * @type {boolean}
         */

        this.json = "json" in data ? data.json : false;
        
        return this;
    }

    /**
     * @description Builds the object by using the "set" function for matching keys
     * @returns {this}
     */

    buildByObj(data) {
        this.build(this);
        data = Object.prototype.toString.call(data) === "[object Object]"
        ? data
        : {};
        Object.entries(data).map(([k, v]) => {
            if (k in this.constructor.SETS && this.constructor.SETS[k] in this)
                this[this.constructor.SETS[k]](v);
        });
        return this;
    }

    /**
     * @description Builds the object specifically based on API parameters
     * @returns {this}
     */

    async buildByParams(data) { return this.buildByObj(data); }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setJSON(value=null) { return this; }
    
}

module.exports = Base;
