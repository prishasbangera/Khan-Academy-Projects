/*******************************************************************************************
 
 * WINSTON WANTS DONUTS!!

 * Press SPACEBAR, MOUSE, or SCREEN to play
 * Collect donuts!
 * If you miss three donuts, click "Try Again" to restart.
 * Note: I coded this along with the Khan Academy lesson on side scrolling games.
 
 * FOR EXTRA CHALLENGE: Change the value of SPEED and numDonuts below. How fast can you go?
 
*******************************************************************************************/

/*******************************************
 * Change these values for extra challenge.
********************************************/
var SPEED = 3;
var numDonuts = 20;

/**********
 MAIN GAME
***********/

var game = function() {

   var gameStarted = false;
   
/*******************
  WINSTON OBJECT
 *******************/
    var Winston = function(x,y) {
            this.x = x;
            this.y = y;
            this.img = getImage("creatures/Winston");
            this.donuts = 0;
            this.missedDonuts = 0;
        };
        
        //Draws Winston
        Winston.prototype.draw = function() {
            imageMode(CENTER);
            this.y = constrain(this.y, 0, height - 90);
            image(this.img, this.x, this.y, 50, 50);
        };
        
        //Makes Winston go up by 5 pixels
        Winston.prototype.hop = function() {
            this.y -= SPEED + 3;
        };
        
        //Makes Winston go down
        Winston.prototype.fall = function() {
            if (!gameStarted) {
            this.y += 10;
            } else {
                this.y += SPEED + 3;
            }
        };
        
        //check if Winston bumped into donut
        Winston.prototype.checkIfAteDonuts = function(donut) {
            if (donut.x >= this.x && donut.x <= this.x + 50 && donut.y >= this.y && donut.y <= this.y + 50) {
                donut.y = -400;
                this.donuts++;
                var eatSound = getSound("rpg/step-heavy");
                eatSound.audio.volume = 0.25;
                playSound(eatSound); 
            }
        };
        
        //check for sad missed donuts
        Winston.prototype.checkIfMissedDonuts = function(donut) {
            if (donut.y < 400 && donut.y > 0 && donut.x < this.x - 30) {
                donut.y = -400;
                this.missedDonuts++;
                var missSound = getSound("rpg/hit-splat");
                missSound.audio.volume = 0.25;
                playSound(missSound);
            }
            
        };
        
        //winston is created! 
        var winston = new Winston(31, 6);
        
//grass
    var grassXs = [];
    for (var i = 0; i < 25; i++) {
            grassXs.push(i*20);
        }
        
//background color
        var sky = color(105, 225, 255);

//lives
    var FirstHeartY = 366;
    var SecondHeartY = 366;
    var ThirdHeartY = 366;
    
//winScreen
    var winScreen = function() {
        rectMode(CENTER);
        stroke(163, 114, 0);
        fill(230, 159, 53);
        rect(width/2, height/3.5, width - 82, 91, 28);
        stroke(245, 48, 255);
        fill(255, 150, 250);
        rect(width/2, height/3.5, width - 100, 73, 28);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textSize(35);
        text("VICTORY!", width/2, height/3.5);
        stroke(186, 140, 0);
        fill(255, 213, 0);        
        strokeWeight(3);
        rectMode(LEFT);
        rect(width/7.5, height/1.98, width - 109, height/10, 11);
        fill(255, 255, 255);
        textSize(25);
        noStroke();
        text("Winston thanks you!", width/2, height/1.8);
        };
//lose screen
var loseScreen = function() {
    background(255, 0, 115);
    //donut sign
    rectMode(CENTER);
    stroke(163, 114, 0);
    fill(230, 159, 53);
    rect(width/2, height/2.25, width - 82, 91, 28);
    stroke(245, 48, 255);
    fill(255, 150, 250);
    rect(width/2, height/2.25, width - 100, 73, 28);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textSize(35);
    text("DEFEAT!", width/2, height/2.25);
    //button
    fill(255, 213, 0);   
    stroke(186, 140, 0);
    strokeWeight(3);
    rectMode(LEFT);
    rect(width/4.2, height/1.62, width - 192, height/10, 11);
    fill(255, 255, 255);
    textSize(20);
    noStroke();
    text("Try again?", width/2, height/1.5);
};
        
/**********
  * DONUTS!
************/
        
//frosting
    var donutColors = color(random(0,255), random(0,255), random(0,255));
        
//donut object
    var Donut = function(x, y, donutRadius, donutFrosting) {
            this.x = x;
            this.y = y;
            this.donutRadius = donutRadius; //random(25, 60);
            this.donutFrosting = donutFrosting; //random color
            this.cakeColor = color(255, 188, 105);
        };
//draw donut
        Donut.prototype.draw = function() {
            stroke(this.cakeColor);
            strokeWeight(4.5);
            fill(this.donutFrosting);
            ellipse(this.x, this.y, this.donutRadius, this.donutRadius);
            if(this.donutRadius/3 > 15) {
            fill(sky);
            ellipse(this.x, this.y, this.donutRadius/3, this.donutRadius/3);
            }
        };
        
//create donuts
    var donuts = [];
    for (var i = 0; i < numDonuts; i++) {
        //different frostings
        donutColors = color(random(0,300), random(0,300), random(0,300));
        donuts.push(new Donut(i * 100 + 434, random(33, 270), random(30,65), donutColors));
        }
        
/************* 
DRAW FUNCTION 
**************/
    draw = function() {
        background(sky);
          
        //draw grass
        for (var i = 0; i < grassXs.length; i++) {
                image(getImage("cute/GrassBlock"), grassXs[i], 353, -36, 109);
                if (gameStarted) {
                    grassXs[i] -= SPEED;
                }
                if (grassXs[i] <= -20) {
                grassXs[i] = width;
                }
            }
        
        //draw clouds
        
            //right cloud
            noStroke();
            fill(255, 255, 255);
            ellipse(305, 82, 126, 96);
            ellipse(349, 87, 90, 60);
            ellipse(257, 87, 90, 60);
            //left cloud
            ellipse(115, 227, 126, 96);
            ellipse(163, 234, 90, 60);
            ellipse(61, 231, 90, 60);
            
        //winston falls/hops
        if (keyIsPressed && key.code === 32 || mouseIsPressed) {
                winston.hop();
                gameStarted = true;
            } else {
                winston.fall();
            }
            
        //draw donuts
            for (var i = 0; i < donuts.length; i++) {
            donuts[i].draw();
            winston.checkIfAteDonuts(donuts[i]);
            winston.checkIfMissedDonuts(donuts[i]);
            if (gameStarted) {
            donuts[i].x -= SPEED;
            }
        }
        
        //first message/title screen
            fill(255, 255, 255);
            var firstMessageY = height/10;
            var startMessageX = width/2; 
            textSize(20);
            if (gameStarted) {
                firstMessageY = 500;
                startMessageX -= 500;
        }
        
        //donutsign
                stroke(163, 114, 0);
                fill(230, 159, 53);
                rectMode(CENTER);
                rect(startMessageX, height/2.25, width - 82, 153, 28);
                stroke(245, 48, 255);
                fill(255, 150, 250);
                rect(startMessageX, height/2.25, width - 115, 128, 28);
                fill(255, 255, 255);
                textAlign(CENTER, CENTER);
                textSize(24);
                text("Winston Wants Donuts", startMessageX, height/2.59);
                textSize(45);
                text("START", startMessageX, height/2.01);
                //yellow title screen sign
                textSize(20);
                fill(255, 213, 0);
                stroke(186, 140, 0);
                strokeWeight(3);
                rect(width/2, firstMessageY, width - 20, height/10, 28);
                fill(255, 255, 255);
                text("Press MOUSE, SPACEBAR, or SCREEN", width/2, firstMessageY);
                noStroke();
            
        //draw Winston
            winston.draw();
            
        //scoreboard
            textFont(createFont("monospace"), 25);
            fill(255, 255, 255);
            textAlign(CENTER, CENTER);
            text("Donuts Eaten: " + winston.donuts, width/3.55, 371);
            //text("donuts missed: " + winston.missedDonuts, 98, 200);
            
        //lives
            image(getImage("cute/Heart"), 295, FirstHeartY, 37, 62);
            image(getImage("cute/Heart"), 335, SecondHeartY, 37, 62);
            image(getImage("cute/Heart"), 375, ThirdHeartY, 37, 62);
            if (winston.missedDonuts === 1) {
                    FirstHeartY -= 400;
                if (winston.donuts === numDonuts - 1) {
                    winScreen();
                }
            } else if (winston.missedDonuts === 2) {
                SecondHeartY -= 400;
                if (winston.donuts === numDonuts - 2) {
                    winScreen();
                }
            } else if (winston.missedDonuts > 2) { 
                //lose screen
                loseScreen();
                ThirdHeartY -= 400;
                gameStarted = false;
                winston.donuts = 0;
                donuts.y -= 400;
                
                //restart
                if(mouseX >= width/4.2 && 
                mouseX <= width/4.2 + (width - 192) && 
                mouseY >= height/1.62 && 
                mouseY <= height/1.62 + height/10) {
                    if (mouseIsPressed) {
                        Program.restart();
                    }
                }
                
            } else if (winston.missedDonuts === 0 && winston.donuts === numDonuts) {
                winScreen();
            }
    };
};
game();
