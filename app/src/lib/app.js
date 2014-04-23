define(function(require) {

  var Board              = require('./board/board');
  var TitleBar           = require('./titleBar/titleBar');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var ContainerSurface   = require('famous/surfaces/ContainerSurface');
  var ScoreBoard         = require('./playArea/scoreBoard');
  var ModalView          = require('./modals/modalView');

  function App() {
    ContainerSurface.call(this, {
      size: [350, undefined]
    });
    this.board    = new Board();
    this.menu     = new TitleBar();
    this.playArea = new ScoreBoard('styles/img/guy1.jpg', 'styles/img/guy2.jpg');
    this._layout  = new HeaderFooterLayout({
      direction  : HeaderFooterLayout.DIRECTION_Y,
      headerSize : 40,
      footerSize : 350
    });
    this._layout.footer.add(this.board);
    this._layout.header.add(this.menu);
    this._layout.content.add(this.playArea);
    this.modalView = new ModalView();
    this.add(this._layout);
    this.add(this.modalView);
  }

  App.prototype             = Object.create(ContainerSurface.prototype);
  App.prototype.constructor = App;

  return App;

});
