//note: I did this along with the KA tutorial on generating 3D Shapes

var backgroundColor = color(0, 2, 48);
var nodeSize = 10;
var edgeColor = color(mouseX, mouseY, 162);

var createCuboid = function(x, y, z, w, h, d) {
var nodes = [
    [x, y, z], //downstairs top left     0
    [x, y, z+d], //upstairs top left     1
    [x, y+h, z], //down bottom left      2
    [x, y+h, z+d], //up bottom left      3
    [x+w, y, z], //down top right        4
    [x+w, y, z+d], //up top right        5
    [x+w, y+h, z], //down bottom right   6
    [x+w, y+h, z+d] //up bottom right    7
    
];

var nodeColors = [];

for (var i = 0; i < nodes.length; i++) {
    var randomColor = color(random(0, 255), random(0, 255), random(0, 255));
    nodeColors.push(randomColor);
}

var edges = [
    [0, 1], 
    [1, 3], 
    [3, 2], 
    [2, 0], 
    [4, 5], 
    [5, 7], 
    [7, 6], 
    [6, 4], 
    [0, 4], 
    [1, 5], 
    [2, 6], 
    [3, 7]
    
];

var width = w;
var height = h;
var depth = d;

return{'nodes': nodes, 'edges': edges, 'nodeColors': nodeColors, 'width': width, 'height': height, "depth": depth};
};

/***********************
 * CREATE OBJECTS HERE
************************/
var object1 = createCuboid(0, 0, 0, 150, 150, 150);
var object2 = createCuboid(37, -75, 37, 74, 74, 74);
var object3 = createCuboid(60, -106, 60, 30, 30, 30);

var objects = [object1, object2, object3];

var nodes = object1.nodes;
var edges = object1.edges;
var nodeColors = object1.nodeColors;

var rotateZ3D = function(theta, nodes) {
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x*cosTheta - y*sinTheta;
        node[1] = y*cosTheta + x*sinTheta;
    }
};

var rotateX3D = function(theta, nodes) {
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y*cosTheta - z*sinTheta;
        node[2] = z*cosTheta + y*sinTheta;
    }
};

var rotateY3D = function(theta, nodes) {
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x*cosTheta - z*sinTheta;
        node[2] = z*cosTheta + x*sinTheta;
    }
};

   for (var objectNum = 0; objectNum < objects.length; objectNum++) {
        var nodes = objects[objectNum].nodes;
        rotateX3D(30, nodes);
        rotateY3D(30, nodes);
    }

draw = function() {
    var nodes, edges;
    
    strokeWeight(4);
    background(backgroundColor);
    
    pushMatrix();
    translate(200, 200);
    
    stroke(edgeColor);
    for (var shapeNum = 0; shapeNum < objects.length; shapeNum++) {
        nodes = objects[shapeNum].nodes;
        edges = objects[shapeNum].edges;

        for (var e = 0; e < edges.length; e++) {
            var n0 = edges[e][0];
            var n1 = edges[e][1];
            var node0 = nodes[n0];
            var node1 = nodes[n1];
            line(node0[0], node0[1], node1[0], node1[1]);
        }   
    }
    noStroke();
    for (var objectNum = 0; objectNum < objects.length; objectNum++) {
        var nodes = objects[objectNum].nodes;
        for (var n = 0; n < nodes.length; n++) {
            var node = nodes[n];
            fill(nodeColors[n]);
            ellipse(node[0], node[1], nodeSize, nodeSize);
            fill(255, 255, 255, 50);
            
        }
        
    }

    popMatrix();
    
};

mouseDragged = function() {
    var dx = mouseX - pmouseX;
    var dy = mouseY - pmouseY;
    for (var objectNum = 0; objectNum < objects.length; objectNum++) {
        var nodes = objects[objectNum].nodes;
        edgeColor = color(mouseX, mouseY, 162);
        rotateY3D(dx, nodes);
        rotateX3D(dy, nodes);
    }
    
};