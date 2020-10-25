const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().toUpperCase().split('');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().toUpperCase().split('');
// console.log("input:", input)
solve()

function solve() {
    if (input.length === 1) {
        console.log(input[0])
        return
    }
    input.sort()
    let result = countLetter(input)
    // console.log("input:", input, "result:", result)
    result.sort((a,b) => a.count - b.count)
    const lastIndex = result.length-1
    if(result[lastIndex].count === result[lastIndex-1].count){
        console.log("?")
        return 
    }
    const answer = result[lastIndex].letter
    console.log(answer)
}

function countLetter(input) {
    let counts = []
    let cnt = 1
    let currLetter = input.pop()
    while (input.length) {
        const preLetter = input.pop()
        if (currLetter === preLetter) {
            cnt++
        } else {
            counts.push({letter:currLetter, count:cnt})
            currLetter = preLetter
            cnt = 1
        }
        if(!input.length) {
            counts.push({letter:currLetter, count:cnt})
        }
    }
    return counts
}

// function setCounts(counts, currLetter, cnt) {

//     return counts
// }