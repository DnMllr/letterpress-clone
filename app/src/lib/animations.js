define(function(require) {

  // animation helpers

  function wait(milliseconds) {
    return new window.Promise(function(resolve) {
      setTimeout(resolve, milliseconds);
    });
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
      for (var color in this.colors) {
        this.colors[color].forEach(function(pair) {
          app.games[0].board.tileByPosition.apply(app.games[0].board, pair).setColor(parseInt(color));
        });
      }
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
      for (var color in this.colors) {
        this.colors[color].forEach(function(pair) {
          app.games[0].board.tileByPosition.apply(app.games[0].board, pair).setColor(0);
        });
      }
    }
  }, {
    build    : function(app) {},
    run      : function(app) {},
    teardown : function(app) {}
  }];

  return animation;

});
