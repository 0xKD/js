// this -> refers to `owner` of the function

var myFunction = function(){
	// console.log(this);
};

var foo = new myFunction(); // empty object
myFunction(); // global object

// For this purpose, there is a special variable called this, 
//  which is always present when a function is called, 
//  and which points at the relevant object when the 
//  function is called as a method. 
//  
// A function is called as a method when it is looked up as a property, 
//  and immediately called, as in object.method().

function speak(line) {
	console.log(this.name,"says '" + line + "'.");
}
var hammond = {name: "Richard Hammond", speak: speak};
var may = {name: "James May", speak: speak};
var clarkson = {name: "Jeremy Clarkson", speak: speak};

hammond.speak("It's Rubbish");
may.speak("Oh cock!");

speak.apply(clarkson, ["Hammond!"]);
speak.call(clarkson, "... in the world");


// when a function is called with 'new' in front of it,
//  `this` will point to a new object, which it will automatically return.
//  Functions used to create new objects like this are called constructors

function Presenter(name) {
	this.name = name;
	this.speak = function(line) {
		console.log(this.name,"says: '" + line +"'.");
	};
}

var stig = new Presenter('Stig');
stig.speak('...');


// Alternative?

function makePresenter(name) {
	return {
		name: name,
		speak: function(line) {
			console.log(this.name,"says: '" + line +"'.");
		}
	};
}

var stigsCousin = makePresenter('Stig\'s fat (american) cousin');

// new does a few things behind the scenes

// stig has property called constructor which points to Presenter function
console.log(stig.constructor);

// stigsCousin also has the property, but points to Object function
console.log(stigsCousin.constructor);

// constructor is a part of the prototype of a presenter.
// every object based on prototype which gives it set of inherent properties
// Object constructor: typing {} equivalent to new Object()

var myObject = {};
console.log(myObject.constructor);
console.log(myObject.toString);

// toString is method that is part of the Object prototype
// all simple objects have toString method

// presenter objects based on prototype associated with presenter constructor

console.log(Presenter.prototype);
console.log(Presenter.prototype.constructor);


/* 2ality: 2ality.com/2014/05/this.html */

function sloppyFunc() {
	console.log(this === global); // window object in browsers
}
sloppyFunc();

function strictFunc() {
	'use strict';
	console.log(this === undefined); // in strict mode, `this` is undefined
}
strictFunc();

// `this` is an implicit paramater

function f(arg1, arg2) {
	// 'use strict';
	console.log(this); // wrapper object around primitive (if primitive)
	// ^ get value using this.valueOf()
	console.log(arg1);
	console.log(arg2);
}

// f(2,3); // this will be global object, unless 'use strict';
f.call(1,2,3); // `this` will be wrapper object with value 1
f.apply('A', [2,3]); // function arguments passed as array


// `this` in constructors, `new` operator creates a new object: `this`

function Constr(name) {
	this.name = name;
}

var c = new Constr('Gyro');
console.log(c.name);


// `this` in methods: 
// 	refers to the receiver, the object on which the method has been called on

var obj = {
	method: function() {
		console.log(this === obj);
	}
};

obj.method(); // here the object is obj, so "true"
obj.method.call('A'); // false


// in the top level scope, this is the window object in browsers,
// in node, it is the 'module.exports' object

console.log(this === module.exports); // true

// in module scope, `this` will be `global` object

(function() {
	console.log(this === global); // true
})();


// Issues: invoke constructor without `new` operator: global variables created!

function Point(x, y) {
	// 'use strict';
	this.x = x; // if 'use strict': TypeError: cannot set property of undefined
	this.y = y;
}

var p = Point(2,3);

console.log(p === undefined); // true

console.log(x,y); // global variables accessed here

// 'use strict' will give an error


// improper calls

function callIt(func) {
	func();
}

var counter = {
	count: 0,
	inc: function() {
		this.count += 1;
	}
};

// will not work, counter.inc invoked as function, not method with object ref
callIt(counter.inc); // count will become a global variable with value NaN

// instead do this:
callIt(counter.inc.bind(counter)); // 1, 
// .bind() will result in the function getting a `this` whose value is counter

console.log(counter.count); // 1 , not incremented in first call

console.log(count); // NaN, because undefined += 1 -> NaN

// Shadowing 'this'

var obj = {
	name: 'Storm',
	friends: ['Earth', 'Ember'],
	loop: function() {
		this.friends.forEach(
			function(friend) {
				// `this` is undefined in a real function
				console.log(this.name + ' knows ' + friend); // undefined
			}
		);
	}
};
obj.loop();

// fix:

var anotherObj = {
	name: 'Mirana',
	friends: ['Bane', 'Shadow Demon'],
	loop: function() {
		var that = this;
		this.friends.forEach(
			function(friend) {
				console.log(that.name + ' knows ' + friend);
			}
		);
	},
	// alternate fix
	loop2: function() {
		this.friends.forEach(
			function(friend) {
				console.log(this.name + ' knows ' + friend);
			}.bind(this)
		);
	},
	// forEach's second parameter whose value is passed to callback as `this`
	loop3: function() {
		this.friends.forEach(
			function(friend) {
				console.log(this.name + ' knows ' + friend);
			}, this);
	}
};

// same output with all
anotherObj.loop();
anotherObj.loop2();
anotherObj.loop3();
