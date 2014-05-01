define(function(require) {

  var wait = require('./wait');

  // animation helpers

  function applyColors(animation, app) {
    for (var color in animation.colors) {
      animation.colors[color].forEach(function(pair) {
        app.games[0].board.tileByPosition.apply(app.games[0].board, pair).setColor(parseInt(color));
      });
    }
  }

  function clearColors(animation, app) {
    for (var i = 0 ; i < 5 ; i++)
      for (var j = 0 ; j < 5 ; j++)
        app.games[0].board.tileByPosition(i, j).setColor(0);
  }

  //Animations

  return [{
    // TODO: impliment animations 1.
    build    : function() {},
    run      : function() {},
    teardown : function() {}
  }, {
    colors: {
      '1'  : [[4, 0], [4, 3]],
      '-1' : [[0, 0], [2, 0], [3, 0], [1, 1], [3, 1], [4, 1], [0, 3], [3, 3]],
      '-2' : [[1, 0]]
    },
    build: function(app) {
      applyColors(this, app);
    },
    run : function(app) {
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
    teardown: function(app) {
      clearColors(this, app);
    }
  }, {
    colors: {
      '1'  : [[4, 0], [4, 3]],
      '-1' : [[0, 0], [2, 0], [4, 1], [3, 3], [1, 1], [3, 1], [3, 0], [0, 3]],
      '-2' : [[1, 0]]
    },
    clicked: [[0, 0], [2, 0], [4, 1], [2, 1], [2, 2], [3, 3], [1, 1], [3, 1]],
    build: function(app) {
      applyColors(this, app);
      this.clicked.forEach(function(pair) {
        app.games[0].board.tileByPosition.apply(app.games[0].board, pair).trigger('click');
      });
    },
    run: function(app) {
      app.games[0].menu.getShown()._right.emit('click', {});
    },
    teardown: function(app) {
      clearColors(this, app);
    }
  }];

});
