const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
if (n === 1) {
  console.log(input[1]);
  return;
}
const originBlock = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let max = 0;
game(0, originBlock, "1");
game(0, originBlock, "2");
game(0, originBlock, "3");
game(0, originBlock, "4");
console.log(max);

function game(count, oBlock, dir) {
  if (count >= 5) {
    return;
  }

  let block = oBlock.slice().map((e) => [...e]);

  if (dir === "1") {
    block = up(block);
  } else if (dir === "2") {
    block = down(block);
  } else if (dir === "3") {
    block = left(block);
  } else {
    block = right(block);
  }

  game(count + 1, block, "1");
  game(count + 1, block, "2");
  game(count + 1, block, "3");
  game(count + 1, block, "4");
}
// let dirSet = new Set();
// combinatedDirects([]);
// dirSet.forEach((e) => {
//   const dirArr = e.split(" ");
//   let block = originBlock.slice().map((el) => [...el]);
//   for (let dir of dirArr) {
//     if (dir === "1") {
//       block = up(block);
//     } else if (dir === "2") {
//       block = down(block);
//     } else if (dir === "3") {
//       block = left(block);
//     } else {
//       block = right(block);
//     }
//   }
// });

// console.log(max);

// function combinatedDirects(res) {
//   if (res.length === 5) {
//     dirSet.add(res.join(" "));
//     return;
//   }
//   for (let i = 1; i <= 8; i++) {
//     if (i >= 5) res.push(i - 4);
//     else res.push(i);
//     combinatedDirects(res);
//     res.pop();
//   }
// }

function setToDirect(direct, block) {
  switch (direct) {
    case "up":
      for (let i = 1; i < n; i++) {
        for (let j = 0; j < n; j++) {
          let temp = i;
          max = max < block[i][j] ? block[i][j] : max;
          while (temp - 1 >= 0) {
            if (block[temp - 1][j] === 0) {
              block[temp - 1][j] = block[temp][j];
              block[temp][j] = 0;
              temp--;
            } else break;
          }
        }
      }
      break;
    case "down":
      for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j < n; j++) {
          let temp = i;
          max = max < block[i][j] ? block[i][j] : max;
          while (temp + 1 < n) {
            if (block[temp + 1][j] === 0) {
              block[temp + 1][j] = block[temp][j];
              block[temp][j] = 0;
              temp++;
            } else break;
          }
        }
      }
      break;
    case "left":
      for (let i = 0; i < n; i++) {
        for (let j = 1; j < n; j++) {
          let temp = j;
          max = max < block[i][j] ? block[i][j] : max;
          while (temp - 1 >= 0) {
            if (block[i][temp - 1] === 0) {
              block[i][temp - 1] = block[i][temp];
              block[i][temp] = 0;
              temp--;
            } else break;
          }
        }
      }
      break;
    case "right":
      for (let i = 0; i < n; i++) {
        for (let j = n - 2; j >= 0; j--) {
          let temp = j;
          max = max < block[i][j] ? block[i][j] : max;
          while (temp + 1 < n) {
            if (block[i][temp + 1] === 0) {
              block[i][temp + 1] = block[i][temp];
              block[i][temp] = 0;
              temp++;
            } else break;
          }
        }
      }
      break;
  }
  return block;
}

function up(block) {
  block = setToDirect("up", block);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (block[i - 1][j] === block[i][j]) {
        block[i - 1][j] *= 2;
        block[i][j] = 0;
      }
    }
  }
  block = setToDirect("up", block);
  return block;
}

function down(block) {
  block = setToDirect("down", block);
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      if (block[i + 1][j] === block[i][j]) {
        block[i + 1][j] *= 2;
        block[i][j] = 0;
      }
    }
  }
  block = setToDirect("down", block);
  return block;
}

function left(block) {
  block = setToDirect("left", block);
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j++) {
      if (block[i][j - 1] === block[i][j]) {
        block[i][j - 1] *= 2;
        block[i][j] = 0;
      }
    }
  }
  block = setToDirect("left", block);
  return block;
}

function right(block) {
  block = setToDirect("right", block);
  for (let i = 0; i < n; i++) {
    for (let j = n - 2; j >= 0; j--) {
      if (block[i][j + 1] === block[i][j]) {
        block[i][j + 1] *= 2;
        block[i][j] = 0;
      }
    }
  }
  block = setToDirect("right", block);
  return block;
}
