//Credits: I couldn't figure out how to specify the number of iterations, and this project helped me: https://www.khanacademy.org/computer-programming/when-you-want-to-make-a-triangle-but-you-make-sierpinskis-triangle/5694374640173056
//Also I saw Coding Train's video for fractal trees in p5.js and replicated it for myself.
//Video: https://www.youtube.com/watch?v=0jjeOYMjmDU&vl=en

var scene = 0;

colorMode(HSB);

var sierpinskiTriangle = function(pt1, pt2, pt3, iter, hue) {
    stroke(hue, 255, 255); //set hue
    noFill();
    triangle(pt1.x, pt1.y, pt2.x, pt2.y, pt3.x, pt3.y); //draw a triangle at points
    
    //if iteration is positive
    if (iter > 0) {
    
        var newPt1 = new PVector((pt1.x+pt2.x)/2, (pt1.y+pt2.y)/2); //halway between 1&2
        var newPt2 = new PVector((pt1.x+pt3.x)/2, (pt1.y+pt3.y)/2); //between 1&3
        var newPt3 = new PVector((pt2.x+pt3.x)/2, (pt2.y+pt3.y)/2); //between 2&3
        
        //draw another sierpinski triangle at these points, decrease iteration
        sierpinskiTriangle(pt1, newPt1, newPt2, iter-1, hue); //same hue
        sierpinskiTriangle(pt2, newPt1, newPt3, iter-1, hue+20); //hue, but plus 20
        sierpinskiTriangle(pt3, newPt3, newPt2, iter-1, hue+40); //hue, but plus 40
    }
    
};

var treeBranch = function(length, angle, hue) {
    stroke(hue, 255, 255); //set color of branch
    line(0, 0, 0, -length); //a branch from origin to (0, -length)
    if (length > 1) {
        //right
        pushMatrix(); //save current coordinate system
        translate(0, -length); //translate to end point
        rotate(angle);  //rotate to the right
        treeBranch(length*0.67, angle, hue-20); //create another tree branch, half length
        popMatrix(); //revert to original system
        //left
        pushMatrix(); //save current coordinate system
        translate(0, -length); //translate to end point
        rotate(-angle); //rotate to the left
        treeBranch(length*0.67, angle, hue-20); //create another tree branch, half length
        popMatrix(); //revert to original system
        
    }
};

mouseClicked = function() {
    
    //if scene is less than three
    if (scene < 3) {
        scene++; //increment scene
    } else {
        scene = 0; //back to beginning
    }
    
    switch (scene) {
        case 0:
            //a regular sierpinski triangle
            background(0);
            sierpinskiTriangle(new PVector(width/2, 0), new PVector(0, height-3), 
                                new PVector(width, height-3), 6, 0);
            break;
        case 1:
            background(0, 0, 0);
            //two sierpinski triangles, covering the whole screen
            sierpinskiTriangle(new PVector(width, 0), new PVector(0, height), 
                                new PVector(0, 0), 6, 0); //left
            sierpinskiTriangle(new PVector(width, 0), new PVector(0, height), 
                                new PVector(width, height), 6, 0); //right
            break;
        case 2:
            background(0);
            pushMatrix(); //save current coordinate system
            translate(width/2, height); //translate to middle of bottom edge
            treeBranch(100, 40, 255); //tree branch, angle 40 start
            popMatrix(); //revert to original coordinate system
            break;
        case 3:
            background(0);
            pushMatrix(); //save current coordinate system
            translate(width/2, height); //translate to middle of bottom edge
            treeBranch(100, 70, 255);  //tree branch, start at 70
            popMatrix(); //revert to original coordinate system
            break;
        }
    
};

//draw first scene once
background(0);
sierpinskiTriangle(new PVector(width/2, 0), new PVector(0, height), new PVector(width, height), 6, 0);