define(function(require) {

  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  function Modal(dark) {
    this.dark = dark || false;
    ContainerSurface.call(this, {
      size: [window.innerWidth, window.innerHeight]
    });
  }

  Modal.prototype             = Object.create(ContainerSurface.prototype);
  Modal.prototype.constructor = Modal;

  return Modal;

});
