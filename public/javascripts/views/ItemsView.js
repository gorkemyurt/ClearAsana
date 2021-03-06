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
			// for (var item in this.collection.models){
			// 	console.log("i am here");
			// 	this.collection.models[item].set("rank", 'div' + (this.collection.models.length + 1 - item));
			// }

    	},
    	onBeforeRender: function(){
    		// console.log(this.collection);
    		this.collection.sort();
			for (var item in this.collection.models){
				this.collection.models[item].set("rank", 'div' + (this.collection.models.length + 1 - item));
			}

  		},
    	appendHtml: function(collectionView, itemView){
    		var target = this.collection.models.length ;
    		for (var item in this.collection.models){
    			if(this.collection.models.length - item > 7){
    				var mark = this.collection.models.length + 1;
    			}
    			else{
    				var mark = item;
    			}
				this.collection.models[item].set("rank", 'div' + (this.collection.models.length + 1 - mark));
			}

    	// var counter = 1;
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return ItemsView;

});

