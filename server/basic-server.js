/* Import node's http module: */
var express = require('express');
var app = express();

var messages = {results: [{
  objectId: 12345,
  username: 'friendly chatterbot',
  message: 'lulz! hi there. :)'
}]};

var makeID = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

app.use('/chatterbox', express.static('../client'));

app.get('/classes/messages', function (req, res) {
  //res.sendStatus(200)
  res.send(messages);
});

app.get('/classes/room1', function (req, res) {

});

app.post('/classes/messages', function (req, res) {
  var objectID = makeID();

  req.on('data', function(data){ 
    var obj = data.toString();
    var objParsed = JSON.parse(obj);
    var tempObj = {
      objectId: objectID,
      username: objParsed.username,
      message: objParsed.message
    }
    messages.results.push(tempObj);
  });
  
  res.sendStatus(201)
  res.send();

});


var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Listening on port: %s', port);
});






///////////////
// OLD STUFF //
///////////////

// var port = 3000;
// var ip = "127.0.0.1";

// // After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(handleRequest.requestHandler);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);