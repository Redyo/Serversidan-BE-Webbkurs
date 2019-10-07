var MongoClient = require('mongodb').MongoClient;
var express = require('express'); 
var hbs = require('hbs'); 
var moment = require('moment'); 
var app = express();
var fs = require('fs');
var port = '8001';
var bodyParser = require('body-parser') 
var moment = require('moment'); 
var list = []; // Listan f�r elementen
var db; // Databas-ref
var username = "";
var namn = "";
logIn = false;


// Anv�nd HBS
app.set('view engine', 'hbs');
// F�r att kunna parsa POST-kroppen.
app.use(bodyParser.urlencoded({   
	extended: true
})); 

// Vid start anv�nd denna .hbs fil.
app.get('/', (request, response) => {
	response.render('start.hbs',{
		post: list
	});
});
// F�r att h�mta events.
app.get('/events', (request, response) => {
	if(logIn){
		response.render('socialactivity.hbs',{
			post: list
		});
	}
	if(!logIn){
		response.redirect('/login');
	}
});

// F�r att f� fram formul�ret f�r att skapa event
app.get('/make', (request, response) => {
	if(logIn){
		response.render('form.hbs',{
			post: list
		});
	}
	if(!logIn){
		response.redirect('/login');
	}
});

// Inloggning
app.get('/logIn', (request, response) => {
	response.render('start.hbs',{
		post: list
	});
});
// Utloggning
app.get('/logout', (request, response) => {
	logIn = false;
	response.render('start.hbs',{
		post: list
	});
});
// Utloggning
app.post('/logout', (request, response) => {
	logIn = false;
	response.render('start.hbs',{
		post: list
	});
});
// Visa events
app.post('/events', (request, response) => {
	if(logIn){
		response.render('socialactivity.hbs',{
			post: list
		});
	}
	if(!logIn){
		res.redirect('/logIn');
	}
});
// F�r inloggning
app.post('/logIn', (request, response) => {
	username = '0'+request.body.username;
	var pass = request.body.pass;
	MongoClient.connect('mongodb://test123:test123@ds119150.mlab.com:19150/redyodatabase', (err, client) => {  
	if (err) {
		return console.log(err);
	}
	
	db = client.db('redyodatabase');
	console.log(db.collection.size);
	db.collection('users').find().forEach(function(item){
		if("0"+item.username == username && item.pass == pass){
			response.redirect('/events');
			console.log("hej" + username, + " " + item.username);
		}
		else{
			//response.render('start.hbs',{
			//post: list
			//});
		}
	})
	
			
	client.close();
	});
	
	
	logIn = true;
});

// F�r att skapa konto
app.post('/create', (req, res) => {
		res.render('create.hbs',{
			post: list
		});
});
// Skapar konto
app.post('/createUser', (req, res) => {
	addUser(req.body.username, req.body.email, req.body.password);
	res.render('create.hbs',{
		post: list
	});
	
	// Kontroll beh�vdes h�r givetvis, men samma problem som i logIn existerar h�r, se pdf f�r mer info.
	res.redirect('/events');
	logIn = true;
	username = req.body.username;
});
// F� fram formul�ret f�r att skapa event
app.post('/make', (request, response) => {
	if(logIn){
		response.render('form.hbs',{
			post: list
		});
	}
	if(!logIn){
		res.redirect('/logIn');
	}

});

// Skapa event
app.post('/createEvent', (req,res) => {
	if(logIn){
		// Tyv�rr skickas username med en 0:a f�re, det beh�ver kollas. 
		var nyString = "";
		if (username.indexOf("0") + 1 ){
			nyString = username.substring(1);
		}
		else{
			nyString = username;
		}
		
		var datum = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
		add(nyString, req.body.datumevent, req.body.typ, req.body.kommentar, datum);
		res.render('form.hbs',{
			post: list
		});
	}
	res.redirect('/events');
}); 

// L�gga till anv�ndare i databasen
function addUser(u, e, p){
	username = u;
		MongoClient.connect('mongodb://test123:test123@ds119150.mlab.com:19150/redyodatabase', (err, client) => {  
		if (err) {
			return console.log(err);
		}
		// Sj�lva skapandet
		db = client.db('redyodatabase');
		db.collection('users').insertOne(
		{
		username: u,
		email: e,
		pass: p
		});

		client.close();
	});
}
// Skapar ett element i databasen;
// L�gga till event
function add(n, de, t, k, d){
	MongoClient.connect('mongodb://test123:test123@ds119150.mlab.com:19150/redyodatabase', (err, client) => {  
		if (err) {
			return console.log(err);
		}
		// Sj�lva skapandet
		db = client.db('redyodatabase');
		db.collection('events').insertOne(
		{
		namn: n,
		datumevent: de,
		typ: t,
		kommentar: k,
		datum: d
		});
		// Listan m�ste rensas eftersom listan annars kommer inneh�lla gamla element + det nya som l�ggs till (dvs det blir flertal dubletter av elementen om den inte rensas)
		list = [];
		// L�gg till alla element fr�n databasen i listan
		db.collection('events').find().forEach(function(item){
			list.push(item);
			
		})
		client.close();
	});
}



// Anslutning till databasen och h�mta alla element d�r.
MongoClient.connect('mongodb://test123:test123@ds119150.mlab.com:19150/redyodatabase', (err, client) => {  
	if (err) {
		return console.log(err);
	}
	console.log("Anslutning till databasen lyckades");

	db = client.db('redyodatabase');
	db.collection('events').find().forEach(function(item){
		list.push(item);	
		
	})
	client.close();
});




// Lyssnare
app.listen(port, () => {
	
});