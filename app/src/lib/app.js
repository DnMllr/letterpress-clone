define(function(require) {

  var View            = require('famous/core/View');
  var modalController = require('./modals/modalController');
  var Game            = require('./game');

  function App() {
    View.call(this);
    this.modalController = new modalController();
    this.games     = [];
    this.add(this.modalController);
  }

  App.prototype             = Object.create(View.prototype);
  App.prototype.constructor = App;

  App.prototype.newGame = function() {
    this.games.push(new Game());
  };

  return App;

});
