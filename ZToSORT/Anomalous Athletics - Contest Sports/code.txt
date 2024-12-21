//Click the arrow buttons to view the slides.
//Click the info button ("i") to read more about each page.

/*  

    CONTEST: SPORTS

    I've been programming for thirteen months, 
    and I have learned 100% of Intro to JS.
    
    I would prefer to be placed in the 
    Intermediate bracket.

*/

/**

//Attributes: 

Drawing Tool for Curve Vertex: Troy Cook
-khanacademy.org/computer-programming/curvevertexxy/4922655547326464

Processing JS reference: 
-http://processingjs.org/reference --This has been archived.
-https://processing.org/

Loading Images: Adapted from Reality Studios's "Isolation"
-khanacademy.org/computer-programming/isolation/5308205429506048
-Note: I made changes to this. See spin-off: khanacademy.org/computer-programming/trying-to-make-sense-of-the-loading-images-thingy/4768803863216128

The arena / the people's figures are inspired from
images online, but I never copied anything exactly.

**/

/*
Started: July 3, 2020 
Finished: July 26, 2020
*/

//Any tips are appreciated, especially for art/optimization.

//If you want to read about sports in my life...
//{
/*

I've played tennis for a long time, and I was part of my middle
school's tennis team for two years. It was basically my only form
of exercise, but I did not enjoy it--mainly because it got in the
way of homework and my other interests. Back then I disliked
sports in general (except Wii sports :P) because people cared too
much about them (and I wasn't good at athletics).

However, during these five months of staying at home, I 
have found a sport that I truly enjoy--badminton. In the 
evenings, I play badminton with my mum and/or my brother, and
we've all become very skilled at it. I like badminton because
it's not too hard, but I can still try out all sorts of tricks at
the same time. I can even let my mind wander to other
things as I play. We've played badminton so much that we've worn
two circular spots in our backyard. The grass will take forever
to grow back...

*/
//}

/****************************************************/
//Setup
/****************************************************/

//Setup {

var scene = 0; //set scene to 0 (loading)

textAlign(CENTER, CENTER); //Position text by center 

//Set the font to Trebuchet MS
/*
If the user doesn't have Trebuchet MS, it doesn't matter too much because the default font is sans-serif, which works fine with this program.
*/
textFont(createFont("Trebuchet MS"));

rectMode(CENTER); //desired way of positioning rects

//So that it's random, but it's the SAME random every time
noiseSeed(1);
randomSeed(18);

//}

//Mountain Function {

//Pass in color, nAdd, xPos, yPos, max height
var mountains = function(color, nAdd, xPos, yPos, maxH) {
    
    var tFactor = 100; //for the xPos of lines- t*tFactor = 1
    var n, y; //declare variables
    rectMode(CORNER); //change rectMode back to corner
    noFill();
    stroke(color);
    strokeWeight(2);
    //t - time in the noise function
    //lines from x-coordinate 0 to width
    for (var t = 0; t*tFactor+xPos < width; t+=0.01) {
        //pass in time to the noise function, scaling with 0.3
        //add nAdd for different mountain ranges
        n = noise(t*0.3+nAdd);
        //map n from 0-1 to 0-max height
        y = map(n, 0, 1, 0, maxH);
        //t*tFactor+xPos - x of line, increases as time increases
        //y-yPos, y (noise) plus the yPos to shift up or down
        line(t*tFactor+xPos, y-yPos, t*tFactor+xPos, height);
    }
    rectMode(CENTER); //back to desired positioning
    
};

//}

//Image Object Type {

//To load the imgs in scene 0 (loading), save imgs, then make scene 1
//Pass in array of functions. 
var Image = function(drawingsArr) {
    
    //array to hold all functions that draw things for each image
    this.drawingsArr = drawingsArr;
    this.img = null; //Will hold the image
    
};
    
//}

/****************************************************/
//Sports First Scene
/****************************************************/

//Background and Text {

//The geometric background and text of the first scene
var geoBackgroundAndText = function() {
    
    var positions = []; //To hold PVectors of each random pt
    var newRow, fillG, fillB, clr; //declare variables
    
    //create random vertices for the quads
    for (var y = -50; y <= height+100; y+=50) {
        //blank row of PVectors
        newRow = [];
        for (var x = -100; x <= width+100; x+=50) {
            //Push a new random point onto the new Row
            //Like a grid, but with added random
            newRow.push(new PVector(x+floor(random(-20, 20)),
                                    y+floor(random(-20, 20))));
        }
        //Push the row into positions, an array of arrays
        positions.push(newRow);
    }
    
    //draw the quads, color is mapped from quad's x and y
    //loop through row arrays on the positions array
    for (var i = 1; i < positions.length-1; i++) {
        //loop through each element (column) in the row array
        for (var j = 1; j < positions[i].length-1; j++) {
            //map y pos of point to g of color
            fillG = map(positions[i][j].y, 0, height+60, 0, 170);
            //map x pos of point to b of color
            fillB = map(positions[i][j].x, 0, width+60, 0, 170);
            clr = color(255, fillG, fillB);
            fill(clr);
            stroke(clr);
            /*
              draw a quad at each point, 
              connecting it to the point above, 
              the pt above and to the right, 
              and the pt directly to the right
            */
            quad(positions[i][j].x, //point x (bottomleft corner)
                 positions[i][j].y, //point y
                 positions[i-1][j].x, //point above x
                 positions[i-1][j].y, //point above right
                 positions[i-1][j+1].x, //point to above&right x
                 positions[i-1][j+1].y, //point to above&right y
                 positions[i][j+1].x, //point to the right x
                 positions[i][j+1].y); //point to the right y
        }
    }
    
    //The bad speech at the beginning
    var message = "Why do we care about sports so much? \n What makes them more than the typical casual game? \n Why do we go through such pains to get better at them, \n or so anxiously spectate our favorite players \n as if our lives depended on it, to the point where it's \n almost absurd?  Well, here's how I see it--for sports \n today, at least. In addition to teaching morals, \n building communities, improving health and \n happiness, and providing competition and the \n satisfaction of improvement,  sports give people a \n break from the real world. A brief respite, much like \n playing an instrument or learning new things, \n  where we as people can not only have fun and \n forget our troubles, but be so INTO having fun \n that we take it extremely seriously. \n ••• \n With that said, here's a look at \n three not-so-typical areas of sports...";
    
    fill(255);
    textSize(20);
    text(message, width/2, height/2); //display the message
    
};

//}

//Image object for first scene
var firstScene = new Image([geoBackgroundAndText]);

/****************************************************/
//Extreme Sports Scene
/****************************************************/

//Background Sky and Purple Mountains {

var extremeBackgroundAndMtns = function() {

    //sky colors
    var darkerSunsetClr = color(252, 87, 94); 
    var lighterSunsetClr = color(245, 171, 44);
    strokeWeight(2);
    //from y = 0 to y = 300
    for (var y = 0; y <= 300; y += 2) {
        //y determines amt for lerpColor between darker&lighter
        stroke(lerpColor(darkerSunsetClr, 
                         lighterSunsetClr, y/300));
        //Draw a line across the canvas with that clr
        line(0, y, width, y);
    }
    
    //ze sun
    fill(250, 255, 0, 10);
    //draw a circle, radius i from 10-50
    for (var i = 10; i <= 50; i++) {
        ellipse(230, 230, i, i); //draw an ellipse with radius i
    }
    
    //mountains, back to front
    //Pass in color, nAdd, xPos, yPos, maxH
    noStroke();
    mountains(color(113, 86, 138), 5, 0, 70, 600);
    mountains(color(92, 70, 132), 0, 0, 2, 600);
    mountains(color(62, 54, 113), 10, 0, -60, 600);
    mountains(color(39, 31, 80), 1, 0, -78, 600);
    mountains(color(21, 17, 51), 15, 0, -138, 600);
    
    //sunlight (createGraphics for blur)
    var sunlight = createGraphics(width, height, P2D);
    sunlight.noStroke();
    sunlight.background(0, 0); //a transparent background
    sunlight.fill(250, 199, 58, 5); //translucent yellow
    //from radius 0 to 1200, a is like acceleration-ish
    for (var r = 0, a = 0; r < 1200; r+=a, a++) {    
        sunlight.ellipse(230, 230, r, r);
    }
    sunlight.filter(BLUR, 3); //blur the image
    sunlight = sunlight.get(); //save the image
    image(sunlight, 0, 0); //draw the image
    sunlight = null; //not needed anymore
    
};

//}

//The Mountain Climber {

var mtnClimber = function() {
    
    pushMatrix(); //save current coordinate system
    translate(96, 177); //translate to position
    
    fill(47, 37, 69); 
    noStroke();
    ellipse(0, 0, 4, 5); //head
    //body
    beginShape();
        vertex(-1, 0);
        vertex(-1, 3); //neck left side
        vertex(-4, 8); //right arm
        vertex(-2, 8.5); //hand
        vertex(-1, 6); //left side chest
        vertex(-3, 14); //left bottom dress
        vertex(2, 13); //right bottom dress
        vertex(1, 5.5); //vertex right side chest
        vertex(4, 7);
        vertex(5, 6); //right hand
        vertex(1, 3); //right side of neck
        vertex(1, 0);
    endShape();
    
    //staff
    beginShape();
        vertex(5, 13); //staff bottom left
        vertex(6, 13); //staff bottom right
        vertex(5, 6);
        vertex(6, 2); 
        vertex(5, 0); //staff top right
        vertex(4, 0); //staff top left
        vertex(3, 1);
        vertex(4, 2);
        vertex(5, 1.5); 
        vertex(4, 6); //near hand
    endShape();
    
    popMatrix(); //revert to original coordinate system
    
};
    
//}

//The Slackliner {

var slackliner = function() {

    pushMatrix(); //save current coordinate system
    translate(370, 475); //translate to position
    
    fill(13, 9, 23);
    noStroke();
    ellipse(-7.5, -7, 8.5, 8); //bun
    
    pushMatrix(); //save current coordinate system
    rotate(10); //rotate a little
    ellipse(0, 0, 15, 17.5); //head
    popMatrix(); //go back to previous 
    
    //body
    beginShape();
        vertex(-3, 5); //top left neck
        vertex(-3, 10); //bottom left neck
        vertex(-15, 15); //left shoulder
        vertex(-25, 22.5); //left outer elbow
        vertex(-30, 30); //left hand
        vertex(-15, 19);
        vertex(-4, 15); //left side body
        vertex(0, 30); //left side body
        vertex(-3, 35);
        vertex(-25, 60); //foot in air
        vertex(-24.5, 60.5);
        vertex(1, 41.5);
        vertex(7, 50); //inner knee front leg
        vertex(0, 70); //front leg foot on slackline
        vertex(0.5, 70);
        vertex(12, 50); 
        vertex(5, 30); //right side of body
        vertex(5, 15); //right side of body
        vertex(15, 19);
        vertex(37.5, 15); //right hand
        vertex(17, 15.5);
        vertex(3, 10); //bottom right neck
        vertex(3, 5); //top right neck
    endShape();
    
    //slack line
    strokeWeight(2.5);
    stroke(19, 13, 33);
    line(250, 21, 0, 69); //right
    line(0, 69, -370, 46); //left
    
    popMatrix(); //back to original coordinate system
    
};

//}

//The Skydiver {

var skydiver = function() {
    
    pushMatrix(); //save current coordinate system
    translate(210, 130); //translate to position
    rotate(10); //rotate 10 degrees
    scale(0.8); //make a teensy bit smaller
    
    stroke(35, 30, 48);
    noFill();
    
    //parachute harness thingy
    strokeWeight(1.0);
    line(-2, 5, -6, -6); //harness left rope
    line(2, 5, 6, -6); //harness right rope
    strokeWeight(3);
    arc(0, -6, 9, 5, 180, 360); //harness top
    
    //strings connecting to parachute
    strokeWeight(0.5);
    //once at x=-6, then at x=6
    for (var x = -6; x <= 6; x+=12) {
        //three strings for each pos
        for (var i = 0; i < 3; i++) {
            //line from harness to parachute
            line(x, -6, 4*x+i*9-9, -53);
        }
    }
    
    //parachute
    fill(35, 30, 48);
    noStroke();
    beginShape();
        vertex(-34, -52);
        bezierVertex(-10, -75, 10, -75, 34, -52); //top curve
        vertex(32, -48);
        bezierVertex(-5, -57, 5, -57, -32, -48); //bottom curve
    endShape();
    
    //person
    pushMatrix(); //save current coordinate system
    scale(0.75); //make the person just a tad bit smaller
    ellipse(0, 1, 5, 7); //head
    
    //body
    beginShape();

        vertex(-1, 2); //left side neck
        vertex(-1, 5);  //left side neck
        vertex(-6, 6); //shoulder to elbow left
        vertex(-14, 4); //to left hand
        vertex(-6, 7.4); //outer elbow left
        vertex(-2, 7); //left side chest
        vertex(-2, 14); //left side waist
        vertex(-4, 28); //to left foot
        vertex(0, 16);
        
        vertex(2, 20); //right leg knee inner
        vertex(0, 28); //to right foot
        vertex(4, 20); //right leg knee outer
        vertex(2, 14); //right side waist
        vertex(2, 7); //right side chest
        vertex(6.2, 7.4); //outer elbow right
        vertex(12, 2); //to hand right
        vertex(6, 6); //shoulder to elbow right
        vertex(1, 5); //right side neck
        vertex(1, 2); //right side neck
    
    endShape();
    popMatrix(); //revert to previous system
    
    popMatrix(); //revert to original coordinate system
    
};

//}

//The Hang Glider {

var hangGlider = function() {
    
    pushMatrix(); //save the current coordinate system
    translate(470, 240); //translate to position
    rotate(-20); //rotate a little
    scale(1.5); //make a teensy bit bigger
    
    //hang glider triangle thingy to hold on
    stroke(35, 30, 48);
    strokeWeight(0.5);
    noFill();
    triangle(-3, 7, 3, 7, 3, -6);
    //some connecting lines
    strokeWeight(0.3);
    line(-3, 7, -9, 0); 
    line(-3, 7, -4, -2);
    line(5, 7, 16, -6);
    line(5, 7, 11, 6);
    line(11, 6, 10, -6);
    
    //wings
    noStroke();
    fill(35, 30, 48);
    beginShape();
        vertex(-15, 1); //left tip wing
        vertex(3.2, -3.8);
        vertex(11, 6); //tip of tail
        vertex(6, -3.9);
        vertex(24, -6); //right tip wing
        vertex(-6, -12); //hanglider wing top
    endShape();
    
    //person
    pushMatrix(); //save current coordinate system
    rotate(-15); //rotate a little
    ellipse(0, 0, 3, 4); //head
    popMatrix(); //go back to previous system
    
    //body
    beginShape();
        vertex(1, 1.5);
        vertex(3, 1.9);//right shoulder
        vertex(4.5, 4);//right elbow
        vertex(5, 7);
        vertex(10, 15); //to foot heel on right
        vertex(9, 17);  //toe foot right
        vertex(8.5, 15);
        vertex(8, 17.5); //toe on left foot
        vertex(7.1, 15);
        vertex(-0.5, 5);//left side body chest
        vertex(-2.5, 7); //left hand
        vertex(-3.7, 7);
        vertex(-2, 5); //left elbow
        vertex(-1, 1.5);
    endShape();
    
    
    popMatrix(); //go back to original coordinate system
    
};

//}

//The Mountain Biker {

var mtnBiker = function() {
    
    pushMatrix(); //save current coordinate system
    translate(139, 390); //translate to position
    rotate(20); //rotate a little
    
    stroke(38, 27, 43);
    noFill();
    strokeWeight(0.8);
    line(-6.5, 8.8, -4.1, 10.9); //handlebars
    strokeWeight(0.9);
    line(-4.1, 10.9, -11, 20); //handlebars to front wheel
    ellipse(-11, 20, 8, 8); //front wheel
    ellipse(7, 25, 8, 8); //back wheel
    ellipse(-11, 20, 1, 1); //inner wheel thingy front
    ellipse(7, 25, 1, 1); //inner wheel thingy back
    strokeWeight(1);
    //more bike frame
    line(-4.5, 12.5, 7, 25); //to back wheel
    line(-4.5, 12.5, -2.4, 22); //to front foot
    line(-2.4, 22, 7, 25); //foot to back wheel
    strokeWeight(0.8);
    line(-1, 22, 7, 14); //to seat
    
    //seat
    fill(38, 27, 43);
    noStroke();
    pushMatrix(); //save current coordinate system
    translate(6.3, 14); //translate to seat position
    rotate(30); //rotate a little
    ellipse(0, 0, 4, 1.4); //seat
    popMatrix(); //back to previous system
    
    //person
    ellipse(0, 0, 4, 5); //head
    
    //body, going clockwise
    beginShape();
        vertex(1.5, 0);
        vertex(2, 2); //head to neck
        vertex(4, 3.4); //back
        vertex(8, 10);
        vertex(7, 12);
        vertex(2, 15); //inner knee
        vertex(5, 23); //to foot
        vertex(-0.5, 16);
        vertex(-3, 24); //front foot on pedal
        vertex(-2.7, 14); //knee
        vertex(2.3, 10); //lap
        vertex(2.2, 9.5); //elbow
        vertex(-5, 11); //to hand
        vertex(-6, 10);
        vertex(-5, 9); //knuckles
        vertex(-4, 9.8); //wrist
        vertex(1.7, 7.5); //inner elbow
        vertex(1.5, 7.3); //elbow of back arm
        vertex(-7, 8.9); //to hand
        vertex(-8, 8.0); 
        vertex(-7, 7.0);//knuckles
        vertex(-6, 7.8); //wrist
        vertex(-0.9, 6);//inner elbow
        vertex(-1, 4); //shoulder
        vertex(-0, 2);
        vertex(-2, 1);
    endShape();
    
    popMatrix(); //revert to previous system
    
};

//}

//Image object for extreme sports scene
var extremeSportsScene = new Image([extremeBackgroundAndMtns,
mtnClimber, slackliner, skydiver, hangGlider, mtnBiker]);

/****************************************************/
//Ancient Sports Scene - Gladiatorial Games 
/****************************************************/

//Background & Floor for Ancient Scene {

var ancientBackground = function() {
    
    background(120, 166, 245); //a nice blue
    
    //the ground-radial gradient, colors
    var lighterGround = color(240, 136, 9);
    var darkerGround = color(189, 72, 10);
    noStroke();
    //arc from size 700 to 1
    for(var s = 700; s > 0; s--) {
        //s determines the amt in lerpColor for lighter to darker
        fill(lerpColor(lighterGround, darkerGround, s/600));
        arc(300, 400, s+100, s, 0, 180); //an arc
    }
    
};

//}

//Stadium {

var stadium = function() {
    
    //behind the archways, wall (A REALLY big arc)
    stroke(212, 118, 78);
    strokeWeight(70);
    noFill();
    arc(width/2, -470, 1400, 1400, 60, 120);
    
    //the 3d ness of the arch ways (BEHIND, darker clr)
    noStroke();
    fill(207, 91, 41);
    pushMatrix(); //save current coordinate system
    translate(width/2, -490); //translate to position
    //a tiny section of a reeally big circle
    //rotate 60 to 120
    for (var r = 60; r <= 120; r+= 6) {
        pushMatrix(); //save current system
        rotate(r); //rotate r degrees
        //for perspective, map rotation and use p for y position
        var p = map(r, 60, 120, -8, 8);
        //a rectangle with no size, but 2 negative edges
        //Each edge is specified (4 extra parameters)
        rect(656, p, 0, 0.1, 0, -130, -130, 0);
        //brick thingies on top of wall
        rect(655, p, 20, 50, 5);
        popMatrix(); //revert to previous 
    }
    popMatrix(); //revert to original coordinate system
    
    //create the wall mask (off screen with createGraphics)
    var wall = createGraphics(width, height, P2D);
    wall.noStroke();
    wall.background(0); //a transparent background
    wall.fill(255); //white for mask
    
    //arches on top of the wall
    wall.angleMode = "degrees";
    wall.pushMatrix(); //save current system
    wall.translate(width/2, -490); //translate to position
    wall.rectMode(CENTER);
    //some weird crazy thing, rotate from 60 deg to 120
    for (var r = 60; r <= 120; r+=6) {
        wall.pushMatrix(); //save current system
        wall.rotate(r); //rotate r degrees
        //a rectangle with no size, but 2 negative edges
        //Each edge is specified (4 extra parameters)
        wall.rect(655, 0, 0.5, 0.1, 0, -110, -110, 0);
        //brick thingies lining the top of the wall
        wall.rect(655, 0, 20, 50, 5);
        wall.popMatrix(); //revert to previous
    }
    wall.popMatrix(); //revert to original coordinate system
    
    //main wall
    wall.y = 200;
    wall.beginShape();
        wall.vertex(0, wall.y); //left top corner
        wall.vertex(0, wall.y+230); //left bottom corner
        //curve to bottom right corner
        wall.bezierVertex(width/2, wall.y+200, 
                          width/2, wall.y+200, 
                          width, wall.y+230);
        wall.vertex(width, wall.y); //top right corner
        //curve to top left corner
        wall.bezierVertex(width/2, wall.y+50, 
                          width/2, wall.y+50, 
                          0, wall.y);
    wall.endShape();
    wall = wall.get(); //save the image
    
    //a gradient img, drawn off-screen
    var gradientWall = createGraphics(width, height, P2D);
    //gradient colors
    gradientWall.lighterClr = color(250, 226, 145);
    gradientWall.darkerClr = color(186, 54, 9);
    gradientWall.noFill();
    gradientWall.strokeWeight(2);
    //from y=0 to y=400
    for (var y = 0; y <= 400; y+=2) {
        //y determines amt for lerpColor, lighter to darker
        gradientWall.stroke(lerpColor(gradientWall.lighterClr,
                            gradientWall.darkerClr, y/400));
        gradientWall.line(0, y+87, width, y+87);
    }
    gradientWall = gradientWall.get(); //save the image
    gradientWall.mask(wall); //use wall as a "mask" for gradient

    image(gradientWall, 0, 0); //finally, draw the image!

    //"delete" the images (not needed)
    wall = null;
    gradientWall = null;
    
    //the stripe on the wall
    fill(186, 54, 9, 70);
    beginShape();
        vertex(0, 280); //top left corner
        vertex(0, 350); //bottom left corner
        //curve to bottom right corner
        bezierVertex(width/2, 340, width/2, 340, width, 350);
        vertex(width, 280); //top right corner
        //curve to top left corner
        bezierVertex(width/2, 310, width/2, 310, 0, 280);
    endShape();
    
};

//}

//Gladiator One {

var gladiatorOne = function() {
    
    pushMatrix(); //save current coordinate system
    translate(153, 310); //translate to position
    
    fill(33, 18, 1); 
    noStroke();
    
    pushMatrix();//save current system 
    rotate(8); //rotate some degrees
    ellipse(0, 0, 24, 28); //head
    popMatrix(); //revert to previous system
    
    //thingy on the helmet
    beginShape();
        curveVertex(-18, -17); 
        curveVertex(-11, -29);
        curveVertex(5, -30); 
        curveVertex(17, -21); 
        curveVertex(19, -8); 
        curveVertex(8.5, -19); 
        curveVertex(-9, -20); 
        curveVertex(-17,-11); 
        curveVertex(-19, 0); 
        curveVertex(-24, 6); 
        curveVertex(-24, -4); 
        curveVertex(-21, -16); 
        curveVertex(-12, -28); 
        curveVertex(4, -30);
    endShape();
    
    //connect the helmet thingy to the helment
    pushMatrix(); //save current coordinate system
    translate(-3, -17); //translate to position
    rotate(-15); //rotate some
    rect(0, 0, 8, 10); //a rect to join the thingy to helmet
    popMatrix(); //revert to original system

    //helmet
    arc(0, -5, 29, 30, -230, 3);
    
    //rest of the body
    beginShape();
        vertex(-10, 9);
        vertex(-17, 15); //back shoulder
        vertex(-20, 83); //left side waist
        vertex(-27, 101); //left side armor
        vertex(-21, 102);
        vertex(-16, 135); //to left knee
        vertex(-35, 178); //to heel of foot on left
        vertex(-15, 182); //toe
        vertex(-16, 178);
        vertex(-21, 173);
        vertex(5, 135); //back to knee
        vertex(6, 101);
        vertex(20, 135);//to right knee  
        vertex(12, 181); //to heel right foot
        vertex(32, 180); //toe
        vertex(32, 177);
        vertex(24, 173);
        vertex(41, 135); //back to knee
        vertex(30, 102);
        vertex(37, 101); //right side armor
        vertex(22, 60); //waist
        vertex(25, 30); //right side chest
        vertex(52, 35); //elbow
        vertex(77, 23); //to hand
        vertex(77, 15); 
        vertex(52, 20); //back to elbow
        vertex(25, 10); //right shoulder
        vertex(21, 9);
        vertex(8, 9); //neck
    endShape();
    
    //shield
    pushMatrix(); //save current coordinate system
    translate(-19, 49); //translate to position
    rotate(-10); //rotate some degrees
    ellipse(0, 0, 45, 70); //the SHIELD
    popMatrix(); //revert back to previous coordinate grid
    
    //hand
    ellipse(74, 19, 15, 13); 
    
    //spear end
    quad(98, -24, 114, -32, 106, -16, 94, -12);
    //spear stick
    stroke(33, 18, 1);
    strokeWeight(6);
    line(102, -20, -50, 170); //stick thingy
    
    noStroke();
    
    popMatrix();
    
};

//}

//Gladiator Two {

var gladiatorTwo = function() {

    pushMatrix(); //save current coordinate system
    translate(448, 308); //translate to position
    
    fill(33, 18, 1);
    
    pushMatrix(); //save current coordinate system
    rotate(-15); //rotate -15 degrees
    ellipse(0, 0, 26, 30); //head
    arc(0, 0, 31, 34, -155, 60); //helmet
    popMatrix(); //revert to previous system

    //thingy on the helmet
    beginShape();
        curveVertex(-9,-28); 
        curveVertex(11, -28); 
        curveVertex(23, -19); 
        curveVertex(31, 17); 
        curveVertex(13, -17); 
        curveVertex(-13, -19); 
        curveVertex(-21, -13); 
        curveVertex(-29, -26); 
        curveVertex(-4, -30); 
        curveVertex(11, -28); 
        curveVertex(25, -21); 
    endShape();
    
    //connect the thingy on the helmet to the helmet
    pushMatrix(); //save current coordinate system
    translate(10, -16); //translate to pos
    rotate(25); //rotate 25 degrees
    rect(0, 0, 12, 14); //rect to connect thingy to helmet
    popMatrix(); //revert to previous coordinate system

    //body
    beginShape();
        vertex(13, 11);
        vertex(29, 20); //shoulder on right
        vertex(46, 50); //elbow
        vertex(53, 90); //to hand
        vertex(45, 95); 
        vertex(33, 57); //back to elbow
        vertex(23, 45); //right side chest
        vertex(19, 90); //right side waist
        vertex(20, 129); //knee
        vertex(40, 179); //to foot on right
        vertex(21, 185); //toe
        vertex(22, 180);
        vertex(26, 175);
        vertex(2, 131); //back to knee
        vertex(-2, 106);
        vertex(-14, 130); //other knee
        vertex(-4, 182); //to foot on left
        vertex(-24, 185); //toe
        vertex(-23, 181);
        vertex(-17, 176);
        vertex(-33, 130); //back to knee
        vertex(-22, 90); //left side waist
        vertex(-26, 35); //left side chest
        vertex(-17, 15); //shoulder left
        vertex(-10, 11);
    endShape();
    
    //hand
    pushMatrix(); //save current coordinate system
    translate(48, 91); //translate to position
    rotate(-28); //rotate some
    ellipse(0, 0, 17, 13); //hand
    popMatrix(); //revert to previous system
    
    //shield
    ellipse(-26, 58, 41, 73);
    //spear tip
    quad(-85, 160, -86, 169, -103, 173, -94, 161);
    
    //spear stick
    stroke(33, 18, 1);
    strokeWeight(6);
    line(80, 74, -90, 165);

    popMatrix(); //revert to original coordinate system

};

//}

//Light and Dust {

var ancientLightAndDust = function() {
    
    //sunlight (need createGraphics and P2D for blur)
    var light = createGraphics(width, height, P2D);
    light.noStroke();
    light.background(0, 0); //a transparent background
    light.fill(250, 248, 210, 20); //translucent yellowish white
    //a is like acceleration, i goes from 500 to 1350
    for (var i = 100, a = 0; i <= 1550; i += a, a+=8) {
        light.ellipse(width/2, 0, i, i); //ellipse with size i
    }
    light.filter(BLUR, 4); //add some blur
    light = light.get(); //save the image
    image(light, 0, 0); //draw the image
    light = null; //light is not needed anymore
    
    //create dust (need P2D for blur)
    var dust = createGraphics(width, height, P2D);
    dust.genY = new Random(3); //Gaussian random numbers, for y
    dust.background(0, 0); //transparent background
    dust.noStroke();
    dust.fill(125, 66, 11, 16); //a translucent dusty color
    //for 42 times 
    for (var i = 0; i < 45; i++) {
        //generate next y position
        dust.nextY = dust.genY.nextGaussian()*120+height;
        //ellipse with random x, nextY as y
        dust.ellipse(random(-width,width), dust.nextY, 400, 300);
    }
    dust.filter(BLUR, 6); //add blur
    dust = dust.get(); //save the image
    image(dust, 0, 0); //draw the image
    dust = null; //dust is not needed anymore

};

//}

//Image object for ancient sports scene
var ancientSportsScene = new Image([ancientBackground, 
stadium, gladiatorOne, gladiatorTwo, ancientLightAndDust]);

/****************************************************/
//Quidditch / Fictional Sports Scene
/****************************************************/

//Cloud Function {

//A function to make clouds, pass in cloud pos, width, and height
var cloud = function(x, y, w, h) {
    
    noStroke();
    //cloud shadow
    fill(130, 130, 130);
    ellipse(x, y+h/12, w, h); //body of cloud
    ellipse(x+w/2, y+h/6, w/2, h/2); //right part of cloud
    ellipse(x-w/2, y+h/6, w/2, h/2); //left part of cloud
    //cloud
    fill(199, 199, 199);
    ellipse(x, y, w, h); //body of cloud
    ellipse(x+w/2, y+h/10, w/2, h/2); //right part of cloud
    ellipse(x-w/2, y+h/10, w/2, h/2); //left part of cloud
    
};

//}

//Trees Function {

//pass in y of row of trees
var trees = function(y) {
    
    //declare variables
    var tX, tY, randNum, pickClr, shadowO, clr;
    
    //Use gaussian function for tree heights
    var genTreeY = new Random(6);
    //An array to hold the colors a tree could be
    var treeClrs = [color(14, 143, 3), color(29, 99, 5), 
                    color(31, 184, 31), color(56, 92, 5), 
                    color(11, 207, 11), color(9, 79, 2)];
    
    strokeWeight(3.6);
    //180 trees per row
    for (var i = 0; i < 165; i++) {
        stroke(87, 41, 0);
        tX = random(width); //x pos tree, random width
        //y/height of next tree, add y for y position, scale by 4
        tY = genTreeY.nextGaussian()*4+y;
        //pick a random color from tree colors array
        randNum = floor(random(treeClrs.length));
        pickClr = treeClrs[randNum];
        //shadow opacity, map y to transparency amt
        shadowO = map(tY, 200, 343, 0.9, 0);
        //leaf things on each side
        for (var j = 0; j < 7; j++) {
            //tree, j and y determines shade of tree branch thing
            //add shade depending on num/height of branch
            clr = lerpColor(pickClr, color(0), j/8);
            //add more shade if higher up
            clr = lerpColor(clr, color(0), shadowO);
            stroke(clr);
            line(tX+1, tY+j*5, tX+4, tY+j*5+3); //right
            line(tX-1, tY+j*5-2, tX-6, tY+j*5+3);  //left
        }
    }

};

//}

//Hogwarts Tower Function {

var drawTower = function(x, y, scaleX, scaleY) {   
    
    pushMatrix(); //save current coordinate system
    translate(x, y); //translate to (x, y);
    scale(scaleX, scaleY); //scale by scaleX, scaleY
    
    //tower
    noStroke();
    fill(196, 160, 133);
    rect(0, 219, 48, 290);
    
    //bricks, top to bottom 
    //(the last four parameters are the radii of the corners)
    noStroke();
    fill(171, 131, 89);
    rect(-13, 81, 22, 9, 0, 5, 5, 0);
    rect(16, 100, 16, 10, 5, 0, 0, 5);
    rect(-11, 111, 21, 10, 5);
    rect(-14, 136, 21, 10, 0, 5, 5, 0);
    rect(16, 144, 16, 10, 5, 0, 0, 5);
    rect(-3, 159, 27, 10, 5);
    rect(-16, 178, 17, 10, 0, 5, 5, 0);
    rect(13, 190, 22, 10, 5, 0, 0, 5);
    rect(-13, 203, 20, 10, 0, 5, 5, 0);
    rect(2, 220, 20, 10, 5);
    rect(-10, 240, 29, 10, 0, 5, 5, 0);
    rect(15, 254, 19, 10, 5, 0, 0, 5);
    rect(-15, 269, 19, 10, 0, 5, 5, 0);
    
    //tower side shadow
    fill(77, 52, 1, 140);
    rect(-20, 219, 9, 290);
    
    //window shadow
    fill(133, 102, 40);
    arc(0, 116, 17, 55, 180, 360);
    //window light
    fill(163, 196, 224);
    arc(1, 116, 10, 50, 180, 360);
    //window
    fill(134, 183, 189);
    arc(-1, 116, 10, 50, 180, 360);
    //window sill
    fill(115, 92, 47);
    rect(0, 119, 22, 7, 5);
    
    //tower top shadow
    fill(120, 86, 49);
    arc(0, 71, 60, 14, 0, 180);
    //top of tower
    fill(191, 149, 115);
    triangle(0, 0, -30, 70, 30, 70);
    arc(0, 70, 60, 11, 0, 180);
    
    //tower shadow on left
    fill(120, 86, 49);
    quad(0, 0, -30, 70, -26, 75, -23, 74);
    
    //flag pole
    stroke(97, 44, 16);
    strokeWeight(2);
    line(0, 2, 0, -19); 
    //flag (using ~)
    textSize(44);
    fill(66, 2, 2);
    pushMatrix(); //save current coordinate system
    translate(-9, -14); //translate to position
    rotate(-33); //rotate some
    text("~", 0, 0); 
    popMatrix(); //revert to previous coordinate system
    
    popMatrix(); //back to original coordinate system
    
};

//}

//Broom Function {

var broom = function(x, y, theta, scaleX, stickClr, decorClr, hairClr) {
    
    pushMatrix(); //save the current coordinate system
    translate(x, y); //translate to broom's position
    scale(scaleX, 1); //1 for normal, -1 for flipped
    rotate(theta); //rotate around (x,y) theta degrees
    
    ///broom stick
    stroke(stickClr);
    strokeWeight(5);
    beginShape();
        vertex(72, 2);
        vertex(104, 3);
        bezierVertex(118, 0, 114, 1, 175, -1);
        bezierVertex(194, 2, 196, 0, 157, -1);
    endShape();
    
    //broom hair
    noStroke();
    fill(hairClr);
    beginShape();
        vertex(0, 0);
        bezierVertex(12, -11, 17, -16, 72, 0);
        vertex(72, 4);
        bezierVertex(30, 15, 28, 16, 0, 0);
    endShape();
    
    //ring thingies on broom hair 
    noStroke();
    fill(decorClr);
    rect(71, 2, 3, 6);
    rect(66, 2, 2, 8);

    popMatrix(); //revert back to original coordinate system
      
};

//}

//Quidditch Hoop Function {

var quidditchHoop = function(x, y) {
    
    noFill();
    strokeCap(SQUARE);
    //hoop 3d ness
    strokeWeight(10);
    stroke(115, 95, 33);
    ellipse(x-2, y+3, 100, 100); //hoop
    rect(x-2, y+63, 6, 10, 1); //base of hoop
    line(x-2, y+50, x-2, height); //pole
    
    //quidditch hoop
    stroke(194, 160, 56);
    
    line(x, y+50, x, height); //pole
    ellipse(x, y, 100, 100); //hoop
    rect(x, y+61, 6, 10, 1); //base of hoop
    
    //hoop shine
    stroke(214, 179, 97);
    arc(x, y, 100, 100, -129, 63);
    
    strokeCap(ROUND); //back to default
    noStroke();
    
};

//}

//Background Sky and Mtns {

var quidditchSkyAndMtns = function() {
    
    //store gradient colors in variables
    var darkerSky = color(50, 84, 128);
    var lighterSky = color(111, 199, 217);
    
    //start at y=0, draw a line across the canvas until height/2.
    //start at darkerclr,with each line,get closer to lighter clr
    strokeWeight(2);
    for (var y = 0; y < 200; y+=2) {
        stroke(lerpColor(darkerSky, 
                         lighterSky, y/200));
        line(0, y, width, y);
    }
    
    //all the clouds in clusters
    //top left
    cloud(100, 74, 69, 36);
    cloud(175, 91, 69, 36);
    cloud(87, 96, 102, 43);
    //middle top
    cloud(289, 14, 77, 51);
    cloud(240, 24, 102, 45);
    cloud(368, 29, 116, 38);
    //top right
    cloud(482, 88, 101, 38);
    cloud(540, 102, 132, 38);
    cloud(392, 114, 132, 38);
    //blur the whole thing
    filter(BLUR, 3.2);
    
    //mountains
    //pass in color,  nAdd, xPos, yPos, maxH
    mountains(color(61), 5, -73, 214, 832); //back range
    mountains(color(84), 8, -18, 208, 882); //front range

};

//}

//Hogwarts {

var hogwarts = function() {
        
    //layers of trees behind hogwarts, pass in y
    trees(266);
    trees(278); 
    
    //bridge
    noFill();
    strokeWeight(7);
    //bridge between little towers
    stroke(105, 72, 37);
    arc(152, 180, 18, 6, 180, 360);
    //little squares on towers
    strokeWeight(2);
    rect(144, 173, 2, 1);
    rect(151, 173, 1, 1);
    rect(159, 173, 2, 1);
    //shadow of bridge
    stroke(56, 38, 18);
    arc(152, 182, 18, 7, 180, 360);
    
    //draw a smaller tower left
    drawTower(127, 107, 0.7, 0.7);
    //use scale to draw a smaller tower right
    drawTower(177, 107, 0.7, 0.7);
    
    //wall
    noStroke();
    for(var i = 0; i < 4; i++) {
        //shadows
        fill(112, 78, 43);
        rect(i*25+113, 233, 16, 10, 5);
        //row of square thingies on top of the wall
        fill(181, 144, 106);
        rect(i*25+116, 233, 16, 10, 5);
    }
    fill(181, 144, 106);
    rect(116, 276, 172, 83); //main part of wall
    //more bricks
    fill(158, 120, 82);
    for (var x = 0; x < 4; x++) {
        rect(x*25+115, 253, 9, 26, 5); //vertical thingies
    }
    //horizontal line on wall
    fill(148, 109, 71);
    rect(156, 277, 102, 6, 5);
    
    drawTower(74, -20, 1.3, 1.1); //draw a bigger tower
    drawTower(224, 53, 1, 1); //3rd tallest
    drawTower(21, 16, 1, 1); //left most tower
    drawTower(267, 122, 1, 1); //shortest tower, rightmost
    
    //more layers of trees
    trees(299);
    trees(316);
    trees(337);

};

//}

//Quidditch Stands { 

var stands = function() {
    
    //stands colors in variables 
    var darkerSClr = color(54, 27, 0);
    var lighterSClr = color(158, 95, 0);
    noStroke();
    //brown stands
    for (var i = 0; i < 6; i++) {
        //benches, darker to lighter
        fill(lerpColor(darkerSClr, lighterSClr, i/6));
        rect(width/2, i*23+378, width, 28);
        //shadows
        fill(0, 90-5*i);
        rect(width/2, i*23+385, width, 8);
    }
    
    //top stands decor
    //shadow
    fill(0, 90);
    rect(width/2, 363, width, 10);
    //x pos, from 0 to width+10
    for (var x = 0; x <= width+10; x+=10) {
        //slytherin squares, x=0 to middle
        if (x < width/2) {
            //if x is a multiple of twenty (every other square)
            if (x % 20 === 0) { 
                fill(181, 181, 181); //gray
            } else { 
                fill(29, 125, 16); //green
            }
            rect(x, 360, 10, 10);
        } else {
            //if x is a multiple of twenty (every other)
            if (x % 20 === 0) { 
                fill(166, 0, 0); //red
            } else { 
                fill(255, 183, 0); //gold
            } 
            //gryffindor parallelograms x = middle to width
            quad(x, 355, x+10, 355, x+5, 365, x-5, 365);
        }
    }
    
   
    //front checkerboard thingy, 16 columns
    for (var x = 0; x < 16; x++) {
        //3 rows
        for (var y = 0; y < 3; y++) {
            //first 8 columns are slytherin green and gray
            if (x < 8) {
                /*
                  For checkboard pattern, use % to find even 
                  and odd numbers. If row is odd and column is
                  even, OR column is even and row is odd, fill
                  one color, else fill another
                */
                if (x % 2 === 0 && y % 2 === 1 ||
                    x % 2 === 1 && y % 2 === 0) {
                    fill(181, 181, 181); //gray
                } else {
                    fill(29, 125, 16); //green
                }
            } else {
                //gryffindor side, red and gold
                if (x % 2 === 0 && y % 2 === 1 ||
                    x % 2 === 1 && y % 2 === 0) {
                    fill(255, 183, 0); //gold
                } else {
                    fill(166, 0, 0); //red
                }
            }
            //draw the rectangle at the position
            rect(x*40, y*40+522, 40, 40);
        }
    }
    
    //shadow of trim on the checkerboard thingy
    fill(0, 90);
    rect(width/2, 509, width, 10);
    //brown trim on the checkerboard thingy
    fill(51, 32, 0);
    rect(width/2, 506, width, 10);

};

//}

//Quidditch Crowd/Hoops {

var quidditchCrowdAndHoops = function() {
    
    //so that it's random, but it's the SAME random every time
    randomSeed(17);
    //color of hats and scarves
    var scarfClr, hatClr, randNum, personIsHere; //declare vars
        
    //crowd (slytherin to the left, gryffindor to the right)
    //36 columns
    for (var cols = 0; cols < 36; cols++) {
        //6 rows
        for (var rows = 0; rows < 6; rows++) {
            //people (condition for randomness)
            if (random(1) > 0.1) {
                fill(10);
                personIsHere = true; //a person is at this spot
                ellipse(17*cols+2, 23*rows+375, 12, 15); //head
                //body
                arc(17*cols+2, 23*rows+387, 14, 15, 180, 360);
            } else {
                personIsHere = false; 
                //no one's here, so don't draw hat and/or scarf
            }
            
            randNum = random(1); //get a number between 0 and 1
            
            //if there's a person at this spot
            if (personIsHere) {
                
                //The Choosing of the Colors
                //Slytherin side, cols < 18
                if (cols < 18) {
                    //this person is a slytherin
                    //if randNum < 0.5, for randomness
                    if (randNum < 0.5) {
                        //person has gray hat & green scarf
                        hatClr = color(199, 199, 199);
                        scarfClr = color(48, 173, 26);
                    } else {
                        //person has green hat & gray scarf
                        hatClr = color(48, 173, 26);
                        scarfClr = color(199);
                    }
                } else {
                    //this person is a gryffindor
                    //if randNum < 0.5, else switch
                    if (randNum < 0.5) {
                        //person has red hat & gold scarf
                        hatClr = color(166, 0, 0);
                        scarfClr = color(252, 181, 0);
                    } else {
                        //else gold hat and red scarf
                        hatClr = color(252, 181, 0);
                        scarfClr = color(166, 0, 0);
                    }
                }
                
                //Give hats for some
                if (randNum < 0.8 && randNum > 0.2) {            
                    fill(hatClr);
                    triangle(17*cols+2, 23*rows+361, 
                             17*cols+8, 23*rows+371, 
                             17*cols-4, 23*rows+371); //hat
                    fill(scarfClr);
                    //pompom
                    ellipse(17*cols+2, 23*rows+362, 5, 4); 
                    //hat brim
                    ellipse(17*cols+2, 23*rows+371, 14, 2); 
                    //stripe
                    ellipse(17*cols+2, 23*rows+367, 10, 2); 
                }
                   
                //Give scarves for some
                if (randNum > 0.7 || randNum < 0.3) {
                    //scarf
                    fill(scarfClr);
                    ellipse(17*cols+2, 23*rows+381, 12, 2);
                }
                
            }
        }
    }
    
    //The quidditch hoops!
    quidditchHoop(width/2, 190); //middle Hoop
    quidditchHoop(width/2-100, 300); //left Hoop
    quidditchHoop(width/2+100, 344); //right Hoop

    //add a little bit more blur
    filter(BLUR, 1.1);
    
};

//}

//Harry Potter {

var harryPotter = function() {
    
    var clr = color(28, 1, 1);

    pushMatrix(); //save current coordinate system
    translate(418, 180); //translate to position
    
    //Harry's broom
    broom(164, 45, -3, -1, color(89, 35, 9), color(191, 135, 6),           color(66, 5, 5)); 
    
    noStroke();
    fill(clr);
    pushMatrix(); //save current coordinate system
    rotate(-30); //rotate some
    ellipse(0, 0, 11, 14); //head
    popMatrix(); //revert to previous system
    
    quad(0, 12, 0, 19, -28, 15, -28, 13); //back forearm
    ellipse(-26, 13, 8, 7); //hand in air
    quad(2, 23, 8, 26, -7, 36, -6, 31); //front arm forearm
    ellipse(-7, 34, 8, 7); //hand on broom
    
    pushMatrix(); //save current coordinate system
    translate(15, 19); //translate to pposition
    rotate(-39); //rotate some
    rect(0, 0, 14, 30, 5); //body
    popMatrix(); //revert to previous system
    
    //leg
    quad(9, 47, 30, 34, 29, 25, 16, 29);
    quad(21, 39, 8, 47, 44, 45, 43, 40);
    //shoe
    beginShape();
        vertex(45, 47);
        vertex(30, 47);
        vertex(32, 37);
        vertex(41, 39);
        vertex(51, 39);
        vertex(52, 47);
        vertex(57, 54);
        vertex(52, 52);
    endShape();
    
    //cape thingy (start top of middle of cape, going clockwise)
    beginShape();
        curveVertex(38, 7); 
        curveVertex(44, 8); 
        curveVertex(61, 13); 
        curveVertex(86, 11); 
        curveVertex(104, 15); 
        curveVertex(122, 14); 
        curveVertex(133, 17); 
        curveVertex(141, 17); 
        curveVertex(127, 22); 
        curveVertex(116, 26); 
        curveVertex(101, 24); 
        curveVertex(81, 30); 
        curveVertex(60, 25); 
        curveVertex(33, 25);
        curveVertex(19, 15);
        curveVertex(9, 16);
        curveVertex(10, 5); 
        curveVertex(23, 7);
        curveVertex(33, 7);
        curveVertex(49, 3);
    endShape();
    
    //hair 
    arc(-6, -6.5, 6, 6, -180, 50);
    arc(-4, -9, 9, 8, -141, 6);
    arc(0, -2, 20, 18, -120, 38);
    arc(-1, -18, 17, 16, 53, 95);
    arc(8, -16, 16, 16, 100, 155);
    arc(8, -5, 11, 14, -130, 12);
    arc(7, 0, 12, 12, -100, 36);
    
    stroke(clr);
    strokeWeight(7);
    line(0, 0, 5, 5); //neck
    line(5, 14, 0, 15); //back upper arm
    line(11, 9, 6, 23); //front upper arm
    
    //glasses
    stroke(255, 208, 0);
    strokeWeight(0.5);
    fill(255, 40);
    ellipse(-4, -1, 4, 6); //circle lens
    strokeWeight(0.8);
    //frame of glasses
    line(-1, -2, 3, -4); //line from glasses to ear
    line(3, -4, 5, -3); 
    
    //one more strand of hair (top of glasses)
    noStroke();
    fill(clr);
    arc(-5, -3, 7, 7, -200, -85); 
    
    popMatrix(); //revert back to original coordinate system

};

//}

//Malfoy {

var malfoy = function() {
    
    var clr = color(1, 13, 0);

    pushMatrix(); //save current coordinate system
    translate(176, 181); //translate to position
    
    //Malfoy's broom
    broom(-163, 44, -3, 1, color(20), color(190), color(5)); 
   
    fill(clr);
    noStroke();
    ellipse(0, 0, 12, 14); //head
    
    quad(0, 12, 0, 19, 24, 18, 24, 15); //forearm back
    ellipse(24, 16, -8, 7); //hand in the air
    quad(-2, 23, -8, 26, 7, 36, 6, 31); //front forearm
    ellipse(7, 34, 8, 7); //hand on the broom
    
    pushMatrix(); //save current coordinate system
    translate(-15, 19); //translate to position
    rotate(39); //rotate 39 degrees
    rect(0, 0, 14, 30, 5); //body
    popMatrix(); //revert to original coordinate system
    
    //leg
    quad(-10, 46, -31, 34, -29, 25, -18, 29);
    quad(-21, 39, -10, 46, -44, 45, -41, 40);
    //shoe
    beginShape();
        vertex(-45, 47);
        vertex(-30, 47);
        vertex(-32, 37);
        vertex(-41, 39);
        vertex(-51, 39);
        vertex(-52, 47);
        vertex(-57, 54);
        vertex(-52, 52);
    endShape();
    
    //cape thingy
    beginShape();
        curveVertex(-38, 8); 
        curveVertex(-44, 8); 
        curveVertex(-61, 14); 
        curveVertex(-86, 11); 
        curveVertex(-103, 16); 
        curveVertex(-121, 14); 
        curveVertex(-133, 17); 
        curveVertex(-140, 17); 
        curveVertex(-127, 23); 
        curveVertex(-116, 25); 
        curveVertex(-100, 25); 
        curveVertex(-81, 30); 
        curveVertex(-61, 26); 
        curveVertex(-33, 26); 
        curveVertex(-19, 14);
        curveVertex(-9, 16);
        curveVertex(-10, 5); 
        curveVertex(-23, 7);
        curveVertex(-33, 7); 
        curveVertex(-49, 3); 
    endShape();
    
    stroke(clr);
    strokeWeight(7);
    line(0, 0, -5, 5); //neck
    line(-5, 14, 0, 15); //back upper arm
    line(-11, 9, -6, 23); //front upper arm
    
    //hair
    noStroke();
    fill(224, 216, 130);
    beginShape();
    curveVertex(-2, -9); 
    curveVertex(5, -6); 
    curveVertex(8, 1); 
    curveVertex(-1, -4); 
    curveVertex(-9, 3); 
    curveVertex(-8, -5);
    curveVertex(-2, -9);
    curveVertex(5, -6); 
    curveVertex(9, 1);
    endShape();
    
    popMatrix(); //revert back to original coordinate system

};

//}

//The Snitch {

var snitch = function() {
    
    pushMatrix(); //save current coordinate system
    translate(width/2-2, 190); //translate to position
    scale(0.75, 0.75); //resize just a little bit
    
    //wings
    stroke(0, 50);
    strokeWeight(1);
    fill(212, 205, 165);
    //right wing
    beginShape();
        vertex(25, -9);
        bezierVertex(21, -1, 15, 3, 3, -1);
        bezierVertex(14, -12, 15, -2, 25, -9);
    endShape();
    //left wing
    stroke(0, 80); //more opacity because of light clrd castle
    beginShape();
        vertex(-26, -9);
        bezierVertex(-20, -1, -16, 3, -4, -1);
        bezierVertex(-11, -12, -16, -2, -26, -9);
    endShape();
    
    //snitch
    fill(255, 217, 0);
    strokeWeight(2);
    stroke(48, 33, 2, 90);
    ellipse(0, 0, 10, 10); 
    
    //teeny designs on body of snitch
    noFill();
    strokeWeight(0.5);
    stroke(89, 67, 2);
    arc(3, 4, 3, 6, 190, 263); //bottom right
    arc(-3, 4, 3, 6, -99, 0); //bottom left
    arc(0, -4, 8, 6, 0, 180); //second from top
    arc(0, -5, 6, 4, 0, 180); //top
    
    popMatrix(); //revert back to original coordinate system
    
};

//}

//Image object for Quidditch scene
var quidditchScene = new Image([quidditchSkyAndMtns, 
hogwarts, stands, quidditchCrowdAndHoops, harryPotter, malfoy, snitch]);

/****************************************************/
//Loading the images
/****************************************************/

//to load images, plus display loading
var load = {

    //An array to hold all the Image objects
    images: [firstScene, extremeSportsScene, 
             ancientSportsScene, quidditchScene],
             
    //the image that is currently being loaded
    currLoad: 0
    
};

//a function to load the images, and then change scene to 1
load.loadImages = function() {
        
    //for delay, load next img when frameCt is multple of 11
    //optimization
    if (frameCount % 11 === 0) {
        //loop through functions in drawings array in the img
        for (var i = 0; 
             i < this.images[this.currLoad].drawingsArr.length; 
             i++) {
            //call each function in image's drawings array
            this.images[this.currLoad].drawingsArr[i]();
        }
        //save the image
        this.images[this.currLoad].img = get();
        this.currLoad++; //increment the index 
    }
        
    //after all imgs loaded, change scene to 1 (firstScene)
    if (this.currLoad === this.images.length) {
        scene = 1; //change scene to first scene
    }
            
};

//A simple loading screen to cover what's being loaded
load.loadingScreen = function() {
    
    background(0); // a black background
    //loading message
    fill(255, 60);
    text("Loading", width/2, height/2-20); 
    
    //loop through all images, draw a circle for each
    for (var i = 0; i < this.images.length; i++) {
        //if there is an img loaded in this image object
        if (this.images[i].img) {
            //filled in circle
            fill(255, 60);
            noStroke();
        } else {
            //outline of circle
            stroke(253, 60);
            strokeWeight(2);
            noFill();
        }
        //draw the circle for each image, spaced 30 px apart
        ellipse(i*30+255, height/2+10, 10, 10);
    }
    
};

/****************************************************/
//Arrow Button Object Type and Objects
/****************************************************/

//The object type for the arrow button
var arrowButton = function(x, y, btnType, hideScene) {
    
    this.x = x;
    this.y = y;
    this.btnType = btnType; //Pass in a string, like "<" or ">"
    this.hideScene = hideScene; //scene where button is hidded
    this.alpha = 90; //opacity of the button
    
};

//Display the arrow button
arrowButton.prototype.display = function() {
    //if the button is not hidden
    if (scene !== this.hideScene) {
        //if mouse is over and alpha is under 170
        if (this.isMouseOver() && this.alpha < 170) {
            this.alpha+=10; //fade in 80 to 170
        } else if (this.alpha > 90) {
            this.alpha-=10; //fade out 170 to 90
        }
        //draw the button
        fill(255, this.alpha); 
        textSize(80);
        text(this.btnType, this.x, this.y);
    }
};

//Check whether the mouse is over the arrow button
arrowButton.prototype.isMouseOver = function() {
    //Is mouse near button, and is the button visible?
    return mouseX > this.x-30 &&
           mouseX < this.x+30 &&
           mouseY > this.y-40 &&
           mouseY < this.y+40 &&
           scene !== this.hideScene;
};

//Arrow Button Objects - pass in x, y, buttonType, and hideScene
var leftButton = new arrowButton(30, height/2, "<", 1);
var rightButton = new arrowButton(width-30, height/2, ">", 4);

/****************************************************/
//Info Button Object
/****************************************************/

//InfoButton object
var infoButton = {
    
    //position and size
    x: width-30,
    y: 30,
    size: 35,
    
    //an array of the messages on each scene
    infoTexts: [
        
        "Click this button on the next pages \n to read more about the graphics.", 
        
        "Extreme sports such as skydiving, mountain \n climbing,  hang gliding, and the like are not for \n the faint of heart.  Usually they come with \n exceptionally high risks, which is why \n extreme sports atheletes train for months \n or years and use highly specialized gear. \n An extreme sports athlete performing \n their sport from a great height \n (and surrounded by magnificent scenery) \n is not uncommon.", 
        
        "Some ancient sports, like wrestling, are still \n played today. Others either died along \n with their people, were modified, were deemed \n immoral, or simply fell out of favor. \n The gladiatorial games, for instance, \n involved professional fighters who wounded \n each other in the name of entertainment, \n  though they didn't always fight \n to the death. Most ancient sports \n are no longer played, but their legacies \n still live on in history and legend.",
        
        "Fictional sports, like Quidditch in Harry Potter, \n can be every bit as exciting as the real thing. \n And also just like the real thing, fictional sports \n always come with a hearty helping of morals, \n friendships, practicing, rules, celebrities, \n politics, and rotten conspiracy. Ah yes, \n the sheer number of times we have wished \n to take part in them!"
        
    ],
    
    btnTxt: "i", //symbol on the button
    infoActivated: false, //is the user on the info screen?
    highlightAlpha: 0, //opacity of the highlight
    infoAlpha: 0 //opacity of the background and text
    
};

//A function to display the info button
infoButton.display = function() {
    
    //if the user clicked infoButton and is viewing the message
    if (this.infoActivated) {
        //fade in text and background
        if(this.infoAlpha < 220) {
            this.infoAlpha += 20; //fade in 0 to 220
        }
    } else if (this.infoAlpha !== 0) {
            this.infoAlpha-= 20; //back to 0
    }
    
    //display the info and background if infoAlpha > 0
    if (this.infoAlpha > 0) {
        //background
        noStroke();
        fill(0, this.infoAlpha);
        rect(width/2, height/2, width, height);
        //display txt from array, index depends on what scene is
        fill(255, this.infoAlpha);
        textSize(25);
        text(this.infoTexts[scene-1], width/2, height/2);
    }    
    
    //the button
    fill(240, 60);
    stroke(240, 190);
    strokeWeight(3);
    ellipse(this.x, this.y, this.size, this.size);
    //button label
    fill(240, 190);
    textSize(25);
    //if info activated, symbol is ↩, else it is i
    this.btnTxt = this.infoActivated ? "↩" : "i";
    text(this.btnTxt, this.x, this.y);
    
    //if mouse is over the info button, highlight
    if (this.isMouseOver() && this.highlightAlpha < 110) {
        this.highlightAlpha+=15; //0 to 110 fade in
    } else if (this.highlightAlpha > 0) {
        this.highlightAlpha-=15; //bring back to 0 if it is pos
    }
    
    //if the mouse is over and highlightAlpha is therefore > 0
    if (this.highlightAlpha > 0) {
        //draw a transparent white ellipse over the button
        noStroke();
        fill(255, this.highlightAlpha);
        ellipse(this.x, this.y, this.size, this.size);
    }
    
};

//Returns true whenever mouse is over the info button
infoButton.isMouseOver = function() {
    //Is distance from mouse and button less than radius of btn?
    return dist(mouseX, mouseY, this.x, this.y) < this.size/2;
};

/****************************************************/
//Custom Sports Cursor
/****************************************************/

var sportsCursor = function() {
    
    var trophyClr, outlineClr;
    //clr of trophy, of stroke
    
    pushMatrix(); //push current coordinate system to stack
    translate(mouseX, mouseY); //translate to position
    
    cursor("NONE"); //begone, cursor!
    strokeWeight(1);
    
    //cursor arrow, choosing colors
    //If mouse is pressed
    if (mouseIsPressed) {
        trophyClr = color(255); //white cursor
        outlineClr = color(0); //black outline
    } else if (infoButton.isMouseOver() || 
               leftButton.isMouseOver() || 
               rightButton.isMouseOver()) {
        //if the mouse is over one of the buttons
        trophyClr = color(150); //gray cursor
        outlineClr = color(255); //white outline
    } else {
        trophyClr = color(0); //black cursor
        outlineClr = color(255); //white outline
     }
     
    //draw the cursor arrow
    fill(trophyClr);
    stroke(outlineClr);
    triangle(0, 0, 8, 0, 0, 8);
    
    //trophy, choosing colors
    //if the viewer is reading info
    if (infoButton.infoActivated) {
        trophyClr = color(255); //white trophy
        outlineClr = color(0); //black outline
    } else {
        trophyClr = color(0); //black trophy
        outlineClr = color(255); //white outline
    }
    
    //draw trophy handle outline
    stroke(outlineClr);
    ellipse(11, 11, 15, 8);
    
    //draw the trophy cup
    fill(trophyClr);
    stroke(outlineClr);
    beginShape(); //using begin and end to close the arc
        arc(11, 6, 11, 20, 0, 180); //cup
    endShape(CLOSE);
    
    //trophy base
    beginShape();
        vertex(9, 15);
        vertex(9, 17); 
        vertex(7, 17); //top left of base
        vertex(6, 20.5); //bottom left of base
        vertex(16, 20.5); //bottom right of base
        vertex(15, 17); //top right of base
        vertex(13, 17);
        vertex(13, 15);
    endShape();
    
    //trophy handles
    noFill();
    stroke(trophyClr);
    strokeWeight(0.8);
    ellipse(11, 11, 12.5, 6); //handles
    
    popMatrix();
    
};

/****************************************************/
//Draw and MouseClicked Functions
/****************************************************/

draw = function() {
    
    //switch between the scenes
    switch (scene) {
        //loading
        case 0:
            load.loadImages(); //load the images
            load.loadingScreen(); //display loading screen
            break;
        //slides (main program)
        case 1:
            image(firstScene.img, 0, 0); //first scene
            break;
        case 2:
            image(extremeSportsScene.img, 0, 0); //extreme sports
            break;
        case 3:
            image(ancientSportsScene.img, 0, 0); //ancient sports
            break;
        case 4: 
            image(quidditchScene.img, 0, 0); //Quidditch
            break;
    }
    
    //if loading is done (scene is not 0)
    if (scene > 0) {
        
        //Draw the next buttons and info button
        leftButton.display();
        rightButton.display();
        infoButton.display();
        
        //display the sports cursor
        sportsCursor();
        
    }
    
};

mouseClicked = function() {
    
    //If the mouse is over the infoButton
    if (infoButton.isMouseOver()) {
        //Turn infoActivated from false to true, or vice versa
        infoButton.infoActivated = !infoButton.infoActivated;
    }
    
    //If the user is not viewing info
    if (!infoButton.infoActivated) {
        //And if mouse is over left button
        if (leftButton.isMouseOver()) {
            //decrease scene by 1
            scene--;
        } else if (rightButton.isMouseOver()) {
            //if over right button, increase scene by 1
            scene++;
        }
    }
    
};
