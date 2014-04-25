define(function(require) {

  var Surface        = require('famous/core/Surface');
  var Modifier       = require('famous/core/Modifier');
  var Transform      = require('famous/core/Transform');
  var View           = require('famous/core/View');
  var Avatar         = require('./avatar');
  var Easing         = require('famous/transitions/Easing');
  var Transitionable = require('famous/transitions/Transitionable');

  // Class Constructor

  function PlayerView(avatarUrl, index) {
    View.call(this);
    this._parity = index % 2;
    this.player = new Avatar(avatarUrl, index);
    this.score  = createRandScore();
    this._ghost = new Transitionable(1);
    this._modP  = new Modifier({
      origin: [0.5, 0]
    });
    this._modS = new Modifier({
      origin: [0.5, 0],
      transform: Transform.translate(0, 70)
    });
    _init(this);
  }

  PlayerView.prototype             = Object.create(View.prototype);
  PlayerView.prototype.constructor = PlayerView;

  // Helpers

  function _init(playerView) {
    playerView.add(playerView._modP).add(playerView.player);
    playerView.add(playerView._modS).add(playerView.score);
    playerView._modS.opacityFrom(function() {
      return playerView._ghost.get();
    });
  }

  function createRandScore() {
    return new Surface({
      size       : [75, 30],
      content    : Math.floor(Math.random() * 25) + '',
      properties : {
        textAlign  : 'center',
        lineHeight : '45px',
        fontWeight : 'bold',
        fontSize   : '24px',
        color      : 'grey'
      }
    });
  }

  // Prototypal Methods

  PlayerView.prototype.hideScore = function() {
    this._ghost.set(0, {curve: Easing.outQuad, duration: 500});
  };

  PlayerView.prototype.showScore = function() {
    this._ghost.set(1, {curve: Easing.outQuad, duration: 500});
  };

  return PlayerView;

});
