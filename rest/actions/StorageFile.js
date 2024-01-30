"use strict";

const Actions = require("./Actions");

const fs = require("fs");
const path = require("path");

/**
 * @description shortcut for fs options to simplify coding
 */
const ENCODING_SHORTCUT = { encoding: "utf-8" };

/**
 * @description A general class for "data" file storage. Assumes only option is encoding utf-8 at all times
 */

class StorageFileActions extends Actions {}

/**
 * Resolves a file path in respect to the "data" directory
 * @param {?string} filePath 
 * @returns 
 */

StorageFileActions.pathResolve = (filePath) => {
    return path.resolve(__dirname, `../../data/${filePath || ""}`);
} 

/**
 * Retrieves contents of a file
 * @param {?string} filePath
 */

StorageFileActions.writeFile = async (filePath, content) => {
    return await fs.writeFileSync(this.pathResolve(filePath), content, ENCODING_SHORTCUT);
}

/**
 * Retrieves all file and folder names within a directory
 * @param {?string} filePath 
 * @returns {Promise<string[]>}
 */

StorageFileActions.readdir = async (filePath) => {
    return await fs.readdirSync(StorageFileActions.pathResolve(filePath), ENCODING_SHORTCUT);
}

/**
 * Retrieves contents of a file
 * @param {?string} filePath 
 * @returns {Promise<string>}
 */

StorageFileActions.readFile = async (filePath) => {
    return await fs.readFileSync(StorageFileActions.pathResolve(filePath), ENCODING_SHORTCUT);
}
    
/**
 * Checks whether each file exists within a directory
 * @param {string} filePath 
 * @returns {Promise<boolean[]>}
 */

StorageFileActions.hasFiles = async (...filePaths) => {
    return await Promise.all(filePaths.map(async filePath => {
        return await fs.existsSync(StorageFileActions.pathResolve(filePath));
    }));
}
    
/**
 * Determines whether every file exists within a directory
 * @param {string} filePath 
 * @returns {Promise<boolean[]>}
 */

StorageFileActions.hasFilesAll = async (...filePaths) => {
    for await (let filePath of filePaths) {
        if (!(await fs.existsSync(StorageFileActions.pathResolve(filePath))))
            return false;
    }
    return true;
}
    
/**
 * Reads the contents of every file
 * @param {string} filePath 
 * @returns {Promise<string[]>}
 */

StorageFileActions.readFiles = async (...filePaths) => {
    return await Promise.all(filePaths.map(async filePath => {
        return await StorageFileActions.readFile(filePath);
    }));
}

module.exports = StorageFileActions;