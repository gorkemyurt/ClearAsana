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

		template: _.template(itemTemplate),
		events: {
			"keyup .edit-item-input" : "editItem"
	    },
		initialize : function(){
			this.fullWidth = $('.todo').width();
			var that = this;
			this.slidePosition = 0 ;
			this.releaselock = false;
			this.hammerTime = Hammer(this.$el);

			this.hammerTime.on("touch doubletap release dragleft dragright", function(ev) {
				that.handleSwipe(ev);
			});

			Events.on("blockHorizontal", function(){
				that.hammerTime.off('touch doubletap release dragleft dragright');
			});


			Events.on("allowHorizontal", function(){
				that.hammerTime.on("touch doubletap release dragleft dragright", function(ev) {
					that.handleSwipe(ev);
				});
			});

			_.bindAll(this);
    		this.model.on('change', this.render);
    		this.model.on('change-item', this.renderChange);

    	},
		onRender: function(){
			// console.log("RENDER");

            // console.log(this.model.get("rank"));

			if(this.model.get("completed")){
				console.log("adding dark grey");
				this.$el.find(".check-button").hide();
				this.$el.find(".delete-button").hide();

				this.el.getElementsByClassName('top')[0].className = this.el.getElementsByClassName('top')[0].className + " dark-grey";

			};
		},

    	editItem : function(ev){
    		if(ev.keyCode === 13 ){

    				console.log(this.$el.find(".edit-item-input").val());

    				this.$el.find(".edit-item-input").css("display","none");
	    			this.$el.find(".content").css("display","block");
					this.model.set("name", this.$el.find(".edit-item-input").val());
					this.model.save();
					this.$el.find(".content").text(this.model.get("name"));
					this.$el.find(".edit-item-input").val("");
					$(".item-container").addClass("opacity");
	    			$(".opacity").animate({ opacity: 1 }, 500, 'ease-out');
    		}
    	},
    	handleSwipe:function(ev){
    		console.log("ITEM EVENT");
    		// var that = this;
    		switch(ev.type){

    			case 'doubletap':
    				console.log(ev.type);
    				this.$el.find(".edit-item-input").css("display","block");
    				this.$el.find(".edit-item-input").css("background-color",this.$el.find(".top").css("background-color"));
    				this.$el.find(".content").css("display","none");
    				this.model.set("name", this.$el.find(".content").text() )
    				this.$el.find(".edit-item-input").val(this.model.get("name"));
    				this.$el.find(".edit-item-input")[0].focus();
    				this.$el.find(".item-container").removeClass("opacity");
    				$(".opacity").animate({ opacity: 0.3 }, 500, 'ease-out');

    			case 'touch':
    				this.uiElement = this.el.getElementsByClassName('top')[0];
    				this.uiElementClassName = this.el.getElementsByClassName('top')[0].className;

    			case 'release':
    				if(this.slidePosition != 0 && Math.abs(this.slidePosition) <= (90 / 0.7)  ){
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.1s linear';
    					this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';
    					this.slidePosition = 0;
    					this.$el.find(".check-button").hide();

						setTimeout(function(){
							Events.trigger("allowVertical");
						}, 200);

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
							console.log("destroyed a task");
							// that.model.set("id", 1 ,{silent: true});
							that.model.destroy();
							that.remove();
							Events.trigger("allowVertical");
							Events.trigger("collection:Reorder");


						}, 500);
						break;
    				}
    				else if(this.slidePosition != 0 && this.slidePosition > 0 && (!this.model.get("completed")) ){
    					console.log("realease 1");
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
    					this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';
    					this.model.set("completed", true, { silent: true });
    					this.model.save();
    					this.el.getElementsByClassName('top')[0].className = this.uiElementClassName;
    					this.el.getElementsByClassName('top')[0].className = this.el.getElementsByClassName('top')[0].className + " dark-grey";
						console.log(this.el.getElementsByClassName('top')[0].className );
						this.$el.find(".check-button").hide();
						this.slidePosition = 0;
						var that = this;
						setTimeout(function(){
							Events.trigger("allowVertical");
							Events.trigger("collection:Reorder");


						}, 200);
						break;
    				}
    				else if(this.slidePosition != 0 && this.slidePosition > 0 && (this.model.get("completed")) ){
    					console.log("realease 2");
						// this.$el.find(".check-button").hide();

    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'all 0.3s linear';
    					this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(0,0)';
						this.slidePosition = 0;
						this.model.set("completed", false, { silent: true });
    					this.model.save();

						var that = this;
						setTimeout(function(){
							Events.trigger("allowVertical");
    						Events.trigger("collection:Reorder");

						}, 200);
						break;

    				}
    				else{
    					setTimeout(function(){
							Events.trigger("allowVertical");
						}, 50);

    				}

    			case 'dragright':

    					Events.trigger("blockVertical");
    					this.el.getElementsByClassName('top')[0].style.webkitTransition = 'none';
						var slideRate = ev.gesture.deltaX * 0.7;
						this.slidePosition = ev.gesture.deltaX;
						this.$el.find(".delete-button").show();


						if (Math.abs(slideRate) <= 90 && slideRate != 0 ){
							this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.$el.find(".check-button").css('opacity', 0.3);
    						this.el.getElementsByClassName('top')[0].className = this.uiElementClassName;

						}
						else if ( (slideRate) > 90 &&  (slideRate) < 200){
							if(!this.model.get("completed")){
								this.el.getElementsByClassName('top')[0].style.webkitTransform = 'translate(' + slideRate + 'px,0)';
	    						this.$el.find(".check-button").css('opacity', 1);
	    						this.$el.find(".delete-button").hide();
	    						this.el.getElementsByClassName('top')[0].className =  this.el.getElementsByClassName('top')[0].className + " green";
							}
							else{
								this.$el.find(".check-button").show();
    							this.$el.find(".check-button").css('opacity', 1);
								this.$el.find('.todo').removeClass("dark-grey");
								this.$el.find('.todo').removeClass("green");
							}

						}

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

    		}
    	}
    });
    return ItemView;

});

