//https://medium.com/swlh/ray-tracing-from-scratch-in-python-41670e6a96f9

//jshint ignore: start

enableContextMenu();
frameRate(0);

var y = 0;
var images = [];
var counter = 0;
var numFrames = 10;
var playing = false;


// {

Array.prototype.add = function(n) {
    if (n instanceof Array) {
        if (this.length !== n.length) {
            println("Arrays must have same length!");
            return;
        }
        for (var i = 0; i < this.length; i++) {
            this[i] += n[i];
        }
    } else {
        for (var i = 0 ; i < this.length; i++) {
            this[i] += n;
        }
    }
    return this;
};

Array.prototype.mult = function(n) {
    if (n instanceof Array) {
        if (this.length !== n.length) {
            println("Arrays must have same length!");
            return;
        }
        for (var i = 0; i < this.length; i++) {
            this[i] *= n[i];
        }
    } else {
        for (var i = 0 ; i < this.length; i++) {
            this[i] *= n;
        }
    }
    return this;
};

Array.prototype.constrain = function(mini, maxi) {
    for (var i = 0; i < this.length; i++) {
        this[i] = Math.min(maxi, Math.max(mini, this[i]));
    }
};

//}

// Vec {

var Vec = {
    add: function(v1, v2) {
        return this.create(
            v1.x + v2.x, 
            v1.y + v2.y,
            v1.z + v2.z
        );
    },
    sub: function(v1, v2) {
        return this.create(
            v1.x - v2.x, 
            v1.y - v2.y,
            v1.z - v2.z
        );
    },
    mult: function(v, r) {
        return this.create(
            v.x * r, 
            v.y * r,
            v.z * r
        );
    },
    mag: function(v) {
        return Math.sqrt(
            v.x * v.x + 
            v.y * v.y +
            v.z * v.z
        );  
    },
    dot: function(v1, v2) {
        return v1.x * v2.x + 
               v1.y * v2.y +
               v1.z * v2.z;
    },
    normalize: function(v) {
        var dot = this.dot(v, v);
        if (dot > 0) {
            var inverseMag = 1/Math.sqrt(dot);
            return Vec.mult(v, inverseMag);
        }
    },
    cross: function(v1, v2) {
        return this.create(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        );
    },
    dist: function(v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(
            dx * dx +
            dy * dy +
            dz * dz
        );
    },
    angleBetween: function(v1, v2) {
        return acos(
            Vec.dot(v1, v2) / 
            (v1.mag() * v2.mag())
        );
    },
    rotateX: function(v, theta) {
        var s = sin(theta);
        var c = cos(theta);
        return this.create(
            v.x,
            c*v.y - s*v.z,
            s*v.y + c*v.z
        );
    },
    rotateY: function(v, theta) {
        var s = sin(theta);
        var c = cos(theta);
        return this.create(
            c*v.x + s*v.z,
            v.y,
            c*v.z - s*v.x
        );
    },
    rotateZ: function(v, theta) {
        var s = sin(theta);
        var c = cos(theta);
        return this.create(
            c*v.x - s*v.y,
            s*v.x + c*v.y,
            v.z
        );
    },
    create: function(x, y, z) {
        return {
            x: x||0,
            y: y||0,
            z: z||0,
            get: function() {
                return Vec.create(
                    this.x, this.y, this.z
                );
            },
            set: function(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
            },
            add: function(v) {
                this.set(Vec.add(this, v));
            },
            sub: function(v) {
                this.set(Vec.sub(this, v));
            },
            mult: function(r) {
                this.set(Vec.mult(this, r));
            },
            mag: function() {
                return Vec.mag(this);
            },
            dist: function(v) {
                return Vec.dist(this, v);
            },
            dot: function(v) {
               return Vec.dot(this, v);
            },
            normalize: function() {
                this.set(Vec.normalize(this));
            },
            cross: function(v) {
                this.set(Vec.cross(this, v));
            },
            rotateX: function(theta) {
                this.set(Vec.rotateX(this, theta));
            },
            rotateY: function(theta) {
                this.set(Vec.rotateY(this, theta));
            },
            rotateZ: function(theta) {
                this.set(Vec.rotateZ(this, theta));
            },
        };
    },
    fromAngle: function(theta) {
        return this.create(
            cos(theta),
            sin(theta),
            0
        );
    },
};

// }

// Objects, etc. {

function Sphere(center, radius, color, ambient, diffuse, specular, shininess, reflection) {
    return {
        center: center,
        radius: radius,
        color: [
            color >> 16 & 0xff,
            color >> 8 & 0xff,
            color & 0xff
        ],
        ambient: ambient,
        diffuse: diffuse,
        specular: specular,
        shininess: shininess,
        reflection: reflection
    };
}

var cam = Vec.create(0, 0, 1);

var light = {
    startPos: Vec.create(2, -2, 5),
    ambient: 0.5,
    diffuse: 1.0,
    specular: 1.0,
};
light.pos = light.startPos;

var objects = function() {
    var o = [];
    var maxi = 50;
    var s = 0.8;
    var l = 47;
    randomSeed(37);
    for (var i = 0; i < maxi; i++) {
        var angle = i * l;
        var d = i/maxi;
        var center = Vec.create(
            cos(angle) * d, 
            sin(angle) * d, 
            d * 0.2 + -0.2
        );
        colorMode(HSB);
        var clr = color(
            d * 255,
            200,
            random(200, 255)
        );
        colorMode(RGB);
        o.push(Sphere(
            center, 
            map(d, 0, 1, 0.01, 0.2),
            clr, 
            random(0.3, 0.5), 
            random(0.6, 0.9), 
            random(0.5, 1), 
            random(50, 150), 
            random(0.5)
        ));
    }
    return o;
}();

// change scene each frame
function changeScene() {
    light.pos = Vec.rotateY(light.startPos, map(images.length, 0, numFrames, 0, 360));
}

// display frames
function drawImages() {
    if (Number.isInteger(counter)) {
        image(images[counter % images.length], 0, 0);
    }
    counter++;
}

loadPixels();
var pixels = imageData.data;

// }

function sphereIntersect(object, originRay, dir) {
    var centerToOrigin = Vec.sub(originRay, object.center);
    var b = Vec.dot(dir, centerToOrigin)*2;
    var c = Vec.dot(centerToOrigin, centerToOrigin) - object.radius*object.radius;
    var discrim = b*b - 4*c;
    if (discrim > 0) {
        // solve quadratic equation
        var t1 = (-b + Math.sqrt(discrim)) * 0.5;
        var t2 = (-b - Math.sqrt(discrim)) * 0.5;
        if (t1 > 0 && t2 > 0) return Math.min(t1, t2);
    }
}

function nearestObject(objects, origin, dir) {
    var i, distance;
    var minDist = Infinity, nearest = null;
    for (i = 0; i < objects.length; i++) {
        distance = sphereIntersect(objects[i], origin, dir);
        if (distance && distance < minDist) {
            minDist = distance;
            nearest = objects[i];
        }
    }
    if (minDist < Infinity) {
        return {
            dist: minDist,
            nearestObj: nearest
        };
    }
}

function reflected(vec, axis) {
    return Vec.sub(vec, Vec.mult(axis, 2*Vec.dot(vec, axis)));
}

draw = function() {
    if (!playing) {
        for (var n = 0; n < 2; n++) {
            for (var x = 0; x < width; x++) {
                
                var origin = cam;
                var pix = Vec.create(
                    map(x, 0, width, -1, 1),
                    map(y, 0, height, -1, 1)
                );
                var dir = Vec.normalize(Vec.sub(pix, origin));
            
                var clr = [0, 0, 0];
                var reflection = 1;
                var lum; // illumination
                var iter = 0;
                
                // find color
                while (reflection > 0.05 || iter > 100) {
                    
                    iter++;
                    
                    // find closest object and distance to it
                    var c = nearestObject(objects, origin, dir);
                    if (!c) break;
                    
                    // find intersection
                    var pt = Vec.add(origin, Vec.mult(
                        dir, c.dist));
                        
                    // illumination
                    // Blinn Phong model
                    lum = [0, 0, 0];
                    
                    // to check if in shadow
                    var obj = c.nearestObj;
                    var normalToSurface = Vec.normalize(
                        Vec.sub(pt, obj.center));
                    var shiftedPt = Vec.add(pt, Vec.mult(
                        normalToSurface, 1e-5));
                    var ptToLight = Vec.normalize(Vec.sub(
                        light.pos, shiftedPt));
                    var s = nearestObject(objects, 
                        shiftedPt, ptToLight);
                        
                    // ambient
                    lum.add(obj.ambient * light.ambient);
                    // if not in shadow
                    if (s && s.dist > ptToLight.mag() || !s) {
                        // find illumination
                        // diffuse 
                        lum.add(obj.diffuse * light.diffuse *
                            Vec.dot(ptToLight, normalToSurface));
                        // specular
                        var pt2Or = Vec.normalize(
                            Vec.sub(origin, pt)
                        );
                        var h = Vec.normalize(
                            Vec.add(ptToLight,pt2Or)
                        );
                        lum.add(obj.specular * light.specular * 
                            Math.pow(
                                Vec.dot(normalToSurface, h),
                                obj.shininess * 0.25
                            )
                        );
                    }
                      
                    // reflection
                    lum.mult(obj.color);
                    lum.mult(reflection);
                    lum.constrain(0, 255);
                    clr.add(lum);
                    reflection *= obj.reflection;
                    
                    // shift the point of origin to trace next ray
                    origin = shiftedPt;
                    // find reflection ray dir
                    // at first, dir is cam to pix
                    dir = reflected(dir, normalToSurface);
                    
                }
                
                clr.constrain(0, 255);
            
                // set color
                var i = (x+y*width) * 4;
                pixels[i+0] = clr[0];
                pixels[i+1] = clr[1];
                pixels[i+2] = clr[2];
                
            }
            updatePixels();
            if (y++ > height) {
                if (images.length < numFrames) {
                    images.push(get());
                    debug(images.length/numFrames * 100 + "%");
                    y = 0;
                    changeScene();
                    break;
                } else {
                    frameRate(10);
                    playing = true;
                    debug("done");
                }
            }
        }
    } else {
        drawImages();
    }
};