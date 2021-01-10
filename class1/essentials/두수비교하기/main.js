const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  let [a, b] = line.split(" ").map((e) => +e);
  if (a > b) console.log(">");
  else if (a < b) console.log("<");
  else console.log("==");
  rl.close();
}).on("close", () => {
  process.exit();
});
