"use strict";

/**
 * @description The UL uses emotes on Googlesheets
 * for easy readability when setting bans so this
 * class was made to help parse adn stringfy said bans
 */

class BanFrom {
    
    static EMOTES = new Map()
        .set("STARS", "🌟")
        .set("DIAMONDS", "💎")
        .set("SCOINS", "🌕")
        .set("UCOINS", "⚪️")
        .set("DEMONS", "😈")
        .set("CP", "🛠");

    constructor() {
        throw new Error(`${this.constructor.name} class is not meant for instants`);
    }

    static parse(str="") {
        if (typeof str !== "string")
            throw new Error("str is not a string");
        return {
            bannedStars: str.includes(this.EMOTES.get("STARS")),
            bannedDiamonds: str.includes(this.EMOTES.get("DIAMONDS")),
            bannedScoins: str.includes(this.EMOTES.get("SCOINS")),
            bannedUcoins: str.includes(this.EMOTES.get("UCOINS")),
            bannedDemons: str.includes(this.EMOTES.get("DEMONS")),
            bannedCP: str.includes(this.EMOTES.get("CP")),
        };
    }

    static stringify({ bannedStars=false, bannedDiamonds=false, bannedScoins=false, bannedUcoins=false, bannedDemons=false, bannedCP=false }={}) {
        const bans = [];
        if (bannedStars) bans.push(this.EMOTES.get("STARS"));
        if (bannedDiamonds) bans.push(this.EMOTES.get("DIAMONDS"));
        if (bannedScoins) bans.push(this.EMOTES.get("SCOINS"));
        if (bannedUcoins) bans.push(this.EMOTES.get("UCOINS"));
        if (bannedDemons) bans.push(this.EMOTES.get("DEMONS"));
        if (bannedCP) bans.push(this.EMOTES.get("CP"));
        return bans.join("");
    }

}

module.exports = BanFrom;