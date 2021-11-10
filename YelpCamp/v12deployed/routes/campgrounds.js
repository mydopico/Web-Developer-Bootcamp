var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn,function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
	var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
    var newCampground = {name: name, price: price, image: image, description: desc, author: author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
			// Add username + id to newly created campground
			// Save
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn,function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments likes mylist").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {           
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Campground Like Route
router.post("/:id/like", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
            return res.redirect("/campgrounds");
        }

        // check if req.user._id exists in foundCampground.likes
        // var foundUserLike = foundCampground.likes.some(function (like) {
        //     return like.equals(req.user._id);
        // });

        // if (foundUserLike) {
        //     // user already liked, removing like
        //     foundCampground.likes.pull(req.user._id);
        // } else {
        //     // adding the new user like
        //     foundCampground.likes.push(req.user);
        // }
		foundCampground.likes.push(req.user);

        foundCampground.save(function (err) {
            if (err) {
                console.log(err);
                return res.redirect("/campgrounds");
            }
            return res.redirect("/campgrounds/" + foundCampground._id);
        });
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){	
		Campground.findById(req.params.id, function(err, foundCampground){			
				res.render("campgrounds/edit", {campground: foundCampground});			
		});
});


// UPDATE CAMPGROUND ROUTES

router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});


module.exports = router;