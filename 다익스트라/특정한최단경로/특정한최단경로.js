class MinHeap {
  constructor() {
    this.nodes = [];
  }

  getSize() {
    return this.nodes.length;
  }

  insert(data) {
    this.nodes.push(data);
    this.bubbleUp();
  }

  bubbleUp(index = this.nodes.length - 1) {
    if (index < 1) return;
    const currentNode = this.nodes[index];
    const parentIndex = Math.floor((index - 1) / 2);
    const parentNode = this.nodes[parentIndex];
    if (parentNode <= currentNode) return;
    this.nodes[index] = parentNode;
    this.nodes[parentIndex] = currentNode;
    index = parentIndex;
    this.bubbleUp(index);
  }

  extract() {
    const min = this.nodes[0];
    if (this.nodes.length === 1) {
      this.nodes.pop();
      return min;
    }
    this.nodes[0] = this.nodes.pop();
    this.trickleDown();
    return min;
  }

  trickleDown(index = 0) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    const length = this.nodes.length;
    let minimum = index;
    if (!this.nodes[leftChildIndex] && !this.nodes[rightChildIndex]) return;
    if (!this.nodes[rightChildIndex]) {
      if (this.nodes[leftChildIndex] < this.nodes[minimum]) {
        minimum = leftChildIndex;
      }
    }
    if (this.nodes[leftChildIndex] > this.nodes[rightChildIndex]) {
      if (rightChildIndex <= length && this.nodes[rightChildIndex] < this.nodes[minimum]) {
        minimum = rightChildIndex;
      }
    } else {
      if (leftChildIndex <= length && this.nodes[leftChildIndex] < this.nodes[minimum]) {
        minimum = leftChildIndex;
      }
    }
    if (minimum !== index) {
      let t = this.nodes[minimum];
      this.nodes[minimum] = this.nodes[index];
      this.nodes[index] = t;
      this.trickleDown(minimum);
    }
  }
}

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

const mandatoryVertexes = [
  [v1, v2],
  [v2, v1],
];

let graph = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));
for (let i = 1; i <= n; i++) {
  graph[i][i] = 0;
}

for (let path of paths) {
  const [a, b, c] = path;
  if (graph[a][b] > c && graph[b][a] > c) {
    graph[a][b] = c;
    graph[b][a] = c;
  }
}

function getShortestPath(start, end) {
  let minHeap = new MinHeap();
  let d = Array(n + 1).fill(Infinity);
  d[start] = 0;
  minHeap.insert([d[start], start]);

  while (minHeap.getSize()) {
    let [cost, idx] = minHeap.extract();
    if (d[idx] === cost) {
      let currGraph = graph[idx];
      for (let i = 1; i < currGraph.length; i++) {
        if (d[i] > currGraph[i] + cost) {
          d[i] = currGraph[i] + cost;
          minHeap.insert([d[i], i]);
        }
      }
    }
  }
  return d[end];
}

let min = Infinity;

for (let vertexes of mandatoryVertexes) {
  const [m1, m2] = vertexes;
  let result = getShortestPath(1, m1) + getShortestPath(m1, m2) + getShortestPath(m2, n);
  if (result < min) min = result;
}

min === Infinity ? console.log(-1) : console.log(min);
