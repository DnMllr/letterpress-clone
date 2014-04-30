define(function(require) {

  var Surface          = require('famous/core/Surface');
  var View             = require('famous/core/View');
  var Modifier         = require('famous/core/Modifier');
  var Transform        = require('famous/core/Transform');
  var Transitionable   = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
  Transitionable.registerMethod('spring', SpringTransition);

  //Class

  function Tile(letter, index) {
    View.call(this);
    this.letter    = letter;
    this.color     = 0;
    this._surface  = _createSurface(letter);

    _init(this, arguments);
    this.setColor(0);
  }

  Tile.prototype             = Object.create(View.prototype);
  Tile.prototype.constructor = Tile;

  //Helpers

  function _init(tile, args) {
    [

      _applyIndex,
      _applyTransitionables,
      _applyMods,
      _wireTransitionables,
      _wireEvents,
      _createScene

    ].forEach(function(step) {
      step.apply(tile, args)
    });
  }

  function _applyIndex(letter, index) {
    this._parity   = index % 2;
    this.x         = index % 5;
    this.y         = Math.floor(index / 5);
  }

  function _applyTransitionables() {
    this._width   = new Transitionable(window.innerWidth / 5);
    this._wiggler = new Transitionable(0);
    this._pos     = [
      new Transitionable(0), 
      new Transitionable(0)
    ];
  }

  function _applyMods() {
    this._turn     = _createMod();
    this._position = _createMod();
  }

  function _wireTransitionables() {
    this._turn.transformFrom(function() {
      return Transform.rotateZ(this._wiggler.get());
    }.bind(this));

    this._position.transformFrom(function() {
      return Transform.translate(this._pos[0].get(), this._pos[1].get());
    }.bind(this));

    this._position.sizeFrom(function() {
      return [this._width.get(), window.innerWidth / 5];
    }.bind(this));
  }
  
  function _wireEvents() {
    this._surface.pipe(this);
  }

  function _createScene() {
    this.add(this._position).add(this._turn).add(this._surface);
  }

  function _createSurface(letter) {
    return new Surface({
      content : '<p>' + letter + '</p>',
      classes : ['tile'],
      properties: {
        textAlign : 'center',
        fontSize  : 24 + 'px'
      }
    });
  }

  function _createMod() {
    return new Modifier({
      origin: [0.5, 0.5]
    });
  }

  // Prototypal Methods

  Tile.prototype.getColor = function() {
    return this.color;
  };

  Tile.prototype.setColor = function(color) {
    var properties = this._surface.getProperties();
    this.color = color;
    switch (color) {
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
    var wiggler   = this._wiggler;
    var surface   = this._surface;
    var direction = this._parity ? 1 : -1;
    clearTimeout(this._timingOut);
    wiggler.halt();
    wiggler.set(direction * Math.PI/3);
    surface.addClass('wigglin');
    wiggler.set(0, {
      method: 'spring',
      period: 250,
      dampingRatio: 0.2
    });
    this._timingOut = setTimeout(function() {
      wiggler.halt();
      wiggler.set(0);
      surface.removeClass('wigglin');
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

  Tile.prototype.goTo = function(x, y, options) {
    options = options || {
      method: 'spring',
      period: 250,
      dampingRatio: 0.4
    };
    this.halt();
    this._pos[0].set(x, options);
    this._pos[1].set(y, options);
  };

  Tile.prototype.halt = function() {
    this._pos[0].halt();
    this._pos[1].halt();
  };

  Tile.prototype.resize = function(size) {
    this._width.set(size);
  };

  Tile.prototype.getPos = function() {
    return [this.x, this.y];
  };

  return Tile;

});
