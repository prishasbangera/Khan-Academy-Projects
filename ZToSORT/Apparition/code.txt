/***********************************************

   Apparition
   Prisha B.
 
   2021
   
   Referenced from https://wallhere.com/en/wallpaper/1658303.

************************************************/

var p = createGraphics(600, 400, JAVA2D);
var person = {
    x: p.width/2+15, 
    y: p.height-108,
    w: 100,
    h: 150
};
var curr = 0;

// functions to draw the person, pass in instance
function drawPersonFront(p) {
    p.beginShape();
        // head  
        p.curveVertex(0, 0);
        p.curveVertex(40, 10);
        p.curveVertex(46, 13);
        p.curveVertex(48, 19);
        p.curveVertex(48, 28);
        // neck and shoulder
        p.curveVertex(50, 34);
        p.curveVertex(53, 35);
        // elbow
        p.curveVertex(60, 40);
        p.curveVertex(71, 43);
        p.curveVertex(80, 45);
        // tip of arm on left
        p.curveVertex(90, 50);
        p.curveVertex(87, 50.5);
        p.curveVertex(79, 48);
        p.curveVertex(78, 49);
        p.curveVertex(76, 54);
        p.curveVertex(76, 55);
        p.curveVertex(70, 59);
        // right side body
        p.curveVertex(50, 40);
        p.curveVertex(48, 59);
        // hem of dress start right
        p.curveVertex(94, 81);
        p.curveVertex(80, 87);
        p.curveVertex(69, 98);
        p.curveVertex(52, 101);
        p.curveVertex(40, 106);
        p.curveVertex(29, 104);
        // hem dress end left
        p.curveVertex(9, 102);
        // left side body
        p.curveVertex(28, 61);
        p.curveVertex(29, 41);
        // arm on left
        p.curveVertex(17, 44);
        p.curveVertex(7, 47);
        p.curveVertex(10, 37);
        p.curveVertex(5, 35);
        p.curveVertex(10, 34);
        p.curveVertex(20, 37);
        // shoulder to head
        p.curveVertex(28, 32);
        p.curveVertex(33, 30);
        p.curveVertex(34, 13);
        p.curveVertex(40, 10);
        p.curveVertex(0, 0);
    p.endShape();
}
function drawPersonBack(p) {
    p.beginShape();
        p.curveVertex(0, 0);
        // left hem dress start
        p.curveVertex(12, 96);
        // legs
        p.curveVertex(33, 107);
        p.curveVertex(36, 139);
        p.curveVertex(34, 147);
        p.curveVertex(38, 145);
        p.curveVertex(40, 142);
        p.curveVertex(47, 104);
        p.curveVertex(44, 104);
    p.endShape();
    // skirt
    p.beginShape();
        p.curveVertex(0, 0);
        // left hem dress start
        p.curveVertex(17, 90);
        p.curveVertex(15, 107);
        p.curveVertex(64, 107);
        p.curveVertex(95, 82);
        p.curveVertex(52, 80);
        p.curveVertex(0, 0);
    p.endShape();
}

var pieces = [
    // setup and backdrop
    function() {
        imageMode(CENTER);
        enableContextMenu();
        p.imageMode(CENTER);
        p.rectMode(CENTER);
        p.angleMode = "degrees";
        // background
        p.background(0, 9, 112);
        p.strokeWeight(2);
        for (var i = 0; i <= p.height; i+=2) {
            p.stroke(
                color(0, 104, 189),
                i/p.height*255   
            );
            p.line(0, i, p.width, i);
        }
        // gradient light back
        for (var y = 0; y <= p.height; y++) {
            p.stroke(
                color(0, 247, 255), 
                y/p.height*135
            );
            p.line(0, y, p.width, y);    
        }
        // random stars
        randomSeed(121);
        var genY = new Random(202);
        for (i = 0; i < 500; i++) {
            p.strokeWeight(random(2));
            p.stroke(255, random(100));
            p.point(random(p.width), genY.nextGaussian()*20);
            p.point(random(p.width), genY.nextGaussian()*70);
            p.point(random(p.width), random(p.height));
        }
    },
    // backdrop belt of stars
    function() {
        var freq = 2.7;
        p.noStroke();
        // belt
        for (var y = 0; y < p.height*0.85; y++) {
            var w = (p.height-y)*0.95;
            var a = sin(y*freq)*15;
            p.pushMatrix();
            p.translate(p.width/2, y);
            // inner band
            p.fill(255, 80);
            p.ellipse(a, 0, w*0.25, 2);
            // middle
            p.fill(0, 238, 255, 50);
            p.ellipse(a, 0, w*0.55, 2);
            // outer
            p.fill(0, 94, 255, 7);
            for (var n = w-50, add=0; n<=w; n+=add, add+=0.3) {
                p.ellipse(a, 0, n, 2);
            }
            p.popMatrix();
        }
        // stars
        var genX = new Random(33);
        randomSeed(22);
        for (var y=-10; y<p.height*0.85; y+=random(0.1, 0.5)) {
            // size, position, color
            var s = random(2, map(y, 0, p.height*0.85, 14, 3));
            var xPos = p.width/2 + sin(y*freq)*10 + 
                       genX.nextGaussian()*
                       map(y, 0, p.height*0.85, 40, 2) ;
            var yPos = random(-10, 10) + y;
            var a = random(3, map(s, 1, 25, 15, 4));
            var clr = lerpColor(
                color(112, 253, 255),
                color(0, 196, 255),
                random(1)
            );
            // star
            for (var n = s; n >= 0; n-=0.5) {
                p.fill(lerpColor(
                    color(191, 241, 255), clr,
                    map(n, 0, s, 0, 1)
                ), a);
                p.ellipse(xPos, yPos, n, n);
            }
            // white dot
            if (s > 5) {
                p.fill(255, random(40, 70));
                p.ellipse(xPos, yPos, s*0.3, s*0.3);
            }
        }
    },
    // backdrop circle clouds
    function() {
        randomSeed(2);
        var genY = new Random(64);
        p.noStroke();
        for (var i = 0; i < 300; i++) {
            var s = random(85);
            var x = random(-p.width*0.05, p.width*1.05);
            var y = genY.nextGaussian()*60 + 230;
            if (y-s < 330) {
                p.fill(
                    lerpColor(color(0, 51, 255), 
                              color(196, 252, 255), 
                              map(y, 0, p.height, 0, 1)),
                    map(abs(x-p.width/2), 0, p.width/2, 4, 9)
                );
                for (var j=s*0.2, add=0; j<s; j+=add, add+=0.05) {
                    p.ellipse(x, y, j, j);
                }
            }
        }
    },
    // middle circle clouds/stars
    function() {
        var genX = new Random(213);
        var genY = new Random(49);
        var genS = new Random(41);
        p.noStroke();
        p.pushMatrix();
        p.translate(person.x-30, person.y-30);
        //orbs
        for (var i = 0; i < 100; i++) {
            var x = genX.nextGaussian()*220;
            var y = genY.nextGaussian()*50;
            var s = genS.nextGaussian()*5 + 20;
            p.fill(117, 230, 255, 3);
            for (var j = s*1.7; j >= 0; j--) {
                p.ellipse(x, y, j, j);
            }
            for (j = s; j >= 0; j--) {
                p.fill(lerpColor(
                    color(176, 255, 237),
                    color(0, 187, 255),
                    map(j, 0, s, 0, 1)
                ), map(j, 0, s, 118, 5));
                p.ellipse(x, y, j, j);
            }
        }
        // some cyan light around her for contrast
        p.fill(51, 241, 255, 5);
        for (var i = 0; i < 20; i++) {
            var x = genX.nextGaussian()*35;
            var y = genY.nextGaussian()*21;
            var s = genS.nextGaussian()*10 + 55;
            for (var j = 0; j < s; j++) {
                p.ellipse(x, y, j, j);
            }
        }
        p.popMatrix();
        // backdrop smaller stars front
        randomSeed(10);
        for (var i = 0; i < 1000; i++) {
            var s = random(7);
            var x = random(-p.width*0.05, p.width*1.05);
            var y = genY.nextGaussian()*95 + 290;
            if (y-s < 330) {
                // larger
                p.stroke(lerpColor(
                    color(0, 225, 255), 
                    color(249, 252, 252), 
                    map(y, 0, p.height, 0, 1)
                ), 60);
                p.strokeWeight(s);
                p.point(x, y);
                // smaller
                var n = map(y, 0, p.height, 0.2, 1);
                p.strokeWeight(s*0.5+random(n));
                p.stroke(255, random(n)*255);
                p.point(x, y);
                
            }
        }
    },
    // ground and gradients
    function() {
        // ground with radial gradient
        var ground = createGraphics(p.width, 70, JAVA2D);
        ground.background(10, 46, 100);
        ground.noStroke();
        for (var i = 1, add=0; i < 180; i+=add, add+=0.08) {
            ground.fill(0, 90, 245, 80*15/i);
            ground.ellipse(ground.width/2, 15, 
                           ground.width*0.9+i*2, i*0.7);
        }
        // circle gradient she's standing on
        var m = 195;
        ground.fill(5, 176, 255, 4);
        for (var i = 80, add = 0; i < m; i+=add, add+=0.1) {
            ground.ellipse(ground.width/2, 
                           ground.height/2+4, 
                           i + 200, i);
        }
        // ground tiny dots radial grads
        var genY = new Random(48);
        randomSeed(16);
        for (i = 0; i < 700; i++) {
            var s = random(1, 6),
                x = random(ground.width),
                y = genY.nextGaussian()*ground.height*0.3;
            ground.fill(0, 247, 255, 20);
            // main grad
            for (var d = random(5); d > 0; d--) {
                ground.ellipse(x, y, d+s, d);
            }
            // white dot
            if (y < 40 && s > 2) {
                ground.fill(217, 255, 255, 115);
                ground.ellipse(x, y, s*0.75, s*0.4);
            }
        }
        // gradient top of ground
        ground.stroke(176, 244, 255, 1);
        for (i = 0, add = 0; i < 70; i+=add, add+=0.03) {
            ground.strokeWeight(i);
            ground.line(0, 0, ground.width, 0);
        }
        // draw ground
        p.image(ground, p.width/2, p.height-ground.height/2);
        // gradient light front
        p.stroke(166, 249, 255, 4);
        for (var s = 1, add=0; s <= 100; s+=add, add+=0.05) {
            p.strokeWeight(s);
            var y = p.height-ground.height-s/3;
            p.line(0, y, p.width, y);
        }
        // reflection of person, part 1
        p.pushMatrix();
        p.fill(34, 39, 117);
        p.translate(p.width/2-person.w/2+13, p.height+44);
        p.scale(1, -0.5);
        drawPersonBack(p);
        drawPersonFront(p);
        p.popMatrix();
    },
    // magic circle on the ground
    function() {
        // create mask
        var msk = createGraphics(305, 70, JAVA2D);
        msk.angleMode = "degrees";
        msk.background(0);
        msk.translate(msk.width/2, msk.height/2);
        msk.scale(1, 0.25); // squish
        // outer circles
        msk.noFill();
        msk.stroke(255);
        msk.strokeWeight(4);
        msk.ellipse(0, 0, 250, 250);
        msk.strokeWeight(8);
        msk.ellipse(0, 0, 220, 220);
        // decorations
        var n = 75;
        msk.strokeWeight(0.6);
        msk.beginShape();
        for (var i = 0; i <= 360; i+=120) {
            // triangle
            var a = i + 30;
            msk.vertex(cos(a)*n, sin(a)*n);
        }
        msk.endShape();
        msk.noFill();
        msk.rectMode(CENTER);
        randomSeed(8);
        for (var a = 0; a <= 360; a+=24) {
            msk.pushMatrix();
            msk.rotate(a+2);
            // spokes
            msk.strokeWeight(0.3);
            msk.line(0, 0, n, n);
            // square characters outer circle
            msk.strokeWeight(2);
            msk.pushMatrix();
            msk.translate(120, 0);
            msk.rect(0, 0, random(5, 20), random(5, 20));
            msk.popMatrix();
            msk.rotate(a*1.5+random(-10, 10));
            msk.translate(100, 0);
            msk.rect(0, 0, random(5, 20), random(5, 20));
            msk.popMatrix();
        }
        // middle circles
        msk.pushStyle();
        msk.stroke(125);
        msk.strokeWeight(17);
        msk.ellipse(0, 0, 180, 180);
        msk.strokeWeight(7);
        msk.ellipse(0, 0, 150, 150);
        msk.strokeWeight(3);
        msk.ellipse(0, 0, 65, 65);
        msk.popStyle();
        msk.strokeWeight(4);
        msk.ellipse(0, 0, 180, 180);
        // random circles
        randomSeed(46); //46
        for (a = 0; a < 360; a+=36) {
            // outside
            msk.pushMatrix();
            msk.rotate(a + random(-70, 70));
            msk.translate(110, 0);
            msk.strokeWeight(random(4));
            var s = random(10, 90);
            msk.ellipse(0, 0, s, s);
            msk.popMatrix();
            // inside
            if (a % (36*2) === 0) {
                msk.pushMatrix();
                msk.rotate(a*1.5);
                msk.translate(random(40, 60), 0);
                msk.strokeWeight(random(2));
                var s = random(10, 50);
                msk.ellipse(0, 0, s, s);
                msk.popMatrix();
            }
        }
        // mask the mask
        msk.stroke(0);
        msk.strokeWeight(26);
        msk.ellipse(0, 0, 281, 281);
        msk = msk.get();
        // create gradient that will be masked
        var img = createGraphics(msk.width, msk.height, JAVA2D);
        img.background(110, 226, 255);
        // rad grad
        img.fill(168, 255, 255, 12);
        img.noStroke();
        for (var i = 0; i < 85; i++) {
            img.ellipse(120, 20, i+150, i);
        }
        // reflection of person, part 2
        img.pushMatrix();
        img.fill(49, 124, 181);
        img.translate(img.width/2-person.w/2+14, 109);
        img.scale(1, -0.5);
        drawPersonBack(img);
        drawPersonFront(img);
        img.popMatrix();
        // mask and draw to main
        img = img.get();
        img.mask(msk);
        p.pushMatrix();
        p.translate(p.width/2, p.height-msk.height/2+4);
        p.image(img, 0, 0);
        // shiny things on the circle
        var shiny = createGraphics(msk.width, msk.height, JAVA2D);
        shiny.background(0, 0);
        msk.loadPixels();
        var pixels = msk.imageData.data;
        shiny.fill(255, 50);
        shiny.noStroke();
        for (var j = 0; j < 300; j++) {
            var x = ~~random(msk.width*0.75);
            var y = ~~random(msk.height*0.75);
            var i = (x+y*msk.width) * 4;
            if (pixels[i] === 255) {
                for (var s = random(2, 6); s >= 0; s--) {
                    shiny.ellipse(x, y, s+1, s);
                }
            }
        }
        p.image(shiny, 0, 0);
        p.popMatrix();
    },
    // smaller magic circles
    function() {
        // mask
        var msk = createGraphics(100, 100, JAVA2D);
        msk.background(0);
        msk.angleMode = "degrees";
        // transform
        msk.translate(msk.width/2, msk.height/2);
        // marks on outer circle
        randomSeed(5);
        msk.strokeWeight(2);
        msk.stroke(205);
        for (var a = 0; a <= 360; a+=6) {
            msk.pushMatrix();
            msk.rotate(a);
            var s = random(40, 42);
            msk.line(45, 0, s, 0);
            msk.popMatrix();
        }
        // outer circle
        msk.stroke(225);
        msk.noFill();
        msk.strokeWeight(4);
        msk.ellipse(0, 0, 90, 90);
        // inner circle
        msk.strokeWeight(2.5);
        msk.translate(0, 5);
        msk.ellipse(0, 0, 70, 70);
        // spokes
        msk.stroke(90);
        msk.strokeWeight(1);
        for (var a = 0; a <= 360; a+=19.9) {
            msk.line(0, 0, cos(a)*35, sin(a)*35);
        }
        msk = msk.get();
        // create gradient
        var grad = createGraphics(msk.width, msk.height, JAVA2D);
        grad.background(102, 214, 255);
        grad.noStroke();
        grad.fill(212, 254, 255, 6);
        for (var i = 0; i < 100; i++) {
            grad.ellipse(grad.width/2, 30, i+50, i);
        }
        // capture and mask
        grad = grad.get();
        grad.mask(msk);
        //draw to main
        var a = 60, sclY = 0.45;
        // larger
        p.pushMatrix();
        p.translate(383, 252);
        p.rotate(a);
        p.scale(1, sclY);
        p.image(grad, 0, 0, grad.width*1.3, grad.height*1.3);
        p.popMatrix();
        // smaller
        p.pushMatrix();
        p.translate(361, 263);
        p.rotate(a);
        p.scale(1, sclY);
        p.image(grad, 0, 0);
        p.popMatrix();
    },
    // larger magic circles
    function() {
        // create mask
        var diameters = [50, 80, 110, 140];
        var msk = createGraphics(150, 150, JAVA2D);
        msk.background(0);
        msk.translate(msk.width/2, msk.height/2);
        msk.noFill();
        msk.angleMode = "degrees";
        // msk rects to look like symbols
        randomSeed(15);
        msk.rectMode(CENTER);
        msk.strokeWeight(2);
        msk.stroke(170);
        for (var a = 0; a < 360; a+=10) {
            msk.pushMatrix();
            msk.rotate(a);
            msk.rect(62, 0, random(9, 15), random(5, 10));
            if (a % 20 === 0) {
                msk.rect(20, 0, 6, random(2, 10));
            }
            msk.popMatrix();
        }
        // larger circle
        msk.stroke(195);
        msk.strokeWeight(6);
        msk.ellipse(0, 0, diameters[3], diameters[3]);
        // larger circle inner
        msk.strokeWeight(3);
        msk.ellipse(0, 0, diameters[2], diameters[2]);
        msk.stroke(255);
        msk.strokeWeight(2);
        msk.ellipse(0, 0, diameters[3], diameters[3]);
        for (var a = 0; a < 360; a+=5) {
            msk.pushMatrix();
            msk.rotate(a);
            // middle circle markings
            msk.stroke(120);
            msk.line(diameters[1]/2, 0, random(43, 45), 0);
            // spokes
            if (a % 25 === 0) {
                msk.stroke(50);
                msk.line(0, 0, diameters[1]/2, 0);
            }
            msk.popMatrix();
        }
        // medium circle
        msk.strokeWeight(5);
        msk.stroke(150);
        msk.ellipse(0, 0, diameters[1], diameters[1]);
        msk.strokeWeight(1);
        msk.stroke(255);
        msk.ellipse(0, 0, diameters[1], diameters[1]);
        // smaller circle
        msk.strokeWeight(3);
        msk.stroke(150);
        msk.ellipse(0, 0, diameters[0], diameters[0]);
        // random circles
        randomSeed(218);
        msk.stroke(200);
        for (var i = 0; i < 6; i++) {
            // pick a random distance
            var d = diameters[floor(random(diameters.length))];
            d -= d/2 + 6;
            var s = random(10, 42);
            msk.pushMatrix();
            msk.rotate(i * 60);
            msk.ellipse(d, 0, s, s);
            msk.popMatrix();
        }
        // mask the mask
        msk.stroke(0);
        msk.ellipse(0, 0, 150, 150);
        // create grad
        var grad = createGraphics(msk.width, msk.height, 
                                  JAVA2D);
        grad.background(120, 219, 255);
        grad.fill(199, 255, 255, 8);
        grad.noStroke();
        for (var i = 0; i < 180; i++) {
            grad.ellipse(grad.width/2, 20, i, i+20);
        }
        // capture and mask
        grad = grad.get();
        grad.mask(msk.get());
        // draw to main
        var a = -47, sclY = 0.3;
        // larger
        p.pushMatrix();
        p.translate(234, 226);
        p.rotate(a);
        p.scale(1, sclY);
        p.image(grad, 0, 0, grad.width*1.5, grad.height*1.5);
        p.popMatrix();
        // smaller 
        p.pushMatrix();
        p.translate(258, 247);
        p.rotate(a);
        p.scale(-1, sclY);
        p.image(grad, 0, 0);
        p.popMatrix();
    },
    // person back
    function() {
        // person outline
        p.noStroke();
        p.fill(171, 255, 251);
        p.pushMatrix();
        p.translate(person.x-person.w/2-1.5, 
                    person.y-person.h/2-0.5);
        drawPersonBack(p);
        drawPersonFront(p);
        p.popMatrix();
        // create masks back
        var msk = createGraphics(person.w, person.h, JAVA2D);
        msk.background(0);
        msk.fill(255);
        msk.noStroke();
        drawPersonBack(msk);
        var back = msk.get();
        // create grad for back (skirt and legs)
        var backGrad = createGraphics(
            msk.width, msk.height, JAVA2D
        );
        backGrad.background(0, 42, 110);
        backGrad.strokeWeight(2);
        var yMin = backGrad.height*0.61+1;
        for (var y = yMin; y <= backGrad.height+1; y+=2) {
            backGrad.stroke(lerpColor(
                color(0, 23, 92),
                color(145, 185, 230),
                map(y, yMin, backGrad.height, 0, 1)
            ));
            backGrad.line(35+(y-backGrad.height)*0.03, y, 
                          43-(y-backGrad.height)*0.03, y);
        }
        randomSeed(23);
        // stars
        for (var i = 0; i < 300; i++) {
            backGrad.strokeWeight(random(0.9, 1.2));
            backGrad.stroke(255, random(125));
            backGrad.point(
                random(person.w*0.3, person.w*0.6), 
                person.h-random(random(37))
            );
        }
        // mask
        backGrad = backGrad.get();
        backGrad.mask(back);
        // draw part 1 of the person
        p.image(backGrad, person.x, person.y);
    },
    // person front
    function() {
        // create mask for front
        var msk = createGraphics(person.w, person.h, JAVA2D);
        msk.background(0);
        msk.fill(255);
        msk.noStroke();
        drawPersonFront(msk);
        var front = msk.get();// create grad for front (top)
        var frontGrad = createGraphics(
            msk.width, msk.height, JAVA2D
        );
        frontGrad.noStroke();
        frontGrad.background(36, 101, 214);
        var maxS = 100;
        frontGrad.fill(5, 27, 69, 55);
        for (var r = 0, add = 0; r <= 150; r+=add, add+=0.5) {
            frontGrad.ellipse(23, 50, r, r);
        }
        frontGrad.filter(BLUR, 2);
        // hair
        frontGrad.pushMatrix();
        frontGrad.translate(39, 20);
        frontGrad.rotate(-PI/7);
        frontGrad.fill(23, 11, 41, 70);
        frontGrad.ellipse(0, 0, 20, 36);
        frontGrad.popMatrix();
        // mask
        frontGrad = frontGrad.get();
        frontGrad.mask(front);
        // draw part 2 of the person
        p.image(frontGrad, person.x, person.y);
        // overwrite p -> processing instance to image
        p = p.get();
    }
];

function draw() {
    if (pieces[curr]) {
        pieces[curr]();
        curr++;
    } else {
        background(0);
        image(p, width/2, height/2, width, width*2/3);
        noLoop();
    }
}