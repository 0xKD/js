// for _.each
var _ = require('underscore');
// to open browser
var open = require('open');

// for redirect_uri listener
var http = require('http');

// pocket api calls made over https
var https = require('https');

// to read consumer_key from file
var fs = require('fs');
var token_file = fs.readFileSync('./private/pocket/tokens.json');
var tokens = JSON.parse(token_file);

// listener config
var listener = {
  host: '127.0.0.1',
  port: '9090'
};

var api_main = {
  host: 'getpocket.com',

  // all request made with JSON data
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Accept': 'application/json'
  }
};
var api = {
  
  add: {
    host: api_main.host,
    headers: api_main.headers,
    path: '/v3/add',
    method: 'POST',
  },
  oauth_request: {
    host:api_main.host,
    headers: api_main.headers,
    path: '/v3/oauth/request',
    method: 'POST'
  },
  oauth_authorize: {
    host:api_main.host,
    headers: api_main.headers,
    path: '/v3/oauth/authorize',
    method: 'POST'  
  }
};

function Item(url) {
  this.url = url;
  this.access_token = tokens.access_token;
  this.consumer_key = tokens.consumer_key;
}

function addItem(url) {
  var request = https.request(api.add, function(response) {
    var resp_data = '';
    response.on('data', function(data) {
      resp_data += data.toString('utf8');
    });
    response.on('end', function() {
      var json = JSON.parse(resp_data);
      _.each(json, function(value, key) {
        console.log(key,':', value);
      });
    });
  });
  request.write(JSON.stringify(new Item(url)));
  request.end();
}

function authenticate(up_callback) {
  var obj = {
    req_token: {
      consumer_key: tokens.consumer_key,
      // later change to listener address of node server
      redirect_uri: 'http://' + listener.host +
       ':' + listener.port + '/pocket'
    },
    acc_token: {
      consumer_key: tokens.consumer_key,
      code: ''
    }
  };

  // obtain request token
  function getRequestToken(callback) {
    var request = https.request(api.oauth_request, function(response) {
      var resp_data = '';
      response.on('data', function(data) {
        resp_data += data.toString('utf8');
      });
      response.on('end', function() {
        console.log('Response in getRequestToken:',resp_data);
        var request_token = JSON.parse(resp_data);
        // return request_token for later use
        callback(request_token.code);
      });
    });
    request.write(JSON.stringify(obj.req_token));
    request.end();  
  }

  function getAccessToken(request_token) {
    // ..
    var request = https.request(api.oauth_authorize, function(response) {
      var resp_data = '';
      response.on('data', function(data) {
        resp_data += data.toString('utf8');
      });
      response.on('end', function() {
        var resp = JSON.parse(resp_data);
        tokens.access_token  = resp.access_token;

        // write access token to file
        fs.writeFile('./private/pocket/tokens.json',
          JSON.stringify(tokens));

        // ..
        up_callback();
      });
    });
    var temp_obj = obj.acc_token;
    temp_obj.code = request_token;
    request.write(JSON.stringify(temp_obj));
    request.end();
  }

  function redirectBrowser(request_token) {
    // ..
    createListener(request_token, getAccessToken);
  }

  function createListener(request_token, callback) {
    var server = http.createServer(function(request, response) {
      if (request.url == '/pocket') {
        response.writeHead(200, {'Content-type':'text/plain'});
        response.end('Authorized! Maybe');
        // how to kill server?
        callback(request_token);
      }
    });
    // open browser in server.listen's callback
    server.listen(listener.port, listener.host, function() {
      open('https://getpocket.com/auth/authorize?request_token=' +
        request_token + '&redirect_uri=' + obj.req_token.redirect_uri);
    });
  }
  getRequestToken(redirectBrowser);
}

(function() {
  // authenticate, then callback to addItem
  function aItem() {
    addItem('http://www.faqs.org/docs/artu/ch01s06.html');
  }

  if (tokens.access_token) {
    aItem();
  }
  else {
    authenticate(aItem);  
  }
})();
