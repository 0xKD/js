// http://www.toptal.com/javascript/javascript-prototypes-scopes-and-performance-what-you-need-to-know

// every function is an object
function Person(first, last) {
	this.first = first;
	this.last = last;
}

var p1 = new Person('John', 'Doe');
var p2 = new Person('Jane', 'Doe');

// p1 and p2 are independent instances of Person
console.log(p1 instanceof Person);
console.log(p2 instanceof Person);
console.log(p1 == p2);

// important property of each function: prototype (object)
// prototype inherits from its parent's prototype, 
//  which inherits from its parent's prototype
// This is referred to as prototype chain.

// Object.prototype is at the end of the prototype chain,
// contains methods like toString(), hasProperty(), isPrototypeOf()

// function's prototype can be extended to define custom methods and properties

Person.prototype.getFullName = function() {
	return this.first + ' ' + this.last;
}

console.log(p1.getFullName());

// instances only have access to the properties of the prototype object,
//  not the prototype object itself

console.log(p1.prototype); // undefined

// override property of an instance

p1.getFullName = function() {
	return this.first + ' : ' + this.last;
}

console.log(p1.getFullName()); // John : Doe
console.log(p2.getFullName()); // Jane Doe , unaffected by p1's override

// when checking for properties, the object's is checked first, going up
//  the prototype chain if the property isn't found, until it is

function SubPerson() {}
SubPerson.prototype.middle = '<middle_name>';

SubPerson.prototype = new Person();
var subP = new SubPerson();

console.log(subP.middle); 
// undefined, as the prototype was changed to new Parent object, hence
//  middle property was lost. Defined additional properties after 
//  inheriting from parent or specifying alternate prototype

 
// developer.telerik.com/featured/seven-javascript-quirks-i-wish-id-known-about/

// equality
var x = 1;
console.log(x == "1"); // true

// == is lenient equality, converts / coerces operands to the same type then
// performs a strict (===) equality

console.log(x === "1"); // false
// strict equality checks for both type and value being the equal

// Always use strict equality. Operators cannot be overloaded in JS, and you
//  can't customize how equality works (http://speakingjs.com/es5/ch09.html)

console.log(undefined === undefined); // true
console.log(null === null); //  true
console.log(NaN !== NaN); // true

// to check if value is NaN, use global function isNaN()
console.log(isNaN(NaN)); // true

// isNaN does not properly work with non-numbers, because it first converts arg
//  to number (http://speakingjs.com/es5/ch11.html)
console.log(isNaN('true'));  // incorrectly returns true

// two objects are strictly equal iff they are the same object,


// function expression vs function declaration

// function declaration
function hello(x) {
	if (x === 1) {
		console.log('Hi!');
	}
	else {
		hello(1); // function accessible inside itself
	}
}

hello(2);

var fn = function(x) {
	if (x === 1) {
		console.log('Hello!');
	}
	else {
		fn(1); // here too, so I don't know how the article differentiates them
	}
}

fn(2);

// another way

var fn2 = function priv(x) {
	if (x === 1) {
		console.log('Yo!');
	}
	else {
		priv(1); // priv accessible only inside the function,
	}
}

fn2(3); // priv not accessible here


// typeof and Object.prototype.toString.call() for finding type
var obj = { hi: 'hello' };
var arr = ['jon', 'snow'];
var str = 'helloWorld';
var b = true;

console.log(typeof obj); // object
console.log(typeof arr); // object
console.log(typeof str); // string
console.log(typeof b); // bolean

// to differentiate between objects and arrays, if needed, use this

console.log(Object.prototype.toString.call(obj)); // [object Object]
console.log(Object.prototype.toString.call(arr)); // [object Array]
// the .call is important!
