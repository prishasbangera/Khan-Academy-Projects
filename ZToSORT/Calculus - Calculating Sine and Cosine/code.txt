// using maclaurin polynomials to approximate the value of trig functions
var n = 20;

// epic factorial function and with a memo too
var factorial_memo = {};
function factorial(x) {
  if (x === 0 || x === 1) {
    return 1;
  } else if (factorial_memo[x]) {
    return factorial_memo[x];
  } else if (x > 1) {
    var p = factorial(x - 1) * x;
    factorial_memo[x] = p;
    return p;
  } else {
    println("yo that's negative");
  }
}

////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

function sinocos(x, start) {
  var res = 0;
  for (var i = start, a = 1; i < n; i+=2, a *= -1) {
    res += a * Math.pow(x, i) / factorial(i);
  }
  return res;
}

function _sin(x) {
  // sin(x) = x - x^3/3! + x^5/5! - ...
  return sinocos(x, 1);
}

function _cos(x) {
  // cos(x) = 1 - x^2/2! + x^4/4! - ...
  return sinocos(x, 0);
}


////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

var a = 1.8;
a %= 2 * Math.PI;

println("angle in radians: " + a);
println("");

// sine
println("sin(x)");
println("Approx: " + _sin(a));
println("    JS: " + Math.sin(a));
println("");

// cosine
println("cos(x)");
println("Approx: " + _cos(a));
println("    JS: " + Math.cos(a));
println("");

println("Pythagorean trig identity cuz why not");
println(Math.pow(_sin(a), 2) + Math.pow(_cos(a), 2));

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

background(230, 154, 230);