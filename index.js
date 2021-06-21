"use strict";

module.exports = {
    
    client: {
        ClientBase: require("./client/ClientBase")
    },

    endpoints: {
        Base: require("./endpoints/Base"),

        getLinkCode: require("./endpoints/getLinkCode"),
        getULUserInfo1: require("./endpoints/getULUserInfo1"),

        updateUserInfo1: require("./endpoints/updateUserInfo1")

    },

    source: {

        foundation: {
            Attachment: require("./source/foundation/Attachment"),
            Base: require("./source/foundation/Base"),
            StatsObject: require("./source/foundation/StatsObject"),
            UGDBLevelNotification: require('./source/foundation/UGDBLevelNotification'),
            User: require("./source/foundation/User"),
            UserProfile: require("./source/foundation/UserProfile"),
            UserRequest: require("./source/foundation/UserRequest"),
            UserRequestBanRanks: require("./source/foundation/UserRequestBanRanks"),
            UserStatAchievement: require("./source/foundation/UserStatAchievement"),
            UserStatAchievementEntry: require("./source/foundation/UserStatAchievementEntry"),
            woofPack: require("./source/foundation/woofPack"),
            woofPackLevel: require("./source/foundation/woofPackLevel"),

            icons: {
                IconColorsData: require("./source/foundation/icons/IconColorsData"),
                IconDetailsData: require("./source/foundation/icons/IconDetailsData"),
                IconGamemodeData: require("./source/foundation/icons/IconGamemodeData"),
            }

        },

        googlesheets: {
            CellManager: require("./source/googlesheets/CellManager"),
            RowManager: require("./source/googlesheets/RowManager"),
            SheetManager: require("./source/googlesheets/SheetManager"),
            TabManager: require("./source/googlesheets/TabManager"),
            Util: require("./source/googlesheets/Util"),

            customs: {
                RowGDUser1: require("./source/googlesheets/customs/RowGDUser1")
            }

        },

        managers: {
            BaseManagerArray: require("./source/managers/BaseManagerArray"),
            BaseManagerCollection: require("./source/managers/BaseManagerCollection"),
            woofPackLevelsManager: require("./source/managers/woofPackLevelsManager")
        },

        properties: {
            base: require("./source/properties/base"),
            endpoints: require("./source/properties/endpoints"),
            foundation: require("./source/properties/foundation"),
            foundationIcons: require("./source/properties/foundationIcons")
        },

        structures: {
            HiddenDiscordData: require("./source/structures/HiddenDiscordData"),
            IconData: require("./source/structures/IconData"),
            UserStatAchievements: require("./source/structures/UserStatAchievements")
        },

        util: {
            BanFrom: require("./source/util/BanFrom"),
            Collection: require("./source/util/Collection"),
            Color: require("./source/util/Color"),
            Constants: require("./source/util/Constants"),
            Emoji: require("./source/util/Emoji"),
            EncodeNumberToCharString: require("./source/util/EncodeNumberToCharString"),
            MathExtended: require("./source/util/MathExtended"),
            NetScore: require("./source/util/NetScore"),
            PList: require("./source/util/PList"),
            Util: require("./source/util/Util")
        }

    }

};
