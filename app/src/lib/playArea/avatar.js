define(function(require) {

  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Transform        = require('famous/core/Transform');
  var ImageSurface     = require('famous/surfaces/ImageSurface');

  function Avatar(avatarUrl, index) {
    ContainerSurface.call(this, {
      size       : [75, 75],
      classes    : ['player-view'],
      properties : {
        borderRadius : '100%',
        border       : '10px ' + ((index || 0) === 1 ? 'rgb(255, 94, 64)' : 'rgb(0, 177, 253)') + ' solid',
        overflow     : 'hidden'
      }
    });
    this._mod = new StateModifier({
      origin: [0.5, 0.5]
    });
    this._image = new ImageSurface({
      size: [80, 80]
    });
    this._image.setContent(avatarUrl);
    this.add(this._mod).add(this._image);
  }

  Avatar.prototype             = Object.create(ContainerSurface.prototype);
  Avatar.prototype.constructor = Avatar;

  return Avatar;

});
