const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const testCase = +input[0];
let i = 0;
let result = "";

class MinHeap {
  constructor() {
    this.nodes = [];
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
    if (parentNode.number <= currentNode.number) return;
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
    if (!this.nodes[rightChildIndex]) {
      if (this.nodes[leftChildIndex].number < this.nodes[minimum].number) {
        minimum = leftChildIndex;
      }
    } else if (this.nodes[leftChildIndex].number > this.nodes[rightChildIndex].number) {
      if (
        rightChildIndex <= length &&
        this.nodes[rightChildIndex].number < this.nodes[minimum].number
      ) {
        minimum = rightChildIndex;
      }
    } else {
      if (
        leftChildIndex <= length &&
        this.nodes[leftChildIndex].number < this.nodes[minimum].number
      ) {
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

class MaxHeap {
  constructor() {
    this.nodes = [];
  }

  insert(data) {
    this.nodes.push(data);
    this.bubbleUp();
  }

  bubbleUp(index = this.nodes.length - 1) {
    if (index < 1) return;
    let currentNode = this.nodes[index];
    let parentIndex = Math.floor((index - 1) / 2);
    let parentNode = this.nodes[parentIndex];

    if (parentNode.number >= currentNode.number) return;

    this.nodes[parentIndex] = currentNode;
    this.nodes[index] = parentNode;
    index = parentIndex;
    this.bubbleUp(index);
  }

  extract() {
    const max = this.nodes[0];
    if (this.nodes.length === 1) {
      this.nodes.pop();
      return max;
    }
    this.nodes[0] = this.nodes.pop();
    this.trickleDown();
    return max;
  }

  trickleDown(index = 0) {
    let leftChildIndex = index * 2 + 1;
    let rightChildIndex = index * 2 + 2;
    let length = this.nodes.length;
    let maximum = index;

    if (!this.nodes[leftChildIndex] && !this.nodes[rightChildIndex]) return;

    if (!this.nodes[rightChildIndex]) {
      if (this.nodes[leftChildIndex].number > this.nodes[maximum].number) {
        maximum = leftChildIndex;
      }
    } else if (this.nodes[leftChildIndex].number < this.nodes[rightChildIndex].number) {
      if (
        rightChildIndex <= length &&
        this.nodes[rightChildIndex].number > this.nodes[maximum].number
      ) {
        maximum = rightChildIndex;
      }
    } else {
      if (
        leftChildIndex <= length &&
        this.nodes[leftChildIndex].number > this.nodes[maximum].number
      ) {
        maximum = leftChildIndex;
      }
    }

    if (maximum !== index) {
      let t = this.nodes[maximum];
      this.nodes[maximum] = this.nodes[index];
      this.nodes[index] = t;
      this.trickleDown(maximum);
    }
  }
}

function syncMaxHeap(valid, maxHeap) {
  while (maxHeap.nodes.length && !valid[maxHeap.nodes[0].j]) {
    maxHeap.extract();
  }
  return maxHeap;
}

function syncMinHeap(valid, minHeap) {
  while (minHeap.nodes.length && !valid[minHeap.nodes[0].j]) {
    minHeap.extract();
  }
  return minHeap;
}

for (let t = 0; t < testCase; t++) {
  const n = Number(input[++i]);
  let minHeap = new MinHeap();
  let maxHeap = new MaxHeap();
  const valid = Array(1000001).fill(false);

  for (let j = 0; j < n; j++) {
    let [command, number] = input[++i].split(" ");
    console.log(`command: ${command}, number: ${number}`);
    number = +number;
    switch (command) {
      case "I":
        minHeap.insert({ number, j });
        maxHeap.insert({ number, j });
        valid[j] = true;
        break;
      case "D":
        if (number === 1) {
          maxHeap = syncMaxHeap(valid, maxHeap);
          if (maxHeap.nodes.length) {
            valid[maxHeap.nodes[0].j] = false;
            maxHeap.extract();
          }
        } else if (number === -1) {
          minHeap = syncMinHeap(valid, minHeap);
          if (minHeap.nodes.length) {
            valid[minHeap.nodes[0].j] = false;
            minHeap.extract();
          }
        }
        break;
    }
    console.log(`maxHeap:`, maxHeap.nodes);
    console.log(`minHeap:`, minHeap.nodes);
  }
  if (maxHeap.nodes.length === 0 || minHeap.nodes.length === 0) result += `EMPTY\n`;
  else result += `${maxHeap.nodes[0].number} ${minHeap.nodes[0].number}\n`;
}

console.log(result.trim());
