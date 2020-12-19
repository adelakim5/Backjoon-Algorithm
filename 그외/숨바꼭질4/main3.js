const fs = require("fs");
const [st, en] = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);
const MAX = Math.max(100000, Math.max(st * 2, en * 2));
let visit = Array(MAX + 1).fill(false);
const q = [];
visit[st] = true;
q.push([st, 0, st.toString()]);
let idx = 0;
while (true) {
  let [loc, sec, str] = q[idx];
  idx++;
  if (loc === en) {
    console.log(`${sec}\n${str}`);
    break;
  }
  const a = loc * 2;
  const b = loc + 1;
  const c = loc - 1;
  if (a <= MAX && !visit[a]) {
    visit[a] = true;
    q.push([a, sec + 1, str + " " + a.toString()]);
  }
  if (b <= MAX && !visit[b]) {
    visit[b] = true;
    q.push([b, sec + 1, str + " " + b.toString()]);
  }
  if (c >= 0 && !visit[c]) {
    visit[c] = true;
    q.push([c, sec + 1, str + " " + c.toString()]);
  }
}
