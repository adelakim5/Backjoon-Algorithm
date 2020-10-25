const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().slice(1).split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let n = 0;
let answer = "";
for (let i = 1; i < input.length; i += n + 1) {
  if (!input[i].includes(" ")) {
    n = +input[i];
    if (n === 1) {
      answer += 1 + "\n";
      continue;
    }
    let employees = [];
    for (let j = i + 1; j <= i + n; j++) {
      employees.push(input[j].split(" ").map((e) => +e));
    }
    answer += employ(employees) + "\n";
  }
}
console.log(answer.trim());

function employ(employees) {
  employees.sort((a, b) => a[0] - b[0]);
  //   console.log("employees:", employees);
  let employed = [];
  for (let e of employees) {
    if (!employed.length) employed.push(e);
    else {
      const paperScore = employed[employed.length - 1][0];
      const interviewScore = employed[employed.length - 1][1];
      if ((paperScore < e[0] && interviewScore > e[1]) || (paperScore > e[0] && interviewScore < e[1])) {
        employed.push(e);
      }
    }
  }
  return employed.length;
}
