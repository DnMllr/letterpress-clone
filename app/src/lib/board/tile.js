define(function(require) {

  var Surface          = require('famous/core/Surface');
  var View             = require('famous/core/View');
  var Modifier         = require('famous/core/Modifier');
  var Transform        = require('famous/core/Transform');
  var Transitionable   = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
  Transitionable.registerMethod('spring', SpringTransition);

  //Helpers

  function _init(tile) {
    tile._surface.pipe(tile);
    tile.setColor(0);
    tile._mod.transformFrom(function() {
      return Transform.rotateZ(tile._wiggler.get());
    });
    tile.add(tile._mod).add(tile._surface);
  }

  function createSurface(letter) {
    return new Surface({
      content : '<p>' + letter + '</p>',
      classes : ['tile'],
      properties: {
        textAlign : 'center',
        fontSize  : 24 + 'px'
      }
    });
  }

  //Class

  function Tile(letter, index) {
    View.call(this);
    this.letter   = letter;
    this.color    = 0;
    this._parity  = index % 2;
    this._surface = createSurface(letter);
    this._wiggler = new Transitionable(0);
    this._mod     = new Modifier({
      origin: [0.5, 0.5]
    });

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
    var self           = this;
    var direction      = this._parity ? 1 : -1;
    if (this._timingOut) clearTimeout(this._timingOut);
    this._wiggler.halt();
    this._wiggler.set(direction * Math.PI/3);
    this._surface.addClass('wigglin');
    this._wiggler.set(0, {
      method: 'spring',
      period: 250,
      dampingRatio: 0.2
    });
    this._timingOut = setTimeout(function() {
      self._wiggler.halt();
      self._wiggler.set(0);
      self._surface.removeClass('wigglin');
      delete self._timingOut;
    }, 1000);
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
