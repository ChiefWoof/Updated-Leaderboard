"use strict";

const Action = require("./Action");
const UserUL = require("../../src/structures/UserUL");
const Leaderboard = require("../../src/structures/Leaderboard");

class LeaderboardAction extends Action {


    /**
     * @param {(user: UserUL) => boolean} condition 
     * @returns {UserUL[]}
     */

    getUserCache(condition=() => true) {
        return this.client.usersUL.usersVerified.filter(condition);
    }

    /**
     * @param {Leaderboard} ldbr
     */

    setUserPositionValues(ldbr) {
        ldbr.cache.forEach(u => this.setUserPositionValue(ldbr, u));
        return ldbr;
    }

    /**
     * @param {Leaderboard} ldbr 
     * @param {UserUL} user 
     */

    setUserPositionValue(ldbr, user) {

        // GENERAL LEADERBOARD STAT POSITION VALUE
        switch (ldbr.statType) {
            default: { user.positionValue = user.stars; break; }
            case "DIAMONDS": { user.positionValue = user.diamonds; break; }
            case "SCOINS": { user.positionValue = user.scoins; break; }
            case "UCOINS": { user.positionValue = user.ucoins; break; }
            case "DEMONS": { user.positionValue = user.demons; break; }
            case "CP": { user.positionValue = user.cp; break; }
            case "ACCOUNT_ID": { user.positionValue = user.accountID; break; }
            case "PLAYER_ID": { user.positionValue = user.playerID; break; }
        }

        return user;
    }

    /**
     * @description Constructs a client-Leaderboard structure
     * @param {Leaderboard} [base = new Leaderboard()]
     * @returns {Leaderboard} 
     */

    construct(base = new Leaderboard()) {

        base.resetCache = async (ldbr) => {
            ldbr.cache = [
                ...this.getUserCache()
                .map(u => (new UserUL()).fromJSON(u.toJSON()))
            ]
            ldbr.sort();
        }

        return base;

    }

}

module.exports = LeaderboardAction;
