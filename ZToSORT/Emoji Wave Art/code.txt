var range = 45; //rangeY for wave
var xSpeed = 9;
var rotSpeed = 5;
var strng = "🌊"; //for background 
var waveTxt = "😁😀😋😆😂🤪🥳😇🧐🤓"; //for wave

textAlign(CENTER, CENTER);
//a stack of strng for background text
var bgTxt = (function() {
    var s = "";
    fill(0);
    for (var i = 0; i < 35; i++) {
        s += strng + "\n";
    }
    return s;
})();

//setting
(function() {
    //sky
    for (var x = 0; x < width; x++) {
        pushMatrix();
        translate(x, height/2);
        text(bgTxt, cos(x*20)*5, sin(x*5)*range);
        popMatrix();
    }
    //sun
    pushMatrix();
    translate(350, 50);
    for (var r = 0; r < 360; r+=20) {
        pushMatrix();
        rotate(r);
        text(waveTxt, 0, 0);
        popMatrix();
    }
    popMatrix();
})();

draw = function() {
    //draw wave
    pushMatrix();
    translate(-textWidth(waveTxt)*2+frameCount*xSpeed%(width+textWidth(waveTxt)*2), 
              height-textWidth(waveTxt)/2);
    rotate(-frameCount*rotSpeed);
    text(waveTxt, 0, 0);
    popMatrix();
};
