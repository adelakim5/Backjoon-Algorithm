const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = +input[0]
let testCases = []
for (let i = 1; i < n + 1; i++) {
    testCases.push(input[i].split(' ').map(e => +e))
}

let result = ''
for(let test of testCases) {
    // console.log("##### new test: ", test)
    let st = test[0] + 1
    let en = test[1] - 1
    let count = 2
    let k = 1
    while (st <= en) {
        const candidates = [k - 1, k, k + 1]
        const distance = en - st
        // console.log(`distance: ${distance}, en: ${en}, st: ${st}`)
        if(!distance) break
        // let mok = 0
        // let nmg = 0
        if(distance >= candidates[2]) {
            // 제일 큰 수보다 더 클때 
            if(distance === candidates[2]) {
                count++
                // console.log(`when distance === candidate[2] ? en: ${en}, st: ${st}, k: ${k}, count: ${count}`)
                break
            }
            if(distance >= 2*candidates[2]) {
                // 양쪽에서 제일 큰수로 움직일 수 있을 때
                en -= candidates[2]
                st += candidates[2]
                k = candidates[2]
                count += 2 
                // console.log(`1 en: ${en}, st: ${st}, k: ${k}, count: ${count}`)
            } else {
                // 한쪽에서 제일 큰수로 움직이면 다른 쪽은 작게 남을 때 
                let possibleRemainingDistance = [2*(k-1), 2*k, 2*(k+1), k+k-1, k+k+1]
                if(possibleRemainingDistance.some(e => e === distance)) {
                    count+=2
                    // console.log(`2 en: ${en}, st: ${st}, k: ${k}, count: ${count}`)
                    break
            
                }
                en -= candidates[0]
                k = candidates[0]
                count++
                // console.log(`3 en: ${en}, st: ${st}, k: ${k}, count: ${count}`)
            
            }
        } else if(distance < candidates[2] && distance >= candidates[1]) {
            // 이러면 거리가 중간수랑 똑같다는 말같은데..?
            // 제일 큰 수보다는 작은데 중간수와는 같거나 크다... 제일 큰 수랑은 1차이니까..
            st += candidates[1]
            count++
            k = candidates[1]
            // console.log(`4 en: ${en}, st: ${st}, k: ${k}, count: ${count}`)
            
        } else if(distance < candidates[1] && distance >= candidates[0]) {
            // 얘도 제일 작은 수랑 거리가 똑같다는 말같음 
            st += candidates[0]
            count++
            k = candidates[0]
            // console.log(`5 en: ${en}, st: ${st}, k: ${k}, count: ${count}`)
        }
    }
    result += count + "\n"
}
// console.log("##### final result #####", result.trim())
console.log(result.trim())
// let test = testCases[2]