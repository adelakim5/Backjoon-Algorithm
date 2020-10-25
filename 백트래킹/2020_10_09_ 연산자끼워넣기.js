const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = +input[0]
const numbers = input[1].split(' ').map(e => +e)
const operators = input[2].split(' ').map(e => +e)

let result = []
let max = -Infinity
let min = Infinity
let firstNumber = numbers.shift()
backTrack(numbers, result, firstNumber, operators)
result.sort((a,b) => a - b)
max = result[result.length-1]
min = result[0]

console.log(max ? max : 0)
console.log(min ? min : 0)

function backTrack(numbers, result, ans, ops) {
    if(numbers.length === 0) {
        result.push(ans)
        return 
    }

    let operators = ops.slice()
    let newNumbers = numbers.slice()
    const currentNumber = newNumbers.shift()
    // 현재 연산 수행할 숫자 
    let tempValue = 0

    for(let i=0; i<4; i++) {
        if(operators[i] === 0) continue
        if(operators[i] > 0 && i === 0) {
            // 덧셈이면
            tempValue = ans + currentNumber
            // 더하기
            operators[i] -= 1
            // 덧셈 연산자 하나 썼으니까 -1 해주기
            backTrack(newNumbers, result, tempValue, operators)
            // 새로운 값들로 다시 백트래킹
            operators[i] += 1
            // 리턴되었으니까 연산자 안쓴걸로 리셋됨 => +1 하기 
        } else if (operators[i] > 0 && i === 1) {
            // 뺄셈이면
            tempValue = ans - currentNumber
            operators[i] -= 1
            backTrack(newNumbers, result, tempValue, operators)
            operators[i] += 1
        } else if (operators[i] > 0 && i === 2) {
            // 곱셈이면
            tempValue = ans * currentNumber
            operators[i] -= 1
            backTrack(newNumbers, result, tempValue, operators)
            operators[i] += 1
        } else {
            // 나눗셈이면
            tempValue = Math.floor(Math.abs(ans) / Math.abs(currentNumber))
            if(ans < 0) tempValue *= -1
            operators[i] -= 1
            backTrack(newNumbers, result, tempValue, operators)
            operators[i] += 1
        }
    }

}