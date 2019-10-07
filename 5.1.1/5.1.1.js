var express = require('express'); 
var hbs = require('hbs'); 
var moment = require('moment'); 
var app = express();
var port = '8001';
var bodyParser = require('body-parser') 
var mailer = require('express-mailer');
var config = require('config');

// För att parsa POST-kroppen.
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

app.set('view engine', 'hbs');
// Koppla ihop med gmail-konto
var mailConfig = config.get('Email');
mailer.extend(app, mailConfig);

// Filen som används som formulär;
app.get('/', (request, response) => {
	response.sendFile(__dirname + '/views/form.html');
});

// För att skicka iväg mejlet, samt visa en kopia av mejlets innehåll.
// Börjar med att kolla om de obligatoriska fälten är ifyllda, om de inte är det skickas ett meddelande
// annars skickas mejlet och kopian visas.
app.post('/send', (request,response) => {
	var datum = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
	if (request.body.password != '1234' ||  !request.body.to || !request.body.from || !request.body.subject) {
		response.send("Lösenord, från, till, och ärende måste fyllas i och lösenordet måste vara korrekt");
	}
	else {
		var formEgenskaper = {...request.body};
		app.mailer.send('email', formEgenskaper, () => {
			response.render('copy.hbs',{
				from: request.body.from,
				to: request.body.to,
				cc: request.body.cc,
				bcc: request.body.bcc,
				subject: request.body.subject,
				message: request.body.message,
				date: datum
			});
		}); 		
	} 
}); 
// Lyssnare
app.listen(port, () => {
});
