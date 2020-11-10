const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let n = +input[0];
let locs = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let [pastX, pastY] = locs[0];
let pastLength = Math.abs(pastY - pastX);

for (let i = 1; i < locs.length; i++) {
  const [x, y] = locs[i];
  if (x >= pastX && x <= pastY && y >= pastX && y <= pastY) continue;
  if (x > pastY) {
    pastLength += Math.abs(y - x);
    pastY = y;
    pastX = x;]
  } else {
    pastLength += Math.abs(y - pastY);
    pastY = y;
  }
}

console.log(pastLength);
