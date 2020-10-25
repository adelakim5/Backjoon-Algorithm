const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
input[0]  = input[0].split(' ').map(e=> +e)
const k = input[0][0]
const n = input[0][1]
let lamps = []
for(let i=1; i<input.length; i++){
    lamps.push(input[i]/1)
}
lamps.sort((a,b) => a-b)

function check(mid){
    let cnt = 0
    for(let i=0; i<k; i++){
        cnt += Math.floor(lamps[i]/mid)
        // mid로 나누면 몇개가 나오는지 계산 
    }
    return cnt >= n
    // cnt가 n보다 크거나 같을때 true 반환 
}

let left = 1
// 자를 수 있는 길이는 1부터 시작
let right = lamps[k-1]
// 최대 lamps의 가장 큰 값 만큼 
let ans = 0
while(left<=right){
    let mid = Math.floor((left+right)/2)
    // 가운데 값
    if(check(mid)) {
        if(mid > ans) ans = mid
        // 만약 ans보다 mid가 더 크면 mid를 ans로 승격
        left = mid+1
        // 더 큰값이 있는지 찾아야 하니까 mid+1로 바꿔 while문을 반복 
    } else right = mid-1
    // mid가 n개만큼 만들 수 없는 값이면 더 작아야 하니까 mid-1하여 while문 반복  
}

console.log(ans)

