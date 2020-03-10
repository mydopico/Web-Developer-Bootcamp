var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});
// "/speak/pig" => "The pig says 'Oink' or /speak/cow" => "The cow says 'Moo'"
app.get("/speak/:animal", function(req, res){
	var sounds ={
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof",
		cat: "I hate you human",
		goldfish: "..."
	}
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];
	res.send("The " + animal + " says '" + sound + "'" );
});


// "/repeat/hello/3" => "hello hello hello"
app.get("/repeat/:message/:times", function(req, res){
	var message = req.params.message;
	var times = Number(req.params.times);
	var result = "";
	for(var i = 0; i < times; i++){
		result += message + " ";		
	}
	res.send(result);
});

app.get("*", function(req, res){
	res.send("Sorry, page not found...What are you doing with your life?");
});

//Tell Express to listen for request (start server)

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server has started");
});