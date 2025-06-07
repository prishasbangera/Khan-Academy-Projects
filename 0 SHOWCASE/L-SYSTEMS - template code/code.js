/*Dumped my l-system object thingy from my Serene Winter Night graphic here, with slight modifications*/

background(0);
colorMode(HSB);
var hu = 0;

var LSystem = function(config) {
    var obj = {
        /*Position*/
        x: config.x,
        y: config.y,
        /*At start, current sentence is axiom*/
        currString: config.axiom,
        /*How much to rotate/travel each step*/
        angle: config.angle,
        distance: config.distance,
        percent: config.percent || 0.5,
        numIter: config.numIter || 4,
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
                    hu++;
                    stroke(hu%255, 255, 255);
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
                        break;
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

var lSystems = [];

/*Bottom left thing*/
lSystems.push(
    LSystem({
        x: 87,
        y:  250,
        axiom: "-F-F",
        distance: 120,
        numIter: 5,
        angle: -60,
        rules:[
            {
                from:"F",
                to: "F−+F+FFFFF"
            },
        ],
        turtleKey: []
    })
);

/*Sierpinski's Triangle*/
lSystems.push((function() {
    var obj = LSystem({
        x: 8,
        y:  200,
        axiom: "G",
        distance: 190,
        angle: 60,
        numIter: 6,
        rules:[
            {
                from: "F",
                to: "G+F+G"
            },
            {
                from: "G",
                to: "F-G-F"
            }
        ],
        turtleKey: [
            {
                char: "G",
                action: function() {
                    stroke(hu%255, 255, 255);
                    line(0, 0, 0, -obj.distance);
                    translate(0, -obj.distance);
                    hu+=0.5;
                }
            }    
        ]
    });
    return obj;
})());

/*Dragon Curve*/
lSystems.push((function() {
    var obj = LSystem({
        x: 248,
        y:  350,
        axiom: "FX",
        distance: 100,
        angle: 90,
        percent: 0.72,
        numIter: 10,
        rules:[
            {
                from: "X",
                to: "X+YF+"
            },
            {
                from: "Y",
                to: "-FX-Y"
            }
        ],
        turtleKey: []
    });
    return obj;
})());

/*Gosper Curve*/
lSystems.push((function() {
    var obj = LSystem({
        x: 460,
        y:  30,
        axiom: "F",
        distance: 100,
        angle: 60,
        percent: 0.46,
        numIter: 5,
        rules:[
            {
                from: "F", 
                to: "F-G--G+F++FF+G-"
            },
            {
                from: "G", 
                to: "+F-GG--G-F++F+G"
            }
        ],
        turtleKey: [
            {
                char: "G",
                action: function() {
                    hu++;
                    stroke(hu%255, 255, 255);
                    line(0, 0, 0, -obj.distance);
                    translate(0, -obj.distance);
                }
            }    
        ]
    });
    return obj;
})());

for (var i = 0; i < lSystems.length; i++) {
    var l = lSystems[i];
    l.start();
    for (var j = 0; j < l.numIter; j++) {
        l.generate();
    }
    l.turtle();
    l.finish();
    hu = 0;
}