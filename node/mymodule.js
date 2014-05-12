/* Modules */
var _ = require('underscore');

function reverseString(str) {
	return str.split("").reverse().join("");
}

function capitalize(str) {
	// why not
	return _.map(str.split(''), function(character) {
		return character.toUpperCase();
	}).join('');
}

// console.log(palindrome('racecar'));
// console.log(capitalize('hello world!@'));

module.exports.reverseString = reverseString;
module.exports.capitalize = capitalize;

// to publish:
// npm init ( -> package.json )
// npm adduser
// npm publish