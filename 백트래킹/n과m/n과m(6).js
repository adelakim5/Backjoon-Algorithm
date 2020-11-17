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

let res = [];
let results = [];
pick(0, arr, res, results);
print(results);

function print(results) {
  let ans = "";
  for (let i = 0; i < results.length; i++) {
    ans += results[i] + "\n";
  }
  console.log(ans.trim());
}

function pick(idx, arr, res, results) {
  if (res.length === m) {
    const str = res.join(" ");
    results.push(str);
    return;
  }
  for (let i = idx; i < arr.length; i++) {
    res.push(arr[i]);
    pick(i + 1, arr, res, results);
    res.pop();
  }
}
