//Adapted from Daniel Shiffman's video for rendering raytracing. 

//WASD

var fov = 60;//angle that specifies range of view
var rotSpeed = 2;
var playerSpeed = 2;

var keys = [];

//Boundary Object Type {
    
function Boundary(x1, y1, x2, y2) {
    //endpoints
    this.a = new PVector(x1, y1);
    this.b = new PVector(x2, y2);
}

Boundary.prototype.show = function() {
    //draw line
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
};

var boundaries = [
    
    //outer edges 
    new Boundary(0, 0, width/3, 0),
    new Boundary(0, 0, 0, height/3),
    new Boundary(0, height/3, width/3, height/3),
    new Boundary(width/3, 0, width/3, height/3),
    
    new Boundary(width/6-20,height*5/18,width/6+20, height*5/18),
    new Boundary(width/6-20,height*1/18,width/6+20, height*1/18),
    new Boundary(width*5/18,height/6-20,width*5/18, height/6+20),
    new Boundary(width*1/18,height/6-20,width*1/18, height/6+20),
    
    //big x in middle
    new Boundary(width/6+40,height/6+40,width/6-40,height/6-40),
    new Boundary(width/6-40, height/6+40,width/6+40,height/6-40),
    
    //middle +
    new Boundary(width/6-20, height/6, width/6+20, height/6),
    new Boundary(width/6, height/6-20, width/6, height/6+20),
    
];

//} 

//Ray Object Type {

var Ray = function(pos, angle) {
    this.pos = pos; //position start
    this.angle = angle;
    this.dir = new PVector(1, 0); //get position copy
    this.dir.normalize();
    this.dir.rotate(this.angle); //rotate by angle
};

Ray.prototype.cast = function(boundary) {
    
    //boundary endpoints
    var x1 = boundary.a.x;
    var y1 = boundary.a.y;
    var x2 = boundary.b.x;
    var y2 = boundary.b.y;
    
    //ray "endpoints"
    var x3 = this.pos.x;
    var y3 = this.pos.y;
    var x4 = this.pos.x+this.dir.x;
    var y4 = this.pos.y+this.dir.y;
    
    //formula from Wikipedia - calc if they are intersecting
    var denominator = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
    if (denominator === 0) {
        //lines are parallel
        return;
    }
    
    var t = ((x1-x3) * (y3-y4) - (y1-y3) * (x3-x4))/denominator;
    var u = -((x1-x2) * (y1-y3) - (y1-y2) * (x1-x3))/denominator;
    
    if (t > 0 && t < 1 && u > 0) {
        //there's a point of intersection, so calc point
        var pt = new PVector();
        pt.x = x1 + t*(x2-x1);
        pt.y = y1 + t*(y2-y1);
        return pt;
    } else {
        //not intersecting
        return;
    }
    
};

//}

//Ray System Object Type {

var RaySystem = function() {
    //position of the center
    this.pos = new PVector(50, 50);
    this.dir = new PVector(playerSpeed, 0);
    this.angle = PVector.angleBetween(this.pos, this.dir);
    //an array of all the rays that shoot out of the center
    this.rays = [];
    for(var theta = -fov/2; theta <= fov/2; theta+=0.5) {
        //pass in this pos and theta, create a new Ray
        var ray = new Ray(this.pos, theta);
        //push this ray onto the rays array
        this.rays.push(ray);
    }
};

RaySystem.prototype.rotate = function() {
    
    //If user is pressing A
    if (keys[65]) {
        for (var i = 0; i < this.rays.length; i++) {
            this.rays[i].dir.rotate(-rotSpeed);
        }
        this.dir.rotate(-rotSpeed);
    } else if (keys[68]) { //if user is pressing D
        for (var i = 0; i < this.rays.length; i++) {
            this.rays[i].dir.rotate(rotSpeed);
        }
        this.dir.rotate(rotSpeed);
    }
    
};

RaySystem.prototype.look = function(boundaryArray) {
    var scene = [];
    //center
    fill(255);
    ellipse(this.pos.x, this.pos.y, 5, 5);
    //display the rays
    stroke(255, 50);
    //loop through rays
    for (var i = 0; i < this.rays.length; i+=1) {
        //at first, closest dist to this.pos is infinity
        var record = Infinity;
        var closest = null; //will hold closest point
        //loop through the boundaries
        for (var j = 0; j < boundaryArray.length; j++) {
            //call cast() on each ray
            var pt = this.rays[i].cast(boundaryArray[j]);
            //if a point is returned
            if (pt) {
                //find distance between point and this.pos
                var d = PVector.dist(this.pos, pt);
                var a = this.rays[i].angle - this.angle;
                d*=cos(a);
                //if the distance is less than the last closest
                if (d < record) {
                    record = d; //set record to this distance
                    //set point connecting this.pos to this point
                    closest = pt;
                }
            }
        }
        //if closest point exists after going through boundaries
        if (closest) {
            //line from this.pos to closest point
            line(this.pos.x, this.pos.y, closest.x, closest.y);
        }  
        scene.push(record);
    }
    return scene;
};

RaySystem.prototype.render = function() {
    rectMode(CENTER);
    var scene = this.look(boundaries);
    var w = width/fov;
    for (var i = 0; i < scene.length; i++) {
        var h = map(scene[i], 0, 283, height*3/4, 0);
        var shadowAmt= (map(scene[i], 0, 283, 0, 1));
        fill(lerpColor(color(177,117,255), color(0), shadowAmt));
        noStroke();
        rect(i*w+w/2, height/2, w, h);
    }
};

RaySystem.prototype.move = function() {
    //user is pressing W?
    if (keys[87] && !keys[83]) {
        this.pos.add(this.dir);
    } else if (keys[83] && !keys[87]) { //user is pressing S?
        this.pos.sub(this.dir);
    }
    this.pos.x = constrain(this.pos.x, 0, width/3);
    this.pos.y = constrain(this.pos.y, 0, width/3);
};

RaySystem.prototype.run = function() {
    //update position and angle
    this.look(boundaries);
    this.rotate();
    this.move();
};

var raySystem = new RaySystem();

//}

keyPressed = function() {
    keys[keyCode] = true;
    loop();
};
keyReleased = function() {
    keys[keyCode] = false;
    noLoop();
};

draw = function() {
    
    background(0, 25, 48);
    fill(0, 61, 10);
    rect(0, height/2, width, height/2);
    
    raySystem.render();
    
    rectMode(CORNER);
    fill(0);
    rect(0, 0, width/3, height/3);
    //loop through all the boundaries and show each
    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }

    raySystem.run();
    
};
