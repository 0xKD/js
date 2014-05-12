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
