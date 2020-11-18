const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
let map = new Map();
let cnt = 0;
let ans = [];

for (let i = 1; i <= n; i++) {
  map.set(input[i], input[i]);
}

for (let j = n + 1; j < input.length; j++) {
  if (map.has(input[j])) {
    ans.push(map.get(input[j]));
    cnt++;
  }
}

console.log(cnt + "\n" + ans.sort().join("\n").trim());
