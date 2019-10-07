var port = '8001';
var bodyParser = require('body-parser') 
var express = require('express');
var hbs = require('hbs');
var app = express();

// För att kunna parsa POST-kroppen.
app.use(bodyParser.urlencoded({   
	extended: true
})); 

// Steg ett. Använd .html fil som default. Ange namn.
app.get('/', (request, response) => {
	response.sendFile(__dirname + '/views/4.1.2.html');
});

// Steg två. Ange e-post. 
app.post('/exempel', (request, response) => {
	response.render('exempel.hbs',{
		namn: request.body.namn
	})

});

// Steg 3: Informationen som man har angett visas.
app.post('/exempel2', (request, response) => {
	response.render('exempel2.hbs',{
		namn: request.body.namn,
		epost: request.body.epost,
		knapp: request.body.button
	})
});

// Lyssnare
app.listen(port, () => {
	
});



