var _ = require('underscore');
var fs = require('fs');
console.log('[+] Starting...');
var contents = fs.readFileSync('./files/testfile.json');
console.log('[+] Contents: ' + contents);
var jsonFile = JSON.parse(contents);
console.log('[+] TestFile: ' + jsonFile); // [object Object]
console.log('[+] Hello: ' + jsonFile.hello);

// async write: eg. writing to log file

fs.appendFile('./files/write.txt', '[+] More stuff...', 
  function(error) {
    console.log('[+] Written to file (async)');
  }
);

// [fs.writeFile] write will OVERWRITE!

var pocket_json = JSON.parse(fs.readFileSync('./private/pocket/tokens.json'));
_.each(pocket_json, function(value, key) {
  console.log(key,':',value);
});
