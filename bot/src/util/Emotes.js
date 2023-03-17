"use strict";

const Emote = require("./DiscordEmote");

/*
A list of premade emotes for general use
*/

const DEV_GD_ICONS = {
    main: new Emote({ id: "381572709689065476", name: "woof" }),
    woof: new Emote({ id: "546577577133998114", name: "XShadowWizardX" }),

    woofDay: new Emote({ id: "884164043059888158", name: "woofDay" }),
    woofDead: new Emote({ id: "866429240631492668", name: "woofDead" }),
    woofHost: new Emote({ id: "861344142474346586", name: "woofHost" }),
    woofy: new Emote({ id: "851236770825633812", name: "woofy" }),
    woofSmile: new Emote({ id: "866429260587073577", name: "woofSmile" }),
    woofBlank: new Emote({ id: "854093666339651624", name: "woofBlank" })
};

const DEV_GD = {
    icons: DEV_GD_ICONS
};

exports.dev = {
    gd: DEV_GD
};

const UL_STAFF = {
    alpha: new Emote({ id: "812355092141309972", name: "alpha" }),
    dev: new Emote({ id: "812355240380465152", name: "developer" }),
    officer: new Emote({ id: "812355315131088986", name: "officer" }),
    helper: new Emote({ id: "812355461776539688", name: "helper" }),
    trainee: new Emote({ id: "812355520311853076", name: "trainee" })
};

const UL_USERS_STATS = {
    net: new Emote({ id: "591852726737174530", name: "net" })
};

const UL_USER_STATUS = {
    verified: new Emote({ id: "630234148858101773", name: "verified" }),
    linked: new Emote({ id: "732744306288361492", name: "linked" }),
    modLeaderboard: new Emote({ id: "884873777412968448", name: "leaderboard" }),
    modRegular: new Emote({ id: "630234280487944223", name: "modRegular" }),
    modElder: new Emote({ id: "630234294119563274", name: "modElder" }),
};

const UL_USERS = {
    stats: UL_USERS_STATS,
    status: UL_USER_STATUS
};

const UL_ICONS = {
    logo: new Emote({ id: "782335234057175080", name: "ul" }),
    loading: new Emote({ id: "782335732030636063", name: "loading", animated: true })
};

const UL_TROPHIES = {
    top_1: new Emote({ id: "884940882120409158", name: "trophy1" }),
    top_2: new Emote({ id: "884940891062669332", name: "trophy2" }),
    top_3: new Emote({ id: "884940898973138946", name: "trophy3" }),
    top_4: new Emote({ id: "884940907416285215", name: "trophy4" }),
    top_5: new Emote({ id: "884940918346641429", name: "trophy5" }),
    top_6: new Emote({ id: "884940928106778655", name: "trophy6" }),
    top_7: new Emote({ id: "884940940656144404", name: "trophy7" }),
    top_8: new Emote({ id: "884940949992644608", name: "trophy8" }),
    top_9: new Emote({ id: "884940960251932693", name: "trophy9" }),
    top_10: new Emote({ id: "884940967973638145", name: "trophy10" })
};

const UL_MEDIAS = {
    youtube: new Emote({ id: "723416683452039219", name: "YT" }),
    twitter: new Emote({ id: "723416709997920266", name: "TT" }),
    twitch: new Emote({ id: "723416734228283403", name: "TW" }),
    instagram: new Emote({ id: "723622399903531149", name: "IG" }),
    github: new Emote({ id: "955310440727060480", name: "github" }),
    discord: new Emote({ id: "718247886789410846", name: "discord" })
};

const UL_UTIL = {
    plusGreen: new Emote({ id: "953724901016076378", name: "plusGreen" }),
    plusBlue: new Emote({ id: "953724931617718282", name: "plusBlue" }),
    plusPurple: new Emote({ id: "953724943399538839", name: "plusPurple" }),
    plusGold: new Emote({ id: "953724955542040636", name: "plusGold" })
};

exports.ul = {
    icons: UL_ICONS,
    staff: UL_STAFF,
    users: UL_USERS,
    trophies: UL_TROPHIES,
    medias: UL_MEDIAS,
    util: UL_UTIL
};

const GD_DIFFICULTIES = {

    NA: new Emote({ id: "886121697810456577", name: "NA" }),
    NAFeatured: new Emote({ id: "886121953189040138", name: "NAFeatured" }),
    NAEpic: new Emote({ id: "886122220328480769", name: "NAEpic" }),

    auto: new Emote({ id: "886121758850170881", name: "auto" }),
    autoFeatured: new Emote({ id: "886122014774018058", name: "autoFeatured" }),
    autoEpic: new Emote({ id: "886122243904655371", name: "autoEpic" }),

    easy: new Emote({ id: "886121776432685056", name: "easy" }),
    easyFeatured: new Emote({ id: "886122023502364722", name: "easyFeatured" }),
    easyEpic: new Emote({ id: "886122261923373086", name: "easyEpic" }),

    normal: new Emote({ id: "886121790424879115", name: "normal" }),
    normalFeatured: new Emote({ id: "886122036584382484", name: "normalFeatured" }),
    normalEpic: new Emote({ id: "886122272740495411", name: "normalEpic" }),

    hard: new Emote({ id: "886121803951525890", name: "hard" }),
    hardFeatured: new Emote({ id: "886122058126331947", name: "hardFeatured" }),
    hardEpic: new Emote({ id: "886122314117300245", name: "hardEpic" }),

    harder: new Emote({ id: "886121817738203178", name: "harder" }),
    harderFeatured: new Emote({ id: "886122078430978069", name: "harderFeatured" }),
    harderEpic: new Emote({ id: "886122354772676648", name: "harderEpic" }),

    insane: new Emote({ id: "886121839095611444", name: "insane" }),
    insaneFeatured: new Emote({ id: "886122092825817089", name: "insaneFeatured" }),
    insaneEpic: new Emote({ id: "886122372309082112", name: "insaneEpic" }),

    demonEasy: new Emote({ id: "886121852337020929", name: "demonEasy" }),
    demonEasyFeatured: new Emote({ id: "886122117161160704", name: "demonEasyFeatured" }),
    demonEasyEpic: new Emote({ id: "886122385185574942", name: "demonEasyEpic" }),

    demonMedium: new Emote({ id: "886121865477779546", name: "demonMedium" }),
    demonMediumFeatured: new Emote({ id: "886122132965326868", name: "demonMediumFeatured" }),
    demonMediumEpic: new Emote({ id: "886122395675537508", name: "demonMediumEpic" }),

    demonHard: new Emote({ id: "886121881818759188", name: "demonHard" }),
    demonHardFeatured: new Emote({ id: "886122156734443551", name: "demonHardFeatured" }),
    demonHardEpic: new Emote({ id: "886122428705701909", name: "demonHardEpic" }),

    demonInsane: new Emote({ id: "886121902995824720", name: "demonInsane" }),
    demonInsaneFeatured: new Emote({ id: "886122178427387954", name: "demonInsaneFeatured" }),
    demonInsaneEpic: new Emote({ id: "886122630640467968", name: "demonInsaneEpic" }),

    demonExtreme: new Emote({ id: "886121915901685800", name: "demonExtreme" }),
    demonExtremeFeatured: new Emote({ id: "886122204889251870", name: "demonExtremeFeatured" }),
    demonExtremeEpic: new Emote({ id: "886122646478127115", name: "demonExtremeEpic" })

};

const GD_USERS_STATS = {
    stars: new Emote({ id: "591854341820907564", name: "stars" }),
    diamonds: new Emote({ id: "591851055386591232", name: "diamonds" }),
    scoins: new Emote({ id: "591854455696130058", name: "scoins" }),
    ucoins: new Emote({ id: "591851079273152522", name: "ucoins" }),
    ucoinsUnverified: new Emote({ id: "671168629584429066", name: "ucoinsUnverified" }),
    demons: new Emote({ id: "591854277253922866", name: "demons" }),
    cp: new Emote({ id: "591854292172800001", name: "cp" }),
    orbs: new Emote({ id: "669344851971670037", name: "orbs" })
};

const GD_USER_STATUS = {
    // modLeaderboard: new Emote({ id: "", name: "" }), - TO BE ADDED IN FUTURE
    modRegular: new Emote({ id: "662850365271572481", name: "modRegular" }),
    modElder: new Emote({ id: "665479130824835083", name: "modElder" }),
};

const GD_USER_UTIL = {
    settingsAccount: new Emote({ id: "744806671926296646", name: "settingsAccount" }),
};

const GD_USER_ICONS = {
    dysowolief: new Emote({ id: "686021458228674583", name: "dysowolief" }),
    dysowoliefBounce: new Emote({ animated: true, id: "852639939375267841", name: "dysowoliefBounce" }),
    shidab: new Emote({ id: "884958390428766258", name: "shidab" }),
    shidabEpic: new Emote({ id: "886045145831710730", name: "shidabEpic" })
};

const GD_USERS = {
    stats: GD_USERS_STATS,
    status: GD_USER_STATUS,
    util: GD_USER_UTIL,
    icons: GD_USER_ICONS
};

const GD_PAGINATION = {
    arrowRightPink: new Emote({ id: "689326231073587256", name: "arrowRightPink" }),
    arrowLeftPink: new Emote({ id: "689326213759762459", name: "arrowLeftPink" })
};

const GD_LEVELS_UTIL = {
    download: new Emote({ id: "1051622660150415401", name: "download" })
};

const GD_LEVELS = {
    difficulties: GD_DIFFICULTIES,
    util: GD_LEVELS_UTIL
};

const GD_COMMENTS_TEXTS = {
    GG: new Emote({ id: "371869272458133504", name: "GG" })
};

const GD_COMMENTS = {
    texts: GD_COMMENTS_TEXTS
};

const GD_TROPHIES = {
    top_1: new Emote({ id: "884607317235093584", name: "trophyOne" }),
    gold: new Emote({ id: "884607382674616380", name: "trophyGold" }),
    silver: new Emote({ id: "884607409987936277", name: "trophySilver" }),
    bronze: new Emote({ id: "884607439977213962", name: "trophyBronze" }),
    green: new Emote({ id: "884607467189854229", name: "trophyGreen" }),
    blue: new Emote({ id: "884607490967347250", name: "trophyBlue" }),
    purple: new Emote({ id: "884607512018554972", name: "trophyPurple" }),
    default: new Emote({ id: "884607534172889119", name: "trophyDefault" })
};

const GD_UTIL = {
    info: new Emote({ id: "682832939578294300", name: "info" }),
    locked: new Emote({ id: "704089505384366152", name: "locked" }),
    mail: new Emote({ id: "686754403491119187", name: "mail" }),
    commentsAccount: new Emote({ id: "744803186380111964", name: "commentsAccount" }),
    commentsHistory: new Emote({ id: "744803218155896902", name: "commentsHistory" })
};

exports.gd = {
    pagination: GD_PAGINATION,
    users: GD_USERS,
    levels: GD_LEVELS,
    trophies: GD_TROPHIES,
    util: GD_UTIL,
    comments: GD_COMMENTS
};

const UTIL_VERIFICATION = {
    invalid: new Emote({ id: "592977793915158538", name: "invalid" }),
    valid: new Emote({ id: "592977811409731584", name: "valid" }),
};

const UTIL_SYMBOLIC = {
    warning: new Emote({ id: "630597339156840459", name: "warning" }),
    blank: new Emote({ id: "649400698546683907", name: "blank" })
};

exports.util = {
    verification: UTIL_VERIFICATION,
    symbolic: UTIL_SYMBOLIC
};

const SG_MEMBERS = {
    member: new Emote({ id: "630234239497011210", name: "sg" })
};

exports.sg = {
    members: SG_MEMBERS
};

const DEMONSLIST_ICONS = {
    icon: GD_DIFFICULTIES.demonExtreme
};

exports.demonslist = {
    icons: DEMONSLIST_ICONS
};

const GDBROWSER_ICONS = {
    icon: GD_USERS_STATS.scoins
};

exports.gdbrowser = {
    icons: GDBROWSER_ICONS
};

const DISCORD_GUILDS = {
    owner: new Emote({ id: "708170799386722354", name: "owner" })
};

exports.discord = {
    guilds: DISCORD_GUILDS
};