imageMode(CENTER);

var bubbleSystem = {
    numBubbles: 22,
    siz: {min: 20, max: 40}
};

/*Create bubbles array*/
bubbleSystem.bubbles = (function() {
    
    //bubble image - create
    var bubbleImg = (function() {
        var img = createGraphics(100, 100, JAVA2D);
        img.background(0, 0);
        img.translate(img.width/2, img.height/2);
        img.noStroke();
        img.angleMode = "degrees";
        img.fill(214, 230, 255, 50);
        img.ellipse(0, 0, 98, 98);
        img.stroke(255, 4);
        img.noFill();
        for (var s = 1; s < 37; s++) {
            img.strokeWeight(s);
            var d = map(s, 0, 37, 90, 63);
            var a = map(s, 0, 37, 55, 125)/2;
            img.arc(0, 0, d, d, -a-44, a+-49);
            img.strokeWeight(s*1.1);
            img.arc(0, 0, d*1.0, d*1.0, -a+146, a+113);
        }
        return img;
    })();
       
    //circle objects 
    var circles = (function() {
        var array = [];
        for (var i = 0; i < bubbleSystem.numBubbles; i++) {
            var r = random(bubbleSystem.siz.min, bubbleSystem.siz.max);
            array.push({
                x: random(r, width-r),
                y: random(r, height-r),
                r: r,
                xVel: random(-1, 1),
                yVel: random(-1, 1)
            });
        }
        return array;
    })();
    
    for (var i = 0; i < circles.length; i++) {
        var c = circles[i];
        c.img = createGraphics(c.r*2, c.r*2, JAVA2D);
        c.img.colorMode(HSB);
        c.img.background(0, 0);
        c.img.noStroke();
        //random triangles
        for (var j = 0; j < c.r*3; j++) {
            var r = random(5, c.r/3);
            c.img.fill(random(255), 255, 255, 20);
            c.img.pushMatrix();
            c.img.translate(c.img.width/2, c.img.height/2);
            c.img.rotate(random(TWO_PI));
            c.img.translate(c.r/2, 0);
            c.img.rotate(random(TWO_PI));
            c.img.triangle(0, r, r, 0, -r, -r);
            c.img.popMatrix();
        }
        //bubble image
        c.img.tint(random(255), 35, 255);
        c.img.image(bubbleImg, 0, 0, c.r*2, c.r*2);
        c.img = c.img.get();
    }
    
    /*Return the array of objects*/
    return circles;
    
})();

/*Draw and update bubbles*/
bubbleSystem.run = function() {
    for (var i = 0; i < bubbleSystem.bubbles.length; i++) {
        var b = bubbleSystem.bubbles[i];
        image(b.img, b.x, b.y);
        b.x += b.xVel;
        b.y += b.yVel;
        //check position
        if (b.x < b.r || b.x+b.r > width) {
            b.xVel *= -1;
        }
        if (b.y < b.r || b.y+b.r > height) {
            b.yVel *= -1;
        }
    }
};

/*Backdrop*/
var backdrop = (function() {
    var img = createGraphics(width, height, JAVA2D);
    img.background(0, 57, 143);
    img.noStroke();
    img.fill(255, 4);
    for (var i = 0; i < 150; i+=5) {
        img.quad(200-i, 0, 350+i, 0,
                 100+i*2, height, 50-i*2, height);
    }
    return img;
})();

draw = function() {
    image(backdrop, width/2, height/2);
    bubbleSystem.run();
};