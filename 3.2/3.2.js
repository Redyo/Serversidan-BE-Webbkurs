var port = '8001';
var express = require('express'); 
var hbs = require('hbs'); 
var app = express(); 

//Skriver ut en mängd variabler där vissa är handplockade och vissa är dynamiska (request.headers ex). Följer en .hbs fil som mall för informationen. 
app.get('/', (request,response) => {
	response.render('omgivningsvariabler.hbs',{
		content: Object.assign(
		{url: request.url}, 
		{method: request.method}, 
		{httpVersion: request.httpVersion}, 
		request.headers,  
		{views: app.settings.views},
		process.env)
	});
});
// Lyssnare
app.listen(port, () => {
});
