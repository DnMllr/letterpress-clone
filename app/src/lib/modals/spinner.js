define(function(require) {

  var View           = require('famous/core/View');
  var Surface        = require('famous/core/Surface');
  var Modifier       = require('famous/core/Modifier');
  var Transitionable = require('famous/transitions/Transitionable');
  var Easing         = require('famous/transitions/Easing');
  var Transform      = require('famous/core/Transform');

  function Spinner() {
    View.call(this);

    _init(this);
  }

  Spinner.prototype             = Object.create(View.prototype);
  Spinner.prototype.constructor = Spinner;

  // Helpers

  function _init(spinner) {
    [

      _createSurfaces,
      _applyTransitionables,
      _applyMods,
      _wireTransitionables,
      _createScene

    ].forEach(function(step) {
      step.apply(spinner);
    });
  }

  function _createSurfaces() {
    this._background = _createSurface('background');
    this._content    = _createSurface('content');
  }

  function _applyMods() {
    this._backMod = _createMod();
    this._contMod = _createMod();
  }

  function _applyTransitionables() {
    this._ticker = new Transitionable(0);
    this._turner = new Transitionable(0);
  }

  function _wireTransitionables() {
    this._backMod.transformFrom(function() {
      return Transform.rotateZ(this._turner.get());
    }.bind(this));
    this._contMod.transformFrom(function() {
      return Transform.rotateZ(this._ticker.get());
    }.bind(this));
  }

  function _createScene() {
    this.add(this._backMod).add(this._background);
    this.add(this._contMod).add(this._content);
  }

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

  // Prototypal Methods

  Spinner.prototype.turn = function() {
    this._turner.set(Math.PI / 12, {curve: Easing.inQuad, duration: 300}, function() {
      this._turner.set(0, {});
    }.bind(this));
  };

  Spinner.prototype.reset = function() {
    this._turner.set(0);
  };

  Spinner.prototype.tick = function() {
    this._ticker.set(Math.PI / 2, {curve: Easing.outBack, duration: 500});
  };

  Spinner.prototype.reset = function() {
    this._ticker.set(0);
  };

  return Spinner;

});
