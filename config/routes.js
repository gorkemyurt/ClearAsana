/**
 * Controllers
 */

var users = require('../app/controllers/users');
var https = require('https');

/**
 * Expose routes
 */


module.exports = function (app, passport) {

	app.get('/redirect', function(req,res){
			var code = req.url.split("=")[1];
			var postBase = "app.asana.com";

			var options = {
				host: postBase,
				port: 443,
				path: '/-/oauth_token?grant_type=authorization_code&client_id=8251548813361&client_secret=3172e3f14a96ee0463067f2f62b3c764&redirect_uri=http://localhost:3000/redirect&code=' + code,
				method: 'POST',
				headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				}
			};

			var req2 = https.request(options, function(res2) {
			        var output = '';
			        res2.setEncoding('utf8');

			        res2.on('data', function (chunk) {
			            output += chunk;
			        });

			        res2.on('end', function() {
			        	console.log(output);
			        	req.session.user = output;
			        	res.redirect("/");

			        });
			});
			req2.end();

	});

	app.get('/logout', function(req,res){
		req.session.user = null;
		res.redirect('/');
	});

	app.get('/', users.login);
	app.delete('/tasks/:id', users.deleteTask);
	// app.put('tasks/:id', users.editTask);
	// app.post('/tasks', users.addTask);
	app.get('/tasks', users.getTasks);


}
