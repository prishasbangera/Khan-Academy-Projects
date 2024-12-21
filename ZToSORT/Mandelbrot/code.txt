//Thankyouthankyouthankyouthankyou to Miles Waugh for teaching me about Mandelbrot Sets
//I didn't use a tutorial this time!

colorMode(HSB);
        
var mode = "spectral"; //spectral or rainbow, then click restart

background(0, 0, 0);
var minVal = -2;
var maxVal = 2;
var py = 0;
var maxIter = 100;

function mandelbrot(px, py) {
    var x0 = map(px, 0, 400, minVal, maxVal);
    var y0 = map(py, 0, 400, minVal, maxVal);
    var x = 0;
    var y = 0;
    var x2, y2;
    var iter = 0;
    while (dist(x, y, 0, 0) < 4 && iter <= maxIter) {
        x2 = x*x - y*y + x0;
        y2 = y0 + 2*x*y;
        x = x2;
        y = y2;
        iter++;
    }
    if (mode === "rainbow") {
        set(px, py, color(map(iter, 0, maxIter, 0, 255), 255, iter>maxIter?0:255));
    } else if (mode === "spectral") {
        set(px, py, color(map(iter, 0, maxIter, 0, 255)));
    } else {
        throw{
            message: "That's not a mode. Possible modes are \"rainbow\" and \"spectral\".",
            row: 3
        };
    }
}

draw = function() {
    //do mandelbrot for this row, loop through all the columns
    for (var px = 0; px <= 400; px++) {
        mandelbrot(px, py);
    }
    //increment row or stop
    if (py >= 400) {
        noLoop();
    } else {
        py++;
    }
};