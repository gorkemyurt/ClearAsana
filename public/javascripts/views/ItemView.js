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

			this.fullWidth = $('.todo').width();
			var that = this;
			this.slidePosition = 0 ;
			this.releaselock = false;
			this.hammerTime = Hammer(this.$el);

			this.hammerTime.on("touch release dragleft", function(ev) {
				that.handleSwipe(ev);
			});

			_.bindAll(this);
    		this.model.on('change', this.render);
    		this.model.on('change-item', this.renderChange);
    	},
    	handleSwipe:function(ev){

    		// var that = this;
    		switch(ev.type){
    			case 'touch':

    			case 'release':
    			
    				// console.log(ev.gesture.deltaX);
    				// this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.5s linear';

					// this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.5s linear';
					// this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0px,0)';
    				// console.log(this.slidePosition);
    				console.log("release" + this.slidePosition);

    				if(this.slidePosition != 0 && Math.abs(this.slidePosition) < 200  ){
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.1s linear';
    					this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';
    					// this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';
    					this.slidePosition = 0;
    					// this.el.getElementsByClassName('top')[0].style.webkitTransition = 'none';
    					break;
    				}
    				else if( this.slidePosition != 0 ){
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
						this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + -(this.fullWidth) + 'px,0)';
						this.$el.find(".check-button").hide();
						this.slidePosition = 0;

						var that = this; 
						setTimeout(function(){
							that.remove();
						}, 500);
						break;
    				}


    			case 'dragleft':
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'none';
						var slideRate = ev.gesture.deltaX * 0.7;
						this.slidePosition = ev.gesture.deltaX;

						if (Math.abs(slideRate) < 200 && slideRate != 0 ){
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.$el.find(".delete-button").css('opacity', 0.3);
							
						}
						else if (Math.abs(slideRate) > 200){
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.$el.find(".delete-button").css('opacity', 1);
    						this.el.getElementsByClassName('delete-button')[0].style.webkitTransform = 'translate(' + (slideRate + (200) ) + 'px,0)';

						}
		
						if (Math.abs(slideRate) > 250) {
    						this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + -(this.fullWidth) + 'px,0)';
							this.$el.find(".check-button").hide();
							this.$el.find(".delete-button").hide();

							this.slidePosition = 0;

							var that = this; 
							setTimeout(function(){
								that.remove();
							}, 300);
							break;
						}

    				
    		}
    	}
    });
    return ItemView;
	
});

