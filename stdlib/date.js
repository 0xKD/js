// Date is part of standard built-in objects

// Date objects can only be instantiated by calling Date as a constructor
// current date-time
var d = new Date();
console.log(d);

// RFC 2822 timestamp
var d2 = new Date('16:04:32 12-12-2014');
console.log(d2);

// milliseconds since Unix epoch (Jan 1 1970)
var d3 = new Date(1396549873213);
console.log(d3);

// (year, month (0-11), day, hour, minute, second, ms)
var d4 = new Date(2014, 05, 1, 14, 33, 30, 30);
console.log(d4);

// returns ms since unix epoch, UTC
console.log('Date.now():', Date.now());

// parses string representation of date, and returns ms since epoch, local time
console.log('Date.parse(16:04:32 12-12-2014)', 
	Date.parse('16:04:32 12-12-2014'));

// takes params as longest form of constructor and returns ms since epoch, UTC
console.log('Date.UTC()', Date.UTC(2014, 05, 1, 14, 33, 30, 30));

var now = new Date();
console.log(now.getDate());
console.log(now.getDay()); // day of week, starts Sunday
console.log(now.getMonth()); // 0-11
console.log(now.getFullYear());
console.log(now.getMinutes());
console.log(now.getHours());
// all of the above according to local time

// use getUTCDate, getUTCYear, etc for UTC

console.log(now.toJSON());

console.log(now.toUTCString());	// date to string UTC timezone

// getting time difference
var ds1 = new Date();
ds1.setMonth(ds1.getMonth()-1);
var ds2 = new Date();
var diff = new Date(ds2.getTime() - ds1.getTime());
console.log(diff.getTime()); // diff in ms