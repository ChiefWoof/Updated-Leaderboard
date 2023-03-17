"use strict";

module.exports = {
    
    client: {

        Client: require("./client/Client.js"),

        actions: {
            Action: require("./client/actions/Action.js"),
            ActionsManager: require("./client/actions/ActionsManager.js"),
            ColorPreset: require("./client/actions/ColorPreset.js"),
            Leaderboard: require("./client/actions/Leaderboard.js"),
            LeaderboardWhitelist: require("./client/actions/LeaderboardWhitelist.js"),
            StatProgressChart: require("./client/actions/StatProgressChart.js"),
            StorageFiles: require("./client/actions/StorageFiles.js"),
            UserUL: require("./client/actions/UserUL.js")
        },

        commands: {
            Command: require("./client/commands/Command.js"),
            CommandsManager: require("./client/commands/CommandsManager.js"),
            leaderboard: require("./client/commands/leaderboard.js"),
            leaderboardWhitelistDownload: require("./client/commands/leaderboardWhitelistDownload.js"),
            ping: require("./client/commands/ping.js"),
            time: require("./client/commands/time.js"),
            usersULDownload: require("./client/commands/usersULDownload.js")
        }

    },

    src: {

        managers: {
            UsersULManager: require("./src/managers/UsersULManager"),
        },

        properties: {

            UserUL: require("./src/properties/UserUL"),

            flags: {
                UserUL: require("./src/properties/flags/UserUL")
            }

        },

        structures: {
            Base: require("./src/structures/Base"),
            Leaderboard: require("./src/structures/Leaderboard"),
            UserUL: require("./src/structures/UserUL"),
            UserULFlags: require("./src/structures/UserULFlags"),
            UserULProfile: require("./src/structures/UserULProfile"),
            UserULStatProgressEntry: require("./src/structures/UserULStatProgressEntry")
        },

        util: {
            BitField: require("./src/util/BitField"),
            constants: require("./src/util/Constants"),
            DiscordEmote: require("./src/util/DiscordEmote"),
            emotes: require("./src/util/Emotes"),
            Util: require("./src/util/Util")
        }

    }

}
