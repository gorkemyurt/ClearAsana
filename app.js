
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , _ = require('underscore')
  , fs = require('fs')
  , path = require('path')
  , passport = require('passport')



  var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')

mongoose.connect(config.db)
// Bootstrap models
var models_path = __dirname + '/app/models'

fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

var app = require('express')()
  , server = require('http').createServer(app)

global = require('./global.js');
global.io = require('socket.io').listen(server);
global.io.set('log level', 2);


//this is important for Heroku
global.io.configure(function () { 
  global.io.set("transports", ["xhr-polling"]); 
  global.io.set("polling duration", 10); 
});




// express settings
require('./config/express')(app, config, passport)

require('./config/passport')(passport, config, env)

// Bootstrap routes
require('./config/routes')(app,passport)

// Start the app by listening on <port>



global.io.sockets.on('connection', function (socket) {
      console.log("I AM HERE");
      global.users[global.id] = socket
    //   global.users[global.id + 1] = socket;
    // }
    // else{
    //   global.users[global.id] = socket;
    // }
    console.log(Object.keys(global.users))
});

var port = process.env.PORT || 3000
server.listen(port)
console.log('Express app started on port '+port)

// Expose app
exports = module.exports = app