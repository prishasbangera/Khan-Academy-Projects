Object.constructor.prototype.new = function() {
    var obj = Object.create(this.prototype);
    this.apply(obj, arguments);
    return obj;
};

var Vec = (function() {
    
    function vec(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    
    vec.fromAngle = function(theta) {
        return this.new(
            cos(theta),
            sin(theta),
            0
        );
    };
    vec.limit = function(v, mini, maxi) {
        return this.new(
            Math.min(maxi, Math.max(mini, v.x)),
            Math.min(maxi, Math.max(mini, v.y)),
            Math.min(maxi, Math.max(mini, v.z))
        );
    };
    vec.add = function(v1, v2) {
        return this.new(
            v1.x + v2.x, 
            v1.y + v2.y,
            v1.z + v2.z
        );
    };
    vec.sub = function(v1, v2) {
        return this.new(
            v1.x - v2.x, 
            v1.y - v2.y,
            v1.z - v2.z
        );
    };
    vec.mult = function(v, r) {
        return this.new(
            v.x * r, 
            v.y * r,
            v.z * r
        );
    };
    vec.multComponents = function(v1, v2) {
        return this.new(
            v1.x * v2.x,
            v1.y * v2.y,
            v1.z * v2.z
        );
    };
    vec.dot = function(v1, v2) {
        return v1.x * v2.x + 
               v1.y * v2.y +
               v1.z * v2.z;
    };
    vec.mag = function(v) {
        if (v.magnitude === undefined) {
            var m = Math.sqrt(this.dot(v, v));
            v.magnitude = m;
            return m;
        } else {
            return v.magnitude;
        }
    };
    vec.normalize = function(v) {
        var m = this.mag(v);
        if (m > 0) {
            var inverseMag = 1/Math.sqrt(m);
            return Vec.mult(v, inverseMag);
        }
    };
    vec.cross = function(v1, v2) {
        return this.new(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        );
    };
    vec.dist = function(v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(
            dx * dx +
            dy * dy +
            dz * dz
        );
    };
    vec.angleBetween = function(v1, v2) {
        return acos(
            Vec.dot(v1, v2) / 
            (v1.mag() * v2.mag())
        );
    };
    vec.rotateX = function(v, theta) {
        var s = sin(theta);
        var c = cos(theta);
        return this.new(
            v.x,
            c*v.y - s*v.z,
            s*v.y + c*v.z
        );
    };
    vec.rotateY = function(v, theta) {
        var s = sin(theta);
        var c = cos(theta);
        return this.new(
            c*v.x + s*v.z,
            v.y,
            c*v.z - s*v.x
        );
    };
    vec.rotateZ = function(v, theta) {
        var s = sin(theta);
        var c = cos(theta);
        return this.new(
            c*v.x - s*v.y,
            s*v.x + c*v.y,
            v.z
        );
    };
    
    vec.prototype.get = function() {
        return vec.new(
            this.x, this.y, this.z
        );
    };
    vec.prototype.set = function(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    };
    vec.prototype.limit = function(mini, maxi) {
        this.set(vec.limit(this, mini, maxi));
    };
    vec.prototype.add = function(v) {
        this.set(vec.add(this, v));
    };
    vec.prototype.sub = function(v) {
        this.set(vec.sub(this, v));
    };
    vec.prototype.mult = function(r) {
        this.set(vec.mult(this, r));
    };
    vec.prototype.multComponents = function(v) {
        this.set(vec.multComponents(this, v));
    };
    vec.prototype.dot = function(v) {
        return vec.dot(this, v);
    };
    vec.prototype.mag = function() {
        return vec.mag(this);
    };
    vec.prototype.normalize = function() {
        this.set(vec.normalize(this));
    };
    vec.prototype.cross = function(v) {
        this.set(vec.cross(this, v));
    };
    vec.prototype.dist = function(v) {
        return vec.dist(this, v);
    };
    vec.prototype.angleBetween = function(v) {
        return vec.angleBetween(this, v);
    };
    vec.prototype.rotateX = function(theta) {
        this.set(vec.rotateX(this, theta));
    };
    vec.prototype.rotateY = function(theta) {
        this.set(vec.rotateY(this, theta));
    };
    vec.prototype.rotateZ = function(theta) {
        this.set(vec.rotateZ(this, theta));
    };
    
    return vec;
    
})();




//jshint ignore: start

const a = random(-5, 5);
const b = random(-5, 5);
const c = random(-5, 5);

const canvas = createGraphics(width, height, JAVA2D); 
canvas.translate(width/2, height/2);
canvas.stroke(255);
canvas.strokeWeight(1);

const img = createGraphics(width, height, JAVA2D);
img.colorMode(HSB);
img.translate(width/2, height/2);
img.stroke(255);
img.background(0, 0);

const v1 = Vec.new(1, 1, 1);
v1.mult(73);

let pv2 = v1.get();;

draw = function() {
    
    try {
        
        background(0);
        canvas.background(0);
        
        // canvas.line(v1.x, v1.y, 0, 0);
        
        const v2 = v1.get();
        v2.rotateY(frameCount*a);
        v2.rotateZ(frameCount*b);
        v2.rotateX(frameCount*c);
        canvas.line(v2.x, v2.y, v2.z, 0);
        
        img.strokeWeight(15);
        img.stroke(frameCount % 255, 255, 255, 7);
        img.line(
            v2.x, v2.y,
            pv2.x, pv2.y
        );
        
        img.strokeWeight(2.5);
        img.stroke(frameCount % 255, 225, 255);
        img.line(
            v2.x, v2.y,
            pv2.x, pv2.y
        );
        pv2 = v2.get();
        
        image(canvas, 0, 0);
        image(img, 0, 0);
    
    } catch (err) {
        println(err)
    }
    
};

keyTyped = function() {
    Program.restart();
};

// OLD
// var Vec = {
//     add: function(v1, v2) {
//         return this.create(
//             v1.x + v2.x, 
//             v1.y + v2.y,
//             v1.z + v2.z
//         );
//     },
//     sub: function(v1, v2) {
//         return this.create(
//             v1.x - v2.x, 
//             v1.y - v2.y,
//             v1.z - v2.z
//         );
//     },
//     mult: function(v, r) {
//         return this.create(
//             v.x * r, 
//             v.y * r,
//             v.z * r
//         );
//     },
//     mag: function(v) {
//         return Math.sqrt(
//             v.x * v.x + 
//             v.y * v.y +
//             v.z * v.z
//         );  
//     },
//     dot: function(v1, v2) {
//         return v1.x * v2.x + 
//               v1.y * v2.y +
//               v1.z * v2.z;
//     },
//     normalize: function(v) {
//         const dot = this.dot(v, v);
//         if (dot > 0) {
//             const inverseMag = 1/Math.sqrt(dot);
//             return Vec.mult(v, inverseMag);
//         }
//     },
//     cross: function(v1, v2) {
//         return this.create(
//             v1.y * v2.z - v1.z * v2.y,
//             v1.z * v2.x - v1.x * v2.z,
//             v1.x * v2.y - v1.y * v2.x
//         );
//     },
//     dist: function(v1, v2) {
//         const dx = v1.x - v2.x;
//         const dy = v1.y - v2.y;
//         const dz = v1.z - v2.z;
//         return Math.sqrt(
//             dx * dx +
//             dy * dy +
//             dz * dz
//         );
//     },
//     angleBetween: function(v1, v2) {
//         return acos(
//             Vec.dot(v1, v2) / 
//             (v1.mag() * v2.mag())
//         );
//     },
//     rotateX: function(v, theta) {
//         const s = sin(theta);
//         const c = cos(theta);
//         return this.create(
//             v.x,
//             c*v.y - s*v.z,
//             s*v.y + c*v.z
//         );
//     },
//     rotateY: function(v, theta) {
//         const s = sin(theta);
//         const c = cos(theta);
//         return this.create(
//             c*v.x + s*v.z,
//             v.y,
//             c*v.z - s*v.x
//         );
//     },
//     rotateZ: function(v, theta) {
//         const s = sin(theta);
//         const c = cos(theta);
//         return this.create(
//             c*v.x - s*v.y,
//             s*v.x + c*v.y,
//             v.z
//         );
//     },
//     create: function(x, y, z) {
//         return {
//             x: x||0,
//             y: y||0,
//             z: z||0,
//             get: function() {
//                 return Vec.create(
//                     this.x, this.y, this.z
//                 );
//             },
//             set: function(v) {
//                 this.x = v.x;
//                 this.y = v.y;
//                 this.z = v.z;
//             },
//             add: function(v) {
//                 this.set(Vec.add(this, v));
//             },
//             sub: function(v) {
//                 this.set(Vec.sub(this, v));
//             },
//             mult: function(r) {
//                 this.set(Vec.mult(this, r));
//             },
//             mag: function() {
//                 return Vec.mag(this);
//             },
//             dist: function(v) {
//                 return Vec.dist(this, v);
//             },
//             dot: function(v) {
//               return Vec.dot(this, v);
//             },
//             normalize: function() {
//                 this.set(Vec.normalize(this));
//             },
//             cross: function(v) {
//                 this.set(Vec.cross(this, v));
//             },
//             rotateX: function(theta) {
//                 this.set(Vec.rotateX(this, theta));
//             },
//             rotateY: function(theta) {
//                 this.set(Vec.rotateY(this, theta));
//             },
//             rotateZ: function(theta) {
//                 this.set(Vec.rotateZ(this, theta));
//             },
//         };
//     },
//     fromAngle: function(theta) {
//         return this.create(
//             cos(theta),
//             sin(theta),
//             0
//         );
//     },
// };
