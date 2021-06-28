const fs = require("fs");
let input = fs
  .readFileSync("./stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);

const completedArr = input
  .slice()
  .sort((a, b) => a - b)
  .join(" ");

let ans = "";

while (input.join(" ") !== completedArr) {
  for (let i = 0; i < 4; i++) {
    if (input[i] > input[i + 1]) {
      input = exchange(i, i + 1, input);
      ans += input.join(" ") + "\n";
    }
    if (input.join(" ") === completedArr) break;
  }
}

console.log(ans.trim());

function exchange(i, j, arr) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}
