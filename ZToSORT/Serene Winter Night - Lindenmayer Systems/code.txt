enableContextMenu();
var scene = "loading";

/**L-SYSTEM OBJECT**/

/*Tried to make this as reusable as I could*/
var LSystem = function(config) {
    /*Example:
      Rules: A->AB, B->A
      Gen 1 (AXIOM): A
      Gen 2        : AB
      Gen 3        : ABA
      Gen 4        : ABAAB*/
    /*Return this object*/
    var obj = {
        /*Position*/
        x: config.x,
        y: config.y,
        /*At start, current sentence is axiom*/
        currString: config.axiom,
        /*How much to rotate/travel each step*/
        angle: config.angle,
        distance: config.distance,
        percent: 0.5,
        /*Rules for the lSystem
            For example - {
                //A is replaced with AB each time 
                //it appears in the string
                from: "A",
                to: "AB"
            }
        */
        rules: config.rules,
        /*When currString is read, some characters point to
          certain actions. Some basic rules are also included*/
        turtleKey: config.turtleKey.concat([
            /*save position*/
            {
                char: "[", 
                action: function() {
                    pushMatrix();
                }
            },
            /*Back to previously saved position*/
            {
                char: "]", 
                action: function() {
                    popMatrix();
                }
            },
            /*Rotate*/
            {
                char: "+",
                action: function() {
                    rotate(obj.angle);
                }
            },
            {
                char: "-",
                action: function() {
                    rotate(-obj.angle);
                }
            },
            /*Go forward*/
            {
                char: "F",
                action: function() {
                    line(0, 0, 0, -obj.distance);
                    translate(0, -obj.distance);
                }
            }    
        ]),
        /*Called before generate and turtle*/
        start: function() {
            pushMatrix();
            translate(this.x, this.y);
        },
        /*Rewriting strings*/
        generate: function() {
            /*The next sentence*/
            var newString = "";
            /*Loop through current string's characters*/
            for (var i = 0; i < this.currString.length; i++) {
                var curr = this.currString.charAt(i);
                /*Did we find a rule for this char?*/
                var found = false;
                /*Loop through the rules*/
                for (var j = 0; j < this.rules.length; j++) {
                    if (curr === this.rules[j].from) {
                        /*Add to string according to rule*/
                        newString += this.rules[j].to;
                        found = true;
                        break;
                    }
                }
                /*If rule wasn't found, just add current char
                  to the string*/
                if (!found) {
                    newString += curr;
                }
            }
            /*Set current string to newString*/
            this.currString = newString;
            /*make distance (length of line) smaller*/
            this.distance*=this.percent;
        },
        /*Use the string to draw something*/
        turtle: function() {
            /*Save current coordinate system*/
            pushMatrix();
            /*Loop though the string*/
            for (var i = 0; i < this.currString.length; i++) {
                /*Loop through turtle rules*/
                for (var j = 0; j < this.turtleKey.length; j++) {
                    /*If the char points to a function*/
                    if (this.currString.charAt(i) === this.turtleKey[j].char) {
                        /*Do whatever it specifies*/
                        this.turtleKey[j].action();
                    }
                }
            }
            /*Undo transformations*/
            popMatrix();
        },
        /*After everything is done*/
        finish: function() {
            /*Undo transformations*/
            popMatrix();
        }
    };
    return obj;
};

/**FOREST**/

/*Everything to do with the forest*/
var forest = {
    /*An L-System for trees, pass in object*/
    Tree: function(config) {
        return LSystem({
            x: config.x,
            y: config.y,
            axiom: "X",
            distance: config.distance,
            angle: config.angle,
            rules: [
                {
                    from: "X",
                    to: config.str
                },
                {
                    from: "F",
                    to: "FF"
                }
            ],
            /*No extra turtle rules needed*/
            turtleKey: [],
        });
    },
    /*the tree which is currently loading*/
    currTree: 0,
    /*Load the forest*/
    loadForest: function() {
        if (this.currTree < this.trees.length) {
            stroke(255, 90);
            strokeWeight(random(0.5, 1.5));
            /*Generate and draw current tree*/
            var b = this.trees[this.currTree];
            b.start();
            for (var i = 0; i < 5; i++) {
                b.generate();
            }
            b.turtle();
            b.finish();
            /*Increment tree*/
            this.currTree++;
        } else {
            this.trees = null;
            /*Mask texture with trees img*/
            this.img.mask(get());
            scene = "main";
        }
    },
};

/*returns an array of all the tree objects*/
forest.trees = (function() {
    //x, y, angle, length, str
    var treeTypes = [
        {
            x: 33,
            y: 456,
            angle: 20,
            distance: 101,
            str: "F+[X-X]-F[-FX]+X"
        },
        {
            x: 43,
            y: 454,
            angle: -20,
            distance: 124,
            str: "F+[[X]-X]-F[-FX]+X"
        },
        {
            x: 517,
            y: 468,
            angle: -21,
            distance: 60,
            str: "F+[F+[X]FX-X]-F-FX+X"
        },
        {
            x: 304,
            y: 489,
            angle: 18,
            distance: 40,
            str: "+[F+FX-X]-F-FX+"
        },
        {
            x: 132,
            y: 517,
            angle: -13,
            distance: 55,
            str: "+[F+FFXX-X]-F-FX+X"
        },
        {
            x: 258,
            y: 529,
            angle: -31,
            distance: 29,
            str: "+FFX-[-X+XX+]-F[X]F+"
        },
        {
            x: 254,
            y: 477,
            angle: -20,
            distance: 54,
            str: "FF[-XF[-F][+FX+F]]FF[+F[-F]F+X]"
        },
        {
            x: 510,
            y: 500,
            angle: 8,
            distance: 44,
            str: "+FX-[-X+XX+]-F[+FX+F]FF[+F[-F]F+X]"
        },
        {
            x: 594,
            y: 469,
            angle: -50,
            distance: 14,
            str: "F+FFX-[-X+FXFX+]-FF[X]F+"
        },
        {
            x: 638,
            y: 467,
            angle: -20,
            distance: 38,
            str: "+[F+FXFXX-X]-F-FX+X[-F-FF]"
        },
        {
            x: 528,
            y: 467,
            angle: 27,
            distance: 155,
            str: "[-F]XF[-FX][++X][+FX][+F+X]"
        },
        {
            x: 40,
            y: 556,
            angle: -21,
            distance: 54,
            str: "F+[F[XX]FX]-F-FX+"
        },
        {
            x: 200,
            y: 596,
            angle: 15,
            distance: 134,
            str: "F+[F[XX]FX]-F-FX+"
        },
        {
            x: 153,
            y: 456,
            angle: 20,
            distance: 132,
            str: "F+[X-XF]-F[-FX]+FX"
        },
    ];
    /*Loop through types*/
    for (var i = 0; i < treeTypes.length; i++) {
        /*Create new Tree*/
        treeTypes[i] = forest.Tree(treeTypes[i]);
    }
    /*Return array*/
    return treeTypes;
})();

/*Texture that the trees will mask*/
forest.img = (function() {
    /*Off-screen graphics buffer*/
    var img = createGraphics(width, height, P2D);
    img.strokeWeight(3);
    /*Gradient*/
    for (var y = 0; y < height; y+=3) {
        img.stroke(lerpColor(
            color(77, 129, 250), 
            color(217, 73, 250), 
            y/height
        ));
        img.line(0, y, width, y);
    }
    /*Random ellipses, pale rainbow texture */
    img.colorMode(HSB);
    img.noStroke();
    for (var i = 0; i < 300; i++) {
        var s = random(50, 100);
        img.fill(random(255), 80, 255, 50);
        img.ellipse(random(width), random(height),
                    s, s);
    }
    /*Capture and return the image*/
    img = img.get();
    return img;
})();

/**Lights**/

var lightSystem = {
    numLights: 50,
    Light: function() {
        var vMag = 0.5;
        return {
            /*pos and velocity*/
            x: random(width),
            y: random(height),
            xVel: random(1) < 0.5 ? -vMag : vMag,
            yVel: random(1) < 0.5 ? -vMag : vMag,
            /*Size of light*/
            siz: random(1, 2),
            /*Counter for sin function*/
            counter: random(500),
            /*Colors*/
            outer: lerpColor(
                color(255, 183, 0),
                color(255, 102, 0),
                random(1)
            ),
            inner: lerpColor(
                color(252, 239, 151),
                color(255, 213, 0),
                random(1)
            ),
            opacity: 150,
            /*Draw and update*/
            run: function() {
                var siz = 2*sin(this.counter) + this.siz;
                /*Draw the light*/
                noStroke();
                fill(this.outer, this.opacity);
                ellipse(this.x, this.y, siz+3, siz+3);
                fill(this.inner, this.opacity);
                ellipse(this.x, this.y, siz, siz);
                /*Update Position*/
                this.x += this.xVel;
                this.y += this.yVel;
                /*If light hits edge, change velocity*/
                if (this.x < 0 || this.x > width) {
                    this.xVel *= -1;
                }
                if (this.y < 0 || this.y > height) {
                    this.yVel *= -1;
                } 
                /*Increment counter for sin function*/
                this.counter+=0.5;
            }
        };
    },
    run: function() {
        /*Loop through all lights and run them*/
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].run();
        }
    }
};

/*Return array of lights*/
lightSystem.lights = (function() {
    var array = [];
    for (var i = 0; i < lightSystem.numLights; i++) {
        array.push(lightSystem.Light());
    }
    return array;
})();

/**OTHER**/

/*Other parts of the graphic*/

var snow = (function() {
    randomSeed(47);
    background(0);
    /*Off-screen graphics buffer - snow mask*/
    var msk = createGraphics(width, height/4, P2D);
    msk.background(0);
    msk.noStroke();
    /*Draw the snow*/
    msk.fill(255);
    msk.beginShape();
        msk.vertex(0, 40);
        msk.bezierVertex(295, 16, 401, 74, width, 40);
        msk.vertex(width, 120);
        msk.vertex(0, 120);
    msk.endShape();
    /*Capture image*/
    msk = msk.get();
    /*The snow image*/
    var img = createGraphics(width, height/4, P2D);
    /*Gradient*/
    img.strokeWeight(2);
    for (var y = 0; y < img.height; y+=2) {
        img.stroke(lerpColor(
            color(129, 3, 255), 
            color(255, 255, 255), 
            y/img.height
        ));
        img.line(0, y, width, y);
    }
    /*Random lines - texture*/
    img.strokeWeight(1);
    img.stroke(255, 255, 255, 10);
    for (var i = 0; i < 100; i++) {
        img.line(0, random(img.height), 
                 img.width, random(img.height));
    }
    /*Pale rainbow ellipses*/
    img.colorMode(HSB);
    img.noStroke();
    for (i = 0; i < 100; i++) {
        img.fill(random(230), 160, 255, 20);
        img.ellipse(random(img.width), random(img.height*0.75),
                    random(100, 150), random(10, 20));
    }
    /*Random white dots on the snow*/
    for (var i = 0; i < 200; i++) {
        var w = random(0.5, 2);
        img.stroke(255, 200);
        img.strokeWeight(w+1);
        img.point(random(img.width), random(img.height));
        img.strokeWeight(w);
        img.point(random(img.width), random(img.height));
    }
    /*Capture, mask, and return image*/
    img = img.get();
    img.mask(msk);
    return img;
})();

var backdrop = (function() {
    /*Off-screen graphics*/
    var img = createGraphics(width, height, P2D);
    /*Some variables*/
    var amt = img.width*0.2;
    var genX = new Random(1);
    var genY = new Random(2);
    img.background(1, 5, 20);
    img.angleMode = "degrees";
    img.pushMatrix();
    /*Random stars*/
    for (var i = 0; i < 3000; i++) {
        img.stroke(255, random(50, 150));
        /*Chance of random star anywhere*/
        if (random(1) < 0.4) {
            img.strokeWeight(random(0.2, 2));
            img.point(random(width), random(height));
        } else {
            /*Star is in the belt of stars*/
            img.strokeWeight(random(0.2, 2.5));
            img.pushMatrix();
            img.translate(260, 100);
            img.rotate(-39);
            /*Use normal distr to pick pos*/
            img.point(
                genX.nextGaussian()*250,
                genY.nextGaussian()*30
            );
            img.popMatrix();
        }
    }
    /*translate to moon position*/
    img.translate(430, 445);
    img.noStroke();
    /*Random arcs everywhere about the moon*/
    for (var d = img.height*2; d > 0; d--) {
        /*Rotate random angle*/
        var r = random(360);
        img.pushMatrix();
        img.rotate(r);
        /*height of arc determines color*/
        img.fill(lerpColor(
            color(116, 47, 153),
            color(45, 2, 140),
            map(d, 0, img.height*2, 0, 1)
        ), 5);
        img.arc(0, 0, random(20, 70), d, 0, 180);
        img.popMatrix();
    }
    /*Moon*/
    img.scale(4);
    for (var d = 0, add = 0; d < 50; d+=add, add+=0.5) {
        /*Random size, pick opacity*/
        var siz = random(5, 10);
        img.fill(255, random(-1, 3) + map(d, 0, width*0.5, 1, 3));
        for (var r = 0; r < 360; r+=3) {
            img.pushMatrix();
            img.rotate(r);
            img.ellipse(d+add, 0, siz*random(-siz/5, siz/3), siz);
            img.popMatrix();
        }
    }
    img.popMatrix();
    /*Return the image*/
    return img.get();
})();

/**DRAW**/

function draw() {
    switch (scene) {
        case "loading":
            /*Load the forest*/
            forest.loadForest();
            break;
        case "main":
            /*Draw everything, run light system*/
            image(backdrop, 0, 0);
            image(forest.img, 0, 0);
            image(snow, 0, 400);
            lightSystem.run();
            break;
    }
}
