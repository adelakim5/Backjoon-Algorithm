//const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const input = require("fs")
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, e] = input[0].split(" ").map((element) => +element);
let paths = [];
for (let i = 1; i <= e; i++) {
  paths.push(input[i].split(" ").map((element) => +element));
}
const [v1, v2] = input[e + 1].split(" ").map((element) => +element);

let graph = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));

for (let path of paths) {
  const [a, b, c] = path;
  if (graph[a][b] > c && graph[b][a] > c) {
    graph[a][b] = graph[b][a] = c;
  }
}

function getShortestPath(start, end) {
  let d = Array(n + 1).fill(Infinity);
  let visit = Array(n + 1).fill(false);
  d[start] = 0;

  for (let i = 1; i <= n; i++) {
    let [k, cost] = [-1, Infinity];
    for (let j = 1; j <= n; j++) {
      if (!visit[j] && d[j] < cost) {
        cost = d[j];
        k = cost;
      }
    }
    if (k === -1) break;
    visit[k] = true;
    for (let j = 1; j <= n; j++) {
      const dist = d[k] + graph[k][j];
      if (dist < d[j]) d[j] = dist;
    }
    if (k === end) break;
  }
  return d[end];
}

const way1 = getShortestPath(1, v1) + getShortestPath(v1, v2) + getShortestPath(v2, n);
const way2 = getShortestPath(1, v2) + getShortestPath(v2, v1) + getShortestPath(v1, n);
console.log("way1", way1, "way2", way2);
const answer = Math.min(way1, way2);
answer === Infinity ? console.log(-1) : console.log(answer);
