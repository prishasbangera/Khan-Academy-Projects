var tubeyThing = (function() {
    
    //create the mask of the tube
    var msk = createGraphics(230, 400, P2D);
    msk.background(0);
    //make the tube a little transparent
    msk.fill(255, 240);
    msk.translate(36, 47);
    msk.beginShape();
        msk.vertex(0, 0);
        msk.bezierVertex(22, -3, 89, -15, 160, 0);
        msk.bezierVertex(127, 104, 149, 293, 160, 317);
        msk.bezierVertex(92, 340, 32, 322, 0, 317);
        msk.bezierVertex(17, 278, 23, 40, 0, 0);
    msk.endShape();
    msk = msk.get();
    
    //create the tube and mask it
    var tube = createGraphics(230, 400, P2D);
    for (var y = 0; y < tube.height; y++) {
        //pink color gradient based on y
        tube.stroke(lerpColor(
            color(255, 97, 187),
            color(255, 186, 255),
            y/tube.height
        ));
        tube.line(0, y, tube.width, y);
    }
    
    //purple lighting
    var min = tube.height*0.33;
    var max = tube.height*0.89;
    tube.noStroke();
    for (y = max; y >= min; y-=2) {
        tube.pushMatrix();
        tube.translate(tube.width*0.23, y);
        tube.fill(
            color(191, 58, 232), 
            map(y, min, max, 0, 15)
        );
        tube.beginShape();
            tube.vertex(0, 0);
            tube.bezierVertex(102, 28, 73, 5, 130, 0);
            tube.bezierVertex(68, -33, 88, -87, 0, 0);
        tube.endShape();
        tube.popMatrix();
    }
    
    //sparklies
    var genX = new Random(8);
    var genY = new Random(6);
    tube.pushMatrix();
    tube.translate(tube.width/2, tube.height*0.81);
    for (var i = 0; i < 2850; i++) {
        //random size and alpha
        tube.stroke(255, random(200));
        tube.strokeWeight(random(3.1));
        //pos
        var x = genX.nextGaussian()*54;
        var y = genY.nextGaussian()*79;
        tube.point(x, y);
    }
    tube.popMatrix();
    
    //shine reflectiony thing
    tube.noStroke();
    tube.fill(255, 2);
    for (i = 0; i < 192; i+=2) {
        tube.pushMatrix();
        tube.translate(194, 51);
        tube.scale(i/100);
        tube.translate(-i/7, i/70);
        tube.beginShape();
            tube.vertex(-130, -13);
            tube.bezierVertex(-78, -17, 22, -32, 26, 2);
            tube.bezierVertex(1, 132, 49, 79, 20, 143);
            tube.bezierVertex(-41, 52, 6, 15, -90, 8);
        tube.endShape();
        tube.popMatrix();
    }
    
    tube = tube.get();
    tube.mask(msk);
    
    //final image
    var img = createGraphics(500, 500, P2D);
    //transparent background
    img.background(0, 0);
    img.translate(107, 11);
    
    //tube
    img.image(tube, 26, 29);
    
    //top shadow
    img.noStroke();
    img.fill(201, 40, 129);
    img.pushMatrix();
    img.translate(53, 72);
    img.beginShape();
        img.vertex(1, 2);
        img.vertex(10, -20);
        img.vertex(170, -20);
        img.vertex(182, 0);
        img.vertex(169, 9);
        img.bezierVertex(96, -7, 51, 3, 9, 8);
    img.endShape();
    img.popMatrix();
    
    //bottom shadow
    img.noStroke();
    img.pushMatrix();
    img.translate(62, 387);
    img.beginShape();
        img.vertex(3, -3);
        img.vertex(-7, 3);
        img.vertex(34, 24);
        img.vertex(140, 25);
        img.vertex(167, 3);
        img.vertex(158, -2);
        img.bezierVertex(100, 6, 93, 12, 5, -3);
    img.endShape();
    img.popMatrix();
    
    //top
    img.pushMatrix();
    img.translate(39, 35);
    img.fill(217, 78, 150);
    img.beginShape();
        img.vertex(0, 0);
        img.bezierVertex(96, -16, 100, -19, 209, 0);
        img.vertex(196, 37);
        img.bezierVertex(122, 26, 88, 24, 15, 39);
    img.endShape();
    img.popMatrix();
    
    //bottom
    img.pushMatrix();
    img.translate(56, 391);
    img.beginShape();
        img.vertex(0, -1);
        img.bezierVertex(100, 19, 123, 10, 173, -1);
        img.vertex(181, 31);
        img.bezierVertex(157, 39, 75, 52, -9, 31);
    img.endShape();
    img.popMatrix();
    
    //light
    img.fill(255, 242, 255, 1);
    for (var i = 0, add = 0; i < 377; add+=0.01, i+=add) {
        img.ellipse(142, 226, i+83, i);
    }
    
    return img.get();
    
})();

//change random seed for different peppermint
var peppermint = (function() {
    
    //create mask
    var msk = createGraphics(210, 210, P2D);
    msk.background(0);
    msk.noStroke();
    msk.ellipse(msk.width/2, msk.height/2, 200, 200);
    msk = msk.get();
    
    //create peppermint
    var img = createGraphics(210, 210, P2D);
    img.background(255, 240, 247);
    img.angleMode = "degrees";
    //shadow
    img.noFill();
    img.stroke(0, 2);
    for (var i = 0; i <= 50; i+=2) {
        img.strokeWeight(i);
        img.ellipse(img.width/2, img.height/2, 
                    img.width, img.height);
    }
    //change random seed for different peppermint
    img.randomSeed(60);
    //stripes
    img.noStroke();
    img.fill(255, 0, 85);
    for (var a = 0; a < 360; a+=30) {
        img.pushMatrix();
        img.translate(img.width/2, img.height/2);
        img.rotate(a);
        img.translate(0, 25+img.random(2, 9));
        var y = img.random(9, 25);
        img.beginShape();
            img.vertex(0, y);
            img.bezierVertex(-21+img.random(9, 22), 
                             75+img.random(-3, -18), 
                             31+img.random(-9, -3), 
                             34+img.random(1, 14), 
                             1, 84);
            img.bezierVertex(60+img.random(-7, -1), 
                             59+img.random(8, -1), 
                             23+img.random(2, -7), 
                             61+img.random(-20, 11), 
                             0, y);
        img.endShape();
        img.popMatrix();
    }
    //light in middle
    img.fill(255, 227, 227, 4);
    for (var i = 34; i < img.width; i++) {
        img.ellipse(img.width/2, img.height/2, i, i);
    }
    //arc light
    img.fill(255, 10);
    
    
    //mask and return
    img = img.get();
    img.mask(msk);
    return img;
    
})();


background(94, 16, 94);
image(tubeyThing, 133, 87);
image(peppermint, 0, 0);
