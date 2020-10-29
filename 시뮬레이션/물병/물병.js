const fs = require("fs");
// let [n, k] = fs.readFileSync('/dev/stdin').toString().trim().split(" ").map((e) => +e);
const [n, k] = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ")
  .map((e) => +e);

function getCount(n) {
  let cnt = 0;
  while (n > 0) {
    if (n % 2 !== 0) cnt++;
    n = Math.floor(n / 2);
  }
  return cnt;
}

let ans = n;
while (true) {
  if (getCount(ans) <= k) break;
  else ans++;
}

console.log(ans - n);
