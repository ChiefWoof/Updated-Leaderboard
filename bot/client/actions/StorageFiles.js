"use strict";

const Action = require("./Action");
const fs = require("fs");
const path = require("path");

const {
    Message
} = require("discord.js");

const excel = require("exceljs");

class StorageFilesAction extends Action {

    // GENERAL LOADING & SAVING .......................................

    async readdir(dirPath) {
        return await fs.readdirSync(
            path.resolve(__dirname, `../storage/${dirPath}`),
            {
                encoding: "utf-8"
            }
        );
    }

    async hasFiles(...fileNames) {
        return Promise.all(fileNames.reduce((res, fileName) => {
            res.push(
                new Promise(async (res) => {
                    try {
                        await fs.readFileSync(
                            path.resolve(__dirname, `../storage/${fileName}`),
                            {
                                encoding: "utf-8"
                            }
                        )
                        res(true);
                    } catch {
                        res(false);
                    }
                })
            );

            return res;
        }, []));
    }

    async hasFile(fileName) { return (await this.hasFiles(fileName))[0]; }

    async loadFiles(...fileNames) {
        return Promise.all(fileNames.reduce((res, fileName) => {
            res.push(
                new Promise(async (res) => {
                    res(await fs.readFileSync(
                        path.resolve(__dirname, `../storage/${fileName}`),
                        {
                            encoding: "utf-8"
                        }
                    ));
                })
            );

            return res;
        }, []));
    }

    async loadFileDetails(...fileNames) {
        return Promise.all(fileNames.reduce((res, fileName) => {
            res.push(
                new Promise(async (res) => {
                    res(await fs.statSync(
                        path.resolve(__dirname, `../storage/${fileName}`),
                        {
                            encoding: "utf-8"
                        },
                    ));
                })
            );

            return res;
        }, []));
    }

    async loadFile(fileName) { return (await this.loadFiles(fileName))[0]; }

    async loadFileAsObjset(fileName) {
        return this.objsetFromTXT(await this.loadFile(fileName));
    }

    async loadFileDetail(fileName) { return (await this.loadFileDetails(fileName))[0]; }

    async saveFile(fileName, data) {
        await fs.writeFileSync(
            path.resolve(__dirname, `../storage/${fileName}`),
            data,
            {
                encoding: "utf-8"
            }
        )
    }


    // DISCORD SPECIFIC .......................................

    /**
     * @param {BigInt|string|number} channelID
     * @returns {Message}
     */

    async getRecentDisMessage(channelID) {
        let channel = await this.client.clientBase.channels.fetch(channelID);
        let msgCache = await channel.messages.fetch({ limit: 1 });
        return msgCache && msgCache.first()
            ? msgCache.first()
        : null;
    }

    /**
     * @param {BigInt|string|number} channelID
     * @returns {Message}
     */

    async getRecentDisMessageWithFiles(channelID, {
        minCount = 1,
        maxCount = Infinity
    }={}) {
        let channel = await this.client.clientBase.channels.fetch(channelID);
        let msgCache = await channel.messages.fetch({ limit: 100 });
        let msg = msgCache.first();
        console.log(msg.attachments);
        console.log(msg.files);
    }


    // GENERAL DATASETS .......................................

    datasetFromTXT(str, {
        colSeparator = undefined,
        rowSeparator = "\n"
    }={}) {

        colSeparator = colSeparator == undefined && str
        ? /\t/.test(str)
            ? "\t"
            : ","
        : colSeparator;

        return str
            ? str
                .replace(/\r/g, "")
                .split(rowSeparator)
                .map(r => r.split(colSeparator))
            : [];
    }

    datasetToTXT(data, {
        colSeparator = ",",
        rowSeparator = "\n"
    }={}) {
        return data.map(r => r.join(colSeparator)).join(rowSeparator);
    }

    datasetToExcel(data) {
        let workbook = new excel.Workbook();
        workbook.addWorksheet("data");
        workbook.getWorksheet("data")
        .addRows(data);
        return workbook.xlsx;
    }

    datasetToObjset(data, {
        headers = 0
    }={}) {

        let tempHeadersIndex = undefined;
        if (/\d{1,}/.test(headers)) tempHeadersIndex = Number(headers);

        headers = Array.isArray(headers) ? headers
        : /\d{1,}/.test(headers) && data.length > 0 && headers in data ? data[headers]
        : headers;

        return data.reduce((res, value, i) => {
            if (i == tempHeadersIndex) return res;
            res.push(value.reduce((obj, objV, objI) => {
                obj[headers[objI] || objI] = objV;
                return obj;
            }, {}))
            return res;
        }, []);
        
    }

    objsetFromTXT(data, {
        colSeparator = undefined,
        rowSeparator = "\n",
        headers = 0
    }={}) {
        return this.datasetToObjset(
            this.datasetFromTXT(
                data,
                { colSeparator, rowSeparator }
            ),
            { headers }
        );
    }

}

module.exports = StorageFilesAction;