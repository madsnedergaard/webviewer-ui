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

  if (this.pageCoordinates[1] === null) {
    return;
  }

  pageCoordinatesNoRotate[0] = getPageCoordinatesNoRotate(this.pageCoordinates[0]);
  pageCoordinatesNoRotate[1] = getPageCoordinatesNoRotate(this.pageCoordinates[1]);
  var x1 = Math.min(pageCoordinatesNoRotate[0].x, pageCoordinatesNoRotate[1].x);
  var x2 = Math.max(pageCoordinatesNoRotate[0].x, pageCoordinatesNoRotate[1].x);
  var y1 = Math.min(pageCoordinatesNoRotate[0].y, pageCoordinatesNoRotate[1].y);
  var y2 = Math.max(pageCoordinatesNoRotate[0].y, pageCoordinatesNoRotate[1].y);

  if (x1 === x2 || y1 === y2) {
    return;
  }

  window.marqueePrintOptions = {
    pageIndex: this.pageCoordinates[0].pageIndex,
    rect: { x1, x2, y1, y2 }
  };
}

$(document).on('viewerLoaded', function() {
  readerControl.useEmbeddedPrint(false);

  readerControl.docViewer.on('documentUnloaded', function() {
    window.marqueePrintOptions = null;
  });
});