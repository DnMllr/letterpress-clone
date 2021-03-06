define(function(require) {

  var Surface        = require('famous/core/Surface');
  var View           = require('famous/core/View');
  var Modifier       = require('famous/core/Modifier');
  var Transform      = require('famous/core/Transform');
  var Easing         = require('famous/transitions/Easing');
  var Transitionable = require('famous/transitions/Transitionable');

  // Class Constructor

  function Message(heading, message, buttons) {
    View.call(this);
    this.heading  = heading;
    this.message  = message;
    this.buttons  = buttons;
    this._turner  = new Transitionable(0);
    this._mod     = _createMod();

    _init(this);
  }

  Message.prototype             = Object.create(View.prototype);
  Message.prototype.constructor = Message;

  // Helpers

  function generateButtons(buttons, mouseDownOn) {
    var html = '';
    if (mouseDownOn !== 0) mouseDownOn = mouseDownOn || -1;
    buttons.forEach(function(button, i) {
      html += i === mouseDownOn ? ('<div class="modal button clicked">' + button + '</div>') : ('<div class="modal button">' + button + '</div>');
    });
    return html;
  }

  function _init(message) {
    _applySurface.apply(message);
    _wireTransitionables.apply(message);
    _createScene.apply(message);
  }

  function _applySurface() {
    if (this.buttons != null) this._surface = new Surface({
      content    : (this.heading !== '' ?  '<div class="modal heading">' + this.heading + '</div>' : '')
        + '<div class="modal message">' + this.message + '</div>' + generateButtons(this.buttons),
      size       : [window.innerWidth - 50, 150],
      properties : {
        borderRadius    : '12px',
        boxShadow       : '0px 0px 15px 2px rgba(0,0,0,0.50)',
        textAlign       : 'center',
        backgroundColor : 'white',
        zIndex          : 2
      }
    });
    else this._surface = new Surface({
      content    : (this.heading !== '' ?  '<div class="modal heading">' + this.heading + '</div>' : '')
        + '<div class="modal message">' + this.message + '</div>',
      size       : [window.innerWidth - 175, 50],
      properties : {
        borderRadius    : '12px',
        boxShadow       : '0px 0px 15px 2px rgba(0,0,0,0.50)',
        textAlign       : 'center',
        backgroundColor : 'white',
        zIndex          : 2
      }
    });
  }

  function _wireTransitionables() {
    this._mod.transformFrom(function() {
      return Transform.rotateZ(this._turner.get());
    }.bind(this));
  }

  function _createScene() {
    this.add(this._mod).add(this._surface);
  }

  function _createMod() {
    return new Modifier({
      origin: [0.5, 0.5]
    });
  }

  // Prototypal Methods

  Message.prototype.turn = function() {
    this._turner.set(Math.PI / 12, {curve: Easing.inQuad, duration: 300}, function() {
      this._turner.set(0);
    }.bind(this));
  };

  Message.prototype.reset = function() {
    this._turner.set(0);
  };

  Message.prototype.rerenderHTML = function() {
    var content = (this.heading !== '' ?  '<div class="modal heading">' + this.heading + '</div>' : '')
      + '<div class="modal message">' + this.message + '</div>' + generateButtons(this.buttons);
    this._surface.setContent(content);
    return this;
  };

  Message.prototype.mouseDown = function(buttonNumber) {
    var content = (this.heading !== '' ?  '<div class="modal heading">' + this.heading + '</div>' : '')
      + '<div class="modal message">' + this.message + '</div>' + generateButtons(this.buttons, buttonNumber);
    this._surface.setContent(content);
    return this;
  };

  return Message;

});
