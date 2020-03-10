var express = require("express");

var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo_app2", {useUnifiedTopology: true, useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
	secret: "Read books is the best thing",
	resave: false,
	saveUninitialized: false	
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==========================
// ROUTES
// ==========================

app.get("/", function(req, res){
	res.render("home");
});

app.get("/poll", isLoggedIn,function(req, res){
	res.render("poll");
});

// Auth Routes
// show sign up form

app.get("/register", function(req, res){
	res.render("register");
});

// handling user sign up
app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/poll");
		});
	});	
});

// show login form

app.get("/login", function(req, res){
	res.render("login");
});

// login logic
// middleware

app.post("/login", passport.authenticate("local", {
	successRedirect: "/poll",
	failureRedirect: "/login"
}), function(req, res){
	
});

// logout

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}




app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server started....");
});