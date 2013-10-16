define([
  'zepto',
	"marionette",
	"EmailsView",
	"Emails",
  "NoEmailView",
  "Email",
  "moment",
  "hammer"
	], function ($, Marionette, EmailsView, Emails, NoEmailView, Email, moment, hammer) {

    // set up the app instance
    var MyApp = new Backbone.Marionette.Application()

    MyApp.addRegions({
    });

    MyApp.addInitializer(function(){
      console.log( $('#special')[0] );
      Hammer($('#special')[0] ).on("touch release dragdown", function(ev) {
        handleDrag(ev);
    });

    function handleDrag(ev){
      switch(ev.type){
        case 'touch':
            // console.log('touch');
        case 'release':
            // console.log('release');
        case 'dragdown':
            var height = ev.gesture.deltaY;
            console.log(height);

            if(height >= 60 ){
              height = 60;
            }
            var angle = -(height) * 3/2;
            if(angle < -90) {
              angle = -90;
            }
            $('#special')[0].style.webkitTransform = 'translate3d(0,'+height+'px,0) scale3d(1,1,1)';
            $(".parent2")[0].style.webkitTransform = 'rotateX(' + (angle + 90 ) + 'deg)';

            // if(height > 40){
            //   $(".div1").text("Release to Create Item");

            // }

      }
    }


    });

    MyApp.start();
    return MyApp;
});