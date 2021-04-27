const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim();
// const ops = ["+", "-", "*", "/", "(", ")"];
const priority = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "(": 0,
  ")": 0,
};

const stack = [];
let result = "";

for (let i = 0; i < input.length; i++) {
  if (isLetter(input[i])) result += input[i];
  else {
    if (input[i] === "(") stack.push(input[i]);
    else if (priority[input[i]] === 2) {
      while (stack.length && priority[stack[stack.length - 1]] === 2) {
        const op = stack.pop();
        result += op;
      }
      stack.push(input[i]);
    } else if (priority[input[i]] === 1) {
      while (stack.length && stack[stack.length - 1] !== "(") {
        const op = stack.pop();
        result += op;
      }
      stack.push(input[i]);
    } else if (input[i] === ")") {
      while (stack[stack.length - 1] !== "(") {
        const op = stack.pop();
        result += op;
      }
      stack.pop();
    }
  }
}

while (stack.length) {
  const op = stack.pop();
  result += op;
}

console.log(result);

function isLetter(str) {
  return str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 92;
}
