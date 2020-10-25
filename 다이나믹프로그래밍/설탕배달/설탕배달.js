// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim()
let d = Array(input / 1 + 1).fill(Infinity)
d[3] = 1
if (input < 5) {
    print()
    return
}
d[5] = 1
for (let i = 6; i <= input / 1; i++) {
    d[i] = Math.min(d[i - 3] + d[3], d[i - 5] + d[5])
}
print()


function print() {
    if (d[input / 1] === Infinity) {
        console.log(-1)
        return
    }
    console.log(d[input / 1])
}