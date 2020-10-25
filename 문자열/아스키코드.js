const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
console.log(input.charCodeAt())
