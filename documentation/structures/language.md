[Home](../../readme.md) < [Structures](./_.md) < Language

# Language

A label for a form of communication

The full list of languages can be found [here](../collections/languages.md)

## Class

N/A

## Instance

*Instance Example*
```js
// Creating the object instance
let l = new Language();

// Passing object into "fromJSON" function
l.fromJSON({
    "id": "2",
    "nameDisplay": "Español",
    "name": "Spanish",
    "abbrev": "ES"
});

// Results
console.log(l.nameDisplayed); // prints "Español"
console.log(l.nameDisplayedNormalized); // prints "Espanol"
```

### Attributes

> [!WARNING]
> Setters are NOT used for attributes. Functions are the intended way to edit values

*Required*

| Name | Data Type | Usage
| - | - | - |
| id | BigInt | numerical identifier (Discontinuable)
| name | string | the full legal name *(is used if applicable)*
| nameDisplay | ?string | the common US or general public name. _("name" should be used if "nameDisplay" is not a string of at least length 1)_
| abbrev | ?string | a custom short-hand string representation. This should not be a duplicate of another region's abbrev _(this is not an identifier and is more of a decoration and can be changed at any time)_

*Optional*

N/A

### Methods

*Functions*

| Name | Parameters | Usage | Returns
| - | - | - | - |
| `fromJSON` | <ul><li>obj - JSON object of attributes</li></ul> | ADJUSTS attributes based on a JSON object<br><br>Coercions<ul><li>id - converts numbers and numerical strings to BigInt</li></ul> | *instance*
| `toJSON` | N/A | CREATES a JSON object based on attributes | JSON Object

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
