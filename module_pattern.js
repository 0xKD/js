// Closures 

var counter = (function(){
	var privateCounter = 0;
	function changeBy(val){
		privateCounter += val;
	}
	return {
		increment: function(){
			changeBy(1);
		},
		decrement: function(){
			changeBy(-1);
		},
		value: function(){
			return privateCounter;
		}
	};
})();

console.log(counter.value());
counter.increment();
counter.increment();
console.log(counter.value());

// undefined -> because counter doesn't have reference to privateCounter,
// but privateCounter exists in closure of returned object of functions
console.log(counter.privateCounter);

//  Neither of these private items can be accessed directly 
//  from outside the anonymous function. 
//  Instead, they must be accessed by the three public functions 
//  that are returned from the anonymous wrapper.