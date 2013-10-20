var mongoose = require('mongoose')
  , User = mongoose.model('User')
 , http = require('https')
 , url = require('url')
 ,querystring = require('querystring')
 , global = require('../../global.js')
 , _ = require('underscore')

exports.login = function(req,res){
	if(req.session.user){
		console.log(req.session);
		res.render('index');
	}
	else{
		res.render('login')
	}
}

exports.deleteTask = function(req,res){
  console.log("lalala");
}



