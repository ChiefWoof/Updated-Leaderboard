"use strict";

const UserUL = require("../structures/UserUL");

/**
 * @extends {Map<string, UserUL>}
 */

class UsersULManager extends Map {

    /**
     * @returns {UserUL[]}
     */

    get users() { return [...this.values()]; }

    /**
     * @returns {UserUL[]}
     */

    get usersVerified() { return this.users.filter(user => user.flags.verified); }

    /**
     * @returns {UserUL[]}
     */

    get usersStaff() { return this.users.filter(user => user.flags.staffHelper); }

    /**
     * @returns {UserUL[]}
     */

    get usersGDMods() { return this.users.filter(user => user.flags.isGDMod); }

    /**
     * @returns {UserUL[]}
     */

    get usersLeaderboardTeam() { return this.users.filter(user => user.flags.leaderboardTeam); }

    /**
     * @param {BigInt|string|number} accountID
     * @returns {UserUL}
     */

    searchAccountID(accountID) { return this.users.find(u => `${u.accountID}` === `${accountID}`); }

    /**
     * @param {BigInt|string|number} accountID
     * @returns {UserUL}
     */

    searchDisID(disID) { return this.users.find(u => `${u.disID}` === `${disID}`); }

    /**
     * @param {...UserUL} users 
     */

    add(...users) {
        users.forEach((user, i) => {
            if (!user.hasULID)
                throw new Error(`ulID is invalid for user at index ${i}`);
            this.set(`${user.ulID}`, user);
        });
    }

    toJSON() {
        return [...this.entries()].reduce((res, [key, value]) => {
            res[key] = value.toJSON();
            return res;
        }, {});
    }

}

module.exports = UsersULManager;