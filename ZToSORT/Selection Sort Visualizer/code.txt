//squares {
noStroke();
fill(135, 0, 0);
rect(0, 0, width/2, height/2); //red
fill(6, 50, 117);
rect(width/2, 0, width/2, height/2); //blue
fill(7, 84, 7);
rect(0, height/2, width/2, height/2); //green
fill(153, 156, 0);
rect(width/2, height/2, width/2, height/2);
//}

//Display array
var displayArray = function(array, x, y) {
    textFont(createFont("monospace")); //set font
    fill(255); //white text
    //loop through array
    for (var j = 0; j < array.length; j++) {
        text(array[j], x+j*39, y); //display the value at the x and y position
    }
};

//Selection sort
var swap = function(array, firstIndex, secondIndex) {
    var temp = array[firstIndex]; //store first value
    array[firstIndex] = array[secondIndex]; //set first value to be second value
    array[secondIndex] = temp; //set second value to be the first value, stored in temp
};

//Find the index of the min number in the subarray
var indexOfMinimum = function(array, startIndex) {

    var minValue = array[startIndex]; //value of startIndex
    var minIndex = startIndex; //startIndex
    
    //loop through subarray 
    for(var i = minIndex + 1; i < array.length; i++) {
        //if there is a value in the subarray less than the current minValue
        if(array[i] < minValue) {
            minIndex = i; //change to new minimum index
            minValue = array[i]; //change to new min value found
        }
    } 
    //When for loop is complete, the next min number in the subarray should be returned
    return minIndex;
}; 

//a function to sort an array
var selectionSort = function(array, x, y) {
    stroke(255);
    strokeWeight(2);
    var minIndex;
    //loop through array
    for (var i = 0; i < array.length; i++) {
        minIndex = indexOfMinimum(array, i); //find index of min value for every subarray
        displayArray(array, x, i*39+y); //display the array
        //if i is not on the last iteration
        if (i !== array.length - 1) {
            //line from minIndex to i on next row
            line(minIndex*39+x+3, i*39+y+3, i*39+x+3, (i+1)*39+y-12);
            noFill();
            ellipse(minIndex*39+x+3, i*39+y+-4, 15, 15); //circle around minIndex found
            ellipse(i*39+x+3, (i+1)*39+y-4, 15, 15); //circle where minIndex goes (next row)
        }
        swap(array, i, minIndex); //swap i in array with minIndex
    }
};


//Arrays, and selection sort for each

var redArray = [1, 7, 5, 3, 6];
selectionSort(redArray, 13, 23);

var blueArray = [9, 8, 7, 6, 5];
selectionSort(blueArray, 213, 23);

var greenArray = [1, 3, 5, 5, 3];
selectionSort(greenArray, 13, 223);

var yellowArray = [0, 1, 2, 4, 3];
selectionSort(yellowArray, 213, 223);
