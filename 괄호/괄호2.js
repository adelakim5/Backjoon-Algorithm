const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const t = input[0] / 1
let pss = []
for (let i = 1; i < input.length; i++) {
    pss.push(input[i])
}

let result = ''

for (let i = 0; i < pss.length; i++) {
    let curr_pss = pss[i]
    let stack = []
    for (let j = 0; j < curr_pss.length; j++) {
        if (stack.length === 0 || curr_pss[j] === '(') {
            stack.push(curr_pss[j])
        } else if (stack[stack.length - 1] === ")") {
            stack.push(curr_pss[j])
        } else {
            stack.pop()
        }
    }
    if (stack.length === 0) {
        result += 'YES' + '\n'
    } else {
        result += 'NO' + '\n'
    }
}

console.log(result.trim())