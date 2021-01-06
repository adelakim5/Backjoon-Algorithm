const fs = require("fs");
let [a, b] = fs.readFileSync("./stdin.txt").toString().trim().split(" ");
a = BigInt(a);
b = BigInt(b);
console.log((a + b).toString());
