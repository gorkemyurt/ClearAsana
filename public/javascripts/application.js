
require.config({
  paths: {
    // 'jquery': 'lib/jquery',
    'backbone': 'lib/backbone',
    'text': 'lib/text',
    'underscore': 'lib/underscore',
    'bootstrap' : 'lib/bootstrap',
    'marionette' : 'lib/backbone.marionette',
    'localStorage' : 'lib/backbone.localStorage',
    'less' : 'lib/less',
    'socketio': '../socket.io/socket.io',
    'moment' : 'lib/moment.min',
    "zepto" : 'lib/zepto',
    "deferred" : 'lib/deferred1',

//backbone app
    "MyApp" : 'app',

//backbone models and collections
    'Email' : 'models/email',
    "Emails" : 'collections/emails',

//backbone views
    "EmailsView" : 'views/EmailsView',
    "EmailView" : 'views/EmailView',
    "NoEmailView" : 'views/NoEmailView',

//foundation
    "foundation": "foundation/foundation",
    "foundation.alerts": "foundation/foundation.alerts",
    "foundation.clearing": "foundation/foundation.clearing",
    "foundation.cookie": "foundation/foundation.cookie",
    "foundation.dropdown": "foundation/foundation.dropdown",
    "foundation.forms": "foundation/foundation.forms",
    "foundation.joyride": "foundation/foundation.joyride",
    "foundation.magellan": "foundation/foundation.magellan",
    "foundation.orbit": "foundation/foundation.orbit",
    "foundation.placeholder": "foundation/foundation.placeholder",
    "foundation.topbar": "foundation/foundation.topbar",
    "foundation.reveal": "foundation/foundation.reveal",
    "foundation.section": "foundation/foundation.section",
    "foundation.tooltips": "foundation/foundation.tooltips",
    "foundation.topbar": "foundation/foundation.topbar"


  },
  shim: {
    "zepto": {
          exports: '$'
    },
    'deferred':{
        deps: ["zepto"],
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "zepto"],
      exports: 'Backbone'
    },
    'bootstrap' : {
        deps: ["zepto"]
    },
    'marionette' : {
      deps : ["backbone", "underscore", "zepto"],
      exports: 'Marionette'
    },
    "foundation": {
            deps: ["zepto"]
    },
    "foundation.alerts": {
        deps: ["foundation"]
    },
    "foundation.clearing": {
        deps: ["foundation"]
    },
    "foundation.cookie": {
        deps: ["foundation"]
    },
    "foundation.dropdown": {
        deps: ["foundation"]
    },
    "foundation.forms": {
        deps: ["foundation"]
    },
    "foundation.joyride": {
        deps: ["foundation"]
    },
    "foundation.magellan": {
        deps: ["foundation"]
    },
    "foundation.orbit": {
        deps: ["foundation"]
    },
    "foundation.placeholder": {
        deps: ["foundation"]
    },
    "foundation.reveal": {
        deps: ["foundation"]
    },
    "foundation.section": {
        deps: ["foundation"]
    },
    "foundation.tooltips": {
        deps: ["foundation"]
    },
    "foundation.topbar": {
        deps: ["foundation"]
    },
    'socketio': {
      exports: 'io'
    },
    },
});

require(

  [ "zepto",
    "underscore",
    "backbone",
    "less",
    "marionette",
    "MyApp",
    "socketio",
    "deferred",
    "foundation.alerts",
    "foundation.clearing",
    "foundation.cookie",
    "foundation.dropdown",
    "foundation.forms",
    "foundation.joyride",
    "foundation.magellan",
    "foundation.orbit",
    "foundation.placeholder",
    "foundation.topbar",
    "foundation.reveal",
    "foundation.section",
    "foundation.tooltips",
    "foundation.topbar"
  ],
  function($ , _, Backbone, less, Marionette, MyApp, io, Deferred) {

    $(document).foundation();


  });


