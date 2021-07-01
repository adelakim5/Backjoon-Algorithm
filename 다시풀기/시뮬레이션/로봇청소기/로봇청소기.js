const fs = require("fs");
const input = fs
  .readFileSync("./stdin.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map((i) => +i));

const [n, m] = input[0];
const [r, c, d] = input[1];
const g = input.slice(2);

console.log(clean());

function isInBound(nr, nc) {
  return nr >= 0 && nc >= 0 && nr < n && nc < m;
}

function clean() {
  const visited = Array.from(Array(n), () => Array(m).fill(false));
  visited[r][c] = true;

  let cnt = 1;

  const stack = [];
  stack.push({ r, c, d });

  const save = (curr, dr, dc, ds, flag) => {
    const { r, c } = curr;
    for (let i = 0; i < 4; i++) {
      const nr = dr[i] + r;
      const nc = dc[i] + c;
      const nd = ds[i];
      if (g[nr][nc] || visited[nr][nc] || !isInBound(nr, nc)) continue;
      visited[nr][nc] = true;
      stack.push({ r: nr, c: nc, d: nd });
      flag = true;
      break;
    }
    return flag;
  };

  while (stack.length) {
    const { r, c, d } = stack.pop();

    let flag = false;
    if (d === 0) {
      const ds = [3, 2, 1, 0];
      const dr = [0, 1, 0, -1];
      const dc = [-1, 0, 1, 0];
      if (save({ r, c }, dr, dc, ds, flag)) {
        cnt++;
        continue;
      }

      const nr = r + 1;
      const nc = c;
      if (!g[nr][nc] && isInBound(nr, nc)) stack.push({ r: nr, c: nc, d });
      else break;
    } else if (d === 1) {
      const ds = [0, 3, 2, 1];
      const dr = [-1, 0, 1, 0];
      const dc = [0, -1, 0, 1];
      if (save({ r, c }, dr, dc, ds, flag)) {
        cnt++;
        continue;
      }

      const nr = r;
      const nc = c - 1;
      if (!g[nr][nc] && isInBound(nr, nc)) stack.push({ r: nr, c: nc, d });
      else break;
    } else if (d === 2) {
      const ds = [1, 0, 3, 2];
      const dr = [0, -1, 0, 1];
      const dc = [1, 0, -1, 0];
      if (save({ r, c }, dr, dc, ds, flag)) {
        cnt++;
        continue;
      }

      const nr = r - 1;
      const nc = c;
      if (!g[nr][nc] && isInBound(nr, nc)) stack.push({ r: nr, c: nc, d });
      else break;
    } else {
      const ds = [2, 1, 0, 3];
      const dr = [1, 0, -1, 0];
      const dc = [0, 1, 0, -1];
      if (save({ r, c }, dr, dc, ds, flag)) {
        cnt++;
        continue;
      }

      const nr = r;
      const nc = c + 1;
      if (!g[nr][nc] && isInBound(nr, nc)) stack.push({ r: nr, c: nc, d });
      else break;
    }
  }

  return cnt;
}
