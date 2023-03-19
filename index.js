"use strict";

const {
    client: {
        Client: botClient
    }
} = require("./bot/index");

const {
    Client
} = require("discord.js");
const {
    tokens: {
        main: BOT_MAIN_TOKEN,
        beta: BOT_BETA_TOKEN
    }
} = require("./creds.json");

const clientBase = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "DirectMessages",
        "DirectMessageReactions"
    ]
});

///////////////////////////////////////////////////////

const client = new botClient(clientBase);

async function loadFiles() {
    await client.actions.UserUL.loadManagerFromFile();
    await client.actions.UserUL.loadUserOverridesFromFile();
}

async function login(token) {
    await client.login(token);
    console.log("LOGGED IN!\n");
}

async function onStart() {
    
    // Initial Settings
    await loadFiles();

}

async function onReady() {

    await login(BOT_MAIN_TOKEN);
    client.runHandlerInteractionCreate();

}

async function onExit() {
    await client.actions.UserUL.saveByManager(client.usersUL);
}




async function run() {
    await onStart();
    await onReady();
}

process.on("exit", onExit);

run();
