/**
    Nickname: Prisha B.
    Current Level: Intermediate
    Competition: Challenge 3 - Cycles of Science
**/

var delag = !true; //adds delay in loading

/*

A brief overview of a star's life cycle according to its mass.
NOT TO SCALE IN ANY WAY. Please notify me about any inaccuracies.

There are so many mind-boggling theories and findings that I haven't included. Better sources if you're interested: 
Khan Academy, TedEd, NASA, Discovery, space.com, Kurzgesagt - In a Nutshell

*/

/**************************************************/
/*SETUP*/
/**************************************************/

var scene = "loading"; //current scene - loading images 
var starSelected; //the mass that you select
var clicked = false;
//Normal distribution
var genX = new Random(1);
var genY = new Random(3);
textFont(createFont("Trebuchet MS")); //text font
textAlign(CENTER, CENTER);//preferred way of positioning text
imageMode(CENTER); //position imgs by center
//so that it's random, but the same random every time
randomSeed(10);

//animate using trig, pass in range and start pt
function animate(range, start) {
    //default if not specified
    range = range || 30; 
    start = start || height/2-30;
    return cos(frameCount*1.5)*range + start;
}

var fade = {
    active: false, //is transitioning happening right now?
    counter: 0, //used for opacity of rect
    goingOut: false, //fading out?
    speed: 8, //speed of fade in and out
    transition: function(nextScene) {
        //if mouse was clicked and fade is not already active
        if (clicked && !fade.active) {
            fade.active = true; //set active to true
            //set the nextScene to the one specified
            fade.nextScene = nextScene;
        }
    },
    display: function() {
        //if fade is active
        if (this.active) {
            //if we're fading in
            if (!this.goingOut) {
                //if the opacity is less than 100%
                if (this.counter < 255) {
                    this.counter += this.speed; //increment
                } else {
                    scene = this.nextScene; //switch scene
                    this.goingOut = true; //we're fading out now
                }
            } else if (this.counter > 0) {
                //if we're going out, and fade rect is not gone
                this.counter -= this.speed;
            } else {
                //everything is done, set this stuff to false
                this.active = false;
                this.goingOut = false;
            }
            //draw a black rect with opacity being this.counter
            noStroke();
            fill(0, this.counter);
            rect(0, 0, width, height);
        }
    }
};

//for loading the images  - create image object
function Img(drawImg) {
    //return an object that has a function to draw the image
    return {draw: drawImg};
}

/**************************************************/
/*IMAGES*/
/**************************************************/

//space cloud function
function cloud(clr, centerX, centerY, siz) {
    fill(clr);
    noStroke();
    //draw many translucent ellipses
    for (var i = 0; i < siz*25; i++) {
        //siz -> standard dev, center -> mean
        //get next values in normal dist
        var x = genX.nextGaussian() * siz + centerX;
        var y = genY. nextGaussian() * siz + centerY;
        ellipse(x, y, 28, 28); //draw at that pos
    }
}

//star function
function star(clr, num, sizeMin, sizeMax, lightSize, bright) {
    pushMatrix(); //save current coordinate system
    translate(width/2, height/2); //translate to center
    strokeWeight(2);
    stroke(clr);
    for (var i = 0; i < num; i++) {
        pushMatrix(); //save previous coordinate system
        rotate(random(0, 360)); //rotate by random degrees
        line(0, 0, random(sizeMin, sizeMax), 0); //a line outwards
        popMatrix(); //revert to previous coordinate system
    }
    //if lightSize and bright were passed into the function
    if (lightSize && bright) {
        noStroke();
        fill(255, bright);
        //ball of light
        for (var i = 0; i < lightSize; i++) {
            ellipse(0, 0, i, i);
        }
    }
    popMatrix(); //revert to original coordinate system
}

//giant star function
function giantStar(layers, sizeRMin, sizeRMax, maxHue) {
    noStroke();
    pushMatrix(); //save current coordinate system
    colorMode(HSB); //switch clr mode to hue, sat, bright
    strokeWeight(2);
    translate(width/2, height/2); //translate to center
    //loop through layers, biggest to smallest
    for (var s = layers+1; s > 0; s--) {
        //around a circle
        for (var r = 0; r < 360; r+=0.5) {
            //map size according to layer plus some random
            var sz = s*random(sizeRMin+s*s, sizeRMax+s*s);
            pushMatrix(); //save current coordinate system
            rotate(r); //rotate that angle
            //map color using size
            stroke(map(sz, 0, 360, maxHue, -20), 255, 255, 240);
            line(0, 0, sz, 0); //draw a line with length sz
            popMatrix(); //revert to previous coordinate system
        }
    }
    colorMode(RGB); //back to default
    popMatrix(); //back to original coordinate system
}

//dwarf star function
function dwarf(clr, siz, starAlpha) {
    //draw a star, pass in color, num, size min and max
    star(color(255, starAlpha), 1000, 80, 120);
    noStroke();
    fill(clr);
    //from size 100 to siz, ball of light
    for (var i = 100; i < siz; i++) {
        ellipse(width/2, height/2, i, i);
    }
}

/******/

var spaceBackground = Img(function() {
    background(8, 0, 26);
    noStroke();
    //clouds from bottom to top
    var a = 6;
    //center
    cloud(color(255, 0, 225, a), width/2, height/2, 178);
    cloud(color(217, 5, 250, a), 550, 50, 168); //top right
    cloud(color(119, 0, 255, a), 50, 50, 158); //top left
    cloud(color(102, 0, 255, a), 550, 550, 138);//btm right
    cloud(color(250, 10, 154, a), 50, 550, 178); //btm left
    //stars 1000 by 5 so maybe ohnoes doesn't pop up?
    for (var i = 0; i < 1000; i++) {
        var s = random(2);
        fill(255, random(100, 200)); //random alpha
        //random pos ellispe
        ellipse(random(width), random(height), s, s);
        ellipse(random(width), random(height), s, s);
        ellipse(random(width), random(height), s, s);
        ellipse(random(width), random(height), s, s);
        ellipse(random(width), random(height), s, s);
    }
});

var titleText = Img(function() {
    //same random every time
    randomSeed(6);
    //off-screen graphics - mask
    var msk = createGraphics(width, height, P2D);
    //draw the mask
    msk.background(0, 0, 0);
    msk.textAlign(CENTER, CENTER);
    msk.textFont(createFont("Trebuchet MS Bold"));
    msk.fill(199, 199, 199);    
    msk.textSize(100);
    msk.text("STELLAR\nEVOLUTION", width/2, height/2);
    //capture the image
    msk = msk.get();
    //thing to be masked - stars
    var stars = createGraphics(width, height, P2D);
    //draw a background of stars
    stars.background(0);
    stars.stroke(255, 210);
    for (var i = 0; i < 3000; i++) {
        //a random point
        stars.strokeWeight(random(2));
        stars.point(random(width), random(190, 400));
    }
    //draw random curved lines everywhere
    randomSeed(2);
    stars.strokeWeight(1);
    stars.stroke(255, 45);
    stars.noFill();
    for (var i = 0; i < 100; i++) {
        stars.ellipse(random(width), random(190,400), 100, 100);
    }
    //capture the image
    stars = stars.get();
    stars.mask(msk); //mask the stars background with text
    image(stars, width/2, height/2); //draw the image
    //click to start text
    textSize(20);
    fill(255, 150);
    text("Click to start", width/2, height/2+150);
});

var nebula = Img(function() {
    //a bunch of clouds, center related to s
    var s = 70;
    cloud(color(224, 252, 245, 5), width/2, height/2, 80);
    cloud(color(82, 250, 205, 3), width/2-s, height/2+s, 70);
    cloud(color(82, 250, 189, 3), width/2+s, height/2-s, 70);
    cloud(color(189, 252, 236, 5), width/2, height/2, 50);
    cloud(color(189, 252, 236, 9), width/2, height/2, 30);
    cloud(color(250, 250, 250, 9), width/2, height/2, 20);
});

var redDwarf = Img(function() {
    dwarf(color(255, 85, 0, 6), 250, 8);
});

var avgMainSequence = Img(function() {
    star(color(252, 222, 114, 80), 1000, 50, 140, 270, 3);
});

var highMainSequence = Img(function() {
    star(color(255, 207, 61, 90), 1500, 40, 170, 330, 2);
});

var vHighMainSequence = Img(function() {
    star(color(255, 161, 61, 90), 3000, 50, 195, 370, 2);
});

var blueDwarf = Img(function() {
    dwarf(color(38, 183, 255, 5), 260, 20);
});

var redGiant = Img(function() {
    giantStar(3, 10, 25, 35); //draw a giant star
    //ball of light
    fill(255, 166, 0, 2);
    noStroke();
    for (var i = 280; i < 420; i++) {
        ellipse(width/2, height/2, i, i);
    }
});

var whiteDwarf = Img(function() {
    dwarf(color(171, 214, 255, 4), 240, 20);
});

var blackDwarf = Img(function() {
    dwarf(color(0, 9), 210, 10);
});

var plNebula = Img(function() {
    //an arc can be away from center at one of these dists
    var dists = [170, 220, 250];
    pushMatrix(); //save current coordinate system
    translate(width/2, height/2); //translate to center
    colorMode(HSB); //color mode hue sat brightness
    strokeWeight(2);
    //go round two times
    for (var i = 0; i < 360*2; i++) {
        pushMatrix(); //save current system
        rotate(i);
        noStroke();
        //back layer
        fill(random(180, 220), 255, 255, 90); //random cool clr
        //draw ellipse at one of the dists
        ellipse(dists[floor(random(dists.length))], random(100),
                70, 10);
        //front layer        
        noFill();
        stroke(random(200, 245), 255, 255, 150); //random cool clr
        //draw arc at one of the dists
        arc(dists[floor(random(dists.length))], 0,
              random(70, 150), random(7),
            -90 + random(-50, 50), 90+random(-50, 50));
        popMatrix(); //revert to previous
    }
    colorMode(RGB); //default system
    //very front layer - yellow orange ellipses
    var clr1 = color(255, 115, 0);
    var clr2 = color(221, 255, 0);
    noStroke();
    for (var i = 0; i < 500; i++) {
        pushMatrix(); //save curr system
        rotate(random(0, 360)); //rotate random angle
        //fill a random clr between the two colors
        fill(lerpColor(clr1, clr2, random(1)), 20);
        //draw the ellipse at a random dist away
        ellipse(random(130,250), 0, random(50,100), random(50));
        popMatrix(); //back to previous
    }
    popMatrix(); //revert to original system
});

var supernova = Img(function() {
    noStroke();
    pushMatrix(); //save curr system
    translate(width/2, height/2); //translate to center
    scale(0.5); //make everything half as big
    fill(255, 237, 173, 1); //a really translucent blue
    //ball of light
    for (var i = 351; i < 750; i+=2) {
        ellipse(0, 0, i, i);
    }
    //two colors for 900 random arcs
    var clr1 = color(252, 236, 63);
    var clr2 = color(252, 95, 63);
    for (var i = 0; i < 900; i++) {
        pushMatrix(); //save curr system
        rotate(random(0, 360)); //rotate random angle
        translate(random(70, 190), 0); //to a rand dist away
        rotate(20); //rotate 20
        //fill a rand color between the two colors
        fill(lerpColor(clr1, clr2, random(1)), 100);
        //an arc with a random size 
        arc(0, 0, random(90, 190), random(5, 12),
            -90 + random(-50, 50), 90+random(-50, 50));
        popMatrix(); //back to previous coordinate system
    }
    //star
    scale(4.5); //make everything a little bigger
    fill(251, 252, 189, 20);
    //rotate 20, 40 ... 360 degrees
    for (var r = 0; r < 360; r+=20) {
        pushMatrix(); //save curr system
        rotate(r); //rotate by r
        //400 thingies
        for (var i = 0; i < 400; i++) {
            //x is dist away from center
            //use normal distribution
            var x = genX.nextGaussian()*20;
            //70 percent chance of
            if (random(1) < 0.7) {
                //a random wide ellipse
                ellipse(x, 0, 1, random(15));
            } else {
                //else, a star thing
                pushMatrix(); //push current system to stack
                translate(x, 0); //translate that dist
                scale(0.6); //make a teeny bit smaller
                //rect using negative radius
                rect(0, 0, 0.1, 0.1, -5);
                popMatrix(); //back to previous
            }
        }
        popMatrix(); //back to previous
    }
    popMatrix(); //back to original system
});

var blackHole = Img(function() {
    pushMatrix(); //save current coordinate system
    translate(width/2, height/2); //to center 
    noStroke();
    //ball of light
    fill(255, 237, 173, 1);
    for (var i = 300; i < 510; i++) {
        ellipse(0, 0, i, i);
    }
    //a wheel thing
    stroke(255);
    strokeWeight(1);
    //rotate by 0, 2 ... 360
    for (var r = 0; r < 360; r+=2) {
        pushMatrix(); //save curr systm
        rotate(r);
        line(0, 0, 65, 0); //a line with length 65
        popMatrix(); //back to previous
    }
    //random ellipses everywhere
    var clr1 = color(255, 98, 0);
    var clr2 = color(251, 255, 0);
    for (var i = 0; i < 600; i++) {
        pushMatrix(); //save curr system
        rotate(random(0, 360)); //rptate random angle
        translate(random(50, 220), 0); //random dist away
        rotate(60); //rotate that by 60
        noStroke();
        //random color between those two colors
        fill(lerpColor(clr1, clr2, random(1)), 35);
        //a random ellipse
        ellipse(0, 0, random(50, 130), random(10, 30));
        //chance of a line pointing out
        if (random(1) > 0.3) {
            stroke(255, random(10, 27));
            strokeWeight(1);
            line(0, 0, 80, 0);
        }
        //chance of a little wittle white dot
        if (random(1) > 0.2) {
            stroke(255, 200);
            strokeWeight(floor(random(-1, 3)));
            point(random(-20, 20), random(-20, 20));
        }
        popMatrix(); //back to previous
    }
    //black part of the black hole
    noStroke();
    fill(0);
    ellipse(0, 0, 50, 50);
    fill(0, 18);
    noStroke();
    for (var s = 20; s < 130; s++) {
        ellipse(0, 0, s, s);
    }
    //more random ellipses on top of the black part
    randomSeed(2);
    noStroke();
    for (var i = 0; i < 49; i++) {
        pushMatrix(); //save curr
        rotate(random(0, 360)); //rotate random angle
        translate(65, 0); //translate 65 units away
        rotate(65); //rotate by 65
        //fill random clr between two clrs 
        fill(lerpColor(clr1, clr2, random(1)), 59);
        ellipse(0, 0, random(70, 119), random(10, 20));
        popMatrix(); //back to previous
    }
    //ring of light
    fill(255, 1);
    for (var s = 140; s < 190; s++) {
        ellipse(0, 0, s, s);
    }
    popMatrix(); //back to original coordinate system
});

var neutronStar = Img(function() {
    var maxD = 150, d; //max dist an arc can be away from center
    pushMatrix(); //save curr system
    translate(width/2, height/2); //to center
    noStroke();
    cloud(color(255, 7), 0, 0, 110); //a white cloud for light
    strokeWeight(3);
    noFill();
    //the 700 random ellipses
    var clr1 = color(255);
    var clr2 = color(0, 80, 171);
    for (var i = 0; i < 800; i++) {
        //woooa - keep picking d until d is within desired range
        do {
            d = abs(genX.nextGaussian()*maxD);
        } while (d > maxD);
        pushMatrix(); //save curr system
        rotate(random(0, 360)); //rotate random amt
        //clr depends on dist away from center
        stroke(lerpColor(clr1, clr2, 
                         map(d, 0, maxD, 0, 1)), 120);
        //draw the thing
        ellipse(d, 0, map(d, 0, maxD, 10, 250), random(5, 40));
        popMatrix(); //back to previous
    }
    //ball of light
    noStroke();
    fill(255, 5);
    for (i = 0; i < 110; i++) {
       ellipse(0, 0, i, i);
    }
    popMatrix(); //back to previous coordinate system
});

/**************************************************/
/*LOADING*/
/**************************************************/

//loading the images
var load = {
    delayAmt: delag ? 25 : 2, //If user set delag to true
    currLoad: 0, //current image being loaded
    //array of images to load
    imgsToLoad: [
        titleText, spaceBackground, nebula, redDwarf, 
        avgMainSequence, highMainSequence, vHighMainSequence,
        blueDwarf, redGiant, whiteDwarf, blackDwarf, plNebula,
        supernova, blackHole, neutronStar
    ], 
    //a function to draw each image, save, then start program
    loadImgs: function() {
        //for delay, load only when frameCount is a multiple
        if (frameCount % this.delayAmt === 0) { 
            if (this.currLoad < this.imgsToLoad.length) {
                background(0, 0); //a transparent background
                //draw Img
                this.imgsToLoad[this.currLoad].draw();
                //capture image
                this.imgsToLoad[this.currLoad].img = get();
                this.currLoad++; //increment load counter 
            } else {
                //all images loaded
                scene = "title"; //switch to start scene
            }
        }
    },
    loadingScreen: function() {
        //loading
        background(0);
        fill(255, 100);
        textSize(20);
        text("Loading...", width/2, height/2);
        //save current coordinate system, translate to center
        pushMatrix();
        translate(width/2, height/2);
        //looop through images 
        for (var i = 0; i < this.imgsToLoad.length; i++) {
            var curr = this.imgsToLoad[i]; //current image
            pushMatrix(); //save previous system
            //rotate according to how many imgs there are
            //and what img its on
            rotate(map(i, 0, this.imgsToLoad.length, 0, 360));
            //if image exists (was loaded)
            if (curr.img) {
                //closed circle
                fill(255, 100);
                noStroke();
            } else {
                //open circle
                stroke(255, 100);
                strokeWeight(3);
                noFill();
            }
            //an ellipse for each image
            ellipse(100, 0, 10, 10);
            popMatrix(); //revert to previous system
        }
        popMatrix(); //revert to original coordinate system
    }
};

/**************************************************/
/*BUTTONS*/
/**************************************************/

//Button object type, pass in object
function Button(config) {
    this.x = config.x;
    this.y = config.y;
    this.textSize = config.textSize || 40;
    //just set text size to find the correct textwidth
    textSize(this.textSize);
    this.action = config.action; //what the button does
    this.label = config.label; //what the button says
    this.w = textWidth(this.label); //width of button
    //label becomes l a b e l, add small space after each char
    this.labelOnHover = ""; 
    for (var i = 0; i < this.label.length; i++) {
        this.labelOnHover += this.label[i] + " ";   
    }
}

Button.prototype.draw = function(btns) {
    textSize(this.textSize);
    //If the mouse is hovering over button
    if (this.isMouseOver()) {
        //l a b e l t e x t
        fill(255, 220);
        text(this.labelOnHover, this.x, this.y);
    } else {
        //label text
        fill(255, 160);
        text(this.label, this.x, this.y);
    }
};

Button.prototype.handleClick = function() {
    //If the mouse is over the button
    if (this.isMouseOver()) {
        //do whatever action the button specifies
        this.action();
    }
};

Button.prototype.isMouseOver = function() {
    textSize(this.textSize);
    //find the height of the button
    var h = textAscent() + textDescent();
    //return whether mouse is over the button (pos by center)
    return mouseX < this.x+this.w/2 && mouseY < this.y+h/2 &&
           mouseX > this.x-this.w/2 && mouseY > this.y-h/2;
};

Button.prototype.run = function() {
    this.draw(); //draw the button
    //handle when mouse is clicked 
    if (clicked) {
        this.handleClick();
    }
};

//define the buttons
var chooseMassBtns = [
    new Button({
        x: width/2,
        y: height/2-50,
        label: "Low-Mass Star",
        action: function() {
            starSelected = "low-mass";
            fade.transition("nebula");
        },
    }),
    new Button({
        x: width/2,
        y: height/2+20,
        label: "Average-Mass Star",
        action: function() {
            starSelected = "avg-mass";
            fade.transition("nebula");
        },
    }),
    new Button({
        x: width/2,
        y: height/2+90,
        label: "High-Mass Star",
        action: function() {
            starSelected = "high-mass";
            fade.transition("nebula");
        },
    }),
    new Button({
        x: width/2,
        y: height/2+160,
        label: "Very High-Mass Star",
        action: function() {
            starSelected = "very-high-mass";
            fade.transition("nebula");
        },
    }),
];

/**************************************************/
/*SCENES*/
/**************************************************/

//all the scenes
var scenes = {
    'loading': function() {
        //load images and draw loading screen
        load.loadImgs();
        load.loadingScreen();
    },
    'title':function() {
        pushMatrix(); //save curr system
        translate(width/2, height/2); //to center
        scale(1.5); //make a little bigger
        rotate(frameCount/15); //rotate according to FCount
        image(spaceBackground.img, 0, 0); //draw s p a c e
        popMatrix(); //back to original coordinate system
        image(titleText.img, width/2, animate(20)); //title
        //check for click to chooseStar scene
        fade.transition("chooseStar"); 
    },
    'chooseStar': function() {
        pushMatrix(); //save curr system
        translate(width/2, height/2); //to center
        scale(1.5); //make a little bigger
        rotate(frameCount/15); //rotate according to frameCount
        image(spaceBackground.img, 0, 0); //space background
        popMatrix(); //back to previous
        //choose a star title
        textSize(70);
        fill(255, 190);
        text("CHOOSE A STAR", width/2, 150);
        //run all the buttons
        for (var i = 0; i < chooseMassBtns.length; i++) {
            chooseMassBtns[i].run();
        }
    },
    'nebula': function() {
        //nebula floating up and down
        image(nebula.img, width/2, animate());
        //a nice caption
        this.caption("From this nebula, consisting of clouds of interstellar gas and\nthe remnants of ancient stars, a protostar is born\nfrom the influences of gravity.");
        //check for click to mainSequence scene
        fade.transition("mainSequence");
    },
    'mainSequence': function() {
        //construct caption
        var msg = "When nucleosynthesis first occurs, the star enters the main\nsequence. Huge amounts of energy are released in the fusion of\nhydrogen atoms into helium atoms. ";
        //draw image according to what star is picked
        if (starSelected === "low-mass") {
            //add to message
            msg+="Red dwarfs are the tiniest,\ncoolest, and faintest star type in this stage. The lifespan of these low-mass\nstars is thought to be far longer than the expected age of the universe.";
            //red dwarf image
            image(redDwarf.img, width/2, animate());
            //check for click to change scene
            fade.transition("blueDwarf");
        } else {
            //starSelected is not low-mass, next scene is giant
            fade.transition("giant");
             //draw image according to what star is picked
            if (starSelected === "avg-mass") {
                image(avgMainSequence.img, width/2, animate());
            } else if (starSelected === "high-mass") {
                image(highMainSequence.img, width/2, animate());
            } else if (starSelected === "very-high-mass") {
                image(vHighMainSequence.img, width/2,animate());
            }
        }
        this.caption(msg); //draw caption
    },
    'blueDwarf': function() {
        //floating blue dwarf
        image(blueDwarf.img, width/2, animate());
        this.caption("After the red dwarf has exhausted much of its\n hydrogen fuel supply, it is thought to become a blue dwarf.\nHowever, this is only theoretical, since the time necessary\n to test this prediction is longer than the current age of the universe.");
        //check for click to go to whiteDwarf
        fade.transition("whiteDwarf");
    },
    'giant': function() {
        //construct caption
        var msg = "When the hydrogen in its core runs out, the star swells--"; 
        pushMatrix(); //save curr coordinate system
        //translate to center, float up and down
        translate(width/2, animate());
        if (starSelected === "avg-mass") {
            //add to msg
            msg+="\nstars with average mass, like our sun, become red giants.";
            //next scene is...planetary nebula!
            fade.transition("planetaryNebula");
        } else {
            //star is high-mass or very-high-mass
            msg+="\nhigher-mass stars become super red giants.";
            if (starSelected === "very-high-mass") {
                scale(1.6); //biggest
            } else if (starSelected === "high-mass") {
                scale(1.4); //bigger
            }
            //next scene should be supernova
            fade.transition("supernova");
        }
        image(redGiant.img, 0, 0); //draw red giant
        popMatrix(); //back to original system
        //add a little more to message
        msg+="\nIn this stage, these stars fuse together heavier\nand heavier elements to keep alight.";
        this.caption(msg, width/2); //draw msg
    },
    'whiteDwarf': function() {
        //draw a floating white dwarf
        image(whiteDwarf.img, width/2, animate());
        if (starSelected === "low-mass") {
            //low mass caption, next scene blackDwarf
            this.caption("Eventually, when the star exhausts all its fuel, it may become\na white dwarf, a remnant of the star's core. White dwarfs\nare extremely dense and typically the size of a planet.");
            fade.transition("blackDwarf");
        } else if (starSelected === "avg-mass") {
            //avg mass caption, next scene is choose star
            this.caption("A white dwarf is the remnant of the core of the star, which has\nnow exhausted all its fuel. White dwarfs are extremely dense\nand typically the size of a planet. Perhaps some of the gases that the\nstar had shed will find their way to a star-forming nebula.\nThere is also a chance that, if it were to take on enough mass, it would\nexplode in a supernova--and perhaps also become part of another nebula.");
            fade.transition("chooseStar");
        }
    },
    'blackDwarf': function() {
        //floating black dwarf img, next scene is chooseStar
        image(blackDwarf.img, width/2, animate());
        this.caption("When the white dwarf has cooled so much over much time that it no longer\nemits heat or light, astronomers theorize it would become what is\nknown as a black dwarf. It would be composed of elements that\nthe star couldn't fuse any further. Perhaps some of the matter from its billion\nyears of life would find its way to a star-forming nebula."); 
        fade.transition("chooseStar");
    },
    'planetaryNebula': function() {
        //floating white dwarf and planetary nebula
        image(whiteDwarf.img, width/2, animate());
        image(plNebula.img, width/2, animate());
        //caption for this scene, next scene is white dwarf
        this.caption("Eventually the dying star will shed its outer layers of gas, leaving\n behind a planetary nebula--a type of emission nebula--\nand the remaining core.");
        fade.transition("whiteDwarf");
    },
    'supernova': function() {
        pushMatrix(); //save curr coordinate system
        //to center, float a little bit
        translate(width/2, animate());
        scale(2); //make a little bigger
        rotate(frameCount/5); //rotate img by frame count / 5
        //high-mass - next scene is neutron star
        if (starSelected === "high-mass") {
            fade.transition("neutronStar");
        } else if (starSelected === "very-high-mass") {
            //make even bigger, next scene is blackHole
            fade.transition("blackHole");
            scale(1.1);
        }
        image(supernova.img, 0, 0); //draw the img
        popMatrix(); //back to original system
        this.caption("Gravity will eventually cause the star to spontaneously collapse, creating\nshock waves that cause the magnificent supernova. These blasts produce\nmuch of the heavy elements of the universe, including iron. So you\nare made of actual stardust! These and most of the star's\nmass are ejected into space at colossal speeds, perhaps finding\ntheir way to another star-forming nebula.");
    },
    'blackHole': function() {
        pushMatrix(); //save curr coordinate system
        //translate to center, float up and down a little
        translate(width/2, animate());
        rotate(frameCount/5); //rotate img by frameCount / 5
        pushMatrix(); //save curr coordinate system again
        scale(0.7); //make a teensy bit smaller
        image(plNebula.img, 0, 0); //reuse planetary nebula :D
        popMatrix(); //revert to previous
        image(blackHole.img, 0, 0); //draw The Black Hole
        popMatrix(); //revert to original coordinate system
        this.caption("If the leftover core is so massive that it is engulfed by its own gravity, something\nphenomenal will form: a black hole. Its gravity is so strong that not even\nelectromagnetic radition can escape. Why? It is a tremendous amount of\n matter packed into a monstrously tiny space, greatly deforming spacetime.\nIn fact, the closer you are to a black hole, the slower time passes by.");
        //next scene is start - chooseStar
        fade.transition("chooseStar");
    },
    'neutronStar': function() {
        //draw floating neutron star
        image(neutronStar.img, width/2, animate());
        this.caption("If star isn't massive enough to produce a black hole, it will become a\ncity-sized neutron star, formed when the leftover core collapses. It is so dense\nthat protons and electrons combine to form neutrons, and a\nsingle teaspoon of it would weigh millions of tons. There\nare different types, as well. Pulsars are spinning neutron stars\nthat emit a narrow beam of radiation, and magnetars' magnetic fields\nare powerful enough to distort the shapes of atoms.");
        //next scene is chooseStar
        fade.transition("chooseStar");
    },
};

//function to display caption, pass in caption string 
scenes.caption = function(msg) {
    fill(255, 190);
    textSize(16);
    text(msg, width/2, height-75);
};

/**DRAW FUNCTION**/
draw = function() {
    //as long as images are loaded, draw space background
    if (scene !== "loading") {
        image(spaceBackground.img, width/2, height/2);
    }
    //call the appropriate scene function
    scenes[scene]();
    //display fade in, fade out if active
    fade.display();
    //If mouse clicked this frame, set to false
    if (clicked) {clicked = false;}
};

/**MOUSE CLICKY FUNCTION**/
mouseClicked = function() {
    clicked = true; //set clicked to true
};