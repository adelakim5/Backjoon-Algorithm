const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = +input[0]
let testCases = []
let max = 0
let result = ''
for (let i = 1; i < n + 1; i++) {
    testCases.push(input[i].split(' ').map(e => +e))
    const d = testCases[testCases.length - 1][1] - testCases[testCases.length - 1][0]
    if (max < d) max = d
}

let arr = [0, 1]
if(max >= 2) {
    let cnt = 0
    let add = 1
    for (let i = 2; i <= max; i++) {
        if (cnt === 2) {
            cnt = 0
            add++
        }
        arr[i] = arr[i - 1] + add
        if(arr[i] >= max) break
        cnt++
    }
} 

for (let test of testCases) {
    const dist = test[1] - test[0]
    // console.log("current distance!!!!:", dist)
    // console.log("current result:", result)
    // 현재 테케의 거리
    if(dist < 2){
        result += arr[dist] + "\n"
        continue
    }
    const midIndex = Math.floor(arr.length / 2)
    const mid = arr[midIndex]
    // console.log("mid:", mid, "midIndex:", midIndex)
    if (dist < mid) {
        for (let i = 0; i <= midIndex; i++) {
            if (arr[i] === dist) {
                // console.log("arr[i]:", arr[i], "dist:", dist, "i", i)
                // 현재 테케의 거리가 arr[i]과 같을 떄 
                result += (i) + "\n"
                // 해당 인덱스 가져오기 
                // console.log("result:", result)
                break
            }
            if (arr[i] > dist) {
                // console.log("arr[i]:", arr[i], "dist:", dist, "i-1", i-1)
                // 현재 테케의 거리가 arr[i]보다 작을때
                result += (i - 1) + "\n"
                // 해당 인덱스의 앞 인덱스 가져오기 
                // console.log("result:", result)
                break
            }
        }
    } else {
        for (let i = midIndex; i < arr.length; i++) {
            if (arr[i] === dist) {
                result += (i) + "\n"
                break
            }
            if (arr[i] > dist) {
                result += (i - 1) + "\n"
                break
            }
        }
    }
    // console.log(result.trim())
}
console.log(arr, arr.length)
console.log(result.trim())
// const a = result.split("\n")
// console.log(a.length)