define(function() {

  function WordBuilder() {
    this.totalWidth = window.innerWidth;
    this.tiles      = [];
    _calculateTileWidth(this);
  }

  //helpers

  function _calculateTileWidth(wordBuilder) {
    wordBuilder.tileWidth = wordBuilder.totalWidth / (wordBuilder.tiles.length > 5 ? wordBuilder.tiles.length : 5);
  }

  function _applyTileWidth(wordBuilder) {
    wordBuilder.tiles.forEach(function(tile) {
      tile.resize(wordBuilder.tileWidth);
    });
  }

  function _reflow(wordBuilder) {
    var pos;
    var offset;
    var center;
    wordBuilder.tiles.forEach(function(tile, i, tiles) {
      pos    = tile.getPos();
      offset = i * wordBuilder.tileWidth - pos[0] * window.innerWidth / 5;
      center = (window.innerWidth - tiles.length * wordBuilder.tileWidth) / 2;
      tile.goTo(offset + center, -100 - (pos[1] * window.innerWidth / 5));
    });
  }

  // Prototypal Methods

  WordBuilder.prototype._refresh = function() {
    _calculateTileWidth(this);
    _applyTileWidth(this);
    _reflow(this);
  };

  WordBuilder.prototype.push = function(tile) {
    this.tiles.push(tile);
    this._refresh();
    return this;
  };

  WordBuilder.prototype.remove = function(index) {
    var tile = this.tiles.splice(index, 1)[0];
    tile.goTo(0, 0);
    tile.resize(window.innerWidth / 5);
    this._refresh();
    return this;
  };

  WordBuilder.prototype.removeAll = function() {
    this.tiles.forEach(function(tile) {
      tile.goTo(0, 0, {
        method: 'spring',
        period: 500,
        dampingRatio: 0.6
      });
      tile.resize(window.innerWidth / 5);
    });
    this.tiles = [];
    this._refresh();
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
