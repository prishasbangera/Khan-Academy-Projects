var r = 114;
var xoffoff = 0;

random();
background(5, 0, 20);
noiseSeed(10);
loadPixels();

var pixels = imageData.data;
var zoff = 0;

function draw() {
    var xoff = xoffoff;
    for (var x = 0; x < width; x++) {
        var yoff = 0;
        for (var y = 0; y < height; y++) {
            var i = (x+y*width)*4;
            var d = dist(x, y, width/2, height/2);
            if (d < r) {
                var clr = lerpColor(
                    color(0, 34, 255),
                    color(0, 255, 38),
                    noise(xoff, yoff));
                var bright = map(d, 0, r, 2, 0.3);
                pixels[i + 0] = (clr >> 16 & 0xff) * bright;
                pixels[i + 1] = (clr >> 8 & 0xff) * bright;
                pixels[i + 2] = (clr & 0xff) * bright;
                yoff -= 0.05;
            } else {
                // pixels[i + 3] = noise(sin(frameCount*2)+x/100, y/50, zoff) * 488;
                yoff -= 0.08;
            }
        }
        xoff+=0.01;
    }
    updatePixels();
    xoffoff -= 0.06;
    zoff += 0.01;
}