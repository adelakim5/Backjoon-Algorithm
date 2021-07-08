const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map((e) => +e);
const arr = input[1].split(" ").map((e) => +e);

let cnt = 0;
let first = 0;
let last = 0;
let sum = 0;

while (last <= n) {
  if (sum <= m) sum += arr[last++];
  else sum -= arr[first++];

  if (sum === m) cnt++;
}

console.log(cnt);
