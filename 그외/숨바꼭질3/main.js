const fs = require("fs");
const [st, en] = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);
let min = Infinity;
if (st >= en) {
  console.log(st - en);
  return;
}

function bfs() {
  let q = [];
  let visit = Array(100001).fill(false);
  q.push({ loc: st, sec: 0 });
  visit[st] = true;
  while (q.length) {
    let { loc, sec } = q.shift();
    if (loc === en) {
      if (min > sec) min = sec;
      continue;
    }
    const a = loc * 2;
    const b = loc - 1;
    const c = loc + 1;
    if (!visit[a] && a < 100001) {
      visit[a] = true;
      q.push({ loc: a, sec });
    }
    if (!visit[b] && b >= 0) {
      visit[b] = true;
      q.push({ loc: b, sec: sec + 1 });
    }
    if (!visit[c] && c < 100001) {
      visit[c] = true;
      q.push({ loc: c, sec: sec + 1 });
    }
  }
}
bfs();
console.log(min);
