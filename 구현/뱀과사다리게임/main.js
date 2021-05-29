const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);

let start = 1;
let end = 100;

const d = Array(101).fill(Infinity);
d[start] = 0;

const map = new Map();
for (let i = 1; i < input.length; i++) {
  const [from, to] = input[i].split(" ").map((e) => +e);
  map.set(from, to);
}

console.log(map);

const q = [];
q.push({ curr: start, w: 0 });
while (q.length) {
  const { curr, w } = q.shift();

  if (map.has(curr)) {
    const next = map.get(curr);
    if (d[next] > w) {
      d[next] = w;
      q.push({ curr: next, w });
    }

    continue;
  }

  for (let i = 1; i <= 6; i++) {
    const next = curr + i;
    if (next > 100) continue;
    const newW = w + 1;
    if (d[next] > newW) {
      d[next] = newW;
      q.push({ curr: next, w: newW });
    }
  }
}

console.log(d[end]);
