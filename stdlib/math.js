// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

// Math is not a constructor, unlike other global objects, 
// all properties / methods of Math are static

// constants
console.log('E:',Math.E);
console.log('LN2:',Math.LN2); // natural log of 2
console.log('LN10:', Math.LN10);
console.log('LOG2E:', Math.LOG2E); // base 2 log of e
console.log('LOG10E:', Math.LOG10E); // base 10 log of e
console.log('PI:', Math.PI);
console.log('SQRT(0.5):', Math.SQRT1_2); // square root of .5
console.log('SQRT(2):', Math.SQRT2);

// methods
console.log(Math.abs(-1));

// trig functions
console.log('sin(30):', Math.sin(30 * (Math.PI / 180))); 
// 0.4999.. Math.PI !== pi
// similarly cos, tan, asin (inverse sin), acos, atan

console.log('e^2:', Math.exp(2));

// floor returns largest integer <= number
console.log('floor(3.45):', Math.floor(3.45));

// log returns natural log of a number
console.log('Ln(3):', Math.log(3));

// returns max / min
console.log(Math.max(3, 4, 9.9, 45, 71));
console.log(Math.min(.3, 4, 9.9, 45, 71));

console.log('3^6:', Math.pow(3, 6));

// pseudo random number b/w 0 and 1
console.log('random:', Math.random());

// value rounded to nearest integer
console.log('round(3.49):', Math.round(3.51));