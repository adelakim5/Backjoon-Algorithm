const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
// const totalRecommendCnt = +input[1];
const recommendNumbers = input[2].split(" ");
let students = setRecommend(recommendNumbers);
print(students);

function print(map) {
  let answer = [];
  for (let [key, value] of map) {
    answer.push(key);
  }
  console.log(answer.sort((a, b) => a - b).join(" "));
}

function setRecommend(recommendNumbers) {
  let map = new Map();
  for (let number of recommendNumbers) {
    // console.log(`######## 지금 사진번호는: ${number} ########`);
    if (map.has(number)) {
      //   console.log("일단, 기존에 추천받은 적이 있으면");
      let val = map.get(number);
      map.set(number, ++val);
      //   console.log(`add the value of ${number} key in the map`);
      //   console.log(map);
      continue;
    }
    if (map.size >= n) {
      //   console.log("만약 사진틀이 다 찼으면");
      let min = Infinity;
      let xKey = "";
      map.forEach((value, key) => {
        if (value < min) {
          min = value;
          xKey = key;
        }
      });
      map.delete(xKey);
      //   console.log(`delete currently the oldest less recommended number: ${xKey}`);
    }
    if (map.size + 1 <= n) {
      //   console.log("만약 비어있는 사진틀이 있으면");
      map.set(number, 1);
      //   console.log(`add the number as the key in map, with the value 1:`);
      //   console.log(map);
    }
  }
  return map;
}
