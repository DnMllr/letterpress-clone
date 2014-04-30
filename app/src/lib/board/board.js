define(function(require) {
  var GridLayout  = require('famous/views/GridLayout');
  var View        = require('famous/core/View');
  var Surface     = require('famous/core/Surface');
  var Tile        = require('./tile');
  var Chars       = require('./charDict');
  var WordBuilder = require('./wordBuilder');

  // Class Constructor

  function Board() {
    View.call(this);
    this._layout     = new GridLayout({ dimensions: [5,5] });
    this.wordBuilder = new WordBuilder();
    this._background = _createBackground();
    this.tiles       = [];

    _init(this);
  }

  Board.prototype             = Object.create(View.prototype);
  Board.prototype.constructor = Board;

  // Helpers

  function _createBackground() {
    return new Surface({
      properties: {
        background : 'rgb(235, 234, 232)',
        zIndex     : -1
      }
    });
  }

  function _getRandomChar() {
    var type  = Math.random() > 0.6 ? 'vowels' : 'consonants';
    var index = Math.floor(Chars[type].length * Math.random());
    return Chars[type][index];
  }

  function _populate(board) {
    board.tiles = [];
    for (var i = 0 ; i < 25 ; i++) board.tiles.push(new Tile(_getRandomChar(), i));
    board.tiles.forEach(function(tile) {
      tile._eventInput.on('click', function() {
        var index = board.wordBuilder.indexOf(tile);
        if (index !== -1) board.wordBuilder.remove(index);
        else board.wordBuilder.push(tile);
      });
    });
    board._layout.sequenceFrom(board.tiles);
  }

  function _init(board) {
    board.add(board._layout);
    board.add(board._background);
    _populate(board);
  }

  function typeCheck(obj) {
    return {}.toString.call(obj).slice(8, -1);
  }

  // Prototypal Methods

  Board.prototype.tileByPosition = function(x, y) {
    return this.tiles[y * 5 + x];
  };

  Board.prototype.tilesByColor = function(colors) {
    var color;
    return this.tiles.filter(typeCheck(colors) === 'Array' ? function(tile) {
      color = tile.getColor();
      for (var i = 0 ; i < colors.length ; i++) if (color === colors[i]) return true;
      return false;
    } : function(tile) {
      return tile.getColor() === colors;
    });
  };

  Board.prototype.wiggleByColor = function(color) {
    this.tilesByColor(color).forEach(function(tile) {
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
