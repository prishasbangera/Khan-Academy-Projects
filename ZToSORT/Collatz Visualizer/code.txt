background(0);
colorMode(HSB);
frameRate(0);
enableContextMenu();

var num = 1;

var angle = 20;
var len = 9;

draw = function() {
  for (var s = 0; s < 50; s++) {
    var sequence= [];
    var n = num;
    sequence.push(n);
    while (n !== 1) {
      if (n % 2 === 0) {
        n = n/2;
      } else {
        n = (3 * n + 1) / 2;
      }
      sequence.push(n);
    }
    // sequence.reverse();
    pushMatrix();
    translate(width/2, height/2 + 0);
    var l = len;
    var a = angle;
    for (var i = 0; i < sequence.length; i++) {
      l = map(i, 0, sequence.length, 0, len);
      // l = map(i, 0, sequence.length, len, 0);
      // a = map(i, 0, sequence.length, 0, angle);
      // a = map(i, 0, sequence.length, angle, 0);
      var hu = map(i, 0, sequence.length, 0, 255);
      stroke(hu, 255, 255, 5);
      line(0, 0, 0, -l);
      translate(0, -l);
      rotate(sequence[i] % 2 === 0 ? -a : a);
    }
    popMatrix();
    num++;
  }
};