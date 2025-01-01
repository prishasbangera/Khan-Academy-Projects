// drag mouse

var mode = 0;

var patterns = [
    
    function(x, y) {
        return [
            Math.cos(10.0 + 10.0*(x/width + y/height)),
            Math.sin(10.0 + 10.0*(x/width * (y/height)))
        ];
    },
  
    function(x, y) {
        return [
            cos(y)*4.0,
            sin(x)*-2.7
        ];
    },
    
    function(x, y) {
        return [
            2*Math.sin(x) * Math.sin(y),
            2*Math.sin(x*x)
        ];
    },
    
    function (x, y) {
        return [
            2*Math.cos(x)*Math.sin(y),
            3*Math.atan(y) - 10*Math.sin(y/height)
        ];
    },
    
    function (x, y) {
        return [
            sin(x*1.22),
            0.5*Math.atan(x,y)
        ];
    },
    
    function (x, y) {
        return [
            10*Math.sin(x*cos(y)),
            20*sin(x*cos(x))
        ];
    },
    
];

function dydx(x, y) {
    return patterns[mode](x, y);
}

function Particle(x, y, clr) {
    this.pos = {x: x, y: y};
    this.oldPos = {x: x, y: y};
    this.vel = {x: 0, y: 0};
    this.clr = clr;
}

Particle.prototype.update = function() {
    var d = dydx(this.pos.x, this.pos.y);
    this.vel.x = d[0];
    this.vel.y = d[1];
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
};

Particle.prototype.run = function() {
    stroke(this.clr);
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
        p.run();
        if (p.pos.x < -20 || p.pos.y < -20 || p.pos.x > width + 20 || p.pos.y > height + 20) {
            this.particles.splice(i, 1);
        }
    }  
};

function setup() {
    background(33, 30, 25);
}

var P1 = new ParticleSystem(500, 
    function() {
        return [Math.random() * width, 
                Math.random() * height];
    },
    function(x, y) {
        return color(
            69 + Math.random()*50, 
            105-50*sin(y), 
            67 + 40*sin(y), 
            200
        );
    }
);

var P2 = new ParticleSystem(100,
    function() {
        return [Math.random() * width, 
                Math.random() * height];
    },
    function(x, y) {
        return color(255-Math.random()*y, 
                     255-Math.random()*20, 
                     255, 30);
    }
);

setup();

draw = function() {
    for (var i = 0; i < 5; i++) {
        P1.run();        
        P1.run();
        P2.run();
    }
};

mouseDragged = function() {
    var s = 1;
    for (var x = -s; x < s; x++) {
        for (var y = -s; y < s; y++) {
            var xpos = mouseX + x;
            var ypos = mouseY + y;
            P2.particles.push(
                new Particle(
                    xpos, ypos, 
                    P2.pickClr(xpos, ypos)
                )
            );
        }
    }
};
