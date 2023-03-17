"use strict";

/**
 * @description A class to simplify bit-style values
 */

class BitField extends Map {

    /**
     * @constructor
     * @param {number} value
     */

    constructor(value) {
        super();
        this.resolve(value);
    }

    /**
     * @type {string} The binary version
     */

    get binary() { return this.value.toString(2); }

    /**
     * @returns {number[]} The binary version split into bits
     */

    get bytes() { return this.binary.split("").map(a => Number(a)); }



    get value() { return this.get("VALUE") || 0; }
    set value(value) {
        if (typeof value === "number") this.set("VALUE", value);
        else if (value === null) this.delete("VALUE");
    }

    /**
     * @description Flips all bits to 0
     */

    disable() { this.value = 0; return this; }

    /**
     * @description The parser for inputs
     * @param {*} value
     */

    resolve(value) {
        if (value instanceof BitField) return this.resolve(value.value);
        else if (typeof value === "number" || value === null) this.value = value; 
        return this;
    }

    /**
     * @description Adds bits to the current bitfield
     * @param {...number} bits The bits
     */

    add(...bits) {
        for (const bit of bits) this.value |= bit;
        return this;
    }

    /**
     * @description Removes bits from the current bitfield
     * @param {...number} bits The bits
     */

    remove(...bits) {
        for (const bit of bits) this.value = (this.value | bit) ^ bit;
        return this;
    }

    /**
     * @description Removes a set a bits from the bitfield then adds certain ones in its place
     * @param {number} baseBit The values to look at for flexing
     * @param {number} flexBit The values to flex
     */

    flex(baseBit, flexBit) {
        if (!((baseBit | flexBit) === baseBit))
            throw new Error(`flexBit, ${flexBit} (${flexBit.toString(2)}), is out of range of the baseBit, ${baseBit} (${baseBit.toString(2)})`);
        this.remove(baseBit);
        this.add(flexBit);
        return this;
    }
    
    /**
     * @param {...number} bits The bits
     * @returns {boolean} Whether the entered bits can be found within the instance's value
     */

    has(...bits) { return bits.every(bit => (this.value & bit) === bit); }
    
    /**
     * @param {...number} bits The bits
     * @returns {boolean} Whether at least one of the entered bits can be found within the instance's value
     */

    hasOne(...bits) { return bits.some(bit => (this.value & bit) === bit); }

    /**
     * @param {number} baseBit The values to look at for flexing
     * @param {...number} flexBit The values to flex
     * @returns {boolean} Whether the baseBits are flexing the entered flexBits
     */

    hasFlex(baseBit, ...flexBit) {
        return flexBit.every((bit, i) => {
            if (!((baseBit | bit) === baseBit))
                throw new Error(`index ${i}'s flexBit, ${bit} (${bit.toString(2)}), is out of range of the baseBit, ${baseBit} (${baseBit.toString(2)})`);
            return (this.value & baseBit) === bit;
        });
    }

    fromBinary(str) {
        this.fromBits(...(str.split("").reverse()));
        return this;
    }

    fromBit(index, value=1) {
        switch (value) {
            case true:
                case 1:
                case "1": { this.add(Math.pow(2, index)); break;  }
            case false:
                case 0:
                case "0": { this.remove(Math.pow(2, index)); break;  }
        }
        return this;
    }

    fromBitValue(bitValue, value=1) {
        return this.fromBit(Math.floor(Math.log2(Number(bitValue))), value);
    }

    fromBits(...bit) { bit.forEach((bit, i) => this.fromBit(i, Number(bit))); return this; }

}

module.exports = BitField;