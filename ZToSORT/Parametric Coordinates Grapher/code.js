translate(0, height/2);
scale(1, -1);
stroke(100);
line(0, 0, width, 0);
line(width/2, -height/2, width/2, height/2);

strokeWeight(3);
stroke(0);
noFill();
beginShape();

for (var t = -10; t < 10; t+=0.1) {
  vertex(
    -20 * (t - floor(t)*0.5 + -10.3),
    -3 * (t * t + -47)
  );
}

endShape();