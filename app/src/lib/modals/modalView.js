define(function(require) {

  var Lightbox  = require('famous/views/Lightbox');
  var Transform = require('famous/core/Transform');
  var Easing    = require('famous/transitions/Easing');
  var Message   = require('./message');

  function ModalView() {
    Lightbox.call(this, {
      // TODO: fix this hack, figure out how the lightbox is supposed to work.
      inTransform   : Transform.translate(-115, -window.innerHeight / 2 - 75, 0),
      outTransform  : Transform.translate(-115, window.innerHeight / 2 - 75, 0),
      showTransform : Transform.translate(-115, -75, 0),
      showOrigin    : [0, 0.5],
      inTransition  : { duration: 400, curve: Easing.outBack },
      outTransition : { duration: 150, curve: Easing.easeOut }
    });
    this.messages = {
      test: new Message('test', 'really long test message', ['button test1']),
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
