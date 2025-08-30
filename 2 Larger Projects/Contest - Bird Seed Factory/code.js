frameRate(0);

/**
    NOV-DEC 2020 CONTEST - BIRD SEED FACTORY 

	1. FILL OUT THESE STATEMENTS

	I have been programming for 16 months
	I have completed 100 % of the JavaScript Intro course
	NOTE: I have attempted all the levels.
	
	Sources: MDN web docs, KA Algorithms course, Stack Overflow
*/

/** 2. SET YOUR DESIRED JOB LEVEL HERE  */
var LEVEL = 3; 





/**	LEVEL 1 - HOPPER MONITORING  */
/**	Input   = 3 item array of hopper contents values (0-100%)
	Output  = 3 item array of color values to indicate amount

	Requirements:
	Hoppers should show colored lights to indicate contents
		Green for 30%-100%
		Yellow for 5%-30%
		Red for 0%-5%
*/

var HOPPER_TESTING = false;			// quicker usage

// USE THESE COLOR VARIABLES
var Green  = color(0, 220, 0);		// 30-100%
var Yellow = color(255, 220, 96);	// 5-30%
var Red    = color(250, 0, 40);		// 0-5%

function hoppers(percentFull) {
    //the output array
	var output = [];
	//loop through the array
    for (var i = 0; i < percentFull.length; i++) {
        //how full the current hopper is
        var curr = percentFull[i];
        //if current is greater than 30 percent
        if (curr > 30) {
            //push Green to output
            output.push(Green);
        } else if (curr > 5) {
            //otherwise curr may be greater than 5, less than 30 percent
            //push Yellow to output
            output.push(Yellow);
        } else {
            //otherwise curr is less than 5 percent
            //push Red to output
            output[i].push(Red);
        }
    }
    //return the output array that was built up in the for loop
    return output;
}



/**	LEVEL 2 - BAGGER MACHINE  */
/**
	Input   = 12 item array of seed weight (0-2 lbs)
	Output  = 12 item array of T/F (1/0) values indicating 
	          release of bin contents into next bag

	Requirements:
	Determine which bins to release into next bag to fill
	the bag to at least 4.99 lbs, but no more than 5.02 lbs.
	Do not let any bin hold more than 2 lbs before being used
	(A bin over 2 lbs overflows and stops production for clean up)
	
*/

/*Creating own sorting function for more control*/
/*Since the number of bins is relatively small,
  insertion sort will be used. It will
  be used the same way as array.sort*/
/*We can pass in a compare function if we want
  more control. The function should return a
  difference of numbers, and if it is greater
  than zero, that is how insertionSort
  know that a is greater than b*/
function insertionSort(array, compareFunc) {
    
    /*Get a copy of the array*/
    var output = array.slice(0);
    
    /*If a compare function is not supplied,
      we'll make a default function that takes
      two values and returns the difference*/
    /*If the difference is greater than zero,
      we know that a is greater than b*/
    compareFunc = compareFunc || function(a, b) {
        return  a - b;
    };
    
    /*For each item in the array*/
    for (var i = 1; i < output.length; i++) { 
        /*Store value at current index,
          since the array will be changing*/
        var value = output[i];
        /*Loop through all the elements before index
          from right to left*/
        /*Loop until we get to the beginning or until
          the output[j] being looked at is less than
          or equal to than output[i]*/
        /*If output[j] is greater, we need to
          iterate through the loop again
          to find where to insert output[i]*/
        /*If output[j] is lesser or equal,
          we need to break out of the loop
          and "insert" the value
          output[i] that we're storing
          into output[j+1]*/
        for (var j = i-1; j >= 0 && compareFunc(output[j], value) > 0; j--) {
            /*Shift everything to the right by setting
              the value at j+1 to the value at j*/
            output[j+1] = output[j];
        }
        /*After the for loop is completed, j should be
          the index at which output[i] is less
          than or equal to output[j]*/
        /*if we had to go back to the beginning
          (if output[i] is the smallest value in
          the array) j would be negative one 
          because the for loop would last until 
          j>=0 is not satisfied.
          That means we need to shift the index
          we found to the right by 1. Put
          the stored value at this index.*/
        output[j+1] = value;
    }
    
    /*Return the sorted array*/
    return output;
}

var bagger = function(bins) {
    
    /*First, we fill an array
      the same length of the bins array
      with "false" (0)*/
    var output = Array(bins.length).fill(0);
    
    /*We find the sum of all the 
      values in the bins array*/
    var sum = 0;
    for (var i = 0; i < bins.length; i++) {
        sum += bins[i];
    }
    /*If the sum is less than 4.99,
      return output and don't go
      through the rest of the function*/
    if (sum < 4.99) {
        return output;
    }

    /*We get a copy of the bins array, sorted from
      greatest to least, so we can easily know
      which bins to select first (priority)*/
    /*insertionSort doesn't modify the original
      array; it returns a new array*/
    /*We pass in a compareFunc which is
      different from the default to 
      sort from greatest to least
      by returning b-a instead of a-b.
      If the difference is greater than 0, that
      means b is greater than a*/
    var sorted = insertionSort(bins, function(a, b) {
        return b - a;
    });
    
    /*Keep track of the sum of 
      the values in the bins that
      have been selected so far*/
    var amtFilled = 0;
    var index, curBin;
    /*Loop through the sorted array,
      from greatest to least seed weights*/
    for (var i = 0; i < sorted.length; i++) {
        /*the bin currently being looked at*/
        curBin = sorted[i];
        /*Test whether the amtFilled so
          far plus the current bin
          is less than 5.02*/
        if (amtFilled + curBin < 5.02) {
            /*If so, actually add
              that amount to the total*/
            amtFilled += curBin;
            /*Find the index that 
             curBin is at in the
             original bins array*/
            index = bins.indexOf(curBin);
            /*Set value in 
              the output array
              at this index 
              to true (1)*/
            output[index] = 1;
        }
        /*We shouldn't break out
          of the loop if this isn't
          satisfied because there is the chance
          that the next bin, which should
          have less seed, can actually
          fit within the 5.02 limit*/
    }
    
    /*Even though we went through the loop
      there is still the possibility
      that the amtFilled is less than
      4.99 (because there may be 
      no way to add another bin
      and also have the total
      not exceed 5.02 lbs)*/
    /*If the amtFilled is less
      than 4.99, return an 
      array filled with 0s,
      else return the output
      that was "built up" in the
      for loop*/
    if (amtFilled < 4.99) {
        return Array(bins.length).fill(0);
    } else {
        return output;
    }
    
};






/** LEVEL 3 - ROBOTIC ARM  */
/**	
	The robotic arm operates asynchronously in an event driven
	model. It takes time for the arm to perform its operations
	so each command has an invoke and completed function.
	Invoke is called to start the operation, and Completed is
	called after the operation has been performed.
	
	REQUIREMENTS:
	After initialization the arm must perform these steps in order:
		move to production line
		wait for next bag
		pick up bag
		move to pallet
		orient/position bag per stacking pattern
		release bag
		<release pallet when stacked full>
		<repeat list for next bag>
		
	STACKING
	Bags measure 20 inches wide by 25 inches tall by 6 inches deep.
	Starting from a 4 inch (high) pallet, bags are stacked 5 layers 
	high in alternating patterns for stability. See the display for
	orientation.
	
	The call to MoveToPallet must include the X, Y, Height and Theta
	values to position the bag over the pallet at the right height
	and orientation. The bags in a layer can be placed in any order,
	but the layer must be complete before moving to the next layer.
	When the pallet is full, call the invoke_ReleasePallet function
	to send the current pallet out and bring in the next one.
	
	CALIBRATION
	The robotic arm is calibrated to place 0,0 at the lower right
	corner of the pallet area.  X and Y values increase as indicated
	on the display.  All measurements are in inches.  Your code will
	begin by responding to the completed_Initialization callback.
*/


var arm = {         /** VARIABLES YOU CAN READ (NOT ALTER) */
	handA:0,		// product Angle (rotation)
	handX:0,		// product X (east/west)
	handY:0,		// product Y (north/south)
	handZ:0,		// product Z (height)
	product:0,		// product sensed (ready)
	pallet:0,		// pallet sensed (ready)
	engaged:0,		// hand has product
	
	/** ACTION METHODS YOU CAN CALL */
	invoke_MoveToLine:function(){},		// product conveyor line
	invoke_MoveToPallet:function(x, y, theta, height){},
	invoke_WaitOnProduct:function(){},	// waits for next bag
	invoke_SnatchProduct:function(){},	// grab/lift bag
	invoke_ReleaseProduct:function(){},	// drop bag 
	invoke_ReleasePallet:function(){},	// send to shrink wrap /
										// bring in new pallet
	
	/** ROBOT CALLBACKS YOU RESPOND TO */
	completed_Initialization: function() {
	    /*obj to keep track the placement of
	      the products*/
	    /*Define obj here since contest code
	      has to be in the functions*/
	    var palletHeight = 4;
	    arm.placement = {
            /*All the stats described above*/
            bagWidth: 20,
            bagHeight: 25,
            bagDepth: 6,
            cols: 5,
            rows: 4,
            layers: 5,
            palletHeight: palletHeight,
            /*How many have been placed
              on this layer?*/
            numPlaced: 0,
            /*Every time x or y is referenced, calculate
              based on what the other variables are and return*/
            get x() {
                /*x is the remainder of the total
                  number of bags placed divided by
                  the columns, scaled by the bag width*/
                return this.numPlaced % this.cols * this.bagWidth;
            },
            get y() {
                /*Divide numPlaced by cols, then take the
                  remainder of that divided by rows. Floor so that
                  every time numPlaced goes up by exactly cols,
                  the whole floored number goes up by one
                  to become the row number we are currently
                  on. Scale by bagHeight.*/
                return floor((this.numPlaced/this.cols) % this.rows) * this.bagHeight;
            },
            /*At what height/theta the
              product should go*/
            z: palletHeight, //init to pallet height
            theta: 0,
            /*Function to swap items
              for the next pattern*/
            swapPattern: function() {
                /*The next pattern is the previous
                  one but rotated, so swap dimensions
                  as well as the number of columns
                  and rows*/
                var h = this.bagHeight;
                this.bagHeight = this.bagWidth;
                this.bagWidth = h;
                var c = this.cols;
                this.cols = this.rows;
                this.rows = c;
            }
        };
	    /*after init, move the arm to conveyor belt*/
	    arm.invoke_MoveToLine();
	},
	completed_MoveToLine: function()    {
	    /*When arm has reached conveyor belt,
	      wait on the product*/
	    arm.invoke_WaitOnProduct();
	},
	completed_MoveToPallet: function()  {
	    /*After arm has moved to the pallet,
	      drop the product into its position*/
	    arm.invoke_ReleaseProduct();
	},
	completed_WaitOnProduct: function() {
	    /*Snatch the product after 
	      waiting is completed*/
        arm.invoke_SnatchProduct();
	},
	completed_SnatchProduct: function() {
	    /*Move to pallet only if it's there*/
	    if (arm.pallet) {
	        /*a reference to the object*/
	        var p = arm.placement;
	        /*Move to the correct position,
	          and orient correctly*/
	        /*x and y are calculated with getters*/
            arm.invoke_MoveToPallet(p.x, p.y, p.theta, p.z);
	    }
	},
	completed_ReleaseProduct: function() {
	    /*a reference to the object*/
	    var p = arm.placement;
	    /*Increment counter for 
	      how many are placed
	      in this layer*/
	    p.numPlaced++;
	    /*Also, if the num of products
	      placed equals cols*rows (which
	      is the total num in each layer)...*/
        if (p.numPlaced === p.cols*p.rows) {
            /*raise arm height by bagDepth*/
            p.z += p.bagDepth;
            /*Reset num of products on layer to 0*/
            p.numPlaced = 0;
            /*Check if new height is at the max, which
              is the number of layers times how
              deep the bags are plus the pallet height*/
            if (p.z === p.layers*p.bagDepth + p.palletHeight) {
                /*If so, the pallet is full, so release it*/
                arm.invoke_ReleasePallet();
            } else {
                /*Pallet is still being built up*/
                /*Rotate bag on its side (90 degrees)*/
                p.theta += 90;
                /*Swap the pattern*/
                p.swapPattern();
            }
        }
	    /*Move to line after the arm has 
	      placed the product*/
	    arm.invoke_MoveToLine();
	},
	completed_ReleasePallet: function() {
	    /*a reference to the object*/
	    var p = arm.placement;
	    /*Reset arm height to pallet height*/
	    p.z = p.palletHeight;
        /*If the number of layers is even, 
          swap the pattern (since the first pattern
          should be A) as well as reset the
          theta back to 0*/
        if (p.layers % 2 === 0) {
            p.swapPattern();
	        p.theta = 0;
        }
	}
};




/**  END OF CONTEST CODE */




// ***************************************
//		  BIRD SEED PRODUCTION
// ***************************************
//  Do not adjust code below this line!!!





















// NO, REALLY!  Do not alter any of the code below.






















/** You really shouldn't even be LOOKING at any of this!  */






















var hops = Array(3).fill(20);  // hoppers
var bins = Array(12).fill(0);  // bagger
var skid = [[], [], [], []];   // pallet	
var belt = [];				   // conveyor	
var prod = {seed:0, bags:0, skids:0, scrap:0}; // tally

var font = {
    sack:createFont('arial', 6),
	gauge:createFont('mono', 11),
	info:createFont('arial', 11)
};

var displayedWeight = 0;
var bldgImage = 0;
var bagImage = 0;
var clock = 0;
var pallet = 0;

var fastFill = [0,0,0];
var error = {
	fault:0,
	wait:0,
	show:0,
	down:[0, 0, 0],
	assign:function(i, v){
		this.down[i] += v;
		this.wait += v;
		this.show = v/10;
	},
	get seed(){},
	get bags(){},
	get skid(){},
	set seed(vlu){this.assign(0, vlu);},
	set bags(vlu){this.assign(1, vlu);},
	set skid(vlu){this.assign(2, vlu);},
};

var robot = {
	layer:0,
	step:0,
	bag:0,
	plan:0,
	count:0,
	skid:createGraphics(200, 200, P2D),
	slide:[],
	push:[],
	home:{handX:290, handY:350, handA:0, handZ:40, armX:230, armY:280},
	hand:{x:90, y:320, a:90, z:40, tx:200, ty:370, ta:0, tz:40},
	// arm x swing 180 - 230
	arm:{x:180, y:280, tx:200, ty:290},
	onComplete:function(){},
	execute:function(){
		if (this.arm.x===this.arm.tx && this.arm.y===this.arm.ty &&
		    this.hand.x===this.hand.tx && this.hand.y===this.hand.ty){
			robot.step = 0;
			this.hand.a = this.hand.ta;
			this.hand.z = this.hand.tz;
			arm.handA = this.hand.a;
			arm.handX = this.hand.x;
			arm.handY = this.hand.y;
			arm.handZ = this.hand.z;
			return true;
		}
		var pace = function(v){
			return constrain(v, -robot.step, robot.step);
		};
		var ax = (this.arm.tx-this.arm.x)/5;
		var ay = (this.arm.ty-this.arm.y)/5;
		var hx = (this.hand.tx-this.hand.x)/4;
		var hy = (this.hand.ty-this.hand.y)/4;
		if ((this.hand.x>170 && ax>0) || (this.hand.x<240 && ax<0)){
			this.arm.x += pace(ax);
			this.arm.y += pace(ay);
		}
		this.hand.x += pace(hx);
		this.hand.y += pace(hy);
		this.hand.a += (this.hand.ta-this.hand.a)/5;
		this.hand.z += (this.hand.tz-this.hand.z)/5;
		if (robot.step < 12){
			robot.step += 1.5;
		}
		if (abs(ax)<0.05 && abs(ay)<0.05){
			this.arm.x = this.arm.tx;
			this.arm.y = this.arm.ty;
		}
		if (abs(hx)<0.2 && abs(hy)<0.2){
			this.hand.x = this.hand.tx;
			this.hand.y = this.hand.ty;
		}
		arm.handX = this.hand.x;
		arm.handY = this.hand.y;
		arm.handZ = this.hand.z;
		arm.handA = this.hand.a;
	},
	slider:function(){
		// bring in
		if (this.plan<0){
			var done=true;
			for (var i=0; i<this.slide.length; i++){
				if (this.slide[i][1]<40){
					this.slide[i][1] += 5;
					done=false;
				}
				image(this.slide[i][0], this.slide[i][1], 270);
			}
			if (done){
				arm.pallet = true;
				this.plan = abs(this.plan);
				this.slide=[];
				this.skid.image(get(40, 270, 100, 100), 40, 70); 
			}
		}else{
			image(this.skid, 0, 200);
		}
		// send out
		if (this.push.length>0){
			this.push[1] -= 5;
			image(this.push[2], 40, 270);
			image(this.push[0], this.push[1], 270);
			if (this.push[1]<-100){
				robot.slide = [ [pallet.floor, 40] ];
				robot.slide.push([pallet.wood, -100], [pallet.planA, -260]);
				robot.plan = -1;
				this.push = [];
				arm.completed_ReleasePallet();
			}
		}
	}
};


// GRAPHICS
 
function drawHopper(x, pct, klr){
	strokeWeight(1);
	stroke(0);
	fill(192, 192, 200);
	rect(x, 40, 40, 60);
	rect(x+30, 43, 6, 54);
	rect(x+15, 100, 9, 4);
	fill(klr);
	ellipse(x+11, 90, 13, 13);
	stroke(55, 40);
	ellipse(x+11, 90, 10, 10);
	noStroke();
	fill(255, 240, 200);
	pct = constrain(pct, 0, 100);
	rect(x+31, 97, 5, -pct*0.52);
	if (pct>0){
		rect(x+18, 110, 182-x, 3);
		rect(x+18, 102, 4, 10);
	}
} 

function drawBag(x, y, o){
	if (bagImage){
		pushMatrix();
		translate(x, y);
		rotate(o);
		image(bagImage, -10, -12.5);
		popMatrix();
	}else{
		var b = createGraphics(21, 26, P2D);
		b.background(0, 0);	
		b.stroke(0);
		b.fill(250, 230, 200);
		b.rect(0, 0, 20, 25, 2);
		b.fill(200, 0, 30);
		b.noStroke();
		b.rect(1, 6, 19, 8);
		b.textFont(font.sack);
		b.fill(255);
		b.textAlign(CENTER, CENTER);
		b.text("ACME", 10, 10);
		bagImage = b.get();
		drawBag(x, y, o);
	}
}

function drawConveyor(){
	for (var i=belt.length; i--;){
		belt[i] = constrain(belt[i]+1.2, 200, 350-i*24);
		drawBag(290, belt[i], 0);
	}
	if (belt[0] === 350){
		arm.product = true;
	}
}

function drawArm(){
	// arm base
	fill(255, 220, 40);
	stroke(0);
	strokeWeight(1);
	rect(170, 220, 60, 60, 8);
	stroke(0, 60);
	ellipse(200, 250, 50, 50);
    
	// hand
	pushMatrix();
	translate(robot.hand.x, robot.hand.y);
	rotate(robot.hand.a);
	if (robot.bag){
		drawBag(0, 0, 0);
	}
	stroke(0, 60);
	fill(205, 20, 40);
	rect(-15, -5, 30, 10, 6);
	popMatrix();
	//arm
	pushMatrix();
	translate(robot.arm.x, robot.arm.y);
	var ang = atan2(robot.hand.y-robot.arm.y, robot.hand.x-robot.arm.x);
	var dst = dist(robot.hand.x, robot.hand.y, robot.arm.x, robot.arm.y);
	rotate(ang);
	fill(255, 220, 40);
	rect(-10, -10, dst+20, 20, 8);
	ellipse(dst, 0, 10, 10);
	for (var i=3; i<9; i++){
		line(i*dst/10, -10, i*dst/10, 10);
	}
	popMatrix();
	
	// base
	pushMatrix();
	translate(200, 250);
	var ang = atan2(robot.arm.y-250, robot.arm.x-200);
	var dst = dist(200, 250, robot.arm.x, robot.arm.y);
	rotate(ang);
	rect(-15, -15, dst+30, 30, 12);
	ellipse(0, 0, 20, 20);
	ellipse(dst, 0, 15, 15);
	popMatrix();
} 

function drawBuilding(){
	if (bldgImage){
		image(bldgImage, 0, 0);
	}else{
		background(220);
		// conveyors
		fill(192, 192, 200);
		stroke(90);
		strokeWeight(3);
		// seed
		rect(10, 115, 200, 10, 10);
		// bags
		stroke(0);
		strokeWeight(1);
		rect(265, 200, 50, 170);
		fill(50);
		rect(270, 200, 40, 165);
		// bagger
		fill(192, 192, 200);
		rect(200, 100, 180, 100);
		rect(340, 200, 40, 28);
		rect(342, 203, 36, 22);
		for (var y=3; y--;){
		for (var x=4;x--;){
			fill(182, 182, 188);
			rect(210+x*42, 110+y*28, 36, 22);
			fill(0);
			rect(212+x*42, 110+y*28, 32, 18);
			
		}}
		rect(344, 203, 32, 18);
		// pallete
		fill(255, 234, 0);
		noStroke();
		rect(30, 260, 120, 120);
		strokeWeight(6);
		stroke(0);
		for (var i=8; i--;){
		line(20, 250+i*20, 20+i*20, 250);
		line(160-i*20, 390, 160, 390-i*20);
		}
		noFill();
		stroke(220);
		strokeWeight(20);
		rect(20, 250, 140, 140);
		strokeWeight(1);
		stroke(0);
		fill(180);
		rect(40, 270, 99, 99); // pallet
		// arm base
		fill(255, 240, 40);
		rect(170, 220, 60, 60, 8);
		stroke(0, 60);
		ellipse(200, 250, 50, 50);
		//sign
		fill(0, 50);
		noStroke();
		rect(193, 23, 200, 62);
		stroke(0);
		fill(255);
		rect(190, 20, 200, 60);
		noStroke();
		textFont('mono', 8);
		fill(0);
		text("EST.  2020", 265, 58);
		fill(140);
		text("STACK PATTERN", 170, 310);
		fill(250, 0, 0);
		textFont('mono', 11);
		text("\u2190 X", 120, 390);
		text("\u2191\nY", 153, 356);
		ellipse(136, 366, 5, 5);
		fill(0, 100);
		text("A", 180, 335);
		text("B", 180, 365);
		noFill();
		stroke(160);
		for(var y=5; y--;){
		for(var x=4; x--;){
			rect(200+y*4, 320+x*5, 4, 5);
			rect(200+x*5, 350+y*4, 5, 4);
		}}
		robot.skid.image(get(0, 200, 200, 200), 0, 0);
		textFont('mono', 15);
		text("PRODUCTION LINE No. 1", 201, 75);
		text("PRODUCTION LINE No. 1", 202, 75);
		fill(80, 0, 20);
		textFont(createFont('impact',24), 24);
		text("ACME BIRD SEED CO.", 198, 47);
		fill(250, 60, 80);
		text("ACME BIRD SEED CO.", 196, 45);
		bldgImage = get();
	}
}	

function drawError(){
	noStroke();
	fill(0, 80);
	rect(15, 140, 142, 103);
	fill(255);
	stroke(0);
	strokeWeight(2);
	rect(15, 140, 140, 100);
	textFont(font.info, 11);
	textAlign(CENTER, CENTER);
	fill(0);
	text("SYSTEM MALFUNCTION", 86, 151);
	fill(255, 0, 0);
	text("SYSTEM MALFUNCTION", 85, 150);
	textSize(9);
	text("TOTAL DOWNTIME " + round(error.show) + " min", 85, 165);
	var msg = [];
	if (error.fault & 0xF){msg.push("HOPPER AREA");}
	if (error.fault & 3){msg.push("Input error");}
	if (error.fault & 4){msg.push("Light signals faulty");}
	if (error.fault & 8){msg.push("oops 8");}
	if (error.fault & 0xF0){msg.push("BAGGER AREA");}
	if (error.fault & 0x10){msg.push("Scale software error");}
	if (error.fault & 0x20){msg.push("scales overflow"); bins.fill(0);}
	if (error.fault & 0x40){msg.push("oops 64");}
	if (error.fault & 0x80){msg.push("oops 128");}
	if (error.fault & 0xF00){msg.push("STACKING AREA");}
	if (error.fault & 0x100){msg.push("Conveyor backed up");}
	if (error.fault & 0x200){msg.push("Pallet not ready");}
	if (error.fault & 0x400){msg.push("Out of range");}
	if (error.fault & 0x800){msg.push("Stack height error");}
	fill(0);
	textAlign(LEFT, BASELINE);
	text(msg.join('\n'), 30, 180, 130, 80);
	if (LEVEL===3){
		//image(robot.slide[0][0], 40, 270);
		image(robot.skid.get(0, 60, 200, 140), 0, 260);
	}
	if (error.fault & 0x200){
		if (robot.plan<0){
			for (var i=0; i<robot.slide.length; i++){
				image(robot.slide[i][0], robot.slide[i][1], 270);
			}
		}	
	}	
}

function drawClock(){
	textFont(font.info, 9);
	textAlign(CENTER, CENTER);
	fill(0);
	text("SHIFT CLOCK", 360, 320);
	strokeWeight(1);
	fill(255);
	ellipse(360, 350, 40, 40);
	strokeWeight(2);
	fill(255, 0, 40);
	arc(360, 350, 38, 38, 270, 270+clock);
}

function drawLights(){
	stroke(0);
	strokeWeight(1);
	for (var i=0; i<5; i++){
		fill((robot.layer>i)?Green:Red);
		ellipse(60+i*15, 250, 7, 7);
	}
}

function reports(){
	// hoppers
	if (!HOPPER_TESTING && LEVEL===1){
		prod.seed += 0.001;
		textFont(font.info);
		fill(255);
		ellipse(180, 140, 30, 20);
		fill(0);
		text(prod.seed.toFixed(1), 180, 140);
	}

	if (LEVEL===2){
		fill(255);
		ellipse(328, 214, 20, 20);
		fill(0);
		textFont(font.info);
		text(prod.bags, 328, 214);
		textAlign(RIGHT, BASELINE);
		textSize(9);
		text("SCRAP: " + prod.scrap, 380, 240);
	}
}
										
function gameOver(){
	background(180, 192, 200);
	noStroke();
	fill(0, 80);
	rect(100, 50, 203, 304);
	fill(255);
	stroke(0);
	strokeWeight(1);
	rect(100, 50, 200, 300);
	textFont(font.gauge, 15);
	textAlign(CENTER, CENTER);
	fill(0);
	text("ACME BIRD SEED\nPRODUCTION REPORT", 200, 70);
	textAlign(LEFT, BASELINE);
	text("SEED HOPPERS", 120, 120);
	text("BAGGING", 120, 180);
	text("STAGING", 120, 240);
	text("TOTAL PRODUCTION:", 120, 300);
	textSize(9);
	noStroke();
	for (var i=3; i--;){
		fill(0, 20);
		rect(120, 125+i*60, 150, 30);
		fill(0);
		textAlign(LEFT, BASELINE);
		text("RUNTIME:\nEFFICIENCY:", 130, 138+i*60);
		textAlign(RIGHT, BASELINE);
		var hr = (16000-error.down[i])/2000;
		var ef = (100*hr/8).toFixed(1);
		text(hr.toFixed(1) + " hrs\n" + ef + "%", 260, 138+i*60);
	}
	text("2,000", 260, 320);
	textAlign(LEFT, BASELINE);
	text("5 lbs bags", 130, 320);
	noLoop();
}

pallet = function(){
    var img = {};
	var gfx = createGraphics(100, 100, P2D);
	gfx.background(0, 0);
	gfx.stroke(90);
	gfx.fill(250, 235, 220);
	gfx.rect(0, 0, 5, 99);
	gfx.rect(94, 0, 5, 99);
	gfx.rect(48, 0, 5, 99);
	for (var i=6; i--;){
	    gfx.rect(0, 2+i*17, 99, 10);
	}
	img.wood = gfx.get();
	gfx.background(0, 0);
	gfx.textFont(createFont('arial black', 80));
	gfx.textAlign(CENTER, CENTER);
	gfx.fill(225, 220);
	gfx.rect(0, 0, 99, 99);
	gfx.fill(0, 30);
	gfx.text("A", 49, 49);
	gfx.stroke(0, 120);
	for (var i=5; i--;){
		gfx.line(0, i*25, 99, i*25);
		gfx.line(i*20, 0, i*20, 99);
	}
	img.planA = gfx.get();
	gfx.background(0, 0);
	gfx.fill(225, 220);
	gfx.rect(0, 0, 99, 99);
	gfx.fill(0, 30);
	gfx.text("B", 49, 49);
	gfx.stroke(0, 120);
	for (var i=5; i--;){
		gfx.line(0, i*20, 99, i*20);
		gfx.line(i*25, 0, i*25, 99);
	}
	img.planB = gfx.get();
	pallet = img;
};

// graphics set up
pallet();
drawBuilding();
pallet.floor = get(40, 270, 100, 100);




// HOOK USER CODE

function call_Hoppers(){
	var klrs = [Red, Yellow, Green];
	// adj hopper levels
	hops[0] = constrain(hops[0] - random(0.005, 0.015) + fastFill[0], 0, 100);
	hops[1] = constrain(hops[1] - random(0.005, 0.01) + fastFill[1], 0, 100);
	hops[2] = constrain(hops[2] - random(0.005, 0.02) + fastFill[2], 0, 100);
	if (HOPPER_TESTING){
		hops[0] += -1 + fastFill[0]*10;
		hops[1] += -1 + fastFill[1]*10;
		hops[2] += -1 + fastFill[2]*10;
	}
	// get user reply
	var usr = hoppers(hops.slice());
	// reply test (type)
	var typeOK = Array.isArray(usr);
	if (typeOK && usr.length===3){
		if (klrs.includes(usr[0]) &&
			      klrs.includes(usr[1]) &&
			      klrs.includes(usr[2])){
		}else{
			typeOK = false;
			error.fault |= 2;	// wrong color
			error.seed = 200;
		}
	}else{
		typeOK = false;
		error.fault |= 1;		// wrong type
		error.seed = 200;
	}
	// reply test (value)
	var valueOK = false;
	if (typeOK){
		valueOK = true;
		for (var i=3; i--;){
			if (hops[i]<=5){
				valueOK &= (usr[i] === Red);
			}else if (hops[i]>=5 && hops[i]<=30){
				valueOK &= (usr[i] === Yellow);
			}else if (hops[i]>=30){
				valueOK &= (usr[i] === Green);
			}
		}
		if (!valueOK){
			error.fault |= 4; // wrong indication
			error.seed = 200;
		}
	}
	
	if (typeOK && valueOK){
		// continue
		for (var i=3; i--;){
			if (usr[i] === Red){
				fastFill[i]=0.5;
			}else if (hops[i]>random(90, 99)){
				fastFill[i] = 0;
			}else if (hops[i]<20 && floor(random(100))===71){
				fastFill[i]=0.5;
			}
			drawHopper(20+i*50, hops[i], usr[i]); 
		}
		if (!HOPPER_TESTING){
			prod.seed += 0.001;
			textFont(font.info);
			fill(255);
			ellipse(180, 140, 30, 20);
			fill(0);
			text(prod.seed.toFixed(1), 180, 140);
		}
	}else{
		// flash
		var flash = floor(frameCount/20)&1;
		for (var i=3; i--;){
			drawHopper(20+i*50, hops[i], flash*Yellow);
		}
	}	
}

function call_Bagger(){
	// more seed
	textFont(font.gauge);
	textAlign(CENTER, CENTER);
	fill(0, 200, 60);
	for (var i=bins.length; i--;){
		bins[i] += random(0.004, 0.007);
		if (bins[i]>1.99){
			bins[i] = 0;
			error.fault |= 32;
			error.bags = 800;
		}
		var x = i%4;
		var y = floor(i/4);
		fill(bins[i]<2 ? Green : Red);
		text(bins[i].toFixed(2), 228+x*42, 119+y*28);
	}
	// bagger scale
	if (displayedWeight<4.99 || displayedWeight>5.02){fill(255, 0, 60);}
	text(displayedWeight.toFixed(3), 360, 212);
	// get user reply
	var usr = bagger(bins.slice());
	// reply test (type)
	var typeOK = Array.isArray(usr) && usr.length===12;
	var value = 0;
	if (typeOK){
		// fill bag
		for (var i=12; i--;){
			if (usr[i]>0){
				value += bins[i];
				bins[i] = 0;
			}
		}
		if (value>0){
			if (value>4.99 && value<5.02){
				prod.bags += 1;
			}else{
				prod.scrap += 1;
			}	
			displayedWeight = value;
			belt.push(215);
			if (belt.length>5){
				error.fault = 0x100;  // conveyor full
				error.skid = 300;
			}
			return value;
		}
	}else{
		typeOK = false;
		error.fault |= 0x10;		// wrong type
		error.bags = 200;
	}
}

var moveToStaging=function(){
		if (!arm.pallet){
			robot.hand.tx = 240;
			robot.hand.ty = 340;
			robot.onComplete = arm.completed_SnatchProduct;
		}else{
			arm.completed_SnatchProduct();
		}
};
	
// robot arm overrides
arm.invoke_MoveToLine=function(){
		robot.hand.tx = robot.home.handX;
		robot.hand.ty = robot.home.handY;
		robot.hand.ta = robot.home.handA;
		robot.hand.tz = robot.home.handZ;
		robot.arm.tx = robot.home.armX;
		robot.arm.ty = robot.home.armY;
		robot.onComplete = arm.completed_MoveToLine;
};		// product conveyor line
arm.invoke_MoveToPallet=function(x, y, a, z){
		if (x<-20 || x>100 || y<-20 || y>100){
			error.fault = 0x400;
			error.skid = 200;
			return;
		}
		robot.hand.tx = 129-x+(robot.plan===1);
		robot.hand.ty = 360-y-(robot.plan===1)*3;
		robot.hand.ta = a;
		robot.hand.tz = z;
		robot.arm.tx = 180;
		robot.arm.ty = 280;
		robot.onComplete = arm.completed_MoveToPallet;
};  // pallet stacking area
arm.invoke_WaitOnProduct=function(){
	if(arm.product || arm.engaged){
		arm.completed_WaitOnProduct();
	}else{
		robot.onComplete = arm.invoke_WaitOnProduct;
	}
	
};	// waits for next bag
arm.invoke_SnatchProduct=function(){
		if (arm.engaged){
			moveToStaging();
		}else if (arm.product){
			robot.bag = 1;
			belt.shift();
			arm.engaged = true;
			arm.product = false;
			moveToStaging();
		}
		
};	// grab/lift bag
arm.invoke_ReleaseProduct=function(){
		if (arm.engaged && robot.plan<0){
			error.fault = 0x200;
			error.skid = 100;
			robot.count = 0;
		}
		var hgt = (robot.layer+2)*6;
		if (robot.pallet && (robot.layer>4 || abs(robot.hand.z - hgt)>2)){
			error.fault = 0x800;
			error.skid = 300;
			robot.count = 0;
		}
		// drop bag
		robot.bag = 0;
		robot.count += arm.engaged;
		arm.engaged = false;
		robot.skid.pushMatrix();
		robot.skid.translate(robot.hand.x, robot.hand.y-200);
		robot.skid.rotate(PI*robot.hand.a/180);
		robot.skid.image(bagImage, -10, -12.5);
		robot.skid.popMatrix();
		arm.completed_ReleaseProduct();
		
		// new layer
		if (robot.count === 20){
			robot.layer += 1;
			robot.count = 0;
			if (robot.layer<5){
				var cvr = (robot.plan===1)?pallet.planB:pallet.planA;
				robot.plan = -abs(robot.plan^3);
				robot.slide = [ [robot.skid.get(40, 70, 101, 101), 40],
                                [cvr, -150	]];
			}
		}
};	// drop bag 
arm.invoke_ReleasePallet=function(){
	if (robot.layer !== 4){return;}
	robot.push = [robot.skid.get(39, 70, 101, 100), 39, pallet.floor];
	robot.plan = -1;
	robot.slide = [ [pallet.floor, 40] ];
	robot.slide.push([pallet.wood, -300], [pallet.planA, -460]);
	arm.pallet = false;
	robot.layer = 0;
	robot.count = 0;
};	


// jshint ignore:start
// (complier directive)
if (LEVEL < 3){

	function moveToLine(){
		robot.hand.tx = robot.home.handX;
		robot.hand.ty = robot.home.handY;
		robot.hand.ta = robot.home.handA;
		robot.arm.tx = robot.home.armX;
		robot.arm.ty = robot.home.armY;
		
	}
	function moveToPallet(){
		robot.hand.tx = 90;
		robot.hand.ty = 320;
		robot.hand.ta = 90;
		robot.arm.tx = 180;
		robot.arm.ty = 280;
	}
	function drop(){
		robot.bag = 0;
		arm.completed_Initialization();
	}
	function snatch(){
		if (belt[0] === 350){
			robot.bag = 1;
			belt.shift();
			moveToPallet();
			robot.onComplete = drop;
		}
	}
	
	drawLights = function(){};
	if (LEVEL===0){drawClock = drawLights;}
	arm.completed_Initialization=function(){
		moveToLine();
		robot.onComplete = snatch;
	};
	arm.completed_MoveToLine=function()    {};
	arm.completed_MoveToPallet=function() {};
	arm.completed_WaitOnProduct=function() {};
	arm.completed_SnatchProduct=function() {};
	arm.completed_ReleaseProduct=function(){};
	arm.completed_ReleasePallet=function() {};
}else{
	robot.slide = [ [pallet.floor, 40] ];
	robot.slide.push([pallet.wood, -100], [pallet.planA, -260]);
	robot.plan = -1;
}
// jshint ignore:end

// start up robotic arm
robot.onComplete = arm.completed_Initialization;

// PRODUCTION LINE
										
function process_Error(){
	drawError();
	error.wait--;
	if (error.wait<0){ 
		if (error.fault&0x100){belt = [];}
		if (error.fault&0x200){robot.count=0;}
		error.fault = 0;
	}
	drawHopper(20, 0, 0);
	drawHopper(70, 0, 0);
	drawHopper(120, 0, 0);
	drawConveyor();
	drawArm();
	drawLights();
	drawClock();
}

function fake_Hoppers(){
	drawHopper(20, 90, Green);
	drawHopper(70, 90, Green);
	drawHopper(120, 90, Green);
}

function fake_Bagger(){
	textFont(font.gauge);
	textAlign(CENTER, CENTER);
	fill(0, 200, 60);
	var sum = 0;
	for (var i=12; i--;){
		bins[i] += random(0.004, 0.007);
		sum += bins[i];
		var x = i%4;
		var y = floor(i/4);
		fill(bins[i]<2 ? Green : Red);
		text(bins[i].toFixed(2), 228+x*42, 119+y*28);
	}
	// bagger scale
	if (displayedWeight<4.99 || displayedWeight>5.02){fill(255, 0, 60);}
	text(displayedWeight.toFixed(3), 360, 212);
	if (sum>5){
		bins.fill(0);
		displayedWeight = 5;
		belt.push(215);
		if (belt.length>5){
			error.fault = 0x100;  // conveyor full
			error.skid = 300;
		}
	}
}										

draw = function(){
	drawBuilding();

	clock += 0.01;
	if (clock>360){
		gameOver();
		return;
	}
	if (error.fault>0){
		process_Error();
		return;
	}
		
	// user code	
	if (LEVEL===1){	
		call_Hoppers();
	}else{
		fake_Hoppers();
	}
	if (LEVEL===2){
		call_Bagger();
	}else{
		fake_Bagger();
	}
	
	// robot stuff
	if (robot.execute()){
		robot.onComplete();
	}
	robot.slider();

	// screen updates
	reports();
	drawConveyor();
	drawArm();
	drawClock();
	drawLights();
};



