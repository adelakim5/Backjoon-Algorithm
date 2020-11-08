const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim();

if (input === "0") {
  console.log(1);
  return;
}

let arr = Array(10).fill(0);

for (let i = 0; i < input.length; i++) {
  let lett = input.charCodeAt(i);
  arr[lett - 48]++;
}

let temp = arr[6] + arr[9];
arr[6] = arr[9] = Math.floor(temp / 2) + (temp % 2);
arr.sort((a, b) => a - b);
console.log(arr[9]);
