const fs = require("fs");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .split("\n");
//
const [n, k] = input[0].split(" ").map((e) => +e);
if (k < 5) {
  console.log(0);
  return;
}
const words = [];
input.slice(1).forEach((e) => words.push(e.replace("anta", "").replace("tica", "")));
// console.log(words);
let d = [97, 99, 105, 110, 116];
let max = 0;
let visit = Array(26).fill(false);
for (let el of d) {
  visit[el - 97] = true;
}
pickLetters([], 97);
console.log(max);

function pickLetters(res, start) {
  if (res.length === k - 5) {
    // console.log(res);
    let cnt = countReadableLetter();
    if (max < cnt) max = cnt;
    return;
  }
  for (let i = start; i <= 122; i++) {
    if (visit[i - 97]) continue;
    res.push(i);
    visit[i - 97] = true;
    pickLetters(res, i + 1);
    visit[i - 97] = false;
    res.pop();
  }
}

// function isDefaultLetter(i) {
//   if (i === 97 || i === 99 || i === 105 || i === 110 || i === 116) return true;
//   return false;
// }

function countReadableLetter() {
  let cnt = 0;
  let flag = true;
  for (let word of words) {
    if (isReadable(word)) cnt++;
  }
  return cnt;
}

function isReadable(word) {
  for (let i = 0; i < word.length; i++) {
    if (!visit[word[i].charCodeAt(0) - 97]) return false;
  }
  return true;
}
