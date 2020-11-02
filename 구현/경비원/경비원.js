const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [m, n] = input[0].split(" ").map((e) => +e);
const storeCnt = +input[1];
const stores = input.slice(2, input.length - 1).map((e) => e.split(" ").map((i) => +i));
const dongGeun = input[input.length - 1].split(" ").map((e) => +e);

let storesLocations = setLocation(stores);
const dongGeunLocation = setLocation([dongGeun])[0];
console.log(main(dongGeunLocation));

function main() {
  let totalLength = 0;
  const dongGeunDirect = dongGeunLocation.direct;
  switch (dongGeunDirect) {
    case 1:
      totalLength = caseOne();
      break;
    case 2:
      totalLength = caseTwo();
      break;
    case 3:
      totalLength = caseThree();
      break;
    case 4:
      totalLength = caseFour();
      break;
  }
  return totalLength;
}

function caseOne() {
  let totalLength = 0;
  const [dx, dy] = dongGeunLocation.location;
  for (let storesLocation of storesLocations) {
    const [sx, sy] = storesLocation.location;
    switch (storesLocation.direct) {
      case 1:
        totalLength += Math.abs(dy - sy);
        break;
      case 2:
        totalLength += Math.min(dy + n + sy, m - dy + n + m - sy);
        break;
      case 3:
        totalLength += dy + sx;
        break;
      case 4:
        totalLength += m - dy + sx;
        break;
    }
  }
  return totalLength;
}

function caseTwo() {
  let totalLength = 0;
  const [dx, dy] = dongGeunLocation.location;
  for (let storesLocation of storesLocations) {
    const [sx, sy] = storesLocation.location;
    switch (storesLocation.direct) {
      case 1:
        totalLength += Math.min(dy + n + sy, m - dy + n + m - sy);
        break;
      case 2:
        totalLength += Math.abs(dy - sy);
        break;
      case 3:
        totalLength += dy + n - sx;
        break;
      case 4:
        totalLength += m - dy + n - sx;
        break;
    }
  }
  return totalLength;
}

function caseThree() {
  let totalLength = 0;
  const [dx, dy] = dongGeunLocation.location;
  for (let storesLocation of storesLocations) {
    const [sx, sy] = storesLocation.location;
    switch (storesLocation.direct) {
      case 1:
        totalLength += dx + sy;
        break;
      case 2:
        totalLength += n - dx + sy;
        break;
      case 3:
        totalLength += Math.abs(dx - sx);
        break;
      case 4:
        totalLength += Math.min(dx + m + sx, n - dx + m + n - sx);
        break;
    }
  }
  return totalLength;
}

function caseFour() {
  let totalLength = 0;
  const [dx, dy] = dongGeunLocation.location;
  for (let storesLocation of storesLocations) {
    const [sx, sy] = storesLocation.location;
    switch (storesLocation.direct) {
      case 1:
        totalLength += dx + m - sy;
        break;
      case 2:
        totalLength += n - dx + m - dy;
        break;
      case 3:
        totalLength += Math.min(dx + m + sx, n - dx + m + n - sx);
        break;
      case 4:
        totalLength += Math.abs(dx - sx);
    }
  }
  return totalLength;
}

function setLocation(stores) {
  //   console.log(stores);
  let storesLocations = [];
  for (let i = 0; i < stores.length; i++) {
    const [direct, num] = stores[i];
    switch (direct) {
      case 1:
        storesLocations.push({ direct, location: [0, num] });
        break;
      case 2:
        storesLocations.push({ direct, location: [n, num] });
        break;
      case 3:
        storesLocations.push({ direct, location: [num, 0] });
        break;
      case 4:
        storesLocations.push({ direct, location: [num, m] });
        break;
    }
  }
  return storesLocations;
}
