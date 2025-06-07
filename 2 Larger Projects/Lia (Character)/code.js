//For my awesome friend, who created this character
//Space background
(function spaceBackground(){
    
    //random Gaussian - normal distribution
    var genX = new Random(3);
    var genY = new Random(4);
    
    //So that everything is random, but the same every time
    randomSeed(5);
    //use normal distribution to draw a cloud of ellipses
    var cloud = function(clr, centerX, centerY, sze) {
        noStroke();
        for (var i = 0; i < sze*15; i++) {
            //get the next values in the normal distribution
            //centered around (centerX,centerY) and 
            //Multiply values by sze (standard dev)
            var x = genX.nextGaussian()*sze+centerX;
            var y = genY.nextGaussian()*sze+centerY;
            //map clr transparency to how close it is to center
            fill(clr, map(dist(x,y,centerX,centerY), 
                 0, width, 22, 0));
            ellipse(x, y, 35, 35);
        }
    };

    background(11, 2, 48);
    //all the clouds
    cloud(color(28, 0, 71), 400, 400, 204);
    cloud(color(150, 0, 80), 540, 60, 204);
    cloud(color(156, 0, 127), 540, 60, 154);
    cloud(color(36, 0, 82), 50, 500, 104);
    cloud(color(44, 0, 105), 50, 500, 204);
    cloud(color(111, 0, 130), 109, 127, 279);
    cloud(color(90, 0, 138), 139, 147, 110);
    
    //belt of stars
    pushMatrix(); //save curr coordinate system
    translate(370, 320); //translate to center of star belt
    rotate(59); //rotate coordinate grid
    //7500 random stars according to normal distribution
    for (var i = 0; i < 7500; i++) {
        var siz = random(1, 2); //get a random size
        //use random - most stars are within belt
        if (random(1) > 0.15) {
            //because of rotate, the x is height of belt
            //and y is width
            var x = genX.nextGaussian()*40;
            var y = genY.nextGaussian()*450;
            fill(255, random(100, 200));
            //
            //chance of dot for a star
            if (random(1) < 0.8) {
                ellipse(x, y, siz+0.8, siz+0.8);
            } else {
                //star will be a rect with negative radius
                pushMatrix(); //save curr system
                translate(x, y); //translate to star pos
                //rotate back to normal, more or less
                rotate(-60+random(-10, 10));
                //a rectangle with negative radius
                rect(0, 0, 0.1, 0.1, -4);
                popMatrix(); //back to previous coor system
            }
        } else {
            //just put a random star anywhere
            pushMatrix(); //save curr system
            resetMatrix(); //revert to the very original systm
            fill(255, random(200));
            //chance of a dot
            if (random(1) < 0.8) {
                ellipse(random(width), random(height), siz, siz);
            } else {
                //a rect with negative radius
                rect(random(width), random(height), 0.1, 0.1, -4);
            }
            popMatrix(); //go back to previous coordiante system
        }
    }
    popMatrix(); //back to a regular coordinate system
    
})();
//Stars
(function stars() {
    //normal distribution generation thingy 
    var genX = new Random(3);
    var genY = new Random(4);
    //the coordinates, color, and size of each star
    var pts = [
        {x: 50, y: 550, clr: color(247, 209, 17, 12), s: 0.8},
        {x: 520, y: 100, clr: color(245, 199, 17, 15), s: 1.4},
    ];
    //add some mini stars to the points
    var miniStars = [{x: 470, y: 500}, {x: 560, y: 570},
                     {x: 400, y: 580}, {x: 550, y: 390},
                     {x: 340, y: 480}, {x: 250, y: 550}];
    for (var i = 0; i < miniStars.length; i++) {
        //Push the coordinates plus their size and color
        pts.push({x: miniStars[i].x, y: miniStars[i].y, 
                 clr: color(250, 241, 213, 3),
                 s: 0.2 + 0.1*floor(random(4))
        });
    }
    //loop through the points
    for (var i = 0; i < pts.length; i++) {
        noStroke();
        pushMatrix();
        translate(pts[i].x, pts[i].y); //to point pos
        scale(pts[i].s); //scale by the size of the point
        fill(pts[i].clr);
        //rotate by 30 for eack "spoke" of the star
        for (var r = 0; r < 360; r+=30) {
            pushMatrix(); //save curr system
            rotate(r);
            for (var j = 0; j < 500; j++) {
                //get the next x value, mult by 32
                var x = genX.nextGaussian()*32;
                //pick between ellipse or rect
                if (random(1) < 0.6) {
                    //a wide, short ellipse
                    ellipse(x, 0, 1, random(20));
                } else {
                    //a rect with negative radius
                    rect(x, 0, 0.1, 0.1, -5);
                }
            }
            popMatrix(); //back to previous coordinate system
        }
        popMatrix();
    }
})();
//Lia
(function lia(x, y) {
    
    //warning! - this code contains hazardous levels of laziness
    
    pushMatrix();
    translate(x, y); //translate to her position
    
    //arms {
    
    var outlineClr = color(32, 28, 38);
    //a function to draw an arm, pass pos, angle and scale for x
    function arm(x, y, sclX, rot) {
        pushMatrix();
        translate(x, y); //translate to pos
        scale(sclX, 1);
        rotate(rot);
        //hands coloring
        pushMatrix();
        translate(73, 34); //translate to hand pos, x+73, y+34
        rotate(73); //rotate a little
        noStroke();
        //some coloring
        fill(92, 99, 112);
        rect(0, 0, 9, 17);
        popMatrix();
        //outlines
        //arm
        noFill(); 
        strokeWeight(5.4);
        stroke(outlineClr);
        beginShape();
        vertex(0, 0);
        bezierVertex(46, 57, 52, 39, 57, 42);
        endShape();
        //right hand outline
        beginShape();
        vertex(48, 42);
        bezierVertex(86, 55, 86, 23, 53, 41);
        endShape();
        popMatrix();
    }
    arm(14, 75, 1, 4); //right
    arm(-13, 67, -1, -39); //left 

    //}
    
    //legs {
    //function to draw a leg, pass in pos and angle
    function leg(x, y, rot) {
        strokeWeight(5.6);
        stroke(outlineClr);
        pushMatrix();
        translate(x, y); //translate to pos
        rotate(rot); //rotate by angle
        //draw 
        beginShape();
            vertex(0, 0);
            bezierVertex(9, 91, 8, 61, -31, 126);
            vertex(-31, 126);
            bezierVertex(-34, 131, -31, 137, -26, 145);
        endShape();
        popMatrix();
    }
    leg(-8, 110, 1); //right
    leg(-12, 103, 19); //left
    //}
    
    //dress skirt {
    rectMode(CENTER); //pos rect by center
    noStroke();
    //create mask {
    var w = 183, h = 80; //width and height of imgs
    var msk = createGraphics(w, h, P2D);
    msk.background(0);
    //draw a skirt
    msk.pushMatrix();
        msk.translate(82, 63);
        msk.scale(1.79);
        msk.fill(255);
        msk.beginShape(); 
            msk.curveVertex(0, 0);
            msk.curveVertex(-37, -18);
            msk.curveVertex(-44, -23);
            msk.curveVertex(-33, -25);
            msk.curveVertex(1, -30);
            msk.curveVertex(20, -25);
            msk.curveVertex(46, -2);
            msk.curveVertex(51, 5);
            msk.curveVertex(45, 5);
            msk.curveVertex(0, 0);
            msk.curveVertex(-37, -18);
            msk.curveVertex(-44, -23); 
        msk.endShape();
    msk.popMatrix();
    msk = msk.get(); //capture the image
    //create a fabric texture
    var skirt = createGraphics(w, h, P2D);
    skirt.background(242, 0, 129);
    skirt.noStroke();
    //some blue translucent ellipses
    skirt.fill(71, 0, 186, 20); 
    for (var i = 0; i < 210; i++) {
        skirt.ellipse(random(skirt.width), random(skirt.height), 
                      29, 29);
    }
    //shadow
    skirt.translate(70, 56);
    skirt.scale(1.5);
    skirt.fill(0, 100);
    skirt.beginShape(); 
        skirt.curveVertex(0, 0);
        skirt.curveVertex(-25, -19);
        skirt.curveVertex(-176, 37);
        skirt.curveVertex(-25, -38);
        skirt.curveVertex(19, -31);
        skirt.curveVertex(14, -50);
    skirt.endShape();
    skirt = skirt.get(); //capture the img
    skirt.mask(msk); //mask white skirt with texture
    //}
    
    pushMatrix();
    translate(0, 79);
    rotate(20);
    fill(59, 57, 87);
    rect(0, 0, 13, 18);
    fill(83, 88, 122);
    rect(0, 7, 13, 3);
    popMatrix();
    
    //draw the skirt
    pushMatrix();
    translate(-103, 68);
    rotate(4);
    image(skirt, 0, 0);
    popMatrix();
    
    //}
    
    //dress top {
    
    //top 
    pushMatrix();
    translate(-4, 80); //translate to top pos
    rotate(3); //rotate a little
    scale(0.85); //make everything a teensy bit smaller
    //a function to draw a part of her top
    //pass in pos, clr and size
    function drawTop(x, y, clr, scl) {
        pushMatrix();
        translate(x, y); //translate to pos
        scale(scl); //resize
        fill(clr);
        //draw the shape
        beginShape(); 
            curveVertex(0, 0);
            curveVertex(-37, -18);
            curveVertex(-44, -23);
            curveVertex(-33, -25);
            curveVertex(1, -30);
            curveVertex(20, -25);
            curveVertex(46, -2);
            curveVertex(51, 5);
            curveVertex(45, 5);
            curveVertex(0, 0);
            curveVertex(-37, -18);
            curveVertex(-44, -23); 
        endShape();
        popMatrix();
    } 
    //draw the top of her dress
    drawTop(0, 0, color(214,2,112), 0.8); //magenta
    drawTop(2, -4, color(107,29,140), 0.67); //purple
    drawTop(7, -15, color(0,56,168), 0.35); //blue
    //shadow of top
    scale(0.8); //make it a teensy bit smaller again
    fill(0, 80); //a translucent black color for shadow
    //draw the shadow
    beginShape(); 
        curveVertex(0, 0);
        curveVertex(-31, -17);
        curveVertex(-44, -23);
        curveVertex(-20, -29);
        curveVertex(16, -30);
        curveVertex(69, -25);
    endShape();
    popMatrix();
    
    //}
    
    //head {
    //since the head, outer eye, and inner eye are the same shape
    //function, pass in pos, siz, and clr
    var thingy = function(x, y, scl, clr) {
        pushMatrix();
        translate(x, y); //translate to pos
        scale(scl); //resize by scl
        fill(clr);
        //draw the head shape
        beginShape();
            curveVertex(0, 0); 
            curveVertex(69, 0); 
            curveVertex(92, 56); 
            curveVertex(48, 93); 
            curveVertex(-8, 65); 
            curveVertex(0, 0); 
            curveVertex(69, 0); 
            curveVertex(93, 56);
        endShape();
        popMatrix();
    };
    
    //neck
    pushMatrix();
    fill(46, 44, 71);
    translate(10, 63); //translate to pos
    rotate(-2); //rotate a teensy bit
    scale(0.21, 0.27);
    //draw the main part
    beginShape();
        curveVertex(0, 0);
        curveVertex(32, 0);
        curveVertex(43, 6);
        curveVertex(48, -1);
        curveVertex(36, -26);
        curveVertex(14, -35);
        curveVertex(-16, -43);
        curveVertex(-54, -30);
        curveVertex(-40, -26);
        curveVertex(-18, -16);
        curveVertex(0, 0);
        curveVertex(44, 10);
        curveVertex(59, 10);
    endShape();
    //lighter collar thingy?
    stroke(68,79,101);
    strokeWeight(13);
    beginShape();
        curveVertex(-28, -32);
        curveVertex(-48, -28);
        curveVertex(3, -2);
        curveVertex(44, 6);
        curveVertex(62, 2);
    endShape();
    popMatrix();
    
    //head / eye
    noStroke();
    thingy(-5, -5, 0.66, color(61, 54, 74));//shadow
    thingy(-1, 0, 0.62, color(121, 129, 143)); //head
    thingy(9, 9, 0.47, color(29, 33, 41)); //outer eye
    thingy(16, 16, 0.35, color(27, 48, 92)); //blue inner
    
    //eye pupil
    pushMatrix();
    translate(32, 36); //translate to pos
    rotate(6); //rotate a little
    scale(2.1); //make a little bigger
    stroke(0);
    strokeWeight(5);
    line(0, 0, 2, -3); //right
    line(0, 0, -2, -3); //left
    popMatrix();
    
    //eye shine
    noStroke();
    fill(255, 7);
    for (var i = 0; i < 17; i+=0.5) {
        ellipse(41, 25, i, i); //draw ellipse w/ size i
    }
    //}
   
    popMatrix();
    
})(159, 57);