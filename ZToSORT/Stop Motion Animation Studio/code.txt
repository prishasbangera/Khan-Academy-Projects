/**
    Nickname: Prisha B.
    Current Level: Intermediate
    Competition: Challenge 2 - Interactive Images
**/

//Drag sliders to change ball size and color
//Click and drag the ball itself to move it around.
//Click the camera button to take a pic.
//Click the triangle play button to view the animation!
//Click the save button (looks like down arrow) to save!
//You can edit after saving!

var ballClr = color(199, 40, 74); // the color of the bouncy ball
var animationFrameRate = 10; //how fast you want your animation to be

//Add some code for a nice setting here!
var setting = function() {
    background(255);
};

//PASTE SAVE CODE HERE
var frames = []; 










//The most unorganized and inefficient code you ever did see

//Preferences and setup
rectMode(CENTER); //pos rects by center
imageMode(CENTER); //pos imgs by center
textAlign(CENTER, CENTER); //pos text by center
textFont(createFont("Trebuchet MS")); //set text font

var scene = "studio"; //current scene
var currFrame = 0; //the current frame when the animation is playing
var dragging = false; //is the user dragging something?

//a function to determine if mouse is over something (pos by center)
var isMouseOver = function(x, y, w, h) {
    //if mouseX is to right of left corners, but to left of right corners
    //and mouseY is below top corners but above the bottom corners
    //then mouse is over the thing
    return mouseX > x-w/2 && mouseY > y-h/2 &&
           mouseX < x+w/2 && mouseY < y+h/2;
};

//Button Object Type {

//pass in an object for constructor
var Button = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.img = config.img; //a function to draw the button
    this.action = config.action; //what the button does when clicked
    this.w = 50; //size of each button
    this.h = 50;
};

//To draw the button
Button.prototype.draw = function() {
    //If mouse is hovering over button and user is not dragging anything
    if (isMouseOver(this.x, this.y, this.w, this.h) && !dragging) {
        //draw a light gray rect behind the button
        fill(80);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
    //draw button image at pos
    this.img(this.x, this.y);
};

//To handle a mouseClick
Button.prototype.handleClick = function() {
    //If the mouse is over the button
    if (isMouseOver(this.x, this.y, this.w, this.h)) {
        //do whatever action the button specifies
        this.action();
    }
};

//for masking buttons, pass in greyscale colors for gradient
Button.prototype.createGrad = function(lighter, darker) {
    var grad = createGraphics(this.w, this.h, P2D); //off-screen graphics
    grad.strokeWeight(2);
    for (var y = 0; y < grad.height+2; y+=2) {
        //map y of line to color
        grad.stroke(map(y, 0, grad.height, lighter, darker));
        //draw a line across the image at that y
        grad.line(0, y, grad.width, y);
    }
    grad = grad.get(); //capture the image
    return grad; //return the image
};

//}

//Slider Object Type {

//pass in an object for constructor
var Slider = function(config) {
    this.x = config.x; //x coordinate (stays the same)
    //y is initially middle point between range max and min
    this.y = (config.range.min + config.range.max)/2;
    this.w = 30; //slider button width
    this.h = 17; //slider button height
    this.range = config.range; //min and max y values
    this.value = config.value; //value, min, and max that slider affects
    //set current value to middle of max and min
    this.value.curr = (this.value.min + this.value.max) / 2;
    this.label = config.label; //label on the slider (text)
    this.dragging = false; //is the user dragging the slider?
};

//a method to draw the slider
Slider.prototype.draw = function() {
    //a line from range Y minimum to max
    stroke(255);
    strokeWeight(2);
    line(this.x, this.range.min, this.x, this.range.max);
    //the slider button thing itself, draw at current Y
    stroke(100);
    fill(255);
    rect(this.x, this.y, this.w, this.h, 5);
    //the label
    fill(100);
    textSize(11);
    text(this.label, this.x, this.y);
};

//a method to handle drag to update the slider (in mouseDragged)
Slider.prototype.handleDrag = function() {
    //if mouse is over the slider thing and user is not dragging anything else
    if (isMouseOver(this.x, this.y, this.w, this.h) && !dragging) {
        this.dragging = true; //the slider is being dragged!
        dragging = true; //global boolean true so nothing else gets dragged
        //using this method also makes sure that the slider is still updating
        //even if the user drags it really fast
    }
    //If this slider is being dragged
    if (this.dragging) {
        //set this.y to mouseY, but remember to constrain to min and max
        this.y = constrain(mouseY, this.range.min, this.range.max);
        //map y to the value min and max. Used to actually change things
        this.value.curr = map(this.y, this.range.min, this.range.max,
                                 this.value.min, this.value.max);
    }
};

//When mouse is released, and if the slider is being dragged, set to false
Slider.prototype.handleRelease = function() {
    if (this.dragging) {
        this.dragging = false;
    }
};

//}

var toolbar = {
    w: 100, //width of the toolbar
    gridOn: false, //is the grid on right now?
    createSliders: function() {
        var sliderSpacing = 19; //x spacing between the sliders
        var sliderRangeY = 108; //slider range Y
        //set the size slider
        this.sizeSlider = new Slider({
            //set x according to sliderSpacing
            x: width - this.w/2 - sliderSpacing,
            //set range y according to sliderRangeY
            range: {min: height*0.8-sliderRangeY/2,
                    max: height*0.8+sliderRangeY/2}, 
            value: {min: 200, max: 20}, //size 200 to 20 (inverted)
            label: "Size"
        });
        //set the brightness slider
        this.brightSlider = new Slider({
            x: width - this.w/2 + sliderSpacing,
            range: {min: height*0.8-sliderRangeY/2,
                    max: height*0.8+sliderRangeY/2},
            value: {min: 0, max: 255}, //brightness between 0 and 255
            label: "Clr"
        });
    },
    run: function() {
        
        //if the grid is on
        if (this.gridBtn.gridOn) {
            //draw a grid
            stroke(150);
            strokeWeight(1.5);
            for (var i = 0; i < 4; i++) {
                line(0, i*100+100, width, i*100+100);
                line(i*100+100, 0, i*100+100, height);
            }
        }
        
        //draw the toolbar background
        fill(0);
        noStroke();
        rect(width-this.w/2, height/2, this.w, height);
        
        //draw all the interactive elements
        this.gridBtn.draw();
        this.playBtn.draw();
        this.camBtn.draw();
        this.saveBtn.draw();
        this.sizeSlider.draw();
        this.brightSlider.draw();
        
        //display the number of pictures taken above the camera button
        fill(255);
        textSize(13);
        text("Frames: " + frames.length, width-this.w/2, 
              this.camBtn.y-this.camBtn.h/1.4);
              
    },
    handleClick: function() {
        //on click, check if any of the buttons were clicked
        this.playBtn.handleClick();
        this.camBtn.handleClick();
        this.gridBtn.handleClick();
        this.saveBtn.handleClick();
    },
    handleRelease: function() {
        //on mouse release, if any of the sliders were being dragged,
        //set dragging to false
        this.sizeSlider.handleRelease();
        this.brightSlider.handleRelease();
    },
    handleDrag: function() {
        //check if dragging, then act accordingly
        this.sizeSlider.handleDrag();
        this.brightSlider.handleDrag();
    },
};
//Need this so that I can use toolbar.w and sliderSpacing to create sliders
toolbar.createSliders();

var bouncyBall = {
    x: 200, //start X is 200
    y: 200, //start Y is 200
    lerpAmt: 0.7, //amount to lerp between color and brightness
    clr: ballClr, //ball color from global variable above
    handleDrag: function() {
        //if mouseDragged, nothing else is being dragged, & mouse is over ball
        if (!dragging && !this.isDragging && 
            dist(mouseX, mouseY, this.x, this.y) <= this.size) {
            //find the distance between mouse and center of ball
            this.distX = mouseX - this.x;
            this.distY = mouseY - this.y;
            //set dragging to true
            this.isDragging = true; 
            dragging = true;
        }
        //if ball is being dragged
        if (this.isDragging) {
            //use distance between initial pos and mouse pos to set new pos
            //if we didn't use distance, then ball's center will teleport
            //to mouseX and mouseY
            this.x = mouseX - this.distX;
            this.y = mouseY - this.distY;
        } 
    },
    handleRelease: function() {
        if (this.isDragging) {
            this.isDragging = false;
        }
    },
    update: function() {
        //if the size is not equal to the current size slider value
        if (this.size !== toolbar.sizeSlider.value.curr) {
            //set it to the size slider value
            this.size = toolbar.sizeSlider.value.curr;
        }
        //same here
        if (this.bright !== toolbar.brightSlider.value.curr) {
            this.bright = toolbar.brightSlider.value.curr;
        }
    },
    draw: function() {
        noStroke();
        //fill lerp between color and brightness
        fill(lerpColor(this.bright, this.clr, this.lerpAmt));
        //draw ellipse at pos and size
        ellipse(this.x, this.y, this.size, this.size);
    },
    run: function() {
        //call all the functions
        this.update();
        this.draw();
    },
};

//create the buttons {

toolbar.playBtn = new Button({
    x: width-toolbar.w/2,
    y: height/2+30,
    //image, pass in x and y
    img: function(x, y) {
            //if img doesn't exist yet, create the image
            if (!this.playImg) {
                //off screen graphics
                var msk = createGraphics(this.w, this.h, P2D); 
                msk.background(0);
                msk.fill(255);
                //translate to almost-center
                msk.translate(msk.width/2+15, msk.height/2);
                msk.scale(1.5); //make it a little bigger
                //draw a nice triangle thing
                msk.beginShape();
                    msk.curveVertex(-18, -12); 
                    msk.curveVertex(2, 0); 
                    msk.curveVertex(-18, 12);
                    msk.curveVertex(-18, -12); 
                    msk.curveVertex(2, 0); 
                    msk.curveVertex(-18, 12); 
                msk.endShape();
                msk = msk.get(); //capture the image
                var play = this.createGrad(255, 90); //create a gradient
                play.mask(msk); //use mask on gradient
                this.playImg = play; //set this image to play, img exists now
            } else {
                //draw the image at x and y
                image(this.playImg, x, y);
            }
        },
    action: function() {
                //if clicked, and if frames is > 0
                if (frames.length > 0) {
                    scene = "play"; //change scene to play
                } else {
                    //there's nothing to play. Tell this to the user
                    println("Try taking some pictures first!");
                }
            }
});

toolbar.camBtn = new Button({
    x: width-toolbar.w/2,
    y: height/2-30,
    img: function(x, y) {
            //if image doesn't exist yet
            if (!this.camImg) {
                //mask for the image (using off-screen graphics buffer)
                var msk = createGraphics(this.w, this.h, P2D);
                msk.background(0);
                msk.rectMode(CENTER);
                //main cam square
                msk.rect(msk.width/2, msk.height/2, 40, 40, 10); 
                //black circle in the middle
                msk.fill(0);
                msk.ellipse(msk.width/2, msk.height/2, 20, 20);
                //shine
                msk.noFill();
                msk.stroke(255);
                msk.strokeWeight(3);
                msk.angleMode = "degrees";
                msk.arc(msk.width/2, msk.height/2, 10, 10, -72, 0);
                msk = msk.get(); //capture the image
                var cam = this.createGrad(250, 150); //create grad img
                cam.mask(msk); //mask grad with msk
                this.camImg = cam; //set img to cam, img exists now!
            } else {
                image(this.camImg, x, y); //draw img at position
            }
        },
    action: function() {
                //push a new frame set into the frames array
                frames.push([
                    bouncyBall.x + toolbar.w/2, //x coordinate
                    bouncyBall.y, //y coordinate
                    bouncyBall.bright, //brightness of ball
                    bouncyBall.size //size of ball
                ]);
            }
});

toolbar.gridBtn = new Button({
    x: width-toolbar.w/2,
    y: 36,
    isOn: false, //is the grid on?
    //img function, pass in pos
    img: function(x, y) {
        //if image doesn't exist yet
        if (!this.gridImg) {
            //msk - off-screen graphics buffer
            var msk = createGraphics(this.w, this.h, P2D);
            msk.background(0);
            msk.stroke(255);
            //draw a grid
            msk.strokeWeight(3);
            for (var i = 0; i < 3; i++) {
                msk.line(msk.width/6 + i*msk.width/3, 0, 
                         msk.width/6 + i*msk.width/3, msk.height);
                msk.line( 0, msk.height/6 + i*msk.height/3,
                         msk.width, msk.height/6 + i*msk.height/3);
            }
            msk = msk.get(); //capture the image
            var img = this.createGrad(240, 100); //create gradient img
            img.mask(msk); //mask img with msk (grid)
            this.gridImg = img; //set this.gridImg to img, it exists now!
        } else {
            image(this.gridImg, x, y); //draw img at pos
        }
    },
    action: function() {
        //when clicked, toggle gridOn
        this.gridOn = !this.gridOn;
    }
});

toolbar.saveBtn = new Button({
    x: width-toolbar.w/2,
    y: 89,
    //img function, pass in pos
    img: function(x, y) {
        //if img exists, draw img
        if (this.saveBtnImg) {
            image(this.saveBtnImg, x, y);
        } else {
            //create img
            this.saveBtnImg = this.createGrad(250, 100); //create grad img
            var msk = createGraphics(this.w, this.h, P2D); //create mask
            msk.background(0);
            //bottom thing that looks like |_|
            msk.rectMode(CENTER);
            msk.fill(255);
            msk.rect(msk.width/2, msk.height*0.75, 
                     msk.width*0.94, msk.height/2);
            msk.fill(0);
            msk.rect(msk.width/2, msk.height/2, 
                     msk.width*0.70, msk.height*0.75);
            //arrow triangle
            msk.fill(255);
            msk.noStroke();
            msk.triangle(msk.width*0.24, msk.height*0.55, 
                         msk.width*0.76, msk.height*0.55,
                         msk.width*0.5, msk.height*0.85);
            //arrow rect
            msk.rect(msk.width/2, msk.height*0.4, 14, 24, 3);
            msk = msk.get(); //capture the image
            this.saveBtnImg.mask(msk); //msk saveBtnImg with msk, img exists!
        }
    },
    action: function() {
        //first check if there is anything to print
        if (frames.length === 0) {
            println("Try taking some pictures first!");
        } else {
            //construct the save string
            var saveString = "var frames = [";
            //loop through frames and add each frame array to save string
            for (var i = 0; i < frames.length; i++) {
                saveString += "[" + frames[i] + "]";
                //as long as it's not the last frame, add a comma
                if (i !== frames.length - 1) {
                    saveString += ",";
                }
            }
            //end of save string
            saveString += "]; \n//Replace the empty frames array in line 23 with the above.";
            println(saveString); //print!
        }
    },
});

var backBtn = new Button({
    x: toolbar.w/4,
    y: 370,
    img: function(x, y) {
        //if img doesn't exist yet
        if (!this.backImg) {
            var img = this.createGrad(255, 0); //create grad img
            var msk = createGraphics(this.w, this.h, P2D); //create mask img
            msk.background(0);
            msk.fill(255);
            //a simple back button <
            msk.textAlign(CENTER, CENTER);
            msk.textSize(30);
            msk.text("<", msk.width/2, msk.height/2);
            msk = msk.get(); //capture image
            img.mask(msk); //mask grad with msk
            this.backImg = img; //set this.backImg to img, it exists now!
        } else {
            image(this.backImg, x, y); //draw img at pos
        }
    },
    action: function() {
        scene = "studio"; //set scene to studio
        frameRate(30); //set frame rate back to default
    }
});

//}

//takes the 2D frames array and plays the animation
var playAnimation = function() {
    
    //how the each frame array is organized: 
    //[ballX, ballY, ballBrightness, ballSize]
    frameRate(animationFrameRate); //set frame rate to what user specified
    var current = frames[currFrame]; //find current frame array
    //if there is no current frame in the array
    if (current === undefined) {
        //set currFrame to 0 and abort mission!
        currFrame = 0;
        return;
    }
    
    pushMatrix(); //save current coordinate system
    translate(toolbar.w/4, 0);
    setting(); //draw the setting that the user created
    popMatrix(); //revert to original coordinate system
    
    //lerp between brightness and ball color 
    fill(lerpColor(current[2], bouncyBall.clr, bouncyBall.lerpAmt));
    //draw the bouncy ball according to the array
    ellipse(current[0], current[1], current[3], current[3]);
    
    //imagine splitting the toolbar rect in two, then putting one slice
    //on the left to center the animation
    noStroke();
    fill(0);
    rect(toolbar.w/4, height/2, toolbar.w/2, height);
    rect(width-toolbar.w/4, height/2, toolbar.w/2, height);
    currFrame++; //increment frame
    
};

//the glorious draw function!
draw = function() {
    switch (scene) {
        case "studio":
            setting(); //draw the setting
            bouncyBall.run(); //run the bouncy ball
            toolbar.run(); //run the toolbar
            break;
        case "play":
            playAnimation(); //play the animation using frames array
            backBtn.draw(); //draw the back button
            break;
    }
};

//when mouseClicked, check if thingies were clicked and act if they were!
mouseClicked = function() {
    switch (scene) {
        case "studio": 
            toolbar.handleClick(); //if anything in toolbar was clicked, act
            break;
        case "play": 
            backBtn.handleClick(); //check if back button was clicked and act
            break;
    }
};

//when mouse is dragging, check if thingies are dragging!
mouseDragged = function() {
    if (scene === "studio") {
        //check if dragging, then act accordingly
        toolbar.handleDrag();
        bouncyBall.handleDrag();
    }
};

//If thingies are being dragged and mouse is released, set dragging to false!
mouseReleased = function() {
    //if the user was dragging something, set dragging to false
    if (dragging) {
        dragging = false; //set dragging to false
    }
    bouncyBall.handleRelease();
    toolbar.handleRelease();
};
