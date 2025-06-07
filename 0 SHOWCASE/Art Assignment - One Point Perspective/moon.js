function moon() {
  
  let r = 100;
  
  colorMode(RGB);
  noiseSeed(10);
  push();
  translate(width*0.5, height*0.5);
  
  //back rad grad
  noStroke();
  fill(255, 3)
  for (let i = r*2, add=0; i < r*2+120; i+=add, add+=0.1) {
    ellipse(0, 0, i);
  }
  
  let xoff = 0;
  const midClr = color(120, 185, 255);
  for (let x = -r; x < r; x++) {
    let yoff = 0;
    for (let y = -r; y < 0; y++) {
       // const i = (x+width*0.5 + (y+height*0.5)*width)*4;
       if (dist(x+width*0.5, y+height/2, vanishPt.x, vanishPt.y) < r) {
         const amt = noise(xoff, yoff);
         if (amt < 0.3) {
           stroke(lerpColor(
             color(87, 32, 250),
             midClr, 
           map(amt, 0, 0.3, 0, 1)), 240);
         } else {
           stroke(lerpColor(
             midClr, 
             color(162, 41, 227),
           map(amt, 0.3, 1, 0, 1)), 240);
         }
         point(x, y);
         yoff += 0.05;
       }
    }
    xoff+=0.02;
  } 
  
  
  //front rad grad
  noFill();
  stroke(255, 4);
  for (let i = 0, add=0; i <= r; i+=add, add+=0.1) {
    strokeWeight(i);
    ellipse(0, 0, r*2-i*0.5);
  }
  
  pop();
}