var mongoose = require('mongoose')
    ,Schema = mongoose.Schema


var userSchema = new Schema({
	googleID : String,
	accessToken : String,
	email : String,
	openId: Number,
	phoneNumber: String
	// Logs : [{type: Schema.ObjectId, ref: 'events'}]
});



userSchema.statics = {

	findOrCreate : function ( query , profile , cb) {
		var that = this;
		this.find({googleID : profile.id})
			.exec(function (err, user){
				if(user.length != 0){
					console.log(user);
					return user;
				}
				else{
					var newUser = new that({
						googleID : profile.id,
						accessToken : profile.accessToken,
						email : profile.emails[0].value
					});
					newUser.save(function (err) {
						if(err)console.log(err);
						console.log("user sucessfully created");
					})
				
				}
			})
	},

	findAndStoreEmail : function (senderEmail , incomingEmail, cb){
		var Usr = this;
		this.find({email : senderEmail})
			.exec(function (err, user){
				if(user.length != 0){
					// incomingEmail.Owner = new Usr(user);
					var newEmail = new Email(incomingEmail);
					newEmail.save(function (err){
						newEmail.Date.setHours(12);
						newEmail.Date.setMinutes(0);
						newEmail.Date.setSeconds(0);
						newEmail.Date.setMilliseconds(0);

						console.log(newEmail);
						user[0].SentEmails.push(newEmail);
						user[0].save();
						cb(newEmail);
					})
				}
				else{
					return "user doesnt exist!"
				}
			})
	}

}

module.exports =  {
	model :  mongoose.model('User', userSchema),
	schema : userSchema
}



// mongoose.model('User', userSchema);