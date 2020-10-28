const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, w, l] = input[0].split(" ").map((e) => +e);
let trucks = input[1].split(" ").map((e) => (e = { w: +e, count: 0 }));
const trucksCount = trucks.length;

let q = [];
let totalCount = 0;
while (trucks.length) {
  const truck = trucks[0];
  const sum = q.reduce((acc, val) => acc + val.w, 0);
  if (!q.length || sum + truck.w <= l) {
    q.push(truck);
    trucks.shift();
  }
  totalCount++;
  q = addCountQ();
  if (q[0].count === w) {
    q.shift();
  }
}

if (q.length > 0) {
  while (q.length) {
    q = addCountQ();
    if (q[0].count === w) {
      q.shift();
    }
    totalCount++;
  }
}

console.log(totalCount + 1);

function addCountQ() {
  for (let i = 0; i < q.length; i++) {
    q[i].count++;
  }
  return q;
}
