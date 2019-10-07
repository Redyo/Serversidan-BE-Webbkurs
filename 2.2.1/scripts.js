var express = require('express');
var app = express();
var port = 8001;

// Se till att bodyParser parsar POST-kroppen till ett javascript objekt (request.body);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


// Get funktion som svarar klienten med informationen som skickades in.
app.get('/get_it', function(request, response) {
	response.set({
		'Content-Type': 'text/plain',
	});
	response.send(printResponse(request.query));
	response.end();
})

// Post funktion som svarar klienten med informationen som skickades in.
app.post('/post_it', function(request, response){
	response.set({
		'Content-Type': 'text/plain',
	});
	response.send(printResponse(request.body));
	response.end();
})
app.listen(port);

// Skriv ut informationen
function printResponse(r) {
	var res = "";
	for (var attr in r) {
		res += `${attr} = ${r[attr]}`;
		res += `\n`
	}
	return res;
}

