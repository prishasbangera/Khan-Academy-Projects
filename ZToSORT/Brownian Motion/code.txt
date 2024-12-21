function Particle(x, y, rad) {
    
    this.radius = rad;
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    
    this.xgen = new Random(random(121231));
    this.ygen = new Random(random(342341));
    
    this.s = random(1,2);
    
}

Particle.prototype.draw = function() {
    noStroke();
    fill(255, 102550);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Particle.prototype.update = function() {

    this.position.x += this.xgen.nextGaussian() * this.s;
    this.position.y += this.ygen.nextGaussian() * this.s;

};

var party = [];

function setup() {
    
    background(0);
    
    for (var i  = 0; i < 3; i++) {
        
        var p = new Particle(200, 200, 1);
        party.push(p);
       
    }
}

setup();


draw = function() {
    
    for (var i = 0; i < party.length; i++) {
        var p = party[i];
        p.draw();
        p.update();
         
        // if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
        //     party.splice(p);
        //     println(i);
        // }
    }
};