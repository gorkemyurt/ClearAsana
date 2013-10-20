define([
	'zepto',
	'underscore',
	'backbone',
], function ($, _, Backbone) {
	'use strict';

	var Item = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot : '/tasks'
	}); 


	return Item;
	
});

