define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',

], function ($,_,Backbone,Marionette){
	var o = {};
	_.extend(o, Backbone.Events);
	return o;
});