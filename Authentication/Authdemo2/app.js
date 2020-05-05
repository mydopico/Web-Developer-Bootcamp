var express = require("express");

var app = express();
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo_app2", {useUnifiedTopology: true, useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());

// PASSPORT CONFIGURATION
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


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");	
   next();
});

// ==========================
// ROUTES
// ==========================

app.get("/", function(req, res){
	res.render("home");
});

app.get("/poll", isLoggedIn, function(req, res){
	res.render("poll");
});

// Auth Routes
// show sign up form

app.get("/register", function(req, res){
	res.render("register");
});

// handling user sign up
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'secretcode123') {
      newUser.isAdmin = true;
    }
	User.register(newUser, req.body.password, function(err, user){	
		if(err){
			console.log(err);
			// req.flash("error", err.message);
			return res.render("register", {error: err.message});
			// return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome LONG" );
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
	failureRedirect: "/login",
	failureFlash: true
    // successFlash: 'Welcome!'	
}), function(req, res){	
});

// logout

app.get("/logout", isLoggedIn, function(req, res){
	req.logout();
	req.flash("success", "See you soon!");
	res.redirect("/login");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		if( req.user.isAdmin){
		return next();
	    }
	}
	req.flash("error", "You do not have permission!");
	res.redirect("/login");
}




app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server started....");
});