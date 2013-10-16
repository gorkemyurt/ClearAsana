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
    		this.inputVisible = false

    		$('body').hammer();
    		_.bindAll(this);
    		var that = this;
			Hammer($('#special')[0]).on("touch release dragdown", function(ev) {
				that.handleDrag(ev);
			});
    	},
    	events:{
			"keyup #add-item-input" : "submitItem"

    	},
    	submitItem: function(ev){
    		if ( ev.keyCode === 13 ) { // 13 is enter key
    			$('#special')[0].style.webkitTransform = 'translate3d(0,0,0) scale3d(1,1,1)';

				$('#add-item-input').toggle();

				$('#pull-mes').toggle();
				this.inputVisible = false;
				this.dragHeight = 0;
				this.collection.add({content: $('#add-item-input').val(), rank : 0})
				$('#add-item-input').val("");
				
				$("#list").animate({ opacity: 1 }, 500, 'ease-out')


			}
    	},
	   	handleDrag: function(ev){
	   		switch(ev.type){
		        case 'touch':
		            // console.log('touch');
		        case 'release':

		            if(this.dragHeight > 40)  {
		            	$('#special')[0].style.webkitTransform = 'translate3d(0,60px,0) 0.5s scale3d(1,1,1)';
		            	$(".parent2")[0].style.webkitTransform = 'rotateX(0deg)';
		            	console.log(this.dragHeight);
		            	if(!this.inputVisible && this.dragHeight != 0 ){
		            		console.log("show and focus on input");
							$('#pull-mes').toggle();
							$('#add-item-input').toggle();
							this.inputVisible = true;
							$('#add-item-input').focus();
							$("#list").animate({ opacity: 0.3 }, 500, 'ease-out')
							// $("#list").opacity: .6;

		            	}
		            	break;

		            }
		            else if(this.dragHeight != 0){
		            	// $('#special')[0].style.webkitTransfrom = 'translate3d 5s ease-out';
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
		            $('#special')[0].style.webkitTransform = 'translate3d(0,'+ this.dragHeight +'px,0) scale3d(1,1,1)';
		            $(".parent2")[0].style.webkitTransform = 'rotateX(' + (angle + 90 ) + 'deg)';
		 	}

	   	},
		appendHtml: function(collectionView, itemView){
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return AddItemView;
	
});
