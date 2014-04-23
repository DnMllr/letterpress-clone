define(function(require) {

  var Lightbox  = require('famous/views/Lightbox');
  var Transform = require('famous/core/Transform');
  var Easing    = require('famous/transitions/Easing');
  var Message   = require('./message');

  function ModalView() {
    // TODO: fix this hack, figure out how the lightbox is supposed to work.
    Lightbox.call(this, {
      inTransform   : Transform.translate(-115, -window.innerHeight / 2 - 75, 0),
      outTransform  : Transform.translate(-115, window.innerHeight / 2, 0),
      showTransform : Transform.translate(-115, -75, 0),
      showOrigin    : [0, 0.5],
      outOpacity    : 1,
      inTransition  : { duration: 500, curve: Easing.outBack },
      outTransition : { duration: 300, curve: Easing.inQuad }
    });
    // END TODO
    this.messages = {
      message1: new Message('Your Turn', '<strong> You </strong> Played <strong>Slippers</strong>, </br> <strong> Robert </strong> Played <strong> Pressing </strong>', ['OK'])
    };
  }

  ModalView.prototype             = Object.create(Lightbox.prototype);
  ModalView.prototype.constructor = ModalView;

  ModalView.prototype.display = function(key) {
    this.show(this.messages[key]);
  };

  return ModalView;

});
