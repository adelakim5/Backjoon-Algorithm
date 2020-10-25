const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('');
console.log(input)
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let answer = ''
for(let a of arr) {
    const index = input.findIndex(e => e === a)
    answer += index + ' '
}
console.log(answer.trim())