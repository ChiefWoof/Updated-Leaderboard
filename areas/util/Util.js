const Region = require("../src/Region");
const Country = require("../src/Country");
const Province = require("../src/Province");
const Language = require("../src/Language");

/**
 * General utilities
 */

class Util {}

/**
 * Determines whether the given area(s) fall within the target region
 * @param {Region|number|string|BigInt} target 
 * @param {Object} options 
 * @param {?Region} options.region
 * @param {?Country} options.country
 * @param {?Province} options.province
 * @returns 
 */

Util.checkAreaInRegion = function(target, { region, country, province }={}) {
    if (target instanceof Region) {
        return target.id > 0
        && (
            [ target.id, ...target.regions ].some(targetID =>
                `${targetID}` === `${region?.id}`
                || target.regions?.some(a => `${targetID}` === `${a}`)
                || (country?.regions?.some(a => `${targetID}` === `${a}`))
                || (province?.regions?.some(a => `${targetID}` === `${a}`))
                || (province && province?.countries?.some(a => Country.countries[a?.id]?.regions?.some(b => `${targetID}` === `${b?.id}`)))
            )
        );
    } else if (["string", "number", "bigint"].includes(typeof target) && /^\d{1,}$/.test(target)) {
        return Util.checkAreaInRegion(Region.regions[target], { region, country, province });
    }
    return false;
}

/**
 * Determines whether the given area(s) fall within the target country
 * @param {Region|number|string|BigInt} target 
 * @param {Object} options 
 * @param {?Region} options.region
 * @param {?Country} options.country
 * @param {?Province} options.province
 * @returns 
 */

Util.checkAreaInCountry = function(target, { country, province }={}) {
    if (target instanceof Country) {
        return target.id > 0
        && (
            `${target.id}` === `${country?.id}`
            || (province?.countries?.some(a => `${target.id}` === `${a}`))
        );
    } else if (["string", "number", "bigint"].includes(typeof target) && /^\d{1,}$/.test(target)) {
        return Util.checkAreaInCountry(Country.countries[target], { country, province });
    }
    return false;
}

/**
 * Determines whether the given area(s) fall within the target province
 * @param {Region|number|string|BigInt} target 
 * @param {Object} options 
 * @param {?Region} options.region
 * @param {?Country} options.country
 * @param {?Province} options.province
 * @returns 
 */

Util.checkAreaInProvince = function(target, { province }={}) {
    if (target instanceof Province) {
        return target.id > 0
        && (
            `${target.id}` === `${province?.id}`
        );
    } else if (["string", "number", "bigint"].includes(typeof target) && /^\d{1,}$/.test(target)) {
        return Util.checkAreaInProvince(Province.provinces[target], { province });
    }
    return false;
}

/**
 * Determines whether the given area(s) fall within the target language
 * @param {Region|number|string|BigInt} target 
 * @param {Object} options 
 * @param {?Region} options.region
 * @param {?Country} options.country
 * @param {?Province} options.province
 * @returns 
 */

Util.checkAreaInLanguage = function(target, { region, country, province, language }={}) {
    if (target instanceof Language) {
        return target.id > 0
        && (
            `${target.id}` === `${language?.id}`
            || (region?.languages?.some(a => `${target.id}` === `${a}`))
            || (country?.languages?.some(a => `${target.id}` === `${a}`))
            || (province?.languages?.some(a => `${target.id}` === `${a}`))
        );
    } else if (["string", "number", "bigint"].includes(typeof target) && /^\d{1,}$/.test(target)) {
        return Util.checkAreaInLanguage(Language.languages[target], { region, country, province, language });
    }
    return false;
}

module.exports = Util;