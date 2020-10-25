const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');

const n = +input[0]
let testCases = []
for (let i = 1; i < n + 1; i++) {
    testCases.push(input[i].split(' ').map(e => +e))
}

let result = ''

for (let test of testCases) {
    console.log("####################### test:", test)
    if (test[1] - test[0] <= 2) {
        result += (test[1] - test[0]) + "\n"
        continue
    }
    let st = test[0] + 1
    let en = test[1] - 1
    let k = 1
    let count = 2
    const distance = en - st
    const mid = Math.floor((st + en) / 2)
    if (distance === 1 || distance <= k + 1) {
        count++
        result += count + "\n"
        continue
    }
    let countWhile = 0
    // let flag = false
    let isSame = en - mid === mid - st ? true : false

    while (true) {
        // if (max < k) max = k
        const remainingDistance = mid - st
        const remainedDistance = en - st
        if (remainedDistance <= k+1) {
            countWhile++
            console.log("k+1보다 적게 남아서 break, st:", st, "remainedDistance:", remainedDistance, "k:", k, "countWhile:", countWhile)
            break
        }
        if(!remainingDistance) {
            countWhile*=2
            if(!isSame){
                countWhile*=2
                countWhile++
            }
            console.log(`isSame? ${isSame}`)
            console.log(`distance: ${distance}, remainDistance: ${remainingDistance}, st:${st}, mid:${mid}, countWhile:${countWhile}, k:${k}`)
            break
        }
        if(remainingDistance < k-1) {
            countWhile*=2
            countWhile++
            if(!isSame) countWhile++
            console.log(`isSame? ${isSame}`)
            console.log(`distance: ${distance}, remainDistance: ${remainingDistance}, st:${st}, mid:${mid}, countWhile:${countWhile}, k:${k}`)
            break
        }

        if (remainingDistance >= k + 1) {
            countWhile++
            k++
            st += k
        } else if (remainingDistance >= k && remainingDistance < k + 1) {
            countWhile++
            st += k
        } else if (remainingDistance >= k - 1 && remainingDistance < k) {
            countWhile++
            k--
            st += k
        }
        // console.log("in while... st:", st, "en:", en, "k:", k, "remainingDistance:", remainingDistance)
    }
    count += countWhile
    console.log("count-result:", count)
}
