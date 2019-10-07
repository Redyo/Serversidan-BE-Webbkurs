var express = require('express');
var util = require('util');
var serverApp = express();
var port = 8001;

// Använder sig av express server app som reagerar till GET förfrågor. Formatterar om det som skickas in till ett fint format med radbrytning mellan olika nyckel/värden-par.
serverApp.get('/returnquery', function(request, response) {
	response.set({
	'Content-Type': 'text/plain',
	});
	var res = "";
	for (var attr in request.query) {
		res += `${attr} = ${request.query[attr]}`;
		res += `\n`
	}
	response.send(res);
	response.end();
})
serverApp.listen(port);