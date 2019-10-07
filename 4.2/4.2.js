var port = '8001';
var express = require('express'); 
var hbs = require('hbs'); 
var moment = require('moment');
var app = express();

// För kakorna
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Skapar två kakor, en med ett namn och en med en tid.
app.use(function (request, response, next) {
    var tid = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    var timma = 3600000;
    var levnadsTid = 3 * timma;
    response.cookie('namn', "Kakmonstret", { maxAge: levnadsTid, httpOnly: true });
    response.cookie('tid', tid, { maxAge: levnadsTid, httpOnly: true });
	next(); 
});

// Börja här -> rendera för att skriva ut lång text med en länk slutligtvis.
app.get('/', (request, response) => {
	response.render('exempel.hbs');
});

// När länken klickas visas information kring kakorna.
app.get('/exempel2', (request, response) => {
	response.render('exempel2.hbs',{
		namn: request.cookies.namn,
		tid: request.cookies.tid
	});
});

// Lyssnare. 
app.listen(port, () => {

});

