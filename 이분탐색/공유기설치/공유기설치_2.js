const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
input[0] = input[0].split(" ").map(e=>+e)
const n = input[0][0]
const c = input[0][1]

let houses = []
for(let i=1; i<input.length; i++){
    houses.push(+input[i])
}
houses.sort((a,b)=>a-b)

let min = 1
let max = houses[n-1] - houses[0]

if(n < 3){
    console.log(max)
    return
}

let ans = 0

while(min <= max){
    let mid = Math.floor((max+min)/2)
    let st = houses[0]
    let cnt = 1
    
    for(let i=1; i<houses.length; i++){
        let distance = houses[i] - st
        if(distance >= mid){
            cnt++
            st = houses[i]
        }
    }

    if(cnt >= c){
        ans = mid
        min = mid+1
    } else max = mid-1 
}
console.log(ans)