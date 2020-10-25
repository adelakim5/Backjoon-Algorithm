const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
let arr = []
for(let i=1; i<input.length; i++) {
    arr.push(input[i].split(' ').map(e => {
        if(e.length > 1) e = e.split('')
        return e
    }))
}

let answer = ''

for(let a of arr) {
    const times = +a[0]
    const stringArr = a[1]
    let newString = ''
    for(let string of stringArr) {
        for(let i=0; i<times; i++) {
            newString += string
        }
    }
    answer += newString + "\n"
}

console.log(answer.trim())
