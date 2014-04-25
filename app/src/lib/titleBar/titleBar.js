define(function(require) {
  var Surface       = require('famous/core/Surface');
  var StateModifier = require('famous/modifiers/StateModifier');
  var View          = require('famous/core/View');

  // Class Constructor

  function MenuBar() {
    View.call(this);
    this._left = new Surface({
      size       : [100, 30],
      content    : '<i class="icon-back"></i>',
      properties : {
        fontSize : '24px',
        color    : 'grey'
      }
    });
    this._right = new Surface({
      size       : [100, 30],
      content    : '<i class="icon-burger"></i>',
      properties : {
        textAlign : 'right',
        fontSize  : '24px',
        color     : 'grey'
      }
    });
    this._mod = new StateModifier();
    var mod   = this.add(this._mod);
    mod.add(new StateModifier({
      origin: [0, 0.5]
    })).add(this._left);
    mod.add(new StateModifier({
      origin: [1, 0.5]
    })).add(this._right);
  }

  MenuBar.prototype             = Object.create(View.prototype);
  MenuBar.prototype.constructor = MenuBar;

  // Prototypal Methods

  MenuBar.prototype.setState = function(s) {
    // TODO finish this:
    switch(s) {
      case 0:
        this._left.setContent('');
        this._right.setContent('');
        break;
      case 1:
        this._left.setContent('<i class="icon-back"></i>');
        this._right.setContent('<i class="icon-burger"></i>');
        break;
      case 2:
        this._left.setContent('Cancel');
        this._right.setContent('<div class="submit-pill">Submit</div>');
        break;
    }
  };

  return MenuBar;
});
