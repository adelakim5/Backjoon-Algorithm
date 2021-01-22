const input = require("fs").readFileSync("./stdin.txt").toString().trim().split("\n");
const [V, E] = input[0].split(" ").map((e) => +e);
const start = +input[1];
const edges = input.slice(2).map((e) => e.split(" ").map((i) => +i));

class MinHeap {
  constructor() {
    this.nodes = [];
  }

  insert(value) {
    this.nodes.push(value);
    this.bubbleUp();
  }

  bubbleUp(index = this.nodes.length - 1) {
    if (index < 1) return;

    const currentNode = this.nodes[index];
    const parentIndex = Math.floor((index - 1) / 2);
    const parentNode = this.nodes[parentIndex];
    if (parentNode.weight <= currentNode.weight) return;

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
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    const length = this.nodes.length;
    let minimum = index;

    if (!this.nodes[rightChildIndex] && !this.nodes[leftChildIndex]) return;
    if (!this.nodes[rightChildIndex]) {
      if (this.nodes[leftChildIndex].weight < this.nodes[minimum].weight) {
        minimum = leftChildIndex;
      }
      return;
    }

    if (this.nodes[leftChildIndex].w > this.nodes[rightChildIndex].weight) {
      if (rightChildIndex <= length && this.nodes[rightChildIndex].weight < this.nodes[minimum].weight) {
        minimum = rightChildIndex;
      }
    } else {
      if (leftChildIndex <= length && this.nodes[leftChildIndex].weight < this.nodes[minimum].weight) {
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

const setLinks = (edges) => {
  let link = Array(V + 1);
  for (let [u, v, w] of edges) {
    if (!link[u]) link[u] = [];
    link[u].push({ v, w });
  }
  return link;
};

const print = (d) => {
  let res = "";
  for (let val of d) {
    if (val === Infinity) res += `INF\n`;
    else res += `${val}\n`;
  }
  return res.trim();
};

let links = setLinks(edges);
let d = Array(V + 1).fill(Infinity);
d[start] = 0;
let heap = new MinHeap();
heap.insert({ weight: d[start], vertex: start });

while (heap.nodes.length) {
  const { weight, vertex } = heap.extract();
  if (!links[vertex]) continue;
  if (d[vertex] !== weight) continue;
  for (let { v, w } of links[vertex]) {
    if (d[v] > w + weight) {
      d[v] = w + weight;
      heap.insert({ weight: d[v], vertex: v });
    }
  }
}

console.log(print(d.slice(1)));
