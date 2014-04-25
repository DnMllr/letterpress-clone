define(function(require) {

  var Board              = require('./board/board');
  var TitleBar           = require('./titleBar/titleBar');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var View               = require('famous/core/View');
  var ScoreBoard         = require('./playArea/scoreBoard');

  // Class Constructor

  function Game() {
    View.call(this);
    this.board    = new Board();
    this.menu     = new TitleBar();
    this.playArea = new ScoreBoard('styles/img/guy1.jpg', 'styles/img/guy2.jpg');
    this._layout  = createLayout();
    _init(this);
  }

  Game.prototype             = Object.create(View.prototype);
  Game.prototype.constructor = Game;

  // Helpers

  function _init(game) {
    game._layout.footer.add(game.board);
    game._layout.header.add(game.menu);
    game._layout.content.add(game.playArea);
    game.add(game._layout);
  }

  function createLayout() {
    return new HeaderFooterLayout({
      direction  : HeaderFooterLayout.DIRECTION_Y,
      headerSize : 30,
      footerSize : window.innerWidth
    });
  }

  return Game;

});
