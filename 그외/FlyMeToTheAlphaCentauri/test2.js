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
if(max > 4) {
    const increDist = getIncreDist()
    // console.log(`increDist: ${increDist}`)
    const turns = getTurn(increDist)
    for(let test of testCases) {
        const dist = test[1] - test[0]
        if (dist < 4) {
            const arr = [0, 1, 2, 3, 3]
            result += arr[dist] + "\n"
            continue
        }
        result += turns[dist] + "\n"
    }
} else {
    for (let test of testCases) {
        const dist = test[1] - test[0]
        const arr = [0, 1, 2, 3, 3]
        result += arr[dist] + "\n"
    }
}
console.log(result.trim())

function getIncreDist() {
    // let arr = Array(max + 1)
    let arr = []
    arr[0] = {
        add: 0,
        dist: 0
    }
    arr[1] = {
        add: 0,
        dist: 1
    }
    let cnt = 0
    let add = 1
    // let lastAdd = arr[1].add
    // let lastIndex = 2
    for (let i = 2; i <= max; i++) {
        if (cnt === 2) {
            cnt = 0
            add++
        }
        arr[i] = {
            add: add,
            dist: arr[i - 1].dist + add
        }
        cnt++
        if (arr[i].dist >= max) break
    }
    // console.log(`increDist arr:${arr}`)
    return arr
}

function getTurn(increDistTurn, d) {
    let arrTurn = [0, 1, 2, 3]
    if (d < 4) return arrTurn[d]
    let lastValue = arrTurn[arrTurn.length - 1]
    for (let i = 4; i < increDistTurn.length; i++) {
        const index = increDistTurn[i].dist
        // console.log("index:", index)
        while (arrTurn.length - 1 < index - 1) {
            arrTurn.push(lastValue)
            // console.log("arrTurn:", arrTurn)
        }
        arrTurn.push(++lastValue)
    }
    // console.log(arrTurn, arrTurn.length)
    return arrTurn
}