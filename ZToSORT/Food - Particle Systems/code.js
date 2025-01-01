function Walker(s, initX, initY) {
    return {
        x: initX,
        y: initY,
        clr: get(initX, initY),
        s: s,
        walk: function() {
            var a = random(360);
            this.x += cos(a);
            this.y += sin(a);
            stroke(this.clr);
            strokeWeight(this.s);
            point(this.x, this.y);
        }
    };
}
var imgs = [
    getImage("food/pasta"),
    getImage("food/potato-chips"),
    getImage("food/croissant"),
    getImage("food/dumplings"),
    getImage("food/fruits"),
    getImage("food/fish_grilled-snapper"),
    getImage("food/fruits"),
    getImage("food/berries"),
    getImage("food/ice-cream"),
    getImage("food/brussels-sprouts"),
    getImage("food/grapes"),
    getImage("food/tomatoes"),
    getImage("food/strawberries"),
    getImage("food/mushroom"),
    getImage("food/potatoes"),
    getImage("food/chocolates"),
    getImage("food/coffee-beans"),
    getImage("food/bananas"),
    getImage("food/cake"),
    getImage("food/sushi"),
    getImage("food/shish-kebab"),
    getImage("food/broccoli"),
];
var init = (function() {
    frameRate(60);
    image(imgs[~~random(imgs.length)], 0, 0);
})();
var walkers = (function(num, siz) {
    var a = [];
    for (var i = 0; i < num; i++) {
        a.push(Walker(siz, random(width), random(height)));
    }
    return a;
})(random(500, 9000), random(5));
function draw() {
    for (var i = 0; i < walkers.length; i++) {
        walkers[i].walk();   
    }
}
function mouseClicked() {
    Program.restart();
}