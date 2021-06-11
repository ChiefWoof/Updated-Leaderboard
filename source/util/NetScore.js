"use strict";

/**
 * @description A utility to combine necessary stats into a single number
 */

class NetScore {

    constructor() {
        throw new Error(`${this.constructor.name} class is not meant for instants`);
    }

    static WEIGHTS = {
        stars: 1,
        diamonds: 0.5,
        scoins: 100,
        ucoins: 2,
        demons: 20,
        cp: 50
    };

    static WEIGHTS_CALCULATED = {
        stars: (amount=0) => this.WEIGHTS.stars * +amount,
        diamonds: (amount=0) => this.WEIGHTS.diamonds * +amount,
        scoins: (amount=0) => this.WEIGHTS.scoins * +amount,
        ucoins: (amount=0) => this.WEIGHTS.ucoins * +amount,
        demons: (amount=0) => this.WEIGHTS.demons * +amount,
        cp: (amount=0) => this.WEIGHTS.cp * +amount,
    };
    
    static calculate(rounded=true, { stars=0, diamonds=0, scoins=0, ucoins=0, demons=0, cp=0 }={}) {
        let amount = 0 // The zero is to make the addition more organized
            + this.WEIGHTS_CALCULATED.stars(stars)
            + this.WEIGHTS_CALCULATED.diamonds(diamonds)
            + this.WEIGHTS_CALCULATED.scoins(scoins)
            + this.WEIGHTS_CALCULATED.ucoins(ucoins)
            + this.WEIGHTS_CALCULATED.demons(demons)
            + this.WEIGHTS_CALCULATED.cp(cp);
        return rounded ? Math.floor(amount) : amount;
    }

}

module.exports = NetScore;
