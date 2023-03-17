"use strict";

const Action = require("../actions/Action");

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    CommandInteraction,
    EmbedBuilder
} = require("discord.js");

const {
    util: {
        verification: {
            invalid: INVALID_EMOTE
        }
    }
} = require("../../src/util/Emotes");

class Command extends Action {

    constructor(client) {

        super(client);

        /**
         * @description Whether the command is useable by users
         * @type {boolean}
         */
        this.useable = false;

        /**
         * @description Whether the command is only to be used by staff members
         * @type {boolean}
         */
        this.staff = false;

        /**
         * @description Whether the command is in beta
         * @type {boolean}
         */
        this.beta = false;

        /**
         * @description Whether the command is an SG-only command
         * @type {boolean}
         */
        this.sg = false;

    }

    /** @type {SlashCommandBuilder} */
    get command() { return new SlashCommandBuilder(); }

    /**
     * @param {CommandInteraction} int 
     * @param {...any} data 
     */

    async handlerInteraction(int, ...data) {

        if (int.isChatInputCommand()) await this.handlerInteractionChatInput(int);
        else if (int.isMessageComponent()) await this.handlerInteractionMessageComponent(int);

    }

    /**
     * @param {ChatInputCommandInteraction} int 
     * @param {...any} data 
     */

    async handlerInteractionChatInput(int, ...data) {}

    /**
     * @param {ChatInputCommandInteraction} int 
     * @param {...any} data 
     */

    async handlerInteractionMessageComponent(int, ...data) {}

    /**
     * @param {ChatInputCommandInteraction} int
     * @returns {boolean}
     */

    async handlerInteractionPermission(int) {
        if (this.useable) {

            // Returns true if user has permission
            if (await this.handlerInteractionPermissionCheck(int))
                return true;
        
            // Returns false after replying to the interaction indicating no permission
            await int.reply({
                content: [
                    `${INVALID_EMOTE} The permission levels on this command are preventing you from using it at this time`
                ].join("\n")
            });

        }
        return false;
    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @returns {boolean}
     */

    async handlerInteractionPermissionCheck(int) {
        return true;
        return [
            "191709026113945600"
        ].includes(int.user.id);
    }

    ////////////////////////////////////

    errorMessage(msg) {

        let embed = new EmbedBuilder();

        embed.setColor(`#${this.client.actions.ColorPreset.lookupPreset("error")}`);
        embed.setDescription(`${INVALID_EMOTE} ${msg || "An error occured"}`);

        return {
            content: null,
            embeds: [ embed ]
        };

    }
    
}

module.exports = Command;