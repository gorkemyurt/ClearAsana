define([
  'zepto',
	"marionette",
	"EmailsView",
	"Emails",
  "NoEmailView",
  "Email",
  "moment"
	], function ($, Marionette, EmailsView, Emails, NoEmailView, Email, moment) {

    // set up the app instance
    var MyApp = new Backbone.Marionette.Application()

    MyApp.addRegions({
    });

    MyApp.addInitializer(function(){

    });

    MyApp.start();
    return MyApp;
});