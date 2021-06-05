"use strict";

const IconColorsData = require("../foundation/icons/IconColorsData");
const IconDetailsData = require("../foundation/icons/IconDetailsData");
const IconGamemodeData = require("../foundation/icons/IconGamemodeData");

/**
 * @description A class used to simplify the entirety of a user's
 * icon data into a parseable string
 */

class IconData {

    static SEPARATOR = "#";

    constructor(data) {
        this.build(data);
    }

    /**
     * @description Retrives the data as a single object of entries
     * @returns {{ cubeID: BigInt, shipID: BigInt, ballID: BigInt, ufoID: BigInt, robotID: BigInt, spiderID: BigInt, color1: BigInt, color2: BigInt, hasGlow: boolean }}
     */

    getObj() { return Object.assign({}, this.gamemodes, this.colors, this.details); }

    stringify() {
        return [
            this.gamemodes.stringify(),
            this.colors.stringify(),
            this.details.stringify()
        ].join(this.constructor.SEPARATOR);
    }

    parse(data="") {
        return Object.prototype.toString.call(data) === "[object Object]"
        ? data
        : typeof data === "string"
        ? data.split(this.constructor.SEPARATOR).reduce((v, a, i) => {
            if (i === 0) v.gamemodes = a;
            if (i === 1) v.colors = a;
            if (i === 2) v.details = a;
            return v;
        }, {})
        : {};
    }

    build(data) {
        data = this.parse(data);

        /**
         * @description The data for the gamemodes
         * @type {IconGamemodeData}
         */
        
        this.gamemodes = "gamemodes" in data && data.gamemodes instanceof IconGamemodeData
        ? data.gamemodes
        : new IconGamemodeData(typeof data.gamemodes === "string" ? data.gamemodes : undefined); 

        /**
         * @description The data for the colors
         * @type {IconColorsData}
         */
        
        this.colors = "colors" in data && data.colors instanceof IconColorsData
        ? data.colors
        : new IconColorsData(typeof data.colors === "string" ? data.colors : undefined); 

        /**
         * @description The data for the details
         * @type {IconDetailsData}
         */
        
        this.details = "details" in data && data.details instanceof IconDetailsData
        ? data.details
        : new IconDetailsData(typeof data.details === "string" ? data.details : undefined); 

        return this;
    }

    buildByObj(data) {
        return this.build({
            gamemodes: new IconGamemodeData().buildByObj(data),
            colors: new IconColorsData().buildByObj(data),
            details: new IconDetailsData().buildByObj(data)
        });
    }

}

module.exports = IconData;