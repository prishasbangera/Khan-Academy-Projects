/***************************************************************

Click the display cabinet doors to start, and then click the
images to view them.

****************************************************************/

/*  

    CONTEST: MUSIC

    I've been programming for twelve months, 
    and I have learned 100% of Intro to JS.
    
    I would prefer to be placed in the 
    Intermediate bracket.
    
*/

/**FALLBACK FONT: set to true and restart if font doesn't work**/
//Apparently Gabriola is not really a good font to choose.
var fallBackFont = false;

/***************************************************************
 
 * Music is a major part of my life. If it wasn't, I'd be
   a completely different person.
   
 * Each image describes one of the many ways that music is a part
   of me. I hope you'll find this interactive visualization of my
   music life interesting.
                
***************************************************************/

/**************************************************************

                            ATTRIBUTES:
 *khanacademy.org/computer-programming/pixel-pot/6139251709591552
 *Thanks to this program for the method on how to do pixel art. I
  put this method in an object type to create multiple pixel art
  images which can change size, move, etc.
  
 *khanacademy.org/computer-programming/purple-future/4883269066309632?height=700px
 *Thanks to this program for showing me how to use trig functions   to make the images hover.

 *khanacademy.org/computer-programming/beziervertex-drawing-tool/1248677350
 *Thanks to this drawing tool program for helping with drawing
  bezier shapes.
  
 *The violin is kind of based off image.shutterstock.com/z/stock-vector-the-pixelated-string-family-violin-viola-cello-double-bass-1589553574.jpg, except I made changes and added a bow.
 
 *The keyboard is kind of based off i.ytimg.com/vi/ekq0MTv7M0Y/hqdefault.jpg, except I made changes and added notes.


                           HELP REQUESTS:
 * Thanks to Raven for helping me work out a bug. Details: See 
   Help Request section.
   
***************************************************************/

//A note
//{
/*

This is definitely my best project as of now. I've been working
on it for a very long time. This challenge has also increased my
coding skills tenfold.

The notes on the wall are the start to Hedwig's Theme.
Also, I hope you notice the clock and sky. In this weird world,
it's bright outside 6am-7pm, and the night sky and stars are out
7pm-6am. Maestro (the bird) is asleep from 9pm-8am -- extremely
hard to do these days.

If anything doesn't work, please notify me. Also, if anything can
be made better regarding art (especially shadows), grammar, or
code, please notify me as well.

Thank you, Khan Academy, for being in my life.
Thank you, amazing Khan Academy Community.

-(^▽^)-

Started: May 6, 2020
Finished: June 13, 2020

*/
//}

//************************************************************//
/**************************************************************/
//************************************************************//

//Setup {

enableContextMenu();

cursor("NONE"); //begone, cursor!

//Set rectMode and imageMode to CENTER
rectMode(CENTER);
imageMode(CENTER);

//Handle Text
textAlign(CENTER, CENTER); //Position text by center
var mainFont = createFont("Gabriola");
var fallbackFont = createFont("serif"); //Used in case font fails

//Other Variables  

var wallColor = color(58, 0, 94); //background wall color

var userIsViewing = false; //Is the user viewing an image?
var scaleF = 0.7; //scale factor, for zoom in at opening

//point of zoom-in (scale)
var translateX = width/2;
var translateY = height/2;

//Time
var userStarted = false; //has the user clicked to start yet?
var timer = 0; //timer will start when userStarted is true
//When the timer reaches these, these events will happen.
var zoomInTime = 10; //zoom in
var openCabinetsTime = zoomInTime + 100; //open cabinet doors

//}

//************************************************************//
/**************************************************************/
//************************************************************//


/**Pixel Image Object Type**/
/*Each pixel image has a unique pixelArray. The color palette
stores all the colors in an object. After an image for each is
created, pictures are displayed with their own position, size,
and image. Code is added to the pixel images so that when the
user clicks the image, the image becomes bigger. Plus, text
about each image materializes, the background gets darker, and
the images hovers. Also, when the mouse is hovering over the
image, the image is highlighted*/
 
 
//The pixel image object type; pass in an object (config)
var PixelImage = function(config) {
    
    /**Related to creating the images.**/ 
    /*
        The pixel array is a grid, each item in the array being a
        row. The num of characters in each item would be the num
        of columns. The characters themselves are like a code,
        and each points to a different color. This color is used
        for a rectangle that is drawn at that character's     
        position.
    */
    
    //start position (and used for get())
    this.x = config.x;
    this.y = config.y;
    
    this.pixelSize = config.pixelSize; //size of pixels
    
    
    this.palette = config.palette; //color palette
    this.pixelArray = config.pixelArray; //code for the picture
    
    //the image after createPixelArt(); is used.
    this.img = null; //Just so we know that it's here.

    /**Related to animating the images.**/

    this.mouseOver = false; //Is the mouse over the image?
    this.isViewing = false; //Is the user viewing the image?
    this.timer = 0; //for cos function to make it float
    
    //for fade-in text/background and highlight when mouseOver
    this.textAlpha = 0;
    this.backgroundAlpha = 0;
    this.highlightAlpha = 0;
    
    //Size of picture at start. Will not change.
    //pixelSize times the number of columns is the start width
    this.startWidth = this.pixelSize*this.pixelArray[0].length;
    //pixelSize times the number of rows is the start height
    this.startHeight = this.pixelSize*this.pixelArray.length;
    
    //viewingPosition. Will not change.
    this.viewingX = config.viewingX;
    this.viewingY = config.viewingY;
    //Size of picture when viewing. Will not change.
    this.viewingSizeF = config.viewingSizeF; //factor
    //multiply the start size by this factor
    this.viewingWidth = this.startWidth*this.viewingSizeF;
    this.viewingHeight = this.startHeight*this.viewingSizeF;
    
    //text when viewing
    this.viewingText = config.viewingText; //info about image
    //position of text
    this.textX = config.textX;
    this.textY = config.textY;
    
    //Image's current position. Will change. 
    //Set  to start position at first.
    this.currX = this.x;
    this.currY = this.y;
    //Size of picture. Will change. Set to start size at first.
    this.currentWidth = this.startWidth;
    this.currentHeight = this.startHeight;
    
};


//A method to display the pixels and save as an image with get().
PixelImage.prototype.createPixelArt = function() {
    
    rectMode(CORNER); //change to default positioning
    
    //loop through each "row" in the pixelArray
    for (var y = 0; y < this.pixelArray.length; y++) {
        //For each "row," loop through each "column."
        for(var x = 0; x < this.pixelArray[y].length; x++) {
            noStroke();
            /* Choose the color in the palette.
               In each row (y), go through each column (x)
               Whatever's in each position in the pixel array 
               determines the color */
            fill(this.palette[this.pixelArray[y][x]]);
            //draw a rectangle (pixel) at each unique position
            rect(x * this.pixelSize + this.x, 
                 y * this.pixelSize + this.y, 
                 this.pixelSize, this.pixelSize);
        }
    }
    
    //get() the pixel art so that it becomes an image
    //width of image is size*num columns, height is size*num rows
    this.img = get(this.x, this.y, 
                   this.pixelSize*this.pixelArray [0].length,                       this.pixelSize*this.pixelArray.length);
    
    rectMode(CENTER); //change back to desired way of positioning
    
};


//A method to display each image. 
PixelImage.prototype.display = function() {
    
    //if the user is viewing this image
    if (this.isViewing) {
        
        //shadow background, fades in because of backgroundAlpha
        fill(27, 0, 36, this.backgroundAlpha);
        noStroke();
        rect(width/2, height/2, width, height);
        
        //show text, fades in because of textAlpha
        fill(255, 255, 255, this.textAlpha);
        
        if (fallBackFont) {
            //use regular font if user made fallBackFont true
            textFont(fallbackFont, 17);
        } else {
            //Use the preferred font
            textFont(mainFont, 23);
        }
        //display the text at its appointed position
        text(this.viewingText, this.textX, this.textY);

    } 
    
    //display the pixel image at current (dynamic) size and pos
    imageMode(CORNER); //set back to default
    image(this.img, this.currX, this.currY, 
          this.currentWidth, this.currentHeight);
    imageMode(CENTER); //back to desired positioning
    
    //if mouse is over the image, add to highlight alpha
    if (this.mouseOver) {
        
        //add to alpha until 80 for a fade-in effect
        if(this.highlightAlpha < 80) {
            this.highlightAlpha+=6;   
        }
        
    } else if (this.highlightAlpha > 0) {
        
        //if not mouseOver & highlightAlpha is not 0, subtract
        //from highlight alpha
        this.highlightAlpha-=6;
        
    }
    
    //if highlightAlpha is not 0, draw a rect to highlight image
    if (this.highlightAlpha !== 0) {
        
        noStroke();
        rectMode(CORNER); //change to default positioning
        
        fill(255, this.highlightAlpha); //white at highlightAlpha
        //draw a rect at current position and size
        rect(this.currX, this.currY, 
             this.currentWidth, this.currentHeight);
        rectMode(CENTER); //change back to desired positioning
        
    }
    
};


//A method to make image hover and change pos when clicked
PixelImage.prototype.update = function() {
    
    //if the user is viewing this image
    if (this.isViewing) {
        
        //Add two to the timer so that the img "floats" (cosine)
        this.timer+=2;
        
        //Add opacity to the text to fade in until 255
        if (this.textAlpha < 255) {
            this.textAlpha += 10;
        }
        
        //Add opacity to the background to fade in until 180
        if (this.backgroundAlpha < 180) {
            this.backgroundAlpha+=10;
        }
        
        //change current position to viewing position
        this.currX = this.viewingX;
        //(use cosine function to make image hover at viewingY)
        this.currY = this.viewingY+cos(this.timer)*15;
        //change current size to viewing size
        this.currentWidth = this.viewingWidth;
        this.currentHeight = this.viewingHeight;

    } else {
        
        this.timer = 0; //set timer back to zero
        
        //set alphas back to zero
        this.textAlpha = 0;
        this.backgroundAlpha = 0;
        
        //change current pos and size back to start pos and size
        this.currX = this.x;
        this.currY = this.y;
        this.currentWidth = this.startWidth;
        this.currentHeight = this.startHeight;
        
    }
    
};


//Method to handle mouse hover, pass in mouseX and mouseY
PixelImage.prototype.checkIfMouseOver = function(mx, my) {
    
    //if mouse within boundaries of picture at right time
    if (timer > openCabinetsTime+100 &&
        mx > this.currX && mx < this.currX + this.currentWidth &&
        my > this.currY && my < this.currY + this.currentHeight){
            
        //change mouseOver to true
        this.mouseOver = true;
            
    } else {
        
        this.mouseOver = false;
    
    }
    
};


//Method to change isViewing and userIsViewing to true/false
//Pass in the array of all pixel images
PixelImage.prototype.handleClick = function(imgArray) {
    
    /*If this img is being viewed, set isViewing to false. 
      Else, if another img isn't already being viewed, 
      set this img's isViewing to be true*/
      
    if (this.isViewing) {
        
        this.isViewing = false; //for individual object
        userIsViewing = false; //for whole program
        
    } else {
        
        //loop through the array of all pixel images
        for(var j=0;j<imgArray.length; j++){
            
            //if no imgs are being viewed, user is not viewing &
            //the mouse is over the image, set viewing to true
            if (!imgArray[j].isViewing &&
            
                !userIsViewing && 
                !imgArray[j].mouseOver) {
                    this.isViewing = true; //for indiv object
                    userIsViewing = true; //for whole program
                    
            }
            
        }
        
    }
    
};


//************************************************************//
/**************************************************************/
//************************************************************//

/**Pixel Image Objects**/


//positioning variables {

var imageX = 154; //relate each image's x to xPos of musicW/HW
var imageY = 180; //relate each image's y to yPos of musicW/HW

//}


//Pic with phone playing music, homework, and pen
var pixelMusicWithHomework = new PixelImage({
    
    //Used to create the image
    
    //position and pixel size
    x: imageX,
    y: imageY,
    pixelSize: 3,
    
    palette: {
        " " : color(78, 179, 186), //background sky color
        "0": color(39, 95, 97), //shadow background color
        "1": color(255, 255, 255), //white
        "2": color(0, 0, 0), //black
        "3": color(102, 102, 102), //pencil gray
        "4": color(156, 156, 156), //silvery gray
        "5": color(43, 43, 43), //dark gray
        "6": color(103, 0, 163), //purple
        "7": color(157, 0, 255), //light purple
        "8": color(102, 102, 102),//lighter than dark gray
        "9": color(163, 87, 0), //brown
        "a": color(79, 41, 0), //dark brown
        "b": color(232, 130, 63), //orange-ish
    },
    
    //picture with phone, paper, pen, and frame
    pixelArray: [
        "999999999999999999999999999999999999999a",
        "999999999999999999999999999999999999999a",
        "99a000000000000000044444444444444444499a",
        "99a0               11111111111111111199a",
        "99a0               11333333333333333199a",
        "99a0               11111111111111111199a",
        "99a0               11111111111111111199a",
        "99a0   555555550   11111111111111111199a",
        "99a0  55588585550  11333333333333333199a",
        "99a0  55555555550  11111111111111111199a",
        "99a0  5bbbbbbbb50  11111111111111111199a",
        "99a0  5bbbbbbbb50  11111111111111111199a",
        "99a0  5bbbb1bbb50  11333333333333333199a",
        "99a0  5bbbb11bb50  11111111111111111199a",
        "99a0  5bbbb141b50  11111111111111111199a",
        "99a0  5bbbb1b1b50  11111111111111111199a",
        "99a0  5bbbb1b4b50  11333331118511111199a",
        "99a0  5bb111bbb50  11111111175511111199a",
        "99a0  5bb111bbb50  11111111766811111199a",
        "99a0  5bb444bbb50  11111117664811111199a",
        "99a0  5bbbbbbbb50  11111176648111111199a",
        "99a0  5bbbbbbbb50       7660         99a",
        "99a0  55555555550      5460          99a",
        "99a0  55555555550      550           99a",
        "99a0   555555550      500            99a",
        "99a0                                 99a",
        "999999999999999999999999999999999999999a",
        "999999999999999999999999999999999999999a",
    ],
    
    //Used for animating image, viewing mode

    //Viewing position. Will not change.
    viewingX: 123,
    viewingY: 35,
    //Size of picture when viewing. Will not change.
    viewingSizeF: 3, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I have to listen to music while working on anything. \n It helps me focus and, ultimately, enjoy the task more. \n I love classical music and movie soundtracks the most.",
    textX: width/2,
    textY: 390
    
});


//Flute pic
var pixelFlute = new PixelImage({
    
    //Used to create the image
    
    //position and pixel size
    x: imageX+133,
    y: imageY+6,
    pixelSize: 3,
    
    palette: {
        " ": color(143, 0, 57), //magenta background
        "0": color(69, 0, 33), //shadow magenta background
        "1": color(204, 204, 204), //silvery gray
        "2": color(99, 99, 99), //flute darker gray
        "3": color(163, 163, 163), //flute body lighter gray
        "4": color(56, 56, 56), //dark gray
        "5": color(75), //lighter than dark gray
        "6": color(56, 35, 0), //frame
        "7": color(41, 27, 0), //shadow brown frame
        "8": color(240, 240, 240), //almost-white
        "9": color(255, 255, 255), //white
        "a": color(184, 184, 184), //flute body shine 
    },
    
    //flute (or, at least, a wildly inaccurate one)
    pixelArray: [
      "66666666666666666666666666666666666666666666666666666667",
      "66666666666666666666666666666666666666666666666666666667",
      "66700000000000000000000000000000000000000000000000000667",
      "6670                                                 667",
      "6670                                                 667",
      "6670               1111111991111111      111111      667",
      "6670  9a141aaaa9aa8a8a8a8a8aa8a8a8a8a8a9a9a8a8aaa9   667",
      "6670  13313333313333333333333333333333313833333331   667",
      "6670  3222222223222222222222222222222223222222222300 667",
      "6670   000000000000000000000000000000000000000000000 667",
      "6670                                                 667",
      "66666666666666666666666666666666666666666666666666666667",
      "66666666666666666666666666666666666666666666666666666667",
    ],
    
    //Used for animating image, viewing mode
    
    //Viewing position. Will not change.
    viewingX: 50,
    viewingY: 70,
    //Size of picture when viewing. Will not change.
    viewingSizeF: 3, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I played flute in middle school. Band was a place where I felt at home; \neveryone knew music there. The two directors \nI've had were amazing. But before the end \nof my last year in middle school came the pandemic \nand the tornado, cutting my last few months in band short.",
    textX: width/2,
    textY: 330,
    
});


//Violin pic
var pixelViolin = new PixelImage({
    
    //Used to create the picture
    
    //position and pixel size
    x: imageX,
    y: imageY+98,
    pixelSize: 3,
    
    palette: {
        " ": color(106, 255, 76), //light green background
        "0": color(33, 166, 0), //green background shadow
        "1": color(194, 68, 0), //violin wood color
        "2": color(33, 17, 0), //black with a little brown
        "3": color(255, 200, 117), //light wood for bridge
        "4": color(143, 50, 0), //violin shadow & bow shine
        "5": color(0), //black
        "6": color(240, 240, 240), //white-ish frame
        "7": color(145, 145, 145), //gray
        "8": color(250, 88, 0), //violin wood shine
        "9": color(94, 36, 0), //bow color
        "a": color(224, 209, 182), //bow hair
    },
    
    //violin and bow with weird horse hair
    pixelArray: [
        "66666666666666666666666666667",
        "66666666666666666666666666667",
        "66700000000000000000000000667",
        "6670                      667",
        "6670        10            667",
        "6670        150           667",
        "6670       210            667",
        "6670        150           667",
        "6670       210            667",
        "6670        20            667",
        "6670        20        40  667",
        "6670        20       490  667",
        "6670        20       9a0  667",
        "6670        20       9a0  667",
        "6670      1121140    9a0  667",
        "6670     181211140   9a0  667",
        "6670    18812111140  9a0  667",
        "6670    18812111140  9a0  667",
        "6670    18112111140  9a0  667", 
        "6670    11112111140  9a0  667",
        "6670     111111140   9a0  667",
        "6670     112121140   9a0  667",
        "6670     121112140   9a0  667",
        "6670     123332140   9a0  667", 
        "6670    11211121140  9a0  667",
        "6670   1121111121140 9a0  667",
        "6670   1111111111140 2a0  667",
        "6670   1111121111140 2a0  667",
        "6670   1551121111140 9a0  667",
        "6670   5555121111140 920  667",
        "6670    55512111140  920  667",
        "6670     551211400   20   667",
        "6670                      667",
        "6670                      667",
        "66666666666666666666666666667",
        "66666666666666666666666666667"
    ],
    
    //Used for animating image, viewing mode

    //Viewing position. Will not change.
    viewingX: 20,
    viewingY: 70,
    //Size of picture when viewing. Will not change.
    viewingSizeF: 3, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I've been playing violin for almost six \n years, and I've grown to absolutely love it. \n Violin is what started my love of music. \n Since then, I've discovered an \n inordinate number of wonderful pieces.",
    textX: width*3/4-10,
    textY: height/2,

});


//Keyboard pic
var pixelKeyboard = new PixelImage({
    
    //Used to create the image
    
    //position and pixel size
    x: imageX+168,
    y: imageY+67,
    pixelSize: 3,
    
    palette: {
        " ": color(153, 0, 255), //background purple
        "0": color(81, 0, 135), //background shadow purple
        "1": color(51, 51, 51), //almost-black
        "2": color(0, 0, 0), //black
        "3": color(161, 161, 161), //light gray
        "4": color(255, 255, 255), //white
        "5": color(126, 130, 0), //piano color
        "6": color(53, 54, 0), //piano shadow
        "7": color(242, 242, 0), //button color
        "8": color(94, 94, 0), //button shadow
        "9": color(0, 255, 9), //green note
        "a": color(0, 148, 5), //green note shadow
        "b": color(0, 94, 255), //blue note
        "c": color(0, 59, 153), //blue note shadow
        "d": color(255, 204, 0), //orange note
        "e": color(255, 153, 0), //orange note shadow
        "f": color(255, 0, 85), //pink note
        "g": color(184, 0, 61), //pink note shadow
        "h": color(0, 9, 105), //blue frame
        "i": color(2, 0, 59) //blue frame shadow
    },
    
    //keyboard and cool notes
    pixelArray: [
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhii",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhii",
        "hhi000000000000000000000000000000000000hhii",
        "hhi0                                   hhii",
        "hhi0                                   hhii",
        "hhi0            b                      hhii",
        "hhi0            b                      hhii",
        "hhi0            b                f     hhii",
        "hhi0    9       b                ff    hhii",
        "hhi0    99      b                fff   hhii",
        "hhi0    999     b     ddddd      fgf   hhii",
        "hhi0    9a9     b     ddddd      f0g   hhii",
        "hhi0    90a   4bb     deeed      f 0   hhii",
        "hhi0    9 0   bbb     d000d      f     hhii",
        "hhi0    9     ccc     d   d    4ff     hhii",
        "hhi0  499     000     d   d    fff     hhii",
        "hhi0  999             d   d    ggg     hhii",
        "hhi0  aaa           4dd 4dd    000     hhii",
        "hhi0  000           ddd ddd            hhii",
        "hhi0                eee eee            hhii",
        "hhi0                000 000            hhii",
        "hhi0                                   hhii",
        "hhi0                                   hhii",
        "hhi0     555555555555555555555555      hhii",
        "hhi0    55555555555555557575755555     hhii",
        "hhi0    55775775775577557575755555     hhii",
        "hhi0    55885885885588557575757755     hhii",
        "hhi0    55555555555555558585858855     hhii",
        "hhi0    55555555555555555555555555     hhii",
        "hhi0    54141441414144141441414145     hhii",
        "hhi0    54141441414144141441414145     hhii",
        "hhi0    54141441414144141441414145     hhii",
        "hhi0    54242442424244242442424245     hhii",
        "hhi0    54444444444444444444444445     hhii",
        "hhi0    54444444444444444444444445     hhii",
        "hhi0    53333333333333333333333335     hhii",
        "hhi0    65555555555555555555555556     hhii",
        "hhi0    06666666666666666666666660     hhii",
        "hhi0     000000000000000000000000      hhii",
        "hhi0                                   hhii",
        "hhi0                                   hhii",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhii",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhii",
    ],
        
    //Used for animating image, viewing mode
    
    //Viewing position. Will not change.
    viewingX: 25,
    viewingY: 96,
    //Size of picture when viewing. Will not change.
    viewingSizeF: 2, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I love experimenting \n with whatever music knowledge I have. \n The keyboard, music notation software, \n playing on water glasses, \n coming up with weird tunes \n and poems are all things I've done.",
    textX: width*3/4-8,
    textY: height/2,  
    
});


//Kalimba pic
var pixelKalimba = new PixelImage({
    
    //Use to create the image
    
    //position and pixel size
    x: imageX+98,
    y: imageY+101,
    pixelSize: 2,
    
    palette: {
        " ": color(255, 201, 66), //background yellow-orange
       "0": color(212, 117, 0), //background shadow yellow-orange
       "1": color(112, 28, 0), //kalimba body
       "2": color(59, 15, 0), //kalimba shadow
       "3": color(77, 15, 0), //kalimba soundhole outline(brown)
       "4": color(31, 6, 0), //black with a tiny bit of brown
       "5": color(224, 224, 224), //z-bracket(bar on tines) color
       "6": color(184, 184, 184), //tines color ("keys")
       "7": color(89, 22, 0), //z-bracket shadow on body
       "8": color(99, 99, 99), //z-bracket shadow on tines
       "9": color(161, 67, 0), //backboard color
       "a": color(255), //white
       "b": color(230), //almost-white
       "c": color(36, 36, 36), //frame gray
       "d": color(15, 15, 15), //frame shadow
    },
    
    //kalimba
    pixelArray: [
        "ccccccccccccccccccccccccccccccd",
        "ccccccccccccccccccccccccccccccd",
        "ccd0000000000000000000000000ccd",
        "ccd0                        ccd",
        "ccd0                        ccd",
        "ccd0      11111111111       ccd",
        "ccd0     11a1a111a1111      ccd",
        "ccd0     19b9b9b9b9b91      ccd",
        "ccd0     1767676767671      ccd",
        "ccd0     1555555555551      ccd",
        "ccd0     1787878787871      ccd",
        "ccd0     11b16161b1b11      ccd",
        "ccd0     11a1b1b1a1a11      ccd",
        "ccd0     11b1a1a1b1111      ccd",
        "ccd0     1111b1b161111      ccd",
        "ccd0     111161b111111      ccd",
        "ccd0     1111116111111      ccd",
        "ccd0    111111111111111     ccd",
        "ccd0    111111111111111     ccd",
        "ccd0    111111333111111     ccd",
        "ccd0    111113444311111     ccd",
        "ccd0    111113444311111     ccd",
        "ccd0    111113444311111     ccd",
        "ccd0   11111113331111111    ccd", 
        "ccd0   11111111111111111    ccd",
        "ccd0   11111111111111111    ccd",
        "ccd0   77777777777777777    ccd",
        "ccd0   22222222222222222    ccd",
        "ccd0   22222222222222222    ccd",
        "ccd0   00000000000000000    ccd",
        "ccd0                        ccd",
        "ccd0                        ccd",
        "ccccccccccccccccccccccccccccccd",
        "ccccccccccccccccccccccccccccccd",
    ], 
    
    //Used for animating image, viewing mode
    
    //Viewing position. Will not change.
    viewingX: 20,
    viewingY: 100,
    //Size of picture when viewing. Will not change.
    viewingSizeF: 4, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "Last year, I discovered the beautiful African \n kalimba, or mbira. Sometimes described \n as a \"thumb piano,\" the kalimba has \n an elegant, percussive sound that is \n profoundly enchanting and haunting. \n Ever since I'd received one for my \n birthday, I've been trying to learn it.",
    textX: width*3/4-13,
    textY: height/2,
    
});


/**Create the pixel art images!**/
//{

//An array that holds all the pixel art images.
var pixelImages = [
    
    pixelMusicWithHomework, 
    pixelFlute, 
    pixelViolin, 
    pixelKeyboard, 
    pixelKalimba
    
];

//loop through array and do createPixelArt(); for each.
for (var i = 0; i < pixelImages.length; i++) {
    pixelImages[i].createPixelArt();
}

//}


//************************************************************//
/**************************************************************/
//************************************************************//

/* Note: These are drawn as if (0, 0) is at (translateX,
translateY) (zoom-in point) due to translate(), and at a scale
factor of 0.7 (because the program starts at a scaleF of 0.7).*/


/***********************Display Cabinet***********************/

//declare some variables about the display cabinet {

//Everything is related to the width and pos of the cabinet

var cabStrokeWeight = 9; //stroke weight of the body of cabinet

var cabW = 300; //width of display cabinet
var cabH = cabW*1.3; //height of display cabinet

//yPos of display cabinet (no need for x since x is 0, at center)
var cabY = 78;

//back of top section display cabinet (inside wall, inside rect)
var backWallY = cabY-cabH/6.5;
var backWallW = cabW/1.49;
var backWallH = cabH/2.5;

//outline of top section of display cabinet
//the rect is the outline of the top section/outer rect
var topSectionY = cabY-cabH/5.8;
var topSectionW = cabW/1.2; 
var topSectionH = cabH/2.0;

//}

//draw the display cabinet
var drawDisplayCabinet = function() {
    
    //relate to cabinet variables above for ease of resizing
    
    //decor on top of display cabinet 
    
    //outline circles
    noStroke();
    fill(48, 17, 0); //dark brown
    ellipse(0, cabY-cabH/1.84, cabW/3, cabH/4.5); //middle
    ellipse(cabW/6.4, cabY-cabH/1.9, cabW/5, cabH/7); //right
    ellipse(-cabW/6.4, cabY-cabH/1.9, cabW/5, cabH/7); //left
    
    //middle circles
    fill(89, 36, 0); //lighter brown
    ellipse(0, cabY-cabH/1.86, cabW/3.5, cabH/5.25); //middle
    ellipse(cabW/6.6, cabY-cabH/1.9, cabW/6, cabH/9); //right
    ellipse(-cabW/6.6, cabY-cabH/1.9, cabW/6, cabH/9); //left
    
    //inside, light-colored circles / plaque
    fill(217, 134, 0); //yellow
    ellipse(0, cabY-cabH/1.86, cabW/4, cabH/7); //middle
    ellipse(cabW/6.6, cabY-cabH/1.9, cabW/8, cabH/14); //right
    ellipse(-cabW/6.6, cabY-cabH/1.9, cabW/8, cabH/14); //left
    
    //Letter P (two for 3D-ish effect)
    textFont(createFont("serif"), 35);
    fill(66, 33, 0); //darker
    text("P", cabW/165, cabY-cabH/1.8); //right
    fill(110, 55, 0); //lighter
    text("P", -cabW/330, cabY-cabH/1.8); //left
         
    //bottom shadow of display cabinet (two imgs to make darker)
    image(getImage("cute/ShadowNorth"), -1, cabY+cabH/1.8, 
          cabW+cabStrokeWeight+1, cabH/4);
    image(getImage("cute/ShadowNorth"), -1, cabY+cabH/1.8, 
          cabW+cabStrokeWeight+1, cabH/4);
    
    //main body of display cabinet    
    stroke(48, 17, 0);
    strokeWeight(cabStrokeWeight);
    fill(122, 49, 0);
    rect(0, cabY, cabW, cabH); 

    //top section, outer rect
    noStroke();
    fill(97, 39, 0); //wall color inside top section
    rect(0, topSectionY, topSectionW, topSectionH);
    
    //back wall
    strokeWeight(cabStrokeWeight-4);
    stroke(46, 15, 0);
    fill(61, 23, 0);
    rect(0, backWallY, backWallW, backWallH);
    
    /*Math to find each pt: the (x or y) coordinate (plus or 
      sub) 1/2 the width of the (back wall or outer) rect of the
      top section. (All combinations)*/
    //shadow inside display cabinet, left wall
    noStroke();
    fill(0, 140);
    quad(-backWallW/2-2, backWallY-backWallH/2, 
         -backWallW/2-2, backWallY+backWallH/2, 
         -topSectionW/2, topSectionY+topSectionH/2, 
         -topSectionW/2, topSectionY-topSectionH/2);
    //light inside display cabinet, right wall
    fill(255, 111, 0, 45);
    quad(backWallW/2+3, backWallY-backWallH/2, 
         backWallW/2+3, backWallY+backWallH/2, 
         topSectionW/2, topSectionY+topSectionH/2, 
         topSectionW/2, topSectionY-topSectionH/2);

    //Lines to give inside 3D-ish-ness
    strokeWeight(cabStrokeWeight-5);
    stroke(46, 15, 0);
    //(x1,y1) = inside; (x2,y2) = outside
    line(-backWallW/2, backWallY-backWallH/2, 
         -topSectionW/2, topSectionY-topSectionH/2);//top left
    line(-backWallW/2,  backWallY+backWallH/2, 
         -topSectionW/2, topSectionY+topSectionH/2);//bottom left
    line(backWallW/2, backWallY-backWallH/2, 
         topSectionW/2, topSectionY-topSectionH/2);//top right
    line(backWallW/2,  backWallY+backWallH/2, 
         topSectionW/2, topSectionY+topSectionH/2);//bottom right
         
    //outline of top section (on top of lines)
    stroke(71, 27, 0);
    strokeWeight(cabStrokeWeight-2);
    noFill();
    rect(0, topSectionY, topSectionW, topSectionH);
    
    //other drawers
    strokeWeight(cabStrokeWeight-3);
    fill(163, 68, 0);
    rect(0, cabY+cabH/5.2, topSectionW, cabH/8); //top
    rect(0, cabY+cabH/2.8, topSectionW, cabH/8); //bottom
    //drawer knobs
    strokeWeight(cabStrokeWeight/3);
    fill(255, 170, 0);
    ellipse(0, cabY+cabH/5.2, cabW/17, cabH/28); //top
    ellipse(0, cabY+cabH/2.8, cabW/17, cabH/28); //bottom
    //drawer knob shine
    stroke(255, 255, 255, 150);
    arc(0, cabY+cabH/5.2, cabW/30, cabH/84,180,270); //top
    arc(0, cabY+cabH/2.8, cabW/30, cabH/84,180,270); //bottom

};


/************Cabinet Doors and Shadow on Pictures************/

//declare some cabinet door variables {

//position of each cabinet door, positioned at top left corner

//cabinet's yPos minus half of outer rect height and then some
var doorY = cabY-65-topSectionH/2; 

//x-coordinates of each cabinet
var leftDoorX = -topSectionW/2+2; //center - half of outer rect w
var rightDoorX = 0; //0 is center because of translate

//}

//draw the cabinet doors and shadow (must be on top of the pics)
var drawCabinetDoors = function() {
    
    //open the doors if the openCabinets time has been reached
    if (timer > openCabinetsTime) {
        //change doorX til -243 for leftDoorX, 125 for rightDoorX
        if (leftDoorX > -243 && rightDoorX < 125) {
            leftDoorX --;
            rightDoorX ++;
        }
    }
    
    //shadow to darken inside of cabinet and pictures
    noStroke();
    fill(0, 0, 0, 130);
    rect(0, topSectionY, topSectionW, topSectionH-7);
    
    rectMode(CORNER); //change rectMode to default
    
    //cabinet doors
    strokeWeight(cabStrokeWeight-4);
    stroke(56, 20, 0);
    fill(184, 77, 0);
    //(x,y) of rect is top left corner
    rect(leftDoorX, doorY, topSectionW/2-2, topSectionH-5);
    rect(rightDoorX, doorY, topSectionW/2-2, topSectionH-5);
    
    //cabinet knobs
    strokeWeight(cabStrokeWeight/3);
    fill(255, 170, 0);
    stroke(71, 27, 0);
    ellipse(leftDoorX+topSectionW/2-19, doorY+topSectionH/2,
            cabW/20, cabH/25); //left
    ellipse(rightDoorX+19, doorY+topSectionH/2, 
            cabW/20, cabH/25); //right
    //cabinet knob shine
    stroke(255, 255, 255, 150);
    noFill();
    arc(leftDoorX+topSectionW/2-19, doorY+topSectionH/2, 
        cabW/50, cabH/60, 180, 270); //left
    arc(rightDoorX+19, doorY+topSectionH/2, 
        cabW/50, cabH/60, 180, 270); //right
        
    rectMode(CENTER); //change rectMode back to desired
    
};


//************************************************************//
/**************************************************************/
//************************************************************//

//Note: these are drawn at a scale factor of 0.7.


/***********************Right Side Setting*********************/

//Clock {

//clock position ((0, 0) is at (translateX, translateY) 
var clockX = 359;
var clockY = -218;

//For mapping the present second, minute, and hour to their respective angles of rotation
var rotateSec, rotateMin, rotateHr;

//draws and animates the clock 
var drawClock = function() {
    
    //bottom side - for 3D-ness
    fill(41, 41, 41);
    ellipse(clockX-2, clockY+2, 105, 103);
    //outer edge
    fill(82, 82, 82);
    ellipse(clockX, clockY, 102, 100);
    //inside shadow side - for 3D-ness
    fill(41, 41, 41);
    ellipse(clockX-2, clockY, 82, 82);
    //inside light side - for 3D-ness
    fill(194, 194, 194);
    ellipse(clockX+2, clockY, 82, 82);
    //inner face
    fill(173, 173, 173);
    ellipse(clockX, clockY, 80, 80);
    //outer gold ring 
    strokeWeight(1);
    stroke(255, 204, 0);
    noFill();
    ellipse(clockX, clockY, 82, 82);
    //inner gold ring
    stroke(255, 204, 0);
    strokeWeight(2);
    fill(255, 255, 255, 100);
    ellipse(clockX, clockY, 53, 53);
    
    pushMatrix(); //save current coordinate system
    translate(clockX, clockY); //translate to clock position
    
    //back of nest
    strokeWeight(6);
    stroke(117, 98, 0);
    fill(79, 44, 21);
    ellipse(0, 0, 54, 20);
    
    //black bird (or, at least, a weird cute thingy)
    noStroke();
    //body
    fill(0);
    bezier(2, -15, -31, -35, -25, 21, 21, -4); 
    //front wing
    fill(70);
    arc(6, -5, 24, 15, 40, 210); 
    //beak
    fill(255, 89, 0);
    triangle(-18, -15, -19, -9, -27, -12); 
    
    // current hour
    var hr = hour();
    
    //eye
    stroke(100);
    strokeWeight(2);
    noFill();
    //if the bird is asleep (between 9pm and 8am
    if (hr <= 8 || hr >= 21) {
        arc(-12, -13, 5, 5, 0, 180); //sleeping eye (∪)
    } else {
        arc(-12, -12, 5, 5, 180, 360); //awake eye (∩)
    }
    
    //front of nest
    stroke(150, 125, 0);
    strokeWeight(9);
    arc(0, 1, 54, 20, 0, 180);
    
    //markings on clock
    stroke(71, 71, 71);
    strokeWeight(3);
    //go through circle twelve times at increments of 30 degrees
    for (var theta = 0; theta <= 360; theta += 30) {
        
        pushMatrix(); //save current coordinate system
        rotate(theta); //rotate theta degrees
        //if the marking is for 12, 3, 6, or 9 o'clock
        if (theta === 0 || theta === 90 || 
            theta === 180 || theta === 270) {
            line(35, 0, 41, 0); //bigger marking
        } else {
            line(38, 0, 41, 0); //smaller marking
        }
        popMatrix(); //go back to previous coordinate system
        
    }
    
    //change rotation of each hand for real-time clock
    
    //map current sec and min: 0 to 60 -> -90 to 270 degrees 
    //start: 12:00/-90 degrees, goes around clock to 270 degrees
    rotateSec = map(second(), 0, 60, -90, 270);
    rotateMin = map(minute(), 0, 60, -90, 270);
    
    //map current hour: 0 to 24 -> -90 to 630 degrees (2x around)
    rotateHr = map(hr, 0, 24, -90, 630);

    //hands of the clock
    
    //hour hand
    strokeWeight(3);
    stroke(255);
    pushMatrix(); //save current coordinate system
    rotate(rotateHr); //rotate from clock's center
    line(0, 0, 17, 0); //the hour hand
    popMatrix(); //return to system with (0, 0) at clock pos
    //minute hand
    strokeWeight(2);
    stroke(255);
    pushMatrix(); //save current coordinate system
    rotate(rotateMin); //rotate from clock's center
    line(0, 0, 30, 0); //the minute hand
    popMatrix(); //return to system with (0, 0) at clock pos
    //second hand
    strokeWeight(1);
    stroke(255, 0, 0);
    pushMatrix(); //save current coordinate system
    rotate(rotateSec); //rotate from clock's center
    line(0, 0, 38, 0); //the second hand
    popMatrix(); //return to system with (0, 0) at clock pos
    
    //return to coordinate system with (0,0) at zoom-in point
    popMatrix();
    
    //center of clock
    strokeWeight(2);
    stroke(43, 38, 34);
    fill(255, 190, 38);
    ellipse(clockX, clockY, 6, 6);

};

//}

//Shelves {

//everything  related to position of the first shelf
var fShelfX = 619;
var fShelfY = 279;

//create book
var book = function(x, y, color, angle, bookW, bookH){
    
    //shadows
    
    //If the book is leaning/upright, do a triangular shadow
    fill(0, 100);
    noStroke();
    if (angle < 45 || angle > 345) {
        triangle(x+bookW*0.4, y-bookH/2, 
                 x+bookW*0.3, y+bookH/2, 
                 x+bookW*1.3, y+bookH/2);
    }
    //if book is sideways, do a rectangular shadow to the right
    if (angle === 270 || angle === 90) {
        rect(x+bookH/4, y+bookW/7, bookH, bookW, 2);
    }
    
    //draw book
    pushMatrix(); //save current coordinate system
    
    translate(x,  y); //translate to book position
    rotate(angle); //rotate by desired angle
    //book
    fill(color); //fill with desired color
    rect(0, 0, bookW, bookH, 2); //book
    //label thingy  on book
    fill(255, 255, 255, 100); //translucent white
    rect(0, bookH/4.6, bookW, bookH/4); //label
    
    popMatrix(); //revert to previous coordinate system
    
};

//draws shelves and items
var drawShelves = function() {
    
    //first shelf
    
    //hourglass thingy
    noStroke();
    //shadow
    fill(0, 100);
    arc(fShelfX+74, fShelfY-33, 15, 20, 180, 360); //bottom
    arc(fShelfX+74, fShelfY-51, 15, 20, 0, 180); //top
    //hourglass
    fill(255, 170); //translucent white
    arc(fShelfX+69, fShelfY-35, 15, 20, 180, 360); //bottom
    arc(fShelfX+69, fShelfY-52, 15, 20, 0, 180); //top
    
    //misc books --textbooks, nonfiction, etc.
    book(fShelfX+69, fShelfY-29, 
         color(224, 149, 0), 90, 12, 35); //yellow
    book(fShelfX+69, fShelfY-19,
         color(212, 57, 212), 270, 8, 46); //pink
    book(fShelfX+69, fShelfY-8, 
         color(75, 83, 194), 90, 15, 40); //blue
    book(fShelfX+33, fShelfY-20, 
         color(18, 110, 0), 0, 15, 40); //green
    book(fShelfX+19, fShelfY-16, 
         color(145, 0, 0), 0, 10, 30); //red
    book(fShelfX+181, fShelfY-16, 
         color(51, 17, 0), 0, 10, 33); //dark brown
    book(fShelfX+165, fShelfY-18, 
         color(113, 75, 163), 0, 15, 40); //lavender
    book(fShelfX+118, fShelfY-18, 
         color(0, 83, 156), 349, 15, 41); //darker blue
    book(fShelfX+98, fShelfY-23, 
         color(105, 105, 105), 0, 17, 45); //gray book
         
    //glass box thingy and shadow
    fill(255, 255, 255, 150);
    rect(fShelfX+145, fShelfY-10, 20, 20, 5); //box
    fill(0, 150);
    ellipse(fShelfX+145, fShelfY-10, 10, 10); //circle
    //shadow
    fill(0, 100);
    triangle(fShelfX+155, fShelfY-20, 
             fShelfX+155, fShelfY, 
             fShelfX+165, fShelfY); 


    //second shelf
    
    //treble clef shadow
    noFill();
    strokeWeight(3);
    stroke(0, 100);
    line(fShelfX+107, fShelfY+38, fShelfX+108, fShelfY+55);//main
    arc(fShelfX+105, fShelfY+57, 7, 10, 0, 180); //bottom
    arc(fShelfX+107, fShelfY+34, 14, 9, -90, 90); //top "D"
    arc(fShelfX+108, fShelfY+47, 15, 14, -14, 270); //bottom left
    
    noStroke();
    fill(0, 100);
    ellipse(fShelfX+112, fShelfY+45, 5, 4); //little dot at end
    rect(fShelfX+108, fShelfY+61, 20, 7); //clef base shadow
    
    //treble clef
    strokeWeight(2);
    noFill();
    stroke(204, 204, 204);
    line(fShelfX+100, fShelfY+26, fShelfX+101, fShelfY+49);//main
    arc(fShelfX+98, fShelfY+51, 7, 10, 0, 180); //bottom
    arc(fShelfX+100, fShelfY+29, 14, 9, -90, 90); //top "D"
    arc(fShelfX+102, fShelfY+41, 15, 14, -14, 270); //bottom left
    
    noStroke();
    fill(255);
    ellipse(fShelfX+107, fShelfY+39, 5, 4); //little dot at end
    fill(0);
    rect(fShelfX+100, fShelfY+58, 20, 7); //clef black base
    
    book(fShelfX+100, fShelfY+68, 
         color(171, 171, 0), 90, 12, 38); //yellow bk
    
    //The Harry Potter Series!
    book(fShelfX+171, fShelfY+51, 
         color(0, 84, 4), 0, 17, 45); //green bk7 DH
    book(fShelfX+152, fShelfY+52, 
         color(64, 0, 37), 0, 16, 44); //dark red-pink bk6 HBP
    book(fShelfX+134, fShelfY+54, 
         color(143, 0, 64), 0, 15, 38); //red-pink bk5 OOP
    book(fShelfX+64, fShelfY+54, 
         color(0, 35, 74), 0, 15, 38); //dark blue bk4 GOF
    book(fShelfX+48, fShelfY+54, 
         color(45, 0, 64), 0, 14, 37); //purple bk3 POA
    book(fShelfX+34, fShelfY+55, 
         color(0, 48, 3), 0, 10, 37); //dark green bk2 COS
    book(fShelfX+22, fShelfY+56, 
         color(105, 0, 0), 8, 9, 34); //red bk1 PS 
    //The sequel play has been left out for reasons
    
    
    //third shelf
      
    //souvenir glass jellyfish I've always wanted
    
    //shadow
    fill(0, 80);
    arc(fShelfX+32, fShelfY+144, 26, 60, 180, 360);
    //glass
    fill(255, 100);
    arc(fShelfX+22, fShelfY+141, 26, 60, 180, 360);
    //jellyfish        
    fill(19, 30, 148);
    arc(fShelfX+22, fShelfY+131, 14, 24, 180, 360); //body
    rect(fShelfX+19, fShelfY+132, 3, 3); //left tentacle
    rect(fShelfX+24, fShelfY+133, 3, 6); //right tentacle
    //base
    fill(56, 26, 0);
    rect(fShelfX+21, fShelfY+144, 33, 8, 6);
    //shine
    noFill();
    stroke(255, 255, 255, 120);
    strokeWeight(3);
    arc(fShelfX+22, fShelfY+133, 16, 33, 180, 270);
    
    //A Series of Unfortunate Events
    book(fShelfX+58, fShelfY+116, 
         color(31, 0, 61), 270, 9, 35); //purple MM
    book(fShelfX+56, fShelfY+125, 
         color(0, 74, 0), 90, 10, 35); //green WW
    book(fShelfX+58, fShelfY+134, 
         color(54, 14, 0), 270, 8, 35); //dark red RR
    book(fShelfX+58, fShelfY+142, 
         color(3, 0, 79), 90, 8, 35); //dark blue BB
    
    book(fShelfX+123, fShelfY+109, 
         color(77, 51, 0), 270, 12, 35); //brown SS
    book(fShelfX+119, fShelfY+120, 
         color(3, 101, 247), 90, 11, 35); //cyan CC
    book(fShelfX+125, fShelfY+132, 
         color(158, 74, 0), 270, 11, 35);//orange HH
    book(fShelfX+121, fShelfY+142, 
         color(102), 90, 11, 35); //gray VV
    
    book(fShelfX+180, fShelfY+131, 
         color(171, 120, 80), 0, 13, 35); //tan The End
    book(fShelfX+164, fShelfY+131, 
         color(196, 39, 0), -13, 13, 35); //red orange PP
    book(fShelfX+150, fShelfY+131, 
         color(81, 148, 90), -13, 13, 35); //jade GG
    
    book(fShelfX+95, fShelfY+129, 
         color(148, 19, 19), 350, 11, 35); //red EE
    book(fShelfX+82, fShelfY+129, 
         color(10, 10, 10), 350, 11, 35); //black AA
    
    //wings of golden snitch
    fill(255, 255, 255);
    arc(fShelfX+157, fShelfY+139, 25, 12, -20, 200);
    //golden snitch
    fill(255, 191, 0);
    ellipse(fShelfX+157, fShelfY+142, 13, 13);
    //shine
    noFill();
    stroke(255, 255, 257);
    arc(fShelfX+157, fShelfY+142, 6, 6, 180, 270);
    
    
    //fourth shelf
    
    //The Giver Series
    book(fShelfX+24, fShelfY+184, 
         color(196, 132, 76), 90, 10, 30); //orange bk1
    book(fShelfX+28, fShelfY+194, 
         color(48, 141, 255), 270, 10, 30); //sky blue bk2
    book(fShelfX+20, fShelfY+204, 
         color(129, 199, 126), 90, 10, 30); //jade bk3
    book(fShelfX+28, fShelfY+216, 
         color(150, 150, 150), 270, 13, 30); //gray bk4
    
    //The Diary of Anne Frank
    book(fShelfX+51, fShelfY+205, 
         color(71, 0, 0), -9, 10, 30); //red
    
    //more books
    book(fShelfX+182, fShelfY+207, 
         color(71, 47, 0), 0, 9, 28); //brown
    book(fShelfX+169, fShelfY+203, 
         color(57, 71, 0), 0, 11, 38); //dark green
    book(fShelfX+154, fShelfY+201, 
         color(29, 0, 56), 0, 13, 44); //dark purple
    book(fShelfX+141, fShelfY+201, 
         color(71, 71, 71), 0, 9, 44); //gray
         
    //kalimba case shadow
    fill(0, 100);
    rect(fShelfX+126, fShelfY+202, 17, 38, 4);
    //kalimba case
    fill(0, 0, 0); //black
    rect(fShelfX+122, fShelfY+202, 17, 38, 4);
    
    //notebooks/journals
    book(fShelfX+90, fShelfY+190, 
         color(130, 102, 0), 270, 11, 37); //dark gold
    book(fShelfX+86, fShelfY+199, 
         color(156), 90, 8, 37); //silvery
    book(fShelfX+92, fShelfY+208, 
         color(138, 0, 110), 270, 10, 37); //magenta
    book(fShelfX+84, fShelfY+217, 
         color(0, 120, 176), 90, 8, 37); //blue
    
    //plant shadow
    fill(0, 100);
    triangle(fShelfX+140, fShelfY+194, 
             fShelfX+122, fShelfY+223, 
             fShelfX+143, fShelfY+223);
    //plant left leaf
    fill(0, 255, 38);
    bezier(fShelfX+129, fShelfY+210, 
           fShelfX+129, fShelfY+191, 
           fShelfX+119, fShelfY+195, 
           fShelfX+117, fShelfY+196);
    //plant right leaf
    fill(0, 184, 25);
    bezier(fShelfX+129, fShelfY+210, 
           fShelfX+129, fShelfY+191, 
           fShelfX+139, fShelfY+195, 
           fShelfX+142, fShelfY+196);
    //plant pot
    fill(158, 97, 0);
    strokeWeight(2);
    stroke(89, 31, 0);
    arc(fShelfX+129, fShelfY+207, 18, 28, 0, 180); //body
    rect(fShelfX+129, fShelfY+208, 18, 5, 5); //top rect
    
    
    //shelves
    noStroke();
    rectMode(CORNER); //set rectMode back to default
    //loop through y values
    for (var y = fShelfY; y < fShelfY+246; y += 74) {
        
        //shadows of thingies that hold up the shelf
        fill(0, 150);
        rect(fShelfX+22, y+12, 10, 16); //left 
        rect(fShelfX+178, y+12, 10, 16); //right
        //thingies that hold up shelf
        fill(59, 59, 59);
        rect(fShelfX+18, y+9, 10, 16); //left 
        rect(fShelfX+174, y+9, 10, 16); //right
        //bolt thingies
        fill(26, 26, 26);
        ellipse(fShelfX+23, y+18, 5, 5); //left 
        ellipse(fShelfX+179, y+18, 5, 5); //right
        
        //shelf shadows
        fill(0, 145);
        rect(fShelfX+3, y+8, 200, 10, 10);
        //shelf shade - 3Dness
        fill(153, 153, 153);
        rect(fShelfX, y+3, 200, 10, 10);
        //shelves
        fill(219, 219, 219);
        rect(fShelfX, y, 200, 10, 10);
        
    }
    
    rectMode(CENTER); //back to desired positioning
    
};

//}

//Violin Case {

//all related to handle of violin case
var vHandleX = 717;
var vHandleY = 565;

//Draws a bad violin case
var drawViolinCase = function() {

    pushMatrix(); //save current coordinate system
    translate(vHandleX, vHandleY); //translate to handle's pos
    rotate(-6); //rotate the whole thing a little bit
    
    //violin case shadow
    fill(0, 100);
    beginShape();
    vertex(6, 6);
    bezierVertex(154, -26, 156, 90, 6, 69);
    bezierVertex(-133, 55, -138, 35, -6, 8);
    endShape();

    //violin case handle
    strokeWeight(8);
    stroke(0);
    noFill();
    pushMatrix(); //save current coordinate system
    rotate(-10); //rotate handle -10 degrees
    rect(0, 0, 24, 18, 10); //handle
    popMatrix(); //go back to previous coordinate system
    
    //violin case
    fill(10);
    strokeWeight(5);
    beginShape();
    vertex(-4, 4);
    bezierVertex(144, -27, 146, 88, -4, 59);
    bezierVertex(-143, 46, -148, 28, -4, 4);
    endShape();
    
    popMatrix(); //back to original coordinate system

};

//}


/*****************Left Side and Center Setting******************/

//Floor and Quote {

//everything related to the position of the floor
var floorX = 428;
var floorY = 673;

var noteColor = color(20, 0, 51); //color of the notes

//a function to draw a music note
var musicNote = function(x, y, stemUp, isHalf) {

    pushMatrix(); //save current coordinate system
    translate(x, y); //translate to note position
    noStroke();
    
    //note stems (rects)
    fill(noteColor); //note color
    //if the stemUp is passed in as true
    if(stemUp) {
        
        //if the note is a half (empty) note
        if (isHalf) {
            //draw a rect up and to the right of the note
            rect(10, -25, 5, 43);
        } else {
            //draw a smaller rect up and to the right of the note
            rect(8, -25, 4, 43);
        }
        
    } else {
        
        //draw a rect to down and to the left of the note
        rect(-8, 25, 4, 43);
        
    }
    
    //note heads (ellipses)
    rotate(-30); //rotate a little
    //if the note is a half note
    if (isHalf) {
        
        //draw two ellipses with no fill
        noFill();
        strokeWeight(3);
        stroke(noteColor);
        ellipse(0, 0, 20, 15); //note head
        ellipse(3, 0, 20, 15); //to right of note for style
        
    } else {
        
        //draw an ellipses with fill
        fill(noteColor);
        ellipse(0, 0, 20, 15);
        
    }
    
    popMatrix(); //revert to previous coordinate system
    
};

//draw floor and quote/staff/notes on wall
var drawFloorAndQuote = function() {
    
    //Floor
    strokeWeight(7);
    stroke(0, 3, 26);
    fill(2, 0, 46);
    rect(floorX, floorY, 870, 135);
    
    //floorboards
    strokeWeight(5);
    stroke(0, 4, 31);
    pushMatrix(); //save current coordinate system
    translate(floorX, floorY-73); //to top of middle of floor
    //for six lines on each side (two are on center)
    for(var i = 0; i < 6; i += 1) {
        line(i*-80, 0, i*-110, 130); //lines on left side
        line(i*80, 0, i*110, 130); //lines on right side
    }
    popMatrix(); //back to previous coordinate system
    
    //white trim
    noStroke();
    fill(168, 168, 168);
    rect(floorX, floorY-82, 870, 19); //gray line
    fill(215);
    rect(floorX, floorY-88, 870, 19); //white trim
    
    //Quote
    
    //Lines of the staff
    fill(27, 0, 71);
    //for 5 lines
    for (var i = 0; i < 5; i++) {
        //lines of the staff
        rect(floorX, floorY-560+i*13, 857, 6);
    }
    
    //bar lines to seperate each measure, from left to right
    rect(floorX-380, floorY-535, 3, 57);
    rect(floorX-235, floorY-535, 3, 57);
    rect(floorX-147, floorY-535, 3, 57);
    rect(floorX-80,  floorY-535, 3, 57);
    rect(floorX,     floorY-535, 3, 57); //center 
    rect(floorX+149, floorY-535, 3, 57);
    rect(floorX+238, floorY-535, 3, 57);
    rect(floorX+298, floorY-535, 3, 57);
    rect(floorX+417, floorY-535, 3, 57);
    
    //music notes (Hedwig's Theme!)
    
    //1st note leftmost (quarter A)
    musicNote(floorX-405, floorY-528, true, false);
    
    //2nd note (dotted quarter D)
    musicNote(floorX-353, floorY-547, false, false); //note
    ellipse(floorX-334, floorY-553, 5, 5); //dot
    //3rd note (eighth F)
    musicNote(floorX-302, floorY-561, false, false); //note
    //flag for eighth note
    stroke(noteColor);
    strokeWeight(3);
    beginShape();
    vertex(floorX-296, floorY-546);
    bezierVertex(floorX-296, floorY-524,   
                 floorX-306, floorY-543, 
                 floorX-308, floorY-514);
    bezierVertex(floorX-311, floorY-542, 
                 floorX-296, floorY-524, 
                 floorX-296, floorY-548);
    endShape();
    //4th note (quarter E)
    musicNote(floorX-259, floorY-555, false, false);
    
    //5th note (half D)
    musicNote(floorX-209, floorY-547, false, true);
    //6th note (quarter A)
    noStroke();
    fill(27, 0, 71);
    rect(floorX-169, floorY-571, 32, 5); //6th note ledger line
    musicNote(floorX-169, floorY-572, false, false); //note
    
    //7th note (dotted half G)
    musicNote(floorX-113, floorY-567, false, true); //note
    fill(noteColor);
    noStroke();
    ellipse(floorX-92, floorY-570, 5, 5); //dot
    
    //8th note (dotted half E)
    musicNote(floorX-45, floorY-553, false, true); //note
    fill(noteColor);
    noStroke();
    ellipse(floorX-24, floorY-554, 5, 5); //dot
    
    //9th note (dotted quarter D)
    musicNote(floorX+30, floorY-547, false, false); //note
    ellipse(floorX+49, floorY-553, 5, 5); //dot
    //10th note (eighth F)
    musicNote(floorX+78, floorY-561, false, false); //note
    //flag for eighth note
    stroke(noteColor);
    strokeWeight(3);
    beginShape();
    vertex(floorX+84, floorY-546);
    bezierVertex(floorX+84, floorY-524,   
                 floorX+74, floorY-543, 
                 floorX+72, floorY-514);
    bezierVertex(floorX+69, floorY-542, 
                 floorX+84, floorY-524, 
                 floorX+84, floorY-548);
    endShape();
    //11th note (quarter E)
    musicNote(floorX+120, floorY-555, false, false);
    
    //12th note (half C)
    musicNote(floorX+175, floorY-540, false, true);
    //13th note (quarter E)
    musicNote(floorX+215, floorY-555, false, false);
    //14th note (dotted half A)
    musicNote(floorX+264, floorY-527, true, true); //note
    fill(noteColor);
    noStroke();
    ellipse(floorX+283, floorY-528, 5, 5); //dot
    
   
    //Quote font
    //if user has made fallBackFont true
    if (fallBackFont) {
        textFont(fallbackFont, 25); //use fallBack font
    } else {
        textFont(mainFont, 31); //use desired font
    }
    
    //Quote
    fill(255, 190);
    text("Music can express what words cannot.", 
         floorX, floorY-536);

};

//}

//Desk {

//everything is related to position of the top of the desk
var topDX = 106;
var topDY = 474;

//draw desk under window
var drawDesk = function() {

    //shadows  
    
    //shadow to darken white floor trim
    fill(0, 100);
    rect(topDX-60, topDY+103, 110, 50);
    //desk main shadow (three for more darkess);
    image(getImage("cute/ShadowNorth"),
          topDX-5, topDY+160, 249, 118);
    image(getImage("cute/ShadowNorth"),
          topDX-5, topDY+173, 249, 118);
    image(getImage("cute/ShadowNorth"),
          topDX-5, topDY+192, 249, 118);
    //cup shadow
    noStroke();
    triangle(topDX+89, topDY-13, topDX+70, topDY-48, 
             topDX+66, topDY-13);
    
    //back of the desk
    noStroke();
    fill(28, 0, 0);
    rect(topDX-67, topDY+62, 116, 100);

    //pencils in cup
    for(var x = topDX+73; x < topDX+107; x+=6) {
        
        strokeWeight(4);
        stroke(255, 153, 0);
        line(topDX+89, topDY-20, x, topDY-44); //pencil
        
        noStroke();
        fill(200);
        ellipse(x, topDY-43, 2, 6); //metal bit
        fill(255, 0, 115);
        ellipse(x, topDY-45, 4, 5); //eraser
        
    }
    
    //cup
    noStroke();
    //blue cup
    fill(0, 153, 173); 
    quad(topDX+77, topDY-31, topDX+100, topDY-31,
         topDX+96, topDY-13, topDX+82, topDY-13);
    //green band
    fill(0, 255, 51); 
    rect(topDX+89, topDY-22, 16, 4);
    
    //frame of the desk
    strokeWeight(5);
    stroke(26, 0, 0);
    fill(54, 0, 0);
    //front legs
    rect(topDX+104, topDY+91, 22, 164); //to right of drawer
    rect(topDX-3, topDY+91, 22, 164); //to left of drawer
    fill(87, 0, 0);
    rect(topDX, topDY, 254, 22); //top of desk
    
    //drawers
    strokeWeight(6);
    stroke(26, 0, 0);
    fill(54, 0, 0);
    rect(topDX+51, topDY+44, 86, 64); //top
    rect(topDX+51, topDY+109, 86, 64); //bottom
    
    //draw handles
    
    //shadows
    fill(0, 70);
    arc(topDX+50, topDY+35, 22, 20, 0, 180); //top
    arc(topDX+50, topDY+100, 22, 20, 0, 180); //bottom
    //handles
    strokeWeight(3);
    stroke(41, 41, 0);
    strokeCap(SQUARE);
    fill(102, 97, 0);
    //use begin/end shape to close arcs
    //top
    beginShape();
    arc(topDX+51, topDY+31, 22, 20, 0, 180);
    endShape(CLOSE);
    //bottom
    beginShape();
    arc(topDX+51, topDY+96, 22, 20, 0, 180);
    endShape(CLOSE);
    
    //set back to norm
    strokeCap(ROUND);
    noStroke();
    
    //laptop
    
    //shiny top
    fill(43, 43, 43);
    quad(topDX-15, topDY-19, topDX-25, topDY-15,
         topDX-109, topDY-15, topDX-109, topDY-19); 
    //main body
    fill(8, 8, 8);
    quad(topDX-15, topDY-16, topDX-25, topDY-12,
         topDX-109, topDY-12, topDX-109, topDY-16); 
    
};

//}

//Window {

//everything is related to the window's position
var windowX = 116;
var windowY = 290;

//function to draw window and curtain
var drawWindow = function() {
    
    //shadow of window, windowsill, and curtain
    fill(lerpColor(wallColor, color(0), 0.25)); //shadow color
    noStroke();
    rect(windowX-2, windowY+5, 168, 170, 5); //window
    rect(windowX-3, windowY+104, 186, 38, 10); //windowsill
    rect(windowX-3, windowY-32, 188, 116, //curtain
         10, 10, 50, 25); //specific radius for each corner
   
    //white border of window
    stroke(186, 226, 255);
    strokeWeight(5);
    fill(235, 244, 255);
    rect(windowX, windowY, 154, 170, 5);
    
    // current hour
    var hr = hour();
    
    //day - 6am to 7pm / night - 7pm to 6 am
    if (hr <= 6 || hr >= 19) {
        
        //outside night sky background
        noStroke();
        fill(0, 23, 117);
        rect(windowX, windowY, 124, 140, 5);
        
        //stars ordered left to right
        strokeWeight(4);
        fill(255);
        //small stars 
        stroke(255, 80);
        ellipse(windowX-56, windowY+23, 4, 4); //1st
        ellipse(windowX-20, windowY+29, 4, 4); //2nd
        ellipse(windowX+23, windowY+30, 4, 4); //3rd
        ellipse(windowX+58, windowY+24, 4, 4); //4th
        //teeny-tiny stars
        strokeWeight(2);
        ellipse(windowX-44, windowY+27, 3, 3); //1st
        ellipse(windowX-32, windowY+23, 3, 3); //2nd
        ellipse(windowX-6,  windowY+25, 3, 3); //3rd
        ellipse(windowX+11, windowY+26, 3, 3); //4th
        ellipse(windowX+34, windowY+25, 3, 3); //5th
        ellipse(windowX+48, windowY+30, 3, 3); //6th
        
    } else {
        
        //outside daylight sky background
        noStroke();
        fill(51, 133, 255);
        rect(windowX, windowY, 124, 140, 5);
        
        //clouds
        fill(199, 252, 255);
        //right cloud
        ellipse(windowX+32, windowY+25, 23, 15); //center
        ellipse(windowX+44, windowY+25, 15, 8); //right
        ellipse(windowX+20, windowY+25, 15, 8); //left
        //left cloud
        ellipse(windowX-29, windowY+31, 23, 15); //center
        ellipse(windowX-16, windowY+31, 15, 8); //right
        ellipse(windowX-40, windowY+31, 15, 8); //left
        
    }
    
    //trees, from left to right
    
    //back layer
    noStroke();
    fill(10, 28, 0);
    arc(windowX-62, windowY+50, 21, 28, -90, 90); //1st
    ellipse(windowX-43, windowY+49, 20, 32); //2nd
    ellipse(windowX-26, windowY+48, 19, 26); //3rd
    ellipse(windowX-10, windowY+49, 20, 27); //4th
    ellipse(windowX+5,  windowY+51, 19, 24); //5th
    ellipse(windowX+18, windowY+53, 19, 33); //6th
    ellipse(windowX+36, windowY+52, 27, 33); //7th
    ellipse(windowX+54, windowY+48, 20, 27); //8th
    
    //front layer
    fill(7, 56, 0);  
    arc(windowX-62, windowY+58, 14, 23, -90, 90);
    ellipse(windowX-48, windowY+55, 19, 22); //1st
    ellipse(windowX-36, windowY+53, 16, 26); //2nd
    ellipse(windowX-25, windowY+57, 15, 26); //3rd
    ellipse(windowX-7,  windowY+56, 35, 22); //4th
    ellipse(windowX+12, windowY+57, 15, 25); //5th
    ellipse(windowX+25, windowY+57, 18, 23); //6th
    ellipse(windowX+42, windowY+55, 20, 23); //7th
    
    //ground
    fill(11, 79, 0);  
    rect(windowX-3, windowY+66, 119, 8, 5);
    
    //shadow to darken if night -- 7pm to 6am 
    if (hour() <= 6 || hour() >= 19) {
        fill(0, 80);
        rect(windowX, windowY, 124, 140, 5);
    }
    
    //plant leaves
    
    strokeWeight(3);
    stroke(0, 140, 30);
    fill(34, 255, 0);
    
    //left leaf
    pushMatrix(); //save current coordinate system
    translate(windowX+37, windowY+53); //translate to leaf pos
    rotate(43); //rotate ellipse
    ellipse(0, 0, 28, 18); //leaf
    popMatrix(); //go back to previous coordinate system
    
    //right leaf
    pushMatrix(); //save current coordinate system
    translate(windowX+67, windowY+53); //translate to leaf pos
    rotate(141); //rotate ellipse
    ellipse(0, 0, 28, 18); //leaf
    popMatrix(); //go back to previous coordinate system
    
    //middle leaf
    pushMatrix(); //save current coordinate system
    translate(windowX+56, windowY+48); //translate to leaf pos
    rotate(14); //rotate ellipse
    ellipse(0, 0, 18, 31); //leaf
    popMatrix(); //go back to previous coordinate system
    
    //plant stems
    noFill();
    strokeWeight(3);
    //left
    bezier(windowX+32, windowY+49, 
           windowX+41, windowY+63, 
           windowX+42, windowY+48, 
           windowX+48, windowY+69);
    //middle
    bezier(windowX+57, windowY+42, 
           windowX+56, windowY+50, 
           windowX+53, windowY+45, 
           windowX+51, windowY+69);
    //right
    bezier(windowX+72, windowY+49, 
           windowX+56, windowY+70, 
           windowX+67, windowY+51, 
           windowX+53, windowY+69);
    
    //plant pot
    fill(255, 0, 187);
    strokeWeight(3);
    stroke(141, 0, 148);
    //main part
    quad(windowX+36, windowY+68, 
         windowX+67, windowY+68, 
         windowX+59, windowY+90, 
         windowX+45, windowY+90);
    //top of pot
    rect(windowX+51, windowY+68, 33, 9);
    
    //windowsill shadow
    noStroke();
    fill(3, 0, 31);
    rect(windowX, windowY+105, 184, 26, 10);
    //windowsill
    fill(4, 0, 48);
    rect(windowX, windowY+97, 184, 26, 10);
    
    //string
    strokeWeight(5);
    stroke(148, 89, 0);
    line(windowX, windowY+4, windowX, windowY+29);
    //ring
    noFill();
    ellipse(windowX, windowY+39, 13, 13);
    //curtain thingy
    stroke(255, 153, 0);
    strokeWeight(4);
    fill(255, 212, 38);
    rect(windowX, windowY-41, 176, 96, 5);
    
    //arcs on curtain
    stroke(255, 153, 0);
    for (var x = windowX-72; x < windowX+86; x+=29) {
        for (var y = windowY-56; y < windowY+11; y+=30) {
            //draw arc at (x, y)
            arc(x, y, 29, 29, 0, 180);
        }
    }
    
};

//}

//Light Fixture {

//all depends on the position of the overhead light arc
var fixtureX = 428;
var fixtureY = 30;

//draws light fixture
var drawLightFixture = function() {
    
    //light from light fixture
    noStroke();
    fill(255, 255, 0, 5);
    //ellipses from radius 298 to 110 at increments of 10
    for(var r = 298; r > 110; r-=10) {
        //draw barely visible ellipse
        ellipse(fixtureX, fixtureY+11, r, r);
    }
    
    //light fixture
    fill(255, 221, 28, 15);
    //arcs from width 90 to 137 at increments of 2
    for (var i = 90; i < 137; i+=2) {
        //draw a barely visible arc
        arc(fixtureX, fixtureY, i, i-20, 0, 180);
    }
    
    //thingy that it hangs from
    fill(64, 0, 0);
    rect(fixtureX, fixtureY-25, 16, 35);
    //base of the arc light
    fill(82, 0, 0);
    rect(fixtureX, fixtureY-8, 145, 16, 10);

};

//}


/********Draw Setting (Except Clock) and Save as an Image*******/
//{

pushMatrix(); //save current coordinate system

scale(0.7); //scale the coordinate system by a factor of 0.7

//draw the setting, except the animated clock
background(wallColor);
drawFloorAndQuote();
drawShelves();
drawViolinCase();
drawDesk();
drawWindow();
drawLightFixture();

popMatrix(); //revert back to original coordinate system

//use get() to save the setting as an image
var settingImage = get(0, 0, width, height);

//}


//************************************************************//
/**************************************************************/
//************************************************************//

//code for the custom music cursor
var musicCursor = function() {
    
    //cursor arrow {
    
    //mousePressed: white; hovering: grey; otherwise black
    strokeWeight(1);
    
    //set initial color of arrow to black
    fill(0);
    stroke(255, 100);
    //if mouse is pressed, make arrow white
    if (mouseIsPressed) {
        fill(255);
        stroke(0);
    } else {
        
        //loop through pixel array
        for (var i = 0; i < pixelImages.length; i++) {    
            //check if mouse is over img or cab doors (at start)
            if (pixelImages[i].mouseOver || !userStarted && 
                mouseX > 210 && mouseX < 390 && 
                mouseY > 185 && mouseY < 327) {
                fill(70); //make arrow gray
            } 
        }
        
    } 
    
    //draw the cursor arrow relative to mouse position
    triangle(mouseX, mouseY, mouseX+8, mouseY, mouseX, mouseY+8);
    
    //}
    
    //music note {
    //Note is white when viewing, black when not
    
    noStroke();
    rectMode(CORNER); //back to default
    
    //change color of note stem outline when user is viewing
    if (userIsViewing) {
        fill(0); //black
    } else {
        fill(255); //white
    }
    //note stem outline
    rect(mouseX+11, mouseY-1, 5, 13, 9);
    
    pushMatrix(); //save current coordinate system
    translate(mouseX+11, mouseY+14); //translate to note head pos
    rotate(324); //for rotated ellipse
    
    //change color of cursor note outline when userIsViewing
    if (userIsViewing) {
        fill(0); //black
    } else {
        fill(255); //white
    } 
    //draw cursor note outline, rotated
    ellipse(0, 0, 10, 8); 
    
    //change color of cursor note when userIsViewing
    if (userIsViewing) {
        fill(255); //white
    } else {
        fill(0, 0, 0); //black
    }     
    //draw a rotated ellipse (note head)
    ellipse(0, 0, 8, 6);
    popMatrix(); //go back to original coordinate system
    
    //change color of note stem when userIsViewing
    if (userIsViewing) {
        fill(255); //white
    } else {
        fill(0, 0, 0); //black
    } 
    //draw the note stem
    rect(mouseX+12, mouseY, 3, 14, 9);
    
    rectMode(CENTER); //back to default
    
    //}
    
};

//************************************************************//
/**************************************************************/
//************************************************************//


/***MOUSECLICKED FUNCTION***/
mouseClicked = function() {
    
    //toggle viewing mode {
    
    //if user clicked cabinet and cabinets have been fully opened
    if (userStarted && timer > openCabinetsTime+100) {
        //loop throught each image in the images array
        for (var i = 0; i < pixelImages.length; i++) {
            //if the mouse is over the image
            if (pixelImages[i].mouseOver) {
                /*turn viewing mode off or on, and pass in the  
                pixelImages array for logic purposes so that 
                only one image is viewed at a time.*/
                pixelImages[i].handleClick(pixelImages);
            }
            
        }
    }
    
    //}
    
    //for zoom in at start {
    
    //if user has not started and the mouse is over the doors
    if (!userStarted &&  mouseX > 210 && mouseX < 390 && 
                         mouseY > 185 && mouseY < 327) {
            //set userStarted to true to zoom into the cabinet
            userStarted = true;
    }  
    
    //}
    
};


/***DRAW FUNCTION***/
draw = function() {
    
    //zoom-in and timer {
    
    //start timer if user clicked mouse, end after cabinets open
    if (userStarted && timer < openCabinetsTime+150) {
        timer++;
    }
 
    //if timer has reached zoomInTime, zoom in
    if (scaleF < 1.67 && timer > zoomInTime) {
        //scale for zoom-in, increase factor until 1.67
        scaleF += 0.01;
    }
    
    //}
    
    //highlighting the images {
    
    //if user clicked to start and the doors are fully open
    if (userStarted && timer > openCabinetsTime) {
        //check if mouse is over the image
        for (var i = 0; i < pixelImages.length; i++) {
            //if user is not viewing, be able to highlight all
            //if viewing, be able to highlight only current image
            if (!userIsViewing || pixelImages[i].isViewing) {
                pixelImages[i].checkIfMouseOver(mouseX, mouseY);
            }
        }
    }
    
    //}
    
    //draw setting and pixel images {
    
    background(wallColor); //wall color
    
    pushMatrix(); //save current coordinate system
    translate(translateX, translateY); //point of zoom-in
    scale(scaleF); //for zoom-in at start
    
    //draw misc things in background only when visible
    if (timer < openCabinetsTime) {
        image(settingImage, 0, 0, width/0.7, height/0.7);
        drawClock();
    }
    
    drawDisplayCabinet(); //draw display cabinet
    
    popMatrix(); //reset coordinate system
    
    //show pics at appropriate time (regular coordinate system)
    if (timer > openCabinetsTime) {
        //loop through images array
        for (var i = 0; i < pixelImages.length; i++) {
            //for movement/updating
            pixelImages[i].update();
            //only display if not viewing (shadowed)
            if (!pixelImages[i].isViewing) {
                pixelImages[i].display();
            }
        }
    }
    
    //cabinet doors
    pushMatrix(); //save current coordinate system
    translate(translateX, translateY); //translate to zoom in pos
    scale(scaleF); //scale accordingly
    
    //draw cabinet doors and shadow on top of pics
    drawCabinetDoors();
    
    popMatrix(); //reset coordinate system

    //loop through images array
    for (var i = 0; i < pixelImages.length; i++) {
        //if pixel image is being viewed, draw on top of shadow
        if (pixelImages[i].isViewing) {
            pixelImages[i].display();
        }
    }
    
    //}
    
    //cursor
    musicCursor();
    
};
