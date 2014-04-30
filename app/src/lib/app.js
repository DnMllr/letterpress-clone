define(function(require) {

  var View            = require('famous/core/View');
  var ModalController = require('./modals/modalController');
  var Game            = require('./game');

  function App() {
    View.call(this);
    this.modalController = new ModalController();
    this.games           = [];
    this.add(this.modalController);
  }

  App.prototype             = Object.create(View.prototype);
  App.prototype.constructor = App;

  App.prototype.newGame = function() {
    this.games.push(new Game());
  };

  App.prototype.build = function(animation) {
    animation.build(this);
  };

  App.prototype.run = function(animation) {
    animation.run(this);
  };

  App.prototype.teardown = function(animation) {
    animation.teardown(this);
  };

  return App;

});
