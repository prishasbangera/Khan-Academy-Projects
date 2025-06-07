//The shoop is based off of https://www.clipartmax.com/png/middle/214-2141872_sheep-cute-kawaii-adorable-blue-wizard-sorcerer-supersh-kawaii.png
//The bunny based off of https://c8.alamy.com/comp/2A5APT6/magic-bunny-cartoon-doodle-simple-kawaii-bunny-in-wizard-hat-vector-clip-art-illustration-2A5APT6.jpg

var setting = function() {
    background(236, 178, 255);
    fill(171, 99, 235);
    noStroke();
    randomSeed(3);
    for (var i = 0; i < 235; i++) {
        rect(random(width), random(height), 0.1, 0.1, -7);
    }
    return get();
};

var shoop = function(x, y) {
    
    pushMatrix();
    translate(x, y);//position of the shoop
    //back hoof
    stroke(56, 36, 14);
    strokeWeight(4.5);
    fill(245, 255, 191);
    arc(-62, +32, 25, 22, 44, 210);
    
    //back horn
    fill(100);
    arc(+56, -28, 36, 38, -107, 33);
    
    //back cape
    fill(30, 49, 143);
    beginShape();
    vertex(-80, -23);
    bezierVertex(+26, -27, 
                 -66, -44,
                 -87, -82);
        vertex(-111, -30);
    endShape(CLOSE);
    
    //body
    noStroke();
    fill(174, 216, 227);
    ellipse(0, 0, 146, 106);//main ellipse
    stroke(56, 36, 14);
    
    //fluffs, going clockwise
    //top fluff
    pushMatrix();
    translate(+5, -34); 
    rotate(7);
    arc(0, 0, 106, 66, 186, 360);
    popMatrix();
    arc(+54, 0, 43, 57, -72, 90); //rightmost fluff
    arc(+24, +32, 62, 50, 0, 123); //fluff, right hoof
    arc(-17, +34, 62, 50, 46, 172); //fluff, left hoof
    arc(-33, +7, 97, 69, 107, 213); //fluff near back hoof
    arc(-51, -24, 61, 49, 139, 287);//fluff near horn
    
    //front hooves (begin/end shape to close arc)
    fill(255, 250, 191); 
    //left
    beginShape();
    arc(-17, +34, 25, 24, 35, 190);
    endShape(CLOSE);
    //right
    beginShape();
    arc(+33, +34, 25, 24, -14, 136); 
    endShape(CLOSE);
    
    //face
    ellipse(+13, -5, 88, 66);
    
    noFill();
    //cheeks
    strokeWeight(7);
    stroke(255, 149, 92, 150);
    ellipse(-10, +9, 7, 7); //left
    ellipse(+44, +4, 7, 7);//right
    //eyes
    stroke(56, 36, 14);
    strokeWeight(6);
    ellipse(-5, +0, 6, 6); //left eye
    ellipse(+39, +-3, 6, 6); //right eye
    //mouth
    strokeWeight(3);
    stroke(224, 105, 105);
    arc(+16, +-1, 3, 5, -103, 64); //left arc
    arc(+21, +-1, 3, 5, 66, 253); //right arc
    
    //front horn
    strokeWeight(4.5);
    stroke(56, 36, 14);
    fill(100);
    beginShape(); var x = 4;
    vertex(-37, -17);
    vertex(-31, -27);
    bezierVertex(-36, -54, 
                 -84, -31,
                 -59, -14);
    bezierVertex(-19, +-4, 
                 -44, -44,
                 -51, -23);
    vertex(-49, -20);
    endShape();
    
    //wizard's hat
    fill(30, 49, 143);
    triangle(+32, -52, 
             -8, -55,
             +16, -120); //main
    arc(+12, -56, 39, 18, 11, 194); //arc at brim of hat (to make rounder
    fill(232, 191, 67);
    arc(+16, -118, 7, 21, 180, 360); //golden arc at tip of hat
    
    //stars
    strokeWeight(3);
    
    //star on very top (only see one tip)
    beginShape();
    vertex(+17, -106);
    vertex(+16, -100);
    vertex(+20, -97);
    endShape();
    
    //2nd star from top
    beginShape();
    vertex(+7, -91);
    vertex(+12, -95);
    vertex(+12, -86);
    vertex(+17, -82);
    vertex(+11, -80);
    vertex(+8, -73);
    vertex(+4, -80);
    endShape();
    
    //third star from top
    beginShape();
    vertex(+25, -66);
    vertex(+21, -67);
    vertex(+17, -72);
    vertex(+15, -65);
    vertex(+9, -62);
    vertex(+15, -59);
    vertex(+15, -52);
    vertex(+20, -57);
    vertex(+26, -55);
    vertex(+24, -61);
    vertex(+27, -64);
    endShape();
    
    //bottom star
    beginShape();
    vertex(-6, -59);
    vertex(+1, -63);
    vertex(+1, -56);
    vertex(+6, -54);
    vertex(+2, -49);
    vertex(-5, -52);
    endShape();   
    popMatrix();
    
};

var bun = function(x, y) {
    
    pushMatrix();
    translate(x, y);
    //fill-in
    fill(255, 247, 254);
    noStroke();
    beginShape();
    vertex(-21, -51);
    vertex(-34, +5);
    vertex(-25, +26);
    vertex(-28, +79);
    vertex(+82, +79);
    vertex(+57, -51);
    endShape();
    
    //outline
    strokeWeight(4.5);
    stroke(33, 0, 51);
    
    //left ear
    pushMatrix();
    translate(-28, -23);
    rotate(32);
    arc(0, 0, 29, 62, 38, 255);
    popMatrix();
    //left cheek
    arc(-23, 0, 30, 47, 90, 270);
    arc(-13, -14, 21, 50, 208, 247);
    //left part of body
    arc(-23, +49, 18, 51, 135, 270);
    //left hind foot
    arc(-20, +72, 31, 18, 33, 234);
    //left front foot
    arc(-3, +67, 24, 34, 0, 180);
    //right front foot
    arc(+22, +67, 24, 34, 0, 180);
    //line between right front foot and right hind foot
    line(+36, +78, +31, +78);
    //right hind foot
    arc(+55, +74, 32, 19, 17, 239);
    arc(+60, +65, 26, 44, 178, 258);
    //tail
    arc(+79, +66, 27, 26, -85, 129);
    //back
    arc(+67, +51, 23, 68, -75, 14);
    //right cheek
    arc(+69, 0, 11, 32, -13, 69);
    //right ear
    bezier(+55, -50, +124, -3, +69, +46, +54, -22);
    //top of head
    bezier(-24, -48, +-5, -58, +30, +-59, +55, -50);
    
    //eyes
    noFill();
    strokeWeight(7);
    line(-8, -18, +4, -20); //left
    line(+39, -18, +27, -20);//right
    
    //mouth
    strokeWeight(5);
    bezier(+13, -8, +11, -10, +14, +-2, +2, 0);
    bezier(+13, -7, +11, +-2, +22, +1, +19, 0);
    
    //cheeks
    strokeWeight(10);
    stroke(255, 181, 181);
    ellipse(-17, +-7, 7, 4); //left
    ellipse(+43, +-5, 7, 4);//right
    
    //hat
    strokeWeight(4.5);
    stroke(33, 0, 51);
    fill(166, 71, 204);
    beginShape();
    vertex(+42, -52);
    bezierVertex(+36, +-43, +3, +-38, -10, -52);
    bezierVertex(0, +-67, +1, +-97, +16, -103);
    bezierVertex(+32, +-85, +15, +-107, +42, -52);
    endShape();
    
    //hat star
    fill(250, 255, 117);
    strokeWeight(4);
    beginShape();
    vertex(+13, -77);
    vertex(+17, -69);
    vertex(+24, -69);
    vertex(+20, -63);
    vertex(+21, -55);
    vertex(+14, -59);
    vertex(+7, -55);
    vertex(+8, -62);
    vertex(+3, -67);
    vertex(+9, -68);
    endShape(CLOSE);
    popMatrix();
};

setting();
shoop(132, 240);
bun(271, 214);

//This bun and this shoop are best buddies forever and they go on super-amazing magical adventures together!!
