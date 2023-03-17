"use strict";

class DiscordEmote extends Map {

    constructor(data) {
        super();
        this.parse(data);
    }

    /**
     * @description The name
     * @type {?string}
     * @param {?string} value
     */
    
    get name() { return this.get("NAME") || null; }
    set name(value) {
         if (typeof value === "string") this.set("NAME", value);
         else if (value === null) this.delete("NAME");
    }

    /**
     * @description The user's account identification number
     * @type {BigInt}
     * @param {?(BigInt|number|string)} value
     */

    get id() { return this.get("ID") || 0n; }
    set id(value) {
        if (/^\d{1,}$/.test(value)) this.set("ID", BigInt(value));
        else if (value === null) this.delete("ID");
    }

    /**
     * @description The name
     * @type {boolean}
     * @param {?boolean} value
     */
    
    get animated() { return this.get("ANIMATED") || false; }
    set animated(value) {
         if (typeof value === "boolean") this.set("ANIMATED", value);
         else if (value === null) this.delete("ANIMATED");
    }

    /**
     * @description Whether the emote is a custom emote
     * @type {boolean}
     */

    get isCustom() { return this.id != 0; }

    /**
     * @type {{
     * name: string,
     * id: string,
     * animated: boolean
     * }}
     */

    get objGeneral() {
        return {
            name: this.name,
            id: `${this.id}`,
            animated: this.animated
        };
    }

    get url() {
        return this.isCustom
            ? `https://cdn.discordapp.com/emojis/${this.id}.webp?size=64&quality=lossless`
            : null;
    }

    parse(value) {
        if (typeof value === "string") this.fromString(value);
        else if (typeof value === "object") this.fromObj(value);
        return this;
    }

    fromObj(obj) {
        Object.entries(obj).forEach(([key, value]) => {
            if (key == "name") this.name = value;
            else if (key == "id") this.id = value;
            else if (key == "animated") this.animated = value;
        });
        return this;
    }

    fromString(str) {
        if (str.endsWith(":")) {
            this.name = str.split(":").slice(1, str.split(":").length - 1).join(":");
            this.animated = false;
        } else {
            str = str.replace(/<|>/g, "");
            str = str.split(":");
            this.name = str[1];
            this.id = str[2];
            this.animated = str[0] == "a";
        }
        return this;
    }

    toString() {
        return this.isCustom
        ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>`
        : `:${this.name}:`;
    }

}

module.exports = DiscordEmote;