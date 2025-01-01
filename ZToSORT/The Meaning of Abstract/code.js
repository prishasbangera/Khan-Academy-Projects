/*

    Contest: Illustrate a Math Concept
    
    I have been programming for about two years.
    
    I have completed 100% percent of Khan Academy's
    'Intro to JS' course.
    
    I would prefer to be placed in the Intermediate bracket
    
    Entry:
    The Meaning of Abstract - Mathematical Objects Don't Exist
    
    Sources:
    - MDN
    - https://stackoverflow.com/questions/10428603/simulate-the-new-operator-in-javascript/10429078
        
        
*/

// Simulate New Operator {

Object.constructor.prototype.new = function() {
    var obj = Object.create(this.prototype);
    this.apply(obj, arguments);
    return obj;
};

// }

// General {

var Project = {
    // current scene
    scene: "setup",
    // constant: grid size to organize items on canvas
    gridSize: width/20,
    // colors used more than once
    clrs: {
        darkblue: color(68, 101, 194),
        lightblue: color(135, 205, 255)
    },
    text: {
        // set text size to large or normal
        // pass in string for siz
        set: function(siz) {
            if (siz === "large") {
                textSize(44);
                textLeading(Project.gridSize*2);
            } else if (siz === "normal") {
                textSize(22);
                textLeading(Project.gridSize*1.05);
            }
        }
    },
    // SETUP - called once before load
    setup: function() {
        imageMode(CENTER);
        textAlign(LEFT, BOTTOM);
        textFont(createFont("Trebuchet MS"));
        this.text.set("normal");
        // change scene to loading assets scene
        this.scene = "load";
    },
    // For loading images during scene = "load"
    loadCount: 0,
    // called when scene = "load"
    // "load" one image each frame
    // pass in object with assets to load
    // pass in optional function to call when complete
    loadAssets: function(assets, onComplete) {
        // array of images to load
        var a = Object.keys(assets);
        // current image being loaded
        var c = this.loadCount;
        // if assets[loadCount] exists
        if (assets[a[c]]) {
            // draw loading screen
            background(0);
            pushStyle();
            pushMatrix();
            textAlign(CENTER, CENTER);
            translate(width/2, height/2);
            fill(255);
            text("Loading", 0, 0);
            noFill();
            stroke(255, 100);
            strokeWeight(5);
            strokeCap(SQUARE);
            arc(0, 0, 150, 150, 0, c/a.length*360);
            popMatrix();
            popStyle();
            // overwrite to what it returns (image)
            assets[a[c]] = assets[a[c]]();
            // increment counter
            this.loadCount++;
        } else {
            // else, call onComplete and set scene to home
            onComplete();
            this.scene = "home";
        }
    },
};

// }

// Complex Shapes {

// https://www.khanacademy.org/computer-programming/-/4977120025460736

// Handle complex curveVertex shapes with many points

var ComplexShapes = {
    // all the shapes in an object
    shapes: {
        /*
            nameOfShape: {
                // whether to do endShape(CLOSE)
                isClosed: (boolean)
                // list of points
                pts: [
                    [ [x0,y0], [x1,y1] ], // first "stroke"
                    [ [x0,y0], [x1,y1] ] // second "stroke"
                ]
            }
        */
        cursiveAbstract: {
            isClosed: false,
            pts: [
                [[125,505],[118,487],[102,483],[83,490],[73,513],[78,528],[89,534],[102,535],[117,527],[127,509],[128,498],[121,503],[117,523],[118,533],[128,537],[142,535],[154,523],[162,506],[163,496],[165,484],[165,468],[163,465],[152,488],[148,515],[149,529],[160,534],[171,535],[184,533],[192,527],[197,512],[194,499],[184,493],[173,497],[177,507],[188,507],[198,506],[211,503],[224,497],[234,490],[241,499],[249,512],[254,522],[256,532],[250,537],[240,538],[229,538],[216,530],[214,523],[220,517],[229,514],[242,513],[249,512],[258,510],[268,501],[270,493],[273,483],[274,472],[275,463],[273,486],[271,504],[269,517],[269,526],[277,534],[287,537],[292,533],[294,524],[295,512],[294,502],[300,497],[311,497],[321,497],[321,504],[317,512],[317,521],[316,531],[321,540],[331,539],[336,530],[341,517],[346,510],[352,503],[358,499],[369,498],[380,500],[387,502],[382,501],[376,498],[369,498],[361,501],[355,504],[351,508],[347,519],[350,529],[357,536],[367,536],[374,533],[381,528],[385,521],[386,511],[387,501],[386,508],[385,517],[384,527],[388,532],[397,536],[403,531],[410,517],[415,509],[420,503],[427,501],[438,501],[445,503],[454,508],[452,510],[448,503],[439,500],[432,498],[423,503],[418,509],[417,518],[420,531],[429,536],[437,539],[443,541],[452,542],[458,538],[467,532],[473,523],[478,515],[485,498],[488,486],[491,465],[482,490],[477,509],[476,519],[475,527],[485,540],[492,541],[501,541],[513,535],[520,530],[526,527],[533,522],[539,525]],[[244,486],[252,488],[262,491],[275,491],[284,491],[295,490],[303,488],[310,487],[317,485],[333,480]],[[448,491],[457,492],[465,494],[473,497],[485,497],[497,497],[507,497],[516,494],[524,494]]
            ]
        },
        titleBlockLetters: {
            isClosed: true,
            pts: [
                [[34,219],[24,290],[49,290],[51,268],[110,275],[114,254],[56,246],[63,218],[38,210],[23,290]],[[73,229],[118,242],[124,228],[104,222],[108,206],[131,216],[137,203],[91,188],[85,199],[97,204],[93,222],[78,217],[74,230],[118,242]],[[111,155],[96,179],[141,196],[156,175],[144,169],[135,189],[128,184],[131,174],[122,169],[116,177],[108,173],[117,161],[109,152],[96,179]],[[168,146],[132,58],[187,76],[184,25],[250,104],[234,108],[204,72],[196,95],[161,80],[192,135],[163,149],[134,57]],[[284,54],[247,60],[261,106],[291,102],[290,92],[266,95],[265,83],[277,84],[276,74],[262,76],[262,65],[290,63],[286,53],[247,59]],[[298,97],[303,56],[320,56],[325,103],[316,100],[315,83],[307,83],[306,101],[299,100],[302,56]],[[308,69],[308,60],[313,59],[315,72],[308,70],[308,60]],[[335,100],[345,57],[356,89],[367,61],[376,66],[360,114],[345,81],[343,104],[335,101],[344,56]],[[390,71],[375,111],[382,114],[395,75],[390,72],[374,113]],[[389,117],[408,80],[415,116],[429,93],[436,97],[415,137],[404,106],[395,122],[389,116],[408,79]],[[475,143],[484,132],[449,102],[429,141],[457,166],[471,153],[457,139],[452,146],[464,154],[454,155],[440,137],[452,114],[479,139],[484,133]],[[541,241],[532,181],[484,205],[501,242],[552,230],[532,181]],[[523,199],[497,209],[506,230],[534,225],[524,199],[497,209]],[[500,255],[554,247],[558,286],[543,285],[545,262],[531,262],[531,273],[523,271],[522,259],[503,265],[502,254],[554,247]]
            ]
        },
        earthDrawing: {
            isClosed: false,
            pts: [
                [[214,209],[210,214],[204,223],[198,230],[194,236],[190,243],[186,252],[183,258],[179,264],[175,272],[173,279],[171,288],[171,298],[172,306],[172,315],[173,322],[176,331],[181,340],[187,351],[190,358],[194,368],[197,375],[203,381],[211,388],[217,392],[223,397],[231,403],[237,407],[247,413],[256,416],[265,419],[273,420],[282,422],[291,423],[302,425],[309,426],[318,426],[330,426],[337,424],[343,419],[351,413],[357,410],[364,408],[371,405],[378,400],[387,394],[393,386],[398,380],[403,372],[407,364],[411,357],[414,351],[415,342],[416,333],[417,322],[419,316],[423,307],[425,296],[425,287],[425,280],[422,273],[418,264],[415,253],[411,245],[407,235],[404,228],[400,220],[393,213],[384,204],[378,197],[372,192],[363,188],[356,186],[348,184],[338,181],[329,178],[321,175],[314,173],[308,172],[300,172],[291,172],[281,172],[274,175],[267,179],[258,182],[251,183],[246,185],[239,188],[232,192],[225,197],[219,201],[214,207],[210,212],[207,218],[204,223]],[[257,183],[267,179],[263,187],[264,195],[263,202],[267,210],[275,216],[284,214],[293,210],[298,203],[305,202],[315,209],[321,213],[331,216],[335,222],[334,229],[332,236],[329,242],[324,251],[320,258],[319,269],[329,276],[340,281],[346,286],[348,295],[347,303],[347,314],[347,326],[352,335],[359,339],[365,341],[372,343],[379,344],[387,345],[394,346],[401,349],[409,348],[413,344],[415,340],[417,330]],[[256,252],[244,252],[235,252],[226,251],[219,250],[214,262],[214,273],[216,281],[213,290],[216,298],[231,301],[244,303],[253,303],[260,302],[266,295],[272,288],[276,282],[273,276],[265,272],[263,265],[263,258],[262,252],[254,251],[247,252],[240,252],[233,251]],[[177,338],[178,335],[190,335],[196,337],[203,339],[209,340],[215,341],[222,345],[227,348],[232,352],[235,358],[241,360],[247,357],[253,360],[254,367],[248,373],[244,376],[241,380],[243,386],[248,389],[253,397],[258,400],[264,403],[271,407],[278,405],[284,402],[290,406],[296,411],[302,417],[307,420],[313,425],[319,426]]
            ]
        }
    },
    // draw the shape or part of it
    // pass in string for name of shape
    // percent (optional) pass in how much of the shape to draw
    // percent is between 0 (nothing) and 1 (complete shape)
    // inst (optional) pass in Processing instance
    drawShape: function(shapeName, percent, inst) {
        // default percent is 1
        percent = percent === undefined ? 1 : percent;
        // get points list
        var shapePts = this.shapes[shapeName].pts;
        // find whether each stroke should be closed
        var isClosed = this.shapes[shapeName].isClosed;
        // get the total number of points in the entire shape
        // (all the strokes), then multiply by percent to see
        // how many of the pts should be drawn
        var num = shapePts.reduce(function(acc, val) {
            return +(acc + val.length);
        }, 0) * percent;
        var counter = 0;
        // loop through "strokes"
        for (var i = 0; i < shapePts.length; i++) {
            // begin shape
            if (inst) { inst.beginShape(); }
                else { beginShape(); }
            // loop through points for this stroke
            for (var j = 0; j < shapePts[i].length; j++) {
                // add curveVertex
                if (inst) {
                    inst.curveVertex(shapePts[i][j][0], shapePts[i][j][1]);
                } else {
                    curveVertex(shapePts[i][j][0], shapePts[i][j][1]);
                }
                // increment counter
                counter++;
                // return if counter > num of points to draw
                if (counter > num) {
                    // close shape
                    if (inst) { inst.endShape(); }
                        else { endShape(); }
                    return;
                }
            }
            // at end of each stroke, close shape
            if (inst) { 
                inst.endShape(isClosed ? CLOSE : null); 
            } else { 
                endShape(isClosed ? CLOSE : null);
            }
        }
    },
    // return a function which returns an image of the shape
    // for the list of assets in the images object
    // pass in string for name of shape
    // (optional) pass in function to change fill/stroke/etc
    //  - > function styling must accept an instance
    createImage: function(shapeName, styling) {
        var self = this;
        // return a function which returns an image
        return function() {
            // create image
            var img = createGraphics(width, height, P2D);
            img.background(0, 0);
            img.noFill();
            // apply styling if passed in, pass in img instance
            if (styling) { styling(img); }
            // draw the complete shape
            self.drawShape(shapeName, 1, img);
            // return the image
            return img.get();
        };
    }
};

// }

// Images {

// Each property will become what it returns

var images = {
    backdrop: function() {
        // create image
        var img = createGraphics(width, height, P2D);
        img.background(240, 255, 255);
        noiseSeed(1);
        img.noStroke();
        // noise-y background
        for (var x = 0; x < width; x+=5) {
            for (var y = 0; y < height; y+=10) {
                img.fill(120, 199, 255, noise(x/100, y/100)*50);
                img.rect(x, y, noise(x/100, y/100)*30, random(10));
            }
        }
        // grid
        img.strokeWeight(2.5);
        img.stroke(176, 204, 255);
        for (var i = 0; i <= width; i+=Project.gridSize) {
            img.line(i, 0, i, height);
            img.line(0, i, width, i);
        }
        // return image
        return img.get();
    },
    pause: function() {
        var s = Project.gridSize * 6;
        var img = createGraphics(s, s, P2D);
        // draw the button
        function drawBtn() {
            img.rect(0, 0, s*0.7, s*0.7, 10);
            img.noFill();
            img.rect(s*0.15, 0, s*0.2, s*0.5, 5);
            img.rect(-s*0.15, 0, s*0.2, s*0.5, 5);
        }
        img.rectMode(CENTER);
        img.background(0, 0);
        img.translate(s/2, s/2);
        // bigger blue part
        img.pushMatrix();
        img.noStroke();
        img.fill(Project.clrs.lightblue, 120);
        img.scale(1.14);
        drawBtn();
        img.popMatrix();
        // stroke gradient
        img.noFill();
        var maxI = 8; // max stroke weight
        for (var i = maxI; i > 0; i-=0.5) {
            img.strokeWeight(i);
            // lerp between white and light blue
            img.stroke(lerpColor(color(255), Project.clrs.lightblue, i/maxI), 150);
            drawBtn();
        }
        // return image
        return img.get();
    },
    titleBlockLetters: ComplexShapes.createImage(
        // name of shape
        "titleBlockLetters",
        // styling
        function(inst) {
            inst.stroke(Project.clrs.darkblue);
            inst.strokeWeight(3);
        }
    ),
    abstractCursiveLetters: ComplexShapes.createImage(
        // name of shape
        "cursiveAbstract", 
        // styling
        function(inst) {
            inst.stroke(Project.clrs.darkblue);
            inst.strokeWeight(6);
        }
    ),
    playBtn: function() {
        var siz = 65;
        var img = createGraphics(siz*3, siz*3, P2D);
        img.background(0, 0);
        // translate to center
        img.translate(img.width/2, img.height/2);
        // rounded triangle
        img.fill(255);
        img.stroke(Project.clrs.lightblue);
        img.strokeWeight(5);
        img.beginShape();
        for (var i = 0; i <= 120*5; i+=120) {
            img.curveVertex(cos(i) * siz, sin(i) * siz);
        }
        img.endShape(CLOSE);
        // return image
        return img.get();
    },
    arrowBtn: function() {
        var siz = 30;
        var img = createGraphics(siz*2, siz*2, P2D);
        img.background(0, 0);
        img.translate(img.width*0.4, img.height/2);
        // small rounded arrow
        img.fill(255);
        img.stroke(Project.clrs.lightblue);
        img.strokeWeight(3);
        img.beginShape();
        for (var i = 0; i <= 5; i++) {
            var s = i === 3 ? siz : siz/2;
            img.curveVertex(cos(i*120) * s, sin(i*120) * s);
        }
        img.endShape(CLOSE);
        return img.get();
    },
    pizza: function() {
        var g = Project.gridSize, s = 10;
        var img = createGraphics(g*5, g*5, P2D);
        img.background(0, 0);
        // style
        img.angleMode = "degrees";
        img.noFill();
        img.stroke(255);
        img.strokeCap(ROUND);
        img.strokeWeight(1);
        // translate to center
        img.translate(img.width/2, img.height/2);
        // pizza
        img.triangle(g*0.5, g/2, -g*0.8, 0, g*0.5, -g/2);
        // pepperoni
        img.arc(0, -8, s, s, -22, 156);
        img.arc(-9, 3, s, s, -184, 44);
        img.ellipse(9, 4, s, s);
        // crust
        img.strokeWeight(5);
        img.line(g*0.5, g/2, g*0.5, -g/2);
        img.popMatrix();
        // return image
        return img.get();
    },
    lineCloseUpImg: function() {
        // trying to show "atoms" lined up, zoom in on line
        var a = -20;
        var w = Project.gridSize*6, h = Project.gridSize*4;
        var img = createGraphics(w, h, P2D);
        img.angleMode = "degrees";
        // backdrop (should already be loaded)
        img.image(images.backdrop, 0, 0);
        // outer edge
        img.stroke(Project.clrs.darkblue);
        img.strokeWeight(6);
        img.noFill();
        img.rect(0, 0, w, h, 15);
        // "atoms"
        img.translate(w/2, h/2);
        img.rotate(a);
        var s = 10;
        img.strokeWeight(s);
        for (var x = -w*0.6; x < w*0.6; x+=s+random(-2,2)) {
            img.point(x, random(-3, 3));
        }
        // return img and add property to be used later
        img = img.get();
        img.rotateBy = a;
        return img;
    },
    fakeCube: function() {
        // a cube made of three diamonds
        var img = createGraphics(Project.gridSize*3.5, Project.gridSize*3.5, P2D);
        var s = 60;
        img.rectMode(CENTER);
        img.angleMode = "degrees";
        img.background(0, 0);
        img.noStroke();
        // translate to center
        img.translate(img.width/2, img.height/2);
        // three rects
        for (var a = 0; a < 360; a+=120) {
            img.pushMatrix();
            // lerp color between white and light blue
            img.fill(lerpColor(color(255), Project.clrs.lightblue, map(a, 0, 360, 0.1, 0.8)));
            // rotate and translate to pos
            img.rotate(a + 34);
            img.translate(s*0.46, s*0.024);
            // scale to squish
            img.scale(0.56, 0.98);
            // orient
            img.rotate(41);
            // draw rect
            img.rect(-6, 0, s, s);
            img.popMatrix();
        }
        // return image
        return img.get();
    },
    earthDrawing: ComplexShapes.createImage(
        // name of shape
        "earthDrawing",
        // styling
        function(inst) {
            inst.strokeWeight(4);
            inst.stroke(255);
        }
    )
};

// }

// Buttons Object Type {

var Button = function() {
    
    // create a Button
    // x, y is position
    // either pass in img OR function drawBtn to draw button
    // onclick: function to call when button is clicked
    // s -> specify size or it will be width of img
    function Button(x, y, img, onclick, s, drawBtn) {
        this.x = x;
        this.y = y;
        if (img) { this.img = img; }
        this.s = s || img.width;
        this.onclick = onclick || function() {};
        if (drawBtn) { this.drawBtn = drawBtn; }
    }
    
    // display the button
    Button.prototype.display = function() {
        // if img, draw img, else call drawBtn
        if (this.img) {
            image(this.img, this.x, this.y, this.s, this.s);
        } else if (this.drawBtn) { this.drawBtn(); }
    };
    
    // check if a point is in the parameters of the button
    // pass in x, y
    Button.prototype.isPointInButton = function(x, y) {
        return dist(x, y, this.x, this.y) <= this.s/2;
    };
    
    // handle click
    Button.prototype.handleClick = function() {
        // if mouse over button, call onclick
        if (this.isPointInButton(mouseX, mouseY)) {
            this.onclick();
        }
    };
    
    // onhover to change cursor
    // only works if button is the only one in the scene
    Button.prototype.onhover = function() {
        if (this.isPointInButton(mouseX, mouseY)) {
            cursor(HAND);
        } else {
            cursor(ARROW);
        }
    };
    
    return Button;

}();

// }

// Animation System {

var Animation = {
    // is the animation paused?
    paused: false,
    // which scene in the animation
    sceneCount: 0,
    // timer at 0 when scene starts
    // at scene.duration when scene ends
    timer: 0,
    // handle transitions
    transition: {
        // are the slides transitioning right now?
        active: false,
        // duration of transition
        duration: 50,
        // transition timer, works same as Animation.timer
        timer: 0,
        // type of transition
        selectedType: null,
        // list of transition types [function, duration]
        transitionTypes: [
            // screen slowly turns blank, white
            [function() {
                var t = Animation.transition;
                image(t.img, width/2, height/2);
                pushStyle();
                noStroke();
                rectMode(CENTER);
                fill(255, 255*sin(1.1*90/t.duration * t.timer));
                rect(width/2, height/2, width, height);
                popStyle();
            }, 250],
            // slide shrinks to nothing, then next scene starts
            [function() {
                var t = Animation.transition;
                pushMatrix();
                translate(width/2, height/2);
                scale(map(t.timer, 0, t.duration, 1, 0));
                image(t.img, 0, 0);
                popMatrix();
            }, 40]
        ],
        // initialize each transition
        init: function() {
            // set active to true, capture image
            this.active = true;
            this.img = get();
            // get types and scene number
            var types = this.transitionTypes;
            var ct = Animation.sceneCount;
            // find correct type according to ct
            var type = ct === Animation.scenes.length ? 0 : 1;
            // set selected to type's function
            this.selectedType = types[type][0];
            // set duration to type's duration
            this.duration = types[type][1];
        },
        // run the transition
        run: function() {
            // if transitioning
            if (this.active) {
                if (this.timer < this.duration) {
                    // call function for transition
                    this.selectedType();
                    // increment timer
                    this.timer++;
                } else {
                    // if timer exceeded duration
                    // reset timer, set active to false
                    this.timer = 0;
                    this.active = false;
                    // check if there are more scenes
                    var s = Animation.scenes[Animation.sceneCount];
                    if (!s) {
                        // if not, reset animation
                        Animation.reset();
                    } else {
                        // if so, and the next scene has 
                        // an init function, call it
                        if (s.init) { s.init(); }
                    }
                }
            }
        }
    },
    // initialize the next scene
    initNextScene: function() {
        this.timer = 0;
        this.paused = false;
        // start transition
        this.transition.init();
    },
    // called when entire animation is over
    reset: function() {
        // set counter back to 0
        this.sceneCount = 0;
        // scene is set to home
        Project.scene = "home";
    },
    // called when user clicks and animation is playing
    handleClick: function() {
        // keep track of whether user clicked button
        var clickedBtn = false;
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].isPointInButton(mouseX,mouseY)) {
                this.buttons[i].handleClick();
                this.paused = false;
                clickedBtn = true;
                break;
            }
        }
        // if btn wasn't clicked and not transitioning
        if (!clickedBtn && !this.transition.active) {
            // toggle whether animation is paused
            this.paused = !this.paused;
        }
        // if paused, draw pause icon and stop looping draw
        if (this.paused) {
            image(images.pause, width/2, height/2);
            noLoop();
        } else { 
            // paused = false, start looping draw again
            loop(); 
        }
    },
    // run the animation
    run: function() {
        // get current scene from scenes array
        var currentScene = this.scenes[this.sceneCount];
        // if transition active, run it
        if (this.transition.active) { this.transition.run(); }
        else {
            // display scene and buttons
            currentScene.display();
            this.buttons.display();
            // increment timer
            this.timer++;
            // if timer exceeded scene's duration
            if (this.timer > currentScene.duration) {
                // increment scene count and init next scene
                this.sceneCount++;
                this.initNextScene();
            }
        }
    }
};

// create the animation buttons AFTER images loaded
// passed in as onComplete for Project.loadAssets
Animation.createButtons = function() {
    // define array of buttons for Animation and methods
    Animation.buttons = [];
    // display all buttons in array
    Animation.buttons.display = function() {
        for (var i = 0; i < this.length; i++) {
            this[i].display();
        }
    };
    // check if mouse over a button, and set cursor
    Animation.buttons.onhover = function() {
        var hovering = false;
        // check all buttons if mouse over one of them
        for (var i = 0; i < this.length; i++) {
            if (this[i].isPointInButton(mouseX, mouseY)) {
                hovering = true;
                break;
            }
        }
        // set cursor
        if (hovering) { cursor(HAND); }
            else { cursor(ARROW); }
    };
    // define buttons
    var x = Project.gridSize * 1.2, 
        y = height-Project.gridSize * 0.8;
    // next button
    Animation.buttons[0] = Button.new(
        // position
        width-x, y,
        // img
        images.arrowBtn,
        // onclick
        function() {
            Animation.sceneCount++;
            Animation.initNextScene();
        }
    );
    // back button
    Animation.buttons[1] = Button.new(
        // position
        x, y,
        // IIFE to draw flipped next arrow button and return img
        function() {
            var img = images.arrowBtn;
            var flipped = createGraphics(
                img.width, img.height, P2D
            );
            flipped.background(0, 0);
            flipped.imageMode(CENTER);
            flipped.translate(flipped.width/2, flipped.height/2);
            flipped.scale(-1, 0);
            flipped.image(img, 0, 0);
            return flipped.get();
        }(),
        // onclick
        function() {
            Animation.sceneCount--;
            Animation.initNextScene();
        }
    );
};

Animation.Scene = function() {
    
    // duration: number of frames for the scene
    // display: function to display scene
    // init (optional): function called ONCE during the program
    // init -> mainly use to set constants once
    function Scene(duration, display, init) {
        
        // self reference
        var self = this;
        this.duration = duration;
        this.display = display;
        if (init) { this.init = init; }
        
        // function to lerp between values according to
        // percent of current scene completed
        // returns the lerped value
        // mini, maxi: minimum and maximum for return value
        // start, end: num between 0 and 1 to specify when to start and end linear interpolation
        // before, after (optional): boolean, whether the value exists before or after start or end, respectively
        // counterType (optional): "sine" instead of regular lerp
        this.lerpValue = function(mini, maxi, start, end, before, after, counterType) {
            // default
            before = before === undefined ? false : before;
            after = after === undefined ? true : after;
            // percent of scene completed * duration
            start *= self.duration;
            end *= self.duration;
            // reference
            var dur = abs(end-start);
            var t = Animation.timer;
            // if timer greater than start
            if (t >= start) {
                // if timer less than end
                if (t <= end) {
                    // return value
                    var counter, x = t-start;
                    switch(counterType) {
                        case "sine": 
                            counter = sin(180/dur*x)*end;
                            break;
                        default: 
                            counter = t;
                    }
                    return map(counter, start, end, mini, maxi);
                } else if (after) {
                    // else if value exists after, return maxi
                    return maxi;
                }
            } else if (before) {
                // else if value exists before, return mini
                return mini;
            }
        };
        
        // function to draw item
        // x, y: position to translate to
        // drawFunct: use the custom parameters to draw the item 
        // next n params: custom parameters for drawFunct
        this.drawItem = function(x, y, drawFunct) {
            // get arguments after draw function
            var vals = Array.from(arguments).slice(3);
            // check if every argument after is undefined
            // an argument may be undefined because of lerpValue
            var checkpt = vals.every(function(value) {
                return value === undefined;
            });
            // if so, and there are values to begin with, return
            if (checkpt && vals.length !== 0) { return; }
            // otherwise, draw item
            pushStyle();
            pushMatrix();
            // translate to position
            translate(x || 0, y || 0);
            // call drawFunct with values
            drawFunct.apply(null, vals);
            popMatrix();
            popStyle();
        };
        
        // tools using drawItem
        this.tools = {
            // draw a line, pass in position, width,
            // start time and end time (percent)
            drawLine: function(x, y, w, start, end) {
                self.drawItem(x, y, function(w) {
                    stroke(Project.clrs.darkblue, 180);
                    strokeWeight(3);
                    line(0, 0, w, 0);
                }, self.lerpValue(0, w, start, end));
            },
            // draw a rect across the sceen
            // pass in position, height, start and end (percent)
            drawRectBanner: function(x, y, h, start, end) {
                self.drawItem(x, y, function(w) {
                    rectMode(CORNER);
                    noStroke();
                    fill(Project.clrs.darkblue);
                    rect(0, 0, w, h);
                }, self.lerpValue(0, width, start, end));
            },
            // draw text
            // pass in x, y **in terms of grid size
            // pass in start, end as percent
            // optional: siz string ("large" or "normal", clr
            drawText: function(txt, x, y, start, end, siz, clr) {
                var g = Project.gridSize;
                self.drawItem(
                    x*g, (y-0.3)*g, 
                    function(l) {
                        if (siz) { Project.text.set(siz); }
                        if (clr) { fill(clr); }
                        else { fill(Project.clrs.darkblue); }
                        text(txt.substr(0, l), 0, 0, 
                             width-g*2, height);
                    },
                    self.lerpValue(0, txt.length, start, end)
                );
            },
        };
        
        // set property only ONCE during the program
        // pass in name of property and value
        // return value (optional): if you pass in a function
        //   and you want the stored value to be what it returns
        this.setConstant = function(name, value, returnValue) {
            if (returnValue) { self[name] = value(); }
                else { self[name] = value; }
        };
        
        // for easy reference when creating scenes
        this.getReferences = function() {
            return {
                dur: self.duration,
                tim: Animation.timer,
                grid: Project.gridSize,
                txt: self.tools.drawText
            };
        };
    }
    
    return Scene;
    
}();

Animation.scenes = [
    // Intro - Abstract
    Animation.Scene.new(700, function() {
        // reference vars
        var ref = this.getReferences();
        var g = ref.grid;
        // text
        ref.txt("You may have heard that mathematics is \n\t\t\t\t\t\t\t\t\t\t\t\tABSTRACT,\na set of ideas that live purely in the mind.", 1, 1, 0.05, 0.4, "large");
        ref.txt("But what does that really mean?", 1, 12, 0.45, 0.7, "large");
        ref.txt("(Click the screen at any time to pause.)", 3.4, 17, 0.8, 0.9);
        // designs
        // line underlining "mind"
        this.tools.drawLine(g*10, g*11.2, g*3.5, 0.37, 0.40);
        // waves around abstract
        this.drawItem(0, g*6.5, function(w) {
            noFill();
            strokeWeight(1);
            stroke(Project.clrs.darkblue, 80);
            for (var f = 0; f <= g/2; f+=g/8) {
                // from left
                beginShape();
                for (var x = 0; x < w; x++) {
                    vertex(width-x, sin(90/g * (width-x))*f*2.1);
                }
                endShape();
                // from right
                beginShape();
                for (var x = 0; x < w; x++) {
                    vertex(x, -sin(90/g * x)*f*1.1);
                }
                endShape();
            }
        }, this.lerpValue(0, width, 0.23, 0.27));
    }),
    // Triangles Don't Exist
    Animation.Scene.new(900, function() {
        // reference vars
        var ref = this.getReferences();
        var g = ref.grid;
        // text
        ref.txt("What if I told you that triangles don't exist?", 1, 1, 0.03, 0.15);
        ref.txt(". . . That seems crazy. We all see triangles every day of our lives in many things around us.", 1, 3, 0.25, 0.5);
        ref.txt("But if you really think about it, they're not true, perfect triangles. You can say this about any other mathematically-defined shape as well.", 1, 11, 0.55, 0.83);
        ref.txt("Before we explore triangles, let's take a step back.", 1, 15, 0.85, 0.95);
        // blue rect
        this.tools.drawRectBanner(0, g*6, g*4, 0.17, 0.20);
        // pizza
        var self = this;
        this.drawItem(0, g*8, function(w) {
            // pizza row
            for (var x = g*2, i = 0; x < w-g; x+=g*2, i++) {
                pushMatrix();
                translate(x, 0);
                scale(i % 2 === 0 ? 1 : -1, 1);
                rotate(-62);
                image(images.pizza, 0, 0);
                popMatrix();
            }
            // pac man thing
            if (ref.tim/ref.dur > 0.65) {
                noStroke();
                fill(255);
                var theta = sin(ref.tim*25)*20+160, s = g*2.3;
                arc(w, 0, s, s, -theta, theta);
            }
        }, this.lerpValue(0, width, 0.3, 0.9, false, false, "sine"));
    }),
    // Points and Lines
    Animation.Scene.new(700, function() {
        // reference vars
        var ref = this.getReferences();
        var g = ref.grid;
        // text
        ref.txt("It's easy to see why a zero-dimensional point in space can't exist in our world. This dot is just a mere representation of one using pixels.", 1, 1, 0.05, 0.25);
        ref.txt("What about the one-dimensional, infinitely thin, infinitely long, and infinitely straight line? Of course this can't exist . . .", 1, 14, 0.37, 0.60);
        ref.txt("even at the molecular level.", 7.8, 16.1, 0.66, 0.77);
        // points, line
        this.drawItem(
            // position
            this.lerpValue(-g*2, width/2, 0.05, 0.1, true, true),
            this.lerpValue(g*7, g*9, 0.25, 0.3, true, true),
            // draw animated points and line
            function(s1, s2, w, imgSiz) {
                var img = images.lineCloseUpImg;
                var a = img.rotateBy;
                rotate(a);
                fill(Project.clrs.darkblue);
                noStroke();
                // if value exists, draw middle point
                if (s1) { ellipse(0, 0, s1, s1); }
                // if value exists, draw side points
                if (s2) {
                    ellipse(-80, 0, s2, s2);
                    ellipse(80, 0, s2, s2);
                }
                stroke(Project.clrs.darkblue);
                strokeWeight(2);
                // if value exists, draw line
                if (w) {
                    line(0, 0, w, 0);
                    line(0, 0, -w, 0);
                }
                // if value exists, draw image
                if (imgSiz) {
                    rotate(-a);
                    image(img, 0, 0, img.width*imgSiz, img.height*imgSiz);
                }
            },
            // s1 (size of middle point)
            this.lerpValue(g*3, g/3, 0.15, 0.2, true, true),
            // s2 (size of side points)
            this.lerpValue(0, g/3, 0.35, 0.40),
            // w (width of line connecting points)
            this.lerpValue(0, width*0.7, 0.5, 0.62),
            // size of lineCloseUpImg
            this.lerpValue(0, 1, 0.77, 0.90)
        );
    }),
    // Circles
    Animation.Scene.new(900, function() {
        // reference vars
        var ref = this.getReferences();
        var g = ref.grid;
        // text
        ref.txt("And what about the circle, defined as all points on a plane that lie a certain distance away from the center point?", 1, 1, 0.05, 0.28);
        ref.txt("The cookie in your hand, the analog clock on your wall, the pizza you ate last night--none of these fit the criteria of being perfectly flat, round, symmetrical, continuous, coplanar, etc.", 1, 13, 0.35, 0.85);
        // animations
        var r = g*2;
        pushMatrix();
        pushStyle();
        // rect banner
        this.tools.drawRectBanner(0, g*5, g*7, 0.3, 0.35);
        stroke(255);
        // translate to y pos
        translate(0, this.lerpValue(g*8.5, g*7.7, 0.83, 0.86, true, true));
        // cookie
        this.drawItem(
            // position
            g*4, 0, 
            function(percent) {
                // chocolate chips
                randomSeed(12);
                for (var i = 0; i < 18*percent; i++) {
                    pushMatrix();
                    rotate(random(360));
                    strokeWeight(random(3, 6));
                    point(random(r*0.22, r*0.89), 0);
                    popMatrix();
                }
                // cookie
                noFill();
                strokeWeight(3);
                beginShape();
                var step = 360/15;
                for (var a=0; a<=(360+step*2)*percent; a+=step) {
                    var d = r+-3*(a%(2*step)===0?sin(a*-8.4):cos(a*12));
                    curveVertex(cos(a) * d, sin(a) * d);
                }
                endShape();
            }, 
            this.lerpValue(0, 1, 0.38, 0.41) // percent
        );
        // clock
        this.drawItem(
            // position
            width/2, 0, 
            function(angle, percent) {
                if (angle) {
                    noFill();
                    // center
                    strokeWeight(8);
                    point(0, 0);
                    // face
                    strokeWeight(5);
                    arc(0, 0, r*2, r*2, -90, angle);
                    // tick marks
                    strokeWeight(2);
                    stroke(255, 150);
                    for (var a = -90; a < angle; a+=360/12) {
                        var cosA = cos(a);
                        var sinA = sin(a);
                        var w = a%90 === 0 ? r*0.72 : r*0.84;
                        line(cosA * r, sinA * r, 
                             cosA * w, sinA * w);
                    }
                }
                // hands
                if (percent) {
                    rotate(15);
                    stroke(255);
                    strokeWeight(5);
                    line(0, 0, r*0.33*percent, 0);
                    strokeWeight(3);
                    line(0, 0, 0, -r*0.7*percent);
                }
            }, 
            this.lerpValue(-90, 270, 0.43, 0.49), // angle
            this.lerpValue(0, 1, 0.48, 0.51) // percent
        );
        // pizza
        this.drawItem(
            // position
            g*16, 0, 
            function(percent, angle) {
                if (percent) {
                    noFill();
                    // circle
                    strokeWeight(4);
                    arc(0, 0, r*2, r*2, 0, percent*360);
                    strokeWeight(2);
                    arc(0, 0, r*1.75, r*1.75, -percent*360, 0);
                    // slices
                    strokeWeight(1.5);
                    for (var a = 0; a < 360; a+=360/10) {
                        line(0, 0, cos(a)*r*percent, 
                             sin(a)*r*percent); 
                    }
                }
                if (angle) {
                    // pepperoni
                    randomSeed(30);
                    stroke(255, 200);
                    strokeWeight(1);
                    for(var rot = 0; rot < 360; rot+=360/12) {
                        pushMatrix();
                        rotate(rot);
                        translate(random(r*0.34, r*0.85), 0);
                        if (random(1) < 0.5) { scale(-1); }
                        arc(0, 0, 10, 10, 0, angle);
                        popMatrix();
                    }
                }
            },
            this.lerpValue(0, 1, 0.53, 0.60), // percent
            this.lerpValue(0, 360, 0.58, 0.62) // angle
        );
        // message "fake circles"
        this.drawItem(
            // position
            width/2, g*3,
            function(opacity) {
                fill(Project.clrs.lightblue, opacity);
                textAlign(CENTER, CENTER);
                Project.text.set("large");
                text("Fake circles", 0, 0);
            },
            this.lerpValue(0, 200, 0.86, 0.90) // opacity
        );
        popStyle();
        popMatrix();
    }),
    // 2D Objects Don't Exist in Our Reality
    Animation.Scene.new(1000, 
        function() {
            // reference vars
            var ref = this.getReferences();
            var self = this;
            var g = ref.grid;
            // text
            ref.txt("Two-dimensional objects simply do not exist in our 3D world. Even if an object could have a depth of one atom, it still has three dimensions.", 1, 1, 0.05, 0.2);
            ref.txt("Which brings us back to triangles. You have never seen a real triangle, circle, or any geometric shape--just approximations which can never, ever come close to the mathematical definitions.", 1, 5, 0.23, 0.5);
            // banner
            this.tools.drawRectBanner(0, g*10, g*8, 0.53, 0.58);
            // graphics
            pushMatrix();
            pushStyle();
            textAlign(CENTER, CENTER);
            stroke(255);
            strokeWeight(2);
            noFill();
            translate(0, g*14.5);
            var s = g*4;
            // not a square
            this.drawItem(
                // position
                g*4, 0,
                function(percent) {
                    // text
                    self.shiftingText("Not a square.", percent);
                    // square shape
                    var w = s*percent;
                    for (var a = 0; a < 360; a+=90) {
                        pushMatrix();
                        rotate(a);
                        translate(s/2, 0);
                        rotate(90);
                        line(0, 0, w/2, 0);
                        line(0, 0, -w/2, 0);
                        popMatrix();
                    }
                },
                this.lerpValue(0, 1, 0.6, 0.65) // percent
            );
            // not a triangle
            this.drawItem(
                // position
                width/2, 0,
                function(percent) {
                    // text
                    self.shiftingText("Not a triangle.", percent);
                    // triangle
                    stroke(255, percent*255);
                    triangle(g*2, g*2, -g*2, g*2, 0, -g*2);
                },
                this.lerpValue(0, 1, 0.70, 0.75) // percent
            );
            // not a circle
            this.drawItem(
                g*16, 0,
                function(percent) {
                    // text
                    self.shiftingText("Not a circle.", percent);
                    // circle
                    arc(0, 0, s, s, -90, percent*360-90);
                },
                this.lerpValue(0, 1, 0.8, 0.85) // percent
            );
            popStyle();
            popMatrix();
        },
        // initialize
        function() {
            // set property ONCE for text (unique to scene)
            // function for displaying text
            this.setConstant(
                "shiftingText", 
                function(strng, percent) {
                    pushMatrix();
                    scale(percent);
                    text(strng, 0, -Project.gridSize*3);
                    popMatrix();
                }
            );
        }
    ),
    // Cube
    Animation.Scene.new(1000,
        function() {
            // reference vars
            var ref = this.getReferences();
            var self = this;
            var g = ref.grid;
            // text
            ref.txt("But we can extend this to 3D geometrical objects as well. For example, cubes also cannot exist in our world.", 1, 1, 0.05, 0.2);
            ref.txt("An object with seemingly straight edges and six identical flat faces may seem like a cube at the macro level.", 1, 10, 0.36, 0.5);
            ref.txt("However, zoom in close enough and you'll see that it's only a jumble of atoms and molecules lumped together in a plaintive attempt to approximate a cube.", 1, 14, 0.53, 0.75);
            // banner
            this.tools.drawRectBanner(0, g*5, g*4, 0.22, 0.25);
            // cube
            this.drawItem(width/2, g*7, 
                function(scl, distance) {
                    if (!scl) { return; }
                    scale(scl);
                    var img = images.fakeCube;
                    // draw side cubes
                    image(img, -img.width*1.5, 0);
                    image(img, img.width*1.5, 0);
                    // check if distance is defined
                    if (distance !== undefined) {
                        if (distance > 0) {
                            // draw cube pieces
                            var pcs = self.cubePieces;
                            for (var i = 0; i<pcs.length; i++) {
                                var p = pcs[i];
                                var a = atan2(p[2], p[1]);
                                a += distance/5;
                                var x = p[1] + cos(a)*distance,
                                    y = p[2] + sin(a)*distance;
                                image(p[0], x, y);
                            }
                        } else {
                            // draw full cube
                            image(img, 0, 0);
                        }
                    }
                },
                this.lerpValue(0, 1, 0.25, 0.33), // scl
                // distance
                this.lerpValue(0, 600, 0.80, 0.94, true, false)
            );
        },
        // initialize
        function() {
            this.setConstant("cubePieces", 
                function() {
                    // create an array of cube pieces images
                    var cube = images.fakeCube;
                    var w = cube.width, h = cube.height;
                    var img = createGraphics(w, h, P2D);
                    img.background(0, 0);
                    img.image(cube, 0, 0);
                    var output = [];
                    var step = w/10;
                    for (var x = 0; x < w; x+=step) {
                        for (var y = 0; y < h; y+=step) {
                            output.push([
                                img.get(x, y, step, step),
                                x + step/2 - w/2, 
                                y + step/2 - h/2
                            ]);
                        }
                    }
                    return output;
                }, true
            );
        }
    ),
    // Objects in Math are Abstract
    Animation.Scene.new(1000, function() {
        // reference vars
        var ref = this.getReferences();
        var g = ref.grid;
        // text
        ref.txt("All geometrically-defined objects only exist as representations in our minds. They are ancient beings which we cannot ever truly fathom.", 1, 1, 0.05, 0.45);
        ref.txt("That is, they are . . .", 1, 5, 0.5, 0.57, "large");
        // banner
        this.tools.drawRectBanner(0, g*8, g*9, 0.59, 0.63);
        // abstract
        this.drawItem(0, 0, 
            function(p, gray) {
                if (!p) { return; }
                // stars
                noFill();
                randomSeed(9);
                for (var i = 0; i < p*100; i++) { 
                    strokeWeight(random(1, 4));
                    stroke(gray, random(150, 210));
                    point(random(width), random(g*9, g*16.5));
                }
                // draw the word abstract
                translate(0, -g*4);
                strokeWeight(9);
                stroke(gray, 150);
                ComplexShapes.drawShape("cursiveAbstract", p);
                strokeWeight(4);
                stroke(gray);
                ComplexShapes.drawShape("cursiveAbstract", p);
            }, 
            this.lerpValue(0, 1, 0.67, 0.86), // p (percent)
            // gray
            this.lerpValue(170, 255, 0.89, 0.95, true, true)
        );
    }),
    // Intro to Numbers
    Animation.Scene.new(900, function() {
        // reference vars
        var ref = this.getReferences();
        var g = ref.grid;
        // text
        ref.txt("But wait! There's more.", 1, 1, 0.05, 0.12);
        ref.txt("One of the very first concepts you've been taught in the thing we call \"math education,\" a concept so familiar it has become second-nature and ingrained in your mind . . .", 1, 3, 0.15, 0.6);
        ref.txt("is also only a set of abstractions.", 1, 8, 0.65, 0.7);
        // graphics
        pushMatrix();
        translate(0, g*10);
        // banner
        this.tools.drawRectBanner(0, 0, g*8, 0.13, 0.16);
        // grid
        var maxW = g*18, maxH = g*6, s = g*3;
        this.drawItem(g, g,
            function(percent) {
                strokeWeight(2);
                stroke(255, 100);
                var w = maxW * percent;
                var h = maxH * percent;
                // horizontal lines
                for (var x = 0; x <= w; x+=s) {
                    line(x, 0, x, h);
                }
                // vertical lines
                for (var y = 0; y <= h; y+=s) {
                    line(0, y, w, y);
                }
            },
            this.lerpValue(0, 1, 0.3, 0.5) // percent
        );
        // dice and numbers
        this.drawItem(g*1, g*1, 
            function(w) {
                rectMode(CENTER);
                textAlign(CENTER, CENTER);
                textSize(50);
                var a;
                for (var x = 0, i = 1; x < w; x+=s, i++) {
                    // find opacity
                    if (w > (i-1)*s && w < i*s) {
                        a = map(w-x, 0, s, 0, 200);
                    } else {
                        a = 200;
                    }
                    pushMatrix();
                    translate(x + s/2, 0);
                    // dice
                    pushMatrix();
                    translate(0, s/2);
                    noFill();
                    strokeWeight(2);
                    stroke(255, a);
                    rect(0, 0, g*2, g*2, 15);
                    strokeWeight(8);
                    // dots
                    var dotDist = s/7;
                    if (i % 2 === 1) {
                        point(0, 0);
                    }
                    if (i >= 2) {
                        point(-dotDist, -dotDist);
                        point(dotDist, dotDist);
                    }
                    if (i >= 4) {
                        point(dotDist, -dotDist);
                        point(-dotDist, dotDist);
                    }
                    if (i === 6) {
                        point(-dotDist, 0);
                        point(dotDist, 0);
                    }
                    popMatrix();
                    // numbers
                    fill(255, a);
                    text(i, 0, g*4.5);
                    popMatrix();
                }
            },
            this.lerpValue(0, maxW, 0.55, 0.95) // w
        );
        popMatrix();
    }),
    // Why Numbers are Abstract
    Animation.Scene.new(1500, function() {
        // reference vars
        var ref = this.getReferences();
        var g = ref.grid;
        // text
        ref.txt("Numbers. Not only imaginary and complex numbers, but also the poorly-named \"real\" numbers.", 1, 1, 0.05, 0.15);
        ref.txt("You've never seen a one, or a three, or a 752. You've only experienced the ideas of them, conveyed as words, as marks on paper, or as an adjective.", 1, 4, 0.2, 0.55);
        ref.txt("Ask a person of ancient times, \"What is a three?\" and they wouldn't understand. They would respond, \"Three what?\" for three was just an adjective to them.", 1, 14, 0.65, 0.9);
        // banner
        this.tools.drawRectBanner(0, g*8, g*5, 0.16, 0.19);
        // graphics
        pushMatrix();
        translate(0, g*10.5);
        // speech bubble "as words"
        this.drawItem(g*4, 0,
            function(percent, num) {
                noFill();
                stroke(255);
                strokeWeight(2);
                scale(1.5);
                // arc of speech bubble
                arc(0, 0, g*3, g*2.2, 56, 332*percent + 56);
                // pointy thing
                pushMatrix();
                translate(45, 35);
                var s = 19 * percent;
                var a1 = 201;
                var a2 = -110;
                line(0, 0, cos(a1) * s, sin(a1) * s);
                line(0, 0, cos(a2) * s, sin(a2) * s);
                popMatrix();
                // dots in speech bubble
                strokeWeight(4);
                for (var i = 0; i < num; i++) {
                    point(15 * (i-1), 0);
                }
            },
            this.lerpValue(0, 1, 0.46, 0.49), // percent
            this.lerpValue(0, 3, 0.48, 0.50) // num of dots
        );
        // paper "as marks on paper"
        this.drawItem(width/2, 0,
            function(percent, percent2) {
                if (!percent) { return; }
                strokeWeight(3);
                stroke(255);
                var maxW = g*2.7, maxH = g*3.5;
                var w = maxW * percent, h = maxH * percent;
                for (var i = 0; i < 2; i++) {
                    // horizontal
                    pushMatrix();
                    translate(0, maxH * (i-0.5));
                    line(0, 0, w/2, 0);
                    line(0, 0, -w/2, 0);
                    popMatrix();
                    // vertical
                    pushMatrix();
                    translate(maxW * (i-0.5), 0);
                    line(0, 0, 0, h/2);
                    line(0, 0, 0, -h/2);
                    popMatrix();
                }
                if (percent2) {
                    strokeWeight(2);
                    stroke(255, 200);
                    pushMatrix();
                    translate(-maxW*0.35, -maxH*0.35);
                    for (var y = 0; y < maxH*0.7; y+=15) {
                        line(0, y, percent2*maxW*0.7, y);
                    }
                    popMatrix();
                }
            },
            this.lerpValue(0, 1, 0.49, 0.52), // percent
            this.lerpValue(0, 1, 0.51, 0.53) // percent2
        );
        // pizzas "as an adjective"
        this.drawItem(g*16, 0,
            function(percent) {
                var n = 3; // num pizzas
                // text
                fill(255, Math.min(255, percent * 300));
                textAlign(CENTER, CENTER);
                text(~~(percent * n), 0, -g);
                // pizza
                var img = images.pizza;
                for (var i = 0; i < percent * n; i++) {
                    pushMatrix();
                    var x = img.width * 0.3 * (i-1);
                    translate(x, g*0.7);
                    // if i = 0 && 0 < percent < 0.33
                    // if i = 1 && 0.33 < percent < 0.66
                    // if i = 2 && 0.66 < percent < 1
                    if (percent >= i/n && percent <= (i+1)/n) {
                        scale(map(percent, i/n, (i+1)/n, 0, 1));
                    }
                    rotate(-70);
                    image(img, 0, 0);
                    popMatrix();
                }
            },
            this.lerpValue(0, 1, 0.54, 0.62) // percent
        );
        popMatrix();
    }),
    // Conclusion
    Animation.Scene.new(1200, 
        function() {
            // reference vars
            var ref = this.getReferences();
            var g = ref.grid;
            // text at y pos txtY
            this.drawItem(
                0, 0,
                function(txtY) {
                    pushMatrix();
                    translate(0, txtY);
                    ref.txt("The first giant step mathematicians took which changed history forever was to transition from \"three\" as an adjective to \"three.\" Just three.", 1, 1, 0.05, 0.23);
                    ref.txt("From that point forward, mathematics was finally realized to have its most fundamental, imperative quality: abstractness.", 1, 5, 0.26, 0.46);
                    popMatrix();
                },
                // txtY
                this.lerpValue(0, g*-10, 0.50, 0.55, true, false)
            );
            // banner covering whole scene
            this.tools.drawRectBanner(0, 0, height, 0.52, 0.57);
            // final message
            ref.txt("Mathematics is an imaginary world. Yet, somehow, this world is the reason why so many things are possible in ours.", 1, 1, 0.59, 0.85, null, color(255));
            // earth drawing
            this.drawItem(0, 0, 
                function(percent, val) {
                    if (!percent) { return; }
                    // earth
                    if (percent < 1) {
                        // draw part of earth
                        strokeWeight(4);
                        stroke(255);
                        noFill();
                        ComplexShapes.drawShape("earthDrawing", percent);
                    } else {
                        // draw image of full earth
                        image(images.earthDrawing, width/2, height/2);
                    }
                    // stars
                    randomSeed(32);
                    pushMatrix();
                    translate(width/2, height/2);
                    for (var a = 50; a < percent*680; a++) {
                        var d = random(a);
                        if (d < 600) {
                            pushMatrix();
                            rotate(a+222);
                            strokeWeight(random(3.5));
                            stroke(255, random(d*0.4, d*2.1));
                            translate(d, val);
                            point(0, 0);
                            popMatrix();
                        } else { break; }
                    }
                    popMatrix();
                }, 
                this.lerpValue(0, 1, 0.63, 0.86), // percent
                // val
                this.lerpValue(0, 400, 0.90, 0.93, true, true)
            );
        }
    ),
];

// }

// Home Screen {

var HomeScreen = {
    // timer for drawing the word "abstract"
    timer: 0,
    display: function() {
        // draw title block letters
        image(images.titleBlockLetters, width/2, height/2);
        // draw play button
        this.playButton.display();
        // write abstract until percent = 1
        var percent = this.timer/200;
        if (percent < 1) {
            // draw part of word, then increment timer
            pushStyle();
            stroke(Project.clrs.darkblue);
            strokeWeight(6);
            noFill();
            ComplexShapes.drawShape("cursiveAbstract", percent);
            popStyle();
            this.timer++;
        } else {
            // draw image of full word
            image(images.abstractCursiveLetters, width/2, height/2);
        }
    },
};

HomeScreen.playButton = Button.new(
    // pos
    width/2, height/2, 
    null, 
    // onclick
    function() {
        HomeScreen.timer = 0;
        Project.scene = "playing";
        Animation.initNextScene();
        cursor(ARROW);
    },
    // size
    249, 
    // display
    function() {
        var rad = this.s/2;
        pushStyle();
        pushMatrix();
        translate(this.x, this.y);
        stroke(Project.clrs.lightblue);
        strokeWeight(5);
        fill(237, 252, 255);
        // wiggly circle on hover
        if (this.isPointInButton(mouseX, mouseY)) {
            beginShape();
            var s = 360/12;
            for (var a = 0; a <= 360+s; a+=s) {
                var r = a%s*2 === 0 ? sin(-a*4+frameCount*10) : cos(a*4+frameCount*10);
                r = r*10 + rad;
                curveVertex(cos(a) * r, sin(a) * r);
            }
            endShape(CLOSE);
        } else {
            // draw plain ellipse when not hovering
            ellipse(0, 0, rad*2, rad*2);
        }
        // draw rounded triangle
        image(images.playBtn, 0, 0);
        popStyle();
        popMatrix();
    }
);

// }

// Mouse Clicked {

function mouseClicked() {
    switch(Project.scene) {
        case "home":
            // if scene is home, call handleClick for play btn
            HomeScreen.playButton.handleClick();
            break;
        case "playing":
            // if playing, call handleClick for animation
            Animation.handleClick();
            break;
    }
}

// }

// Mouse Moved {

function mouseMoved() {
    switch(Project.scene) {
        case "home":
            // if scene is home, call onhover for play btn
            HomeScreen.playButton.onhover();
            break;
        case "playing":
            // if playing, call onhover for animation buttons
            Animation.buttons.onhover();
            break;
    }
}

// }

// Draw Function {

function draw() {
    try {
        // draw grid background
        if (Project.scene !== "load") {
            image(images.backdrop, width/2, height/2);
        }
        switch(Project.scene) {
            // set up the project once
            case "setup":
                Project.setup();
                break;
            // load assets once, then create animation buttons
            case "load":
                Project.loadAssets(
                    images, Animation.createButtons
                );
                break;
            // run the home screen
            case "home":
                HomeScreen.display();
                break;
            // run the animation
            case "playing":
                Animation.run();
                break;
        }
    } catch(err) {
        println(err);
    }
}

// }