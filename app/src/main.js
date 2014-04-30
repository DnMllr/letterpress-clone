/*globals define*/
define(function(require) {
  'use strict';
  // import dependencies
  var Engine   = require('famous/core/Engine');
  var Modifier = require('famous/core/Modifier');
  var App      = require('./lib/app');

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

  // animation helpers

  function wait(milliseconds) {
    return new window.Promise(function(resolve) {
      setTimeout(resolve, milliseconds);
    });
  }

  //Animations

  var animation = [{
    // TODO: impliment animations 1 and 3.
    build    : function() {},
    run      : function() {},
    teardown : function() {}
  }, {
    colors: {
      '1'  : [[4, 0], [4, 3]],
      '-1' : [[0, 0], [2, 0], [3, 0], [1, 1], [3, 1], [4, 1], [0, 3], [3, 3]],
      '-2' : [[1, 0]]
    },
    build: function() {
      for (var color in this.colors) {
        this.colors[color].forEach(function(pair) {
          app.games[0].board.tileByPosition.apply(app.games[0].board, pair).setColor(parseInt(color));
        });
      }
    },
    run : function() {
      wait(500).then(function() {
        app.modalController.display('message1');
        return wait(1000);
      }).then(function() {
        app.modalController.getShown().mouseDown(0); // A suboptimal strategy for faking the click.
        return wait(100);
      }).then(function() {
        app.modalController.getShown().rerenderHTML(); // A suboptimal strategy for faking the click.
        app.modalController.away();
        app.games[0].board.wiggleByColor([-1, -2]);
      });
    },
    teardown: function() {
      for (var color in this.colors) {
        this.colors[color].forEach(function(pair) {
          app.games[0].board.tileByPosition.apply(app.games[0].board, pair).setColor(0);
        });
      }
    }
  }, {
    // TODO: impliment animations 1 and 3.
    build    : function() {},
    run      : function() {},
    teardown : function() {}
  }];

  animation[1].build();
  animation[1].run();

  window.animation = animation;
  window.app       = app;

});
