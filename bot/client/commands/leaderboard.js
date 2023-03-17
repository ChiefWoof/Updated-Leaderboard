"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    CommandInteraction,
    SlashCommandStringOption,
    EmbedBuilder,
    AttachmentBuilder,
    SelectMenuComponent,
    SelectMenuOptionBuilder,
    TextInputComponent,
    TextInputBuilder,
    ButtonComponent,
    ButtonBuilder,
    ActionRow,
    ActionRowBuilder,
    ButtonStyle,
    SelectMenuBuilder,
    SelectMenuInteraction
} = require("discord.js");

const {
    util: {
        characters: {
            SPACE_BLOCK
        }
    }
} = require("../../src/util/Constants");

const Util = require("../../src/util/Util");

const Command = require("./Command");

const Leaderboard = require("../../src/structures/Leaderboard");

const {
    gd: {
        util: {
            info: EMOTE_INFO,
        },
        levels: {
            util: {
                download: EMOTE_DOWNLOAD
            }
        },
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
        trophies: {
            gold: EMOTE_TROPHY_GOLD
        }
    },
    ul: {
        icons: {
            loading: EMOTE_LOADING
        },
        users: {
            stats: {
                net: EMOTE_NET
            }
        },
        util: {
            plusGreen: EMOTE_PLUS_GREEN,
            plusPurple: EMOTE_PLUS_PURPLE,
            plusBlue: EMOTE_PLUS_BLUE,
            plusGold: EMOTE_PLUS_GOLD
        }
    },
    sg: {
        members: {
            member: EMOTE_SG
        }
    }
} = require("../../src/util/Emotes");

class leaderboardCommand extends Command {

    get command() {

        let res = new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("The Discord version of the Geometry Dash leaderboard");

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
            { name: "Overall Score", value: "NET" },
            { name: "Account IDs", value: "ACCOUNT_ID" },
            { name: "Player IDs", value: "PLAYER_ID" }
        );

        let typeOption = new SlashCommandStringOption();
        typeOption.setName("type");
        typeOption.setDescription("The type of leaderboard to display");
        typeOption.setChoices(
            { name: "Current Leaderboard", value: "CURRENT" },
            { name: "Weekly Leaderboard", value: "WEEKLY" },
            { name: "Monthly Leaderboard", value: "MONTHLY" },
            { name: "Yearly Leaderboard", value: "YEARLY" }
        );

        res.addStringOption(statOption);
        res.addStringOption(typeOption);

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

    statTypeToEmbedName(str) {
        switch (str) {
            default: { return "UL Leaderboard"; }
            case "STARS": { return "UL Stars Leaderboard"; }
            case "DIAMONDS": { return "UL Diamonds Leaderboard"; }
            case "SCOINS": { return "UL Secret Coins Leaderboard"; }
            case "UCOINS": { return "UL User Coins Leaderboard"; }
            case "DEMONS": { return "UL Demons Leaderboard"; }
            case "CP": { return "UL Creator Points Leaderboard"; }
            case "NET": { return "UL Overall Score Leaderboard"; }
            case "ACCOUNT_ID": { return "UL Account IDs Leaderboard"; }
            case "PLAYER_ID": { return "UL Player IDs Leaderboard"; }
        }
    }

    statTypeToEmbedColor(str) {
        switch (str) {
            default: { return "646464"; }
            case "STARS": { return this.client.actions.ColorPreset.handler("stars"); }
            case "DIAMONDS": { return this.client.actions.ColorPreset.handler("diamonds"); }
            case "SCOINS": { return this.client.actions.ColorPreset.handler("scoins"); }
            case "UCOINS": { return this.client.actions.ColorPreset.handler("ucoins"); }
            case "DEMONS": { return this.client.actions.ColorPreset.handler("demons"); }
            case "CP": { return this.client.actions.ColorPreset.handler("cp"); }
            case "NET": { return this.client.actions.ColorPreset.handler("net"); }
        }
    }

    /**
     * @param {Leaderboard} ldbr
     * @returns {string}
     */

    leaderboardToEmbedLeaderboardUserList(ldbr) {
        return (
            ldbr.reverseOrder
                ? ldbr.cache.slice(-1 * (ldbr.page + 1) * ldbr.perPage).slice(0, ldbr.perPage).reverse()
                : ldbr.cache.slice(ldbr.page * ldbr.perPage, (ldbr.page + 1) * ldbr.perPage)
        )
        .map(u => {
            return [
                u.flags.selected ? "**" : "",
                `\`#${Util.stringPadStart(`${u.position}`, 4, SPACE_BLOCK)}\``,
                " ",
                `${this.statTypeToEmote(ldbr.statType)}`,
                " ",
                `\`${Util.stringPadStart(`${ldbr.type == "CURRENT" ? "" : u.positionValue >= 0 ? "+" : ""}${u.positionValue}`, 8, SPACE_BLOCK)}\``,
                " \| ",
                `${u.username || "-"}`,
                u.flags.selected ? "**" : ""
            ].join("");
        })
        .join("\n");
    }

    /**
     * @param {Leaderboard} ldbr
     * @returns {EmbedBuilder}
     */

    leaderboardToEmbedLeaderboard(ldbr) {
        
        let embed = new EmbedBuilder()
        .setAuthor({
            name: this.statTypeToEmbedName(ldbr.statType),
            iconURL: this.statTypeToEmote(ldbr.statType).url
        })
        .setTitle(`**Page:** \`${ldbr.page + 1} / ${ldbr.pageMax + 1}\` _(${ldbr.cache.length} users)_`)
        .setColor(this.statTypeToEmbedColor(ldbr.statType))
        .setDescription(
            [
                "_ _",
                this.leaderboardToEmbedLeaderboardUserList(ldbr)
                || "*Nothing to display*"
            ].join("\n")
        );

        return embed;

    }

    /**
     * @param {Leaderboard} ldbr
     * @returns {(string|number)[][]}
     */

    leaderboardToLeaderboardDataArray(ldbr) {
        let headers = [ "Pos", "SG", "Mod", "Mobile", "PC", "Account ID", "Player ID", "Username", "Value" ];
        return [
            headers,
            ...ldbr.cache.reduce((res, u) => {
                res.push([
                    u.position,
                    u.flags.sg ? 1 : 0,
                    u.flags.isGDModElder ? 2 : u.flags.isGDMod ? 1 : 0,
                    u.flags.mobilePlayer ? 1 : 0,
                    u.flags.pcPlayer ? 1 : 0,
                    u.accountID,
                    u.playerID,
                    u.username,
                    u.positionValue
                ].map(a => `${a}`));
                return res;
            }, [])
        ];
    }

    /**
     * @param {Leaderboard} ldbr
     * @returns {string}
     */

    leaderboardToLeaderboardTXT(ldbr) {
        return this.leaderboardToLeaderboardDataArray(ldbr).map(a => a.join("\t")).join("\n");
    }

    /**
     * @param {Leaderboard} ldbr
     * @returns {string}
     */

    async leaderboardToLeaderboardExcelBuffer(ldbr) {
        return await this.client.actions.StorageFiles.datasetToExcel(
            this.leaderboardToLeaderboardDataArray(ldbr)
        ).writeBuffer();
    }

    /**
     * @param {Leaderboard} ldbr
     * @returns {Object}
     */

    leaderboardToLeaderboardMessageComponents(ldbr, disable = false) {
        
        let downloadAsTXT = new ButtonBuilder()
        .setEmoji(`${EMOTE_DOWNLOAD}`)
        .setCustomId("DOWNLOAD_TXT")
        .setLabel("TXT")
        .setStyle(ButtonStyle.Success);
        
        let downloadAsXLSX = new ButtonBuilder()
        .setEmoji(`${EMOTE_DOWNLOAD}`)
        .setCustomId("DOWNLOAD_XLSX")
        .setLabel("Excel")
        .setStyle(ButtonStyle.Success);
        
        let findMe = new ButtonBuilder()
        .setEmoji(`👤`)
        .setCustomId("FIND_SELECTION")
        .setLabel("Find Me")
        .setStyle(ButtonStyle.Secondary);
        
        let previous = new ButtonBuilder()
        .setEmoji(`${EMOTE_ARROW_LEFT_PINK}`)
        .setCustomId("PREV_1")
        .setLabel("Prev")
        .setStyle(ButtonStyle.Secondary);
        
        let previous2 = new ButtonBuilder()
        .setEmoji(`${EMOTE_ARROW_LEFT_PINK}`)
        .setCustomId("PREV_5")
        .setLabel("5")
        .setStyle(ButtonStyle.Secondary);
        
        let next = new ButtonBuilder()
        .setEmoji(`${EMOTE_ARROW_RIGHT_PINK}`)
        .setCustomId("NEXT_1")
        .setLabel("Next")
        .setStyle(ButtonStyle.Secondary);
        
        let next2 = new ButtonBuilder()
        .setEmoji(`${EMOTE_ARROW_RIGHT_PINK}`)
        .setCustomId("NEXT_5")
        .setLabel("5")
        .setStyle(ButtonStyle.Secondary);
        
        let stat = new SelectMenuBuilder()
        .setCustomId("STAT_SELECTION")
        .setOptions(
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_STARS}`)
                .setLabel("Stars")
                .setValue("STARS")
                .setDescription("Stars Leaderboard")
                .setDefault(ldbr.statType == "STARS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_DIAMONDS}`)
                .setLabel("Diamonds")
                .setValue("DIAMONDS")
                .setDescription("Diamonds Leaderboard")
                .setDefault(ldbr.statType == "DIAMONDS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_SCOINS}`)
                .setLabel("Secret coins")
                .setValue("SCOINS")
                .setDescription("Secret coins Leaderboard")
                .setDefault(ldbr.statType == "SCOINS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_UCOINS}`)
                .setLabel("User coins")
                .setValue("UCOINS")
                .setDescription("User coins Leaderboard")
                .setDefault(ldbr.statType == "UCOINS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_DEMONS}`)
                .setLabel("Demons")
                .setValue("DEMONS")
                .setDescription("Demons Leaderboard")
                .setDefault(ldbr.statType == "DEMONS"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_CP}`)
                .setLabel("Creator Points")
                .setValue("CP")
                .setDescription("Creator Points Leaderboard")
                .setDefault(ldbr.statType == "CP"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_NET}`)
                .setLabel("Overall Score")
                .setValue("NET")
                .setDescription("Overall Score Leaderboard")
                .setDefault(ldbr.statType == "NET"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_INFO}`)
                .setLabel("Account IDs")
                .setValue("ACCOUNT_ID")
                .setDescription("Account IDs Leaderboard")
                .setDefault(ldbr.statType == "ACCOUNT_ID"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_INFO}`)
                .setLabel("Player IDs")
                .setValue("PLAYER_ID")
                .setDescription("Player IDs Leaderboard")
                .setDefault(ldbr.statType == "PLAYER_ID")
        )

        let type = new SelectMenuBuilder()
        .setCustomId("TYPE_SELECTION")
        .setOptions(
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_TROPHY_GOLD}`)
                .setLabel("Current")
                .setValue("CURRENT")
                .setDescription("The general Leaderboard")
                .setDefault(ldbr.type == "CURRENT"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_PLUS_GREEN}`)
                .setLabel("Weekly")
                .setValue("WEEKLY")
                .setDescription("The weekly progress Leaderboard")
                .setDefault(ldbr.type == "WEEKLY"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_PLUS_PURPLE}`)
                .setLabel("Monthly")
                .setValue("MONTHLY")
                .setDescription("The weekly progress Leaderboard")
                .setDefault(ldbr.type == "MONTHLY"),
            new SelectMenuOptionBuilder()
                .setEmoji(`${EMOTE_PLUS_BLUE}`)
                .setLabel("Yearly")
                .setValue("YEARLY")
                .setDescription("The yearly progress Leaderboard")
                .setDefault(ldbr.type == "YEARLY")
        )
        
        let sg = new ButtonBuilder()
        .setEmoji(`${EMOTE_SG}`)
        .setCustomId("SG")
        .setStyle(ldbr.sg > 0 ? ButtonStyle.Success : ButtonStyle.Secondary);
        
        let mod = new ButtonBuilder()
        .setEmoji(ldbr.mod > 1 ? `${EMOTE_MOD_ELDER}` : `${EMOTE_MOD}`)
        .setCustomId("MOD")
        .setStyle(ldbr.mod > 0 ? ButtonStyle.Success : ButtonStyle.Secondary);
        
        let mobile = new ButtonBuilder()
        .setEmoji(`📱`)
        .setCustomId("MOBILE")
        .setStyle(ldbr.mobile > 0 ? ButtonStyle.Success : ButtonStyle.Secondary);
        
        let pc = new ButtonBuilder()
        .setEmoji(`🖥️`)
        .setCustomId("PC")
        .setStyle(ldbr.pc > 0 ? ButtonStyle.Success : ButtonStyle.Secondary);

        let ROW_DATA = new ActionRowBuilder()
        .setComponents(
            downloadAsTXT,
            downloadAsXLSX,
            findMe
        );

        let FILTERS = new ActionRowBuilder()
        .setComponents(
            sg,
            mod,
            mobile,
            pc
        );

        let SELECTION = new ActionRowBuilder()
        .setComponents(
            stat
        );

        let SELECTION2 = new ActionRowBuilder()
        .setComponents(
            type
        );

        let ROW_PAGINATION = new ActionRowBuilder()
        .setComponents(
            previous2,
            previous,
            next,
            next2
        );

        return [
            ROW_DATA,
            ROW_PAGINATION,
            FILTERS,
            SELECTION,
            SELECTION2
        ].map(r => {
            if (disable) r.components.map(c => c.setDisabled(disable));
            return r;
        });

    }

    /**
     * @param {Leaderboard} ldbr
     * @returns {Object}
     */

    leaderboardToLeaderboardMessage(ldbr, {
        disableComponents = false
    }={}) {
        return {
            content: null,
            embeds: [
                this.leaderboardToEmbedLeaderboard(ldbr)
            ],
            components: this.leaderboardToLeaderboardMessageComponents(ldbr, disableComponents),
            files: []
        }
    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @param {Leaderboard} ldbr
     */

    async downloadTXTByInteraction(int, ldbr) {

        await int.deferReply({ ephemeral: true }).catch(() => {});
        let data = this.leaderboardToLeaderboardTXT(ldbr);

        let file = new AttachmentBuilder()
        .setFile(Buffer.from(data), "leaderboard.txt")
        .setName("leaderboard.txt")
        .setDescription("TXT Version of the leaderboard");

        await int.followUp({
            files: [ file ]
        }).catch(() => {});

    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @param {Leaderboard} ldbr
     */

    async downloadXLSXByInteraction(int, ldbr) {

        await int.deferReply({ ephemeral: true }).catch(() => {});
        let data = await this.leaderboardToLeaderboardExcelBuffer(ldbr);

        let file = new AttachmentBuilder()
        .setFile(Buffer.from(data), "leaderboard.xlsx")
        .setName("leaderboard.xlsx")
        .setDescription("Excel Version of the leaderboard");

        await int.followUp({
            files: [ file ]
        }).catch(() => {});

    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async findSelectionByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();
        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async statSelectionByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        ldbr.setStatByString(int.values[0]);
        ldbr.order = [ "ACCOUNT_ID", "PLAYER_ID" ].includes(ldbr.statType)
            ? 1
            : 2;
        ldbr.page = 0;
        ldbr.refresh();
        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();
        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async typeSelectionByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        ldbr.type = int.values[0];
        ldbr.page = 0;
        ldbr.refresh();
        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();
        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async sgByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        ldbr.sg++;
        ldbr.sg = ldbr.sg > 1 ? 0 : ldbr.sg;
        ldbr.page = 0;
        ldbr.refresh();
        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();
        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async modByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        ldbr.mod++;
        ldbr.mod = ldbr.mod > 2 ? 0 : ldbr.mod;
        ldbr.page = 0;
        ldbr.refresh();
        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();
        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async mobileByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        ldbr.mobile++;
        ldbr.mobile = ldbr.mobile > 1 ? 0 : ldbr.mobile;
        ldbr.page = 0;
        ldbr.refresh();
        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();
        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));
    }

    /**
     * @param {SelectMenuInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async pcByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        ldbr.pc++;
        ldbr.pc = ldbr.pc > 1 ? 0 : ldbr.pc;
        ldbr.page = 0;
        ldbr.refresh();
        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();
        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));
    }

    /**
     * @param {ChatInputCommandInteraction} int
     * @param {ChatInputCommandInteraction} intChat
     * @param {Leaderboard} ldbr
     */

    async setPageByInteraction(int, intChat, ldbr) {
        await int.deferUpdate();
        
        if (int.customId.startsWith("PAGE_")) ldbr.page = Number(int.customId.split("_")[1]);
        else {
            if (int.customId.startsWith("NEXT_")) ldbr.page += Number(int.customId.split("_")[1]);
            else if (int.customId.startsWith("PREV_")) ldbr.page -= Number(int.customId.split("_")[1]);
            ldbr.page = ldbr.page < 0 ? ldbr.pageMax : ldbr.page > ldbr.pageMax ? 0 : ldbr.page;
        }

        await intChat.editReply(this.leaderboardToLeaderboardMessage(ldbr));

    }

    /**
     * @param {ChatInputCommandInteraction} int 
     * @param {ChatInputCommandInteraction} intChat 
     * @param {Leaderboard} ldbr
     */

    async handlerInteractionMessageComponent(int, intChat, ldbr) {

        // GLOBAL
        if (int.customId == "DOWNLOAD_TXT") await this.downloadTXTByInteraction(int, ldbr);
        else if (int.customId == "DOWNLOAD_XLSX") await this.downloadXLSXByInteraction(int, ldbr);

        // NON-GLOBAL
        else if (int.user.id === intChat.user.id) {

            if (int.customId == "FIND_SELECTION") await this.findSelectionByInteraction(int, intChat, ldbr);
            else if (int.customId == "STAT_SELECTION") await this.statSelectionByInteraction(int, intChat, ldbr);
            else if (int.customId == "TYPE_SELECTION") await this.typeSelectionByInteraction(int, intChat, ldbr);
            else if (int.customId == "SG") await this.sgByInteraction(int, intChat, ldbr);
            else if (int.customId == "MOD") await this.modByInteraction(int, intChat, ldbr);
            else if (int.customId == "MOBILE") await this.mobileByInteraction(int, intChat, ldbr);
            else if (int.customId == "PC") await this.pcByInteraction(int, intChat, ldbr);
            else if ([
                "PAGE_",
                "NEXT_",
                "PREV_"
            ].some(a => int.customId.startsWith(a))) await this.setPageByInteraction(int, intChat, ldbr);

        }
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
                    `${EMOTE_LOADING} Loading...`
                ].join("\n")
            });
        } catch { return; }

        let reply = await int.fetchReply();

        let replyTime = Date.now();

        // INITIALIZING
        let ldbr = new Leaderboard();
        this.client.actions.Leaderboard.setResetCache(ldbr);

        // SETTING UP SETTINGS BY INTERACTION OPTIONS
        ldbr.setStatByString(int.options.getString("stat") || "STARS");
        ldbr.type = int.options.getString("type") || "CURRENT";

        ldbr.order = [ "ACCOUNT_ID", "PLAYER_ID" ].includes(ldbr.statType)
            ? 1
            : 2;
        
        // REFRESHING LEADERBOARD
        ldbr.refresh();

        ldbr.selectByDisID({}, int.user.id);
        ldbr.setPageFirstSelection();

        // INITIALIZING INTERACTIONS
        const collector = reply.channel.createMessageComponentCollector({
            time: 10 * 1000 * 60
        });

        collector.on("collect", async (interaction) => {
            try {
                if (`${interaction.message.id}` === `${reply.id}`)
                    this.handlerInteractionMessageComponent(interaction, int, ldbr);
            } catch {

            }
        })

        collector.on("end", async () => {
            try {
                await int.editReply(await this.leaderboardToLeaderboardMessage(ldbr, { disableComponents: true }));
            } catch {

            }
        })

        // POST

        while (Date.now() - replyTime < 2000) {}

        await int.editReply(this.leaderboardToLeaderboardMessage(ldbr));
        
    }

}

module.exports = leaderboardCommand;