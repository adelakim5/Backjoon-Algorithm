const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const cards = input[1].split(' ').map(e => +e).sort((a, b) => a - b)
console.log("cards:", cards)
const m = input[3].split(' ').map(e => +e)
console.log("m:", m)
let answer = ''

for (let number of m) {
    console.log("number:", number)
    let startIndex = 0
    let endIndex = cards.length - 1
    let result = 0
    while (startIndex <= endIndex) {
        let midIndex = Math.floor((startIndex + endIndex) / 2)
        if (number > cards[midIndex]) startIndex = midIndex + 1
        else if (number < cards[midIndex]) endIndex = midIndex - 1
        else {
            console.log("midIndex:", midIndex)
            console.log("hello?", cards[midIndex])
            let i = midIndex
            while (cards[i] === number) {
                ++i
                ++result
                console.log("++i result:", result)
            }
            i = midIndex
            while (cards[i] === number) {
                --i
                ++result
                console.log("--i result:", result)
            }
            result--
            break
        }
    }
    answer += result + " "
}

console.log(answer)