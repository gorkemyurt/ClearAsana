define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'text!templates/itemTemplate.html'
], function ($,_, Backbone, Marionette, itemTemplate) {
	'use strict';

	var ItemView = Backbone.Marionette.ItemView.extend({
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

		template: _.template(itemTemplate),

		initialize : function(){
			console.log(this.$el);
			// console.log(this.el);
			var that = this;
			Hammer(this.$el).on("touch release swipeleft", function(ev) {
				that.handleSwipe(ev);
			});

			_.bindAll(this);
    		this.model.on('change', this.render);
    		this.model.on('change-item', this.renderChange);
    	},
    	handleSwipe:function(ev){

    		console.log(ev.type);
    		// switch(ev.type){
    		// 	case
    		// }
    	}
    });
    return ItemView;
	
});

