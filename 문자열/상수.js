const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split(' ');
let a = input[0]
let b = input[1]
a = a.split('').reverse().join('')
b = b.split('').reverse().join('')
console.log(a > b ? a : b)
