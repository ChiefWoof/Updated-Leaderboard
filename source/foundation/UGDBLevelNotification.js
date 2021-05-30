"use strict";

const Base = require("./Base");
const Collection = require("../util/Collection");
const { GD_CONFIGURATIONS } = require("../util/Constants");
const PROPERTY_LIST = (require("../properties/foundation").UGDBLevelNotification);
const {
    difficultyFaces: { EASY, NORMAL, HARD, HARDER, INSANE, AUTO },
    difficultyDemon: {
        EASY: DEMON_EASY,
        MEDIUM: DEMON_MEDIUM,
        HARD: DEMON_HARD,
        INSANE: DEMON_INSANE,
        EXTREME: DEMON_EXTREME
    },
    timelyDailyThreshold: dThreshold,
    timelyWeeklyThreshold: wkThreshold
} = (require("../util/Constants").GD_CONFIGURATIONS.levels);

/**
 * @description Object for the UltimateGDBot Discord bot's level notifications
 * @extends {Base}
 */

class UGDBLevelNotification extends Base {

    static IMAGE_DEFAULT = "https://i.imgur.com/T3YfK5d.png";
    static IMAGES = new Collection()
        .set("AUTO_1", {
            rates: [ null, 'https://i.imgur.com/Fws2s3b.png', 'https://i.imgur.com/DplWGja.png', 'https://i.imgur.com/uzYx91v.png'],
            isAuto: true,
            difficultyFace: AUTO,
            stars: 1
        })
        .set("EASY_2", {
            rates: [ 'https://i.imgur.com/kWHZa5d.png', 'https://i.imgur.com/yG1U6RP.png', 'https://i.imgur.com/Kyjevk1.png', 'https://i.imgur.com/wl575nH.png' ],
            difficultyFace: EASY,
            stars: 2
        })
        .set("NORMAL_3", {
            rates: [ 'https://i.imgur.com/zURUazz.png', 'https://i.imgur.com/cx8tv98.png', 'https://i.imgur.com/1v3p1A8.png', 'https://i.imgur.com/S3PhlDs.png' ],
            difficultyFace: NORMAL,
            stars: 3
        })
        .set("HARD_4", {
            rates: [ 'https://i.imgur.com/YV4Afz2.png', 'https://i.imgur.com/XnUynAa.png', 'https://i.imgur.com/VW4yufj.png', 'https://i.imgur.com/toyo1Cd.png' ],
            difficultyFace: HARD,
            stars: 4
        })
        .set("HARD_5", {
            rates: [ 'https://i.imgur.com/YV4Afz2.png', 'https://i.imgur.com/Odx0nAT.png', 'https://i.imgur.com/HiyX5DD.png', 'https://i.imgur.com/W11eyJ9.png' ],
            difficultyFace: HARD,
            stars: 5
        })
        .set("HARDER_6", {
            rates: [ 'https://i.imgur.com/5lT74Xj.png', 'https://i.imgur.com/e499HCB.png', 'https://i.imgur.com/b7J4AXi.png', 'https://i.imgur.com/9x1ddvD.png' ],
            difficultyFace: HARDER,
            stars: 6
        })
        .set("HARDER_7", {
            rates: [ 'https://i.imgur.com/5lT74Xj.png', 'https://i.imgur.com/dJoUDUk.png', 'https://i.imgur.com/v50cZBZ.png', 'https://i.imgur.com/X3N5sm1.png' ],
            difficultyFace: HARDER,
            stars: 7
        })
        .set("INSANE_8", {
            rates: [ 'https://i.imgur.com/PeOvWuq.png', 'https://i.imgur.com/RDVJDaO.png', 'https://i.imgur.com/PYJ5T0x.png', 'https://i.imgur.com/N2pjW2W.png' ],
            difficultyFace: INSANE,
            stars: 8
        })
        .set("INSANE_9", {
            rates: [ 'https://i.imgur.com/PeOvWuq.png', 'https://i.imgur.com/5VA2qDb.png', 'https://i.imgur.com/byhPbgR.png', 'https://i.imgur.com/qmfey5L.png' ],
            difficultyFace: INSANE,
            stars: 9
        })
        .set("DEMON_EASY_10", {
            rates: [ null, 'https://i.imgur.com/0zM0VuT.png', 'https://i.imgur.com/fFq5lbN.png', 'https://i.imgur.com/wUGOGJ7.png', ],
            difficultyFace: EASY,
            difficultyDemon: DEMON_EASY,
            isDemon: true,
            stars: 10
        })
        .set("DEMON_MEDIUM_10", {
            rates: [ null,  'https://i.imgur.com/lvpPepA.png', 'https://i.imgur.com/kkAZv5O.png', 'https://i.imgur.com/ghco42q.png' ],
            difficultyFace: NORMAL,
            difficultyDemon: DEMON_MEDIUM,
            isDemon: true,
            stars: 10
        })
        .set("DEMON_HARD_10", {
            rates: [ null, 'https://i.imgur.com/jLBD7cO.png', 'https://i.imgur.com/7deDmTQ.png', 'https://i.imgur.com/xtrTl4r.png'],
            difficultyFace: HARD,
            difficultyDemon: DEMON_HARD,
            isDemon: true,
            stars: 10
        })
        .set("DEMON_INSANE_10", {
            rates: [ null, 'https://i.imgur.com/nLZqoyQ.png', 'https://i.imgur.com/RWqIpYL.png', 'https://i.imgur.com/2BWY8pO.png' ],
            difficultyFace: HARDER,
            difficultyDemon: DEMON_INSANE,
            isDemon: true,
            stars: 10
        })
        .set("DEMON_EXTREME_10", {
            rates: [ null, 'https://i.imgur.com/DEr1HoM.png', 'https://i.imgur.com/xat5en2.png', 'https://i.imgur.com/gFndlkZ.png' ],
            difficultyFace: INSANE,
            difficultyDemon: DEMON_EXTREME,
            isDemon: true,
            stars: 10
        });
    

    static PROPERTY_LIST = PROPERTY_LIST;

    constructor(data) {
        super(data);
        this.build(data);
    }

    isDaily() { return this.timelyID > dThreshold && this.timelyID < wkThreshold; }
    isWeekly() { return this.timelyID > wkThreshold; }

    isRatedEasy() { return !this.isAuto && !this.isDemon && this.difficultyFace === EASY; }
    isRatedNormal() { return !this.isAuto && !this.isDemon && this.difficultyFace === NORMAL; }
    isRatedHard() { return !this.isAuto && !this.isDemon && this.difficultyFace === HARD; }
    isRatedHarder() { return !this.isAuto && !this.isDemon && this.difficultyFace === HARDER; }
    isRatedInsane() { return !this.isAuto && !this.isDemon && this.difficultyFace === INSANE; }

    isRatedDemonEasy() { return this.isDemon && this.difficultyDemon === DEMON_EASY; }
    isRatedDemonMedium() { return this.isDemon && this.difficultyDemon === DEMON_MEDIUM; }
    isRatedDemonHard() { return this.isDemon && this.difficultyDemon === DEMON_HARD; }
    isRatedDemonInsane() { return this.isDemon && this.difficultyDemon === DEMON_INSANE; }
    isRatedDemonExtreme() { return this.isDemon && this.difficultyDemon === DEMON_EXTREME; }

    getImageProperties(imgLink) {
        let props = {
            isAuto: false,
            isDemon: false,
            epic: false,
            featured: false,
            stars: 0,
            difficultyFace: 0,
            difficultyDemon: 0
        };

        let k = this.getImageKey(imgLink);

        if (k) {
            props = Object.assign(props, this.constructor.IMAGES.get(k));
            let kvI = props.rates.findIndex(v => v == imgLink);
            if (kvI > 1) props.featured = true;
            if (kvI > 2) props.epic = true;
        }

        return props;
    }

    /**
     * @description Looks for the key for the image in "IMAGES"
     * @param {string} imgLink 
     * @returns {?string}
     */

    getImageKey(imgLink) {
        return typeof imgLink === "string"
        ? [...this.constructor.IMAGES.keys()].find(k => this.constructor.IMAGES.get(k).rates.includes(imgLink))
        || null
        : null;
    }

    /**
     * @description returns the altered id based on whether it's a weekly or daily
     */

    getTimelyID() {
        return this.timelyID > dThreshold
        ? this.isWeekly()
        ? this.timelyID - wkThreshold
        : this.timelyID
        : -1;
    }

    build(data) {
        if (Object.prototype.toString.call(data) === "[object Object]") {
            if ("embeds" in data) data = this.buildByDiscordMessage(data);
            else if ("footer" in data) data = this.buildByDiscordEmbed(data);
        }
        data = this.parse(data);

        /**
         * @description The blurb message connected to the notification
         * @default false
         * @type {?string}
         */

        this.blurb = "blurb" in data ? data.blurb : null;

        /**
         * @description Whether the level got unrated
         * @default false
         * @type {boolean}
         */

        this.unrated = "unrated" in data ? data.unrated : false;

        /**
         * @description The ID of the GD Level
         * @default 0n
         * @type {BigInt}
         */

        this.levelID = "levelID" in data ? data.levelID : 0n;

        /**
         * @description The ID of the GD Level
         * @default 0n
         * @type {BigInt}
         */

        this.timelyID = "timelyID" in data ? data.timelyID : 0n;

        /**
         * @description The name of the level
         * @type {?string}
         */

        this.name = "name" in data ? data.name : null;

        /**
         * @description The name of the level's publisher
         * @type {?string}
         */

        this.username = "username" in data ? data.username : null;

        /**
         * @description The stars
         * @default 0
         * @type {number}
         */

        this.stars = "stars" in data ? data.stars : 0;

        /**
         * @description The usercoins
         * @default 0
         * @type {number}
         */

        this.ucoins = "ucoins" in data ? data.ucoins : 0;

        /**
         * @description The level's download count
         * @default 0n
         * @type {BigInt}
         */

        this.downloads = "downloads" in data ? data.downloads : 0n;

        /**
         * @description The level's likes - dislikes count
         * @default 0n
         * @type {BigInt}
         */

        this.likes = "likes" in data ? data.likes : 0n;

        /**
         * @description The ID for the level's length
         * `0` - Tiny
         * `1` - Short
         * `2` - Medium
         * `3` - Long
         * `4` - XL
         * @default 0n
         * @type {BigInt}
         */

        this.length = "length" in data ? data.length : 0n;

        /**
         * @description The difficulty icon for non-demons. Works for demons as a side-effect of the voting system.
         * `0` - NA
         * `10` - Easy | Easy Demon
         * `20` - Normal | Medium Demon
         * `30` - Hard | Hard Demon
         * `40` - Harder | Insane Demon
         * `50` - Insane | Extreme Demon
         * @default 0n
         * @type {BigInt}
         */

        this.difficultyFace = "difficultyFace" in data ? data.difficultyFace : 0n;

        /**
         * @description The demon difficulty of the level
         * `3` - Easy
         * `4` - Medium
         * `0` - Hard
         * `5` - Insane
         * `6` - Extreme
         * @default 0n
         * @type {BigInt}
         */

        this.difficultyDemon = "difficultyDemon" in data ? data.difficultyDemon : 0n;

        /**
         * @description Whether the usercoins are verified
         * @default false
         * @type {boolean}
         */

        this.ucoinsVerified = "ucoinsVerified" in data ? data.ucoinsVerified : false;

        /**
         * @description Whether the level is rated demon
         * @default false
         * @type {boolean}
         */

        this.isDemon = "isDemon" in data ? data.isDemon : false;

        /**
         * @description Whether the level is rated auto
         * @default false
         * @type {boolean}
         */

        this.isAuto = "isAuto" in data ? data.isAuto : false;

        /**
         * @description Whether the level is epic
         * @default false
         * @type {boolean}
         */

        this.epic = "epic" in data ? data.epic : false;

        /**
         * @description Whether the level is featured
         * @default false
         * @type {boolean}
         */

        this.featured = "featured" in data ? data.featured : false;

        /**
         * @description Whether the level has a lot of objects
         * @default false
         * @type {boolean}
         */

        this.highObjects = "highObjects" in data ? data.highObjects : false;

        /**
         * @description Whether the level is a copy of another level that is/was online
         * @default false
         * @type {boolean}
         */

        this.isCopy = "isCopy" in data ? data.isCopy : false;

        /**
         * @description The name of the level's song
         * @type {?string}
         */

        this.songName = "songName" in data ? data.songName : null;

        /**
         * @description The name of the level's song's publisher
         * @type {?string}
         */

        this.songPublisherName = "songPublisherName" in data ? data.songPublisherName : null;

        return this;
    }

    buildByImageLink(imgLink) {
        return this.buildByImageProperties(this.getImageProperties(imgLink));
    }

    buildByImageProperties(props) {
        this.build(this);
        this.buildByObj(props);
        return this;
    }

    buildByDiscordMessage(msg) {
        this.build(this);

        if (Object.prototype.toString.call(msg) !== "[object Object]")
            return this;

        if ("content" in msg && msg.content)
            this.setBlurb(msg.content);

        if ("embeds" in msg && Array.isArray(msg.embeds) && msg.embeds.length > 0)
            this.buildByDiscordEmbed(msg.embeds[0]);

        return this;
    }

    buildByDiscordEmbed(msg) {
        this.build(this);

        if ("author" in msg && msg.author && msg.author.name) {
            this.setUnrated(msg.author.name.replace(/-/g, "").toLowerCase().includes("unrate"));
            let timelyID = msg.author.name.match(/#(\d{1,})/);
            if (timelyID) this.setTimelyID((msg.author.name.toLowerCase().includes("week") ? wkThreshold : dThreshold) + BigInt(timelyID[1]));
        }
        
        if ("footer" in msg && msg.footer && msg.footer.text)
            this.setLevelID([...msg.footer.text.match(/Level ID: (\d{1,})/)][1]);
        
        if ("thumbnail" in msg && msg.thumbnail && msg.thumbnail.url)
            this.buildByImageLink(msg.thumbnail.url);

        if ("fields" in msg && Array.isArray(msg.fields)) {

            let details = msg.fields.find(v => v.name && v.name.startsWith("<:play:"));
            if (details) {
                this.setHighObjects(details.name.includes(":464061600639352872>"));
                this.setIsCopy(details.name.includes(":464061600802930708>"));
                
                let creator = details.name
                    .replace(/ <[:\w]{1,}>/g, "")
                    .match(/  __(?<name>.{0,})__ by (?<publisher>.{0,})+$/);
                
                if (creator && creator.groups) {
                    this.setName(creator.groups.name);
                    this.setUsername(creator.groups.publisher);
                }

                if (details.value) {
                    let [downloads="", likes="", length=""] = details.value.split("\n");
                    downloads = downloads.match(/(\d{1,})`+$/);
                    likes = likes.match(/(\d{1,})`+$/);
                    length = length.match(/([\w-]{1,})`+$/);
                    if (downloads) this.setDownloads(downloads[1]);
                    if (likes) this.setLikes(likes[1]);
                    if (length) this.setLength(length[1]);
                }
                
            }
            
            let detailsExtra = msg.fields.find(v => v.name && v.name.startsWith("Coins: "));

            if (detailsExtra && !detailsExtra.name.includes("-")) {
                this.setUcoins(detailsExtra.name.split(" ").length - 1);
                this.setUcoinsVerified(detailsExtra.name.includes(":376444770438086667>"));
                if (detailsExtra.value) {
                    let song = detailsExtra.value.match(/   __(?<name>.{0,})__ by (?<publisher>.{0,})+$/);
                    if (song && song.groups) {
                        this.setSongName(song.groups.name);
                        this.setSongPublisherName(song.groups.publisher);
                    }
                }
            }

        }

        return this;
    }

    
    // This is for documentation purposes

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setBlurb(value=null) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setUnrated(value=false) { return this; }

    /**
     * @default 0n
     * @param {BigInt|number|string} [value=0n]
     */

    setLevelID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {BigInt|number|string} [value=0n]
     */

    setTimelyID(value=0n) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setName(value=null) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setUsername(value=null) { return this; }

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setStars(value=0) { return this; }

    /**
     * @default 0
     * @param {?number|string} [value=0]
     */

    setUcoins(value=0) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setDownloads(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setLikes(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setLength(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setDifficultyFace(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setDifficultyDemon(value=0n) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setUcoinsVerified(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setIsDemon(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setIsAuto(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setEpic(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setFeatured(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setHighObjects(value=false) { return this; }

    /**
     * @default false
     * @param {boolean} [value=false]
     */

    setIsCopy(value=false) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setSongName(value=null) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setSongPublisherName(value=null) { return this; }

}

module.exports = UGDBLevelNotification;