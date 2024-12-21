//I did this along with the KA tutorial on gravitational attraction & mutual attraction.
//Learned circle-circle intersection  from https://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769

/**
 * Click to summon objects!
 * Each object is attracted to one another.
 * Click the background button to turn the background on and off.
 * Click the button on the bottom right to toggle Attract/Repel.
 * Click the reset button to clear the canvas.
 * Backgroud:OFF = the objects draw their paths and are shown as points.
 * Background:ON = object sizes are shown according to mass and object paths aren't drawn.
**/

var backgroundOn = backgroundOn || true;
var G = 1;
var velocityLimit = 10;
imageMode(CENTER);

background(0, 0, 0);

var Mover = function(x, y, mass) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.mass = mass;
    this.radius = mass*2;
};

Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(velocityLimit);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    if (backgroundOn) {
        fill(255, 255, 255, 100);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
    } else if (!backgroundOn) {
        fill(255, 255, 255, 90);
        ellipse(this.position.x, this.position.y, 2, 2);
    }
    
};

Mover.prototype.applyForce = function(force) {
    var f = force.get();
    f.div(this.mass);
    this.acceleration.add(f);
};

Mover.prototype.calcAttraction = function(m) {
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    var strength = (G * this.mass * m.mass) / (distance*distance);
    force.mult(strength);
    m.applyForce(force);
};

Mover.prototype.checkCollision = function(m) {
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    return distance < this.radius + m.radius;
};

Mover.prototype.collide = function(m) {
    if (this.checkCollision(m) && backgroundOn) {
        
        var collisionX = (this.position.x*m.radius + m.position.x*this.radius) / (this.radius + m.radius);
        var collisionY = (this.position.y*m.radius + m.position.y * this.radius) / (this.radius + m.radius);

        image(getImage("space/star"), collisionX, collisionY, 25, 25);
        
    }
};

var backgroundMessage = "ON";
var gButtonMessage = "Attract";

var movers = [];
mousePressed = function() {
    if (mouseX > 0 && mouseX < 130 && mouseY > height-40 && mouseY < height) {
        if (!backgroundOn) {
            backgroundOn = true;
        } else if (backgroundMessage) {
            fill(0, 0, 0);
            rect(0, 0, width, height);
            backgroundOn = false;
        }
    } else if (mouseX > 310 && mouseX < width && mouseY > height-40 && mouseY < height){
        G*=-1;
    } else if (mouseX > 130 && mouseX < 130+83 && mouseY > height-40 && mouseY < height) {
        movers = [];
        background(0);
    } else {
        movers.push(new Mover(mouseX, mouseY, random(3,6)));
    }
};

draw = function() {
    if (backgroundOn) {
        background(0, 0, 0);
    }
    
    for (var i = 0; i < movers.length; i++) {
        for (var j = 0; j < movers.length; j++) {
            if (i !== j) {
                movers[i].calcAttraction(movers[j]);
            }
        }
    }
    
    for (var i = 0; i < movers.length; i++) {
        movers[i].update();
        movers[i].display();
    }
    
    for (var i = 0; i < movers.length; i++) {
        for (var j = 0; j < movers.length; j++) {
            if (i !== j) {
                movers[i].collide(movers[j]);
            }
        }
    }

    if (backgroundOn) {
        fill(79, 79, 79);
        backgroundMessage = "ON";
    } else {
        fill(61, 61, 61);
        backgroundMessage = "OFF";
    }
    
    if (mouseX > 0 && mouseX < 130 && mouseY > height-40 && mouseY < height) {
        fill(92, 92, 92);
    }
    
    noStroke();
    textSize(14);
    rect(0, height-40, 130, 40);
    fill(255, 255, 255);
    text("Background: ", 7, 384);
    text(backgroundMessage, 89, 384);
    
    //attract button
    if (G > 0) {
        fill(79, 79, 79);
        gButtonMessage = "Attract";
    } else if (G < 0) {
        gButtonMessage = "Repel";
        fill(61, 61, 61);
    }
    if (mouseX > 310 && mouseX < width && mouseY > height-40 && mouseY < height) {
        fill(92, 92, 92);
    }
    rect(310, height-40, 90, 40);
    fill(255, 255, 255);
    text(gButtonMessage, 336, 384);
    
    //clear button
    if (mouseX > 130 && mouseX < 130+83 && mouseY > height-40 && mouseY < height) {
        fill(92, 92, 92);
    } else {
        fill(79, 79, 79);
    }
    rect(130, height-40, 83, 40);
    fill(255, 255, 255);
    text("Reset", 153, height-16);
};