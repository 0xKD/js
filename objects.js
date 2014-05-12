// objects

var myObject = new Object;
myObject.first = 'Ned';
myObject.last = 'Stark';

var myObject2 = {
	first: 'Ned',
	last: 'Stark'
};

// two objects are strictly equal if they refer to the same object
console.log(myObject === myObject2);