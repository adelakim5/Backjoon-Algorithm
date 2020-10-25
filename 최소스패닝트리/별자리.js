// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = +input[0]

if (n === 1) {
    console.log(0)
    return
}

let coordinates = []
for (let i = 1; i < input.length; i++) {
    coordinates.push(input[i].split(' ').map((e) => parseFloat(e).toFixed(2)))
}

function findWeight(i, j) {
    let x = Math.pow((j[0] - i[0]), 2)
    let y = Math.pow((j[1] - i[1]), 2)
    let weight = Math.sqrt(x + y)
    return weight
}

let weightArray = []
const checked = Array(n).fill(false);

for (let i = 0; i < coordinates.length; i++) {
    checked[i] = true;
    for (let j = 0; j < coordinates.length; j++) {
        if (i === j) continue;
        if (checked[j]) continue;
        let weight = findWeight(coordinates[i], coordinates[j])
        weightArray.push([i, j, weight])
    }
}

weightArray.sort((a, b) => a[2] - b[2])

// 모든 애들이 연결되어있나? => 모든 애들이 연결됨. 여기서는 부모만 찾아서 같으면 됨.
// 모든 간선 돌면서 부모가 같은 경우는 continue.
// 그렇지 않은 경우는 answer += cost 더해줌., union.

console.log("weightArray:", weightArray)

let cycleTable = []
for (let i = 0; i < n; i++) {
    cycleTable.push(i)
}

function find(x, cycleTable) {
    console.log("x:", x)
    if(x === cycleTable[x]) return x
    let c = find(cycleTable[x], cycleTable)
    // cycleTable[x] = c
    return c
}

function union(a, b, cycleTable) {
    a = find(a, cycleTable)
    b = find(b, cycleTable)
    if (a !== b) {
        cycleTable[b] = a
    }
    return cycleTable
}

let sum = 0
let count = 0

for (let weightElement of weightArray) {
    let a = weightElement[0];
    let b = weightElement[1];
    if (find(a,cycleTable) === find(b,cycleTable)) continue;
    console.log("cycleTable:", cycleTable);
    union(a, b, cycleTable);
    sum += weightElement[2]
    count++
    if (count === n - 1) break;
}

console.log("sum:", sum)
console.log(parseFloat(sum).toFixed(2))
console.log("count:", count)