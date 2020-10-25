class MinHeap {
  constructor() {
    this.minNodes = [];
    this.maxNodes = [];
  }

  insert(data) {
    this.minNodes.push(data);
    this.bubbleUp(this.minNodes);
    const maxData = data.value * -1;
    this.maxNodes.push({ id: data.id, value: maxData });
    this.bubbleUp(this.maxNodes);
  }

  bubbleUp(nodes, index = nodes.length - 1) {
    console.log("nodes:", nodes);
    if (index < 1) return;
    const currentNode = nodes[index];
    const parentIndex = Math.floor((index - 1) / 2);
    const parentNode = nodes[parentIndex];
    if (parentNode.value <= currentNode.value) return;
    nodes[index] = parentNode;
    nodes[parentIndex] = currentNode;
    index = parentIndex;
    this.bubbleUp(nodes, index);
  }

  minSort(maxId) {
    for (let i = 0; i < this.minNodes.length; i++) {
      if (this.minNodes[i].id === maxId) {
        this.minNodes.splice(i, 1);
        break;
      }
    }
  }

  maxSort(minId) {
    for (let i = 0; i < this.maxNodes.length; i++) {
      if (this.maxNodes[i].id === minId) {
        this.maxNodes.splice(i, 1);
        break;
      }
    }
  }

  maxExtract() {
    const maxNode = this.maxNodes[0];
    console.log("maxNode:", maxNode);
    if (this.maxNodes.length === 1) {
      this.maxNodes.pop();
      return { id: maxNode.id, value: maxNode.value * -1 };
    }
    this.maxNodes[0] = this.maxNodes.pop();
    this.trickleDown(this.maxNodes);
    return { id: maxNode.id, value: maxNode.value * -1 };
  }

  minExtract() {
    const minNode = this.minNodes[0];
    if (this.minNodes.length === 1) {
      this.minNodes.pop();
      return { id: minNode.id, value: minNode.value };
    }
    this.minNodes[0] = this.minNodes.pop();
    this.trickleDown(this.minNodes);
    return { id: minNode.id, value: minNode.value };
  }

  trickleDown(nodes, index = 0) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    const length = nodes.length;
    let minimum = index;
    if (!nodes[leftChildIndex] && !nodes[rightChildIndex]) return;
    // 힙은 완전이진트리니까 왼쪽자식만 없는 경우는 없음
    if (!nodes[rightChildIndex]) {
      if (nodes[leftChildIndex] < nodes[minimum]) {
        minimum = leftChildIndex;
      }
    }
    if (nodes[leftChildIndex].value > nodes[rightChildIndex].value) {
      if (rightChildIndex <= length && nodes[rightChildIndex].value < nodes[minimum].value) {
        minimum = rightChildIndex;
      }
    } else {
      if (leftChildIndex <= length && nodes[leftChildIndex].value < nodes[minimum].value) {
        minimum = leftChildIndex;
      }
    }
    if (minimum !== index) {
      let t = nodes[minimum];
      nodes[minimum] = nodes[index];
      nodes[index] = t;
      this.trickleDown(minimum);
    }
  }
}

const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
// const testCaseN = +input[0];
let operators = [];
let i = 1;
while (i < input.length) {
  let n = +input[i];
  let operator = [];
  for (let j = i + 1; j <= i + n; j++) {
    let [str, number] = input[j].split(" ");
    operator.push([str, Number(number)]);
  }
  operators.push(operator);
  i += n + 1;
}

// console.log(operators);
let answer = "";

for (let operator of operators) {
  let dpq = new MinHeap();
  let id = 0;
  for (let el of operator) {
    let [str, num] = el;
    if (str === "I") dpq.insert({ id, value: num });
    if (str === "D") {
      if (num < 0) {
        const { minId, val } = dpq.minExtract();
        dpq.maxSort(minId);
      }
      if (num > 0) {
        const { maxId, val } = dpq.maxExtract();
        dpq.minSort(maxId);
      }
    }
    id++;
  }
  console.log("current status of dpq:", dpq.minNodes, dpq.maxNodes);
  if (!dpq.minNodes.length) {
    answer += "EMPTY" + "\n";
    continue;
  }
  answer += dpq.maxExtract().value + " " + dpq.minExtract().value + "\n";
}

console.log(answer.trim());
