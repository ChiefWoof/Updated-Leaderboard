[Home](../../readme.md) < [Structures](./_.md) < Country

# Country

A defined country as by United Nations standards

The full list of countries can be found [here](../collections/countries.md)

## Class

N/A

## Instance

*Instance Example*
```js
// Creating the object instance
let c = new Country();

// Passing object into "fromObject" function
c.fromJSON({
    "id": "135",
    "nameDisplay": "Papua New Guinea",
    "name": "Independent State of Papua New Guinea",
    "flag": "🇵🇬",
    "regions": "6.19 qwerty 37"
});

// Results
console.log(c.flag); // prints "🇵🇬"
console.log(c.abbrev) // prints "PG"
console.log(c.regions) // prints "[ 6n, 19n, 37n ]"
console.log(c.nameDisplayed) // prints "Papua New Guinea"
```

### Attributes

> [!WARNING]
> Setters are NOT used for attributes. Functions are the intended way to edit values:

*Required*

| Name | Data Type | Usage
| - | - | - |
| id | BigInt | numerical identifier (Discontinuable)
| name | string | the full legal name *(is used if applicable; country's legalities are used but not guaranteed)*

*Optional*

| Name | Data Type | Usage
| - | - | - |
| nameDisplay | ?string | the common US or general public name. _("name" should be used if "nameDisplay" is not a string of at least length 1)_
| flag | ?string | unicode string (if *empty* should not be displayed)
| regions | BigInt[] | array of ids, in no paticular order, of regions that contain this country

### Methods

*Functions*

| Name | Parameters | Usage | Returns
| - | - | - | - |
| `fromJSON` | <ul><li>obj - JSON object of attributes</li></ul> | ADJUSTS attributes based on a JSON object<br><br>Coercions<ul><li>id - converts numbers and numerical strings to BigInt</li><li>regions - converts a (and assumes) stringify-able list of POSITIVE INTEGERS and 0 to a BigInt array</li></ul> | *instance*
| `toJSON` | N/A | CREATES a JSON object based on attributes | Object

*Getters*

| Name | Data Type | Usage
| - | - | - |
| abbrev | ?string | a short-hand string representation based on the unicode flag string. Returns a caesar cipher of (by converting the flag string unicodes to) upper-case English characters (key = -56741) OR if "flag" is empty returns null
| nameDisplayed | string | performs a OR operation of order: "nameDisplay", "name"; returning the result
| nameNormalized | string | separates accent marks from characters in the "name" then removes the accent marks from the result *Assumes "name" is a string*
| nameDisplayNormalized | string | separates accent marks from characters in the "nameDisplay" then removes the accent marks from the resuslt *Assumes "nameDisplay" is a string*
| nameDisplayedNormalized | string | separates accent marks from characters in the "nameDisplayed" then removes the accent marks from the result. *Assumes "nameDisplayed" is a string*

*Setters*

*N/A*

### Changelog

* `5.0.0` - Full release
