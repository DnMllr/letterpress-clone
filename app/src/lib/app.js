define(function(require) {

  var View            = require('famous/core/View');
  var ModalController = require('./modals/modalController');
  var Game            = require('./game');
  var wait            = require('./wait');

  function App() {
    View.call(this);
    this.modalController = new ModalController();
    this.games           = [];

    _init(this);
  }

  App.prototype             = Object.create(View.prototype);
  App.prototype.constructor = App;

  // Helpers

  function _init(app) {
    [

      _bindEvents,
      _createScene

    ].forEach(function(step) {
      step.apply(app);
    });
  }

  function _bindEvents() {
    this._eventInput.on('submit', function() {
      this.modalController.display('spinner');
      wait(250).then(function() {
        this.modalController.getShown().tick();
        return wait(750);
      }.bind(this)).then(function() {
        this.modalController.display('message2');
        return wait(1000);
      }.bind(this)).then(function() {
        this.modalController.away();
      }.bind(this));
    }.bind(this));
  }

  function _createScene() {
    this.add(this.modalController);
  }

  // Prototypal Methods

  App.prototype.newGame = function() {
    var game = new Game();
    this.subscribe(game);
    this.games.push(game);

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
