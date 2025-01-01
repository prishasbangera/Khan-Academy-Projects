let vanishPt;
let queue = [backdrop, moon, planetFloor, planetFloorShinies, blobs, walls, drawPerson];
let counter = 0;

let person;

function preload() {
  person = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlMNn-nJIdZRLpR17Jcd5OjPLS7iVaKBYC2zKIYbKceA&s");
  // person = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHkWTpbUW18gDmAjTZOHEvznnDoeDUbS2ZMnM3C8ArgzSfWxk:https://images.vexels.com/media/users/3/204425/isolated/preview/0a657d7e2bd844968188781df4108022-walking-behind-astronaut-silhouette-by-vexels.png&usqp=CAU");
}

function setup() {

  pixelDensity(1);
  createCanvas(600, 400);
  rectMode(CENTER);
  imageMode(CENTER);

  // vanish point
  vanishPt = {
    x: width / 2,
    y: height / 2,
    display: function() {
      stroke(255, 100);
      strokeWeight(1);
      line(0, 0, this.x, this.y);
      line(0, height, this.x, this.y);
      line(width, 0, this.x, this.y);
      line(width, height, this.x, this.y);
      line(0, this.y, width, this.y);
    }
  };
  
  background(0);

}

function draw() {
  if (queue[counter]) {
    queue[counter]();
    counter ++;
  } else {
    noLoop();
  }
  //draw perspective lines
  // vanishPt.display();
}