const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const t = +input[0];
let result = "";

for (let i = 1; i <= t; i++) {
  const [m, n, x, y] = input[i].split(" ").map((e) => +e);
  result += calculate(m, n, x, y) + "\n";
}

console.log(result.trim());

function calculate(m, n, x, y) {
  if (x === y) return x;
  const last = (m * n) / gcd(m, n);
  if (m === x && n === y) return last;
  let [day, year] = [x, x];
  if (x > n) {
    [day, year] = x % n === 0 ? [n, x] : [x % n, x];
  }
  //   console.log(`day: ${day}, year: ${year}`);
  while (day !== y) {
    let currDay = day + m;
    if (currDay > n) {
      currDay = currDay % n === 0 ? n : currDay % n;
    }
    [day, year] = [currDay, year + m];
    // console.log(`....day: ${day}, year: ${year}`);
    if (day === y) return year;
    if (year > last) return -1;
    // console.log(`.... val: ${val}, year:${year}`);
  }
  return year;
}

function gcd(m, n) {
  if (n === 0) return m;
  else return gcd(n, m % n);
}
