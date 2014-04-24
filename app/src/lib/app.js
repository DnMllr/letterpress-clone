define(function(require) {

  var View      = require('famous/core/View');
  var ModalView = require('./modals/modalView');
  var Game      = require('./game');

  function App() {
    View.call(this);
    this.modalView = new ModalView();
    this.games     = [];
    this.add(this.modalView);
  }

  App.prototype             = Object.create(View.prototype);
  App.prototype.constructor = App;

  App.prototype.newGame = function() {
    this.games.push(new Game());
  };

  return App;

});
