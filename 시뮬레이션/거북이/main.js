const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const n = +input[0];
const commands = input.slice(1).map((e) => e.replace(/\r/, ""));

const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

let answer = "";

for (let command of commands) {
  let cx = 0,
    cy = 0,
    cd = 0,
    minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0;
  for (let i = 0; i < command.length; i++) {
    const c = command[i];
    if (c === "L") cd = (cd + 3) % 4;
    else if (c === "R") cd = (cd + 1) % 4;
    else if (c === "F") {
      cx += dx[cd];
      cy += dy[cd];
    } else if (c === "B") {
      cx -= dx[cd];
      cy -= dy[cd];
    }
    maxX = Math.max(cx, maxX);
    maxY = Math.max(cy, maxY);
    minX = Math.min(cx, minX);
    minY = Math.min(cy, minY);
  }

  answer += `${(maxX - minX) * (maxY - minY)}\n`;
}

console.log(answer.trim());
