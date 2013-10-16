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
	    model : itemModel,

	   	initialize : function() {

	   		this.on('change', this.onModelSaved , this);
	   	}
	
	});

	return Items;
});