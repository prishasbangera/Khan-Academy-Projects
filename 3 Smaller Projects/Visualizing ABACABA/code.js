var t = 0.08;

colorMode(HSB);
background(255, 0, 0);

var alphabet = "abcdefghijklmnopqrstuvwxyz";

var s = (function() {
    var maxi = 3500;
    var N = 12;
    var o = "";
    for (var i = 0; i < N; i++) {
        o = o + alphabet[i] + o;
        if (o.length > maxi) {
            break;
        }
    }
    return o.slice(0, maxi);
})();

pushMatrix();
translate(width/2, height/2);
for (var i = 0; i < s.length; i++) {
    var hu = map(alphabet.indexOf(s[i]), 0, alphabet.length - 1, 20, 255);
    rotate(137.5);
    pushMatrix();
    translate(i * t, 0);
    strokeWeight(5);
    stroke(hu, 255, 255, 100);
    point(0, 0);
    strokeWeight(2);
    // if (hu > 100) {
    //     strokeWeight(10);
    // }
    stroke(hu, 255, 255);
    point(0, 0);
    popMatrix();
}
popMatrix();