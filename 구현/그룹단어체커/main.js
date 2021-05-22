const fs = require("fs")
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n")
const n = +input[0]
const words = input.slice(1)

let cnt = 0

for(let word of words) {
    const obj = {}
    const stack = []
    let flag = true
    for(let i=0; i<word.length; i++) {
        const curr = word[i]
        if(curr === "\r") continue
        if(obj[curr] && stack.length && stack[stack.length-1] !== curr) {
            flag = false
            break
        }
        if(!obj[curr]) obj[curr] = 1
        else obj[curr]++
        stack.push(curr)
    }
    if(flag) cnt++
}

console.log(cnt)

