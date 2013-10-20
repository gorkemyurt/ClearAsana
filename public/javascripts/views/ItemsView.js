define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'ItemView',
	'events'
], function ($,_, Backbone, Marionette, ItemView,Events) {
	'use strict';

    var ItemsView = Backbone.Marionette.CollectionView.extend({
    	itemView : ItemView,
    	initialize:function(){
    		var that = this;
			Events.on("collection:Reorder", function(){
				that.render();
			});
    	},
    	onBeforeRender: function(){
    		// console.log(this.collection);
    		this.collection.sort();
  		},
    	appendHtml: function(collectionView, itemView){
    	// var counter = 1;
			for (var item in this.collection.models){

				this.collection.models[item].set("rank", 'div' + (this.collection.models.length + 1 - item));
			}
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return ItemsView;
	
});

