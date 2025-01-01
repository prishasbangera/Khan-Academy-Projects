
//In progress...
//I don't know the way players are set up, this can be changed later
/*textSize(15);
//create players
var numAIPlayers = 9;
var numImposters = 2;
function player(clrName, nickname, isImposter, isAI, currLocation) {
    return {
        clrName: clrName,
        nickname: nickname,
        isImposter: isImposter,
        isAI: isAI,
        currLocation: currLocation,
        isReporter: false,
        isGhost: false,
        hasVoted: false,
    };
}
var clrs = {
    "red": color(195,17,14),
    "orange": color(240,127,15),
    "yellow": color(248,245,88),
    "lime": color(79,242,55),
    "green": color(15,127,43),
    "cyan": color(55,255,222),
    "blue": color(17,46,210),
    "purple": color(109,48,188),
    "pink": color(237,84,188),
    "white": color(216,224,243),
    "black": color(64,71,77),
    "brown": color(113,72,31),
};
var clrNames = Object.keys(clrs);
var locations = [
    
];
var players = [];
for (var i = 0; i < numAIPlayers; i++) {
    var clrName = clrNames.splice(floor(random(clrNames.length)), 1);
    players.push(player(clrName, "Player "+(i+1), false, true));
}

//Pick random imposters - should PROBABLY be random...but they've already been picked in the game...but what if the human player is the imposter....ahhh
players[0].isImposter = true;
players[3].isImposter = true;
//Pick the person reporting
players[5].isReporter = true;

//discussion has phases
//0. everyone asks where
//1. person who reported says a room
//2. where was everyone
//3. accusations
//4. denials / backups of accusations
//5. everyone telling who they are going to vote for

var discussAI = {
    stage: 0,
    startSentenceY: 50,
    sentenceY: 50,
    stages: [],
    currStage: 0,
    getPlayersCopy: function() {
        var copy = [];
        for (var i = 0; i < players.length; i++) {
            copy[i] = players[i];
        }
        return copy;
    }
};

discussAI.nextSentence = function(str, player) {
    fill(clrs[player.clrName]);
    text(player.nickname +" (Imposter-" + player.isImposter + ") : "+ str, 3, this.sentenceY);  
    this.sentenceY+=30;
};

discussAI.stages[0] = function() {
    var players_copy = discussAI.getPlayersCopy();
    var maxIter = floor(random(2, 6));
    var iter = 0;
    var player;
    while(iter < maxIter) {
        player = players_copy.splice([floor(random(players_copy.length-1))], 1);
        if (!player[0].isReporter) {
            discussAI.nextSentence("where", player[0]);
        }
        iter++;
    }
    for (var i = 0; i < players.length; i++) {
        if (players[i].isReporter) {
            discussAI.nextSentence("In INSERT ROOM HERE", players[i]);
            break;
        }   
    }
};
discussAI.stages[1] = function() {
    var players_copy = discussAI.getPlayersCopy();
    var randomPlayer = players_copy[floor(random(players.length-1))];
    var phrase, num = random(1);
    if (num < 0.3) {
        phrase = "where was everyone";
    } else if (num < 0.6) {
        phrase = "any sus";
    } else {
        phrase = "where was everyone";
    }
    discussAI.nextSentence(phrase, randomPlayer);
    discussAI.nextSentence("I was in INSERT ROOM HERE", randomPlayer);
};

background(0);
//You
players.push(player(clrNames[0], "YOU", false, false));
fill(clrs[players[players.length-1].clrName]);
text("YOU ARE: " + players[players.length-1].clrName + ", Imposter: false", 3, 22); 
fill(255);
text("Stage 0", 333, 24);
discussAI.sentenceY=discussAI.startSentenceY;
discussAI.stages[discussAI.currStage]();

mouseClicked = function() {
    discussAI.currStage++;
    background(0);
    fill(clrs[players[players.length-1].clrName]);
    text("YOU ARE: " + players[players.length-1].clrName + ", Imposter: false", 3, 22); 
    fill(255);
    text("Stage "+discussAI.currStage, 333, 24);
    discussAI.sentenceY=discussAI.startSentenceY;
    discussAI.stages[discussAI.currStage]();
};*/




/*
var scene = "loading";
var gridSize = 20;
var boldFont = createFont("monospace Bold");
var mainFont = createFont("monospace");
imageMode(CENTER);
textAlign(CENTER, CENTER);

/*Button Object Type 
//{

var Button = function(config) {
    this.pos = config.pos;
    this.w = config.w;
    this.h = config.h;
    this.clr = config.clr || color(0);
    this.txtClr = config.txtClr || color(255);
    this.label = config.label;
    this.scene = config.scene;
    this.action = config.action;
};

Button.prototype.mouseOver = function() {
   return mouseX > this.pos.x && mouseX < this.pos.x+this.w &&
          mouseY > this.pos.y && mouseY < this.pos.y+this.h;
};

Button.prototype.handleClick = function() {
    if (this.mouseOver()) {
        this.action();
    }
};

Button.prototype.display = function() {
    fill(this.clr);
    noStroke();
    rect(this.pos.x, this.pos.y, this.w, this.h, 10);
    fill(this.txtClr);
    text(this.label, this.pos.x, this.pos.y);
    if (this.mouseOver()) {
        fill(255, 100);
        noStroke();
        rect(this.pos.x, this.pos.y, this.w, this.h, 10);
    }
};

//}

var gridBackground = function(squareSize) {
    background(250);
    stroke(207, 219, 255);
    for (var n = squareSize; n < height; n+=squareSize) {
        line(0, n, width, n);
        line(n, 0, n, height);
    }
};

/*Loading Images

var imgs = {
    "rainbowTitle": function() {
        var mskTxt = createGraphics(600, 300, P2D);
        mskTxt.background(0, 0, 0);
        mskTxt.fill(255);
        mskTxt.textFont(boldFont);
        mskTxt.textSize(90);
        mskTxt.textAlign(CENTER, CENTER);
        mskTxt.textLeading(79);
        mskTxt.text("Pixel Art\nCreator", mskTxt.width/2, mskTxt.height/2);
        mskTxt.filter(BLUR, 1);
        mskTxt = mskTxt.get();
        var rainbowTxt = createGraphics(600, 300, P2D);
        rainbowTxt.colorMode(HSB);
        rainbowTxt.strokeWeight(3);
        for (var i = 0; i < rainbowTxt.height; i++) {
            rainbowTxt.stroke(map(i, 0, rainbowTxt.height, 0, 255), 230, 250);
            rainbowTxt.line(0, i+110, rainbowTxt.width, i-100);
        }
        rainbowTxt = rainbowTxt.get();
        rainbowTxt.mask(mskTxt);
        mskTxt = null;
        return rainbowTxt;
    },
};

var loadImgs = function() {
    for (var i in imgs) {
        imgs[i] = imgs[i]();
    }
    scene = "title";
};

/*Scenes
var fade = 255;
var scenes = {
    titleScreen: function() {
        gridBackground(20);
        image(imgs.rainbowTitle, width/2, height/2);
        fill(0, fade);
        rect(0, 0, width, height);
        fade--;
        if (fade < -20) {
            fade = null;
            scene = "main";
        }
    },
    main: function() {
        gridBackground(gridSize);
    },
};

draw = function() {
    switch (scene) {
        case "loading":
            loadImgs();
            background(0);
            break;
        case "title":
            scenes.titleScreen();
            break;
        case "main":
            scenes.main();
            break;
    }
};
*/

/*var clr1 = color(0, 72, 255);
var clr2 = color(255, 153, 0);
var r1 = 200;
var r2 = 40;
var clrSpeed = 2;

var radius1 = r1;
var radius2 = r2;
noFill();
strokeWeight(0.5);
background(0);
random();
function draw() {
    noStroke();
    fill(0, 6);
    rect(0, 0, width, height);
    pushMatrix();
    translate(width/2, height/2);
    rotate(frameCount);
    stroke(lerpColor(clr1, clr2, map(sin(frameCount*clrSpeed), -1, 1, 0, 1)));
    for (var theta = 0; theta < 360; theta+=60) {
        pushMatrix();
        rotate(theta);
        translate(radius1, 0);
        beginShape();
        for (var a = 0; a <= 360; a+=20) {
            vertex(radius2*cos(a*frameCount/10), radius2*sin(a*frameCount/10));
        }
        endShape();
        pushMatrix();
        rotate(theta/2);
        line(-50, 0, 50, 0);
        rotate(theta/4);
        line(-50, 0, 50, 0);
        popMatrix();
        popMatrix();
    }
    popMatrix();
    radius1 = sin(frameCount) * r1;
    radius2 = cos(frameCount) * r2;
}
*/

//As you can see, a very much work in progress
//I might start over, so I guess this is going to be my "old code dump place"

/**********Setup things**********/

//Setup {

var scene = scene || "home";
var modeSelected = null; //freeplay or normal?
(function preferences() {
    textAlign(CENTER, CENTER);
    textFont(createFont("monospace Bold"));
    rectMode(CENTER);
})();

//}

//Rainbow title {

var rainbowTitle = function() {
    if (!rainbowTitle.img) {
        var txt = createGraphics(502, 212, P2D);
        txt.background(0, 0, 0);
        txt.fill(255);
        txt.textFont(createFont("monospace Bold"));
        txt.textSize(107);
        txt.text("COLOR BY", 12, 96);
        txt.textSize(143);
        txt.text("NUMBER", 12, 191);
        txt = txt.get();
        rainbowTitle.img = createGraphics(502, 212, P2D);
        rainbowTitle.img.colorMode(HSB);
        rainbowTitle.img.strokeWeight(3);
        for (var i = 0; i < 180; i+=3) {
            var h = map(i, 0, 180, 0, 255);
            rainbowTitle.img.stroke(h, 255, 230);
            rainbowTitle.img.line(0, i+23, 502, i+23);
        }
        rainbowTitle.img = rainbowTitle.img.get();
        rainbowTitle.img.mask(txt);
        txt = null;
    } else {
        fill(255);
        strokeWeight(2);
        stroke(50);
        rect(300, 155, 502, 212);
        image(rainbowTitle.img, 49, 48);
    }
};

//}

//Grid Background {

var gridBackground = function() {
    if (!gridBackground.img) {
        //grid
        gridBackground.img = createGraphics(width, height, P2D);
        gridBackground.img.background(249);
        gridBackground.img.stroke(180);
        gridBackground.img.strokeWeight(1.1);
        for (var y = -1; y+1 < height; y+=24) {
            gridBackground.img.line (0, y, width, y);
        }
        for (var x = -1; x+1 < width; x+=24) {
            gridBackground.img.line(x, 0, x, height);
        }
    } else {
        image(gridBackground.img, 0, 0);
    }
};

//}

//infoCard {

var infoCard = function(x, y, w, h, txt) {
    fill(255);
    stroke(0);
    rect(x, y, w, h);
    fill(0);
    textSize(23);
    text(txt, x, y);
};

//}

//Button Object Type {

var Button = function(x, y, sceneTo, name, doThis) {
    this.pos = new PVector(x, y);
    this.startWidth = 260; 
    this.maxWidth = 310;
    this.width = this.startWidth;
    this.height = 48;
    this.sceneTo = sceneTo;
    this.name = name;
    this.btnGrowthSpeed = 5;
    this.doThis = doThis || null;
};

Button.prototype.display = function() {
    //button
    fill(255);
    strokeWeight(2);
    stroke(50);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    //text
    textSize(29);
    fill(30);
    text(this.name, this.pos.x, this.pos.y);
};

Button.prototype.isMouseOver = function(x, y) {
    return x > this.pos.x - this.width/2 &&
           y > this.pos.y - this.height/2 &&
           x < this.pos.x + this.width/2 &&
           y < this.pos.y + this.height/2;
};

Button.prototype.handleHover = function() {
    if (this.isMouseOver(mouseX, mouseY) && 
        this.width < this.maxWidth) {
        this.width+=this.btnGrowthSpeed;
    } else if (!this.isMouseOver(mouseX, mouseY) && 
               this.width > this.startWidth) {
        this.width-=this.btnGrowthSpeed;
    } 
};

Button.prototype.handleClick = function() {
    if (this.isMouseOver(mouseX, mouseY)) {
        scene = this.sceneTo;
    }
    if (this.doThis) {
        this.doThis();
    }
};

Button.prototype.run = function() {
    this.display();
    this.handleHover();
};

//}

/**********Pixel Image Object Type*********/
//Adapted from my music contest entry
 
//The pixel image object type; pass in an object (config) {

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
    
    /**get() the pixel art so that it becomes an image**/
    //width of image is size*num columns, height is size*num rows
    this.img = get(this.x, this.y, 
                   this.pixelSize*this.pixelArray [0].length,                       this.pixelSize*this.pixelArray.length);
    
    rectMode(CENTER); //change back to desired way of positioning
    
};

//}

/**********Normal Mode**********/

/************Free Play***********/

/**********Scenes*********/ 

//home {

var playBtn = new Button(300, 336, "modeSelect", "Play");
var howBtn = new Button(300, 408, "how", "How");
var creditsBtn = new Button(300, 479, "credits", "Credits");
var home = function() {
    
    gridBackground();
    
    playBtn.run();
    howBtn.run();
    creditsBtn.run();
    
    rainbowTitle();
    
};

//}

//how {

var backToMain = new Button(300, 506, "home", "Back to Main");
var howScene = function() {
    
    gridBackground();
    backToMain.run();

    fill(30);
    textSize(52);
    text("How", 300, 77);
    
    infoCard(width/2, 275, 406, 308, "Normal Mode:\nColor each numbered square\naccording to the key.\nClick to select colors.\n\nFreeplay Mode:\nSelect your color via the\ncolor picker, then click on\na grid space to color it.\nPress S to save your art.");
    
};

//}

//Credits {

var creditsScene = function() {
    
    gridBackground();
    backToMain.run();
    
    fill(30);
    textSize(52);
    text("Credits", 300, 77);
    //Pixel image object type Adapted from my Music Life project, basic method from Pixel Pot
    //memoizing image method from Contest:Music page
};

//}

//mode select {

var normalModeBtn = new Button(300, 240, "normalMode", "Normal Mode", function() {
    modeSelected = "normalMode";
});
var freeplayBtn = new Button(300, 360, "freeplay", "Freeplay Mode", function() {
    modeSelected = "freeplayMode";
});

var modeSelectScene = function() {
    
    gridBackground();
    backToMain.run();
    normalModeBtn.run();
    freeplayBtn.run();
    
    fill(30);
    textSize(52);
    text("Mode Select", 300, 77);
    
    textSize(23);
    text("Play Color By Number!", 300, normalModeBtn.pos.y-58);
    text("Create pixel art!", 300, freeplayBtn.pos.y-58);
    
};

//}

//Freeplay {

//}

/**********draw and mouseClicked Functions**********/

draw = function() {
    switch (scene) {
        case "home":
            home();
        break;
        case "how": 
            howScene();
        break;
        case "credits":
            creditsScene();
        break;
        case "modeSelect":
            modeSelectScene();
        break;
        case "normalMode":
            gridBackground();
        break;
        case "win":
            
        break;
        case "freeplay":
            gridBackground();
        break;
    }
};

mouseClicked = function() {
    if (scene === "home") {
        playBtn.handleClick();
        howBtn.handleClick();
        creditsBtn.handleClick();
    } else if (scene === "how" || scene === "credits") {
        backToMain.handleClick();
    } else if (scene === "modeSelect") {
        normalModeBtn.handleClick();
        backToMain.handleClick();
    }
};