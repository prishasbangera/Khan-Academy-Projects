var stars = (function() {
    
    //setup stuff
    imageMode(CENTER);
    randomSeed(11);
    
    //normal distribution stuff
    var gen = {
        x: new Random(1),
        y: new Random(3)
    };
    
    //background radial gradient
    var s = height*2.5;
    var img = createGraphics(width, height, P2D);
    img.noStroke();
    for (var r = s; r > 0; r-=10) {
        img.fill(lerpColor(
            color(56, 1, 50), 
            color(22, 2, 79),
            r/s
        ));
        img.ellipse(320, 60, r, r);
    }
    img.noStroke();
    //a bunch of ellipses
    img.colorMode(HSB);
    for (var i = 0; i < 1000; i++) {
        img.fill(random(255), 255, 150, 4);
        img.ellipse(
            random(-img.width*1.2, img.width*1.2), 
            random(-img.height*1.2, img.height*1.2), 
            random(150, 200), random(80, 150)
        );
    }
    
    //star clusters of different colors
    for (var i = 0; i < 31; i++) {
        img.pushMatrix();
        img.translate(random(width), random(height));
        img.rotate(random(360));
        var numStars = random(100, 400);
        var sdX = random(15, 50);
        var sdY = random(15, 50);
        var clr = color(random(255), 150, 255);
        for (var j = 0; j < numStars; j++) {
            var siz = random(0.1, 1.8);
            img.fill(clr, random(255));
            img.ellipse(gen.x.nextGaussian()*sdX,
                        gen.y.nextGaussian()*sdY,
                        siz, siz + random(-0.7, 0.7));
        }
        img.popMatrix();
    }

    return img.get();
    
})();

var cake = (function() {
    
    var bread = (function() {
        
        //shape of bread
        var msk = createGraphics(width, height, P2D);
        msk.background(0);
        msk.fill(185);
        msk.noStroke();
        msk.translate(62, 206);
        msk.scale(0.6);
        msk.beginShape();
            msk.curveVertex(28, -255);
            msk.curveVertex(0, 0);
            msk.curveVertex(36, 13);
            msk.curveVertex(60, 17);
            msk.curveVertex(97, 3);
            msk.curveVertex(132, 5);
            msk.curveVertex(175, -13);
            msk.curveVertex(215, -9);
            msk.curveVertex(259, -29);
            msk.curveVertex(303, -32);
            msk.curveVertex(347, -53);
            msk.curveVertex(385, -54);
            msk.curveVertex(418, -73);
            msk.curveVertex(413, -22);
            msk.curveVertex(423, 20);
            msk.curveVertex(420, 51);
            msk.curveVertex(389, 53);
            msk.curveVertex(354, 72);
            msk.curveVertex(302, 74);
            msk.curveVertex(257, 92);
            msk.curveVertex(212, 92);
            msk.curveVertex(161, 109);
            msk.curveVertex(101, 110);
            msk.curveVertex(59, 127);
            msk.curveVertex(16, 116);
            msk.curveVertex(9, -8);
            msk.curveVertex(83, 145);
        msk.endShape();
        msk = msk.get();
        
        //spongey yellow cakey cake
        var img = createGraphics(width, height, P2D);
        img.background(250, 225, 63);
        for (var i = 0; i < 200; i++) {
            img.strokeWeight(random(1, 4));
            img.stroke(lerpColor(
                color(255, 132, 0),
                color(245, 164, 3),
                random(1)   
            ));
            img.point(random(img.width), random(img.height));
            img.point(random(img.width), random(img.height));
            img.point(random(img.width), random(img.height));
        }
        
        img = img.get();
        img.mask(msk);
        return img;
        
    })();
    
    var frosting = (function() {
        
        //frosting shape
        var msk = createGraphics(width, height, P2D);
        msk.background(0);
        msk.fill(205);
        msk.stroke(255);
        msk.strokeWeight(10);
        msk.translate(62, 206);
        msk.scale(0.6);
        msk.beginShape();
            msk.curveVertex(28, -255);
            msk.curveVertex(0, 0);
            msk.curveVertex(36, 13);
            msk.curveVertex(60, 17);
            msk.curveVertex(97, 3);
            msk.curveVertex(132, 5);
            msk.curveVertex(175, -13);
            msk.curveVertex(215, -9);
            msk.curveVertex(259, -29);
            msk.curveVertex(303, -32);
            msk.curveVertex(347, -53);
            msk.curveVertex(385, -54);
            msk.curveVertex(418, -73);
            msk.curveVertex(413, -22);
            msk.curveVertex(423, 20);
            msk.curveVertex(420, 51);
            msk.curveVertex(389, 53);
            msk.curveVertex(354, 72);
            msk.curveVertex(302, 74);
            msk.curveVertex(257, 92);
            msk.curveVertex(212, 92);
            msk.curveVertex(161, 109);
            msk.curveVertex(101, 110);
            msk.curveVertex(59, 127);
            msk.curveVertex(18, 127);
            msk.curveVertex(83, 145);
            msk.curveVertex(420, 79);
            msk.curveVertex(442, 27);
            msk.curveVertex(392, -122);
            msk.curveVertex(0, 0);
        msk.endShape();
        
        //top of cake
        msk.translate(249, -133);
        msk.beginShape();
            msk.curveVertex(72, 0);
            msk.curveVertex(0, 0);
            msk.curveVertex(-246, 133);
            msk.curveVertex(172, 31);
            msk.curveVertex(0, 0);
            msk.curveVertex(97, 157);
        msk.endShape();
        
        msk = msk.get();
        
        //frosting gradient star thing
        var img = createGraphics(width, height, P2D);
        img.background(10, 1, 23);
        img.colorMode(HSB);
        img.noStroke();
        //random blue/purple/magenta ellipses
        for (var i = 0; i < 1700; i++) {
            var s = random(20, 100);
            img.fill(random(140, 250), 255, 255, 5);
            img.ellipse(
                random(0, img.width),
                random(0, img.height),
                s, s
            );
        }
        //random stars
        for (i = 0; i < 1000; i++) {
            img.stroke(255, random(50, 200));
            img.strokeWeight(random(1, 4));
            img.point(random(width), random(height));
        }
        
        img = img.get();
        img.mask(msk);
        return img;
        
    })();
    
    var filling = (function() {
        
        //filling mask
        var msk = createGraphics(301, 95, P2D);
        msk.background(0);
        msk.stroke(235);
        msk.fill(210);
        msk.strokeWeight(5);
        msk.translate(24, 62);
        msk.strokeCap(SQUARE);
        msk.beginShape();
            msk.vertex(-1, 5);
            msk.bezierVertex(225, -29, 134, -10, 240, -49);
            msk.vertex(243, -35);
            msk.bezierVertex(200, 1, 36, 1, 1, 20);
        msk.endShape();
        msk = msk.get();
        
        //pink for filling
        var img = createGraphics(301, 95, P2D);
        img.background(171, 2, 64);
        for (var i = 0; i < 400; i++) {
            img.strokeWeight(random(3));
            img.stroke(250, 190, 242, random(150));
            img.point(random(img.width), random(img.height));
        }
        
        img = img.get();
        img.mask(msk);
        return img;
    })();
    
    //draw everything and return the image
    background(0, 0, 0, 0);
    image(bread, width/2, height/2);
    image(frosting, width/2, height/2);
    image(filling, 193, 226);

    return get();
    
})();

draw = function() {
    //draw background
    image(stars, width/2, height/2);
    //draw cake
    pushMatrix();
    translate(width/2, height/2);
    rotate(sin(frameCount*5)*15);
    scale(sin(frameCount)/5+1);
    image(cake, 0, 0);
    popMatrix();
};

//for thumbnail
keyTyped = function() {
    //draw everything
    image(stars, width/2, height/2);
    translate(width/2, height/2);
    scale(1.2);
    image(cake, 0, 0);
    noLoop();
};
