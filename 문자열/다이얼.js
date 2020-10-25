const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('');
// console.log(input)

let sum = 0
for (let letter of input) {
    const codeNum = letter.charCodeAt()
    if (codeNum >= 65 && codeNum < 68) {
        sum += 3
    } else if (codeNum >= 68 && codeNum < 71) {
        sum += 4
    } else if (codeNum >= 71 && codeNum < 74) {
        sum += 5
    } else if (codeNum >= 74 && codeNum < 77) {
        sum += 6
    } else if (codeNum >= 77 && codeNum < 80) {
        sum += 7
    } else if (codeNum >= 80 && codeNum <= 83) {
        sum += 8
    } else if (codeNum > 83 && codeNum <= 86) {
        sum += 9
    } else {
        sum += 10
    }
}

console.log(sum)