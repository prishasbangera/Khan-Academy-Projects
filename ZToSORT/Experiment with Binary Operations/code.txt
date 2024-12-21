//This is surely Worley
//Wait for it to load

//Using Bob Lyon's DeKhan loopDetect function for the first time

var maxDist = 50;
var numPoints = 3;
var clr1 = color(221, 0, 255);
var clr2 = color(0, 72, 255);
var nthClosest = 1;
var numFrames = 1000; //the number of frames to create

var points = (function() {
    var array = [{
        x: width/2,
        y: height/2,
        z: 0,
    }];
    for (var i = 0; i < numPoints; i++) {
        array.push({
           x: random(width),
           y: random(height),
           z: random(width)
        });
    }
    return array;
})();
var images = [];
var counter = 0;
var goingIn = true;

/*Bob Lyon's DeKhan Library*/
var DeKhan = (function() {
    /* Regular expressions derived from Element118 delag() function. */
    var plusPlusExp = new RegExp("__env__\\.KAInfiniteLoopCount\\+\\+;\\n", "g");
    var ifClauseExp = new RegExp("\\n\\s*if \\(__env__\\.KAInfiniteLoopCount > 1000\\) {[\\s]+__env__\\.KAInfiniteLoopProtect\\('[^']*'\\);[^}]+}", "g");
    var newExp = new RegExp("__env__\\.PJSCodeInjector\\.applyInstance\\((\\S+), '\\S+'\\)", "g");
    var envExp = new RegExp("__env__\\.", "g");
    var noBreakSpace = "\u00a0";  /* primenumbers7532@gmail.com */
    var lineBreak = String.fromCharCode(10);  /* Larry Serflaten for IE Windows */
    var spaceExp = new RegExp(" ", "g");
    var newlineExp = new RegExp("\\n", "g");
    var wasFrameCount = frameCount;
    frameCount = function() {
        frameCount = wasFrameCount;
        return this;
    };
    var globals = frameCount();
    var F = Object.constructor;  /* Javascript Function (capital F) constructor */
    var metIpseMecum = (0 || arguments).callee;
    
    /* Given source code, return a function in the global scope. */
    var conjureFunctionFrom = function (source) {
        /* Copied from Element118, clarence99chew@gmail.com, delag() function. */
        return F('return (function(__env__) {return ' + source + ';});')()(globals);
    };
    
    return {
        /* Return a function like f without any loop detection. */
        loopDetect: function(f) {
            var source = f.toString();
            source = source.replace(plusPlusExp, "");
            source = source.replace(ifClauseExp, "");
            return conjureFunctionFrom(source);
        },
        
        /* Return a function like f where the caller supplies the filter. */
        applyRegExp: function(f, rExp, replacement) {
            var source = f.toString();
            source = source.replace(rExp, replacement);
            return conjureFunctionFrom(source);
        },
        
        /* Return a function like f that uses the keyword "new" again. */
        renew: function(f) {
            return this.applyRegExp(f, newExp, "new $1");
        },
        
        /*
         * Print completely deKhanified function f source out via println.
         * All arguments are optional.
         */
        print: function(f, prefix, suffix) {
            f = f || metIpseMecum;
            prefix = prefix || "";
            suffix = suffix || "";
            f = this.loopDetect(f);
            f = this.renew(f);
            var source = f.toString();
            source = source.replace(envExp, "");
            source = prefix + source + suffix;
            this.printText(source);
        },
        
        /* Print source line(s) out via println. */
        printText: function(source) {
            source = source || " "; /* blank line if nothing else... */
            source = source.replace(spaceExp, noBreakSpace);
            source = source.replace(newlineExp, lineBreak);
            println(source);
        },
    };
})();

draw = DeKhan.loopDetect(function() {
    if (images.length < numFrames) {
        loadPixels();
        var pixels = imageData.data;
        for (var x = 0; x < width; x+=1) {
            for (var y = 0; y < height; y+=1) {
                var dists = [];
                for (var i = 0; i < points.length; i++) {
                    var z = frameCount%width;
                    dists.push(dist(
                        points[i].x,
                        points[i].y,
                        points[i].z,
                        x, y, z
                    ));
                }
                dists.sort();
                var index = (x+y*width) * 4;
                var clr = lerpColor(clr1, clr2, map(dists[nthClosest], 0, maxDist, 0, 1));
                if (((x-200)/20)&((y-200)/20)) {
                    pixels[index] = red(clr)&y;
                    pixels[index + 1] = green(clr)&x;
                    pixels[index + 2] = blue(clr)^y^x;
                    pixels[index + 3] = map(dists[nthClosest], 0, maxDist, 0, 255);
                } else {
                    pixels[index] = blue(clr)&x;
                    pixels[index + 1] = red(clr)&y;
                    pixels[index + 2] = green(clr);
                }
            }
        }
        updatePixels();
        images.push(get());
        text(images.length + "/" + numFrames, 0, height);
    } else {
        if (counter >= 0 && counter <= images.length-1) {
            image(images[counter], 0, 0);
        } else {
            goingIn = !goingIn;
        }
        if (goingIn) {
            counter++;
        } else  { 
            counter--;
        }
    }
});