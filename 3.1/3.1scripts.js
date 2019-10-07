var fileSystem = require('fs'); 
var express = require('express'); 
var app = express(); 
var port = '8001';
var file = "visits.txt";
var hbs = require('hbs'); 
var currentVisits = 0;

app.set('view engine', 'hbs');

// Funktion för att registrera besöken;
hbs.registerHelper('visits', () => {
	readAndSave();
	return currentVisits;
});

// Rendera med en statisk mall;
app.get('/', (req,res) => {
	res.render('static.hbs');
});

// Från uppgift 1.1 ->
// Läser av filen först, sedan läser den in antalet visningar som finns i textfilen, och skriver sedan in det nya värdet i filen (gamla visningar + 1).
// Annars returnerar den ett error om det inte går.
var readAndSave = () => {
	try {
		let visits = fileSystem.readFileSync(file);
		currentVisits = parseInt(visits) + 1;
		fileSystem.writeFileSync(file, currentVisits);
		return parseInt(visits);
	}
	catch (e){
		console.log(`Error: ${e}.`);
		return 0; 
	}
}
// Lyssnare
app.listen(port, () => {

});