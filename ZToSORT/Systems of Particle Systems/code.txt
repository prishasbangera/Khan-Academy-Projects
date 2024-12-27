//I coded this along with the Khan Academy tutorial about Systems Particle Systems 
//draw on the screen

//todo: buttons with different "paint brushes"

var Particle = function(pos) {

    this.accel = new PVector(0, -0.05);
    this.vel = new PVector(random(-1,1), random(-1,1));
    this.pos = pos.get();
    this.timeToLive = random(50, 200);

};

Particle.prototype.update = function() {
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    this.timeToLive-=1;
};

Particle.prototype.isDead = function() {
    return this.timeToLive < 0;
};

Particle.prototype.display = function() {
    noStroke();
    fill(random(0,255), 0, random(0,255), this.timeToLive);
    ellipse(this.pos.x, this.pos.y, 7, 7);
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

var ParticleSystem = function(origin) {
    this.particles = [];
    this.timeToLive = 50;
    this.origin = origin;
    this.isDead = false;
};

ParticleSystem.prototype.growOld = function() {
    if (!this.isDead) {
        this.timeToLive--;
    }
    if (this.timeToLive === 0) {
        this.isDead = true;
    }
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
    if (!this.isDead) {
        for (var i = this.particles.length-1; i >= 0; i--) {
          this.particles[i].run();
          if (this.particles[i].isDead()) {
            this.particles.splice(i, 1);
          }
        }
    }
};

var systems =  [];

draw = function() {

    background(0, 0, 0);
    for(var i = 0; i < systems.length; i++) {
        systems[i].run();
        systems[i].growOld();
        if (frameCount % 2 === 0) {
            systems[i].addParticle();
        }
        if(systems[i].isDead) {
            systems.splice(i, 1);
        }
    }

};

mouseDragged= function() {
    systems.push(new ParticleSystem(new PVector(mouseX, mouseY)));
};
