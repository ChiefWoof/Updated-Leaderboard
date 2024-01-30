"use strict";

const StorageFile = require("./StorageFile");

const excel = require("exceljs");
const excelXLSX = excel.Workbook.prototype.xlsx

/**
 * @description A general class for dataset "data" file storage. Assumes only option is encoding utf-8 at all times
 */

class StorageFileDatasetActions extends StorageFile {}

/**
 * Converts to a dataset from common row/col separation character(s) technique.
 * By default, rowSeparator is newline.
 * A colSeparator must always be provided
 * @param {string} str 
 * @param {Object} options
 * @param {Object} [options.colSeparator] column separator
 * @param {Object} [options.rowSeparator = "\n"] row separator
 * @returns 
 */

StorageFileDatasetActions.datasetFromStrSeparators = (str, {
    colSeparator,
    rowSeparator = "\n"
}) => {
    return (colSeparator === rowSeparator
    ? str.match(new RegExp(`[^${rowSeparator}]+${rowSeparator}([^${rowSeparator}]+)?`, "g"))
    : str.split(rowSeparator))
    .map(row => row.split(colSeparator));
}

/**
 * Converts a dataset to a CSV string
 * @param {*[][]} data
 * @returns {string}
 */

StorageFileDatasetActions.datasetToCSV = (data) => {
    return data.map(row => row.toString(",")).join("\n");
}

/**
 * Converts a dataset to a TSV string
 * @param {*[][]} data
 * @returns {string}
 */

StorageFileDatasetActions.datasetToTSV = (data) => {
    return data.map(row => row.toString("\t")).join("\n");
}

/**
 * Converts a dataset to a XLSX reference
 * @param {*[][]} data
 * @returns {excelXLSX}
 */

StorageFileDatasetActions.datasetToExcel = (data) => {
    let workbook = new excel.Workbook();
    workbook
    .addWorksheet("data")
    .addRows(data);
    return workbook.xlsx;
}

/**
 * Converts a dataset to an Object based set.
 * By default, assumes first row is headers row.
 * Accepts custom headers by inputing an array into it.
 * When a column exceeds header boundaries, switches to 1-based index headers while exceeded
 * @param {*[][]} data
 * @param {Object} options
 * @param {"ROW 0"|"0-INDEX BASED"|"1-INDEX BASED"} [options.headers = "ROW 0"]
 * @returns {Object[]}
 */

StorageFileDatasetActions.datasetToObjectset = (data, { headers = "ROW 0" }={}) => {
    let headerIOffset = headers === "0-INDEX BASED" ? 0 : 1;
    if (headers === "ROW 0") {
        headers = data[0];
        data = data.slice(1);
    } else if (!Array.isArray(headers)) {
        headers = [];
    }
    return data.map(row => {
        return Object.fromEntries(
            row.map((value, i) => {
                return [ headers[i] || (i + headerIOffset), value ];
            })
        );
    });
}

module.exports = StorageFileDatasetActions;