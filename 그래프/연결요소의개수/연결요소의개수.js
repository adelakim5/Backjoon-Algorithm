const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const NAndM = input[0].split(' ')
const N = +NAndM[0]
const M = +NAndM[1]
let links = []
for (let i = 1; i < input.length; i++) {
    links.push(input[i].split(' ').map((e) => +e))
}

function makeGroupState() {
    let groupStateTable = []
    for (let i = 0; i <= N; i++) {
        groupStateTable.push(i)
    }
    return groupStateTable
}

function changeGroupState(start, end, groupStateTable) {
    let endValue = groupStateTable[end]
    for (let i = 1; i < groupStateTable.length; i++) {
        if (groupStateTable[i] === endValue) groupStateTable[i] = groupStateTable[start]
    }
    return groupStateTable
}

function findConnectedComponents(links, groupStateTable) {
    for (let link of links) {
        const start = link[0]
        const end = link[1]
        if(groupStateTable[start] !== groupStateTable[end]){
            groupStateTable = changeGroupState(start, end, groupStateTable)
        }
    }
    const result = new Set(groupStateTable.slice(1, groupStateTable.length))
    return [...result].length
}
if(N === 1){
    console.log(1)
    return 
}

if(M === 0) {
    console.log(N)
    return 
}

let groupStateTable = makeGroupState()
const answer = findConnectedComponents(links, groupStateTable)
console.log(answer)