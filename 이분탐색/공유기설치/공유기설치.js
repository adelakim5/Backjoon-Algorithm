const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
input[0] = input[0].split(" ").map(e=>+e)
const n = input[0][0]
const c = input[0][1]
let wifies = []
for(let i=1; i<input.length; i++){
    wifies.push(+input[i])
}

wifies.sort((a,b)=>a-b)
// 집 좌표들을 오름차순으로 정렬 

if(n < 3) {
    console.log(wifies[n-1] - wifies[0])
    return
}
// 집이 2개면 바로 계산하고 끝 

let min = 1
// 최소 거리는 1
let max = wifies[n-1] - wifies[0]
// 최대 거리는 제일 끝집 - 제일 첫집
let ans = 0

while(min<=max){
    let mid = Math.floor((min+max)/2)
    // 설치해보고자 하는 "특정 거리" 
    let st = wifies[0]
    // 시작집은 첫번째 
    let cnt = 1
    // 시작집에 공유기 설치 

    for(let i=1; i<n; i++){
        // 두번째집부터 끝까지 
        let distance = wifies[i] - st
        // i번째 집부터 첫집까지 거리
        if(mid<=distance){
            // 특정거리보다 크거나 같으면 
            cnt++
            // 공유기 설치 
            st = wifies[i]
            // i번째 집을 st로 두고 다음 집과 거리 계산 
        }
    }

    if(cnt >= c){
        // 공유기를 c보다 같거나 많이 설치하면 
        ans = mid
        // 답을 mid로 두고 
        min = mid+1
        // 특정거리를 증가시킨 후 while문 반복시켜보기 
        // 이렇게 하면 가장 큰 특정거리가 ans로 들어가게 됨 
    } else max = mid - 1
    // c보다 적으면 특정거리 감소 
}

console.log(ans)
