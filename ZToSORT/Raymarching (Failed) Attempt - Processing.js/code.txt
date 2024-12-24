var raydirs = raydirs || [];

var normals = /*normals || */[];

var sdfsCache = /*sdfsCache || */(function() {
  
  var out = [];
 
  var MAX_STEPS = 100; // lower if laggy
  var EPSILON = 0.001;
  var h = height, w = width;
  var _min = Math.min;
  var _sqrt = Math.sqrt;
  var _max = Math.max;
  var _sin = Math.sin;
  var nois = noise;
  var numPix = w * h * 4;
  
  function sdf(pt) {
    var spherePos = [0, 0, 5];
    var x = pt[0] - spherePos[0];
    var y = pt[1] - spherePos[1];
    var z = pt[2] - spherePos[2];
    var r = 3.0 - 0.2 * _sin(y * 6) * _sin(x * 6);
    return _sqrt(x*x + y*y + z*z) - r;
    // return pt[1] + 2.0 - 0.2 * nois(x*0.1, y*0.1);
    // return _sqrt(x*x + y*y + z*z) - 10.5 - 0.5 /** nois(pt[0]*0.1, pt[1]*0.1)*/ + _sin(pt[1] * 6) * _sin(pt[0] * 6);
  }
  
  // really bad camera
  var ro = [0, 0, 0];
  
  for (var i = 0; i < numPix; i+=4) {
    var ind = i * 0.25;
    var res = _min(w, h);
    var x = ind % w / w * 2 - 1;
    var y = ind / (h*h) * 2 - 1;
    var rd = [x, y, 1];
    var mag = _sqrt(rd[0] * rd[0] + rd[1] * rd[1] + rd[2] * rd[2]);
    rd[0] /= mag;
    rd[1] /= mag;
    rd[2] /= mag;
    raydirs[ind] = rd;
    // cast ray
    var currPos = ro;
    var td = 0;
    for (var s = 0; s < MAX_STEPS; s++) {
      var d = sdf(currPos);
      if (d < EPSILON) {
        var pt = currPos;
        // CALCULATE NORMALS
        var c = 0.5;
        var norm = [
          sdf([pt[0] + c, pt[1], pt[2]]) - sdf([pt[0] - c, pt[1], pt[2]]),
          sdf([pt[0], pt[1] + c, pt[2]]) - sdf([pt[0], pt[1] - c, pt[2]]),
          sdf([pt[0], pt[1], pt[2] + c]) - sdf([pt[0], pt[1], pt[2] - c])
        ];
        normals[ind] = norm;
        out[ind] = currPos;
        break;
      }
      td += d;
      if (td > 50) {
        break;
      }
      currPos = [currPos[0] + rd[0] * d, currPos[1] + rd[1] * d, currPos[2] + rd[2] * d];
    }
  }
  
  // println("done");
  
  return out;
  
})();

draw = function() {
  
  var EPSILON = 0.001;
  var h = height, w = width;
  var _min = Math.min;
  var _sqrt = Math.sqrt;
  var _max = Math.max;
  var numPix = w * h * 4;
  var _pow = Math.pow;
  
  if (mouseX === pmouseX && mouseY === pmouseY) { return; }
  
  var light = [mouseX / w * 2 - 1, mouseY / h * 2 - 1, 1];
  // var light = [0, 0, 0];
  
  if(!loadPixels){ return; }
  loadPixels();
  if(!this.imageData || !this.imageData.data){ return; }
  var pixels = this.imageData.data, numPix = w*h*4;
  
  for (var i = 0; i < numPix; i+=4) {
    
    var clr = [0, 0, 0];
    var ind = i * 0.25;
    var rd = raydirs[ind];
    
    var pt = sdfsCache[ind];
    if (pt) {
      var norm = normals[ind];
      // CALCULATE COLOR
      clr = [3, 1, 2];
      var ptToLight = [light[0] - pt[0], light[1] - pt[1], light[2] - pt[2]];
      // var ptToLight = [light[0], light[1], light[2]]; 
      var m = _sqrt(ptToLight[0]*ptToLight[0] + ptToLight[1]*ptToLight[1] + ptToLight[2]*ptToLight[2]);
      ptToLight[0] /= m;
      ptToLight[1] /= m;
      ptToLight[2] /= m;
      
      var normalDotLight = norm[0]*ptToLight[0] + norm[1]*ptToLight[1] + norm[2]*ptToLight[2];
      normalDotLight = _max(0, _min(1, normalDotLight)) + 0.2;
      var mate = 0.3;
      
      // var reflection = [norm[0] * 2 * normalDotLight, norm[1] * 2 * normalDotLight, norm[2] * 2 * normalDotLight];
      // reflection[0] -= ptToLight[0]; 
      // reflection[1] -= ptToLight[1];
      // reflection[2] -= ptToLight[2];
      // var rDotPo = reflection[0]*rd[0] + reflection[1]*rd[1] + reflection[2]*rd[2];
      
      var l = normalDotLight * mate;
      clr[0] *= l;
      clr[1] *= l;
      clr[2] *= l;
    }
    
    pixels[i + 0] = clr[0] * 255;
    pixels[i + 1] = clr[1] * 255;
    pixels[i + 2] = clr[2] * 255;
    
  }
  updatePixels();
};
