const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const m = +input[1];
let arr = input[2]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b);
let cnt = 0;
let i = 0;
let last = arr.length - 1;
while (i < last) {
  let temp = arr[i] + arr[last];
  if (temp > m) {
    for (let j = last - 1; j > i; j--) {
      if (arr[i] + arr[j] === m) {
        arr[j] = 0;
        arr[i] = 0;
        last = j - 1;
        cnt++;
        break;
      }
    }
  } else if (temp === m) {
    arr[last] = 0;
    arr[i] = 0;
    last--;
    cnt++;
  }
  i++;
}
console.log(cnt);
