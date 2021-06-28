"use strict";

const BaseDatabase = require("./Base");

class Base extends BaseDatabase {

    static DIRECTORY = `${this.DIRECTORY}/levels`;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

}

module.exports = Base;