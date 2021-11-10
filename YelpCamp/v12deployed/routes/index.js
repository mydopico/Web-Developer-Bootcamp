var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

// root route
router.get("/", function(req, res){
    res.render("landing");
});


// =========================
// AUTH ROUTES
// =========================

// show register form
router.get("/register", function(req, res){
	res.render("register", {page: 'register'});
});


// handle sign up logic 

router.post("/register", function(req, res){
	var newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
	});
	User.register(newUser, req.body.password, function(err, user){
		if(err){			
            console.log(err);
            return res.render("register", {error: err.message});					
			
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});


// show login form

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// login logic
router.post("/login", passport.authenticate("local", 
				{
	             successRedirect: "/campgrounds",
				 failureRedirect: "/login"
				}), function(req, res){	
});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully log out");
	res.redirect("/campgrounds");
});

// USER PROFILE

router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    Campground.find().where('author.id').equals(foundUser._id), function(err, campground) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }		
	    res.render("users/show", {user: foundUser, campground: campground});  
	}
 });
});


// //mylist Route
// router.post("/campgrounds/:id/mylist", isLoggedIn, function (req, res) {
	
// 	Campground.findById(req.params.id, function(err, campground){
// 		if(err){
// 			console.log(err);
// 			res.redirect("/campgrounds")
// 		} else {
// 		// create new user
// 			User.create(req.body.user, function(err, user){
// 				if(err){
// 					req.flash("error", "Something went wrong");
// 					console.log(err);
// 				} else {
					
// 					user.mylist.push(campground);
													
					
// 					user.save();
// 					console.log(user.mylist);					
// 					res.redirect('/users/' + user._id);
// 					  }
//             });
//         }
//     });
//  });

// //mylist Route  ***********************************+

router.post("/campgrounds/:id/mylist", isLoggedIn, function (req, res) {
      
           	User.findById(req.params.user_id, function(err, foundUser) {
                   if(err) {
                       console.log(err);
                       return res.redirect("/campgrounds");
                }
                   Campground.findById(req.params.id, function(err, foundCampground) {
                   if(err) {
                       console.log(err);
                       return res.redirect("/campgrounds");
                }
	            foundUser.mylist.push(foundCampground); 
			    foundUser.save(function (err) {
                   if (err) {
                     console.log(err);
                     return res.redirect("/campgrounds");
                    }				
			        res.redirect('/users/' + user._id); 					
    });
  });
});
});



// MIDDLEWARE

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");	
}



module.exports = router;

