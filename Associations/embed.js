var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useUnifiedTopology: true, useNewUrlParser: true});

// POST: title, content

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// USER: email, name

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email: "hermione@hogwarts.edu",
// 	name: "Hermione Granger"
// });

// newUser.posts.push({
// 	title: "How to brew polyjuice potion",
// 	content: "Just kidding. Go to potion class"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "My first post",
// 	content: "vdsaganfbhadlkb vdafbvfdmabl"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name: "Hermione Granger"}, function(err, user){
	if(err){
		//console.log(err);
	} else {
		user.posts.push({
			title: "3 things I really hate",
			content: "Voldemort. Voldemort. Voldemort"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});



