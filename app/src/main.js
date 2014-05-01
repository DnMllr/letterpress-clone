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

  window.app       = app;
  window.animation = animation;

  window.console.log('Hello, to play animations, first build the animation by calling \"app.build(animation[index]);\". \n'
    + 'Then run the animation by calling \"app.run(animation[index]);\". \n'
    + 'To clear the animation call \"app.teardown(animation[index]);\" with the index of the animation you wish to clear. \n'
    + 'Valid indexes of animations are 1 and 2.');

});
