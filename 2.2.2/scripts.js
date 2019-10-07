var express = require('express');
var fs = require('fs');
var path = require('path');
var fileUpload = require('express-fileupload');
var app = express();
var port = 8001;
var lodash = require('lodash');

// Övre gräns för hur mycket information webbserversidesprogrammet får ta emot
app.use(fileUpload ( {
	limits: { fileSize: 15 * 1024 * 1024 },
}));

// Ladda upp fil via post-knappen;
// Kollar mime-typen hos den uppladdade filen, om det är en image/jpeg, image/png eller text/plain så visas innehållet i filen.
// Annars visas enbart filnamn, mime-typ och storleken på filen som skickades in.
app.post('/upload', function(req, res){
	var file = req.files.filnamn;
	if(file.mimetype == 'text/plain' || 'image/jpeg' || 'image/png'){
		if(file.mimetype == 'text/plain'){
		res.set({'Content-Type': file.mimetype});
		res.send(file.data);
		console.log("Acceptabel fil");
		console.log(file.mimetype + "  en text/plain fil");
	}
	else if(file.mimetype == 'image/jpeg'){
		res.set({'Content-Type': file.mimetype});
		res.send(file.data);
		console.log("Acceptabel fil");
		console.log(file.mimetype + "  en image/jpeg fil");
	}
	else if(file.mimetype == 'image/png'){
		res.set({'Content-Type': file.mimetype});
		res.send(file.data);
		console.log("Acceptabel fil");
		console.log(file.mimetype + "  en image/png fil");
	}
	else{
		let fileSizeMb = lodash.round( (file.data.byteLength / (1024*1024)),4);
		res.set({'Content-Type': 'text/html'});
		res.send(`<p>filnamn: ${file.name}</p> <p>mime-typ: ${file.mimetype}</p> <p>storlek: ${fileSizeMb} MB </p>`);
		console.log("Inte acceptabel fil");
		console.log(file.mimetype + "  ");
	} 
} // app post
}).listen(port, () => {
});







