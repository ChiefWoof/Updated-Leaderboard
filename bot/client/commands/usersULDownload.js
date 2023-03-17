"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    AttachmentBuilder
} = require("discord.js");

const Command = require("./Command");

class usersULDownloadCommand extends Command {

    get command() {
        return new SlashCommandBuilder()
        .setName("users-download")
        .setDescription("Retrieves the completely public UL user database");
    }

    /**
     * @param {ChatInputCommandInteraction} int 
     */

    async handlerInteractionChatInput(int) {

        // PERMISSION CHECK
        if (!(await this.handlerInteractionPermission(int)))
            return;

        // COMMAND RESULT
        let data = await this.client.actions.StorageFiles.loadFile("usersUL.txt");
        
        let file = new AttachmentBuilder()
        .setFile(Buffer.from(data), "usersUL.txt")
        .setName("usersUL.txt")
        .setDescription("OwO");

        try {
            await int.reply({
                files: [ file ]
            });
        } catch {}

    }

}

module.exports = usersULDownloadCommand;