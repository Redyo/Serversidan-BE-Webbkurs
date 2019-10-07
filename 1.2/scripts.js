var util = require('util');
var http = require('http');
var port = 8001;

// Skapar en HTTP-server som svarar med klientens objektförfrågan i "plain-text".
var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write( util.inspect(request) );
	response.end();
});
server.listen(port);
