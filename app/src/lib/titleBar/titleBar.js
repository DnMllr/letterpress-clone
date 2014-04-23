define(function(require) {
  var Surface          = require('famous/core/Surface');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  function MenuBar() {
    ContainerSurface.call(this, {
      size: [350, 60]
    });
    this._left = new Surface({
      size       : [100, 60],
      content    : '<i class="icon-back"></i>',
      properties : {
        fontSize : '24px',
        color    : 'grey'
      }
    });
    this._right = new Surface({
      size       : [100, 60],
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
      origin: [0, 0]
    })).add(this._left);
    mod.add(new StateModifier({
      origin: [1, 0]
    })).add(this._right);
  }

  MenuBar.prototype             = Object.create(ContainerSurface.prototype);
  MenuBar.prototype.constructor = ContainerSurface;

  MenuBar.prototype.setState = function(s) {
    switch(s) {
      case 0:
        this._left.setContent('');
        this._right.setContent('');
    }
  };

  return MenuBar;
});
