const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((i) => +i);
const arr = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let graph = updateGraph(setInitGraph(arr));
console.log(check(graph));

function check(graph) {
  let cnt = 0;
  for (let i = 1; i <= n; i++) {
    let canKnow = true;
    for (let j = 1; j <= n; j++) {
      if (i !== j && graph[i][j] === Infinity) {
        canKnow = false;
        break;
      }
    }
    if (canKnow) cnt++;
  }
  return cnt;
}

function updateGraph(graph) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        if (i === j && j === k) continue;
        if (graph[j][k] === Infinity) {
          if (graph[j][i] === 1 && graph[i][k] === 1) graph[j][k] = 1;
          if (graph[j][i] === -1 && graph[i][k] === -1) graph[j][k] = -1;
        }
      }
    }
  }
  return graph;
}

function setInitGraph(arr) {
  let graph = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));
  graph.forEach((e, i) => (e[i] = 0));
  arr.forEach((row) => {
    let [tall, small] = row;
    graph[tall][small] = 1;
    graph[small][tall] = -1;
  });
  return graph;
}
