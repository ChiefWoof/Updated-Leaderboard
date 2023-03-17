class Util {}

Util.stringPadStart = function(str, maxLength, fill) {
    let res = str.split("");
    while (res.length < maxLength) res.unshift(fill);
    return res.join("");
}

Util.stringPadEnd = function(str, maxLength, fill) {
    let res = str.split("");
    while (res.length < maxLength) res.push(fill);
    return res.join("");
}

/**
 * @param {string|number|BigInt} value 
 * @returns 
 */

Util.possession = function(value) {
    return [ "number", "bigint" ].includes(typeof value)
        ? value > 0 ? "s" : ""
    : typeof value === "string"
        ? `${value}${/s$/.test(value) ? "'" : "'s"}`
    : null;
}

/**
 * @param {string} str 
 * @returns {number[]}
 */

Util.hexToColorArray = function(str) {
    return str.match(/[a-fA-F0-9]{2}/g).map(h => parseInt(h, 16));
}

module.exports = Util;
