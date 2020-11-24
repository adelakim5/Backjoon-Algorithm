const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const originOffice = input.slice(1, input.length).map((e) => e.split(" ").map((i) => +i));
const wall = 6;
// console.log(originOffice);

let min = Infinity;
const cams = getCams(originOffice);
if (!cams.length) {
  searchMin(originOffice);
  console.log(min);
  return;
}
release(0, originOffice);
console.log(min);

function release(idx, originOffice) {
  if (idx >= cams.length) {
    // console.log(`idx is done!`);
    searchMin(originOffice);
    return;
  }

  //   console.log(`originOfiice`);
  //   console.log(originOffice);
  //   console.log(`idx: ${idx}`);
  for (let i = idx; i < cams.length; i++) {
    const [x, y, value] = cams[i];
    // console.log(`x: ${x}, y: ${y}, value: ${value}`);
    if (value === 1) {
      for (let j = 1; j <= 4; j++) {
        let office = originOffice.slice().map((e) => [...e]);
        let new_office = one(j, x, y, office);
        release(i + 1, new_office);
      }
    } else if (value === 2) {
      for (let j = 1; j <= 2; j++) {
        let office = originOffice.slice().map((e) => [...e]);
        let new_office = two(j, office, x, y);
        release(i + 1, new_office);
      }
    } else if (value === 3) {
      for (let j = 1; j <= 4; j++) {
        let office = originOffice.slice().map((e) => [...e]);
        let new_office = three(j, office, x, y);
        release(i + 1, new_office);
      }
    } else if (value === 4) {
      for (let j = 1; j <= 4; j++) {
        let office = originOffice.slice().map((e) => [...e]);
        let new_office = four(j, office, x, y);
        release(i + 1, new_office);
      }
    } else {
      let office = originOffice.slice().map((e) => [...e]);
      let new_office = five(x, y, office);
      release(i + 1, new_office);
    }
  }
}

function up(temp, y, office) {
  while (temp - 1 >= 0) {
    if (office[temp - 1][y] !== wall) {
      if (!office[temp - 1][y]) office[temp - 1][y] = "#";
      temp--;
    } else break;
  }
  return office;
}

function down(temp, y, office) {
  while (temp + 1 < n) {
    if (office[temp + 1][y] !== wall) {
      if (!office[temp + 1][y]) office[temp + 1][y] = "#";
      temp++;
    } else break;
  }
  return office;
}

function left(temp, x, office) {
  while (temp - 1 >= 0) {
    if (office[x][temp - 1] !== wall) {
      if (!office[x][temp - 1]) office[x][temp - 1] = "#";
      temp--;
    } else break;
  }
  return office;
}

function right(temp, x, office) {
  while (temp + 1 < m) {
    if (office[x][temp + 1] !== wall) {
      if (!office[x][temp + 1]) office[x][temp + 1] = "#";
      temp++;
    } else break;
  }
  return office;
}

function one(dir, x, y, office) {
  switch (dir) {
    case 1:
      office = up(x, y, office);
      break;
    case 2:
      office = down(x, y, office);
      break;
    case 3:
      office = left(y, x, office);
      break;
    case 4:
      office = right(y, x, office);
      break;
  }
  return office;
}

function two(dir, office, x, y) {
  switch (dir) {
    case 1:
      office = up(x, y, office);
      office = down(x, y, office);
      break;
    case 2:
      office = left(y, x, office);
      office = right(y, x, office);
      break;
  }
  return office;
}

function four(dir, office, x, y) {
  switch (dir) {
    case 1:
      office = up(x, y, office);
      office = right(y, x, office);
      office = down(x, y, office);
      break;
    case 2:
      office = right(y, x, office);
      office = down(x, y, office);
      office = left(y, x, office);
      break;
    case 3:
      office = down(x, y, office);
      office = left(y, x, office);
      office = up(x, y, office);
      break;
    case 4:
      office = left(y, x, office);
      office = up(x, y, office);
      office = right(y, x, office);
      break;
  }
  return office;
}

function three(dir, office, x, y) {
  switch (dir) {
    case 1:
      office = up(x, y, office);
      office = right(y, x, office);
      break;
    case 2:
      office = right(y, x, office);
      office = down(x, y, office);
      break;
    case 3:
      office = down(x, y, office);
      office = left(y, x, office);
      break;
    case 4:
      office = left(y, x, office);
      office = up(x, y, office);
      break;
  }
  return office;
}

function five(x, y, office) {
  office = up(x, y, office);
  office = right(y, x, office);
  office = down(x, y, office);
  office = left(y, x, office);
  return office;
}

function searchMin(arr) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 0) sum++;
    }
  }
  if (min > sum) min = sum;
}

function getCams(arr) {
  let res = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] !== 0 && arr[i][j] !== wall) res.push([i, j, arr[i][j]]);
    }
  }
  return res;
}
