const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const testCase = +input[0];
let result = "";
let index = 0;
for (let i = 0; i < testCase; i++) {
  const [n, m] = input[++index].split(" ").map((e) => +e);
  const q =
    n <= 1
      ? [{ val: Number(input[++index]), idx: m }]
      : input[++index].split(" ").map((e, i) => {
          return { val: +e, idx: i };
        });
  let cnt = 0;
  while (true) {
    const first = q.shift();
    if (q.some((e) => e.val > first.val)) q.push(first);
    else {
      cnt++;
      if (first.idx === m) {
        result += cnt + "\n";
        break;
      }
    }
  }
}

console.log(result.trim());
