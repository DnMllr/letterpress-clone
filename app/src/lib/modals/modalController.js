define(function(require) {

  var Lightbox  = require('famous/views/Lightbox');
  var Transform = require('famous/core/Transform');
  var Easing    = require('famous/transitions/Easing');
  var Message   = require('./message');
  var Spinner   = require('./spinner');
  var Surface   = require('famous/core/Surface');
  var View      = require('famous/core/View');

  // Class Constructor

  function ModalController() {
    View.call(this);
    this.lightbox   = _createLightBox();
    this.background = _createSurface();

    _init(this);
  }

  ModalController.prototype             = Object.create(View.prototype);
  ModalController.prototype.constructor = ModalController;

  // Helpers

  function _init(modalController) {
    _createMessages.apply(modalController);
    _createScene.apply(modalController);
  }

  function _createMessages() {
    this.messages = {};
    this.messages.message1 = {
      modal : new Message('Your Turn', '<strong> You </strong> Played <strong>Slippers</strong>, </br> <strong> Robert </strong> Played <strong> Pressing </strong>', ['OK']),
      dark  : false
    };
    this.messages.message2 = {
      modal : new Message('', '<div class="score-card"><span class="blue"> + 8 </span> <span class="red"> - 3 </span></div>'),
      dark  : false
    };
    this.messages.spinner = {
      modal : new Spinner(),
      dark  : true
    };
  }

  function _createScene() {
    this.add(this.lightbox);
    this.add(this.background);
  }

  function _createLightBox() {
    return new Lightbox({
      inTransform   : Transform.translate(0, -window.innerHeight / 2, 0),
      outTransform  : Transform.translate(0, window.innerHeight / 2, 0),
      outOpacity    : 1,
      inTransition  : { duration: 500, curve: Easing.outBack },
      outTransition : { duration: 300, curve: Easing.inQuad }
    });
  }

  function _createSurface() {
    return new Surface({
      size       : [window.innerWidth, window.innerHeight],
      classes    : ['modal-background'],
      properties : {
        background    : 'rgba(0, 0, 0, 0)',
        zIndex        : 1,
        pointerEvents : 'none'
      }
    });
  }

  // Prototypal Methods

  ModalController.prototype.display = function(key) {
    this.messages[key].modal.reset();
    this.lightbox.show(this.messages[key].modal);
    if (this.messages[this.shown]) this.messages[this.shown].modal.turn();
    if (this.messages[key].dark)
      this.background.setProperties({
        background: 'rgba(0, 0, 0, 0.4)'
      });
    else if (this.messages[this.shown] && this.messages[this.shown].dark)
      this.background.setProperties({
        background: 'rgba(0, 0, 0, 0)'
      });
    this.shown = key;
  };

  ModalController.prototype.getShown = function() {
    return this.messages[this.shown].modal;
  };

  ModalController.prototype.away = function() {
    if (this.shown != null) this.messages[this.shown].modal.turn();
    if (this.messages[this.shown].dark) this.background.setProperties({
      background: 'rgba(0, 0, 0, 0)'
    });
    this.shown = '';
    this.lightbox.hide();
  };

  return ModalController;

});
