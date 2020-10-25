const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m, k] = input[0].split(" ").map((e) => +e);
let nums = [];
let tree = [];

for (let i = 1; i <= n; i++) {
  nums.push(+input[i]);
}

function init(start, end, node) {
  // table 만드는 곳
  if (start === end) return (tree[node] = nums[start]);
  let mid = Math.floor((start + end) / 2);
  return (tree[node] = init(start, mid, node * 2) + init(mid + 1, end, node * 2 + 1));
}

function sum(start, end, node, left, right) {
  // start: 시작하는 인덱스, end: 끝나는 인덱스, left: 시작하는 범위, right: 끝나는 범위
  if (left > end || right < start) return 0;
  //   범위를 벗어나면 return 0
  if (left <= start && end <= right) return tree[node];
  //   그 범위 안에 있으면, 그 노드 return 하기
  let mid = Math.floor((start + end) / 2);
  return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
  //   양쪽 값 더하기
}

function update(start, end, node, index, diff) {
  if (index < start || index > end) return;
  tree[node] += diff;
  if (start === end) return;
  let mid = Math.floor((start + end) / 2);
  update(start, mid, node * 2, index, diff);
  update(mid + 1, end, node * 2 + 1, index, diff);
}

// main
init(0, n - 1, 1);
// tree[0] = tree[1];
console.log("tree:", tree);
let answer = "";

for (let i = n + 1; i < input.length; i++) {
  const [a, b, c] = input[i].split(" ").map((e) => +e);
  //   console.log("a,b,c", a, b, c);
  if (a === 1) {
    const diff = c - nums[b - 1];
    // console.log("diff:", diff);
    update(1, n, 1, b, diff);
    nums[b - 1] = c;
    // console.log("updatedTree:", tree);
  } else {
    const ans = sum(1, n, 1, b, c);
    answer += ans + "\n";
  }
}

console.log(answer.trim());
