var sitename = 'Daniel & Cynthia Brown';

var path = require('path');

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "cards"]
var db = require("mongojs").connect(databaseUrl, collections);

exports.home = function(req, res){
	res.render('pages/home', { title: sitename, content: 'home', session: });
};

exports.story = function(req, res){
	var page = path.basename(req.route.path);
	res.render('pages/story', { title: sitename, content: page });
};

exports.wedding = function(req, res){
	var page = path.basename(req.route.path);
	console.log(page);
	if(page === 'cards'){
		var cards = {}
		db.cards.find(null, function(err, cards){
			if(err || !cards) console.log("No cards");
			else cards.forEach( function(card){
				cards = new card({
					name: card.name,
					front: card.front,
					insideLeft: card.insideLeft,
					insideRight: card.insideRight,
					back: card.back
				});
			});
		});
		res.render('pages/wedding', { title: sitename, content: page, cards: cards });	
	} else {
		res.render('pages/wedding', { title: sitename, content: page });
	}
};	

// http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs