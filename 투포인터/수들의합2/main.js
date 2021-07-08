const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map((e) => +e);
const arr = input[1].split(" ").map((e) => +e);

let cnt = 0;
const obj = {};

for (let i = 0; i < n; i++) {
  const value = i === 0 ? arr[i] : arr[i] + arr[i - 1];
  if (value >= m) {
    if (value === m) cnt++;
    else {
      const diff = value - m;
      if (obj[diff]) cnt++;
    }
  }

  obj[value] = value;
  arr[i] = value;
}

console.log(cnt);
