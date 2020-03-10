var express = require("express");
var router = express.Router({mergeParams: true}); // merge params from campgrounds and comments
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// Comments New

router.get("/new", isLoggedIn,function(req, res){
	// find campground by ID	
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground}); 
		}
	});  
});

// Comments Create
router.post("/", isLoggedIn,function(req, res){
	// look up campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){  // create comment
				if(err){
					console.log(err);
				} else { // connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id); // redirect campground show page
				}
			});			
		}
	});		
			
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;
