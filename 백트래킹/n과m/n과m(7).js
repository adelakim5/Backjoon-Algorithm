const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const arr = input[1]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b);

let results = new Set();
for (let i = 0; i < n; i++) {
  let res = [arr[i]];
  pick(arr, res, results);
}
let ans = "";
results.forEach((e) => {
  ans += e + "\n";
});
console.log(ans.trim());

function pick(arr, res, results) {
  if (res.length === m) {
    const str = res.join(" ");
    results.add(str);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i]);
    pick(arr, res, results);
    res.pop();
  }
}
