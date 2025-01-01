function planetFloor() {
  colorMode(RGB);
  strokeWeight(1);
  loadPixels();
  let xoff = 0, yoff = 0;
  for (let x = 0; x <= width; x++) {
    for (let y = height/2; y <= height; y++) {
      const amt = sin(
        (yoff-1%noise(xoff*5, yoff*2)/2)*
        map(y, height/2, height, 30, 15)
      );
      let clr = lerpColor(
        color(237, 96, 252),
        color(156, 31, 93),
        amt
      );
      clr = lerpColor(
        clr, color(53, 0, 99), 
        map(y, height/2, height, 1, 0)
      );
      const i = (x+y*width)*4;
      pixels[i + 0] = red(clr);
      pixels[i + 1] = green(clr);
      pixels[i + 2] = blue(clr);
      yoff += 0.1;
    }
    xoff += 0.01;
    yoff = 0;
  }
  updatePixels();

}

function planetFloorShinies() {
  // random tiny shinies near the top ground
  colorMode(RGB);
  randomSeed(16);
  noStroke();
  for (i = 0; i < 700; i++) {
      let s = random(1, 8),
          x = random(width),
          y = randomGaussian(height/2, height*0.2);
      fill(255, 184, 201, 25);
      // main grad
      if (y > height/2) {
        for (let d = random(5); d > 0; d--) {
            ellipse(x, y, d+s, d);
        }
        // white dot
        if (y < height/2+40 && s > 2) {
            fill(217, 255, 255, 185);
            ellipse(x, y, s*0.75, s*0.4);
        }
      }
  }
  // grad
  noStroke();
  fill(255, 237, 196, 4);
  for (let i = 0, add = 0; i < 230; i+=add, add += 0.03) {
    rect(vanishPt.x, vanishPt.y, width, i);
  }
}