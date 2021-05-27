"use strict";

module.exports = {
    
    source: {

        foundation: {
            Base: require("./source/foundation/Base"),
            
            StatsObject: require("./source/foundation/StatsObject"),
            User: require("./source/foundation/User"),
            UserProfile: require("./source/foundation/UserProfile"),
            UserRequest: require("./source/foundation/UserRequest"),
            woofPack: require("./source/foundation/woofPack"),
            
        },

        managers: {
            BaseManagerArray: require("./source/managers/BaseManagerArray"),
            BaseManagerCollection: require("./source/managers/BaseManagerCollection"),
            

        },

        properties: {
            base: require("./source/properties/base"),
            foundation: require("./source/properties/foundation")
        },

    }

};