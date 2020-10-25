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
    // console.log("##### new test: ", test, "result:", result)
    if(test[1] - test[0] < 2) {
        console.log(1)
        continue
    }
    let st = test[0] + 1
    const en = test[1] - 1
    // 양쪽에서 1씩 움직임 
    const mid = Math.floor((st + en) / 2)
    let count = 2
    // 초기 count는 양쪽에서 1번씩 움직여야 하니까 2
    let distance = en - st
    // console.log(`st: ${st}, mid: ${mid}, en: ${en}, totalDistance? ${distance}, HalfRemainDistance? ${en - mid}`)
    let k = 1
    if (!distance) {
        // 이동할 거리가 없으면 초기값 그대로 
        result += count + "\n"
        continue
    }
    if (distance <= k + 1) {
        // 이동할 거리가 하나정도 있으면 count한번 하기
        count++
        result += count + "\n"
        continue
    }

    let countInWhile = 0
    // while문 안에서 계산할 카운트 
    while (distance > 0) {
        const candidates = [k - 1, k, k + 1]
        distance = mid - st
        // 그 외의 것들은 모두 반씩 잘라서 계산 
        if (!distance) break
        // 이동 다 했으면 멈추기 
        // console.log(`in while ... distance: ${distance}, st: ${st}, mid:${mid}, k: ${k}`)
        if (distance > candidates[2]) {
            if (distance > 2 * candidates[2]) {
                // 제일 큰 수를 두배해도 거리가 더 크면 
                countInWhile++
                k = candidates[2]
                st += candidates[2]
                // 일단 그만큼 한번만 감 
                // console.log(`1 countInWhile: ${countInWhile}`)
            } else {
                // 만약 제일 큰 수를 두배한것보다 작지만 제일 큰수보다 거리가 더 크면 
                // 어쨌든 두번을 가야 함
                // 애초에 처음 1번 더 가든 말든 ... 아닌가 ㅜㅜ 
                const possibleCombinedDistance = [2 * (k - 1), 2 * k, 2 * (k + 1), k + k + 1, k + k - 1]
                // 현재 candidates로 조합해서 갈 수 있는 길이 계산 
                // console.log(`possibleCombinedDistance: ${possibleCombinedDistance}`)
                if (possibleCombinedDistance.some(e => e === distance)) {
                    countInWhile += 2
                    // console.log(`1.5 countInWhile: ${countInWhile}`)
                    break
                }
                st += candidates[0]
                k = candidates[0]
                countInWhile++
            }
        } else if (distance === candidates[1]) {
            countInWhile++
            st += candidates[1]
            // console.log(`2 countInWhile: ${countInWhile}`)
        } else if (distance === candidates[0]) {
            countInWhile++
            st += candidates[0]
            // console.log(`3 countInWhile: ${countInWhile}`)
        }
    }
    countInWhile *= 2
    // 끝나면 2배 해주기 

    if ((en - mid) > mid) {
        // mid가 1 작게 잡혔다면? 마지막에 한번 더 가야함 
        count++
    }
    count += countInWhile
    result += count + "\n"
}
// console.log("##### final result #####", result.trim())
console.log(result.trim())
// let test = testCases[2]