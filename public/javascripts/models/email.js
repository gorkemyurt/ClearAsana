define([
	'zepto',
	'underscore',
	'backbone',
], function ($, _, Backbone) {
	'use strict';

	var Email = Backbone.Model.extend({
		// idAttribute: "_id",
		// urlRoot : '/email'
	}); 


	return Email;
	
});

