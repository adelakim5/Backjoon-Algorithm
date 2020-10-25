// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim()
let d = Array(input / 1 + 1).fill(0)
d[1] = 1
if (input <= 1) {
    console.log(d[input]%10007)
    return
}
d[2] = 3
for (let i = 3; i <= input / 1; i++) {
    d[i] = d[i - 1] + d[i - 2]*2
}
console.log(d[input]%10007)