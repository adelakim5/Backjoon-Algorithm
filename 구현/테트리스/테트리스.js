const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [c, p] = input[0].split(" ").map((e) => +e);

const defaultBlocks = input[1].split(" ").map((e) => +e);
const startCoords = getStartBlock(defaultBlocks);
// console.log("startdCoords::");
// console.log(startCoords);
main(p);

function main(p) {
  let answer = 0;
  switch (p) {
    case 1:
      answer = setOne();
      break;
    case 2:
      answer = setTwo();
      break;
    case 3:
      answer = setThree();
      break;
    case 4:
      answer = setFour();
      break;
    case 5:
      answer = setFive();
      break;
    case 6:
      answer = setSix();
      break;
    case 7:
      answer = setSeven();
      break;
  }
  console.log(answer);
}

function getStartBlock(input) {
  let starts = [];
  for (let i = 0; i < input.length; i++) {
    starts.push([input[i], i]);
  }
  return starts;
}

function isPossible(x, y) {
  // 배치 가능?
  if (!startCoords.some((e) => e[0] === x && e[1] === y)) return false;
  if (x < 0 || y < 0 || y >= c) return false;
  return true;
}

function getNumberOfCase(blocks) {
  // 경우의 수 계산
  let totalSum = 0;
  for (let start of startCoords) {
    const [x, y] = start;
    let flag = true;
    for (let block of blocks) {
      const [i, j] = block;
      if (!isPossible(x + i, y + j)) {
        // 불가능 하면 멈추기
        flag = false;
        break;
      }
    }
    if (flag) totalSum++; // 가능할때만 +1
  }
  return totalSum;
}

function setOne() {
  const one__1 = startCoords.length;
  const one__2 = () => {
    const blocks = [
      // 현재 도형을 이루는 정사각형 중 블록의 높이에 닿아야 하는 애들의 위치
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    return getNumberOfCase(blocks);
  };
  return one__1 + one__2();
}

function setTwo() {
  const blocks = [[0, 1]];
  return getNumberOfCase(blocks);
}

function setThree() {
  const three__1 = () => {
    const blocks = [
      [0, 1],
      [1, 2],
    ];
    return getNumberOfCase(blocks);
  };
  const three__2 = () => {
    const blocks = [[1, -1]];
    return getNumberOfCase(blocks);
  };
  return three__1() + three__2();
}

function setFour() {
  const four__1 = () => {
    const blocks = [
      [1, -1],
      [0, 1],
    ];
    return getNumberOfCase(blocks);
  };
  const four__2 = () => {
    const blocks = [[1, 1]];
    return getNumberOfCase(blocks);
  };
  return four__1() + four__2();
}

function setFive() {
  const five__1 = () => {
    const blocks = [
      [0, 1],
      [0, 2],
    ];
    return getNumberOfCase(blocks);
  };
  const five__2 = () => {
    const blocks = [
      [1, -1],
      [1, 1],
    ];
    return getNumberOfCase(blocks);
  };
  const five__3 = () => {
    const blocks = [[1, -1]];
    return getNumberOfCase(blocks);
  };
  const five__4 = () => {
    const blocks = [[1, 1]];
    return getNumberOfCase(blocks);
  };
  return five__1() + five__2() + five__3() + five__4();
}

function setSix() {
  const six__1 = () => {
    const blocks = [
      [0, 1],
      [0, 2],
    ];
    return getNumberOfCase(blocks);
  };
  const six__2 = () => {
    const blocks = [[2, -1]];
    return getNumberOfCase(blocks);
  };
  const six__3 = () => {
    const blocks = [
      [1, 1],
      [1, 2],
    ];
    return getNumberOfCase(blocks);
  };
  const six__4 = () => {
    const blocks = [[0, 1]];
    return getNumberOfCase(blocks);
  };
  return six__1() + six__2() + six__3() + six__4();
}

function setSeven() {
  const seven__1 = () => {
    const blocks = [
      [0, 1],
      [0, 2],
    ];
    return getNumberOfCase(blocks);
  };
  const seven__2 = () => {
    const blocks = [[2, 1]];
    return getNumberOfCase(blocks);
  };
  const seven__3 = () => {
    const blocks = [
      [1, -2],
      [1, -1],
    ];
    return getNumberOfCase(blocks);
  };
  const seven__4 = () => {
    const blocks = [[0, 1]];
    return getNumberOfCase(blocks);
  };
  return seven__1() + seven__2() + seven__3() + seven__4();
}
