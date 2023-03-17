"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    SlashCommandStringOption,
    EmbedBuilder,
    AttachmentBuilder,
    SelectMenuOptionBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    SelectMenuBuilder,
    SelectMenuInteraction
} = require("discord.js");

const profileCommand = require("./profile");

class progressCommand extends profileCommand {

    get command() {

        let res = new SlashCommandBuilder()
        .setName("progress")
        .setDescription("The stat progression history of a UL User");

        let searchOption = new SlashCommandStringOption();
        searchOption.setName("search");
        searchOption.setDescription("The user to search (leave empty for self-search)");

        let searchTypeOption = new SlashCommandStringOption();
        searchTypeOption.setName("search-type");
        searchTypeOption.setDescription("The type of identification to search for");
        searchTypeOption.setChoices(
            { name: "Username & Player ID", value: "USERNAME_AND_PLAYER_ID" },
            { name: "Account ID", value: "ACCOUNT_ID" },
            { name: "Discord ID", value: "DISCORD_ID" },
            { name: "UL ID", value: "UL_ID" }
        );

        let statOption = new SlashCommandStringOption();
        statOption.setName("stat");
        statOption.setDescription("The stat to create the leaderboard out of");
        statOption.setChoices(
            { name: "Stars", value: "STARS" },
            { name: "Diamonds", value: "DIAMONDS" },
            { name: "Secret coins", value: "SCOINS" },
            { name: "User coins", value: "UCOINS" },
            { name: "Demons", value: "DEMONS" },
            { name: "CP", value: "CP" },
            { name: "Overall Score", value: "NET" }
        );

        res.addStringOption(statOption);
        res.addStringOption(searchOption);
        res.addStringOption(searchTypeOption);

        return res;

    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @param {Object} options
     * @property {"PROFILE"|"PROGRESS"} [options.page = "PROFILE"]
     */

    async handlerInteractionChatInput(int, {
        page = "PROGRESS"
    }={}) {
        super.handlerInteractionChatInput(int, { page });
    }

}

module.exports = progressCommand;