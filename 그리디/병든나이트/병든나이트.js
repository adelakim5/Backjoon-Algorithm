const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const [n, m] = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ")
  .map((e) => +e);

if (n === 1) {
  console.log(1);
} else if (n === 2) {
  console.log(Math.min(4, Math.floor((m + 1) / 2)));
} else if (m < 7) {
  console.log(Math.min(4, m));
} else {
  console.log(m - 7 + 5);
}
