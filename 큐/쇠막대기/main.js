const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("");

const stack = [];
let cnt = 0;

for (let i = 0; i < input.length - 1; ) {
  if (input[i] === "(" && input[i + 1] === ")") {
    cnt += stack.length;
    i += 2;
  } else if (input[i] === "(") {
    stack.push(input[i]);
    i++;
  } else if (input[i] === ")") {
    cnt += 1;
    stack.pop();
    i++;
  }
}

console.log(cnt + 1);
