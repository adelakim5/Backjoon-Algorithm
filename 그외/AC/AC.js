const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const testCase = +input[0];
const E = "error";
let cnt = 0;
let idx = 1;
let answer = "";

while (cnt < testCase) {
  const func = input[idx];
  const n = +input[idx + 1];
  const deleteCnt = getCount(func);
  //   console.log(`arr: ${arr}`);
  if (deleteCnt > n) {
    answer += E + "\n";
  } else if (deleteCnt < n) {
    let arr = input[idx + 2].split(/[\[\],]/);
    answer += work(func, arr.slice(1, arr.length - 1)) + "\n";
  } else {
    answer += "[]\n";
  }
  idx += 3;
  cnt++;
}

console.log(answer.trim());

function work(func, arr) {
  let r = 1;
  for (let command of func) {
    if (command === "R") {
      switch (r) {
        case 1:
          r = -1;
          break;
        case -1:
          r = 1;
          break;
      }
    } else {
      switch (r) {
        case 1:
          arr = arr.slice(1, arr.length);
          break;
        case -1:
          arr = arr.slice(0, arr.length - 1);
          break;
      }
    }
  }
  let res = r === 1 ? arr.join(",") : arr.reverse().join(",");
  return "[" + res + "]";
}

function getCount(func) {
  let cntD = 0;
  for (let i = 0; i < func.length; i++) {
    if (func[i] === "D") cntD++;
  }
  return cntD;
}

function setArr(str) {
  let ans = str;
  //   console.log(`ans:`);
  //   console.log(ans);
  return ans.slice();
  //   return ans;
}
// function setReverse(arr) {
//   let temp = arr.split(/[\[\],]/);
//   //   console.log(`temp`);
//   //   console.log(temp);
//   let newArr = [];
//   for (let i = temp.length - 2; i > 0; i--) {
//     newArr.push(temp[i]);
//   }
//   //   console.log(`reverse, newArr:`);
//   //   console.log(newArr);
//   return newArr;
// }
// function setDelete(arr, deleteCnt) {
//   let newArr = arr.slice(deleteCnt, arr.length);
//   //   console.log(`newArr:`);
//   //   console.log(newArr);
//   return "[" + newArr.join(",") + "]";
// }
