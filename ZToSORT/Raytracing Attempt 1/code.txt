// in which i follow
//https://medium.com/swlh/ray-tracing-from-scratch-in-python-41670e6a96f9

//jshint ignore: start

// {
const Vec = {
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
        const dot = this.dot(v, v);
        if (dot > 0) {
            const inverseMag = 1/Math.sqrt(dot);
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
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        const dz = v1.z - v2.z;
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
        const s = sin(theta);
        const c = cos(theta);
        return this.create(
            v.x,
            c*v.y - s*v.z,
            s*v.y + c*v.z
        );
    },
    rotateY: function(v, theta) {
        const s = sin(theta);
        const c = cos(theta);
        return this.create(
            c*v.x + s*v.z,
            v.y,
            c*v.z - s*v.x
        );
    },
    rotateZ: function(v, theta) {
        const s = sin(theta);
        const c = cos(theta);
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

function Sphere(center, radius, color, ambient, diffuse, specular, shininess, reflection) {
    return {
        center: center,
        radius: radius,
        color: color,
        ambient: ambient,
        diffuse: diffuse,
        specular: specular,
        shininess: shininess,
        reflection: reflection
    }
}

const cam = Vec.create(0, 0, 1);

const light = {
    pos: Vec.create(5, -5, 5),
    ambient: 0.5,
    diffuse: 0.9,
    specular: 1.0,
};

const objects = [
    // center, radius, color, ambient, diffuse, specular, shininess, reflection
    Sphere(Vec.create(0, 100, -15), 100, color(145, 145, 145), 0.1, 0.6, 1, 10, 0.8),
    Sphere(Vec.create(1, 1, -0.9), 0.3, color(0, 255, 38), 0.1, 0.7, 1, 100, 0.5),
    Sphere(Vec.create(-0.2, 0, -0.9), 0.9, color(234, 0, 255), 0.1, 0.7, 1, 100, 0.5),
    Sphere(Vec.create(0.4, -0.2, 0.1), 0.1, color(255, 0, 0), 0.1, 0.7, 1, 50, 0.5),
    Sphere(Vec.create(-0.2, -0.1, 0.2), 0.05, color(255, 204, 0), 0.1, 0.5, 1, 90, 0.5),
    Sphere(Vec.create(-0.3, -0.5, 0.1), 0.15, color(132, 0, 255), 0.2, 0.6, 0.9, 100, 0.2)
];

function reflected(v, axis) {
    return Vec.sub(v, Vec.mult(axis, 2*Vec.dot(v, axis)));
}

function sphereIntersect(sphere, rayOrigin, rayDir) {
    // a = 1
    const b = Vec.dot(rayDir, Vec.sub(rayOrigin, sphere.center)) * 2;
    let c = Vec.mag(Vec.sub(rayOrigin, sphere.center));
    c = c*c - sphere.radius*sphere.radius;
    const delta = b*b - 4*c; // discriminant
    if (delta > 0) {
        // solve quadratic equation
        const t1 = (-b + Math.sqrt(delta)) * 0.5;
        const t2 = (-b - Math.sqrt(delta)) * 0.5;
        if (t1 > 0 && t2 > 0) {
            return Math.min(t1, t2);
        }
    } else {
        return Infinity;
    }
}

function nearestObj(objects, rayOrigin, rayDir) {
    
    let closestObject = null;
    let minDist = Infinity;
    
    // loop through objects
    for (let i = 0; i < objects.length; i++) {
        const distance = sphereIntersect(objects[i], rayOrigin, rayDir);
        if (distance && distance < minDist) {
            minDist = distance;
            closestObject = objects[i];
        }
    }
    
    return {
        closest: closestObject,
        minDist: minDist
    }
    
}

function calcIllumination(object, light, intersection, originRay) {

    const normalToSurface = Vec.normalize(Vec.sub(intersection, object.center));
    const shiftedPoint = Vec.add(intersection, Vec.mult(normalToSurface, 1e-5));
    const intersectToLight = Vec.normalize(Vec.sub(light.pos, shiftedPoint));
    
    const m = nearestObj(objects, shiftedPoint, intersectToLight);
    const pointToLightDist = Vec.mag(Vec.sub(light.pos, shiftedPoint));
    const inShadow = pointToLightDist > m.minDist;
    
    if (inShadow) {
        return [0, 0, 0];
        // return [
        //     object.color >> 16 & 0xff * object.ambient,
        //     object.color >> 8 & 0xff * object.ambient,
        //     object.color & 0xff * object.ambient
        // ];
    } else {
        // Blinn-Phong model 100% copied
        let i = 0;
        // ambient 
        i += object.ambient * light.ambient;
        // diffuse
        i += object.diffuse * light.diffuse * Vec.dot(intersectToLight, normalToSurface);
        // specular 
        const intersectToCamera = Vec.normalize(Vec.sub(originRay, intersection));
        const H = Vec.normalize(Vec.add(intersectToLight, intersectToCamera));
        i += pow(object.specular * light.specular * Vec.dot(normalToSurface, H), 
                 object.shininess * 0.25);
        i = constrain(i, 0, 1);
        const c = object.color;
        return [
            (c >> 16 & 0xff) * i,
            (c >> 8 & 0xff) * i,
            (c & 0xff) * i
        ];
    }
    
}

function render(x, y) {
    
    const pix = Vec.create(x, y, 0);
    const dir = Vec.normalize(Vec.sub(pix, cam));
    
    const n = nearestObj(objects, cam, dir);
    
    if (n.minDist < Infinity) {
        const clr = calcIllumination(
            n.closest, light, Vec.add(Vec.mult(dir, n.minDist), cam), cam
        );
        return clr;  
    } else {
        return [0, 0, 0];
    }
    
}

let y = 0, x, p, i, clr;

loadPixels();
draw = function() {
    try {
        for (var n = 0; n < 10; n++) {
            p = imageData.data;
            for (x = 0; x <= width; x++) {
                clr = render(map(x, 0, width, -1, 1), map(y, 0, height, -1, 1));
                i = (x+y*width)*4;
                p[i + 0] = clr[0];
                p[i + 1] = clr[1];
                p[i + 2] = clr[2];
            }
            updatePixels();
            if (y++ > height) noLoop();
        }
    } catch(err) {
        println(err);
    }
};