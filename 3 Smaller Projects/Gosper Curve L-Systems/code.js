//Adapted from my project on L-Systems, except I added color.

/*

Read about L-Systems here: https://en.wikipedia.org/wiki/L-system

Here's an example:

Axiom, or Starting String: A
Rules: A becomes AB, B becomes A

This is what is generated
Generation | String
1            A
2            AB
3            ABA
4            ABAAB
5            ABBABABA

Then we can take the generated string, and do different things for different characters (A can mean draw a line, B can mean rotate by an angle, etc).

The set of rules in this program is from Wikipedia.

*/
var h = 0;
strokeWeight(2);
colorMode(HSB);
var length = 3.9; //Start length of the line
var angle = 60;
var originPoint = {
    x: 540,
    y: 130
};

/****************************************/

var axiom  = "A"; //start state of LSystem
var sentence = axiom; //at first, sentence is axiom
background(0);

var rules = []; //use an array of rules for flexibility

//Define rules for generating the LSystem
rules[0] = {
    from: "A", 
    to: "A-B--B+A++AA+B-"
};
rules[1] = {
    from: "B", 
    to: "+A-BB--B-A++A+B"
};

//generate the next sentence
function generate() {

    var nextSentence = ""; //an empty string
    //loop through the current sentence
    for (var i = 0; i < sentence.length; i++) {
        var foundRule = false;
        //loop through the rules 
        for (var j = 0; j < rules.length; j++) {
            //if the curr character matches the from in a rule
            if (sentence[i] === rules[j].from) {
                foundRule = true; //the rule was found
                //add to the sentence, according to the rule
                nextSentence += rules[j].to;
                break; //exit the loop if found
            }
        }
        //if the rule was not found after for loop
        if (!foundRule) {
            //add character to the sentence, no rules changed it
            nextSentence+=sentence[i];
        }
    }
    sentence = nextSentence; //update the sentence
    
}

/****************************************/

//Implement Turtle Graphics - this reads the current sentence, and follows the rules for each character. For example, a + in the sentence means rotate by angle

//an array of rules for the turtle graphics
var turtleRules = [];

/* Template

turtleRules[i] = {
    char: "" //if this character is in the sentence
    doThis: function() {
        //do something
    }
};

*/


//Define the turtle rules

turtleRules[0] = {
    char: "A",
    doThis: function() {
        stroke(h, 255, 255);
        h++;
        line(0, 0, 0, -length); //draw a line
        translate(0, -length); //translate to line's endpoint
    }
};

turtleRules[1] = {
    char: "B",
    doThis: function() {
        stroke(h, 255, 150);
        h++;
        line(0, 0, 0, -length); //draw a line
        translate(0, -length); //translate to line's endpoint
    }
};

turtleRules[2] = {
    char: "+",
    doThis: function() {
        rotate(angle); //rotate by angle
    }
};

turtleRules[3] = {
    char: "-",
    doThis: function() {
        rotate(-angle); //rotate by negative angle
    }
};


//function to read the sentence and interpret to draw things!
function turtle() { 
    //loop through sentence
    for (var i = 0; i < sentence.length; i++) {
        //loop through turtle rules
        for (var j = 0; j < turtleRules.length; j++) {
            //if current char matches char of a turtle rule
            if (sentence[i] === turtleRules[j].char) {
                if (h > 255) {
                    h = 0;
                }
                //do the function specified
                turtleRules[j].doThis(); 
                //exit the for loop
                break;
            }
        }
    }
}

/****************************************/

background(0); //a black background
for (var i = 0; i < 5; i++) {
    generate(); //generate the next sentence 5 times
}

pushMatrix();
translate(originPoint.x, originPoint.y);
turtle();
popMatrix();

random(); //so that restart button appears