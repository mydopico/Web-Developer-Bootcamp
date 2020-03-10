
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app")
// connect to the db cat_app (running in the background mongo demon)
// run node cats.js and now add cat to the DB

var catSchema = new mongoose.Schema({ //how a cat will be define (it's a pattern for data)
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);
//(we compile the schema into a model)

// adding a new cat to the DB

// var george = new Cat({
// 	name: "George",
// 	age: 11,
// 	temperament: "Grouchy"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("something went wrong");
// 	} else {
// 		console.log("we just saved a cat to the database");
// 		console.log(cat);
// 	}
// });
// terminal: mongo - show dbs - use cat_app - show collections
// db.cats.find()

// another way of adding a new cat to the DB

// Cat.create({
// 	name: "Snow White",
// 	age: 15,
// 	temperament: "Nice"
// }, function(err, cat){
// 	if(err){
// 		console.log(err);
// 	} else {		
// 		console.log(cat);
// 	}
// }); // run node cats.js

// retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
	if(err){
		console.log("wrong");
		console.log(err);
	} else {
		console.log("all the cats.....");
		console.log(cats);
	}
});
