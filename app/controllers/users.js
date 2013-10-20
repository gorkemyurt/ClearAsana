var mongoose = require('mongoose')
  , User = mongoose.model('User')
 , http = require('https')
 , url = require('url')
 ,querystring = require('querystring')
 , global = require('../../global.js')
 , _ = require('underscore')

exports.login = function(req,res){
	if(req.user){
	}
	else{
		res.render('login')
	}
}



