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

  console.log('Hello, to play animations build the animation first by calling \"app.build(animation[index]);\" \n'
    + 'then run the animation by calling \"app.run(animation[index]);\". \n'
    + 'to clear the animation call \"app.teardown(animation[index]);\" with the index of the animation you wish to clear. \n'
    + 'valid indexes of animations are 1 and 2.');

});
