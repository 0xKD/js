// basic HTTP server
var fs = require('fs');
var http = require('http');
console.log('[+] Started');
var host = '127.0.0.1';
var port = '8282';

// callback fired each time a request is made
var server = http.createServer(function(request, response) {
	console.log('Received request: ' + request.url);
	if (request.url == '/secretshutdowncode') {
		// caveats?
		this.close();
	}

	fs.readFile('./files/' + request.url, function(error, data) {
		if (error){
			response.writeHead(400, {'Content-type':'text/plain'});
			response.end('Sorry mate!');
		}
		else {
			response.writeHead(200, {'Content-type':'text/plain'});
			response.end(data);
		}
	});

	// OR: response.write('Ned Stark!'); response.end();
	/*
	response.write(200, {'Content-type':'text/plain'});
	response.end('Ned Stark!');
	 */
});

server.listen(port, host, function() {
	console.log('[+] Server listening on: ', host + ':' + port);
});