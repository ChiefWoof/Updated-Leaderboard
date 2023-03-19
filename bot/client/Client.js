"use strict";

const ActionsManager = require("./actions/ActionsManager");
const CommandsManager = require("./commands/CommandsManager");
const UsersULManager = require("../src/managers/UsersULManager");
const { Client: ClientBase } = require("discord.js");

const {
    gd: {
        util: {
            info: EMOTE_INFO
        }
    }
} = require("../src/util/Emotes");

class Client {

    constructor(clientBase) {

        /** @type {ClientBase} */
        this.clientBase = clientBase;

        /** @type {ActionsManager} */
        this.actions = new ActionsManager(this);

        /** @type {CommandsManager} */
        this.commands = new CommandsManager(this);

        /** @type {UsersULManager} */
        this.usersUL = new UsersULManager();

    }

    async createSlashCommands(guildID, commands) {
        await this.clientBase.application.commands.set(
            Array.isArray(commands)
                ? commands
                : Object.values(this.commands).map(command => command.command),
            guildID || undefined
        );
    }

    async createSlashCommandsBeta(guildID, commands) {
        await this.clientBase.application.commands.set(
            Array.isArray(commands)
                ? commands
                : Object.values(this.commands).filter(command => command.beta).map(command => command.command),
            guildID || undefined
        );
    }

    async createSlashCommandsSG(guildID="290248449968832514", commands) {
        await this.clientBase.application.commands.set(
            Array.isArray(commands)
                ? commands
                : Object.values(this.commands).filter(command => command.sg).map(command => command.command),
            guildID || undefined
        );
    }

    runHandlerInteractionCreate() {
        this.clientBase.on("interactionCreate", async interaction => {

            if (interaction.isChatInputCommand()) {
                let cmd = Object.values(this.commands).find(cmd => cmd.command.name == interaction.commandName);
                if (cmd) {
                    await this.log(`${EMOTE_INFO} \`${interaction.user.tag}\` (${interaction.user.id}) ran command "${cmd.command.name}" in ${interaction.guild ? `guild \`${interaction.guild.name}\` (${interaction.guild.id})` : "DM"}`);
                    cmd.handlerInteractionChatInput(interaction);
                }
            }
        
        });
        this.clientBase.on("guildCreate", async guild => {
            let owner = await guild.fetchOwner();
            await this.log(`:inbox_tray: joined guild \`${guild.name}\` (${guild.id}) owned by \`${owner.user.tag}\` (${owner.user.id}) [Guilds: ${this.clientBase.guilds.cache.size}]`);
        });
        this.clientBase.on("guildDelete", async guild => {
            await this.log(`:outbox_tray: left guild \`${guild.name}\` (${guild.id}) [Guilds: ${this.clientBase.guilds.cache.size}]`);
        });
    }

    log(data) {
        if (typeof data === "string") {
            let notif = this.actions.Notification.create({
                type: "GENERAL",
                value: data
            });
            notif.send(notif, "1085872789766033458");
        }
    }

    async login(token) {
        return await this.clientBase.login(token);
    }

}

module.exports = Client;
