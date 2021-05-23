const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const channel = +input[0];
const chanNums = [...input[0]].map((e) => +e);
const n = +input[1];
const currChannel = 100;
let defaultDiff = Math.abs(channel - currChannel);

if (n === 0) {
  const min = Math.min(defaultDiff, chanNums.length);
  console.log(min);
  return;
}

// n === 0 이면 input[2]가 없으므로 return한 다음에 선언

const brokenNumbers = input[2].split(" ").map((e) => +e);

const isIncludeBrokenNumbers = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    if (brokenNumbers.includes(nums[i])) return true;
  }
  return false;
};

if (defaultDiff === 0 || n === 10) {
  console.log(defaultDiff);
  return;
}

if (!isIncludeBrokenNumbers(chanNums)) {
  const min = Math.min(defaultDiff, chanNums.length);
  console.log(min);
  return;
}

let increasingChannel = channel;
let decreasingChannel = channel;
let increasingVal = 0;
let decreasingVal = 0;

while (true) {
  increasingChannel++;
  increasingChannelNums = [...increasingChannel.toString()].map((e) => +e);
  if (increasingChannelNums.length + increasingChannel - channel >= defaultDiff) {
    increasingVal = defaultDiff;
    break;
  }
  if (!isIncludeBrokenNumbers(increasingChannelNums)) {
    const min = Math.min(increasingChannelNums.length + increasingChannel - channel, defaultDiff);
    increasingVal = min;
    break;
  }
}

while (true) {
  decreasingChannel--;
  decreasingChannelNums = [...decreasingChannel.toString()].map((e) => +e);
  if (decreasingChannelNums.length + channel - decreasingChannel >= defaultDiff) {
    decreasingVal = defaultDiff;
    break;
  }
  if (!isIncludeBrokenNumbers(decreasingChannelNums)) {
    const min = Math.min(decreasingChannelNums.length + channel - decreasingChannel, defaultDiff);
    decreasingVal = min;
    break;
  }
  if (decreasingChannel === 0) {
    decreasingVal = defaultDiff;
    break;
  }
}

const minVal = Math.min(decreasingVal, increasingVal);

console.log(minVal);
