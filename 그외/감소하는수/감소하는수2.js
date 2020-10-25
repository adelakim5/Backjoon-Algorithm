const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
const n = +input

// const num1 = [9,8,7,6,5,4,3,2,1,0]
const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let results = num.slice()
let size = 3

let test = decreCom(results, num, size)

console.log(test)

function decreCom(results, num, size) {
    for (let i = 0; i < num.length; i++) {
        let result = []
        if (!result.length && !num[i]) continue
        result.push(num[i])
        console.log("result:", result)
        for (let j = i - 1; j >= 0; j--) {
            if (result.length === size - 1 && num[j] >= result[result.length - 1]) break
            if (num[j] < result[result.length - 1]) result.push(num[j])
            console.log("2 result:", result)
            if (result.length === size) {
                results.push(BigInt(result.join('')))
                result.pop()
            }
        }
    }
    return results
}