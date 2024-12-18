[Home](../../readme.md) < [Structures](./_.md) < Territory

# Territory

A defined area that's not a country. Could technically be a [Region](./region.md) but generally is smaller scale

The full list of territories can be found [here](../collections/territories.md)

## Class

N/A

## Instance

*Instance Example*
```js
// Creating the object instance
let t = new Territory();

// Creating the object instance
t.fromJSON({
    "id": "632",
    "type": "state",
    "nameDisplay": "Bangsamoro",
    "name": "Bangsamoro Autonomous Region in Muslim Mindanao",
    "abbrev": "PH-14",
    "regions": [],
    "countries": [
        "138"
    ]
});

// Results
console.log(t.type); // prints "2n"
console.log(t.regions); // prints empty array
console.log(t.countries); // prints "[ 138n ]"
console.log(t.nameDisplay); // prints "Bangsamoro"
```

### Attributes

> [!WARNING]
> Setters are NOT used for attributes. Functions are the intended way to edit values:

*Required*

| Name | Data Type | Usage
| - | - | - |
| id | BigInt | numerical identifier (Discontinuable)
| name | string | the full legal name *(is used if applicable; province's legalities are used but not guaranteed)*
| type | BigInt | the type of territory<br><ul><li>0 - Unspecified (DEFAULT)</li><li>1 - Territory</li><li>2 - US State</li><li>3 - Province</li><li>4 - Oblast</li><li>5 - Krai</li></ul>

*Optional*

| Name | Data Type | Usage
| - | - | - |
| nameDisplay | ?string | the common US or general public name. _("name" should be used if "nameDisplay" is not a string of at least length 1)_
| flag | ?string | unicode string (if *empty* should not be displayed)
| abbrev | ?string | a custom short-hand string representation. This should not be a duplicate of another region's abbrev _(this is not an identifier and is more of a decoration and can be changed at any time)_
| regions | BigInt[] | array of ids, in no paticular order, of regions that contain this country
| countries | BigInt[] | array of ids, in no paticular order, of countries that contain this province

### Methods

*Functions*

| Name | Parameters | Usage | Returns
| - | - | - | - |
| `fromJSON` | <ul><li>obj - JSON object of attributes</li></ul> | ADJUSTS attributes based on a JSON object<br><br>Coercions<ul><li>id - converts numbers and numerical strings to BigInt</li><li>type - converts numbers and numerical strings to BigInt {EXTENSION: converts strings containing "ter" / "state" / "prov" / "obl" (not case sensitive) to their respective enum. This extension is intended for testing purposes only}</li><li>countries - converts a (and assumes) stringify-able list of POSITIVE INTEGERS and 0 to a BigInt array</li><li>regions - converts a (and assumes) stringify-able list of POSITIVE INTEGERS and 0 to a BigInt array</li></ul> | *instance*
| `toJSON` | N/A | CREATES a JSON object based on attributes | Object

*Getters*

| Name | Data Type | Usage
| - | - | - |
| nameDisplayed | string | performs a OR operation of order: "nameDisplay", "name"; returning the result
| nameNormalized | string | separates accent marks from characters in the "name" then removes the accent marks from the result *Assumes "name" is a string*
| nameDisplayNormalized | string | separates accent marks from characters in the "nameDisplay" then removes the accent marks from the result *Assumes "nameDisplay" is a string*
| nameDisplayedNormalized | string | separates accent marks from characters in the "nameDisplayed" then removes the accent marks from the result. *Assumes "nameDisplayed" is a string*

*Setters*

*N/A*

### Changelog

* `5.0.0` - Full release
