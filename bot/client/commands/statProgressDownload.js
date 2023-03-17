"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    AttachmentBuilder,
    SlashCommandStringOption
} = require("discord.js");

const Command = require("./Command");
const StatProgressManager = require("../../src/managers/StatProgressManager");

const {
    util: {
        verification: {
            invalid: EMOTE_INVALID
        }
    }
} = require("../../src/util/Emotes");

class statProgressDownloadCommand extends Command {

    get command() {

        let res = new SlashCommandBuilder()
        .setName("progress-download")
        .setDescription("Downloads the raw stat progression of the entered account IDs");

        let searchOption = new SlashCommandStringOption();
        searchOption.setName("account-id");
        searchOption.setDescription("The accountID to retrieve");
        searchOption.setRequired(true);

        res.addStringOption(searchOption);

        return res;

    }

    /**
     * @param {ChatInputCommandInteraction} int 
     */

    async handlerInteractionChatInput(int) {

        // PERMISSION CHECK
        if (!(await this.handlerInteractionPermission(int)))
            return;

        // COMMAND RESULT

        let accountID = int.options.getString("account-id");
        let PRIVILEGED = int.user.id === "191709026113945600";
        let valid = /\d{1,}/.test(accountID)
            || (PRIVILEGED ? /^all$/i.test(accountID) : false);
        let reply = {};

        let retrieve = [];

        if (!valid) {
            reply = {
                content: `${EMOTE_INVALID} A valid user account ID must be put into the "accountID" search parameter`
            };
        } else {

            /** @type {StatProgressManager} */
            let manager = new StatProgressManager();

            if (/^all$/i.test(accountID)) {
                try {
                    //await int.reply("Processing...");
                } catch {}
                //retrieve.push(...(await this.client.actions.UserUL.loadStoredStatProgressAccountIDs()));
            } else {
                retrieve = accountID.match(/\d{1,}/g) || [];
                if (!PRIVILEGED) retrieve = retrieve.slice(0, 1);
            }

            for await (let id of retrieve) {
                let mID = await this.client.actions.UserUL.loadManagerStatProgressFromFile(id);
                mID.forEach(entry => manager.add(entry));
            }
    
            if (manager.length === 0) {
                reply = {
                    content: `${EMOTE_INVALID} No data available`
                };
            } else {
                let file = new AttachmentBuilder()
                .setFile(Buffer.from(this.client.actions.UserUL.statProgressManagerToTXT(manager)), `progress_${accountID}.txt`)
                .setName(`progress_${accountID}.txt`)
                .setDescription("OwO");
                reply = {
                    files: [ file ]
                };
            }

        }

        try {
            if (int.replied) await int.editReply(reply)
            else await int.reply(reply);
        } catch {}

    }

}

module.exports = statProgressDownloadCommand;