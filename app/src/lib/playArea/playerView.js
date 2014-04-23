define(function(require) {

  var Surface          = require('famous/core/Surface');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Transform        = require('famous/core/Transform');
  var View             = require('famous/core/View');
  var Avatar           = require('./avatar');
  var Easing           = require('famous/transitions/Easing');

  function PlayerView(avatarUrl, index) {
    View.call(this);
    this._parity = index;
    this.player  = new Avatar(avatarUrl, index);
    this._modP   = new StateModifier({
      origin: [0.5, 0]
    });
    this.score = new Surface({
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
    this._modS = new StateModifier({
      origin: [0.5, 0],
      transform: Transform.translate(0, 70)
    });
    this.add(this._modP).add(this.player);
    this.add(this._modS).add(this.score);
  }

  PlayerView.prototype             = Object.create(View.prototype);
  PlayerView.prototype.constructor = PlayerView;

  PlayerView.prototype.hideScore = function() {
    this._modS.setOpacity(0, {curve: Easing.outQuad, duration: 500});
  };

  PlayerView.prototype.showScore = function() {
    this._modS.setOpacity(1, {curve: Easing.outQuad, duration: 500});
  };

  return PlayerView;

});
