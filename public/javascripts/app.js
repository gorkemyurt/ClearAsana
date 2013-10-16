define([
  'zepto',
	"marionette",
	"ItemsView",
	"Items",
  "NoItemView",
  "Item",
  "AddItemView",
  "moment",
  "hammer"
	], function ($, Marionette, ItemsView, Items, NoItemView, Item, AddItemView, moment, hammer) {

    // set up the app instance
    var MyApp = new Backbone.Marionette.Application()

    MyApp.addRegions({
      wrapper : "#wrapper",
      list : "#list"
    });

    MyApp.addInitializer(function(){

      MyApp.items = new Items([{content: "hello world", rank: 0}, {content: "hello world2", rank: 0}, {content: "hello world3", rank: 0}] );

      MyApp.ItemsView = new ItemsView({collection: MyApp.items})
      
      MyApp.AddItemView = new AddItemView({collection: MyApp.items});

      MyApp.wrapper.show(MyApp.AddItemView);

      MyApp.list.show(MyApp.ItemsView);
                    // $("#release-mes").toggle();

    //   Hammer($('#special')[0] ).on("touch release dragdown", function(ev) {
    //     handleDrag(ev);
    // });

    // function handleDrag(ev){
    //   switch(ev.type){
    //     case 'touch':
    //         // console.log('touch');
    //     case 'release':
    //         // console.log('release');
    //     case 'dragdown':
    //         var height = ev.gesture.deltaY;
    //         console.log(height);

    //         if(height >= 60 ){
    //           height = 60;
    //         }
    //         var angle = -(height) * 3/2;
    //         if(angle < -90) {
    //           angle = -90;
    //         }
    //         $('#special')[0].style.webkitTransform = 'translate3d(0,'+height+'px,0) scale3d(1,1,1)';
    //         $(".parent2")[0].style.webkitTransform = 'rotateX(' + (angle + 90 ) + 'deg)';

    //         if(height > 40){
    //           // $("#pull-mes").toggle();
    //           // $("#release-mes").toggle();

    //         }

    //   }
    // }


    });

    MyApp.start();
    return MyApp;
});