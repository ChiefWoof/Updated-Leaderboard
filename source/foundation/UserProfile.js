"use strict";

const User = require("./User");
const PROPERTY_LIST = (require("../properties/foundation").UserProfile);

/**
 * @description Representation of a UL User's profile
 * @extends {User}
 */

class UserProfile extends User {

    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }
    
    build(data) {
        data = this.parse(data);
        super.build(data);
        
        return this;
    }

}

module.exports = UserProfile;