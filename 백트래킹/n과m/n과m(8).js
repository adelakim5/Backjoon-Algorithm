const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
input[0] = input[0].split(" ");
const n = +input[0][0];
const m = +input[0][1];
const numbers = input[1]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b);

let res = [];
let ans = [];
combination(res, ans, numbers);
print(ans);

function combination(res, ans, numbers) {
  if (!numbers.length) return;
  if (res.length === m) {
    ans.push(res.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    res.push(numbers[i]);
    let newNumbers = numbers.slice(i, numbers.length);
    combination(res, ans, newNumbers);
    res.pop();
  }
}

function print(arr) {
  let str = "";
  for (let a of arr) {
    str += a + "\n";
  }
  console.log(str.trim());
}
