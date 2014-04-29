define(function(require) {
  var GridLayout  = require('famous/views/GridLayout');
  var View        = require('famous/core/View');
  var Tile        = require('./tile');
  var Chars       = require('./charDict');
  var WordBuilder = require('./wordBuilder');

  // Class Constructor

  function Board() {
    View.call(this);
    this._layout = new GridLayout({
      dimensions: [5,5]
    });
    this.wordBuilder = new WordBuilder();
    this.tiles = [];

    _init(this);
  }

  Board.prototype             = Object.create(View.prototype);
  Board.prototype.constructor = Board;

  // Helpers

  function _getRandomChar() {
    var type  = Math.random() > 0.80 ? 'vowels' : 'consonants';
    var index = Math.floor(Chars[type].length * Math.random());
    return Chars[type][index];
  }

  function _populate(b) {
    b.tiles = [];
    for (var i = 0 ; i < 25 ; i++) b.tiles.push(new Tile(_getRandomChar(), i));
    b.tiles.forEach(function(tile) {
      tile._eventInput.on('click', function() {
        var index = b.wordBuilder.indexOf(tile);
        if (index !== -1) b.wordBuilder.remove(index);
        else b.wordBuilder.push(tile);
      });
    });
    b._layout.sequenceFrom(b.tiles);
  }

  function _init(b) {
    b.add(b._layout);
    _populate(b);
  }

  function _createBlankTile(index) {
    return new Tile('', index);
  }

  function typeCheck(obj) {
    return {}.toString.call(obj).slice(8, -1);
  }

  // Prototypal Methods

  Board.prototype.tileByPosition = function(x, y) {
    return this.tiles[y * 5 + x];
  };

  Board.prototype.tilesByColor = function(c) {
    var color;
    return this.tiles.filter(typeCheck(c) === 'Array' ? function(tile) {
      color = tile.getColor();
      for (var i = 0 ; i < c.length ; i++) if (color === c[i]) return true;
      return false;
    } : function(tile) {
      return tile.getColor() === c;
    });
  };

  Board.prototype.wiggleByColor = function(c) {
    this.tilesByColor(c).forEach(function(tile) {
      tile.wiggle();
    });
  };

  Board.prototype.hideAllLetters = function() {
    this.tiles.forEach(function(tile) {
      tile.hideLetter();
    });
  };

  Board.prototype.showAllLetters = function() {
    this.tiles.forEach(function(tile) {
      tile.showLetter();
    });
  };

  return Board;

});
