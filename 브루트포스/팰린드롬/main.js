const fs = require("fs");
let input = fs.readFileSync("stdin.txt").toString().trim();
if (input.length === 1 || isSync(input)) {
  console.log(input.length);
  return;
}
let answer = input.length;
let last = input.length - 1;
for (let i = 0; i < input.length; i++) {
  if (input[i] === input[last]) {
    let temp = input.slice(i, input.length);
    if (isSync(temp)) {
      answer += i;
      break;
    }
  }
}

if (answer === input.length) answer += last;
console.log(answer);

function isSync(input) {
  if (input.length % 2 === 0) {
    let mid = input.length / 2;
    let left = input.slice(0, mid);
    let right = input.slice(mid, input.length).split("").reverse().join("");
    if (left === right) return true;
  } else {
    let mid = Math.floor(input.length / 2);
    let left = input.slice(0, mid);
    let right = input
      .slice(mid + 1, input.length)
      .split("")
      .reverse()
      .join("");
    if (left === right) return true;
  }
  return false;
}
