//Note: I did this along with the KA tutorial on Vectors/Newton's Laws
//Any tips would be greatly appreciated.

/******************************************************************************************
 * Click the screen to add more bouncy balls.
 * Use arrow keys to control the wind.
 * Each bouncy ball has a random color and radius.
 * The greater the radius, the greater the mass.
 * There are three forces impacting the balls which can be changed below.
 * They'll float in midair if the vertical wind and gravity forces cancel out.
*******************************************************************************************/

//Change this to true to make the wind become zero when key is released.
var becomeZeroWhenNotPressed = false;

/***************************************************************
 * FORCES - change these to alter gravity, wind, and friction
****************************************************************/
//Gravity
var gravityValue = 0.2; //strength of gravity (negative makes things float up)
//Wind
var windXLimit = 1; //Limit to how strong horizontal wind can get.
var windYLimit = 1; //Limit to how strong vertical wind can get.
//How much is added to wind if left/right pressed
var addWindX = windXLimit/10; 
//How much is added to wind if up/down pressed
var addWindY = windYLimit/10;
//Friction
/*
//Friction-> = -1*mu*N*velocity unit vector.
//Magnitude = mu*N (coefficient/strength of friction*normal force)
//Object moving horizontally: Normal Force = mass*gravitational force
*/
var frictionCoeff = 0.2; 
var normalForce = 1;
var frictionMag = frictionCoeff * normalForce;
textFont(createFont("monospace"), 12);

/*********************
 * MOVER OBJECT TYPE
**********************/
//Mover object type to store properties of each ball object.
var Mover = function(radius, color, x, y) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.mass = radius/5 || 1;
    this.radius = radius || 20;
    this.color = color || color(255, 255, 255);
};

//Use this function to add forces to a mover.
Mover.prototype.applyForce = function(force) {
    //get a copy of the force
    var f = force.get();
    //divide the force by the mass to get the acceleration (Acceleration = Force/Mass)
    f.div(this.mass);
    //add the quotient to this.acceleration to increase acceleration of mover
    this.acceleration.add(f);
};

//Use this function to change to position of the mover.
Mover.prototype.update = function() {
    //Add acceleration to the velocity.
    this.velocity.add(this.acceleration);
    //Add velocity to the position.
    this.position.add(this.velocity);
    //Set acceleration back to zero.
    this.acceleration.mult(0);
};

//This function draws the mover.
Mover.prototype.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y,
this.radius, this.radius);
};

//Check if the ball has hit an edge.
Mover.prototype.checkEdges = function() {
    //check if ball hit left wall
    if (this.position.x < this.radius/2) {
        this.velocity.x*=-1; //reverse direction to make it bounce
        this.position.x = this.radius/2; //set position of ball to left wall
    }
    //check if ball hit right wall
    if (this.position.x > width-this.radius/2) {
        this.velocity.x*=-1; //reverse direction to make it bounce
        this.position.x = width-this.radius/2; //set position of ball to right wall
    }
    //check if ball hit ceiling
    if (this.position.y < this.radius/2) {
        this.velocity.y*=-1; //reverse direction to make it bounce
        this.position.y = this.radius/2; //set position of ball to ceiling
    }
    //check if ball hit floor
    if (this.position.y > 335-this.radius/2) {
        this.velocity.y*=-1; //reverse direction to make it bounce
        this.position.y = 335 - this.radius/2; //set position of ball to floor
    }
};

/**GRAVITY**/
var gravity = new PVector(0, gravityValue);
/**WIND**/
var windX = 0; //horizont. wind strength, positive=blows right, negative=blows left
var windY = 0; //vertical wind strength, positive=blows down, negative=blows up

/**CREATE BOUNCY BALLS**/
//A function to produce a random color.
var getRandColor = function() {
    var randColor = color(random(0,255), random(0,255), random(0,255));
    return randColor;
};
//Array to store movers when mouse clicks.
var movers = []; 
//create the first bouncy balls and add to the movers array.
for (var i = 0; i < 4; i++) {
    movers[i] = new Mover(random(10, 45), getRandColor(), random(width), random(height-50));
}

/*When mouse clicks, a bouncy ball with a random radius, mass, and color will be added to the movers array at mouseX and mouseY.*/
mouseClicked = function() {
    movers.push(new Mover(random(10, 45), getRandColor(), mouseX, mouseY));
};

/***Draw Functon***/
draw = function() {
    background(0, 26, 0);
    //floor
    fill(41, 27, 0);
    rect(0, 335, width, 65);
    //Ball-o-meter
    fill(255, 255, 255);
    textSize(16);
    text("Bouncy Balls Summoned: " + movers.length, 5, 352);
    
    /**WIND FORCE**/
    //Control wind with arrow keys.
    //The longer a key is pressed, the stronger the wind will blow in that direction.
    keyPressed = function() {
        if (keyCode === UP) {
            //UP arrow = wind blows up
            windY -= addWindY;
        }
        if (keyCode === DOWN) {
            //DOWN arrow = wind blows down
            windY += addWindY;                
        }
        if (keyCode === LEFT) {
            //LEFT arrow = wind blows left
            windX -= addWindX;
        }
        if (keyCode === RIGHT) {
            //RIGHT arrow = wind blows right
            windX += addWindX;
        }
    };
    keyReleased = function() {
        if (becomeZeroWhenNotPressed) {
            if (keyCode === LEFT || keyCode === RIGHT) {
                windX = 0;
            }
            if (keyCode === UP || keyCode === DOWN) {
                windY = 0;
            }
        }
    };
    //Constrain wind
    windX = constrain(windX, -windXLimit, windXLimit);
    windY = constrain(windY, -windYLimit, windYLimit);
    var wind = new PVector(windX, windY);
    
    //Wind-o-meter
    textSize(12);
    text("Wind Strength:", 5, 373);
    //Strength of horiz wind
    textSize(11);
    text("Horizontal: " + round(wind.x/windXLimit*100) + "%", 105, 373);
    //Strength of vertical wind (-wind.y just so it makes sense)
    text("Vertical: " + round(-wind.y/windXLimit*100) + "%", 215, 373);
    //Direction of wind
    //Check wind direction
    var xDirection = "";
    if (round(wind.x/windXLimit*100) < 0) {
        //if windX is negative, direction is left
        xDirection = "LEFT";
    } else if (round(wind.x/windXLimit*100) === 0) {
        //if windX is zero, direction is none
        xDirection = "NONE";
    } else if (round(wind.x/windXLimit*100) > 0) {
        //if windX is positive, direction is right
        xDirection = "RIGHT";
    }
    var yDirection = "";
    if (round(wind.y/windXLimit*100) < 0) {
        //if windY is negative, direction is up
        yDirection = "UP";
    } else if (round(wind.y/windXLimit*100) === 0) {
        //if windY is zero, direction is none
        yDirection = "NONE";
    } else if (round(wind.y/windXLimit*100) > 0) {
        //if windY is positive, direction is down
        yDirection = "DOWN";
    }
    //Display wind direction
    textSize(12);
    text("Direction:", 5, 391);
    textSize(11);
    text("Horizontal: " + xDirection, 105, 391);
    text("Vertical: " + yDirection, 215, 391);
    
    //loop through all the bouncy balls in the movers array.
    for (var i = 0; i < movers.length; i++) {
        /**FRICTION**/
        //Get a copy of each mover's velocity
        var friction = movers[i].velocity.get();
        //reverse velocity direction and normalize (friction doesn't depend on speed)
        friction.mult(-1);
        friction.normalize();
        //Multiply friction force by magnitude to complete friction equation
        //Friction-> = neg direction of unit velocity*normalForce*coeffecient of friction
        //Normal force*coeff/strength of friction = magnitude
        friction.mult(frictionMag);
        
        //Makes all balls have same acceleration. gravityValue*mass calculates the force.
        gravity.set(0, gravityValue * movers[i].mass);
        
        //Apply forces to each bouncy ball.
        movers[i].applyForce(friction);
        movers[i].applyForce(wind);
        movers[i].applyForce(gravity);
        
        //Update the position of each bouncy ball.
        movers[i].update();
        //Check if the balls hit the wall.
        movers[i].checkEdges();
        //Draw the bouncy balls.
        movers[i].display();
    }
    
};

