define(function(require) {

  var Board              = require('./board/board');
  var TitleController    = require('./titleBar/titleController');
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
    this._size    = _createSize();
    this._layout  = _createLayout();
    this.IO       = new EventHandler();
    this._sizer   = new Transitionable(1);
    this.board    = new Board();
    this.menu     = new TitleController();
    this.playArea = new ScoreBoard('styles/img/guy1.jpg', 'styles/img/guy2.jpg');

    _init(this);
  }

  Game.prototype             = Object.create(View.prototype);
  Game.prototype.constructor = Game;

  // Helpers

  function _init(game) {
    [

      _wireTransitionables,
      _wireEvents,
      _createScene

    ].forEach(function(step) {
      step.apply(game);
    });
  }

  function _wireTransitionables() {
    this._size.setSize(function() {
      return [100 + this._sizer.get() * (window.innerWidth - 100), 100 + this._sizer.get() * (window.innerHeight - 100)];
    }.bind(this));
  }

  function _wireEvents() {
    this.IO.subscribe(this.board.wordBuilder.IO);

    this.IO.on('WB activated', function() {
      this.playArea.overlap();
    }.bind(this));

    this.IO.on('WB deactivated', function() {
      this.playArea.home();
      this.playArea.setPlayer();
    }.bind(this));
  }

  function _createScene() {
    this._layout.footer.add(this.board);
    this._layout.header.add(this.menu);
    this._layout.content.add(this.playArea);
    this.add(this._size).add(this._layout);
  }

  function _createLayout() {
    return new HeaderFooterLayout({
      direction  : HeaderFooterLayout.DIRECTION_Y,
      headerSize : 50,
      footerSize : window.innerWidth
    });
  }

  function _createSize() {
    return new Modifier({
      size: [100, 100]
    });
  }

  // Prototypal Methods

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

  return Game;

});
