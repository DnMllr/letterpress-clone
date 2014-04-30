define(function(require) {

  var View           = require('famous/core/View');
  var Surface        = require('famous/core/Surface');
  var Modifier       = require('famous/core/Modifier');
  var Transitionable = require('famous/transitions/Transitionable');
  var Easing         = require('famous/transitions/Easing');
  var Transform      = require('famous/core/Transform');

  function Spinner() {
    View.call(this);
    this._background = _createSurface('background');
    this._content    = _createSurface('content');
    this._backMod    = _createMod();
    this._contMod    = _createMod();
    this._ticker     = new Transitionable(0);
    this._turner     = new Transitionable(0);
    _init(this);
  }

  // Helpers

  function _createSurface(type) {
    switch (type) {
      case 'background': return new Surface({
          size       : [60, 60],
          properties : {
            borderRadius : '12px',
            boxShadow    : '0px 0px 15px 2px rgba(0,0,0,0.50)',
            background   : 'white',
            zIndex       : 1
          }
        });
      case 'content' : return new Surface({
          size       : [75, 75],
          content    : '<i class="icon-dots"></i>',
          properties : {
            fontSize      : '50px',
            lineHeight    : '90px',
            color         : 'grey',
            textAlign     : 'center',
            verticalAlign : 'middle',
            zIndex        : 2
          }
        });
    }
  }

  function _createMod() {
    return new Modifier({
      origin: [0.5, 0.5]
    });
  }

  function _init(spinner) {
    spinner._backMod.transformFrom(function() {
      return Transform.rotateZ(spinner._turner.get());
    });
    spinner._contMod.transformFrom(function() {
      return Transform.rotateZ(spinner._ticker.get());
    });
    spinner.add(spinner._backMod).add(spinner._background);
    spinner.add(spinner._contMod).add(spinner._content);
  }

  Spinner.prototype             = Object.create(View.prototype);
  Spinner.prototype.constructor = Spinner;

  Spinner.prototype.turn = function() {
    var turner = this._turner;
    turner.set(Math.PI / 12, {curve: Easing.inQuad, duration: 300}, function() {
      turner.set(0, {});
    });
  };

  Spinner.prototype.tick = function() {
    this._ticker.set(Math.PI / 2, {curve: Easing.outBack, duration: 500});
  };

  Spinner.prototype.reset = function() {
    this._ticker.set(0);
  };

  return Spinner;

});
