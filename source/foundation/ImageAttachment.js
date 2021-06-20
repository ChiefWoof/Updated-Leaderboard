"use strict";

const Base = require("./Base");
const PROPERTY_LIST = (require("../properties/foundation").ImageAttachment);

/**
 * @description Representation of a image attachment utility
 * @extends {Base}
 */

class ImageAttachment extends Base {

    static PROPERTIES_LOADED = -1;
    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }
    
    build(data) {

        data = this.parse(data);

        /**
         * @description Link to the image
         * @default null
         * @type {?URL}
         */

        this.url = "url" in data ? data.url : null;

        /**
         * @description The title for the image
         * @default null
         * @type {?string}
         */

        this.title = "title" in data ? data.title : null;

        /**
         * @description Description of what the image is about
         * @default null
         * @type {?string}
         */

        this.description = "description" in data ? data.description : null;

        return this;
    }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setURL(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setTitle(value=null) { return this; }

    /**
     * @default null
     * @param {string} [value=null]
     */

    setDescription(value=null) { return this; }

}

module.exports = ImageAttachment;