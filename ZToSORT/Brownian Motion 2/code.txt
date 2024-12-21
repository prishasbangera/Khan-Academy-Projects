function Particle(rad, clr) {
    
    this.radius = rad;
    this.clr = clr;
    this.position = new PVector(0, 0);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    
    this.xgen = new Random(random(121231));
    this.ygen = new Random(random(342341));
    this.sgen = new Random(random(342423));
    
}

Particle.prototype.draw = function() {
    noStroke();
    (fill)(this.clr);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Particle.prototype.update = function() {
    
    this.position.x += this.xgen.nextGaussian() * (this.sgen.nextGaussian() + 1);
    this.position.y += this.ygen.nextGaussian() * (this.sgen.nextGaussian() + 1);

};

var party = [];

function setup() {
    
    var bg = color(2, 2, 26);
    
    var clrs = [
        color(31, 124, 186, 50),
        color(161, 236, 255, 100),
        color(bg, 20),
        color(bg, 10)
    ];
    
    background(bg);
    
    for (var i  = 0; i < clrs.length; i++) {
        
        var p = new Particle(1, clrs[i] );
        party.push(p);
       
    }
    
    
    enableContextMenu();

}

setup();


draw = function() {
    
    fill(0, 2);
    // rect(0, 0, width, height);
    
    for (var j = 0; j < 10; j++) {
    for (var i = 0; i < party.length; i++) {
        var p = party[i];
        p.update();
        for (var a = 0; a < 360; a+=60) {
            pushMatrix();
            translate(200, 200);
            rotate(a);
            p.draw();
            // if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            //     party.splice(p);
            //     println(i);
            // }
            popMatrix();
        }   
    }
    }
};