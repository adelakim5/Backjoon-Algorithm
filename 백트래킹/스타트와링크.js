const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = +input.splice(0, 1)
const s = input.map(e => e.split(' ').map(e => +e))

const halfN = Math.floor(n / 2)
let selectedTeamArray = Array(n)
for (let i = 0; i < n; i++) {
    selectedTeamArray[i] = i + 1
}

let results = []
let start = []
selectTeam(selectedTeamArray, start, results)
// console.log(results)
const length = results.length
const halfLength = Math.floor(length/2)
let min = Infinity
for(let i=0; i<halfLength; i++) {
    const _start = results[i]
    const _link = results[length-(i+1)]
    const startScore = getScore(_start)
    const linkScore = getScore(_link)
    const diffScore = Math.abs(startScore - linkScore)
    if(diffScore < min) min = diffScore 
}
console.log(min)

function selectTeam(selectedTeamArray, start, results) {
    
    if (start.length === halfN) {
        results.push([...start])
        return 
    }

    const newSelectedTeamArray = selectedTeamArray.slice()

    for (let i = 0; i < selectedTeamArray.length; i++) {
        const teamNum = newSelectedTeamArray.shift()
        start.push(teamNum)
        selectTeam(newSelectedTeamArray, start, results)
        start.pop()
    }
}

function getScore(team) {
    let combArr = []
    let results = []
    combination(team, combArr, results)
    // console.log(`results:${results}`)
    // results = results.map(e => e.split(' ').map(e => +e))
    let sum = 0
    for (let result of results) {
        const i = result[0] - 1
        const j = result[1] - 1
        sum += (s[i][j] + s[j][i])
    }
    return sum
}

function combination(team, combArr, results) {
    if (combArr.length === 2) {
        results.push([...combArr])
        return
    }
    const newTeam = team.slice()
    for (let i = 0; i < team.length; i++) {
        const num = newTeam.shift()
        combArr.push(num)
        combination(newTeam, combArr, results)
        combArr.pop()
    }
}