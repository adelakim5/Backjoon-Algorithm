const { countReset } = require("console");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  //   output: process.stdout,
});

let count = -1;
let q = [];
let answer = "";
rl.on("line", function (line) {
  if (!line.includes(" ") && count === -1) {
    count =;
  }
  if (!line.includes(" ")) {
    answer += !q.length ? "EMPTY" + "\n" : q[q.length - 1] + " " + q[0] + "\n";
    }
  } else {
    let [str, num] = line.split(" ");
    if (str === "I") {
      q.push(+num);
      q.sort((a, b) => a - b);
    } else {
      num < 0 ? q.shift() : q.pop();
    }
  }
}).on("close", function () {
  console.log(answer.trim());
  process.exit();
});
