// GREEN's THM - make sure the curve is simple and closed as possible lol
/*

    Vector Field F = <M,N>
    dr = <dx, dy>

    ∮<F,dr> = ∮(Mdx+ Ndy) = ∫∫ curl(F) dA
    
    We want curl F = 1 so that the work along the closed curve = area of shape
    
    curl F = 1
    (∂N/∂x) - (∂M/∂y) = 1
    
    Arbitrary choice: ∂M/∂y = 0, ∂N/∂x = 1 -> N = x
    
    Area of shape = ∮(Mdx+ Ndy) =  ∮xdy
    
    For each little change in y along the curve, 
    add up the x values to estimate the area
    
    if you go clockwise around the curve, it will be negative

*/

var GRID_SIZE = 20; // one unit of area is GRID_SIZE by GRID_SIZE pixels

var Curve = function() {
    this.points = [];
    this.isClosed = false;
    this.notStarted = true;
    this.area = 0;
};

Curve.prototype.draw = function() {
    
    strokeWeight(2);
    stroke(0, 13, 255);
    fill(150, 255, 150, 150);
    beginShape();
    for (var i = 0; i < this.points.length; i++) {
        vertex(this.points[i][0], this.points[i][1]);
    }
    endShape();
    
    // ellipse at first point
    if (!this.isClosed && this.points.length > 0) {
        stroke(61, 10, 34);
        strokeWeight(1);
        fill(240, 148, 120, 100);
        ellipse(this.points[0][0], this.points[0][1], 15, 15);
    }
};

Curve.prototype.update = function() {
    if (mouseIsPressed && this.notStarted) {
        this.notStarted = false;
    }
    if (!this.notStarted && !this.isClosed) {
        if (mouseIsPressed) {
            this.points.push([mouseX, mouseY]);
            // calc area
            if (this.points.length >= 2) { 
                var currPt = this.points[this.points.length - 1];
                var lastPt = this.points[this.points.length - 2];
                // idk
                // should it be lastpt[0] or current idk
                this.area += lastPt[0] *-(currPt[1] - lastPt[1]);
            }
        } else {
            this.isClosed = true;
        }
    }
};

Curve.prototype.run = function() {
    this.draw();
    this.update();
    if (this.isClosed) {
        if (this.area < 0) {
            println("You went clockwise.");
        } else {
            println("You went counter-clockwise.");
        }
        println("Estimated area");
        println("pixels^2: " + this.area);
        println("grid^2: " + this.area / (GRID_SIZE*GRID_SIZE));
        noLoop();
    }
};

var c = new Curve();

draw = function() {
    
    // draw background
    background(255);
    stroke(126, 200, 232, 100);
    strokeWeight(1);
    for (var x = 0; x < width; x += GRID_SIZE) {
        for (var y = 0; y < height; y += GRID_SIZE) {
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
    
    c.run();
    
};



