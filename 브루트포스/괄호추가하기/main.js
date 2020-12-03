const input = require("fs").readFileSync("stdin.txt").toString().trim().replace(/\r/g, "").split("\n");
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const mathematicalExpression = " " + input[1].split("").join(" ") + " ";
const expressionLength = +input[0];
let adjMathematicalExpression = mathematicalExpression.split("");
const n = adjMathematicalExpression.length;
const maxSize = Math.floor((expressionLength - 2) / 3);

let max = calculate(input[1]);
for (let size = 1; size <= maxSize; size++) {
  insertBracket(0, 0, size, 0, 0);
}
console.log(max);

function insertBracket(idx, cnt, size, openIndex, closeIndex) {
  if (cnt >= size) {
    const value = calculate(adjMathematicalExpression.join(" ").replace(/  /g, " "));
    max = Math.max(max, value);
    return;
  }
  for (let i = idx; i < n - 6; i += 4) {
    if (adjMathematicalExpression[i] === " " && closeIndex <= i) {
      adjMathematicalExpression[i] = "(";
      adjMathematicalExpression[i + 6] = ")";
      insertBracket(i + 4, cnt + 1, size, i, i + 6);
      adjMathematicalExpression[i + 6] = " ";
      adjMathematicalExpression[i] = " ";
    }
  }
}

function calculate(adjMathematicalExpression) {
  let str = findBracket(adjMathematicalExpression);
  let arr = str !== -1 ? str.trim().split("  ") : adjMathematicalExpression.split("");
  let sum = +arr[0];
  for (let i = 1; i < arr.length - 1; i += 2) {
    const operator = arr[i];
    switch (operator) {
      case "+":
        sum += +arr[i + 1];
        break;
      case "-":
        sum -= +arr[i + 1];
        break;
      case "*":
        sum *= +arr[i + 1];
        break;
    }
  }
  return sum;
}

function findBracket(adjMathematicalExpression) {
  let startIndex = adjMathematicalExpression.indexOf("(");
  let endIndex = adjMathematicalExpression.indexOf(")");
  if (startIndex === -1) return -1;
  while (startIndex !== -1) {
    const expression = adjMathematicalExpression.slice(startIndex, endIndex + 1);
    const value = eval(expression);
    adjMathematicalExpression = adjMathematicalExpression.replace(expression, " " + value + " ");
    startIndex = adjMathematicalExpression.indexOf("(");
    endIndex = adjMathematicalExpression.indexOf(")");
  }
  return adjMathematicalExpression;
}
