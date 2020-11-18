const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
let numArr = new Map();
let nameArr = new Map();
for (let i = 1; i <= n; i++) {
  numArr.set(i, input[i]);
  nameArr.set(input[i], i);
}

console.log(numArr);
console.log(nameArr);

let ans = "";

for (let i = n + 1; i < input.length; i++) {
  if (input[i].charCodeAt(0) >= 65) ans += nameArr.get(input[i]) + "\n";
  else ans += numArr.get(input[i] / 1) + "\n";
}

console.log(ans.trim());
