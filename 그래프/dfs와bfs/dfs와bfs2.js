const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m, v] = input[0].split(" ").map((e) => +e);
const edges = input.slice(1);
const g = setGraph(edges);
const dfsResult = dfs();
const bfsResult = bfs();
console.log(`${makeStr(dfsResult)}\n${makeStr(bfsResult)}`);

function setGraph(edges) {
  const g = Array.from(Array(n + 1), () => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    const [st, en] = edges[i].split(" ").map((e) => +e);
    g[st][en] = 1;
    g[en][st] = 1;
  }
  return g;
}

function dfs() {
  const visited = Array(n + 1).fill(false);
  visited[v] = true;
  const results = [v];
  goDfs(v);

  function goDfs(v) {
    if (results.length === n) return;
    const curr = g[v];
    for (let i = 0; i < curr.length; i++) {
      if (!visited[i] && curr[i]) {
        results.push(i);
        visited[i] = true;
        goDfs(i);
      }
    }
    return;
  }

  return results;
}

function bfs() {
  const visited = Array(n + 1).fill(false);
  visited[v] = true;
  const q = [v];
  const results = [];
  while (q.length) {
    const vertex = q.shift();
    results.push(vertex);
    const curr = g[vertex];
    for (let i = 0; i < curr.length; i++) {
      if (!visited[i] && curr[i]) {
        q.push(i);
        visited[i] = true;
      }
    }
  }
  return results;
}

function makeStr(arr) {
  return arr.reduce((acc, val) => acc + ` ${val}`);
}
