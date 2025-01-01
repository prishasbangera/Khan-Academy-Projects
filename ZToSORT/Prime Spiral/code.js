//from the 3b1b video on prime spirals

//global variables
var n = 1; //current number
var scl = 0.003; //scale factor

Number.prototype.isPrime = function() {
    var n = +this;
    if (n <= 1) {
        return false;
    } else if (n === 2) {
        return true;
    }
    for (var i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};

//setup
(function() {
    angleMode = "radians";
    frameRate(0);
    background(0);
    strokeWeight(1);
    stroke(0, 217, 255);
})();

draw = function() {
    for (var i = 0; i < map(scl, 0, 0.2, 100, 1); i++) {
        if (n.isPrime()) {
            var x = width/2 + scl*n*Math.cos(n);
            var y = height/2 + scl*n*Math.sin(n);
            if (x > width*1.2) {
                background(0);
                n = 1;
                scl = random(0.1);
                return;
            }
            point(x, y);
        }
        n++;
    }
};
