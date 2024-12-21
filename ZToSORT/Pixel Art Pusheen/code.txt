/***
 * This is my first attempt, so any tips would be helpful.
 * Based on this image: https://www.pngfind.com/pngs/m/33-334790_cute-simple-pixel-art-hd-png-download.png
 * Thanks to this project for teaching me how to do pixel art: https://www.khanacademy.org/computer-programming/pixel-pot/6139251709591552
*/
var backgroundColor = color(0, 123, 145);
background(backgroundColor);
noStroke();

//colors
var pusheenPalette = {
    "1": color(0), //black
    "2": color(82, 82, 82), //dark grey
    "3": color(156, 156, 156), //light grey
    "t": color(255, 207, 112) ,//color of poptart
    "p": color(247, 163, 255), //frosting
    "s": color(92, 49, 0), //sprinkles
    " ": color(backgroundColor, 0) //background
};

//pixelArray
var pusheen = [
    "     1     1          ",
    "    131   131         ",
    "    132111231         ",
    "   12332223321        ",
    "   13333333331        ",
    "  1233333333321       ",
    "  1331331331331       ",
    "  1333313133331       ",
    " 123333333333321      ",
    " 12333ttttt33321      ",
    " 1333tpspppt3331      ",
    " 13311pppsp11331      ",
    "1223331ppp1333221     ",
    "123311psppp113321     ",
    "13333tpppspt33331  11 ",
    "122333ttttt333221 1331",
    "12333333333333321  121",
    "13333333333333331  131",
    "1233333333333332111331",
    " 12333333333332133231 ",
    "  111111111111111111  ",
];

var drawPixelArt = function(x, y, palette, pWidth, pHeight, pixelArray) {
    for (var i = 0; i < pixelArray.length; i++) {
        for (var j = 0; j < pixelArray[i].length; j++) {
            fill(palette[pixelArray[i][j]]);
            rect(j * pWidth + x, i * pHeight + y, pWidth, pHeight);
        }
    }
};


for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
        textFont(createFont("monospace"), 20);
        fill(255, 255, 255, 100);
        text("meow", i * 80 + 18, j * 30 - 5 );
    }
}

drawPixelArt(83, 73, pusheenPalette, 13, 13, pusheen);

