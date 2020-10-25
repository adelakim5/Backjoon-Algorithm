//const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const input = require("fs")
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const n = +input[0];
const m = +input[1];

if (n === 1) {
  // 도시가 하나면
  console.log(0);
} else if (m === 1) {
  // 버스가 하나면
  const [x, y, cost] = input[2].split(" ").map((e) => +e);
  console.log(cost);
} else {
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
      // 부모값이 더 작으면 끝내기
      if (parentNode <= currentNode) return;
      // 그렇지 않으면 자리바꾸기
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
      // 힙은 완전이진트리니까 왼쪽자식만 없는 경우는 없음
      if (!this.nodes[rightChildIndex]) {
        if (this.nodes[leftChildIndex] < this.nodes[minimum]) {
          minimum = leftChildIndex;
        }
        // return
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

  let buses = [];
  for (let i = 2; i < m + 2; i++) {
    buses.push(input[i].split(" ").map((e) => +e));
  }

  const [start, end] = input[m + 2].split(" ").map((e) => +e);

  let graph = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));
  for (let i = 1; i <= n; i++) {
    graph[i][i] = 0;
  }
  for (let bus of buses) {
    const [st, en, cost] = bus;
    if (graph[st][en] > cost) graph[st][en] = cost;
  }

  let minHeap = new MinHeap();

  let d = Array(n + 1).fill(Infinity);
  d[start] = 0;

  minHeap.insert([d[start], start]);

  while (minHeap.getSize()) {
    let [cost, idx] = minHeap.extract();
    if (d[idx] === cost) {
      //   minHeap.extract();
      let currGraph = graph[idx];
      for (let i = 1; i < currGraph.length; i++) {
        if (d[i] > currGraph[i] + cost) {
          d[i] = currGraph[i] + cost;
          minHeap.insert([d[i], i]);
        }
      }
    }
  }

  console.log(d[end]);
}
