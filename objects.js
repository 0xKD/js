// objects

var myObject = new Object();
// jsHint: var myObject = {} // preferable

myObject.first = 'Ned';
myObject.last = 'Stark';

var myObject2 = {
	first: 'Ned',
	last: 'Stark'
};

// two objects are strictly equal if they refer to the same object
console.log(myObject === myObject2);


// http://speakingjs.com/es5/ch17.html
// 
// Objects and Inheritance in JS
// several `layers` to OOP
// Layer 1: Single Objects -> 3 kinds of properties

// i) Properties:

var obj = {
	firstName: 'Jon',
	lastName: 'Snow',
	sayName: function() {
		return this.firstName + ' ' + this.lastName;
	}
};

// named data properties: mapping from string keys to values
console.log(obj['firstName'], obj.lastName);

// named data properties also include methods
console.log(obj['sayName']());

// ii) Accessors / virtual properties. Setter / getter for property

var obj2 = {
	get foo() {
		return 'getter';
	},
	set foo(value) {
		console.log('setter: ' + value);
	}
};

obj2.foo = 'hi';
console.log(obj2.foo);

// iii) Internal properties -> [[Prototype]] holds prototype of object,
//  accessible by Object.getPrototypeOf()

// arry has two properties: name & describe. describe is a method
var arry = {
	name: 'Arya',
	describe: function() {
		return 'I\'m not a girl!';
	}
};

// can use inheritance between objects, can protect them from being changed,
//  `constructors` are factories to create objects: similar to classes

// object properties can be accessed with dot notation or bracket operator

console.log(arry.name); // 'Arya'

// bracket operator allows you to compute key of property via expression
console.log(arry['desc' + 'ribe']); // '[Function]'

// bracket operator allows accessing keys that are not identifiers
var o = { 'not an identifier': 430, '6': 6 };
console.log(o['not an identifier']); // 430

// bracket argument is converted to string
console.log(o[3+3]); // 6

// getting property that doesn't exist returns undefined
console.log(o['hello']);

// setting a nonexistent property will create it
o.newProp = 'A new property!';
console.log(Object.keys(o));

// deleting a property
delete o.newProp; // removes whole key-value pair
console.log(Object.keys(o));

// reserved keywords can be used as property keys
var p = { var: 'A var!', function: 'This isn\'t right!' };

console.log(p.var);
console.log(p.function);

// numbers can also be keys, but are evaluated as string
var p2 = { 0.7: '007' };
console.log(p2[0 + '.7']);
