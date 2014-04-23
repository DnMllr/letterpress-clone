define(function(require) {

  var Surface          = require('famous/core/Surface');
  var View             = require('famous/core/View');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Transform        = require('famous/core/Transform');
  var Transitionable   = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
  Transitionable.registerMethod('spring', SpringTransition);

  //Helpers

  function _init(v) {
    v._surface.pipe(v);
    v.setColor(0);
    v.add(v._mod).add(v._surface);
  }

  //Class

  function Tile(letter, index) {
    View.call(this);
    this._mod     = new StateModifier({
      origin: [0.5, 0.5]
    });
    this._surface = new Surface({
      content : '<p>' + letter + '</p>',
      classes : ['tile'],
      properties: {
        textAlign : 'center',
        fontSize  : 24 + 'px'
      }
    });
    this.letter  = letter;
    this.color   = 0;
    this._parity = index % 2;

    _init(this);
  }

  Tile.prototype             = Object.create(View.prototype);
  Tile.prototype.constructor = Tile;

  Tile.prototype.getColor = function() {
    return this.color;
  };

  Tile.prototype.setColor = function(c) {
    var properties = this._surface.getProperties();
    this.color = c;
    switch (c) {
      case 2:
        if (properties.backgroundColor !== 'rgb(0, 177, 253)')
          this._surface.setProperties({ backgroundColor: 'rgb(0, 177, 253)'}); break;
      case 1:
        if (properties.backgroundColor !== 'rgb(133, 209, 246)')
          this._surface.setProperties({ backgroundColor: 'rgb(133, 209, 246)'}); break;
      case -1:
        if (properties.backgroundColor !== 'rgb(253, 172, 159)')
          this._surface.setProperties({ backgroundColor: 'rgb(253, 172, 159)'}); break;
      case -2:
        if (properties.backgroundColor !== 'rgb(255, 94, 64)')
          this._surface.setProperties({ backgroundColor: 'rgb(255, 94, 64)'}); break;
      default:
        if (this._parity && properties.backgroundColor !== 'rgb(235, 234, 232)')
          this._surface.setProperties({ backgroundColor: 'rgb(235, 234, 232)'});
        else if (properties.backgroundColor !== 'rgb(237, 236, 233)')
          this._surface.setProperties({ backgroundColor: 'rgb(237, 236, 233)'});
        break;
    }
    return this;
  };

  Tile.prototype.wiggle = function() {
    var mod       = this._mod;
    var surface   = this._surface;
    var spring    = {method: 'spring', period: 250, dampingRatio: 0.2};
    var direction = this._parity ? 1 : -1;
    mod.setTransform(Transform.rotateZ(direction * Math.PI/3));
    surface.addClass('wigglin');
    // Callback doesn't fire all of the time.
    mod.setTransform(Transform.translate(0, 0, 0), spring, function() {
      surface.removeClass('wigglin');
    });
    return this;
  };

  Tile.prototype.hideLetter = function() {
    this._surface.setContent('');
    return this;
  };

  Tile.prototype.showLetter = function() {
    this._surface.setContent('<p>' + this.letter + '</p>');
    return this;
  };

  return Tile;

});
