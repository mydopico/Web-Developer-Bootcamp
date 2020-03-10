var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
	//res.send("Welcome to the home page");
});

app.get("/fallinlovewith/:thing", function(req, res){
       var thing = req.params.thing;
       res.render("love", {thingVar:thing});
});

app.get("/posts", function(req, res){
	var posts =  [
		{title: "Post 1", author: "Suzy"},
		{title: "Adorable pets", author: "Yoly"},
		{title: "Last Terminator movie", author: "Charlie"}
	];
	res.render("posts", {posts: posts});
});


//Start the server
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server started..");
});
