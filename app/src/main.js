/*globals define*/
define(function(require) {
  'use strict';
  // import dependencies
  var Engine    = require('famous/core/Engine');
  var Modifier  = require('famous/core/Modifier');
  var App       = require('./lib/app');
  var animation = require('./lib/animations');

  // create the main context
  var mainContext = Engine.createContext();

  // your app here
  var app = new App();
  app.newGame();

  var node = mainContext.add(new Modifier({
    origin: [0.5, 0.5]
  }));
  node.add(app.games[0]);
  node.add(app.modalController);

  app.build(animation[1]);
  app.run(animation[1]);

  window.app       = app;
  window.animation = animation;

});
