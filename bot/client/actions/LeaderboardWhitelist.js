"use strict";

const Action = require("./Action");

class LeaderboardWhitelistAction extends Action {

    /**
     * @returns {}
     */

    async loadFileDetails() {
        return await this.client.actions.StorageFiles.loadFileDetail(LeaderboardWhitelistAction.STORAGE_FILE);
    }

    /**
     * @returns {}
     */

    async loadUsersFromFile() {
        let data = await this.client.actions.StorageFiles.loadFile(LeaderboardWhitelistAction.STORAGE_FILE);
        data = this.client.actions.StorageFiles.datasetFromTXT(data, { colSeparator: "\t", rowSeparator: "\n" });
        data = this.client.actions.StorageFiles.datasetToObjset(data, { headers: 0 });
        return data.map(u => {
            return {
                rankGlobal: Number(u.Rank),
                accountID: BigInt(u.AccountID),
                username: u.Username,
                stars: Number(u.Stars),
                diamonds: Number(u.Diamonds),
                scoins: Number(u.Coins),
                ucoins: Number(u.UserCoins),
                demons: Number(u.Demons)
            }
        });
    }

    /**
     * @returns {BigInt[]}
     */

    async loadAccountIDs() {
        return  (await this.loadUsersFromFile()).map(u => {
            return u.accountID;
        });
    }

    async loadAccountIDsUnverifiedFromFile() {
        let accountIDs = await this.loadAccountIDs();
        return accountIDs.reduce((res, accountID) => {

            let search = this.client.usersUL.searchAccountID(accountID);
            if (!(search && search.flags.verified)) res.push(accountID);

            return res;

        }, []);
    }

    async loadRecentDiscordFile() {
        
        let msg = await this.client.actions.StorageFiles.getRecentDisMessageWithFiles("926910977730052106");
        console.log(msg);

    }

}

LeaderboardWhitelistAction.STORAGE_FILE = "leaderboardWhitelist.txt";

module.exports = LeaderboardWhitelistAction;
