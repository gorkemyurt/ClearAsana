/**
 * Controllers
 */

var users = require('../app/controllers/users');
var https = require('https');

/**
 * Expose routes
 */


module.exports = function (app, passport) {

 // twitter auth
	
	app.get('/auth/google', passport.authenticate('google', {scope : [ 'openid', 'email', "https://www.googleapis.com/auth/calendar"]}));

	app.get('/redirect', function(req,res){
			console.log(req.url);
			var code = req.url.split("=")[1];
			var postBase = "app.asana.com";

			console.log('/-/oauth_token?grant_type=authorization_code&client_id=8251548813361&client_secret=3172e3f14a96ee0463067f2f62b3c764&redirect_uri=http://localhost:3000/redirect&code=' + code
);
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
			            // var obj = JSON.parse(output);
			            // res.render('index', {title: output});
			        });
			    });

			    req2.on('error', function(err) {
			    	console.log(err);
			        //res.send('error: ' + err.message);
			    });

			    req2.end();

			// res.redirect("/");
	});

	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});
	
	app.get('/', users.login);


}