// scope in js
//
// scope -> lifetime of variable

(function(){
	// console.log(this); // Window object in browser
})();


// javascript doesn't use block scope
// it uses functional scope

function hello(){
	var h = "hello";
	if (true) {
		var h = "bye";
	}
	return h;
}
console.log(hello());


// self invoking functions give private scope

(function() {
	// called as soon as it is encountered
	// private scope
})();

// js doesn't use block scope so episode 1's value is changed (redefined)
var episode_1 = "Winter is Coming";
if (true){
	var episode_1 = "The Kingsroad";
}
console.log(episode_1); // The Kingsroad


(function() {
	var episode_2 = "The Kingsroad";
})();
// console.log(episode_2); // Runtime error: not defined


var epsiode_3 = "Lord Snow";
function printName(episode_3) { 
	// innermost precedence
	// episode_3 redefined when used as argument to the function
	console.log(episode_3);
}
printName("A Golden Crown"); // A Golden Crown


(function() {
	// without var, it becomes global, no longer in functional scope
	episode_2 = "The Kingsroad";
})();
console.log(episode_2); // The Kingsroad


// list global variables
(function() {
	// 'this' uses dynamic scope
	// console.log(Object.keys(this));
})();


// settings value of 'this' in a function
// 1. call a method on an object

var user = {
	handle: "@grugq",
	sayName: function(){
		console.log(this.handle);
	}
};
user.sayName();

// 2. Call a function and pass this with .call()

user.sayName.call(user, 'arg1', 'arg2');

// 2. Call a function and pass this with .apply()

user.sayName.call(user, ['arg1', 'arg2']);

// difference between .call() and .apply() is how additional 
//  arguments are passed

// 3. Use 'new' to create new function context

function User(handle){
	this.handle = handle;
}
var grugq = new User("@grugq");
console.log(grugq);

// when new keyword is used, 'this' will be empty object in function
//  build on that empty object in the function
//  'this' is returned by the function implicitly

// 4. Use .bind() or ($.proxy in jquery, _.bind in underscore)

var foo = (function(x) {
	return this + 1;
}).bind(1);

// first argument is function, second is value of this (+additional arguemnts)
//  in case of native bind, bind is called on function itself.
console.log(foo(1));

console.log(Function.prototype.call.bind(foo, 33)());