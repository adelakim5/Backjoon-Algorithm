const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
// console.log(typeof n, typeof m);
const originOffice = input.slice(1, input.length).map((e) => e.split(" "));
const wall = "6";
const [empty, cams] = getCamsAndEmpty();
let res = [];
monitor(0, originOffice, [empty], res);
console.log(res);

function monitor(index, office, emptyArr, res) {
  if (index >= cams.length) {
    if (!res.length) res.push(emptyArr[0]);
    else if (res[0] > emptyArr[0]) res[0] = emptyArr[0];
    console.log(`res: ${res} `);
    return;
  }

  let tempOffice = office.slice().map((e) => e.slice());
  let currEmpty = emptyArr.slice();
  for (let i = index; i < cams.length; i++) {
    const cam = cams[i];
    const [length, dlength, dx, dy] = getLengthDlengthDxDy(cam.num);

    for (let j = 0; j < length; j++) {
      console.log(`-------- cams index: ${index} --------`);
      console.log(`======== j : ${j} =========`);
      for (let k = 0; k < dlength; k++) {
        let nx = cam.x + dx[j][k];
        let ny = cam.y + dy[j][k];
        if (!isPossible(nx, ny)) continue;
        if (dx[j][k] === 1) {
          while (nx < n) {
            if (tempOffice[nx][ny] === "0") {
              tempOffice[nx][ny] = "#";
              currEmpty[0]--;
            }
            if (tempOffice[nx][ny] === wall) break;
            nx++;
          }
        } else if (dx[j][k] === -1) {
          while (nx >= 0) {
            if (tempOffice[nx][ny] === "0") {
              tempOffice[nx][ny] = "#";
              currEmpty[0]--;
            }
            if (tempOffice[nx][ny] === wall) break;
            nx--;
          }
        }
        console.log(`nx: ${nx}, ny: ${ny}`);
        // console.log(`tempOffice[nx][ny]: ${tempOffice[nx][ny]}`);
        if (dy[j][k] === 1) {
          while (ny < m) {
            if (tempOffice[nx][ny] === "0") {
              tempOffice[nx][ny] = "#";
              currEmpty[0]--;
            }
            if (tempOffice[nx][ny] === wall) break;
            ny++;
          }
        } else if (dy[j][k] === -1) {
          while (ny >= 0) {
            if (tempOffice[nx][ny] === "0") {
              tempOffice[nx][ny] = "#";
              currEmpty[0]--;
            }
            if (tempOffice[nx][ny] === wall) break;
            ny--;
          }
        }
      }
      console.log(`currEmpty: ${currEmpty}`);
      monitor(index + 1, tempOffice, currEmpty, res);
    }
    index--;
  }
}

function isPossible(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < m) return true;
  return false;
}

function getLengthDlengthDxDy(num) {
  let length = 0;
  let dlength = 0;
  let dx = [];
  let dy = [];
  switch (num) {
    case 1:
      length = 4;
      dlength = 1;
      dx = [[0], [1], [0], [-1]];
      dy = [[1], [0], [-1], [0]];
      break;
    case 2:
      length = 2;
      dlength = 2;
      dx = [
        [0, 0],
        [-1, 1],
      ];
      dy = [
        [-1, 1],
        [0, 0],
      ];
      break;
    case 3:
      length = 4;
      dlength = 2;
      dx = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
      ];
      dy = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
      break;
    case 4:
      length = 4;
      dlength = 3;
      dx = [
        [-1, 0, 1],
        [0, 1, 0],
        [1, 0, -1],
        [0, -1, 0],
      ];
      dy = [
        [0, 1, 0],
        [1, 0, -1],
        [0, -1, 0],
        [-1, 0, 1],
      ];
      break;
    case 5:
      length = 1;
      dlength = 4;
      dx = [[-1, 0, 1, 0]];
      dy = [[0, 1, 0, -1]];
      break;
  }
  return [length, dlength, dx, dy];
}

function getCamsAndEmpty() {
  let empty = 0;
  let cams = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (originOffice[i][j] === "0") ++empty;
      if (originOffice[i][j] !== "0" && originOffice[i][j] !== wall) cams.push({ x: i, y: j, num: +originOffice[i][j] });
    }
  }
  cams.sort((a, b) => a.val - b.val);
  return [empty, cams];
}
