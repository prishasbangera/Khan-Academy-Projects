//It's not much, but it's something
imageMode(CENTER);
var setting = (function() {
    //normal distribution stuff
    var genX = new Random(5);
    var genY = new Random(4);
    var x, y;
    //water
    background(27, 0, 82);
    //a function for a cloud of dot things
    //pass in center pos, w and h of dot, standard dev, clr 
    function dots(centerX, centerY, w, h, s, clr) {
        noStroke();
        for (var i = 0; i < s*15; i++) {
            //get next value in normal distribution
            x = centerX + genX.nextGaussian()*s;
            y = centerY + genY.nextGaussian()*s;
            //draw the dot at that pos
            fill(clr, 8);
            ellipse(x, y, w, h);
        }
    }
    //water: pink dots
    dots(width/2, height*0.21, 391, 9, 122, color(250, 8, 133));
    dots(width/2, height*0.11, 248, 6, 73, color(255, 191, 248));
    var water = get(); //capture the image
    //night
    background(15, 0, 46);
    //some blue dots
    dots(width/2, height*0.5, 198, 12, 300, color(69, 0, 196));
    //stars
    for (var i = 0; i < 1200; i++) {
        if (random(1) < 0.8) {
            //most stars according to normal dist
            //crowd around mean
            x = genX.nextGaussian() * 145 + width*0.68;
            y = genY.nextGaussian() * 105 + height*0.21;
        } else {
            x = random(width);
            y = random(0, height*0.60);
        }
        var s = random(3, 6); //random size
        //draw the star
        fill(255, 166, 0, 90);
        ellipse(x, y, s, s);
        fill(255, 233, 31);
        ellipse(x, y, s-3, s-3);
    }
    //moon
    pushMatrix(); //save current coordinate system
    translate(width*0.5, height*0.58); //translate to this pos
    //some more dots
    dots(0, 0, 50, 50, 22, color(255));
    //more light
    for (i = 124; i < 156; i++) {
        ellipse(0, 0, i, i); //draw ellipse with size i
    }
    popMatrix(); //back to previous coordinate system
    //draw half of the water on top of the night sky
    image(water, width/2, height*1.1);
    return get(); //capture the image
})();
function Lantern() {
    //upon creation, create 3 images: mask, grad, and light
    this.img = (function() {
        var lighter, darker; //for radial gradient
        if (random(1) < 0.7) {
            //yellow lantern
            lighter = color(255, 255, 46);
            darker = color(255, 68, 0);
        } else {
            //purple lantern
            lighter = color(255, 153, 255);
            darker = color(119, 3, 168);
        }
        //off-screen graphics buffer
        var grad = createGraphics(150, 150, P2D);
        grad.noStroke();
        grad.background(0, 0);
        //translate to center
        grad.translate(grad.width/2, grad.height/2);
        //radial gradient
        for (var d = grad.width; d > 0; d--) {
            //lerp between colors according to d
            grad.fill(lerpColor(lighter, darker, d/grad.width));
            grad.ellipse(0, 0, d, d);
        }
        return grad.get(); //return image
    })();
    this.msk = (function (){
        //create the mask - off-screen
        var msk = createGraphics(150, 150, P2D);
        msk.background(0); //black background
        msk.noStroke();
        msk.fill(255); //fill white
        //translate to center
        msk.translate(msk.width/2, msk.height/2);
        var s = random(40, 50); //a size 
        //random shape
        if (random(1) < 0.4) {
            //hourglass shape
            var squish = random(0.7, 0.9)*s; //amt of squish uwu
            //draw the shape according to s and squish
            msk.beginShape();
               msk.curveVertex(s, s);
                msk.curveVertex(squish, 0);
                msk.curveVertex(s, -s);
                msk.curveVertex(-s, -s);
                msk.curveVertex(-squish, 0);
                msk.curveVertex(-s, s);
                msk.curveVertex(s, s);
                msk.curveVertex(squish, 0);
                msk.curveVertex(s,-s);
            msk.endShape();
        } else {
            //gum drop shape?
            //some numbers according to size
            var n1 = s*random(0.7, 1.0);
            var n2 = (s+n1) / 2;
            var n3 = s*random(0.4, 0.7);
            //draw the shape according to those numbers
            msk.beginShape();
                msk.curveVertex(n1, s);
                msk.curveVertex(n2, 0);
                msk.curveVertex(n3,-s);
                msk.curveVertex(-n3,-s);
                msk.curveVertex(-n2, 0);
                msk.curveVertex(-n1, s);
                msk.curveVertex(n1, s);
                msk.curveVertex(n2, 0);
                msk.curveVertex(n3, -s); 
            msk.endShape();
        }
        return msk.get(); //capture image and return
    })();
    this.lightImg = (function() {
        //create a ball of light off-screen
        var img = createGraphics(260, 260, P2D);
        var siz = random(190, 210); //random size
        img.background(0, 0);
        img.noStroke();
        img.fill(255, 220, 133, 1);
        //translate to center
        img.translate(img.width/2, img.height/2);
        //from siz-120 to siz, draw ellipse
        for (var s = siz-120; s < siz; s++) {
            img.ellipse(0, 0, s, s);
        }
        return img.get(); //capture img and return
    })(); 
    this.img.mask(this.msk); //mask the grad with the shape
    //a random pos
    this.x = random(width);
    this.y = height*random(1.1, 1.3);
    //velocity and acceleration
    this.xVel = random(-0.3, 0.3);
    this.yVel = -0.7;
    this.accY = -0.002;
}
Lantern.prototype.run = function() {
    pushMatrix(); //save curr coordinate system
    translate(this.x, this.y); //translate to pos
    //scale according to height
    scale(map(this.y, 0, height, 0.2, 0.7)); 
    //drwa the images
    image(this.lightImg, 0, 0);
    image(this.img, 0, 0);
    popMatrix(); //back to normal coordinate system
    this.yVel += this.accY; //add acc to vel
    //change pos by vel
    this.y+=this.yVel;
    this.x+=this.xVel;
};
var lanterns = []; //an array of all the lanterns
draw = function() {
    //draw the setting
    image(setting, width/2, height/2); 
    //loop through the lanterns
    for (var i = lanterns.length-1; i >= 0; i--) {
        //draw and update each lantern
        lanterns[i].run();
        //if lantern has left the visible screen
        if (lanterns[i].y < -100) {
            //remove lantern from array
            lanterns.splice(i, 1);
        }
    }
    //if frameCount is a multiple of 25
    if (frameCount % 25 === 0) {
        //push a new lantern onto the array
        lanterns.push(new Lantern());
    }
};