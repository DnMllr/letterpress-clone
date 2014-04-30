define(function(require) {

  var Board              = require('./board/board');
  var TitleBar           = require('./titleBar/titleBar');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var Modifier           = require('famous/core/Modifier');
  var View               = require('famous/core/View');
  var ScoreBoard         = require('./playArea/scoreBoard');
  var Transitionable     = require('famous/transitions/Transitionable');
  var Easing             = require('famous/transitions/Easing');
  var EventHandler       = require('famous/core/EventHandler');

  // Class Constructor

  function Game() {
    View.call(this);
    this._size    = new Modifier({
      size: [100, 100]
    });
    this.IO       = new EventHandler();
    this._sizer   = new Transitionable(1);
    this.board    = new Board();
    this.menu     = new TitleBar();
    this.playArea = new ScoreBoard('styles/img/guy1.jpg', 'styles/img/guy2.jpg');
    this._layout  = createLayout();
    _init(this);
    _wireEvents(this);
  }

  Game.prototype             = Object.create(View.prototype);
  Game.prototype.constructor = Game;

  // This isn't going to work most likely

  Game.prototype.toThumb = function() {
    this.board.hideAllLetters();
    this._sizer.set(0, {curve: Easing.outQuad, duration: 500});
    this._layout.setOptions({
      headerSize: 0,
      footerSize: 100
    });
  };

  Game.prototype.toFull = function() {
    this.board.showAllLetters();
    this._sizer.set(1, {curve: Easing.outQuad, duration: 500});
    this._layout.setOptions({
      headerSize: 50,
      footerSize: window.innerWidth
    });
  };

  // Helpers

  function _init(game) {
    game._layout.footer.add(game.board);
    game._layout.header.add(game.menu);
    game._layout.content.add(game.playArea);
    game._size.setSize(function() {
      return [100 + game._sizer.get() * (window.innerWidth - 100), 100 + game._sizer.get() * (window.innerHeight - 100)];
    });
    game.add(game._size).add(game._layout);
  }

  function _wireEvents(game) {
    game.IO.subscribe(game.board.wordBuilder.IO);
    game.IO.on('WB activated', function() {
      game.playArea.overlap();
    });
    game.IO.on('WB deactivated', function() {
      game.playArea.home();
      game.playArea.setPlayer();
    });
  }

  function createLayout() {
    return new HeaderFooterLayout({
      direction  : HeaderFooterLayout.DIRECTION_Y,
      headerSize : 50,
      footerSize : window.innerWidth
    });
  }

  return Game;

});
