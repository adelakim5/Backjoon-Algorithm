const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = input[0]
const arr = input[1].split('').map(e => +e)
let sum = 0
for(let a of arr) {
    sum += a
}
console.log(sum)
