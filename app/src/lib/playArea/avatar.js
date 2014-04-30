define(function(require) {

  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Modifier         = require('famous/core/Modifier');
  var ImageSurface     = require('famous/surfaces/ImageSurface');

  // Class Constructor

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
    this._mod   = _createMod();
    this._image = _createImg(avatarUrl);

    _init(this);
  }

  Avatar.prototype             = Object.create(ContainerSurface.prototype);
  Avatar.prototype.constructor = Avatar;

  // Helpers

  function _init(avatar) {
    avatar.add(avatar._mod).add(avatar._image);
  }

  function _createMod() {
    return new Modifier({
      origin: [0.5, 0.5]
    });
  }

  function _createImg(url) {
    var img = new ImageSurface({
      size: [80, 80]
    });
    img.setContent(url);
    return img;
  }

  return Avatar;

});
