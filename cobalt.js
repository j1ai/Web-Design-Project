var express = require('express');
var cobalt = require('cobalt-uoft');
var request = require('request')

var app = express();

var port = process.env.PORT || 4242;

// Serve the Cobalt APIs on the /cobalt URL prefix
app.use('/cobalt', cobalt.Server);

// Hello world
app.get('/', function(req, res) {
  res.status(200).send('Hello, world!');
});

app.get('/test', function(req, res) {
    request.get('/cobalt/api/1.0/textbooks?limit=2', function(err, _res, body) {
        data = JSON.parse(body)
        console.log(res)
        console.log(data)
        res.send(data)
    })
  res.status(200).send('Hello, world!');
});

app.listen(port, function() {
  console.log('Server running on port ' + port + '.');
});
