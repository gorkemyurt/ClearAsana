var mongoose = require('mongoose')
, User = mongoose.model('User')
, http = require('https')
, url = require('url')
,querystring = require('querystring')
, global = require('../../global.js')
, _ = require('underscore')
, https = require('https')

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
  return {};
}

exports.getTasks = function(req, res) {
  var user_id = JSON.parse(req.session.user).data.id;
  var url = '/api/1.0/users/' + user_id;
  var postBase = "app.asana.com";
  //function to get workspace id
  var options = {
    host: postBase,
    port: 443,
    path: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + JSON.parse(req.session.user).access_token,
    }
  };


  var req2 = https.request(options, function(res2) {
    console.log("reached req2");

    var output = '';
    res2.setEncoding('utf8');

    res2.on('data', function (chunk) {
        output += chunk;
    });

    res2.on('end', function() {
      var url2 = '/api/1.0/tasks?workspace=' + JSON.parse(output).data.workspaces[0].id + '&assignee=me';
      var options2 = {
        host: postBase,
        port: 443,
        path: url2,
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + JSON.parse(req.session.user).access_token,
        }
      };
      var req3 = https.request(options2, function(res3) {
        var output2 = '';
        res3.setEncoding('utf8');
        res3.on('data', function (chunk2) {
          output2 += chunk2;
        });
        res3.on('end', function() {
        	console.log(output2);
        	res.send(output2, 200);
        });
      });
      req3.end();
    });
  });
  req2.end();
}



