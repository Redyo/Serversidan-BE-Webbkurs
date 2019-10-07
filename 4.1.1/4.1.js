const express = require('express');
const hbs = require('hbs');
const app = express();
const port = '8001';

// Första steget; 
// Renderar första exemplet. 
app.get('/', (request, response) => {
	response.render('exempel.hbs');

});
// Funktion för andra steget;
// Renderar andra exemplet beroende på vilken av länkarna man klickade tidigare. Skapar länkar beroende på namnen.
app.get('/exempel', (request,response) => {
	// För att skapa länkarna
	var i = request.url.indexOf('=');
	var query = request.url.substr(i+1);
	var kalle = 'exempel2?name=Kalle Anka&email=kalle-anka@dsv.su.se';
	var kalle2 = 'exempel2?name=Kalle Anka&email=musse-pigg@dsv.su.se';
	var musse2 = 'exempel2?name=Musse Pigg&email=musse-pigg@dsv.su.se';
	var musse = 'exempel2?name=Musse Pigg&email=kalle-anka@dsv.su.se';
	
	if (query == 'Kalle+Anka') {
		response.render('exempel2.hbs',{
			firstLink: "<a href='" + kalle + "'>" + "exempel2?name=Kalle Anka&email=kalle-anka@dsv.su.se",
			secondLink: "<a href='" + kalle2 + "'>" + "exempel2?name=Kalle Anka&email=musse-pigg@dsv.su.se"
		});
	}
	else if(query == 'Musse+Pigg'){
		response.render('exempel2.hbs',{
			firstLink: "<a href='" + musse + "'>" + "exempel2?name=Musse Pigg&email=kalle-anka@dsv.su.se",
			secondLink: "<a href='" + musse2 + "'>" + "exempel2?name=Musse Pigg&email=musse-pigg@dsv.su.se"
		});
	}
	
});

// Tredje steget;
// För att skriva ut informationen. 
app.get('/exempel2', (request,response) => {
	var resultat = "";
	for (var prop in request.query) {
		resultat += `${prop} = ${request.query[prop]}`;	
		resultat += "<br/>";
	}
	response.send(resultat);
});

// Lyssnare
app.listen(port, () => {
	
});

