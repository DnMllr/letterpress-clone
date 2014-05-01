define(function(require) {

  var Modifier           = require('famous/core/Modifier');
  var View               = require('famous/core/View');
  var EventHandler       = require('famous/core/EventHandler');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var Transitionable     = require('famous/transitions/Transitionable');
  var Easing             = require('famous/transitions/Easing');
  var Board              = require('./board/board');
  var TitleController    = require('./titleBar/titleController');
  var wait               = require('./wait');
  var ScoreBoard         = require('./playArea/scoreBoard');

  // Class Constructor

  function Game() {
    View.call(this);
    this._size         = _createSize();
    this._layout       = _createLayout();
    this.IO            = new EventHandler();
    this._sizer        = new Transitionable(1);
    this.board         = new Board();
    this.menu          = new TitleController();
    this.playArea      = new ScoreBoard('styles/img/guy1.jpg', 'styles/img/guy2.jpg');
    this.currentPlayer = 1;

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
    this.subscribe(this.board.wordBuilder.IO);
    this.subscribe(this.menu);

    this._eventInput.on('submit', function() {
      this._eventOutput.emit('submit');
      wait(2100).then(function() {
        this.board.acceptWord(this.currentPlayer === 1 ? 1 : -1);
        this.nextTurn();
      }.bind(this));
    }.bind(this));

    this._eventInput.on('cancel', function() {
      this.board.wordBuilder.removeAll();
    }.bind(this));

    this._eventInput.on('WB activated', function() {
      this.playArea.overlap();
      this.menu.show(2);
    }.bind(this));

    this._eventInput.on('WB deactivated', function() {
      this.playArea.home();
      this.menu.show(1);
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

  Game.prototype.nextTurn = function() {
    this.currentPlayer = this.currentPlayer % 2;
    this.currentPlayer++;
    this.playArea.setPlayer(this.currentPlayer);
  };

  return Game;

});
