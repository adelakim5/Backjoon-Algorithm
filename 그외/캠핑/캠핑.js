const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

let ans = "";

for (let i = 0; i < input.length - 1; i++) {
  const [l, p, v] = input[i].split(" ").map((e) => +e);
  const mok = Math.floor(v / p) * l;
  const nmg = v % p < l ? v % p : l;
  ans += "Case " + (i + 1) + ": " + (mok + nmg) + "\n";
}

console.log(ans.trim());
