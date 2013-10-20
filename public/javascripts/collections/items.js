define([
	'zepto',
	'underscore',
	'backbone',
	'Item',
	'marionette',
	'socketio'
], function ($, _, Backbone, itemModel, Marionette, io) {
	'use strict';

	var Items = Backbone.Collection.extend({
		url : '/tasks',
	    model : itemModel,

	   	initialize : function() {
	   		// this.on('change', this.onModelSaved , this);
	   	},
	   	parse: function(response){
	   		console.log(response);
            return response.data;
        },
	   	comparator: function(model) {
			if(model.get("completed"))
				return -1;
			else{
				return 1;
			}

    	},

	});

	return Items;
});


// setInterval(function() {
//   channel.fetch();
// }, 10000);