var standDev = {x: 70, y: 0}; 

background(0);
var pts = [
    {x: 100, y: 100, clr: color(247, 239, 163), w: 10},
    {x: 500, y: 500, clr: color(240, 240, 108), w: 10},
    {x: 500, y: 100, clr: color(215, 237, 92), w: 0},
    {x: 100, y: 500, clr: color(215, 237, 69), w: 0},
    {x: 300, y: 300, clr: color(249, 247, 250), w: 21},
];

var genX = new Random(3);
var genY = new Random(4);

for (var i = 0; i < pts.length; i++) {
    noStroke();
    pushMatrix();
    translate(pts[i].x, pts[i].y);
    fill(pts[i].clr, 5);
    for (var r = 0; r < 360; r+=15) {
        pushMatrix();
        rotate(r);
        for (var j = 0; j < 1000; j++) {
            var x = genX.nextGaussian()*standDev.x;
            var y = genY.nextGaussian()*standDev.y;
            if (random(1) < 0.6) {
                ellipse(x, y, pts[i].w, random(11));
            } else {
                rect(x, y, 0.1, 0.1, -5);
            }
        }
        popMatrix();
    }
    popMatrix();
}
