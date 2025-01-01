//Featuring really messy code {

background(156, 255, 229);
rectMode(CENTER);

//hair {

var halfHair = function(scaleX) {
    
    pushMatrix();
    translate(width/2, 59);
    scale(scaleX, 1.0);
    noStroke();
    fill(0);
    beginShape();
        vertex(0, 50);
        curveVertex(-8, 10);
        curveVertex(-32, 16);
        curveVertex(-37, 33);
        curveVertex(-53, 53);
        curveVertex(-55, 71);
        curveVertex(-66, 84);
        curveVertex(-68, 108);
        curveVertex(-79, 128);
        curveVertex(-55, 135);
        curveVertex(-33, 143);
        curveVertex(22, 139);
        vertex(13, 8);
        vertex(0, 50);
    endShape();
    popMatrix();
    
};
halfHair(1); //left
halfHair(-1); //right

//}

//jeans and shoes {

var shoe = function(scaleX, clr, clr2) {
    pushMatrix();
    translate(0, 94);
    scale(scaleX, 1);
    
    fill(clr);
    beginShape();
        vertex(2, 0);
        vertex(2, 14);
        vertex(-18, 14);
        vertex(-18, 9);
    endShape();
    
    fill(clr2);
    rect(-9, 14, 21, 3, 1);
    
    stroke(clr2);
    strokeWeight(2);
    line(-10, 4, -8, 6);
    line(-13, 6, -12, 7);
    noStroke();
    
    popMatrix();
};

pushMatrix();
translate(width/2, 248);

//left
shoe(1, color(115, 41, 41), color(220));
fill(23, 18, 54);
quad(-27, -7, -7, 97, 2, 100, 2, 0);


//right
shoe(-1, color(184, 68, 68), color(250));
fill(37, 30, 87);
quad(27, -7, 6, 97, -2, 99, -2, 0);

popMatrix();

//}

//body {

//shirt

var msk = createGraphics(width, height, P2D);

msk.halfBody = function(scaleX) {
    msk.pushMatrix();
    msk.scale(scaleX, 1);
    msk.beginShape();
        msk.vertex(0, 0);
        msk.bezierVertex(10, 1, -24, 5, -21, 6);
        msk.bezierVertex(-27, 8, -40, 11, -46, 51);
        msk.vertex(-18, 81);
        msk.vertex(-15, 62);
        msk.vertex(-31, 47);
        msk.vertex(-22, 25);
        msk.bezierVertex(-13, 87, -47, 91, -16, 100);
        msk.vertex(9, 100);
    msk.endShape();
    msk.popMatrix();
};

msk.pushMatrix();
msk.translate(width/2, 149);

msk.fill(255);
msk.noStroke();
msk.background(0);
msk.halfBody(1);
msk.halfBody(-1);

msk.popMatrix();

msk = msk.get();

var spaceGrad = createGraphics(width, height, P2D);
spaceGrad.background(0, 0, 0, 0);

spaceGrad.lighter = color(187, 0, 255);
spaceGrad.darker = color(17, 0, 112);
for (var y = 0; y < 113; y++) {
    spaceGrad.stroke(lerpColor(spaceGrad.lighter, spaceGrad.darker, y/113));
    spaceGrad.line(152, y+138, 246, y+138);
}

//stars
randomSeed(4);
spaceGrad.noStroke();
spaceGrad.fill(255, 150);
for (var i = 0; i < 1088; i++) {
    var radius = random(3);
    spaceGrad.ellipse(random(width/4, width*3/4),random(height/4, height), radius, radius);
}
spaceGrad = spaceGrad.get();
spaceGrad.mask(msk);
image(spaceGrad, 0, 0);

msk = null;

//}

//head {

//glasses and eyes

pushMatrix();
translate(width/2, 111);

//neck
noStroke();
fill(148, 113, 78);
rect(0, 38, 18, 8);
arc(0, 42, 18, 9, 0, 180);

fill(181, 137, 92);
ellipse(0, 3, 66, 66); //head


noFill();

stroke(59, 0, 0);
strokeWeight(3);
arc(-15, 2, 8, 8, -180, 0); //left eye
arc(15, 2, 8, 8, -180, 0); //right eye

stroke(75, 0, 110);
arc(0, 0, 6, 2, -180, 0); //bridge

fill(191, 222, 255, 150);
ellipse(15, 1, 22, 20); //left lens
ellipse(-15, 1, 22, 20); //right lens

popMatrix();

//}

//}