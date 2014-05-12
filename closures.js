// inner function has access to variables in the outside function

function foo(x) {
	var tmp = 3;
	// "Simply accessing variables outside of your immediate lexical scope creates a closure."
	function bar(y) {
		console.log(x + y + (++tmp));
	}
	bar(10);
}

console.log("Closure 1:");
foo(2);

function foo2(x){
	var tmp = 3;
	return function(y){
		console.log(x + y + (++tmp));
	}
}

console.log("Closure 2:");
var bar = foo2(2);
// tmp exists inside bar's closure
bar(10);
bar(10);
bar(10);

// "When a JavaScript function is invoked, 
// a new execution context is created. 
// Together with the function arguments and the parent object, 
// this execution context also receives all the variables declared outside of it"



// more..

// -> a closure is the local variables for a function — 
// kept alive after the function has returned, or
// -> a closure is a stack-frame which is not deallocated 
// when the function returns


function sayHello(name){
	var text = 'Hello ' + name;
	return function() {
		console.log(text);
	}
}

// In JavaScript, if you declare a function within another function, 
// then the local variables can remain accessible after returning 
// from the function you called.

console.log('Closure 3:');
say = sayHello('Bob');
say();

function say667(){
	var num = 666;
	function b() { console.log(num) }
	num++;
	return b;
}

// local variables are not copied — they are kept by reference (num)

console.log('Closure 4:');
say2 = say667();
say2();

// In JavaScript, whenever you declare a function inside another function, 
// the inside function(s) is/are recreated again each time 
// the outside function is called.
