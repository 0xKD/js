/* express.js - web app framework */
var fs = require('fs');
var config = {
  host: '127.0.0.1',
  port: '8282'
};

var characters = {
  '1': {
    name: 'Tyrion Lannister',
    house: 'Villains'
  },
  '2': {
    name: 'Ned Stark',
    house: 'Beheaded'
  }
};
// create server
var express = require('express');
var app = express();

// to serve static files
app.use(express.static(__dirname + '/files'));

app.get('/', function(request, response) {
  response.send('King\'s Landing');
});

// use paramater from url
app.get('/hello/:data', function(request, response) {
  response.send('You sent: ', request.params.data);
});

app.get('/character/:id', function(request, response) {
  if (request.params.id in characters) {
    response.send(characters[request.params.id]); 
  }
  else {
    response.send('Oops!', 400);
  }
  
});

app.listen(config.port);
