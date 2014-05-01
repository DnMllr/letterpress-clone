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
    this._layout     = _createLayout();
    this._background = _createBackground();
    this.wordBuilder = new WordBuilder();
    this.tiles       = [];

    _init(this);
  }

  Board.prototype             = Object.create(View.prototype);
  Board.prototype.constructor = Board;

  // Helpers

  function _init(board) {
    _createScene.apply(board);
    _populate.apply(board);
  }

  function _createScene() {
    this.add(this._layout);
    this.add(this._background);
  }

  function _populate() {
    this.tiles = [];
    for (var i = 0 ; i < 25 ; i++) this.tiles.push(new Tile(_getRandomChar(), i));
    this.tiles.forEach(function(tile) {
      tile._eventInput.on('click', function() {
        var index = this.wordBuilder.indexOf(tile);
        if (index !== -1) this.wordBuilder.remove(index);
        else this.wordBuilder.push(tile);
      }.bind(this));
    }.bind(this));
    this._layout.sequenceFrom(this.tiles);
  }

  function _createBackground() {
    return new Surface({
      properties: {
        background : 'rgb(235, 234, 232)',
        zIndex     : -1
      }
    });
  }

  function _createLayout() {
    return new GridLayout({
      dimensions: [5,5]
    });
  }

  function _getRandomChar() {
    var type  = Math.random() > 0.6 ? 'vowels' : 'consonants';
    var index = Math.floor(Chars[type].length * Math.random());
    return Chars[type][index];
  }

  function typeCheck(obj) {
    return {}.toString.call(obj).slice(8, -1);
  }

  function buildGrid(tiles) {
    var grid = [[], [], [], [], []];
    tiles.forEach(function(tile) {
      var pos = tile.getPos();
      grid[pos[1]][pos[0]] = tile;
    });
    return grid;
  }

  function findSurrounded(grid) {
    var surrounded = {};
    grid.forEach(function(row, y) {
      if (row.length)
        row.forEach(function(tile, x) {
          if (tile) {
            var xs = [];
            var ys = [];
            if (x - 1 > -1) xs.push(x - 1);
            if (x + 1 < 5) xs.push(x + 1);
            if (y - 1 > -1) ys.push(y - 1);
            if (y + 1 < 5) ys.push(y + 1);
            var neighbors = [];
            xs.forEach(function(xP) {
              neighbors.push([xP, y]);
            });
            ys.forEach(function(yP) {
              neighbors.push([x, yP]);
            });
            var tally = 0;
            var total = xs.length + ys.length;
            neighbors.forEach(function(neighbor) {
              if (grid[neighbor[1]][neighbor[0]]) tally++;
            });
            if (tally === total) surrounded[tile.getPos().join('')] = tile;
          }
        });
    });
    return surrounded;
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

  Board.prototype.acceptWord = function(color) {
    this.wordBuilder.tiles.forEach(function(tile) {
      tile.setColor(color);
    });
    var surrounded = findSurrounded(buildGrid(this.tilesByColor([color, color * 2])));
    for (var key in surrounded) surrounded[key].setColor(color * 2);
    this.wordBuilder.removeAll();
  };

  return Board;

});
