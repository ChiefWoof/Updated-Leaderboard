"use strict";

const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    SlashCommandStringOption,
    SlashCommandNumberOption
} = require("discord.js");

const Command = require("./Command");

class timeCommand extends Command {

    get command() {

        let res = new SlashCommandBuilder()
        .setName("time")
        .setDescription("Retrieves the milisecond timestamp of the current time");

        let timestampOption = new SlashCommandNumberOption();
        timestampOption.setName("timestamp");
        timestampOption.setDescription("The milisecond timestamp representation of a date");

        let yearOption = new SlashCommandNumberOption();
        yearOption.setName("year");
        yearOption.setDescription("The year value");
        yearOption.setMinValue(0);

        let monthOption = new SlashCommandNumberOption();
        monthOption.setName("month");
        monthOption.setDescription("The month value");
        monthOption.setChoices(
            { name: "January", value: 0 },
            { name: "February", value: 1 },
            { name: "March", value: 2 },
            { name: "April", value: 3 },
            { name: "May", value: 4 },
            { name: "June", value: 5 },
            { name: "July", value: 6 },
            { name: "August", value: 7 },
            { name: "September", value: 8 },
            { name: "October", value: 9 },
            { name: "November", value: 10 },
            { name: "December", value: 11 },
        );

        let dayOption = new SlashCommandNumberOption();
        dayOption.setName("day");
        dayOption.setDescription("The day value");
        dayOption.setMaxValue(31);
        dayOption.setMinValue(1);

        let hrOption = new SlashCommandNumberOption();
        hrOption.setName("hr");
        hrOption.setDescription("The hour value");
        hrOption.setMaxValue(23);
        hrOption.setMinValue(0);

        let mOption = new SlashCommandNumberOption();
        mOption.setName("m");
        mOption.setDescription("The minute value");
        mOption.setMaxValue(59);
        mOption.setMinValue(0);

        let sOption = new SlashCommandNumberOption();
        sOption.setName("s");
        sOption.setDescription("The second value");
        sOption.setMaxValue(59);
        sOption.setMinValue(0);

        let msOption = new SlashCommandNumberOption();
        msOption.setName("ms");
        msOption.setDescription("The miliseconds value");
        msOption.setMaxValue(999);
        msOption.setMinValue(0);

        let strOption = new SlashCommandStringOption();
        strOption.setName("str");
        strOption.setDescription("The timestamp string");

        res.addNumberOption(timestampOption);

        res.addNumberOption(yearOption);
        res.addNumberOption(monthOption);
        res.addNumberOption(dayOption);

        res.addNumberOption(hrOption);
        res.addNumberOption(mOption);
        res.addNumberOption(sOption);
        res.addNumberOption(msOption);

        res.addStringOption(strOption);

        return res;
    }

    /**
     * @param {ChatInputCommandInteraction} int 
     */

    async handlerInteractionChatInput(int) {

        // PERMISSION CHECK
        if (!(await this.handlerInteractionPermission(int)))
            return;

        let date = new Date(
            int.options.getString("str") !== null
            ? int.options.getString("str")
            : Date.now()
        );

        if (int.options.getNumber("timestamp") !== null)
            date.setTime(int.options.getNumber("timestamp"));
        
        if (int.options.getNumber("year") !== null)
            date.setFullYear(int.options.getNumber("year"));
        if (int.options.getNumber("month") !== null)
            date.setMonth(int.options.getNumber("month"));
        if (int.options.getNumber("day") !== null)
            date.setDate(int.options.getNumber("day"));

        if (int.options.getNumber("hr") !== null)
            date.setHours(int.options.getNumber("hr"));
        if (int.options.getNumber("m") !== null)
            date.setMinutes(int.options.getNumber("m"));
        if (int.options.getNumber("s") !== null)
            date.setSeconds(int.options.getNumber("s"));
        if (int.options.getNumber("ms") !== null)
            date.setMilliseconds(int.options.getNumber("ms"));

        // COMMAND RESULT
        try {
            await int.reply({
                content: [
                    "__SETTINGS__",
                    [
                        [ "Year", date.getFullYear() ],
                        [ "Month", date.toDateString().split(" ")[1] ],
                        [ "Day of Week", date.toDateString().split(" ")[0] ],
                        [ "Day of Month", date.toDateString().split(" ")[2] ],
                        null,
                        [ "Hours", `${date.getHours()}, ${(date.getHours() % 12) || 12}${date.getHours() >= 12 ? "pm" : "am"}` ],
                        [ "Minutes", date.getMinutes() ],
                        [ "Seconds", date.getSeconds() ],
                        [ "Miliseconds", date.getMilliseconds() ],
                    ],
                    null,
                    "__RESULTS__",
                    [
                        [ "Time", date.getTime() ],
                        [ "Time at 00:00", date.getTime() - date.getHours() * 1000 * 60 * 60 - date.getMinutes() * 1000 * 60 - date.getSeconds() * 1000 - date.getMilliseconds() ],
                        [ "Discord Countdown", `<t:${(date.getTime() - date.getMilliseconds()) / 1000}:R>` ]
                    ]
                ].map(a => Array.isArray(a) ? `\`\`\`${a.map(b => Array.isArray(b) ? b.join(`\t${" ".repeat("Discord Countdown".length - b[0].length)}`) : b).join("\n")}\`\`\`` : a).join("\n")
            });
        } catch { return; }
        
    }

}

module.exports = timeCommand;
