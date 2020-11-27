const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim()
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const hints = input.slice(1).map((e) => e.split(" ").map((i) => +i));
// console.log(n, hints);
let visit = Array(10).fill(0);
let ans = [];
permutation([], visit);
console.log(ans.length);

function isBall(answer, hint) {
  let cnt = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === j && answer[i] === hint[j]) continue;
      if (answer[i] === hint[j]) cnt++;
    }
  }
  return cnt;
}

function isStrike(answer, hint) {
  let cnt = 0;
  for (let i = 0; i < 3; i++) {
    if (answer[i] === hint[i]) cnt++;
  }
  return cnt;
}

function permutation(res, visit) {
  if (res.length === 3) {
    let answer = res.join("");
    let flag = true;
    for (let [hint, s, b] of hints) {
      // console.log(hint, s, b);
      const strHint = hint.toString();
      let strike = isStrike(answer, strHint);
      if (s !== strike) {
        flag = false;
        break;
      }
      let ball = isBall(answer, strHint);
      if (b !== ball) {
        flag = false;
        break;
      }
      // console.log(ans);
    }
    if (flag) ans.push(answer);
    return;
  }

  for (let i = 1; i <= 9; i++) {
    if (!visit[i]) {
      res.push(i);
      visit[i] = 1;
      permutation(res, visit);
      visit[i] = 0;
      res.pop();
    }
  }
}
