var img = (function() {
  var i = createGraphics(width, height, P2D);
  i.image(getImage("food/ice-cream"), 0, 0);
  return i;
})();

var y = 1;
var pixels = [];
var ipixels = [];

var partialxkernel = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1]
];
var partialykernel = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1]
];

function getPixel(x, y) {
  return (x + y*width) * 4;
}

// i really dont know the technical terms for these things
function applyKernel(p, x, y, k, i) {
  return (
    
  k[0][0]*p[i+getPixel(x-1,y-1)] + k[0][1]*p[i+getPixel(x+0,y-1)] + k[0][2]*p[i+getPixel(x+1,y-1)] +  
  k[1][0]*p[i+getPixel(x-1,y+0)] + k[1][1]*p[i+getPixel(x+0,y+0)] + k[1][2]*p[i+getPixel(x+1,y+0)] +  
  k[2][0]*p[i+getPixel(x-1,y+1)] + k[2][1]*p[i+getPixel(x+0,y+1)] + k[2][2]*p[i+getPixel(x+1,y+1)]
  
  );
}

frameRate(0);

draw = function() {
  
  if (!this.loadPixels) { return; }
  if (!img.loadPixels) { return; }
  
  this.loadPixels();
  img.loadPixels();
  
  if (!this.imageData || !this.imageData.data){return;}
  pixels = this.imageData.data;
  if (!img.imageData || !img.imageData.data){return;}
  ipixels = img.imageData.data;
  
  for (var x = 1; x < width - 1; x++) {
    
    var i = getPixel(x, y);
    
    // central difference x and y (last parameter tells whether its rgb, take average of all three lol)
    var partialx = (applyKernel(ipixels, x, y, partialxkernel, 0) + applyKernel(ipixels, x, y, partialxkernel, 1) + applyKernel(ipixels, x, y, partialxkernel, 2))/3;
    var partialy = (applyKernel(ipixels, x, y, partialykernel, 0) + applyKernel(ipixels, x, y, partialykernel, 1) + applyKernel(ipixels, x, y, partialykernel, 2))/3;
    
    // var dir = Math.atan2(partialy, partialx);
    var mag = Math.sqrt(partialx * partialx + partialy * partialy);
    
    pixels[i + 0] = partialx;
    pixels[i + 1] = partialy;
    pixels[i + 2] = mag;
    
  }
  
  this.updatePixels();
  img.updatePixels();

  if (++y > height - 1) {
    noLoop();
  }
  
};