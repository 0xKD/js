/* 1. */
var fs = require('fs');
console.log('[+] Starting..');

// non blocking
fs.readFile('./files/sample.txt', function(error, data) {
  console.log('[+] Contents of file: ' + data);
});

console.log('[+] Continue execution');

/* 2. File Operations */
// Synchronous file read
var content = fs.readFileSync('./files/sample.txt');
console.log('Synchronous read:' + content);

// fs.readFile can finish after last console.log too. It is asynchronous.
console.log('[!] Done?');

// writing to file

// we are not considering unicode, so naive reverse will do for now
fs.writeFileSync('./files/write.txt', 
  content.toString().split(" ").reverse().join(" "));

/* 3. Watching a file */
fs.watchFile('./files/testfile.json', function(current, previous) {
  console.log('Changed');
});

/* 4. Using module from file */
var myModule = require('./mymodule.js');
console.log(myModule.reverseString('hello world!'));
