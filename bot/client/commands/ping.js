"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction
} = require("discord.js");

const Command = require("./Command");

class pingCommand extends Command {

    get command() {
        return new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Determines the bot's response time from command to message");
    }

    /**
     * @param {ChatInputCommandInteraction} int 
     */

    async handlerInteractionChatInput(int) {

        // PERMISSION CHECK
        if (!(await this.handlerInteractionPermission(int)))
            return;

        // COMMAND RESULT
        try {
            await int.reply({
                content: [
                    `Delay: \`${Math.abs(Date.now() - int.createdTimestamp)} ms\``
                ].join("\n")
            });
        } catch { return; }
        
    }

}

module.exports = pingCommand;
