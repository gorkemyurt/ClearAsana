 
var express = require('express')
// var passport = require('passport')

module.exports = function (app, config, passport) {

     // set views path, template engine and default layout
   app.set('views', config.root + '/app/views');
   app.set('view engine', 'jade');


   app.configure(function(){
    // app.set("view options", {layout: false});
    app.use(express.static('../app/views'));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use( express.cookieParser() );
    app.use(express.session({ secret: '498f99f3bbee4ae3a075eada02488464' } ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.root + '/public'));
    app.use(app.router);

  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });


}