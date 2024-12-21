//So this is an eye. Kind of.

//making the eye pupil {
background(0, 0);
var lighterSky = color(34, 0, 112);
var darkerSky = color(2, 0, 10);

//gradient
noStroke();
for(var i = height; i > 0; i--) {

    fill(lerpColor(lighterSky, darkerSky, i/(height)));
    ellipse(width/2, height/2, i, i);
}
//stars
var generatePos = new PVector(new Random(10), new Random(23));
var starSize = new Random(30);
noStroke();
for(var i = 0; i < 11342; i++) {
    var s = starSize.nextGaussian()*1.5;
    var b = map(starSize.nextGaussian(), 0, 2, 0, 255);
    fill(255, b);
    ellipse(generatePos.x.nextGaussian()*120+width/2, 
            generatePos.y.nextGaussian()*120+width/2,
            s, s);
}

//light
fill(250, 1);
for (var i = 19; i < 163; i++) {
    ellipse(443, 170, i, i);
}

var eye = get(0, 0, width, height);
//}

//eye {

background(0);

//whites of the eye
fill(255);
beginShape();
vertex(100, 330);
bezierVertex(192, 293, 233, 79, 500, 300);
bezierVertex(214, 528, 209, 284, 100, 330);
endShape();

//eye pupil
imageMode(CENTER);
image(eye, width/2, height/2, 200, 200);

//}
