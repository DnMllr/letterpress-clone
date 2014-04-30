define(function(require) {

  var Lightbox  = require('famous/views/Lightbox');
  var Easing    = require('famous/transitions/Easing');
  var View      = require('famous/core/View');
  var TitleBar  = require('./titleBar');
  var Transform = require('famous/core/Transform');

  // Class Constructor

  function TitleController() {
    View.call(this);
    this.lightbox = _createLightBox();

    _init(this);
    this.show(1);
  }

  TitleController.prototype             = Object.create(View.prototype);
  TitleController.prototype.constructor = TitleController;

  // Helpers

  function _init(titleController) {
    [

      _createTitleBars,
      _wireEvents,
      _createScene

    ].forEach(function(step) {
      step.apply(titleController);
    });
  }

  function _createTitleBars() {
    this.bars = [];
    for (var i = 0 ; i < 3 ; i++) {
      var bar = new TitleBar();
      bar.setState(i);
      this.bars.push(bar);
    }
  }

  function _wireEvents() {
    this.bars[2].on('submit', function() {
      this._eventOutput.emit('submit');
    }.bind(this));
  }

  function _createScene() {
    this.add(this.lightbox);
  }

  function _createLightBox() {
    return new Lightbox({
      inTransform   : Transform.translate(0, -50, 0),
      outTransform  : Transform.translate(0, -50, 0),
      outOpacity    : 1,
      inTransition  : { duration: 250, curve: Easing.outBack },
      outTransition : { duration: 250, curve: Easing.inQuad }
    });
  }

  // Prototypal Methods

  TitleController.prototype.show = function(index) {
    this.lightbox.show(this.bars[index]);
  };

  TitleController.prototype.hide = function() {
    this.lightbox.hide();
  };

  return TitleController;

});
