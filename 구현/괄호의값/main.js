const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim();

const stack = [];
let temp = 1;
let result = 0;
let impossible = false;

for (let i = 0; i < input.length; i++) {
  if (input[i] === "(") {
    temp *= 2;
    stack.push("(");
  } else if (input[i] === "[") {
    temp *= 3;
    stack.push("[");
  } else if (!stack.length || (stack[stack.length - 1] === "(" && input[i] === "]") || !stack.length || (stack[stack.length - 1] === "[" && input[i] === ")")) {
    impossible = false;
    break;
  } else if (input[i] === ")") {
    if (input[i - 1] === "(") result += temp;
    stack.pop();
    temp /= 2;
  } else if (input[i] === "]") {
    if (input[i - 1] === "[") result += temp;
    stack.pop();
    temp /= 3;
  }
}

if (stack.length || impossible) console.log(0);
else console.log(result);
