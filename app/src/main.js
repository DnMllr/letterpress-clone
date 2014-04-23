/*globals define*/
define(function(require) {
  'use strict';
  // import dependencies
  var Engine           = require('famous/core/Engine');
  var Modifier         = require('famous/core/Modifier');
  var App              = require('./lib/app');

  // create the main context
  var mainContext = Engine.createContext();

  // your app here
  var app = new App();

  mainContext.add(new Modifier({
    origin: [0.5, 0.5]
  })).add(app);

  // animation helper

  function timeout(milliseconds) {
    return new Promise(function(resolve) {
      setTimeout(resolve, milliseconds);
    });
  }

  //Animation 2

  var animation2 = {
    colors: {
      '1'  : [[0, 4], [3, 4]],
      '-1' : [[0, 0], [0, 2], [0,3], [1, 1], [1, 3], [1, 4], [3, 0], [3, 3]],
      '-2' : [[0, 1]]
    },
    build: function() {
      for (var color in this.colors) {
        this.colors[color].forEach(function(pair) {
          app.board.tileByPosition.apply(app.board, pair).setColor(parseInt(color));
        });
      }
    },
    run : function() {
      timeout(500).then(function() {
        app.modalView.display('message1');
      }).then(function() {
        return timeout(1000);
      }).then(function() {
        app.modalView.hide();
        app.board.wiggleByColor([-1, -2]);
      });
    },
    teardown: function() {
      for (var color in this.colors) {
        this.colors[color].forEach(function(pair) {
          app.board.tileByPosition.apply(app.board, pair).setColor(0);
        });
      }
    }
  };

  animation2.build();
  animation2.run();

  window.animation2 = animation2;
  window.app        = app;

});
