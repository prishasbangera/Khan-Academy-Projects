//From my music contest entry: https://www.khanacademy.org/computer-programming/music-life-contest-music/4849309011820544

/***************************************************************

Click the images to view them.

****************************************************************/

/**************************************************************

                            ATTRIBUTES:
 *khanacademy.org/computer-programming/pixel-pot/6139251709591552
 *Thanks to this program for the method on how to do pixel art. I
  put this method in an object type to create multiple pixel art
  images which can change size, move, etc.
  
 *khanacademy.org/computer-programming/purple-future/4883269066309632?height=700px
 *Thanks to this program for showing me how to use trig functions   to make the images hover.
  
 *The violin is kind of based off image.shutterstock.com/z/stock-vector-the-pixelated-string-family-violin-viola-cello-double-bass-1589553574.jpg, except I made changes and added a bow.
 
 *The keyboard is kind of based off i.ytimg.com/vi/ekq0MTv7M0Y/hqdefault.jpg, except I made changes and added notes.


***************************************************************/

//Setup {

cursor("NONE"); //begone, cursor!

imageMode(CENTER);

textAlign(CENTER, CENTER); //Position text by center
var mainFont = createFont("Trebuchet MS");
var wallColor = color(33, 19, 5); //background wall color
var userIsViewing = false; //Is the user viewing an image?

//}

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
    
    rectMode(CORNER); //change to default positioning
    
    //Create the pixel art images and save as img
    
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
        
        textFont(mainFont, 20);

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
        if (this.backgroundAlpha < 200) {
            this.backgroundAlpha+=20;
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
    if (mx > this.currX && mx < this.currX + this.currentWidth &&
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
    x: 50,
    y: 50,
    pixelSize: 5,
    
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
    viewingSizeF: 9/5, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I have to listen to music while working on anything. \n It helps me focus and, ultimately, enjoy the task more. \n I love classical music and movie soundtracks the most.",
    textX: width/2,
    textY: 390
    
});

//Flute pic
var pixelFlute = new PixelImage({
    
    //Used to create the image
    
    //position and pixel size
    x: 276,
    y: 75,
    pixelSize: 5,
    
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
    viewingY: 120,
    //Size of picture when viewing. Will not change.
    viewingSizeF: 9/5, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I played flute in middle school.\n Band was a place where I felt at home; \n everyone knew music there. The two directors \n I've had were amazing.",
    textX: width/2,
    textY: 330,
    
});

//Violin pic
var pixelViolin = new PixelImage({
    
    //Used to create the picture
    
    //position and pixel size
    x: 51,
    y: imageY+48,
    pixelSize: 6,
    
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
    viewingX: 22,
    viewingY: 70,
    //Size of picture when viewing. Will not change.
    viewingSizeF: 3/2, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I've been playing violin for six \n years, and I've grown to \n absolutely love it.  Violin is \n what started my love of music. \n Since then, I've discovered an \n inordinate number of \n wonderful pieces.",
    textX: width*3/4-10,
    textY: height/2,

});

//Keyboard pic
var pixelKeyboard = new PixelImage({
    
    //Used to create the image
    
    //position and pixel size
    x: 345,
    y: 194,
    pixelSize: 5,
    
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
    viewingSizeF: 6/5, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "I love experimenting with music \n with whatever music knowledge \n I have.  The keyboard, music \n notation  software, playing on \n water glasses, coming up \n  with weird tunes and \n poems, you name it.",
    textX: width*3/4-8,
    textY: height/2,  
    
});

//Kalimba pic
var pixelKalimba = new PixelImage({
    
    //Use to create the image
    
    //position and pixel size
    x: 241,
    y: 248,
    pixelSize: 3,
    
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
    viewingSizeF: 8/3, //start size is multiplied by this factor
    
    //text that shows up when viewing and position
    viewingText: "Last year, I discovered the \n beautiful  African kalimba, or \n mbira. Sometimes described  as a \n \"thumb piano,\" the kalimba has \n an elegant, percussive sound that \n is profoundly enchanting and \n haunting. Ever since I'd received \n one for my birthday, I've \n been trying to learn it.",
    textX: width*3/4-13,
    textY: height/2,
    
});

//An array that holds all the pixel art images.
var pixelImages = [
    
    pixelMusicWithHomework, 
    pixelFlute, 
    pixelViolin, 
    pixelKeyboard, 
    pixelKalimba
    
];


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
            //check if mouse is over img
            if (pixelImages[i].mouseOver) {
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
    
    //}
    
};


/***DRAW FUNCTION***/
draw = function() {
    
    //highlighting the images {
    
    //check if mouse is over the image
    for (var i = 0; i < pixelImages.length; i++) {
        //if user is not viewing, be able to highlight all
        //if viewing, be able to highlight only current image
        if (!userIsViewing || pixelImages[i].isViewing) {
            pixelImages[i].checkIfMouseOver(mouseX, mouseY);
        }
    }
    
    //}
    
    //draw setting and pixel images {
    
    background(wallColor); //wall color
    
    //show pics
    //loop through images array
    for (var i = 0; i < pixelImages.length; i++) {
        //for movement/updating
        pixelImages[i].update();
        if (!pixelImages[i].isViewing) {
            pixelImages[i].display();
        }
    }
    
    for (var i = 0; i < pixelImages.length; i++) {
        if (pixelImages[i].isViewing) {
            pixelImages[i].display();
        }
    }
 
    
    //}
    
    //cursor
    musicCursor();
    
};
