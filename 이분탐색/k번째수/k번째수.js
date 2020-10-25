const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = input[0]/1
const k = input[0]/2 

let min = 1
let max = n*n

while(min<=max){
    let mid = Math.floor((min+max)/2)
    let new__n = Math.floor(Math.sqrt(mid))
    // let new__n = 4
    if(new__n*new__n < k) {
        min = mid+1
    } else {
        let array = []
        for(let i=0; i<new__n; i++){
            array.push(...Array(new__n).fill(0).map((e, index) => {
                e = (i+1)*(index+1)
                return e
            }))
        }
        array.sort((a,b) => a-b)
        // 모르겟다!!
    }
    // console.log(array)
}