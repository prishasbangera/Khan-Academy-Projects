// click + drag
var IMG_NUM = 0; // see favs array below
var fun = !!(1); // toggle 1 or 0 (1: (x,y) += (-dy, dx),  0: (x,y) += (dx,dy) )
// the particles will tend to revolve around bright spots when 'fun' is true because they travel in a direction perpendicular to the direction of steepest ascent/decline (gradient's direction)

var STEPS = 100; // per particle
var VEL_MULTIPLIER = 1; // velocity gets multipled by this (try both negative and pos numbers)
var INIT_NUM_PARTICLES = 50; // number of particles initially
var PARTICLE_OPACITY = 20;
var X1 = 0.1, X2 = 0.01; // x1=contribution of grad visual, x2=contribution of actual image clr

var STROKEWEIGHT = 1;
// vel is multipled by a random num (-1,1) and scaled by this num, 0 for no random
// when fun is true, its better for this val to be 0 or 1
var RAND_MULTIPLIER = 1; 

var favs = [
  "seasonal/xmas-ornament-on-tree",
  "seasonal/xmas-ornament-boat", // ooh
  "seasonal/snow-crystal2",
  "seasonal/gingerbread-houses",
  "seasonal/fireworks-in-sky",
  "seasonal/fireworks-scattered", // YES
  "pixar/rat_3",
  "pixar/rat_2",
  "pixar/rat_1",
  "pixar/food1",
  "pixar/cars1",
  "pixar/bing2", // BING BONG! <3
  "pixar/Incredibles_target",
  "misc/tim-berners-lee-webpage", // omg
  "landscapes/mountains-in-hawaii",
  "landscapes/lava",
  "food/sushi",
  "food/shish-kebab",
  "food/fruits",
  "food/chocolates",
  "animals/shark",
  "animals/rabbit",
  "animals/fox",
  "animals/dog_sleeping-puppy",
  "animals/butterfly",
  "animals/birds_rainbow-lorakeets", 
  "landscapes/beach-in-hawaii"
];



// {

var img;
var y = 1;
var pixels = [];
var ipixels = [];

var field = []; // very dum but okay
var PSystem;

var test = 1;

var partialxkernel = [
  [-1, 0, 1],
  [-test, 0, test],
  [-1, 0, 1]
];
var partialykernel = [
  [-1, -test, -1],
  [0, 0, 0],
  [1, test, 1]
];

function getPixel(x, y) {
  return (x + y*width) * 4;
}

// i really dont know the technical terms for these things
function applyKernel(p, x, y, k, i) {
  return (
    
  k[0][0]*p[i+getPixel(x-1,y-1)] + k[0][1]*p[i+getPixel(x+0,y-1)] + k[0][2]*p[i+getPixel(x+1,y-1)] +  
  k[1][0]*p[i+getPixel(x-1,y+0)] + k[1][1]*p[i+getPixel(x+0,y+0)] + k[1][2]*p[i+getPixel(x+1,y+0)] +  
  k[2][0]*p[i+getPixel(x-1,y+1)] + k[2][1]*p[i+getPixel(x+0,y+1)] + k[2][2]*p[i+getPixel(x+1,y+1)]
  
  );
}

// }

// {

function Particle(x, y, clr) {
    this.pos = {x: x, y: y};
    this.oldPos = {x: x, y: y};
    this.vel = {x: 0, y: 0};
    this.clr = clr;
    this.steps = STEPS;
}

Particle.prototype.update = function() {
    // update
    var px = field[~~this.pos.y][~~this.pos.x][0] || -1;
    var py = field[~~this.pos.y][~~this.pos.x][1] || -1; // switching x and y is cool too
    var m = sqrt(px * px + py * py);
    // m = Math.max(0.0001, m);
    this.vel.x = VEL_MULTIPLIER*px/m + random(-1,1)*RAND_MULTIPLIER;//+ ~~random(-1,1)*50*(cos(m)/m); // when mag is small, mult by random num
    this.vel.y = VEL_MULTIPLIER*py/m + random(-1, 1)*RAND_MULTIPLIER;// + ~~random(-1,1)*50*(cos(m)/m);
    if (fun) {
      this.pos.x += -this.vel.y;
      this.pos.y += this.vel.x;
    } else {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
    this.steps--;
};

Particle.prototype.run = function() {
  
    // draw
    stroke(this.clr, PARTICLE_OPACITY);
    strokeWeight(STROKEWEIGHT);
    line(this.oldPos.x, this.oldPos.y, 
         this.pos.x, this.pos.y);
    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;
    
    this.update();
    
};

function ParticleSystem(n, pickPos, pickClr) {
    this.particles = [];
    this.pickClr = pickClr;
    for (var i = 0; i < n; i++) {
        var startPos = pickPos();
        this.particles.push(new Particle(
            startPos[0], startPos[1],
            pickClr(startPos[0], startPos[1])
        ));
    }
}

ParticleSystem.prototype.run = function() {
  for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      if (p.steps < 0 || p.pos.x <= 2 || p.pos.y <= 2 || p.pos.x >= width-2 || p.pos.y >= height-2) {
        this.particles.splice(i, 1);
        break;
      }
      p.run();
  }  
};

// }


function setup() {
  
  frameRate(0);
  
  cursor("pointer");
  
  img = (function() {
    var i = createGraphics(width, height, P2D);
    // can technically draw anything here
    var im = getImage(favs[IMG_NUM]);
    i.image(im, 0, 0, width, height);
    return i;
  })();
  
  PSystem = new ParticleSystem(INIT_NUM_PARTICLES, function() { return [random(width), random(height)]; }, function(x, y) {
    return img.get(x, y);
  });
  
}

setup();

draw = function() {
  
  if (++y <= height - 1) {
    if (!this.loadPixels) { return; }
    if (!img.loadPixels) { return; }
    
    this.loadPixels();
    img.loadPixels();
    
    if (!this.imageData || !this.imageData.data){return;}
    pixels = this.imageData.data;
    if (!img.imageData || !img.imageData.data){return;}
    ipixels = img.imageData.data;
    
    var row = [];
    for (var x = 1; x < width - 1; x++) {
      
      var i = getPixel(x, y);
      
      // central difference x and y (last parameter tells whether its rgb, take average of all three lol)
      var partialx = (applyKernel(ipixels, x, y, partialxkernel, 0) + applyKernel(ipixels, x, y, partialxkernel, 1) + applyKernel(ipixels, x, y, partialxkernel, 2))/3;
      var partialy = (applyKernel(ipixels, x, y, partialykernel, 0) + applyKernel(ipixels, x, y, partialykernel, 1) + applyKernel(ipixels, x, y, partialykernel, 2))/3;
      
      // var dir = Math.atan2(partialy, partialx);
      var mag = Math.sqrt(partialx * partialx + partialy * partialy);
      
      pixels[i + 0] = partialx * X1 + ipixels[i + 0] * X2;
      pixels[i + 1] = partialy * X1 + ipixels[i + 1] * X2;
      pixels[i + 2] =      mag * X1 + ipixels[i + 2] * X2;
      
      row.push([partialx, partialy]); // the dumbest thing ever
      
    }
    
    field.push(row);
    
    this.updatePixels();
    img.updatePixels();
  }
  else {
    pixels = [];
    ipixels = [];
    for (var i = 0; i < 8; i++) {
      PSystem.run();
    }
  }
  
};

mouseDragged = function() {

  var s = 2;
  for (var x = -s; x < s; x++) {
    for (var y = -s; y < s; y++) {
      PSystem.particles.push(
          new Particle(
              mouseX+x, mouseY+y, 
              PSystem.pickClr(mouseX+x, mouseY+y)
          )
      );
    }
  }
};