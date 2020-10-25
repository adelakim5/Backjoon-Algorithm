const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let answer = "";
let i = 1;
while (i < input.length) {
  const n = +input[i];
  let q = [];
  for (let j = i + 1; j <= i + n; j++) {
    let [str, num] = input[j].split(" ");
    if (str === "I") {
      q.push(+num);
      q.sort((a, b) => a - b);
    }
    if (str === "D") {
      +num < 0 ? q.shift() : q.pop();
    }
  }
  answer += !q.length ? "EMPTY" + "\n" : q[q.length - 1] + " " + q[0] + "\n";
  i += n + 1;
}

console.log(answer.trim());

// for (let operator of operators) {
//   let q = [];
//   for (let el of operator) {
//     let [str, num] = el.split(" ");
//     if (str === "I") {
//       q.push(+num);
//       q.sort((a, b) => a - b);
//     }
//     if (str === "D") {
//       num < 0 ? q.shift() : q.pop();
//     }
//   }
//   //   console.log("current status of q:", q);
//   if (!q.length) {
//     answer += "EMPTY" + "\n";
//     continue;
//   }
//   answer += q[q.length - 1] + " " + q[0] + "\n";
// }

// console.log(answer.trim());
