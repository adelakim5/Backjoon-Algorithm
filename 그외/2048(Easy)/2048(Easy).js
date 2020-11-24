const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
if (n === 1) {
  console.log(input[1]);
  return;
}
const originBlock = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let max = 0;
let numSet = new Set();
combinationDirects([]);
console.log(numSet);
numSet.forEach((e) => {
  const dirArr = e.split(" ");
  let block = originBlock.slice().map((e) => e.slice());
  for (let dir of dirArr) {
    switch (dir) {
      case "1":
        block = up(block);
        break;
      case "2":
        block = down(block);
        break;
      case "3":
        block = left(block);
        break;
      case "4":
        block = right(block);
        break;
    }
  }
});

console.log(max);

function combinationDirects(res) {
  if (res.length === 5) {
    numSet.add(res.join(" "));
    return;
  }
  for (let i = 1; i <= 8; i++) {
    if (i >= 5) res.push(i - 4);
    else res.push(i);
    combinationDirects(res);
    res.pop();
  }
}

function up(block) {
  const setBlockToUp = () => {
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let temp = i;
        if (max < block[i][j]) max = block[i][j];
        while (temp - 1 >= 0) {
          if (block[temp - 1][j] === 0) {
            block[temp - 1][j] = block[temp][j];
            block[temp][j] = 0;
            temp--;
          } else break;
        }
      }
    }
  };
  setBlockToUp();
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (isInBlock(i - 1, j) && isInBlock(i, j) && block[i - 1][j] === block[i][j]) {
        block[i - 1][j] *= 2;
        block[i][j] = 0;
      }
    }
  }
  setBlockToUp();
  return block;
}

function down(block) {
  const setBlockToDown = () => {
    for (let i = n - 2; i >= 0; i--) {
      for (let j = 0; j < n; j++) {
        let temp = i;
        if (max < block[i][j]) max = block[i][j];
        while (temp + 1 < n) {
          if (block[temp + 1][j] === 0) {
            block[temp + 1][j] = block[temp][j];
            block[temp][j] = 0;
            temp++;
          } else break;
        }
      }
    }
  };
  setBlockToDown();
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      if (isInBlock(i, j) && isInBlock(i + 1, j) && block[i + 1][j] === block[i][j]) {
        block[i + 1][j] *= 2;
        block[i][j] = 0;
      }
    }
  }
  setBlockToDown();
  return block;
}

function left(block) {
  const setBlockToLeft = () => {
    for (let i = 0; i < n; i++) {
      for (let j = 1; j < n; j++) {
        let temp = j;
        if (max < block[i][j]) max = block[i][j];
        while (temp - 1 >= 0) {
          if (block[i][temp - 1] === 0) {
            block[i][temp - 1] = block[i][temp];
            block[i][temp] = 0;
            temp--;
          } else break;
        }
      }
    }
  };
  setBlockToLeft();
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j++) {
      if (isInBlock(i, j) && isInBlock(i, j - 1) && block[i][j - 1] === block[i][j]) {
        block[i][j - 1] *= 2;
        block[i][j] = 0;
      }
    }
  }
  setBlockToLeft();
  return block;
}

function right(block) {
  const setBlockToRight = () => {
    for (let i = 0; i < n; i++) {
      for (let j = n - 2; j >= 0; j--) {
        let temp = j;
        if (max < block[i][j]) max = block[i][j];
        while (temp + 1 < n) {
          if (block[i][temp + 1] === 0) {
            block[i][temp + 1] = block[i][temp];
            block[i][temp] = 0;
            temp++;
          } else break;
        }
      }
    }
  };
  setBlockToRight();
  for (let i = 0; i < n; i++) {
    for (let j = n - 2; j >= 0; j--) {
      if (isInBlock(i, j) && isInBlock(i, j + 1) && block[i][j + 1] === block[i][j]) {
        block[i][j + 1] *= 2;
        block[i][j] = 0;
      }
    }
  }
  setBlockToRight();
  return block;
}

function isInBlock(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < n) return true;
  return false;
}
