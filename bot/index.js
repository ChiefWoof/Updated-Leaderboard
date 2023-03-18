"use strict";

module.exports = {
    
    client: {

        Client: require("./client/Client.js"),

        actions: {
            Action: require("./client/actions/Action.js"),
            ActionsManager: require("./client/actions/ActionsManager.js"),
            ColorPreset: require("./client/actions/ColorPreset.js"),
            GlobalRank: require("./client/actions/GlobalRank.js"),
            Leaderboard: require("./client/actions/Leaderboard.js"),
            LeaderboardWhitelist: require("./client/actions/LeaderboardWhitelist.js"),
            Notification: require("./client/actions/Notification.js"),
            StatProgressChart: require("./client/actions/StatProgressChart.js"),
            StorageFiles: require("./client/actions/StorageFiles.js"),
            UserUL: require("./client/actions/UserUL.js"),
            UserULRequest: require("./client/actions/UserULRequest.js"),
            UserULSheet: require("./client/actions/UserULSheet.js")
        },

        commands: {
            addUser: require("./client/commands/addUser.js"),
            Command: require("./client/commands/Command.js"),
            CommandsManager: require("./client/commands/CommandsManager.js"),
            leaderboard: require("./client/commands/leaderboard.js"),
            leaderboardWhitelistDownload: require("./client/commands/leaderboardWhitelistDownload.js"),
            ping: require("./client/commands/ping.js"),
            profile: require("./client/commands/profile.js"),
            progress: require("./client/commands/progress.js"),
            requestUser: require("./client/commands/requestUser.js"),
            statProgressDownload: require("./client/commands/statProgressDownload.js"),
            time: require("./client/commands/time.js"),
            usersULDownload: require("./client/commands/usersULDownload.js")
        }

    },

    src: {

        managers: {
            StatProgressManager: require("./src/managers/StatProgressManager"),
            UsersULManager: require("./src/managers/UsersULManager")
        },

        properties: {

            flags: {
                UserUL: require("./src/properties/flags/UserUL")
            }

        },

        structures: {
            Base: require("./src/structures/Base"),
            Leaderboard: require("./src/structures/Leaderboard"),
            Notification: require("./src/structures/Notification"),
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
