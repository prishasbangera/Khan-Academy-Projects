//Discovered by accident

//change these and see what happens

var colorOne = color(181, 42, 181);
var colorTwo = color(255, 0, 0);
var pixelSize = 2;
var fromAmt = 0;
var toAmt = 255;


var xoff = 0;
var zoff = 0;
var yoff;
var amt;
noStroke();

draw = function() {
    
    background(0);
    
    for (var x = 0; x < width; x+=pixelSize) {
        yoff = 0;
        for (var y = 0; y < height; y+=pixelSize) {
            
            //I know that the amt is supposed to be from 0 to 1, but that mistake                            is how this crazy program happened.
            amt = map(noise(xoff, yoff, zoff), 0, 1, fromAmt, toAmt);
            
            //Remove the conditional and background for a full-canvas experience.
            if (amt < 114) {
                var clr = lerpColor(colorOne, colorTwo, amt);
                set(x, y, clr);
            }
            
            yoff+=0.01;
            
        }
        xoff+=0.01;
    }
    
    xoff = 0;
    zoff += 0.01;
    
};