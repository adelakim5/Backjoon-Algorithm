const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const n = +input[0];

let answer = "";

for (let i = 1; i < n * 2; i += 2) {
  const [docCnt, docIndex] = input[i].split(" ").map((e) => +e);
  if (docCnt <= 1) {
    answer += 1 + "\n";
    continue;
  }
  const docs = input[i + 1].split(" ").map((e, idx) => ({ idx, docPriority: +e }));
  answer += count(docs, docIndex) + "\n";
}

console.log(answer.trim());

function count(docs, docIndex) {
  let cnt = 1;
  while (true) {
    const { idx, docPriority } = docs.shift();
    if (docs.some((e) => e.docPriority > docPriority)) docs.push({ idx, docPriority });
    else if (idx === docIndex) break;
    else cnt++;
  }

  return cnt;
}
