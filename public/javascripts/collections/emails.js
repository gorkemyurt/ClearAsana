define([
	'zepto',
	'underscore',
	'backbone',
	'Email',
	'marionette',
	'socketio'
], function ($, _, Backbone, emailModel, Marionette, io) {
	'use strict';

	var Emails = Backbone.Collection.extend({

		url : '/emails',
	    model : emailModel,

	   	initialize : function() {
	   		this.on('change', this.onModelSaved , this);
	   	}
	  //  		var that = this;
		 //    var socket = io.connect();

			// socket.on('email', function (data) {
			// 	console.log("aHEY aHEY")
			// 	console.log(data);
			// 	var newEmail = new emailModel(data);
			// 	that.add(newEmail);
			// });

	  //  	},
	   	// onModelSaved : function(model, val, options){
	   	// 	console.log("I am in my collection");
	   	// }
	
	});

	return Emails;
});