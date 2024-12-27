/**
    Nickname: Prisha B.
    Current Bracket: Intermediate
    Current Competition: Challenge 1 - Gears, Animations, and Simulations
**/

//Clicky

//Credits: 
//Memoizing images method from Evan Lewis's Music Contest Page

//I didn't have that much time this week. This was the best idea I had.

//setup {
var started = false; //did user click?
var transitioning = false; //CAN user click? true=program is happening, false=idle
(function() {
    textAlign(CENTER); //I prefer to position text from center
    textFont(createFont("serif")); //set font for Z's
    rectMode(CENTER); //I prefer to position rectangles like this (might not need)
    randomSeed(195); //so that there is random, but it's the same random every time
})();
//}

//Particle object type (for zs and magic) {

//Constructer
var Particle = function(pos, vel) {
    this.pos = pos; //position of particle
    this.vel = vel; //velocity of particle
    this.timeToLive = 190; //time to live, also used as alpha
};

//Update position
Particle.prototype.update = function() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
};

//Returns true if the particle is dead
Particle.prototype.isDead = function() {
    return this.timeToLive < 0;
};

//}

var nightSetting = {
    x: 0,
    moonSize: 74,
    run: function() { 
        //if an image doesn't exist yet
        if (!this.img) {
            
            //for generating random craters - use nextGuassian
            var crtr = {x: new Random(43), y: new Random(15), s: new Random(16)}, nextPos;

            //sky and stars
            this.img = createGraphics(width, height, P2D); //off-screen graphics buffer
            this.img.background(71, 12, 158); //purple background
            //texture - draws 10000 lines
            this.img.stroke(200, 4);
            for (var i = 0; i < 10000; i++) {
                this.img.line(random(width), random(height), 
                              random(width), random(height));
            }
            //stars
            nightSetting.img.fill(255, 255, 255);
            for (var i = 0; i < 139; i++) {
                var s = random(-1, -6);
                //using negative radius makes it rect look like a star
                this.img.rect(random(width), random(height), 0.05, 0.05, s);
            }
            
            //moon
            this.img.translate(338, 66); //translate to moon position
            //main circle - outer
            this.img.stroke(107, 107, 107);
            this.img.strokeWeight(2);
            this.img.fill(208, 217, 222);
            this.img.ellipse(0, 0, this.moonSize, this.moonSize);
            //inner circle - lighting
            this.img.fill(254,254,254);
            this.img.noStroke();
            this.img.ellipse(-1, -1, this.moonSize*0.87, this.moonSize*0.87);
            //light around moon
            this.img.fill(255, 255, 255, 6); //only a little opacity
            //draw an ellipse, increment i by 1, repeat
            for (var i = 0; i < this.moonSize*1.5; i++) {
                this.img.ellipse(0, 0, i, i); 
            }
            //moon craters
            for (var i = 0; i < 7; i++) {
                //pick the next x, y, and size
                //adding changes the mean, multiplying changes the standard deviation
                nextPos = {
                    x: crtr.x.nextGaussian()*this.moonSize/5.9 + 1,
                    y: crtr.y.nextGaussian()*this.moonSize/6,
                    s: crtr.s.nextGaussian()*this.moonSize/30 + 6
                };
                //shading of crater
                this.img.fill(203, 206, 207);
                this.img.ellipse(nextPos.x-1, nextPos.y-1, nextPos.s, nextPos.s);
                //the crater itself
                this.img.fill(232,236,239);
                this.img.ellipse(nextPos.x, nextPos.y, nextPos.s, nextPos.s);
            }
            this.img = this.img.get(); //capture the image
            
        } else {
            image(this.img, this.x, 0); //if image exists, draw image
        }
    }
};

var daySetting = {
    x: -width,
    run: function() {
        //if image does not exist yet
        if (!this.img) {
            this.img = createGraphics(width, height, P2D); //off-screen graphics buffer
            //background
            this.img.background(0, 166, 255); //a nice blue sky
            //texture - random lines
            this.img.stroke(255, 5);
            for (var i = 0; i < 10000; i++) {
                this.img.line(random(this.img.width), random(this.img.height), 
                              random(this.img.width), random(this.img.height));
            }
            //sun
            this.img.fill(255, 221, 0, 10); //almost transparent yellow
            //from radius 0 to 110
            for (var i = 0; i <= 110; i++) {
                this.img.ellipse(338, 66, i, i);
            }
            //clouds
            randomSeed(12); //so that it's the same random every time
            this.img.noStroke();
            this.img.fill(255, 180);
            for (var y = 10; y < height; y+=36) {
                //a random rect, with radius 9
                this.img.rect(random(-10, this.img.width-60), y, random(48, 80), 18, 9);
            }
            this.img = this.img.get(); //capture/save the image
        } else {
            image(this.img, this.x, 0); //if image exists, draw image
        }
    }
};

var zozo = {
    x: width/2,
    y: height/2-60,
    startY: height/2-60,
    s: 1, //size
    activated: false, //has she woken up?
    moving: true, //is she moving?
    counter: 0, //for "timer"
    frameCounter: 0, //timer when moving
    delayAmt: 100, //what does timer have to reach in order for something to occur
    clrs: {main: color(242, 210), outline: color(0, 185)},
    eyes: {h: 4, maxH: 14, startH: 4}, //height of eyes
    m: {size: 7, startSize: 7, x: width/2}, //mouth
    halfZozo: function(scaleX) {
        //draw half of Zozo   
        pushMatrix(); //save current coordinate system
        translate(this.x, this.y); //translate to Zozo's pos
        scale(scaleX, 1); //scale x by 1 and -1 for symmetry
        //1/2 of body
        stroke(this.clrs.outline); 
        strokeWeight(3);
        fill(this.clrs.main);
        beginShape();
            vertex(0, 0);
            bezierVertex(-50, 0, -48, 60, -47, 60);
            bezierVertex(-50, 120, -70, 120, -70, 120);
            bezierVertex(-50, 120, -70, 132, -45, 132);
            bezierVertex(-30, 132, -50, 144, -16, 138);
            bezierVertex(-10, 144, 0, 144, 0, 145);
        endShape();
        noStroke();
        //eye on one side
        fill(this.clrs.outline);
        ellipse(-18, 45, 18, this.eyes.h);
        popMatrix(); //revert to original coordinate system
    },
    draw: function() {
        this.halfZozo(1); //left half
        this.halfZozo(-1); //right half
        ellipse(this.m.x, this.y+55, this.m.size, this.m.size); //mouth
    },
    update: function() { 
        this.m.size = 12 - cos(this.frameCounter)*5; //update mouth size, 12 + (-5 to 5)
        this.y = this.startY + cos(this.frameCounter) * 20; //update y, 140 + (-20 to 20)
        //if zozo is moving, increment the frameCounter, passed into trig functions 
        if (this.moving) {
            this.frameCounter++;
        }
    },
    run: function() {
        this.update(); //move up and down
        this.draw(); //draw zozo at pos
        //if zozo is currently moving
        if (this.moving) {
            this.zSystem.run(); //run zzzz
        }
        //to change the day to night, if user clicked
        this.changeTime();
    }
};

zozo.changeTime = function() {
    // the most disgusting if statement you ever did see
    //if zozo is asleep, but user clicked
    if (!this.activated && transitioning) {
        if (daySetting.x < 0) { //if daysetting not fully visible
            daySetting.x++; //increment daySetting.x
        } else if (this.counter > this.delayAmt) { //if counter timer reached delayAmy
            this.zSystem.particles = []; //clear zzzs
            this.activated = true; //zozo is awake! watch out!
            this.moving = false; //zozo is not moving when she's awake
            this.counter = 0; //set timer back to 0
        } else {
            this.counter++; //increment timer
        }
    } else if (this.activated) { //if zozo is awake
        //if day setting is not gone yet
        if (daySetting.x >= -width) { 
            if (this.counter > this.delayAmt/2) { //if timer counter reached delayAmt/2
                if (this.eyes.h < this.eyes.maxH) {
                    this.eyes.h+=0.3; //open eyes until maxH
                } else {
                    zozo.magicBurst.run(); //magic burst after eyes are open!
                    zozo.magicBurst.running = true; //tell zSystem to not create particles
                    //wait a bit
                    if (this.counter > this.delayAmt) {
                        daySetting.x--; //daySetting moves to the left out of sight
                    } else {
                        this.counter++; //else increment the counter
                    }
                }
            } else {
                this.counter++; //increment timer
            }
        } else {
            //day is gone
            zozo.magicBurst.running = false; //no more magic burst
            this.activated = false; //zozo will fall back into sleep
            transitioning = false; //user can click again to turn transitioning back on
        }
    } else if (this.eyes.h > this.eyes.startH) { //if eyes still open, but zozo is asleep
        //wait a bit
        if (this.counter > this.delayAmt) {
            this.eyes.h-=0.1; //close eyes
        } else {
            this.counter++; //increment timer
        }
    } else if (!this.moving) { //after eyes are closed, if zozo is not moving
        //wait a bit
        if (this.counter > this.delayAmt) {
            this.moving = true; //zozo is sleep hovering again
            this.counter = 0; //set timer back to 0
        } else {
            this.counter++; //increment counter
        }
    }
};

zozo.zSystem = {
    particles: [], //stores all zzzs
    update: function() {
        //loop through particles
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update(); //update each particle
        }
    },
    addParticles: function() {
        //push new particles to the array
        this.particles.push(new Particle({x: zozo.m.x, y: zozo.y+55}, 
                                         {x: random(0, 0.5), y: -1}));
    },
    draw: function() {
        var p;
        //loop through particles
        for (var i = this.particles.length-1; i > 0; i--) {
            p = this.particles[i]; //the current particle
            if (!p.isDead()) { //as long as timeToLive > 0
                textSize(20);
                fill(255, p.timeToLive); //use timeToLive as opacity
                text("z", p.pos.x, p.pos.y); //draw a z at pos
                p.timeToLive--; //fade
            } else {
                this.particles.splice(i, 1); //if p dead, then splice from array
            }
        }
    },
    run: function() {
        if (frameCount % 100 === 0 || frameCount % 70 === 0) {
            this.addParticles(); //add particles if frameCount is a multiple of 100 or 70
        }
        this.update(); //update pos of particles
        this.draw(); //draw particles
    }
};

zozo.magicBurst = {
    particles: [], //particles array
    running: false, //is system currently being shown?
    update: function() {
        //loop through particles
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update(); //update each particle
        }
    },
    addParticles: function() {
        for (var i = 0; i < 1300; i++) {
            //push a new particle to particles array many times
            this.particles.push(new Particle({x: zozo.m.x, y: zozo.y+20}, 
                                             {x: random(-20, 20), y: random(-20, 20)}));
        }
    },
    draw: function() {
        var p, clr;
        //loop through particles
        for (var i = this.particles.length-1; i >= 0; i--) {
            p = this.particles[i]; //current particle
            if (!p.isDead()) {
                //if p is not dead yet (timeToLive is pos)
                noStroke();
                //pick a random num
                if (random(1) < 0.5) {
                    fill(255, 247, 138, p.timeToLive); //fill yellow
                } else {
                    fill(255, 196, 0, p.timeToLive); //fill white
                }
                ellipse(p.pos.x, p.pos.y, 4, 4); //draw particle
                p.timeToLive--; //decrease opacity
            } else {
                //if opacity <= 0, splice from array
                this.particles.splice(i, 1);
            }
        }
    },
    run: function() {
        //if this is not running but the particles length is 0
        if (this.particles.length === 0 && !this.running) {
            this.addParticles(); //add new particles
        }
        this.update(); //update each particle's pos
        this.draw(); //draw each particle
    }
};

draw = function() {
    //if night is visible, display
    if (daySetting.x <= 0) {
        nightSetting.run();
    }
    //if program in progress, that means daySetting can be seen, so display
    if (transitioning) {
        daySetting.run();
    }
    zozo.run();
};

mouseClicked = function() {
    //as long as transitioning is false (program is not in progress)
    if (!transitioning) {
        transitioning = true; //start program
    }
};
