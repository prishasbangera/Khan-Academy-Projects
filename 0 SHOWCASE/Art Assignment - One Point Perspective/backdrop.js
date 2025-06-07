function backdrop() {
  randomSeed(1);
  const maxY = height / 2;
  // linear grad
  for (let y = 0; y <= maxY; y++) {
    stroke(lerpColor(
      color(9, 0, 46),
      color(142, 76, 255),
      map(y, 0, maxY, 0, 1)
    ));
    line(0, y, width, y);
  }
  // ellipse texture
  randomSeed(257);
  noStroke();
  colorMode(HSB, 255);
  for (let i = 0; i < 276; i++) {
      fill(random(255), 214, 255, 10);
      ellipse(random(width), random(maxY), 
              random(272), random(228));
  }
  // stars
  colorMode(HSB, 255);
  for (let i = 0; i < 900; i++) {
    // larger
    const s = random(7);
    const x = random(width);
    const y = randomGaussian(0, maxY / 4);
    stroke(random(100, 200), 105, 255, random(30));
    for (var j = 0; j < s; j++) {
      strokeWeight(j);
      point(x, y);
    }
    //smaller
    strokeWeight(random(3));
    stroke(255, random(100));
    point(random(width), random(maxY));
  }
  // spirals   
  randomSeed(24);
  const pts = [
    [72, 19],
    [425, 76],
    [182, 10],
    [320, 42],
    [449, 10],
    [244, 71],
    [546, 10],
    [166, 80]
  ];
  const incs = [1.5, 1.6, 1.7];
  for (i = 0; i < pts.length; i++) {
    push();
    translate(pts[i][0], pts[i][1]);
    scale(map(pts[i][1], 0, maxY, 1, 0.4));
    rotate(random(360));
    let n1 = random(3, 10),
      n2 = random(10, 20),
      inc = incs[~~random(incs.length)];
    for (let r = 0; r < 360; r += inc) {
      stroke(random(255), 95, 255, random(90, 100));
      strokeWeight(random(3));
      let x = cos(r) * (r / n1);
      let y = sin(r) * (r / n2);
      point(x, y);
    }
    pop();
  }
}

function blobs() {
  randomSeed(50);
  noStroke();
  for (let x = -10; x < width+10; x+=5) {
    const s = random(
      map(abs(x-width/2), 0, width/2, 0, 7),
      map(abs(x-width/2), 0, width/2, 0, 25));
    const n = map(abs(x-width/2), 0, width/2, 0, 169)-s;
    const y = random(-n, n) + height/2;
    push();
    translate(x, y);
    colorMode(HSB, 255);
    for (let j = s, sub=0; j > 0; j-=sub, sub+=0.1) {
      fill(map(j, 0, s, 60, 20), 
        map(j, 0, s, 39, 244), 255, 18);
      ellipse(0, 0, j, j);
    }
    colorMode(RGB);
    fill(255, 240, 31, 5);
    for (j=s, sub=0; j<=s*2.6; j+=sub, sub+=0.1) ellipse(0, 0, j, j);
    pop();
  }
}