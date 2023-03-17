"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    AttachmentBuilder,
    SlashCommandStringOption
} = require("discord.js");

const Command = require("./Command");

class leaderboardWhitelistDownloadCommand extends Command {

    get command() {
        return new SlashCommandBuilder()
        .setName("top1000-download")
        .setDescription("Retrieves the bot's latest download of the Top 1000");
    }

    /**
     * @param {ChatInputCommandInteraction} int 
     */

    async handlerInteractionChatInput(int) {

        // PERMISSION CHECK
        if (!(await this.handlerInteractionPermission(int)))
            return;

        // COMMAND RESULT
        let data = await this.client.actions.StorageFiles.loadFile("leaderboardWhitelist.txt");
        let details = await this.client.actions.StorageFiles.loadFileDetail("leaderboardWhitelist.txt");
        
        let file = new AttachmentBuilder()
        .setFile(Buffer.from(data), "leaderboardWhitelist.txt")
        .setName("leaderboardWhitelist.txt")
        .setDescription("OwO");

        try {
            await int.reply({
                content: [
                    "[The updated version can be found here](http://www.boomlings.com/database/accounts/getTop1000.php)",
                    "",
                    this.timestampToLastUpdatedString(details.mtime)
                ].join("\n"),
                files: [ file ]
            });
        } catch { return; }


    }

    timestampToLastUpdatedString(timestamp) {
        let d = new Date(timestamp);
        return `Last Updated: ${d.toDateString()} ${d.toTimeString()}`;
    }

}

module.exports = leaderboardWhitelistDownloadCommand;