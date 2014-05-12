// functions are first class objects
// functions encapsulate and capture context

var myFunction = function(){
	return null;
};

var person = {
	first: 'Ned',
	last: 'Stark',
	getName: function() {
		return this.first + ' ' + this.last;
	}
};
console.log(person.getName());

var colours = ['red', 'green', 'blue', 'yellow'];

// won't work -> i is 4 by the time the setTimeout function is called, 
//  the context changes

console.log('setTimeout1:');
for(var i = 0; i < colours.length; i++) {
	setTimeout(function(){
		console.log(colours[i]);
	}, 100);
}

// works, you save value of i each time

console.log('setTimeout2:');
for(var i = 0; i < colours.length; i++) {
	setTimeout((function(i){
		// unrelated, but i in the anonymous function is redefined as the 
		//  value of i in the outer loop. Inner variable can be j instead
		//  then we'd have to write colours[j]
		console.log(colours[i]);
	})(i), 100);
}
