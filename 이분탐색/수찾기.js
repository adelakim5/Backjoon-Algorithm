const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = +input[0]
const a = input[1].split(' ').map((e) => +e).sort((a, b) => a - b)
const m = +input[2]
const m_array = input[3].split(' ').map((e) => +e)

let answer = ''

for (let number of m_array) {
    let st = 0
    let en = n-1
    let result = 0
    while (st <= en) {
        let mid = Math.floor((st + en) / 2)
        if (number > a[mid]) st = mid + 1
        else if (number < a[mid]) en = mid - 1
        else {
            result = 1
            break
        }
    }
    answer += result + "\n"
}

console.log(answer.trim())