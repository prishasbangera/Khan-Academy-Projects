var s = 0;
var n = 0;
var r = random(10);

background(0);
colorMode(HSB);
var backdrop = (function() {
    background(0);
    for (var i = 0; i < 5000; i++) {
        var s = random(30);
        var x = random(width);
        var y = random(height);
        for (var t = 1; t < s; t++) {
            strokeWeight(t);
            stroke(random(107, 255), 130, 255, 30/t);
            point(x, y);
        }
    }
    return get();
})();

draw = function() {
    for (var a = 0; a < 360; a+=40) {
        for (var t = 1; t < 10; t++) {
            strokeWeight(t);
            stroke(17/24 * a, 130, 255, 100/t);
            point(width/2 + s*cos(a + n), height/2 + s*sin(a + n));
        }
    }
    n+=random(-r, r);
    s++;
    if (s > 450) {
        image(backdrop, 0, 0);
        s = 0;
        n = 0;
        r = random(30);
    }
};