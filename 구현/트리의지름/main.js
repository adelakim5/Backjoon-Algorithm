const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const n = +input[0];
const tree = {};
for (let i = 1; i <= n; i++) {
  const currInfo = input[i].split(" ").map((e) => +e);
  const currV = currInfo[0];
  tree[currV] = [];
  for (let j = 1; j < currInfo.length; j += 2) {
    if (currInfo[j] === -1) break;
    tree[currV].push({ v: currInfo[j], d: currInfo[j + 1] });
  }
}

const [maxVal, maxVer] = init(1);
const [totalMax, totalMaxVer] = init(maxVer, maxVal);
console.log(totalMax);

// for (let i = 1; i <= n; i++) {
function init(start, max = 0) {
  let initMaxV = -1;
  const visited = Array(n + 1).fill(false);
  visited[start] = true;
  let dist = 0;
  const stack = [{ currV: start, conn: tree[start], dist }];
  return dfs(stack, visited, max, initMaxV);
}

// }

function dfs(stack, visited, max, initMaxV) {
  while (stack.length) {
    const { currV, conn, dist } = stack.pop();
    if (dist > max) {
      max = dist;
      initMaxV = currV;
    }
    max = Math.max(max, dist);
    for (let i = 0; i < conn.length; i++) {
      const { v, d } = conn[i];
      if (visited[v]) continue;
      visited[v] = true;
      stack.push({ currV: v, conn: tree[v], dist: dist + d });
    }
  }
  return [max, initMaxV];
}
