/*

The Window
Prisha B. Visual Art Class 2020

My artwork should, in my view, classified as a form of conceptual art. In creating this, I thought about how light is often a metaphor for the answers to the impossible questions we've been asking since the dawn of humanity. What is life? What is our purpose? What is consciousness? Do we really exist? Or, perhaps, we can even view light the answer to any question in general. Answers are what humanity strives for; they are beautiful things. They should give us a sense of accomplishment. However, what really happens many times is that we are blinded by the answer. Our understanding becomes lesser, blurred, and more questions arise. We learn that everything we know is next to nothing, compared to what we don't know. Hence, the light from the window is bright, but it obscures the rest of the room, just like how an answer illuminates but does not make things any clearer. 

The HUMAN CONDITION is the the main path that includes birth, death, and the life in between: a mix of emotion, desire, action, conflict, and learning. All people go through this path, regardless of the place or time in which they lived. A good artist can capture an idea branching from the human condition and weave it into his or her art so that every person across time can relate to it.

*/

//room {

randomSeed(1);
rectMode(CENTER);
noStroke();

var backWall = {
    clr: color(64, 19, 8),
    x: width*0.25,
    y: height*0.51,
    w: width*0.8,
    h: height*0.6
};

//back wall
background(backWall.clr);
//right wall
fill(lerpColor(backWall.clr, color(0), 0.28));
quad(backWall.x+backWall.w/2, backWall.y+backWall.h/2,
     backWall.x+backWall.w/2, backWall.y-backWall.h/2, width, 0, width, height);
     
//floor
fill(lerpColor(backWall.clr, color(0), 0.44));
quad(backWall.x+backWall.w/2, backWall.y+backWall.h/2,
     backWall.x-backWall.w/2, backWall.y+backWall.h/2, 0, height, width, height);

//ceiling
fill(lerpColor(backWall.clr, color(255), 0.06));
quad(backWall.x+backWall.w/2, backWall.y-backWall.h/2,
     backWall.x-backWall.w/2, backWall.y-backWall.h/2, 0, 0, width, 0);

//}
//window {

var winDow = {
    x: 311,
    y: 87,
    w: 61,
    h: 217,
    offset: 32,
    weight: 7,
    thicknessOffset: 4,
    frameClr: color(43, 16, 0),
    clr: color(150, 113, 0)
};

//frame
noFill();
strokeWeight(winDow.weight+3);
stroke(lerpColor(winDow.frameClr, color(0), 0.39));
quad(winDow.x+winDow.thicknessOffset, winDow.y,
     winDow.x+winDow.thicknessOffset+winDow.w, winDow.y-winDow.offset, 
     winDow.x+winDow.thicknessOffset+winDow.w, winDow.y+winDow.h+winDow.offset-5, 
     winDow.x+winDow.thicknessOffset, winDow.y+winDow.h); 
stroke(winDow.frameClr);
strokeWeight(winDow.weight);
quad(winDow.x, winDow.y,
     winDow.x+winDow.w, winDow.y-winDow.offset, 
     winDow.x+winDow.w, winDow.y+winDow.h+winDow.offset-5, 
     winDow.x, winDow.y+winDow.h); 
     
//window
var msk = createGraphics(width, height, P2D);
msk.background(0);
msk.fill(255);
msk.quad(winDow.x+2, winDow.y+1,
     winDow.x+winDow.w+-2, winDow.y-winDow.offset+4, 
     winDow.x+winDow.w-2, winDow.y+winDow.h+winDow.offset-8, 
     winDow.x+2, winDow.y+winDow.h+-1); 
msk = msk.get();
var wScreen = createGraphics(width, height, P2D);
var angle = 46;
wScreen.background(0);
wScreen.angleMode = "degrees";
wScreen.strokeWeight(2);
wScreen.pushMatrix();
wScreen.translate(12, height/2);
for (var r = 0; r < angle; r+=0.1) {
    wScreen.pushMatrix();
    wScreen.rotate(r-angle/2);
    wScreen.stroke(lerpColor(lerpColor(winDow.clr, color(255), 0.7), winDow.clr, r/angle));
    wScreen.line(0, 0, 659, 0);
    wScreen.popMatrix();
} 
wScreen.popMatrix();
wScreen = wScreen.get();
wScreen.mask(msk);
image(wScreen, 0, 0);

//save pic for mask
var plainRoom = get();

//}
//light from window {

var msk2 = createGraphics(width, height, P2D);
var lightOffset = 38;
msk2.background(0);
msk2.fill(255, 50);

msk2.quad(winDow.x+3, winDow.y, winDow.x+3, winDow.y+winDow.h, 
          0, winDow.y+winDow.h+lightOffset, 0, winDow.y-lightOffset);
msk2.quad(0, winDow.y-lightOffset*2.3,
     winDow.x+winDow.w+-2, winDow.y-winDow.offset+4, 
     winDow.x+winDow.w-2, winDow.y+winDow.h+winDow.offset-8, 
     0, winDow.y+winDow.h+lightOffset*2.7); 

msk2 = msk2.get();

var darkLight = createGraphics(width, height, P2D);
darkLight.image(plainRoom, 0, 0);
darkLight.fill(255, 60);
darkLight.rect(0, 0, width, height);
darkLight.noStroke();
darkLight.colorMode(HSB);
for (var i = 0; i < 110; i++) {
    darkLight.fill(random(0, 350), 140, 255, 49);
    darkLight.rect(random(-110, width), random(height), 70, 70);
}
darkLight.filter(BLUR, 2);
darkLight = darkLight.get();
darkLight.mask(msk2);

image(darkLight, 0, 0);

filter(BLUR, 1);

//}
//texture {

noStroke();
rectMode(CENTER);
colorMode(HSB);
for (var i = 0; i < 1500; i++) {
    fill(random(255), 255, 255, 2);
    rect(random(-100, width+100), random(-100, height+100), 100, random(83));
}

//}