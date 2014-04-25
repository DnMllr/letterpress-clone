define(function(require) {

  var View             = require('famous/core/View');
  var Surface          = require('famous/core/Surface');
  var Modifier         = require('famous/core/Modifier');
  var Transform        = require('famous/core/Transform');
  var PlayerView       = require('./playerView');
  var Transitionable   = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
  Transitionable.registerMethod('spring', SpringTransition);

  //Class Constructor

  function ScoreBoard(url1, url2) {
    View.call(this);
    this._currentPlayer = 1;
    this.position       = 'home';
    this._indicator     = createIndicator();
    this._spring        = {
      method       : 'spring',
      period       : 200,
      dampingRatio : 0.3
    };
    _createPlayers.apply(this, arguments);
    _applyTransitionables(this);
    _applyMods(this);
    _init(this);
  }

  ScoreBoard.prototype             = Object.create(View.prototype);
  ScoreBoard.prototype.constructor = ScoreBoard;

  //Helpers

  function _init(scoreBoard) {
    scoreBoard._modH.transformFrom(function() {
      return Transform.translate(-1 * scoreBoard._translateX.get(), scoreBoard._translateY.get(), 0);
    });
    scoreBoard._modA.transformFrom(function() {
      return Transform.translate(scoreBoard._translateX.get(), scoreBoard._translateY.get(), 0);
    });
    scoreBoard._modI.transformFrom(function() {
      return Transform.translate(scoreBoard._translateI.get(), 80, 0);
    });
    scoreBoard._modI.opacityFrom(function() {
      return (scoreBoard._translateY.get() + 30) / 30;
    });
    scoreBoard.add(scoreBoard._modH).add(scoreBoard._home);
    scoreBoard.add(scoreBoard._modA).add(scoreBoard._away);
    scoreBoard.add(scoreBoard._modI).add(scoreBoard._indicator);
  }

  function createIndicator() {
    return new Surface({
      size       : [true, true],
      content    : '<i class="icon-downarrow"></i>',
      classes    : ['indicator'],
      properties : {
        textAlign : 'center',
        fontSize  : '48px',
        color     : 'rgb(0, 177, 253)'
      }
    });
  }

  function createMod() {
    return new Modifier({
      origin: [0.5, 0]
    });
  }

  function _applyMods(scoreBoard) {
    scoreBoard._modH = createMod();
    scoreBoard._modA = createMod();
    scoreBoard._modI = createMod();
  }

  function _applyTransitionables(scoreBoard) {
    scoreBoard._translateX = new Transitionable(40);
    scoreBoard._translateY = new Transitionable(0);
    scoreBoard._translateI = new Transitionable(-63);
  }

  function _createPlayers(url1, url2) {
    this._home = new PlayerView(url1, 0);
    this._away = new PlayerView(url2, 1);
  }

  // Prototypal Methods

  ScoreBoard.prototype.overlap = function() {
    this.position = 'overlap';
    this._translateX.halt();
    this._translateY.halt();
    this._translateX.set(20, this._spring);
    this._translateY.set(-30, this._spring);
  };

  ScoreBoard.prototype.home = function() {
    this.position = 'home';
    this._translateX.halt();
    this._translateY.halt();
    this._translateX.set(40, this._spring);
    this._translateY.set(0, this._spring);
  };

  ScoreBoard.prototype.setPlayer = function(player) {
    // player must be 1, home, or -1, away.
    if (player !== 1 && player !== -1) this._currentPlayer = this._currentPlayer === -1 ? 1 : -1;
    else this._currentPlayer = player;
    var destination = this._currentPlayer === 1 ? -63 : 17;
    this._translateI.halt();
    this._translateI.set(destination, this._spring);
    if (this._currentPlayer === 1) this._indicator.setProperties({
      color: 'rgb(0, 177, 253)'
    });
    else this._indicator.setProperties({
      color: 'rgb(255, 94, 64)'
    });
  };

  return ScoreBoard;

});
