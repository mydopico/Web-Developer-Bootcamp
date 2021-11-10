var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
    lastName: String,
    email: String,
	mylist: [
		
		{
			type: mongoose.Schema.Types.ObjectId,			     
			ref: "Campground"
		}
		
	]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);