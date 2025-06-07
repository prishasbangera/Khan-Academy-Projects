//https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_125_Fourier_Series/P5/sketch.js

//https://bilimneguzellan.net/en/purrier-series-meow-and-making-images-speak/

//clicky

var type = 0;

var types = [
    [function(i) {
        return Math.sin(i)*10+1;
    }],
    [function(i) {
        return i+2;
    }],
    [function(i) {
        return i*2+3;
    },
    function(num, r) {
        return r * (Math.pow(-1, (num-1)/2)/(num*num))*(50/(PI*PI));
    }],
];

function calcNDefault(i) {
    return i*2 + 1;
}
function calcRDefault(num, r) {
    return r * (4 / (num * PI));
}

function Circle(x, y, r, n, angleVel, calcR, calcN) {
    var obj = {
        x: x,
        y: y,
        r: r,
        a: 0,
        n: n,
        calcRDefault: calcRDefault,
        calcNDefault: calcNDefault,
        calcR: calcR || calcRDefault,
        calcN: calcN || calcNDefault,
        wave: [],
        angleVel: angleVel || function() {return 0.01;},
        display: function() {
            var x = 0;
            var y = 0;
            var r = obj.r;
            noFill();
            pushMatrix();
            translate(obj.x, obj.y);
            for (var i = 0; i < obj.n; i++) {
                var prevx = x;
                var prevy = y;
                var n = obj.calcN(i);
                r = obj.calcR(n, obj.r);
                x += r * Math.cos(n * obj.a);
                y += r * Math.sin(n * obj.a);
                stroke(255, 100);
                ellipse(prevx, prevy, r*2, r*2);
                stroke(255);
                line(x, y, prevx, prevy);
            }
            line(x, obj.wave[0], obj.r*2, obj.wave[0]);
            this.wave.unshift(y);
            beginShape();
            for (var i = 0; i < this.wave.length; i++) {
                if (i + obj.r*2 > width-obj.x) {
                    obj.wave.pop();
                } else {
                    vertex(i + obj.r*2, obj.wave[i]);
                }
            }
            endShape();
            popMatrix();
            this.a += this.angleVel();
        }
    };
    return obj;
}

var circles = (function() {
    var a = [];
    function v() {return noise(frameCount/1000)/5;}
    for (var i = 0; i < 2; i++) {
        a.push(Circle(50, 190+i*240, 25, i*30+1, v));
    }
    return a;
})();

draw = function() {
    background(0);
    for (var i = 0; i < circles.length; i++) {
        circles[i].display();
    }
};

function mouseClicked() {
    type++;
    if (!types[type]) {
        type = 0;
    }
    for (var i = 0; i < circles.length; i++) {
        if (types[type][0]) {
            circles[i].calcN = types[type][0];
        } else {
            circles[i].calcN = calcNDefault; 
        }
        if (types[type][1]) {
            circles[i].calcR = types[type][1];
        } else {
            circles[i].calcR = calcRDefault; 
        }
    }
}
