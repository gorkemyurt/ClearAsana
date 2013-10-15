define([
	'underscore',
	'backbone',
	'marionette',
	'Email',
	'parseEmail',
	// 'text!templates/NoEmailTemplate.html',
	'Emails'

], function (_, Backbone, Marionette,Email,parseEmail , Emails ) {
	'use strict';


	var NoEmailView = Backbone.Marionette.ItemView.extend({

		template: "#NoEmailTemplate",

		events:{
	          'click .sendEmail' : 'sendFakeEmail'
	    },
	    
	    sendFakeEmail: function(e){
			var HealthRating = $(e.currentTarget).parent().find(".current").text();
			var HealthRating = $(e.currentTarget).parent().find(".current").text();
			var NumberRating = 0;
			if(HealthRating == "Healthy"){
				NumberRating = 1;
			}
			else if(HealthRating == "Medium"){
				NumberRating = 2;

			}
			else if(HealthRating == "Unhealthy"){
				NumberRating = 3;
			}

	        var myEmail = new Email({
	              Subject : {Name : $(".input-meal-name").val(), HealthRate: NumberRating},
	              Date : new Date(),
	              FoodItems: [],
	              Type : 1
	        });
	        // var newEmailsCol = new Emails();
            this.collection.add(myEmail);
            var that = this;

	        this.model.save(myEmail , {
	            success: function (model, response){
	              that.collection.trigger("refresh");

	            }
          	});

	    }


		});
	    return NoEmailView;
	
});

