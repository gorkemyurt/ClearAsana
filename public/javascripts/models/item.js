define([
	'zepto',
	'underscore',
	'backbone',
], function ($, _, Backbone) {
	'use strict';

	var Item = Backbone.Model.extend({
		// idAttribute: "_id",
		urlRoot : '/tasks'
	}); 


	return Item;
	
});

