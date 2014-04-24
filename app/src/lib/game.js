define(function(require) {

  var Board              = require('./board/board');
  var TitleBar           = require('./titleBar/titleBar');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var View               = require('famous/core/View');
  var ScoreBoard         = require('./playArea/scoreBoard');

  function Game() {
    View.call(this);
    this.board    = new Board();
    this.menu     = new TitleBar();
    this.playArea = new ScoreBoard('styles/img/guy1.jpg', 'styles/img/guy2.jpg');
    this._layout  = new HeaderFooterLayout({
      direction  : HeaderFooterLayout.DIRECTION_Y,
      headerSize : 30,
      footerSize : window.innerWidth
    });
    this._layout.footer.add(this.board);
    this._layout.header.add(this.menu);
    this._layout.content.add(this.playArea);
    this.add(this._layout);
  }

  Game.prototype             = Object.create(View.prototype);
  Game.prototype.constructor = Game;

  return Game;

});
