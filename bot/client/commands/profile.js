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

const fs = require("fs");

const {
    util: {
        characters: {
            SPACE_BLOCK
        }
    }
} = require("../../src/util/Constants");

const Util = require("../../src/util/Util");

const Command = require("./Command");

const UserULProfile = require("../../src/structures/UserULProfile");

const {
    gd: {
        users: {
            stats: {
                stars: EMOTE_STARS,
                diamonds: EMOTE_DIAMONDS,
                scoins: EMOTE_SCOINS,
                ucoins: EMOTE_UCOINS,
                demons: EMOTE_DEMONS,
                cp: EMOTE_CP
            },
            status: {
                modRegular: EMOTE_MOD,
                modElder: EMOTE_MOD_ELDER
            }
        },
        pagination: {
            arrowLeftPink: EMOTE_ARROW_LEFT_PINK,
            arrowRightPink: EMOTE_ARROW_RIGHT_PINK
        },
        util: {
            info: EMOTE_INFO,
            locked: EMOTE_LOCKED
        }
    },
    ul: {
        icons: {
            loading: EMOTE_LOADING
        },
        medias: {
            youtube: EMOTE_YOUTUBE,
            twitter: EMOTE_TWITTER,
            twitch: EMOTE_TWITCH,
            discord: EMOTE_DISCORD,
            github: EMOTE_GITHUB,
            instagram: EMOTE_INSTAGRAM
        },
        staff: {
            alpha: EMOTE_ALPHA,
            dev: EMOTE_DEV,
            officer: EMOTE_OFFICER,
            helper: EMOTE_HELPER,
            trainee: EMOTE_TRAINEE
        },
        users: {
            status: {
                verified: EMOTE_VERIFIED,
                linked: EMOTE_LINKED,
                modLeaderboard: EMOTE_MOD_LEADERBOARD
            },
            stats: {
                net: EMOTE_NET
            }
        }
    },
    sg: {
        members: {
            member: EMOTE_SG
        }
    },
    util: {
        verification: {
            invalid: EMOTE_INVALID
        }
    },
    discord: {
        guilds: {
            owner: EMOTE_OWNER
        }
    }
} = require("../../src/util/Emotes");

const {
    rest: {
        api: {
            database: {
                getGJUsers20
            }
        }
    }
} = require("../../../gd-api/");

class profileCommand extends Command {

    get command() {

        let res = new SlashCommandBuilder()
        .setName("profile")
        .setDescription("The Discord version of a Geometry Dash profile");

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

        res.addStringOption(searchOption);
        res.addStringOption(searchTypeOption);

        return res;

    }

    statTypeToEmote(str) {
        switch (str) {
            default: { return EMOTE_INFO; }
            case "STARS": { return EMOTE_STARS; }
            case "DIAMONDS": { return EMOTE_DIAMONDS; }
            case "SCOINS": { return EMOTE_SCOINS; }
            case "UCOINS": { return EMOTE_UCOINS; }
            case "DEMONS": { return EMOTE_DEMONS; }
            case "CP": { return EMOTE_CP; }
            case "NET": { return EMOTE_NET; }
        }
    }

    /**
     * @param {UserULProfile} profile
     * @returns {EmbedBuilder}
     */

    async profileToEmbedProfile(profile) {
        
        let embed = new EmbedBuilder();

        let descStr = "";
        
        embed.setFooter({
            text: [
                    profile.profile.playerID ? `PlayerID: ${profile.profile.playerID}` : null,
                    profile.profile.accountID ? `AccountID: ${profile.profile.accountID}` : null,
                    profile.profile.ulID ? `ulID: ${profile.profile.ulID}` : null
                ].filter(a => a).join(" | ")
            });

        switch (profile.page) {
            
            case "PROFILE":
                {

                    let titles = [];

                        if (profile.profile.flags.staffTrainee || profile.profile.flags.staffHelper)
                            titles.push(
                                profile.profile.flags.staffChief ? `${EMOTE_ALPHA} **Chief**`
                                : profile.profile.flags.staffDeveloper ? `${EMOTE_DEV} **Dev**`
                                : profile.profile.flags.staffOfficer ? `${EMOTE_OFFICER} **Officer**`
                                : profile.profile.flags.staffHelper ? `${EMOTE_HELPER} **Helper**`
                                : profile.profile.flags.staffTrainee ? `${EMOTE_TRAINEE} **Trainee**`
                                : "ERROR"
                            );
                        
                        let mods = [];

                            if (profile.profile.flags.leaderboardTeam) mods.push(EMOTE_MOD_LEADERBOARD);
                            else if (profile.profile.flags.isGDModLeaderboard) mods.push(EMOTE_MOD_LEADERBOARD);

                            if (profile.profile.flags.isGDModElder) mods.push(EMOTE_MOD_ELDER);
                            else if (profile.profile.flags.isGDMod) mods.push(EMOTE_MOD);

                            if (mods.length > 0) {
                                titles.push(
                                    `${mods.join(" ")} **${
                                        profile.profile.flags.isGDModLeaderboard ? "Mod"
                                        : profile.profile.flags.leaderboardTeam ? "Team"
                                        : "Mod"
                                    }**`
                                );
                            }

                        if (profile.profile.flags.verified)
                            titles.push(`${EMOTE_VERIFIED} **Verified**`);

                        if (profile.profile.flags.sg)
                            titles.push(`${EMOTE_SG} **Star Grinder**`);

                        if (profile.profile.rankGlobal > 0 && profile.profile.rankGlobal <= 1000)
                            titles.push(`${this.client.actions.GlobalRank.globalRankToEmote(profile.profile.rankGlobal)} **${profile.profile.rankGlobal}**`);

                        if (titles.length > 0) {
                            let chunks = [];
                            for (let i = 0; i < titles.length; i += 3) chunks.push(titles.slice(i, i + 3));
                            embed.setTitle(chunks.map(g => g.join(" ")).join("\n"));
                        }

                    if (profile.profile.bio)
                        descStr += `\`\`\`${profile.profile.bio}\`\`\`\n`
                    
                    let statsStr = [
                        {
                            emote: EMOTE_STARS,
                            str: Util.stringPadStart(`${profile.profile.stars}`, 8, SPACE_BLOCK),
                            rank: profile.profile.flags.bannedStars ? -1 : 0
                        },
                        {
                            emote: EMOTE_DIAMONDS,
                            str: Util.stringPadStart(`${profile.profile.diamonds}`, 8, SPACE_BLOCK),
                            rank: profile.profile.flags.bannedDiamonds ? -1 : 0
                        },
                        {
                            emote: EMOTE_SCOINS,
                            str: Util.stringPadStart(`${profile.profile.scoins}`, 8, SPACE_BLOCK),
                            rank: profile.profile.flags.bannedScoins ? -1 : 0
                        },
                        {
                            emote: EMOTE_UCOINS,
                            str: Util.stringPadStart(`${profile.profile.ucoins}`, 8, SPACE_BLOCK),
                            rank: profile.profile.flags.bannedUcoins ? -1 : 0
                        },
                        {
                            emote: EMOTE_DEMONS,
                            str: Util.stringPadStart(`${profile.profile.demons}`, 8, SPACE_BLOCK),
                            rank: profile.profile.flags.bannedDemons ? -1 : 0
                        },
                        {
                            emote: EMOTE_CP,
                            str: Util.stringPadStart(`${profile.profile.cp}`, 8, SPACE_BLOCK),
                            rank: profile.profile.flags.bannedCP ? -1 : 0
                        }
                    ].map(stat => [
                        `${stat.emote}` || null,
                        `\`${stat.str}\``,
                        stat.rank > 0 ? `_#${stat.rank}_` : stat.rank < 0 ? `${EMOTE_LOCKED}` : null
                    ].filter(str => str !== null).join(" ")).join("\n")

                    descStr += statsStr;

                    let details = [];

                    if (profile.profile.flags.selected)
                        details.push(`${EMOTE_OWNER} **Server Owner**`);

                    if (profile.profile.flags.mobilePlayer || profile.profile.flags.pcPlayer)
                        details.push(`${EMOTE_INFO} **Devices:** ${[
                            profile.profile.flags.mobilePlayer ? "📱" : null,
                            profile.profile.flags.pcPlayer ? "🖥️" : null
                        ].filter(a => a).join(" ")}`);

                    if (profile.profile.disTag)
                        details.push(`${EMOTE_LINKED} **Tag:** \`${profile.profile.disTag}\``);

                    if (profile.profile.youtube)
                        details.push(`${EMOTE_YOUTUBE} [YouTube](https://www.youtube.com/channel/${profile.profile.youtube})`);

                    if (profile.profile.twitter)
                        details.push(`${EMOTE_TWITTER} [Twitter: @${profile.profile.twitter}](https://twitter.com/${profile.profile.twitter})`);

                    if (profile.profile.twitch)
                        details.push(`${EMOTE_TWITCH} [Twitch: @${profile.profile.twitch}](https://www.twitch.tv/${profile.profile.twitch})`);

                    if (profile.profile.instagram)
                        details.push(`${EMOTE_INSTAGRAM} [IG: @${profile.profile.instagram}](https://www.instagram.com/${profile.profile.instagram})`);

                    if (profile.profile.github)
                        details.push(`${EMOTE_GITHUB} [Github: @${profile.profile.github}](https://github.com/${profile.profile.github})`);

                    if (profile.profile.disServerInvite)
                        details.push(`${EMOTE_DISCORD} [Server: ${profile.profile.disServerInvite}](https://discord.gg/${profile.profile.disServerInvite})`);

                    if (details.length > 0) descStr += `\n\n${details.join("\n")}`;

                    break;
                }

            case "PROGRESS":
                {

                    if (profile.profile.progress.length > 0 && profile.profile.flags.verified) {

                        try {
                            
                            let chart = await this.client.actions.StatProgressChart.lineProfileCreate(profile);

                            let channel = await this.client.clientBase.channels.fetch("637430108428304404");
                            if (!channel) break;
                            
                            let msg = await channel.send({
                                content: `aID: ${profile.profile.accountID} | u: ${profile.profile.username} | pID: ${profile.profile.playerID}`,
                                files: [ chart ]
                            });
                            
                            embed.setImage(msg.attachments.first().proxyURL);

                        } catch (err) { console.log(err); }

                    } else {
                        if (profile.profile.flags.verified) {
                            descStr = `${EMOTE_INVALID} Progress is processing for this user. Check back later.`;
                        } else {
                            descStr = `${EMOTE_INVALID} Progression is only available to **verified** users.\n\nYou can request a user for verification using the "request" command`;
                        }
                    }

                    break;
                }

        }


        embed.setAuthor({
            name: [
                profile.profile.username
                ? Util.possession(profile.profile.username)
                : null,
                profile.page === "PROGRESS"
                ? profile.stat === "STARS" ? "Stars"
                    : profile.stat === "DIAMONDS" ? "Diamonds"
                    : profile.stat === "SCOINS" ? "Secret Coins"
                    : profile.stat === "UCOINS" ? "User Coins"
                    : profile.stat === "DEMONS" ? "Demons"
                    : profile.stat === "CP" ? "CP"
                    : null
                : null,
                profile.page === "PROGRESS"
                ? "Progress"
                : "Profile"
            ].filter(v => v !== null).join(" "),
            url: profile.profile.accountID || profile.profile.username
            ? `https://gdbrowser.com/u/${profile.profile.accountID || profile.profile.username}`
            : null
        });

        embed.setColor(this.client.actions.ColorPreset.searchFaulty(profile.profile.pColor) || null);
        embed.setDescription(descStr || null);

        return embed;

    }

    /**
     * @param {UserULProfile} profile
     * @returns {Object}
     */

    profileToProfileMessageComponents(profile, disable = false) {
        
        let page = new SelectMenuBuilder()
        .setCustomId("PAGE_SELECTION")
        .setOptions(
            new SelectMenuOptionBuilder()
                .setEmoji(`👤`)
                .setLabel(`${profile.profile.username ? `${Util.possession(profile.profile.username)} ` : ""}Profile`)
                .setValue("PROFILE")
                .setDescription("Profile page")
                .setDefault(profile.page == "PROFILE"),
            new SelectMenuOptionBuilder()
                .setEmoji(`📈`)
                .setLabel(`${profile.profile.username ? `${Util.possession(profile.profile.username)} ` : ""}Progress`)
                .setValue("PROGRESS")
                .setDescription("Stat progression page")
                .setDefault(profile.page == "PROGRESS")
        );
        
        let stat = new SelectMenuBuilder()
        .setCustomId("STAT_SELECTION")
        .setOptions(
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_STARS}`)
                .setLabel("Stars")
                .setValue("STARS")
                .setDescription("Stars setting")
                .setDefault(profile.stat == "STARS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_DIAMONDS}`)
                .setLabel("Diamonds")
                .setValue("DIAMONDS")
                .setDescription("Diamonds setting")
                .setDefault(profile.stat == "DIAMONDS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_SCOINS}`)
                .setLabel("Secret coins")
                .setValue("SCOINS")
                .setDescription("Secret coins setting")
                .setDefault(profile.stat == "SCOINS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_UCOINS}`)
                .setLabel("User coins")
                .setValue("UCOINS")
                .setDescription("User coins setting")
                .setDefault(profile.stat == "UCOINS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_DEMONS}`)
                .setLabel("Demons")
                .setValue("DEMONS")
                .setDescription("Demons setting")
                .setDefault(profile.stat == "DEMONS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_CP}`)
                .setLabel("Creator Points")
                .setValue("CP")
                .setDescription("Creator Points setting")
                .setDefault(profile.stat == "CP"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_NET}`)
                .setLabel("Overall Score")
                .setValue("NET")
                .setDescription("Overall Score setting")
                .setDefault(profile.stat == "NET")
        );
    
        let SELECTION = new ActionRowBuilder()
        .setComponents(
            page
        );
    
        let SELECTION2 = new ActionRowBuilder()
        .setComponents(
            stat
        );

        return [
            SELECTION,
            [ "PROGRESS" ].includes(profile.page) ? SELECTION2 : null
        ].filter(s => s !== null).map(r => {
            if (disable) r.components.map(c => c.setDisabled(disable));
            return r;
        });

    }

    /**
     * @param {UserULProfile} profile
     * @returns {Object}
     */

    async profileToProfileMessage(profile, {
        disableComponents = false
    }={}) {
        return {
            content: null,
            embeds: [
                await this.profileToEmbedProfile(profile)
            ],
            components: this.profileToProfileMessageComponents(profile, disableComponents),
            files: []
        }
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {UserULProfile} profile
     */

    async statSelectionByInteraction(int, intChat, profile) {
        await int.deferUpdate();
        profile.stat = int.values[0];
        profile.pageLocal = 0;
        await intChat.editReply(await this.profileToProfileMessage(profile));
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {UserULProfile} profile
     */

    async pageSelectionByInteraction(int, intChat, profile) {
        await int.deferUpdate();
        profile.page = int.values[0];
        profile.pageLocal = 0;

        switch (profile.page) {
            case "PROFILE": {
                if (`${profile.profile.disID}` === `${int.guild.ownerId}`)
                    profile.profile.flags.selected = true;
                break;
            }
            default: {
                profile.profile.flags.selected = false;
                break;
            }
        }

        await intChat.editReply(await this.profileToProfileMessage(profile));
    }

    /**
     * @param {ChatInputCommandInteraction} int 
     * @param {ChatInputCommandInteraction} intChat 
     * @param {UserULProfile} profile
     */

    async handlerInteractionMessageComponent(int, intChat, profile) {

        // NON-GLOBAL
        if (int.user.id === intChat.user.id) {

            if (int.customId == "PAGE_SELECTION") await this.pageSelectionByInteraction(int, intChat, profile);
            else if (int.customId == "STAT_SELECTION") await this.statSelectionByInteraction(int, intChat, profile);
            
        }

    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @param {Object} options
     * @property {"PROFILE"|"PROGRESS"} [options.page = "PROFILE"]
     */

    async handlerInteractionChatInput(int, {
        page = "PROFILE"
    }={}) {

        // PERMISSION CHECK
        if (!(await this.handlerInteractionPermission(int)))
            return;

        // COMMAND RESULT
        try {
            await int.reply({
                content: [
                    `${EMOTE_LOADING} Loading...`
                ].join("\n")
            });
        } catch { return; }

        let reply = await int.fetchReply();
        let replyTime = Date.now();
        let replyMsg = null;
        
        // INITIALIZING

        let searchType = int.options.getString("search-type");
        let search = int.options.getString("search");

        let profile = new UserULProfile();
        this.client.actions.UserUL.construct(profile.profileRaw);
        this.client.actions.UserUL.construct(profile.profile);

        if (!search) {
            search = int.user.id;
            searchType = "DISCORD_ID";
        }

        if (!searchType) {
            if (/^@\d{1,}$/.test(search)) searchType = "DISCORD_ID";
            else if (/^(a|acc|account|aID|accountID) ?\d{1,}$/.test(search)) searchType = "ACCOUNT_ID";
            else if (/^ul ?\d{1,}$/.test(search)) searchType = "UL_ID";
            else searchType = "USERNAME_AND_PLAYER_ID";
        }

        switch (searchType) {
            default:
                case "USERNAME_AND_PLAYER_ID": {
                    if (/^\d{1,}$/.test(search))
                        profile.profile.playerID = BigInt(search.match(/\d{1,}/) || 0);
                    else
                        profile.profile.username = search;
                    break;
                }
            case "ACCOUNT_ID": {
                profile.profile.accountID = BigInt(search.match(/\d{1,}/) || 0);
                break;
            }
            case "DISCORD_ID": {
                profile.profile.disID = BigInt(search.match(/\d{1,}/) || 0);
                break;
            }
            case "UL_ID": {
                profile.profile.ulID = BigInt(search.match(/\d{1,}/) || 0);
                break;
            }
        }

        if (profile.profile.disID) {
            let u = this.client.usersUL.searchDisID(profile.profile.disID);
            if (u && u.ulID) profile.profile.ulID = u.ulID;
        }

        if (!profile.profile.accountID) await profile.profile.loadUserSearchGD(profile.profile);

        if (profile.profile.accountID) {
            let u = this.client.usersUL.searchAccountID(profile.profile.accountID);
            if (u && u.ulID) profile.profile.ulID = u.ulID;
        }

        if (profile.profile.ulID) await profile.profile.load(profile.profile);

        if (await profile.profile.loadUserInfoGD(profile.profile)) {

            // UPDATE CURRENT DATA IF NECESSARY

            if (profile.profile.accountID) 
                await profile.profile.loadProgress(profile.profile);

            if (profile.profile.ulID)
                await profile.profile.updateProgress(profile.profile);

            // SETTING UP SETTINGS BY INTERACTION OPTIONS
            profile.page = int.options.getString("page") || page;
            profile.stat = int.options.getString("stat") || "STARS";
    
            // INITIALIZING INTERACTIONS
            if (reply.channel) {
                const collector = reply.channel.createMessageComponentCollector({
                    time: 10 * 1000 * 60
                });
        
                collector.on("collect", async (interaction) => {
                    try {
                        if (`${interaction.message.id}` === `${reply.id}`)
                            this.handlerInteractionMessageComponent(interaction, int, profile);
                    } catch {

                    }
                });
        
                collector.on("end", async () => {
                    try {
                        await int.editReply(await this.profileToProfileMessage(profile, { disableComponents: true }));
                    } catch {

                    }
                });
            }
            
            if (profile.page == "PROFILE") {
                if (int.guild) {
                    if (`${profile.profile.disID}` === `${int.guild.ownerId}`)
                                profile.profile.flags.selected = true;
                }
            }

            replyMsg = await this.profileToProfileMessage(profile);

        } else {
            replyMsg = this.errorMessage("Player could not be found");
        }

        // POST

        if (replyMsg) {
            while (Date.now() - replyTime < 2000) {}
            await int.editReply(replyMsg);
        }
        
    }

}

module.exports = profileCommand;
