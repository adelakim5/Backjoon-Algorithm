const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const n = +input[0];
const arr = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let table = Array.from(Array(n + 1), () => []);
let ans = Array(n + 1).fill(-1);
let visit = Array(n + 1).fill(false);

for (let nodes of arr) {
  let [a, b] = nodes;
  table[a].push(b);
  table[b].push(a);
}
console.log(table);

dfs(1);

function dfs(start) {
  let stack = [];
  stack.push(start);
  visit[start] = true;
  while (stack.length) {
    let parent = stack[stack.length - 1];
    let children = table[parent];
    let flag = false;
    for (let i = 0; i < children.length; i++) {
      if (visit[children[i]] === false && children[i] !== parent) {
        stack.push(children[i]);
        ans[children[i]] = parent;
        visit[children[i]] = true;
        flag = true;
        break;
      }
    }
    if (!flag) {
      stack.pop();
    }
  }
}

// console.log(ans);
let res = "";
for (let i = 2; i <= n; i++) {
  res += ans[i] + "\n";
}
console.log(res.trim());

// function dfs(me, parent) {
//   let stack = [];
//   ans[me] = parent;
//   stack.push(me);
//   while (stack.length) {
//     let children = table[me];
//     console.log(children);
//     if (!children.length || children === undefined) {
//       stack.pop();
//     }
//     let flag = false;
//     for (let i = 0; i < children.length; i++) {
//       if (children[i] !== parent && children[i] !== -1) {
//         stack.push(children[i]);
//         parent = me;
//         me = children[i];
//         ans[me] = parent;
//         children[i] = -1;
//         flag = true;
//         break;
//       }
//     }
//     if (!flag) stack.pop();
//   }
// }
