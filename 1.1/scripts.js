var file = "visits.txt";
var port = 8001;
var fileSystem = require('fs');
var http = require("http");
var currentVisits = 0;

// Skapar en HTTP server som svarar med "plain-text" och räknar besök (se if-sats)
var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	if (request.url !== "/favicon.ico") {
	response.write(`visits: ${readAndSave()}`);
	}
	response.end();
});
server.listen(port);

// Metod som används för att läsa av filen visits.txt och öka innehållet i den med 1. 
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

