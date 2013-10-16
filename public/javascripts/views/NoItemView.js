define([
	'underscore',
	'backbone',
	'marionette',
	'Item',
	// 'text!templates/NoEmailTemplate.html',
	'Items'

], function (_, Backbone, Marionette,Item , Items ) {
	'use strict';


	var NoItemView = Backbone.Marionette.ItemView.extend({

		template: "#NoEmailTemplate",

		events:{
	          'click .sendEmail' : 'sendFakeEmail'
	    }

		});
	    return NoItemView;
	
});

