define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'ItemView',
], function ($,_, Backbone, Marionette, ItemView) {
	'use strict';

    var ItemsView = Backbone.Marionette.CollectionView.extend({
    	itemView : ItemView,

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

