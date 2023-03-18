"use strict";

const Action = require("../actions/Action");

const UserUL = require("../../src/structures/UserUL");

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
         * @description Whether the command is only useable in the beta server
         * @type {boolean}
         */
        this.betaOnly = false;

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
            if (await this.handlerInteractionPermissionCheck(int)) {

                if (this.betaOnly && !this.interactionToIsBetaServer(int)) {
                    await int.reply({
                        content:  `${INVALID_EMOTE} This command isn't ready for public use yet.\n\nYou can help test out this command in the __[developer's personal server](<https://discord.gg/VQv2sUX7pa>)__`
                    });
                    return false;
                }

                return true;

            }
        
            // Returns false after replying to the interaction indicating no permission
            await int.reply({
                content: `${INVALID_EMOTE} The permission levels on this command are preventing you from using it at this time`
            });

        }
        return false;
    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @returns {?UserUL}
     */

    async interactionToUserUL(int) {
        return await this.client.usersUL.searchDisID(int.user.id);
    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @returns {?UserUL}
     */

    interactionToIsBetaServer(int) {
        return [
            "454565627848294411",
            "1037606651462688770"
        ].includes(`${int.guildId}`);
    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @returns {boolean}
     */

    async handlerInteractionPermissionCheck(int) {
        return true;
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
