define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'hammer',
	'text!templates/addItemTemplate.html'
], function ($,_, Backbone, Marionette, hammer, addItemTemplate) {
	'use strict';

    var AddItemView = Backbone.Marionette.ItemView.extend({
    	template : _.template(addItemTemplate),
    	initialize:function(){
    		this.dragHeight = 0;
    		this.inputVisible = false;
    		this.relMesVisible = false;

    		$('body').hammer();
    		_.bindAll(this);
    		var that = this;
			Hammer($('#special')[0]).on("touch release dragdown", function(ev) {
				that.handleDrag(ev);
			});
			console.log($('.todo'));
			console.log($('#special'));

			Hammer($('.todo')).on("touch release swipeleft", function(ev) {
				that.handleSwipeLeft(ev);
			});
    	},
    	events:{
			"keyup #add-item-input" : "submitItem"

    	},
    	submitItem: function(ev){
    		if ( ev.keyCode === 13 ) { // 13 is enter key
    			$('#special')[0].style.webkitTransform = 'translate3d(0,0,0) scale3d(1,1,1)';

				$('#add-item-input').toggle();

				$('#rel-mes').toggle();
				this.inputVisible = false;
				this.dragHeight = 0;
				this.collection.add({content: $('#add-item-input').val(), rank : 0})
				$('#add-item-input').val("");

				$("#list").animate({ opacity: 1 }, 500, 'ease-out')


			}
    	},
    	handleSwipeLeft: function(ev){
    		console.log("swipe left event is triggered")
    	},
	   	handleDrag: function(ev){
	   		switch(ev.type){
		        case 'touch':
		        case 'release':
		        	// console.log(this.dragHeight);
		            if(this.dragHeight > 40)  {
		            	$('#special')[0].style.webkitTransform = 'translate3d(0,60px,0) 0.5s scale3d(1,1,1)';
		            	$(".parent2")[0].style.webkitTransform = 'rotateX(0deg)';
		            	if(!this.inputVisible && this.dragHeight != 0 ){
							$('#rel-mes').toggle();
							$('#add-item-input').toggle();
							this.inputVisible = true;
							$('#add-item-input').focus();
							console.log(here);
							$("#list").animate({ opacity: 0.3 }, 500, 'ease-out')
							// $("#list").opacity: .6;

		            	}
		            	break;

		            }
		            else if(this.dragHeight != 0){
		            	this.dragHeight = 0;
		            	$('#special')[0].style.webkitTransform = 'translate3d(0,0,0) scale3d(1,1,1)';
		            	$(".parent2")[0].style.webkitTransform = 'rotateX(90deg) ';

		            	break;


		            }
		        case 'dragdown':
		            this.dragHeight = ev.gesture.deltaY;

		            if(this.dragHeight >= 60 ){
		              this.dragHeight = 60;
		            }
		            var angle = -(this.dragHeight) * 3/2;
		            if(angle < -90) {
		              angle = -90;
		            }
		            if( this.dragHeight > 0 ){
						$('#special')[0].style.webkitTransform = 'translate3d(0,'+ this.dragHeight +'px,0) scale3d(1,1,1)';
						$(".parent2")[0].style.webkitTransform = 'rotateX(' + (angle + 90 ) + 'deg)';
		            }
		            if(this.dragHeight > 40){
		            	if(!this.relMesVisible){
		            		$('#pull-mes').toggle();
		            		$('#rel-mes').toggle();
		            		this.relMesVisible = true;
		            	}


		            }
		           	if(this.dragHeight < 40){
		           		if(this.relMesVisible){
		            		$('#pull-mes').toggle();
		            		$('#rel-mes').toggle();
		            		this.relMesVisible = false;
		            	}

		            }
		 	}

	   	},
		appendHtml: function(collectionView, itemView){
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return AddItemView;
	
});
