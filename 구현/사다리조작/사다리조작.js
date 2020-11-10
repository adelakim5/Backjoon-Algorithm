const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m, h] = input[0].split(" ").map((e) => +e);
const lines = input.slice(1).map((e) => e.split(" ").map((i) => +i));
// console.log(lines);
let res = Infinity;
let visited = Array.from(Array(34), () => Array(34).fill(false));

for (let line of lines) {
  let [a, b] = line;
  visited[a][b] = true;
}
go(1, 0);
res = res === Infinity ? -1 : res;
console.log(res);

function check() {
  // i에서 시작해서 i로 끝나는지 체크
  for (let i = 1; i <= n; i++) {
    let start = i;
    for (let j = 1; j <= h; j++) {
      if (visited[j][start]) start++;
      else if (visited[j][start - 1]) start--;
    }
    if (start != i) return false;
  }
  return true;
}

function go(here, cnt) {
  console.log("here:", here);
  if (cnt > 3) return;
  if (check()) {
    res = Math.min(res, cnt);
    console.log(`res: ${res}`);
    return;
  }
  for (let i = here; i <= h; i++) {
    for (let j = 1; j <= n; j++) {
      console.log(`i: ${i}, j: ${j}`);
      if (visited[i][j]) {
        console.log("me");
      } else if (visited[i][j - 1]) {
        console.log("left");
      } else if (visited[i][j + 1]) {
        console.log("right");
      }
      if (visited[i][j] || visited[i][j - 1] || visited[i][j + 1]) continue;
      console.log(`not be continued: i, ${i}, j, ${j}`);
      visited[i][j] = true;
      go(i, cnt + 1);
      visited[i][j] = false;
    }
  }
}

// print();
