"use strict";

const Base = require("../Base");
const PROPERTY_LIST = (require("../../properties/foundationIcons").IconDetailsData);

/**
 * @description An object with only gamemodes' excess details
 * @extends {Base}
 */

class IconDetailsData extends Base {
    
    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }
    
    build(data) {
        data = this.parse(data);
        
        /**
         * @description Whether the user is has glow enabled on GD
         * @default false
         * @type {boolean}
         */

        this.hasGlow = "hasGlow" in data ? data.hasGlow : false;
 
        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setHasGlow(value=false) { return this; }

}

module.exports = IconDetailsData;
