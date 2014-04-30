define(function(require) {

  var EventHandler = require('famous/core/EventHandler');

  function WordBuilder() {
    this.tiles      = [];
    this.IO         = new EventHandler();
    _calculateTileWidth.apply(this);
  }

  //helpers

  function _calculateTileWidth() {
    this.tileWidth = window.innerWidth / (this.tiles.length > 5 ? this.tiles.length : 5);
  }

  function _applyTileWidth() {
    this.tiles.forEach(function(tile) {
      tile.resize(this.tileWidth);
    }.bind(this));
  }

  function _reflow() {
    var pos;
    var offset;
    var center;
    this.tiles.forEach(function(tile, i, tiles) {
      tile.halt();
      pos    = tile.getPos();
      offset = i * this.tileWidth - pos[0] * window.innerWidth / 5;
      center = (window.innerWidth - tiles.length * this.tileWidth) / 2;
      tile.goTo(offset + center, -100 - (pos[1] * window.innerWidth / 5));
    }.bind(this));
  }

  // Prototypal Methods

  WordBuilder.prototype._refresh = function() {
    [

      _calculateTileWidth,
      _applyTileWidth,
      _reflow

    ].forEach(function(step) {
      step.apply(this)
    }.bind(this));
  };

  WordBuilder.prototype.push = function(tile) {
    if (!this.tiles.length) this.IO.emit('WB activated');
    this.tiles.push(tile);
    this._refresh();
    return this;
  };

  WordBuilder.prototype.remove = function(index) {
    var tile = this.tiles.splice(index, 1)[0];
    if (!this.tiles.length) this.IO.emit('WB deactivated');
    tile.goTo(0, 0);
    tile.resize(window.innerWidth / 5);
    return this;
  };

  WordBuilder.prototype.removeAll = function() {
    while (this.tiles.length) this.remove(0);
    this._refresh();
    if (!this.tiles.length) this.IO.emit('WB deactivated');
    return this;
  };

  WordBuilder.prototype.length = function() {
    return this.tiles.length;
  };

  WordBuilder.prototype.indexOf = function(tile) {
    var pos1;
    var pos2 = tile.getPos();
    for (var i = 0 ; i < this.tiles.length ; i++) {
      pos1 = this.tiles[i].getPos();
      if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) return i;
    }
    return -1;
  };

  return WordBuilder;

});
