const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const t = +input[0];
const tests = input.slice(1).map((e) => e.split(" "));

let result = "";
for (let [a, b] of tests) {
  [a, b] = [a, b].map((e) => +e);
  result += bfs(a, b) + "\n";
}

console.log(result.trim());

function bfs(a, b) {
  const q = [];
  const visited = Array(10001).fill(false);
  const how = Array(10001).fill(null);
  const from = Array(10001).fill(0);

  q.push(a);
  visited[a] = true;
  from[a] = -1;

  let ans = [];

  while (q.length) {
    const now = q.shift();
    if (now === b) {
      while (b !== a) {
        ans.push(how[b]);
        b = from[b];
      }

      return ans.reverse().join("");
    }

    let next = (now * 2) % 10000;

    if (!visited[next]) {
      q.push(next);
      visited[next] = true;
      from[next] = now;
      how[next] = "D";
    }

    next = now - 1;
    if (next < 0) next = 9999;
    if (!visited[next]) {
      q.push(next);
      visited[next] = true;
      from[next] = now;
      how[next] = "S";
    }

    next = (now % 1000) * 10 + Math.floor(now / 1000);
    if (!visited[next]) {
      q.push(next);
      visited[next] = true;
      from[next] = now;
      how[next] = "L";
    }

    next = Math.floor(now / 10) + (now % 10) * 1000;
    if (!visited[next]) {
      q.push(next);
      visited[next] = true;
      from[next] = now;
      how[next] = "R";
    }
  }
}
