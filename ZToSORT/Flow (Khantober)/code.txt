/*This is my bad attempt to relearn Natural Simulations*/
/*Drag your mouse to add particles. It will slow down if you do it
  too much, however*/

/*Stores all the colors*/
var clrs = {
    water1: color(24, 0, 84),
    water2: color(0, 111, 255),
    night1: color(17, 0, 38),
    night2: color(71, 0, 84),
    light1: color(255, 255, 10), 
    light2: color(255, 128, 0), 
    white: color(255),
    black: color(0)
};
/*"size" of the "brush"*/
var range = 30;
/*strokeWeight of each particle*/
var scl = 5;
/*Length of trail*/
var trailRange = {min: 100, max: 350};

/*Choose the color of the particle according to its position
Change the conditions and colors to what ever you want*/
function mapColor(x, y) {
    var clr;
    /*Pick a color according to position and randomness*/
    if (random(1) > 0.05) {
        if (y >= height*0.55) {
            /*water colors*/
            clr = lerpColor(clrs.water1, clrs.water2, random(1));
        } else {
            /*Sky colors*/
            clr = lerpColor(clrs.night1, clrs.night2, random(1));
        }
    } else {
        /*random strokes of light mixed in between*/
        clr = lerpColor(clrs.light1, clrs.light2, random(1));
    }
    /*Darker outside of a circle*/
    if (dist(x, y, width/2, height/2) > 200) {
        clr = lerpColor(clr, clrs.black, 0.4);
    }
    /*Return the color of the particle*/
    return clr;
}

/*Noise Field*/
var flowField = flowField || (function() {
    /*1D array of directions for each coordinate*/
    var array = [];
    /*For perlin noise*/
    var xOff = 1000;
    var yOff = 100;
    var dir, x, y;
    /*Loop through all pixels*/
    for (x = 0; x <= width; x++) {
        for (y = 0; y <= height; y++) {
            /*A direction according to angle according to noise*/
            dir = PVector.fromAngle(noise(xOff, yOff) * 360);
            array.push(dir);
            yOff+=0.00001;
        }
        xOff+=0.00001;
    }
    /*Return the array created*/
    return array;
})();

/*Particles*/
function Particle(x, y, clr) {
    /*The position vector*/
    var vec = new PVector(x, y);
    /*Return object with function that uses its properties*/
    return {
        pos: vec,
        /*The farther right, the longer the trail*/
        maxSteps: map(vec.x, 0, width, trailRange.min, trailRange.max),
        currStep: 0,
        clr: clr,
        run: function() {
            /*DRAW*/
            /*Map opacity and strokeWeight according to step number*/
            stroke(this.clr, map(this.currStep, 0, this.maxSteps, 15, 0));
            strokeWeight(map(this.currStep, 0, this.maxSteps, scl, 0));
            point(this.pos.x, this.pos.y); /*draw a point :D*/
            /*UPDATE*/
            /*The index in 1D flow field array is found by adding x pixls + 
              y*num pixls in each row*/
            var dir = flowField[round(this.pos.x+this.pos.y*width)];
            /*Add direction*/
            this.pos.add(dir);
            /*Since the field tends to go left
              the right side would look empty if we
              didn't teleport to right*/
            if (this.pos.x < 0) {
                this.pos.x = width;
            }
            /*Increment step - eventually it "dies" (reaches maxSteps)*/
            this.currStep++;
        }
    };
}
var particles = []; /*Will hold all particles*/

/*A function to automatically add particles*/
function nextParticles(range) {
    /*Pick a random pos*/
    var x = random(width);
    var y = random(height);
    var clr, newX, newY;
    for (var i = 0; i < scl; i++) {
        /*Add a random amt to position - centered around pos*/
        newY = constrain(y + random(-range, range), 0, height);
        newX = constrain(x + random(-range, range), 0, width);
        /*Get clr according to pos*/
        clr = mapColor(newX, newY);
        particles.push(Particle(newX, newY, clr));
    }
}
/*A function to add particles when user drags mouse*/
function addMouseParticles() {
    var x, y;
    for (var i = 0; i < scl*2; i++) {
        /*Find x and y of particle, centered around mouse pos*/
        x = constrain(mouseX + random(-range/2, range/2), 0, width);
        y = constrain(mouseY + random(-range/2, range/2), 0, height);
        /*Push new particle*/
        particles.push(Particle(x, y,
                                lerpColor(clrs.white, mapColor(x, y), 
                                          random(0.5, 1))));
    }
} 

/*Draw*/
background(0);
draw = function() {
    /*Loop through particles*/
    for (var i = particles.length-1; i > 0; i--) {
        var p = particles[i];
        /*display and update particle*/
        try {
            p.run();
        } catch (err) {
            println("Error: Particle at " + p.pos);
        }
        /*If particle not visible or current step 
          has become greater than the maxSteps that the 
          particle must take*/
        if (p.currStep > p.maxSteps || p.pos.x > width ||
            p.pos.y < 0 || p.pos.y > height) {
            /*Splice from particles array*/
            particles.splice(i, 1);
        }
    }
    /*Automatically add particles*/
    if (particles.length < scl*500) {
        nextParticles(range);
    }
};

/*mouse interaction*/
mouseDragged = function() {
    addMouseParticles();
};
