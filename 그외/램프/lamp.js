const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
input[0] = input[0].split(' ').map(e => +e)
const n = input[0][0]
const m = input[0][1]
const k = +input[input.length - 1]
let table = []
for (let i = 1; i < input.length - 1; i++) {
    table.push(input[i].split(''))
}
let answer = 0

for (let i = 0; i < n; i++) {
    let zeroCount = 0
    for (let j = 0; j < m; j++) {
        if (table[i][j] === '0') zeroCount++
    }
    // 한 행의 꺼진 전구 개수를 셈  
    let sum = 0
    if (zeroCount <= k && (zeroCount % 2 === k % 2)) {
        // 꺼진 전구개수가 k보다 작거나 같고, 꺼진전구개수와 k가 모두 홀수인지 짝수인지
        for (let y = 0; y < n; y++) {
            const currTable = table[i].join('')
            const compareTable = table[y].join('')
            if (currTable === compareTable) sum++
        }
    }
    answer = Math.max(sum, answer)
}

console.log(answer)