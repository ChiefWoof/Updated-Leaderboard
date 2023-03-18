"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    AttachmentBuilder,
    SlashCommandStringOption,
    SlashCommandBooleanOption
} = require("discord.js");

const Command = require("./Command");
const UserUL = require("../../src/structures/UserUL");
const {
    wait
} = require("../../src/util/Util");


const {
    util: {
        verification: {
            invalid: EMOTE_INVALID,
            valid: EMOTE_VALID
        }
    },
    ul: {
        icons: {
            loading: EMOTE_LOADING
        }
    },
    gd: {
        util: {
            info: EMOTE_INFO
        }
    }
} = require("../../src/util/Emotes");

class addUserCommand extends Command {

    get command() {

        let res = new SlashCommandBuilder()
        .setName("add-user")
        .setDescription("(staff) Adds up to 10 users at a time to the Updated Leaderboard");

        let searchOption = new SlashCommandStringOption();
        searchOption.setName("search");
        searchOption.setDescription("The users to search (separate with just a \",\")");
        searchOption.setRequired(true);

        let searchTypeOption = new SlashCommandStringOption();
        searchTypeOption.setName("search-type");
        searchTypeOption.setDescription("The type of identification to search for");
        searchTypeOption.setChoices(
            { name: "Username & Player ID", value: "USERNAME_AND_PLAYER_ID" },
            { name: "Account ID", value: "ACCOUNT_ID" }
        );

        let verifiedOption = new SlashCommandBooleanOption();
        verifiedOption.setName("verify");
        verifiedOption.setDescription("Whether to add as a verified user");

        let sgOption = new SlashCommandBooleanOption();
        sgOption.setName("sg");
        sgOption.setDescription("Whether to add as a Star Grinders user");

        let disIDOption = new SlashCommandStringOption();
        disIDOption.setName("dis-id");
        disIDOption.setDescription("The user's assoicated Discord User ID");

        res.addStringOption(searchOption);
        res.addStringOption(searchTypeOption);
        res.addBooleanOption(verifiedOption);
        res.addBooleanOption(sgOption);
        res.addStringOption(disIDOption);

        return res;

    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @returns {boolean}
     */

    async handlerInteractionPermissionCheck(int) {
        let u = await this.interactionToUserUL(int);
        return u && (u.flags.staffTrainee || u.flags.staffHelper || u.flags.leaderboardTeam || u.flags.isGDModLeaderboard);
    }

    /**
     * @param {ChatInputCommandInteraction} int 
     */

    async handlerInteractionChatInput(int) {

        // PERMISSION CHECK
        if (!(await this.handlerInteractionPermission(int)))
            return;

        // INITIALIZING

        let replyTime = Date.now();
        try {
            await int.reply({
                content: `${EMOTE_LOADING} Loading...`
            });
        } catch { return; }

        let search = int.options.getString("search");
        let searchType = int.options.getString("search-type");
        let verified = int.options.getBoolean("verify") || false;
        let sg = int.options.getBoolean("sg") || false;
        let disID = int.options.getString("dis-id");

        let searches = search.split(",").slice(0, 10);
        let searchTypes = [ searchType ];
        let i = 0;
        let msgs = [];
        let addLogs = [];

        for await (search of searches) {

            searchType = searchTypes[i];

            let LOADED_SEARCH = false;

            let u = new UserUL();
            u = this.client.actions.UserUL.construct(u);
    
            u.addedByDisID = BigInt(int.user.id);
            u.timestampAdded = Date.now();
    
            u.flags.verified = verified;
            u.flags.sg = sg;
    
            if (disID) u.disID = BigInt((disID.match(/\d{1,}/g) || [0])[0]);
    
            if (!searchType) {
                if (/^(a|acc|account|aID|accountID) ?\d{1,}$/.test(search)) searchType = "ACCOUNT_ID";
                else searchType = "USERNAME_AND_PLAYER_ID";
            }
    
            switch (searchType) {
                default:
                    case "USERNAME_AND_PLAYER_ID": {
                        if (/^\d{1,}$/.test(search))
                            u.playerID = BigInt(search.match(/\d{1,}/) || 0);
                        else
                            u.username = search;
                        break;
                    }
                case "ACCOUNT_ID": {
                    u.accountID = BigInt(search.match(/\d{1,}/) || 0);
                    break;
                }
            }

            if (!u.accountID) {
                LOADED_SEARCH = true;
                await u.loadUserSearchGD(u);
            }
    
            let msg = `${EMOTE_INVALID} "${search}" could not be found`;
    
            if (u.accountID) {
                if (this.client.usersUL.searchAccountID(u.accountID)) {
                    msg = `${EMOTE_INVALID} "${search}" already exists`;
                } else if (await u.loadUserInfoGD(u)) {
                    this.client.actions.UserULRequest.addUserByUserUL(u);
                    await u.save(u);
                    addLogs.push(`${EMOTE_INFO} \`${u.username}\` (pID: ${u.playerID}, aID: ${u.accountID}, ulID: ${u.ulID}) was added to the Updated Leaderboard by \`${int.user.tag}\` (${int.user.id})`);
                    msg = `${EMOTE_VALID} ${u.username ? `\`${u.username}\`` : "User"} (pID: ${u.playerID}, aID: ${u.accountID}, ulID: ${u.ulID}) has been added (search: "${search}")`;
                } else {
                    msg = `${EMOTE_INVALID} GD Error for "${search}"`;
                }
            }

            msgs[i++] = msg;
            await wait(LOADED_SEARCH ? 3000 : 1500);

        }

        if (addLogs.length > 0) {
            await this.client.log(addLogs.join("\n"));
        }

        // COMMAND RESULT
        try {
            if (int.replied) {
                await wait(3000 - Date.now() - replyTime);
                await int.editReply({
                    content: msgs.join("\n") || "UNKNOWN ERROR"
                });
            } else {
                await int.reply({
                    content: msgs.join("\n") || "UNKNOWN ERROR"
                });
            }
        } catch { return; }

    }

}

module.exports = addUserCommand;
