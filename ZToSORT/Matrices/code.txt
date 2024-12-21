//jshint ignore: start

function Matrix44(r1, r2, r3, r4) {
    const m = [
        r1 || [1, 0, 0, 0],
        r2 || [0, 1, 0, 0],
        r3 || [0, 0, 1, 0],
        r4 || [0, 0, 0, 1]
    ];
    m.mult = function(matrix44) {
        const a = this;
        const b = matrix44;
        const ab = [[], [], [], []]; 
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                ab[i][j] = a[i][0] * b[0][j] + 
                           a[i][1] * b[1][j] + 
                           a[i][2] * b[2][j] + 
                           a[i][3] * b[3][j];
            }
        }
        return ab;
    };
    return m;
}

const m = Matrix44(
    [5, 2, 6, 1],
    [0, 6, 2, 0],
    [3, 8, 1, 4],
    [1, 8, 5, 6]
);
const n = Matrix44(
    [7, 5, 8, 0],
    [1, 8, 2, 6],
    [9, 4, 3, 8],
    [5, 3, 7, 9]
);

println(m);
println(n);
println(m.mult(n));

// {
background(199, 255, 210);
fill(47, 71, 40);
textSize(318);
textAlign(CENTER, CENTER);
text("[  ]", width/2, 135);
// }