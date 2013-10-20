var mongoose = require('mongoose')
, User = mongoose.model('User')
, http = require('https')
, url = require('url')
,querystring = require('querystring')
, global = require('../../global.js')
, _ = require('underscore')
, https = require('https')
, request = require('request')
, querystring = require('querystring');


exports.login = function(req,res){
	if(req.session.user){
		console.log(req.session);
		res.render('index');
	}
	else{
		res.render('login')
	}
}

exports.addTask = function(req, res) {
  console.log("hello");
  var url ='/api/1.0/tasks?workspace=' + req.session.workspace_id;
  console.log(req.session.workspace_id);
  var postBase = "app.asana.com";
  var data = querystring.stringify( {name : req.body.name} );
  console.log(JSON.parse(req.session.user).access_token);
  var options = {
    host: postBase,
    port: 443,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + JSON.parse(req.session.user).access_token,
    }
  };
  var req2 = https.request(options, function(res2) {
    res2.on('data', function(chunk) {
      console.log("BODY" + chunk);
    });
    res2.on('error', function(e){
      console.log(e.message);
    });
  });

  req2.write(data);
  req2.end("ok");
}

exports.editTask = function(req, res) {
  var task_id = req.url.split("/tasks/")[1];
  var url ='/api/1.0/tasks/' + task_id;
  var postBase = "app.asana.com";
  var data = querystring.stringify( {name : req.body.name});
  var options = {
    host: postBase,
    port: 443,
    path: url,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + JSON.parse(req.session.user).access_token,
    }
  };
  var req2 = https.request(options, function(res2) {
    res2.on('data', function(chunk) {
      console.log(chunk);
    });

  });

  req2.write(data);
  req2.end();
}

exports.deleteTask = function(req,res){
  var postBase = "app.asana.com";
  var task_id = req.url.split("/tasks/")[1];
  var url = '/api/1.0/tasks/' + task_id;
  console.log(url);
  var options = {
    host: postBase,
    port: 443,
    path: url,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + JSON.parse(req.session.user).access_token,
    }
  };
  var req2 = https.request(options, function(res2) {
    res2.on('data', function(chunk) {
    });
    res2.on('end', function() {
      res.send(200);
    });
  });
  req2.end();
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
      if (req.session["workspace"] == null) {
        req.session["workspace_id"] = JSON.parse(output).data.workspaces[0].id;
      }
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
          // checkTask(req, res, output2[0]);
        });
      });
      req3.end();
    });
  });
  req2.end();

  //
}

