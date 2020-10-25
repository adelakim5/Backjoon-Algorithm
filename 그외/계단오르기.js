function b2579(){
    var n = 6
    var input = [6,10, 20, 15, 25, 10, 20 ]
    var stair = []
    var dp = new Array(n).fill(0)
    stair = input.slice(1, input.length)
    console.log(stair)
    dp[0] = stair[0]
    dp[1] = max(stair[0]+stair[1], stair[1])
    dp[2] = max(stair[0]+stair[2], stair[1]+stair[2])
    for(var i=3; i<n; i++){
        dp[i] = max(dp[i-2]+stair[i], dp[i-3]+stair[i-1]+stair[i])
    }
    console.log(dp[n-1])
    console.log(dp)
    // var dp = []
    // var sum = 0
    // for(var i=n-1; i>=0;){
    //     if(i == n-1){
    //         dp.push({stair: stair[i], idx: i})
    //     }
    //     if(i == 1){
    //         if(dp.some(e=> e.idx === 2)){
    //             break;
    //         } else {
    //             dp.push({stair: stair[0], idx: 0})
    //             break
    //         }
    //     }
    //     var a = stair[i-1]
    //     var b = stair[i-2]
    //     var max = Math.max(a+stair[i], b+stair[i])
    //     if(max == a+stair[i]){
    //         dp.push({stair:a, idx: i-1})
    //         i--
    //     } else {
    //         dp.push({stair: b, idx: i-2})
    //         i = i-2
    //     }
    // }
    // for(var j=0; j<dp.length; j++){
    //     sum = sum+dp[j].stair
    // }

    // console.log(dp)
    // console.log(sum)
    
}
function max(a,b){
    return a>b ? a:b
}

b2579()