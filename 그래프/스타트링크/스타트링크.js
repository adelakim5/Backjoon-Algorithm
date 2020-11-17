const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(e => +e);
const [f, s, g, u, d] = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ")
  .map((e) => +e);

let visit = Array(f + 1).fill(false);
let count = 0;
let adjustedStart = 0;
if (g > s) {
  if ((g - s) % u === 0) {
    console.log((g - s) / u);
    return;
  } else {
    count = Math.floor((g - s) / u);
    adjustedStart = s + count * u;
  }
} else if (g < s) {
  if ((s - g) % d === 0) {
    console.log((s - g) / d);
    return;
  } else {
    count = Math.floor((s - g) / d);
    adjustedStart = s - count * d;
  }
} else {
  console.log(0);
  return;
}
let answer = bfs([adjustedStart, count]);
// console.log(answer);
answer === -1 ? console.log("use the stairs") : console.log(answer);

function bfs(start) {
  let result = -1;
  let q = [start];
  //   visit[start.floor] = true;
  while (q.length) {
    let [floor, cnt] = q.shift();
    visit[floor] = true;
    // console.log(`curr: `);
    // console.log(curr);
    if (floor === g) {
      result = cnt;
      break;
    }
    const n1 = floor + u;
    const n2 = floor - d;
    if (u && isInFloor(n1) && !visit[n1]) q.push([n1, cnt + 1]);
    if (d && isInFloor(n2) && !visit[n2]) q.push([n2, cnt + 1]);
  }
  return result;
}

function isInFloor(n) {
  if (n >= 1 && n <= f) return true;
  return false;
}
