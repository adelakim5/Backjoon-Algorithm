const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const a = input.splice(1, n).map((e) => e.split(""));
const b = input.splice(1, n).map((e) => e.split(""));

if (n < 3 || m < 3) {
  let answer = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (a[i][j] !== b[i][j]) {
        answer = -1;
        break;
      }
    }
  }
  console.log(answer);
  return;
}

let check = Array.from(Array(n), () => Array(m).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (a[i][j] !== b[i][j]) check[i][j] = true; // 값이 다르면 true
  }
}

console.log(solution(check));

function solution(check) {
  let cnt = 0;
  let answer = 0;
  for (let i = 0; i <= n - 3; i++) {
    for (let j = 0; j <= m - 3; j++) {
      if (check[i][j]) {
        check = convert(i, j, check);
        if (check === -1) return -1;
        cnt++;
      }
    }
  }
  answer = isConvertable(check) ? cnt : -1;
  return answer;

  function convert(x, y, check) {
    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        check[i][j] = check[i][j] === true ? false : true;
        if (x === n - 3 && y === m - 3 && check[i][j]) return -1;
      }
    }
    return check;
  }

  function isConvertable(check) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (check[i][j]) return false;
      }
    }
    return true;
  }
}
