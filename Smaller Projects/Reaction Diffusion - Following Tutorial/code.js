<!DOCTYPE html>
<html>
    <head>
    
      <!--
      
      https://www.youtube.com/watch?v=BV9ny785UNc
      
      click to add chemical B
      
      idk why that black square keeps popping up
      
      -->
    
        <meta charset="utf-8">
        <title>Reaction Diffusion (feat: forgetting HTML and CSS)</title>
        <!--p5.js source-->
        <script src="https://cdn.jsdelivr.net/gh/Steffan153/files/p5-ka.js"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: black;
            color: white;
          }
          canvas {
            width: 400px !important;
            height: 400px !important;
          }
          #input-container {
            position: absolute;
            top: 0px;
            right: 0px;
          }
          .number-input {
            margin: 20px;
          }
        </style>
    </head>
    <body>
        
        <div id="input-container">
        
          <div class="number-input">
            <label for="DA">Diffusion Rate A</label><br>
            <input id="DA" type="number" value="1.0"
              step="0.1">
          </div>
          
          <div class="number-input">
            <label for="DB">Diffusion Rate B</label><br>
            <input id="DB" type="number" value="0.3"
              step="0.1">
          </div>
          
          <div class="number-input">
            <label for="FEED">Feed Rate A</label><br>
            <input id="FEED" type="number" value="0.055"
              step="0.001">
          </div>
          
          <div class="number-input">
            <label for="KILL">Kill Rate B</label><br>
            <input id="KILL" type="number" value="0.062"
              step="0.001">
          </div>
          
          <button onclick="initCanvas()">Reset</button>
          
        </div>
    
        <script type="">
            
          p5.disableFriendlyErrors = true;
          var grid = [];
          var next = [];
          
          // diffusion rates
          var DA = 1.0;
          var DB = 0.3;
          // feed rate (for A)
          var FEED = 0.055;
          // kill rate (for B)
          var KILL = 0.062;
          var BRUSH_SIZE = 5;
          
          // number inputs
          var inputs = {
            DA: document.getElementById("DA"),
            DB: document.getElementById("DB"),
            FEED: document.getElementById("FEED"),
            KILL: document.getElementById("KILL"),
          };
          
          (function() {
            // the most horrible code ever
            inputs.DA.oninput = () => {
              DA = parseFloat(inputs.DA.value);
            }
            inputs.DB.oninput = () => {
              DB = parseFloat(inputs.DB.value);
            }
            inputs.FEED.oninput = () => {
              FEED = parseFloat(inputs.FEED.value);
            }
            inputs.KILL.oninput = () => {
              KILL = parseFloat(inputs.KILL.value);
            }
          })();
          
          // set up
          function initCanvas() {
            
            // set number inputs
            // DA = parseFloat(inputs.DA.value);
            // DB = parseFloat(inputs.DB.value);
            // FEED = parseFloat(inputs.FEED.value);
            // KILL = parseFloat(inputs.KILL.value);
            
            // setup grids
            
            for (let x = 0; x < width; x++) {
              grid[x] = [];
              next[x] = [];
              for (let y = 0; y < height; y++) {
                grid[x][y] = { a:1, b:0 };
                next[x][y] = { a:1, b:0 };
              }
            }
            
          }
            
          function setup() {
            
            createCanvas(200, 200);
            pixelDensity(1);
            background(0);
            
            // lol
            // grid = Array(width).fill(
            //   Array(height).fill().map(() => {
            //     return {a:Math.random(), b:Math.random()};
            //   })
            // );
            
            initCanvas();
            
            // fill a spot with b
            for (let i = 90; i < 110; i++) {
                for (let j = 90; j < 110; j++) {
                  grid[i][j].b = 1;
                }
            }
            
          }
          
          // x, y is location of grid cell object
          // x2, y2 is location if grid cell not there (edges)
          function getCell(x, y) {
            if (x >= width) x = 0;
              else if (x < 0) x = width-1;
            if (y >= height) y = 0;
              else if (y < 0) y = height-1;
            return grid[x][y];
          }
          
          function laplace(c, x, y) {
            let sum = 0;
            sum += getCell(x, y)[c] * -1;
            sum += getCell(x+1, y)[c] * 0.2;
            sum += getCell(x-1, y)[c] * 0.2;
            sum += getCell(x, y+1)[c] * 0.2;
            sum += getCell(x, y-1)[c] * 0.2;
            sum += getCell(x-1, y-1)[c] * 0.05;
            sum += getCell(x+1, y-1)[c] * 0.05;
            sum += getCell(x-1, y+1)[c] * 0.05;
            sum += getCell(x+1, y+1)[c] * 0.05;
            return sum;
          }
          
          function draw() {
            
            // update grid
            for (let x = 0; x < width; x++) {
              for (let y = 0; y < height; y++) {
                const a = grid[x][y].a;
                const b = grid[x][y].b;
                const laplaceA = laplace("a", x, y);
                const laplaceB = laplace("b", x, y);
                next[x][y].a = a + (DA*laplaceA - 
                  a*b*b + FEED*(1 - a));
                next[x][y].b = b + (DB*laplaceB +
                  a*b*b - (KILL + FEED)*b);
              }
            }
            
            // display grid
            loadPixels();
            for (let x = 0; x < width; x++) {
              for (let y = 0; y < height; y++) {
                let pix = (x+y*width)*4;
                let c = next[x][y];
                pixels[pix + 0] = ~~(c.b*255);
                pixels[pix + 1] = ~~(c.b*255);
                pixels[pix + 2] = ~~(Math.max(0,255-255*abs(c.a*c.a-c.b*c.b)));
                pixels[pix + 3] = 255;
              }
            }
            updatePixels();
            
            // swap
            let temp = grid;
            grid = next;
            next = temp;
            
          }
          
          function mouseClicked() {
            for (let i = -BRUSH_SIZE/2; i<BRUSH_SIZE/2; i++) {
              for (let j = -BRUSH_SIZE/2; j<BRUSH_SIZE/2; j++) {
                let cell = grid[~~(mouseX+i)][~~(mouseY+j)];
                if (cell)
                  cell.b = 1;
              }
            }
          }
            
        </script>
    </body>
</html>