//let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require("fs")
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let VE = input[0].split(" ");
let v = +VE[0];
let startV = +input[1];
let uvws = [];
for (let i = 2; i < input.length; i++) {
  uvws.push(input[i].split(" ").map((e) => +e));
}
console.log("uvws", uvws);
let linkedInfo = (uvws) => {
  let links = Array(v + 1)
    .fill(null)
    .map((e) => new Object());
  links[0] = -1;
  for (let uvw of uvws) {
    let key = uvw[1];
    let value = uvw[2];
    if (links[uvw[0]].hasOwnProperty(key) && links[uvw[0]][key] > value) {
      links[uvw[0]][key] = value;
      // }
    } else {
      links[uvw[0]][key] = value;
    }
  }
  console.log("links", links);
  return links;
};

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
    if (parentNode.value <= currentNode.value) return;

    this.nodes[index] = parentNode;
    this.nodes[parentIndex] = currentNode;
    index = parentIndex;
    this.bubbleUp(index);
  }

  extract() {
    const min = this.nodes.pop();
    if (this.nodes.length === 0) {
      return min;
    }
    this.trickleDown();
    return min;
  }

  trickleDown(index = 0) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    const length = this.nodes.length;

    let minimum = index;
    // console.log("index:", index, "minimum", minimum)
    // console.log("this.nodes[leftChildIndex]", this.nodes[leftChildIndex])
    // console.log(this.nodes[leftChildIndex].index, this.nodes[leftChildIndex].value)
    // console.log("this.nodes[minimum]", this.nodes[minimum])

    if (this.nodes[leftChildIndex] !== undefined && this.nodes[rightChildIndex] !== undefined) {
      if (leftChildIndex <= length && this.nodes[leftChildIndex].value < this.nodes[minimum].value) {
        minimum = leftChildIndex;
      }

      if (rightChildIndex <= length && this.nodes[rightChildIndex].value < this.nodes[minimum].value) {
        minimum = rightChildIndex;
      }
    }
    // console.log("here index", index)
    // console.log("here minimum", minimum)
    if (minimum !== index) {
      // console.log("************************")
      let t = this.nodes[minimum];
      this.nodes[minimum] = this.nodes[index];
      this.nodes[index] = t;
      // [this.nodes[minimum], this.nodes[index]] = [this.nodes[index], this.nodes[minimum]]
      this.trickleDown(minimum);
    }
  }
}

let dijkstra = (links, startV) => {
  let shortestPathTable = Array(v + 1).fill(Infinity);
  shortestPathTable[0] = -1;
  shortestPathTable[startV] = 0;
  let heap = new MinHeap();
  // heap[startV] = shortestPathTable[startV]
  heap.insert({
    index: startV,
    value: 0,
  });
  console.log("first heap status:", heap);
  while (heap.nodes.length !== 0) {
    let currentHeap = heap.extract();
    let index = currentHeap.index;
    let value = currentHeap.value;
    console.log("heap status:", heap.nodes);
    console.log("links[index]:", links[index]);
    console.log("index", index, "value", value);
    if (Object.keys(links[index]).length === 0) {
      let min = findMinOfShortestPathTable(shortestPathTable);
      heap.insert({
        index: min[0],
        value: min[1],
      });
      console.log("*******************************heap:", heap);
    } else {
      if (shortestPathTable[index] === value) {
        for (let key in links[index]) {
          if (shortestPathTable[key] > links[index][key] + value) {
            shortestPathTable[key] = links[index][key] + value;
            heap.insert({
              index: key,
              value: links[index][key] + value,
            });
          }
        }
        console.log("links[index]:", links[index]);
        console.log("-------after shortestPathTable:", shortestPathTable);
      }
    }
    // heap.extract()
  }
  return shortestPathTable;
};

let findMinOfShortestPathTable = (shortestPathTable) => {
  let minValue = Infinity;
  let index = 0;
  for (let i = 1; i < shortestPathTable.length; i++) {
    if (shortestPathTable[i] < minValue) {
      minValue = shortestPathTable[i];
      index = i;
    }
  }
  return [index.toString(), minValue];
};

let printAll = (shortestPathTable) => {
  let answer = "";
  for (let i = 1; i < shortestPathTable.length; i++) {
    if (shortestPathTable[i] === Infinity) answer += "INF" + "\n";
    else answer += shortestPathTable[i] + "" + "\n";
  }
  console.log(answer.trim());
};

let linkedList = linkedInfo(uvws);
let table = dijkstra(linkedList, startV);
printAll(table);
