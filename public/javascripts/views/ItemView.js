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
			var that = this;
			this.slidePosition = 0 ;
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
			//here you should be defining some ui elements that are used in the view to make it look much cleaner

			//full width
			this.fullWidth = $('.todo').width();

			//content-container
			this.contentContainer = this.$el.find(".content");
			//edit-item-input
			this.editItemInput = this.$el.find(".edit-item-input");
			//delete button
			this.deleteButton = this.$el.find(".delete-button");
			//check button
			this.checkButton = this.$el.find(".check-button");
			//the whole item ui element
    		this.uiElement = this.el.getElementsByClassName('top')[0];

    		// change some css if the element is completed
			if(this.model.get("completed")){
				this.checkButton.hide();
				this.deleteButton.hide();

				this.el.getElementsByClassName('top')[0].className = this.el.getElementsByClassName('top')[0].className + " dark-grey";

			};
		},

    	editItem : function(ev){
    		if(ev.keyCode === 13 ){


    				this.editItemInput.css("display","none");
	    			this.contentContainer.css("display","block");
					this.model.set("name", this.editItemInput.val());
					this.model.save();
					this.contentContainer.text(this.model.get("name"));
					this.editItemInput.val("");
					$(".item-container").addClass("opacity");
	    			$(".opacity").animate({ opacity: 1 }, 500, 'ease-out');
    		}
    	},
    	handleSwipe:function(ev){
    		switch(ev.type){

    			case 'doubletap':
    				this.editItemInput.css("display","block");
    				this.editItemInput.css("background-color",this.$el.find(".top").css("background-color"));
    				this.contentContainer.css("display","none");
    				this.model.set("name", this.contentContainer.text() )
    				this.editItemInput.val(this.model.get("name"));
    				this.editItemInput[0].focus();
    				this.$el.find(".item-container").removeClass("opacity");
    				$(".opacity").animate({ opacity: 0.3 }, 500, 'ease-out');

    			case 'touch':
    				this.uiElement = this.el.getElementsByClassName('top')[0];
    				this.uiElementClassName = this.el.getElementsByClassName('top')[0].className;

    			case 'release':
    				if(this.slidePosition != 0 && Math.abs(this.slidePosition) <= (90 / 0.7)  ){
    					this.uiElement.style.webkitTransition = 'all 0.3s linear';
    					this.uiElement.style.webkitTransform = 'translate(0,0)';
    					this.slidePosition = 0;
    					this.checkButton.hide();

						setTimeout(function(){
							Events.trigger("allowVertical");
						}, 200);

    					break;
    				}

    				else if( this.slidePosition != 0 && this.slidePosition < -(90 / 0.7)){

    					this.uiElement.style.webkitTransition = 'all 0.3s cubic-bezier(.67, .18, .30, .86)';
						this.uiElement.style.webkitTransform = 'translate(' + -(this.fullWidth) + 'px,0)';
						this.checkButton.hide();
						this.slidePosition = 0;

						setTimeout(function(){
							this.model.destroy();
							Events.trigger("allowVertical");
							Events.trigger("collection:Reorder");
						}.bind(this), 400);
						break;
    				}
    				else if(this.slidePosition != 0 && this.slidePosition > 0 && (!this.model.get("completed")) ){
    					this.uiElement.style.webkitTransition = 'all 0.3s cubic-bezier(.67, .18, .30, .86)';
    					this.uiElement.style.webkitTransform = 'translate(0,0)';
    					this.model.set("completed", true, { silent: true });
    					this.uiElement.className = this.uiElementClassName;
    					this.uiElement.className = this.uiElement.className + " dark-grey";
						this.checkButton.hide();
						this.slidePosition = 0;
						setTimeout(function(){
							this.model.save();
							Events.trigger("allowVertical");
							Events.trigger("collection:Reorder");


						}.bind(this), 400);
						break;
    				}
    				else if(this.slidePosition != 0 && this.slidePosition > 0 && (this.model.get("completed")) ){

    					this.uiElement.style.webkitTransition = 'all 0.3s cubic-bezier(.67, .18, .30, .86)';
    					this.uiElement.style.webkitTransform = 'translate(0,0)';
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
    					this.uiElement.style.webkitTransition = 'none';
						var slideRate = ev.gesture.deltaX * 0.7;
						this.slidePosition = ev.gesture.deltaX;
						this.checkButton.show();
						this.deleteButton.show();


						if (Math.abs(slideRate) <= 90 && slideRate != 0 ){
							this.uiElement.style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.checkButton.css('opacity', 0.3);
    						this.uiElement.className = this.uiElementClassName;

						}
						else if ( (slideRate) > 90 &&  (slideRate) < 200){
							if(!this.model.get("completed")){
								this.uiElement.style.webkitTransform = 'translate(' + slideRate + 'px,0)';
	    						this.checkButton.css('opacity', 1);
	    						this.deleteButton.hide();
	    						this.uiElement.className =  this.uiElement.className + " green";
							}
							else{
								this.checkButton.show();
    							this.checkButton.css('opacity', 1);
								this.$el.find('.todo').removeClass("dark-grey");
								this.$el.find('.todo').removeClass("green");
							}

						}

    			case 'dragleft':
    					Events.trigger("blockVertical");
    					this.uiElement.style.webkitTransition = 'none';
						var slideRate = ev.gesture.deltaX * 0.7;
						this.slidePosition = ev.gesture.deltaX;

						if (Math.abs(slideRate) <= 90 && slideRate != 0 ){
							this.uiElement.style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.deleteButton.css('opacity', 0.3);

						}
						else if (Math.abs(slideRate) > 90 && Math.abs(slideRate) < 150 ){
							this.uiElement.style.webkitTransform = 'translate(' + slideRate + 'px,0)';
    						this.deleteButton.css('opacity', 1);
    						this.el.getElementsByClassName('delete-button')[0].style.webkitTransform = 'translate(' + (slideRate + (90) ) + 'px,0)';

						}

    		}
    	}
    });
    return ItemView;

});

