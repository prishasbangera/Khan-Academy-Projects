/*Syntax: string, x position, y position, scale, color, boldness(optional, default: 2)*/
/*Things to think about: scaling? spacing...*/

var jofferyFontData = {
    txtHeight: 34, 
    txtSpacing: 4 //spacing between each char
};
jofferyFontData.characters = {
    //UPPER CASE {
    "A": function() {
            beginShape();
            vertex(6, 0);
            bezierVertex(2, 15, 2, 17, 0, 27);
            endShape();
            beginShape();
            vertex(6, 0);
            bezierVertex(7, 13, 8, 10, 9, 27);
            endShape();
            line(2, 17, 7, 17);
            return 9;
        },
    "B": function() {
            beginShape();
            vertex(0, 0);
            bezierVertex(4, -2, 8, 10, 0, 13);
            bezierVertex(7, 14, 8, 26, 0, 27);
            endShape();
            line(0, 0, 0, 27);
            return 4;
        },
    "C":function() {
            beginShape();
            vertex(7, 1);
            bezierVertex(0, -10, -3, 35, 6, 27);
            endShape();
            return 7;
        },
    "D": function() {
            beginShape();
            vertex(0, 0);
            vertex(0, 27);
            bezierVertex(15, 13, 0, -6, 0, 1);
            endShape();
            return 6;
        },
    "E": function() {
            line(0, 0, 0, 27);
            line(0, 0, 5, 0);
            line(0, 27, 5, 27);
            line(0, 13, 3, 13);
            return 5;
        },
    "F": function() {
            line(0, 0, 5, 0);
            line(0, 0, 0, 27);
            line(0, 10, 3, 10);
            return 5;
        },
    "G": function() {
            beginShape();
            vertex(7, 0);
            bezierVertex(-5, -1, 0, 38, 8, 24);
            bezierVertex(9, 22, 8, 14, 8, 15);
            vertex(5, 15);
            endShape();
            return 8;
        },
    "H": function() {
            line(0, 0, 0, 27);
            line(7, 0, 7, 27);
            line(0, 12, 7, 12);
            return 7;
        },
    "I": function() {
            line(0, 0, 4, 0);
            line(2, 0, 2, 27);
            line(0, 27, 4, 27);
            return 4;
        },
    "J": function() {
            line(3, 0, 9, 0);
            beginShape();
            vertex(0, 27);
            bezierVertex(9, 30, 5, 6, 6, 0);
            endShape();
            return 9;
        },
    "K": function() {
            line(0, 0, 0, 27);
            beginShape();
            vertex(6, 0);
            bezierVertex(6, 11, 4, 11, 0, 15);
            bezierVertex(3, 17, 8, 17, 6, 27);
            endShape();
            return 6;
        },
    "L": function() {
            line(0, 0, 0, 27);
            line(0, 27, 7, 27);
            return 7;
        },
    "M": function() {
            beginShape();
            vertex(0, 27);
            vertex(0.6, 0);
            vertex(4, 13);
            vertex(9, 0);
            vertex(9, 27);
            endShape();
            return 9;
        },
    "N": function() {
            beginShape();
            vertex(0, 27);
            vertex(0, 0);
            vertex(8, 27);
            vertex(8, 0);
            endShape();
            return 8;
        },
    "O": function() {
            beginShape();
            vertex(0, 13);
            bezierVertex(-1, -4, 9, -4, 8, 13);
            bezierVertex(9, 27, 0, 37, 0, 13);
            endShape();
            return 8;
        },
    "P": function() {
            line(0, 0, 0, 27);
            beginShape();
            vertex(0, 0);
            bezierVertex(10, 4, 5, 15, 0, 19);
            endShape();
            return 5;
        },
    "Q": function() {
            line(4, 23, 7, 31);
            beginShape();
            vertex(4, 0);
            bezierVertex(0, -2, -1, 31, 4, 27);
            bezierVertex(12, 21, 7, -2, 4, 0);
            endShape();
            return 8;
        },
    "R": function() {
            line(0, 0, 0, 27);
            beginShape();
            vertex(0, 0);
            bezierVertex(9, -3, 5, 20, 0, 13);
            bezierVertex(7, 21, 5, 20, 7, 27);
            endShape();
            return 7;
        },
    "S": function() {
            beginShape();
            vertex(0, 27);
            bezierVertex(8, 30, 6, 19, 4, 16);
            bezierVertex(-7, -5, 9, 0, 6, 0);
            endShape();
            return 6;
        },
    "T": function() {
            line(1, 0, 7, 0);
            line(4, 0, 4, 27);
            return 7;
        },
    "U": function() {
            beginShape();
            vertex(0, 0);
            bezierVertex(-4, 42, 13, 32, 7, 0);
            endShape();
            return 7;
        },
    "V": function() {
            beginShape();
            vertex(1, 0);
            bezierVertex(3, 17, 2, 15, 5, 27);
            bezierVertex(9, 5, 6, 16, 9, -1);
            endShape();
            return 9;
        },
    "W": function() {
            beginShape();
            vertex(0, 0);
            vertex(2, 27);
            vertex(6, 13);
            vertex(9, 27);
            vertex(12, 0);
            endShape();
            return 12;
        },
    "X": function() {
            line(1, 0, 7, 27);
            line(8, 0, -1, 27);
            return 7;
        },
    "Y": function() {
            line(1, 0, 4, 14);
            line(8, 0, 4, 14);
            line(4, 14, 4, 27);
            return 8;
        },
    "Z": function() {
            beginShape();
            vertex(1, 0);
            vertex(6, 0);
            vertex(0, 27);
            vertex(6, 27);
            endShape();
            return 6;
        },
    //}
    //NUMBERS {
    "0": function() {
            beginShape();
            vertex(5, 0);
            bezierVertex(3, -3, -4, 24, 5, 27);
            bezierVertex(9, 27, 11, -3, 5, 0);
            endShape();
            return 8;
        },
    "1": function() {
            line(0, 4, 3, 0);
            line(3, 0, 2, 27);
            line(0, 27, 4, 27);
            return 4;
        },
    "2": function() {
            beginShape();
            vertex(0, 1);
            bezierVertex(5, -2, 4, 9, 0, 27);
            vertex(4, 27);
            endShape();
            return 4;
        },
    "3": function() {
            beginShape();
            vertex(0, 0);
            bezierVertex(8, 0, 0, 17, 0, 14);
            bezierVertex(8, 23, 1, 25, 0, 27);
            endShape();
            return 4;
        },
    "4": function() {
            line(5, 0, 5, 27);
            beginShape();
            vertex(5, 0);
            bezierVertex(3, 8, 2, 8, 0, 20);
            bezierVertex(4, 21, 2, 19, 7, 20);
            endShape();
            return 7;
        },
    "5": function() {
            beginShape();
            vertex(4, 0);
            vertex(0, 0);
            vertex(0, 15);
            bezierVertex(6, 9, 7, 29, 0, 27);
            endShape();
            return 4;
        },
    "6": function() {
            beginShape();
            vertex(6, 0);
            bezierVertex(0, 1, 1, 9, 1, 13);
            bezierVertex(0, 42, 14, 17, 1, 13);
            endShape();
            return 6;
        },
    "7": function() {
            beginShape();
            vertex(0, 0);
            bezierVertex(7, -1, 4, 3, 3, 27);
            endShape();
            return 4;
        },
    "8": function() {
            beginShape();
            vertex(3, 0);
            bezierVertex(-4, 7, 11, 26, 2, 27);
            bezierVertex(-4, 19, 12, 1, 3, 0);
            endShape();
            return 5;
        },
    "9": function() {
            beginShape();
            vertex(5, 27);
            vertex(5.5, 0);
            bezierVertex(-3, 0, 0, 22, 5, 10);
            endShape();
            return 6;
        },
    //}
    //ETC {
    ".": function() {
            ellipse(0, 28, 0.4, 0.4);
            return 0;
        },
    " ": function() {
        return jofferyFontData.txtSpacing;
    },
    ",": function() {
            ellipse(0, 28, 1.0, 1.0);
            beginShape();
            vertex(0, 28);
            bezierVertex(3, 27, 0, 33, -1, 33);
            endShape();
            return 2;
        },
    ";": function() {
            ellipse(1, 13, 1.0, 1.0);
            ellipse(1, 23, 1.0, 1.0);
            beginShape();
            vertex(1, 23);
            bezierVertex(4, 21, 1, 28, 0, 29);
            endShape();
            return 3;
        },
    ":": function() {
            ellipse(1, 13, 1.0, 1.0);
            ellipse(1, 26, 1.0, 1.0);
            return 2;
        },
    "\'": function() {
            ellipse(0, 1, 0.9, 0.9);
            beginShape();
            vertex(0, 1);
            bezierVertex(1, 0, 2, 4, 0, 5);
            endShape();
            return 0;
        },
    "!": function() {
            line(0, 0, 0, 24);
            ellipse(0, 28, 0.4, 0.4);
            return 0;
        },
    "\"": function() {
            //left
            ellipse(0, 1, 0.9, 0.9);
            beginShape();
            vertex(0, 1);
            bezierVertex(1, 0, 2, 4, 0, 5);
            endShape();
            //right
            ellipse(4, 1, 0.9, 0.9);
            beginShape();
            vertex(4, 1);
            bezierVertex(5, 0, 6, 4, 4, 5);
            endShape();
            return 6;
        },
    "/": function() {
            line(0, 27, 11, 3);
            return 11;
        },
    "?": function() {
            beginShape();
            vertex(0, 2);
            bezierVertex(5, -5, 15, 7, 1, 14);
            vertex(1, 24);
            endShape();
            ellipse(1, 28, 0.4, 0.4);
            return 2;
        },
    "(": function() {
            beginShape();
            vertex(5, 0);
            bezierVertex(-1, 12, -1, 19, 5, 29);
            endShape();
            return 5;
        },
    ")": function() {
            beginShape();
            vertex(2, 0);
            bezierVertex(7, 12, 7, 19, 2, 29);
            endShape();
            return 5;
        },
    //}
};
function joffreyText(str, x, y, s, clr, boldness) {
    str = str.toUpperCase();
    strokeJoin(ROUND);
    var currX = 0;
    var currY = 0;
    //draw
    pushMatrix();
    translate(x, y); //to pos
    //take care of scale, siz, boldness, clr...
    scale(s/10); //Divide so that scale makes sense...
    stroke(clr);
    noFill();
    strokeWeight(boldness||2);
    //go through the string
    for (var i = 0; i < str.length; i++) {
        pushMatrix();
        translate(currX, currY); //translate to the current character
        //if not \n (which is line break)
        if (str[i] !== "\n") {
            //draw char, translate by textW that char function returns plus text spacing
            currX += jofferyFontData.characters[str[i]]() + jofferyFontData.txtSpacing;
        } else {
            //line break
            currX = 0; //reset x
            currY += jofferyFontData.txtHeight; //add to y
        }
        popMatrix();
    }
    popMatrix();
    strokeJoin(MITER);
} 

//Examples
background(0);
joffreyText("ABCDEFGHIJKLM\nNOPQRSTUVWXYZ\n0123456789.!?,;:/()\"\'", 6, 9, 17, color(255, 255, 255), 2);
joffreyText("In your face,\nJoffrey! :D", 266, 25, 10, color(191, 0, 255), 1);
joffreyText("Singleplayer", 21, 213, 14, color(255));
joffreyText("Multiplayer", 213, 213, 14, color(255));
joffreyText("How to Play", 26, 274, 14, color(255));
joffreyText("Credits", 237, 274, 14, color(255));
joffreyText("Team Among Us", 52, 330, 21, color(224, 175, 78), 3);