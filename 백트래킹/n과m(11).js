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

const [check, hash] = [[], {}];
let answer = "";
permutation(0, "");
console.log(answer.trim());

function permutation(cnt, acc) {
  if (cnt === m) {
    if (hash[acc]) return;
    hash[acc] = true;
    answer += acc + "\n";
  } else {
    let newCheck = check.slice();
    for (let i = 0; i < n; i++) {
      if (!newCheck[i]) {
        newCheck[i] = true;
        console.log("newCheck:", newCheck);
        console.log(i);
        permutation(cnt + 1, acc + (acc && " ") + arr[i]);
        check[i] = false;
        console.log("after return, newCheck:", newCheck);
      }
    }
  }
}
