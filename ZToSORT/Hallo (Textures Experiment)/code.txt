fill(0);
textFont(createFont("serif Bold", 121));
text("hallo", 76, 219);
loadPixels();
var pix = imageData.data;
updatePixels();

background(94, 56, 0);
noStroke();
for (var x = 0; x < width; x+=2) {
    for (var y = 0; y < height; y+=2) {
        var i = (x+y*width) * 4;
        if (pix[i] === 255) {
            fill(247, 255, 0, (255 * (cos(y*10) + cos(x*10))) & noise(x/100, y/10) * 255);
            ellipse(x, y, 1, 3);
        } else {
            fill(247, 255, 0, 50);
            ellipse(x, y, 10, 10);
            fill(255, 38, 0, 100);
            ellipse(x, y, 5, 5);
        }
    }
}