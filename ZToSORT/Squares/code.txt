var i = 0;

function draw() {
    background(255);
    for (var x = 0; x < 500; x+=4) {
        for (var y = 0; y < 500; y+=4) {
            randomSeed((y^x)/i); //using bitwise XOR operator
            strokeWeight(random(5));
            point(x, y);
        }
    }
    i++;
}