const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
let map = input.slice(1, input.length).map((e) => e.split(" "));

let [homes, chickens] = findHomesAndChickens();
let totalChickenWay = Infinity;
let res = [];
combination(chickens, res, 0);
console.log(totalChickenWay);

function combination(chickens, res, idx) {
  if (res.length === m) {
    let tempChickenWay = 0;
    let flag = true;
    for (let home of homes) {
      tempChickenWay += getChickenWay(home, res);
      if (tempChickenWay > totalChickenWay) {
        flag = false;
        break;
      }
    }
    if (flag && tempChickenWay < totalChickenWay) totalChickenWay = tempChickenWay;
    return;
  }
  let newChickens = chickens.slice();

  for (let i = idx; i < newChickens.length; i++) {
    res.push(newChickens[i]);
    combination(newChickens, res, ++idx);
    res.pop();
  }
}

function getChickenWay(home, chickens) {
  let min = Infinity;
  for (let i = 0; i < chickens.length; i++) {
    const cx = chickens[i].x;
    const cy = chickens[i].y;
    const way = Math.abs(cx - home.x) + Math.abs(cy - home.y);
    if (min > way) min = way;
  }
  return min;
}

function findHomesAndChickens() {
  let homes = [];
  let chickens = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === "1") homes.push({ x: i + 1, y: j + 1 });
      if (map[i][j] === "2") chickens.push({ x: i + 1, y: j + 1 });
    }
  }
  return [homes, chickens];
}
