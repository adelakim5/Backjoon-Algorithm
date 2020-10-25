const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
input[0] = input[0].split(' ')
const n = +input[0][0]
const m = +input[0][1]
let trees = input[1].split(' ').map((e)=>+e).sort((a,b)=> a-b)
console.log(trees)


function check(mid){
    let length = 0
    for(let i=0; i<trees.length; i++){
        if(trees[i] < mid) continue
        length += trees[i]-mid
    }
    return length >= m
}

let st = 0
let en = trees[n-1]
let value = 0
while(st<=en){
    let mid = Math.floor((st+en)/2)
    if(check(mid)) {
        if(mid > value) value = mid
        st = mid+1
    } else en = mid-1
}

console.log(value)