const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, s] = input[0].split(" ").map((e) => +e);
const arr = input[1].split(" ").map((e) => +e);
let set = new Set();
for (let i = 1; i <= n; i++) {
  getPartArr(0, [], i);
}
console.log(set.size);

function getPartArr(idx, res, size) {
  if (res.length === size) {
    const sum = res.reduce((acc, val) => acc + val.val, 0);
    if (sum === s) {
      const str = res.map((e) => (e = e.idx + " " + e.val));
      set.add(str);
    }
    return;
  }

  for (let i = idx; i < arr.length; i++) {
    res.push({ idx: i, val: arr[i] });
    getPartArr(i + 1, res, size);
    res.pop();
  }
}
