/***************************************************************************************
 * CLICK TO EAT YUMMY CUPCAKE (AND EVERYTHING ELSE TOO BECAUSE YOU ARE SO HUNGRY)! :) *
 * Restart to eat it again!
 * This is my first true project, so any tips would be amazing.
***************************************************************************************/

var eatYummyCupcake = function() {
//a trendy background
background(0, 255, 204); //wall
image(getImage("cute/WoodBlock"), -15, 210, 434, 234); //table

//plate
strokeWeight(4);
stroke(117, 117, 117);
fill(240, 240, 240);
ellipse(200, 350, 300, 50);

ellipse(200, 350, 250, 30);

//cake bottom
stroke(87, 62, 32);
fill(214, 161, 70);

beginShape();
vertex(233, 352);
vertex(201, 355);
vertex(157, 348);
vertex(128, 340);
vertex(110, 279);
vertex(112, 252);
vertex(128, 230);
vertex(154, 215);
vertex(183, 208);
vertex(207, 209);
vertex(231, 211);
vertex(249, 217);
vertex(265, 227);
vertex(280, 254);
vertex(287, 281);
vertex(271, 340);
endShape(CLOSE);

//frosting
fill(87, 37, 11);
stroke(20, 19, 17);
beginShape();
var heightChange = 44;
var xChange = 10;
vertex(190 + xChange, 193 + heightChange);
vertex(159 + xChange, 223 + heightChange);
vertex(131 + xChange, 206 + heightChange);
vertex(98 + xChange, 227 + heightChange);
vertex(99 + xChange, 197 + heightChange);
vertex(110 + xChange, 175 + heightChange);
vertex(126 + xChange, 161 + heightChange);
vertex(152 + xChange, 152 + heightChange);
vertex(173 + xChange, 149 + heightChange);
vertex(205 + xChange, 149 + heightChange);
vertex(236 + xChange, 156 + heightChange);
vertex(260 + xChange, 172 + heightChange);
vertex(275 + xChange, 193 + heightChange);
vertex(277 + xChange, 231 + heightChange);
vertex(243 + xChange, 205 + heightChange);
vertex(220 + xChange, 234 + heightChange);
endShape(CLOSE);

//cherry!
stroke(71, 11, 11);
fill(207, 0, 0);
ellipse(200, 191, 50, 50);

// white sprinkles!
stroke(255, 255, 255);
line(256, 218, 238, 210);
line(151, 215, 167, 206);
line(178, 235, 165, 223);
line(219, 234, 229, 222);
line(191, 224, 204, 229);
line(118, 245, 134, 237);
line(136, 220, 149, 230);
line(274, 235, 266, 244);
line(256, 237, 240, 227);

//message
var f = createFont("times new roman");
fill(120, 11, 11);
textFont(f, 56);
text("Click to eat!", 57, 100);

//EAT!
var bite = 60;
mouseClicked = function() {
    //bite into the delicious cupcake
        noStroke();
        fill(0, 255, 204);
        ellipse(mouseX, mouseY, bite, bite);
    
    //sound of eating
        var sound = getSound("rpg/hit-splat");
        var percent = 0.2;
        sound.audio.volume = percent;
        playSound(sound);
};

};
eatYummyCupcake();