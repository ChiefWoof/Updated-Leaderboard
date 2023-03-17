"use strict";

const Action = require("./Action");

const UsersULManager = require("../../src/managers/UsersULManager");
const StatProgressManager = require("../../src/managers/StatProgressManager");

const UserUL = require("../../src/structures/UserUL");
const UserULStatProgressEntry = require("../../src/structures/UserULStatProgressEntry");

const {
    rest: {
        api: {
            database: {
                getGJUserInfo20
            }
        }
    }
} = require("../../../gd-api/");

class UserULAction extends Action {

    get manager() { return this.client.usersUL; }

    /**
     * @param {UsersULManager} manager 
     */

    managerToDataset(manager=this.manager) {
        let headers = Object.keys(new UserUL()).filter(h => ![
            "progress",
            "position",
            "positionValue"
        ].includes(h));
        return [
            headers,
            ...manager.users.map(u => {
                let obj = u.toJSON();
                return headers.reduce((res, header) => {
                    res.push(obj[header]);
                    return res;
                }, []);
            })
        ]
    }

    /**
     * @param {StatProgressManager} manager 
     */

    statProgressManagerToDataset(manager) {
        let headers = [ "accountID", "timestampStatsRefreshed", "stars", "diamonds", "scoins", "ucoins", "demons", "cp" ];
        return [
            headers,
            ...manager.map(u => {
                let obj = u.toJSON();
                return headers.reduce((res, header) => {
                    res.push(obj[header]);
                    return res;
                }, []);
            })
        ]
    }

    /**
     * @param {UsersULManager} manager 
     */

    managerToTXT(manager=this.manager, {
        colSeparator = "\t",
        rowSeparator = "\n"
    }={}) {
        return this.client.actions.StorageFiles.datasetToTXT(
            this.managerToDataset(manager),
            {
                colSeparator,
                rowSeparator
            }
        );
    }

    /**
     * @param {StatProgressManager} manager 
     */

    statProgressManagerToTXT(manager, {
        colSeparator = "\t",
        rowSeparator = "\n"
    }={}) {
        return this.client.actions.StorageFiles.datasetToTXT(
            this.statProgressManagerToDataset(manager),
            {
                colSeparator,
                rowSeparator
            }
        );
    }

    /**
     * @param {UsersULManager} manager 
     */

    async saveByManager(manager=this.manager, {
        colSeparator = "\t",
        rowSeparator = "\n"
    }={}) {
        let txt = this.managerToTXT(manager, { colSeparator, rowSeparator });
        return await this.client.actions.StorageFiles.saveFile(UserULAction.USERS_STORAGE_FILE, txt);
    }

    /**
     * @param {StatProgressManager} manager 
     */

    async saveByStatProgressManager(manager, {
        colSeparator = "\t",
        rowSeparator = "\n",
        accountID = manager.length > 0 ? manager[0].accountID : null
    }={}) {
        if (accountID === null)
            throw new Error("No accountID specified");
        let txt = this.statProgressManagerToTXT(manager, { colSeparator, rowSeparator });
        return await this.client.actions.StorageFiles.saveFile(UserULAction.STAT_PROGRESS_STORAGE_FILE(accountID), txt);
    }

    /**
     * @returns {BigInt[]}
     */

    async loadStoredStatProgressAccountIDs() {
        let files = await this.client.actions.StorageFiles.readdir("gdstats");
        return files.reduce((res, f) => {
            let accountID = f.match(/^\d{1,}/g);
            if (accountID) res.push(BigInt(accountID[0]));
            return res;
        }, []);
    }

    /**
     * @returns {UsersULManager} manager 
     */

    async loadManagerFromFile({
        updateClient = true
    }={}) {
        
        let data = await this.client.actions.StorageFiles.loadFile(UserULAction.USERS_STORAGE_FILE);
        data = this.client.actions.StorageFiles.datasetFromTXT(data, { colSeparator: "\t", rowSeparator: "\n" });
        data = this.client.actions.StorageFiles.datasetToObjset(data, { headers: 0 });

        let m = new UsersULManager();
        m.add(...data.map(u => this.construct(new UserUL().fromJSON(u))));
       
        if (updateClient)  this.client.usersUL = m;

        return m;

    }

    /**
     * @returns {UsersULManager} manager 
     */

    async loadUserOverridesFromFile({
        updateClient = true
    }={}) {
        
        let data = await this.client.actions.StorageFiles.loadFile(UserULAction.USER_OVERRIDES_FILE);
        data = this.client.actions.StorageFiles.datasetFromTXT(data, { colSeparator: "\t", rowSeparator: "\n" });
        data = this.client.actions.StorageFiles.datasetToObjset(data, { headers: 0 });
        data = data.reduce((res, entry) => {
            res[entry.ulID] = {
                ulID: BigInt(entry.ulID),
                flagAdditions: Number(entry.flagAdditions)
            };
            return res;
        }, {});

        if (updateClient) {
            for (let [ulID, { flagAdditions }] of Object.entries(data)) {
                let u = this.client.usersUL.get(`${ulID}`);
                if (u) u.flags.add(flagAdditions);
            }
        };

        return data;

    }

    /**
     * @param {BigInt|string|number} accountID 
     * @returns {StatProgressManager}
     */

    async loadManagerStatProgressFromFile(accountID) {
        if (await await this.client.actions.StorageFiles.hasFile(UserULAction.STAT_PROGRESS_STORAGE_FILE(accountID))) {
            let data = await this.client.actions.StorageFiles.loadFile(UserULAction.STAT_PROGRESS_STORAGE_FILE(accountID));
            data = this.client.actions.StorageFiles.datasetFromTXT(data, { colSeparator: "\t", rowSeparator: "\n" });
            data = this.client.actions.StorageFiles.datasetToObjset(data, { headers: 0 });
            let progress = new StatProgressManager();
            progress.add(...data.map(u => new UserULStatProgressEntry().fromJSON(u)));
            return progress;
        }
        return new StatProgressManager();
    }

    /**
     * @param {BigInt|string|number} accountID 
     * @returns {StatProgressManager}
     */

    async loadManagerStatProgressFromFiles(...accountID) {
        let m = new StatProgressManager();
        for await (let id of accountID)
            m.add(...(await this.loadManagerStatProgressFromFile(id)));
        return m;
    }

    /**
     * @description Constructs a client-UserUL structure
     * @param {UserUL} [base = new UserUL()]
     * @returns {UserUL} 
     */

    construct(base = new UserUL()) {

        base.load = async (user) => {
            if (!user)
                throw new Error("Must input user into \"load\" function");
            let u = this.client.usersUL.get(`${user.ulID}`);
            if (u) {
                user.fromJSON(u.toJSON());
                return true;
            }
            return false;
        }

        base.loadUserInfoGD = async (user) => {
            if (!user)
                throw new Error("Must input user into \"load\" function");
            
            let req = new getGJUserInfo20();

            req.targetAccountID = user.accountID;
            req.secret = req._secrets.GENERAL;

            let res = await req.request();
            let resType = req.responseType(res);

            switch (resType) {
                case "OK": {
                    let uRes = req.parseOK(res);
                    user.updateUsername(uRes.username);
                    user.playerID = uRes.playerID;
                    user.stars = uRes.stars;
                    user.diamonds = uRes.diamonds;
                    user.scoins = uRes.scoins;
                    user.ucoins = uRes.ucoins;
                    user.demons = uRes.demons;
                    user.cp = uRes.cp;
                    user.flags.isGDMod = uRes.flags.mod;
                    user.flags.isGDModElder = uRes.flags.modElder;
                    user.cubeID = uRes.cubeID;
                    user.shipID = uRes.shipID;
                    user.ballID = uRes.ballID;
                    user.ufoID = uRes.ufoID;
                    user.dartID = uRes.dartID;
                    user.robotID = uRes.robotID;
                    user.spiderID = uRes.spiderID;
                    user.iconColor1ID = uRes.color1ID;
                    user.iconColor2ID = uRes.color2ID;
                    user.glowID = uRes.glowID;
                    user.youtube = uRes.youtube;
                    user.twitter = uRes.twitter;
                    user.twitch = uRes.twitch;
                    user.rankGlobal = uRes.rankGlobal;
                    user.timestampStatsRefreshed = Date.now();
                    return true;
                }
            }

            return false;
            
        }

        base.add = async (user) => {
            if (!user)
                throw new Error("Must input user into \"save\" function");
            this.client.usersUL.add(user);
        }

        base.save = async (user) => {
            base.add(user);
            await this.saveByManager(this.client.usersUL);
        }

        base.loadProgress = async (user) => {
            if (!user)
                throw new Error("Must input user into \"loadProgress\" function");
            user.progress = await this.loadManagerStatProgressFromFile(user.accountID);
        }

        base.saveProgress = async (user) => {
            if (!user)
                throw new Error("Must input user into \"saveProgress\" function");
            await this.saveByStatProgressManager(user.progress);
        }

        return base;

    }

}

UserULAction.USER_OVERRIDES_FILE = "userOverrides.txt";
UserULAction.USERS_STORAGE_FILE = "usersUL.txt";
UserULAction.STAT_PROGRESS_STORAGE_FILE = (accountID) => `gdstats/${accountID}.txt`;

module.exports = UserULAction;