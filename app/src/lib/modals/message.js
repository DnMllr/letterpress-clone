define(function(require) {

  var Surface       = require('famous/core/Surface');
  var View          = require('famous/core/View');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform     = require('famous/core/Transform');
  var Easing        = require('famous/transitions/Easing');

  //helpers

  function generateButtons(buttons) {
    var html = '';
    buttons.forEach(function(button) {
      html += ('<div class="modal button">' + button + '</div>');
    });
    return html;
  }

  //class

  function Message(heading, message, buttons) {
    View.call(this);
    this._mod = new StateModifier({
      origin: [0.5, 0.5]
    });
    this._background = new Surface({
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
    this.add(this._mod).add(this._background);
  }

  Message.prototype             = Object.create(View.prototype);
  Message.prototype.constructor = Message;

  Message.prototype.turn = function() {
    var mod = this._mod;
    mod.setTransform(Transform.rotateZ(-23 * Math.PI / 12), {curve: Easing.inQuad, duration: 300}, function() {
      mod.setTransform(Transform.translate(0, 0, 0));
    });
  };

  return Message;

});
