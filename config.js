var mouseLeftUp = Tools.MarqueeZoomTool.prototype.mouseLeftUp;
Tools.MarqueeZoomTool.prototype.mouseLeftUp = function(e) {
  mouseLeftUp.apply(this, arguments);
  window.marqueePrintOptions = {
    pageIndex: this.pageCoordinates[0].pageIndex,
    rect: {
      x1: this.pageCoordinates[0].x,
      y1: this.pageCoordinates[0].y,
      x2: this.pageCoordinates[1].x,
      y2: this.pageCoordinates[1].y
    }
  };
}

$(document).on('viewerLoaded', function() {
  readerControl.useEmbeddedPrint(false);
});