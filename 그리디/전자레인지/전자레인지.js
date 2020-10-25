const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim();
let t = +input;
const [a, b, c] = [300, 60, 10];
let res = [0, 0, 0];

while (t >= c) {
  if (t >= a) {
    t -= a;
    res[0]++;
  } else if (t >= b) {
    t -= b;
    res[1]++;
  } else {
    t -= c;
    res[2]++;
  }
}

const answer = t === 0 ? res.join(" ") : -1;
console.log(answer);
