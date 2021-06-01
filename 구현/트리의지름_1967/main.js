const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const n = +input[0];

const map = new Map();

for (let i = 1; i < input.length; i++) {
  const [st, en, c] = input[i].split(" ").map((e) => +e);
  if (map.has(st)) map.get(st).push({ en, c });
  if (map.has(en)) map.get(en).push({ en: st, c });
  if (!map.has(st)) map.set(st, [{ en, c }]);
  if (!map.has(en)) map.set(en, [{ en: st, c }]);
}

const [initialMax, initialMaxIndex] = dfs(1);
const [max, maxIndex] = dfs(initialMaxIndex);

console.log(max);

function dfs(start) {
  const visited = Array(n + 1).fill(false);
  const stack = [];
  stack.push({ curr: start, cost: 0 });
  visited[start] = true;

  let max = 0;
  let maxIndex = -1;

  while (stack.length) {
    const { curr, cost } = stack.pop();
    if (max < cost) {
      max = cost;
      maxIndex = curr;
    }
    if (!map.has(curr)) continue;

    const values = map.get(curr);

    for (let i = 0; i < values.length; i++) {
      const { en, c } = values[i];
      if (visited[en]) continue;
      visited[en] = true;
      stack.push({ curr: en, cost: cost + c });
    }
  }

  return [max, maxIndex];
}
