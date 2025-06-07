var thing = 0, h = 0;
noFill();
stroke(255);
colorMode(HSB);
function circle(x, y, size) {
    stroke(h, 255, 255);
    if (h > 255) {
        h = 0;
    }   else {
        h+=0.0001;
    }    
    ellipse(x, y, size, size);
    if (size > 5) {
        circle(x-size/2+thing, y, size/2);
        circle(x+size/2-thing, y, size/2);
        circle(x, y+size/2+thing, size/2);
        circle(x, y-size/2-thing, size/2);
    }
}
draw = function() {
    background(0);
    thing = sin(2*frameCount)*100;
    circle(200, 200, 200);
};
