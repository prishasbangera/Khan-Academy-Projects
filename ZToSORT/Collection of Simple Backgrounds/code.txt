//Hope you like this collection of simple backgrounds and textures. 
//Contributions welcome!
//Feel free to use and tweak them. *As long as you know how they work,* no credit needed.

//Important! Make sure to use image caching if you're planning to use the draw function in your program.

var scene = 0;
var scenes = [
    //random lines texture
    function() {
        colorMode(RGB); //set color mode
        background(132, 0, 255); //purple background
        stroke(255, 6); //an almost-transparent white
        strokeWeight(1);
        for (var i = 0; i < 10000; i++) {
            //draw a random line anywhere on the canvas 10000 times
            line(random(width), random(height), random(width), random(height));
        }
    },    
    //rainbow squares texture
    function() {
        colorMode(HSB); //set color mode to HSB 
        background(255, 255, 255); //white background
        noStroke(); //begone, stroke!
        rectMode(CENTER); //position rects by CENTER
        for (var i = 0; i < 10000; i++) {
            //fill a random hue, almost transparent, and draw a random rect
            fill(random(255), 255, 255, 15);
            rect(random(width), random(height), random(50, 100), random(50, 100));
        }
    }, 
    //squares texture, but within a range of hues
    function() {
        colorMode(HSB); //hue, saturation, brightness
        background(255, 255, 255); //white background
        noStroke(); //begone, stroke!
        rectMode(CENTER); //position rect by CENTER
        for (var i = 0; i < 10000; i++) {
            //fill within a range a hues, draw a random almost-transparent rect
            fill(random(150, 245), 255, 255, 15);
            rect(random(width), random(height), random(100, 200), random(100, 200));
        }
    },
    //random lines receding into the distance
    function() {
        colorMode(RGB); //color mode default
        background(0); //black background
        strokeWeight(0.5);
        //y values from 0 to height
        for (var y = 0; y < height; y+=0.5) {
            //stroke color is white, map transparency according to y
            stroke(255, map(y, 0, height, 10, 120));
            //draw a random line at that y plus or minus some
            line(0, y+random(-30, 30), width, y+random(-30, 30));
        }
    },
    //a pale rainbow background
    function() {
        colorMode(HSB); //color mode is hue, saturation, brightness
        background(255); //white background
        strokeWeight(1);
        //y values from 0 to height
        for (var y = 0; y < height; y++) {
            //map y to hue, saturation is 150 for paleness
            stroke(map(y, 0, height, 0, 255), 150, 255);
            //a line across the canvas at that y
            line(0, y, width, y);
        }
    },
    //square/plaid background using bitwise operator XOR
    function() {
        colorMode(RGB); //default color mode
        background(149, 207, 192); //a pale blue-green background
        stroke(9, 99, 63); //a darker green
        for (var x = 0; x < width; x+=2) {
            for (var y = 0; y < height; y+=2) {
                //set random seed to y XOR x divided by 100
                //change 100 to see the different stages of the fractal(if it is a fractal?)
                randomSeed((y^x)/100); //concept of changing randomSeed from Baller4Life
                strokeWeight(random(0, 5));
                point(x, y); //draw a point at x, y
            }
        }
    },
    //general spiral
    function() {
        colorMode(RGB); //color mode is default
        background(0); //black background
        strokeWeight(1);
        stroke(255);
        var r = 0; //rotate by
        pushMatrix(); //save current coordinate system
        //(0, 0) is now center of screen
        translate(width/2, height/2); //translate
        //from distance 0 to 270
        for (var d = 0; d < 270; d+=0.05) {
            pushMatrix(); //save previous coordinate system
            rotate(r); //rotate by r
            point(d, 0); //draw a point d units away from (0, 0)
            popMatrix(); //go back to previous system
            r+=0.5; //increment angle
        }
        popMatrix(); //revert to previous coordinate system
    },
    //sun spiral
    function() {
        colorMode(RGB); //default color mode
        background(0); //black background
        pushMatrix(); //save current coordinate system
        strokeWeight(1); 
        stroke(255, 200, 0); //yellow
        var r = 0; //rotate by
        //translate to center of screen
        translate(width/2, height/2);
        //from distance 0 to 270
        for (var d = 0; d < 270; d+=0.2) {
            pushMatrix(); //save current coordinate system
            rotate(r); //rotate by angle
            point(d, 0); //draw a point d units away from (0, 0)
            popMatrix(); //revert to previous system
            r+=10; //increment r
        }
        popMatrix(); //revert to previous coordinate system
    },
];

scenes[0]();

mouseClicked = function() {
    if (scene++ > scenes.length-1) {
        scene = 0;
    }
    scenes[scene]();
};
