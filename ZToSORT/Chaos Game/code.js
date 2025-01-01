// click to see more

colorMode(HSB);

var vec = function(x, y){
    this.x = x;
    this.y = y;
};
vec.prototype.add = function(vector){
    this.x += vector.x;
    this.y += vector.y;
};
vec.prototype.scale = function(scalar){
    this.x *= scalar;
    this.y *= scalar;
};

var rule1 = function(lastVertex, currentVertex, vertices){
    return ~~(vertices.length*Math.random());
};
var rule2 = function(lastVertex, currentVertex, vertices){
    var num = ~~(vertices.length*Math.random());
    while(num === currentVertex){
        num = ~~(vertices.length*Math.random());
    }
    return num;
};
var rule3 = function(lastVertex, currentVertex, vertices){
    var num = 0;
    if(lastVertex === currentVertex){
        if(currentVertex > ~~(vertices.length/2)){
            num = currentVertex - ~~(vertices.length/2) - ~~random(2);
        }
        else if(currentVertex < ~~(vertices.length/2)){
            num = currentVertex + ~~(vertices.length/2) + ~~random(2);
        }
    }
    else{
        num = rule1(lastVertex, currentVertex, vertices);
    }
    return num;
};
// ^ rule 3 is not completed ^
var rule4 = function(lastVertex, currentVertex, vertices){
    var num = ~~(vertices.length*Math.random());
    if(currentVertex === 0){
        while(num === vertices.length-1){
            num = ~~(vertices.length*Math.random());
        }
    }
    else{
        while(num === currentVertex-1){
            num = ~~(vertices.length*Math.random());
        }
    }
    return num;
};

var stats = [
    {
        position: new vec(300,300),
        ratio: 1/1.9,
        vertices: [
            new vec(50, 50),
            new vec(550, 50),
            new vec(550, 550),
            new vec(50, 550)
        ],
        rules: rule1,
        color: "x"
    },
    {
        position: new vec(300,300),
        ratio: 1/2,
        vertices: [
            new vec(300, 50),
            new vec(550, 550),
            new vec(50, 550)
        ],
        rules: rule1,
        color: "y"
    },
    {
        position: new vec(300,300),
        ratio: 1/2,
        vertices: [
            new vec(50, 50),
            new vec(550, 50),
            new vec(550, 550),
            new vec(50, 550)
        ],
        rules: rule2,
        color: "x"
    },
    {
        position: new vec(300,300),
        ratio: 1/1.618,
        vertices: [
            new vec(300, 50),
            new vec(538, 223),
            new vec(447, 502),
            new vec(153, 502),
            new vec(62, 223),
        ],
        rules: rule1,
        color: "y"
    },
    {
        position: new vec(300,300),
        ratio: 0.59,
        vertices: [
            new vec(300, 0),
            new vec(585, 207),
            new vec(476, 543),
            new vec(124, 543),
            new vec(15, 207),
        ],
        rules: rule2,
        color: "angle"
    },
    {
        position: new vec(300,300),
        ratio: 1/3.236,
        vertices: [
            new vec(300, -200),
            new vec(700, 550),
            new vec(-100, 550)
        ],
        rules: rule2,
        color: "y"
    },
    {
        position: new vec(300,300),
        ratio: 1/2,
        vertices: [
            new vec(50, 50),
            new vec(550, 50),
            new vec(550, 550),
            new vec(50, 550)
        ],
        rules: rule4,
        color: "angle"
    },
    {
        position: new vec(300,300),
        ratio: 1/1.618,
        vertices: [
            new vec(300, 0),
            new vec(585, 207),
            new vec(476, 543),
            new vec(124, 543),
            new vec(15, 207),
        ],
        rules: rule4,
        color: "angle"
    },
    {
        position: new vec(300,300),
        ratio: 1/3.14159,
        vertices: [
            new vec(300, 50),
            new vec(550, 550),
            new vec(50, 550)
        ],
        rules: rule4,
        color: "y"
    },
    {
    position: new vec(300,300),
        ratio: 1.5,
        vertices: [
            new vec(300, 200),
            new vec(400, 400),
            new vec(200, 400)
        ],
        rules: rule1,
        color: "angle"
    },
    {
    position: new vec(300,300),
        ratio: 1.618,
        vertices: [
            new vec(300, 230),
            new vec(370, 365),
            new vec(230, 365)
        ],
        rules: rule2,
        color: "y"
    },
    {
    position: new vec(300,300),
        ratio: 1.65,
        vertices: [
            new vec(300, 180),
            new vec(390, 360),
            new vec(210, 360)
        ],
        rules: rule4,
        color: "x"
    },
    {
        position: new vec(300,300),
        ratio: 1.38,
        vertices: [
            new vec(300, 420),
            new vec(186, 337),
            new vec(229, 203),
            new vec(371, 203),
            new vec(414, 337),
        ],
        rules: rule1,
        color: "angle"
    },
    {
        position: new vec(300,300),
        ratio: 1.38,
        vertices: [
            new vec(300, 420),
            new vec(186, 337),
            new vec(229, 203),
            new vec(371, 203),
            new vec(414, 337),
        ],
        rules: rule2,
        color: "angle"
    },
    {
        position: new vec(300,300),
        ratio: 1.44,
        vertices: [
            new vec(300, 420),
            new vec(186, 337),
            new vec(229, 203),
            new vec(371, 203),
            new vec(414, 337),
        ],
        rules: rule4,
        color: "angle"
    },
    {
        position: new vec(300,300),
        ratio: 1.5,
        vertices: [
            new vec(400, 300),
            new vec(300, 400),
            new vec(200, 300),
            new vec(300, 200),
        ],
        rules: rule2,
        color: "x"
    },
    {
        position: new vec(300,300),
        ratio: 1.5,
        vertices: [
            new vec(395, 300),
            new vec(300, 395),
            new vec(205, 300),
            new vec(300, 205),
        ],
        rules: rule4,
        color: "angle"
    },
    {
        position: new vec(300,300),
        ratio: 2/3,
        vertices: [
            new vec(50, 50),
            new vec(300, 50),
            new vec(550, 50),
            new vec(550, 300),
            new vec(550, 550),
            new vec(300, 550),
            new vec(50, 550),
            new vec(50, 300),
        ],
        rules: rule1,
        color: "angle"
    }
];

var Chaos = function(config){
    this.pos = config.position;
    this.rat = config.ratio;
    this.ver = config.vertices;
    this.rul = config.rules;
    this.col = config.color;
    this.cur = 0;
    this.las = 0;
};
Chaos.prototype.display = function(){
    noStroke();
    switch (this.col){
        case "y":
            fill(this.pos.y/(600/255),255,255);
        break;
        case "x":
            fill(this.pos.x/(600/255),255,255);
        break;
        case "angle":
            var a = 180 + atan2(this.pos.y-300,this.pos.x-300);
            fill(a*255/360,255,255);
        break;
    }
    ellipse(this.pos.x, this.pos.y, 0.25, 0.25);
};
Chaos.prototype.update = function(){
    this.las = this.cur;
    this.cur = this.rul(this.las,this.cur,this.ver);
    var cvp = this.ver[this.cur],
        xVec = cvp.x - this.pos.x,
        yVec = cvp.y - this.pos.y,
        nPos = new vec(xVec, yVec);
    nPos.scale(this.rat);
    this.pos.add(nPos);
};

var last = 0;
var current = 0;
var Particle = new Chaos(stats[current]);

background(0);
frameRate(250);
draw = function() {
    for(var i = 0; i < 100; i++){
        Particle.update();
        Particle.display();
    }
};

mouseClicked = function(){
    background(0);
    last = current;
    current = current === stats.length-1 ? 0 : current+1;
    Particle = new Chaos(stats[current]);
};
