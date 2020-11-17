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

let [check, hash] = [[], {}];
let answer = "";
permutation(0, "");
console.log(answer.trim());

function permutation(cnt, acc) {
  // console.log("acc:", acc);
  if (cnt === m) {
    if (hash[acc]) return; // acc가 이미 있으면 return
    hash[acc] = true;
    // console.log("############# hash:", hash);
    answer += acc + "\n";
  } else {
    for (let i = 0; i < n; i++) {
      // console.log("check[i]:", check[i]);
      if (!check[i]) {
        // 처음엔 undefined니까?
        check[i] = true;
        permutation(cnt + 1, acc + (acc && " ") + arr[i]);
        check[i] = false;
      }
    }
  }
}
