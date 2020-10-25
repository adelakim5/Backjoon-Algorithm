const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
const n = +input 
// console.log("n:", n)
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// if (n === 1) {
//     console.log(0)
//     return
// }
// console.log("n", n)
if (n < 10) {
    console.log(numbers[n])
    return
}

if(n > 1022) {
    console.log(-1)
    return 
}

console.log(main())

function main() {
    let decreNums = []
    for (let i = 0; i < 10; i++) {
        decreNums.push(i)
    }

    let size = 2
    let result = []
    while (decreNums.length <= n+1) {
        for (let i = size-1; i < 10; i++) {
            result.push(i)
            decreCombination(decreNums, size, result)
            if (decreNums.length >= n+1) break
            result = []
        }
        if (decreNums.length >= n+1) break
        size++
    }
    // decreCombination(decreNums, size, numbers, result)
    // console.log(`decreNums[n-1]: ${decreNums[n-1]}, decreNums.length: ${decreNums.length}`)
    return decreNums[n]
}

function decreCombination(decreNums, size, result) {

    if (decreNums.length >= n+1) {
        return
    }

    if (result.length === size) {
        // if (!check(result)) return
        const decreNum = Number(result.join(''))
        decreNums.push(decreNum)
        return
    }

    // let newNumbers = numbers.slice()
    const startNum = result[0]
    // console.log("startNum:", startNum)

    for (let i = 0; i < startNum; i++) {
        if (i >= result[result.length - 1]) return
        // if(check(result)){
        result.push(i)
        decreCombination(decreNums, size, result)
        result.pop()
        // }
        // console.log("newNumbers:", newNumbers)
        // console.log("i:", i)
        // result.push(i)
        // console.log("res:", result)
        // newNumbers.splice(i, 1)
        // decreCombination(decreNums, size, result)
        // result.pop()
    }
}

function check(result) {
    if (result[0] === 0) return false
    for (let i = 1; i < result.length; i++) {
        if (result[i] >= result[i - 1]) return false
    }
    return true
}