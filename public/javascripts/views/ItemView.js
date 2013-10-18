define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'events',
	'text!templates/itemTemplate.html'
], function ($,_, Backbone, Marionette,Events, itemTemplate) {
	'use strict';

	var ItemView = Backbone.Marionette.ItemView.extend({
	    events: function(){
	  //   	var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
	  //   	var events_hash = {
   //  			// insert all the events that go here regardless of mobile or not
  	// 		};
			// if (isMobile) {
			//     _.extend(events_hash, {"tap .delete-fooditem": "deleteFoodItem"});

			// } else {
			//     _.extend(events_hash, {"click .delete-fooditem" : "deleteFoodItem"});
			// }
			// return events_hash;
	    },

		template: _.template(itemTemplate),

		initialize : function(){

			this.fullWidth = $('.todo').width();
			var that = this;
			this.slidePosition = 0 ;
			this.releaselock = false;
			this.hammerTime = Hammer(this.$el);

			this.hammerTime.on("touch release dragleft dragright", function(ev) {
				that.handleSwipe(ev);
			});

			Events.on("blockHorizontal", function(){
				that.hammerTime.off();
			});
			

			Events.on("allowHorizontal", function(){
				that.hammerTime.on("touch release dragleft dragright", function(ev) {
					that.handleSwipe(ev);
				});
			});

			_.bindAll(this);
    		this.model.on('change', this.render);
    		this.model.on('change-item', this.renderChange);

    	},
    	handleSwipe:function(ev){

    		// var that = this;
    		switch(ev.type){
    			case 'touch':
    				this.uiElement = this.el.getElementsByClassName('top')[0];
    				this.uiElementClasName = this.el.getElementsByClassName('top')[0].className;
    				

    			case 'release':

    				if(this.slidePosition != 0 && Math.abs(this.slidePosition) <= (90 / 0.7)  ){
    					console.log("nubmer 1");
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.1s linear';
    					this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';
    					this.slidePosition = 0;
						setTimeout(function(){
							Events.trigger("allowVertical");
						}, 300);

    					break;
    				}

    				else if( this.slidePosition != 0 && this.slidePosition < -(90 / 0.7)){

    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
						this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + -(this.fullWidth) + 'px,0)';
						this.$el.find(".check-button").hide();
						this.slidePosition = 0;

						var that = this; 
						setTimeout(function(){
							that.remove();
							Events.trigger("allowVertical");
						}, 500);
						break;
    				}
    				else if(this.slidePosition != 0 && this.slidePosition > 0){
    					console.log(this.slidePosition);
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
    					this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';

    					this.el.getElementsByClassName('top')[0].className = this.uiElementClasName;
    					this.el.getElementsByClassName('top')[0].className = this.el.getElementsByClassName('top')[0].className + " dark-grey";
						this.$el.find(".check-button").hide();
						this.slidePosition = 0;

						var that = this; 
						setTimeout(function(){
							Events.trigger("allowVertical");
						}, 500);
						break;
    				}
    				else{
    					setTimeout(function(){
							Events.trigger("allowVertical");
						}, 500);

    				}

    			case 'dragright':

    					Events.trigger("blockVertical");
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'none';
						var slideRate = ev.gesture.deltaX * 0.7;
						this.slidePosition = ev.gesture.deltaX;
						if (Math.abs(slideRate) <= 90 && slideRate != 0 ){
							console.log("number 2");
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.$el.find(".check-button").css('opacity', 0.3);
    						this.el.getElementsByClassName('top')[0].className = this.uiElementClasName;
							
						}
						else if (Math.abs(slideRate) > 90 &&  Math.abs(slideRate) < 200){
							console.log("number 1");
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.$el.find(".check-button").css('opacity', 1);
    						this.$el.find(".delete-button").hide();
    						this.el.getElementsByClassName('top')[0].className =  this.el.getElementsByClassName('top')[0].className + " green";
						}
												// if (Math.abs(slideRate) > 130) {
    		// 				this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
    		// 				this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';

						// 	// this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + (this.fullWidth) + 'px,0)';
    		// 				// this.el.getElementsByClassName('top')[0].className =  this.el.getElementsByClassName('top')[0].className + " green";
    		// 				this.el.getElementsByClassName('top')[0].className = this.uiElementClasName;
    		// 				this.el.getElementsByClassName('top')[0].className = this.el.getElementsByClassName('top')[0].className + " dark-grey";

						// 	this.$el.find(".check-button").hide();
						// 	this.$el.find(".delete-button").hide();

						// 	this.slidePosition = 0;
    		// 				setTimeout(function(){
						// 		Events.trigger("allowVertical");

						// 	}, 300);

						// 	break;
						// }

    			case 'dragleft':
    					Events.trigger("blockVertical");
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'none';
						var slideRate = ev.gesture.deltaX * 0.7;
						this.slidePosition = ev.gesture.deltaX;

						if (Math.abs(slideRate) <= 90 && slideRate != 0 ){
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.$el.find(".delete-button").css('opacity', 0.3);
							
						}
						else if (Math.abs(slideRate) > 90 && Math.abs(slideRate) < 150 ){
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.$el.find(".delete-button").css('opacity', 1);
    						this.el.getElementsByClassName('delete-button')[0].style.webkitTransform = 'translate(' + (slideRate + (90) ) + 'px,0)';

						}
								
						// if (Math.abs(slideRate) > 130) {
    		// 				this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
						// 	this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + -(this.fullWidth) + 'px,0)';
						// 	this.$el.find(".check-button").hide();
						// 	this.$el.find(".delete-button").hide();

						// 	this.slidePosition = 0;

						// 	var that = this; 
						// 	setTimeout(function(){
						// 		that.remove();
						// 		Events.trigger("allowVertical");

						// 	}, 300);
						// 	break;
						// }
    		}
    	}
    });
    return ItemView;
	
});

