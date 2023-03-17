"use strict";

const Action = require("./Action");

class LeaderboardWhitelistAction extends Action {

    async loadRecentDiscordFile() {
        
        let msg = await this.client.actions.StorageFiles.getRecentDisMessageWithFiles("926910977730052106");
        console.log(msg);

    }

}

module.exports = LeaderboardWhitelistAction;