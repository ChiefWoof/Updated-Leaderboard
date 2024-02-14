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
 * @returns {string[][]}
 */

StorageFileDatasetActions.datasetFromStrSeparators = (str, {
    colSeparator,
    rowSeparator = "\n"
}) => {
    return typeof str === "string" && str
    ? (colSeparator === rowSeparator
        ? str.match(new RegExp(`[^${rowSeparator}]+${rowSeparator}([^${rowSeparator}]+)?`, "g"))
        : str.split(rowSeparator))
        .map(row => row.split(colSeparator))
    : [];
}

/**
 * Converts a dataset to a CSV string
 * @param {*[][]} data
 * @returns {string}
 */

StorageFileDatasetActions.datasetToCSV = (data) => {
    return data.map(row => row.join(",")).join("\n");
}

/**
 * Converts a dataset to a TSV string
 * @param {*[][]} data
 * @returns {string}
 */

StorageFileDatasetActions.datasetToTSV = (data) => {
    return data.map(row => row.join("\t")).join("\n");
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
 * When a column exceeds header boundaries or is null-like, switches to 1-based index headers while exceeded
 * @param {*[][]} data
 * @param {Object} options
 * @param {"ROW 0"|"0-INDEX BASED"|"1-INDEX BASED"} [options.headers = "ROW 0"]
 * @returns {Object[]}
 */

StorageFileDatasetActions.datasetToObjectSet = (data, { headers = "ROW 0" }={}) => {
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

/**
 * Converts an object set to a dataset.
 * By default, headers are keys of first entry.
 * When a column exceeds headerCustom boundaries or if value is null-like, switches to headers.
 * When a column exceeds header boundaries or is null-like, switches to 1-based index headers while exceeded
 * @param {Object[]} data
 * @param {Object} options
 * @param {(string|number)[]} options.headers headers to grab from object
 * @param {(string|number)[]} [options.headersCustom = []] custom headers
 * @param {boolean} [options.includeHeaders = false] whether to include headers in the result
 * @returns {Object[]}
 */

StorageFileDatasetActions.objectSetToDataset = (data, {
    headers = Object.keys(data?.[0] || {}),
    headersCustom = [],
    includeHeaders = true
}={}) => {
    let entries = data.map(entry => headers.map(h => entry[h]));
    return includeHeaders
    ? [ headers.map((k, i) => headersCustom[i] || headers[i] || (i + 1)), ...entries]
    : entries;
}

/**
 * Converts an object set to a row-sorted, using Binary Sort, TSV string.
 * Assumes pointerKey value is a number.
 * A pointerKey value must always be provided
 * @param {Object} options
 * @param {(entry: *, i: number) => number} [options.entryToValue] retrieves the sorting value from an entry
 * @param {"ASCENDING"|"DESCENDING"} [options.order = "ASCENDING"]
 * @param {*[]} [options.starter = []] the original data (assumes already sorted appropriately)
 * @param {...*} entries
 * @returns {Object[]}
 */

StorageFileDatasetActions.binarySort = ({
    order = "ASCENDING",
    entryToValue = (entry, i) => entry,
    starter = []
}, ...entries) => {

    entries.unshift(...starter);
    
    eval(`
    for (let i = starter.length || 1; i < entries.length; i++) {
        let value = entryToValue(entries[i], i)
        let iInsert = -1;
        if (entryToValue(entries[0]) ${order === "DESCENDING" ? "<" : ">"}= value) iInsert = 0; // Places equal least or lesser values to beginning
        else if (entryToValue(entries[i - 1]) ${order === "DESCENDING" ? ">" : "<"} value) continue; // Adds equal greatest or greater values to end of sorted
        else {

            // Performs binary search to locate placement index;
            let min = 0;
            let max = i - 1;
            while (min <= max) {
                iInsert = Math.floor((min + max) / 2);
                if (entryToValue(entries[iInsert]) === value) break;
                else if (entryToValue(entries[iInsert]) < value) ${order === "DESCENDING" ? "max = iInsert - 1" : "min = iInsert + 1"};
                else if (entryToValue(entries[iInsert]) > value) ${order === "DESCENDING" ? "min = iInsert + 1" : "max = iInsert - 1"};
            }

            ${order === "DESCENDING"
            ? "if (entryToValue(entries[iInsert]) > value) iInsert++;"
            : "if (entryToValue(entries[iInsert]) < value) iInsert++;"}

        }

        // Updates placements
        let temp = entries[i];
        entries.splice(i, 1);
        entries.splice(iInsert, 0, temp);

    }
    `);

    return entries;
}

module.exports = StorageFileDatasetActions;
