"use strict";

const ChartJSImage = require("chart.js-image");
const Jimp = require("jimp");
const path = require("path");

const fs = require("fs");

const Action = require("./Action");

const StatProgressManager = require("../../src/managers/StatProgressManager");

const UserULStatProgressEntry = require("../../src/structures/UserULStatProgressEntry");
const UserULProfile = require("../../src/structures/UserULProfile");

const Util = require("../../src/util/Util");


/**
 * @typedef POINT
 * @property {string} label
 * @property {number} timestamp
 * @property {number} value
 */


class StatProgressChartAction extends Action {

    static CHART_WIDTH = 720;
    static CHART_HEIGHT = 360;

    static CHART_WIDTH_FINAL = 710;
    static CHART_HEIGHT_FINAL = 360;

    static FINAL_WIDTH = 1440;
    static FINAL_HEIGHT = 720;

    static PATH = "../storage";
    static PATH_CHART = `${StatProgressChartAction.PATH}/chart.png`;
    static PATH_CHART_FINAL = `${StatProgressChartAction.PATH}/chartProgression.png`;

    static CANVAS = "../storage/images/canvas.png";
    static CHART_BORDER = "../storage/images/chart_Border.png";
    static CHART_UL = "../storage/images/chart_UL.png";
    static CHART_SG = "../storage/images/chart_SG.png";
    static CHART_CP = "../storage/images/chart_CP.png";

    /**
     * @param {UserULProfile} profile
     * @returns {POINT[]}
     */

    lineProfileToPoints(profile) {
        let res = [];

        // CREATING POINTS
        let initial = profile.profile.progress.oldest;
        if (initial && initial.timestampStatsRefreshed) {

            profile.profile.setAsProgressEntryCurrent();

            switch (profile.progressType) {

                case "WEEKLY":
                    case "WEEKLY_DEFAULT": {

                    let timestamp = new Date(initial.timestampStatsRefreshed);
                    timestamp.setDate(timestamp.getDate() + 7);
                    timestamp.setHours(0, 0, 0, 0);

                    let i = 0;

                    let current = profile.profile.progress.recent;

                    function label() {
                        if (i === 0) return "Initial";
                        return `${i}`;
                    }

                    while (timestamp.getTime() <= current.timestampStatsRefreshed) {
                        if (timestamp.getTime() <= current.timestampStatsRefreshed && profile.progressLB <= timestamp.getTime() && timestamp.getTime() <= profile.progressUB)
                            res.push({ label: label(), timestamp: timestamp.getTime(), value: i == 0 ? initial[profile.stat.toLowerCase()] : profile.profile.progress.estimateToTimestamp(timestamp.getTime())[profile.stat.toLowerCase()] });
                        timestamp.setDate(timestamp.getDate() + 7);
                        ++i;
                    }

                    if (current.timestampStatsRefreshed <= profile.progressUB)
                        res.push({ label: "Now", timestamp: current.timestampStatsRefreshed, value: current[profile.stat.toLowerCase()] });

                    if (res.length <= 10)
                        res = res.map(e => {
                            if (e.label && /^w?\d{1,}$/.test(e.label)) {
                                e.label = new Date(e.timestamp).toString().split(" ").slice(1, 4);
                                e.label = [ e.label.slice(0, 2).join(" "), e.label[2] ];
                            }
                            return e;
                        });

                    break;

                }

                case "MONTHLY":
                    case "MONTHLY_DEFAULT": {

                        let timestamp = new Date(initial.timestampStatsRefreshed);
                        timestamp.setMonth(timestamp.getMonth() + 1);
                        timestamp.setHours(0, 0, 0, 0);
                        timestamp.setDate(1);

                        let i = 0;

                        function label() {
                            let timestampLabel = new Date(timestamp.getTime());
                            timestampLabel.setDate(-1);
                            return `${timestampLabel.toString().split(" ")[1]} ${timestampLabel.getFullYear()}`;
                        }

                        let current = profile.profile.progress.recent;

                        while (timestamp.getTime() <= current.timestampStatsRefreshed) {
                            if (timestamp.getTime() <= current.timestampStatsRefreshed && profile.progressLB <= timestamp.getTime() && timestamp.getTime() <= profile.progressUB)
                                res.push({ label: label(), timestamp: timestamp.getTime(), value: i == 0 ? initial[profile.stat.toLowerCase()] : profile.profile.progress.estimateToTimestamp(timestamp.getTime())[profile.stat.toLowerCase()] });
                            timestamp.setMonth(timestamp.getMonth() + 1);
                            ++i;
                        }

                        if (current.timestampStatsRefreshed <= profile.progressUB)
                            res.push({ label: "Now", timestamp: current.timestampStatsRefreshed, value: current[profile.stat.toLowerCase()] });

                    break;
                }

                case "YEARLY":
                    case "YEARLY_DEFAULT": {

                        let timestamp = new Date(initial.timestampStatsRefreshed);
                        timestamp.setFullYear(timestamp.getFullYear() + 1);
                        timestamp.setMonth(0);
                        timestamp.setHours(0, 0, 0, 0);
                        timestamp.setDate(1);

                        let i = 0;

                        function label() {
                            let timestampLabel = new Date(timestamp.getTime());

                            if (timestampLabel.getMonth() > 0) return "";
                            
                            timestampLabel.setDate(-1);
                            return `${timestampLabel.getFullYear()}`;

                        }

                        let current = profile.profile.progress.recent;

                        while (timestamp.getTime() <= current.timestampStatsRefreshed) {
                            if (timestamp.getTime() <= current.timestampStatsRefreshed && profile.progressLB <= timestamp.getTime() && timestamp.getTime() <= profile.progressUB)
                                res.push({ label: label(), timestamp: timestamp.getTime(), value: i == 0 ? initial[profile.stat.toLowerCase()] : profile.profile.progress.estimateToTimestamp(timestamp.getTime())[profile.stat.toLowerCase()] });
                            timestamp.setMonth(timestamp.getMonth() + 6);
                            ++i;
                        }

                        if (current.timestampStatsRefreshed <= profile.progressUB)
                            res.push({ label: "Now", timestamp: current.timestampStatsRefreshed, value: current[profile.stat.toLowerCase()] });

                    break;
                }

            }

            profile.profile.progress.removeCurrent();

        }

        // DROP CHECK
        if (res.length > 1) {
            let middleDrops = [];
            res.map((entry, i) => {
                if (i > 0 && i + 1 < res.length) { // NOT FIRST OR LAST POINT
                    // PREV VALUE IS GREATER THAN CURRENT AND NEXT VALUE IS LESS THAN CURRENT
                    if (res[i-1].value > entry.value && entry.value > res[i+1].value) {
                        middleDrops.push(i);
                    }
                }
                return entry;
            });
    
            middleDrops.forEach(i => {
                let i2 = i;
                while (++i2 && res[i2] && res[i].value > res[i2].value)
                    res[i].value = res[i2].value;
            });
        }

        return res;
    }

    /**
     * @param {UserULProfile} profile 
     */

    lineProfileToTitle(profile) {
        return [
            profile.profile.username ? Util.possession(profile.profile.username) : null,
            profile.progressType == "YEARLY" ? "Yearly"
            : profile.progressType == "MONTHLY" ? "Monthly"
            : profile.progressType == "WEEKLY" ? "Weekly"
            : null,
            profile.stat === "STARS" ? "Stars"
            : profile.stat === "DIAMONDS" ? "Diamonds"
            : profile.stat === "SCOINS" ? "S-Coins"
            : profile.stat === "UCOINS" ? "U-Coins"
            : profile.stat === "DEMONS" ? "Demons"
            : profile.stat === "CP" ? "CP"
            : profile.stat === "NET" ? "Net Score"
            : null,
            "Progression"
        ].filter(v => v !== null).join(" ")
    }

    /**
     * @param {UserULProfile} profile 
     */

    lineProfileToParamObject(profile) {
        let points = this.lineProfileToPoints(profile);
        let pMin = Math.min(...points.map(entry => entry.value));
        let pMax = Math.max(...points.map(entry => entry.value));
        return {

            type: "line",

            data: {

                labels: points.map(p => p.label),

                datasets: [
                    points.reduce((res, p) => {
                        res.data.push(p.value);
                        return res;
                    }, {
                        data: [],
                        pointStyle: [ "STARS", "CP", "NET" ].includes(profile.stat)
                            ? "rectRounded"
                        : [ "DIAMONDS" ].includes(profile.stat)
                            ? "rectRot"
                        : "circle",
                        pointBackgroundColor: `#${this.client.actions.ColorPreset.searchFaulty(profile.stat || "UL")}`,
                        pointRadius: [ "DIAMONDS" ].includes(profile.stat)
                            ? 12
                        : 10,
                        label: this.lineProfileToTitle(profile),
                        borderColor: `#${this.client.actions.ColorPreset.searchFaulty(profile.profile.pColor || "UL")}`,
                        backgroundColor: "rgba(255,99,132,0)",
                    })
                ]

            },

            options: {

                title: {
                    fontSize: 16,
                    display: true,
                    text: this.lineProfileToTitle(profile)
                },
    
                legend: {
                    display: false
                },
    
                scales: {

                    xAxes: [
                        {
                            scaleLabel: {
                                display: profile.progressType == "WEEKLY" && points.length > 10 ? true : false,
                                labelString: profile.progressType == "YEARLY" ? "Year"
                                : profile.progressType == "MONTHLY" ? "Month"
                                : profile.progressType == "WEEKLY" ? "Week"
                                : "",
                                padding: 0,
                                fontSize: 12
                            },

                            ticks: {
                                fontSize: 12
                            }
                        }
                    ],
    
                    yAxes: [
                        {
                            scaleLabel: {
                                display: false,
                                labelString: profile.stat.toLowerCase(),
                                fontSize: 12
                            },
        
                            ticks: {
                                // Hide x-label if specific dates are displayed
                                stepSize: pMin === pMax || (profile.stat === "CP" && pMax-pMin <= 10)
                                    ?
                                        profile.stat === "SCOINS"
                                        ? 25
                                        : 1
                                    : null,
                                min: pMin === pMax ? 0 : pMin,
                                max: pMin === pMax && pMax === 0
                                    ?
                                        profile.stat === "SCOINS"
                                        ? 150
                                        : 1
                                    : pMax,
                                fontSize: 12
                            },
        
                            stacked: true
                        }
                    ]
    
                }
    
            }

        }
    }

    /**
     * @param {UserULProfile} profile 
     */

    lineProfileToChart(profile) {
        return ChartJSImage()
            .chart(this.lineProfileToParamObject(profile))
            .backgroundColor("rgba(32, 32, 32, 0)")
            .width(StatProgressChartAction.CHART_WIDTH)
            .height(StatProgressChartAction.CHART_HEIGHT);
    }

    /**
     * @param {UserULProfile} profile 
     */

    async lineProfileCreate(profile) {

        let pcolorRGB = Util.hexToColorArray(this.client.actions.ColorPreset.searchFaulty(profile.profile.pColor || "UL"));

        let chart = this.lineProfileToChart(profile);
        await chart.toFile(path.resolve(__dirname, StatProgressChartAction.PATH_CHART));

        chart = await Jimp.read(path.resolve(__dirname, StatProgressChartAction.PATH_CHART));
        chart.resize(StatProgressChartAction.CHART_WIDTH_FINAL - 15, StatProgressChartAction.CHART_HEIGHT_FINAL - 8);

        let canvas;

        if (profile.profile.bgprog && profile.profile.bgprog.startsWith("http")) {
            try {
                canvas = await Jimp.read(profile.profile.bgprog);
            } catch {}
        }
        
        if (!canvas) {
            canvas = await Jimp.read(
                path.resolve(
                    __dirname,
                    profile.profile.bgprog == "CP"
                        ? StatProgressChartAction.CHART_CP
                    : profile.profile.bgprog == "SG"
                        ? StatProgressChartAction.CHART_SG
                    : StatProgressChartAction.CHART_UL
                )
            );
            canvas.brightness(-.35);
        }
        
        canvas.resize(StatProgressChartAction.CHART_WIDTH_FINAL,  StatProgressChartAction.CHART_HEIGHT_FINAL);

        let border = await Jimp.read(path.resolve(__dirname, StatProgressChartAction.CHART_BORDER));
        border.resize(StatProgressChartAction.CHART_WIDTH_FINAL,  StatProgressChartAction.CHART_HEIGHT_FINAL);
        border.brightness(-1);
        border.color([
            { apply: 'red', params: [pcolorRGB[0]] },
            { apply: 'green', params: [pcolorRGB[1]] },
            { apply: 'blue', params: [pcolorRGB[2]] }
        ]);

        canvas.composite(chart, 5, 0);
        canvas.composite(border, 0, 0);
        await canvas.writeAsync(path.resolve(__dirname, StatProgressChartAction.PATH_CHART_FINAL));

        return await fs.readFileSync(path.resolve(__dirname, StatProgressChartAction.PATH_CHART_FINAL));

    }

}

module.exports = StatProgressChartAction;
