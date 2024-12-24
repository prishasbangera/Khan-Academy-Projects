
var pixelspace = new Array(width * height).fill(true);
var pix = [0, 0];
var newX = 0, newY = 0;
var clr = {
  h: 255,
  s: 255,
  b: 255,
};

colorMode(HSB);
background(0);
var step = 3.7;

function addPt(x, y, arr) {
  if(pixelspace[x + y*width] && x >= 0 && x < width && y >= 0 && y < height) {
    arr.push([x, y]);
  }
}

var draw = function() {
  for (var i = 0; i < 1000; i++) {
    
    set(pix[0], pix[1], color( clr.h, clr.s, clr.b ));
    pixelspace[pix[0] + pix[1]*width] = false;
    
    // pick new position
    var newPts = [];
    addPt(pix[0] - 1, pix[1], newPts);
    addPt(pix[0] + 1, pix[1], newPts);
    addPt(pix[0], pix[1] - 1, newPts);
    addPt(pix[0], pix[1] + 1, newPts);
    
    var newPt;
    if (newPts.length === 0) {
      while(!pixelspace[newX + newY*width]) {
        newX++;
        if (newX > width) {
          newX = 0;
          newY++;
        }
        if (newY > height) {
          println("done");
          noLoop();
          return;
        }
      }
      newPt = [newX, newY];
    } else {
      newPt = newPts[Math.floor(Math.random() * newPts.length)];
    }
    pix[0] = newPt[0];
    pix[1] = newPt[1];
    
    // new color
    clr.h -= step;
    if (clr.h < 0) {
      clr.h = 255;
      clr.b -= step;
    }
    if (clr.b < 0) {
      clr.b = 255;
      clr.s -= step;
    }
    if (clr.s < 0) {
      noLoop();
      println("done");
      return;
    }
    
  }
};