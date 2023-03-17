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

class statProgressDownloadCommand extends Command {

    get command() {

        let res = new SlashCommandBuilder()
        .setName("add-user")
        .setDescription("(staff) Adds a user to the Updated Leaderboard");

        let searchOption = new SlashCommandStringOption();
        searchOption.setName("search");
        searchOption.setDescription("The user to search");
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

        if (!u.accountID) await u.loadUserSearchGD(u);

        let msg = `${EMOTE_INVALID} User could not be found`;

        if (u.accountID) {
            if (this.client.usersUL.searchAccountID(u.accountID)) {
                msg = `${EMOTE_INVALID} User already exists`;
            } else if (await u.loadUserInfoGD(u)) {
                this.client.actions.UserULRequest.addUserByUserUL(u);
                await u.save(u);
                await this.client.log(`${EMOTE_INFO} \`${u.username}\` (pID: ${u.playerID}, aID: ${u.accountID}, ulID: ${u.ulID}) was added to the Updated Leaderboard by \`${int.user.tag}\` (${int.user.id})`);
                msg = `${EMOTE_VALID} ${u.username ? `\`${u.username}\`` : "User"} (pID: ${u.playerID}, aID: ${u.accountID}, ulID: ${u.ulID}) has been added`;
            } else {
                msg = `${EMOTE_INVALID} GD Error`;
            }
        }

        // COMMAND RESULT
        try {
            if (int.replied) {
                setTimeout(() => {

                }, 3000 - Date.now() - replyTime)
                await int.editReply({
                    content: msg
                });
            } else {
                await int.reply({
                    content: msg
                });
            }
        } catch { return; }

    }

}

module.exports = statProgressDownloadCommand;
