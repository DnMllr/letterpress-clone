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
    this._indicator     = _createIndicator();

    _init(this, arguments);
  }

  ScoreBoard.prototype             = Object.create(View.prototype);
  ScoreBoard.prototype.constructor = ScoreBoard;

  //Helpers

  function _init(scoreBoard, args) {
    [

      _createSpring,
      _createPlayers,
      _applyTransitionables,
      _applyMods,
      _wireTransitionables,
      _createScene

    ].forEach(function(step) {
      step.apply(scoreBoard, args);
    });
  }

  function _createSpring() {
    this._spring = {
      method       : 'spring',
      period       : 200,
      dampingRatio : 0.3
    };
  }

  function _createPlayers(url1, url2) {
    this._home = new PlayerView(url1, 0);
    this._away = new PlayerView(url2, 1);
  }

  function _applyTransitionables() {
    this._translateX = new Transitionable(40);
    this._translateY = new Transitionable(0);
    this._translateI = new Transitionable(-63);
  }

  function _applyMods() {
    this._modH = _createMod();
    this._modA = _createMod();
    this._modI = _createMod();
  }

  function _wireTransitionables() {

    this._modH.transformFrom(function() {
      return Transform.translate(-1 * this._translateX.get(), this._translateY.get(), 0);
    }.bind(this));

    this._modA.transformFrom(function() {
      return Transform.translate(this._translateX.get(), this._translateY.get(), 0);
    }.bind(this));

    this._modI.transformFrom(function() {
      return Transform.translate(this._translateI.get(), 80, 0);
    }.bind(this));

    this._modI.opacityFrom(function() {
      return (this._translateY.get() + 30) / 30;
    }.bind(this));

  }

  function _createScene() {
    this.add(this._modH).add(this._home);
    this.add(this._modA).add(this._away);
    this.add(this._modI).add(this._indicator);
  }

  function _createIndicator() {
    return new Surface({
      size       : [true, true],
      content    : '<i class="icon-downarrow"></i>',
      classes    : ['indicator'],
      properties : {
        textAlign     : 'center',
        fontSize      : '48px',
        color         : 'rgb(0, 177, 253)',
        pointerEvents : 'none'
      }
    });
  }

  function _createMod() {
    return new Modifier({
      origin: [0.5, 0]
    });
  }

  // Prototypal Methods

  ScoreBoard.prototype.overlap = function() {
    this.position = 'overlap';
    this._home.hideScore();
    this._away.hideScore();
    this._translateX.halt();
    this._translateY.halt();
    this._translateX.set(20, this._spring);
    this._translateY.set(-30, this._spring);
  };

  ScoreBoard.prototype.home = function() {
    this.position = 'home';
    this._home.showScore();
    this._away.showScore();
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
