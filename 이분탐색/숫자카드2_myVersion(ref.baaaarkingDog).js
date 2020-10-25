const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const cards = input[1].split(' ').map(e => +e).sort((a, b) => a - b)
console.log(cards)
const m = input[3].split(' ').map(e => +e)
let answer = ''

for (let target of m) {
    let st = -1
    let en = cards.length-1
    let low = lowerIndex(st, en, target)
    let up = upperIndex(st, en, target)
    answer+= up-low + " "
    console.log("up", up, "low", low)
}
console.log(answer)


function lowerIndex(st, en, target) {
    while (st < en) {
        let mid = Math.floor((st + en + 1) / 2)
        if (cards[mid] < target) st = mid
        else en = mid - 1 
    }
    return st
}

function upperIndex(st, en, target) {
    while (st < en) {
        let mid = Math.floor((st + en + 1) / 2)
        if (cards[mid] <= target) st = mid
        else en = mid - 1
    }
    return st
}