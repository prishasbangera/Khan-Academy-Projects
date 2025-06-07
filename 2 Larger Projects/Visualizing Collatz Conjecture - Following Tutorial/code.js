//NOTE: I'm not intelligent enough to come up with this.
//Adapted from Daniel Shiffman's program
//Here's my source: https://editor.p5js.org/codingtrain/sketches/XjLDE7gu6

//About do...while loops: w3schools.com/java/java_while_loop.asp;

/*
  The Collatz Conjecture speculates that if you have any positive
  integer, and if you follow these rules:
        1. If number is even, divide by 2
        2. If number is odd, mult by 3 and add 1
        3. Repeat
  ...you'll always eventually get to one. However, this has never
  been proven by mathematicians. That's why it's such a big deal.
  
*/

//Thanks to Bluish for helping to stop OhNoes from saying that a do-while loop is taking too long (see help requests)

textFont(createFont("monospace"), 20);
textAlign(CENTER, CENTER);

//Variables - Play with these
var length = 7; //the length of each branch
var angle = 9; //next branch turns by this angle

background(0);

colorMode(HSB); //use hue-saturation-brightness color system

//Does n/2 if number is even, and 3n+1 if num is odd
function collatz(n) {
    
    //if n is even
    if (n % 2 === 0) {
        return n/2; //divide n by 2
    } else {
        //it's odd
        return (n * 3 + 1)/2; //multiply n by 3, add 1 then /2
        //Why divide by 2? This speeds up the process because
        //n*3+1 is always going to be an even number
        //odd*odd + 1 = anotherOdd + 1 = even
    }
    
}

draw = function() {
    
    var sequence = []; //this will trace the numbers path
    var n = frameCount+1;
    
    //display n
    fill(0);
    noStroke();
    ellipse(570, 580, 100, 100);
    fill(255);
    text(n, 570, 580);
    
    //click to stop the program
    if (mouseIsPressed) {
        fill(0);
        ellipse(570, 580, 100, 100);
        noLoop();
    }
    
    do {
        sequence.push(n); //push n to the sequence path
        n = collatz(n); //do the collatz function
    } while (n !== 1); //while n is not 1
    sequence.push(1); //push 1, the end, to the sequence
    
    //instead of going from the number to 1, go from 1 to the num
    sequence.reverse(); //reverse the array
    
    pushMatrix(); //save current coordinate system
    translate(width/2, height); //translate to start pos
    
    //loop through the numbers in the sequence array
    for (var j = 0; j < sequence.length; j++) {
        //if the number is odd
        if (sequence[j] % 2 === 0) {
           rotate(-angle); //rotate one way
        } else {
            rotate(angle); //rotate the opposite way
        }
        //map the number from 0 to 4000 to 0 to 255 (hue)
        var h = map(sequence[j], 0, 4000, 0, 255);
        stroke(h, 200, 205, 100); //color of the branch
        //draw the branch, then go up the tree by length
        line(0, 0, 0, -length);
        translate(0, -length);
    }
    
    popMatrix(); //revert to original coordinate system
    
};

//draw the tree - old code
/*
var upTo = 2400;
for (var i = 1; i < upTo; i++) {
    
    var sequence = []; //this will trace the numbers path
    var n = i;
    
    do {
        sequence.push(n); //push n to the sequence path
        n = collatz(n); //do the collatz function
    } while (n !== 1); //while n is not 1
    sequence.push(1); //push 1, the end, to the sequence
    
    //instead of going from the number to 1, go from 1 to the num
    sequence.reverse(); //reverse the array
    
    pushMatrix(); //save current coordinate system
    translate(width/2, height); //translate to start pos
    
    //loop through the numbers in the sequence array
    for (var j = 0; j < sequence.length; j++) {
        //if the number is odd
        if (sequence[j] % 2 === 0) {
           rotate(-angle); //rotate one way
        } else {
            rotate(angle); //rotate the opposite way
        }
        //map the number from 0 to 4000 to 0 to 255 (hue)
        var h = map(sequence[j], 0, 4000, 0, 255);
        stroke(h, 200, 205, 100); //color of the branch
        //draw the branch, then go up the tree by length
        line(0, 0, 0, -length);
        translate(0, -length);
    }
    
    popMatrix(); //revert to original coordinate system

}
*/