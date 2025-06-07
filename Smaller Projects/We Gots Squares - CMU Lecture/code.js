// https://www.youtube.com/watch?v=PhxV_JrXeVk

translate(width/2, height/2);

function drawCube(cam) {
    
    var vertices = [
      [1, 1, 1], 
      [-1, 1, 1], 
      [1, -1, 1], 
      [-1, -1, 1], 
      [1, 1, -1],
      [-1, 1, -1],
      [1, -1, -1],
      [-1, -1, -1]
    ];
    
    // for (var i = 0; i < vertices.length; i++) {
    //   println(i + " " + vertices[i]);
    // }
    
    var edges = [
      [0, 1], [2, 3], [4, 5], [6, 7],
      [0, 2], [1, 3], [4, 6], [5, 7],
      [0, 4], [2, 6], [1, 5], [3, 7]
    ];
    
    for (var i = 0; i < edges.length; i++) {
      
      var e = edges[i];
      var v0 = vertices[e[0]];
      var v1 = vertices[e[1]];
      
      var x0 = (v0[0] - cam[0]) / (v0[2] - cam[2]);
      var y0 = (v0[1] - cam[1]) / (v0[2] - cam[2]);
      var x1 = (v1[0] - cam[0]) / (v1[2] - cam[2]);
      var y1 = (v1[1] - cam[1]) / (v1[2] - cam[2]);
      
      line(x0 * width, y0 * height, x1 * width, y1 * height);
      
    }
    
}

draw = function() {
    background(0);
    stroke(255, 200);
    randomSeed(4);
    for (var i = 0; i < 200; i++) {
        var eye = [random(-16, 16), random(-16, 16), random(1, frameCount%300+1)];
        drawCube(eye);
    }
};

