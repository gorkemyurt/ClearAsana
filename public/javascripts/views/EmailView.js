define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
], function ($,_, Backbone, Marionette) {
	'use strict';

	var EmailView = Backbone.Marionette.ItemView.extend({
	    events: function(){
	    	var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
	    	var events_hash = {
    			// insert all the events that go here regardless of mobile or not
  			};
			if (isMobile) {
			    _.extend(events_hash, {"tap .delete-fooditem": "deleteFoodItem"});

			} else {
			    _.extend(events_hash, {"click .delete-fooditem" : "deleteFoodItem"});
			}
			return events_hash;
	    },

		// template: _.template(emailTemplate),

		initialize : function(){
			_.bindAll(this);
    		this.model.on('change', this.render);
    		this.model.on('change-item', this.renderChange);

    });
    return EmailView;
	
});

