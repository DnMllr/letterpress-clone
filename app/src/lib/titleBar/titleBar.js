define(function(require) {
  var Surface   = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var Modifier  = require('famous/core/Modifier');
  var View      = require('famous/core/View');

  // Class Constructor

  function MenuBar() {
    View.call(this);

    _init(this);
  }

  MenuBar.prototype             = Object.create(View.prototype);
  MenuBar.prototype.constructor = MenuBar;

  // Helpers

  function _init(menuBar) {
    [

      _applySurfaces,
      _wireEvents,
      _createScene

    ].forEach(function(step) {
      step.apply(menuBar);
    });
  }

  function _applySurfaces() {
    this._left  = _createBack();
    this._right = _createBurger();
  }

  function _wireEvents() {
    this._right.on('click', function() {
      if (this._state === 2) this._eventOutput.emit('submit');
    }.bind(this));
  }

  function _createScene() {

    this.add(new Modifier({
      transform: Transform.translate(7, 0, 0),
      origin: [0, 0.5]
    })).add(this._left);

    this.add(new Modifier({
      transform : Transform.translate(-7, 0, 0),
      origin    : [1, 0.5]
    })).add(this._right);

  }

  function _createBack() {
    return new Surface({
      size       : [100, 30],
      content    : '<i class="icon-back"></i>',
      properties : {
        fontSize : '24px',
        color    : 'grey'
      }
    });
  }

  function _createBurger() {
    return new Surface({
      size       : [100, 30],
      content    : '<i class="icon-burger"></i>',
      properties : {
        textAlign : 'right',
        fontSize  : '24px',
        color     : 'grey'
      }
    });
  }

  // Prototypal Methods

  MenuBar.prototype.setState = function(state) {
    // TODO finish this:
    switch(state) {
      case 0:
        this._left.setContent('');
        this._right.setContent('');
        this._state = 0;
        break;
      case 1:
        this._left.setContent('<i class="icon-back"></i>');
        this._right.setContent('<i class="icon-burger"></i>');
        this._state = 1;
        break;
      case 2:
        this._left.setContent('Cancel');
        this._right.setContent('<div class="submit-pill">Submit</div>');
        this._state = 2;
        break;
    }
  };

  return MenuBar;
});
