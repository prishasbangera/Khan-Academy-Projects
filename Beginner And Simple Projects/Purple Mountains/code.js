//A scene that uses the noise function to create animated clouds, a beach, and mountains.
//For animated clouds, I referred to KA challenge Animated Noise.

enableContextMenu();

var generatorX = new Random(2);
var generatorY = new Random(30);
noiseSeed(9);

//birds
var drawBird = function(x, y) {
    var opacity = map(y, 0, height/2, 39, 146);
    var rotateAngle = map(x, 0, width, -10, 15);
    stroke(0, 0, 0, opacity);
    strokeWeight(1.5);
    pushMatrix();
    translate(x,y);
    rotate(rotateAngle);
    line(0, 0, -3, -5);
    line(0, 0, 3, -5);
    popMatrix();
};

//beach
var drawBeachLayer = function(layerX, color) {
    var tFactor = 17;
    for(var t = 0; t*tFactor < 200; t+=0.01) {
        var n = noise(t);
        var x = map(n, 0, 1, 0, width);
        stroke(color);
        rect(layerX, t*tFactor + 340, x, 1);
    }
};

//mountains
var drawRange = function(mapHeight, color, tFactor) {
    var incAmount = 0.01;
    stroke(color);
    for (var t = 0; t < width*incAmount +5; t += incAmount) {
        var n = noise(t*tFactor);
        var y = map(n, 0, 1, 0, mapHeight);
        rect(t*100 - 17, height-y, 1, y);
    }
};

//draw birds
var birdNum = 33;
var meanX = 267;
var meanY = 135;
var standDevX = 90;
var standDevY = 37;
var randNums = [];
for (var i = 0; i < birdNum; i++) {
    randNums.push({
        x: generatorX.nextGaussian() * standDevX + meanX,
        y: generatorY.nextGaussian() * standDevY + meanY
    });
}

var img = function() {
    background(0, 0);
    //draw mountains
    drawRange(488, color(224, 161, 255), 0.5);
    drawRange(488, color(224, 161, 255), -0.4);
    drawRange(437, color(224, 145, 255), 0.4);
    drawRange(460, color(224, 145, 255), 0.9);
    drawRange(419, color(217, 120, 255), 0.8);
    drawRange(350, color(210, 97, 255), 0.49);
    drawRange(332, color(193, 87, 255), -0.94);
    drawRange(279, color(190, 69, 255), -0.4);
    drawRange(235, color(196, 48, 255), -0.6);
    //draw beach  
    drawBeachLayer(294, color(0, 136, 255));
    drawBeachLayer(173, color(38, 154, 255));
    drawBeachLayer(121, color(64, 166, 255));
    drawBeachLayer(44, color(110, 187, 255));
    drawBeachLayer(-4, color(255, 240, 79));
    drawBeachLayer(-65, color(255, 234, 0));
    //draw birds!
    for(var i = 0; i < birdNum; i++) {
        drawBird(randNums[i].x, randNums[i].y);
    }
    return get();
}();

var zOff = 0.0;
draw = function() {
    
    //clouds -- make and animate
    noStroke();
    var xOff = 0;
    for (var x = 0; x < width; x+=4) {
        var yOff = 0;
        for (var y = 0; y < height/2; y+=4) {
            var bright = map(noise(xOff,yOff,zOff), 0, 1, 0, 255);
            fill(bright + 40, bright + 40, bright + 70);
            rect(x, y, 4, 4);
            yOff += 0.03;
        }
        xOff += 0.01;
    }
    zOff += 0.01;
    
    image(img, 0, 0);

};