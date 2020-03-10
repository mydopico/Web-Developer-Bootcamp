
var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground    = require("./models/campground"),
	seedDB        = require("./seeds"),
	Comment       = require("./models/comment"),
    User          = require("./models/user");

// requiring routes
var commentRoutes      = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campgrounds"),
	indexRoutes        = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seed the DB
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Rusty is the best dog in the earth",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user; // available in the template
	next(); // go to all routes
});

 app.use(indexRoutes);   
 app.use("/campgrounds", campgroundRoutes);   
 app.use("/campgrounds/:id/comments", commentRoutes);   


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});