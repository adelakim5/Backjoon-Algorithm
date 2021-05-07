const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const tcCount = +input[0];

let index = 0;
let answer = "";

for (let i = 0; i < tcCount; i++) {
  const length = +input[++index];
  const array = input[++index].split(" ").map((e) => +e);

  let resultCount = 0;
  const visited = Array(length).fill(false);
  for (let j = 0; j < length; j++) {
    if (visited[j]) continue;
    let start = j;
    visited[start] = true;
    let end = array[j] - 1;
    while (!visited[end]) {
      start = end;
      visited[start] = true;
      end = array[start] - 1;
    }
    resultCount++;
  }

  answer += resultCount + "\n";
}

console.log(answer.trim());
