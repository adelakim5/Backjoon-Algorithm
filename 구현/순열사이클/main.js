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
    visited[j] = true;
    let result = [j + 1, array[j]];
    dfs(array[j] - 1, result);
    resultCount++;
  }

  answer += resultCount + "\n";

  function dfs(curr, result) {
    if (visited[curr]) return;
    if (array[curr] === result[0]) {
      visited[curr] = true;
      return;
    }
    visited[curr] = true;
    result.push(array[curr]);
    dfs(array[curr] - 1, result);
  }
}

console.log(answer.trim());
