var getPageCoordinatesNoRotate = function({ x, y, pageIndex }) {
  var displayMode = readerControl.docViewer.getDisplayModeManager().getDisplayMode();
  var windowCoordinates = displayMode.pageToWindow({ x, y }, pageIndex);
  x = windowCoordinates.x;
  y = windowCoordinates.y;
  return displayMode.windowToPageNoRotate({ x, y }, pageIndex);
}

var mouseLeftUp = Tools.MarqueeZoomTool.prototype.mouseLeftUp;
Tools.MarqueeZoomTool.prototype.mouseLeftUp = function(e) {
  mouseLeftUp.apply(this, arguments);
  var pageCoordinatesNoRotate = [];
  pageCoordinatesNoRotate[0] = getPageCoordinatesNoRotate(this.pageCoordinates[0]);
  pageCoordinatesNoRotate[1] = getPageCoordinatesNoRotate(this.pageCoordinates[1]);

  window.marqueePrintOptions = {
    pageIndex: this.pageCoordinates[0].pageIndex,
    rect: {
      x1: pageCoordinatesNoRotate[0].x,
      x2: pageCoordinatesNoRotate[1].x,
      y1: pageCoordinatesNoRotate[0].y,
      y2: pageCoordinatesNoRotate[1].y,
    }
  };
}

$(document).on('viewerLoaded', function() {
  readerControl.useEmbeddedPrint(false);

  readerControl.docViewer.on('documentUnloaded', function() {
    window.marqueePrintOptions = null;
  });
});