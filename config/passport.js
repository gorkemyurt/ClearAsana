var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose')
var User = mongoose.model('User')
var users = [];
var gcal = require('google-calendar');

module.exports = function (passport, config, env) { 
	  if(env == "development"){
	  	var URL =  "http://localhost:3000/oauth2callback"
	  }
	  else if(env == "staging"){
	  	var URL = 'http://staginggorkemnutrition.herokuapp.com/oauth2callback'	
	  }
	  else{
	  	var URL = 'http://karrot.herokuapp.com/oauth2callback'	    // realm: 'http://localhost:3000'

	  }
	  passport.serializeUser(function(user, done) {
	    done(null, user)
	  })

	  passport.deserializeUser(function(obj, done) {
	    // user.accessToken = accessToken;
	    done(null, obj);
	  })

	passport.use(new GoogleStrategy({
		clientID: "252616041049.apps.googleusercontent.com",
    	clientSecret: "ghJDNxZMw1jEJc-6UnFAMaz4",
	    callbackURL: URL	    // realm: 'http://localhost:3000'
	  },
	  function(accessToken,refreshToken , profile, done) {
	  	profile.accessToken = accessToken;
        done(null, profile);
	    User.findOrCreate({ openId: profile.id }, profile , function(err, user) {
	      done(err, user);
	    });
	  }
	));

}