background(0);
randomSeed(1); //same random every time

/*****/

//hair function, pass in an object. In the object you have:

//required: 
//pass in an image hairShape and a function hairStrand to draw strand
//The white pixels in the image are where hair strands start 
//(so basically just create a mask)
//hairStrand funct: pass in instance (Optional: pass in x and y, hairShape instance)

//optional: pass in size of image returned
//optional: pass in init funct (which should accept an instance)--usually transformations 
//optional: pass in extras funct (which should accept an instance)--accessories, etc.
//optional: increment in pixels, higher = less density
//it would be best to use this with some sort of loading method

function hair(config) {
    
    //create image that will be returned
    var img = createGraphics(config.w||width, config.h||height, P2D);
    img.background(0, 0);
    img.noFill();
    
    config.increment = floor(config.increment) || 1;
    
    //check that everything is there
    if (!config.hairShape) {
        println("You need to pass in an image of the hair shape.");
        return;
    }
    if (!config.hairStrand) {
        println("You need to pass in a function that draws a hair strand");
        return;
    }

    //initialize, if a function was passed in
    if (config.init) {
        config.init(img);
    }
    
    //loop through all the pixels in the hair shape image
    config.hairShape.loadPixels();
    var pixels = config.hairShape.imageData.data;
    for (var x = 0; x < config.hairShape.width; x+=config.increment) {
        for (var y = 0; y < config.hairShape.height; y+=config.increment) {
            //find the current index
            var index = (x+y*config.hairShape.width) * 4;
            //if this pixel is white, then draw hair strand
            if (pixels[index + 0] === 255 &&
                pixels[index + 1] === 255 &&
                pixels[index + 2] === 255 &&
                pixels[index + 3] === 255) {
                //pass in instance, x, and y
                config.hairStrand(img, x, y, config.hairShape);
            }
        }   
    }
    config.hairShape.updatePixels();
    
    //draw the extra things
    if (config.extras) {
        config.extras(img);
    }
    
    //return image
    return img;
    
}

//template
/*
var wig = hair({
    //hair shape image
    hairShape: ,
    //hair strand function
    hairStrand: function(inst, x, y, hairShape) {},
    //width of image returned (optional)
    w: ,
    //height of image returned (optional)
    h: ,
    //init function (optional)
    init: function(inst) {},
    //extras function (optional)
    extras: function(inst) {},
    //increment in pixels (optional)
    increment:
});
*/

/*****/

var hairShapeExample = (function() {
    var img = createGraphics(76, 170, P2D);
    img.noStroke();
    img.fill(255);
    img.translate(-26, 0);
    //the shape of the hair
    img.beginShape();
        img.vertex(99, 29);
        img.bezierVertex(4, 14, 46, 38, 27, 146);
        img.bezierVertex(109, 84, 32, 46, 99, 29);
    img.endShape();
    return img.get();
})();

var redHair = hair({
    //hair shape image
    hairShape: hairShapeExample,
    //hair strand
    hairStrand: function(inst, x, y) {
        //pick color
        inst.stroke(lerpColor(
            color(230, 92, 0),
            color(23, 0, 0),
            random(map(y+random(-y*0.2, y*0.4), 0, inst.height, 0, 1)) 
        ));
        //draw strand
        inst.bezier(x, y, 
                    x+random(-78, -21), y+random(16,40), 
                    x+random(-11, 0), y+random(29, 98), 
                    x+random(-57, -23), y+random(72, 98));
    },
    //size of image returned (optional)
    w: 143, 
    h: 241,
    //init function (optional)
    init: function(inst) {
        inst.translate(62, 3);
    }
});

var grayHair = hair({
    //hair shape image
    hairShape: (function() {
        var img = createGraphics(90, 50, P2D);
        img.fill(255);
        img.noStroke();
        img.arc(55, 11, 63, 18, -180, 0);
        img.rect(20, 20, 20, 31);
        img.arc(30, 15, 20, 20, 180, 270);
        return img;
    })(),
    //hair strand function
    hairStrand: function(inst, x, y, inst2) {
        inst.stroke(map(y, 0, inst2.height, 200, 100));
        inst.line(x, y, x+random(-14, 10), y+random(21));
    },
    //size of image returned (optional)
    w: 98, 
    h: 75,
    //init function (optional)
    init: function(inst) {
        inst.angleMode = "degrees";
        inst.translate(2, -2);
        inst.rotate(10);
    },
    //extra stuff (optional)
    extras: function(inst) {
        inst.translate(27, 17);
        for (var i = 0; i < 360; i+=3) {
            inst.stroke(random(255), random(255), 200, 200);
            inst.pushMatrix();
            inst.rotate(i);
            inst.strokeWeight(random(2));
            inst.line(0, 0, random(17), 0);
            inst.popMatrix();
        }
    }
});

var rainbowHair = hair({
    //hair shape image
    hairShape: hairShapeExample,
    //hair strand function
    hairStrand: function(inst, x, y, inst2) {
        inst.strokeWeight(random(1,2));
        inst.stroke(random(255), 
                    map(y, 0, inst2.height, 10, 130), 
                    255);
        inst.bezier(x, y, 
                    x+random(-67, -38), y+random(-13,44), 
                    x+random(-29, -19), y+random(29, 89), 
                    x+random(-65, -29), 
                    y+random(79, 33) + map(y, 0, inst2.height, 87, -18));
    },
    //size of image returned (optional)
    w: 150, 
    h: 245,
    //init function (optional)
    init: function(inst) {
        inst.translate(82, -12);
        inst.scale(-1, 1);
        inst.colorMode(HSB);
    },
    //extras function (optional)
    extras: function(inst) {
        inst.translate(27, 51);
        for (var i = 0; i < 360; i++) {
            inst.stroke(random(255), 150, 235, 220);
            inst.pushMatrix();
            inst.rotate(i);
            inst.strokeWeight(random(5));
            inst.point(random(-18, 21), 0);
            inst.popMatrix();
        }
    }
});

var curlyHair = hair({
    //hair shape image
    hairShape: (function() {
        var img = createGraphics(150, 150, P2D);
        img.angleMode = "degrees";
        img.stroke(255);
        img.noFill();
        img.strokeWeight(20);
        img.arc(47, 59, 57, 80, -199, 36);
        return img;
    })(),
    //hair strand function
    hairStrand: function(inst, x, y) {
        inst.angleMode = "degrees";
        inst.noFill();
        inst.strokeWeight(random(1));
        inst.stroke(lerpColor(
            color(82, 30, 30),
            color(138, 76, 0),
            random(1)    
        ));
        inst.pushMatrix();
        inst.translate(x, y);
        inst.rotate(random(360));
        inst.arc(0, 0, random(20), random(20), 10, 200);
        inst.popMatrix();
    },
    //size of image returned (optional)
    w: 100, 
    h: 103,
    //increment
    increment: 2
});

/*****/

//draw everything
//image(hairShapeExample, 0, 0);
image(redHair, 46, -2);
image(grayHair, 220, 38, grayHair.width*1.2, grayHair.height*1.2);
image(rainbowHair, 205, 177);
image(curlyHair, 65, 246, curlyHair.width*1.3, curlyHair.height*1.3);
