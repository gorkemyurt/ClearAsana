define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'EmailView',
], function ($,_, Backbone, Marionette, EmailView) {
	'use strict';

    var EmailsView = Backbone.Marionette.CollectionView.extend({
		appendHtml: function(collectionView, itemView){
			console.log(this.options.type);
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return EmailsView;
	
});

