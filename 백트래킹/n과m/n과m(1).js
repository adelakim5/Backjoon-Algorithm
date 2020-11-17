const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ");

const [n, m] = input.map((e) => +e);
const arr = Array.from(Array(n), (_, i) => i + 1);
let isUsed = Array(n).fill(false);
let res = [];
let ans = "";
permutation(res);
console.log(ans.trim());

function permutation(res) {
  if (res.length === m) {
    ans += res.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!isUsed[i]) {
      res.push(arr[i]);
      isUsed[i] = true;
      permutation(res);
      res.pop();
      isUsed[i] = false;
    }
  }
}
