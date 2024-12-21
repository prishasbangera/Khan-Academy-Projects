//Just an experiment, I know P3D is super laggy

var grad = createGraphics(width, height, P2D);
    grad.background(0);
    grad.strokeWeight(5);
    for (var i = 0; i < height; i+=5) {
        grad.stroke(lerpColor(color(255, 0, 255), color(255, 0, 0), i/height));
        grad.line(0, i, width, i);
    }
grad = grad.get();

draw = function() {
    
    var msk = createGraphics(width, height, P3D);
    msk.background(0);
    msk.fill(255);
    msk.translate(width/2, height/2);
    //msk.rotateZ(frameCount/4);
    //msk.rotateX(frameCount/4);
    msk.rotateY(frameCount/5);
    msk.box(185);
    msk = msk.get();
    
    var thing = createGraphics(width, height, P2D);
    
    thing.image(grad, 0, 0);
    
    thing.fill(0);
    thing.noStroke();
    //person
    thing.ellipse(width/2, height/2, 70, 90); //head
    thing.ellipse(width/2, height/2 + 99, 100, 148); //body
    thing.fill(255);
    if (frameCount % floor(random(70)) === 0) {
        thing.ellipse(width/2-15, height/2, 20, 2); //closed left eye
        thing.ellipse(width/2+15, height/2, 20, 2); //closed right eye
    } else {
        thing.ellipse(width/2-15, height/2, 20, 20); //open left eye
        thing.ellipse(width/2+15, height/2, 20, 20); //open right eye
    }
    thing = thing.get();
    thing.mask(msk);
    
    background(0);
    image(thing, 0, 0);

};
