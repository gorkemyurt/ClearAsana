var mongoose = require('mongoose')
  , User = mongoose.model('User')
 , http = require('https')
 , url = require('url')
 ,querystring = require('querystring')
 , global = require('../../global.js')
 , _ = require('underscore')

exports.login = function(req,res){
	if(req.user){
		global.id = req.user.id;
		global.email = req.user.email;
		console.log(req.user);
		res.send(req.profile);
		res.render('index' , {user : req.user.id});
	}
	else{
		res.render('index')
	}
}



