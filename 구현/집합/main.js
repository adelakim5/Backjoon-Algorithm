const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let s = [];
let n = -1;
let count = 0;
let result = "";

rl.on("line", (line) => {
  if (n === -1) {
    n = +line;
  } else {
    count++;
    let [command, num] = line.split(" ");
    num = +num;
    switch (command) {
      case "add":
        if (!s.length || s.every((e) => e !== num)) s.push(num);
        break;
      case "remove":
        if (s.length && s.some((e) => e === num)) s = s.filter((e) => e !== num);
        break;
      case "check":
        if (s.some((e) => e === num)) result += "1\n";
        else result += "0\n";
        break;
      case "toggle":
        if (!s.length || s.every((e) => e !== num)) s.push(num);
        else s = s.filter((e) => e !== num);
        break;
      case "all":
        s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        break;
      case "empty":
        s = [];
        break;
    }
  }
  if (count > 0 && count === n) rl.close();
}).on("close", () => {
  console.log(result.trim());
  process.exit();
});
