/*

Prisha B.
Visual Arts 2020

IN NOCTEM - from the Harry Potter movies
Carry my soul into the night
May the stars guide my way.
I glory in the sight
As darkness takes the day.
Ferte in noctem animam meam
Illustre stelle viam meam.
Aspectu illo glorior
Dumb capit nox diem.
Cantate vitae canticum
Sine dolore acte
Dicite eis quos amabam
Numquam obliviscar
Sing a song, a song of life
Lived without regret
Tell the ones, the ones I loved
I never will forget
Never will forget.

*/

//restart to get something different

var setting = (function(centerX, centerY) {
    
    imageMode(CENTER);
    var randRange = 17;
    var d, r, i, add;
    
    //a function for a radial gradient
    function radialGrad(x, y, clr1, clr2) {
        noStroke();
        for (var d = width*2.5; d > width; d-=10) {
            fill(lerpColor(clr1, clr2, d/(width*2.5)));
            ellipse(x, y, d, d);
        }
    }

    pushMatrix();
    translate(centerX, centerY); //changing the position is fun
    
    //the mask for the buildings - negative space
    var buildingsMsk = (function() {
        fill(0);
        for (r = 0; r <= 360; r+=20) {
            for (i = 0; i < 500; i++) {
                //draw black arcs everywhere
                //buildings are the spaces in between
                pushMatrix();
                rotate(r+5);
                arc(0, 0, random(width*1.5), random(height*0.4),
                    random(-randRange, randRange),
                    random(-randRange, randRange));
                popMatrix();
            }
        }
        //capture the image for mask
        return get();
    })();
    
    //what will be masked
    var img = (function() {
        //The radial gradient for buildings
        radialGrad(0, 0, color(0, 15, 84), color(0, 0, 0));
        //a bunch of random lines
        strokeWeight(11);
        stroke(255, 1);
        for (i = 0; i < 900; i++) {
            line(random(-width, width), 
                 random(-height, height), 
                 random(-width, width), 
                 random(-height, height));
        }
        //capture image
        var temp = get();
        //mask it
        temp.mask(buildingsMsk);
        //return image
        return temp;
    })();
    
    //draw background radial gradient
    radialGrad(0, 0, color(46, 0, 69), color(10, 0, 3));
    
    //moon
    scale(5); //make a little bigger
    //a bunch of ellipses
    for (d = 0, add = 0; d < width*0.5; d+=add, add+=1) {
        var siz = random(5, 30);
        fill(255, random(-2, 2) + map(d, 0, width*0.5, 1, 2));
        for (r = 0; r < 360; r+=3) {
            pushMatrix();
            rotate(r);
            ellipse(d+add, 0, siz*random(-siz/6, siz/5), siz);
            popMatrix();
        }
    }

    popMatrix(); //undo transformations
    
    //random stars
    for (i = 0; i < 1000; i++) {
        strokeWeight(random(2));
        stroke(255, random(50, 200));
        point(random(width), random(height));
    }
    
    //building image
    image(img, width/2, height/2);
    
})(400, 200);

var person = (function(centerX, centerY) {

    var r, i, randRange = 17;
    
    pushMatrix();
    translate(centerX, centerY);
    
    //light
    function _arc(clr) {
        noStroke();
        fill(clr, 4);
        arc(0, 0, random(width*2.1), random(height*1.1),
            random(-randRange, randRange),
            random(-randRange, randRange));
    }
    //a bunch of random arcs for light
    for (r = 0; r <= 360; r+=30) {
        for (i = 0; i < 150; i++) {
            pushMatrix();
            rotate(r-15);
            _arc(color(38, 0, 59));
            rotate(16);
            _arc(color(214, 0, 150));
            _arc(color(255, 224, 153));
            popMatrix();
        }
    }
    
    //create person mask
    var msk = (function() {
        var img = createGraphics(150, 150, P2D);
        img.background(0);
        img.noStroke();
        img.translate(74, 80);
        img.fill(255);
        //person
        img.beginShape();
            img.curveVertex(-19, -59);
            img.curveVertex(4, -49);
            img.curveVertex(4, -36);
            img.curveVertex(12, -33);
            img.curveVertex(22, -25);
            img.curveVertex(33, -22);
            img.curveVertex(38, -23);
            img.curveVertex(47, -20);
            img.curveVertex(37, -18);
            img.curveVertex(19, -21);
            img.curveVertex(9, -24);
            img.curveVertex(8, 1);
            img.curveVertex(-6, 25);
            img.curveVertex(-29, 57);
            img.curveVertex(-28, 48);
            img.curveVertex(-24, 44);
            img.curveVertex(-12, 21);
            img.curveVertex(-30, 36);
            img.curveVertex(-43, 49);
            img.curveVertex(-41, 41);
            img.curveVertex(-37, 38);
            img.curveVertex(-17, 15);
            img.curveVertex(-6, -6);
            img.curveVertex(-10, -19);
            img.curveVertex(-8, -25);
            img.curveVertex(-22, -20);
            img.curveVertex(-37, -18);
            img.curveVertex(-45, -17);
            img.curveVertex(-39, -21);
            img.curveVertex(-23, -25);
            img.curveVertex(-5, -35);
            img.curveVertex(-11, -42);
            img.curveVertex(-7, -54);
            img.curveVertex(4, -49);
        img.endShape(CLOSE);
        //hair
        img.beginShape();
        img.vertex(-9, -52);
        img.bezierVertex(-31, -27, -10, -9, -38, 15);
        img.bezierVertex(24, -17, -19, -31, 2, -44);
        img.endShape(CLOSE);
        //capture and return image
        return img.get();
    })();
    
    //what will be masked
    var person = (function() {
        //some variables
        var clr1 = color(47, 0, 71);
        var clr2 = color(0, 0, 0);
        var img = createGraphics(150, 150, P2D);
        var s;
        //radial gradient
        img.translate(img.width/2, img.height*0.41);
        img.noStroke();
        for (r = img.width*1.2; r > 0; r--) {
            img.fill(lerpColor(clr1, clr2, r/(img.width*1.2)));
            img.ellipse(0, 0, r, r);
        }
        //random ellipses for spirally thingy
        img.translate(0, -5);
        img.fill(114, 0, 143, 25);
        for (i = 0; i < 500; i++) {
            img.pushMatrix();
            img.rotate(random(360));
            img.translate(random(img.width*0.8), 0);
            img.rotate(15);
            img.ellipse(0, 0, 3, 13);
            img.popMatrix();
        }
        //capture image
        img = img.get();
        //mask it and return it
        img.mask(msk);
        return img;
    })();
    
    //draw the image
    image(person, 0, 22);
    
    popMatrix();
    
})(200, 400);

var quote = (function() {
    textAlign(CENTER, CENTER);
    //the string
    var str = "Carry my soul\n\t\t\t\t\t\tinto the night\nMay the stars\n\t\t\t\t\t\tguide my way.";
    textSize(20);
    //set font
    textFont(createFont("Gabriola"));
    //if text width isn't 106
    if(textWidth(str) !== 106) {
        //doesn't have font, set to serif
        textFont(createFont("serif"));
    }
    //draw the text
    fill(255, 150);
    text(str, 500, 500);
})();