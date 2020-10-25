const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = input.shift()

const checkedWords = checkWords(input)
const answer = getGroupWords(checkedWords)
console.log(answer)

function checkWords(input) {
    let result = []
    for (let word of input) {
        let temp = []
        let flag = true
        if(word.length === 1) {
            result.push({word:word, check:true})
            continue
        }
        for (let letter of word) {
            const empty = !temp.length
            const same = temp[temp.length - 1] === letter
            const first = temp.every(e => e !== letter)
            if (empty || same || first) temp.push(letter)
            else {
                result.push({
                    word: word,
                    check: false
                })
                flag = false
                break
            }
        }
        if(flag) result.push({word:word, check:true}) 
    }
    return result
}

function getGroupWords(checkedWords) {
    let sum = 0
    for(let i=0; i<checkedWords.length; i++) {
        if(checkedWords[i].check) sum++
    }
    return sum
}