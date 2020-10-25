const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("");
let formula = ["("];
let startBracketCnt = 1;
let endBracketCnt = 0;
let number = "";
for (let i = 0; i < input.length; i++) {
  if (input[i] === "-") {
    formula.push(+number, ")");
    endBracketCnt++;
    formula.push(input[i], "(");
    startBracketCnt++;
    number = "";
  } else if (input[i] === "+") {
    formula.push(+number, input[i]);
    number = "";
  } else {
    number += input[i];
  }
  if (i === input.length - 1) {
    formula.push(+number);
    if (startBracketCnt !== endBracketCnt) formula.push(")");
  }
}
// console.log(formula);
console.log(eval(formula.join("")));
// console.log(calcualateInsertingBracket());

// function calcualateInsertingBracket() {}
// let num = "04352";
// let test = ["(", +num, ")"];
// console.log(eval(test.join("")));
