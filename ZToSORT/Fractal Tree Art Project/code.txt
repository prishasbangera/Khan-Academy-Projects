//If it says a function is taking too long, click restart.
var backgroundImg = function() {
    if (backgroundImg.img) {
        image(backgroundImg.img, 0, 0);
    } else {
        var i, y, h, moonSize = 74;
        var crtr = {x: new Random(43), y: new Random(15), s: new Random(16)}, nextPos;
        backgroundImg.img = createGraphics(width, height, P2D);
        randomSeed(1);
        backgroundImg.img.colorMode(HSB);
        backgroundImg.img.background(157, 255, 255);
        backgroundImg.img.strokeWeight(10);
        backgroundImg.img.noFill();
        for (i = 0; i < 2000; i++) {
            y = random(height);
            h = map(y, 0, height, 170, 230);
            backgroundImg.img.stroke(h, 230, 220);
            backgroundImg.img.beginShape();
            backgroundImg.img.vertex(random(width), y);
            backgroundImg.img.bezierVertex(random(-100, width+100), random(y-100, y), 
                                           random(-100, width+100), random(y-100, y), 
                                           random(-100, width+100), y);
            backgroundImg.img.endShape();
        }
        backgroundImg.img.filter(BLUR, 3);
        
        backgroundImg.img.colorMode(RGB);
        backgroundImg.img.translate(320, 86);
        backgroundImg.img.stroke(107, 107, 107);
        backgroundImg.img.strokeWeight(2);
        backgroundImg.img.fill(208, 217, 222);
        backgroundImg.img.ellipse(0, 0, moonSize, moonSize);
        backgroundImg.img.fill(254,254,254);
        backgroundImg.img.noStroke();
        backgroundImg.img.ellipse(-1, -1, moonSize*0.87, moonSize*0.87);
        for (var i = 0; i < 7; i++) {
            nextPos = {
                x: crtr.x.nextGaussian()*moonSize/5.9 + 1, 
                y: crtr.y.nextGaussian()*moonSize/6,
                s: crtr.s.nextGaussian()*moonSize/30 + 6
            };
            backgroundImg.img.fill(191, 191, 191);
            backgroundImg.img.ellipse(nextPos.x-1, nextPos.y-1, nextPos.s, nextPos.s);
            backgroundImg.img.fill(242, 245, 247);
            backgroundImg.img.ellipse(nextPos.x, nextPos.y, nextPos.s, nextPos.s);
        }
        backgroundImg.img.fill(255, 255, 255, 6);
        for (var i = 0; i < moonSize*1.5; i++) {
            backgroundImg.img.ellipse(0, 0, i, i);
        }
        backgroundImg.img = backgroundImg.img.get();
    }
};
var tree = function() {
    if (tree.img) {
        image(tree.img, 0, 0);
    } else {
        var branch = function(length, angle) {
            tree.shape.strokeWeight(length/5);
            tree.shape.line(0, 0, 0, -length);
            if (length > 3) {
                tree.shape.pushMatrix();
                tree.shape.translate(0, -length);
                branch(length/1.3, angle);
                tree.shape.popMatrix();
                tree.shape.pushMatrix();
                tree.shape.translate(0, -length);
                tree.shape.rotate(-angle);
                branch(length/2, angle);
                tree.shape.popMatrix();
                tree.shape.pushMatrix();
                tree.shape.translate(0, -length);
                tree.shape.rotate(angle);
                branch(length/2, angle);
                tree.shape.popMatrix();
            }
        };
        var gradClrs = {lighter: color(98, 0, 189), darker: color(13, 2, 33)};
        
        tree.img = createGraphics(width, height, P2D);
        tree.img.strokeWeight(4);
        for (var i = 0; i < height+5; i+=4) {
            tree.img.stroke(lerpColor(gradClrs.lighter, gradClrs.darker, i/height));
            tree.img.line(0, i, width, i);
        }
        tree.img = tree.img.get();
        
        tree.shape = createGraphics(width, height, P2D);
        tree.shape.background(0);
        tree.shape.stroke(255);
        tree.shape.pushMatrix();
        tree.shape.translate(width/2, height+30);
        branch(100, 45);
        tree.shape.popMatrix();
        
        tree.shape.beginShape();
            tree.shape.vertex(0, 387);
            tree.shape.vertex(0, height);
            tree.shape.vertex(width, height);
            tree.shape.vertex(width, 380);
            tree.shape.bezierVertex(350, 370, 420, 350, 200, 370);
        tree.shape.endShape();
        
        tree.shape = tree.shape.get();
        
        tree.img.mask(tree.shape);
        tree.shape = null;
    }
};
var glitter = {
    particles: [],
    lifespan: 170,
    isDead: function(particle) {
        return particle.alpha < 0;
    },
    run: function() {
        strokeWeight(2);
        this.particles.push({x: random(width), y: random(height), alpha: this.lifespan});
        for (var i = 0; i < this.particles.length; i++) {
            if (this.isDead(this.particles[i])) {
                this.particles.splice(i, 1);
            } else {
                stroke(255, this.particles[i].alpha);
                point(this.particles[i].x, this.particles[i].y);
                this.particles[i].alpha--;
            }
        }
    }
};
draw = function() {
    backgroundImg();
    glitter.run();
    tree();
};
