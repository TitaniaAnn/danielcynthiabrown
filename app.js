var express = require('express')
  , pages = require('/routes/pages')
  , http = require('http')
  , path = require('path')
  //, mongoose = require('mongoose')
  //, db = mongoose.connect('mongo://localhost/mydb')
  //, Schema = mongoose.Schema;
  , mongo = require('/models/main');

var app = express();

/*var Users = new Schema({
	user: String,
	pass: String,
	role: String,
	active: Boolean,
	email: String,
	name: String
});*/

//var userModel = mongoose.model('users', Users);


app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});


app.use(express.session());

// routing
app.get('/', pages.home);
app.get('/home', pages.home);
app.get('/story', pages.story);
app.get('/wedding', pages.wedding);
app.get('/wedding/ceremony', pages.wedding);
app.get('/wedding/video', pages.wedding);
app.get('/wedding/pictures', pages.wedding);
app.get('/wedding/cards', pages.wedding);

// create server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// https://github.com/flockonus/simple_auth_express_mongoose/blob/master/app.js
// http://stackoverflow.com/questions/9844564/render-image-stored-in-mongo-gridfs-with-node-jade-express
// http://www.rockhowse.com/?p=28


