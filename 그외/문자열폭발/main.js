const fs = require("fs");
const input = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.replace(/\r/g, ""));
const str = input[0];
const s = input[1];
const last = s[s.length - 1];
let stack = [];
let index = 0;

for (let i = 0; i < str.length; i++) {
  stack[index] = str[i];
  if (str[i] === last && index >= s.length - 1) {
    index = check();
  } else index++;
}

function check() {
  let n = s.length - 1;
  for (let i = index; i >= index - s.length + 1; i--) {
    if (s[n] !== stack[i]) return index + 1;
    n--;
  }
  return index - s.length + 1;
}
const answer = stack.slice(0, index);
console.log(answer.length === 0 ? "FRULA" : answer.join(""));
