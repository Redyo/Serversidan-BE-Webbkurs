var MongoClient = require('mongodb').MongoClient;
var express = require('express'); 
var hbs = require('hbs'); 
var moment = require('moment'); 
var app = express();
var port = '8001';
var bodyParser = require('body-parser') 
var moment = require('moment'); 
var list = []; // Listan f�r elementen
var db; // Databas-ref

// Anv�nd HBS
app.set('view engine', 'hbs');
// F�r att kunna parsa POST-kroppen.
app.use(bodyParser.urlencoded({   
	extended: true
})); 

// Vid start anv�nd denna .hbs fil.
app.get('/', (request, response) => {
	response.render('form.hbs',{
		post: list
	});
});


app.post('/send', (req,res) => {
	var datum = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
	add(req.body.namn, req.body.epost, req.body.hemsida, req.body.kommentar, datum);
	res.render('form.hbs',{
		post: list
	});
	res.redirect('/');
}); 

// Skapar ett element i databasen;

function add(n, e, h, k, d){
	MongoClient.connect('mongodb://test123:test123@ds119150.mlab.com:19150/redyodatabase', (err, client) => {  
		if (err) {
			return console.log(err);
		}
		// Sj�lva skapandet
		db = client.db('redyodatabase');
		db.collection('guestbook').insertOne(
		{
		namn: n,
		epost: e,
		hemsida: h,
		kommentar: k,
		datum: d
		});
		// Listan m�ste rensas eftersom listan annars kommer inneh�lla gamla element + det nya som l�ggs till (dvs det blir flertal dubletter av elementen om den inte rensas)
		list = [];
		// L�gg till alla element fr�n databasen i listan
		db.collection('guestbook').find().forEach(function(item){
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
	db.collection('guestbook').find().forEach(function(item){
		list.push(item);	
	})
	client.close();
});

// Lyssnare
app.listen(port, () => {
	
});