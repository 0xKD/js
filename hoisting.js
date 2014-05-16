// adequatelygood.com/JavaScript-Scoping-and-Hoisting.html

// function declarations and variable declarations are always moved ('hoisted')
//  to the top of their containing scope (by the interpreter)

function foo() {
	bar();
	var x = 1;
}

// is interpreted as

function foo() {
	var x;
	bar();
	x = 1; // assignment is not hoisted, only declaration
}

// variable assignments are not hoisted but functions are, along with body

function test() {
	// z(); // error, undefined not a function
	x();
	var z = function() {
		console.log('Won\'t run');
	} // function assignment won't be hoisted
	function x() {
		console.log('This will run!');
	} // function declaration will be
}

test();

// always use var to declare variables, declare variables just once pers scope
//  at the top of the scope, to avoid hoisting related confusion
