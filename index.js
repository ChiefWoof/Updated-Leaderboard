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
            woofPackLevel: require("./source/foundation/woofPackLevel")
        },

        managers: {
            BaseManagerArray: require("./source/managers/BaseManagerArray"),
            BaseManagerCollection: require("./source/managers/BaseManagerCollection"),
            
            woofPackLevelsManager: require("./source/managers/woofPackLevelsManager")
        },

        properties: {
            base: require("./source/properties/base"),
            foundation: require("./source/properties/foundation")
        },

        structures: {
            
        },

        util: {
            Collection: require("./source/util/Collection"),
            Color: require("./source/util/Color"),
            Constants: require("./source/util/Constants"),
            Emoji: require("./source/util/Emoji"),
            EncodeNumberToCharString: require("./source/util/EncodeNumberToCharString"),
            PList: require("./source/util/PList")
        }

    }

};
