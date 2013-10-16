define([
	'underscore',
	'backbone',
	'marionette',
	'Email',
	// 'text!templates/NoEmailTemplate.html',
	'Emails'

], function (_, Backbone, Marionette,Email , Emails ) {
	'use strict';


	var NoEmailView = Backbone.Marionette.ItemView.extend({

		template: "#NoEmailTemplate",

		events:{
	          'click .sendEmail' : 'sendFakeEmail'
	    }

		});
	    return NoEmailView;
	
});

