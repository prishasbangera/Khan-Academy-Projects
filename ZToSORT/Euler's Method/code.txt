// initial x
var x = 9;
// intial y
var y = 4;

// derivative of f(x)
function dydx(x, y) {
    return 4 * x * y + 1;
}

// step size
var h = -2;

// trying to approximate ??
var c = 5;

var numSteps = (c - x) / h;

fill(0);
text("Initial (X,Y)                   dy/dx", 10, 20);

for (var i = 0; i <= numSteps; i++) {
    
    // calculate derivative
    var d = dydx(x, y);
    
    // current point
    text("(" + x.toFixed(3) + ", " + y.toFixed(3) + ")", 10, 40 + i*20);
    
    if (i === numSteps) { break; }
    
    // display derivative
    text(d.toFixed(3), 126, 40 + i*20);
    
    // step along tangent line
    y = y + dydx(x, y) * h;
    x += h;
    
}

println("f(" + c + ") is approximately " + y);
