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
    this._surface = createSurface(heading, message, buttons);
    this._mod     = new Modifier({
      origin: [0.5, 0.5]
    });
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
    message._mod.transformFrom(function() {
      return Transform.rotateZ(message._turner.get());
    });
    message.add(message._mod).add(message._surface);
  }

  function createSurface(heading, message, buttons) {
    return new Surface({
      content    : (heading !== '' ?  '<div class="modal heading">' + heading + '</div>' : '')
        + '<div class="modal message">' + message + '</div>' + generateButtons(buttons),
      size       : [true, true],
      properties : {
        borderRadius    : '12px',
        boxShadow       : '0px 0px 15px 2px rgba(0,0,0,0.50)',
        textAlign       : 'center',
        backgroundColor : 'white'
      }
    });
  }

  // Prototypal Methods

  Message.prototype.turn = function() {
    var self = this;
    this._turner.set(Math.PI / 12, {curve: Easing.inQuad, duration: 300}, function() {
      self._turner.set(0, {});
    });
  };

  Message.prototype.rerenderHTML = function() {
    var self = this;
    this._surface.setContent((self.heading !== '' ?  '<div class="modal heading">' + self.heading + '</div>' : '')
      + '<div class="modal message">' + self.message + '</div>' + generateButtons(self.buttons));
  };

  Message.prototype.mouseDown = function(buttonNumber) {
    var self = this;
    this._surface.setContent((self.heading !== '' ?  '<div class="modal heading">' + self.heading + '</div>' : '')
      + '<div class="modal message">' + self.message + '</div>' + generateButtons(self.buttons, buttonNumber));
  };

  return Message;

});
