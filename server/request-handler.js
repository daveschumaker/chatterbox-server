/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var messages = {results: []};

var makeID = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports = module.exports = {};
var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = defaultCorsHeaders;
  var URLs = ["/classes/messages", "/classes/messages/send", "/send", "/send/classes/messages", "/classes/room1"];

  headers['Content-Type'] = "application/json";
  
  if(request.method === 'POST' && URLs.indexOf(request.url) !== -1){ 
    var objectID = makeID();
    
    request.on('data', function(data){ 
      var obj = data.toString();
      var objParsed = JSON.parse(obj);
      var tempObj = {
        objectId: objectID,
        username: objParsed.username,
        message: objParsed.message
      }
      messages.results.push(tempObj);
    });

    var statusCode = 201;

    var superString = JSON.stringify(messages.results);
    
    request.on('end', function() {
      response.writeHead(statusCode, headers);

      response.end();
    });
  }

  if(request.method === 'GET' && URLs.indexOf(request.url) !== -1){ 
    var statusCode = 200;
    response.writeHead(statusCode, headers);

    var stringified = JSON.stringify(messages);
    response.end(stringified);
  }

  if(URLs.indexOf(request.url) === -1) { 
    var statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;