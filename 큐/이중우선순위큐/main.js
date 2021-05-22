const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let testCase = 0;
let doneTestCnt = 0;
let n = 0;
let cnt = 0;
let map = new Map();
let max = 0;
let maxStack = [0];
let minStack = [Infinity];
let min = Infinity;
let result = "";

rl.on("line", (line) => {
  if (!testCase) {
    testCase = +line;
    return;
  }
  if (line.length === 1) {
    n = +line;
    cnt = 0;
    map = new Map();
    return;
  }

  let [command, number] = line.split(" ");
  number = +number;

  switch (command) {
    case "I":
      map.set(number, number);
      if (number > max) {
        max = number;
        maxStack.push(number);
      }
      if (number < min) {
        min = number;
        minStack.push(number);
      }
      break;
    case "D":
      if (number === 1) {
        map.delete(max);
        maxStack.pop();
        max = maxStack[maxStack.length - 1];
      } else if (number === -1) {
        map.delete(min);
        minStack.pop();
        min = minStack[minStack.length - 1];
      }
  }
  cnt++;

  if (cnt === n) {
    doneTestCnt++;
    result += map.size === 0 ? "EMPTY" : `${max} ${min}`;
    if (doneTestCnt === testCase) rl.close();
  }
}).on("close", () => {
  result += map.size === 0 ? "EMPTY" : `${max} ${min}`;
  console.log(result);
  process.exit();
});
