
function walls() {
  
  colorMode(RGB);
  // floor
  noStroke();
  fill(255, 118);
  triangle(vanishPt.x, vanishPt.y, 0, height, width, height);
  // walls
  fill(255, 26);
  rect(width/2, height/2, width, height);
  
  // trims
  stroke(255, 100);
  strokeWeight(0.5);

  function drawTriangle(scaleX, scaleY, amt, alpha) {
    alpha = alpha || 10;
    push();
    fill(255, alpha);
    translate(vanishPt.x, vanishPt.y);
    scale(scaleX, scaleY);
    triangle(0, 0, -width / 2, -height / 2,
      -width / 2, amt - height / 2);

    triangle(0, 0, -width / 2, -height / 2,
      amt - width / 2, -height / 2);
    pop();
  }
  let amts = [
    [600, 13, 0.3],
    [27, 50, 1]
  ];
  for (let i = 0; i < amts.length; i++) {
    for (let s = 0; s <= 1; s += amts[i][2]) {
      drawTriangle(s, s, amts[i][0], amts[i][1]);
      drawTriangle(s, -s, amts[i][0], amts[i][1]);
      drawTriangle(-s, s, amts[i][0], amts[i][1]);
      drawTriangle(-s, -s, amts[i][0], amts[i][1]);
    }
  }
  // horizontal
  strokeWeight(2);
  for (let y = 0; y <= height; y++) {
    stroke(217, 243, 250, cos(y / 10) * 5 + 15);
    line(0, y, vanishPt.x, vanishPt.y);
    line(width, y, vanishPt.x, vanishPt.y);
  }

}