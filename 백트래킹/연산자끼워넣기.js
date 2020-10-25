const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');

const n = +input[0]
let numbers = input[1].split(' ').map((e) => +e)
let operators = input[2].split(' ').map((e) => +e)

let result = []
let max = -Infinity
let min = Infinity
let number = numbers.shift()
console.log("max type:", typeof max)
backTrackMax(numbers, result, number, operators)
result.sort((a,b)=>a-b)
max = result[result.length-1]
min = result[0]
console.log(max ? max : 0)
console.log(min ? min : 0)

function backTrackMax(numbers, result, max, ops) {
    if (numbers.length === 0) {
        result.push(max)
        console.log("result:", result)
        return
    }

    let operators = ops.slice()
    console.log("operators", operators)
    let temp_max = max
    console.log(typeof temp_max)
    console.log("temp_max:", max)
    let newArr = numbers.slice()
    let current_number = newArr.shift()
    console.log("current_number", current_number, "numbers:", numbers)
    console.log("type of current_number:", typeof current_number)
    let temp_value = 0
    console.log("newArr:", newArr)
    for (let i = 0; i < 4; i++) {
        if (operators[i] === 0) continue
        if (operators[i] > 0 && i === 0) {
            temp_value = temp_max + current_number
            operators[i] -= 1
            backTrackMax(newArr, result, temp_value, operators)
            operators[i] += 1
        } else if (operators[i] > 0 && i === 1) {
            temp_value = temp_max - current_number
            operators[i] -= 1
            backTrackMax(newArr, result, temp_value, operators)
            operators[i] += 1
        } else if (operators[i] > 0 && i === 2) {
            temp_value = temp_max * current_number
            operators[i] -= 1
            backTrackMax(newArr, result, temp_value, operators)
            operators[i] += 1
        } else if (operators[i] > 0 && i === 3) {
            temp_value = Math.floor(Math.abs(temp_max) / Math.abs(current_number))
            if(temp_max<0) temp_value*=-1
            operators[i] -= 1
            backTrackMax(newArr, result, temp_value, operators)
            operators[i] += 1
        }
    }
}