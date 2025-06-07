function x(t) {
    return Math.cos(t*Math.atan(t));
}

function y(t) {
    return Math.cos(t)*Math.sin(t*2)*1.3;
}

var time = 0;
var scl = 250;
var oldX, oldY;

background(0);

translate(width/2, height/2);

draw = function() {
    for(var i = 0; i < 3; i++) {
        var xpos = scl*x(time);
        var ypos = scl*y(time);
        
        // draw
        if (time !== 0) {
            stroke(Math.abs(Math.sin(time))*255, Math.cos(time)*255, 255, 150);
            line(oldX, oldY, xpos, ypos);
        }
    
        time+=0.075;
        
        oldX = xpos;
        oldY = ypos;
    }
};