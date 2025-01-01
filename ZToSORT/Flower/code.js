var r = width*13/30;
var f = 1;
var started = !false;
draw = function() {
    background(0);
    if (started) {
        for (var i = 0; i <= 100; i+=0.5) {
            stroke(255, 170, 0, 100);
            var a = 360 * i/100;
            var a2 = 360 * f*i/100; //(f*(i&f))/100;
            line(
                width/2 + cos(a) * r,
                height/2 + sin(a) * r,
                width/2 + cos(a2) * r,
                height/2 + sin(a2) * r
            );
        }
        f += 0.008;
    }
};

function keyTyped() {
    if (!started) { started = true; }
}
