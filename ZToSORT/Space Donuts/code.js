var bgOn = true;
var clr1 = color(132, 0, 255);
var clr2 = color(1, 0, 51);
var maxSize = 150;
imageMode(CENTER);
var donutImg = (function() {
    var s = 60;
    var msk = createGraphics(s, s, P2D);
    msk.background(0);
    msk.fill(255, 255, 255);
    msk.translate(s/2, s/2);
    msk.strokeWeight(14);
    msk.stroke(255);
    msk.noFill();
    msk.ellipse(0, 0, s/2, s/2);
    msk = msk.get();
    var frosting = createGraphics(s, s, P2D);
    frosting.strokeWeight(2);
    for (var y = 0; y < s; y++) {
        frosting.stroke(lerpColor(clr1, clr2, y/s));
        frosting.line(0, y, s, y);
    }
    frosting.stroke(225, 150);
    for (var i = 0; i < 250; i++) {
        frosting.strokeWeight(random(0, 1));
        frosting.point(random(s), random(s));
    }
    frosting = frosting.get();
    frosting.mask(msk);
    var cake = createGraphics(s, s, P2D);
    var lighterClr = color(212, 106, 0);
    var darkerClr = color(61, 27, 0);
    for (y = 0; y < s; y++) {
        cake.stroke(lerpColor(lighterClr, darkerClr, y/s));
        cake.line(0, y, s, y);
    }
    cake = cake.get();
    cake.mask(msk);
    var img = createGraphics(s, s, P2D);
    img.imageMode(CENTER);
    img.background(0, 0);
    img.translate(img.width/2, img.height/2);
    img.image(cake, 0, 0, s*1.3, s*1.3);
    img.image(frosting, 0, 0, s*1.1, s*1.1);
    img = img.get();
    return img;
})();
function donuts(x, y, s, a) {
    pushMatrix();
    translate(x, y);
    rotate(frameCount);
    image(donutImg, 0, 0, s, s);
    popMatrix();
    if (s > maxSize/9) {
        pushMatrix();
        translate(x, y);
        rotate(frameCount%360);
        donuts(s*0.7, 0, s/2); 
        donuts(-s*0.7, 0, s/2); 
        popMatrix();
    }
}
var spaceBackground = (function() {
    var img = createGraphics(width, height, P2D);
    img.background(28, 0, 54);
    img.noStroke();
    for (var i = 0; i < width+100; i+=2) {
        img.fill(lerpColor(color(255), clr1, i/width+100), 2);
        img.ellipse(width/2, height/2, i, i);
    }
    img.stroke(255, 100);
    for (i = 0; i < 1000; i++) {
        img.strokeWeight(random(0, 3));
        img.point(random(width), random(height));
    }
    image(img, width/2, height/2);
    return img.get();
})();
draw = function() {
    if (bgOn) {
        image(spaceBackground, width/2, height/2);
    }
    donuts(width/2, height/2, maxSize);
};