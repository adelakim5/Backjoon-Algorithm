const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
// console.log("n, m:", n, m);
const arr = input[1]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b);

const hash = {};
let answer = "";
getSequence(0, []);
console.log(answer.trim());

function getSequence(cnt, res) {
  if (cnt === m) {
    const acc = res.join(" ");
    if (hash[acc]) return;
    hash[acc] = true;
    answer += acc + "\n";
  } else {
    for (let i = 0; i < n; i++) {
      if (!res.length || res[res.length - 1] <= arr[i]) {
        res.push(arr[i]);
        getSequence(cnt + 1, res);
        res.pop();
      }
    }
  }
}
