enableContextMenu();

//lower if slow
var maxIter = 200;
var speed = 20; 

var usingHSB = false;


var num = random(1);
if (num < 0.5) {
    usingHSB = true;
}
if (usingHSB) {
    colorMode(HSB);
}

var n1, n2, n3;
if (!usingHSB) {
    n1 = random(0, 255);
    n2 = random(20, 100);
    n3 = random(200, 400);
} else {
    n1 = random(10, 80);
    n2 = random(10, 100);
    n3 = random(400, 500);
}

// colors from stack overflow
var clrs = [
    color(66, 30, 15),
    color(25, 7, 26),
    color(9, 1, 47),
    color(4, 4, 73),
    color(0, 7, 100),
    color(12, 44, 138),
    color(24, 82, 177),
    color(57, 125, 209),
    color(134, 181, 229),
    color(211, 236, 248),
    color(241, 233, 191),
    color(248, 201, 95),
    color(255, 170, 0),
    color(204, 128, 0),
    color(153, 87, 0),
    color(106, 52, 3)
];

var rt5 = Math.sqrt(5);

function getClr(d, iter) {
    
    // return color(iter % 255, 255, 255);
    
    var clr = color(
        d*iter*n1, 
        d*iter*n2, 
        d*n3
    );
    
    // clr = color(noise(d) * 315, 255, 255);
    
    // if (num < 0.5) {
    //     clr = clr & color(iter*n1, iter*n2, 255);
    // }
    return clr;
    
    // return color(iter/maxIter * d/rt5 * 1800, 255, 255);
   
    // return iter === maxIter ? color(0) : clrs[~~(iter % clrs.length)];
    
}

var py = 0;
function mandelbrot() {
    for (var px = 0; px < width; px++) {
        var x0 = map(px, 0, width, -1.5, 0.5);
        var y0 = map(py, 0, height, -1, 1);
        var x = 0;
        var y = 0;
        var distance = Infinity;
        var iter = 0;
        while(x*x + y*y <= 5 && iter < maxIter) {
            var x1 = x*x - y*y + x0;
            y = 2*x*y + y0;
            x = x1;
            if (dist(0, 0, x, y) < distance) {
                distance = dist(0, 0, x, y);
            }
            iter++;
        }
        var clr = getClr(distance, iter);
        set(px, py, clr);
    }
}

draw = function() {
    for (var i = 0; i < speed; i++) {
        mandelbrot();
        if (py < height) {
            py++;
        } else {
            noLoop();
        }
    }
};

// function mouseClicked() {
//     if (mouseButton === LEFT) {
//         _clearLogs();
//         println("n1: " + n1);
//         println("n2: " + n2);
//         println("n3: " + n3);
//         println("HSB Color System? " + usingHSB);
//     }
// }