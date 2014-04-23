define(function(require) {

  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Surface          = require('famous/core/Surface');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Transform        = require('famous/core/Transform');
  var PlayerView       = require('./playerView');
  var Transitionable   = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
  Transitionable.registerMethod('spring', SpringTransition);

  //Helpers

  function _init(s) {
    s.add(s._modH).add(s._home);
    s.add(s._modA).add(s._away);
    s.add(s._modI).add(s._indicator);
  }

  //Class

  function ScoreBoard(url1, url2) {
    ContainerSurface.call(this, {
      size: [350, 150]
    });
    this._currentPlayer = 0;
    this.position       = 'home';
    this._home          = new PlayerView(url1, 0);
    this._away          = new PlayerView(url2, 1);
    this._indicator     = new Surface({
      size       : [100, 100],
      content    : '<i class="icon-downarrow"></i>',
      classes    : ['indicator'],
      properties : {
        textAlign : 'center',
        fontSize  : '48px',
        color     : 'rgb(0, 177, 253)'
      }
    });
    this._modH = new StateModifier({
      origin    : [0.5, 0.5],
      transform : Transform.translate(-40, 0, 0)
    });
    this._modA = new StateModifier({
      origin    : [0.5, 0.5],
      transform : Transform.translate(40, 0, 0)
    });
    this._modI = new StateModifier({
      origin: [0.5, 0],
      transform: Transform.translate(-40, 80, 0)
    });
    this._spring = {
      method       : 'spring',
      period       : 200,
      dampingRatio : 0.3
    };
    _init(this);
  }

  ScoreBoard.prototype             = Object.create(ContainerSurface.prototype);
  ScoreBoard.prototype.constructor = ScoreBoard;

  ScoreBoard.prototype.overlap = function() {
    this.position = 'overlap';
    this._modH.halt();
    this._modH.setTransform(Transform.translate(-20, -30, 0), this._spring);
    this._modA.halt();
    this._modA.setTransform(Transform.translate(20, -30, 0), this._spring);
    this._modI.setOpacity(0, {curve: 'linear', duration: 100});
  };

  ScoreBoard.prototype.home = function() {
    this.position = 'home';
    this._modH.halt();
    this._modH.setTransform(Transform.translate(-40,0,0), this._spring);
    this._modA.halt();
    this._modA.setTransform(Transform.translate(40,0,0), this._spring);
    this._modI.setOpacity(1, {curve: 'linear', duration: 200});
  };

  ScoreBoard.prototype.setPlayer = function(c) {
    this._currentPlayer = c || this._currentPlayer ? 0 : 1;
    this._modI.halt();
    this._modI.setTransform(
      Transform.translate(this._currentPlayer ? -40 : 40, 75, 0),
      this._spring
    );
    if (this._currentPlayer) this._indicator.setProperties({
      color: 'rgb(0, 177, 253)'
    });
    else this._indicator.setProperties({
      color: 'rgb(255, 94, 64)'
    });
  };

  return ScoreBoard;

});
